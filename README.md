# ServicePulse — IT Service Adoption Intelligence Platform

> **Turning adoption data into action. Built by someone who has lived the adoption problem.**

---

## Why This Exists

After years of working at the intersection of IT service rollouts and end-user experience, I kept running into the same problem: adoption teams had data scattered across spreadsheets, email threads, and tribal knowledge. Nobody had a single, honest view of where adoption was breaking down — by service, by user segment, or by channel.

ServicePulse is the tool I kept wishing existed. It gives Adoption Leads, Service Owners, and IT change teams a unified intelligence layer across every service they're rolling out — in real time.

---

## What It Does

A working, browser-based Adoption Intelligence platform with **9 functional modules** — no installation, no backend, no framework dependencies.

### Module Overview

| Module | What It Solves |
|---|---|
| **Global Dashboard** | Monday morning view — adoption rates, at-risk services, active campaigns, recent feedback |
| **Rollout Tracker** | Live status of every IT service deployment — on track, at risk, completed. Filterable by status and region. |
| **Campaign Manager** | Manage adoption communication campaigns — reach, engagement rate, adoption lift before/after |
| **Channel Engagement** | Which channels actually drive adoption — portal, email, Teams, webinar, in-app. Self-service vs. assisted trend. |
| **User Feedback** | Aggregated user satisfaction scores, open feedback, themes analysis, per-service satisfaction ratings |
| **Adoption Heatmap** | Service × User Segment matrix — instantly shows where adoption is breaking down and which groups need focused enablement |
| **User Segments** | Adoption rates by user group, top barriers per segment, recommended enablement actions |
| **Enablement Plans** | Per-service training and communication plans — phase, completion %, actions, notes |
| **Stakeholder Map** | Influence/interest register with engagement status (Champion, Supportive, Neutral, Resistant) and action required |

---

## The Adoption Problem This Addresses

In a global IT environment, adoption failure rarely happens because the technology doesn't work. It happens because:

- **No one tracks who is actually using what** — at the segment level
- **Campaigns are launched without measuring lift** — so nobody knows if they worked
- **Feedback is collected but not acted on** — because there's no triage system
- **Stakeholders are managed reactively** — escalations replace relationship management
- **Enablement is one-size-fits-all** — despite users having very different needs

ServicePulse addresses each of these directly. The data model reflects real adoption challenges I've encountered across multi-region IT environments: field ops workers who are hard to reach, senior leadership who need executive-level communication, new joiners whose generic onboarding doesn't cover the tools they actually use.

---

## Key Metrics Tracked

**Adoption KPIs**
- Overall adoption rate across all services (% of target users active)
- Per-service adoption vs. rollout plan (gap analysis)
- Segment-level adoption breakdown
- Trend over time (8-week rolling average)

**Campaign Performance**
- Reach, engagement rate, and adoption lift per campaign
- Before/after comparison for completed campaigns
- Channel-level engagement rates

**User Satisfaction**
- Aggregate CSAT score (1-5 scale)
- Per-service satisfaction ratings
- Feedback theme analysis (training, usability, communication, support)
- Volume of unreviewed feedback items

**Channel Effectiveness**
- Monthly reach per channel
- Engagement rate per channel
- Self-service rate trend vs. assisted support
- Ticket deflection rate

---

## The Data Model

The platform is built around a realistic data scenario:

- **14 IT services** in various rollout phases (planning, active rollout, sustain)
- **8,400 global users** across 7 segments and multiple regions
- **6 active adoption campaigns** in Q2 2026
- **8 communication channels** tracked for engagement
- **8 stakeholders** mapped by influence, interest, and engagement status

The completeness scores, adoption gaps, and feedback patterns reflect real dynamics I've observed: IT teams adopting fastest, field operations teams requiring completely different enablement approaches, and senior leadership needing executive-format communication rather than standard end-user training.

---

## Design Decisions

**No build step, no framework, no CDN dependencies (beyond one Google Font).**
This is intentional. Adoption dashboards often need to be shared on internal networks, embedded in SharePoint, or presented on locked-down corporate machines. A single HTML file that works anywhere is more useful than a polished app that requires npm.

**All charts are drawn natively on Canvas API.**
No Chart.js, no D3, no external libraries. This keeps the footprint minimal and the load time instant.

**Data is separated from rendering logic.**
The `DATA` object at the top of the script would be replaced in production with fetch calls to ServiceNow, Power BI datasets, or a custom adoption tracking API. The rendering functions are decoupled from data source.

---

## Running It

```bash
git clone https://github.com/monilraval/servicepulse
cd servicepulse
open servicepulse.html
```

No install. No config. No environment variables. Open the file and it works.

---

## What This Is Not

This is not a replacement for ServiceNow, Power BI, or your organisation's existing tooling. It is a **decision support layer** — a way to surface adoption signals clearly enough that an Adoption Lead can walk into a stakeholder conversation with facts, not feelings.

The metrics here are ones I've found genuinely useful in practice: not every possible KPI, but the ones that actually drive decisions about where to focus campaign effort, which segments need targeted enablement, and which services need escalation before they miss their targets.

---

## Built By

Monil Raval — Product Owner and Operations professional with experience in digital platform adoption, PIM & eCommerce rollouts, and cross-functional stakeholder management in European B2B environments.

[LinkedIn](https://linkedin.com/in/monilraval) · [Portfolio](https://monilraval.github.io) · [GitHub](https://github.com/monilraval)

---

*Built from experience. Not from a tutorial.*
