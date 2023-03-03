import { Telegraf } from "telegraf";
import { config } from "dotenv";

config();

const bot = new Telegraf(process.env.TOKEN);

bot.start((ctx) => {
    ctx.reply('SALOM')
})

bot.launch();