import { SpinnerLoader } from "~/components/ui/loaders/Loaders";

export default function Loading() {
  return (
    <section id="hero-loader" className="py-10">
      <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center px-6">
        <SpinnerLoader />
      </div>
    </section>
  );
}
