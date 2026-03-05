#!/usr/bin/env node

import process from "node:process";

function parseRepo(input) {
  if (!input || !input.includes("/")) {
    throw new Error("Repository must be in 'owner/repo' format.");
  }
  const [owner, repo] = input.split("/", 2);
  if (!owner || !repo) {
    throw new Error("Repository must be in 'owner/repo' format.");
  }
  return { owner, repo };
}

function getRepository() {
  const fromArg = process.argv[2];
  const fromEnv = process.env.GITHUB_REPOSITORY;
  const fromPackage = "drruvari/lumberjack-theme";
  return fromArg ?? fromEnv ?? fromPackage;
}

async function main() {
  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
  if (!token) {
    throw new Error("Missing GITHUB_TOKEN (or GH_TOKEN) with admin rights on the repository.");
  }

  const repository = getRepository();
  const { owner, repo } = parseRepo(repository);
  const checks = (process.env.REQUIRED_CHECKS ?? "CI / ci")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const body = {
    required_status_checks: {
      strict: true,
      contexts: checks
    },
    enforce_admins: true,
    required_pull_request_reviews: {
      dismiss_stale_reviews: true,
      require_code_owner_reviews: false,
      required_approving_review_count: 1
    },
    restrictions: null,
    required_linear_history: true,
    allow_force_pushes: false,
    allow_deletions: false,
    block_creations: false,
    required_conversation_resolution: true,
    lock_branch: false,
    allow_fork_syncing: true
  };

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/branches/main/protection`, {
    method: "PUT",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub API error ${response.status}: ${text}`);
  }

  console.log(`Updated main branch protection for ${owner}/${repo}. Required checks: ${checks.join(", ")}`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Failed to update branch protection: ${message}`);
  process.exit(1);
});
