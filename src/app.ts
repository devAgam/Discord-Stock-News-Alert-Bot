import { sendNews } from "./components/discord/discord.worker";

// execute the function every 5 minutes
setInterval(sendNews, 5 * 60 * 1000);
