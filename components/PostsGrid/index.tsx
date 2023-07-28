import CategoriesList from "../CategoriesList";
import PostCard from "../PostCard";
import Pagination from "../Pagination";
import s from "./PostsGrid.module.css";
const PostsGrid = ({ categories, posts, pagesCount, pagination }: any) => {
  return (
    <section>
      {categories && <CategoriesList categories={categories} />}
      <div className={s.postsGrid}>
        {posts?.edges?.map(({ node }: any) => {
          return <PostCard post={node} key={node.id} />;
        })}
      </div>
      {pagination && pagination}
      {pagesCount && <Pagination pagesCount={pagesCount} root />}
    </section>
  );
};
export default PostsGrid;
