"use client";
import { useEffect } from "react";

export function ConsoleClient(object: any) { // eslint-disable-line

  useEffect(() => {
    console.log(object);
  }, [object]);

  return (
    <div>Check the console for object</div>
  );
}