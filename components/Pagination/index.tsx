import { useRouter } from "next/router";
import { createPaginationLinks } from "../../utils/pagination";
import Previous from "./previous";
import Next from "./next";
import s from "./pagination.module.css";

const Pagination = ({
  pagesCount,
  postName,
  className = "",
  root = false,
  search = false,
}: any) => {
  const router = useRouter();
  if ((!pagesCount || !postName) && !root) {
    return null;
  }
  let currentPageNo: number;
  currentPageNo = parseInt(router?.query?.pageNo as string) || 1;
  const paginationLinks = createPaginationLinks(currentPageNo, pagesCount);

  return (
    <div className={`${s.pagination} ${className}`}>
      <Previous
        currentPageNo={currentPageNo}
        postName={postName}
        root={root}
        search={search}
      />

     
      <Next
        currentPageNo={currentPageNo}
        pagesCount={pagesCount}
        postName={postName}
        root={root}
        search={search}
      />
    </div>
  );
};
export default Pagination;
