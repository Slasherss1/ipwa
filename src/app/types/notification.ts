export interface Notification {
    body: string;
    title: string;
    recp: {
        uname: string | null;
        room: string | null;
        type: "all" | "room" | "uname"
    }
}
