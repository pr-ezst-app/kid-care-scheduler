import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const GET_SUBMISSIONS_URL = "https://functions.poehali.dev/3286950c-7ceb-4ffa-92d4-8f7ef5bac146";
const ADMIN_PASSWORD = "ashley2024";

interface Submission {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  message: string;
  rating: number | null;
  created_at: string;
}

function Stars({ rating }: { rating: number | null }) {
  if (!rating) return <span className="text-gray-400 text-sm">No rating</span>;
  return (
    <span className="text-yellow-400 text-lg">
      {"★".repeat(rating)}
      <span className="text-gray-300">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    fetch(GET_SUBMISSIONS_URL)
      .then(r => r.json())
      .then(d => setSubmissions(d.submissions || []))
      .finally(() => setLoading(false));
  }, [authed]);

  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🔒</div>
            <h1 className="text-2xl font-black text-orange-900" style={{ fontFamily: "'Fredoka One', cursive" }}>Admin Dashboard</h1>
            <p className="text-orange-700/60 text-sm mt-1">Ashley's Babysitting</p>
          </div>
          <form onSubmit={login} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border-2 border-orange-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-300 bg-orange-50/30"
            />
            {error && <p className="text-red-500 text-sm text-center">Wrong password, try again.</p>}
            <button
              type="submit"
              className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 rounded-2xl transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 px-4 py-8" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-orange-900" style={{ fontFamily: "'Fredoka One', cursive" }}>Hi, I am Ashley! 👋</h1>
            <p className="text-orange-700/60 text-sm mt-1">{submissions.length} booking request{submissions.length !== 1 ? "s" : ""} total</p>
          </div>
          <button
            onClick={() => {
              setLoading(true);
              fetch(GET_SUBMISSIONS_URL)
                .then(r => r.json())
                .then(d => setSubmissions(d.submissions || []))
                .finally(() => setLoading(false));
            }}
            className="flex items-center gap-2 bg-orange-100 hover:bg-orange-200 text-orange-800 font-bold px-4 py-2 rounded-xl transition-all text-sm"
          >
            <Icon name="RefreshCw" size={14} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-orange-400 text-lg">Loading...</div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow">
            <div className="text-5xl mb-3">📭</div>
            <p className="text-orange-800 font-bold">No submissions yet</p>
            <p className="text-orange-500 text-sm mt-1">When parents fill out the form, they'll appear here.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {submissions.map(s => (
              <div key={s.id} className="bg-white rounded-2xl shadow-md border border-orange-100 p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h2 className="text-lg font-black text-orange-900">{s.name}</h2>
                    <Stars rating={s.rating} />
                  </div>
                  <span className="text-xs text-orange-400 bg-orange-50 px-3 py-1 rounded-full">
                    {new Date(s.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-sm mb-3">
                  {s.email && (
                    <div className="flex items-center gap-2 text-orange-800">
                      <Icon name="Mail" size={14} />
                      <a href={`mailto:${s.email}`} className="hover:underline">{s.email}</a>
                    </div>
                  )}
                  {s.phone && (
                    <div className="flex items-center gap-2 text-orange-800">
                      <Icon name="Phone" size={14} />
                      <a href={`tel:${s.phone}`} className="hover:underline">{s.phone}</a>
                    </div>
                  )}
                  {s.address && (
                    <div className="flex items-center gap-2 text-orange-800 sm:col-span-2">
                      <Icon name="MapPin" size={14} />
                      <span>{s.address}</span>
                    </div>
                  )}
                </div>
                {s.message && (
                  <p className="text-sm text-orange-700/80 bg-orange-50 rounded-xl px-4 py-3 border border-orange-100">
                    {s.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}