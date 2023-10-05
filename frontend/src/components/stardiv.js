export default function Stardiv({ rotation, translate = "0 300px" }) {
  return (
    <div
      className=" absolute w-full flex justify-center"
      style={{
        "background-image":
          "linear-gradient(to bottom, rgba(148, 163, 184, 0) 30%, rgb(148, 163, 184), rgba(148, 163, 184, 0))",
        rotate: rotation + "deg",
        translate: translate,
        transformOrigin: "center",
      }}
    >
      <div className=" bottom-8 ml-[-0.5px] h-[1.5px] w-[300px] rounded-full bg-gradient-to-br from-violet-400 to-transparent"></div>
    </div>
  );
}
