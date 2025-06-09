import { DateTime } from "luxon";

interface UKey {
    room: string;
    taken: boolean;
}

interface AKey {
    room: string;
    whom?: {_id: string, uname: string, room: string};
    borrow: DateTime;
    tb?: DateTime;
}

export { UKey, AKey }