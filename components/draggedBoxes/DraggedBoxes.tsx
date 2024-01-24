"use client";
import { useState } from "react";
import Box from "./Box";
import BoxWrapper from "./BoxWrapper";

type SubBoxConfig = {
  draggedElementOver: boolean;
  renderCounter: number;
};

type BoxConfig = {
  A: SubBoxConfig;
  B: SubBoxConfig;
  C: SubBoxConfig;
};

const boxConfig = {
  A: {
    draggedElementOver: false,
    renderCounter: 0,
  },
  B: {
    draggedElementOver: false,
    renderCounter: 0,
  },
  C: {
    draggedElementOver: false,
    renderCounter: 0,
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

  const [wrapperBoxState, setWrapperBoxState] = useState<BoxConfig>(
    JSON.parse(JSON.stringify(boxConfig))
  );

  function onDragEnterHandler(e: any, region: string) {
    e.preventDefault();
    console.log(
      "onDragEnterHandler triggered, on a valid drop area...",
      region
    );

    let temp = JSON.parse(JSON.stringify(wrapperBoxState));

    temp[region].draggedElementOver = true;
    temp[region].renderCounter++;

    setWrapperBoxState(temp);
  }

  function onDropHandler(e: any, region: string) {
    console.log("onDropHandler triggered, region: ", region);
  }

  function onDragLeaveHandler(e: any, region: string) {
    console.log("onDropLeaveHandler function tiggered", region);

    let temp = JSON.parse(JSON.stringify(wrapperBoxState));
    temp[region].draggedElementOver = false;
    temp[region].renderCounter--;
    setWrapperBoxState(temp);
  }

  function onDragEndHandler() {
    console.log("onDragEndHandler triggered");
    console.log("boxConfig: ", boxConfig);
    setWrapperBoxState(JSON.parse(JSON.stringify(boxConfig)));
  }

  console.log("wrapperBoxState", wrapperBoxState);

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
          onDrop={(e) => onDropHandler(e, boxWrapper.region)}
          onDragEnd={onDragEndHandler}
        >
          <BoxWrapper
            key={
              wrapperBoxState[boxWrapper.region as keyof BoxConfig]
                .renderCounter
            }
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
