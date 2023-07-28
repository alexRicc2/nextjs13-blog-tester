import PostCard from "../PostCard";
import LineButton from "../ui/LineButton";
import s from "./MorePosts.module.css";
import Container from "../ui/container";
import MiniPostCard from "../MiniPostCard";
const MorePosts = ({ posts }: any) => {
  return (
    <section className={s.background}>
      <Container>
        <div className={s.header}>
          <h2 className={s.header__title}>Recents Post</h2>
          <LineButton className={s.lineButton} variant="secondary" href="/">
            See all{" "}
            <svg
              className={s.icon}
              width="12"
              height="11"
              viewBox="0 0 12 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.20904 1.21197L10.711 5.64783L7.20904 10.0837"
                stroke="#004C66"
                strokeWidth="2"
              />
              <line
                x1="0.205078"
                y1="5.38708"
                x2="10.7111"
                y2="5.38708"
                stroke="#004C66"
                strokeWidth="2"
              />
            </svg>
          </LineButton>
        </div>
        <div className={s.postsRow}>
          {posts?.edges?.slice(0, 3)?.map(({ node }: any) => {
            return (
              <MiniPostCard post={node} key={node?.id} className={s.post} />
            );
          })}
        </div>
      </Container>
    </section>
  );
};
export default MorePosts;
