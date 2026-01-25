const Highlight = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="rounded-sm bg-amber-100 px-1 font-semibold text-amber-900 dark:bg-amber-900/30 dark:text-amber-200">
      {children}
    </span>
  );
};

export default Highlight;
