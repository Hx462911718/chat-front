import React, { Component} from 'react';
import $ from "jquery";
import {connect} from "dva";
import styles from './Index.css';

let winHeight= $(window).height();
let winWidth= $(window).width()

class Login extends Component{
  constructor(props){
    super(props);
    this.flag = false;
    this.state = {
      name: '',
      password: '',
      error:"请随意输入，账号、密码 格式均为英文+数字"
    };
  }
  set=(e)=>{
    let {name,value}=e.target;
    this.setState({
      [`${name}`]:value
    });
  }
  submit=()=>{
    let {name,password}=this.state;
    var name_reg = /^([a-zA-Z0-9]+)$/;
    var pwd_reg = /^([a-zA-Z0-9]){3,15}$/;
    if(!name.trim() || !name_reg.test(name.trim())){
      this.setState({error:"请输入正确的账号"});
      return false;
    }else if(!password.trim()){
      this.setState({error:"请输入您的密码"});
      return false;
    }else if(!pwd_reg.test(password.trim())){
      this.setState({error:"密码格式有误，请重新输入"});
      return false;
    }else{
      this.setState({error:"正在登录中……"});
      if(this.flag){
        return false;
      };
      this.flag = true;
      this.props.dispatch({
          type:'login/login',
          payload:{
            username:name,
            password:password
          }
      }).then((data)=>{
          console.log(data)
        if(data.code === 1){
            //跳转---主页
        }else {
            this.setState({error:`${data.desc}……`})
        }
      })
    };
  }
  keyUp=(e)=>{

    if(e.keyCode === 13){
      this.submit();
    }
  }
  render(){

    let {error} = this.state;
    return (
      <div className={styles.body} style={{width:winWidth,height:winHeight}}>
        <div className={styles["login-form"]}>
          <h1>微信客服</h1>
          <p className={styles.account}><input className={styles["lg-inp"]} maxLength="11" onChange={(e)=>this.set(e)} name="name"  type="text" placeholder="账号"/></p>
          <p className={styles.pwd}><input className={styles["lg-inp"]} type="password" onChange={(e)=>this.set(e)} onKeyUp={(e)=>this.keyUp(e)} name="password"  placeholder="密码" /></p>
          <p className={styles["row-error"]} id="error" style={{color:"red"}}>{error}</p>
          <div className={styles["login-btn"]}>
            <a href="javascript:void(0)" id="submit" onClick={()=>this.submit()} >确 定</a>
          </div>
        </div>
      </div>
    );
  }
};


export default connect(({login})=>({login}))(Login);

