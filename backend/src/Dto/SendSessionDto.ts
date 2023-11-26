
export class SendSessionDto {
    public userid: number
    public sessionid: string

    constructor(userid: number, sessionid: string) {
        this.userid = userid;
        this.sessionid= sessionid
    }
}