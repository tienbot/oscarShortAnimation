import s from "./MegaVideo.module.css";

export const MegaVideo = ({ video }) => {
  // Если ссылка некорректна, выводим сообщение об ошибке
  //   if (!iframeSrc) {
  //     return <p>Invalid video URL</p>;
  //   }

  function convertMegaLink(embedLink) {
    return embedLink.replace('/file/', '/embed/');
  }

  return (
    // <iframe
    // //   className={s.VkVideo}
    //   src={video}
    //   width="640"
    //   height="360"
    //   allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
    //   frameBorder="0"
    //   allowFullScreen
    // ></iframe>

    // <iframe
    //   width="640"
    //   height="360"
    //   frameborder="0"
    //   src={video}
    //   allowfullscreen
    // ></iframe>

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
