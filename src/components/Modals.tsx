import React, { useState } from 'react';
import { useUIStore } from '../store/modalStore';

// Quote Request Modal
export const QuoteModal: React.FC = () => {
  const { quoteModal, closeQuoteModal } = useUIStore();
  const [formData, setFormData] = useState<Record<string, string>>({});

  if (!quoteModal.isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('✅ Quote request submitted! Our team will contact you within 24 hours.\nHum Aap ke PAaaS Hai! 🎭');
    closeQuoteModal();
  };

  const quoteFields: Record<string, { label: string; placeholder: string; type: 'input' | 'textarea' }[]> = {
    pravartan: [
      { label: 'Campaign Objective', placeholder: 'e.g. Brand launch, product promotion...', type: 'input' },
      { label: 'Target Market / Audience', placeholder: 'e.g. Youth, corporate, mass market', type: 'input' },
      { label: 'Preferred Art Form', placeholder: 'e.g. Flash mob, theatre, video', type: 'input' },
      { label: 'Budget Range', placeholder: 'e.g. ₹50,000 – ₹2,00,000', type: 'input' },
      { label: 'Timeline / Event Date', placeholder: 'e.g. June 2026, 3 weeks from now', type: 'input' },
      { label: 'Additional Details', placeholder: 'Any specific requirements...', type: 'textarea' },
    ],
    aakhyan: [
      { label: 'Organisation / Company Name', placeholder: 'e.g. ABC Pvt. Ltd.', type: 'input' },
      { label: 'No. of Participants', placeholder: 'e.g. 30–50 employees', type: 'input' },
      { label: 'Training Objective', placeholder: 'e.g. Leadership, communication', type: 'input' },
      { label: 'Preferred Duration', placeholder: 'e.g. Half day, full day', type: 'input' },
      { label: 'Location Preference', placeholder: 'e.g. Our office, offsite', type: 'input' },
      { label: 'Additional Notes', placeholder: 'Special needs, dietary requirements', type: 'textarea' },
    ],
    aamarsh: [
      { label: 'Company / Brand / NGO Name', placeholder: 'e.g. Tata Motors', type: 'input' },
      { label: 'CSR Cause / Theme', placeholder: 'e.g. Girl child education', type: 'input' },
      { label: 'Target Community', placeholder: 'e.g. Rural Gujarat', type: 'input' },
      { label: 'Budget Allocated', placeholder: 'e.g. ₹5 Lakhs', type: 'input' },
      { label: 'Geographic Reach', placeholder: 'e.g. Single city, pan-India', type: 'input' },
      { label: 'Expected Impact', placeholder: 'No. of people reached...', type: 'textarea' },
    ],
    abhisarg: [
      { label: 'Event Name / Occasion', placeholder: 'e.g. Annual Day', type: 'input' },
      { label: 'Expected No. of Attendees', placeholder: 'e.g. 500 people', type: 'input' },
      { label: 'Venue', placeholder: 'e.g. Venue name, city', type: 'input' },
      { label: 'Date & Time', placeholder: 'e.g. 15 June 2026, Evening', type: 'input' },
      { label: 'Services Required', placeholder: 'e.g. Anchor, performers, light & sound', type: 'input' },
      { label: 'Budget Range', placeholder: 'e.g. ₹2 Lakhs – ₹5 Lakhs', type: 'textarea' },
    ],
  };

  const fields = quoteFields[quoteModal.serviceId || 'pravartan'] || quoteFields.pravartan;

  return (
    <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold mb-1">Request a Quote</h3>
            <p className="text-xs text-red-600 italic">Tell us about your project</p>
          </div>
          <button
            onClick={closeQuoteModal}
            className="text-gray-600 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.label}>
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  placeholder={field.placeholder}
                  className="w-full bg-gray-950 border border-gray-700 text-white px-3.5 py-2.5 rounded text-sm outline-none focus:border-red-600 transition-colors resize-none min-h-20"
                />
              ) : (
                <input
                  type="text"
                  placeholder={field.placeholder}
                  className="w-full bg-gray-950 border border-gray-700 text-white px-3.5 py-2.5 rounded text-sm outline-none focus:border-red-600 transition-colors"
                />
              )}
            </div>
          ))}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">
                YOUR NAME
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-gray-950 border border-gray-700 text-white px-3.5 py-2.5 rounded text-sm outline-none focus:border-red-600 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">
                PHONE / EMAIL
              </label>
              <input
                type="text"
                placeholder="Contact details"
                className="w-full bg-gray-950 border border-gray-700 text-white px-3.5 py-2.5 rounded text-sm outline-none focus:border-red-600 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-3.5 rounded text-sm hover:bg-red-700 transition-colors mt-6"
          >
            Submit Quote Request →
          </button>
        </form>
      </div>
    </div>
  );
};

// Ticket Booking Modal
export const TicketModal: React.FC = () => {
  const { ticketModal, closeTicketModal } = useUIStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tickets: '1',
    ticketType: 'General',
  });

  if (!ticketModal.isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('🎭 Booking confirmed! Check your email for details. Hum Aap ke PAaaS Hai!');
    closeTicketModal();
  };

  return (
    <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold mb-1">Book Tickets</h3>
            <p className="text-xs text-red-600">Secure your seat</p>
          </div>
          <button
            onClick={closeTicketModal}
            className="text-gray-600 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">
                FULL NAME
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name"
                className="w-full bg-gray-950 border border-gray-700 text-white px-3.5 py-2.5 rounded text-sm outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">
                EMAIL
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                className="w-full bg-gray-950 border border-gray-700 text-white px-3.5 py-2.5 rounded text-sm outline-none focus:border-red-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">
                PHONE
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 XXXXX XXXXX"
                className="w-full bg-gray-950 border border-gray-700 text-white px-3.5 py-2.5 rounded text-sm outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">
                NO. OF TICKETS
              </label>
              <select
                value={formData.tickets}
                onChange={(e) => setFormData({ ...formData, tickets: e.target.value })}
                className="w-full bg-gray-950 border border-gray-700 text-white px-3.5 py-2.5 rounded text-sm outline-none focus:border-red-600"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">
              TICKET TYPE
            </label>
            <select
              value={formData.ticketType}
              onChange={(e) => setFormData({ ...formData, ticketType: e.target.value })}
              className="w-full bg-gray-950 border border-gray-700 text-white px-3.5 py-2.5 rounded text-sm outline-none focus:border-red-600"
            >
              <option>General — ₹299</option>
              <option>Premium — ₹599</option>
              <option>VIP — ₹999</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-3.5 rounded text-sm hover:bg-red-700 transition-colors mt-6"
          >
            Confirm Booking →
          </button>
        </form>
      </div>
    </div>
  );
};

// RSVP Modal
export const RSVPModal: React.FC = () => {
  const { rsvpModal, closeRsvpModal } = useUIStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    message: '',
  });

  if (!rsvpModal.isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('✅ RSVP confirmed! We look forward to seeing you. Hum Aap ke PAaaS Hai!');
    closeRsvpModal();
  };

  return (
    <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold mb-1">RSVP for Event</h3>
            <p className="text-xs text-red-600">Reserve your free spot</p>
          </div>
          <button
            onClick={closeRsvpModal}
            className="text-gray-600 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">
                NAME
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name"
                className="w-full bg-gray-950 border border-gray-700 text-white px-3.5 py-2.5 rounded text-sm outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">
                EMAIL
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                className="w-full bg-gray-950 border border-gray-700 text-white px-3.5 py-2.5 rounded text-sm outline-none focus:border-red-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">
              ORGANISATION (OPTIONAL)
            </label>
            <input
              type="text"
              value={formData.organisation}
              onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
              placeholder="Company / College / NGO"
              className="w-full bg-gray-950 border border-gray-700 text-white px-3.5 py-2.5 rounded text-sm outline-none focus:border-red-600"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">
              MESSAGE (OPTIONAL)
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Anything you'd like us to know..."
              className="w-full bg-gray-950 border border-gray-700 text-white px-3.5 py-2.5 rounded text-sm outline-none focus:border-red-600 resize-none min-h-20"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-3.5 rounded text-sm hover:bg-red-700 transition-colors mt-6"
          >
            Confirm RSVP →
          </button>
        </form>
      </div>
    </div>
  );
};
