import { useRouter } from "next/router";
import LineButton from "../ui/LineButton";
import Container from "../ui/container";
import s from "./AuthorInfo.module.css";
import Image from "next/image";

const AuthorInfo = ({ author }: any) => {
  const numberOfPosts = author?.user?.posts?.pageInfo?.offsetPagination?.total;
  const router = useRouter();
  const isUltatelAuthor = author?.user?.firstName === "ULTATEL";
  console.log("author", author);
  return (
    <div  className={s.root}>
      <Container>
        <LineButton onClick={() => router.back()} className={s.lineButton}>
          ← Back
        </LineButton>
        <div className={s.wrapper}>
          <div>
            <Image
              src={
                isUltatelAuthor
                  ? "/ULTATEL_Profile.webp"
                  : author?.user?.avatar?.url ?? "/default-user.png"
              }
              width={100}
              height={100}
              quality={100}
              priority
              alt=""
              style={{ borderRadius: isUltatelAuthor ? 0 : "50%" }}
              className={s.image}
            />
          </div>

          <div>
            <h2 className={s.name}>{author?.user?.name}</h2>
            <p className={s.description}>{author?.user?.description} </p>
          </div>
        </div>
        <span className={s.results}>
          {numberOfPosts !== 0 ? (
            <span className={s.results}>
              {numberOfPosts} {numberOfPosts === 1 ? "Post" : "Posts"}
            </span>
          ) : (
            <span className={s.results}>No Posts written</span>
          )}
        </span>
      </Container>
    </div>
  );
};
export default AuthorInfo;
