chrome.action.onClicked.addListener((tab) => {
  console.log("Onclick Running");

  // Ensure the extension runs only on YouTube tabs 
  if (tab.url.includes("youtube.com/watch")) {
    console.log("YouTube URL recognized");
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['./scripts/content.js']
    });
  }
});
