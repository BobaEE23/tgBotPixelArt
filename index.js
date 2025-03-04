import { Bot  , InlineKeyboard} from "grammy";

import dotenv from "dotenv";


dotenv.config();



const bot = new Bot(process.env.BOT_TOKEN);

bot.command("start" , async(ctx)=>{
    await ctx.reply("Привет")
})

bot.command('miniapp', (ctx) => {
    ctx.reply('Открыть Mini App', {
        reply_markup: {
            inline_keyboard: [
                [ 
                    {
                        text: 'Открыть Mini App',
                        web_app: { url: 'https://petite-carrots-cover.loca.lt' }
                    }
                ]
            ]
        }
    });
});

bot.start();
