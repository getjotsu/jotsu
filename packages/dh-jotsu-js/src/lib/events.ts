export function customEvent(type: string, detail: any) {
    const event = new CustomEvent(type, {detail, cancelable: false});
    window.dispatchEvent(event);
}

export function cancelableCustomEvent(type: string, detail: any): boolean {
    const event = new CustomEvent(type, {detail, cancelable: true});
    return window.dispatchEvent(event);
}
