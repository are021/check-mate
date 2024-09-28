// contentScript.js

// Function to get video title and description
function getVideoDetails() {
    const videoTitle = document.querySelector('h1.title').innerText;
    const videoDescription = document.querySelector('#description').innerText;
    return { title: videoTitle, description: videoDescription };
}

// Function to create and inject a collapsible sidebar
function createSidebar() {
    const { title, description } = getVideoDetails();

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
    toggleButton.style.position = 'absolute';
    toggleButton.style.left = '-30px';
    toggleButton.style.top = '20px';
    toggleButton.style.backgroundColor = '#d2b48c';
    toggleButton.style.border = 'none';
    toggleButton.style.cursor = 'pointer';
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

    // Sidebar content (video title and description)
    const titleElement = document.createElement('h2');
    titleElement.innerText = `Title: ${title}`;
    titleElement.style.marginTop = '50px'; // Keep some space for the button

    const descriptionElement = document.createElement('p');
    descriptionElement.innerText = `Description: ${description}`;

    // Append content to the sidebar
    sidebar.appendChild(toggleButton);
    sidebar.appendChild(titleElement);
    sidebar.appendChild(descriptionElement);

    // Inject the sidebar into the body
    document.body.appendChild(sidebar);

    // Initially show the sidebar
    setTimeout(() => {
        sidebar.style.transform = 'translateX(0%)'; // Automatically open on load
    }, 100);
}

// Run the sidebar creation when the page loads
window.addEventListener('load', createSidebar);
