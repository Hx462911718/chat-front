
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import "./side.scss"
import List from './List'





class Sidebar extends Component{
  constructor(props){
    super(props);

    this.state = {


    };
  }
  componentDidMount(){

  }
  search(e){
    let {value}=e.target;
  }
  render(){
    let {userInfo} = this.props;
    return (
      <section className="sidebar">
        <div className="card">
          <header className="user">
            <img className="avatar" width="40" height="40"  src={(userInfo.faceImage ||require("assets/side/images/Bin.jpg"))}/>
            <p className="name">{userInfo.nickname}</p>
          </header>
          <footer>
            <input className="search" type="text" onChange={(e)=>this.search(e)} placeholder="search user..." />
          </footer>
        </div>
        <List/>
      </section>
    );
  }
};


export default Sidebar;

