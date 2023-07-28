import Footer from "../Footer";
import Meta from "../Meta";
import Header from "../Header";
import PreviewHeader from "../PreviewHeader";
import s from './Layout.module.css'
export default function Layout({ preview = false, children, headerData }: any) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <a href="#content" className={s.skip}>Skip to content</a>
        {preview && <PreviewHeader />}
        <Header headerData={headerData}/>
        <main>{children}</main>
      </div>
      <Footer categories={headerData?.categories}/>
    </>
  );
}
