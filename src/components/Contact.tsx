"use client";
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(useGSAP);

interface ContactProps {
  isOpen: boolean;
  onClose: () => void;
}

const Contact: React.FC<ContactProps> = ({ isOpen, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: formData.name,   
          email: formData.email, 
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  useGSAP(() => {
    if (isOpen) {
      const tl = gsap.timeline();
      tl.to(containerRef.current, {
        opacity: 1, duration: 0.25, ease: 'power2.out', pointerEvents: 'auto'
      })
      .fromTo(modalRef.current,
        { scale: 0.9, y: 30, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.4)' },
        '-=0.15'
      );
    } else {
      if (containerRef.current) {
        const tl = gsap.timeline();
        tl.to(modalRef.current, {
          scale: 0.92, y: 20, opacity: 0, duration: 0.3, ease: 'power2.in'
        })
        .to(containerRef.current, {
          opacity: 0, duration: 0.2, ease: 'power2.inOut', pointerEvents: 'none'
        }, '-=0.15');
      }
    }
  }, { dependencies: [isOpen], scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm opacity-0 pointer-events-none"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div
        ref={modalRef}
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-2xl shadow-orange-500/10 text-white z-10 opacity-0"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-xl hover:bg-slate-800 transition duration-200 cursor-pointer"
          aria-label="Close"
        >
          <MdClose size={24} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-1">
            Get In <span className="text-orange-500">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-xs mx-auto text-xs">
            Have a project in mind or want to collaborate? Let's talk
          </p>
        </div>

        <div className="space-y-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs text-gray-300 mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 focus:border-orange-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 focus:border-orange-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300 mb-1">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full h-24 bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 focus:border-orange-500 outline-none resize-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full px-6 py-2.5 bg-orange-500 rounded-lg font-semibold text-slate-950 hover:bg-orange-400 shadow-lg shadow-orange-500/20 transition duration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed text-sm"
            >
              {status === "sending" && "Sending..."}
              {status === "success" && "✅ Message Sent!"}
              {status === "error" && "❌ Failed! Try Again"}
              {status === "idle" && "Send Message"}
            </button>
          </form>

          <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-800/80">
            <div className="flex-1 min-w-[100px] flex items-center bg-slate-800/30 p-2.5 rounded-xl border border-slate-800/60">
              <div className="text-orange-500 text-base mr-2 flex-shrink-0"><FaMapMarkerAlt /></div>
              <div className="min-w-0">
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Location</p>
                <p className="text-xs text-gray-200 truncate">Pakistan</p>
              </div>
            </div>

            <div className="flex-[1.5] min-w-[180px] flex items-center bg-slate-800/30 p-2.5 rounded-xl border border-slate-800/60">
              <div className="text-orange-500 text-base mr-2 flex-shrink-0"><FaEnvelope /></div>
              <div className="min-w-0">
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Email</p>
                <p className="text-xs text-gray-200 select-all font-mono truncate" title="khalil.codelab@gmail.com">khalil.codelab@gmail.com</p>
              </div>
            </div>

            <div className="flex-1 min-w-[130px] flex items-center bg-slate-800/30 p-2.5 rounded-xl border border-slate-800/60">
              <div className="text-orange-500 text-base mr-2 flex-shrink-0"><FaPhone /></div>
              <div className="min-w-0">
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Phone</p>
                <p className="text-xs text-gray-200 whitespace-nowrap">+92 3004541151</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;