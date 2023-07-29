"use client"

import PostCard from "../PostCard";
import LineButton from "../ui/LineButton";
import Container from "../ui/container";
import cn from "clsx";
import s from "./PostsSection.module.css";
import { useInView } from "react-intersection-observer";

interface PostsSectionProps {
  data: any;
  variant?: "primary" | "secondary";
  className?: string;
  title?: string;
  link?: any;
}

const PostsSection = ({
  data,
  variant = "primary",
  className,
}: PostsSectionProps) => {
  const [ref, inView] = useInView({
    threshold: 0.05,
    triggerOnce: true,
    fallbackInView: true,
  });
  const rootClassName = cn(
    s.root,
    {
      [s.primary]: variant === "primary",
      [s.secondary]: variant === "secondary",
    },
    className
  );
  const posts = data.posts ?? []
  return (
    <section className={`${rootClassName} ${inView && s.show}`} ref={ref}>
      <div className={s.background}>
        <Container className={s.sectionTopicContainer}>
          <h3 className={s.sectionTopicContainer__title}>{data?.title}</h3>
          {data?.link && (
            <LineButton
              className={s.buttonLine}
              variant={variant}
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
        <div className={s.postsContainer}>
          {posts.slice(0,4).map(( node : any) => {
            return <PostCard key={node?.id} post={node} variant={variant} />;
          })}
        </div>
      </Container>
    </section>
  );
};
export default PostsSection;
