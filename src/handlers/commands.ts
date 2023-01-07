import { Collection, SlashCommandBuilder } from "discord.js";
import { MutableObject } from "sussy-util";
import Command from "../types/Command";
import fs from "node:fs";

export default (commands: Collection<string, Command>) => {

    const n = {
        string: "addStringOption",
        user: "addUserOption",
        number: "addNumberOption",
        file: "addAttachmentOption",
        channel: "addChannelOption",
        role: "addRoleOption",
        mentionable: "addMentionableOption",
        boolean: "addBooleanOption",
        integer: "addIntegerOption"
    } as MutableObject<string>;

    fs.readdirSync(`${__dirname}/../commands`).filter(e => e.endsWith(".js")).forEach(e => {
        const command = require(`../commands/${e}`).default as Command;
        command.name = command.name.toLowerCase();

        command.slashCommand = new SlashCommandBuilder()
            .setName(command.name.toLowerCase())
            .setDescription(command.description)
            .setDMPermission(false)

        command.options?.forEach(option => {
            if (!option.name || !option.type || !n[option.type] || !option.description) return;
            (command.slashCommand as unknown as MutableObject<Function>)[n[option.type]]((settings: any) => {
                settings
                    .setName(option.name.toLowerCase())
                    .setDescription(option.description)
                    .setRequired(option.required ? true : false);
                return settings;
            });
        });

        commands.set(command.name, command);
    });
}