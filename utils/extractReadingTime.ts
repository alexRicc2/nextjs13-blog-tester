export function extractReadingTime(str: string) {
  const regex = /<span class="rt-time">(\d+)<\/span>/;
  const match = str.match(regex);

  if (match && match[1]) {
    return parseInt(match[1]);
  }
  return 0;
}