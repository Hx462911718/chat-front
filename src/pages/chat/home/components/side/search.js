import React, {Component} from 'react';
import { Button,Input } from 'antd';
import PropTypes from 'prop-types';
const Search = Input.Search;
class SearchUser extends Component {
  render() {
    return (
      <div>
        <div className="rc-dialog-body">
          <div className="content"><h3>请输入昵称</h3>
            <div className="component-input">
              <Search type="text" value="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchUser.propTypes = {};

export default SearchUser;
