export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white min-h-[60vh]">
      {children}
    </div>
  );
}
