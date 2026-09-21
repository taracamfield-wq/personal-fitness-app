import type { FitnessState } from "./types";

const KEYS = ["fitness-dashboard-v4", "fitness-dashboard-v3", "fitness-dashboard-v2"];
const CACHE_KEY = "fitness-dashboard-v5-cache";

function safeParse(raw: string | null): FitnessState | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as FitnessState;
  } catch {
    return null;
  }
}

function validState(state: FitnessState | null): state is FitnessState {
  return !!state && Array.isArray(state.plannedActivities) && Array.isArray(state.measurements);
}

export function loadStoredState(): FitnessState | null {
  if (typeof window === "undefined") return null;
  for (const key of KEYS) {
    const parsed = safeParse(window.localStorage.getItem(key));
    if (validState(parsed)) {
      return {
        plannedActivities: parsed.plannedActivities,
        measurements: parsed.measurements,
        maintenanceCeiling: Number.isFinite(parsed.maintenanceCeiling) ? parsed.maintenanceCeiling : 125,
      };
    }
  }
  return null;
}

export function loadCloudCache(): FitnessState | null {
  if (typeof window === "undefined") return null;
  const parsed = safeParse(window.localStorage.getItem(CACHE_KEY));
  return validState(parsed) ? parsed : null;
}

export function saveCloudCache(state: FitnessState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CACHE_KEY, JSON.stringify(state));
}
