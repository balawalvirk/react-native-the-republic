import {
  SET_MY_GROUPS,
  SET_MY_JOINED_GROUPS
} from '../actionTypes'


export const setMyGroups = data => {
    return {
        type: SET_MY_GROUPS,
        payload: data,
    };
};

export const setMyJoinedGroups = data => {
  return {
      type: SET_MY_JOINED_GROUPS,
      payload: data,
  };
};



