//Import the default loader component

import Loader from "~/components/ui/loader/Loader";

export default function Loading() {
  return (
    <>
      <section id="hero-loader" className="bg-light_purple-50/50 py-10">
        <div className="flex w-full max-w-xl flex-col items-center gap-1 px-6 md:max-w-screen-lg">
          <Loader />
        </div>
      </section>
    </>
  );
}
