import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "arrow-right"
  | "braces"
  | "check"
  | "chevron-down"
  | "code"
  | "copy"
  | "download"
  | "external"
  | "file"
  | "github"
  | "keyboard"
  | "menu"
  | "moon"
  | "plus"
  | "search"
  | "shield"
  | "spark"
  | "sun"
  | "x"
  | "lock"
  | "key"
  | "hash"
  | "regex"
  | "clock"
  | "diff"
  | "list"
  | "link"
  | "refresh"
  | "trash"
  | "eye"
  | "sliders"
  | "shield-check"
  | "type"
  | "percent"
  | "calculator"
  | "palette"
  | "globe"
  | "tag"
  | "file-text";

const paths: Record<IconName, ReactNode> = {
  "arrow-right": <path d="M5 12h14m-6-6 6 6-6 6" />,
  braces: <path d="M8.5 4H7a3 3 0 0 0-3 3v2.5a2.5 2.5 0 0 1-2 2.45 2.5 2.5 0 0 1 2 2.45V17a3 3 0 0 0 3 3h1.5m7-16H17a3 3 0 0 1 3 3v2.5a2.5 2.5 0 0 0 2 2.45 2.5 2.5 0 0 0-2 2.45V17a3 3 0 0 1-3 3h-1.5" />,
  check: <path d="m5 12 4.2 4.2L19 6.5" />,
  "chevron-down": <path d="m7 10 5 5 5-5" />,
  code: <path d="m9 18-6-6 6-6m6 0 6 6-6 6" />,
  copy: <><rect x="8" y="8" width="11" height="11" rx="1.5" /><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8" /></>,
  download: <><path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M5 20h14" /></>,
  external: <><path d="M14 4h6v6m0-6-9 9" /><path d="M11 5H5a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-6" /></>,
  file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></>,
  github: <path d="M12 2.5a9.5 9.5 0 0 0-3 18.51c.48.09.65-.21.65-.46v-1.8c-2.66.58-3.22-1.13-3.22-1.13-.43-1.1-1.06-1.39-1.06-1.39-.87-.59.07-.58.07-.58.96.07 1.47.99 1.47.99.86 1.46 2.24 1.04 2.78.8.09-.62.33-1.04.61-1.28-2.13-.24-4.37-1.06-4.37-4.73 0-1.04.37-1.89.98-2.56-.1-.24-.43-1.21.1-2.53 0 0 .8-.26 2.61.98a9.06 9.06 0 0 1 4.75 0c1.81-1.24 2.61-.98 2.61-.98.53 1.32.2 2.29.1 2.53.61.67.98 1.52.98 2.56 0 3.68-2.24 4.49-4.38 4.73.34.29.65.85.65 1.71v2.53c0 .25.17.55.65.46A9.5 9.5 0 0 0 12 2.5Z" />,
  keyboard: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 9h.01M11 9h.01M15 9h.01M7 13h.01M11 13h.01M15 13h.01M7 16h10" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  moon: <path d="M20.2 15.7A8.5 8.5 0 0 1 8.3 3.8 8.5 8.5 0 1 0 20.2 15.7Z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
  shield: <path d="M12 3 5 6v5c0 4.8 2.9 8.6 7 10 4.1-1.4 7-5.2 7-10V6l-7-3Zm-3 9 2 2 4-4" />,
  spark: <path d="m12 2 1.4 6.6L20 10l-6.6 1.4L12 18l-1.4-6.6L4 10l6.6-1.4L12 2Zm7 15 .55 2.45L22 20l-2.45.55L19 23l-.55-2.45L16 20l2.45-.55L19 17Z" />,
  sun: <><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
  x: <path d="m6 6 12 12M18 6 6 18" />,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>,
  key: <><path d="m21 2-9.6 9.6" /><circle cx="7.5" cy="16.5" r="4.5" /><path d="M10.5 13.5 13 16l2-2 1.5 1.5L18 14" /></>,
  hash: <path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18" />,
  regex: <><path d="M17 12a5 5 0 1 0-10 0 5 5 0 0 0 10 0Z" /><path d="M12 7v10M7 12h10" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>,
  diff: <><path d="M12 3v18M5 12h14" /><rect x="4" y="4" width="16" height="16" rx="2" /></>,
  list: <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />,
  link: <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71m-1.75 7.82a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />,
  refresh: <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.99 6.57 2.57L21 8m0-5v5h-5" />,
  trash: <path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />,
  eye: <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>,
  sliders: <path d="M4 21v-7m0-4V3m8 21v-9m0-4V3m8 21v-5m0-4V3M1 14h6m2-6h6m2 8h6" />,
  "shield-check": <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4" />,
  type: <path d="M4 7V4h16v3M9 20h6M12 4v16" />,
  percent: <><line x1="19" y1="5" x2="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></>,
  calculator: <><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="16" y1="14" x2="16" y2="18" /><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01" /></>,
  palette: <path d="M12 2a10 10 0 1 0 10 10c0-1.7-.8-2.5-1.7-2.5h-1.6c-.6 0-1.1-.5-1.1-1.1v-.5C17.6 5 15.1 2 12 2Zm-5.5 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />,
  globe: <><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10zM2 12h20" /></>,
  tag: <path d="M12 2H2v10l11 11 10-10L12 2zm-5 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />,
  "file-text": <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></>,
};

export function Icon({ name, size = 18, ...props }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}
