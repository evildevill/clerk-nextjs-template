# Clerk Next.js Template

A modern, production-ready Next.js template featuring authentication with Clerk, beautiful UI with shadcn/ui, and full Tailwind CSS support. This template is designed for SaaS, dashboards, and web apps that need robust authentication, a clean design system, and rapid customization.

## Features

- **Authentication**: Seamless user management and session handling with [Clerk](https://clerk.com/)
- **UI Components**: Built with [shadcn/ui](https://ui.shadcn.com/) (Button, Badge, Avatar, Drawer, etc.)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) and [tw-animate-css](https://github.com/justinmahar/tw-animate-css) for utility-first, animated, and responsive design
- **Theming**: Light/dark mode with [next-themes](https://github.com/pacocoursey/next-themes)
- **TypeScript**: Strict, modern TS config for safety and DX
- **App Router**: Uses Next.js 15+ `/app` directory and server components
- **Pricing Table**: Example pricing table with Clerk integration
- **Protected Routes**: Middleware-protected dashboard and blog
- **Responsive Navbar**: Desktop/mobile navigation with user menu
- **Custom Fonts**: [Geist](https://vercel.com/font) for a clean, modern look

## Project Structure

```
app/
  layout.tsx         # Root layout with ClerkProvider, ThemeProvider, Navbar
  page.tsx           # Home page with pricing table
  dashboard/page.tsx # User dashboard (protected, shows user/session info)
  blog/page.tsx      # Blog (protected, plan-based access)
  globals.css        # Tailwind and custom styles
components/
  navbar.tsx         # Responsive navigation bar
  theme-provider.tsx # Theme context
  PricingTable/      # Pricing table component
  ui/                # shadcn/ui components (button, badge, avatar, drawer)
lib/
  utils.ts           # Utility functions
public/
  logo.png           # App logo
```

## Getting Started

1. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

2. **Configure Clerk**

   - Create a Clerk project at [clerk.com](https://clerk.com/)
   - Set your Clerk keys in `.env.local` (see Clerk docs)

3. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open your app**

   Visit [http://localhost:3000](http://localhost:3000)

## Customization

- Edit `app/page.tsx`, `app/dashboard/page.tsx`, and `app/blog/page.tsx` to change content and logic
- Add or modify shadcn/ui components in `components/ui/`
- Update Tailwind config and styles in `app/globals.css`
- Use the Navbar for navigation and user actions

## Deployment

Deploy easily to [Vercel](https://vercel.com/) or any platform supporting Next.js 15+ and environment variables.

## License

MIT
