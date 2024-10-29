import s from "./MegaVideo.module.css";

export const MegaVideo = ({ video }) => {

  function convertMegaLink(embedLink) {
    return embedLink.replace('/file/', '/embed/');
  }

  return (
    <iframe
      className={s.MegaVideo}
      width="640"
      height="360"
      frameBorder="0"
      src = {convertMegaLink(video)}
      allowFullScreen
    ></iframe>
  );
};
