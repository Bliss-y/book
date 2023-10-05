import { useState, useEffect } from "react";
import query from "./query";
export function Rate({ className, id }) {
  const [isLoading, setLoading] = useState(false);
  const [rt, setRating] = useState(0);
  const [temp_rt, settmp] = useState(0);
  const [rt_id, setid] = useState(null);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    setLoading(true);
    const q = async () => {
      try {
        const res = await (await query("/review/" + id)).json();

        if (res.status == "success") {
          setRating(res.data.rating);
          setid(res.data._id);
        }
      } catch (e) {}
      setLoading(false);
    };
    q();
  }, []);
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg
        viewBox="0 0 24 24"
        className={
          (hovered & (temp_rt >= i) || !hovered & (rt >= i)
            ? " fill-white"
            : " fill-yellow") + " w-4 h-4"
        }
        onMouseEnter={() => {
          setHovered(true);
          settmp(i);
        }}
        onClick={async () => {
          try {
            const res = rt
              ? await (
                  await query("/editReview/" + rt_id, {}, "POST", {
                    rating: i,
                    review: "not set",
                  })
                ).json()
              : await (
                  await query("/addReview/" + id, {}, "POST", {
                    rating: i,
                    review: "not set",
                  })
                ).json();
            if (res.status == "success") {
              setRating(i);
              settmp(i);
            }
          } catch (e) {
            console.log(e);
          }
        }}
        onMouseLeave={() => {
          setHovered(false);
          settmp(0);
        }}
      >
        <path d="M24 9.63469C24 9.35683 23.7747 9.13158 23.4969 9.13158H15.0892L12.477 1.34327C12.4269 1.19375 12.3095 1.0764 12.16 1.02625C11.8966 0.937894 11.6114 1.07983 11.523 1.34327L8.91088 9.13158H0.503157C0.33975 9.13158 0.186521 9.21094 0.0922364 9.3444C-0.0680877 9.57134 -0.0140806 9.88529 0.212865 10.0456L7.00408 14.8432L4.40172 22.6166C4.35092 22.7683 4.37534 22.9352 4.46749 23.066C4.6275 23.2932 4.94137 23.3476 5.16853 23.1876L12 18.3758L18.8317 23.183C18.9625 23.2751 19.1293 23.2994 19.281 23.2486C19.5445 23.1604 19.6865 22.8752 19.5983 22.6117L16.996 14.8432L23.7872 10.0456C23.9206 9.95133 24 9.7981 24 9.63469Z"></path>
      </svg>
    );
  }
  if (isLoading) return <div>loading review</div>;
  return (
    <div className={className}>
      {stars} <div>{rt ? " Rated!" : ""}</div>
    </div>
  );
}
