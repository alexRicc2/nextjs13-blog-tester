import Link from "next/link";
import Container from "../ui/container";
import SearchBox from "../SearchBox";
import Image from "next/image";
import s from "./Header.module.css";
import AnnouncementBar from "../AnnouncementBar";
const Header = ({ headerData }: any) => {
  const categories = headerData?.categories ?? [];
  const tags = headerData?.tags ?? [];
  const menuItems = headerData?.header?.menu?.menuItems?.edges ?? [];
  return (
    <header className={s.header}>
      <AnnouncementBar announcementText={headerData?.announcementText} />
      <Container className={s.cont}>
        <nav className={s.header__navigation}>
          <div className={s.dropdown}>
            <div className={s.label}>
              <span>Browse by Category</span>
              <svg
                width="15"
                height="10"
                viewBox="0 0 15 10"
                fill="none"
                className={s.icon}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.8076 1.19238L7.40381 7.59619L1 1.19238"
                  stroke="#004C66"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <ul className={s.dropdown__list}>
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
                              href={
                                nodechild?.uri.includes("http")
                                  ? nodechild?.uri
                                  : `/${nodechild?.uri}`
                              }
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
                    <Link
                      href={
                        node?.uri.includes("http") ? node?.uri : `/${node?.uri}`
                      }
                      className={s.dropdown__link}
                    >
                      <span>{node?.label}</span>
                    </Link>
                  </li>
                );
              })}
              {/* In case no menu was set in wordpress display the first 3 categories */}
              {menuItems.length === 0 &&
                headerData?.categories?.slice(0, 3).map(({ category }: any) => {
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
          <Link href="/" aria-label="home" className={s.logoLink__mobile}>
            <Image
              src="/logo-ultatel.webp"
              // src={headerData?.getHeader?.siteLogoUrl ?? "/logo-ultatel.webp"}
              alt="logo"
              priority
              width={150}
              height={60}
              style={{ objectFit: "contain" }}
              className={s.logo}
            />
            <span>blog</span>
          </Link>

          <SearchBox
            categories={categories}
            tags={tags}
            menuItems={menuItems}
          />
        </nav>
      </Container>
    </header>
  );
};
export default Header;
