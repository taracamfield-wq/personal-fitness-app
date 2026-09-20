export type ActivityCategory = "Run" | "Strength" | "Walk" | "Mobility" | "Other";
export type ActivityStatus = "planned" | "completed" | "skipped";

export type PlannedActivity = {
  id: string;
  date: string;
  title: string;
  category: ActivityCategory;
  target?: string;
  targetMiles?: number;
  status: ActivityStatus;
  actualMiles?: number;
  actualMinutes?: number;
  notes?: string;
  source?: "manual" | "strava";
};

export type Measurement = {
  id: string;
  date: string;
  weight?: number;
  waist?: number;
};

export type FitnessState = {
  plannedActivities: PlannedActivity[];
  measurements: Measurement[];
  maintenanceCeiling: number;
};
