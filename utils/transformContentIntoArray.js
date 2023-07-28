const cheerio = require('cheerio');

export default function transformContentIntoArray(content) {
  const $ = cheerio.load(content);
  const htmlSections = [];

  $('p, h1, h2, h3, h4, h5, h6, figure, div, table').each((index, element) => {
    const html = $.html(element);
    htmlSections.push(html);
  });

  return htmlSections;
}