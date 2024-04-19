console.log('This is Blocker!');

// Get websiteList from chrome.storage.local
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

// Send latest list to content.js
async function sendList(updatedList) {
    chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "updatedBlocklist",
            updatedList: updatedList
        });
    });
};

// Add users input to list
async function addToList(userInput) {
    try {
        const blocklist = await getListStorage();
        const updatedList = blocklist.slice();
        updatedList.push(userInput);
        await chrome.storage.local.set({ 'websiteList': updatedList});
        console.log("Site added to blocklist: ", userInput);
        console.log("Current blocklist: ", updatedList);

        sendList(updatedList);
    }   catch (error) {
        console.error("Error adding to blocklist: ", error);
    }
};

// Event listener for: Add domain to list, Clear All, Show list
document.addEventListener('DOMContentLoaded', function() {

    // Get info from from submission.
    const form = document.getElementById("add-domain");
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const userInput = document.getElementById('user-input').value.toLowerCase();
        console.log("input collected:", userInput);
        await addToList(userInput);
        form.reset();
    });

    // Clear current list
    const clearAll = document.getElementById('clear-list');
    const clearMessage = document.getElementById('clear-message');
    clearAll.addEventListener('click', async function() {
        await chrome.storage.local.remove('websiteList');
        clearMessage.textContent = 'List cleared!';
        clearMessage.classList.add('show');
        console.log("List cleared!");
    });

    // Show list
    const showList = document.getElementById('show-list');
    showList.addEventListener('click', async function() {
        const storedData = await chrome.storage.local.get('websiteList');
        if (storedData.websiteList) {
            const websiteList = storedData.websiteList;
            const displayELement = document.getElementById("list-container");
            displayELement.innerHTML = "";
            displayELement.classList.add('show');
            for (const website of websiteList) {
                const listItem = document.createElement("li");
                listItem.textContent = website;
                displayELement.appendChild(listItem);
            }
        }   else {
            console.log("No website list found in storage.");
        }
    });
});

