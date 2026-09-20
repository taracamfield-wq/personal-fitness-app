"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { ActivityCategory, FitnessState, Measurement, PlannedActivity } from "../lib/types";
import { loadState, saveState } from "../lib/storage";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const categories: ActivityCategory[] = ["Run", "Strength", "Walk", "Mobility", "Other"];

function localDateISO(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseLocalDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function startOfWeek(date = new Date()) {
  const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  copy.setDate(copy.getDate() - copy.getDay());
  return copy;
}

function addDays(date: Date, days: number) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function formatRange(start: Date) {
  const end = addDays(start, 6);
  const startMonth = start.toLocaleDateString("en-US", { month: "short" });
  const endMonth = end.toLocaleDateString("en-US", { month: "short" });
  const startDay = start.getDate();
  const endDay = end.getDate();
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  if (startYear === endYear && start.getMonth() === end.getMonth()) {
    return `${startMonth} ${startDay}–${endDay}, ${startYear}`;
  }
  if (startYear === endYear) {
    return `${startMonth} ${startDay}–${endMonth} ${endDay}, ${startYear}`;
  }
  return `${startMonth} ${startDay}, ${startYear}–${endMonth} ${endDay}, ${endYear}`;
}

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function seedActivities(weekStart: Date): PlannedActivity[] {
  const dateFor = (dayIndex: number) => localDateISO(addDays(weekStart, dayIndex));
  return [
    { id: uid("a"), date: dateFor(0), title: "Stretch + recovery", category: "Mobility", target: "10–15 min", status: "planned", source: "manual" },
    { id: uid("a"), date: dateFor(1), title: "Morning walk", category: "Walk", target: "Easy / fasted if desired", status: "planned", source: "manual" },
    { id: uid("a"), date: dateFor(2), title: "Zone 2 run", category: "Run", target: "45–60 min", targetMiles: 4, status: "planned", source: "manual" },
    { id: uid("a"), date: dateFor(3), title: "Strength", category: "Strength", target: "15–20 min", status: "planned", source: "manual" },
    { id: uid("a"), date: dateFor(4), title: "Morning walk", category: "Walk", target: "30+ min", status: "planned", source: "manual" },
    { id: uid("a"), date: dateFor(5), title: "Zone 2 run", category: "Run", target: "Easy", targetMiles: 4, status: "planned", source: "manual" },
    { id: uid("a"), date: dateFor(6), title: "Long run", category: "Run", target: "Build gradually", targetMiles: 7, status: "planned", source: "manual" },
  ];
}

const initialWeekStart = startOfWeek();
const initialState: FitnessState = {
  plannedActivities: seedActivities(initialWeekStart),
  measurements: [],
  maintenanceCeiling: 125,
};

function average(values: number[]) {
  if (!values.length) return undefined;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function daysAgo(iso: string) {
  const now = new Date();
  const d = parseLocalDate(iso);
  return (new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() - d.getTime()) / 86400000;
}

function weightStats(measurements: Measurement[]) {
  const current = measurements.filter((m) => typeof m.weight === "number" && daysAgo(m.date) >= 0 && daysAgo(m.date) < 30).map((m) => m.weight as number);
  const previous = measurements.filter((m) => typeof m.weight === "number" && daysAgo(m.date) >= 30 && daysAgo(m.date) < 60).map((m) => m.weight as number);
  return { current: average(current), previous: average(previous), count: current.length };
}

function WeightSparkline({ measurements }: { measurements: Measurement[] }) {
  const points = measurements.filter((m) => typeof m.weight === "number").slice().sort((a, b) => a.date.localeCompare(b.date)).slice(-30);
  if (points.length < 2) return <div className="spark-empty">Add a few weigh-ins and your 30-day trend will appear here.</div>;

  const values = points.map((p) => p.weight as number);
  const min = Math.min(...values) - 0.5;
  const max = Math.max(...values) + 0.5;
  const coords = points.map((p, i) => {
    const x = (i / Math.max(1, points.length - 1)) * 100;
    const y = 92 - (((p.weight as number) - min) / Math.max(0.1, max - min)) * 76;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg className="spark" viewBox="0 0 100 100" role="img" aria-label="Recent weight trend">
      <line x1="0" x2="100" y1="92" y2="92" className="spark-grid" />
      <polyline points={coords} fill="none" className="spark-line" vectorEffect="non-scaling-stroke" />
      {points.map((p, i) => {
        const [x, y] = coords.split(" ")[i].split(",");
        return <circle key={p.id} cx={x} cy={y} r="1.8" className="spark-dot"><title>{`${p.date}: ${(p.weight as number).toFixed(1)} lb`}</title></circle>;
      })}
    </svg>
  );
}

export default function Dashboard() {
  const [state, setState] = useState<FitnessState>(initialState);
  const [hydrated, setHydrated] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [addCategory, setAddCategory] = useState<ActivityCategory>("Run");
  const [logging, setLogging] = useState<PlannedActivity | null>(null);
  const [editing, setEditing] = useState<PlannedActivity | null>(null);
  const [editCategory, setEditCategory] = useState<ActivityCategory>("Run");
  const [editTitle, setEditTitle] = useState("");
  const [viewWeekStartIso, setViewWeekStartIso] = useState(localDateISO(initialWeekStart));

  const viewedWeekStart = useMemo(() => parseLocalDate(viewWeekStartIso), [viewWeekStartIso]);
  const currentWeekStartIso = localDateISO(startOfWeek());
  const weekDates = useMemo(() => dayNames.map((_, i) => localDateISO(addDays(viewedWeekStart, i))), [viewedWeekStart]);
  const isCurrentWeek = viewWeekStartIso === currentWeekStartIso;

  useEffect(() => {
    setState(loadState(initialState));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveState(state);
  }, [state, hydrated]);

  const thisWeek = state.plannedActivities.filter((a) => weekDates.includes(a.date)).sort((a, b) => a.date.localeCompare(b.date));
  const completed = thisWeek.filter((a) => a.status === "completed");
  const plannedCount = thisWeek.filter((a) => a.status !== "skipped").length;
  const completionPct = plannedCount ? Math.round((completed.length / plannedCount) * 100) : 0;
  const runningMiles = completed.reduce((sum, a) => sum + (a.category === "Run" ? a.actualMiles || 0 : 0), 0);
  const plannedRunningMiles = thisWeek.reduce((sum, a) => sum + (a.category === "Run" && a.status !== "skipped" ? a.targetMiles || 0 : 0), 0);
  const strengthCount = completed.filter((a) => a.category === "Strength").length;
  const weights = weightStats(state.measurements);
  const latestWaist = state.measurements.filter((m) => typeof m.waist === "number").sort((a, b) => b.date.localeCompare(a.date))[0]?.waist;
  const weightDelta = weights.current !== undefined && weights.previous !== undefined ? weights.current - weights.previous : undefined;
  const belowCeiling = weights.current !== undefined ? state.maintenanceCeiling - weights.current : undefined;

  function shiftWeek(days: number) {
    setViewWeekStartIso(localDateISO(addDays(viewedWeekStart, days)));
  }

  function openEdit(activity: PlannedActivity) {
    setEditing(activity);
    setEditCategory(activity.category);
    setEditTitle(activity.title);
  }

  function addPlannedActivity(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const date = String(form.get("date") || "");
    const title = String(form.get("title") || "").trim();
    const category = String(form.get("category") || "Other") as ActivityCategory;
    const target = String(form.get("target") || "").trim();
    const targetMilesRaw = String(form.get("targetMiles") || "").trim();
    const targetMiles = category === "Run" && targetMilesRaw ? Number(targetMilesRaw) : undefined;
    if (!date || !title) return;
    setState((s) => ({
      ...s,
      plannedActivities: [...s.plannedActivities, {
        id: uid("a"), date, title, category, target,
        targetMiles: Number.isFinite(targetMiles) ? targetMiles : undefined,
        status: "planned", source: "manual"
      }]
    }));
    e.currentTarget.reset();
    setAddCategory("Run");
    setShowAdd(false);
  }

  function editPlannedActivity(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    const form = new FormData(e.currentTarget);
    const date = String(form.get("date") || editing.date);
    const title = editTitle.trim();
    const category = String(form.get("category") || editing.category) as ActivityCategory;
    const target = String(form.get("target") || "").trim();
    const targetMilesRaw = String(form.get("targetMiles") || "").trim();
    const targetMiles = category === "Run" && targetMilesRaw ? Number(targetMilesRaw) : undefined;
    if (!title) return;
    setState((s) => ({
      ...s,
      plannedActivities: s.plannedActivities.map((a) => a.id === editing.id ? {
        ...a, date, title, category, target,
        targetMiles: Number.isFinite(targetMiles) ? targetMiles : undefined,
      } : a)
    }));
    setEditing(null);
  }

  function logActivity(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!logging) return;
    const form = new FormData(e.currentTarget);
    const milesRaw = String(form.get("miles") || "").trim();
    const minutesRaw = String(form.get("minutes") || "").trim();
    const notes = String(form.get("notes") || "").trim();
    const miles = milesRaw ? Math.max(0, Math.min(200, Number(milesRaw))) : undefined;
    const minutes = minutesRaw ? Math.max(0, Math.min(1000, Number(minutesRaw))) : undefined;
    setState((s) => ({
      ...s,
      plannedActivities: s.plannedActivities.map((a) => a.id === logging.id ? {
        ...a,
        status: "completed",
        actualMiles: Number.isFinite(miles) ? miles : undefined,
        actualMinutes: Number.isFinite(minutes) ? minutes : undefined,
        notes
      } : a),
    }));
    setLogging(null);
  }

  function cloneToNextWeek() {
    if (!thisWeek.length) return;
    const nextStart = addDays(viewedWeekStart, 7);
    const nextDates = dayNames.map((_, i) => localDateISO(addDays(nextStart, i)));
    const existing = state.plannedActivities.some((a) => nextDates.includes(a.date));
    if (existing && !window.confirm("The next week already has activities. Add another copy of this week's plan anyway?")) return;

    const cloned = thisWeek.map((a) => {
      const offset = weekDates.indexOf(a.date);
      return {
        id: uid("a"),
        date: localDateISO(addDays(nextStart, Math.max(0, offset))),
        title: a.title,
        category: a.category,
        target: a.target,
        targetMiles: a.targetMiles,
        status: "planned" as const,
        source: "manual" as const,
      };
    });
    setState((s) => ({ ...s, plannedActivities: [...s.plannedActivities, ...cloned] }));
    setViewWeekStartIso(localDateISO(nextStart));
  }

  function markSkipped(id: string) {
    setState((s) => ({ ...s, plannedActivities: s.plannedActivities.map((a) => a.id === id ? { ...a, status: "skipped" } : a) }));
  }

  function restore(id: string) {
    setState((s) => ({ ...s, plannedActivities: s.plannedActivities.map((a) => a.id === id ? { ...a, status: "planned", actualMiles: undefined, actualMinutes: undefined, notes: undefined } : a) }));
  }

  function remove(id: string) {
    setState((s) => ({ ...s, plannedActivities: s.plannedActivities.filter((a) => a.id !== id) }));
  }

  function saveMeasurement(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const date = String(form.get("measureDate") || localDateISO(new Date()));
    const weightRaw = String(form.get("weight") || "").trim();
    const waistRaw = String(form.get("waist") || "").trim();
    const weight = weightRaw ? Number(weightRaw) : undefined;
    const waist = waistRaw ? Number(waistRaw) : undefined;
    if ((weight === undefined || !Number.isFinite(weight)) && (waist === undefined || !Number.isFinite(waist))) return;
    const entry: Measurement = { id: uid("m"), date, weight: weight && weight > 0 ? weight : undefined, waist: waist && waist > 0 ? waist : undefined };
    setState((s) => ({ ...s, measurements: [...s.measurements.filter((m) => m.date !== date), entry].sort((a, b) => a.date.localeCompare(b.date)) }));
    e.currentTarget.reset();
  }

  function updateCeiling(value: string) {
    const num = Number(value);
    if (Number.isFinite(num) && num >= 80 && num <= 300) setState((s) => ({ ...s, maintenanceCeiling: num }));
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark">F</div>
        <nav aria-label="Main navigation">
          <a className="nav-link active" href="#dashboard">Dashboard</a>
          <a className="nav-link" href="#week">This week</a>
          <a className="nav-link" href="#progress">Progress</a>
          <a className="nav-link" href="#goals">Goals</a>
        </nav>
        <div className="integration-note"><span className="status-dot" /> Strava-ready data model</div>
      </aside>

      <section className="content" id="dashboard">
        <header className="page-head">
          <div>
            <p className="eyebrow">PERSONAL FITNESS</p>
            <h1>{isCurrentWeek ? "This Week" : "Weekly Plan"}</h1>
            <p className="subtle">{formatRange(viewedWeekStart)}</p>
          </div>
          <button className="primary" onClick={() => { setAddCategory("Run"); setShowAdd(true); }}>+ Add to plan</button>
        </header>

        <div className="week-toolbar" aria-label="Week navigation">
          <div className="week-nav-group">
            <button className="ghost-btn nav-week" onClick={() => shiftWeek(-7)}>← Previous</button>
            {!isCurrentWeek && <button className="ghost-btn nav-week" onClick={() => setViewWeekStartIso(currentWeekStartIso)}>Current week</button>}
            <button className="ghost-btn nav-week" onClick={() => shiftWeek(7)}>Next →</button>
          </div>
          <button className="clone-btn" onClick={cloneToNextWeek} disabled={!thisWeek.length}>Clone this week →</button>
        </div>

        <section className="kpi-grid" aria-label="Weekly metrics">
          <article className="kpi-card"><span className="kpi-label">Plan completion</span><strong>{completed.length} / {plannedCount}</strong><span className="kpi-foot">{completionPct}% complete</span></article>
          <article className="kpi-card"><span className="kpi-label">Running</span><strong>{runningMiles.toFixed(1)} mi</strong><span className="kpi-foot">{plannedRunningMiles ? `${plannedRunningMiles.toFixed(1)} mi planned` : "completed this week"}</span></article>
          <article className="kpi-card"><span className="kpi-label">Strength</span><strong>{strengthCount}</strong><span className="kpi-foot">sessions completed</span></article>
          <article className="kpi-card weight-kpi"><span className="kpi-label">30-day avg weight</span><strong>{weights.current === undefined ? "—" : `${weights.current.toFixed(1)} lb`}</strong><span className="kpi-foot">{belowCeiling === undefined ? `Goal: below ${state.maintenanceCeiling} lb` : belowCeiling >= 0 ? `${belowCeiling.toFixed(1)} lb below ceiling` : `${Math.abs(belowCeiling).toFixed(1)} lb above ceiling`}</span></article>
        </section>

        <section className="panel weekly-panel" id="week">
          <div className="panel-head"><div><p className="eyebrow">WEEKLY PLAN</p><h2>Schedule & actuals</h2></div><div className="completion-ring" style={{ background: `conic-gradient(var(--pink) 0deg ${completionPct * 3.6}deg, var(--soft) ${completionPct * 3.6}deg)` }} aria-label={`${completionPct}% of planned workouts completed`}><span>{completionPct}%</span></div></div>
          <div className="progress-track"><span style={{ width: `${completionPct}%` }} /></div>
          <div className="schedule-list">
            {dayNames.map((day, index) => {
              const date = weekDates[index];
              const items = thisWeek.filter((a) => a.date === date);
              return (
                <div className="day-row" key={date}>
                  <div className="day-label"><span>{day.slice(0, 3)}</span><small>{parseLocalDate(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</small></div>
                  <div className="day-items">
                    {items.length === 0 ? <div className="empty-slot">No activity planned</div> : items.map((a) => (
                      <article className={`activity ${a.status}`} key={a.id}>
                        <div className="activity-main">
                          <div className={`category-dot cat-${a.category.toLowerCase()}`} />
                          <div>
                            <div className="activity-title">{a.title}</div>
                            <div className="activity-meta">
                              {a.category}
                              {a.category === "Run" && a.targetMiles ? ` · ${a.targetMiles.toFixed(1)} mi planned` : ""}
                              {a.target ? ` · ${a.target}` : ""}
                              {a.status === "completed" && (a.actualMiles || a.actualMinutes) ? ` · actual ${a.actualMiles ? `${a.actualMiles.toFixed(1)} mi` : ""}${a.actualMiles && a.actualMinutes ? " · " : ""}${a.actualMinutes ? `${a.actualMinutes} min` : ""}` : ""}
                            </div>
                          </div>
                        </div>
                        <div className="activity-actions">
                          <button className="ghost-btn" onClick={() => openEdit(a)}>Edit</button>
                          {a.status === "planned" && <><button className="small-btn" onClick={() => setLogging(a)}>Log</button><button className="ghost-btn" onClick={() => markSkipped(a.id)}>Skip</button></>}
                          {a.status === "completed" && <><button className="small-btn" onClick={() => setLogging(a)}>Edit log</button><button className="ghost-btn" onClick={() => restore(a.id)}>Undo</button></>}
                          {a.status === "skipped" && <button className="ghost-btn" onClick={() => restore(a.id)}>Undo</button>}
                          <button className="icon-btn" aria-label={`Delete ${a.title}`} onClick={() => remove(a.id)}>×</button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="lower-grid" id="progress">
          <article className="panel trend-panel">
            <div className="panel-head compact"><div><p className="eyebrow">WEIGHT TREND</p><h2>{weights.current === undefined ? "Start your trend" : `${weights.current.toFixed(1)} lb average`}</h2></div><span className={`trend-chip ${weightDelta !== undefined && weightDelta > 0.5 ? "watch" : ""}`}>{weightDelta === undefined ? "30-day rolling average" : `${weightDelta >= 0 ? "+" : ""}${weightDelta.toFixed(1)} vs prior 30d`}</span></div>
            <WeightSparkline measurements={state.measurements} />
            <div className="trend-footer"><span>Maintenance ceiling</span><strong>{state.maintenanceCeiling.toFixed(0)} lb</strong></div>
          </article>

          <article className="panel checkin-panel">
            <div className="panel-head compact"><div><p className="eyebrow">CHECK-IN</p><h2>Weight & waist</h2></div><div className="waist-latest"><small>Latest waist</small><strong>{latestWaist ? `${latestWaist.toFixed(1)} in` : "—"}</strong></div></div>
            <form className="checkin-form" onSubmit={saveMeasurement}>
              <label>Date<input name="measureDate" type="date" defaultValue={localDateISO(new Date())} /></label>
              <label>Weight <span>(lb)</span><input name="weight" type="number" inputMode="decimal" min="80" max="300" step="0.1" placeholder="124.2" /></label>
              <label>Waist <span>(in)</span><input name="waist" type="number" inputMode="decimal" min="20" max="80" step="0.1" placeholder="optional" /></label>
              <button className="primary full" type="submit">Save check-in</button>
            </form>
          </article>
        </section>

        <section className="panel goals-panel" id="goals">
          <div><p className="eyebrow">GOALS</p><h2>Maintenance settings</h2><p className="subtle">Individual weigh-ins can bounce around. The dashboard watches your 30-day average.</p></div>
          <label className="goal-control">30-day average stays below <span className="goal-input-wrap"><input aria-label="Maintenance ceiling" type="number" min="80" max="300" step="0.5" value={state.maintenanceCeiling} onChange={(e) => updateCeiling(e.target.value)} /> lb</span></label>
        </section>

        <footer className="app-footer">Data is stored in this browser for this MVP. Supabase sync and Strava import are the next integration steps.</footer>
      </section>

      {showAdd && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setShowAdd(false); }}>
        <section className="modal" role="dialog" aria-modal="true" aria-labelledby="add-title">
          <div className="modal-head"><div><p className="eyebrow">PLAN</p><h2 id="add-title">Add activity</h2></div><button className="icon-btn" onClick={() => setShowAdd(false)} aria-label="Close">×</button></div>
          <form onSubmit={addPlannedActivity} className="modal-form">
            <label>Date<select name="date" defaultValue={weekDates[0]}>{weekDates.map((date, i) => <option key={date} value={date}>{dayNames[i]} · {parseLocalDate(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</option>)}</select></label>
            <label>Activity<input name="title" required maxLength={60} placeholder="e.g. Hill drills" /></label>
            <label>Type<select name="category" value={addCategory} onChange={(e) => setAddCategory(e.target.value as ActivityCategory)}>{categories.map((c) => <option key={c}>{c}</option>)}</select></label>
            {addCategory === "Run" && <label>Planned distance <span>(miles)</span><input name="targetMiles" type="number" min="0" max="200" step="0.1" inputMode="decimal" placeholder="e.g. 5.0" /></label>}
            <label>Target / notes<input name="target" maxLength={80} placeholder="e.g. Zone 2, easy effort" /></label>
            <button className="primary full" type="submit">Add to this week</button>
          </form>
        </section>
      </div>}

      {editing && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setEditing(null); }}>
        <section className="modal" role="dialog" aria-modal="true" aria-labelledby="edit-title">
          <div className="modal-head"><div><p className="eyebrow">EDIT PLAN</p><h2 id="edit-title">{editTitle || "Untitled activity"}</h2></div><button className="icon-btn" onClick={() => setEditing(null)} aria-label="Close">×</button></div>
          <form key={editing.id} onSubmit={editPlannedActivity} className="modal-form">
            <label>Day<select name="date" defaultValue={editing.date}>{weekDates.map((date, i) => <option key={date} value={date}>{dayNames[i]} · {parseLocalDate(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</option>)}</select></label>
            <label>Activity<input name="title" required maxLength={60} value={editTitle} onChange={(e) => setEditTitle(e.target.value)} /></label>
            <label>Type<select name="category" value={editCategory} onChange={(e) => setEditCategory(e.target.value as ActivityCategory)}>{categories.map((c) => <option key={c}>{c}</option>)}</select></label>
            {editCategory === "Run" && <label>Planned distance <span>(miles)</span><input name="targetMiles" type="number" min="0" max="200" step="0.1" inputMode="decimal" defaultValue={editing.targetMiles ?? ""} placeholder="e.g. 5.0" /></label>}
            <label>Target / notes<input name="target" maxLength={80} defaultValue={editing.target || ""} /></label>
            <button className="primary full" type="submit">Save changes</button>
          </form>
        </section>
      </div>}

      {logging && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setLogging(null); }}>
        <section className="modal" role="dialog" aria-modal="true" aria-labelledby="log-title">
          <div className="modal-head"><div><p className="eyebrow">{logging.status === "completed" ? "EDIT ACTUAL" : "LOG ACTIVITY"}</p><h2 id="log-title">{logging.title}</h2><p className="subtle">{logging.category === "Run" && logging.targetMiles ? `${logging.targetMiles.toFixed(1)} mi planned${logging.target ? ` · ${logging.target}` : ""}` : logging.target || logging.category}</p></div><button className="icon-btn" onClick={() => setLogging(null)} aria-label="Close">×</button></div>
          <form onSubmit={logActivity} className="modal-form">
            {logging.category === "Run" && <label>Actual distance <span>(miles)</span><input name="miles" type="number" min="0" max="200" step="0.1" inputMode="decimal" defaultValue={logging.actualMiles ?? logging.targetMiles ?? ""} /></label>}
            <label>Duration <span>(minutes, optional)</span><input name="minutes" type="number" min="0" max="1000" step="1" inputMode="numeric" defaultValue={logging.actualMinutes ?? ""} /></label>
            <label>Notes<textarea name="notes" rows={3} defaultValue={logging.notes || ""} placeholder="How it felt, weights used, anything worth remembering" /></label>
            <button className="primary full" type="submit">{logging.status === "completed" ? "Save actuals" : "Mark complete"}</button>
          </form>
        </section>
      </div>}
    </main>
  );
}
