# AW Domain Prefix

Appends ` [domain]` to the end of every tab's title (e.g. `Some Article Headline [nytimes.com]`), so ActivityWatch's window watcher — and its Categorization regex rules, which only match `app`/`title`, not URL — can identify pages that don't put the site name in their title.

Position (front vs. end) doesn't affect matching, since category rules aren't anchored to the start/end of the string. The one tradeoff: browser tabs and OS taskbars truncate long titles from the right, so on very long titles the domain suffix can get visually cut off in the tab bar (it's still captured correctly in AW's data either way — this only affects what you see in the browser UI itself).

## Install (Edge or Chrome, unpacked)

1. Go to `edge://extensions` (or `chrome://extensions`)
2. Enable **Developer mode** (toggle, usually top-right)
3. Click **Load unpacked**
4. Select this folder (`aw-domain-prefix`)

The extension is now active on all sites. No further setup needed.

## Toggle on/off

Click the extension icon in the toolbar to check/uncheck "Append domain to tab titles." Turning it off restores the original title on the current tab; new tabs simply won't get the suffix until re-enabled.

## Using it with ActivityWatch Categories

Once installed, `aw-watcher-window` will start picking up titles like:

```
Why the Sky Is Blue [nytimes.com]
user/repo: Issues [github.com]
```

In AW's web UI → Settings → Categorization, add/edit a category and set its rule to a Regex matching the domain, e.g.:

```
nytimes\.com
```

This will now match regardless of the article's actual headline.

## Notes / limitations

- Only affects titles going forward — doesn't change history already recorded.
- Some single-page apps rewrite `document.title` on route changes (e.g. unread-count badges); the script watches for this and re-applies the suffix, but there may be a brief flicker where the un-suffixed title shows.
- Domain is taken as-is from `location.hostname` with a leading `www.` stripped — subdomains (e.g. `mail.google.com`) are kept as-is rather than reduced to a registrable domain.
