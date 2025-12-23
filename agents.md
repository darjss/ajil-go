# Agent Guidelines for Ajil-Go

## Core Tech Stack
- **Framework:** Next.js 16 (App Router) + React 19
- **Language:** TypeScript 5+ (Strict Mode)
- **Styling:** Tailwind CSS v4 + `clsx` + `tailwind-merge`
- **UI Library:** shadcn/ui (Radix Primitives)
- **State Management:** TanStack Query v5 (Server State) + React Context (Global Client State)
- **Forms:** React Hook Form + Zod + `@hookform/resolvers`
- **Linting/Formatting:** Biome

## React & Next.js Best Practices

### 1. Server Components by Default
- **Default:** All components are Server Components unless `use client` is explicitly needed.
- **Client Boundary:** Move interactivity (onClick, useState, useEffect) to leaf components.
- **Data Fetching:** Fetch data directly in Server Components using async/await.

### 2. Component Structure
- **Co-location:** Keep related utilities, types, and sub-components near the feature.
- **Exports:** Use named exports for components.
- **Props:** Define props with `interface` or `type` and export them.
- **Composition:** Prefer composition (children prop) over prop drilling.

```tsx
// good
interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({ variant, children }: ButtonProps) { ... }
```

### 3. State Management
- **Server State:** Use `@tanstack/react-query` for all async data. NEVER put API data in `useState` unless absolutely necessary for UI transforms.
- **URL State:** Prefer URL search params for filters, pagination, and sorting (accessible & shareable).
- **Global State:** Use strict React Context only for true global data (Theme, Auth).

### 4. Forms & Validation
- **Schema First:** Define schemas with `zod`.
- **Hooks:** Use `useForm` with `zodResolver`.
- **UI:** Use shadcn `Form` components for consistent accessible markup.

```tsx
const formSchema = z.object({
  email: z.string().email(),
});

// Inside component
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
});
```

## TypeScript Guidelines

- **No `any`:** Never use `any`. Use `unknown` if strictly necessary and narrow the type.
- **Inference:** Let TypeScript infer return types for components and hooks.
- **Strictness:** Handle `null` and `undefined` explicitly.
- **Type Imports:** Use `import type { ... }` for type-only imports.

## Styling (Tailwind v4)

- **Utility First:** Use utility classes for layout, spacing, and colors.
- **Merger:** Always wrap dynamic classes in `cn(...)` (shadcn utility) to handle conflicts.
- **Consistency:** Use design tokens (bg-background, text-foreground) instead of raw colors (bg-white, text-black) for dark mode support.

```tsx
// good
<div className={cn("bg-primary text-primary-foreground p-4", className)}>
```
