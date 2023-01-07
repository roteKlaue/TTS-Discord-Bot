import { CacheType, Client, Interaction } from "discord.js";
import { command as commands, selectMenus } from "..";

export default async (client: Client<boolean>, interaction: Interaction<CacheType>) => {
    if (interaction.isStringSelectMenu()) {
        const menuName = interaction.customId;
        const menu = selectMenus.get(menuName);
        if (!menu) return;
        menu(client, interaction);
    }

    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);
    if (!command) return interaction.reply("Requested command not found.");

    await interaction.deferReply({ ephemeral: command.secret });

    type args1 = { _hoistedOptions: [{ name: string, value: string }] }

    const args = (interaction.options as unknown as args1)._hoistedOptions.map(e => e.value);
    command.run(client, interaction, args);
}