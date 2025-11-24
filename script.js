const apiURL = "https://jsonplaceholder.typicode.com/users";
const userContainer = document.getElementById("userContainer");
const reloadBtn = document.getElementById("reloadBtn");
const searchInput = document.getElementById("searchInput");
let allUsers = [];

async function fetchUsers() {
    try {
        userContainer.innerHTML = "<p>Loading...</p>";

        const response = await fetch(apiURL);
        if (!response.ok) throw new Error("Failed to fetch data");

        allUsers = await response.json();
        displayUsers(allUsers);
    }
    catch (error) {
        userContainer.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}

function displayUsers(users) {
    userContainer.innerHTML = "";

    if (users.length === 0) {
        userContainer.innerHTML = "<p>No users found</p>";
        return;
    }

    users.forEach(user => {
        const { name, username, email, phone, website, address, company } = user;
        const mapsLink = `https://www.google.com/maps?q=${address.geo.lat},${address.geo.lng}`;

        const card = document.createElement("div");
        card.classList.add("user-card");

        card.innerHTML = `
            <h3><i>👤</i>${name}</h3>
            <p><i>📛</i><strong>Username:</strong> ${username}</p>
            <p><i>✉️</i><strong>Email:</strong> ${email}</p>
            <p><i>📞</i><strong>Phone:</strong> ${phone}</p>
            <p><i>🌐</i><strong>Website:</strong> 
                <a href="https://${website}" target="_blank">${website}</a></p>

            <p><i>📍</i><strong>Address:</strong><br>
            ${address.street}, ${address.suite}, ${address.city} - ${address.zipcode} <br>
            <a href="${mapsLink}" target="_blank">📌 View Location on Maps</a>
            </p>

            <p><i>🏢</i><strong>Company:</strong> ${company.name}</p>
        `;

        userContainer.appendChild(card);
    });
}

// 🔍 Advanced Search (name, email, city, company)
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const filteredUsers = allUsers.filter(u =>
        u.name.toLowerCase().includes(value) ||
        u.email.toLowerCase().includes(value) ||
        u.address.city.toLowerCase().includes(value) ||
        u.company.name.toLowerCase().includes(value)
    );
    displayUsers(filteredUsers);
});

reloadBtn.addEventListener("click", fetchUsers);

// Initial Load
fetchUsers();
// Trigger animation after adding cards
setTimeout(() => {
    document.querySelectorAll(".user-card").forEach(card => {
        card.style.opacity = "1";
    });
}, 50);
