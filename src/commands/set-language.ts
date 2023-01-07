import userData from "../functions/userData";
import Command from "../types/Command";
import { user } from "../models";
import { ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder } from "@discordjs/builders";
import { languages } from "../types/Lang";

export default {
    name: "set-language",
    description: "Set the language for your text to speech.",
    secret: true,

    run: async (client, interaction) => {
        const embed = new EmbedBuilder()
            .setTitle("Language")
            .setDescription("Please select a language")
            .setTimestamp(Date.now())
            .setFooter({ text: client.user?.username || "", iconURL: client.user?.displayAvatarURL() })

        const row = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("language")
                    .setPlaceholder("Select a language")
                    .addOptions(languages)
            )

        interaction.followUp({ components: [row], embeds: [embed] });
    }
} as Command;