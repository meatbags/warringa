/** App */

class App {
  constructor() {
    this.overlay = document.querySelector('#overlay');
    this.overlayVideo = document.querySelector('#overlay-video');
    this.overlayClose = document.querySelector('#overlay-close');
    this.vids = document.querySelectorAll('.video');

    // bind
    this.vids.forEach(v => {
      v.addEventListener('click', () => {
        this.play(v);
      });
    });
    this.overlayClose.addEventListener('click', () => {
      this.stop();
    });

    // reveal tiles
    this.loadVideos();
    this.revealTiles();
  }

  loadVideos() {
    this.vids.forEach(v => {
      // create iframe
      let iframe = document.createElement('iframe');
      let src = v.dataset.src;
      iframe.allow = 'autoplay';
      iframe.dataset.src = src;
      this.overlayVideo.appendChild(iframe);

      // create player: Youtube
      if (v.dataset.src.indexOf('youtube') !== -1) {
        iframe.onload = () => {
          let parts = v.dataset.src.split('/');
          let videoId = parts[parts.length-1];
          iframe.player = new YT.Player(iframe, {
            videoId: videoId,
            playerVars: {controls: 0},
            events: {
              onReady: evt => { console.log('Youtube player ready:', iframe.player); },
              onStateChange: evt => {
                console.log(evt.data);
                if (evt.data === 0) {
                  this.stop();
                }
              },
              onError: err => { console.log(err); },
            },
          });
        }
        src += '?enablejsapi=1';
        iframe.src = src;
        iframe.dataset.host = 'youtube';

      // create player: Vimeo
      } else if (v.dataset.src.indexOf('vimeo') !== -1) {
        iframe.onload = () => {
          iframe.player = new Vimeo.Player(iframe);
          iframe.player.on('ended', () => {
            this.stop();
          });
          console.log('Vimeo player ready:', iframe.player);
        };
        iframe.src = src;
        iframe.dataset.host = 'vimeo';
      }
    });
  }

  revealTiles() {
    this.vids.forEach((vid, i) => {
      setTimeout(() => {
        vid.classList.remove('hidden');
      }, (i + 1) * 150);
    });
  }

  hideTiles() {
    this.vids.forEach((vid, i) => {
      vid.classList.add('hidden');
    });
  }

  play(v) {
    this.overlay.classList.add('visible');
    let iframe = this.overlay.querySelector(`[data-src="${v.dataset.src}"]`);
    if (iframe) {
      iframe.classList.add('active');

      // play Vimeo
      if (iframe.dataset.host == 'vimeo') {
        iframe.player.play();
        iframe.player.setCurrentTime(0);

      // play Youtube
      } else if (iframe.dataset.host == 'youtube') {
        iframe.player.playVideo();
      }
    }

    setTimeout(() => {
      this.overlay.classList.add('active');
      setTimeout(() => {
        this.hideTiles();
      }, 500);
    }, 100);
  }

  stop() {
    this.overlay.classList.remove('active');
    this.revealTiles();

    setTimeout(() => {
      this.overlay.classList.remove('visible');
      let iframe = this.overlay.querySelector('iframe.active');
      if (iframe) {
        // stop Vimeo
        if (iframe.dataset.host == 'vimeo') {
          iframe.player.pause();
          iframe.player.setCurrentTime(0);

        // stop Youtube
        } else if (iframe.dataset.host == 'youtube') {
          iframe.player.stopVideo();
        }

        iframe.classList.remove('active');
      }
    }, 500);
  }
}

window.addEventListener('load', () => {
  const app = new App();
});
