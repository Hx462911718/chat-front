import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import Draggable, { DraggableCore } from 'react-draggable';
import styles from './main.less'
import ReactDOM from 'react-dom'
import common from './common.css'
class ModalHeader extends Component {
  render(){

    const { handleDrag, dragHandlers, title } = this.props;
    return (
      <DraggableCore
        onDrag={handleDrag}
        {...dragHandlers}
      >
        <h4>{title}</h4>
      </DraggableCore>
    );
  }
}

class CommonModal extends Component {

  constructor(props){
    super(props);
    this.state = {
      deltaPosition: {
        x: 0, y: 0
      },
      top: this.props.top || 30,
      left: this.props.left || 50,
      movable: false,
    };
  }



  /**
   * 设置modal由父页面打开
   */
  modalMount = () => {
    try{
      let domObj = document
      let top = window.parent
      while(top.document.getElementById("root")){
        domObj = top.document
        top = top.parent
        if(top == top){
          break
        }
      }
      return domObj.body
    }
    catch (err) {
      return document.body;
    }
  }

  handleDrag = (e, ui) => {
    const { x, y } = this.state.deltaPosition;
    let { top, left } = this.state;
    // const { clientWidth, clientHeight } = document.documentElement;
    // if( top + y + ui.deltaY > clientHeight || left + x + ui.deltaX > clientWidth){
    //     return;
    // }
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
      top: top + y + ui.deltaY,
      left: left + x + ui.deltaX,
    });
  }

  render(){
    let { visible, options, content, handleCancel } = this.props;
    const headerProps = {handleDrag: this.handleDrag, title: options.title};
    let modalWidth = options.width, modalHeight = options.height;
    let modalBodyWidth = modalWidth, modalBodyHeight = modalHeight - 30; // modal高度减去header
    return (
      // <Draggable handle=".ant-modal-header">
      <Modal
        maskStyle={{opacity:0.5}}
        className={styles['customerStyle']}
        title={<ModalHeader {...headerProps} />}
        visible={visible}
        style={{top: this.state.top, left: this.state.left, height: modalHeight,}}
        key={options.winId}
        width={modalWidth}
        footer={options.footer}
        onCancel={handleCancel || options.onClose}
        destroyOnClose={true}
        maskClosable={false}
        getContainer={this.modalMount}
        bodyStyle={{padding:10,overflow: 'auto',height: modalBodyHeight,}}
      >
        {
          options.winType === 'iframe' ?
            (<iframe
              id={options.winId}
              title={options.title}
              src={options.url}
              frameBorder='0'
              scrolling="no"
              style={{width: modalBodyWidth - 20, height: modalBodyHeight - 25}}>
            </iframe>)
            : <div style={{height: modalBodyHeight - 25,}}>{this.props.children}</div>
        }
      </Modal>
      // </Draggable>
    );
  }
}

/*CommonModal.propTypes = {
    handleCancel: PropTypes.func,
    url: PropTypes.string,
    options: PropTypes.object,
    content: PropTypes.any,
}*/

export default CommonModal;
