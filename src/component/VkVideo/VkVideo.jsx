import s from './VkVideo.module.css'
import React from 'react';

const VkVideo = ({ video }) => {
  // Функция для преобразования ссылки в формат для iframe
  const generateIframeSrc = (video) => {
    const match = video.match(/video(-?\d+)_(\d+)/);
    if (match) {
      console.log("Match found:", match); // Выводим oid и id для отладки
      const oid = match[1];
      const id = match[2];
      return `https://vk.com/video_ext.php?oid=${oid}&id=${id}&hd=1`;
    }
    console.warn("No match found for video:", video); // Сообщаем, если не удалось извлечь данные
    return null;
  };
  

  const iframeSrc = generateIframeSrc(video);

  // Если ссылка некорректна, выводим сообщение об ошибке
  if (!iframeSrc) {
    return <p>Invalid video URL</p>;
  }

  const getPlayerUrl = async (kinopoiskId) => {
    try {
        const response = await fetch(`https://kinobox.tv/api/players?kinopoisk=${kinopoiskId}`);
        const data = await response.json();
        
        if (data.length > 0 && data[0].translations.length > 0) {
            // Получаем ссылку на iframe c нужной озвучкой
            return data[0].translations[0].iframeUrl;
        } else {
            console.log("Плеер не найден");
        }
    } catch (error) {
        console.error("Ошибка при получении данных", error);
    }
};

getPlayerUrl("258687").then((iframeUrl) => {
    if (iframeUrl) {
        document.getElementById("movie-player").src = iframeUrl;
    }
});


  return (
    <iframe
      className={s.VkVideo}
      src={iframeSrc}
      width="640"
      height="360"
      allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  );
};

export default VkVideo;
