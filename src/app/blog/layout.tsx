import Header from "@/components/ui/header";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-stone-100 dark:bg-neutral-950">
      <Header />
      {children}
    </main>
  );
}
