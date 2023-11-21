import Image from "next/image";
import Link from "next/link";

import logoObj from "public/assets/logo.svg";
import { cn } from "~/utils/cn";

interface ImageType {
  src: string;
  height: number;
  width: number;
}
const logo: ImageType = logoObj as ImageType;

//create a header with an optional classname
export default function Footer({ className }: { className?: string }) {
  const copyrightYear = (): string => {
    const date: Date = new Date();
    return date.getFullYear().toString();
  };

  return (
    <footer
      className={cn(
        "flex flex-col items-center bg-purple-900 py-14 text-white",
        className,
      )}
    >
      <div className="grid w-full max-w-screen-xl grid-cols-1 items-center gap-8 px-6 md:grid-cols-3 md:gap-10">
        <div className="flex flex-col gap-4 md:col-span-1">
          <Link href="/" passHref className="inline-block">
            <Image
              src={logo}
              alt="Plainly Legal"
              className="h-auto w-40"
              width={logo.width}
              height={logo.height}
              priority
            />
          </Link>
          <div className="flex flex-col gap-y-1">
            <div className="flex flex-row flex-wrap gap-x-3 gap-y-1 text-sm">
              <a
                href="https://plainlylegal.com/privacy-policy/"
                target="_blank"
              >
                Privacy Policy
              </a>
              <span className="sep">|</span>
              <a href="https://plainlylegal.com/disclaimer/" target="_blank">
                Disclaimer
              </a>
              <span className="sep">|</span>
              <a href="https://plainlylegal.com/contact/" target="_blank">
                Contact
              </a>
              <span className="sep">|</span>
              <a href="https://plainlylegal.com/affiliates/" target="_blank">
                Affiliates
              </a>
            </div>
            <div className="flex flex-row flex-wrap gap-x-3 gap-y-1 text-sm">
              <a href="https://plainlylegal.com/terms-of-use/" target="_blank">
                Website Terms of Use
              </a>
              <span className="sep">|</span>
              <a
                href="https://plainlylegal.com/software-terms-of-use/"
                target="_blank"
              >
                Software Terms of Use
              </a>
            </div>
          </div>
        </div>

        <div className="text-xs italic md:col-span-2">
          <p>
            <strong>Legal Disclaimer: </strong>
            Your Online Genius LLC is not a law firm, and its employees cannot
            offer legal advice. Plainly Legal is not a substitute for a lawyer
            or legal advice. Plainly Legal provides self-help services powered
            by technology that you can use at your own discretion.
          </p>

          <div className="text-sm">
            {`© Copyright ${copyrightYear()} | Your Online Genius LLC. All rights reserved.`}
          </div>
        </div>
      </div>
    </footer>
  );
}
