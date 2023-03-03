import { Telegraf } from "telegraf";
import { config } from "dotenv";
import axios from "axios";

config();

const bot = new Telegraf(process.env.TOKEN);
const API = process.env.API;

function dry (ctx) {
    ctx.deleteMessage();
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
}

bot.start(ctx => dry(ctx))

bot.action('start', ctx => dry(ctx))

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

const priceListing = ["price-BTC", "price-ETC", "price-BCH", "price-LTC"]

bot.action(priceListing, async (ctx) => {
    const symbol = ctx.match[0].split('-')[1];

    try {
        const res = await axios.get(
            `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD,UZS&api_key=${API}`
        )

        const data = res.data.DISPLAY[symbol].UZS

        let msg = `
Symbol: ${symbol}
Price: ${data.PRICE}
Open: ${data.OPENDAY}
High: ${data.HIGHDAY}
Low: ${data.LOWDAY}
Supply: ${data.SUPPLY}
Market cap: ${data.MKTCAP}
`

        ctx.deleteMessage();

        await bot.telegram.sendMessage(ctx.chat.id, msg, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: "Back", callback_data: "price"}
                    ]
                ]
            }
        })
    } catch (err) {
        console.log(err)
        ctx.reply('Something went to wrong, contact with @mernme');
    }
})

bot.launch();