"use client";

//Import styles
import "~/styles/embedStyles.css";

//Import types
import { useEffect } from "react";
import Loader from "../ui/loader/Loader";

export const BetaCalender = () => {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.addevent.com/libs/cal/js/cal.embed.t1.init.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
  <div className="beta-calender w-full relative min-h-645">
    <div className="beta-calender-cover w-full h-full absolute z-50 pointer-events-none">
      <div className="beta-calender-cover-inner border-8 border-white m-0 rounded-2xl h-full"></div>
    </div>
    <div className="ae-emd-cal relative z-20" data-calendar="Ag448138" data-configure="false"></div>
    <div className="absolute top-0 left-0 w-full h-full justify-center flex z-10">
      <div className="w-min h-min m-auto">
        <Loader />
      </div>
    </div>
  </div>
  );
};

export default BetaCalender;
