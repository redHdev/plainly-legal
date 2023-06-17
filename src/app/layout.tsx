import { ClerkProvider } from "@clerk/nextjs";
import { Lato, Open_Sans } from "next/font/google";

import { Header } from "~/components/header/Header";
import Footer from "~/components/footer/Footer";
import TermsAndConditionsPopup from "~/components/TermsAndConditionsPopup";
import { UserMetaProvider } from "~/providers/UserMetaProvider";
import { OptionsProvider } from "~/providers/OptionsProvider";
import { zactSaveTOS } from "~/actions/tos";

export const metadata = {
  title: "Plainly Legal",
  description: "Plainly Legal",
};

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const openSans = Open_Sans({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body className={openSans.className}>
      <UserMetaProvider>
        <OptionsProvider>
          <ClerkProvider>
                <Header className={lato.className}></Header>
                <main className="flex min-h-[calc(100svh-6rem)] flex-col items-center bg-white">
                  {children}
                </main>
                <TermsAndConditionsPopup saveTOS={zactSaveTOS} />
          </ClerkProvider>
        </OptionsProvider>
      </UserMetaProvider>
      <Footer />
      </body>
    </html>

  );
}
