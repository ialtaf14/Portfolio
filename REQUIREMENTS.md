# Requirements — Altaf Khan Portfolio

This is a **React (JavaScript)** project. Dependencies are managed via `npm` / `package.json`, NOT `pip` / `requirements.txt`.

---

## System Requirements

| Tool | Minimum Version | Check Command |
|------|----------------|---------------|
| Node.js | **v18.0.0+** | `node --version` |
| npm | **v9.0.0+** | `npm --version` |
| Git | Any recent | `git --version` |

---

## Node.js Dependencies (Auto-installed via `npm install`)

### Core Framework
- `react` ^19.0.0
- `react-dom` ^19.0.0
- `react-router-dom` ^7.5.1
- `react-scripts` 5.0.1

### UI & Animations
- `framer-motion` ^11.15.0
- `lucide-react` ^0.507.0
- `tailwindcss-animate` ^1.0.7

### UI Primitives (Radix UI / shadcn)
- `@radix-ui/react-accordion` ^1.2.8
- `@radix-ui/react-dialog` ^1.1.11
- `@radix-ui/react-dropdown-menu` ^2.1.12
- `@radix-ui/react-tooltip` ^1.2.4
- *(and other @radix-ui/* packages — see package.json)*

### Utilities
- `axios` ^1.8.4
- `clsx` ^2.1.1
- `tailwind-merge` ^3.2.0
- `class-variance-authority` ^0.7.1
- `cmdk` ^1.1.1
- `date-fns` ^3.6.0
- `zod` ^3.24.4
- `sonner` ^2.0.3

### Dev Dependencies
- `@craco/craco` ^7.1.0
- `tailwindcss` ^3.4.17
- `autoprefixer` ^10.4.20
- `postcss` ^8.4.49
- `eslint` 9.23.0

---

## Installation Command

```bash
npm install --legacy-peer-deps
```

> ⚠️ The `--legacy-peer-deps` flag is required due to React 19 peer dependency resolution differences.

---

## Optional: GitHub API Token

To enable live GitHub repository fetching without rate limits, create a `.env` file:

```env
REACT_APP_GITHUB_TOKEN=ghp_your_token_here
REACT_APP_GITHUB_USERNAME=ialtaf14
```

Get a token at: https://github.com/settings/tokens (No special scopes needed for public repos)
