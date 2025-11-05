my-devsite – Production deploy (Hostinger)

This repo is wired to deploy automatically to Hostinger whenever you push to the `main` branch. Do not change these settings unless you intend to replace the deployment method.

How it works (do not modify)
1) Deploy to Hostinger (SSH) – SCP upload to domain root
   - Workflow file: `.github/workflows/deploy-hostinger-ssh.yml`
   - Trigger: on push to `main` (also supports manual Run workflow)
   - Target path on server: `/home/u563366180/public_html`
   - Uses Hostinger SSH key (GitHub repo secrets) to upload static files
   - After upload, the workflow prints the first lines of `index.html` from the server for verification

2) Deploy to Hostinger (remote git pull) – server-side `git reset --hard`
   - Workflow file: `.github/workflows/deploy-hostinger-remote-git.yml`
   - Trigger: on push to `main` (optional fallback)
   - Target path on server: `/home/u563366180/public_html`
   - Forces the server repo remote to `git@github.com:Tony5897/my-devsite.git`, fetches `origin/main` and resets the working tree

3) GitHub Pages (preview only, manual)
   - Workflow file: `.github/workflows/deploy.yml`
   - Trigger: manual only (`workflow_dispatch`)
   - Does not affect Hostinger production; kept for optional previews

Required GitHub secrets (repository → Settings → Secrets and variables → Actions)
- `HOSTINGER_HOST` – SSH host (from hPanel)
- `HOSTINGER_PORT` – SSH port (e.g. 65002), or 22 if default
- `HOSTINGER_USERNAME` – SSH user (e.g. `u563366180`)
- `HOSTINGER_SSH_KEY` – Private key matching the SSH public key added in Hostinger
- (Optional, only if you run the FTP workflow) `FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_PORT`

Deploy process you should use
- Push to `main`:
  ```bash
  git checkout main
  git pull origin main --ff-only
  # merge your feature branch if needed
  # git merge --no-ff feature/test-environment -m "Deploy"
  git push origin main
  ```
- GitHub Actions will run the Hostinger deploy automatically. Check Actions → the latest runs named “Deploy to Hostinger (SSH)” and “Deploy to Hostinger”.

Cache busting
- `index.html` references CSS/JS with a version query (e.g. `styles.css?v=20251105-1`).
- When you want instant propagation, bump this version string in `index.html` and push to `main`.

Do not change
- Target path: `/home/u563366180/public_html` (this is the domain root for `tonymartinez.tech`).
- The two Hostinger workflows and their triggers.
- The cache-busting pattern in `index.html`.

If a deploy ever fails
1) Verify repo secrets are present and correct (host, port, user, SSH key).
2) Open the failed job’s logs. For SSH/remote-git deploys, the logs will show the exact command that failed.
3) If cache appears stale after a green deploy, purge cache in Hostinger hPanel (and Cloudflare if enabled) and hard refresh.

