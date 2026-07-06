# Tour Planner

Two trips (Kashmir & Kerala), a month calendar, and simple one-day tasks —
backed by Prisma + Postgres (Neon), validated with Zod, state managed with
Zustand, and the Add/Edit form built with React Hook Form.

Kept intentionally simple: a task only has a **title** and a **date**
(no location, description, or start/end time), and there's only the
month calendar view.

## File structure

```
tour-planner/
├── package.json
├── tsconfig.json
├── next.config.mjs
├── postcss.config.mjs
├── tailwind.config.js
├── .env.example
├── .gitignore
├── prisma/
│   ├── schema.prisma        # Trip + Task models
│   └── seed.ts              # seeds Kashmir & Kerala
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── globals.css
    │   ├── page.tsx                    # trip buttons + calendar + modal
    │   └── api/
    │       ├── trips/route.ts          # GET trips + tasks
    │       └── tasks/
    │           ├── route.ts            # POST create task
    │           └── [id]/route.ts       # PATCH update / DELETE task
    ├── components/
    │   ├── CalendarView.tsx            # FullCalendar month view
    │   └── TaskModal.tsx               # add/edit form (RHF + Zod)
    ├── lib/
    │   ├── prisma.ts
    │   └── validations.ts              # Zod schema: title, date, tripId
    └── store/
        └── useStore.ts                # Zustand: selected trip + modal state
```

## Setup — step by step

1. **Install Node.js 18.18+** if you don't have it.

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a free database at [neon.tech](https://neon.tech)**, copy the
   connection string, then:
   ```bash
   cp .env.example .env
   ```
   Paste your connection string into `DATABASE_URL` in `.env`
   (keep `?sslmode=require` at the end).

4. **Push the schema to your database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed the two trips**
   ```bash
   npm run db:seed
   ```

6. **Run it**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## How to use

- Click **Kashmir** or **Kerala** to switch trips.
- Click any day on the calendar, or the **+ Add Task** button, to add a task.
- Click a task to edit its title/date, or delete it.
- Drag a task to another day to reschedule it.
