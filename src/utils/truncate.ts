export const truncateWallet = (
  text: string | null | undefined,
  outputLength: number,
  separator?: string
) => {
  if (!text) return text;

  if (text.length <= outputLength) return text;

  separator = separator || "...";

  var sepLen = separator.length,
    charsToShow = outputLength - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.ceil(charsToShow / 2);

  return (
    text.substring(0, frontChars) +
    "..." +
    text.substring(text.length - backChars)
  );
};

export const truncateText = (value: string, numberCharacters: number) => {
  if (!value) return "";

  if (value.length > numberCharacters) {
    return `${value.substring(0, numberCharacters)}...`;
  }

  return value.substring(0, numberCharacters);
};
