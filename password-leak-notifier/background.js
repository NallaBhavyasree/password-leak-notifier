chrome.runtime.onMessage.addListener((message) => {
    if (message.notify) {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icons/icon48.png',
            title: 'Password Leak Warning!',
            message: 'Your password was found in a breach. Please change it!'
        });
    }
});
