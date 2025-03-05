export interface Notification {
    body: string;
    title: string;
    recp: {
        uname: string | null;
        room: number | null;
        type: "all" | "room" | "uname"
    }
}
