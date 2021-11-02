<!DOCTYPE html>
<html>
  <head>
    <title>Waringarri | Video Library</title>
    <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'>
    <link rel='stylesheet' href='build/style.min.css'>
    <script src='build/app.min.js'></script>
    <script src='build/vimeo-player.js'></script>
    <script src='https://www.youtube.com/iframe_api'></script>
    <script type='text/javascript'>
      function onYouTubeIframeAPIReady() {
        console.log('Youtube API Ready');
      }
    </script>
  </head>
  <body style='background-image:url(img/background.jpg)'>
    <div class='nav'>
      <div class='nav__logo'>
        <img src='img/logo.png' alt='Waringarri Logo'>
      </div>
    </div>
    <div class='videos'>
      <div class='videos__inner'>
        <?php
        // TODO: pull from filesystem
        $vids = array(
          array('Waringarri Aboriginal Arts Centre', 'https://player.vimeo.com/video/130955942?h=793ed20290', 'img/waringarri-aboriginal-arts-centre.jpg'),
          array('Waringarri Textiles', 'https://player.vimeo.com/video/168423977', 'img/waringarri-textiles.jpg'),
          array('Waringarri Arts Tour', 'https://www.youtube.com/embed/B-_IR3slnio', 'img/waringarri-arts-tour.jpg'),
          array('Waringarri Aboriginal Arts, The Virtual Tour', 'https://www.youtube.com/embed/MwPGRN3HcKg', 'img/waringarri-virtual-tour.jpg'),
          array('Kira Kiro Artists', 'https://www.youtube.com/embed/INd2cymHAGA', 'img/kira-kiro.jpg'),
          array('Bali Bali Balga', 'https://www.youtube.com/embed/GEWmIpZCdQg', 'img/bali-bali-balga.jpg')
        );
        foreach ($vids as $v):
          $title = $v[0];
          $src = $v[1];
          $poster = $v[2];
          $is_vimeo = strpos($src, 'vimeo.com') !== false;
          ?>
          <div class='video hidden'
            data-title='<?php echo $title; ?>'
            data-src='<?php echo $src; ?>'
            >
            <div class='poster'><img src='<?php echo $poster; ?>'></div>
            <div class='title'><?php echo $title; ?></div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
    <div id='overlay' class='overlay'>
      <div id='overlay-video' class='overlay__video'><!-- video loads here --></div>
      <div id='overlay-close' class='overlay__close'>
        <div></div><div></div>
      </div>
    </div>
  </body>
</html>
