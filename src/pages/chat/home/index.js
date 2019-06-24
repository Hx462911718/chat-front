import React, {Component} from 'react';
import Sidebar from "./components/side/side"
import {getTempleMem} from '@/utils/localMemory'
import Messages from "./components/Messages/Index/index"
import "./Index.scss"
import {connect} from "dva"

class Home extends Component {
  render() {
    const  userInfo =  getTempleMem("userInfo");
    const {home,dispatch} = this.props;
    const {friends,currentChatId} = home
    const sideProps = {
        userInfo:userInfo,
        friends:friends,
        currentChatId:currentChatId,
        clickLi:(data)=>{
            dispatch({
              type:"home/querySuccess",
              payload:{
                currentChatId:data
              }
            })
        }
    }

    return (
      <div>
        <section className="wechat">
          <Sidebar {...sideProps}/>
          <Messages/>
        </section>


      </div>
    );
  }
}


export default connect(({home})=>({home}))(Home);
