export function domReady( callback: () => any) {
    if ( typeof document === 'undefined' ) {
        return;
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        return void callback();
    }

    // DOMContentLoaded has not fired yet, delay callback until then.
    document.addEventListener( 'DOMContentLoaded', callback );
}
