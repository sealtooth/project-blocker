# Blocker

#### Video Demo: [Watch video](https://youtu.be/GKHqgc4xaAs)


#### Description
Blocker is a Google Chrome extension designed to help users stay focused by blocking access to specific websites. Developed as the final project for CS50x 2024, this extension offers a straightforward solution for managing distractions during work or study sessions.

## Features

- **Flexible Blocking**: Users can easily add unlimited websites to a blocklist, giving them full control over their browsing experience.
- **Continuous Blocking**: The extension ensures continuous blocking while active, maintaining focus without interruptions.
- **User-Friendly Interface**: With an intuitive design, Blocker offers an easy-to-use experience for users of all levels.

## Installation

### Sideloading (for Development or Testing)

1. Download the extension source code from GitHub (link here).
2. Navigate to `chrome://extensions` in your Chrome browser.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the extension directory.

## Usage

1. Click on the extension icon in the Chrome toolbar to open the popup window.
2. In the popup window, input the domain of the website you wish to block (e.g., *www.example.com*) into the text field.
3. Click the "Add" button to add the website to your blocklist.
4. To view the current list of blocked websites, click on "Show list".
5. To clear the entire blocklist, click on "Clear all". Note: This action will remove all websites from the list.


## Files

### popup.js
- Manages the user interface of the extension's popup window.
- Allows users to add domains to a list of blocked websites, clear the list, and view the current list.
- Uses Chrome Extension APIs (chrome.storage.local, chrome.tabs) to store and retrieve the list of blocked websites and interact with browser tabs.
- Utilizes asynchronous functions (async/await) to handle asynchronous operations such as storage access and message passing between scripts.
<p>&nbsp;</p>


```
async function getListStorage()
```

- `chrome.storage.local.get()`: This function retrieves data from Chrome's local storage. In this case, it retrieves the list of blocked websites.

- `await`: The await keyword is used to wait for the chrome.storage.local.get() function to complete before moving on to the next line of code.

- The retrieved list of blocked websites is logged to the console for debugging purposes.

<p>&nbsp;</p>

```
async function sendList(updatedList)
```
- `chrome.tabs.query()`: This function queries for active tabs in the current window.

- `chrome.tabs.sendMessage()`: This function sends a message to the content script (content.js) with the updated list of blocked websites.

- The `updatedList` parameter contains the updated list of blocked websites.

<p>&nbsp;</p>

```
async function addToList(userInput)
```
- This function adds a user-inputted website to the list of blocked websites.
- `getListStorage()` is called to retrieve the current list of blocked websites from Chrome's local storage.

- The user input is added to a copy of the retrieved list (`updatedList`).

- `chrome.storage.local.set()` is used to update the list of blocked websites in Chrome's local storage with the new `updatedList`.

- The updated list is logged to the console for debugging purposes.

- The `sendList()` function is called to send the updated list to the content script.

<p>&nbsp;</p>


```
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners for adding domain to list, clearing all, and showing list
});
```

- his event listener waits for the popup to be fully loaded before executing its contents.

- Inside, there are event listeners for adding a domain to the list, clearing all domains from the list, and showing the current list of blocked domains.

<p>&nbsp;</p>

### content.js

- Handles the logic for blocking websites based on the list of blocked domains.

- Retrieves the list of blocked websites from Chrome's local storage.

- Redirects the user to a custom blocked page (blocked.html) if they try to access a blocked website.

- Listens for updates to the list of blocked websites from the extension's popup script and updates its local list accordingly.

- Utilizes asynchronous functions (async/await) and Chrome Extension APIs (chrome.storage.local, chrome.runtime.getURL()) for storage access and URL manipulation.

<p>&nbsp;</p>
```
async function getListStorage()
```

- This function retrieves the list of blocked websites from Chrome's local storage. It uses `chrome.storage.local.get()` to retrieve the data.

- `await` is used to wait for the asynchronous operation of retrieving data from local storage to complete before proceeding.

- The retrieved list is logged to the console for debugging purposes.

<p>&nbsp;</p>

```
async function showBlockPage()
```

- This function fetches the content of the blocked.html file using `fetch()` and `chrome.runtime.getURL()`.

- It then sets the HTML content of the current page to the content of blocked.html.

- This is likely used to display a custom blocked page when a user tries to access a blocked website.

<p>&nbsp;</p>

```
async function runExtension()
```

- This is the main function that runs the extension logic.

- It retrieves the current URL's hostname, converts it to lowercase, and then gets the latest list of blocked websites using `getListStorage()`.

- It prepares the URL for the blocked.html page using `chrome.runtime.getURL()`.

- If the current URL's hostname is found in the list of blocked websites (`cachedList`), it redirects the user to the blocked.html page by replacing the window location.

- If the hostname is not in the list, it logs a message to the console.

<p>&nbsp;</p>

```
chrome.runtime.onMessage.addListener
```

- This listens for messages from the extension's popup script (`popup.js`) with the action `updatedBlocklist`.

- When it receives such a message, it updates the `cachedList` with the updated list of blocked websites.

- This ensures that the content script has the latest list of blocked websites to use for blocking.

## Features to be implemented

- **Individual Website Deletion**: Delete individual websites from the blocklist after they are shown.
- **Toggle Blocking**: A button to toggle the blocking feature on and off, though it goes against the project's goal of maintaining focus.
- **Timer/Hours Set**: Ability to set a timer or specific hours for the extension to run, allowing for customized blocking schedules.
- **Check Input validity**: Check users input.

