"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Container from "../ui/container";
import LineButton from "../ui/LineButton";
import s from "./Post.module.css";
import { useInView } from "react-intersection-observer";
import PostInfo from "../PostInfo";
import { sanitize } from "../../utils/miscellaneous";
import Seo from "../SEO";
import MorePosts from "../MorePosts";
import Link from "next/link";
import Comments from "../Comments";
import { ENABLE_COMMENTS } from "../../utils/constans";
import MiniPostCard from "../MiniPostCard";
import { useState } from "react";
export default function Post({ post, posts, relatedPosts }: any) {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isAuthorHaveFullName =
    post?.author?.node?.firstName && post?.author?.node?.lastName;
  const name = isAuthorHaveFullName
    ? `${post?.author.node.firstName} ${post?.author.node.lastName}`
    : post?.author.node.name || null;
  const isUltatelAuthor = post?.author?.node?.firstName === "ULTATEL";
  const sidePosts =
    relatedPosts?.length > 0
      ? relatedPosts
      : posts?.edges?.map(({ node }: any) => node);

  return (
    <>
      {/* <Seo seo={post?.seo} uri={post?.slug} /> */}
      {/* <Head>
        {post?.seo?.schemaDetails && (
          <script
            type="application/ld+json"
            className="yoast-schema-graph"
            key="yoastSchema"
            dangerouslySetInnerHTML={{
              __html: sanitize(post?.seo?.schemaDetails),
            }}
          />
        )}
      </Head> */}

      <div>
     
          <div style={{overflow: "hidden"}}>
            <div className={s.root}>
              <Container className={s.header}>
                <div className={s.header__button}>
                  <LineButton
                    className={s.lineButton}
                    onClick={() => router.back()}
                  >
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
                        stroke="white"
                        strokeWidth="2"
                      />
                      <line
                        x1="0.205078"
                        y1="5.38708"
                        x2="10.7111"
                        y2="5.38708"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </svg>{" "}
                    Back
                  </LineButton>
                </div>
                <div className={s.header__content}>
                  <div className="flex gap-6 mb-3 flex-wrap items-center">
                    <div>
                      <Link
                        href={`/category/${post?.categories?.edges[0].node?.slug}`}
                        className={s.postTag}
                      >
                        {post?.categories?.edges[0].node?.name}
                      </Link>
                    </div>
                    <div className={s.time}>{post?.readingTime} min read</div>
                  </div>
                  <h1 className={s.postTitle}>{post?.title}</h1>
                </div>
              </Container>
              <Container className={s.grid}>
                <PostInfo PostInfo={post} className={s.gridItem} />
              </Container>
            </div>
            <div className={s.post}>
              <Container className={s.postLayout}>
                <div className={s.postInfo}>
                  <div className={s.postInfo__container}>
                    <div>
                      <h3 className={s.tagTitle}>TAGS</h3>
                      <ul className="flex flex-wrap gap-6">
                        {post?.tags?.edges?.map(({ node }: any) => {
                          return (
                            <li key={node?.id} className={s.tag}>
                              <Link href={`/tag/${node?.slug}`}>
                                {node?.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    {relatedPosts && (
                      <div>
                        <h3 className={s.relatedTitle}>
                          {relatedPosts.length > 0
                            ? "Related Posts"
                            : "Recent Posts"}
                        </h3>
                        <div className={s.relatedPosts}>
                          {sidePosts?.map((post: any) => {
                            return (
                              <MiniPostCard
                                post={post}
                                key={post?.id}
                                className={s.minipost}
                                variant="primary"
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className={s.postContent}>
                  <div className={s.coverImageWrapper} ref={ref}>
                    {loading && <div className={s.loading}></div>}
                    <Image
                      src={
                        post?.featuredImage?.node?.sourceUrl ?? "/default.jpg"
                      }
                      alt={post?.featuredImage?.node?.altText ?? ""}
                      width={800}
                      height={400}
                      className={`${s.coverImage} ${inView && s.showUp}`}
                      priority
                      quality={100}
                      placeholder="blur"
                      blurDataURL="/blur.jpg"
                      onLoadingComplete={() => setLoading(false)}
                    />
                  </div>
                  <div style={{ marginTop: "-10rem" }}>
                    <PostInfo PostInfo={post} className={s.mobileINFO} />
                    <div
                      dangerouslySetInnerHTML={{ __html: post?.content }}
                      className={s.content}
                    />

                    <div className={s.authorInfo}>
                      <Link
                        href={`/author/${post?.author?.node?.slug}`}
                        className={s.imageWrapper}
                      >
                        <Image
                          src={
                            isUltatelAuthor
                              ? "/ULTATEL_Profile.webp"
                              : post?.author?.node?.avatar?.url ??
                                "/default-user.webp"
                          }
                          fill
                          className={`${s.image} ${
                            isUltatelAuthor && s.ultatel
                          }`}
                          alt={name}
                          sizes="40px"
                        />
                      </Link>
                      <div className={s.authorName}>
                        <Link href={`/author/${post?.author?.node?.slug}`}>
                          {name}
                        </Link>
                      </div>
                    </div>
                    <p className={s.authorDescription}>
                      {post?.author?.node?.description}
                    </p>
                  </div>
                  {ENABLE_COMMENTS && (
                    <Comments databaseId={post?.databaseId} id={post?.id} />
                  )}
                </div>
              </Container>
              {posts && <MorePosts posts={posts} />}
            </div>
          </div>
        
      </div>
    </>
  );
}
