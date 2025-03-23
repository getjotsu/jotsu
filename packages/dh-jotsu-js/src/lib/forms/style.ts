const STYLE = `
.jotsu-form:not([data-unstyled]) [aria-required], .jotsu-form:not([data-unstyled]) .form-error, .jotsu-form:not([data-unstyled]) .form-group.is-error label, .jotsu-form:not([data-unstyled]) .form-group.is-error .field-help, .jotsu-form:not([data-unstyled]) fieldset.is-error .jotsu-form:not([data-unstyled])[data-invalid] .form-help {color: var(--color-danger, #DF1B41)}
.jotsu-form:not([data-unstyled]) .form-group.is-error input, .jotsu-form:not([data-unstyled]) .form-group.is-error textarea, .jotsu-form:not([data-unstyled]) fieldset.is-error {border-color: var(--color-danger, #DF1B41)}
`

export function formStyle() {
    const element = document.createElement('style');
    element.setAttribute('id', 'jotsu-style');
    element.innerText = STYLE;
    document.head.append(element);
}
