"use client";

import Box from "./Box";

type Props = {
  boxWrapper: {
    region: string;
    droppable: boolean;
    contents: string[];
  };
  draggableOverElement: boolean;
  getData: (data: any) => void;
};
export default function BoxWrapper(props: Props) {
  let boxWrapper = props.boxWrapper;
  let draggableOverElement = props.draggableOverElement;

  console.log("BoxWrapper: ", boxWrapper);
  console.log("draggableOverElement: ", draggableOverElement);

  function onDragStartHandler(e: any) {
    console.log("onDragStartHandler triggered,", e);
    console.log(
      "onDragStartHandler, e.target.getAttribute('id')",
      e.target.getAttribute("id")
    );
    console.log("onDragStartHandler, e.target.id)", e.target.id);
    let draggedObject = e.target.id;
    // e.dataTransfer.setData("text/plain", draggedObject);
    // send data to parent comp. DraggedBoxes
    props.getData(draggedObject);
  }

  function onDropHandler(e: any) {
    console.log("onDropHandler triggered, ", e);
    console.log(
      "onDropHandler, e.target.getAttribute('id')",
      e.target.getAttribute("id")
    );
    console.log("onDropHandler, e.target.id)", e.target.id);
  }

  return (
    <div
      onDragStart={(e: any) => onDragStartHandler(e)}
      onDrop={(e: any) => onDropHandler(e)}
      className={
        draggableOverElement
          ? "p-2 bg-red-300 text-center ml-4 min-h-[200px]"
          : "p-2 bg-slate-300 text-center ml-4 min-h-[200px]"
      }
    >
      <p>
        region {boxWrapper.region},{" "}
        {boxWrapper.droppable ? "droppable" : "un-droppable"}
      </p>
      {boxWrapper.contents.map((boxName, bIndex) => (
        <Box id={boxName} key={bIndex} text={boxName} />
      ))}
    </div>
  );
}
