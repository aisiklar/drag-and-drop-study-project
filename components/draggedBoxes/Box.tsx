"use client";
import { useState } from "react";

type Props = {
  text: string;
};

export default function Box(props: Props) {
  const [beingDragged, setBeingDragged] = useState<boolean>(false);

  // console.log("beingDragged: ", beingDragged);

  function onDragStartHandler() {
    console.log("in onDragStartHandler");
    setBeingDragged(true);
  }
  function onDragEndHandler() {
    console.log("in onDragEndHandler");
    setBeingDragged(false);
  }

  return (
    <div
      draggable={true}
      onDragStart={onDragStartHandler}
      onDragEnd={onDragEndHandler}
      className={
        beingDragged
          ? "bg-slate-500 w-[200px] border rounded my-[30px]"
          : "bg-red-100 w-[200px] border rounded my-[30px]"
      }
    >
      <p>{props.text}</p>
    </div>
  );
}
