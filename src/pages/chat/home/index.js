import React, {Component} from 'react';
import Sidebar from "./components/side/side"
import SearchUser from "./components/side/search"
import {getTempleMem,setTempleMem} from '@/utils/localMemory'
import Messages from "./components/Messages/Index/index"
import "./Index.scss"
import PageLoading from '@/components/pageLoading';
import {connect} from "dva"

class Home extends Component {
  render() {
    const  userInfo =  getTempleMem("userInfo");
    const {home,dispatch} = this.props;
    const {friends,currentChatId,socket,currentChatUser,messages,reList} = home
    const sideProps = {
        userInfo:userInfo,
        friends:friends,
        socket:socket,
        reList:reList,
        dispatch:dispatch,
        currentChatId:currentChatId,
        searchUser: () => {
        let transferOpts = {
          visible: true,
          options: {
            url: '/',
            title: '搜索用户',
            winType: 'normal',
            height: 210,
            winId: 'searchUser',
            width: 360,
            footer: null,
            onClose: {},// modal关闭的回调函数
          },
          content: {},
          handleCancel:()=>{
            global.closeModalWindow('searchUser');
          },
          children: <SearchUser dispatch={dispatch} socket={socket}/>
          ,
        }
        global.g_app._store.dispatch({
          type:"genModels/showModal",
          payload:{
            ...transferOpts
          }
        })
      },
        clickLi:(data)=>{
            dispatch({
              type:"home/querySuccess",
              payload:{
                currentChatId:data.id,
                currentChatUser:data
              }
            })
            dispatch({
              type:"home/queryChatMsg",
              payload:{
                acceptUserId:data.id,
                sendUserId:userInfo.id
              }
            })
            setTempleMem("sessionId",data.id)
        }
    }

    const MsgProps = {
      userInfo:userInfo,
      socket:socket,
      messages:messages,
      currentChatId:currentChatId,
      currentChatUser:currentChatUser,
      refreMsg:(data)=>{

        dispatch({
          type:"home/queryChatMsg",
          payload:{
            acceptUserId:getTempleMem("sessionId"),
            sendUserId:userInfo.id
          }
        })
      }
    }

    return (
      <>
        {
          socket? <section className="wechat">
              <Sidebar {...sideProps}/>
              <Messages {...MsgProps}/>
            </section> :<PageLoading/>
        }
      </>
    );
  }
}

export default connect(({home})=>({home}))(Home);
