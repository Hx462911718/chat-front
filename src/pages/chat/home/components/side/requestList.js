import React, {Component} from 'react';
import "./request.scss"
import {getTempleMem} from '@/utils/localMemory'
class RequestList extends Component {
  constructor(props){
    super(props)
  }
  addFriends=(flag,id)=> {
    const {socket,} =this.props;
    const userInfo= getTempleMem("userInfo");
    socket.emit('addFriends',
      {sender: userInfo.id, receiver: id,payload:{flag:flag} ,sendTime: new Date()})
  }


  render() {
    const {data} = this.props;
    return (
        <div  style={{height:475}}>
          {data?
            data.map((item, i) => {
              return(
                <div className="ra">
                  <div className="rb">
                    <img className="component-avatar " src={item.face_image}
                         style={{width: "35px", height: "35px", borderRadius: "30px",marginLeft:5,marginTop:5}}/>
                    <p className="rc">{item.nickname}</p>
                  </div>
                  <p className="d"><a onClick={()=>{this.addFriends(true,item.id)}}>同意</a>&nbsp;<a onClick={()=>{this.addFriends(false,item.id)}}>忽略</a></p>
                </div>
              );
            }): <h3>暂时无好友申请</h3>
          }
        </div>
    );
  }
}


export default RequestList;
