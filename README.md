# Elektro-Tel AG Website

This is a **Next.js 15+** project using **Tailwind CSS** and a file-based CMS (Markdown/Netlify CMS).

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **CMS**: File-based (Markdown/Frontmatter in `content/` directory)
- **Deployment**: Optimized for Netlify (Static Export / Node)
- **Icons**: [Lucide React](https://lucide.dev/)

## Project Structure

```bash
/content          # Database: Markdown files for all pages/data
  /pages          # Standard pages (Home, About, etc.)
  /news           # Blog/News articles
  /jobs           # Job listings
  /partners       # Partner logos and links
  /references     # Reference projects
/public
  /admin          # CMS Dashboard configuration (Decap CMS)
  /uploads        # User-uploaded images
/src
  /app            # Next.js App Router pages
  /components     # React Components
    /blocks       # Dynamic Content Blocks (Hero, Services, etc.)
    /ui           # Primitive UI elements
  /lib            # Utilities and CMS fetching logic
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

3. **Build for production**:
   ```bash
   npm run build
   ```

## CMS (Content Management)

The content is managed via Markdown files in the `content/` folder.
In production, access the admin panel at `/admin/index.html`.

### Local Content Management
You can edit the `.md` files in `content/` directly. The structure is:
- **Frontmatter** (YAML at top): Metadata (title, date, images).
- **Body** (Markdown): The main text content.

## Key Configurations

- **Tailwind**: `tailwind.config.ts` - Custom colors (brand-red) and fonts.
- **Global CSS**: `src/app/globals.css` - CSS variables and base styles.

## Netlify Forms

The contact form uses [Netlify Forms](https://docs.netlify.com/forms/setup/).
- **Definition**: `public/__forms.html` (Hidden static file for build bots).
- **Component**: `src/components/ContactForm.tsx` (Client-side submission).

## Icons

We use `lucide-react`. New icons can be added in `ServicesBlock.tsx` or other components by importing them from the package.
