export default function Layout({ children }: { children: React.ReactElement }) {
    return (
      <div className="w-full flex justify-center">
        <div className="w-[800px]">{children}</div>
      </div>
    );
  }
  