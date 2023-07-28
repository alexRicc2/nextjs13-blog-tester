import Link from "next/link";
import Container from "../ui/container";
import s from "./footer.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import Facebook from "../Icons/Facebook";
import Twitter from "../Icons/Twitter";
import Linkedin from "../Icons/Linkedin";
import Instagram from "../Icons/Instagram";
import Youtube from "../Icons/Youtube";
import Vimeo from "../Icons/Vimeo";
const Footer = ({ categories }: any) => {
  return (
    <footer className={s.bgWrapper}>
      <Container>
        <Link href="/">
          <Image
            src={"/logo_white_resized.png"}
            alt="ultatel logo"
            width={150}
            height={57.55}
            style={{ objectFit: "cover", width: "auto", height: "auto" }}
            className={s.logo}
          />
        </Link>
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
        <div className={s.grid}>
          <ul>
            <li>
              <a href="tel:844-858-2835">
                Sales: 1-844-ULTATEL (844-858-2835){" "}
              </a>
              <br />
              <a href="https://www.ultatel.com/contact-us/" target="_blank"  rel="noreferrer">
                sales@ultatel.com
              </a>
            </li>
            <li>
              <a href="tel:+1.800.930.9912">Support: 1.800.930.9912</a>
              <br />
              <a href="https://www.ultatel.com/contact-us/" target="_blank" rel="noreferrer">
                support@ultatel.com
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="https://www.ultatel.com/plans-prices/">
                Plans & Pricing
              </a>
            </li>
            <li>
              <a href="https://www.ultatel.com/">Hosted PBX</a>
            </li>
            <li>
              <a
                href="https://www.ultatel.com/voip-business-phone/"
                target="_blank"
                rel="noreferrer"
              >
                Bussines Phones
              </a>
            </li>
          </ul>
          <div className={s.icons}>
            <Link
              href="https://web.facebook.com/UltaTel/"
              aria-label="Facebook"
            >
              <Facebook className={s.icon} color="#009EE2" />
            </Link>
            <Link
              href="https://twitter.com/intent/user?screen_name=ultatel"
              aria-label="Twitter"
            >
              <Twitter className={s.icon} color="#009EE2" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/ultatel/"
              aria-label="Linkedin"
            >
              <Linkedin className={s.icon} color="#009EE2" />
            </Link>
            <Link
              href="https://www.instagram.com/ultatel/"
              aria-label="Instagram"
            >
              <Instagram className={s.icon} />
            </Link>
            <Link href="https://www.youtube.com/@ULTATEL" aria-label="Youtube">
              <Youtube className={s.icon} color="#009EE2" />
            </Link>
            <Link href="https://vimeo.com/user148840021" aria-label="Youtube">
              <Vimeo className={s.icon} color="#009EE2" />
            </Link>
          </div>
        </div>
        <div className={s.copyRight}>
          <h3>COPYRIGHT 2023 ULTATEL, LLC | ALL RIGHTS RESERVED</h3>
          <ul className="flex flex-wrap gap-3">
            <li>
              <a href="https://www.ultatel.com/contact-us/">CONTACT</a>
            </li>
            <li>
              <a href="https://www.ultatel.com/privacy/">PRIVACY POLICY</a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
