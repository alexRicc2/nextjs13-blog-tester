export default function transformContentUrls(content: string) {

  // URLs to replace
  const backURLToReplace = String(process.env.WORDPRESS_API_URL);
  const backPHPURLToReplace = String(process.env.WORDPRESS_API_URL) + "index.php/";

  // regex pattern to match date in URL
  const pattern = /\/\d{4}\/\d{2}\/\d{2}/g;

  // replace URLs in anchor tags
  const replaceLinks = (match: string) => {
    return match.replace(backURLToReplace, String(process.env.NEXT_PUBLIC_FRONT_SITE_URL))
                .replace(backPHPURLToReplace, String(process.env.NEXT_PUBLIC_FRONT_SITE_URL));
  };
  
  // replace URLs in all anchor tags
  const removeBackURL = content?.replace(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/gi, replaceLinks);

  // remove date from URLs
  const newContentWithoutUrlDates = removeBackURL?.replaceAll(pattern, "");

  return newContentWithoutUrlDates;
}
