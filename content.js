// Global variable to hold the list of URLs and current index
let urls = [];
let currentIndex = 0;

// Function to fetch URLs from the sitemap
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
        navigateToNextUrl();
    } catch (error) {
        console.error('Failed to fetch URLs:', error);
    }
}

// Function to navigate to the next URL
function navigateToNextUrl() {
    if (currentIndex < urls.length) {
        window.location.href = urls[currentIndex];
        currentIndex++;
    } else {
        console.log('No more URLs to visit');
    }
}

// Function to handle scrolling and reloading
function scrollPage() {
    // Scroll down by a random amount between 20 and 40 pixels
    window.scrollBy(0, Math.floor(Math.random() * 21) + 20);

    // Check if the page has reached the bottom
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        console.log('Reached the bottom of the page. Moving to the next URL...');
        setTimeout(() => {
            navigateToNextUrl();
        }, 1000); // Wait 1 second before navigating
    } else {
        // Set a random interval between 5 and 10 seconds for the next scroll
        setTimeout(scrollPage, Math.floor(Math.random() * 5001) + 5000);
    }
}

// Start the process
fetchUrls();
