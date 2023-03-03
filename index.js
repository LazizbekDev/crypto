import { Telegraf } from "telegraf";
import { config } from "dotenv";

config();

const bot = new Telegraf(process.env.TOKEN);
const API = process.env.API;

bot.start(ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'Heyy welcome to crypto bot', {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Crypto Prices", callback_data: "price"},
                    { text: "CoinMarketCap", url: "https://www.cryptocompare.com"}
                ],
                [
                    { text: "About me", url: "https://www.lazizbe.uz"}
                ]
            ]
        }
    })
})

bot.action("price", (ctx) => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, 'Get price information', {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "BTC", callback_data: "price-BTC"},
                    {text: "ETC", callback_data: "price-ETC"}
                ],
                [
                    {text: "BCH", callback_data: "price-BCH"},
                    {text: "LTC", callback_data: "price-LTC"}
                ],
                [
                    {text: "Back to main page", callback_data: "start"}
                ]
            ]
        }
    })
})

bot.launch();