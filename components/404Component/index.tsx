import Head from "next/head";
import LineButton from "../ui/LineButton";
import Container from "../ui/container";
import s from "./Component404.module.css";

const Component404 = () => {
  return (
    <>
    <Head>
    <title> 404 - ULTATEL Blog</title>
    </Head>
    <Container className={s.root}>
      <div className={s.circleWrapper}>
        <div className={s.circle}>
          <h2>404</h2>
        </div>
        <div className={s.circleShadow}></div>
      </div>
      <div className={s.textWrapper}>
        <h1 className={s.title}>Page not found</h1>
        <p className={s.text}>
          OOPS! Page youre looking for doesnt exist. Please use search for help,
          or go to home page
        </p>
        <LineButton href="/" variant="secondary" className={s.lineButton}>← Home page</LineButton>
      </div>
    </Container>
    </>
  );
};
export default Component404