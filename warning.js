document.getElementById('back-btn').addEventListener('click', function () {
  window.history.back();
});

document.getElementById('proceed-btn').addEventListener('click', function () {
  // Retrieve the blocked URL from chrome.storage
  chrome.storage.local.get(['blockedUrl'], function (result) {
    if (result.blockedUrl) {
      // Add the blocked URL to the allowedHosts array
      chrome.runtime.sendMessage(
        { command: 'allow', url: result.blockedUrl },
        function (response) {
          // Get the current tab and update it with the blocked URL
          chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              chrome.tabs.update(tabs[0].id, { url: result.blockedUrl });
            }
          );
        }
      );
    }
  });
});
