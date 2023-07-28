import { useInView } from 'react-intersection-observer';

const LazyLoadContent = ({ children }: any) => {
  const [inViewRef, inView] = useInView({
    triggerOnce: true, // Render only once when it comes into view
    threshold: 0.5
  });


  return <div ref={inViewRef} style={{ minHeight: '10px'}}>{inView ? children : null}</div>;
};

export default LazyLoadContent;