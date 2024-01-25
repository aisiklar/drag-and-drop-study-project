"use client";
import { useState } from "react";

type Props = {
  text: string;
  id: string;
};

type DraggedType = {
  box: string;
  beingDragged: boolean;
  onDragStart: (e) => void
};

export default function Box(props: Props) {
  // console.log("render Box, ", props.text);
  const [beingDragged, setBeingDragged] = useState<DraggedType>({
    box: props.text,
    beingDragged: false,
  });

  // console.log("beingDragged: ", beingDragged);

  function onDragStartHandler() {
    // console.log("in onDragStartHandler, ", props.text);
    setBeingDragged({ box: props.text, beingDragged: true });
  }
  function onDragEndHandler() {
    // console.log("in onDragEndHandler, ", props.text);
    setBeingDragged({ box: props.text, beingDragged: false });
  }

  return (
    <div
      draggable={true}
      onDragStart={onDragStartHandler}
      onDragEnd={onDragEndHandler}
      className={
        beingDragged.beingDragged
          ? "bg-slate-500 w-[200px] border rounded my-[30px]"
          : "bg-red-100 w-[200px] border rounded my-[30px]"
      }
    >
      <p>{props.text}</p>
    </div>
  );
}
