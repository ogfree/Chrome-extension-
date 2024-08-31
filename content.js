let isScrolling = false;

function scrollPage() {
    // Scroll down by a random amount between 20 and 40 pixels
    window.scrollBy(0, Math.floor(Math.random() * 21) + 20);

    // Check if the page has reached the bottom
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        console.log('Reached the bottom of the page. Moving to the next URL...');
        setTimeout(() => {
            isScrolling = false;
            chrome.runtime.sendMessage({ action: 'nextUrl' });
        }, 1000); // Wait 1 second before moving to the next URL
    } else {
        // Set a random interval between 5 and 10 seconds for the next scroll
        setTimeout(scrollPage, Math.floor(Math.random() * 5001) + 5000);
    }
}

// Start the scrolling process if it's not already running
if (!isScrolling) {
    isScrolling = true;
    scrollPage();
}

// Handle messages from background script
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'startScrolling') {
        if (!isScrolling) {
            isScrolling = true;
            scrollPage();
        }
    }
});
