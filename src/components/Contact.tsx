"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

gsap.registerPlugin(useGSAP);

interface ContactProps {
  isOpen: boolean;
  onClose: () => void;
}

const Contact: React.FC<ContactProps> = ({ isOpen, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isOpen) {
      const tl = gsap.timeline();
      
      tl.to(containerRef.current, {
        opacity: 1,
        duration: 0.25,
        ease: 'power2.out',
        pointerEvents: 'auto'
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
          scale: 0.92,
          y: 20,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in'
        })
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.inOut',
          pointerEvents: 'none'
        }, '-=0.15');
      }
    }
  }, { dependencies: [isOpen], scope: containerRef });

  if (!isOpen && containerRef.current && gsap.getProperty(containerRef.current, "opacity") === 0) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm opacity-0 pointer-events-none"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 md:p-10 shadow-2xl shadow-orange-500/10 text-white z-10 opacity-0"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-xl hover:bg-slate-800 transition duration-200 cursor-pointer"
          aria-label="Close"
        >
          <MdClose size={24} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Get In <span className="text-orange-400">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto text-sm">
            Have a project in mind or want to collaborate? Let's talk
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Contact Form */}
          <div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm text-gray-300 mb-1">Your Name</label>
                <input type="text" id="name" className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 focus:border-orange-400 outline-none transition" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email Address</label>
                <input type="email" id="email" className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 focus:border-orange-400 outline-none transition" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-gray-300 mb-1">Your Message</label>
                <textarea id="message" className="w-full h-32 bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 focus:border-orange-400 outline-none resize-none transition" />
              </div>
              
              <button type="submit" className="w-full px-6 py-3 bg-orange-400 rounded-lg font-semibold text-slate-950 hover:bg-orange-300 shadow-lg shadow-orange-400/20 transition duration-300 cursor-pointer">
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-4 flex flex-col justify-center h-full">
            <div className="flex items-center bg-slate-800/40 p-4 rounded-xl border border-slate-800/60 shadow-inner">
              <div className="text-orange-400 text-xl mr-4 flex-shrink-0"><FaMapMarkerAlt /></div>
              <div>
                <h3 className="text-sm font-semibold text-gray-200">Location</h3>
                <p className="text-sm text-gray-400">Punjab, Pakistan</p>
              </div>
            </div>

            <div className="flex items-center bg-slate-800/40 p-4 rounded-xl border border-slate-800/60 shadow-inner">
              <div className="text-orange-400 text-xl mr-4 flex-shrink-0"><FaEnvelope /></div>
              <div>
                <h3 className="text-sm font-semibold text-gray-200">Email</h3>
                <p className="text-sm text-gray-400">khalil.codelab@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center bg-slate-800/40 p-4 rounded-xl border border-slate-800/60 shadow-inner">
              <div className="text-orange-400 text-xl mr-4 flex-shrink-0"><FaPhone /></div>
              <div>
                <h3 className="text-sm font-semibold text-gray-200">Phone</h3>
                <p className="text-sm text-gray-400">+92 3004541151</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;