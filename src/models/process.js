import { queryAlreadySend,  queryAlreadyDo, getAllSystems, getProcessEnums } from '../services/process';

export default {

  state: {
    data: {
      list: [],
      pagination: {},
    },
    formTypes:[],
    processStatus:[],
    systems:[],
    formTitle:"初始化标题"
  },

  namespace: 'process',

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAlreadyDo, payload);
      yield put({
        type: 'queryList',
        payload: response,pagination:payload
      });
    },
    *fetchApprovingTasks({ payload }, { call, put }) {
      const response = yield call(queryAlreadyDo, payload);
      yield put({
        type: 'queryList',
        payload: response,pagination:payload
      });
    },
    *getProcessEnums({ payload }, { call, put }) {
      const response = yield call(getProcessEnums, payload);
      yield put({
        type: 'saveProcessEnums',
        payload:response
      });
    },

    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryAlreadyDo, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchAllSystems(_, { call, put }) {
      const response = yield call(getAllSystems);
      yield put({
        type: 'querySystems',
        payload: Array.isArray(response.datas) ? response.datas : [],
      });
    },
    *changeFormTitle({payload}, { put }) {
      const response = {formTitle:payload.formTitle};
      yield put({
        type: 'changeTitle',
        payload: response,
      });
    },

  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    changeTitle(state, { payload }) {
      return {
        ...state,
        formTitle: payload.formTitle,
      };
    },
    querySystems(state, action) {
      return {
        ...state,
        systems: action.payload,
      };
    },
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveProcessEnums(state, action) {
      return {
        ...state,
        formTypes: action.payload.formTypes,
        processStatus:action.payload.processStatus
      };
    },
    appendList(state, action) {
      return {
        ...state,
        //process: state.process.concat(action.payload),
        process: {formTitle:'新标题'}
      };
    },
  },
};
