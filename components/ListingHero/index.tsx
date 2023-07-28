import LineButton from "../ui/LineButton";
import Container from "../ui/container";
import s from "./ListingHero.module.css";
const ListingHero = ({ title, results }: any) => {
  return (
    <section className={s.root}>
      <Container className={s.header}>
        <LineButton href="/">← Back to overview</LineButton>
        <h1 className={s.title}>{title}</h1>
        {results !== 0 ? (
          <span className={s.results}>
            {results} {results === 1 ? "RESULT" : "RESULTS"}
          </span>
        ) : (
          <span className={s.results}>No results found</span>
        )}
      </Container>
    </section>
  );
};
export default ListingHero;
