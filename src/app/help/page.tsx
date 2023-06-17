import { ZactTestComponent } from "./zact_trial";

export const metadata = {
  title: "Help Center",
  description: "Plainly Legal",
};

export default function Page() {
  return (
    <section id="content" className="gap-20 bg-white py-20">
      <h1 className="mb-0">{metadata.title}</h1>
      <ZactTestComponent />
    </section>
  );
}
