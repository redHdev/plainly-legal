"use client";

import { validatedAction } from "./action";
import { useZact } from "zact/client";

export const ZactTestComponent = () => {
  const { mutate, data, isLoading, error } = useZact(validatedAction);

  return (
    <div className="flex flex-col gap-6 text-center">
      <button
        className="btn btn-primary w-auto"
        onClick={() => mutate({ stuff: "asdfasdf" })}
      >
        Fetch Contracts using Server Actions
      </button>
      {isLoading && <div>Loading...</div>}
      {!!data?.message && (
        <>
          <div className="loaded text-center">
            Contracts loaded successfully!<br></br>
            <small className="text-xs">Check Console</small>
          </div>
          {console.log(data?.message)}
        </>
      )}
      {error?.message}
    </div>
  );
};
