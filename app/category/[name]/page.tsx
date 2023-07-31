import Listing from "../../../components/Listing";
import ListingHero from "../../../components/ListingHero";
import Container from "../../../components/ui/container";
import { getAllCategoriesName } from "../../../lib/queries/Category/getAllCategoriesName";
import { getCategoryData } from "../../../lib/queries/Category/getCategoryData";
import { getAllPostsByCategory } from "../../../lib/queries/Post/getAllPostsByCategory";
import { PER_PAGE_FIRST, PER_PAGE_REST } from "../../../utils/pagination";

export async function generateStaticParams() {

  const allCategories = await getAllCategoriesName();

  const paths = allCategories.map(({ category }: any) => { return { name: category.slug } })
  return paths

}

export default async function Page({ params }: { params: { name: string } }) {
  const variables = {
    categoryName: params?.name,
    perPage: PER_PAGE_FIRST,
    offset: null,
  };
  const data = await getAllPostsByCategory(variables);
  const categoryData = await getCategoryData(params?.name);
  const posts = data?.posts?.edges;
  const { pageInfo } = data?.posts ?? {};
  const totalPostsCount = pageInfo?.offsetPagination?.total ?? 0;

  const pagesCount = Math.ceil(
    (totalPostsCount - PER_PAGE_FIRST) / PER_PAGE_REST + 1
  );
  return (
    // <Layout headerData={headerData}>
    //   <Head>
    //     <title> {categoryData?.category?.name} - ULTATEL Blog</title>
    //   </Head>
    //   <Seo
    //     seo={categoryData?.category?.seo}
    //     uri={categoryData?.category?.slug}
    //   />
    <>
      <div>
        <ListingHero
          title={categoryData?.category?.name}
          results={totalPostsCount}
        />
        <Container>
          <Listing posts={posts} />
          {/* <Pagination
            pagesCount={pagesCount}
            postName={`/category/${categoryData?.category?.slug}`}
          /> */}
        </Container>
      </div>

    </>
  );
}