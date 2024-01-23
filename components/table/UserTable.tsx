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
  let columnsMapped2: object[] = [];

  function measureDepth(obj: object, depth: number) {
    for (let key in obj) {
      console.log("key: ", key);
      if (typeof obj[key as keyof object] === "object") {
        depth++;
        measureDepth(obj[key as keyof object], depth);
      }
    }
    return depth;
  }

  


  let depth = measureDepth(users[0], 1);
  console.log("depth:", depth);

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
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              {columnsMapped2.map((item, cIndex) => (
                <td key={cIndex}>
                  {item.prop.length === 1
                    ? user[item.prop[0]]
                    : "2" + user[item.prop[0][item.prop[1]]]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
