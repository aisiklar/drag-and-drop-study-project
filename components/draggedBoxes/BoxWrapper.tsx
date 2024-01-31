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
  let droppable = props.boxWrapper.droppable;
  let draggableOverElement = props.draggableOverElement;

  // on event, send the data id to parent comp.
  function onDragStartHandler(e: any) {
    let draggedObject = e.target.id;
    // e.dataTransfer.setData("text/plain", draggedObject);
    // send data to parent comp. DraggedBoxes
    props.getData(draggedObject);
  }

  return (
    <div
      onDragStart={(e: any) => onDragStartHandler(e)}
      className={
        draggableOverElement
          ? "border-2 p-2 bg-green-300 text-center min-h-[200px] border-sky-400"
          : droppable
          ? "border-2 p-2 bg-green-300 text-center min-h-[200px] "
          : !droppable
          ? "border-2 p-2 bg-red-300 text-center min-h-[200px] "
          : "border-2 p-2 bg-slate-300 text-center min-h-[200px]"
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
