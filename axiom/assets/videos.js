document.querySelectorAll('.video-launch[data-video-id]').forEach(link => {
  link.addEventListener('click', event => {
    const videoId = link.dataset.videoId;
    if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) return;

    event.preventDefault();
    const player = document.createElement('iframe');
    player.title = link.closest('.video-card').querySelector('h3').textContent;
    player.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&playsinline=1';
    player.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
    player.allowFullscreen = true;
    player.referrerPolicy = 'strict-origin-when-cross-origin';
    link.replaceWith(player);
    player.focus({ preventScroll: true });
  });
});
