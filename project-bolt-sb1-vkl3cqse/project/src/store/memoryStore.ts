import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Palace, Room, MemoryItem } from '../types';

interface MemoryState {
  palaces: Palace[];
  currentPalace: Palace | null;
  currentRoom: Room | null;
  addPalace: (palace: Palace) => void;
  addRoom: (palaceId: string, room: Room) => void;
  addMemoryItem: (palaceId: string, roomId: string, item: MemoryItem) => void;
  updateMemoryItem: (palaceId: string, roomId: string, item: MemoryItem) => void;
  setCurrentPalace: (palace: Palace | null) => void;
  setCurrentRoom: (room: Room | null) => void;
  updateRetentionScore: (palaceId: string, roomId: string, itemId: string, score: number) => void;
}

export const useMemoryStore = create<MemoryState>()(
  persist(
    (set, get) => ({
      palaces: [],
      currentPalace: null,
      currentRoom: null,

      addPalace: (palace) =>
        set((state) => ({
          palaces: [...state.palaces, palace],
        })),

      addRoom: (palaceId, room) =>
        set((state) => ({
          palaces: state.palaces.map((p) =>
            p.id === palaceId
              ? { ...p, rooms: [...p.rooms, room], totalItems: p.totalItems + room.items.length }
              : p
          ),
        })),

      addMemoryItem: (palaceId, roomId, item) =>
        set((state) => ({
          palaces: state.palaces.map((p) =>
            p.id === palaceId
              ? {
                  ...p,
                  rooms: p.rooms.map((r) =>
                    r.id === roomId
                      ? { ...r, items: [...r.items, item] }
                      : r
                  ),
                  totalItems: p.totalItems + 1,
                }
              : p
          ),
        })),

      updateMemoryItem: (palaceId, roomId, item) =>
        set((state) => ({
          palaces: state.palaces.map((p) =>
            p.id === palaceId
              ? {
                  ...p,
                  rooms: p.rooms.map((r) =>
                    r.id === roomId
                      ? {
                          ...r,
                          items: r.items.map((i) =>
                            i.id === item.id ? item : i
                          ),
                        }
                      : r
                  ),
                }
              : p
          ),
        })),

      setCurrentPalace: (palace) =>
        set({ currentPalace: palace }),

      setCurrentRoom: (room) =>
        set({ currentRoom: room }),

      updateRetentionScore: (palaceId, roomId, itemId, score) =>
        set((state) => {
          const newPalaces = state.palaces.map((p) =>
            p.id === palaceId
              ? {
                  ...p,
                  rooms: p.rooms.map((r) =>
                    r.id === roomId
                      ? {
                          ...r,
                          items: r.items.map((i) =>
                            i.id === itemId
                              ? {
                                  ...i,
                                  retentionScore: score,
                                  reviewCount: i.reviewCount + 1,
                                  lastReviewed: new Date(),
                                }
                              : i
                          ),
                        }
                      : r
                  ),
                }
              : p
          );

          // Update average retention for the palace
          const palace = newPalaces.find((p) => p.id === palaceId);
          if (palace) {
            const allItems = palace.rooms.flatMap((r) => r.items);
            const avgRetention =
              allItems.reduce((sum, item) => sum + item.retentionScore, 0) /
              allItems.length;
            palace.averageRetention = avgRetention;
          }

          return { palaces: newPalaces };
        }),
    }),
    {
      name: 'memory-palace-storage',
    }
  )
);