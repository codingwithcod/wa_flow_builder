import { Link } from "react-router-dom";
import {
  MessageSquare,
  GitBranch,
  Bot,
  Zap,
  Shield,
  BarChart3,
  Layers,
  Cpu,
  ArrowRight,
  MessagesSquare,
  Settings2,
  ChevronRight,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════════
   CSS-IN-JS KEYFRAMES  (injected once via <style>)
   ══════════════════════════════════════════════════════════════════ */
const animationStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  @keyframes float-slow {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-12px) rotate(2deg); }
  }
  @keyframes float-reverse {
    0%, 100% { transform: translateY(-15px); }
    50% { transform: translateY(5px); }
  }
  @keyframes drift-right {
    0% { transform: translateX(-100px) translateY(0); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateX(calc(100vw + 100px)) translateY(-30px); opacity: 0; }
  }
  @keyframes flow-dot {
    0% { offset-distance: 0%; opacity: 0; }
    5% { opacity: 1; }
    95% { opacity: 1; }
    100% { offset-distance: 100%; opacity: 0; }
  }
  @keyframes particle-float {
    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
    25% { transform: translateY(-30px) translateX(10px); opacity: 0.7; }
    50% { transform: translateY(-15px) translateX(-8px); opacity: 0.5; }
    75% { transform: translateY(-40px) translateX(15px); opacity: 0.8; }
  }
  @keyframes dash-flow {
    to { stroke-dashoffset: -40; }
  }
  @keyframes node-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.15); }
    50% { box-shadow: 0 0 0 8px rgba(99, 102, 241, 0); }
  }
  @keyframes message-bubble {
    0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
    50% { transform: translateY(-8px) scale(1.05); opacity: 0.9; }
  }
  @keyframes sparkle {
    0%, 100% { opacity: 0; transform: scale(0.5); }
    50% { opacity: 1; transform: scale(1); }
  }
`;

/* ══════════════════════════════════════════════════════════════════
   BACKGROUND COMPONENTS
   ══════════════════════════════════════════════════════════════════ */

/** Floating node card – looks like a mini flow-builder node */
function FloatingNode({
  top,
  left,
  right,
  delay = 0,
  label,
  color,
  icon: Icon,
}: {
  top?: string;
  left?: string;
  right?: string;
  delay?: number;
  label: string;
  color: string;
  icon: React.ElementType;
}) {
  return (
    <div
      className="absolute hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl pointer-events-none select-none"
      style={{
        top,
        left,
        right,
        background: "rgba(15, 23, 42, 0.6)",
        border: `1px solid ${color}`,
        backdropFilter: "blur(8px)",
        animation: `float-slow 6s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        boxShadow: `0 4px 20px rgba(0,0,0,0.3), 0 0 15px ${color}`,
      }}
    >
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: color.replace("0.15", "0.25").replace("0.2", "0.3") }}
      >
        <Icon className="w-3.5 h-3.5" style={{ color: color.replace("0.15", "1").replace("0.2", "1") }} />
      </div>
      <span className="text-[11px] font-medium text-surface-300 whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

/** Animated SVG flow path with flowing dots */
function FlowPath({
  d,
  color = "rgba(99, 102, 241, 0.15)",
  dotColor = "rgba(99, 102, 241, 0.6)",
  delay = 0,
  duration = 4,
}: {
  d: string;
  color?: string;
  dotColor?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <g>
      {/* Base path */}
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="8 6"
        style={{ animation: `dash-flow ${duration}s linear infinite`, animationDelay: `${delay}s` }}
      />
      {/* Flowing dot */}
      <circle r="3" fill={dotColor}>
        <animateMotion dur={`${duration}s`} repeatCount="indefinite" begin={`${delay}s`}>
          <mpath href={`#path-${delay}`} />
        </animateMotion>
      </circle>
      <path id={`path-${delay}`} d={d} fill="none" stroke="none" />
    </g>
  );
}

/** Tiny floating particle dots */
function ParticleDots() {
  const particles = [
    { top: "15%", left: "8%", size: 3, delay: 0, duration: 5 },
    { top: "25%", left: "92%", size: 2, delay: 1.2, duration: 6 },
    { top: "45%", left: "5%", size: 4, delay: 0.5, duration: 4.5 },
    { top: "60%", left: "88%", size: 3, delay: 2, duration: 5.5 },
    { top: "75%", left: "12%", size: 2, delay: 0.8, duration: 7 },
    { top: "35%", left: "95%", size: 3, delay: 1.5, duration: 4 },
    { top: "80%", left: "85%", size: 2, delay: 3, duration: 6 },
    { top: "10%", left: "45%", size: 2, delay: 2.5, duration: 5 },
    { top: "55%", left: "15%", size: 3, delay: 1, duration: 5.5 },
    { top: "90%", left: "50%", size: 2, delay: 0.3, duration: 6.5 },
  ];

  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: "rgba(129, 140, 248, 0.5)",
            animation: `particle-float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}

/** Floating message bubbles that look like WhatsApp messages */
function MessageBubble({
  top,
  left,
  right,
  text,
  delay = 0,
  variant = "sent",
}: {
  top?: string;
  left?: string;
  right?: string;
  text: string;
  delay?: number;
  variant?: "sent" | "received";
}) {
  const isSent = variant === "sent";
  return (
    <div
      className="absolute hidden lg:block pointer-events-none select-none"
      style={{
        top,
        left,
        right,
        animation: `message-bubble 5s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <div
        className="px-3 py-1.5 rounded-xl text-[10px] max-w-[140px]"
        style={{
          background: isSent
            ? "rgba(34, 197, 94, 0.12)"
            : "rgba(99, 102, 241, 0.1)",
          border: `1px solid ${isSent ? "rgba(34, 197, 94, 0.2)" : "rgba(99, 102, 241, 0.15)"}`,
          color: isSent ? "rgba(134, 239, 172, 0.7)" : "rgba(165, 180, 252, 0.7)",
          borderBottomRightRadius: isSent ? "4px" : "12px",
          borderBottomLeftRadius: isSent ? "12px" : "4px",
        }}
      >
        {text}
      </div>
    </div>
  );
}

/* ───────── Reusable "Developed by" footer block (same as LoginPage) ───────── */
const DevelopedBy = () => (
  <div className="flex flex-col">
    <span className="text-gray-300/50 text-xs leading-none">Developed by</span>
    <a
      href="https://www.theabhipatel.com/"
      target="_theabhipatel"
      rel="noopener noreferrer"
    >
      <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 bg-clip-text text-lg leading-none font-semibold tracking-wide text-transparent">
        TheAbhiPatel
      </span>
    </a>
  </div>
);

/* ───────────────────────── FEATURES DATA ───────────────────────── */
const features = [
  {
    icon: GitBranch,
    title: "Visual Flow Builder",
    desc: "Design complex conversational flows with an intuitive drag-and-drop node editor. Connect messages, conditions, and actions visually — no coding required.",
    gradient: "from-brand-500 to-purple-600",
    bg: "rgba(99, 102, 241, 0.08)",
    border: "rgba(99, 102, 241, 0.15)",
  },
  {
    icon: Bot,
    title: "Multi-Bot Management",
    desc: "Create and manage multiple WhatsApp bots from a single dashboard. Each bot gets its own flows, settings, and analytics.",
    gradient: "from-emerald-500 to-teal-600",
    bg: "rgba(16, 185, 129, 0.08)",
    border: "rgba(16, 185, 129, 0.15)",
  },
  {
    icon: Cpu,
    title: "AI-Powered Responses",
    desc: "Integrate OpenAI to generate intelligent, context-aware replies. Automate nuanced conversations that feel natural and human-like.",
    gradient: "from-amber-500 to-orange-600",
    bg: "rgba(245, 158, 11, 0.08)",
    border: "rgba(245, 158, 11, 0.15)",
  },
  {
    icon: MessagesSquare,
    title: "Live Conversations",
    desc: "Monitor real-time conversations, view message history, and track user sessions across all your bots in one unified inbox.",
    gradient: "from-cyan-500 to-blue-600",
    bg: "rgba(6, 182, 212, 0.08)",
    border: "rgba(6, 182, 212, 0.15)",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Track active sessions, message volume, completion rates, and bot performance with a real-time analytics overview.",
    gradient: "from-violet-500 to-purple-600",
    bg: "rgba(139, 92, 246, 0.08)",
    border: "rgba(139, 92, 246, 0.15)",
  },
  {
    icon: Shield,
    title: "Secure & Encrypted",
    desc: "Role-based access control, encrypted credentials, and secure API integrations keep your data and conversations safe.",
    gradient: "from-rose-500 to-pink-600",
    bg: "rgba(244, 63, 94, 0.08)",
    border: "rgba(244, 63, 94, 0.15)",
  },
];

/* ───────────────────────── HOW IT WORKS DATA ───────────────────────── */
const steps = [
  {
    number: "01",
    title: "Create a Bot",
    desc: "Set up your WhatsApp bot in seconds with your API credentials and webhook configuration.",
    icon: Settings2,
  },
  {
    number: "02",
    title: "Build Your Flow",
    desc: "Design conversational flows using the visual node editor — add messages, conditions, delays, and actions.",
    icon: Layers,
  },
  {
    number: "03",
    title: "Deploy & Automate",
    desc: "Activate your flow and let WA Flow Builder handle conversations automatically, 24/7.",
    icon: Zap,
  },
];

/* ═══════════════════════════════════════════════════════════════════
   HOME PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface-900 text-white overflow-x-hidden font-sans">
      {/* Inject keyframe animations */}
      <style>{animationStyles}</style>

      {/* ──────── NAVBAR ──────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/40 transition-shadow duration-300">
              <MessageSquare className="w-[18px] h-[18px] text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              WA Flow Builder
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2 text-sm font-medium text-surface-300 hover:text-white transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className="px-5 py-2 text-sm font-semibold rounded-lg text-white transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                boxShadow:
                  "0 4px 15px rgba(79, 70, 229, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 6px 25px rgba(79, 70, 229, 0.5), 0 1px 3px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 15px rgba(79, 70, 229, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)";
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ──────── HERO SECTION ──────── */}
      <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-36 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradient orbs */}
          <div
            className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full animate-pulse-soft"
            style={{
              background:
                "radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full animate-pulse-soft"
            style={{
              background:
                "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
              filter: "blur(60px)",
              animationDelay: "1s",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 60%)",
              filter: "blur(100px)",
            }}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* ════ ANIMATED FLOW DIAGRAM (SVG) ════ */}
          <svg
            className="absolute inset-0 w-full h-full hidden lg:block"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* Flow path: left side curved downward */}
            <FlowPath
              d="M 80 120 C 80 220, 160 180, 200 280 S 140 400, 100 480"
              color="rgba(99, 102, 241, 0.1)"
              dotColor="rgba(129, 140, 248, 0.5)"
              delay={0}
              duration={5}
            />
            {/* Flow path: right side curve */}
            <FlowPath
              d="M 1300 100 C 1250 200, 1180 160, 1200 300 S 1280 380, 1250 500"
              color="rgba(139, 92, 246, 0.1)"
              dotColor="rgba(167, 139, 250, 0.5)"
              delay={1.5}
              duration={6}
            />
            {/* Flow path: center-left branch */}
            <FlowPath
              d="M 200 80 Q 300 150 250 250 T 180 420"
              color="rgba(34, 197, 94, 0.08)"
              dotColor="rgba(74, 222, 128, 0.4)"
              delay={2.5}
              duration={5.5}
            />
            {/* Flow path: center-right */}
            <FlowPath
              d="M 1100 60 Q 1050 180 1120 280 T 1080 460"
              color="rgba(6, 182, 212, 0.08)"
              dotColor="rgba(34, 211, 238, 0.4)"
              delay={3}
              duration={7}
            />
          </svg>

          {/* ════ FLOATING NODES ════ */}
          <FloatingNode
            top="18%"
            left="6%"
            label="Start Trigger"
            color="rgba(34, 197, 94, 0.2)"
            icon={Zap}
            delay={0}
          />
          <FloatingNode
            top="30%"
            right="5%"
            label="Send Message"
            color="rgba(99, 102, 241, 0.2)"
            icon={MessageSquare}
            delay={1.5}
          />
          <FloatingNode
            top="65%"
            left="4%"
            label="AI Response"
            color="rgba(245, 158, 11, 0.2)"
            icon={Cpu}
            delay={3}
          />
          <FloatingNode
            top="55%"
            right="3%"
            label="Condition"
            color="rgba(139, 92, 246, 0.2)"
            icon={GitBranch}
            delay={2}
          />
          <FloatingNode
            top="80%"
            right="8%"
            label="Bot Action"
            color="rgba(6, 182, 212, 0.2)"
            icon={Bot}
            delay={4}
          />

          {/* ════ FLOATING MESSAGE BUBBLES ════ */}
          <MessageBubble
            top="22%"
            right="14%"
            text="Hi! How can I help?"
            variant="received"
            delay={0.5}
          />
          <MessageBubble
            top="40%"
            left="8%"
            text="I'd like to place an order"
            variant="sent"
            delay={2}
          />
          <MessageBubble
            top="72%"
            right="12%"
            text="Order confirmed! ✅"
            variant="received"
            delay={3.5}
          />
          <MessageBubble
            top="85%"
            left="10%"
            text="Thank you!"
            variant="sent"
            delay={4.5}
          />

          {/* ════ PARTICLE DOTS ════ */}
          <ParticleDots />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-brand-300 mb-8 animate-fade-in"
            style={{
              background: "rgba(99, 102, 241, 0.1)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
            }}
          >
            <Zap className="w-3.5 h-3.5" />
            WhatsApp Automation Made Simple
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Build Powerful WhatsApp
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #818cf8, #a78bfa, #c084fc)",
              }}
            >
              Automation Flows
            </span>{" "}
            Visually
          </h1>

          <p
            className="text-base sm:text-lg text-surface-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Drag, drop, and deploy conversational experiences in minutes.
            Design complex flows, integrate AI responses, and manage multiple
            bots — all from one intuitive platform.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/login"
              className="group inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-xl text-white transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                boxShadow:
                  "0 4px 20px rgba(79, 70, 229, 0.35), 0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 30px rgba(79, 70, 229, 0.5), 0 2px 4px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 20px rgba(79, 70, 229, 0.35), 0 2px 4px rgba(0, 0, 0, 0.2)";
              }}
            >
              Start Building for Free
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-medium rounded-xl text-surface-300 hover:text-white transition-all duration-200"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              Explore Features
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ──────── FEATURES SECTION ──────── */}
      <section id="features" className="relative py-24 lg:py-32 overflow-hidden">
        {/* Subtle divider */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent)",
          }}
        />

        {/* Section background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Faint hexagonal / dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(129,140,248,0.8) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Side glow */}
          <div
            className="absolute top-1/4 -left-20 w-[300px] h-[300px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute bottom-1/4 -right-20 w-[300px] h-[300px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* Decorative flow lines */}
          <svg className="absolute inset-0 w-full h-full hidden lg:block" xmlns="http://www.w3.org/2000/svg">
            <FlowPath
              d="M 60 200 C 120 300, 80 400, 140 500"
              color="rgba(99, 102, 241, 0.06)"
              dotColor="rgba(129, 140, 248, 0.3)"
              delay={0.5}
              duration={6}
            />
            <FlowPath
              d="M 1350 150 C 1280 280, 1320 350, 1260 500"
              color="rgba(139, 92, 246, 0.06)"
              dotColor="rgba(167, 139, 250, 0.3)"
              delay={2}
              duration={7}
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-medium text-brand-300 mb-4"
              style={{
                background: "rgba(99, 102, 241, 0.1)",
                border: "1px solid rgba(99, 102, 241, 0.15)",
              }}
            >
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Everything You Need to{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #818cf8, #a78bfa, #c084fc)",
                }}
              >
                Automate
              </span>
            </h2>
            <p className="text-surface-400 max-w-xl mx-auto">
              A complete toolkit for building, deploying, and managing WhatsApp
              automation — from visual flow design to AI-powered conversations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(15, 23, 42, 0.5)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    f.border;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px rgba(0,0,0,0.3), 0 0 0 1px ${f.border}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255, 255, 255, 0.06)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Accent line */}
                <div
                  className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${f.border}, transparent)`,
                  }}
                />

                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: f.bg,
                    border: `1px solid ${f.border}`,
                  }}
                >
                  <f.icon className="w-5 h-5 text-brand-400" />
                </div>

                <h3 className="text-base font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-surface-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── HOW IT WORKS SECTION ──────── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent)",
          }}
        />

        {/* Section background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 60%)",
              filter: "blur(80px)",
            }}
          />
          {/* Decorative sparkle dots */}
          {[
            { top: "20%", left: "10%", delay: 0 },
            { top: "30%", right: "15%", delay: 1.5 },
            { top: "70%", left: "20%", delay: 3 },
            { top: "60%", right: "10%", delay: 2 },
          ].map((s, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full hidden lg:block"
              style={{
                top: s.top,
                left: s.left,
                right: (s as any).right,
                background: "rgba(129, 140, 248, 0.6)",
                animation: `sparkle 3s ease-in-out infinite`,
                animationDelay: `${s.delay}s`,
                boxShadow: "0 0 6px rgba(129, 140, 248, 0.4)",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-medium text-brand-300 mb-4"
              style={{
                background: "rgba(99, 102, 241, 0.1)",
                border: "1px solid rgba(99, 102, 241, 0.15)",
              }}
            >
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Up and Running in{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #818cf8, #a78bfa, #c084fc)",
                }}
              >
                3 Simple Steps
              </span>
            </h2>
            <p className="text-surface-400 max-w-lg mx-auto">
              Go from zero to a fully automated WhatsApp experience in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting line (desktop only) */}
            <div
              className="hidden md:block absolute top-[52px] left-[16.66%] right-[16.66%] h-px"
              style={{
                background:
                  "linear-gradient(90deg, rgba(99,102,241,0.15), rgba(99,102,241,0.3), rgba(99,102,241,0.15))",
              }}
            />
            {/* Animated dot on connecting line */}
            <div
              className="hidden md:block absolute top-[49px] h-[7px] w-[7px] rounded-full"
              style={{
                background: "rgba(129, 140, 248, 0.7)",
                boxShadow: "0 0 8px rgba(129, 140, 248, 0.5)",
                left: "16.66%",
                animation: "drift-right 5s linear infinite",
              }}
            />

            {steps.map((s) => (
              <div key={s.number} className="relative text-center group">
                {/* Step number circle */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div
                    className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "rgba(99, 102, 241, 0.08)",
                      border: "1px solid rgba(99, 102, 241, 0.15)",
                      boxShadow: "0 4px 20px rgba(99, 102, 241, 0.08)",
                      animation: "node-pulse 3s ease-in-out infinite",
                    }}
                  >
                    <s.icon className="w-7 h-7 text-brand-400" />
                  </div>
                  <span
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-lg text-[11px] font-bold flex items-center justify-center text-white"
                    style={{
                      background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                      boxShadow: "0 2px 8px rgba(79, 70, 229, 0.4)",
                    }}
                  >
                    {s.number}
                  </span>
                </div>

                <h3 className="text-base font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-surface-400 leading-relaxed max-w-xs mx-auto">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── CTA SECTION ──────── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent)",
          }}
        />

        {/* Section background */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full hidden lg:block" xmlns="http://www.w3.org/2000/svg">
            <FlowPath
              d="M 100 100 C 200 200, 300 100, 400 250 S 600 300, 700 200"
              color="rgba(99, 102, 241, 0.05)"
              dotColor="rgba(129, 140, 248, 0.25)"
              delay={1}
              duration={8}
            />
            <FlowPath
              d="M 900 300 C 1000 200, 1100 350, 1200 250 S 1300 100, 1400 200"
              color="rgba(139, 92, 246, 0.05)"
              dotColor="rgba(167, 139, 250, 0.25)"
              delay={3}
              duration={9}
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div
            className="rounded-3xl p-10 sm:p-14 relative overflow-hidden"
            style={{
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(99, 102, 241, 0.15)",
              backdropFilter: "blur(16px)",
            }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), rgba(139, 92, 246, 0.5), transparent)",
              }}
            />

            {/* Background orb */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
                filter: "blur(50px)",
              }}
            />

            {/* Decorative corner sparkles */}
            <div
              className="absolute top-4 left-4 w-1 h-1 rounded-full"
              style={{
                background: "rgba(129, 140, 248, 0.6)",
                animation: "sparkle 2.5s ease-in-out infinite",
                boxShadow: "0 0 4px rgba(129, 140, 248, 0.3)",
              }}
            />
            <div
              className="absolute bottom-4 right-4 w-1 h-1 rounded-full"
              style={{
                background: "rgba(167, 139, 250, 0.6)",
                animation: "sparkle 2.5s ease-in-out infinite",
                animationDelay: "1.2s",
                boxShadow: "0 0 4px rgba(167, 139, 250, 0.3)",
              }}
            />
            <div
              className="absolute top-4 right-4 w-1 h-1 rounded-full"
              style={{
                background: "rgba(129, 140, 248, 0.4)",
                animation: "sparkle 3s ease-in-out infinite",
                animationDelay: "0.7s",
              }}
            />

            <div className="relative z-10">
              <div
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-brand-500/30"
                style={{ animation: "node-pulse 2.5s ease-in-out infinite" }}
              >
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight">
                Ready to Automate Your
                <br />
                WhatsApp Conversations?
              </h2>
              <p className="text-surface-400 mb-8 max-w-md mx-auto">
                Join WA Flow Builder and start building intelligent chatbot
                flows today. No credit card required.
              </p>
              <Link
                to="/login"
                className="group inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  boxShadow:
                    "0 4px 20px rgba(79, 70, 229, 0.35), 0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 8px 30px rgba(79, 70, 229, 0.5), 0 2px 4px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 4px 20px rgba(79, 70, 229, 0.35), 0 2px 4px rgba(0, 0, 0, 0.2)";
                }}
              >
                Get Started Now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── FOOTER ──────── */}
      <footer className="relative">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <DevelopedBy />
            <p className="text-surface-600 text-xs">
              © {new Date().getFullYear()} WA Flow Builder · Secure & Encrypted
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
