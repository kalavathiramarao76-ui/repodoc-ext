chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false }).catch(() => {});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === 'openSidePanel') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.sidePanel.open({ tabId: tabs[0].id });
      }
    });
    sendResponse({ success: true });
  }
  return true;
});

chrome.runtime.onInstalled.addListener(() => {
  console.log('RepoDoc AI installed');
});
