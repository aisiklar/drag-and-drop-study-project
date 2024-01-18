"use client";

import { ReactNode } from "react";

type Props = {
  users: Users;
};

/*

border color when selected for drag and drop: #0075FF
*/

export default function UsersTable({ users }: Props) {
  console.log("users: ", users);

  // define the column headers

  let headerColumns: object[] = [];

  for (let key in users[0]) {
    // console.log("key: ", key);
    if (typeof users[0][key as keyof User] === "object") {
      // console.log("users[0][key] is an object");
      headerColumns.push({
        header: [key],
        subHeader: Object.keys(users[0][key as keyof User]),
        rowSpan: 1,
        colSpan: Object.keys(users[0][key as keyof User]).length,
      });

      // console.log("added to headerColumns: ", {
      //   [key]: Object.keys(users[0][key as keyof User]),
      // });
    } else {
      headerColumns.push({
        header: [key],
        rowSpan: 2,
        colSpan: 1,
      });
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

  headerColumns.forEach((item, index) => {
    console.log(item as headerColumn);
    console.log(Object.keys(item));
    console.log((item as headerColumn)["header"]);
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
                rowSpan={(item as headerColumn)["rowSpan"]}
                colSpan={(item as headerColumn)["colSpan"]}
                className={
                  (item as headerColumn)["rowSpan"] === 2
                    ? " px-[20px] border-b-2 "
                    : " px-[20px] "
                }
              >
                {(item as headerColumn)["header"][0]}
              </th>
            ))}
          </tr>
          <tr className="border-b-2">
            {headerColumns.map((item, index) =>
              (item as headerColumn)["subHeader"]
                ? (item as headerColumn)["subHeader"]!.map((item, index) => (
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
