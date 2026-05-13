# ⚡ ServicePulse

> ADKAR-powered IT adoption intelligence platform for enterprise service teams.

![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)
![Model](https://img.shields.io/badge/Framework-ADKAR-6366F1?style=for-the-badge)
![Built By](https://img.shields.io/badge/Built%20by-Monil%20Raval-blue?style=for-the-badge)

---

## What is ServicePulse?

ServicePulse applies the **ADKAR change management model** to IT service adoption.

Most adoption tools tell you *how many* people are using a tool. ServicePulse tells you *why* they are not — and exactly what to do about it.

```
Traditional approach          ServicePulse approach
─────────────────────         ──────────────────────
"Adoption is at 51%"    →     "Users are blocked at Knowledge stage"
"Send more emails"      →     "Deploy a plain-language quick guide"
"Run a survey"          →     "Measure Desire before Knowledge"
"Wait and see"          →     "Diagnose → Intervene → Measure"
```

---

## The ADKAR Model

ADKAR is a sequential change management framework developed by Prosci. Every user who fails to adopt a tool is blocked at one of five stages.

```
┌─────────────────────────────────────────────────────────────────────┐
│                         THE ADKAR MODEL                             │
├────────────┬────────────────────────────────┬───────────────────────┤
│  STAGE     │  QUESTION                       │  TARGET               │
├────────────┼────────────────────────────────┼───────────────────────┤
│ 📡 Awareness  │ Do they know it exists?      │ > 95%                 │
│ 💡 Desire     │ Do they want to use it?      │ > 80%                 │
│ 📚 Knowledge  │ Do they know how to use it?  │ > 85%                 │
│ ⚡ Ability    │ Can they do it independently? │ > 75%                 │
│ 🔁 Reinforcement│ Are they still using it?   │ > 70%                 │
└────────────┴────────────────────────────────┴───────────────────────┘

Key rule: ADKAR is sequential. Fix the lowest stage first.
If Knowledge is at 44%, sending Awareness emails is wasted effort.
```

---

## Features

### 📊 Dashboard
- ADKAR health score per tool
- Blocking stage identification
- Priority action recommendations
- Weekly trend tracking

### 🎯 ADKAR Model Explorer
- Interactive stage breakdown
- Recommended interventions per stage
- Visual flow diagram
- Measurement metrics

### 🛠 Tool Health Centre
- Full ADKAR profile per tool
- Blocking stage diagnosis
- Targeted intervention guidance

### 📣 Campaign Manager
- Active campaign tracking
- ADKAR-targeted templates
- Asset deployment status
- Communication kit by stage

---

## ADKAR in Practice

```
EXAMPLE: IT Self-Service Portal — ADKAR Diagnosis
──────────────────────────────────────────────────

Awareness     ████████████████████  72%  ✓ OK
Desire        ██████████████░░░░░░  55%  ⚠ Below target
Knowledge     █████████░░░░░░░░░░░  44%  ✗ BLOCKED HERE
Ability       ████████░░░░░░░░░░░░  38%  ✗ Blocked (cascades from Knowledge)
Reinforcement ██████████░░░░░░░░░░  51%  ✗ Blocked (cascades)

Diagnosis:    Knowledge is the primary blocker
Wrong action: Send more awareness emails (waste of effort)
Right action: Deploy plain-language quick guide + run demo workshop
Expected result: Knowledge → 70%+ within 3 weeks
```

---

## Tech Stack

```
Framework     React 18+
Styling       Inline styles — zero external CSS dependencies  
State         useState, useEffect hooks only
Charts        Pure React — no chart library needed
Bundle        Minimal — loads in under 1 second
```

---

## Getting Started

```bash
# Clone
git clone https://github.com/monilraval/servicepulse.git
cd servicepulse

# Install
npm install

# Run
npm start

# Build
npm run build
```

---

## About the Author

**Monil P Raval** — SAFe 6 certified Product Owner with hands-on experience driving platform adoption across multi-market B2B environments.

| | |
|---|---|
| LinkedIn | [linkedin.com/in/MonilRaval](https://linkedin.com/in/MonilRaval) |
| GitHub | [github.com/monilraval](https://github.com/monilraval) |
| Platform | [clarushorizon.com](https://clarushorizon.com) |

---

*ServicePulse is built on the principle that adoption failure is always diagnosable — and always fixable with the right intervention at the right stage.*
