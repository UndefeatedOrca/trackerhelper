const STORAGE_KEY = "awTitlePrefixEnabled";
const checkbox = document.getElementById("toggle");

chrome.storage.local.get([STORAGE_KEY], (result) => {
  checkbox.checked = result[STORAGE_KEY] !== false; // default: on
});

checkbox.addEventListener("change", () => {
  chrome.storage.local.set({ [STORAGE_KEY]: checkbox.checked });
});
