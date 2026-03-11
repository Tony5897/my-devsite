# my-devsite (Legacy Portfolio)

Legacy portfolio site and deployment configuration (archived). This repository is retained as a reference for a prior production setup and is no longer actively maintained.

## Overview

- Static site portfolio (HTML/CSS/JS)
- Automated production deploy via GitHub Actions to a hosting provider (Hostinger)
- Optional GitHub Pages workflow for preview/testing

## Deployment (High Level)

This repo is configured to deploy automatically on pushes to the `main` branch using GitHub Actions.

### Workflows

- **Production deploy (SSH/SCP upload)**
  - Workflow: `.github/workflows/deploy-hostinger-ssh.yml`
  - Trigger: push to `main` (also supports manual `workflow_dispatch`)
  - Uses repository secrets for authentication (no credentials are stored in the repo)

- **Production deploy (remote git pull/reset)**
  - Workflow: `.github/workflows/deploy-hostinger-remote-git.yml`
  - Trigger: push to `main` (optional fallback)
  - Performs a server-side update using git commands

- **GitHub Pages (preview only)**
  - Workflow: `.github/workflows/deploy.yml`
  - Trigger: manual only (`workflow_dispatch`)
  - Does not affect production hosting

## Required Secrets (GitHub Actions)

Set these in: **Repository → Settings → Secrets and variables → Actions**

- `HOSTINGER_HOST`
- `HOSTINGER_PORT`
- `HOSTINGER_USERNAME`
- `HOSTINGER_SSH_KEY`

Optional (only if an FTP-based workflow is enabled):

- `FTP_HOST`
- `FTP_USERNAME`
- `FTP_PASSWORD`
- `FTP_PORT`

> Never commit credentials, private keys, or `.env` files to the repository.

## Deploy Process

Push to `main`:

```bash
git checkout main
git pull origin main --ff-only
git push origin main
