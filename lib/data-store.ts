"use client";

import { useState, useEffect } from "react";
import * as fallbackData from "./mock-data";

export type DataKey = keyof typeof fallbackData;

export function getStoredData<T>(key: DataKey, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = window.localStorage.getItem(`palomares_beauty_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return fallback;
  }
}

export function saveStoredData<T>(key: DataKey, data: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(`palomares_beauty_${key}`, JSON.stringify(data));
    // Trigger custom event to notify all components using useData
    window.dispatchEvent(new Event("palomares-data-update"));
  } catch (error) {
    console.error(`Error writing localStorage key "${key}":`, error);
  }
}

export function clearStoredData(): void {
  if (typeof window === "undefined") return;
  try {
    Object.keys(fallbackData).forEach((key) => {
      window.localStorage.removeItem(`palomares_beauty_${key}`);
    });
    window.dispatchEvent(new Event("palomares-data-update"));
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}

export function useData<T>(key: DataKey, fallback: T): [T, (val: T) => void] {
  const [data, setData] = useState<T>(fallback);

  useEffect(() => {
    // Read on mount to get correct client-side values
    setData(getStoredData(key, fallback));

    const handleUpdate = () => {
      setData(getStoredData(key, fallback));
    };

    window.addEventListener("palomares-data-update", handleUpdate);
    return () => {
      window.removeEventListener("palomares-data-update", handleUpdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const updateData = (newValue: T) => {
    saveStoredData(key, newValue);
  };

  return [data, updateData];
}

export function getEntireStore(): Record<string, any> {
  const store: Record<string, any> = {};
  Object.keys(fallbackData).forEach((key) => {
    store[key] = getStoredData(key as DataKey, fallbackData[key as DataKey]);
  });
  return store;
}

export function saveEntireStore(store: Record<string, any>): void {
  if (typeof window === "undefined") return;
  try {
    Object.keys(fallbackData).forEach((key) => {
      if (store[key] !== undefined) {
        window.localStorage.setItem(`palomares_beauty_${key}`, JSON.stringify(store[key]));
      }
    });
    window.dispatchEvent(new Event("palomares-data-update"));
  } catch (error) {
    console.error("Error saving entire store:", error);
  }
}

export function isUsingCustomData(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return Object.keys(fallbackData).some((key) => {
      return window.localStorage.getItem(`palomares_beauty_${key}`) !== null;
    });
  } catch {
    return false;
  }
}
