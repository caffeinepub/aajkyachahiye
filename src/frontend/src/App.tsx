import { useCallback, useRef, useState } from "react";
import { useActor } from "./hooks/useActor";

// ── Icons (inline SVGs for zero bundle cost) ──────────────────────────────
const BoltIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
  </svg>
);
const PhoneIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </svg>
);
const MapPinIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const UserIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const SendIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M22 2L11 13" />
    <path d="M22 2l-7 20-4-9-9-4 20-7z" />
  </svg>
);
const ArrowRightIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M5 12h14" />
    <path d="M13 5l7 7-7 7" />
  </svg>
);
const CheckIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
const ClockIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);
const CrosshairIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const StarIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 2l2.09 6.26H20.5l-5.2 3.77L17.45 20 12 15.77 6.55 20l2.16-7.97L3.5 8.26h6.41L12 2z" />
  </svg>
);
const ChatIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
  </svg>
);
const ShieldIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M12 3l7 4v6a7 7 0 01-7 7 7 7 0 01-7-7V7l7-4z" />
  </svg>
);
const WhatsAppIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.52 5.98L0 24l6.18-1.62A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.2-3.48-8.4zM12 22a9.96 9.96 0 01-5.1-1.4l-.36-.22-3.67.96.98-3.57-.24-.37A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.5c-.28-.14-1.65-.81-1.9-.9-.25-.1-.43-.14-.6.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.4-1.65-1.56-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.47.1-.18.05-.34-.02-.48-.07-.14-.6-1.45-.82-1.99-.22-.52-.44-.45-.6-.46l-.51-.01c-.18 0-.48.07-.73.34-.25.28-.96.94-.96 2.3s.99 2.67 1.13 2.85c.14.18 1.94 2.96 4.7 4.15.66.28 1.18.45 1.58.58.66.21 1.26.18 1.74.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z" />
  </svg>
);
const ElectricianIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
  </svg>
);
const PlumberIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M7 10h10M7 14h10" />
    <path d="M5 6h14v12H5z" />
  </svg>
);
const CalendarIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M8 2v4M16 2v4M3 10h18" />
  </svg>
);
const TiffinIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M8 7h8" />
    <rect x="4" y="4" width="16" height="6" rx="2" />
    <rect x="6" y="12" width="12" height="8" rx="2" />
  </svg>
);
const AcIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 7h18M6 3v4M18 3v4M4 7v12a2 2 0 002 2h12a2 2 0 002-2V7" />
  </svg>
);
const CleaningIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 2l3 7h7l-5.6 4 2.2 7L12 16l-6.6 4 2.2-7L2 9h7z" />
  </svg>
);
const MailIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
);
const UsersIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="10" cy="7" r="4" />
  </svg>
);
const RupeeCircleIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 1v22" />
    <path d="M17 5H9.5a3.5 3.5 0 000 7H17a3.5 3.5 0 000-7z" />
    <path d="M17 12H9.5a3.5 3.5 0 000 7H17" />
  </svg>
);
const TargetIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
const LogoIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3v18M3 12h18" />
    <path d="M7 7l10 10M17 7L7 17" />
  </svg>
);

// ── Types ─────────────────────────────────────────────────────────────────
type TimingOption = "ASAP" | "Today" | "This week";

interface DemandForm {
  name: string;
  phone: string;
  location: string;
  need: string;
  timing: TimingOption;
  budget: string;
  consent: boolean;
}

interface ProviderForm {
  businessName: string;
  phone: string;
  city: string;
  categories: string[];
  serviceAreas: string;
  consent: boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────
function escapeHtml(str: string) {
  return str.replace(
    /[&<>"']/g,
    (m: string) =>
      (
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }) as Record<string, string>
      )[m],
  );
}

const WA_NUMBER = "91XXXXXXXXXX";

function buildWALink(fields: {
  name?: string;
  need?: string;
  location?: string;
  timing?: string;
  phone?: string;
  budget?: string;
}) {
  const msg = `Hi AajKyaChahiye, Mujhe yeh service chahiye:
- Name: ${fields.name || "N/A"}
- Service: ${fields.need || "Please specify"}
- Location: ${fields.location || "Please specify"}
- When: ${fields.timing || "ASAP"}
- Phone: ${fields.phone ? "+91 " + fields.phone : "Please add"}
- Budget: ${fields.budget || "N/A"}`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// ── Category ticker data ──────────────────────────────────────────────────
const TICKER_ITEMS = [
  {
    label: "Electrician",
    icon: <ElectricianIcon className="h-3.5 w-3.5" />,
    bg: "bg-amber-50",
    color: "text-amber-600",
  },
  {
    label: "Plumber",
    icon: <PlumberIcon className="h-3.5 w-3.5" />,
    bg: "bg-sky-50",
    color: "text-sky-600",
  },
  {
    label: "Jobs",
    icon: <CalendarIcon className="h-3.5 w-3.5" />,
    bg: "bg-emerald-50",
    color: "text-emerald-600",
  },
  {
    label: "Tiffin",
    icon: <TiffinIcon className="h-3.5 w-3.5" />,
    bg: "bg-orange-50",
    color: "text-orange-600",
  },
  {
    label: "AC Repair",
    icon: <AcIcon className="h-3.5 w-3.5" />,
    bg: "bg-purple-50",
    color: "text-purple-600",
  },
  {
    label: "Home Cleaning",
    icon: <CleaningIcon className="h-3.5 w-3.5" />,
    bg: "bg-rose-50",
    color: "text-rose-600",
  },
];

// ── Live demand cards data ────────────────────────────────────────────────
const LIVE_DEMANDS = [
  {
    title: "Electrician – GK ft. wiring issue",
    location: "Greater Kailash, Delhi",
    timing: "ASAP",
    posted: "12 min ago",
    badge: "New",
    badgeBg: "bg-gray-900",
    icon: <ElectricianIcon />,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    title: "Plumber – Bathroom leakage",
    location: "Laxmi Nagar, Delhi",
    timing: "Today evening",
    posted: "24 min ago",
    badge: "Hot",
    badgeBg: "bg-emerald-600",
    icon: <PlumberIcon />,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    title: "Job – Delivery executive",
    location: "Noida Sector 62",
    timing: "This week",
    posted: "39 min ago",
    badge: "Urgent",
    badgeBg: "bg-indigo-600",
    icon: <CalendarIcon />,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "Tiffin – Veg, monthly",
    location: "Dwarka, Delhi",
    timing: "Start next week",
    posted: "8 min ago",
    badge: "New",
    badgeBg: "bg-gray-200",
    badgeText: "text-ink-800",
    icon: <TiffinIcon />,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    title: "AC Repair – Gas refill",
    location: "Rohini, Delhi",
    timing: "Today",
    posted: "18 min ago",
    badge: "Hot",
    badgeBg: "bg-rose-600",
    icon: <AcIcon />,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    title: "Home Cleaning – 2BHK",
    location: "Saket, Delhi",
    timing: "Tomorrow",
    posted: "31 min ago",
    badge: "New",
    badgeBg: "bg-gray-200",
    badgeText: "text-ink-800",
    icon: <CleaningIcon />,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
  },
];

const PROVIDER_CATEGORIES = [
  "Electrician",
  "Plumber",
  "AC Repair",
  "Tiffin",
  "Home Cleaning",
  "Painter",
];

// ── App ───────────────────────────────────────────────────────────────────
export default function App() {
  const { actor } = useActor();

  // Demand form state
  const [demandForm, setDemandForm] = useState<DemandForm>({
    name: "",
    phone: "",
    location: "",
    need: "",
    timing: "ASAP",
    budget: "",
    consent: false,
  });
  const [demandFeedback, setDemandFeedback] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);
  const [demandSubmitting, setDemandSubmitting] = useState(false);
  const [locStatus, setLocStatus] = useState("");
  const needRef = useRef<HTMLTextAreaElement>(null);

  // Provider form state
  const [providerForm, setProviderForm] = useState<ProviderForm>({
    businessName: "",
    phone: "",
    city: "",
    categories: [],
    serviceAreas: "",
    consent: false,
  });
  const [providerFeedback, setProviderFeedback] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);
  const [providerSubmitting, setProviderSubmitting] = useState(false);
  const [catWarning, setCatWarning] = useState("");

  const needLen = demandForm.need.length;
  const MAX_NEED = 300;

  // GPS location
  const handleGetLocation = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setLocStatus("Location not supported on this device.");
      return;
    }
    setLocStatus("Fetching location…");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
          const res = await fetch(url, {
            headers: { "Accept-Language": "en" },
          });
          if (!res.ok) throw new Error("geocode");
          const data = await res.json();
          const area =
            data.address?.suburb ||
            data.address?.neighbourhood ||
            data.address?.city_district ||
            "";
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.state ||
            "";
          const text = [area, city].filter(Boolean).join(", ");
          setDemandForm((p) => ({
            ...p,
            location: text || `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`,
          }));
          setLocStatus("Location added.");
        } catch {
          setDemandForm((p) => ({
            ...p,
            location: `${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)}`,
          }));
          setLocStatus("Added approximate location.");
        }
        setTimeout(() => setLocStatus(""), 2500);
      },
      () => {
        setLocStatus("Permission denied. Type area manually.");
        setTimeout(() => setLocStatus(""), 2500);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 },
    );
  }, []);

  // Chip append
  const handleChip = (text: string) => {
    setDemandForm((p) => {
      const current = p.need.trim();
      const newNeed = current ? current + " • " + text : text;
      return { ...p, need: newNeed.slice(0, MAX_NEED) };
    });
    needRef.current?.focus();
  };

  // Demand submit
  const handleDemandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, location, need, timing, budget, consent } = demandForm;
    if (!name.trim() || !phone.trim() || !location.trim() || !need.trim()) {
      setDemandFeedback({
        type: "error",
        msg: "Please fill Name, Phone, Location and your need.",
      });
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setDemandFeedback({
        type: "error",
        msg: "Enter a valid 10-digit mobile number.",
      });
      return;
    }
    if (!consent) {
      setDemandFeedback({
        type: "error",
        msg: "Please accept the consent checkbox.",
      });
      return;
    }
    setDemandSubmitting(true);
    try {
      if (!actor) throw new Error("Not connected");
      await actor.postDemand(
        name,
        phone,
        location,
        need,
        timing,
        budget || null,
        consent,
      );
      setDemandFeedback({
        type: "success",
        msg: `Shukriya, ${escapeHtml(name)}! Aapki demand submit ho gayi. Providers jald contact karenge.`,
      });
      // Update WA link with form data
      setDemandForm({
        name: "",
        phone: "",
        location: "",
        need: "",
        timing: "ASAP",
        budget: "",
        consent: false,
      });
    } catch {
      setDemandFeedback({
        type: "error",
        msg: "Something went wrong. Please try again.",
      });
    } finally {
      setDemandSubmitting(false);
    }
  };

  // Provider submit
  const handleProviderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { businessName, phone, city, categories, serviceAreas, consent } =
      providerForm;
    if (!businessName.trim() || !phone.trim() || !city.trim()) {
      setProviderFeedback({
        type: "error",
        msg: "Please fill Business Name, Phone, and City.",
      });
      return;
    }
    if (categories.length === 0) {
      setProviderFeedback({
        type: "error",
        msg: "Please select at least 1 category.",
      });
      return;
    }
    if (!consent) {
      setProviderFeedback({
        type: "error",
        msg: "Please accept the partner terms.",
      });
      return;
    }
    setProviderSubmitting(true);
    try {
      if (!actor) throw new Error("Not connected");
      await actor.registerProvider(
        businessName,
        phone,
        city,
        categories,
        serviceAreas,
        consent,
      );
      setProviderFeedback({
        type: "success",
        msg: "Registered! You will start receiving leads shortly.",
      });
      setProviderForm({
        businessName: "",
        phone: "",
        city: "",
        categories: [],
        serviceAreas: "",
        consent: false,
      });
    } catch {
      setProviderFeedback({
        type: "error",
        msg: "Something went wrong. Please try again.",
      });
    } finally {
      setProviderSubmitting(false);
    }
  };

  const toggleCategory = (cat: string) => {
    setProviderForm((p) => {
      if (p.categories.includes(cat)) {
        setCatWarning("");
        return { ...p, categories: p.categories.filter((c) => c !== cat) };
      }
      if (p.categories.length >= 3) {
        setCatWarning("Max 3 categories allowed.");
        setTimeout(() => setCatWarning(""), 1800);
        return p;
      }
      return { ...p, categories: [...p.categories, cat] };
    });
  };

  const handleWAQuick = () => {
    window.open(
      buildWALink({
        name: demandForm.name,
        need: demandForm.need,
        location: demandForm.location,
        timing: demandForm.timing,
        phone: demandForm.phone,
        budget: demandForm.budget,
      }),
      "_blank",
    );
  };

  return (
    <div className="bg-white text-ink-900 antialiased selection:bg-brand-100 selection:text-ink-900">
      {/* ── Top Trust Bar ───────────────────────────────────────────────── */}
      <div
        data-ocid="trust.section"
        className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-[13px]">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <BoltIcon className="h-3.5 w-3.5" />
            </span>
            <span className="font-medium text-ink-700">
              100% Free • No hidden charges
            </span>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <span className="inline-flex items-center gap-1 text-ink-600">
              <PhoneIcon className="h-4 w-4" />
              24x7 Support
            </span>
            <span className="h-1 w-1 rounded-full bg-gray-300"></span>
            <span className="text-ink-600">Fast local leads</span>
          </div>
        </div>
      </div>

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:py-4">
          <a href="#top" className="group flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white shadow-soft transition-transform group-hover:scale-105">
              <LogoIcon />
            </div>
            <div>
              <p className="text-[15px] font-extrabold tracking-tight text-ink-900">
                AajKyaChahiye
              </p>
              <p className="text-[11px] leading-none text-ink-500">
                Local demand • Quick solutions
              </p>
            </div>
          </a>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <a
              data-ocid="nav.link"
              href="#how"
              className="text-ink-600 hover:text-ink-900"
            >
              Kaise kaam karta hai
            </a>
            <a
              data-ocid="nav.link"
              href="#live"
              className="text-ink-600 hover:text-ink-900"
            >
              Live Demands
            </a>
            <a
              data-ocid="nav.link"
              href="#providers"
              className="text-ink-600 hover:text-ink-900"
            >
              Service Providers
            </a>
            <a
              data-ocid="nav.link"
              href="#contact"
              className="text-ink-600 hover:text-ink-900"
            >
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              data-ocid="header.post_demand.button"
              href="#post"
              className="hidden rounded-xl border border-gray-200 px-3.5 py-2 text-sm font-semibold text-ink-800 hover:bg-gray-50 sm:inline-flex"
            >
              Post Demand
            </a>
            <a
              data-ocid="header.leads.button"
              href="#providers"
              className="rounded-xl bg-brand-600 px-3.5 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-px hover:shadow-lift"
            >
              Leads Paaye
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 gradient-mesh"></div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:py-16 lg:grid-cols-12 lg:py-20">
          {/* Left */}
          <div className="relative z-10 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[12px] font-semibold text-brand-800">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500"></span>
              </span>
              Mobile-first • Super fast
            </div>

            <h1 className="mt-4 text-[32px] font-extrabold leading-[1.15] tracking-tight text-ink-900 sm:text-[42px] lg:text-[52px]">
              Aaj aapko{" "}
              <span className="bg-gradient-to-r from-brand-600 to-[#38bdf8] bg-clip-text text-transparent">
                kya chahiye?
              </span>
            </h1>
            <p className="mt-3 text-[15px] text-ink-600 sm:text-[16px]">
              Apni need bataye aur{" "}
              <span className="font-semibold text-ink-800">
                turant solution
              </span>{" "}
              paaye. Electrician, plumber, tiffin, jobs – sab kuch ek hi jagah.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                data-ocid="hero.post_demand.primary_button"
                href="#post"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-5 py-3.5 text-[15px] font-bold text-white shadow-lift transition hover:-translate-y-px active:translate-y-0"
              >
                <span className="text-lg">🚀</span> Apni Demand Post Kare
              </a>
              <a
                data-ocid="hero.live_demands.secondary_button"
                href="#live"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-[14px] font-semibold text-ink-800 shadow-soft hover:bg-gray-50"
              >
                Live demands dekhe
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>

            <p className="mt-3 text-[12px] text-ink-500">
              100% Free –{" "}
              <span className="font-medium text-ink-700">Koi charge nahi</span>.
              Bas form bharo aur providers aapko contact karenge.
            </p>

            {/* Value chips */}
            <div className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {[
                {
                  icon: <CheckIcon className="h-4 w-4 text-emerald-600" />,
                  label: "Quick replies",
                },
                {
                  icon: <ClockIcon className="h-4 w-4 text-brand-600" />,
                  label: "Local providers",
                },
                {
                  icon: <StarIcon className="h-4 w-4 text-amber-500" />,
                  label: "Trusted matches",
                },
                {
                  icon: <ChatIcon className="h-4 w-4 text-rose-500" />,
                  label: "WhatsApp direct",
                },
              ].map((chip) => (
                <div
                  key={chip.label}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-[12px] text-ink-700 shadow-soft"
                >
                  {chip.icon}
                  {chip.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right – phone mockup */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white shadow-lift sm:max-w-[380px]">
              <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(80rem_40rem_at_10%_0%,rgba(45,155,255,0.08),transparent_60%)]"></div>
              <div className="absolute left-1/2 top-3 h-1.5 w-20 -translate-x-1/2 rounded-full bg-gray-200"></div>
              <div className="px-5 pb-6 pt-10">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
                      Live
                    </p>
                    <p className="text-[18px] font-extrabold text-ink-900">
                      Trending Needs
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                    Updated now
                  </span>
                </div>
                <div className="space-y-2.5">
                  {[
                    {
                      label: "Electrician",
                      sub: "Near Connaught Place",
                      count: 5,
                      icon: <ElectricianIcon />,
                      bg: "bg-amber-50",
                      color: "text-amber-600",
                    },
                    {
                      label: "Plumber",
                      sub: "Karol Bagh, Delhi",
                      count: 3,
                      icon: <PlumberIcon />,
                      bg: "bg-sky-50",
                      color: "text-sky-600",
                    },
                    {
                      label: "Jobs",
                      sub: "Entry level, Noida",
                      count: 7,
                      icon: <CalendarIcon />,
                      bg: "bg-emerald-50",
                      color: "text-emerald-600",
                    },
                    {
                      label: "Tiffin Service",
                      sub: "South Delhi, monthly",
                      count: 4,
                      icon: <TiffinIcon />,
                      bg: "bg-orange-50",
                      color: "text-orange-600",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between rounded-2xl border border-gray-200 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`grid h-9 w-9 place-items-center rounded-xl ${item.bg} ${item.color}`}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-ink-900">
                            {item.label}
                          </p>
                          <p className="text-[11px] text-ink-500">{item.sub}</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-gray-900 px-2.5 py-1 text-[11px] font-bold text-white">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <a
                    href="#post"
                    className="rounded-2xl bg-brand-600 px-3 py-2.5 text-center text-[13px] font-bold text-white shadow-soft"
                  >
                    Post Demand
                  </a>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi AajKyaChahiye, Mujhe yeh service chahiye...")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-center text-[13px] font-bold text-emerald-700"
                  >
                    WhatsApp
                  </a>
                </div>
                <p className="mt-2 text-center text-[11px] text-ink-500">
                  Avg response:{" "}
                  <span className="font-semibold text-ink-700">15–45 mins</span>
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-4 -top-4 hidden h-24 w-24 rounded-3xl bg-gradient-to-br from-brand-400 to-[#38bdf8] opacity-20 blur-2xl lg:block"></div>
            <div className="pointer-events-none absolute -left-6 bottom-0 hidden h-28 w-28 rounded-3xl bg-gradient-to-tr from-emerald-300 to-emerald-500 opacity-20 blur-2xl lg:block"></div>
          </div>
        </div>

        {/* Ticker */}
        <div className="border-y border-gray-100 bg-white">
          <div className="mx-auto max-w-7xl px-4">
            <div className="ticker-wrap relative py-3">
              <div className="ticker flex w-max items-center gap-6 whitespace-nowrap text-[13px] text-ink-600">
                {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                  <span
                    // biome-ignore lint/suspicious/noArrayIndexKey: ticker requires stable positional keys for duplicated animation items
                    key={i}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5"
                  >
                    <span
                      className={`grid h-5 w-5 place-items-center rounded-md ${item.bg} ${item.color}`}
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Demand Form ─────────────────────────────────────────────────── */}
      <section
        id="post"
        className="scroll-mt-24 border-b border-gray-100 bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            {/* Info */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[12px] font-semibold text-emerald-800">
                <CheckIcon className="h-3.5 w-3.5" />
                Fast &amp; simple
              </div>
              <h2 className="mt-3 text-[26px] font-extrabold tracking-tight text-ink-900 sm:text-[30px]">
                Apni demand 30 seconds me post kare
              </h2>
              <p className="mt-2 text-[14px] text-ink-600">
                Bas basic details bharo, hum local providers ko alert kar denge.
                Aapko direct calls/WhatsApp aayenge.
              </p>
              <ul className="mt-5 space-y-2.5 text-[14px] text-ink-700">
                {[
                  "100% Free – koi hidden charge nahi",
                  "Mobile-optimized, one-tap phone input",
                  "WhatsApp par bhi turant bhej sakte ho",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-ink-500">
                  Popular categories
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Electrician",
                    "Plumber",
                    "AC Repair",
                    "Tiffin",
                    "Jobs",
                    "Home Cleaning",
                    "Painter",
                    "Carpenter",
                  ].map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full bg-white px-2.5 py-1 text-[12px] text-ink-700 shadow-soft"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lift">
                <div className="border-b border-gray-100 bg-gradient-to-r from-brand-50 to-white px-5 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-wider text-brand-700">
                        Demand Form
                      </p>
                      <h3 className="text-[18px] font-extrabold text-ink-900">
                        Apni need bataye
                      </h3>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                      Free
                    </span>
                  </div>
                </div>

                <form
                  data-ocid="demand.modal"
                  onSubmit={handleDemandSubmit}
                  className="px-5 py-5 sm:px-6 sm:py-6"
                  noValidate
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Name */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-[13px] font-semibold text-ink-800"
                      >
                        Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-0 grid w-10 place-items-center text-ink-400">
                          <UserIcon />
                        </span>
                        <input
                          data-ocid="demand.input"
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          placeholder="Apna naam likhe (e.g., Rahul Sharma)"
                          value={demandForm.name}
                          onChange={(e) =>
                            setDemandForm((p) => ({
                              ...p,
                              name: e.target.value,
                            }))
                          }
                          className="input-ring w-full rounded-2xl border border-gray-300 bg-white py-3 pl-10 pr-3 text-[15px] text-ink-900 placeholder:text-ink-400 focus:border-brand-500"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block text-[13px] font-semibold text-ink-800"
                      >
                        Phone <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-0 grid w-10 place-items-center text-ink-400">
                          <PhoneIcon />
                        </span>
                        <div className="absolute inset-y-0 left-10 grid place-items-center pr-2 text-[13px] font-semibold text-ink-700">
                          +91
                        </div>
                        <input
                          data-ocid="demand.input"
                          id="phone"
                          name="phone"
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          required
                          placeholder="10-digit mobile number"
                          value={demandForm.phone}
                          onChange={(e) =>
                            setDemandForm((p) => ({
                              ...p,
                              phone: e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 10),
                            }))
                          }
                          className="input-ring w-full rounded-2xl border border-gray-300 bg-white py-3 pl-16 pr-3 text-[15px] tracking-wide text-ink-900 placeholder:text-ink-400 focus:border-brand-500"
                        />
                      </div>
                      <p className="mt-1 text-[12px] text-ink-500">
                        Example: 9876543210
                      </p>
                    </div>

                    {/* Location */}
                    <div>
                      <label
                        htmlFor="location"
                        className="mb-1.5 block text-[13px] font-semibold text-ink-800"
                      >
                        Location <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-0 grid w-10 place-items-center text-ink-400">
                          <MapPinIcon />
                        </span>
                        <input
                          data-ocid="demand.input"
                          id="location"
                          name="location"
                          type="text"
                          autoComplete="address-level2"
                          required
                          placeholder="Area/City (e.g., Lajpat Nagar, Delhi)"
                          value={demandForm.location}
                          onChange={(e) =>
                            setDemandForm((p) => ({
                              ...p,
                              location: e.target.value,
                            }))
                          }
                          className="input-ring w-full rounded-2xl border border-gray-300 bg-white py-3 pl-10 pr-10 text-[15px] text-ink-900 placeholder:text-ink-400 focus:border-brand-500"
                        />
                        <button
                          type="button"
                          title="Use current location"
                          data-ocid="demand.button"
                          onClick={handleGetLocation}
                          className="absolute inset-y-0 right-0 grid w-10 place-items-center rounded-r-2xl text-ink-500 hover:text-ink-900"
                        >
                          <CrosshairIcon />
                        </button>
                      </div>
                      {locStatus && (
                        <p className="mt-1 text-[12px] text-ink-500">
                          {locStatus}
                        </p>
                      )}
                    </div>

                    {/* Need */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="need"
                        className="mb-1.5 block text-[13px] font-semibold text-ink-800"
                      >
                        Aapko kya chahiye?{" "}
                        <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          data-ocid="demand.textarea"
                          ref={needRef}
                          id="need"
                          name="need"
                          rows={4}
                          required
                          placeholder="Short me likhe – e.g., 'AC gas refill + cleaning, 1.5 Ton, window AC, today evening'"
                          value={demandForm.need}
                          onChange={(e) =>
                            setDemandForm((p) => ({
                              ...p,
                              need: e.target.value.slice(0, MAX_NEED),
                            }))
                          }
                          className="input-ring w-full resize-y rounded-2xl border border-gray-300 bg-white p-3 text-[15px] leading-relaxed text-ink-900 placeholder:text-ink-400 focus:border-brand-500"
                        />
                        <div className="pointer-events-none absolute bottom-2 right-2 rounded-md bg-white/80 px-2 py-0.5 text-[11px] text-ink-500 backdrop-blur">
                          {needLen}/{MAX_NEED}
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {[
                          {
                            label: "Electrician",
                            text: "Electrician needed today",
                          },
                          { label: "Plumber", text: "Plumber for leakage fix" },
                          {
                            label: "Tiffin",
                            text: "Tiffin service, monthly, veg",
                          },
                          {
                            label: "Job",
                            text: "Entry level job, South Delhi",
                          },
                          {
                            label: "AC Repair",
                            text: "AC servicing & gas refill",
                          },
                          {
                            label: "Home Cleaning",
                            text: "Home cleaning, 2BHK, deep clean",
                          },
                        ].map((chip) => (
                          <button
                            key={chip.label}
                            type="button"
                            onClick={() => handleChip(chip.text)}
                            className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[12px] text-ink-700 hover:bg-gray-50"
                          >
                            {chip.label}
                          </button>
                        ))}
                      </div>
                      <p className="mt-1 text-[12px] text-ink-500">
                        Tip: Service type + location + timeline likhe for faster
                        replies.
                      </p>
                    </div>

                    {/* Timing */}
                    <div>
                      <p className="mb-1.5 text-[13px] font-semibold text-ink-800">
                        Preferred time
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {(["ASAP", "Today", "This week"] as TimingOption[]).map(
                          (t) => (
                            <label
                              key={t}
                              className={`cursor-pointer rounded-2xl border px-3 py-2 text-center text-[13px] text-ink-700 transition ${
                                demandForm.timing === t
                                  ? "border-brand-500 bg-brand-50"
                                  : "border-gray-300"
                              }`}
                            >
                              <input
                                data-ocid="demand.radio"
                                type="radio"
                                name="timing"
                                value={t}
                                checked={demandForm.timing === t}
                                onChange={() =>
                                  setDemandForm((p) => ({ ...p, timing: t }))
                                }
                                className="sr-only"
                              />
                              {t}
                            </label>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <label
                        htmlFor="budget"
                        className="mb-1.5 block text-[13px] font-semibold text-ink-800"
                      >
                        Budget (optional)
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-0 grid w-10 place-items-center text-ink-400 font-semibold text-sm">
                          ₹
                        </span>
                        <input
                          data-ocid="demand.input"
                          id="budget"
                          name="budget"
                          type="text"
                          inputMode="numeric"
                          placeholder="e.g., 500–1500"
                          value={demandForm.budget}
                          onChange={(e) =>
                            setDemandForm((p) => ({
                              ...p,
                              budget: e.target.value,
                            }))
                          }
                          className="input-ring w-full rounded-2xl border border-gray-300 bg-white py-3 pl-10 pr-3 text-[15px] text-ink-900 placeholder:text-ink-400 focus:border-brand-500"
                        />
                      </div>
                    </div>

                    {/* Consent */}
                    <div className="sm:col-span-2">
                      <label className="flex items-start gap-2 text-[13px] text-ink-700 cursor-pointer">
                        <input
                          data-ocid="demand.checkbox"
                          id="consent"
                          name="consent"
                          type="checkbox"
                          checked={demandForm.consent}
                          onChange={(e) =>
                            setDemandForm((p) => ({
                              ...p,
                              consent: e.target.checked,
                            }))
                          }
                          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                        />
                        <span>
                          I agree to share my details with relevant local
                          service providers on AajKyaChahiye. You can contact me
                          on phone/WhatsApp.{" "}
                          <a
                            href="/privacy"
                            className="font-semibold text-brand-700 hover:underline"
                          >
                            Privacy Policy
                          </a>
                          .
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-[12px] text-ink-600">
                      <CheckIcon className="h-4 w-4 text-emerald-600" />
                      Typically replies in 15–45 mins
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        data-ocid="demand.secondary_button"
                        type="button"
                        onClick={handleWAQuick}
                        className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[14px] font-bold text-emerald-700 hover:bg-emerald-100"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        WhatsApp par bheje
                      </button>
                      <button
                        data-ocid="demand.submit_button"
                        type="submit"
                        disabled={demandSubmitting}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 text-[15px] font-extrabold text-white shadow-lift transition hover:-translate-y-px active:translate-y-0 disabled:opacity-70"
                      >
                        <SendIcon className="h-4 w-4" />
                        {demandSubmitting
                          ? "Submitting…"
                          : "Demand Submit Kare"}
                      </button>
                    </div>
                  </div>

                  {/* Feedback */}
                  {demandFeedback && (
                    <div
                      data-ocid={
                        demandFeedback.type === "success"
                          ? "demand.success_state"
                          : "demand.error_state"
                      }
                      className={`mt-4 rounded-2xl border px-4 py-3 text-[13px] ${
                        demandFeedback.type === "success"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                          : "border-rose-200 bg-rose-50 text-rose-800"
                      }`}
                    >
                      {demandFeedback.msg}
                    </div>
                  )}
                </form>

                <div className="border-t border-gray-100 bg-gray-50 px-5 py-3 text-[12px] text-ink-500 sm:px-6">
                  <span className="font-medium text-ink-700">No spam</span> •
                  Your data is shared only with relevant providers. You can
                  request removal anytime.
                </div>
              </div>

              {/* Trust strip */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { label: "Avg. first reply", value: "23 mins" },
                  { label: "Local providers", value: "2500+" },
                  { label: "Cities live", value: "30+" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-gray-200 bg-white p-3 text-center shadow-soft"
                  >
                    <p className="text-[11px] uppercase tracking-wide text-ink-500">
                      {stat.label}
                    </p>
                    <p className="text-[18px] font-extrabold text-ink-900">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Live Demands ────────────────────────────────────────────────── */}
      <section
        id="live"
        className="scroll-mt-24 border-b border-gray-100 bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-[12px] font-semibold text-ink-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                Live now
              </div>
              <h2 className="mt-2 text-[24px] font-extrabold tracking-tight text-ink-900 sm:text-[28px]">
                Aaj ke trending demands
              </h2>
              <p className="mt-1 text-[14px] text-ink-600">
                Real-time sample data – dekh lo aapki need kitni common hai.
              </p>
            </div>
            <a
              data-ocid="live.primary_button"
              href="#post"
              className="hidden rounded-2xl bg-brand-600 px-4 py-2.5 text-[13px] font-bold text-white shadow-soft sm:inline-flex"
            >
              Apni demand add kare
            </a>
          </div>

          {/* Stats tiles */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              {
                label: "Electrician",
                count: 5,
                note: "Most in South & Central Delhi",
                suffix: "looking",
                icon: <ElectricianIcon />,
                bg: "bg-amber-50",
                color: "text-amber-600",
              },
              {
                label: "Plumber",
                count: 3,
                note: "Leakage, motor, fitting",
                suffix: "looking",
                icon: <PlumberIcon />,
                bg: "bg-sky-50",
                color: "text-sky-600",
              },
              {
                label: "Jobs",
                count: 7,
                note: "Delivery, helper, sales",
                suffix: "open",
                icon: <CalendarIcon />,
                bg: "bg-emerald-50",
                color: "text-emerald-600",
              },
              {
                label: "Tiffin",
                count: 4,
                note: "Veg, monthly plans",
                suffix: "searching",
                icon: <TiffinIcon />,
                bg: "bg-orange-50",
                color: "text-orange-600",
              },
            ].map((tile) => (
              <div
                key={tile.label}
                className="rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-4 shadow-soft"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`grid h-9 w-9 place-items-center rounded-xl ${tile.bg} ${tile.color}`}
                  >
                    {tile.icon}
                  </div>
                  <p className="text-[12px] font-semibold text-ink-700">
                    {tile.label}
                  </p>
                </div>
                <p className="mt-2 text-[22px] font-extrabold text-ink-900">
                  {tile.count}{" "}
                  <span className="text-[12px] font-semibold text-ink-500">
                    {tile.suffix}
                  </span>
                </p>
                <p className="mt-1 text-[12px] text-ink-500">{tile.note}</p>
              </div>
            ))}
          </div>

          {/* Demand cards */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LIVE_DEMANDS.map((d, i) => (
              <div
                data-ocid={`live.item.${i + 1}`}
                key={i}
                className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-soft transition hover:border-gray-300 hover:shadow-lift"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`grid h-10 w-10 place-items-center rounded-xl ${d.iconBg} ${d.iconColor}`}
                    >
                      {d.icon}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-ink-900">
                        {d.title}
                      </p>
                      <p className="text-[12px] text-ink-500">
                        {d.location} • {d.timing}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full ${d.badgeBg} px-2 py-0.5 text-[11px] font-bold text-white ${d.badgeText || ""}`}
                  >
                    {d.badge}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-[12px] text-ink-600">
                  <ClockIcon className="h-4 w-4" />
                  Posted {d.posted}
                </div>
                <div className="mt-3 flex gap-2">
                  <a
                    data-ocid={`live.primary_button.${i + 1}`}
                    href="#post"
                    className="rounded-xl bg-brand-600 px-3 py-1.5 text-[12px] font-bold text-white"
                  >
                    I can help
                  </a>
                  <a
                    data-ocid={`live.secondary_button.${i + 1}`}
                    href="#contact"
                    className="rounded-xl border border-gray-200 px-3 py-1.5 text-[12px] font-semibold text-ink-800 hover:bg-gray-50"
                  >
                    Details
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[12px] text-ink-500">
            Data is indicative and refreshes frequently. Exact numbers visible
            after posting your demand.
          </p>
        </div>
      </section>

      {/* ── WhatsApp CTA ────────────────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-emerald-50/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-14">
          <div className="grid grid-cols-1 items-center gap-6 rounded-3xl border border-emerald-200 bg-white p-6 shadow-lift sm:grid-cols-3 sm:p-8">
            <div className="sm:col-span-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-[12px] font-semibold text-emerald-800">
                <WhatsAppIcon className="h-3.5 w-3.5" />
                Direct WhatsApp
              </div>
              <h3 className="mt-2 text-[22px] font-extrabold tracking-tight text-ink-900 sm:text-[26px]">
                Ya direct WhatsApp par demand bheje
              </h3>
              <p className="mt-1 text-[14px] text-ink-600">
                Agar form bharna mushkil ho, to bas WhatsApp par message bhejo.
                Hum turant aapko relevant providers se connect kar denge.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-2 text-[13px] sm:grid-cols-2">
                {[
                  "Service type likhe",
                  "Location + timeline",
                  "Phone number share kare",
                  "Budget (optional)",
                ].map((tip) => (
                  <div
                    key={tip}
                    className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2"
                  >
                    <CheckIcon className="h-4 w-4 text-emerald-600" />
                    {tip}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-stretch gap-3 sm:items-end">
              <a
                data-ocid="whatsapp.primary_button"
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi AajKyaChahiye, Mujhe yeh service chahiye:\n-Service: \n-Location: \n-When: \n-Phone: ")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3.5 text-[15px] font-extrabold text-white shadow-lift transition hover:-translate-y-px"
              >
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp par bheje
              </a>
              <p className="text-[12px] text-ink-500">
                Number shared safely • Only for this request
              </p>
              <div className="w-full rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/60 p-3 text-[12px] text-emerald-900">
                Tip: Message me{" "}
                <span className="font-semibold">
                  Service, Location, Time, Phone
                </span>{" "}
                zarur likhe.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service Providers ───────────────────────────────────────────── */}
      <section
        id="providers"
        className="scroll-mt-24 border-b border-gray-100 bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Left */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-[12px] font-semibold text-indigo-800">
                <ShieldIcon className="h-3.5 w-3.5" />
                For professionals
              </div>
              <h2 className="mt-3 text-[26px] font-extrabold tracking-tight text-ink-900 sm:text-[32px]">
                Customer leads paane ke liye register kare
              </h2>
              <p className="mt-2 text-[15px] text-ink-600">
                AajKyaChahiye par daily nayi demands aati hain. Apna category
                choose kare, area set kare, aur verified leads paaye – direct
                phone/WhatsApp par.
              </p>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: <UsersIcon />,
                    bg: "bg-brand-50",
                    color: "text-brand-700",
                    title: "Verified buyer leads",
                    desc: "Mobile-validated users. Time + location ke saath exact need.",
                  },
                  {
                    icon: <RupeeCircleIcon />,
                    bg: "bg-emerald-50",
                    color: "text-emerald-700",
                    title: "Pay per lead (optional)",
                    desc: "Flexible plans – free trial, then pay only for quality leads.",
                  },
                  {
                    icon: <TargetIcon />,
                    bg: "bg-purple-50",
                    color: "text-purple-700",
                    title: "Area & category targeting",
                    desc: "Apne pin codes aur services choose kare, sirf relevant leads aayenge.",
                  },
                  {
                    icon: <ChatIcon />,
                    bg: "bg-sky-50",
                    color: "text-sky-700",
                    title: "Instant WhatsApp alerts",
                    desc: "New lead aate hi ping – jaldi reply, zyada conversions.",
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-gray-200 bg-white p-4 shadow-soft"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`grid h-9 w-9 place-items-center rounded-xl ${card.bg} ${card.color}`}
                      >
                        {card.icon}
                      </div>
                      <p className="text-[13px] font-bold text-ink-900">
                        {card.title}
                      </p>
                    </div>
                    <p className="mt-2 text-[13px] text-ink-600">{card.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  data-ocid="providers.primary_button"
                  href="#providerForm"
                  className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 text-[15px] font-extrabold text-white shadow-lift transition hover:-translate-y-px"
                >
                  Leads Paaye <ArrowRightIcon className="h-4 w-4" />
                </a>
                <a
                  data-ocid="providers.secondary_button"
                  href="#how"
                  className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[14px] font-semibold text-ink-800 shadow-soft hover:bg-gray-50"
                >
                  Kaise kaam karta hai
                </a>
                <span className="text-[12px] text-ink-500">
                  KYC &amp; guidelines apply.
                </span>
              </div>
            </div>

            {/* Provider Form */}
            <div id="providerForm" className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lift">
                <div className="border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white px-5 py-4 sm:px-6">
                  <p className="text-[12px] font-semibold uppercase tracking-wider text-indigo-700">
                    Provider Signup
                  </p>
                  <h3 className="text-[18px] font-extrabold text-ink-900">
                    Quick registration
                  </h3>
                </div>

                <form
                  data-ocid="provider.modal"
                  onSubmit={handleProviderSubmit}
                  className="space-y-4 px-5 py-5 sm:px-6 sm:py-6"
                  noValidate
                >
                  <div>
                    <label
                      htmlFor="providerBusiness"
                      className="mb-1.5 block text-[13px] font-semibold text-ink-800"
                    >
                      Business name
                    </label>
                    <input
                      data-ocid="provider.input"
                      type="text"
                      required
                      id="providerBusiness"
                      placeholder="e.g., Sharma Electricals"
                      value={providerForm.businessName}
                      onChange={(e) =>
                        setProviderForm((p) => ({
                          ...p,
                          businessName: e.target.value,
                        }))
                      }
                      className="input-ring w-full rounded-2xl border border-gray-300 bg-white px-3 py-3 text-[15px] text-ink-900 placeholder:text-ink-400 focus:border-brand-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="providerPhone"
                        className="mb-1.5 block text-[13px] font-semibold text-ink-800"
                      >
                        Phone
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 grid w-10 place-items-center text-ink-400">
                          <PhoneIcon />
                        </div>
                        <div className="absolute inset-y-0 left-10 grid place-items-center pr-2 text-[13px] font-semibold text-ink-700">
                          +91
                        </div>
                        <input
                          data-ocid="provider.input"
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          required
                          placeholder="9876543210"
                          value={providerForm.phone}
                          onChange={(e) =>
                            setProviderForm((p) => ({
                              ...p,
                              phone: e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 10),
                            }))
                          }
                          className="input-ring w-full rounded-2xl border border-gray-300 bg-white py-3 pl-16 pr-3 text-[15px] tracking-wide text-ink-900 placeholder:text-ink-400 focus:border-brand-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="providerCity"
                        className="mb-1.5 block text-[13px] font-semibold text-ink-800"
                      >
                        City
                      </label>
                      <input
                        data-ocid="provider.input"
                        type="text"
                        required
                        placeholder="e.g., Delhi"
                        value={providerForm.city}
                        onChange={(e) =>
                          setProviderForm((p) => ({
                            ...p,
                            city: e.target.value,
                          }))
                        }
                        className="input-ring w-full rounded-2xl border border-gray-300 bg-white px-3 py-3 text-[15px] text-ink-900 placeholder:text-ink-400 focus:border-brand-500"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="mb-1.5 text-[13px] font-semibold text-ink-800">
                      Categories (max 3)
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {PROVIDER_CATEGORIES.map((cat) => (
                        <label
                          key={cat}
                          className={`flex cursor-pointer items-center gap-2 rounded-2xl border px-3 py-2 text-[13px] text-ink-700 transition ${
                            providerForm.categories.includes(cat)
                              ? "border-brand-500 bg-brand-50"
                              : "border-gray-300"
                          }`}
                        >
                          <input
                            data-ocid="provider.checkbox"
                            type="checkbox"
                            checked={providerForm.categories.includes(cat)}
                            onChange={() => toggleCategory(cat)}
                            className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                          />
                          {cat}
                        </label>
                      ))}
                    </div>
                    <p
                      className={`mt-1 text-[12px] ${catWarning ? "text-rose-600" : "text-ink-500"}`}
                    >
                      {catWarning || "Select up to 3 categories."}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="providerAreas"
                      className="mb-1.5 block text-[13px] font-semibold text-ink-800"
                    >
                      Service areas (comma separated)
                    </label>
                    <input
                      data-ocid="provider.input"
                      type="text"
                      placeholder="e.g., GK, Lajpat Nagar, Saket"
                      value={providerForm.serviceAreas}
                      onChange={(e) =>
                        setProviderForm((p) => ({
                          ...p,
                          serviceAreas: e.target.value,
                        }))
                      }
                      className="input-ring w-full rounded-2xl border border-gray-300 bg-white px-3 py-3 text-[15px] text-ink-900 placeholder:text-ink-400 focus:border-brand-500"
                    />
                    <p className="mt-1 text-[12px] text-ink-500">
                      Better targeting = higher conversions.
                    </p>
                  </div>

                  <div className="flex items-start gap-2 text-[12px] text-ink-700">
                    <input
                      data-ocid="provider.checkbox"
                      id="providerConsent"
                      type="checkbox"
                      required
                      checked={providerForm.consent}
                      onChange={(e) =>
                        setProviderForm((p) => ({
                          ...p,
                          consent: e.target.checked,
                        }))
                      }
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                    />
                    <label htmlFor="providerConsent">
                      I agree to receive leads and follow platform guidelines.{" "}
                      <a
                        href="/terms"
                        className="font-semibold text-brand-700 hover:underline"
                      >
                        Partner Terms
                      </a>
                      .
                    </label>
                  </div>

                  <button
                    data-ocid="provider.submit_button"
                    type="submit"
                    disabled={providerSubmitting}
                    className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-4 py-3 text-[15px] font-extrabold text-white shadow-lift transition hover:-translate-y-px disabled:opacity-70"
                  >
                    {providerSubmitting
                      ? "Registering…"
                      : "Register & Get Leads"}
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>

                  {providerFeedback && (
                    <div
                      data-ocid={
                        providerFeedback.type === "success"
                          ? "provider.success_state"
                          : "provider.error_state"
                      }
                      className={`rounded-2xl border px-4 py-3 text-[13px] ${
                        providerFeedback.type === "success"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                          : "border-rose-200 bg-rose-50 text-rose-800"
                      }`}
                    >
                      {providerFeedback.msg}
                    </div>
                  )}
                </form>

                <div className="border-t border-gray-100 bg-gray-50 px-5 py-3 text-[12px] text-ink-500 sm:px-6">
                  Free trial: 5 leads. Then affordable plans. Cancel anytime.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────────────────── */}
      <section
        id="how"
        className="scroll-mt-24 border-b border-gray-100 bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-[12px] font-semibold text-ink-700">
              Simple process
            </div>
            <h2 className="mt-2 text-[24px] font-extrabold tracking-tight text-ink-900 sm:text-[28px]">
              Kaise kaam karta hai
            </h2>
            <p className="mt-1 text-[14px] text-ink-600">
              Bas 3 steps – post, match, connect.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Demand post kare",
                desc: "30 seconds form / WhatsApp. Service, location, time likhe.",
              },
              {
                step: "2",
                title: "Local match",
                desc: "Aapke area ke relevant providers ko turant alert.",
              },
              {
                step: "3",
                title: "Direct connect",
                desc: "Call/WhatsApp par baat kare, price final kare, kaam start.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-soft"
              >
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 text-white font-bold">
                  {item.step}
                </div>
                <p className="mt-3 text-[15px] font-bold text-ink-900">
                  {item.title}
                </p>
                <p className="mt-1 text-[13px] text-ink-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer id="contact" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-14">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            {/* Brand */}
            <div className="md:col-span-4">
              <a href="#top" className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white shadow-soft">
                  <LogoIcon />
                </div>
                <div>
                  <p className="text-[16px] font-extrabold tracking-tight text-ink-900">
                    AajKyaChahiye
                  </p>
                  <p className="text-[12px] text-ink-500">
                    Local demand • Quick solutions
                  </p>
                </div>
              </a>
              <p className="mt-3 text-[14px] text-ink-600">
                India-focused, mobile-first platform. Post your need, get nearby
                solutions—fast &amp; simple.
              </p>
              <div className="mt-4 flex gap-2">
                <a
                  href="tel:+91"
                  className="grid h-9 w-9 place-items-center rounded-xl border border-gray-200 bg-white text-ink-700 hover:bg-gray-50"
                  aria-label="Phone"
                >
                  <PhoneIcon />
                </a>
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon />
                </a>
                <a
                  href="mailto:hello@aajkyachahiye.in"
                  className="grid h-9 w-9 place-items-center rounded-xl border border-gray-200 bg-white text-ink-700 hover:bg-gray-50"
                  aria-label="Email"
                >
                  <MailIcon />
                </a>
              </div>
            </div>

            {/* Company links */}
            <div className="md:col-span-2">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-ink-500">
                Company
              </p>
              <ul className="mt-3 space-y-2 text-[14px]">
                {[
                  { label: "How it works", href: "#how" },
                  { label: "Live Demands", href: "#live" },
                  { label: "For Providers", href: "#providers" },
                  { label: "Post Demand", href: "#post" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      data-ocid="footer.link"
                      href={link.href}
                      className="text-ink-700 hover:text-ink-900"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cities */}
            <div className="md:col-span-3">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-ink-500">
                Popular in
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "Delhi",
                  "Gurugram",
                  "Noida",
                  "Faridabad",
                  "Ghaziabad",
                  "Mumbai",
                  "Bengaluru",
                  "Pune",
                  "Hyderabad",
                ].map((city) => (
                  <span
                    key={city}
                    className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[12px] text-ink-700"
                  >
                    {city}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-[12px] text-ink-500">
                City-based hyperlocal service. More cities coming soon.
              </p>
            </div>

            {/* Contact */}
            <div className="md:col-span-3">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-ink-500">
                Contact
              </p>
              <ul className="mt-3 space-y-2 text-[14px] text-ink-700">
                <li className="flex items-start gap-2">
                  <MapPinIcon className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>Delhi NCR (Remote support across India)</span>
                </li>
                <li className="flex items-start gap-2">
                  <PhoneIcon className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>+91 9XXXXXXXXX (10am–8pm)</span>
                </li>
                <li className="flex items-start gap-2">
                  <MailIcon className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>hello@aajkyachahiye.in</span>
                </li>
              </ul>
              <div className="mt-4 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-3 text-[12px] text-ink-700">
                Need help posting?{" "}
                <a
                  href="#post"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  Use the form
                </a>{" "}
                ya{" "}
                <a
                  className="font-semibold text-emerald-700 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://wa.me/${WA_NUMBER}`}
                >
                  WhatsApp
                </a>{" "}
                par message kar do.
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-6 text-[12px] text-ink-500 sm:flex-row">
            <p>
              © {new Date().getFullYear()} AajKyaChahiye. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="/privacy" className="hover:text-ink-800">
                Privacy
              </a>
              <a href="/terms" className="hover:text-ink-800">
                Terms
              </a>
              <a href="/grievance" className="hover:text-ink-800">
                Grievance
              </a>
            </div>
          </div>

          {/* Caffeine attribution */}
          <div className="mt-4 flex justify-center">
            <p className="text-[11px] text-ink-400">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink-600 underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ── Sticky Mobile Bottom Bar ────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 p-3 backdrop-blur sm:hidden">
        <div className="grid grid-cols-2 gap-2">
          <a
            data-ocid="mobile.post_demand.primary_button"
            href="#post"
            className="rounded-2xl bg-brand-600 px-4 py-3 text-center text-[14px] font-extrabold text-white shadow-soft"
          >
            🚀 Demand Post
          </a>
          <a
            data-ocid="mobile.whatsapp.button"
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi AajKyaChahiye, Mujhe yeh service chahiye...")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-[14px] font-extrabold text-emerald-700"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
