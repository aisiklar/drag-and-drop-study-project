"use client";
import { useState } from "react";

type Props = {
  text: string;
  id: string;
};

type DraggedType = {
  box: string;
  beingDragged: boolean;
};

export default function Box(props: Props) {
  const [beingDragged, setBeingDragged] = useState<DraggedType>({
    box: props.text,
    beingDragged: false,
  });

  function onDragStartHandler() {
    setBeingDragged({ box: props.text, beingDragged: true });
  }
  function onDragEndHandler() {
    setBeingDragged({ box: props.text, beingDragged: false });
  }

  return (
    <div
      draggable={true}
      onDragStart={onDragStartHandler}
      onDragEnd={onDragEndHandler}
      id={props.text}
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
