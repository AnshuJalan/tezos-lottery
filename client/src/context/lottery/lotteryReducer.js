import {
  GET_WALLET,
  GET_DATA,
  BUTTON_LOADING,
  BUY_SUCCESS,
  BUY_TERMINATE,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_WALLET:
      return {
        ...state,
        account: action.payload.account,
        balance: action.payload.balance,
        instance: action.payload.instance,
      };
    case GET_DATA:
      return {
        ...state,
        buyers: action.payload.buyers,
        prev: action.payload.prev,
        limit: action.payload.limit,
        remaining: action.payload.remaining,
        pageLoading: false,
      };
    case BUTTON_LOADING:
      return {
        ...state,
        buttonLoading: true,
      };
    case BUY_SUCCESS:
      return window.location.reload();
    case BUY_TERMINATE:
      return {
        ...state,
        buttonLoading: false,
      };
    default:
      return state;
  }
};
