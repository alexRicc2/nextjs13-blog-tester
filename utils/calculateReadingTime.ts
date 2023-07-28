export function calculateReadingTime(html: string = '') {
  // Remove any HTML tags and split the string into words
  const text = html?.replace(/<[^>]*>/g, '').split(' ');
  // Calculate the estimated reading time in minutes
  const readingTime = Math.ceil(text?.length / 300);
  return readingTime ? readingTime : "1 <";
}