"use client";
import Card from "@/components/card";
import Stardiv from "@/components/stardiv";
// import Swiper from "@/components/swipeable";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
import { useState } from "react";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css"; // Import Mapbox CSS
// import './Map.css'; // You can create this CSS file to style the map container if needed
const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  useEffect(() => {
    if (map.current) r;
    mapboxgl.accessToken =
      "pk.eyJ1Ijoiam9ubnlkZXBwIiwiYSI6ImNsZjExZmxqMDA0NTQzc21jZzFjOGFzdmMifQ.ZEP9Y83VuqDfoNegprMpIg"; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return (
    <div className="map-container">
      {" "}
      <div ref={mapContainer} className="map-container"></div>{" "}
    </div>
  );
};

function Rotator({ children }) {
  const [style, setStyle] = useState(0);
  window.addEventListener("scroll", (e) => {
    setStyle(() => {
      return style + 1;
    });
  });
  return (
    <div
      className=" w-fit"
      style={{
        position: "relative",
        transformOrigin: "center",
        // left: style + "px",
        rotate: style * 5 + "deg",
      }}
    >
      {children}
    </div>
  );
}

/*
 <Card
        data={{
          id: "1",
          images: "/next.svg",
          description: "Very Cool Book tbh",
          main_img: "/next.svg",
          name: "Cool Book",
          isbn: "1243",
          genres: ["cool", "Horror", "Fiction"],
        }}
      ></Card>
      <Card
        data={{
          id: "2",
          images: "/next.svg",
          description: "Very Cool2Book tbh",
          main_img: "/next.svg",
          name: "Cool Bo2k",
          isbn: "1223",
          genres: ["cool", "Horro2", "Fic2ion"],
        }}
      ></Card>
*/
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen  bg-[radial-gradient(145.05%_100%_at_50%_0%,#1D2B41_0%,#020509_57.38%,#0F1A29_88.16%)] text-[#ffffffff]">
      <Stardiv rotation={90} translate="0, 300px"></Stardiv>
      <Stardiv rotation={30} translate="0 500px"></Stardiv>
      <svg className="h-4 w-4" viewBox="0 0 24 24">
        <path
          className=" fill-white"
          d="M24 9.63469C24 9.35683 23.7747 9.13158 23.4969 9.13158H15.0892L12.477 1.34327C12.4269 1.19375 12.3095 1.0764 12.16 1.02625C11.8966 0.937894 11.6114 1.07983 11.523 1.34327L8.91088 9.13158H0.503157C0.33975 9.13158 0.186521 9.21094 0.0922364 9.3444C-0.0680877 9.57134 -0.0140806 9.88529 0.212865 10.0456L7.00408 14.8432L4.40172 22.6166C4.35092 22.7683 4.37534 22.9352 4.46749 23.066C4.6275 23.2932 4.94137 23.3476 5.16853 23.1876L12 18.3758L18.8317 23.183C18.9625 23.2751 19.1293 23.2994 19.281 23.2486C19.5445 23.1604 19.6865 22.8752 19.5983 22.6117L16.996 14.8432L23.7872 10.0456C23.9206 9.95133 24 9.7981 24 9.63469Z"
        ></path>
      </svg>
    </main>
  );
}
