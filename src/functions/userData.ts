import { user } from "../models";
import { Types } from "mongoose";

const addUserDocument = async (userId: string) => {
    return await (new user({
        _id: new Types.ObjectId(),
        userid: userId,
    })).save();
}

export default async (userId: string) => {
    let userData = await user.findOne({ userid: userId });
    if (!userData) {
        return await addUserDocument(userId);
    }
    return userData;
}