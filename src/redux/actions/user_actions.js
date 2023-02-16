import * as types from '../constants/index';

export function addUser(payload) {
    return { type: types.ADD_USER, payload }
};

export function updateUser(payload) {
  return { type: types.USER_UPDATE, payload }
};


export function removeUser(payload) {
  return { type: types.REMOVE_USER, payload }
};
