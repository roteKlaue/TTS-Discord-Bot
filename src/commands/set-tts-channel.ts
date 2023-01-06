import { CacheType, Client, CommandInteraction, PermissionsBitField } from "discord.js";
import guildData from "../functions/guildData";
import { guild } from "../models";
import Command from "../types/Command";

export default {
    name: "set-tts-channel",
    description: "Sets the TTS text channel for current server.",
    secret: true,

    permissions: [
        PermissionsBitField.Flags.ManageChannels
    ],

    options: [
        {
            name: "channel",
            type: "channel",
            description: "The text channel to set.",
            required: true
        }
    ],

    run: async (client: Client, interaction: CommandInteraction<CacheType>, args: string[]) => {
        const id = args.shift() || "";
        const channel = client.channels.cache.get(id);
        if(!channel) {
            return interaction.followUp({ content: `Could not find channel.` });
        }

        const data = await guildData(interaction.guildId || "");
        data.tts_channel = channel.id;
        guild.findOneAndUpdate(data._id, data, () => {});
        interaction.followUp({ content: `${channel.toString()} is now TTS channel.` });
    }
} as Command;