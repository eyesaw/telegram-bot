// import telegram bot
import * as TelegramBot from 'node-telegram-bot-api';

interface Config {
    [ index: number ]: {
      token: string;
      callback: any;
     };
}

export default class Bot_Core
{

  private bot: any;

  constructor( private key: string, private config: Config )
  {
    if (!this.key || !this.config){
      throw new Error('[-] missing parameter: key[string] , config:[object]');
    }

    this.bot = new TelegramBot( this.key, {polling: true});

    let _ = this;

    this.bot.onText(/\/(.+)/,function (user, match) {
      _.parse(user,match);
    });
  }

  /**
   * @param user
   * @param match (0 - full input / 1 - matching phrase )
   */

  public parse( user, match )
  {
    let _:any = this;

    for ( var i = 0; i < Object.keys( this.config ).length; i++ )
    {

      if( match[1].search( _.config[i].token ) !== -1 )
      {
        this.config[i].callback( user, this.bot );
        return;
      }
    }
  }
}
