/// <reference types="jest" />

declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toBeVisible(): R;
    toBeInTheDOM(): R;
    toHaveTextContent(text: string | RegExp): R;
    toHaveAttribute(attr: string, value?: string | RegExp): R;
    toHaveClass(...classNames: string[]): R;
    toHaveStyle(style: string | object): R;
    toBeDisabled(): R;
    toBeEnabled(): R;
    toBeEmpty(): R;
    toBeInvalid(): R;
    toBeRequired(): R;
    toBeValid(): R;
    toContainElement(element: HTMLElement | null): R;
    toContainHTML(htmlText: string): R;
    toHaveFocus(): R;
    toHaveFormValues(expectedValues: { [name: string]: any }): R;
    toHaveValue(value?: string | string[] | number): R;
    toBeChecked(): R;
  }
}