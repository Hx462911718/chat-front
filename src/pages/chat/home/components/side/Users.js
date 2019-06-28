import React, {Component} from 'react';
import classnames from 'classnames';
import "./users.scss";
import Info from "./info"
class Users extends Component {
  constructor(props){
    super(props)
  }
  onAdd=(data)=>{

      let transferOpts = {
        visible: true,
        options: {
          url: '/',
          title: '用户信息',
          winType: 'normal',
          height: 210,
          winId: 'info',
          width: 300,
          footer: null,
          onClose: {},// modal关闭的回调函数
        },
        content: {},
        handleCancel:()=>{
          global.closeModalWindow('info');
        },
        children: <Info data={data} socket={this.props.socket} />
        ,
      }
      global.g_app._store.dispatch({
        type:"genModels/showModal",
        payload:{
          ...transferOpts
        }
      })
  }
  render() {
    const {data} = this.props;
    return (
      <div>
        {data?
          data.map((item, i) => {
            return(
            <div className="a" onClick={()=>{this.onAdd(item)}}>
              <div className="b">
                <img className="component-avatar " src={item.face_image}
                     style={{width: "24px", height: "24px", borderRadius: "12px"}}/>
                <p className="c">{item.nickname}</p>
              </div>
              <p className="d">Chrome&nbsp;&nbsp;OS X</p></div>
            );
          }): <h3>暂时未搜索到用户</h3>
      }
      </div>
    );
  }
}



export default Users;
