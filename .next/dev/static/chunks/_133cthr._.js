(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/Dashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/storage.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
const categories = [
    "Run",
    "Strength",
    "Walk",
    "Mobility",
    "Other"
];
function localDateISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}
function parseLocalDate(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
}
function startOfWeek(date = new Date()) {
    const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    copy.setDate(copy.getDate() - copy.getDay());
    return copy;
}
function addDays(date, days) {
    const copy = new Date(date);
    copy.setDate(copy.getDate() + days);
    return copy;
}
function formatRange(start) {
    const end = addDays(start, 6);
    const startMonth = start.toLocaleDateString("en-US", {
        month: "short"
    });
    const endMonth = end.toLocaleDateString("en-US", {
        month: "short"
    });
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
function uid(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function seedActivities(weekStart) {
    const dateFor = (dayIndex)=>localDateISO(addDays(weekStart, dayIndex));
    return [
        {
            id: uid("a"),
            date: dateFor(0),
            title: "Stretch + recovery",
            category: "Mobility",
            target: "10–15 min",
            status: "planned",
            source: "manual"
        },
        {
            id: uid("a"),
            date: dateFor(1),
            title: "Morning walk",
            category: "Walk",
            target: "Easy / fasted if desired",
            status: "planned",
            source: "manual"
        },
        {
            id: uid("a"),
            date: dateFor(2),
            title: "Zone 2 run",
            category: "Run",
            target: "45–60 min",
            targetMiles: 4,
            status: "planned",
            source: "manual"
        },
        {
            id: uid("a"),
            date: dateFor(3),
            title: "Strength",
            category: "Strength",
            target: "15–20 min",
            status: "planned",
            source: "manual"
        },
        {
            id: uid("a"),
            date: dateFor(4),
            title: "Morning walk",
            category: "Walk",
            target: "30+ min",
            status: "planned",
            source: "manual"
        },
        {
            id: uid("a"),
            date: dateFor(5),
            title: "Zone 2 run",
            category: "Run",
            target: "Easy",
            targetMiles: 4,
            status: "planned",
            source: "manual"
        },
        {
            id: uid("a"),
            date: dateFor(6),
            title: "Long run",
            category: "Run",
            target: "Build gradually",
            targetMiles: 7,
            status: "planned",
            source: "manual"
        }
    ];
}
const initialWeekStart = startOfWeek();
const initialState = {
    plannedActivities: seedActivities(initialWeekStart),
    measurements: [],
    maintenanceCeiling: 125
};
function average(values) {
    if (!values.length) return undefined;
    return values.reduce((a, b)=>a + b, 0) / values.length;
}
function daysAgo(iso) {
    const now = new Date();
    const d = parseLocalDate(iso);
    return (new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() - d.getTime()) / 86400000;
}
function weightStats(measurements) {
    const current = measurements.filter((m)=>typeof m.weight === "number" && daysAgo(m.date) >= 0 && daysAgo(m.date) < 30).map((m)=>m.weight);
    const previous = measurements.filter((m)=>typeof m.weight === "number" && daysAgo(m.date) >= 30 && daysAgo(m.date) < 60).map((m)=>m.weight);
    return {
        current: average(current),
        previous: average(previous),
        count: current.length
    };
}
function WeightSparkline({ measurements }) {
    const points = measurements.filter((m)=>typeof m.weight === "number").slice().sort((a, b)=>a.date.localeCompare(b.date)).slice(-30);
    if (points.length < 2) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "spark-empty",
        children: "Add a few weigh-ins and your 30-day trend will appear here."
    }, void 0, false, {
        fileName: "[project]/components/Dashboard.tsx",
        lineNumber: 95,
        columnNumber: 33
    }, this);
    const values = points.map((p)=>p.weight);
    const min = Math.min(...values) - 0.5;
    const max = Math.max(...values) + 0.5;
    const coords = points.map((p, i)=>{
        const x = i / Math.max(1, points.length - 1) * 100;
        const y = 92 - (p.weight - min) / Math.max(0.1, max - min) * 76;
        return `${x},${y}`;
    }).join(" ");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "spark",
        viewBox: "0 0 100 100",
        role: "img",
        "aria-label": "Recent weight trend",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "0",
                x2: "100",
                y1: "92",
                y2: "92",
                className: "spark-grid"
            }, void 0, false, {
                fileName: "[project]/components/Dashboard.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                points: coords,
                fill: "none",
                className: "spark-line",
                vectorEffect: "non-scaling-stroke"
            }, void 0, false, {
                fileName: "[project]/components/Dashboard.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            points.map((p, i)=>{
                const [x, y] = coords.split(" ")[i].split(",");
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: x,
                    cy: y,
                    r: "1.8",
                    className: "spark-dot",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        children: `${p.date}: ${p.weight.toFixed(1)} lb`
                    }, void 0, false, {
                        fileName: "[project]/components/Dashboard.tsx",
                        lineNumber: 112,
                        columnNumber: 79
                    }, this)
                }, p.id, false, {
                    fileName: "[project]/components/Dashboard.tsx",
                    lineNumber: 112,
                    columnNumber: 16
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/components/Dashboard.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_c = WeightSparkline;
function Dashboard() {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialState);
    const [hydrated, setHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showAdd, setShowAdd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [addCategory, setAddCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Run");
    const [logging, setLogging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editCategory, setEditCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Run");
    const [editTitle, setEditTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [viewWeekStartIso, setViewWeekStartIso] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(localDateISO(initialWeekStart));
    const viewedWeekStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Dashboard.useMemo[viewedWeekStart]": ()=>parseLocalDate(viewWeekStartIso)
    }["Dashboard.useMemo[viewedWeekStart]"], [
        viewWeekStartIso
    ]);
    const currentWeekStartIso = localDateISO(startOfWeek());
    const weekDates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Dashboard.useMemo[weekDates]": ()=>dayNames.map({
                "Dashboard.useMemo[weekDates]": (_, i)=>localDateISO(addDays(viewedWeekStart, i))
            }["Dashboard.useMemo[weekDates]"])
    }["Dashboard.useMemo[weekDates]"], [
        viewedWeekStart
    ]);
    const isCurrentWeek = viewWeekStartIso === currentWeekStartIso;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            setState((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadState"])(initialState));
            setHydrated(true);
        }
    }["Dashboard.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            if (hydrated) (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveState"])(state);
        }
    }["Dashboard.useEffect"], [
        state,
        hydrated
    ]);
    const thisWeek = state.plannedActivities.filter((a)=>weekDates.includes(a.date)).sort((a, b)=>a.date.localeCompare(b.date));
    const completed = thisWeek.filter((a)=>a.status === "completed");
    const plannedCount = thisWeek.filter((a)=>a.status !== "skipped").length;
    const completionPct = plannedCount ? Math.round(completed.length / plannedCount * 100) : 0;
    const runningMiles = completed.reduce((sum, a)=>sum + (a.category === "Run" ? a.actualMiles || 0 : 0), 0);
    const plannedRunningMiles = thisWeek.reduce((sum, a)=>sum + (a.category === "Run" && a.status !== "skipped" ? a.targetMiles || 0 : 0), 0);
    const strengthCount = completed.filter((a)=>a.category === "Strength").length;
    const weights = weightStats(state.measurements);
    const latestWaist = state.measurements.filter((m)=>typeof m.waist === "number").sort((a, b)=>b.date.localeCompare(a.date))[0]?.waist;
    const weightDelta = weights.current !== undefined && weights.previous !== undefined ? weights.current - weights.previous : undefined;
    const belowCeiling = weights.current !== undefined ? state.maintenanceCeiling - weights.current : undefined;
    function shiftWeek(days) {
        setViewWeekStartIso(localDateISO(addDays(viewedWeekStart, days)));
    }
    function openEdit(activity) {
        setEditing(activity);
        setEditCategory(activity.category);
        setEditTitle(activity.title);
    }
    function addPlannedActivity(e) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const date = String(form.get("date") || "");
        const title = String(form.get("title") || "").trim();
        const category = String(form.get("category") || "Other");
        const target = String(form.get("target") || "").trim();
        const targetMilesRaw = String(form.get("targetMiles") || "").trim();
        const targetMiles = category === "Run" && targetMilesRaw ? Number(targetMilesRaw) : undefined;
        if (!date || !title) return;
        setState((s)=>({
                ...s,
                plannedActivities: [
                    ...s.plannedActivities,
                    {
                        id: uid("a"),
                        date,
                        title,
                        category,
                        target,
                        targetMiles: Number.isFinite(targetMiles) ? targetMiles : undefined,
                        status: "planned",
                        source: "manual"
                    }
                ]
            }));
        e.currentTarget.reset();
        setAddCategory("Run");
        setShowAdd(false);
    }
    function editPlannedActivity(e) {
        e.preventDefault();
        if (!editing) return;
        const form = new FormData(e.currentTarget);
        const date = String(form.get("date") || editing.date);
        const title = editTitle.trim();
        const category = String(form.get("category") || editing.category);
        const target = String(form.get("target") || "").trim();
        const targetMilesRaw = String(form.get("targetMiles") || "").trim();
        const targetMiles = category === "Run" && targetMilesRaw ? Number(targetMilesRaw) : undefined;
        if (!title) return;
        setState((s)=>({
                ...s,
                plannedActivities: s.plannedActivities.map((a)=>a.id === editing.id ? {
                        ...a,
                        date,
                        title,
                        category,
                        target,
                        targetMiles: Number.isFinite(targetMiles) ? targetMiles : undefined
                    } : a)
            }));
        setEditing(null);
    }
    function logActivity(e) {
        e.preventDefault();
        if (!logging) return;
        const form = new FormData(e.currentTarget);
        const milesRaw = String(form.get("miles") || "").trim();
        const minutesRaw = String(form.get("minutes") || "").trim();
        const notes = String(form.get("notes") || "").trim();
        const miles = milesRaw ? Math.max(0, Math.min(200, Number(milesRaw))) : undefined;
        const minutes = minutesRaw ? Math.max(0, Math.min(1000, Number(minutesRaw))) : undefined;
        setState((s)=>({
                ...s,
                plannedActivities: s.plannedActivities.map((a)=>a.id === logging.id ? {
                        ...a,
                        status: "completed",
                        actualMiles: Number.isFinite(miles) ? miles : undefined,
                        actualMinutes: Number.isFinite(minutes) ? minutes : undefined,
                        notes
                    } : a)
            }));
        setLogging(null);
    }
    function cloneToNextWeek() {
        if (!thisWeek.length) return;
        const nextStart = addDays(viewedWeekStart, 7);
        const nextDates = dayNames.map((_, i)=>localDateISO(addDays(nextStart, i)));
        const existing = state.plannedActivities.some((a)=>nextDates.includes(a.date));
        if (existing && !window.confirm("The next week already has activities. Add another copy of this week's plan anyway?")) return;
        const cloned = thisWeek.map((a)=>{
            const offset = weekDates.indexOf(a.date);
            return {
                id: uid("a"),
                date: localDateISO(addDays(nextStart, Math.max(0, offset))),
                title: a.title,
                category: a.category,
                target: a.target,
                targetMiles: a.targetMiles,
                status: "planned",
                source: "manual"
            };
        });
        setState((s)=>({
                ...s,
                plannedActivities: [
                    ...s.plannedActivities,
                    ...cloned
                ]
            }));
        setViewWeekStartIso(localDateISO(nextStart));
    }
    function markSkipped(id) {
        setState((s)=>({
                ...s,
                plannedActivities: s.plannedActivities.map((a)=>a.id === id ? {
                        ...a,
                        status: "skipped"
                    } : a)
            }));
    }
    function restore(id) {
        setState((s)=>({
                ...s,
                plannedActivities: s.plannedActivities.map((a)=>a.id === id ? {
                        ...a,
                        status: "planned",
                        actualMiles: undefined,
                        actualMinutes: undefined,
                        notes: undefined
                    } : a)
            }));
    }
    function remove(id) {
        setState((s)=>({
                ...s,
                plannedActivities: s.plannedActivities.filter((a)=>a.id !== id)
            }));
    }
    function saveMeasurement(e) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const date = String(form.get("measureDate") || localDateISO(new Date()));
        const weightRaw = String(form.get("weight") || "").trim();
        const waistRaw = String(form.get("waist") || "").trim();
        const weight = weightRaw ? Number(weightRaw) : undefined;
        const waist = waistRaw ? Number(waistRaw) : undefined;
        if ((weight === undefined || !Number.isFinite(weight)) && (waist === undefined || !Number.isFinite(waist))) return;
        const entry = {
            id: uid("m"),
            date,
            weight: weight && weight > 0 ? weight : undefined,
            waist: waist && waist > 0 ? waist : undefined
        };
        setState((s)=>({
                ...s,
                measurements: [
                    ...s.measurements.filter((m)=>m.date !== date),
                    entry
                ].sort((a, b)=>a.date.localeCompare(b.date))
            }));
        e.currentTarget.reset();
    }
    function updateCeiling(value) {
        const num = Number(value);
        if (Number.isFinite(num) && num >= 80 && num <= 300) setState((s)=>({
                ...s,
                maintenanceCeiling: num
            }));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "app-shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "sidebar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-mark",
                        children: "F"
                    }, void 0, false, {
                        fileName: "[project]/components/Dashboard.tsx",
                        lineNumber: 289,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        "aria-label": "Main navigation",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                className: "nav-link active",
                                href: "#dashboard",
                                children: "Dashboard"
                            }, void 0, false, {
                                fileName: "[project]/components/Dashboard.tsx",
                                lineNumber: 291,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                className: "nav-link",
                                href: "#week",
                                children: "This week"
                            }, void 0, false, {
                                fileName: "[project]/components/Dashboard.tsx",
                                lineNumber: 292,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                className: "nav-link",
                                href: "#progress",
                                children: "Progress"
                            }, void 0, false, {
                                fileName: "[project]/components/Dashboard.tsx",
                                lineNumber: 293,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                className: "nav-link",
                                href: "#goals",
                                children: "Goals"
                            }, void 0, false, {
                                fileName: "[project]/components/Dashboard.tsx",
                                lineNumber: 294,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Dashboard.tsx",
                        lineNumber: 290,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "integration-note",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "status-dot"
                            }, void 0, false, {
                                fileName: "[project]/components/Dashboard.tsx",
                                lineNumber: 296,
                                columnNumber: 43
                            }, this),
                            " Strava-ready data model"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Dashboard.tsx",
                        lineNumber: 296,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Dashboard.tsx",
                lineNumber: 288,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "content",
                id: "dashboard",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "page-head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "eyebrow",
                                        children: "PERSONAL FITNESS"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 302,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        children: isCurrentWeek ? "This Week" : "Weekly Plan"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 303,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "subtle",
                                        children: formatRange(viewedWeekStart)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 304,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Dashboard.tsx",
                                lineNumber: 301,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "primary",
                                onClick: ()=>{
                                    setAddCategory("Run");
                                    setShowAdd(true);
                                },
                                children: "+ Add to plan"
                            }, void 0, false, {
                                fileName: "[project]/components/Dashboard.tsx",
                                lineNumber: 306,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Dashboard.tsx",
                        lineNumber: 300,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "week-toolbar",
                        "aria-label": "Week navigation",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "week-nav-group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "ghost-btn nav-week",
                                        onClick: ()=>shiftWeek(-7),
                                        children: "← Previous"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 311,
                                        columnNumber: 13
                                    }, this),
                                    !isCurrentWeek && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "ghost-btn nav-week",
                                        onClick: ()=>setViewWeekStartIso(currentWeekStartIso),
                                        children: "Current week"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 312,
                                        columnNumber: 32
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "ghost-btn nav-week",
                                        onClick: ()=>shiftWeek(7),
                                        children: "Next →"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 313,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Dashboard.tsx",
                                lineNumber: 310,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "clone-btn",
                                onClick: cloneToNextWeek,
                                disabled: !thisWeek.length,
                                children: "Clone this week →"
                            }, void 0, false, {
                                fileName: "[project]/components/Dashboard.tsx",
                                lineNumber: 315,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Dashboard.tsx",
                        lineNumber: 309,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "kpi-grid",
                        "aria-label": "Weekly metrics",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: "kpi-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "kpi-label",
                                        children: "Plan completion"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 319,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: [
                                            completed.length,
                                            " / ",
                                            plannedCount
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 319,
                                        columnNumber: 91
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "kpi-foot",
                                        children: [
                                            completionPct,
                                            "% complete"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 319,
                                        columnNumber: 143
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Dashboard.tsx",
                                lineNumber: 319,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: "kpi-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "kpi-label",
                                        children: "Running"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 320,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: [
                                            runningMiles.toFixed(1),
                                            " mi"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 320,
                                        columnNumber: 83
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "kpi-foot",
                                        children: plannedRunningMiles ? `${plannedRunningMiles.toFixed(1)} mi planned` : "completed this week"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 320,
                                        columnNumber: 128
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Dashboard.tsx",
                                lineNumber: 320,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: "kpi-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "kpi-label",
                                        children: "Strength"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 321,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: strengthCount
                                    }, void 0, false, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 321,
                                        columnNumber: 84
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "kpi-foot",
                                        children: "sessions completed"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 321,
                                        columnNumber: 116
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Dashboard.tsx",
                                lineNumber: 321,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: "kpi-card weight-kpi",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "kpi-label",
                                        children: "30-day avg weight"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 322,
                                        columnNumber: 52
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: weights.current === undefined ? "—" : `${weights.current.toFixed(1)} lb`
                                    }, void 0, false, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 322,
                                        columnNumber: 104
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "kpi-foot",
                                        children: belowCeiling === undefined ? `Goal: below ${state.maintenanceCeiling} lb` : belowCeiling >= 0 ? `${belowCeiling.toFixed(1)} lb below ceiling` : `${Math.abs(belowCeiling).toFixed(1)} lb above ceiling`
                                    }, void 0, false, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 322,
                                        columnNumber: 195
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Dashboard.tsx",
                                lineNumber: 322,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Dashboard.tsx",
                        lineNumber: 318,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "panel weekly-panel",
                        id: "week",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "panel-head",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "eyebrow",
                                                children: "WEEKLY PLAN"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Dashboard.tsx",
                                                lineNumber: 326,
                                                columnNumber: 44
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "Schedule & actuals"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Dashboard.tsx",
                                                lineNumber: 326,
                                                columnNumber: 82
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 326,
                                        columnNumber: 39
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "completion-ring",
                                        style: {
                                            background: `conic-gradient(var(--pink) 0deg ${completionPct * 3.6}deg, var(--soft) ${completionPct * 3.6}deg)`
                                        },
                                        "aria-label": `${completionPct}% of planned workouts completed`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                completionPct,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 326,
                                            columnNumber: 335
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 326,
                                        columnNumber: 115
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Dashboard.tsx",
                                lineNumber: 326,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "progress-track",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        width: `${completionPct}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/Dashboard.tsx",
                                    lineNumber: 327,
                                    columnNumber: 43
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Dashboard.tsx",
                                lineNumber: 327,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "schedule-list",
                                children: dayNames.map((day, index)=>{
                                    const date = weekDates[index];
                                    const items = thisWeek.filter((a)=>a.date === date);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "day-row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "day-label",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: day.slice(0, 3)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Dashboard.tsx",
                                                        lineNumber: 334,
                                                        columnNumber: 46
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                        children: parseLocalDate(date).toLocaleDateString("en-US", {
                                                            month: "short",
                                                            day: "numeric"
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Dashboard.tsx",
                                                        lineNumber: 334,
                                                        columnNumber: 76
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Dashboard.tsx",
                                                lineNumber: 334,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "day-items",
                                                children: items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "empty-slot",
                                                    children: "No activity planned"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Dashboard.tsx",
                                                    lineNumber: 336,
                                                    columnNumber: 43
                                                }, this) : items.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                        className: `activity ${a.status}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "activity-main",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: `category-dot cat-${a.category.toLowerCase()}`
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Dashboard.tsx",
                                                                        lineNumber: 339,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "activity-title",
                                                                                children: a.title
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/Dashboard.tsx",
                                                                                lineNumber: 341,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "activity-meta",
                                                                                children: [
                                                                                    a.category,
                                                                                    a.category === "Run" && a.targetMiles ? ` · ${a.targetMiles.toFixed(1)} mi planned` : "",
                                                                                    a.target ? ` · ${a.target}` : "",
                                                                                    a.status === "completed" && (a.actualMiles || a.actualMinutes) ? ` · actual ${a.actualMiles ? `${a.actualMiles.toFixed(1)} mi` : ""}${a.actualMiles && a.actualMinutes ? " · " : ""}${a.actualMinutes ? `${a.actualMinutes} min` : ""}` : ""
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/Dashboard.tsx",
                                                                                lineNumber: 342,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/Dashboard.tsx",
                                                                        lineNumber: 340,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/Dashboard.tsx",
                                                                lineNumber: 338,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "activity-actions",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        className: "ghost-btn",
                                                                        onClick: ()=>openEdit(a),
                                                                        children: "Edit"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Dashboard.tsx",
                                                                        lineNumber: 351,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    a.status === "planned" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                className: "small-btn",
                                                                                onClick: ()=>setLogging(a),
                                                                                children: "Log"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/Dashboard.tsx",
                                                                                lineNumber: 352,
                                                                                columnNumber: 56
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                className: "ghost-btn",
                                                                                onClick: ()=>markSkipped(a.id),
                                                                                children: "Skip"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/Dashboard.tsx",
                                                                                lineNumber: 352,
                                                                                columnNumber: 128
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/Dashboard.tsx",
                                                                        lineNumber: 352,
                                                                        columnNumber: 54
                                                                    }, this),
                                                                    a.status === "completed" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                className: "small-btn",
                                                                                onClick: ()=>setLogging(a),
                                                                                children: "Edit log"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/Dashboard.tsx",
                                                                                lineNumber: 353,
                                                                                columnNumber: 58
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                className: "ghost-btn",
                                                                                onClick: ()=>restore(a.id),
                                                                                children: "Undo"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/Dashboard.tsx",
                                                                                lineNumber: 353,
                                                                                columnNumber: 135
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/Dashboard.tsx",
                                                                        lineNumber: 353,
                                                                        columnNumber: 56
                                                                    }, this),
                                                                    a.status === "skipped" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        className: "ghost-btn",
                                                                        onClick: ()=>restore(a.id),
                                                                        children: "Undo"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Dashboard.tsx",
                                                                        lineNumber: 354,
                                                                        columnNumber: 54
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        className: "icon-btn",
                                                                        "aria-label": `Delete ${a.title}`,
                                                                        onClick: ()=>remove(a.id),
                                                                        children: "×"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Dashboard.tsx",
                                                                        lineNumber: 355,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/Dashboard.tsx",
                                                                lineNumber: 350,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, a.id, true, {
                                                        fileName: "[project]/components/Dashboard.tsx",
                                                        lineNumber: 337,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/Dashboard.tsx",
                                                lineNumber: 335,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, date, true, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 333,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/Dashboard.tsx",
                                lineNumber: 328,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Dashboard.tsx",
                        lineNumber: 325,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "lower-grid",
                        id: "progress",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: "panel trend-panel",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "panel-head compact",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "eyebrow",
                                                        children: "WEIGHT TREND"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Dashboard.tsx",
                                                        lineNumber: 368,
                                                        columnNumber: 54
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        children: weights.current === undefined ? "Start your trend" : `${weights.current.toFixed(1)} lb average`
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Dashboard.tsx",
                                                        lineNumber: 368,
                                                        columnNumber: 93
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Dashboard.tsx",
                                                lineNumber: 368,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `trend-chip ${weightDelta !== undefined && weightDelta > 0.5 ? "watch" : ""}`,
                                                children: weightDelta === undefined ? "30-day rolling average" : `${weightDelta >= 0 ? "+" : ""}${weightDelta.toFixed(1)} vs prior 30d`
                                            }, void 0, false, {
                                                fileName: "[project]/components/Dashboard.tsx",
                                                lineNumber: 368,
                                                columnNumber: 205
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 368,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WeightSparkline, {
                                        measurements: state.measurements
                                    }, void 0, false, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 369,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "trend-footer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Maintenance ceiling"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Dashboard.tsx",
                                                lineNumber: 370,
                                                columnNumber: 43
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: [
                                                    state.maintenanceCeiling.toFixed(0),
                                                    " lb"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Dashboard.tsx",
                                                lineNumber: 370,
                                                columnNumber: 75
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 370,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Dashboard.tsx",
                                lineNumber: 367,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: "panel checkin-panel",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "panel-head compact",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "eyebrow",
                                                        children: "CHECK-IN"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Dashboard.tsx",
                                                        lineNumber: 374,
                                                        columnNumber: 54
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        children: "Weight & waist"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Dashboard.tsx",
                                                        lineNumber: 374,
                                                        columnNumber: 89
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Dashboard.tsx",
                                                lineNumber: 374,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "waist-latest",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                        children: "Latest waist"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Dashboard.tsx",
                                                        lineNumber: 374,
                                                        columnNumber: 148
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: latestWaist ? `${latestWaist.toFixed(1)} in` : "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Dashboard.tsx",
                                                        lineNumber: 374,
                                                        columnNumber: 175
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Dashboard.tsx",
                                                lineNumber: 374,
                                                columnNumber: 118
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 374,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        className: "checkin-form",
                                        onSubmit: saveMeasurement,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                children: [
                                                    "Date",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        name: "measureDate",
                                                        type: "date",
                                                        defaultValue: localDateISO(new Date())
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Dashboard.tsx",
                                                        lineNumber: 376,
                                                        columnNumber: 26
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Dashboard.tsx",
                                                lineNumber: 376,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                children: [
                                                    "Weight ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "(lb)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Dashboard.tsx",
                                                        lineNumber: 377,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        name: "weight",
                                                        type: "number",
                                                        inputMode: "decimal",
                                                        min: "80",
                                                        max: "300",
                                                        step: "0.1",
                                                        placeholder: "124.2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Dashboard.tsx",
                                                        lineNumber: 377,
                                                        columnNumber: 46
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Dashboard.tsx",
                                                lineNumber: 377,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                children: [
                                                    "Waist ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "(in)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Dashboard.tsx",
                                                        lineNumber: 378,
                                                        columnNumber: 28
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        name: "waist",
                                                        type: "number",
                                                        inputMode: "decimal",
                                                        min: "20",
                                                        max: "80",
                                                        step: "0.1",
                                                        placeholder: "optional"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Dashboard.tsx",
                                                        lineNumber: 378,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Dashboard.tsx",
                                                lineNumber: 378,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "primary full",
                                                type: "submit",
                                                children: "Save check-in"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Dashboard.tsx",
                                                lineNumber: 379,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 375,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Dashboard.tsx",
                                lineNumber: 373,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Dashboard.tsx",
                        lineNumber: 366,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "panel goals-panel",
                        id: "goals",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "eyebrow",
                                        children: "GOALS"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 385,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Maintenance settings"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 385,
                                        columnNumber: 48
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "subtle",
                                        children: "Individual weigh-ins can bounce around. The dashboard watches your 30-day average."
                                    }, void 0, false, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 385,
                                        columnNumber: 77
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Dashboard.tsx",
                                lineNumber: 385,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "goal-control",
                                children: [
                                    "30-day average stays below ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "goal-input-wrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                "aria-label": "Maintenance ceiling",
                                                type: "number",
                                                min: "80",
                                                max: "300",
                                                step: "0.5",
                                                value: state.maintenanceCeiling,
                                                onChange: (e)=>updateCeiling(e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Dashboard.tsx",
                                                lineNumber: 386,
                                                columnNumber: 104
                                            }, this),
                                            " lb"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Dashboard.tsx",
                                        lineNumber: 386,
                                        columnNumber: 70
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Dashboard.tsx",
                                lineNumber: 386,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Dashboard.tsx",
                        lineNumber: 384,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "app-footer",
                        children: "Data is stored in this browser for this MVP. Supabase sync and Strava import are the next integration steps."
                    }, void 0, false, {
                        fileName: "[project]/components/Dashboard.tsx",
                        lineNumber: 389,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Dashboard.tsx",
                lineNumber: 299,
                columnNumber: 7
            }, this),
            showAdd && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-backdrop",
                role: "presentation",
                onMouseDown: (e)=>{
                    if (e.target === e.currentTarget) setShowAdd(false);
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "modal",
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-labelledby": "add-title",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "modal-head",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "eyebrow",
                                            children: "PLAN"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 394,
                                            columnNumber: 44
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            id: "add-title",
                                            children: "Add activity"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 394,
                                            columnNumber: 75
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Dashboard.tsx",
                                    lineNumber: 394,
                                    columnNumber: 39
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "icon-btn",
                                    onClick: ()=>setShowAdd(false),
                                    "aria-label": "Close",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/components/Dashboard.tsx",
                                    lineNumber: 394,
                                    columnNumber: 117
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Dashboard.tsx",
                            lineNumber: 394,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: addPlannedActivity,
                            className: "modal-form",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        "Date",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            name: "date",
                                            defaultValue: weekDates[0],
                                            children: weekDates.map((date, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: date,
                                                    children: [
                                                        dayNames[i],
                                                        " · ",
                                                        parseLocalDate(date).toLocaleDateString("en-US", {
                                                            month: "short",
                                                            day: "numeric"
                                                        })
                                                    ]
                                                }, date, true, {
                                                    fileName: "[project]/components/Dashboard.tsx",
                                                    lineNumber: 396,
                                                    columnNumber: 100
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 396,
                                            columnNumber: 24
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Dashboard.tsx",
                                    lineNumber: 396,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        "Activity",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "title",
                                            required: true,
                                            maxLength: 60,
                                            placeholder: "e.g. Hill drills"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 397,
                                            columnNumber: 28
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Dashboard.tsx",
                                    lineNumber: 397,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        "Type",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            name: "category",
                                            value: addCategory,
                                            onChange: (e)=>setAddCategory(e.target.value),
                                            children: categories.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    children: c
                                                }, c, false, {
                                                    fileName: "[project]/components/Dashboard.tsx",
                                                    lineNumber: 398,
                                                    columnNumber: 160
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 398,
                                            columnNumber: 24
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Dashboard.tsx",
                                    lineNumber: 398,
                                    columnNumber: 13
                                }, this),
                                addCategory === "Run" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        "Planned distance ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "(miles)"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 399,
                                            columnNumber: 63
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "targetMiles",
                                            type: "number",
                                            min: "0",
                                            max: "200",
                                            step: "0.1",
                                            inputMode: "decimal",
                                            placeholder: "e.g. 5.0"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 399,
                                            columnNumber: 83
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Dashboard.tsx",
                                    lineNumber: 399,
                                    columnNumber: 39
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        "Target / notes",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "target",
                                            maxLength: 80,
                                            placeholder: "e.g. Zone 2, easy effort"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 400,
                                            columnNumber: 34
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Dashboard.tsx",
                                    lineNumber: 400,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "primary full",
                                    type: "submit",
                                    children: "Add to this week"
                                }, void 0, false, {
                                    fileName: "[project]/components/Dashboard.tsx",
                                    lineNumber: 401,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Dashboard.tsx",
                            lineNumber: 395,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Dashboard.tsx",
                    lineNumber: 393,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Dashboard.tsx",
                lineNumber: 392,
                columnNumber: 19
            }, this),
            editing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-backdrop",
                role: "presentation",
                onMouseDown: (e)=>{
                    if (e.target === e.currentTarget) setEditing(null);
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "modal",
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-labelledby": "edit-title",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "modal-head",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "eyebrow",
                                            children: "EDIT PLAN"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 408,
                                            columnNumber: 44
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            id: "edit-title",
                                            children: editTitle || "Untitled activity"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 408,
                                            columnNumber: 80
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Dashboard.tsx",
                                    lineNumber: 408,
                                    columnNumber: 39
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "icon-btn",
                                    onClick: ()=>setEditing(null),
                                    "aria-label": "Close",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/components/Dashboard.tsx",
                                    lineNumber: 408,
                                    columnNumber: 145
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Dashboard.tsx",
                            lineNumber: 408,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: editPlannedActivity,
                            className: "modal-form",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        "Day",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            name: "date",
                                            defaultValue: editing.date,
                                            children: weekDates.map((date, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: date,
                                                    children: [
                                                        dayNames[i],
                                                        " · ",
                                                        parseLocalDate(date).toLocaleDateString("en-US", {
                                                            month: "short",
                                                            day: "numeric"
                                                        })
                                                    ]
                                                }, date, true, {
                                                    fileName: "[project]/components/Dashboard.tsx",
                                                    lineNumber: 410,
                                                    columnNumber: 99
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 410,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Dashboard.tsx",
                                    lineNumber: 410,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        "Activity",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "title",
                                            required: true,
                                            maxLength: 60,
                                            value: editTitle,
                                            onChange: (e)=>setEditTitle(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 411,
                                            columnNumber: 28
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Dashboard.tsx",
                                    lineNumber: 411,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        "Type",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            name: "category",
                                            value: editCategory,
                                            onChange: (e)=>setEditCategory(e.target.value),
                                            children: categories.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    children: c
                                                }, c, false, {
                                                    fileName: "[project]/components/Dashboard.tsx",
                                                    lineNumber: 412,
                                                    columnNumber: 162
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 412,
                                            columnNumber: 24
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Dashboard.tsx",
                                    lineNumber: 412,
                                    columnNumber: 13
                                }, this),
                                editCategory === "Run" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        "Planned distance ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "(miles)"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 413,
                                            columnNumber: 64
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "targetMiles",
                                            type: "number",
                                            min: "0",
                                            max: "200",
                                            step: "0.1",
                                            inputMode: "decimal",
                                            defaultValue: editing.targetMiles ?? "",
                                            placeholder: "e.g. 5.0"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 413,
                                            columnNumber: 84
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Dashboard.tsx",
                                    lineNumber: 413,
                                    columnNumber: 40
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        "Target / notes",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "target",
                                            maxLength: 80,
                                            defaultValue: editing.target || ""
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 414,
                                            columnNumber: 34
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Dashboard.tsx",
                                    lineNumber: 414,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "primary full",
                                    type: "submit",
                                    children: "Save changes"
                                }, void 0, false, {
                                    fileName: "[project]/components/Dashboard.tsx",
                                    lineNumber: 415,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, editing.id, true, {
                            fileName: "[project]/components/Dashboard.tsx",
                            lineNumber: 409,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Dashboard.tsx",
                    lineNumber: 407,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Dashboard.tsx",
                lineNumber: 406,
                columnNumber: 19
            }, this),
            logging && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-backdrop",
                role: "presentation",
                onMouseDown: (e)=>{
                    if (e.target === e.currentTarget) setLogging(null);
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "modal",
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-labelledby": "log-title",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "modal-head",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "eyebrow",
                                            children: logging.status === "completed" ? "EDIT ACTUAL" : "LOG ACTIVITY"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 422,
                                            columnNumber: 44
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            id: "log-title",
                                            children: logging.title
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 422,
                                            columnNumber: 136
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "subtle",
                                            children: logging.category === "Run" && logging.targetMiles ? `${logging.targetMiles.toFixed(1)} mi planned${logging.target ? ` · ${logging.target}` : ""}` : logging.target || logging.category
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 422,
                                            columnNumber: 175
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Dashboard.tsx",
                                    lineNumber: 422,
                                    columnNumber: 39
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "icon-btn",
                                    onClick: ()=>setLogging(null),
                                    "aria-label": "Close",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/components/Dashboard.tsx",
                                    lineNumber: 422,
                                    columnNumber: 391
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Dashboard.tsx",
                            lineNumber: 422,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: logActivity,
                            className: "modal-form",
                            children: [
                                logging.category === "Run" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        "Actual distance ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "(miles)"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 424,
                                            columnNumber: 67
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "miles",
                                            type: "number",
                                            min: "0",
                                            max: "200",
                                            step: "0.1",
                                            inputMode: "decimal",
                                            defaultValue: logging.actualMiles ?? logging.targetMiles ?? ""
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 424,
                                            columnNumber: 87
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Dashboard.tsx",
                                    lineNumber: 424,
                                    columnNumber: 44
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        "Duration ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "(minutes, optional)"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 425,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "minutes",
                                            type: "number",
                                            min: "0",
                                            max: "1000",
                                            step: "1",
                                            inputMode: "numeric",
                                            defaultValue: logging.actualMinutes ?? ""
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 425,
                                            columnNumber: 61
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Dashboard.tsx",
                                    lineNumber: 425,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        "Notes",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            name: "notes",
                                            rows: 3,
                                            defaultValue: logging.notes || "",
                                            placeholder: "How it felt, weights used, anything worth remembering"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.tsx",
                                            lineNumber: 426,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Dashboard.tsx",
                                    lineNumber: 426,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "primary full",
                                    type: "submit",
                                    children: logging.status === "completed" ? "Save actuals" : "Mark complete"
                                }, void 0, false, {
                                    fileName: "[project]/components/Dashboard.tsx",
                                    lineNumber: 427,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Dashboard.tsx",
                            lineNumber: 423,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Dashboard.tsx",
                    lineNumber: 421,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Dashboard.tsx",
                lineNumber: 420,
                columnNumber: 19
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Dashboard.tsx",
        lineNumber: 287,
        columnNumber: 5
    }, this);
}
_s(Dashboard, "aIL3YWcf8eXEUxdDLo/TVnbMLLU=");
_c1 = Dashboard;
var _c, _c1;
__turbopack_context__.k.register(_c, "WeightSparkline");
__turbopack_context__.k.register(_c1, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/storage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadState",
    ()=>loadState,
    "saveState",
    ()=>saveState
]);
const KEY = "fitness-dashboard-v4";
const PREVIOUS_KEY = "fitness-dashboard-v3";
const OLDER_KEY = "fitness-dashboard-v2";
const LEGACY_KEY = "fitness-dashboard-v1";
function safeParse(raw) {
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch  {
        return null;
    }
}
function normalize(state, fallback) {
    return {
        plannedActivities: Array.isArray(state.plannedActivities) ? state.plannedActivities : fallback.plannedActivities,
        measurements: Array.isArray(state.measurements) ? state.measurements : fallback.measurements,
        maintenanceCeiling: Number.isFinite(state.maintenanceCeiling) ? state.maintenanceCeiling : fallback.maintenanceCeiling
    };
}
function loadState(fallback) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
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
            maintenanceCeiling: Number.isFinite(legacy.maintenanceCeiling) ? legacy.maintenanceCeiling : fallback.maintenanceCeiling
        };
    }
    return fallback;
}
function saveState(state) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.localStorage.setItem(KEY, JSON.stringify(state));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_133cthr._.js.map