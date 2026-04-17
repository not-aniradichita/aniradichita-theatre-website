import { create } from 'zustand';

export interface ModalState {
  quoteModal: {
    isOpen: boolean;
    serviceId?: string;
    serviceName?: string;
  };
  ticketModal: {
    isOpen: boolean;
    eventId?: string;
    eventName?: string;
  };
  rsvpModal: {
    isOpen: boolean;
    eventId?: string;
    eventName?: string;
  };
  mobileMenuOpen: boolean;
}

interface UIStore extends ModalState {
  // Quote Modal
  openQuoteModal: (serviceId: string, serviceName: string) => void;
  closeQuoteModal: () => void;
  
  // Ticket Modal
  openTicketModal: (eventId: string, eventName: string) => void;
  closeTicketModal: () => void;
  
  // RSVP Modal
  openRsvpModal: (eventId: string, eventName: string) => void;
  closeRsvpModal: () => void;
  
  // Mobile Menu
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  quoteModal: { isOpen: false },
  ticketModal: { isOpen: false },
  rsvpModal: { isOpen: false },
  mobileMenuOpen: false,

  openQuoteModal: (serviceId, serviceName) =>
    set({
      quoteModal: { isOpen: true, serviceId, serviceName },
    }),
  closeQuoteModal: () =>
    set({
      quoteModal: { isOpen: false },
    }),

  openTicketModal: (eventId, eventName) =>
    set({
      ticketModal: { isOpen: true, eventId, eventName },
    }),
  closeTicketModal: () =>
    set({
      ticketModal: { isOpen: false },
    }),

  openRsvpModal: (eventId, eventName) =>
    set({
      rsvpModal: { isOpen: true, eventId, eventName },
    }),
  closeRsvpModal: () =>
    set({
      rsvpModal: { isOpen: false },
    }),

  toggleMobileMenu: () =>
    set((state) => ({
      mobileMenuOpen: !state.mobileMenuOpen,
    })),
  closeMobileMenu: () =>
    set({
      mobileMenuOpen: false,
    }),
}));
