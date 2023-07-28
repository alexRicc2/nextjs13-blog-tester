import Head from "next/head";
import Seo from "../SEO";
import Container from "../ui/container";
import s from "./WPPage.module.css";
import { sanitize } from "../../utils/miscellaneous";
const WPPAGE = ({ pageData }: any) => {
  const page = pageData?.page ?? {};
  return (
    <>
      <Seo seo={page?.seo} uri={page?.slug} />
      <Head>
        {page?.seo?.schemaDetails && (
          <script
            type="application/ld+json"
            className="yoast-schema-graph"
            key="yoastSchema"
            dangerouslySetInnerHTML={{
              __html: sanitize(page?.seo?.schemaDetails),
            }}
          />
        )}
      </Head>
      <Container className={s.root}>
        <h1 className={s.title}>{page?.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: page?.content ?? "" }}
          className={s.content}
        />
      </Container>
    </>
  );
};
export default WPPAGE;
