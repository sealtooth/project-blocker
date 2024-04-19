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

- **popup.js**: Manages the functionality and user interface of the extension's popup window.
- **content.js**: Implements the logic for blocking websites based on the user's blocklist and handles updates to the blocklist.

## Features to be implemented

- **Individual Website Deletion**: Delete individual websites from the blocklist after they are shown.
- **Toggle Blocking**: A button to toggle the blocking feature on and off, though it goes against the project's goal of maintaining focus.
- **Timer/Hours Set**: Ability to set a timer or specific hours for the extension to run, allowing for customized blocking schedules.

