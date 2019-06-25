import IO from 'socket.io-client'
import config from '@/config/socketClient'
import {getTempleMem} from "@/utils/localMemory";

const options = {
  query:{
    mac:getTempleMem("userInfo").id,
  },
}


const socket = new IO(config.server, options);
console.log(socket)
export default socket;

