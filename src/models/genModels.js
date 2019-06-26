import uuid from 'uuid/v4'

/**
 * 生产模态框模型
 */

export default {
  namespace:"genModels",
  state:{
    arrs:[],
    modalAct:''
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        dispatch({
          type:"refreshModalArr",
          payload:{
            arrs:[],
            modalAct:''
          }
        })
      })
    }
  },

  reducers: {
    /**
     * 刷新路由时清空弹框
     * @param state
     * @param action
     * @returns {{}}
     */
    refreshModalArr(state, {payload }) {
      return {...state, ...payload};
    },
    /**
     * 添加模态框
     * @param state
     * @param action
     * @returns {{}}
     */
    addModalToArr(state, {payload }) {
      state.arrs.push(payload)
      return {...state};
    },
    /**
     * 隐藏模态框
     * @param state
     * @param action
     * @returns {{}}
     */
    hideModal(state, { payload }) {
      let cloneState = {...state}
      let reset = -1
      cloneState.arrs.filter((val,index) => {
        if(val.options.winId === payload.winId){
          reset = index
          val.visible = false
        }
      })
      if(reset > -1){
        cloneState.arrs.splice(reset, 1);
      }else{
        cloneState.arrs.pop();
      }
      return {...cloneState,modalAct:'close'}
    },
    /**
     * 展示模态框
     * @param state
     * @param payload
     */
    showModal (state, { payload }) {
      let {options} = payload
      let ishave = false
      let cloneState = {...state}
      cloneState.arrs.filter((val) => {
        if(val.options.winId === options.winId){
          val.visible = true
          ishave = true
        }
      })
      if(!ishave){
        cloneState.arrs.push(payload)
      }
      return {...cloneState,modalAct:uuid()}
    },

  }


}
