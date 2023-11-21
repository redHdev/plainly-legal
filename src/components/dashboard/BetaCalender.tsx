"use client";

//Import styles
import "~/styles/embedStyles.css";

//Import types
import { useEffect } from "react";
import { SpinnerLoader } from "../ui/loaders/Loaders";

export const BetaCalender = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.addevent.com/libs/cal/js/cal.embed.t1.init.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="beta-calender relative min-h-645 w-full">
      <div className="beta-calender-cover pointer-events-none absolute z-50 h-full w-full">
        <div className="beta-calender-cover-inner m-0 h-full rounded-2xl border-8 border-white"></div>
      </div>
      <div
        className="ae-emd-cal relative z-20"
        data-calendar="Ag448138"
        data-configure="false"
      ></div>
      <div className="absolute left-0 top-0 z-10 flex h-full w-full justify-center">
        <div className="m-auto h-min w-min">
          <SpinnerLoader />
        </div>
      </div>
    </div>
  );
};

export default BetaCalender;
