import { create } from 'zustand';

interface UiState {
  isJoinModalOpen: boolean;
  theme: 'light' | 'dark';
  openJoinModal: () => void;
  closeJoinModal: () => void;
  toggleTheme: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isJoinModalOpen: false,
  theme: 'dark',
  openJoinModal: () => set({ isJoinModalOpen: true }),
  closeJoinModal: () => set({ isJoinModalOpen: false }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' }))
}));
