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

  const [headerColumns, setHeaderColumns] = useState<HeaderColumns>([]);

  // upon users change or on mnount
  // define headerColumns
  useEffect(() => {
    let temp_headerColumns: HeaderColumns = [];
    let temp_columnsMapped: ColumnsMapped = [];
    for (let key in users[0]) {
      console.log("key: ", key);
      temp_headerColumns.push(key);
    }
    setHeaderColumns(temp_headerColumns);
  }, [users]);

  // upon change of headerColumns or on mount
  // define formatUsers, re-formatted state of users
  useEffect(() => {
    users.forEach((user, index) => {});
  }, [headerColumns]);

  console.log("headerColumns:", headerColumns);

  headerColumns.forEach((item, index) => {
    // console.log(item as headerColumn);
    // console.log(Object.keys(item));
    // console.log((item as headerColumn)["header"]);
    // console.log(item[header as keyof item]);
  });

  return (
    <>
      <table className="w-full">
        <thead>
          {/* the number of <tr></tr> can be defined from the data structure. */}
          {/* however here it is assumed fix and x2 */}
          <tr>
            {headerColumns.map((item, index) => (
              <th
                key={index}
                className={" px-[20px] border-b-2 text-center"}
                draggable={true}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              {headerColumns.map((column, cIndex) => (
                <td key={cIndex} className="p-[10px] text-center">
                  x{user[column as keyof User]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
