interface HeadersWithGetSetCookie extends Headers {
	getSetCookie(): string[];
}

interface EnvType extends Env {
	JOTSU_ACCOUNT_ID: string | undefined;
}

/*
 * NOTE: this DOES NOT work locally, i.e. when using 'wrangler dev'.
 * Cloudflare return 405, Error 1000: DNS points to prohibited IP.
 */
export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);

		const jotsu_account_id = (env as EnvType).JOTSU_ACCOUNT_ID || '1';
		const hostname = 'api.jotsu.com';
		const pathname = url.pathname.replace('/api', '');

		const targetUrl = `https://${hostname}/${jotsu_account_id}${pathname}${url.search}`;
		let proxyResponse = await fetch(targetUrl, request);

		const cfHeaders = proxyResponse.headers as HeadersWithGetSetCookie;
		const setCookieHeaders = cfHeaders.getSetCookie();

		const rewrittenCookies = setCookieHeaders.map((cookie: string) => {
			return cookie
				.replace(/Domain=[^;]+;?/i, '')
				.replace(/Path=[^;]+/i, 'Path=/api/auth')
				.replace(/;?\s*SameSite=[^;]+/i, '; SameSite=Strict')
		});

		const newHeaders = new Headers(proxyResponse.headers);
		newHeaders.delete('Set-Cookie');
		rewrittenCookies.forEach((cookie: string) => newHeaders.append('Set-Cookie', cookie));

		return new Response(proxyResponse.body, {
			status: proxyResponse.status,
			headers: newHeaders,
		});
	},
} satisfies ExportedHandler<Env>;
