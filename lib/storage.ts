import type { FitnessState } from "./types";

const KEY = "fitness-dashboard-v4";
const PREVIOUS_KEY = "fitness-dashboard-v3";
const OLDER_KEY = "fitness-dashboard-v2";
const LEGACY_KEY = "fitness-dashboard-v1";

function safeParse(raw: string | null): FitnessState | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as FitnessState;
  } catch {
    return null;
  }
}

function normalize(state: FitnessState, fallback: FitnessState): FitnessState {
  return {
    plannedActivities: Array.isArray(state.plannedActivities) ? state.plannedActivities : fallback.plannedActivities,
    measurements: Array.isArray(state.measurements) ? state.measurements : fallback.measurements,
    maintenanceCeiling: Number.isFinite(state.maintenanceCeiling) ? state.maintenanceCeiling : fallback.maintenanceCeiling,
  };
}

export function loadState(fallback: FitnessState): FitnessState {
  if (typeof window === "undefined") return fallback;

  const current = safeParse(window.localStorage.getItem(KEY));
  if (current) return normalize(current, fallback);

  // Preserve everything entered in v3, including cloned weeks and edits.
  const previous = safeParse(window.localStorage.getItem(PREVIOUS_KEY));
  if (previous) return normalize(previous, fallback);

  // Preserve v2 data if v3 was never used.
  const older = safeParse(window.localStorage.getItem(OLDER_KEY));
  if (older) return normalize(older, fallback);

  // Older prototype migration: preserve measurements and maintenance ceiling,
  // but use the current Sunday-based fallback plan.
  const legacy = safeParse(window.localStorage.getItem(LEGACY_KEY));
  if (legacy) {
    return {
      plannedActivities: fallback.plannedActivities,
      measurements: Array.isArray(legacy.measurements) ? legacy.measurements : fallback.measurements,
      maintenanceCeiling: Number.isFinite(legacy.maintenanceCeiling) ? legacy.maintenanceCeiling : fallback.maintenanceCeiling,
    };
  }

  return fallback;
}

export function saveState(state: FitnessState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
}
