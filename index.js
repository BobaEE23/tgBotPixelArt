import { Bot  } from "grammy";

import dotenv from "dotenv";


dotenv.config();


const bot = new Bot(process.env.BOT_TOKEN);

bot.command("start" , (ctx)=>{
    ctx.reply('Открыть Mini App', {
        reply_markup: {
            inline_keyboard: [
                [ 
                    {
                        text: 'Открыть Mini App',
                        web_app: { url: 'https://cyan-spoons-unite.loca.lt' }
                    }
                ]
            ]
        }
    });
})



bot.start();
