import { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, Client, ChatInputCommandInteraction, CacheType } from "discord.js";
import { command } from "..";
import Command from "../types/Command";

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
                .addFields([
                    {
                        name: "help",
                        value: "Displays all commands / more information about one command",
                    },
                    {
                        name: "inviteme",
                        value: "Get invite link for the bot"
                    },
                    {
                        name: "join",
                        value: "Join a channel"
                    },
                    {
                        name: "leave",
                        value: "Leaves the current voice channel"
                    },
                    {
                        name: "set-tts-channel",
                        value: "Sets the TTS text channel for current server"
                    }
                ])

            const row = new ActionRowBuilder<StringSelectMenuBuilder>()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('help')
                        .setPlaceholder("Select a command")
                        .addOptions([
                            { label: "Help", value: "help" },
                            { label: "Inviteme", value: "inviteme" },
                            { label: "Join", value: "join" },
                            { label: "Leave", value: "leave" },
                            { label: "Set TTS Channel", value: "set-tts-channel" }
                        ])
                );

            return message.followUp({ embeds: [embed], components: [row] });
        }

        const cmd = command.get(commandName);

        if (!cmd) return message.followUp("No command found for: `" + commandName + "`");

        embed
            .setDescription(`\`[]\` are optional parameters.\n\`{}\` are required parameters.`)
            .addFields(
                { name: 'Name', value: cmd.name, inline: true },
                { name: 'Description', value: cmd.description, inline: true },
                { name: 'Usage', value: cmd.options?.length ? `/${cmd.name} ${cmd.options?.map(e => (e.required ? "{" : "[") + e.name + (e.required ? "}" : "]")).join(" ")}` : "/" + cmd.name, inline: true },
            );

        message.followUp({ embeds: [embed] });
    }
} as Command;