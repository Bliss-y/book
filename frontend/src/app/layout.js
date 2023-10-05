import { UserProvider } from "@/modules/userContext";
import "@/app/globals.css";

export const metadata = {
  title: "Book Tracking system",
  description: "Create your list of books.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=" text-slate-300 bg-slate-900">
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
