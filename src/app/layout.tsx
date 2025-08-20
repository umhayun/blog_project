import Header from "./components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body>
        <div className={'w-[80%] mx-auto relative'}>
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
