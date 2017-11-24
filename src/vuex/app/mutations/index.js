import * as types from 'vuexs/app/mutation-types';

export default {
  [types.RECEIVE_ALL] (state, { messages }) {
    state.threads = messages;
  },
  MT_GETUSERINFO (state, data) {
    state.appUserInfo = data
  }
};
