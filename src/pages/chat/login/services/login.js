import request from 'utils/request';

const basePath = "/webchatMgr"

export function login(params) {
  return request(basePath+'/user/registOrLogin', {
    queryParams: {...params},
    type: 'POST'
  });
}

