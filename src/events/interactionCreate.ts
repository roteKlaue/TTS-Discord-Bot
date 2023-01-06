import { CacheType, Client, Collection, EmbedBuilder, Interaction } from "discord.js";
import Command from "../types/Command";

export default async (client: Client<boolean>, commands: Collection<string, Command>, interaction: Interaction<CacheType>) => {
    if (interaction.isStringSelectMenu()) {
        const commandName = interaction.values[0];

        const cmd = commands.get(commandName);

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

    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);
    if (!command) return interaction.reply("Requested command not found.");

    await interaction.deferReply({ ephemeral: command.secret });

    type args1 = { _hoistedOptions: [{ name: string, value: string }] }

    const args = (interaction.options as unknown as args1)._hoistedOptions.map(e => e.value);
    command.run(client, interaction, args);
}