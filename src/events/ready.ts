import { Client, Collection, REST, Routes } from "discord.js";
import Command from "../types/Command";

export default async (client: Client, commands: Collection<string, Command>) => {
    console.log("The client is ready.");

    if (process.env.UPDATE_COMMANDS) {
        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN || "");
        const command = commands.map(e => e.slashCommand?.toJSON());

        rest.put(Routes.applicationCommands(client?.user?.id || ""), { body: command }).then((e: any) => {
            console.log(`Successfully reloaded ${e.length} application (/) commands.`);
        });
    }
}