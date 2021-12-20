import {makeAutoObservable} from "mobx";

class SocketState{
    socket=null
    sessionId=null
    constructor() {
        makeAutoObservable(this)
    }
    setSocket(socket){
        this.socket=socket
    }
    setSessionId(sessionId){
        this.sessionId=sessionId
    }
}
export default new SocketState()