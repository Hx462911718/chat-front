import React, {Component} from 'react';
import {getTempleMem} from '@/utils/localMemory'
import {message} from "antd"
import "./info.scss"

class Info extends Component {
  constructor(props){
    super(props)
  }
  addFriends=()=>{
      const {socket,data} =this.props;
      const userInfo= getTempleMem("userInfo");
      socket.emit('noticeMessage',
        {sender:userInfo.id,receiver:data.id,sendTime:new Date()},(data,msg)=>{
            if("0"===data.code){

            }else {
              message.info("添加好友成功");
              global.closeModalWindow('info');
            }
        })


  }
  render() {
    const {data} =this.props
    return (
      <div>
          <div className="content">
            <div className="header">
              <img className="component-avatar"  src={data.face_image} style={{width: "60px", height: "60px", borderRadius: "30px"}}/>
              <p>{data.nickname}</p></div>
            <div className="info">
              <button className="component-button " onClick={()=>{this.addFriends()}}>加为好友</button>
            </div>
          </div>

      </div>
    );
  }
}

Info.propTypes = {};

export default Info;
