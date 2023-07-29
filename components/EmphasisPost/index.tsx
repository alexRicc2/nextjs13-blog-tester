"use client"

import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import s from "./EmphasisPost.module.css";
import Container from "../ui/container";
import LineButton from "../ui/LineButton";
import Tag from "../ui/Tag";
import MiniPostCard from "../MiniPostCard";
import { useState } from "react";
import { ConvertDate } from "../../utils/convertDate";
const EmphasisPost = ({ data }: any) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    fallbackInView: true,
  });
  const [loading, setLoading] = useState(true);
  const variant = "secondary";
  const post = data?.posts[0];
  const morePosts = data?.posts?.slice(1, 4);
  const PUBLISHED_DATE = ConvertDate(post.date);
  const UPDATED_DATE = ConvertDate(post.modified)
  return (
    <section>
      <div className={s.background}>
        <Container className={s.flex}>
          <h3 className={s.title}>{data?.title}</h3>
          {data?.link && (
            <LineButton
              className={s.lineButton}
              variant="primary"
              href={data?.link}
            >
              See All{" "}
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
          )}
        </Container>
      </div>

      <Container className={s.container}>
        <div className={s.postContainer}>
          <Link
            className={s.coverWrapper}
            href={`/${post?.slug}`}
            aria-label={post?.title}
            ref={ref}
          >
            {inView && (
              <>
                {loading && <div className={s.loading}></div>}
                <Image
                  src={post?.featuredImage?.node?.sourceUrl ?? "/default.webp"}
                  alt={post?.featuredImage?.node?.altText ?? ""}
                  quality={100}
                  className={`${s.cover} ${inView && s.show}`}
                  width={700}
                  height={700}
                  onLoadingComplete={() => setLoading(false)}
                  priority
                />
              </>
            )}
          </Link>
          <div className={s.postContent}>
            <div className={s.categoryTime}>
              {post?.categories?.edges?.length >= 1 && (
                <Tag
                  category={post?.categories?.edges[0]?.node}
                  variant={variant}
                />
              )}
              <div className={s.time}>{post?.readingTime} min read</div>
            </div>
            <div>
              <h3 className={s.postTitle}>
                <Link href={`/${post?.slug}`}>{post?.title}</Link>
              </h3>
            </div>
            <div>
              <div className={s.categoryTime}>
                <Link
                  href={`/author/${post?.author?.node?.slug}`}
                  className={s.postAuthor}
                >
                  {post?.author?.node?.name}
                </Link>
                <div className={s.date}>{PUBLISHED_DATE !== UPDATED_DATE ? UPDATED_DATE : PUBLISHED_DATE}</div>
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
        </div>
      </Container>
      <div className={s.background}>
        <Container className={s.morePostsContainer}>
          {morePosts?.slice(0, 3)?.map(( node : any) => {
            return <MiniPostCard key={node?.id} post={node} />;
          })}
        </Container>
      </div>
    </section>
  );
};
export default EmphasisPost;
