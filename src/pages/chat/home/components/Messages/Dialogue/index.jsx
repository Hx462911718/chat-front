/*
 * @authors :Bin Mei
 * @date    :2017-05-22
 * @description：react-redux-chat  -> 仿微信聊天工具
 */

import React, {Component} from 'react';
import classnames from 'classnames';
import {Scrollbars} from 'react-custom-scrollbars';


import './Index.scss';


class Dialogue extends Component {
  constructor(props) {
    super(props);
    const {socket,refreMsg} = this.props;
    this.state = {
      z: 1
    };
    socket.on('messageEvent', function () {
      refreMsg();
    });
  }

  componentDidMount() {
    //dia(this);
  }

  _goTo(y) {
    console.log(y)
  }

  time(date, prevDate) {
    // console.log(date,prevDate)
    let Interval = 2 * 60 * 1000;//区间
    let _date = new Date(date);
    let _prevDate = new Date(prevDate);
    let ret = _date.getTime() - _prevDate.getTime();
    if (ret >= Interval) {
      return _date.getFullYear() + "-" + (_date.getMonth() + 1) + "-" + _date.getDate();
    }
    ;
    return "";
  }

  link(str) {
    var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/ig
    return str.replace(reg, '<a className="link" target="_bank" href="$1$2">$1$2</a>')
  }

  render() {
    let {currentChatUser, userInfo, messages} = this.props;
    console.log(currentChatUser);
    return (

      <section className="message-w">
        <header className="group-name">
          <h3>测试用户</h3>
        </header>
        <div className="message">
          <Scrollbars>
            <ul>
              <li className="first"><span className="history">查看更多历史消息</span></li>
              {
                messages.map((item, i) => {
                  let self =false;
                  if(item.send_user_id === userInfo.id){
                        self =  true;
                  }
                  return (
                    <li key={i}>
                      {
                        i != 0 && this.time(item.create_time,messages[i - 1].create_time) != '' ? (
                          <p className="time">
                            <span>{this.time(item.create_time, messages[i - 1].create_time)}</span>
                          </p>
                        ) : (
                          null
                        )
                      }

                      <div className={classnames("main", {"self": self})}>
                        <img className="avatar" width="35" height="35"
                             src={self ? userInfo.faceImage : currentChatUser.faceImage}/>
                        <div className="text" dangerouslySetInnerHTML={{__html: this.link(item.msg)}}/>
                      </div>
                    </li>
                  );
                })
              }
            </ul>
          </Scrollbars>
        </div>
        <div className="dialog">
          <p className="mask"></p>
          <div className="dia-cont">
            <div className="clearfix">
              <p className="avatar"><img src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg" alt=""/></p>
              <p className="nickname fl">测试的</p>
            </div>
            <p className="remark">
              <label htmlFor=""> 备注 </label>
              <input className="input" maxLength="10" placeholder="点击添加备注" type="text"/>
            </p>
          </div>
        </div>
      </section>
    );
  }
};


export default Dialogue;

