interface UKey {
    room: string;
    taken: boolean;
}

interface AKey {
    room: string;
    whom?: {_id: string, uname: string, room: number};
    borrow?: moment.Moment;
    tb?: moment.Moment;
}

export { UKey, AKey }