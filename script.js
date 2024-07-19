document.addEventListener('DOMContentLoaded', () => {
    fetch('cricketers.json')
        .then(response => response.json())
        .then(data => {
            const rankingList = document.getElementById('ranking-list');
            rankingList.innerHTML = '';

            data.forEach(cricketer => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <th scope="row">${cricketer.rank}</th>
                    <td>${cricketer.name}</td>
                    <td>${cricketer.country}</td>
                    <td>${cricketer.points}</td>
                `;
                rankingList.appendChild(row);
            });

            // Add search functionality
            document.getElementById('search').addEventListener('input', function() {
                const searchValue = this.value.toLowerCase();
                const rows = rankingList.getElementsByTagName('tr');

                for (let row of rows) {
                    const cells = row.getElementsByTagName('td');
                    let matches = false;

                    for (let cell of cells) {
                        if (cell.textContent.toLowerCase().includes(searchValue)) {
                            matches = true;
                            break;
                        }
                    }

                    row.style.display = matches ? '' : 'none';
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

