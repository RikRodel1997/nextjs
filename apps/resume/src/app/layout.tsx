import type { Metadata } from "next";

type RootLayoutProps = { children: React.ReactNode };

export const metadata: Metadata = {
  title: "Resume",
  description: "React app that serves as my resume",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
