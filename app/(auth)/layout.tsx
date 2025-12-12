export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-100">
      <div className="w-full max-w-md rounded-xl border border-neutral-800 bg-neutral-900/80 backdrop-blur p-6 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">News Service</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
