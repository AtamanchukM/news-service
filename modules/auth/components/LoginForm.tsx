import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (res?.ok) {
        router.push("/dashboard/news");
      } else {
        setError(res?.error || "Помилка входу. Спробуйте ще раз.");
      }
    } catch (err: any) {
      setError(err?.message || "Помилка входу. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">Вхід</h1>
      <p className="mb-6 text-sm text-neutral-400">Увійдіть до свого акаунта</p>
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-800 text-red-400 text-sm">
          {error}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-300">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-300">
            Пароль
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 text-white py-2.5 font-medium hover:bg-blue-500 transition-colors disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Вхід..." : "Увійти"}
        </button>
        <Link
          href="/register"
          className="text-xs text-neutral-500 text-center block mt-2 hover:underline"
        >
          Немає акаунта? Зареєструйтесь
        </Link>
      </form>
    </div>
  );
}
