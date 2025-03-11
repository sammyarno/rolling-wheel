export const DEFAULT_RESULT_SIZE = 4;
export const DEFAULT_RESULT = Array(DEFAULT_RESULT_SIZE).fill('X').join('');
export const DEFAULT_DURATION = 60; // 60s
export const DEFAULT_DELAY = 0;
export const DEFAULT_AUTOSTART = true;
export const DEFAULT_SIZE = 'small';
export const DEFAULT_RESULT_TYPE = 'DIGIT';
export const DEFAULT_PLACEHOLDER = 'X';

export type ResultType = 'DIGIT' | 'TEXT';

export const sizes = {
  small: { container: '', fontSize: 'text-lg' },
  medium: { container: '', fontSize: 'text-3xl' },
  large: { container: '', fontSize: 'text-5xl' },
};
