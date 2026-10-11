# Lab Practice Hours

A small static website that shows which East West University lab has a
practice hour right now, and the practice hours for each day. Built with
Vite + React. No backend, no database, no login.

## Run locally

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the address shown in the terminal (usually http://localhost:5173).

## Update the schedule each semester

Only one file needs editing: `src/data/schedule.js`.

1. Change `lastUpdated` to today's date.
2. In `rooms`, set the real room number for each lab. Use `"TBD"` if unknown.
3. In `practiceHours`, add, remove, or edit lines. Each line is one block:

   ```js
   { roomId: "ai-638", day: "Sunday", start: "10:10", end: "13:20" },
   ```

   - `roomId` must match an `id` in `rooms`.
   - `day` is one of `Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`.
   - `start` and `end` use 24-hour time (`13:20` = 1:20 PM).

4. Commit and push. Vercel redeploys automatically.

## Build for production

```bash
npm run build
```

The output goes to the `dist` folder.

## Deploy on Vercel

1. Push this project to a GitHub repository.
2. Go to vercel.com, click **Add New… → Project**, and import the repository.
3. Framework preset: **Vite**.
4. Build command: `npm run build`
5. Output directory: `dist`
6. No environment variables are needed. Click **Deploy**.

## Project structure

```
src/
  data/schedule.js        <- all schedule data (edit this)
  utils/time.js           <- Dhaka time and active-hour helpers
  utils/format.js         <- room label helpers
  components/             <- Header, HappeningNow, UpNext, DaySchedule, WeekView
  App.jsx                 <- main layout, refreshes every 30 seconds
  App.css                 <- styles (light and dark)
  main.jsx                <- entry point
```

## Notes

- All times use the Asia/Dhaka timezone, so the site is correct even if the
  visitor's device is set to another timezone.
- The status refreshes every 30 seconds without a page reload.
- A practice hour is active when `start <= now < end`.
