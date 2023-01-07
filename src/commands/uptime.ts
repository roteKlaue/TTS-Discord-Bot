import { EmbedBuilder } from "discord.js";
import Command from "../types/Command";

export default {
    name: "uptime",
    description: "Shows the uptime of the bot",

    async run(client, message) {
        let uptime = client.uptime;
        if (!uptime) uptime = 0;
        const days = Math.floor(uptime / 86400000);
        const hours = Math.floor(uptime / 3600000) % 24;
        const minutes = Math.floor(uptime / 60000) % 60;
        const seconds = Math.floor(uptime / 1000) % 60;

        const uptime1 = new EmbedBuilder()
            .setColor("#fff7f7")
            .setDescription(` \`\📝\`\ | **__Uptime:__**`)
            .addFields({ name: "**Tage:**", value: `${days}` },
                { name: "**Stunden:**", value: `${hours}` },
                { name: "**Minuten:**", value: `${minutes}` },
                { name: "**Sekunden:**", value: `${seconds}` })
            .setFooter({ text: client.user?.username || "", iconURL: client.user?.displayAvatarURL() });
        message.followUp({ embeds: [uptime1] });
    }
} as Command;