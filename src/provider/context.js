import { createContext, useContext, useEffect, useReducer } from "react";
import { appReducer } from "./reducers";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  IS_LOGGED_IN,
  MENU_ITEM_REQUEST,
  MENU_ITEM_RESPONSE,
  SIGN_UP_LOADING,
  TOKEN,
  UPDATE_PROFILE,
} from "./action-types";
import {
  createTable,
  filterByQueryAndCategories,
  getMenuItems,
  saveMenuItems,
} from "./database";

const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

const AppContext = createContext(undefined);

const initialState = {
  isLoading: false,
  isOnboardingCompleted: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const getIsLoggedIn = async () => {
    dispatch({ type: SIGN_UP_LOADING, isLoading: true });
    try {
      const data = await AsyncStorage.getItem(TOKEN);
      dispatch({
        type: IS_LOGGED_IN,
        isOnboardingCompleted: data ? true : false,
        profile: data ? JSON.parse(data) : {},
      });
    } catch (e) {
      Alert.alert("", "Error occurred during signup. Please try again.");
    } finally {
      dispatch({ type: SIGN_UP_LOADING, isLoading: false });
    }
  };

  useEffect(() => {
    getIsLoggedIn();
  }, []);

  const signup = async (payload) => {
    dispatch({ type: SIGN_UP_LOADING, isLoading: true });
    try {
      await AsyncStorage.setItem(TOKEN, JSON.stringify(payload));
      dispatch({
        type: IS_LOGGED_IN,
        isOnboardingCompleted: true,
        profile: payload,
      });
    } catch (e) {
      Alert.alert("", "Error occurred during signup. Please try again.");
    } finally {
      dispatch({ type: SIGN_UP_LOADING, isLoading: false });
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(TOKEN);
      dispatch({
        type: IS_LOGGED_IN,
        isOnboardingCompleted: false,
        profile: {},
      });
    } catch (e) {}
  };

  const updateProfile = async (payload) => {
    try {
      await AsyncStorage.setItem(TOKEN, JSON.stringify(payload));
      dispatch({
        type: UPDATE_PROFILE,
        profile: payload,
      });
      Alert.alert("", "Profile updated");
    } catch (e) {
      Alert.alert("", "Unknown error occurred");
    }
  };

  const getMenuProducts = async () => {
    dispatch({
      type: MENU_ITEM_REQUEST,
    });
    try {
      await createTable();
      let menuItems = await getMenuItems();
      if (!menuItems.length) {
        const response = await fetch(API_URL);
        const responseJson = await response.json();
        menuItems = responseJson?.menu ?? [];
        saveMenuItems(menuItems);
      }
      dispatch({
        type: MENU_ITEM_RESPONSE,
        menuItems: menuItems,
      });
    } catch (e) {
      Alert.alert("", e?.message ?? "Unknown error occurred");
      dispatch({
        type: MENU_ITEM_RESPONSE,
        menuItems: [],
      });
    }
  };

  const searchOrfilterMenuItems = async (query, activeCategories) => {
    try {
      const menuItems = await filterByQueryAndCategories(
        query,
        activeCategories
      );
      dispatch({
        type: MENU_ITEM_RESPONSE,
        menuItems: [...menuItems],
      });
    } catch (e) {
      Alert.alert("", e?.message ?? "Unknown error occurred");
    }
  };

  const value = {
    ...state,
    signup,
    getIsLoggedIn,
    logout,
    updateProfile,
    getMenuProducts,
    searchOrfilterMenuItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("AppContext must be used within a RegistrationProvider");
  }
  return context;
};

export default AppProvider;
