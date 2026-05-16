# Pre-Push Production Readiness Guide for LLM Agents

This file must be read before any LLM agent pushes changes to the repository.

## Goal

Before `git push`, verify that the website is production-ready, safe to deploy, and does not include avoidable quality, legal, SEO, accessibility, or configuration issues.

## Required Checks Before Push

1. Review the current worktree with `git status --short`.
2. Review all changed files with `git diff`.
3. Confirm that no secrets, private keys, API tokens, passwords, customer data, or real `.env` files are being committed.
4. Confirm that any analytics or third-party tracking is consent-based and does not load before cookie consent.
5. Confirm that production environment variables are documented when needed.
6. Run `npm run build` and only push if it succeeds.
7. If a change touches forms, analytics, cookies, SEO, metadata, legal pages, or routing, manually inspect the related implementation before pushing.
8. Do not bypass checks with `--no-verify` unless the user explicitly instructs it.
9. Do not use destructive git commands such as `git reset --hard` or force push unless the user explicitly instructs it.
10. If unrelated user changes exist, do not revert or modify them.

## Production Readiness Checklist

- The site builds successfully with `npm run build`.
- The changed pages are reachable through the expected localized routes.
- Footer, navigation, sitemap, and metadata are updated when new public pages are added.
- Legal pages exist and are linked when cookies, analytics, or contact forms are present.
- Cookie consent explains analytics clearly and provides accept/reject choices.
- Google Analytics or similar tracking only runs after consent.
- Contact information, business ID, visiting address, and postal address are correct where displayed.
- Text content is available in Finnish, Swedish, and English when the affected feature is localized.
- No placeholder copy, fake IDs, fake analytics IDs, lorem ipsum, or unfinished TODOs are left in production UI.
- Images, links, email addresses, phone links, and map embeds are valid.
- Mobile and desktop layouts are considered for any visual change.
- Accessibility basics are preserved: semantic headings, readable contrast, labels, alt text, keyboard-accessible controls.
- SEO basics are preserved: page metadata, canonical URLs, sitemap behavior, and robots behavior.
- The commit includes only relevant files for the task.

## Environment Variables

Known production variables:

- `CONTACT_FORM_RECIPIENT`: email address receiving contact form submissions.
- `CONTACT_FORM_SENDER`: sender email used for outgoing contact form messages.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: GA4 Measurement ID. Google Analytics must still load only after cookie consent.

Do not commit real secret values. Public IDs such as GA Measurement IDs may be configured in deployment settings, but avoid hardcoding them unless explicitly requested.

## Legal And Compliance Notes

The LLM agent may add practical legal page copy, but must not claim that the text is legally guaranteed. If the user asks whether the legal text is fully valid, say that a qualified legal professional should review final legal compliance.

For cookies and analytics:

- Analytics must be opt-in, not opt-out.
- Rejected consent must prevent analytics scripts from loading.
- The privacy policy and cookie policy must mention analytics if analytics is used.

## Git Push Rules

Before pushing:

1. Run `git status --short`.
2. Run `git diff --stat`.
3. Run `npm run build`.
4. Confirm the pushed branch and remote are correct.
5. Push only after the user has asked for a push or clearly approved it.

If any check fails, fix the issue before pushing or report the blocker clearly.
