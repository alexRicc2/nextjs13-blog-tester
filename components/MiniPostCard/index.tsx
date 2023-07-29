"use client"

import Link from "next/link";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import s from "./MiniPostCard.module.css";
import Tag from "../ui/Tag";
import LineButton from "../ui/LineButton";
import cn from "clsx";
import { useState } from "react";
const MiniPostCard = ({ post, variant = "secondary", className }: any) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    fallbackInView: true,
  });
  const [loading, setLoading] = useState(true);

  const rootClass = cn(
    s.root,
    {
      [s.primary]: variant == "primary",
    },
    className
  );

  return (
    <article ref={ref} className={rootClass}>
      <Link
        className={s.coverWrapper}
        href={`/${post?.slug}`}
        aria-label={post?.title}
      >
        {inView ? (
          // eslint-disable-next-line react/jsx-no-undef
          <>
            {loading && <div className={s.loading}></div>}
            <Image
              src={post?.featuredImage?.node?.sourceUrl ?? "/default.webp"}
              alt={post?.featuredImage?.node?.altText ?? ""}
              className={s.cover}
              priority
              width={400}
              height={400}
              onLoadingComplete={() => setLoading(false)}
            />
          </>
        ) : null}
      </Link>
      <div className={s.postContent}>
        <div>
          {post?.categories?.edges?.length >= 1 && (
            <Tag
              className={s.tag}
              category={post?.categories?.edges[0]?.node}
              variant="secondary"
            />
          )}
        </div>
        <h3 className={s.post__title}>
          <Link href={`/${post?.slug}`}>{post?.title}</Link>
        </h3>
        {variant == "secondary" && (
          <div>
            <LineButton
              className={s.buttonLine}
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
        )}
      </div>
    </article>
  );
};
export default MiniPostCard;
