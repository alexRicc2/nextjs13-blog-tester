import s from "./pagination.module.css";
import LineButton from "../ui/LineButton";
const Previous = ({
  currentPageNo,
  postName,
  root = false,
  search = false,
}: any) => {
  if (!currentPageNo) {
    return null;
  }

  // If you are on the first page, dont show previous link.
  if (0 === currentPageNo - 1) {
    return (
      <LineButton className={s.disabled} variant="secondary">
        <svg
          className={s.iconInversed}
          width="12"
          height="11"
          viewBox="0 0 12 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.20904 1.21197L10.711 5.64783L7.20904 10.0837"
            stroke="#333"
            strokeWidth="2"
          />
          <line
            x1="0.205078"
            y1="5.38708"
            x2="10.7111"
            y2="5.38708"
            stroke="#333"
            strokeWidth="2"
          />
        </svg>{" "}
        Prev
      </LineButton>
    );
  }
  let paginationLink: any;
  paginationLink = root
    ? `/page/${currentPageNo - 1}`
    : `${postName}/page/${currentPageNo - 1}/`;
  if (search) {
    paginationLink = `${postName}?s=${search}&pageNo=${currentPageNo - 1}`;
  }
  return (
    <LineButton
      href={paginationLink}
      variant={"secondary"}
      className={s.lineButton}
    >
      <abbr title="Previous page" className="no-underline">
        {" "}
        <svg
          className={s.iconInversed}
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
        </svg>{" "}
        Prev
      </abbr>
    </LineButton>
  );
};

export default Previous;
