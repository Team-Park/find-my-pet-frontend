export default function Layout({ children }: { children: React.ReactElement }) {
    return (
      <div className="w-full flex">
        {children}
      </div>
    );
  }
  