(() => {
  const hero = document.querySelector(".hero-city, .hero-thai, .mag-hero, .bangkok-hero, .hero");
  if (!hero || hero.querySelector("video")) return;
  hero.classList.add("thailand-video-hero");

  const tropicalThailandVideo = "https://videos.pexels.com/video-files/17098010/17098010-uhd_2560_1440_30fps.mp4";
  const video = document.createElement("video");
  video.className = "thailand-guide-video";
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = "metadata";
  video.setAttribute("aria-hidden", "true");

  const source = document.createElement("source");
  source.src = tropicalThailandVideo;
  source.type = "video/mp4";
  video.appendChild(source);

  const shade = document.createElement("div");
  shade.className = "thailand-guide-video-shade";
  hero.prepend(shade);
  hero.prepend(video);
})();
