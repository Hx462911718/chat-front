import React, {Component} from 'react';
import Sidebar from "./components/side/side"
import {getTempleMem} from '@/utils/localMemory'
import Messages from "./components/Messages/Index/index"
import "./Index.scss"
import {connect} from "dva"

class Home extends Component {
  render() {
    const  userInfo =  getTempleMem("userInfo");
    const sideProps = {
        userInfo:userInfo,
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
