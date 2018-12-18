import * as Request from 'request';
import * as Jsdom from 'jsdom';
import * as Promise from 'promise';


interface FCConfig {
  url:string; // url to scrape
  directory:string; // subdirectory for the url
  file_pattern:string; // matching pattern for the images which are returned from the request
  query_type:string; // select for the DOM object ( img_src, regex )
  count:number; // number of images wich are returned
}

export default class File_Crawler
{
    // container for the returned image list
    private source_list:string[] = [];

    constructor( private config:FCConfig ){};

    //Initilize the async request
    public init():any
    {
      let _ = this;

      return new Promise((resolve, reject) => {

        new Request( { url:_.config.url + _.config.directory, strictSSL:false },  function( error, response, body ) {
          if( error === null && ( response && response.statusCode == 200 ) ) {
            _.parse( body );
            resolve();

          } else {
             throw new Error( '[!] Could not retrive url: ' + error );
             reject();

          }
        });
      });
    }

    // search for all images which fits the file pattern
    private parse( body:string ):void
    {
      let HTML_document = new Jsdom.JSDOM( body );

      switch( this.config.query_type )
      {
        case 'img_src':
          let HTML_images_elements = HTML_document.window.document.querySelectorAll("img");

          for( let i = 0; i < HTML_images_elements.length; i++ ) {
              // validate
              if( this.validate( HTML_images_elements[i].src ) ){
                  // add to list
                  this.source_list.push( HTML_images_elements[i].src );
              }
          }

          break;

        case 'link_src':
          let HTML_link_elements = HTML_document.window.document.querySelectorAll("a");

          for( let i = 0; i < HTML_link_elements.length; i++ ) {
              // validate
              if( this.validate( HTML_link_elements[i].href ) ){
                  // add to list
                  this.source_list.push( HTML_link_elements[i].href );
              }
          }

          break;
        //// TODO:  add regex functionality
        case 'regex':
          break;
      }
    }

    // validate the strings
    private validate( url:any ):string|boolean
    {
      if( !this.config.file_pattern ){
        return url;
      }

      switch( this.config.query_type )
      {
        case 'link_src':
        case 'img_src':
          return url.includes( this.config.file_pattern ) ? url : false;
          break;

        case 'regex':
          return false;
          break;
      }
    }

    // return the requested image/s by count
    public output():string[]
    {
      if( this.source_list ){
        if( this.source_list.length < this.config.count ){
            return this.source_list;
        } else {
            return this.source_list.slice(0, this.config.count);
        }
      } else {
        throw new Error( '[!] Could not recive anything' );
      }
    }
}
