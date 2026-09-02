// ani 2 ảnh
window.addEventListener('DOMContentLoaded', () => {
    const imgs = document.querySelectorAll('.gt_img');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.3
    });

    imgs.forEach(img => observer.observe(img));
});




// 3 ảnh
window.addEventListener('scroll', () => 
{
    document.querySelectorAll('.img_small').forEach(el => 
    {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0)
        {
            // el.classList.add('album_hihi');
            el.classList.remove('js_left');
            el.classList.remove('js_right');
        }
    });
});

window.addEventListener('scroll', () => {
    const el = document.querySelector('.img_big');
    if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.remove('js_center');
        }
    }
});

// lời mời




// cf nha
document.addEventListener('DOMContentLoaded', () => {
    const cfContainer = document.querySelector('.cf_container');

    if (cfContainer) {
        const observer2 = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, {
            threshold: 0.3
        });

        observer2.observe(cfContainer);
    }
});




// hai gia đình
document.addEventListener('DOMContentLoaded', () => {
    const familyContainer = document.querySelector('.family_container');

    if (familyContainer) {
        const observerFamily = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.3 });

        observerFamily.observe(familyContainer);
    }
});




// ani album
window.addEventListener('scroll', () => 
{
    document.querySelectorAll('.js_album').forEach(el => 
    {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0)
        {
            // el.classList.add('album_hihi');
            el.classList.remove('album_left');
            el.classList.remove('album_right');
        }
        // else
        // {
        //     el.classList.add('album_left');
        //     el.classList.add('album_right');
        // }
    });
});

// thank
document.addEventListener('DOMContentLoaded', () => {
    const thankDesc = document.querySelector('.thank_desc');

    if (thankDesc) {
        const observer3 = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.3 });

        observer3.observe(thankDesc);
    }
});


// nhạc
window.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('myAudio');
    const indicator = document.getElementById('audioIndicator');
  
    const playAudio = () => {
      if (!audio.paused) return;
  
      audio.play()
        .then(() => {
          console.log('Phát nhạc thành công');
          indicator.style.display = 'none'; // ẩn cái loa
          removeListeners();
        })
        .catch((err) => {
          console.warn('Trình duyệt chặn phát nhạc:', err);
          // Vẫn giữ loa lại để chờ thao tác khác
        });
    };
  
    const removeListeners = () => {
      ['click', 'scroll', 'touchstart', 'mousemove', 'keydown'].forEach(evt => {
        window.removeEventListener(evt, playAudio);
        document.removeEventListener(evt, playAudio);
      });
    };
  
    // Gán tất cả sự kiện tương tác
    ['click', 'scroll', 'touchstart', 'mousemove', 'keydown'].forEach(evt => {
      window.addEventListener(evt, playAudio);
      document.addEventListener(evt, playAudio);
    });
  });
  
  




  // video cưới - nhúng YouTube, tự phát (tắt tiếng) khi cuộn tới
// và tự dừng/phát lại nhạc nền theo trạng thái phát của video
let ytPlayer = null;
let ytAutoStarted = false;
let ytVideoInView = false;
let ytUserInteracted = false; // đã có thao tác thật của người dùng trên trang chưa

function onYouTubeIframeAPIReady() {
    const target = document.getElementById('yt-video');
    if (!target) return;

    ytPlayer = new YT.Player('yt-video', {
        videoId: '26uBc2wTu2g',
        playerVars: {
            rel: 0,
            playsinline: 1,
            mute: 1
        },
        events: {
            onReady: function (event) {
                event.target.setVolume(100);
                // nếu người dùng đã từng tương tác với trang trước khi video sẵn sàng
                // thì bật tiếng luôn (trình duyệt cho phép vì đã có thao tác thật)
                if (ytUserInteracted) {
                    event.target.unMute();
                }
                if (ytVideoInView && !ytAutoStarted) {
                    ytPlayer.playVideo();
                    ytAutoStarted = true;
                }
            },
            onStateChange: onPlayerStateChange
        }
    });
}

// chỉ bật tiếng video SAU KHI có thao tác thật (click/cuộn/chạm...) của người dùng,
// vì trình duyệt luôn ép về 0 nếu bật tiếng tự động mà chưa có tương tác nào
function unlockYtVolume() {
    if (ytUserInteracted) return;
    ytUserInteracted = true;

    if (ytPlayer && typeof ytPlayer.unMute === 'function') {
        ytPlayer.unMute();
        ytPlayer.setVolume(100);
    }

    ['click', 'scroll', 'touchstart', 'mousemove', 'keydown'].forEach(evt => {
        window.removeEventListener(evt, unlockYtVolume);
        document.removeEventListener(evt, unlockYtVolume);
    });
}

['click', 'scroll', 'touchstart', 'mousemove', 'keydown'].forEach(evt => {
    window.addEventListener(evt, unlockYtVolume);
    document.addEventListener(evt, unlockYtVolume);
});

function onPlayerStateChange(event) {
    const audio = document.getElementById('myAudio');
    if (!audio) return;

    if (event.data === YT.PlayerState.PLAYING) {
        // video đang phát -> dừng nhạc nền web để nghe nhạc/âm thanh của video
        audio.pause();
    } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
        // video dừng hoặc kết thúc -> tự động phát lại nhạc nền
        audio.play().catch(() => {});
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const videoWrap = document.querySelector('.video_wrap');
    if (!videoWrap) return;

    const videoObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                ytVideoInView = true;

                if (ytPlayer && typeof ytPlayer.playVideo === 'function' && !ytAutoStarted) {
                    ytPlayer.playVideo();
                    ytAutoStarted = true;
                }
            }
        });
    }, { threshold: 0.5 });

    videoObserver.observe(videoWrap);
});
