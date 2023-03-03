import { Telegraf } from "telegraf";
import { config } from "dotenv";

config();

const bot = new Telegraf(process.env.TOKEN);

bot.start((ctx) => {
    ctx.reply('SALOM')
})

bot.command('test', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Yaxshi, unda tanla", {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "Obunachilar", callback_data: "mavjud_emas"},
                    {text: "Admin", callback_data: "admin"}
                ],
            ]
        }
    })
})

bot.action('mavjud_emas', ctx => {
    ctx.answerCbQuery('Bot test rejimida ishlamoqda');
    ctx.reply('Hali abunachilar mavjud emas, bot test rejimida ishlamoqda!')
})
bot.action('admin', ctx => {
    ctx.answerCbQuery('Bot test rejimida ishlamoqda');
    ctx.reply('Hali Amdin mavjud emas, bot test rejimida ishlamoqda!')
})

bot.launch();