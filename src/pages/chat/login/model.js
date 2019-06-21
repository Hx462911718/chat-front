import * as services from "./services/login";
import modelExtend from "dva-model-extend";
import { modal } from 'utils/modal';

export default modelExtend(modal, {

  namespace:"login",

  state:{
    isNextPage:false,

  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
      })
    }
  },

  effects:{

    //创建会话
    *login({ payload }, { call, put }){
      const  result = yield call(services.login,payload);
      return result;
    },

  },

  reducers:{
    refreshUi(state,{payload}){
      return {...state, ...payload};
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
    noNextPage(state) {
      return { ...state, loading: false, isNextPage: false }
    },

  }


});
