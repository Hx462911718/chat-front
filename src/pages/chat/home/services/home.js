import request from 'utils/request';

const basePath = "/webchatMgr"

export function myFriends(params) {
  return request(basePath+'/user/queryFriendsById', {
    queryParams: {...params},
    type: 'POST'
  });
}

