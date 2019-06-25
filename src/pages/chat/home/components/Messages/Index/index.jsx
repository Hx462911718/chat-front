

import React, { Component, PropTypes } from 'react';

import classnames from 'classnames';

import Dialogue from "../Dialogue";
import Send from "../Send";
import './Index.scss';




class Messages extends Component{
	constructor(props){
		super(props);

    	this.state = {

    	};
	}
	componentDidMount(){
		//dia(this);

	}

	render(){
		let {userInfo,socket,currentChatId,currentChatUser,messages,refreMsg} = this.props;
		const  sendProps={
      userInfo:userInfo,
      socket:socket,
      currentChatId:currentChatId
    };
    const  dialogueProps={
      userInfo:userInfo,
      messages:messages,
      socket:socket,
      currentChatUser:currentChatUser,
      refreMsg:refreMsg,
    }
		return (
			<div className="chat-main">
				<Dialogue {...dialogueProps} />
				<Send {...sendProps} />
			</div>
		);
	}
};



export default Messages;

