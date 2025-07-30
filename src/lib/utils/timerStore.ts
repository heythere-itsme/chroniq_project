import { create } from "zustand";

type Timer = {
  id?: string;
  name: string;
  total: number;
  used: number;
  isRunning: boolean;
  startTime?: number;
};

type TimerStore = {
  timers: Record<string, Timer>;
  currentTimer: string;
  incrementTimer: () => void;
  setCurrentTimer: (name: string, total: number, used: number, id: string) => void;
  setTimer: () => void;
};

let intervalId: NodeJS.Timeout | null = null;

export const useTimerStore = create<TimerStore>((set, get) => ({
  timers: {
    default: {
      id: "1234",
      name: "Select",
      total: 0,
      used: 0,
      isRunning: false,
    },
  },
  currentTimer: "default",

  setCurrentTimer: (name, total, used, id) => {
    const existing = get().timers[name];
    if (existing) {
      set(() => ({
        currentTimer: name,
      }));
      return;
    }

    const newTimer: Timer = {
      id,
      name,
      total,
      used,
      isRunning: false,
    };

    set((state) => ({
      timers: {
        ...state.timers,
        [name]: newTimer,
      },
      currentTimer: name,
    }));
  },

  setTimer: () => {
    const state = get();
    const name = state.currentTimer;
    const timer = state.timers[name];
    if (!timer) return;

    if (!timer.isRunning) {
      // Start timer
      set((prev) => ({
        timers: {
          ...prev.timers,
          [name]: {
            ...timer,
            isRunning: true,
            startTime: Date.now(),
          },
        },
      }));

      if (!intervalId) {
      intervalId = setInterval(() => {
        get().incrementTimer(); // call increment globally
      }, 1000);
    }

    } else {
      // Pause timer, calculate elapsed time
      const now = Date.now();
      const elapsed = timer.startTime ? Math.floor((now - timer.startTime) / 1000) : 0;

      set((prev) => ({
        timers: {
          ...prev.timers,
          [name]: {
            ...timer,
            isRunning: false,
            used: Math.min(timer.used + elapsed, timer.total),
            startTime: undefined,
          },
        },
      }));
      if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    }
  },

  incrementTimer: () => {
    const state = get();
    const name = state.currentTimer;
    const timer = state.timers[name];
    if (!timer || !timer.isRunning || !timer.startTime) return;

    const now = Date.now();
    const elapsed = Math.floor((now - timer.startTime) / 1000);
    const totalUsed = timer.used + elapsed;

    if (totalUsed >= timer.total) {
      // Stop timer
      set((prev) => ({
        timers: {
          ...prev.timers,
          [name]: {
            ...timer,
            isRunning: false,
            used: timer.total,
            startTime: undefined,
          },
        },
      }));
    } else {
      // Just force state update to trigger UI re-render
      set((prev) => ({
        timers: {
          ...prev.timers,
          [name]: {
            ...timer,
          },
        },
      }));
    }
  },
}));
