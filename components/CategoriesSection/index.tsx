import React, { Key } from "react";
import Container from "../ui/container";
import PostCard from "../PostCard";
import s from "./Categories.module.css";
import Link from "next/link";
function CategoriesSection({ data }: any) {
  return (
    <Container>
      <section className={s.grid}>
        {data?.map((category: any, idx: Key) => {
          return (
            <div key={idx}>
              <h3 className={s.categoryTitle}>
                <Link href={`/category/${category?.slug}`}>
                  {category?.name}
                </Link>
              </h3>
              <div className={s.categoryPosts}>
                <PostCard
                  post={category?.posts?.nodes[0]}
                  variant="secondary"
                  showAuthor
                  dateVariant="secondary"
                  className={s.postCard}
                />
                {category?.posts?.nodes.slice(1, 3).map(( node : any) => {
                  return <div key={node?.id} className={s.postTitle}><Link href={`/${node?.slug}`}>{node?.title}</Link></div>;
                })}
              </div>
            </div>
          );
        })}
      </section>
    </Container>
  );
}

export default CategoriesSection;
