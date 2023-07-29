import Footer from "../components/Footer";
import Meta from "../components/Meta";
import Header from "../components/Header";
import PreviewHeader from "../components/PreviewHeader";
import "./globals.css";
import s from "./s.module.css";
import { getAllCategoriesName } from "../lib/queries/Category/getAllCategoriesName";
import { getHeaderItems } from "../lib/queries/Header/getHeaderItems";
import { getAllTagsName } from "../lib/queries/Tag/getAllTagsName";
import { getPageContent } from "../lib/queries/Page/getPageContent";

export default async function RootLayout({ preview = false, children }: any) {
  const categories = await getAllCategoriesName();
  const header = await getHeaderItems();
  const tags = await getAllTagsName();
  const pageData = await getPageContent();

  const announcementText = pageData?.announcementBar;
  const headerData = {
    categories,
    tags,
    // announcementText,
    announcementText : 'oi',
    header,
  };
  return (
    <html lang="en">
      
      <body>
        <div className="min-h-screen">
          <a href="#content" className={s.skip}>
            Skip to content
          </a>
          {preview && <PreviewHeader />}
          <Header headerData={headerData} />
          <main>{children}</main>
        </div>
        <Footer categories={headerData?.categories} />
      </body>
    </html>
  );
}
