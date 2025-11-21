export const COLOR_OPTIONS = [
    { key: "violet", className: "bg-violet-600" },
    { key: "sky", className: "bg-sky-500" },
    { key: "green", className: "bg-emerald-500" },
    { key: "orange", className: "bg-orange-500" },
    { key: "red", className: "bg-rose-500" },
    { key: "slate", className: "bg-slate-500" },
] as const

export const COLOR_HEX_MAP: any = {
    violet: "#7c3aed",
    sky: "#0ea5e9",
    green: "#10b981",
    orange: "#f97316",
    red: "#f43f5e",
    slate: "#475569",
}

export type RoleColor = "violet" | "green" | "sky" | "orange" | "slate" | "red"

export const colorClasses = (color: RoleColor = "slate") => {
    const map = {
        violet: { ring: "ring-violet-200", icon: "text-violet-600", dot: "bg-violet-100", bg: "bg-violet-50" },
        green: { ring: "ring-emerald-200", icon: "text-emerald-600", dot: "bg-emerald-100", bg: "bg-emerald-50" },
        sky: { ring: "ring-sky-200", icon: "text-sky-600", dot: "bg-sky-100", bg: "bg-sky-50" },
        orange: { ring: "ring-orange-200", icon: "text-orange-600", dot: "bg-orange-100", bg: "bg-orange-50" },
        slate: { ring: "ring-slate-200", icon: "text-slate-600", dot: "bg-slate-100", bg: "bg-slate-50" },
        red: { ring: "ring-red-200", icon: "text-red-600", dot: "bg-red-100", bg: "bg-red-50" },
    } as const

    return map[color] || map.slate
}