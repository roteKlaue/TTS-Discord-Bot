import { CacheType, Client, CommandInteraction, SlashCommandBuilder } from "discord.js";
import CommandOption from "./CommandOption";

declare type Command = {
    name: string;
    description: string;
    secret?: boolean;

    options?: CommandOption[];
    slashCommand?: SlashCommandBuilder;
    permissions?: [
        BigInt
    ];

    run: (client: Client, interaction: CommandInteraction<CacheType>, args: string[]) => Promise<void> | void;
}

export default Command;