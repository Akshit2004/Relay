# Project Relay: Design System & UI/UX Guidelines

## Overview

Project Relay positions itself at the intersection of premium SaaS aesthetics and developer-grade density. The platform is designed to be the "Stripe for communications"—meaning the UI must inspire instant trust, feel blazing fast, and strip away all unnecessary friction. The interface is **dark-mode first**, relying on rich, curated dark hues, sleek contrasts, and an electric blue accent to signify speed and reliability.

The primary brand accent, Relay Blue (`{colors.brand-blue}`), is used sparingly but decisively: on the primary "Get API Key" CTAs, active sidebar indicators, and success states. The pairing of **Inter** (for all UI prose and headings) and **Geist Mono** (for code blocks, inline references, and logs) reinforces the developer-tool DNA.

**Key Characteristics:**
- **Dark-Mode Native:** Deep slate and charcoal surfaces instead of pure black, avoiding harsh contrasts.
- **Relay Blue Accent:** A vibrant, electric blue (`{colors.brand-blue}`) reserved for primary CTAs and active states.
- **Pill-shaped CTAs:** Primary marketing and core dashboard actions use heavily rounded buttons (`{rounded.full}`).
- **Typography:** Inter for all UI prose; Geist Mono exclusively for code blocks, JSON payloads, and logs.
- **Dense Developer Surfaces:** 3-column documentation layouts and data-heavy log tables use 14px body type for long-form reading and scanning.
- **Tight Corner Radii:** Dashboard panels and cards use `{rounded.lg}` (12px), creating a sharp, precise feel.

## Colors

### Brand & Accent
- **Relay Blue** (`{colors.brand-blue}`): Signature accent. Used for primary CTAs, active state indicators, and featured pricing tiers.
- **Deep Blue** (`{colors.brand-blue-deep}`): Pressed/hover variant of the brand accent.
- **Soft Blue** (`{colors.brand-blue-soft}`): Subtle background tint for active rows or selected states.
- **Brand Success** (`{colors.brand-success}`): Emerald green for "Delivered" statuses and success notifications.
- **Brand Warn** (`{colors.brand-warn}`): Amber/yellow for "Bounced" or rate-limited warnings.
- **Brand Error** (`{colors.brand-error}`): Crimson red for "Failed" logs, required fields, and destructive actions.

### Surface (Dark-Mode Default)
- **Canvas Dark** (`{colors.canvas-dark}`): Primary page and background (`#0B0D10` or similar deep slate).
- **Surface** (`{colors.surface}`): Standard card and panel backgrounds, slightly elevated from canvas.
- **Surface Soft** (`{colors.surface-soft}`): Quieter section backgrounds, table headers, and inactive tabs.
- **Surface Code** (`{colors.surface-code}`): Pitch dark code-block wrapper background.
- **Hairline** (`{colors.hairline}`): 1px borders for cards and primary dividers (subtle white/slate opacity).
- **Hairline Soft** (`{colors.hairline-soft}`): Quieter table-row dividers.

### Text
- **Ink** (`{colors.ink}`): Pure white or off-white for primary headlines and active data.
- **Charcoal** (`{colors.charcoal}`): Standard body text (light gray in dark mode).
- **Slate** (`{colors.slate}`): Secondary text, metadata, and timestamps.
- **Steel** (`{colors.steel}`): Tertiary text, table headers, disabled states.
- **On Brand** (`{colors.on-brand}`): White or dark text specifically tuned to contrast against `{colors.brand-blue}`.

## Typography

### Font Family
**Inter** (primary): Variable typeface optimized for UI legibility. Used across every UI surface — body, headings, navigation, button labels.
**Geist Mono** (code): Monospace typeface used inside code blocks, JSON logs, API keys, and type signatures.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.hero-display}` | 72px | 600 | 1.05 | -2px | Marketing hero display ("The Easiest Infrastructure API") |
| `{typography.heading-1}` | 48px | 600 | 1.10 | -1px | Page-level headlines ("Your Dashboard") |
| `{typography.heading-2}` | 36px | 600 | 1.20 | -0.5px | Section headlines ("Recent Logs") |
| `{typography.heading-3}` | 24px | 600 | 1.25 | 0 | Subsection headers, Card titles |
| `{typography.body-md}` | 16px | 400 | 1.50 | 0 | Primary body text |
| `{typography.body-md-medium}` | 16px | 500 | 1.50 | 0 | Body emphasis |
| `{typography.body-sm}` | 14px | 400 | 1.50 | 0 | Dashboard tables, secondary body, navigation |
| `{typography.body-sm-medium}` | 14px | 500 | 1.50 | 0 | Active sidebar nav, button labels, tab labels |
| `{typography.caption}` | 13px | 400 | 1.40 | 0 | Timestamps, helper text, fine print |
| `{typography.code-md}` | 14px | 400 | 1.50 | 0 | JSON Log payloads, code block content |
| `{typography.code-sm}` | 13px | 400 | 1.40 | 0 | Request IDs, inline API references |

### Principles
- **Tight hero leading** (1.05) creates striking display headlines.
- **Dashboard density:** The core dashboard relies heavily on `{typography.body-sm}` (14px) to maximize data density in log tables and metric charts without sacrificing readability.
- **Monospace for Data:** Request IDs, API keys, and log payloads must ALWAYS use Geist Mono.

## Layout & Spacing

### Spacing System
- **Base unit**: 4px (8px primary increment).
- **Tokens**: `{spacing.xs}` (8px) · `{spacing.sm}` (12px) · `{spacing.md}` (16px) · `{spacing.lg}` (24px) · `{spacing.xl}` (32px) · `{spacing.section}` (64px).
- **Dashboard Gaps:** Use `{spacing.lg}` (24px) between major panels (e.g., between the Metrics chart and the Logs table). Use `{spacing.md}` (16px) inside cards.

### Grid & Container
- **Dashboard Layout:** Fixed left sidebar (~240px). Main content area stretches fluidly but constrains text-heavy forms to a max-width of ~800px.
- **Log Tables:** Full width of the container. Columns must flex gracefully, keeping Request IDs and Timestamps visible.

## Elevation & Depth

Relay is a highly functional, flat interface. Depth is achieved through border hairlines and subtle background shifts rather than heavy drop shadows.

| Level | Treatment | Use |
|---|---|---|
| 0 (flat) | No shadow; `{colors.hairline}` border | Default dashboard cards, log rows, inputs |
| 1 (subtle) | `rgba(0, 0, 0, 0.2) 0px 4px 12px 0px` | Hover-elevated interactive tiles, dropdown menus |
| 2 (modal) | `rgba(0, 0, 0, 0.4) 0px 24px 48px -12px` | Log detail modals, command palettes |

## Shapes & Border Radius

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | Inline code chips, status badges |
| `{rounded.sm}` | 6px | Sidebar nav items, small inputs |
| `{rounded.md}` | 8px | Standard inputs, code blocks |
| `{rounded.lg}` | 12px | Standard dashboard panels, modals, charts |
| `{rounded.full}` | 9999px | Primary CTA buttons, pill tabs, avatars |

## Components

### Buttons
**`button-primary`** — Electric blue pill.
- Background `{colors.brand-blue}`, text `{colors.on-brand}`, `{rounded.full}`. Used for "Generate API Key" or "Send Test Email".

**`button-secondary`** — Outlined or subtle pill.
- Background transparent, text `{colors.ink}`, border `1px solid {colors.hairline}`, `{rounded.full}`.

**`button-ghost`** — Quieter rectangular button (sidebar nav).
- Background transparent, text `{colors.slate}`, hover to `{colors.ink}`, `{rounded.sm}`.

### Inputs & Forms
**`text-input`** — Standard field for SMTP configs or template names.
- Background `{colors.canvas-dark}`, text `{colors.ink}`, border `1px solid {colors.hairline}`, `{rounded.md}`.
- **Focus state:** Border switches to `1px solid {colors.brand-blue}`. No thick outlines.

### Data Display
**`status-badge`** — Used extensively in logs.
- Delivered: Emerald background at 15% opacity, Emerald text. `{rounded.xs}`.
- Bounced: Amber background at 15% opacity, Amber text. `{rounded.xs}`.
- Failed: Crimson background at 15% opacity, Crimson text. `{rounded.xs}`.

**`log-table-row`** — Highly scannable list item.
- Padding `{spacing.sm} {spacing.md}`. Bottom border `1px solid {colors.hairline-soft}`.
- Hover state: Background shifts to `{colors.surface-soft}`. Cursor becomes pointer to open the detail modal.

**`code-block`** — Used for JSON payloads in log details and template editing.
- Background `{colors.surface-code}`, text `{colors.ink}`, `{typography.code-md}`, `{rounded.md}`.

## Do's and Don'ts

### Do
- Use `{colors.brand-blue}` sparingly. It should immediately draw the eye to the most important action.
- Ensure all technical data (API Keys, Request IDs, Timestamps) use `Geist Mono` to respect the developer context.
- Keep dashboard panels flat with a 1px `{colors.hairline}` border.
- Rely on opacity variations of a single base color for surfaces to maintain a cohesive dark mode.

### Don't
- Don't use heavy shadows on data tables or standard cards. It creates visual noise.
- Don't mix border radii. If a panel is 12px, keep all similar panels 12px.
- Don't center-align technical data or logs. Left-align for scannability.
- Don't use bright backgrounds for large surfaces. The UI must feel like a sleek IDE.
