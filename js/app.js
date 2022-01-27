require('dotenv').config()
const Botgram = require('botgram');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!TELEGRAM_BOT_TOKEN) {
    console.error('Error en el token de Telegram');
    process.exit(1);
}

const bot = new Botgram(TELEGRAM_BOT_TOKEN);

function onMessage(msg, reply) {
    let text = msg.text.toLowerCase().replace(/[^\w\s\d]/gi, "");

    console.log(msg);
    if (text === 'puto') {
        reply.text('Tú')
    } else {
        reply.text(msg.text);
    }
}

bot.text(onMessage);