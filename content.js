(function () {
  const STORAGE_KEY = "awTitlePrefixEnabled";
  let enabled = true;
  let originalTitle = null;

  function getDomain() {
    let host = location.hostname;
    if (host.startsWith("www.")) host = host.slice(4);
    return host;
  }

  function suffixFor(domain) {
    return ` [${domain}]`;
  }

  function applySuffix() {
    if (!enabled) return;
    const domain = getDomain();
    if (!domain) return;
    const suffix = suffixFor(domain);
    if (document.title.endsWith(suffix)) return; // already applied, avoid loops
    if (originalTitle === null) originalTitle = document.title;
    document.title = document.title + suffix;
  }

  function restoreTitle() {
    if (originalTitle !== null) {
      document.title = originalTitle;
    }
  }

  function observeTitle() {
    const observer = new MutationObserver(() => {
      if (!enabled) return;
      const suffix = suffixFor(getDomain());
      if (!document.title.endsWith(suffix)) {
        applySuffix();
      }
    });
    observer.observe(document.head, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  function init() {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
      enabled = result[STORAGE_KEY] !== false; // default: on
      if (enabled) {
        applySuffix();
      }
      observeTitle();
    });
  }

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes[STORAGE_KEY]) {
      enabled = changes[STORAGE_KEY].newValue !== false;
      if (enabled) {
        applySuffix();
      } else {
        restoreTitle();
      }
    }
  });

  init();
})();