import * as services from "./services/home";
import IO from 'socket.io-client'
import modelExtend from "dva-model-extend";
import {getTempleMem, setTempleMem} from '@/utils/localMemory'
import config from "@/config/socketClient";
import { modal } from 'utils/modal';
import router from "umi/router"

export default modelExtend(modal, {

  namespace:"home",

  state:{
    isNextPage:false,
    friends:[],
    currentChatId:"",
    messages:[],
    currentChatUser:{},
    reList:[],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if(location.pathname ==="/chat/home"){

            const  userInfo = getTempleMem("userInfo");
            if(userInfo){
              const options = {
                query: {
                  mac: getTempleMem("userInfo").id, //todo 客户id
                }
              }
              const socket = new IO(config.server, options);
              dispatch({
                type:"refreshUi",
                payload:{socket:socket}
              });
              dispatch({
                type:"queryFriendRequest",
                payload:{
                  id:userInfo.id
                }
              })
              //todo 加载用户好用列表
              dispatch({
                  type:"myFriends",
                  payload:{
                      id:userInfo.id
                  }
              }).then((data)=>{

                if(data.length > 0) {
                  dispatch({
                      type:"queryChatMsg",
                      payload:{
                        acceptUserId:data[0].id,
                        sendUserId:userInfo.id
                      }
                  })
                  dispatch({
                    type: "querySuccess",
                    payload: {
                      currentChatId: data[0].id,
                      currentChatUser:data[0]
                    }
                  })
                  setTempleMem("sessionId",data[0].id)
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

    * queryUserByNickname({payload}, {call, put}) {
      const {data} = yield call(services.queryUserByNickname, payload);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {

          }
        })
        return data;
      }
    },

    * queryChatMsg({payload}, {call, put}) {
      const {data} = yield call(services.queryChatMsg, payload);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            messages:data
          }
        })
        return data;
      }
    },
    * queryFriendRequest({payload}, {call, put}) {
      const {data} = yield call(services.queryFriendRequest, payload);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            reList:data
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
