import { useRouter } from "next/router";
import s from "./Search.module.css";
import { useState } from "react";
import Container from "../ui/container";
import LineButton from "../ui/LineButton";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";

const SearchBox = ({ categories = [], tags = [], menuItems }: any) => {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openSearchMobile, setOpenSearchMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setOpenSearchMobile(false);
    setOpenSearchScreen(false);
    setSearchQuery("");
    router.push(`/search?s=${searchQuery}&pageNo=1`);
  };
  const handleChange = (event: any) => {
    setSearchQuery(event.target.value);
  };
  const [openSearchScreen, setOpenSearchScreen] = useState(false);
  return (
    <>
      <div>
        <div className={s.container}>
          <button
            className={s.buttonContainer}
            onClick={() => setOpenSearchScreen((prev) => !prev)}
          >
            <div className={s.button}>
              <svg
                width="16"
                height="16"
                className={s.icon}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="6.5"
                  cy="6.5"
                  r="5.5"
                  stroke="#004C66"
                  strokeWidth="2"
                />
                <line
                  x1="10.0135"
                  y1="10.4606"
                  x2="14.8457"
                  y2="15.2929"
                  stroke="#004C66"
                  strokeWidth="2"
                />
              </svg>
              <span>Search</span>
            </div>
            <div className={s.button}>
              <svg
                width="16"
                height="16"
                className={s.icon}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="6.5"
                  cy="6.5"
                  r="5.5"
                  stroke="#004C66"
                  strokeWidth="2"
                />
                <line
                  x1="10.0135"
                  y1="10.4606"
                  x2="14.8457"
                  y2="15.2929"
                  stroke="#004C66"
                  strokeWidth="2"
                />
              </svg>
              <span>Search</span>
            </div>
          </button>

          <button
            onClick={() => {
              setOpenSearchScreen((prev) => !prev);
              setOpenSearchMobile(false);
            }}
            className={s.mobileButton}
          >
            <span>{!openSearchScreen ? "FILTER" : "CLOSE"}</span>
          </button>
        </div>
      </div>
      <div className={`${s.searchScreen} ${openSearchScreen && s.open}`}>
        {/* Starting dropdown menu in mobile version only */}
        <Container
          className={`${s.mobileDrawer} ${openSearchMobile && s.hide}`}
        >
          <div className={s.dropdown}>
            <div
              className={s.label}
              onClick={() => setOpenDropdown((prevState) => !prevState)}
            >
              <span>Browse by category</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 767.5 1024"
                className={s.icon}
              >
                <path
                  d="m0 384 383.75 383.75L767.5 384H0z"
                  fill="#ffffff"
                  className="fill-000000"
                ></path>
              </svg>
            </div>
            <ul className={`${s.dropdown__list} ${openDropdown && s.opened}`}>
              {menuItems?.map(({ node }: any) => {
                if (node?.childItems?.edges?.length >= 1) {
                  return (
                    <li
                      className={`${s.dropdown__item} ${s.dropdown__parent}`}
                      key={node?.id}
                    >
                      <div className={s.dropdown__link}>
                        <span>{node?.label} </span>
                        <input
                          type="checkbox"
                          className={s.input}
                          id={node?.id}
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 767.5 1024"
                          className={s.icon2}
                        >
                          <path
                            d="m0 384 383.75 383.75L767.5 384H0z"
                            className="fill-000000"
                          ></path>
                        </svg>
                      </div>
                      <div className={s.dropdownContent}>
                        {node?.childItems?.edges?.map(({ nodechild }: any) => {
                          return (
                            <Link
                              key={nodechild?.id}
                              href={nodechild?.uri}
                              className={s.dropdown__link}
                            >
                              {nodechild?.label}
                            </Link>
                          );
                        })}
                      </div>
                    </li>
                  );
                }
                return (
                  <li className={s.dropdown__item} key={node?.id}>
                    <Link href={node?.uri} className={s.dropdown__link}>
                      <span>{node?.label}</span>
                    </Link>
                  </li>
                );
              })}

              {/* In case no menu was set in wordpress display the first 3 categories */}
              {menuItems.length === 0 &&
                categories?.slice(0, 3).map(({ category }: any) => {
                  return (
                    <li className={s.dropdown__item} key={category?.id}>
                      <Link
                        href={`/category/${category?.slug}`}
                        className={s.dropdown__link}
                      >
                        <span>{category?.name}</span>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className={`${s.container} ${s.mobile}`}>
            <button
              className={`${s.button} ${s.mobile}`}
              onClick={() => setOpenSearchMobile(true)}
            >
              <svg
                width="16"
                height="16"
                className={s.icon}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="6.5"
                  cy="6.5"
                  r="5.5"
                  stroke="#009EE2"
                  strokeWidth="2"
                />
                <line
                  x1="10.0135"
                  y1="10.4606"
                  x2="14.8457"
                  y2="15.2929"
                  stroke="#009EE2"
                  strokeWidth="2"
                />
              </svg>
              <span>Search</span>
            </button>
            <button
              className={`${s.button} ${s.mobile}`}
              onClick={() => setOpenSearchMobile(true)}
            >
              <svg
                width="16"
                height="16"
                className={s.icon}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="6.5"
                  cy="6.5"
                  r="5.5"
                  stroke="#009EE2"
                  strokeWidth="2"
                />
                <line
                  x1="10.0135"
                  y1="10.4606"
                  x2="14.8457"
                  y2="15.2929"
                  stroke="#009EE2"
                  strokeWidth="2"
                />
              </svg>
              <span>Search</span>
            </button>
          </div>
          {/* Ending of dropdown menu in mobile version only */}
        </Container>
        <Container>
          <LineButton
            onClick={() => setOpenSearchScreen((prev) => !prev)}
            className={s.buttonLine}
          >
            ← Back
          </LineButton>
          <LineButton
            onClick={() => setOpenSearchMobile(false)}
            className={`${s.buttonLine} ${s.mobile}`}
          >
            ← Back
          </LineButton>

          <form className={s.searchForm} onSubmit={handleSubmit}>
            <label className={s.srOnly} htmlFor="search">
              Search
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={handleChange}
              id="search"
              className={s.input}
              placeholder="Search"
              autoComplete="off"
            />
            <button className={s.buttonSubmit} type="submit">
              <span>Search</span>
              <svg
                className={s.arrow}
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon
                  fillRule="evenodd"
                  points="10.586 9 2 9 2 7 10.586 7 7.293 3.707 8.707 2.293 14.414 8 8.707 13.707 7.293 12.293 10.586 9"
                />
              </svg>
            </button>
          </form>
        </Container>
        <div className={s.categories}>
          <Swiper
            className={s.categories__list}
            slidesPerView={"auto"}
            spaceBetween={30}
            freeMode={true}
            mousewheel={true}
            modules={[FreeMode, Mousewheel]}
          >
            {categories?.map(({ category }: any) => {
              return (
                <SwiperSlide key={category?.id} style={{ width: "unset" }}>
                  <Link
                    href={`/category/${category?.slug}`}
                    className={s.categories__link}
                  >
                    {category?.name}
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <Container>
          <p className={s.tags__title}>Popular tags</p>
          <ul className={s.tags__list}>
            {tags?.slice(0, 10)?.map(({ tag }: any) => {
              return (
                <li key={tag?.id} className={s.tags__item}>
                  <Link href={`/tag/${tag?.slug}`} className={s.tags__link}>
                    {tag?.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </div>
    </>
  );
};
export default SearchBox;
