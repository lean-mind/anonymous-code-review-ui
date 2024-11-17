"use server"
import Pusher from "pusher";

export async function sendRealTimeMessage(formData: FormData) {
    const pusher = new Pusher({
        appId: "1896108",
        key: "981971a5ebfef7ec4460",
        secret: "4bbd5effffacbf45e650",
        cluster: "eu",
        useTLS: true
    });
    console.log("Data from form", formData.get("repository"));
    await pusher.trigger("repository-channel", "add-repository", {
        message: formData.get("repository")
    });
}