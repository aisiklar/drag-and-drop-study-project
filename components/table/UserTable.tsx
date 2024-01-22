"use client";

import { ReactNode } from "react";
import {
  HeaderColumn,
  HeaderColumns,
  ColumnsMapped,
  ColumnMapped,
  Users,
  User,
} from "@/type";

type Props = {
  users: Users;
};

/*

border color when selected for drag and drop: #0075FF
*/

export default function UsersTable({ users }: Props) {
  console.log("users: ", users);

  // define the column headers

  let headerColumns: HeaderColumns = [];
  let columnsMapped: ColumnsMapped = [];

  for (let key in users[0]) {
    // console.log("key: ", key);
    // if the user attribute is an object
    if (typeof users[0][key as keyof User] === "object") {
      // console.log("users[0][key] is an object");
      headerColumns.push({
        header: key,
        subHeader: Object.keys(users[0][key as keyof User]),
        rowSpan: 1,
        colSpan: Object.keys(users[0][key as keyof User]).length,
      });

      for (let subProp of Object.keys(users[0][key as keyof User])) {
        columnsMapped.push({ prop: key, subProp: subProp });
      }

      // console.log("added to headerColumns: ", {
      //   [key]: Object.keys(users[0][key as keyof User]),
      // });
    } else {
      headerColumns.push({
        header: key,
        rowSpan: 2,
        colSpan: 1,
      });
      columnsMapped.push({ prop: key });
      // console.log("added to headerColumns: ", {
      // [key]: users[0][key as keyof User],
      // });
    }
  }

  for (let i in headerColumns) {
    // console.log("i: ", i);
    // console.log("keys of headerColumns:", Object.keys(headerColumns[i]));
  }
  console.log("headerColumns:", headerColumns);
  console.log("columnsMapped: ", columnsMapped);

  headerColumns.forEach((item, index) => {
    // console.log(item as headerColumn);
    // console.log(Object.keys(item));
    // console.log((item as headerColumn)["header"]);
    // console.log(item[header as keyof item]);
  });

  return (
    <>
      <table>
        <thead>
          {/* the number of <tr></tr> can be defined from the data structure. */}
          {/* however here it is assumed fix and x2 */}
          <tr>
            {headerColumns.map((item, index) => (
              <th
                key={index}
                rowSpan={(item as HeaderColumn)["rowSpan"]}
                colSpan={(item as HeaderColumn)["colSpan"]}
                className={
                  (item as HeaderColumn)["rowSpan"] === 2
                    ? " px-[20px] border-b-2 "
                    : " px-[20px] "
                }
              >
                {(item as HeaderColumn)["header"][0]}
              </th>
            ))}
          </tr>
          <tr className="border-b-2">
            {headerColumns.map((item, index) =>
              (item as HeaderColumn)["subHeader"]
                ? (item as HeaderColumn)["subHeader"]!.map((item, index) => (
                    <th className="px-[20px]" key={index}>
                      {item}
                    </th>
                  ))
                : null
            )}
          </tr>
        </thead>
        <tbody>
          {users.map((user, userIndex) => {
            console.log("user: ", user);
            console.log("userIndex: ", userIndex);
            return (
              <tr key={userIndex}>
                {columnsMapped.map((column, index) => {
                  console.log("column: ", column);
                  console.log(
                    "column.prop/column.subProp: ",
                    column.prop,
                    column.subProp
                  );
                  let prop = column.prop;
                  let subProp = column.subProp;
                  console.log(
                    "user.xxx",
                    subProp ? user[prop][subProp] : user[prop]
                  );
                  console.log("index: ", index);
                  return column.subProp ? (
                    <td key={index}>{{user[prop][subProp]}}</td>
                  ) : (
                    <td key={index}> {user[prop]} </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
