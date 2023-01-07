import { ActionRowBuilder, CacheType, Client, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import userData from "../functions/userData";
import { user } from "../models";
import { languages } from "../types/Lang";

export default async (client: Client<boolean>, interaction: StringSelectMenuInteraction<CacheType>) => {
    const val = interaction.values[0];
    const name = languages.find(e => e.value === val)?.label || "Please select a language";

    const row = new ActionRowBuilder<StringSelectMenuBuilder>()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('sus')
                .setDisabled(true)
                .addOptions(languages)
                .setPlaceholder(name)
        )


    await interaction.update({ components: [row] });

    const data = await userData(interaction.user.id);
    data.language = val;
    user.findByIdAndUpdate(data._id, data, () => { });

    interaction.followUp({ content: `Set language to: ${name}`, ephemeral: true });
}