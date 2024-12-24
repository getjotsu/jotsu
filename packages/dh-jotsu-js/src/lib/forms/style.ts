const STYLE = `
.gauged-form:not([data-unstyled]) [aria-required], .gauged-form:not([data-unstyled]) .form-error, .gauged-form:not([data-unstyled]) .form-group.is-error label, .gauged-form:not([data-unstyled]) .form-group.is-error .field-help, .gauged-form:not([data-unstyled]) fieldset.is-error .gauged-form:not([data-unstyled])[data-invalid] .form-help {color: var(--color-danger, #DF1B41)}
.gauged-form:not([data-unstyled]) .form-group.is-error input, .gauged-form:not([data-unstyled]) .form-group.is-error textarea, .gauged-form:not([data-unstyled]) fieldset.is-error {border-color: var(--color-danger, #DF1B41)}
`

export function formStyle() {
    const element = document.createElement('style');
    element.setAttribute('id', 'gauged-style');
    element.innerText = STYLE;
    document.head.append(element);
}
