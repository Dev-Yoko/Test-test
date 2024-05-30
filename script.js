const userAgentAPI = 'https://api.userparser.com/1.1/detect'; // Replace with the actual API endpoint

async function fetchUserAgents(apiKey) {
    try {
        const response = await fetch(`${userAgentAPI}?api_key=${apiKey}`);
        const data = await response.json();
        return data.userAgents; // Assuming the API returns a JSON object with a userAgents array
    } catch (error) {
        console.error('Error fetching user agents:', error);
        return [];
    }
}

function filterUserAgents(userAgents, browser, device) {
    return userAgents.filter(agent => {
        const matchesBrowser = browser === 'all' || agent.browser.toLowerCase() === browser;
        const matchesDevice = device === 'all' || agent.device.toLowerCase() === device;
        return matchesBrowser && matchesDevice;
    });
}

function getRandomUserAgent(filteredAgents) {
    const randomIndex = Math.floor(Math.random() * filteredAgents.length);
    return filteredAgents[randomIndex];
}

function generateRandomUserAgentsList(count, filteredAgents) {
    const userAgentList = [];
    for (let i = 0; i < count; i++) {
        userAgentList.push(getRandomUserAgent(filteredAgents));
    }
    return userAgentList;
}

document.getElementById('generateBtn').addEventListener('click', async () => {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const userAgents = await fetchUserAgents(apiKey);

    const count = parseInt(document.getElementById('numAgents').value, 10);
    const browser = document.getElementById('browserFilter').value;
    const device = document.getElementById('deviceFilter').value;

    const filteredAgents = filterUserAgents(userAgents, browser, device);
    const userAgentList = generateRandomUserAgentsList(count, filteredAgents);

    const userAgentListElement = document.getElementById('userAgentList');
    userAgentListElement.innerHTML = ''; // Clear previous list
    userAgentList.forEach(userAgent => {
        const listItem = document.createElement('li');
        listItem.innerText = userAgent.ua; // Display the user agent string
        userAgentListElement.appendChild(listItem);
    });
});
