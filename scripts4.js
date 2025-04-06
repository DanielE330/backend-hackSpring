document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const userTableBody = document.getElementById('userTable').querySelector('tbody');

    // Sample User Data (Replace with your actual data source)
    const users = [
        { login: 'johndoe', fullName: 'John Doe', role: 'user', registrationDate: '2023-01-15' },
        { login: 'janesmith', fullName: 'Jane Smith', role: 'administrator', registrationDate: '2023-05-20' },
        { login: 'petebrown', fullName: 'Peter Brown', role: 'user', registrationDate: '2023-08-10' },
        { login: 'admin1', fullName: 'Administrator One', role: 'administrator', registrationDate: '2024-01-01' }
    ];

    searchButton.addEventListener('click', function() {
        const searchLogin = document.getElementById('searchLogin').value.toLowerCase();
        const searchName = document.getElementById('searchName').value.toLowerCase();
        const searchRole = document.getElementById('searchRole').value;
        const searchRegistrationDate = document.getElementById('searchRegistrationDate').value;

        const filteredUsers = users.filter(user => {
            const loginMatch = user.login.toLowerCase().includes(searchLogin);
            const nameMatch = user.fullName.toLowerCase().includes(searchName);
            const roleMatch = searchRole === '' || user.role === searchRole;
            const dateMatch = searchRegistrationDate === '' || user.registrationDate === searchRegistrationDate;

            return loginMatch && nameMatch && roleMatch && dateMatch;
        });

        updateUserTable(filteredUsers);
    });

    function updateUserTable(users) {
        userTableBody.innerHTML = ''; // Clear existing rows

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.login}</td>
                <td>${user.fullName}</td>
                <td>${user.role}</td>
                <td>${user.registrationDate}</td>
            `;
            userTableBody.appendChild(row);
        });
    }
});
