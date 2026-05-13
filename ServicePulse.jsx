import { useState, useEffect } from "react";

// ── ADKAR MODEL CORE ──
// Awareness → Desire → Knowledge → Ability → Reinforcement
const ADKAR_STAGES = [
  {
    id: "awareness",
    label: "Awareness",
    short: "A",
    color: "#6366F1",
    bg: "rgba(99,102,241,0.1)",
    border: "rgba(99,102,241,0.3)",
    icon: "📡",
    desc: "Does the user know the change is happening?",
    question: "Do employees know this tool exists?",
    actions: [
      "Send launch announcement email to all affected users",
      "Post on company intranet and Teams channels",
      "Brief managers to cascade to their teams",
      "Add tool to IT newsletter and digital signage"
    ],
    metric: "% of users who have heard of the tool",
    target: "95%"
  },
  {
    id: "desire",
    label: "Desire",
    short: "D",
    color: "#EC4899",
    bg: "rgba(236,72,153,0.1)",
    border: "rgba(236,72,153,0.3)",
    icon: "💡",
    desc: "Does the user want to adopt the change?",
    question: "Do employees want to use this tool?",
    actions: [
      "Communicate clear 'what's in it for me' message",
      "Share time-saving stats and peer success stories",
      "Manager endorsement and personal advocacy",
      "Run early adopter champion programme"
    ],
    metric: "% of users who say they intend to use the tool",
    target: "80%"
  },
  {
    id: "knowledge",
    label: "Knowledge",
    short: "K",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.3)",
    icon: "📚",
    desc: "Does the user know how to use the tool?",
    question: "Do employees know how to use this tool?",
    actions: [
      "Publish plain-language quick start guide",
      "Create FAQ document for top 10 questions",
      "Run live demo workshops (max 20 people)",
      "Record walkthrough video for async learning"
    ],
    metric: "% of users who completed onboarding",
    target: "85%"
  },
  {
    id: "ability",
    label: "Ability",
    short: "A",
    color: "#10B981",
    bg: "rgba(16,185,129,0.1)",
    border: "rgba(16,185,129,0.3)",
    icon: "⚡",
    desc: "Can the user actually perform the new behaviour?",
    question: "Can employees use the tool without help?",
    actions: [
      "Hands-on practice sessions with IT support present",
      "Create troubleshooting guide for common issues",
      "Set up dedicated support channel in Teams",
      "Office hours with IT experts for first 4 weeks"
    ],
    metric: "% of users who completed a task independently",
    target: "75%"
  },
  {
    id: "reinforcement",
    label: "Reinforcement",
    short: "R",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.3)",
    icon: "🔁",
    desc: "Is the behaviour being sustained over time?",
    question: "Are employees continuing to use the tool?",
    actions: [
      "Send monthly adoption progress updates to all users",
      "Recognise and reward teams with highest adoption",
      "Collect and act on user feedback visibly",
      "Share 'before vs after' impact stories quarterly"
    ],
    metric: "Monthly active users as % of total licensed",
    target: "70%"
  }
];

// ── TOOL DATA ──
const TOOLS = [
  { name: "Microsoft Teams",      category: "Collaboration", awareness: 96, desire: 88, knowledge: 84, ability: 81, reinforcement: 89, trend: "up"   },
  { name: "SharePoint Online",    category: "Collaboration", awareness: 94, desire: 82, knowledge: 76, ability: 72, reinforcement: 82, trend: "up"   },
  { name: "ServiceNow ITSM",      category: "Service Desk",  awareness: 88, desire: 71, knowledge: 65, ability: 60, reinforcement: 76, trend: "stable"},
  { name: "IT Self-Service Portal",category: "Self-Service", awareness: 72, desire: 55, knowledge: 44, ability: 38, reinforcement: 51, trend: "down" },
  { name: "Identity Mgmt (IAM)",  category: "Identity",      awareness: 61, desire: 48, knowledge: 36, ability: 30, reinforcement: 42, trend: "down" },
  { name: "Power BI",             category: "Analytics",     awareness: 84, desire: 70, knowledge: 62, ability: 55, reinforcement: 68, trend: "up"   },
];

// ── ADKAR SCORE ──
function adkarScore(tool) {
  return Math.round((tool.awareness + tool.desire + tool.knowledge + tool.ability + tool.reinforcement) / 5);
}

function adkarStage(tool) {
  const stages = ["awareness","desire","knowledge","ability","reinforcement"];
  for (const s of stages) {
    if (tool[s] < 60) return s;
  }
  return "reinforcement";
}

// ── COMPONENTS ──
function Badge({ label, color, bg }) {
  return (
    <span style={{ background: bg, color, border: `1px solid ${color}33`, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, textTransform: "uppercase", letterSpacing: 0.5 }}>
      {label}
    </span>
  );
}

function AdkarBar({ tool }) {
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
      {ADKAR_STAGES.map(s => {
        const val = tool[s.id];
        const ok = val >= 60;
        return (
          <div key={s.id} title={`${s.label}: ${val}%`}
            style={{ flex: 1, height: 6, borderRadius: 3, background: ok ? s.color : `${s.color}33`, transition: "background 0.3s" }} />
        );
      })}
    </div>
  );
}

function KpiCard({ label, value, sub, color }) {
  return (
    <div style={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 12, padding: "18px 20px", borderTop: `3px solid ${color}` }}>
      <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 800, fontFamily: "monospace", color: "#F9FAFB", marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 12, color: "#9CA3AF" }}>{sub}</div>
    </div>
  );
}

function StageProgress({ value, color, label }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
        <span style={{ color: "#D1D5DB" }}>{label}</span>
        <span style={{ fontFamily: "monospace", fontWeight: 700, color }}>{value}%</span>
      </div>
      <div style={{ background: "#1F2937", borderRadius: 4, height: 8, overflow: "hidden" }}>
        <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 4, transition: "width 1s ease" }} />
      </div>
    </div>
  );
}

// ── MAIN APP ──
export default function ServicePulse() {
  const [tab, setTab] = useState("dashboard");
  const [selectedTool, setSelectedTool] = useState(TOOLS[3]);
  const [selectedStage, setSelectedStage] = useState(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => { setTimeout(() => setAnimated(true), 200); }, []);

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "adkar",     label: "ADKAR Model" },
    { id: "tools",     label: "Tool Health" },
    { id: "campaigns", label: "Campaigns" },
    { id: "about",     label: "About" },
  ];

  const avgAdkar = Math.round(TOOLS.reduce((a,t) => a + adkarScore(t), 0) / TOOLS.length);
  const criticalTools = TOOLS.filter(t => adkarScore(t) < 60).length;
  const activeStage = selectedStage || ADKAR_STAGES[1];

  const S = {
    app:  { fontFamily: "'Inter', system-ui, sans-serif", background: "#030712", color: "#F9FAFB", minHeight: "100vh" },
    hdr:  { background: "#0D1117", borderBottom: "1px solid #1F2937", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 58, position: "sticky", top: 0, zIndex: 100 },
    nav:  { background: "#0D1117", padding: "0 24px", display: "flex", gap: 2, borderBottom: "1px solid #1F2937", overflowX: "auto" },
    main: { padding: 24, maxWidth: 1280, margin: "0 auto" },
    card: { background: "#111827", border: "1px solid #1F2937", borderRadius: 12, padding: 24 },
    h1:   { fontSize: 22, fontWeight: 800, marginBottom: 4, color: "#F9FAFB" },
    sub:  { fontSize: 13, color: "#6B7280", marginBottom: 24 },
    grid2:{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
    grid4:{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 24 },
    th:   { fontSize: 10, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: 1, padding: "0 0 12px", textAlign: "left", borderBottom: "1px solid #1F2937" },
    td:   { padding: "11px 0", fontSize: 13, borderBottom: "1px solid #0F172A", color: "#E5E7EB" },
  };

  return (
    <div style={S.app}>

      {/* HEADER */}
      <div style={S.hdr}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ background: "linear-gradient(135deg,#6366F1,#3B82F6)", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: -0.3 }}>ServicePulse</div>
            <div style={{ fontSize: 10, color: "#6B7280" }}>ADKAR-Powered IT Adoption Intelligence</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#6B7280" }}>
          <span style={{ width: 7, height: 7, background: "#10B981", borderRadius: "50%", display: "inline-block" }} />
          Live · Built by Monil Raval
        </div>
      </div>

      {/* NAV */}
      <div style={S.nav}>
        {tabs.map(t => (
          <div key={t.id} onClick={() => setTab(t.id)}
            style={{ padding: "13px 16px", fontSize: 13, fontWeight: 500, color: tab === t.id ? "#F9FAFB" : "#6B7280", borderBottom: tab === t.id ? "2px solid #6366F1" : "2px solid transparent", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s" }}>
            {t.label}
          </div>
        ))}
      </div>

      <div style={S.main}>

        {/* ── DASHBOARD ── */}
        {tab === "dashboard" && (
          <div>
            <div style={S.h1}>Adoption Dashboard</div>
            <div style={S.sub}>Real-time ADKAR health across all IT services · Infrastructure & Consumer Experience</div>

            <div style={S.grid4}>
              {[
                { label: "ADKAR Health Score", value: `${avgAdkar}%`, sub: "Average across all tools", color: "#6366F1" },
                { label: "Tools On Track", value: `${TOOLS.filter(t=>adkarScore(t)>=70).length}/${TOOLS.length}`, sub: "Above 70% ADKAR score", color: "#10B981" },
                { label: "Critical Tools", value: criticalTools, sub: "Blocking stage below 60%", color: "#EF4444" },
                { label: "Active Campaigns", value: "3", sub: "Running this month", color: "#F59E0B" },
              ].map((k,i) => (
                <div key={i} style={{ flex: 1, minWidth: 160 }}><KpiCard {...k} /></div>
              ))}
            </div>

            {/* ADKAR overview per tool */}
            <div style={{ ...S.card, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>ADKAR Health by Tool</div>
              <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 20 }}>Each bar segment = one ADKAR stage · Grey = below 60% threshold</div>
              <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                {ADKAR_STAGES.map(s => (
                  <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#9CA3AF" }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} /> {s.short}={s.label}
                  </div>
                ))}
              </div>
              {TOOLS.map((tool, i) => (
                <div key={i} style={{ marginBottom: 14, cursor: "pointer" }} onClick={() => { setSelectedTool(tool); setTab("tools"); }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{tool.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 11, color: "#6B7280" }}>{tool.category}</span>
                      <span style={{ fontSize: 12, fontFamily: "monospace", fontWeight: 700, color: adkarScore(tool) >= 70 ? "#10B981" : adkarScore(tool) >= 60 ? "#F59E0B" : "#EF4444" }}>{adkarScore(tool)}%</span>
                    </div>
                  </div>
                  <AdkarBar tool={tool} />
                </div>
              ))}
            </div>

            {/* Blocking stage analysis */}
            <div style={S.grid2}>
              <div style={S.card}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Tools Blocked By Stage</div>
                {ADKAR_STAGES.map(s => {
                  const blocked = TOOLS.filter(t => t[s.id] < 60).length;
                  return (
                    <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <div style={{ fontSize: 16 }}>{s.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                          <span style={{ color: s.color, fontWeight: 600 }}>{s.label}</span>
                          <span style={{ color: blocked > 0 ? "#EF4444" : "#10B981", fontFamily: "monospace" }}>{blocked} tool{blocked !== 1 ? "s" : ""}</span>
                        </div>
                        <div style={{ background: "#1F2937", borderRadius: 3, height: 5 }}>
                          <div style={{ width: `${(blocked/TOOLS.length)*100}%`, height: "100%", background: blocked > 0 ? "#EF4444" : "#10B981", borderRadius: 3 }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={S.card}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Priority Actions This Week</div>
                {[
                  { tool: "IT Self-Service Portal", stage: "Knowledge", action: "Deploy plain-language quick guide", urgency: "high" },
                  { tool: "Identity Mgmt (IAM)", stage: "Awareness", action: "Launch awareness email campaign", urgency: "high" },
                  { tool: "ServiceNow ITSM", stage: "Ability", action: "Run hands-on workshop — Supply Chain div", urgency: "med" },
                  { tool: "Power BI", stage: "Ability", action: "Office hours session scheduled Thursday", urgency: "med" },
                ].map((a, i) => (
                  <div key={i} style={{ background: "#0F172A", borderRadius: 8, padding: "10px 12px", marginBottom: 8, display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: a.urgency === "high" ? "#EF4444" : "#F59E0B", marginTop: 5, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{a.tool}</div>
                      <div style={{ fontSize: 11, color: "#9CA3AF" }}>{a.stage} gap · {a.action}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ADKAR MODEL ── */}
        {tab === "adkar" && (
          <div>
            <div style={S.h1}>The ADKAR Model</div>
            <div style={S.sub}>The framework that drives every adoption decision in ServicePulse · Click each stage to explore</div>

            {/* Stage selector */}
            <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
              {ADKAR_STAGES.map(s => (
                <div key={s.id} onClick={() => setSelectedStage(s)}
                  style={{ flex: 1, minWidth: 100, background: selectedStage?.id === s.id ? s.bg : "#111827", border: `1px solid ${selectedStage?.id === s.id ? s.color : "#1F2937"}`, borderRadius: 10, padding: "14px 12px", cursor: "pointer", textAlign: "center", transition: "all 0.2s" }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: selectedStage?.id === s.id ? s.color : "#F9FAFB" }}>{s.label}</div>
                  <div style={{ fontSize: 10, color: "#6B7280", marginTop: 3 }}>{s.desc.split("?")[0]}?</div>
                </div>
              ))}
            </div>

            {/* Stage detail */}
            <div style={{ ...S.card, borderTop: `3px solid ${activeStage.color}`, marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: activeStage.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
                  {activeStage.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: activeStage.color }}>{activeStage.label}</div>
                    <Badge label={`Target: ${activeStage.target}`} color={activeStage.color} bg={activeStage.bg} />
                  </div>
                  <div style={{ fontSize: 14, color: "#D1D5DB", marginBottom: 4 }}>{activeStage.desc}</div>
                  <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 20 }}>Key question: <em>"{activeStage.question}"</em></div>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, color: "#F9FAFB" }}>Recommended interventions:</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {activeStage.actions.map((a,i) => (
                      <div key={i} style={{ background: "#0F172A", borderRadius: 8, padding: "10px 12px", fontSize: 12, color: "#D1D5DB", display: "flex", gap: 8 }}>
                        <span style={{ color: activeStage.color, flexShrink: 0 }}>→</span> {a}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, background: "#0F172A", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#9CA3AF" }}>
                    <span style={{ color: activeStage.color, fontWeight: 600 }}>Measurement: </span>{activeStage.metric} · Target: <strong style={{ color: "#F9FAFB" }}>{activeStage.target}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* ADKAR flow diagram */}
            <div style={S.card}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>ADKAR Flow — How the Model Works</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                {ADKAR_STAGES.map((s, i) => (
                  <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ background: s.bg, border: `1px solid ${s.color}`, borderRadius: 8, padding: "10px 14px", textAlign: "center", minWidth: 90 }}>
                      <div style={{ fontSize: 16, marginBottom: 4 }}>{s.icon}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{s.label}</div>
                      <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 3 }}>Target {s.target}</div>
                    </div>
                    {i < 4 && <div style={{ color: "#374151", fontSize: 18, fontWeight: 300 }}>→</div>}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, padding: "12px 16px", background: "#0F172A", borderRadius: 8, fontSize: 12, color: "#9CA3AF", lineHeight: 1.7 }}>
                <strong style={{ color: "#F9FAFB" }}>Key principle:</strong> ADKAR is sequential. If a user is blocked at Knowledge, sending more Awareness emails wastes effort. Diagnose the blocking stage first, then apply the right intervention. ServicePulse identifies the exact stage where each tool is failing.
              </div>
            </div>
          </div>
        )}

        {/* ── TOOL HEALTH ── */}
        {tab === "tools" && (
          <div>
            <div style={S.h1}>Tool Health Centre</div>
            <div style={S.sub}>ADKAR breakdown for every tool · Click a tool to see its full adoption profile</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
              {/* Tool list */}
              <div style={S.card}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 14, color: "#9CA3AF" }}>SELECT A TOOL</div>
                {TOOLS.map((tool, i) => {
                  const score = adkarScore(tool);
                  const blocked = ADKAR_STAGES.find(s => tool[s.id] < 60);
                  return (
                    <div key={i} onClick={() => setSelectedTool(tool)}
                      style={{ background: selectedTool?.name === tool.name ? "#1F2937" : "transparent", borderRadius: 8, padding: "10px 12px", marginBottom: 4, cursor: "pointer", border: `1px solid ${selectedTool?.name === tool.name ? "#374151" : "transparent"}`, transition: "all 0.2s" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{tool.name}</div>
                        <span style={{ fontSize: 12, fontFamily: "monospace", fontWeight: 700, color: score >= 70 ? "#10B981" : score >= 60 ? "#F59E0B" : "#EF4444" }}>{score}%</span>
                      </div>
                      <AdkarBar tool={tool} />
                      {blocked && (
                        <div style={{ fontSize: 10, color: "#EF4444", marginTop: 4 }}>⚠ Blocked at {blocked.label}</div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Tool detail */}
              {selectedTool && (
                <div style={S.card}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{selectedTool.name}</div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <Badge label={selectedTool.category} color="#6366F1" bg="rgba(99,102,241,0.1)" />
                        <Badge label={`ADKAR: ${adkarScore(selectedTool)}%`} color={adkarScore(selectedTool) >= 70 ? "#10B981" : "#EF4444"} bg={adkarScore(selectedTool) >= 70 ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)"} />
                      </div>
                    </div>
                    <div style={{ fontSize: 32 }}>{selectedTool.trend === "up" ? "↑" : selectedTool.trend === "down" ? "↓" : "→"}</div>
                  </div>

                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 14, color: "#9CA3AF" }}>ADKAR STAGE BREAKDOWN</div>
                  {ADKAR_STAGES.map(s => {
                    const val = selectedTool[s.id];
                    const ok = val >= 60;
                    return (
                      <div key={s.id} style={{ background: ok ? "transparent" : `${s.color}08`, border: ok ? "none" : `1px solid ${s.color}22`, borderRadius: 8, padding: ok ? "0" : "10px 12px", marginBottom: ok ? 0 : 8 }}>
                        <StageProgress value={val} color={ok ? s.color : "#EF4444"} label={`${s.icon} ${s.label}`} />
                        {!ok && (
                          <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: -4, marginBottom: 4 }}>
                            ⚠ Below 60% threshold · Recommended: {s.actions[0]}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <div style={{ marginTop: 16, background: "#0F172A", borderRadius: 8, padding: "12px 14px" }}>
                    <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 8, color: "#F9FAFB" }}>
                      Primary Blocking Stage: <span style={{ color: ADKAR_STAGES.find(s => s.id === adkarStage(selectedTool))?.color }}>
                        {ADKAR_STAGES.find(s => s.id === adkarStage(selectedTool))?.label}
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: "#9CA3AF" }}>
                      Focus all campaign effort here first. Addressing earlier stages before this one wastes resources.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── CAMPAIGNS ── */}
        {tab === "campaigns" && (
          <div>
            <div style={S.h1}>Campaign Manager</div>
            <div style={S.sub}>ADKAR-targeted communication campaigns · Each campaign addresses a specific blocking stage</div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
              {[
                { name: "IT Self-Service Portal — Knowledge Drive", stage: "Knowledge", status: "Active", tools: "IT Self-Service Portal", start: "May 12", assets: ["Quick guide sent","FAQ published","Workshop scheduled May 16"], color: "#F59E0B" },
                { name: "IAM Awareness Campaign", stage: "Awareness", status: "Active", tools: "Identity Mgmt (IAM)", start: "May 10", assets: ["Launch email sent to all","Teams post published","Manager cascade email sent"], color: "#6366F1" },
                { name: "ServiceNow Ability Boost", stage: "Ability", status: "Planning", tools: "ServiceNow ITSM", start: "May 20", assets: ["Workshop agenda drafted","IT support allocated","Booking link created"], color: "#10B981" },
              ].map((c, i) => {
                const stage = ADKAR_STAGES.find(s => s.label === c.stage);
                return (
                  <div key={i} style={{ ...S.card, borderTop: `3px solid ${c.color}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <Badge label={c.status} color={c.status === "Active" ? "#10B981" : "#F59E0B"} bg={c.status === "Active" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)"} />
                      <Badge label={`ADKAR: ${c.stage}`} color={c.color} bg={`${c.color}18`} />
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 12 }}>Started {c.start}</div>
                    <div style={{ fontWeight: 600, fontSize: 11, color: "#9CA3AF", marginBottom: 8 }}>ASSETS DEPLOYED</div>
                    {c.assets.map((a,j) => (
                      <div key={j} style={{ fontSize: 11, color: "#D1D5DB", display: "flex", gap: 6, marginBottom: 4 }}>
                        <span style={{ color: "#10B981" }}>✓</span> {a}
                      </div>
                    ))}
                    {stage && (
                      <div style={{ marginTop: 12, background: "#0F172A", borderRadius: 6, padding: "8px 10px", fontSize: 11, color: "#9CA3AF" }}>
                        {stage.icon} Addressing: <span style={{ color: c.color }}>{stage.desc}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Campaign templates */}
            <div style={S.card}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Communication Templates by ADKAR Stage</div>
              <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 20 }}>Each template is designed to address a specific barrier in the ADKAR model</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }}>
                {ADKAR_STAGES.map(s => (
                  <div key={s.id} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10, padding: 14 }}>
                    <div style={{ fontSize: 20, marginBottom: 8 }}>{s.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 8 }}>{s.label}</div>
                    {[
                      s.id === "awareness"     ? ["Launch email","Intranet post","Manager brief"] :
                      s.id === "desire"        ? ["Value email","Success story","Champion msg"] :
                      s.id === "knowledge"     ? ["Quick guide","FAQ doc","Demo video"] :
                      s.id === "ability"       ? ["Workshop","Office hours","Support guide"] :
                                                 ["Progress update","Recognition","Impact story"]
                    ][0].map((t,i) => (
                      <div key={i} style={{ fontSize: 10, color: "#9CA3AF", padding: "3px 0", borderBottom: "1px solid #1F2937", display: "flex", gap: 4 }}>
                        <span style={{ color: s.color }}>→</span> {t}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ABOUT ── */}
        {tab === "about" && (
          <div>
            <div style={S.h1}>About ServicePulse</div>
            <div style={S.sub}>Built to demonstrate ADKAR-driven adoption thinking for enterprise IT environments</div>

            <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20 }}>
              <div style={{ ...S.card, textAlign: "center" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#6366F1,#3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, margin: "0 auto 14px" }}>MR</div>
                <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>Monil P Raval</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 20 }}>SAFe 6 POPM · Adoption Lead · Change Management</div>
                {[
                  { icon: "🔗", text: "linkedin.com/in/MonilRaval", href: "https://linkedin.com/in/MonilRaval" },
                  { icon: "⚙️", text: "github.com/monilraval", href: "https://github.com/monilraval" },
                  { icon: "🌐", text: "clarushorizon.com", href: "https://clarushorizon.com" },
                ].map((l,i) => (
                  <a key={i} href={l.href} target="_blank" rel="noreferrer"
                    style={{ background: "#1F2937", borderRadius: 8, padding: "8px 12px", fontSize: 11, color: "#9CA3AF", textDecoration: "none", display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    {l.icon} {l.text}
                  </a>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={S.card}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#6366F1", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>What ServicePulse Does</div>
                  <p style={{ fontSize: 13, color: "#D1D5DB", lineHeight: 1.8 }}>
                    ServicePulse applies the <strong style={{ color: "#F9FAFB" }}>ADKAR change management model</strong> to IT service adoption. Instead of tracking only whether employees have access to a tool, it diagnoses <em>exactly which stage of the adoption journey</em> is failing — and recommends the precise intervention needed to unblock progress.
                  </p>
                  <p style={{ fontSize: 13, color: "#D1D5DB", lineHeight: 1.8, marginTop: 10 }}>
                    Built to demonstrate the Adoption Lead mindset: data-driven, user-centric, and grounded in proven change management frameworks.
                  </p>
                </div>

                <div style={S.card}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#6366F1", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Relevant Experience</div>
                  {[
                    { date: "2023–2024", title: "Product Owner & Adoption Lead — AGCO/Fendt", desc: "Multi-market platform adoption across 4 brands, European markets. Go-live readiness, stakeholder communication, user feedback loops." },
                    { date: "2025–now",  title: "Founder — ClarusHorizon.com", desc: "User adoption strategy for AI productivity platform — onboarding flows, engagement analytics, content-led growth." },
                    { date: "2022–2023", title: "KPI Analyst — Robert Bosch GmbH", desc: "Adoption dashboards for P2P transformation portfolio across automotive supplier ecosystem." },
                  ].map((e,i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: 14, marginBottom: 14 }}>
                      <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "monospace", paddingTop: 2 }}>{e.date}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{e.title}</div>
                        <div style={{ fontSize: 12, color: "#9CA3AF", lineHeight: 1.5 }}>{e.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={S.card}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#6366F1", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Certifications</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["SAFe 6 POPM — 2024","Elements of AI — 2026","Claude 101 — Anthropic","Google Analytics","Salesforce Admin & CPQ","Agile PM with Jira"].map((c,i) => (
                      <span key={i} style={{ background: "#1F2937", border: "1px solid #374151", borderRadius: 6, padding: "4px 12px", fontSize: 11, color: "#D1D5DB" }}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
