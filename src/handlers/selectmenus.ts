import { Collection } from "discord.js";
import fs from "node:fs";

export default (selectMenus: Collection<string, Function>) => {
    fs.readdirSync(`${__dirname}/../selectmenus`).filter(e => e.endsWith(".js")).forEach(e => {
        selectMenus.set(e.replace(/(\.js)$/, ""), require(`../selectmenus/${e}`).default as Function);
    });
}