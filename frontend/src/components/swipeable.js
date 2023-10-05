import { Children, useState } from "react";

function ShowSingle({ e, currentNumber }) {}

export default function Swiper({ children }) {
  const childrenArray = Children.toArray(children);
  const [currentNumber, setCurrent] = useState(0);

  return (
      {currentNumber}
      <div
        onClick={(e) => {
          setCurrent((e) =>
            currentNumber - 1 >= 0
              ? currentNumber - 1
              : childrenArray.length - 1
          );
        }}
      >
        {"< "}Previous
      </div>
      <div>{children[currentNumber]}</div>
      <div
        onClick={() => {
          setCurrent((e) =>
            currentNumber + 1 < childrenArray.length ? currentNumber + 1 : 0
          );
        }}
      >
        Next {">"}
      </div>
    </div>
  );
}
