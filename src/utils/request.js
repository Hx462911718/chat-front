import fetch from 'dva/fetch';
import qs from 'query-string'
import router from 'umi/router';
import { notification } from 'antd';
import {getPersistenceMem,clearLocalMem} from '@/utils/localMemory'

//用来发送ajax请求

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  302:' 重定向到登录页面',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }else{

  /*  clearLocalMem();
    router.push("/");*/
  }
  /* const errortext = codeMessage[response.status] || response.statusText;
   notification.error({
     message: `请求错误 ${response.status}: ${response.url}`,
     description: errortext,
   });
   const error = new Error(errortext);
   error.name = response.status;
   error.response = response;*/
  //throw error;
};

const  checkRedirect=(data)=>{
    if(data.code === 302){
      // alert("重定向");
      window.location.href=data.data.toUrl;
    }


}


export default async function request(url,options={}) {

  url = url;
  const {type,queryParams} = options
  delete options.queryParams
  options.headers={
    'Content-Type':'application/json',
  }
  switch (type){
    case 'GET':
      options.method='GET'
      if(!!queryParams){
        url += '?'+ qs.stringify(queryParams)
      }
      break
    case 'PATHGET':
      url += '/'+ queryParams
      options.method='GET'
      break
    case 'PATHGET2':
      url += '/'+ queryParams
      options.method='PUT'
      break
    case 'PATHGET3':
      url += '/'+ queryParams+'/sx'
      options.method='PUT'
      break
    case 'PATHGET4':
      url += '/'+ queryParams
      options.method='POST'
      break
    case 'PATHGET5':
      url += '/'+ queryParams.serverId+'/'+queryParams.state
      options.method='PUT'
      break
    case 'POST':
      options.method='POST'
      options.body=JSON.stringify(queryParams)
      break
    case 'FORMPOST':
      options.headers = {...options.headers, 'Content-Type':'application/x-www-form-urlencoded' }
      options.method='POST'
      options.body=qs.stringify(queryParams)
      break;
    case 'FILEPOST':
      options.headers = {
        'ticket' : getPersistenceMem("data") && getPersistenceMem("data")["ticket"],
        //'Content-Type':'application/json',
        'Content-Type':'multipart/form-data'
      };
      options.method='POST'
      options.body=qs.stringify(queryParams)
      break
    case 'PAGEPOST':
      url+='?searchCount='+queryParams.searchCount+'&size='+queryParams.size+'&current='+queryParams.current;
      options.method='POST';
      options.body=JSON.stringify(queryParams);
      break;
    case 'PATHPOST':
      const keys = Object.keys(queryParams.pathParams);
      const vals = Object.values(queryParams.pathParams);
      for(let i=0;i<keys.length;i++){
        if(i==0){
          url+='?'+keys[i]+'='+vals[i]
        }else{
          url+='&'+keys[i]+'='+vals[i]
        }
      }
      options.method='POST';
      options.body=JSON.stringify(queryParams);
      break;
    case 'PARAMPOST':
      const keyz= Object.keys(queryParams.payload);
      const valz = Object.values(queryParams.payload);
      for(let i=0;i<keyz.length;i++){
        if(i==0){
          url+='?'+keyz[i]+'='+valz[i]
        }else{
          url+='&'+keyz[i]+'='+valz[i]
        }
      }
      options.method='POST';
      options.body=JSON.stringify(queryParams);
      break;
    default:
      options.method='POST';
      options.body=JSON.stringify(queryParams)
  }
  const response=await fetch(url,options);
  checkStatus(response);
  const data=await response.json();
  //todo 数据标识 为无权限时跳转登录页，不应为0，需增加一个数据状态
  checkRedirect(data);
  return data;
}

