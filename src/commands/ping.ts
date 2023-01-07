import { CacheType, ChatInputCommandInteraction, Client, EmbedBuilder } from "discord.js";
import Command from "../types/Command";

export default {
    name: 'ping',
    description: 'Ping the bot',

    run(client: Client<boolean>, message: ChatInputCommandInteraction<CacheType>) {
        const startDate = Date.now();
        message.followUp({
            embeds: [
                new EmbedBuilder()
                    .setColor("#fff")
                    .setDescription("Please Wait...")
                    .setFooter({ text: client.user?.username || "", iconURL: client.user?.displayAvatarURL() })
            ]
        }).then(() => {
            const endDate = Date.now();
            const embed = new EmbedBuilder()
                .setTitle("Pong!")
                .addFields({ name: "Message Latency", value: `${Math.floor(endDate - startDate)}ms` },
                    { name: "API Latency", value: `${Math.round(client.ws.ping)}ms` })
                .setTimestamp(Date.now())
                .setFooter({ text: client.user?.username || "", iconURL: client.user?.displayAvatarURL() });
            message.followUp({ embeds: [embed] });
        });
    }
} as Command;