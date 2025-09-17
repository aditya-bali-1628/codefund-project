// components/Contact.jsx
"use client";
import { Mail, Phone, Send } from "lucide-react";

export default function Contact() {
  return (
    <section className="min-h-screen text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-slate-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Me</h2>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4">
            <Mail className="text-teal-400" />
            <span className="break-all">baliaditya72@gmail.com</span>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="text-teal-400" />
            <span>+91-8080538785</span>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Form submitted!");
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              required
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              required
              placeholder="Your Message"
              rows="4"
              className="w-full p-3 rounded-lg bg-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 transition-all text-white font-medium px-6 py-3 rounded-lg"
          >
            <Send size={18} />
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
