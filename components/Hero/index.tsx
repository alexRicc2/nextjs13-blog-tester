"use client"
import Container from "../ui/container";
import s from "./Hero.module.css";
import { useInView } from "react-intersection-observer";
const Hero = ({title}: any) => {
  const [inViewRef, inView] = useInView({fallbackInView: true, triggerOnce: true});
  return (
    <section className={`${s.root} ${inView && s.show}`} ref={inViewRef}>

    <Container className={`${s.container}`} >
     <h2>{title ? title : 'Talk of the town!'}</h2>
    </Container>
    </section>
  );
};
export default Hero;
