import Bot_Core from './src/Bot_Core';
import File_Crawler from './src/File_Crawler';

var config = [
  {
    token: 'pr0',
    type: 'sendMessage',
    callback: function( user, bot ) {
      var max_image_count = 20;

      var file_crawler = new File_Crawler({
        url:'https://pr0gramm.com/static/',
        directory:'',
        file_pattern:'//thumb.pr0gramm.com/',
        query_type:'img_src',
        count:max_image_count,
      });

      file_crawler.init().then(
        () => {
          let output = file_crawler.output();
          let image = output[ Math.floor(Math.random() * Math.floor(max_image_count)) ].replace("//thumb.", "img.");

          try{
            bot.sendPhoto(
              user.chat.id,
              image
            )
          } catch(e) {
            bot.sendMessage(
              user.chat.id,
              'couldnt open image'
            )
          }
        }
      );

    }
  },

  {
    token: 'ng',
    type: 'sendMessage',
    callback: function( user, bot ) {
      var max_image_count = 20;

      var file_crawler = new File_Crawler({
        url:'https://www.newgrounds.com/',
        directory:'art',
        file_pattern:'https://art.ngfiles.com/thumbnails/',
        query_type:'img_src',
        count:max_image_count,
      });

      file_crawler.init().then(
        () => {
          let output = file_crawler.output();
          let image = output[ Math.floor(Math.random() * Math.floor(max_image_count)) ];

          try{
            bot.sendPhoto(
              user.chat.id,
              image
            )
          } catch(e) {
            bot.sendMessage(
              user.chat.id,
              'couldnt open image'
            )
          }
        }
      );
    }
  }
]

new Bot_Core( 'MY::KEY', config);
