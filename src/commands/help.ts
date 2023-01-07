import { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, Client, ChatInputCommandInteraction, CacheType } from "discord.js";
import Command from "../types/Command";
import { command } from "..";
import { StringUtil } from "sussy-util";

export default {
    name: 'help',
    description: "Displays all commands / more information about one command",

    options: [
        {
            name: "query",
            description: "name of the command",
            type: "string",
            required: false,
        }
    ],

    run(client: Client, message: ChatInputCommandInteraction<CacheType>, args: string[]) {
        const commandName = args[0];
        const embed = new EmbedBuilder()
            .setTimestamp(Date.now())
            .setTitle('Help panel')
            .setFooter({ text: client.user?.username || "", iconURL: client.user?.displayAvatarURL() });

        if (!commandName || commandName.length === 0) {
            embed.setDescription(`To see more information type **/help {command name}**`)
                .addFields(
                    command.map(e => ({
                        name: e.name,
                        value: e.description
                    }))
                )

            const row = new ActionRowBuilder<StringSelectMenuBuilder>()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('help')
                        .setPlaceholder("Select a command")
                        .addOptions(
                            command.map(e => ({
                                label: e.name.split("-").map(e => StringUtil.capitalize(e)).join(" "),
                                value: e.name.toLowerCase(),
                            }))
                        )
                )

            return message.followUp({ embeds: [embed], components: [row] });
        }

        const cmd = command.get(commandName);

        if (!cmd) return message.followUp("No command found for: `" + commandName + "`");

        embed
            .setDescription(`\`[]\` are optional parameters.\n\`{}\` are required parameters.`)
            .addFields(
                { name: 'Name', value: cmd.name, inline: true },
                { name: 'Description', value: cmd.description, inline: true },
                {
                    name: 'Usage',
                    value: `/${cmd.name} ${cmd.options?.map(e => (e.required ? "{" : "[") + e.name + (e.required ? "}" : "]")).join(" ")}`,
                    inline: true
                },
            );

        message.followUp({ embeds: [embed] });
    }
} as Command;