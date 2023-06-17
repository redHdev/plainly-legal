export default function Loading() {
  return (
    <>
      <section id="hero" className="bg-light_purple-50/50 py-10">
        <div className="flex w-full max-w-xl flex-col items-center gap-1 px-6 md:max-w-screen-lg">
          <span className="text-lg uppercase tracking-[3px] text-light_purple-900">
            Agreement Generator
          </span>
          <h2 className="loading mb-0 inline-block">
            ______ ___________ _________ ______
          </h2>
        </div>
      </section>
      <section id="content" className="flex-grow py-0">
        <div className="w-full max-w-xl px-6 md:max-w-screen-lg">
          {/* <div className="loading mx-auto h-60 w-full max-w-lg"></div> */}
        </div>
      </section>
    </>
  );
}
