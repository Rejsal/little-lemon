import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./common/Header";
import Hero from "./common/Hero";
import Filters from "./common/Filters";
import { useAppContext } from "../provider/context";
import MenuItem from "./common/MenuItem";
import debounce from "lodash.debounce";
import { useUpdateEffect } from "../useUpdateEffect";

const sections = ["Starters", "Main", "Desserts", "Drinks"];

const Home = ({ navigation }) => {
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );
  const [query, setQuery] = useState("");
  const [searchBarText, setSearchBarText] = useState("");
  const {
    menuItemLoading,
    menuItems,
    getMenuProducts,
    searchOrfilterMenuItems,
    profile,
  } = useAppContext();

  useEffect(() => {
    getMenuProducts();
  }, []);

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        // If all filters are deselected, all categories are active
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });

      searchOrfilterMenuItems(query, activeCategories);
    })();
  }, [filterSelections, query]);

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        profile={profile}
        onClickProfile={() => {
          navigation.navigate("Profile");
        }}
      />
      <Hero onSearch={handleSearchChange} searchedValue={searchBarText} />
      <Filters
        sections={sections}
        selections={filterSelections}
        onChange={handleFiltersChange}
      />
      {menuItemLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={menuItems}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.1)",
                marginVertical: 5,
              }}
            />
          )}
          renderItem={({ item }) => <MenuItem {...item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
