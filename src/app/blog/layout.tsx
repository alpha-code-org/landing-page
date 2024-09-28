export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="mx-auto flex w-full max-w-7xl flex-col p-8">{children}</main>;
}
