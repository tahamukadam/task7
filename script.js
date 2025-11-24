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
        userContainer.innerHTML = `<p style="color:red;">${error}</p>`;
    }
}

function displayUsers(users) {
    userContainer.innerHTML = "";

    if (users.length === 0) {
        userContainer.innerHTML = "<p>No users found</p>";
        return;
    }

    users.forEach(user => {
        const card = document.createElement("div");
        card.classList.add("user-card");

        card.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>City:</strong> ${user.address.city}</p>
        `;
        userContainer.appendChild(card);
    });
}

// Search Filter Feature
searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredUsers = allUsers.filter(u =>
        u.name.toLowerCase().includes(searchValue)
    );
    displayUsers(filteredUsers);
});

reloadBtn.addEventListener("click", fetchUsers);

fetchUsers();
