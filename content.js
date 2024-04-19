// Get websiteList array from chrome.storage.local
async function getListStorage() {
    try {
        const response = await chrome.storage.local.get('websiteList');
        let blocklist = response.websiteList || [];
        console.log("websiteList retrieved from storage ", blocklist);
        return blocklist;
    }   catch (error) {
        console.error("Error retrieving websiteList: ", error);
    }
};

// Display blocked.html
async function showBlockPage() {
    const response = await fetch(chrome.runtime.getURL('blocked.html'));
    const blockedPageContent = await response.text()
    document.documentElement.innerHTML = blockedPageContent;
};


// Main
async function runExtension() {

    // Get current URL hostname (www.example.com)
    const url = window.location.hostname.toLowerCase();

    // Get latest list from storage, getListStorage returns websiteLists array.
    cachedList = await getListStorage();
    console.log("Cached List: ", cachedList);

    // Get blocked.html URL ready.
    const blockedPageUrl = await chrome.runtime.getURL('blocked.html');
    console.log("Redirect URL: ", blockedPageUrl);

    // Check if current URL hostname is in websiteList
    if (cachedList.includes(url)) {
        // If there is a match, replace window with blocked.html
        window.location.replace(blockedPageUrl);
        console.log("Website found: ", url);
    
    } else {
        // If no match is found, do nothing. Console log for debugging.
        console.log("No matching website found in the URL to block. Current hostname:", url);
        console.log(cachedList);
    }
};

// Listen for Message with newest list from popup.js. Triggered when the website list is updated.
chrome.runtime.onMessage.addListener(
    function(request, sender) {
        if (request.action === "updatedBlocklist"){
            const cachedList = request.updatedList;
            console.log("Message received: ", cachedList);
        }
    }
);


// Run main
runExtension();