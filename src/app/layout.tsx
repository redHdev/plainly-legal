import { ClerkProvider } from "@clerk/nextjs";
import { Lato, Open_Sans } from "next/font/google";

import { Header } from "~/components/header/Header";
import Footer from "~/components/footer/Footer";
import TermsAndConditionsPopup from "~/components/TermsAndConditions";
import { UserMetaProvider } from "~/UserMetaProvider";
import { OptionsProvider } from "~/OptionsProvider";
import { actionSaveTOS } from "~/utils/tos";

import "~/styles/globals.css";

//Import bloatware
import Bloatware from "~/components/Bloatware";

export const metadata = {
  title: "Plainly Legal",
  description: "Plainly Legal",
};

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const openSans = Open_Sans({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <Bloatware /> */}
      <body className={openSans.className}>
        <OptionsProvider>
          <ClerkProvider>
            <UserMetaProvider>
              <Header className={lato.className}></Header>
              <main className="flex min-h-[calc(100svh-6rem)] flex-col items-center bg-white">
                {children}
              </main>
              <TermsAndConditionsPopup saveTOS={actionSaveTOS} />
              <Bloatware />
            </UserMetaProvider>
          </ClerkProvider>
        </OptionsProvider>
        <Footer />
      </body>
    </html>
  );
}
