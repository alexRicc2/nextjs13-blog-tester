import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import s from "./FeaturedPost.module.css";
import LineButton from "../ui/LineButton";
import Tag from "../ui/Tag";
import { useState } from "react";
import { ConvertDate } from "../../utils/convertDate";
import cn from "clsx";
import Container from "../ui/container";
import MiniPostCard from "../MiniPostCard";
const FeaturedPost = ({ posts }: any) => {
  return (
    <Container>
      <div className={s.postsGrid}>
      <Slide post={posts[0]} className={s.post1}/>
      <MiniPostCard post={posts[1]} className={s.post2}/>
      <MiniPostCard post={posts[2]} className={s.post3}/>

      </div>
      
    </Container>
  );
};

const Slide = ({ post, className }: any) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    fallbackInView: true,
    threshold: 0.2,
    initialInView: true,
  });

  const rootClass = cn(
    s.postContainer,
    className
  );
  const [loading, setLoading] = useState(true);
  const variant = "secondary";

  const PUBLISHED_DATE = ConvertDate(post?.date);
  const UPDATED_DATE = ConvertDate(post?.modified);
  return (
    <article className={rootClass}>
      <Link
        className={s.coverWrapper}
        href={`/${post?.slug}`}
        aria-label={post?.title}
        ref={ref}
      >
        {loading && <div className={s.loading}></div>}
        <Image
          src={post?.featuredImage?.node?.sourceUrl ?? "/default.webp"}
          alt={post?.featuredImage?.node?.altText ?? ""}
          className={`${s.cover} ${inView && s.showUp}`}
          priority
          width={700}
          height={700}
          quality={100}
          onLoadingComplete={() => setLoading(false)}
        />
      </Link>
      <div className={s.postContent}>
        <div className={s.categoryTime}>
          {post?.categories?.edges?.length >= 1 && (
            <Tag
              category={post?.categories?.edges[0]?.node}
              variant={variant}
              className={s.tag}
            />
          )}
          <div className={s.time}>{post?.readingTime} min read</div>
        </div>
        <div>
          <h3 className={s.postTitle}>
            <Link href={`/${post?.slug}`}>{post?.title}</Link>
          </h3>
        </div>
        <div className={s.categoryTime}>
          <Link
            href={`/author/${post?.author?.node?.slug}`}
            className={s.postAuthor}
          >
            {post?.author?.node?.name}
          </Link>
          <div className={s.date}>
            {PUBLISHED_DATE !== UPDATED_DATE ? UPDATED_DATE : PUBLISHED_DATE}
          </div>
        </div>
        <div>
          <LineButton
            className={s.readMore}
            variant={variant}
            href={`/${post?.slug}`}
            aria={`Read ${post?.title}`}
          >
            Read post{" "}
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
      </div>
    </article>
  );
};

export default FeaturedPost;
