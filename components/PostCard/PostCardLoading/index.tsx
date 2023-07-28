import s from "./PostCardLoading.module.css";
import Tag from "../../ui/Tag";
import cn from "clsx";

const PostCardLoading = () => {
  const rootClassName = cn(s.card);

  return (
    <div className={rootClassName}>
      <div className={s.coverWrapper}></div>
      <div className={s.post__content}>
        <div className={s.categoryTime}>
          <div className="flex items-center gap-2 flex-wrap">
            <Tag category={{ slug: null, name: "loading" }} className={s.tag} />
          </div>
        </div>
        <h3 className={s.post__title}>post loading title</h3>

        <div>
          <div className={s.post__excerpt} />
        </div>
      </div>
    </div>
  );
};
export default PostCardLoading;
