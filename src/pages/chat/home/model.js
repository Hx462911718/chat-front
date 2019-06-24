// import * as services from "./services/login";
import modelExtend from "dva-model-extend";
import {getTempleMem} from '@/utils/localMemory'
import { modal } from 'utils/modal';
import router from "umi/router"

export default modelExtend(modal, {

  namespace:"home",

  state:{
    isNextPage:false,

  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if(location.pathname ==="/chat/home"){

            const  userInfo = getTempleMem("userInfo");
            if(userInfo){

              //todo 加载用户好用列表
              //todo 加载第一个用户的聊天信息

            }else {
              router.push("/chat/login")
            }

        }
      })
    }
  },

  effects:{
    //创建会话
    // *login({ payload }, { call, put }){
    //   const  result = yield call(services.login,payload);
    //   return result;
    // },

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
