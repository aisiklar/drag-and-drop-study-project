"use client";
import { useState } from "react";
import Box from "./Box";
import BoxWrapper from "./BoxWrapper";

type SubBoxConfig = {
  draggedElementOver: boolean;
};

type BoxConfig = {
  A: SubBoxConfig;
  B: SubBoxConfig;
  C: SubBoxConfig;
};

const boxConfig = {
  A: {
    draggedElementOver: false,
  },
  B: {
    draggedElementOver: false,
  },
  C: {
    draggedElementOver: false,
  },
};

export default function DraggedBoxes() {
  let boxList = [
    {
      region: "A",
      droppable: true,
      contents: ["A", "B", "C"],
    },
    {
      region: "B",
      droppable: false,
      contents: ["D", "E", "C"],
    },
    {
      region: "C",
      droppable: true,
      contents: ["G", "H", "I"],
    },
  ];

  const [draggableOverElement, setDraggableOverElement] =
    useState<boolean>(false);

  const [wrapperBoxState, setWrapperBoxState] = useState<BoxConfig>(boxConfig);

  function onDragEnterHandler(e: any, region: string) {
    e.preventDefault();
    console.log(
      "onDragEnterHandler triggered, on a valid drop area...",
      region
    );
    setDraggableOverElement(true);

    let temp = JSON.parse(JSON.stringify(wrapperBoxState));

    temp[region].draggedElementOver = true;
    setWrapperBoxState(temp);
  }
  function onDropHandler() {
    console.log("onDropHandler triggered");
  }
  function onDragLeaveHandler(e: any, region: string) {
    console.log("onDropLeaveHandler function tiggered", region);
    setDraggableOverElement(false);
    let temp = JSON.parse(JSON.stringify(wrapperBoxState));
    temp[region].draggedElementOver = false;
    setWrapperBoxState(temp);
  }

  return (
    <div className="flex justify-center mt-4">
      {boxList.map((boxWrapper, index) => (
        <div
          id={"hello"}
          key={index}
          onDragEnter={
            boxWrapper.droppable
              ? (e) => onDragEnterHandler(e, boxWrapper.region)
              : () => null
          }
          onDragLeave={
            boxWrapper.droppable
              ? (e) => onDragLeaveHandler(e, boxWrapper.region)
              : () => null
          }
          onDrop={onDropHandler}
        >
          <BoxWrapper
            boxWrapper={boxWrapper}
            draggableOverElement={
              wrapperBoxState[boxWrapper.region as keyof BoxConfig]
                .draggedElementOver
            }
          />
        </div>
      ))}
    </div>
  );
}
