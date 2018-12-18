import Bot_Core from './src/Bot_Core';
import File_Crawler from './src/File_Crawler';

var config = [
  {
    token: 'weidener',
    callback: function( user, bot ) {

      var max_image_count = 5;

      var file_crawler = new File_Crawler({
        url:'https://www.derweidener.de/privater-genuss/weideners-bistro/',
        directory:'',
        file_pattern:'https://www.derweidener.de/wp-content/uploads/',
        query_type:'link_src',
        count: max_image_count,
      });

      file_crawler.init().then(
        () => {
          let output = file_crawler.output();

          bot.sendDocument(
            user.chat.id,
            output[0]
          )
        }
      );
    }
  }
]

new Bot_Core( '713471425:AAE1HnL43msi_hyIM1Oe8EcxVDmFe637Tbs', config);
