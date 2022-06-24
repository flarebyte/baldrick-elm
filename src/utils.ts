export const stringBetween =
  (from: string, to: string) =>
  (line: string): string => {
    const start = line.indexOf(from);
    const end = line.indexOf(to);
    return start === -1 || end === -1
      ? ''
      : line.slice(start + from.length, end + 1 - to.length);
  };

export const findHeader = (prefix: string) => (lines: string[]) =>
  (lines.find((line) => line.startsWith(prefix)) || prefix).slice(
    prefix.length
  );

export const findQuote = (lines: string[]): string => {
  const quoteParts = lines
    .filter((line) => line.startsWith('>'))
    .map((line) => line.slice(1).trim());
  return quoteParts.join(' ');
};
