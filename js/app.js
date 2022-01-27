require('dotenv').config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!TELEGRAM_BOT_TOKEN) {
    console.error('Error en el token de Telegram');
    process.exit(1);
}

const fs = require('fs');
fs.readFile('js/responses.json', 'utf8', (err, data) => {
    if (err) {
        console.error(`Error leyendo el archivo: ${err}`);
        process.exit(1);
    }

    const responses = JSON.parse(data);
    const Botgram = require('botgram');
    const bot = new Botgram(TELEGRAM_BOT_TOKEN);

    /**
     * Da formato a la entrada del mensaje
     * @param {string} input 
     * @returns entrada normalizada
     */
    function formatInput(input) {
        // Se eliminan los acentos
        let text = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        // El mensaje se pone en minúsculas
        return text.toLowerCase().replace(/[^\w\s\d]/gi, '');
    }

    /**
     * Compara la entrada del usuario con las posibles entradas
     * @param {string} text 
     * @returns respuesta en base a la entrada
     */
    function compare(text) {
        for (let i = 0; i < responses.userInput.length; ++i) {
            for (let j = 0; j < responses.botReplies.length; ++j) {
                if (responses.userInput[i][j] === text) {
                    let replies = responses.botReplies[i];
                    let choice = Math.floor(Math.random() * replies.length);
                    return replies[choice];
                }
            }
        }
        let choice = Math.floor(Math.random() * responses.alternative.length);
        return responses.alternative[choice];
    }

    /**
     * Acciones tomadas por el bot de Telegram
     * @param {*} msg 
     * @param {*} reply 
     */
    function onMessage(msg, reply) {
        let input = formatInput(msg.text);
        let response = compare(input);
        reply.text(response);
    }

    bot.text(onMessage);
});