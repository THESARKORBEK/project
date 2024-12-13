document.addEventListener('DOMContentLoaded', function() {
    // Admin credentials (hashed password for security)
    const adminUsername = 'admin';
    const adminPasswordHash = CryptoJS.SHA256('admin123').toString();

    // Function to log user interactions
    let userInteractions = [];
    function logInteraction(eventType, details) {
        const interaction = {
            eventType,
            details,
            timestamp: new Date().toISOString()
        };
        userInteractions.push(interaction);
        localStorage.setItem('userInteractions', JSON.stringify(userInteractions));
    }

    // Track button presses
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(event) {
            logInteraction('button_click', {
                buttonText: event.target.innerText
            });
        });
    });

    // Track form submissions
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        logInteraction('form_submission', {
            name, email, message
        });

        // Store form data in local storage
        localStorage.setItem('contactFormData', JSON.stringify({ name, email, message }));

        alert('Message sent!');
        event.target.reset();
    });

    // Session storage example
    if (!sessionStorage.getItem('sessionStarted')) {
        sessionStorage.setItem('sessionStarted', new Date().toISOString());
        alert('Welcome to my portfolio!');
    }

    // Admin console login via browser console
    window.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'i') {
            const username = prompt('Enter username:');
            const password = prompt('Enter password:');
            const inputPasswordHash = CryptoJS.SHA256(password).toString();
            if (username === adminUsername && inputPasswordHash === adminPasswordHash) {
                const interactions = JSON.parse(localStorage.getItem('userInteractions')) || [];
                let interactionLog = 'User Interactions:\n\n';
                interactions.forEach(interaction => {
                    interactionLog += `Event Type: ${interaction.eventType}\n`;
                    interactionLog += `Details: ${JSON.stringify(interaction.details, null, 2)}\n`;
                    interactionLog += `Timestamp: ${interaction.timestamp}\n\n`;
                });
                alert(`Welcome Admin!\n\n${interactionLog}`);
            } else {
                alert('Incorrect credentials!');
            }
        }
    });

    // Cache projects (dummy example)
    const projects = [
        { id: 1, title: 'Project 1', description: 'Description 1' },
        { id: 2, title: 'Project 2', description: 'Description 2' },
        { id: 3, title: 'Project 3', description: 'Description 3' }
    ];

    localStorage.setItem('projects', JSON.stringify(projects));

    const projectsContainer = document.getElementById('projects');
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'bg-gray-800 p-6 rounded-lg';
        projectCard.innerHTML = `
            <h3 class="text-xl font-bold">${project.title}</h3>
            <p>${project.description}</p>
        `;
        projectsContainer.appendChild(projectCard);
    });
});
