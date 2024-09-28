// TODO: need to change the description to update with video/page changes
// TODO: need to change the text bubbles and use the API to pull the JSON data
function createHeader() {
    const extensionName = "Check Mate";
    const extensionURL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.marginBottom = '20px';
    header.style.padding = '10px';
    header.style.backgroundColor = '#b8860b'; // Dark goldenrod
    header.style.borderRadius = '5px';

    // Create logo
    const logo = document.createElement("img");
    logo.src = chrome.runtime.getURL("images/king.jpeg");
    logo.width = 30;
    logo.height = 30;
    logo.style.marginRight = '10px';

    // Create extension name link
    const nameLink = document.createElement('a');
    nameLink.href = extensionURL;
    nameLink.textContent = extensionName;
    nameLink.style.color = 'white';
    nameLink.style.textDecoration = 'none';
    nameLink.style.fontWeight = 'bold';
    nameLink.style.fontSize = '18px';

    // Append logo and name link to header
    header.appendChild(logo);
    header.appendChild(nameLink);

    return header;
}
// Function to check if the current page is a YouTube watch page
function isYouTubeWatchPage() {
    return window.location.hostname === 'www.youtube.com' && window.location.pathname.startsWith('/watch');
}

// Placeholder function to get video title (replace with your implementation)
function getVideoTitle() {
    // This is a simple example. You'll need to implement your own logic to get the actual video title.
    const titleElement = document.querySelector('h1.title.style-scope.ytd-video-primary-info-renderer');
    return titleElement ? titleElement.textContent.trim() : 'Video Title Not Found';
}

// Placeholder function to get text bubbles (replace with your implementation)
function getTextBubbles() {
    // This is where you'll implement your logic to fetch and parse the JSON object
    // For now, we'll return some dummy data
    return [
        { text: "Fact check 1", type: "info" },
        { text: "Fact check 2", type: "warning" },
        { text: "Fact check 3", type: "error" },
    ];
}

// Function to create and inject a collapsible sidebar
function createSidebar() {
    // Only proceed if we're on a YouTube watch page
    if (!isYouTubeWatchPage()) {
        return;
    }
    // Create the sidebar container
    const sidebar = document.createElement('div');
    sidebar.id = 'fact-check-sidebar';
    sidebar.style.position = 'fixed';
    sidebar.style.top = '0';
    sidebar.style.right = '0';
    sidebar.style.width = '300px';
    sidebar.style.height = '100%';
    sidebar.style.backgroundColor = '#d2b48c'; // Light brown
    sidebar.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0px 5px 15px';
    sidebar.style.padding = '10px';
    sidebar.style.zIndex = '9999'; // Make sure it's on top
    sidebar.style.transition = 'transform 0.3s ease-in-out';
    sidebar.style.transform = 'translateX(100%)'; // Start collapsed

    // Create a button to toggle the sidebar
    const toggleButton = document.createElement('button');
    toggleButton.innerText = '>';
    toggleButton.id = 'toggle-button';
    toggleButton.style.position = 'absolute';
    toggleButton.style.left = '-40px';
    toggleButton.style.top = '55px'; // Adjust to avoid overlaying with YouTube buttons
    toggleButton.style.height = '30px';
    toggleButton.style.width = '30px';
    toggleButton.style.backgroundColor = '#d2b48c';
    toggleButton.style.border = '2px solid white'; // Added white border
    toggleButton.style.borderRadius = '25px'; // Rounded button
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    toggleButton.style.padding = '5px';

    // Add toggle functionality
    toggleButton.onclick = () => {
        if (sidebar.style.transform === 'translateX(0%)') {
            sidebar.style.transform = 'translateX(100%)'; // Collapse
            toggleButton.innerText = '<';
        } else {
            sidebar.style.transform = 'translateX(0%)'; // Expand
            toggleButton.innerText = '>';
        }
    };

    // Create video title component
    const videoTitleComponent = document.createElement('div');
    videoTitleComponent.style.backgroundColor = '#f0e68c'; // Khaki
    videoTitleComponent.style.padding = '10px';
    videoTitleComponent.style.borderRadius = '5px';
    videoTitleComponent.style.marginBottom = '20px';
    videoTitleComponent.style.fontWeight = 'bold';
    videoTitleComponent.textContent = getVideoTitle();

    // Create text bubbles container
    const textBubblesContainer = document.createElement('div');
    textBubblesContainer.style.display = 'flex';
    textBubblesContainer.style.flexDirection = 'column';
    textBubblesContainer.style.gap = '10px';

    // Function to create a text bubble
    function createTextBubble(text, type) {
        const bubble = document.createElement('div');
        bubble.textContent = text;
        bubble.style.padding = '10px';
        bubble.style.borderRadius = '20px';
        bubble.style.maxWidth = '80%';
        bubble.style.wordWrap = 'break-word';

        switch(type) {
            case 'info':
                bubble.style.backgroundColor = '#add8e6'; // Light blue
                break;
            case 'warning':
                bubble.style.backgroundColor = '#ffffe0'; // Light yellow
                break;
            case 'error':
                bubble.style.backgroundColor = '#ffcccb'; // Light red
                break;
            default:
                bubble.style.backgroundColor = '#f0f0f0'; // Light grey
        }

        return bubble;
    }

    // Populate text bubbles
    const textBubbles = getTextBubbles();
    textBubbles.forEach(bubble => {
        textBubblesContainer.appendChild(createTextBubble(bubble.text, bubble.type));
    });

    // Append content to the sidebar
    let header = createHeader();
    sidebar.appendChild(toggleButton);
    sidebar.appendChild(header);
    sidebar.appendChild(videoTitleComponent);
    sidebar.appendChild(textBubblesContainer);

    // Inject the sidebar into the body
    document.body.appendChild(sidebar);

    // Initially show the sidebar
    setTimeout(() => {
        sidebar.style.transform = 'translateX(0%)'; // Automatically open on load
    }, 100);
}

// // Function to initialize the extension
// function initExtension() {
//     if (isYouTubeWatchPage()) {
//         createSidebar();
//     }
// }

// // Run the extension initialization when the page loads
// window.addEventListener('load', initExtension);

// // Listen for URL changes (for single-page application behavior)
// let lastUrl = location.href; 
// new MutationObserver(() => {
//     const url = location.href;
//     if (url !== lastUrl) {
//         lastUrl = url;
//         initExtension();
//     }
// }).observe(document, {subtree: true, childList: true});
// Function to update sidebar content
function updateSidebarContent() {
    const videoTitleComponent = document.getElementById('video-title-component');
    const textBubblesContainer = document.getElementById('text-bubbles-container');

    if (videoTitleComponent && textBubblesContainer) {
        videoTitleComponent.textContent = getVideoTitle();

        // Clear existing bubbles
        textBubblesContainer.innerHTML = '';

        // Populate text bubbles
        const textBubbles = getTextBubbles();
        textBubbles.forEach(bubble => {
            textBubblesContainer.appendChild(createTextBubble(bubble.text, bubble.type));
        });
    }
}

// Function to initialize or update the extension
function initOrUpdateExtension() {
    if (isYouTubeWatchPage()) {
        const existingSidebar = document.getElementById('fact-check-sidebar');
        if (!existingSidebar) {
            createSidebar();
        } else {
            updateSidebarContent();
        }
    }
}

// Run the extension initialization when the page loads
window.addEventListener('load', initOrUpdateExtension);

// Listen for URL changes (for single-page application behavior)
let lastUrl = location.href; 
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        initOrUpdateExtension();
    }
}).observe(document, {subtree: true, childList: true});