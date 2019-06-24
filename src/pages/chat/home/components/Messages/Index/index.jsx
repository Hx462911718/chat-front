

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
		let {_sessions,_currentChat,_currentId} = this.props;

		// if(!Object.keys(_currentChat).length || _currentChat.id != _currentId){
		// 	return (
		// 		<div className="dialogue-tips">请选择要对话的用户</div>
		// 	);
		// };
		return (
			<div className="chat-main">
				<Dialogue />
				<Send />
			</div>
		);
	}
};



export default Messages;

