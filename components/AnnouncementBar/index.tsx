import s from "./AnnouncementBar.module.css";
const AnnouncementBar = ({ announcementText }: any) => {
  return (
    <div className={s.root}>
      {!announcementText ? (
        <div dangerouslySetInnerHTML={{ __html: announcementText }}  className={s.content}/>
      ) : (
        <a href="https://www.ultatel.com/" className={s.link}>
          <span>VISIT OUR MAIN WEBSITE</span>
        </a>
      )}
    </div>
  );
};
export default AnnouncementBar;
