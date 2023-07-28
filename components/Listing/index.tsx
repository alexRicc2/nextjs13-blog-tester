import PostRow from "../PostsRow";
import s from './Listing.module.css'
const Listing = ({posts}: any) => {
  return (
    <div className={s.root}>
      <PostRow posts={posts?.slice(0, 4)} />
      {posts?.length > 4 && <PostRow posts={posts?.slice(4, 8)} />}
      {posts?.length > 8 && <PostRow posts={posts?.slice(8, 12)} />}
      {posts?.length > 12 && <PostRow posts={posts?.slice(12, 16)} />}
    </div>
  );
};
export default Listing;
