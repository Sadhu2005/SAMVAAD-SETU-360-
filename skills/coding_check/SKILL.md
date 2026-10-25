---
name: coding-check
description: >
  Autonomous code quality, syntax validation, type-safety verification, 
  and build-integrity checker. Use after making code edits, before commits,
  or when requested to review or verify code health.
---

# Coding Check & Code Quality Verification Skill

This skill enforces strict automated verification protocols across the codebase.

## 1. When to Trigger
- Immediately after writing or modifying TypeScript/JavaScript/CSS files.
- Before committing changes to git or opening a Pull Request.
- When the user asks to "check code", "verify build", "run lint", or "test".

## 2. Verification Protocol (Ordered Pipeline)

### Gate 1: Syntax & Type Checking (Zero-Tolerance)
Run TypeScript compiler check without emitting build artifacts:
```bash
npm run lint   # or: npx tsc --noEmit
```
- **Action on Failure**: Do not proceed. Inspect line numbers and type mismatch errors. Fix missing imports, undefined properties, or incorrect interfaces immediately.

### Gate 2: Full App Compilation
Verify the production bundler succeeds:
```bash
npm run build
```
- Ensure Vite/Next.js asset graph resolves without broken file paths or missing dependencies.

### Gate 3: Security & Dependency Audit
Check for known vulnerabilities or leaked API secrets:
```bash
npm audit --audit-level=high
```
- Verify no hardcoded API keys exist in client files (ensure `.env` variables use proper prefixes like `VITE_` or server-side env vars).

### Gate 4: Code Style & Anti-Patterns
- **Clean Console**: Remove stray `console.log` statements in production components.
- **Component Hygiene**: Ensure all React hooks follow rules of hooks (no conditional `useEffect` or early returns before hooks).
- **Responsive & Accessible**: Verify Tailwind CSS classes account for mobile viewports (`sm:`, `lg:`).

## 3. Remediation Workflow
1. Run Gate 1 (`tsc --noEmit`).
2. If errors exist, read the exact lines using `view_file`.
3. Apply targeted atomic edits using `replace_file_content`.
4. Rerun `tsc --noEmit` to confirm 0 errors.
5. Trigger final `npm run build` verification.
