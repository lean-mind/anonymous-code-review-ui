const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1896108",
    key: "981971a5ebfef7ec4460",
    secret: "4bbd5effffacbf45e650",
    cluster: "eu",
    useTLS: true
});

pusher.trigger("my-channel", "my-event", {
    message: "cara salchicha"
});