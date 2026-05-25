import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProfileState {
  name: string;
  setName: (newName: string) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      name: '이름이름이름이름이름이름이름',
      setName: (newName) => set({ name: newName }),
    }),
    {
      name: 'profile-storage',
    },
  ),
);
