'use client';

export default function Page() {
  
  return (
    <section id="content" className="flex-grow py-0">
      <div className="mx-auto grid w-full max-w-xl gap-8 py-14">
        <div className="flex w-full flex-grow flex-col px-3 md:px-6">
          <div className="slide hidden flex-col gap-3 opacity-0 col-span-1" role="group" aria-labelledby="web_dev_type-label" slide-index="0" style={{ display: 'flex', opacity: 1 }}>
            <div className="pl-shadow flex flex-col items-center gap-5 rounded-2xl p-6">
              <div className="label-container text-center">
                <span id="web_dev_type-label" className="text-center text-lg">Have you run a trademark search for Plainly Legal<sup>&trade;</sup>?</span>
                <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r0:" data-state="closed" className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-sm" title="Help">?</button>
              </div>
              <div className="grid w-full lg:grid-cols-2 gap-5 grid-cols-1">
                <a href="/legal-manager/llc/" className="grid h-full w-full">
                  <label className="text-sm lg:text-base flex h-full w-full cursor-pointer items-center justify-center rounded border border-purple-100 bg-white p-2 text-center leading-5 transition-all duration-200 hover:border-light_purple-200 hover:bg-light_purple-50 peer-checked:border-[#C64236] peer-checked:bg-[#F88379] peer-checked:text-white" htmlFor="web_dev_type_opt_1">Yes</label>
                </a>
                <a href="/legal-manager/llc/" className="grid h-full w-full">
                  <label className="text-sm lg:text-base flex h-full w-full cursor-pointer items-center justify-center rounded border border-purple-100 bg-white p-2 text-center leading-5 transition-all duration-200 hover:border-light_purple-200 hover:bg-light_purple-50 peer-checked:border-[#C64236] peer-checked:bg-[#F88379] peer-checked:text-white" htmlFor="web_dev_type_opt_2">No</label>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>
  );
}
