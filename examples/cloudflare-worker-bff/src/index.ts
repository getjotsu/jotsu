interface HeadersWithGetSetCookie extends Headers {
	getSetCookie(): string[];
}

/*
 * NOTE: this DOES NOT work locally, i.e. when using 'wrangler dev'.
 * Cloudflare return 405, Error 1000: DNS points to prohibited IP.
 */
export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);

		const hostname = 'api.jotsu.com';
		const pathname = url.pathname.replace('/api', '');

		const targetUrl = `https://${hostname}/1${pathname}${url.search}`;
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
