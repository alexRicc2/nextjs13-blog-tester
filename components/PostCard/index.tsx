import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import s from "./PostCard.module.css";
import Tag from "../ui/Tag";
import LineButton from "../ui/LineButton";
import cn from "clsx";
import { useState } from "react";
import { ConvertDate } from "../../utils/convertDate";
interface PostCardProps {
  post: any;
  variant?: "primary" | "secondary";
  className?: string;
  showAuthor?: boolean;
  dateVariant?: "primary" | "secondary";
}

const PostCard = ({
  post,
  variant = "primary",
  className,
  showAuthor = false,
  dateVariant = "primary",
}: PostCardProps) => {
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    fallbackInView: true,
  });
  const [ref2, inView2] = useInView({
    triggerOnce: true,
    fallbackInView: true,
    threshold: 0.15,
  });

  const PUBLISHED_DATE = ConvertDate(post.date);
  const UPDATED_DATE = ConvertDate(post.modified);

  const rootClassName = cn(
    s.card,
    {
      [s.primary]: variant === "primary",
      [s.secondary]: variant === "secondary",
    },
    className
  );
  return (
    <div className={rootClassName} ref={ref}>
      <Link
        className={s.coverWrapper}
        href={`/${post?.slug}`}
        aria-label={post?.title}
      >
        {inView && (
          <>
            {loading && <div className={s.loading}></div>}
            <div ref={ref2}>
              <Image
                src={post?.featuredImage?.node?.sourceUrl ?? "/default.webp"}
                alt={post?.featuredImage?.node?.altText ?? ""}
                quality={90}
                className={`${s.cover} ${inView2 && s.show}`}
                width={700}
                height={700}
                onLoadingComplete={() => setLoading(false)}
                priority
              />
            </div>
          </>
        )}
      </Link>
      <div className={s.post__content}>
        <div className={s.categoryTime}>
          {post?.categories?.edges?.length >= 1 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag
                category={post?.categories?.edges[0]?.node}
                variant={variant}
                className={s.tag}
              />
            </div>
          )}

          {post?.readingTime !== undefined && (
            <div className={s.time}>{post?.readingTime} min read</div>
          )}
          {dateVariant === "secondary" && (
            <div className={s.date}>
              {PUBLISHED_DATE !== UPDATED_DATE ? UPDATED_DATE : PUBLISHED_DATE}
            </div>
          )}
        </div>
        <h3 className={s.post__title}>
          <Link href={`/${post?.slug}`}>{post?.title}</Link>
        </h3>
        {showAuthor && (
          <div>
            <Link
              href={`/author/${post?.author?.node?.slug}`}
              className={s.author}
            >
              {post?.author?.node?.name}
            </Link>
          </div>
        )}
        <div className={s.buttonAndDate}>
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
                stroke={variant === "primary" ? "white" : "#004C66"}
                strokeWidth="2"
              />
              <line
                x1="0.205078"
                y1="5.38708"
                x2="10.7111"
                y2="5.38708"
                stroke={variant === "primary" ? "white" : "#004C66"}
                strokeWidth="2"
              />
            </svg>
          </LineButton>
          {dateVariant === "primary" && (
            <div className={s.date}>
              {PUBLISHED_DATE !== UPDATED_DATE ? UPDATED_DATE : PUBLISHED_DATE}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default PostCard;
