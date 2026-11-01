# SYLVER: setup (about 15 minutes, all free)

## 1. Create the cloud database (Supabase)
1. Go to supabase.com, sign up, and create a **New project** (any name; pick a region near you; save the database password somewhere).
2. Open **SQL Editor -> New query**, paste the contents of `schema.sql`, and click **Run**.
3. Open **Authentication -> Providers -> Email**. For a personal app, switch **Confirm email** off so you can sign in straight away. (If you leave it on, you must click the link in the email once.)
4. Open **Project Settings -> API**. Copy the **Project URL** and the **anon public** key.
   Never use the `service_role` key anywhere in this app.

## 2. Connect the app
Open `config.js` and paste the two values:

    window.SYLVER_CONFIG={ supabaseUrl: "https://xxxx.supabase.co", supabaseAnonKey: "eyJ..." };

The anon key is designed to be public. Your data stays private because of the row-level security rules in `schema.sql`: each account can only read and write its own rows.

## 3. Put the folder online (HTTPS is required for installing)
Pick one:
- **Netlify Drop:** go to app.netlify.com/drop and drag the whole folder in. You get a link immediately.
- **GitHub Pages:** upload the folder's files to a repository, then Settings -> Pages -> deploy from the main branch.
Keep the folder structure as is (`icons/` stays a sub-folder).

## 4. Install on your phone
- **Android (Chrome):** open the link -> menu -> *Install app* / *Add to Home screen*.
- **iPhone (Safari):** open the link -> Share -> *Add to Home Screen*.

## 5. Sign in
Tap the cloud icon (next to the theme button) -> create an account -> sign in. Do the same on every device with the same email and password. A dot on the cloud icon shows sync status.

## Notes
- The app is local-first: it works offline and syncs when you're back online.
- Use **Export data / Import data** in the same dialog for backups.
- After you update the app files, bump `const C='sylver-v2'` in `sw.js` (e.g. to `sylver-v3`) so phones pick up the new version.
