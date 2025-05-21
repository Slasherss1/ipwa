import { Moment } from "moment";

export default interface User {
    _id: string;
    uname: string;
    pass: string;
    room?: string;
    admin?: number;
    locked?: boolean;
    fname?: string;
    surname?: string;
    groups: string[];
    regDate: Moment;
}