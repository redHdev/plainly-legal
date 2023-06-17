
interface ComingSoonProps {
    //allow children
    heading?: string;
    children?: React.ReactNode;
}

export const ComingSoon = ({ heading, children }: ComingSoonProps) => {

    //if heading is passed, use it, otherwise use default
    const title = heading ? heading : "Coming Soon";

    //if children are passed, use them, otherwise use default
    const content = children ? children : <p className="text-center">We are working hard to bring you this feature. Please check back soon.</p>;

    return (
        <>
          <section id="content" className="justify-center py-16">
            <div className="w-full max-w-xl px-6 md:max-w-screen-xl">
              <h1 className="text-3xl font-bold text-center mb-4">{title}</h1>
              {content}
            </div>
          </section>
        </>
      );
}

export default ComingSoon;