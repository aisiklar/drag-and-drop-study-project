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

type EachBox = {
  region: string;
  droppable: boolean;
  contents: string[];
};

type BoxList = EachBox[];

// define boxConfig to define whether there is a dragged obj hovering above
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

// define boxList to enclose region name, droppable cond and contents
let boxList = [
  {
    region: "A",
    droppable: true,
    contents: ["A", "B"],
  },
  {
    region: "B",
    droppable: false,
    contents: ["D", "E"],
  },
  {
    region: "C",
    droppable: true,
    contents: ["G", "H"],
  },
];

export default function DraggedBoxes() {
  // define states
  const [boxArrangement, setBoxArrangement] = useState<BoxList>(boxList);
  const [wrapperBoxState, setWrapperBoxState] = useState<BoxConfig>(boxConfig);
  const [draggedBox, setDraggedBox] = useState<string>("");

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
    // console.log("onDropHandler triggered, region: ", region);
    let temp_boxArrangement = JSON.parse(JSON.stringify(boxArrangement));

    temp_boxArrangement.forEach((element: EachBox) => {
      if (element.contents.includes(draggedBox)) {
        // remove the dragged object from the contents
        let newContents = element.contents.filter(
          (item: string) => item !== draggedBox
        );
        element.contents = newContents;
      }
      if (element.region === region) {
        // add the dragged object to the new box
        element.contents.push(draggedBox);
      }
    });

    setDraggedBox("");
    setBoxArrangement(temp_boxArrangement);
  }

  function onDragLeaveHandler(e: any, region: string) {
    let temp = JSON.parse(JSON.stringify(wrapperBoxState));
    temp[region].draggedElementOver = false;
    // temp[region].renderCounter--;
    setWrapperBoxState(temp);
  }

  // in case of onDrag event,
  // change the draggedElementOver to true for related BoxWrapper
  // so that the color of the BoxWrapper comp changes to red
  function onDragOverHandler(e: any, region: string) {
    e.preventDefault();
    let temp = JSON.parse(JSON.stringify(wrapperBoxState));
    temp[region].draggedElementOver = true;
    setWrapperBoxState(temp);
  }

  function onDragEndHandler() {
    // reset wrapperBoxState to its to initial state of boxConfig
    setWrapperBoxState(JSON.parse(JSON.stringify(boxConfig)));
  }

  function getDataOfDraggedObj(draggedObject: any) {
    setDraggedBox(draggedObject);
  }
  function changeDroppableCond(e: any, boxWrapper: EachBox) {
    let temp_boxArrangement = JSON.parse(JSON.stringify(boxArrangement));
    temp_boxArrangement.forEach((item: EachBox) => {
      if (item.region === boxWrapper.region) {
        item.droppable = !item.droppable;
      }
    });

    setBoxArrangement(temp_boxArrangement);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row justify-center mt-4">
        {boxArrangement.map((boxWrapper, index) => (
          <div
            className="flex flex-col items-center justify-center mx-1"
            key={index}
            onDragLeave={
              boxWrapper.droppable
                ? (e) => onDragLeaveHandler(e, boxWrapper.region)
                : () => null
            }
            onDragOver={
              boxWrapper.droppable
                ? (e) => onDragOverHandler(e, boxWrapper.region)
                : () => null
            }
            onDrop={(e) => onDropHandler(e, boxWrapper.region)}
            onDragEnd={onDragEndHandler}
          >
            <button
              type="button"
              onClick={(e) => changeDroppableCond(e, boxWrapper)}
              className={
                boxWrapper.droppable === true
                  ? "w-[170px] rounded bg-red-300 align-middle mb-2"
                  : "w-[170px] rounded bg-green-300 align-middle mb-2"
              }
            >
              {boxWrapper.droppable === true
                ? "make it un-droppable"
                : "make it droppable"}
            </button>
            <div className="">
              <BoxWrapper
                boxWrapper={boxWrapper}
                getData={getDataOfDraggedObj}
                draggableOverElement={
                  wrapperBoxState[boxWrapper.region as keyof BoxConfig]
                    .draggedElementOver
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
