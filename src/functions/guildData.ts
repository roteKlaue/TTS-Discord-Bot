import { Types } from "mongoose";
import { guild } from "../models";

const addGuildDocument = async (guildId:string) => {
    return await (new guild({
        _id: new Types.ObjectId(),
        guildId: guildId,

        channels: {
            welcome: undefined,
            goodbye: undefined,

            allowed: []
        }
    })).save();
}

export default async (guildId: string) => {
    let guildData = await guild.findOne({ guildId: guildId });
    if (!guildData) {
        return await addGuildDocument(guildId);
    }
    return guildData;
}