import JsonUtils from './JsonUtils'

export function getPersistenceMem(key) {
  return JsonUtils.stringToJson(window.localStorage.getItem(key))
}

export function setPersistenceMem(key,data) {
  return window.localStorage.setItem(key,JsonUtils.jsonToString(data))
}

export function setTempleMem(key,data) {
  return window.sessionStorage.setItem(key,JsonUtils.jsonToString(data))
}

export function getTempleMem(key) {
  return JsonUtils.stringToJson(window.sessionStorage.getItem(key))
}

export function clearTempleMem() {
   window.sessionStorage.clear()
}

export function clearPersistenceMem() {
   window.localStorage.clear()
}

export function clearLocalMem() {
  clearPersistenceMem()
  clearTempleMem()
}


/*
export default {
  clearLocalMem,
  clearPersistenceMem,
  clearTempleMem,
  getTempleMem,
  setTempleMem,
  setPersistenceMem,
  getPersistenceMem
}
*/
