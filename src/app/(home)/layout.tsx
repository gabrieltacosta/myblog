const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="w-full min-h-dvh flex flex-col">{children}</div>;
};

export default HomeLayout;
