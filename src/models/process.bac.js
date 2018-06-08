import { queryAlreadySend, queryAlreadyDo } from '../services/process';

export default {
  namespace: 'process',
  state: {
    process: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAlreadyDo, payload);
      debugger;
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryAlreadySend, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        process: state.process.concat(action.payload),
      };
    },
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        process: state.process.concat(action.payload),
      };
    },
  },
};
