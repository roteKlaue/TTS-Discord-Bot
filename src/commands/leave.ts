import { CacheType, Client, CommandInteraction } from "discord.js";
import Command from "../types/Command";
import { guildStates } from "..";

export default {
    name: "leave",
    description: "Leaves the current voice channel.",
    secret: true,

    run: (client: Client, interaction: CommandInteraction<CacheType>) => {
        const connection = guildStates.get(interaction.guildId || "")?.voice;
        if (!connection) return interaction.followUp("I am not connected to a voice channel.");

        connection.destroy();
        guildStates.delete(interaction.guildId || "");
        interaction.followUp("Left voice channel.");
    }
} as Command;