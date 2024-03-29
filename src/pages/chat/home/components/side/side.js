
import React, { Component, PropTypes } from 'react';
import { Icon} from 'antd';
import classnames from 'classnames';
import "./side.scss"
import List from './List'
import RequestList from "./requestList";
import socket from "@/utils/usersocket";





class Sidebar extends Component{
  constructor(props){
    super(props);
    const {socket,dispatch,userInfo} = this.props;
    this.state = {
      filterKey:"",
      zIndex:1,

    };
    socket.on('friendsRequest', function () {
        dispatch({
            type:"home/queryFriendRequest",
            payload:{
                id:userInfo.id
            }
        })
    });
    socket.on('friendsChange', function () {
      dispatch({
        type:"home/myFriends",
        payload:{
          id:userInfo.id
        }
      })
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
  changeComponents=(index)=>{

      this.setState({
        zIndex:index
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
        {this.state.zIndex === 1 ? <List {...listProps}/>:<RequestList data={this.props.reList} socket={socket}/>}
        <div style={{height:"30px",borderTop:"2px solid #2a89cf"}}>
          <a onClick={()=>{this.changeComponents(1)}} style={{color:"#86ff49",fontSize:25}} title={"我的好友"}><Icon type="user" /></a>
          <a onClick={()=>{this.changeComponents(2)}} style={{color:"#86ff49",fontSize:25,marginLeft:20}} title={"新朋友"}> <Icon type="message" /></a>
        </div>
      </section>
    );
  }
};


export default Sidebar;

