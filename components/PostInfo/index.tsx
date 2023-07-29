import s from "./PostInfo.module.css";
import cn from "clsx";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { ConvertDateToNumber } from "../../utils/convertDate";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
} from "next-share";
import Link from "next/link";
import { ENABLE_POSTS_VIEWS_COUNT } from "../../utils/constans";
import { useEffect, useState } from "react";
import Facebook from "../Icons/Facebook";
import Twitter from "../Icons/Twitter";
import Linkedin from "../Icons/Linkedin";
import Email from "../Icons/Email";
import { useInView } from "react-intersection-observer";
const PostInfo = ({ PostInfo, className }: any) => {
  const rootClassName = cn(s.root, className);
  const pathname = usePathname();
  const [viewsCount, setViewsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingImage, setLoadingImage] = useState(true);
  const [inViewRef, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (ENABLE_POSTS_VIEWS_COUNT) {
      fetch(`/api/getViews?slug=${PostInfo?.slug}`)
        .then((res) => res.json())
        .then((data) => {
          setViewsCount(data.viewsCount);
          setLoading(false);
        })
        .catch((err) => console.log(err));
      const timer = setTimeout(() => {
        fetch(`/api/incrementViews?slug=${PostInfo?.slug}`, {
          method: "POST",
        })
          .then((res) => res.json())
          .then((data) => setViewsCount(data.viewsCount));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [PostInfo?.slug]);
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}${pathname}`;
  const isAuthorHaveFullName =
    PostInfo?.author?.node?.firstName && PostInfo?.author?.node?.lastName;
  const name = isAuthorHaveFullName
    ? `${PostInfo?.author.node.firstName} ${PostInfo?.author.node.lastName}`
    : PostInfo?.author.node.name || null;

  const PUBLISHED_DATE = ConvertDateToNumber(PostInfo?.date);
  const UPDATED_DATE = ConvertDateToNumber(PostInfo?.modified);
  return (
    <div className={rootClassName}>
      <div className={s.authorInfo} ref={inViewRef}>
        {inView && (
          <Link
            href={`/author/${PostInfo?.author?.node?.slug}`}
            className={s.imageWrapper}
          >
            {loadingImage && <div className={s.loading}></div>}
            <Image
              src={
                PostInfo?.author?.node?.firstName === "ULTATEL"
                  ? "/ULTATEL_Profile.webp"
                  : PostInfo?.author?.node?.avatar?.url ?? "/default-user.webp"
              }
              fill
              className={s.image}
              alt={name}
              sizes="180px"
              priority
              quality={100}
              onLoadingComplete={() => setLoadingImage(false)}
            />
          </Link>
        )}
        <div style={{ flex: 1 }}>
          <Link
            href={`/author/${PostInfo?.author?.node?.slug}`}
            className={s.authorName}
          >
            {name}
          </Link>
        </div>
      </div>
      <div className={s.publishedContainer}>
        <div>Published</div>
        <div>{PUBLISHED_DATE}</div>
      </div>
      {PUBLISHED_DATE !== UPDATED_DATE && (
        <div className={s.publishedContainer}>
          <div>Updated</div>
          <div>{UPDATED_DATE}</div>
        </div>
      )}
      {/* {ENABLE_POSTS_VIEWS_COUNT && (
        <div className={s.publishedContainer}>
          <div>VIEWS</div>
          <div>{loading ? "Loading.." : viewsCount}</div>
        </div>
      )} */}
      <div className={s.shareContainer}>
        <div>share</div>
        <div className={s.shareMobile}>
          <FacebookShareButton
            url={URL}
            quote={PostInfo?.title}
            hashtag={"#Ultatel"}
          >
            <Facebook className={s.icon} color="#fff" />
          </FacebookShareButton>
          <TwitterShareButton
            url={URL}
            title={PostInfo?.title}
            hashtags={["Ultatel"]}
          >
            <Twitter className={s.icon} color="#fff" />
          </TwitterShareButton>
          <LinkedinShareButton url={URL}>
            <Linkedin className={s.icon} color="#fff" />
          </LinkedinShareButton>
          <EmailShareButton url={URL} subject={PostInfo?.title}>
            <Email className={s.iconEmail} />
          </EmailShareButton>
        </div>
        <div className={s.shareDesktop}>
          <FacebookShareButton
            url={URL}
            quote={PostInfo?.title}
            hashtag={"#Ultatel"}
          >
            <Facebook className={s.icon} color="transparent" />
          </FacebookShareButton>
          <TwitterShareButton
            url={URL}
            title={PostInfo?.title}
            hashtags={["Ultatel"]}
          >
            <Twitter className={s.icon} color="#40baee" />
          </TwitterShareButton>
          <LinkedinShareButton url={URL}>
            <Linkedin className={s.icon} color="#40baee" />
          </LinkedinShareButton>
          <EmailShareButton url={URL} subject={PostInfo?.title}>
            <Email className={s.iconEmail} />
          </EmailShareButton>
        </div>
      </div>
    </div>
  );
};
export default PostInfo;
