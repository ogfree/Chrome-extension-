let urls = [];
let currentIndex = 0;

// Fetch URLs from sitemap
async function fetchUrls() {
    try {
        const response = await fetch('https://probytace.com/sitemap.xml');
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');
        const urlElements = xmlDoc.getElementsByTagName('url');
        urls = Array.from(urlElements).map(urlElement => 
            urlElement.getElementsByTagName('loc')[0].textContent
        ).slice(0, 100); // Get the first 100 URLs

        console.log(`Fetched ${urls.length} URLs`);
        startNavigation();
    } catch (error) {
        console.error('Failed to fetch URLs:', error);
    }
}

// Start navigation to the first URL
function startNavigation() {
    if (urls.length > 0) {
        currentIndex = 0;
        chrome.tabs.create({ url: urls[currentIndex] }, (tab) => {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['content.js']
            });
        });
    }
}

// Listen for extension icon clicks to start the process
chrome.action.onClicked.addListener(() => {
    fetchUrls();
});
