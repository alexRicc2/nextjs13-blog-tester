import { Key } from "react";
import PostCard from "../PostCard";
import PostCardLoading from "../PostCard/PostCardLoading";
import s from "./PostsRow.module.css";

const PostRow = ({ posts, loading = false }: any) => {
  if (loading) {
    return (
      <div className={s.postsRow}>
        {posts?.map((_: any, index: Key | null | undefined) => {
          return (<PostCardLoading key={index} />)
        })}
      </div>
    );
  }
  return (
    <div className={s.postsRow}>
      {posts?.map(({ node }: any) => {
        return (
          <PostCard
            post={node}
            key={node?.id}
            variant="secondary"
            className={s.post}
          />
        );
      })}
    </div>
  );
};

export default PostRow;
