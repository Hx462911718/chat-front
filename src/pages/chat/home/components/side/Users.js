import React, {Component} from 'react';
import classnames from 'classnames';
import "./users.scss";
class Users extends Component {
  constructor(props){
    super(props)
  }
  render() {
    const {data} = this.props;
    return (
      <div>
        {data?
          data.map((item, i) => {
            return(
            <div className="a">
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
