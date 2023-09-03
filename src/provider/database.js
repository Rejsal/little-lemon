import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon");

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists menuitems (id integer primary key not null, uuid text, name text, price text, category text, description text, image text);"
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql("select * from menuitems", [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  db.transaction(
    (tx) => {
      menuItems.forEach((item, index) => {
        tx.executeSql(
          "INSERT INTO menuitems (id, uuid, name, price, category, description, image) VALUES (?,?,?,?,?,?,?)",
          [
            index + 1,
            `${index + 1}`,
            item.name,
            item.price + "",
            item.category ?? "",
            item.description ?? "",
            item.image ?? "",
          ],
          (_, results) => {
            // Handle successful insert (if needed)
            console.log(`Row inserted with ID: ${results.insertId}`);
          },
          (_, error) => {
            // Handle error (if needed)
            console.error(`Error inserting row: ${error}`);
          }
        );
      });
    },
    null,
    (tx, error) => {
      console.error(`Transaction error: ${error}`);
    }
  );
}

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM menuitems WHERE category IN (${activeCategories
          .map(() => "?")
          .join(", ")}) AND name LIKE ?;`,
        [...activeCategories.map((v) => v.toLowerCase()), `%${query}%`],
        (_, { rows }) => {
          resolve(rows._array);
        }
      );
    });
  });
}
