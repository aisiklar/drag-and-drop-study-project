"use client";

import { ReactNode, useEffect, useState } from "react";
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

  const [headerColumns, setHeaderColumns] = useState<HeaderColumns>([]);
  const [columnsMapped, setColumnsMapped] = useState<ColumnsMapped>([]);
  const [formatUsers, setFormatUsers] = useState<object[]>([]);

  // might be needed in smrt-table
  /* function measureDepth(obj: object, depth: number) {
    for (let key in obj) {
      if (typeof obj[key as keyof object] === "object") {
        depth++;
        measureDepth(obj[key as keyof object], depth);
      }
    }
    return depth;
  }

  measureDepth(users, 1);
 */

  // upon users change or on mnount
  // define headerColumns
  useEffect(() => {
    let temp_headerColumns: HeaderColumns = [];
    let temp_columnsMapped: ColumnsMapped = [];
    for (let key in users[0]) {
      console.log("key: ", key);
      // if the user attribute is an object
      if (typeof users[0][key as keyof User] === "object") {
        // console.log("users[0][key] is an object");
        temp_headerColumns.push({
          header: key,
          subHeader: Object.keys(users[0][key as keyof User]),
          rowSpan: 1,
          colSpan: Object.keys(users[0][key as keyof User]).length,
        });

        for (let subProp of Object.keys(users[0][key as keyof User])) {
          console.log("adding to columnsMapped, subProp ", { prop: subProp });
          temp_columnsMapped.push({ prop: subProp });
        }

        // console.log("added to headerColumns: ", {
        //   [key]: Object.keys(users[0][key as keyof User]),
        // });
      } else {
        temp_headerColumns.push({
          header: key,
          rowSpan: 2,
          colSpan: 1,
        });

        console.log("adding to columnsMapped, key ", { prop: key });
        temp_columnsMapped.push({ prop: key });
        // console.log("added to headerColumns: ", {
        // [key]: users[0][key as keyof User],
        // });
      }
    }
    setHeaderColumns(temp_headerColumns);
    setColumnsMapped(temp_columnsMapped);
  }, [users]);

  // upon change of headerColumns or on mount
  // define formatUsers, re-formatted state of users
  useEffect(() => {
    users.forEach((user, index) => {});
  }, [headerColumns]);

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
                {(item as HeaderColumn)["header"]}
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
        <tbody></tbody>
      </table>
    </>
  );
}
