import { UserProvider } from "@/modules/userContext";
import "@/app/globals.css";
import { SidePanel } from "./sidepanel";

export const metadata = {
  title: "Book Management",
  description: "Admin panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <SidePanel />
          <header className=" w-full h-4 text-xl text-center">
            Book Management Dashboard
          </header>
          <main className=" md:w-[800px] m-auto">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
