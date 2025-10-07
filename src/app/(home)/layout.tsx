import Header from "./_components/Header";

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full min-h-dvh flex flex-col">
      <Header />
      {children}
    </div>
  );
};

export default HomeLayout;
