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
      headerColumns.push({ [key]: Object.keys(users[0][key as keyof User]) });

      // console.log("added to headerColumns: ", {
      //   [key]: Object.keys(users[0][key as keyof User]),
      // });
    } else {
      headerColumns.push({ [key]: users[0][key as keyof User] });
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

  return (
    <>
      <table className="m-2  p-2">
        <thead>
          <tr className="">
            <th className=" px-[20px] border-b-2 " rowSpan={2} colSpan={1}>
              columnA
            </th>
            <th className="px-[20px] border-b-2" rowSpan={2} colSpan={1}>
              columnB
            </th>
            <th className="px-[20px] " rowSpan={1} colSpan={3}>
              columnC
            </th>
            <th className="px-[20px]  border-b-2 " rowSpan={2} colSpan={1}>
              columnD
            </th>
            <th className="px-[20px]  border-b-2 " rowSpan={2} colSpan={1}>
              columnE
            </th>
            <th className="px-[20px]   " rowSpan={1} colSpan={2}>
              columnF
            </th>
          </tr>
          <tr className="border-b-2">
            <th className="px-[20px]">C1</th>
            <th className="px-[20px]">C2</th>
            <th className="px-[20px]">C3</th>
            <th className="px-[20px]">F1</th>
            <th className="px-[20px]">F2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">1</td>
            <td className="text-center">2</td>
            <td className="text-center">3</td>
            <td className="text-center">4</td>
            <td className="text-center">5</td>
            <td className="text-center">6</td>
            <td className="text-center">7</td>
            <td className="text-center">8</td>
            <td className="text-center">9</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
