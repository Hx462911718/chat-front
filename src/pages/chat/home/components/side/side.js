
import React, { Component, PropTypes } from 'react';
import { Icon} from 'antd';
import classnames from 'classnames';
import "./side.scss"
import List from './List'





class Sidebar extends Component{
  constructor(props){
    super(props);
    const {socket} = this.props;
    this.state = {
      filterKey:"",

    };
    socket.on('connect', function () {
      console.log("连接成功");
    });
  }
  componentDidMount(){

  }
  search(e){
    let {value}=e.target;
      this.setState({
        filterKey:value
      })
  }
  render(){
    let {userInfo,friends,currentChatId,clickLi,searchUser} = this.props;
    const  listProps= {
      friends:friends,
      currentChatId:currentChatId,
      filterKey:this.state.filterKey,
      clickLi:clickLi,
    }
    return (
      <section className="sidebar">
        <div className="card">
          <header className="user">
            <img className="avatar" width="40" height="40"  src={(userInfo.faceImage ||require("assets/side/images/Bin.jpg"))}/>
            <p className="name">{userInfo.nickname}</p>
          </header>
          <footer>

            <input className="search" type="text" onChange={(e)=>this.search(e)} placeholder="search user..." />
            <a className="add" onClick={()=>{searchUser()}}><Icon type="plus-circle" /></a>
          </footer>
        </div>
        <List {...listProps}/>
      </section>
    );
  }
};


export default Sidebar;

