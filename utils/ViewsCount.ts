export function ViewsCount(excerpt: string = ""){
  const pattern = /\$\((\d+)\)/g;
  const match = pattern.exec(excerpt);
  let viewsCount = 0;
  let extractedExcerpt = excerpt;

  if (match) {
    viewsCount = parseInt(match[1]);
    extractedExcerpt = excerpt.replace(pattern, '').trim();
  }

  return {
    excerpt: extractedExcerpt,
    viewsCount: viewsCount,
  };
}