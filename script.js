const userAgentAPI = 'e013a4628358a4fcba6b45c89711e420df99f9a48a7f373fef'; // Replace with a real API

let userAgents = [];

// Fetch user agents from API
async function fetchUserAgents() {
    try {
        const response = await fetch(userAgentAPI);
        const data = await response.json();
        userAgents = data.userAgents; // Assuming the API returns a JSON object with a userAgents array
    } catch (error) {
        console.error('Error fetching user agents:', error);
    }
}

// Filter user agents based on selected filters
function filterUserAgents(userAgents, browser, device) {
    return userAgents.filter(agent => {
        const matchesBrowser = browser === 'all' || agent.browser.toLowerCase() === browser;
        const matchesDevice = device === 'all' || agent.device.toLowerCase() === device;
        return matchesBrowser && matchesDevice;
    });
}

// Generate a random user agent
function getRandomUserAgent(filteredAgents) {
    const randomIndex = Math.floor(Math.random() * filteredAgents.length);
    return filteredAgents[randomIndex];
}

// Generate a list of random user agents
function generateRandomUserAgentsList(count, browser, device) {
    const filteredAgents = filterUserAgents(userAgents, browser, device);
    const userAgentList = [];
    for (let i = 0; i < count; i++) {
        userAgentList.push(getRandomUserAgent(filteredAgents));
    }
    return userAgentList;
}

document.getElementById('generateBtn').addEventListener('click', async () => {
    await fetchUserAgents(); // Fetch latest user agents before generating

    const count = parseInt(document.getElementById('numAgents').value, 10);
    const browser = document.getElementById('browserFilter').value;
    const device = document.getElementById('deviceFilter').value;

    const userAgentList = generateRandomUserAgentsList(count, browser, device);
    const userAgentListElement = document.getElementById('userAgentList');
    userAgentListElement.innerHTML = ''; // Clear previous list
    userAgentList.forEach(userAgent => {
        const listItem = document.createElement('li');
        listItem.innerText = userAgent;
        userAgentListElement.appendChild(listItem);
    });
});

// Initial fetch of user agents
fetchUserAgents();
