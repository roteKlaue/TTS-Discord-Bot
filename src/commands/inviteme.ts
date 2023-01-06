import { CacheType, CommandInteraction } from "discord.js";
import Command from "../types/Command";

export default {
    name: "inviteme",
    description: "Get invite link for the bot.",

    run: (client, interaction: CommandInteraction<CacheType>) => {
        interaction.followUp("https://discord.com/api/oauth2/authorize?client_id=1060986805035487242&permissions=3147776&scope=bot");
    }
} as Command;