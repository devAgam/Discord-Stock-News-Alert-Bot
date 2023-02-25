import { getNews } from "../scrapers/moneycontrol.scraper";

const token = process.env.DISCORD_TOKEN;
import * as Discord from "discord.js"; // import discord.js

// make a  discord client
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.DirectMessages,
  ],
});
client.on("ready", () => {
  console.log("Ready!");
});

// login to the client with your token
client.login(token);

export async function sendNews() {
  console.log("function called", new Date());
  const news = await getNews();

  //   if the news date is less than 5 minutes old, send the news
  news.forEach((newsItem) => {
    if (
      //   if the news date is less than 5 minutes old, send the news
      newsItem.date.getTime() >
      new Date().getTime() - 5 * 60 * 1000
    ) {
      const ch = client.channels.cache.get(process.env.DISCORD_CHANNEL);
      (ch as Discord.TextChannel).send(newsItem.url);
      console.log("sending news", newsItem.url, newsItem.date);
    }
  });
}
