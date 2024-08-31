function scrollPage() {
    // Scroll down by a random amount between 20 and 40 pixels
    window.scrollBy(0, Math.floor(Math.random() * 21) + 20);

    // Check if the page has reached the bottom
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // Reload the page when the bottom is reached
        console.log("Reached the bottom of the page. Reloading...");
        setTimeout(() => {
            window.location.reload();
        }, 1000); // Wait 1 second before reloading
    } else {
        // Set a random interval between 5 and 10 seconds for the next scroll
        setTimeout(scrollPage, Math.floor(Math.random() * 5001) + 5000);
    }
}

// Start the scrolling process
scrollPage();
