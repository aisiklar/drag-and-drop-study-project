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

type EachBox = {
  region: string;
  droppable: boolean;
  contents: string[];
};

type BoxList = EachBox[];

const boxConfig = {
  A: {
    draggedElementOver: false,
    // renderCounter: 0,
  },
  B: {
    draggedElementOver: false,
    // renderCounter: 0,
  },
  C: {
    draggedElementOver: false,
    // renderCounter: 0,
  },
};

let boxList = [
  {
    region: "A",
    droppable: true,
    contents: ["A"],
  },
  {
    region: "B",
    droppable: false,
    contents: ["D"],
  },
  {
    region: "C",
    droppable: true,
    contents: ["G"],
  },
];

export default function DraggedBoxes() {
  const [boxArrangement, setBoxArrangement] = useState<BoxList>(boxList);
  const [wrapperBoxState, setWrapperBoxState] = useState<BoxConfig>(
    JSON.parse(JSON.stringify(boxConfig))
  );

  /* function onDragEnterHandler(e: any, region: string) {
    console.log(
      "onDragEnterHandler triggered, on a valid drop area...",
      region
    );
    e.preventDefault();
    let temp = JSON.parse(JSON.stringify(wrapperBoxState));
    temp[region].draggedElementOver = true;
    temp[region].renderCounter++;
    setWrapperBoxState(temp);
  } */

  function onDropHandler(e: any, region: string) {
    console.log("onDropHandler triggered, region: ", region);
  }

  function onDragLeaveHandler(e: any, region: string) {
    console.log("onDropLeaveHandler function tiggered", region);

    let temp = JSON.parse(JSON.stringify(wrapperBoxState));
    temp[region].draggedElementOver = false;
    // temp[region].renderCounter--;
    setWrapperBoxState(temp);
  }

  // in case of onDrag event,
  // change the draggedElementOver to true for related BoxWrapper
  function onDragOver(e: any, region: string) {
    console.log("onDragOver function triggered ", region);
    e.preventDefault();
    let temp = JSON.parse(JSON.stringify(wrapperBoxState));
    temp[region].draggedElementOver = true;
    // temp[region].renderCounter++;
    setWrapperBoxState(temp);
  }

  function onDragEndHandler() {
    console.log("onDragEndHandler triggered");
    // console.log("boxConfig: ", boxConfig);
    // reset wrapperBoxState to its to initial state of boxConfig
    setWrapperBoxState(JSON.parse(JSON.stringify(boxConfig)));
  }
  function onDragStartHandler(e: any, region: string) {
    console.log("onDragStartHandler triggered, ", region);
  }

  console.log("wrapperBoxState", wrapperBoxState);

  return (
    <div className="flex justify-center mt-4">
      {boxList.map((boxWrapper, index) => (
        <div
          key={index}
          onDragStart={(e) => onDragStartHandler(e, boxWrapper.region)}
          onDragLeave={
            boxWrapper.droppable
              ? (e) => onDragLeaveHandler(e, boxWrapper.region)
              : () => null
          }
          onDragOver={
            boxWrapper.droppable
              ? (e) => onDragOver(e, boxWrapper.region)
              : () => null
          }
          onDrop={(e) => onDropHandler(e, boxWrapper.region)}
          onDragEnd={onDragEndHandler}
        >
          <BoxWrapper
            /*  key={
              wrapperBoxState[boxWrapper.region as keyof BoxConfig]
                .renderCounter
            } */
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
