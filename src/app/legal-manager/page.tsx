"use client";

const Audit: React.FC = () => {
  return (
    <section id="content" className="flex-grow py-0">
      <div className="flex w-full flex-grow flex-col px-3 md:px-6">
        <div className="mx-auto grid w-full max-w-xl gap-8 py-14">
          <div
            className="col-span-1 flex-col gap-3"
            role="group"
            aria-labelledby="users_agreement_name-label"
          >
            <div className="pl-shadow flex flex-col items-center gap-5 rounded-2xl p-6">
              <span
                id="users_agreement_name-label"
                className="text-center text-lg"
              >
                What’s the name of your brand?
              </span>
              <label
                role="group"
                aria-labelledby="users_agreement_name-label"
                className="relative w-full"
              >
                <input
                  placeholder=""
                  type="text"
                  name="users_agreement_name"
                ></input>
              </label>
            </div>
          </div>
          <a href="/legal-manager/trademark/">
            <input
              className="cursor-pointer"
              type="submit"
              value="Continue"
            ></input>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Audit;
