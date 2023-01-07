import { CacheType, Client, EmbedBuilder, StringSelectMenuInteraction } from "discord.js";
import { command } from "..";

export default (client: Client<boolean>, interaction: StringSelectMenuInteraction<CacheType>) => {
    const commandName = interaction.values[0];

    const cmd = command.get(commandName);

    if (!cmd) return interaction.update("No command found for: `" + commandName + "`");

    const embed = new EmbedBuilder()
        .setTimestamp(Date.now())
        .setTitle('Help panel')
        .setFooter({ text: client.user?.username || "", iconURL: client.user?.displayAvatarURL() })
        .setDescription(`\`[]\` are optional parameters.\n\`{}\` are required parameters.`)
        .addFields(
            { name: 'Name', value: cmd.name, inline: true },
            { name: 'Description', value: cmd.description, inline: true },
            { name: 'Usage', value: cmd.options?.length ? `/${cmd.name} ${cmd.options?.map(e => (e.required ? "{" : "[") + e.name + (e.required ? "}" : "]")).join(" ")}` : "/" + cmd.name, inline: true },
        );

    interaction.update({ embeds: [embed], components: [] });
}