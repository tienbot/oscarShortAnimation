import s from './YoutubeVideo.module.css'

const YoutubeVideo = ({ video }) => {

  return (
    <iframe
      className={s.YoutubeVideo}
      src={video}
      width="640"
      height="360"
      allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  );
};

export default YoutubeVideo;
