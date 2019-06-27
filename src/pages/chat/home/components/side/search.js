import React, {Component} from 'react';
import { Button,Input } from 'antd';
import {getTempleMem} from '@/utils/localMemory'
import Users from "./Users"
import "./search.scss"
const Search = Input.Search;
class SearchUser extends Component {
  constructor(props){
    super(props);
  }
  onSearch=(value)=>{
      this.props.dispatch({
          type:"home/queryUserByNickname",
          payload:{
            id:getTempleMem("userInfo").id,
            nickname:value
          }
      }).then((data)=>{
        //关闭搜索模态框
        global.closeModalWindow('searchUser');
        //打开用户列表搜索框
        let transferOpts = {
          visible: true,
          options: {
            url: '/',
            title: '用户列表',
            winType: 'normal',
            height: 210,
            winId: 'users',
            width: 300,
            footer: null,
            onClose: {},// modal关闭的回调函数
          },
          content: {},
          handleCancel:()=>{
            global.closeModalWindow('users');
          },
          children: <Users data={data}/>
          ,
        }
        global.g_app._store.dispatch({
          type:"genModels/showModal",
          payload:{
            ...transferOpts
          }
        })

      })
  }
  render() {

    return (
      <div>
        <div className="rc-dialog-body">
          <div><h3>找好友</h3></div>
            <div className="component-input">
              <Search  onSearch={(value)=>{this.onSearch(value)}} />
            </div>
          </div>
      </div>
    );
  }
}

SearchUser.propTypes = {};

export default SearchUser;
