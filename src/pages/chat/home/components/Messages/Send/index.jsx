
import React, { Component} from 'react';

import classnames from 'classnames';
import './Index.scss';




class SendMsg extends Component{
	constructor(props){
		super(props);
		this.time = null;
		this.flag = false;
    	this.state = {
    		content:"",
    		tips:false
    	};
	}
	componentDidMount(){
		// dia(this);

	}
	isTisp(){
        clearTimeout(this.time);
        this.open("tips");
        this.tips=true;
        this.time = setTimeout(()=>{
            this.close("tips");
        },2400);
    }
	Set(e){
		let {name,value}= e.target;
		if(e.ctrlKey && e.keyCode === 13){
			value=value+"\n";
		};
		this.setState({
			[`${name}`]:value
		});

	}
	filter(str){
		return str(/[|`|~|#|$|^|{|}|\\|[\\]|<|>|~#|——|{|}|【|】]/)
	}
	validate(e){
		let {content} = this.state;
		if(( content.trim().length <= 0) ){
            this.setState({content:content.trim()});
            e.target.value=content.trim();
            this.isTisp();
            return false;
        };
        return true;

	}
	save(){
		const {userInfo,socket,currentChatId} = this.props;
		let {content} = this.state;
		if(this.flag){
			return false;
		};
		this.flag = true;
    socket.emit('chatMessage', {sender:userInfo.id,receiver:currentChatId,msgFlag:"C",content:this.state.content,sendTime:new Date()})
    this.flag = false;
    this.setState({
			content:""
		},()=>{
			this.refs.textarea.value ="";
		});
	}
	enter(e){
		let {ACTIONS,_user,_currentId} = this.props;
		let {name,value}= e.target;
		let {content} = this.state;
		if(e.keyCode === 13 && !this.validate(e)){
			return false;
		}else if(e.ctrlKey && e.keyCode === 13){
			value=value+"\n";
			e.target.value= value;
			this.setState({
				[`${name}`]:value
			});
			return false;
		};
		if( ( content.trim().length && e.keyCode === 13 )){
			this.save();
    console.log("发送内容")
            return false;
        };
        this.setState({
			[`${name}`]:value
		});
	}
	sends(e){
		if(!this.validate(e)){
			return false;
		}else{
			this.enter(e);
		};
	}
	destroy(){
		// let {ACTIONS,_user,_currentId} = this.props;
		// if(_currentId == 1){
		// 	return;
		// };
		// ACTIONS.set_destroy({
		// 	user:_user,id:_currentId
		// });
	}
	render(){
		let {tips,content}=this.state;
		return (
			<div className="send">
			    <textarea placeholder="按 Enter 发送, Ctrl + Enter 可换行" ref="textarea" name="content" onKeyUp={(e)=>this.enter(e)}></textarea>
			    <p className="hadler clearfix">
			        <button className="fl hide" onClick={()=>this.destroy()}>送客</button>
			        <button className="fr" onClick={(e)=>this.sends(e,"enter")}>发送</button>
			        <span className={classnames("tips",{"show":tips})} >不能发送空白信息或特殊字符</span>
			    </p>
			</div>
		);
	}
};


export default SendMsg;

