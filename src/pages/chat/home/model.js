import * as services from "./services/home";
import modelExtend from "dva-model-extend";
import {getTempleMem} from '@/utils/localMemory'
import { modal } from 'utils/modal';
import router from "umi/router"

export default modelExtend(modal, {

  namespace:"home",

  state:{
    isNextPage:false,
    friends:[],
    currentChatId:"",
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if(location.pathname ==="/chat/home"){

            const  userInfo = getTempleMem("userInfo");
            if(userInfo){
              //todo 加载用户好用列表
              dispatch({
                  type:"myFriends",
                  payload:{
                      id:userInfo.id
                  }
              }).then((data)=>{

                if(data.length > 0) {

                  //todo 加载第一个用户的聊天信息
                  dispatch({
                    type: "querySuccess",
                    payload: {currentChatId: data[0].id}
                  })
                }
              })



            }else {
              router.push("/chat/login")
            }

        }
      })
    }
  },

  effects:{

    * myFriends({payload}, {call, put}) {
      const {data} = yield call(services.myFriends, payload);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            friends:data
          }
        })
        return data;
      }
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
