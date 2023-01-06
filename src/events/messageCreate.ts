import { Client, Message } from "discord.js"
import { getAudioUrl } from "google-tts-api";
import { guildStates } from "..";
import guildData1 from "../functions/guildData";
import play from "../functions/play";
import userData1 from "../functions/userData";

export default async (_client: Client, message: Message<boolean>) => {
    if (message.author.bot || !message.cleanContent.trim().length || !message.guild?.id) return;
    const state = guildStates.get(message.guild.id);

    if (!state) return;

    const guildData = await guildData1(message.guild.id);

    if (!guildData.tts_channel || message.channel.id !== guildData.tts_channel) return;
    if(message.cleanContent.trim().length >= 200) return message.reply("The maximum amount of characters is 200 per message.");

    const userData = await userData1(message.author.id);

    let language = userData.language;
    if (!language) language = "en";

    const url = getAudioUrl(message.cleanContent, {
        lang: language,
        slow: false,
        host: 'https://translate.google.com',
    });

    if (!state.playing) {
        return play(url, state, message.guild.id);
    }

    state.queue.push(url);
}