import Bot from "./src/app/Bot";

process.env.TZ = "Indonesia/Jakarta";

require("dotenv").config();

type BotOptions = {
  polling: boolean;
  filePath?: boolean;
};

// ...

const token: string | undefined = process.env.TOKEN;
const botOptions: BotOptions = { polling: true, filePath: false };

const bot = new Bot(token, botOptions);

function main(): void {
  bot.showHelp();
  bot.showFollowedText();
  bot.showAvatar();
  bot.showEarthQuakeInfo();
  bot.showGreeting();
  bot.showNews();
  bot.showQuotes();
}

console.log("Bot is running now!");

main();

