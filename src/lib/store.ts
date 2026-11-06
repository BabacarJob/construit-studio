import { useSyncExternalStore } from "react";
import { seedData, type AppData } from "./data";

const KEY = "rentalproof-demo-data-v1";
const SESSION_KEY = "rentalproof-demo-session";

const SERVER = seedData();
let state: AppData | null = null;
const listeners = new Set<() => void>();

function load(): AppData {
  if (state) return state;
  try {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(KEY) : null;
    state = raw ? (JSON.parse(raw) as AppData) : seedData();
  } catch {
    state = seedData();
  }
  return state;
}

export function getData() {
  return load();
}

export function setData(updater: (d: AppData) => AppData) {
  state = updater(load());
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage full — keep in memory */
  }
  listeners.forEach((l) => l());
}

export function resetData() {
  setData(() => seedData());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useData(): AppData {
  return useSyncExternalStore(subscribe, load, () => SERVER);
}

export const uid = (p: string) => `${p}-${Math.random().toString(36).slice(2, 9)}`;

/* ---------- Demo session (frontend only, not secure) ---------- */
export interface Session {
  name: string;
  email: string;
}
const sessionListeners = new Set<() => void>();
let sessionCache: string | null | undefined;

function readSession(): string | null {
  if (sessionCache !== undefined) return sessionCache;
  sessionCache = typeof window !== "undefined" ? window.localStorage.getItem(SESSION_KEY) : null;
  return sessionCache;
}

export function login(s: Session) {
  sessionCache = JSON.stringify(s);
  window.localStorage.setItem(SESSION_KEY, sessionCache);
  sessionListeners.forEach((l) => l());
}

export function logout() {
  sessionCache = null;
  window.localStorage.removeItem(SESSION_KEY);
  sessionListeners.forEach((l) => l());
}

export function hasSession() {
  return !!readSession();
}

export function useSession(): Session | null {
  const raw = useSyncExternalStore(
    (l) => {
      sessionListeners.add(l);
      return () => sessionListeners.delete(l);
    },
    readSession,
    () => null,
  );
  return raw ? (JSON.parse(raw) as Session) : null;
}

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
export const fmtDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
export const fmtMoney = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export function fileToDataUrl(file: File, max = 900): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = img.width * scale;
        c.height = img.height * scale;
        c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
        resolve(c.toDataURL("image/jpeg", 0.72));
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
