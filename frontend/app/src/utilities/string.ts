export const stringIsNullOrWhitespace = (input: string | undefined | null): boolean =>
  !input || !input.trim();

export const capitalize = (input: string): string => input.charAt(0).toUpperCase() + input.slice(1);
