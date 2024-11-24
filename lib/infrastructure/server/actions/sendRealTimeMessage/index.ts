"use server"
import Pusher from "pusher";
import {adjectives, animals, colors, uniqueNamesGenerator} from "unique-names-generator";
import {redirect} from "next/navigation";

export async function sendRealTimeMessageAction(formData: FormData) {
    const pusher = new Pusher({
        appId: process.env.PUSHER_APP_ID as string,
        key: process.env.PUSHER_KEY as string,
        secret: process.env.PUSHER_SECRET as string,
        cluster: process.env.PUSHER_CLUSTER as string,
        useTLS: true
    });
    const randomName: string = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        length: 3,
        separator: '-',
    });
    await pusher.trigger("repository-channel", "add-repository", {
        url: formData.get("repository"),
        randomName: randomName
    });
    redirect(`/room/${randomName}`);
}
