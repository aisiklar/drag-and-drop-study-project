"use client";

import { useEffect, useState } from "react";
import { HeaderColumns, Users, User } from "@/type";

type Props = {
  users: Users;
};

type BeingDraggedFrom_type = {
  column: string;
  beingDraggedCond?: boolean;
};

type BeingDraggedTo_type = {
  column: string;
};

/*

border color when selected for drag and drop: 
for destination: blue/nav
for source: red
*/

export default function UsersTable({ users }: Props) {
  // console.log("users: ", users);

  const [headerColumns, setHeaderColumns] = useState<HeaderColumns>([]);
  const [beingDraggedFromSt, setBeingDraggedFromSt] =
    useState<BeingDraggedFrom_type>({
      column: "",
    });
  const [beingDraggedToSt, setBeingDraggedToSt] = useState<BeingDraggedTo_type>(
    {
      column: "",
    }
  );

  // upon users change or on mount
  // define headerColumns
  useEffect(() => {
    let temp_headerColumns: HeaderColumns = [];
    for (let key in users[0]) {
      // console.log("key: ", key);
      temp_headerColumns.push(key);
    }
    setHeaderColumns(temp_headerColumns);
  }, [users]);

  // upon change of headerColumns or on mount
  // define formatUsers, re-formatted state of users
  useEffect(() => {
    users.forEach((user, index) => {});
  }, [headerColumns]);

  // console.log("headerColumns:", headerColumns);

  headerColumns.forEach((item, index) => {
    // console.log(item as headerColumn);
    // console.log(Object.keys(item));
    // console.log((item as headerColumn)["header"]);
    // console.log(item[header as keyof item]);
  });

  function onDragStartHandler(e: any, column: string) {
    console.log("onDragStartHandler triggered, column: ", column);
    let temp_beingDraggedFromSt = JSON.parse(
      JSON.stringify(beingDraggedFromSt)
    );
    temp_beingDraggedFromSt.column = column;
    setBeingDraggedFromSt(temp_beingDraggedFromSt);
  }
  function onDragEndHandler(e: any, column: string) {
    console.log("onDragEndHandler triggered, column: ", column);
    setBeingDraggedFromSt({ column: "" });
    setBeingDraggedToSt({ column: "" });
  }

  function onDragOverHandler(e: any, column: string) {
    console.log("onDragOverHandler triggered, column: ", column);
    let temp_beingDraggedToSt = JSON.parse(JSON.stringify(beingDraggedToSt));
    let currentToBeforeColumnIndex = headerColumns.indexOf(column);
    temp_beingDraggedToSt = {
      column: headerColumns[currentToBeforeColumnIndex],
    };
    setBeingDraggedToSt(temp_beingDraggedToSt);
  }

  function onDropHandler(e: any, column: string) {
    console.log("onDropHandler, column: ", column);
  }
  // log statest
  console.log("beingDraggedFromSt: ", beingDraggedFromSt);

  console.log("beingDraggedToSt: ", beingDraggedToSt);

  return (
    <>
      <table className="w-full">
        <thead>
          {/* the number of <tr></tr> can be defined from the data structure. */}
          {/* however here it is assumed fix and x2 */}
          <tr>
            {headerColumns.map((column, index) => (
              <th
                key={index}
                draggable={true}
                onDragStart={(e) => onDragStartHandler(e, column)}
                onDragEnd={(e) => onDragEndHandler(e, column)}
                onDragOver={(e) => onDragOverHandler(e, column)}
                onDrop={(e) => onDropHandler(e, column)}
                className={
                  beingDraggedFromSt.column === column
                    ? "px-[20px] border-x-2 border-y-2 border-x-red-400 border-y-red-400 text-center"
                    : beingDraggedFromSt.column !== column &&
                      beingDraggedToSt.column === column
                    ? "px-[20px] border-x-2 border-y-2 border-x-blue-400 border-y-blue-400 text-center"
                    : "px-[20px] border-b-2 text-center "
                }
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {users.map((user, index) => (
            <tr key={index} draggable={true} className="odd:bg-gray-300">
              {headerColumns.map((column, cIndex) => (
                <td
                  draggable={false}
                  key={cIndex}
                  className={
                    index == users.length - 1 &&
                    beingDraggedFromSt.column === column
                      ? "px-[20px] border-x-2 border-x-red-400 text-center  border-y-2 border-b-red-400 "
                      : index == users.length - 1 &&
                        beingDraggedFromSt.column !== column &&
                        beingDraggedToSt.column === column
                      ? "px-[20px] border-x-2 border-x-blue-400 text-center  border-y-2 border-b-blue-400 "
                      : beingDraggedFromSt.column === column
                      ? "px-[20px] border-x-2 border-x-red-400 text-center  "
                      : beingDraggedFromSt.column !== column &&
                        beingDraggedToSt.column === column
                      ? "px-[20px] border-x-2 border-x-blue-400 text-center  "
                      : "p-[10px] text-center"
                  }
                >
                  {user[column as keyof User]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
