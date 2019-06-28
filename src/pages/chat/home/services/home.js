import request from 'utils/request';

const basePath = "/webchatMgr"

export function myFriends(params) {
  return request(basePath+'/user/queryFriendsById', {
    queryParams: {...params},
    type: 'POST'
  });
}

export function queryChatMsg(params) {
  return request(basePath+'/user/queryChatMsg', {
    queryParams: {...params},
    type: 'POST'
  });
}

export function queryUserByNickname(params) {
  return request(basePath+'/user/queryUserByNickname', {
    queryParams: {...params},
    type: 'POST'
  });
}

export function queryFriendRequest(params) {
  return request(basePath+'/user/queryFriendRequest', {
    queryParams: {...params},
    type: 'POST'
  });
}
