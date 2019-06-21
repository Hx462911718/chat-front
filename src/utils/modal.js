// import { gridTreeInit, getGridChildById, getGridChildByCode } from 'services/grid';

export const modal = {

  state: {
      modalProps: {
          visible: false,
          options: {
            url: '/',
            title: '',
            winType: 'iframe',
            height: 500,
            width: 500,
            footer: null,
            onClose: {},// modal关闭的回调函数
        },
        content: {},
      },
  },

  reducers: {
    showModal (state, { payload }) {
      return {
        ...state,
        modalProps: {...payload,visible: true},
      }
    },
    hideModal(state, { payload }) {
      return {
        ...state,
        modalProps: {...payload,visible: false},
      }
    },
  },

}

//
// //网格树
// export const grid = {
//   effects: {
//     *gridTreeInit({ payload }, { call, put }){
//       const data = yield call(gridTreeInit, payload);
//       if(data){
//         return data.data;
//       }
//     },
//     *getGridChildById({ payload }, { call, put }){
//       const data = yield call(getGridChildById,payload);
//       if(data){
//         return data.data;
//       }
//     },
//     *getGridChildByCode({ payload }, { call, put }){
//       const { data } = yield call(getGridChildByCode,payload);
//       if(data){
//         return data.data;
//       }
//     },
//   }
//
// }


