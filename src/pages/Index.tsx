import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.ezst.app/projects/180255ff-5d07-4afb-9518-9686832ad82a/files/619ea7c0-b9c0-40a0-b9f9-bc4cbf46de66.jpg";
const SUBMIT_URL = "https://functions.poehali.dev/7fce1146-decd-4d8c-a3ff-0e0c5a52666d";

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="text-3xl transition-transform hover:scale-110 focus:outline-none"
        >
          <span style={{ color: star <= (hover || value) ? "#FBBF24" : "#D1D5DB" }}>★</span>
        </button>
      ))}
    </div>
  );
}

export default function Index() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", rating: 0 });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bubble-bg" style={{ fontFamily: "'Nunito', sans-serif" }}>

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl inline-block" style={{ display: "inline-block", animation: "wiggle 1s ease-in-out infinite" }}>🌟</span>
          <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.4rem", color: "#FF7F5C" }}>
            Sunny's Sunset Babysitting Service
          </span>
        </div>
        <div className="hidden sm:flex gap-6 text-sm font-bold text-orange-800">
          <a href="#about" className="hover:text-orange-500 transition-colors">About</a>
          <a href="#availability" className="hover:text-orange-500 transition-colors">Availability</a>
          <a href="#contact" className="hover:text-orange-500 transition-colors">Book Me</a>
        </div>
        <a
          href="#contact"
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-4 py-2 rounded-full text-sm transition-all hover:scale-105 shadow-md"
        >
          Contact Me
        </a>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-16 pb-10 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-bold mb-5 border border-blue-200">
              <span>🎓</span> Certification Course Coming Soon!
            </div>
            <h1
              style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: 1.1, color: "#2D1B0E" }}
              className="mb-4"
            >
              Safe, Fun &<br />
              <span style={{ color: "#FF7F5C" }}>Caring</span> Babysitting
            </h1>
            <p className="text-orange-900/70 text-lg leading-relaxed mb-8 max-w-lg">
              Hi! I'm Ashley — a responsible and caring babysitter ready to give your little ones a great time, and give you the night off you deserve. 💛
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { emoji: "👶", text: "Ages 4+" },
                { emoji: "👤", text: "1–2 kids" },
                { emoji: "📍", text: "Canyon Creek, AB" },
                { emoji: "📋", text: "Cert. Coming Soon" },
                { emoji: "📶", text: "WiFi Required" },
              ].map((tag, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-orange-100 font-semibold text-orange-800 text-sm"
                >
                  <span>{tag.emoji}</span> {tag.text}
                </div>
              ))}
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Book a Session <Icon name="ArrowRight" size={20} />
            </a>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-yellow-200 via-orange-100 to-pink-200 rounded-[2.5rem] rotate-3 opacity-60" />
              <img
                src={HERO_IMAGE}
                alt="Babysitter playing with child"
                className="relative rounded-[2rem] shadow-2xl w-full max-w-sm object-cover"
                style={{ aspectRatio: "1/1" }}
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2 border border-orange-100 animate-float">
                <span className="text-2xl">⭐</span>
                <div>
                  <div className="font-bold text-orange-800 text-sm">Trusted Sitter</div>
                  <div className="text-xs text-orange-500">Cert. course coming soon!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "2.2rem", color: "#2D1B0E" }}>
              About Me 🌻
            </h2>
            <p className="text-orange-800/60 mt-2">Why parents trust me with their little ones</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                emoji: "🎓",
                title: "Certification In Progress",
                desc: "I'm signing up for a babysitting certification course soon — committed to learning first aid and child safety the right way!",
                color: "bg-yellow-50 border-yellow-200",
              },
              {
                emoji: "💛",
                title: "Experienced with Kids",
                desc: "I have a 1-year-old baby brother, so I'm used to little ones every single day!",
                color: "bg-orange-50 border-orange-200",
              },
              {
                emoji: "🎨",
                title: "Fun & Engaging",
                desc: "I love doing crafts, going to the park, and playing with kids — your little one will have so much fun!",
                color: "bg-pink-50 border-pink-200",
              },
              {
                emoji: "🍳",
                title: "I Can Cook!",
                desc: "I can prepare simple, kid-friendly meals and snacks so your child is always fed and happy.",
                color: "bg-green-50 border-green-200",
              },
              {
                emoji: "🤝",
                title: "Kind Discipline",
                desc: "I believe in calm, respectful discipline — setting clear boundaries while always being kind and patient.",
                color: "bg-blue-50 border-blue-200",
              },
              {
                emoji: "🫂",
                title: "Emotional Support",
                desc: "If your child is feeling upset or needs a hug, I'm here for them — I offer comfort and a listening ear.",
                color: "bg-purple-50 border-purple-200",
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`${card.color} border-2 rounded-3xl p-6 flex flex-col items-start gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all`}
              >
                <span className="text-4xl">{card.emoji}</span>
                <h3 className="font-bold text-lg text-orange-900">{card.title}</h3>
                <p className="text-orange-800/70 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGES */}
      <section className="py-12 px-6 bg-white/60">
        <div className="max-w-4xl mx-auto text-center">
          <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "2rem", color: "#2D1B0E" }} className="mb-3">
            Who I Work With 👧🧒
          </h2>
          <p className="text-orange-800/60 mb-10">I care for kids 4 and up who are potty trained and can talk</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { age: "4 yrs", label: "Potty trained ✅", color: "bg-yellow-100 border-yellow-200 text-yellow-800" },
              { age: "5 yrs", label: "Preschool", color: "bg-orange-100 border-orange-200 text-orange-800" },
              { age: "6 yrs", label: "School Age", color: "bg-pink-100 border-pink-200 text-pink-800" },
              { age: "7 yrs", label: "School Age", color: "bg-purple-100 border-purple-200 text-purple-800" },
              { age: "8 yrs", label: "School Age", color: "bg-green-100 border-green-200 text-green-800" },
              { age: "9+ yrs", label: "School Age", color: "bg-blue-100 border-blue-200 text-blue-800" },
            ].map((item, i) => (
              <div
                key={i}
                className={`${item.color} border-2 rounded-2xl px-5 py-4 flex flex-col items-center gap-1 font-bold shadow-sm`}
              >
                <span className="text-2xl font-black">{item.age}</span>
                <span className="text-xs font-semibold opacity-70">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-orange-700/60 text-sm italic">
            I watch 1 kid at a time, possibly 2 depending on how well they get along 🤝
          </p>
        </div>
      </section>

      {/* AVAILABILITY */}
      <section id="availability" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "2.2rem", color: "#2D1B0E" }}>
              My Availability 🗓️
            </h2>
            <p className="text-orange-800/60 mt-2">When I'm available to help</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                label: "Weekdays",
                days: "Monday – Friday",
                time: "5:00 PM – 7:30 PM",
                emoji: "🌆",
                color: "from-orange-400 to-yellow-400",
              },
              {
                label: "Weekends",
                days: "Saturday & Sunday",
                time: "5:00 PM – 9:30 PM",
                emoji: "🌙",
                color: "from-pink-400 to-orange-400",
              },
              {
                label: "Summer",
                days: "All Days",
                time: "7:30 AM – 9:30 PM",
                emoji: "☀️",
                color: "from-yellow-400 to-green-400",
              },
            ].map((slot, i) => (
              <div
                key={i}
                className="rounded-3xl overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className={`bg-gradient-to-br ${slot.color} p-5 text-white text-center`}>
                  <div className="text-4xl mb-1">{slot.emoji}</div>
                  <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.4rem" }}>{slot.label}</div>
                </div>
                <div className="bg-white p-5 text-center border border-t-0 border-orange-100 rounded-b-3xl">
                  <div className="text-orange-700 font-semibold text-sm mb-1">{slot.days}</div>
                  <div className="text-orange-900 font-black text-lg">{slot.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16 px-6 bg-white/60">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "2.2rem", color: "#2D1B0E" }} className="mb-2">
            My Rates 💰
          </h2>
          <p className="text-orange-800/60 mb-10">Simple, fair pricing for great care</p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-orange-400 to-yellow-400 rounded-3xl p-8 text-white shadow-lg hover:-translate-y-1 transition-all">
              <div className="text-5xl mb-3">👦</div>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.5rem" }}>Regular Rate</div>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: "3rem", lineHeight: 1 }} className="my-3">$15<span className="text-xl">/hr</span></div>
              <p className="text-white/80 text-sm">Per child · Weekdays & Weekends</p>
              <div className="mt-4 bg-white/20 rounded-2xl px-4 py-2 text-sm font-semibold">
                2 kids? That's $30/hr total
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-400 to-green-400 rounded-3xl p-8 text-white shadow-lg hover:-translate-y-1 transition-all">
              <div className="text-5xl mb-3">☀️</div>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.5rem" }}>Summer All-Day Rate</div>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: "3rem", lineHeight: 1 }} className="my-3">$15<span className="text-xl">/hr</span></div>
              <p className="text-white/80 text-sm">Per child · Full day summer sits</p>
              <div className="mt-4 bg-white/20 rounded-2xl px-4 py-2 text-sm font-semibold">
                2 kids? That's $30/hr total
              </div>
            </div>
          </div>
          <div className="mt-8 bg-white rounded-3xl border border-orange-100 shadow-sm p-6 text-left flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex items-start gap-3">
              <span className="text-3xl">💵</span>
              <div>
                <div className="font-bold text-orange-900 mb-1">Cash</div>
                <p className="text-orange-800/70 text-sm">Pay in cash at the end of the session.</p>
              </div>
            </div>
            <div className="w-px bg-orange-100 hidden sm:block" />
            <div className="flex-1 flex items-start gap-3">
              <span className="text-3xl">📱</span>
              <div>
                <div className="font-bold text-orange-900 mb-1">E-Transfer</div>
                <p className="text-orange-800/70 text-sm">Send to: <a href="mailto:marieducolon7@gmail.com" className="font-black text-orange-600 hover:underline">marieducolon7@gmail.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "2.2rem", color: "#2D1B0E" }}>
              Questions Parents Ask 🙋
            </h2>
            <p className="text-orange-800/60 mt-2">Here are some common things parents want to know</p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              {
                q: "Do you have experience with babies?",
                a: "Yes! I have a 1-year-old baby brother at home, so I'm around little ones every single day. I'm used to their needs and how to keep them happy and safe.",
                emoji: "👶",
              },
              {
                q: "Can you handle bedtime routines?",
                a: "Absolutely! Just let me know your child's bedtime routine before you leave — I'll follow it as closely as possible so they feel comfortable and settled.",
                emoji: "🌙",
              },
              {
                q: "Do you bring activities or supplies?",
                a: "I come with lots of fun ideas for games and activities! I don't bring craft supplies, so it helps if parents have some basics at home like paper, crayons, or toys.",
                emoji: "🎨",
              },
              {
                q: "What if I need to cancel?",
                a: "No worries! Just let me know as early as possible — the sooner the better so I can plan my schedule. Send me an email or have someone call my mom.",
                emoji: "📅",
              },
              {
                q: "Can you handle a first aid situation?",
                a: "I can help with basic first aid like cuts, scrapes, and bumps. I'm honest that I haven't learned the Heimlich maneuver yet, but I will be learning it at my upcoming babysitting course. In any emergency I will call 911 and contact you right away.",
                emoji: "🩹",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white border-2 border-orange-100 rounded-3xl p-6 flex gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <span className="text-3xl mt-0.5">{item.emoji}</span>
                <div>
                  <div className="font-bold text-orange-900 mb-1">{item.q}</div>
                  <p className="text-orange-800/70 text-sm leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 px-6 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "2.2rem", color: "#2D1B0E" }}>
              Get in Touch 📬
            </h2>
            <p className="text-orange-800/60 mt-2">Send me a message and I'll get back to you soon!</p>
            <div className="mt-4 flex flex-col items-center gap-3">
              <div className="flex flex-col items-center gap-1 bg-orange-100 text-orange-800 px-5 py-3 rounded-2xl border border-orange-200 font-semibold text-sm text-center">
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <span>Text/Call Ashley: <a href="tel:5878543601" className="font-black text-orange-600 hover:underline">(587) 854-3601</a></span>
                </div>
                <p className="text-xs text-orange-700/70 font-medium">⚠️ I won't pick up calls between 7am–4pm (school hours). Please text or leave a voicemail!</p>
              </div>
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-5 py-3 rounded-2xl border border-orange-200 font-semibold text-sm">
                <span>📞</span>
                <span>Call my mom: <a href="tel:5875908972" className="font-black text-orange-600 hover:underline">587-590-8972</a></span>
              </div>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-5 py-3 rounded-2xl border border-blue-200 font-semibold text-sm">
                <span>✉️</span>
                <span>Email me: <a href="mailto:maruzsashley237@gmail.com" className="font-black text-blue-600 hover:underline">maruzsashley237@gmail.com</a></span>
              </div>
              <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-800 px-5 py-3 rounded-2xl border border-purple-200 font-semibold text-sm">
                <span>📶</span>
                <span>Please note: I need WiFi access to stay in touch with my mom via Messenger while I babysit.</span>
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="bg-white rounded-3xl p-10 shadow-md text-center border border-orange-100 animate-pop">
              <div className="text-6xl mb-4">🎉</div>
              <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.6rem", color: "#FF7F5C" }}>
                Message Sent!
              </h3>
              <p className="text-orange-800/70 mt-2">Thanks! I'll get back to you as soon as I can 💛</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 shadow-md border border-orange-100 flex flex-col gap-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-orange-900 font-bold text-sm mb-1 block">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full border-2 border-orange-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-300 transition-colors bg-orange-50/30"
                  />
                </div>
                <div>
                  <label className="text-orange-900 font-bold text-sm mb-1 block">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full border-2 border-orange-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-300 transition-colors bg-orange-50/30"
                  />
                </div>
              </div>
              <div>
                <label className="text-orange-900 font-bold text-sm mb-1 block">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full border-2 border-orange-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-300 transition-colors bg-orange-50/30"
                />
              </div>
              <div>
                <label className="text-orange-900 font-bold text-sm mb-1 block">Tell me about your child 👶</label>
                <textarea
                  rows={4}
                  placeholder="Child's age, any special needs, date you need me..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full border-2 border-orange-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-300 transition-colors bg-orange-50/30 resize-none"
                />
              </div>
              <div>
                <label className="text-orange-900 font-bold text-sm mb-2 block">Rate Ashley's service ⭐</label>
                <StarRating value={form.rating} onChange={v => setForm({ ...form, rating: v })} />
                {form.rating > 0 && (
                  <p className="text-xs text-orange-600 mt-1">{["","Not great","It was okay","Good!","Really good!","Amazing! 🌟"][form.rating]}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold text-lg py-4 rounded-2xl shadow-md transition-all hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : <><span>Send Message</span><Icon name="Send" size={18} /></>}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-orange-900 text-orange-200 text-center py-8 px-4">
        <div className="text-2xl mb-2">🌟</div>
        <p style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.1rem", color: "#FFB347" }}>
          Sunny's Sunset Babysitting Service
        </p>
        <p className="text-sm mt-1 opacity-60">Caring for your little ones with love ❤️</p>
      </footer>
    </div>
  );
}