import {
  IS_LOGGED_IN,
  MENU_ITEM_REQUEST,
  MENU_ITEM_RESPONSE,
  SIGN_UP_LOADING,
  UPDATE_PROFILE,
} from "./action-types";

export const appReducer = (state, action) => {
  switch (action.type) {
    case SIGN_UP_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case IS_LOGGED_IN:
      return {
        ...state,
        isLoading: false,
        isOnboardingCompleted: action.isOnboardingCompleted,
        profile: action.profile,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case MENU_ITEM_REQUEST:
      return {
        ...state,
        menuItemLoading: true,
      };
    case MENU_ITEM_RESPONSE:
      return {
        ...state,
        menuItemLoading: false,
        menuItems: action.menuItems,
      };
    default:
      return {
        ...state,
      };
  }
};
