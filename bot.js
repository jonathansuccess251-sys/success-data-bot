const TelegramBot = require('node-telegram-bot-api');

const TOKEN = process.env.BOT_TOKEN;

if (!TOKEN) {
  throw new Error('Please add your Telegram bot token.');
}

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId,
    `👋 Welcome to Success Data Bot!

Buy affordable data bundles easily.

Choose your network below:`,
    {
      reply_markup: {
        keyboard: [
          ['MTN 📱', 'Airtel 📱'],
          ['Glo 📱', '9mobile 📱'],
          ['Contact Admin 👨‍💻']
        ],
        resize_keyboard: true
      }
    }
  );
});

bot.on('message', (msg) => {
  const text = msg.text;
  if (!text || text.startsWith('/')) return;

  if (text.includes('MTN') || text.includes('Airtel') ||
      text.includes('Glo') || text.includes('9mobile')) {
    bot.sendMessage(msg.chat.id,
      `You selected ${text}.

Data plans will be available soon.

Please contact the admin for assistance.`
    );
  }

  if (text.includes('Contact Admin')) {
    bot.sendMessage(msg.chat.id, 'Please contact the bot administrator.');
  }
});

console.log('Success Data Bot is running!');
