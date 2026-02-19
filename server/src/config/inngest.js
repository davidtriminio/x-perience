import {Inngest} from "inngest";
import {connectDB} from "../db/db.js";
import {User} from "../models/user.model.js";

export const inngest = new Inngest({id: "x-perience"})

const syncUser = inngest.createFunction(
    {id: "sync-user"},
    {event: "xperience/clerk/user.created"},
    async ({event}) => {
        await connectDB()

        const {id,username, email_addresses, first_name, last_name, image_url} = event.data;

        const newUser = {
            clerkId: id,
            username: username || `$user_${id.slice(0,6)}`,
            firstName: first_name || "",
            lastName: last_name || "",
            email: email_addresses[0]?.email_address || "no-email@example.com",
            image: image_url
        }

        await User.create(newUser)
    }
)

const deleteUserFromDB = inngest.createFunction(
    {id: "delete-user-from-db"},
    {event: "xperience/clerk/user.deleted"},
    async ({event}) => {
        const {id} = event.data;
        await User.deleteOne({clerkId: id})
    }
)

export const functions = [syncUser, deleteUserFromDB]