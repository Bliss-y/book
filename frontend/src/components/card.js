"use client";
// going to hold : first display only one image, then on hover load a card with everything i.e more images and other stuffs.
/*

{
    book id,
    images: String,
    name: String,
    ...
}

*/

import Image from "next/image";
import { Children, useState } from "react";
export default function Card({ children }) {
  const [isHovered, setHover] = useState(false);
  const c = Children.toArray(children);

  return (
    <div
      onMouseOver={() => setHover((e) => true)}
      onMouseLeave={() => setHover((e) => false)}
    >
      {c[0]}
      {isHovered ? c[1] : <></>}
    </div>
  );
}
