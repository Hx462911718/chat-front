

import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import classnames from "classnames"
import  "./list.scss";






class List extends Component{
  constructor(props){
    super(props);
    this.time = null;
    this.flag = false;
    this.state = {
    };
  }
  componentDidMount(){
    // this.getMessage();
  }
  componentWillUnmount(){
    clearInterval(this.time);
  }
  Random=(num)=>{
    let {_id_list} = this.props;
    let arr = _id_list.concat([]);
    var return_array=[];
    for (var i = 0; i<arr.length; i++) {
      //判断如果数组还有可以取出的元素,以防下标越界
      if(return_array.length < num){

        if (arr.length>0) {
          var arrIndex = Math.floor(Math.random()*arr.length);
          return_array[i] = arr[arrIndex];
          arr.splice(arrIndex, 1);
        } else {
          break;
        };
      }else{
        break;
      };
    }
    return return_array;
  }
  getMessage=()=>{
    this.time = setInterval(()=>{
      let {ACTIONS,_user} = this.props;
      let id_list = this.Random(3);
      // return ;
      if(id_list.length<=0 || this.flag){
        return false;
      };
      this.flag = true;
      // ACTIONS.receive_message({
      //   id_list:id_list,
      //   user:_user,
      //   success:req=>{
      //     this.flag = false;
      //   },error:err=>{
      //     this.flag = false;
      //   }
      // });
    },8000);


  }
  render(){
    let {friends,filterKey,currentChatId,clickLi} = this.props;
    return (
      <div className="list-wrap">
        <div className="list">
          <Scrollbars >
            <ul>
              {
                friends.map((item,i)=>{
                  return (
                    <li key={"index"+i} className={classnames({
                      "active":(item.id === currentChatId),
                      "hide":(filterKey != "" && item.nickname.indexOf(filterKey) < 0)
                    })} onClick={()=>{clickLi(item.id)}}>
                      <p className="avatar">
                        <img   width="40" height="40"src={item.faceImage||"https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"} />
                      </p>
                      <p className="name">{item.nickname}</p>
                      {/*{item.status?(<i className={classnames("dot")} ></i>):(null)}*/}
                    </li>
                  );
                })
              }
            </ul>
          </Scrollbars>
        </div>
        <div className="logout">
          <a className="ic" target="_bank" href="https://github.com/meibin08/react-redux-chat">

            <p className="msg">如果该示例帮助了你，记得去github上帮我点颗星哦</p>
          </a>
          <a className="ic qq"  target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=d44baf17512787eb0e4f268849a3239d6b9675145a606e21b9a055176bd1c0e2">
            <p className="msg">您在使用的过程中，有不懂的疑问或者bug可以加QQ群，一起交流哦</p>
          </a>
          <span className="ic" title="退出" >
			    	</span>
          <button style={{display:"none"}}>退出登录</button>
        </div>
      </div>
    );
  }
}



export default List;

