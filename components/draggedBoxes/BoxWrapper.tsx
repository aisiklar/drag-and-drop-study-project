"use client";

import Box from "./Box";

type Props = {
  boxWrapper: {
    region: string;
    droppable: boolean;
    contents: string[];
  };
  draggableOverElement: boolean;
};
export default function BoxWrapper(props: Props) {
  let boxWrapper = props.boxWrapper;
  let draggableOverElement = props.draggableOverElement;

  console.log("BoxWrapper: ", boxWrapper);
  console.log("draggableOverElement: ", draggableOverElement);

  return (
    <div
      className={
        draggableOverElement
          ? "p-2 bg-red-300 text-center ml-4 "
          : "p-2 bg-slate-300 text-center ml-4"
      }
    >
      <p>
        region {boxWrapper.region},{" "}
        {boxWrapper.droppable ? "droppable" : "un-droppable"}
      </p>
      {boxWrapper.contents.map((boxName, bIndex) => (
        <Box key={bIndex} text={boxName} />
      ))}
    </div>
  );
}
