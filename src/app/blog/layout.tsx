import Header from "@/components/ui/header";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-[#121212] py-8">
      <Header />
      {children}
    </main>
  );
}
