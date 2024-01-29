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
  const [boxArrangement, setBoxArrangement] = useState<BoxList>(boxList);
  const [wrapperBoxState, setWrapperBoxState] = useState<BoxConfig>(
    JSON.parse(JSON.stringify(boxConfig))
  );

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
    console.log("onDropHandler triggered, region: ", region);
    let targetWrapperBox = boxArrangement.filter(
      (boxWrapper) => boxWrapper.region === region
    )[0];
    console.log("targetWrapperBox: ", targetWrapperBox);

    let sourceWrapperBox = boxArrangement.filter((wrapperBox) =>
      wrapperBox.contents.includes(draggedBox)
    )[0];
    let indexOfDraggedBox = sourceWrapperBox.contents.indexOf(draggedBox);
    console.log("indexOfDraggedBox: ", indexOfDraggedBox);

    console.log("sourceWrapperBox: ", sourceWrapperBox);

    let temp_boxArrangement = JSON.parse(JSON.stringify(boxArrangement));
    temp_boxArrangement.forEach((element: EachBox) => {
      if (element.contents.includes(draggedBox)) {
        let newContents = element.contents.filter(
          (item: string) => item !== draggedBox
        );
        console.log("newContents: ", newContents);
        element.contents = newContents;
      }
      if (element.region === region) {
        element.contents.push(draggedBox);
      }
    });
    console.log("temp_boxArrangement:", temp_boxArrangement);

    setDraggedBox("");
    setBoxArrangement(temp_boxArrangement);
  }

  function onDragLeaveHandler(e: any, region: string) {
    console.log("onDragLeaveHandler function tiggered", region);

    let temp = JSON.parse(JSON.stringify(wrapperBoxState));
    temp[region].draggedElementOver = false;
    // temp[region].renderCounter--;
    setWrapperBoxState(temp);
  }

  // in case of onDrag event,
  // change the draggedElementOver to true for related BoxWrapper
  // so that the color of the BoxWrapper comp changes to red
  function onDragOverHandler(e: any, region: string) {
    console.log("onDragOverHandler function triggered ", region);
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

  function getDataOfDraggedObj(draggedObject: any) {
    console.log(
      "in getDataOfDraggedObj funct., received from BoxWrapper e: ",
      draggedObject
    );
    setDraggedBox(draggedObject);

    // e.dataTransfer.setData("text/plain", draggedObject);
  }

  console.log("draggedBox state: ", draggedBox);
  console.log("boxArrangement state: ", boxArrangement);
  return (
    <div className="flex-column items-center justify-center">
      <div className="flex justify-center mt-4">
        {boxArrangement.map((boxWrapper, index) => (
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
                ? (e) => onDragOverHandler(e, boxWrapper.region)
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
              getData={getDataOfDraggedObj}
              draggableOverElement={
                wrapperBoxState[boxWrapper.region as keyof BoxConfig]
                  .draggedElementOver
              }
            />
          </div>
        ))}
      </div>
      <div className="mt-[100px] p-2 w-[350px] m-auto flex-column items-center border">
        <p className=" align-middle">Contents of the Regions (for review):</p>
        {boxArrangement.map((boxWrapper, index) => (
          <ul key={index}>
            <strong> region - {boxWrapper.region}</strong>
            {boxWrapper.contents.map((item, sIndex) => (
              <ul className="ml-2" key={sIndex}>
                box - {item}
              </ul>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
