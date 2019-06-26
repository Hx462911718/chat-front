import "@babel/polyfill";
import $ from 'jquery';
global.$ = $;
global.closeModalWindow = (winId) => {

  window.g_app._store.dispatch({
    type: 'genModels/hideModal',
    payload:{
      winId: winId
    }
  });
}
