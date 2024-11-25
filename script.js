const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('search-input');

function displayNews(newsItems) {
    newsContainer.innerHTML = ''; // Bersihkan container sebelum menampilkan data baru  
    newsItems.forEach(newsItem => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('news-item');
        newsDiv.innerHTML = `  
            <a href="#" onclick="showDetails(${newsItem.id})">${newsItem.judul}</a>  
        `;
        newsContainer.appendChild(newsDiv);
    });
}

function showDetails(id) {
    fetch(`http://localhost:3000/api/news/${id}`)
        .then(response => response.json())
        .then(data => {
            const modal = document.getElementById('news-detail-modal');
            const modalContent = document.getElementById('news-detail-content');
            const closeModal = document.querySelector('.close-modal');

            modalContent.innerHTML = `  
                <h3>${data.judul}</h3>  
                <p>Oleh: ${data.author}</p>  
                <p>Tanggal: ${data.tanggal} ${data.bulan} ${data.tahun}</p>  
                <p>${data.deskripsi}</p>  
                <img src="${data.foto}" alt="${data.judul}">  
            `;

            modal.style.display = "block";

            closeModal.onclick = () => {
                modal.style.display = "none";
            };

            window.onclick = (event) => {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            };
        });
}

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value;
    if (searchTerm) {
        fetch(`http://localhost:3000/api/news?search=${searchTerm}`)
            .then(response => response.json())
            .then(displayNews);
    } else {
        fetch('http://localhost:3000/api/news/all')
            .then(response => response.json())
            .then(displayNews);
    }
});

// Load initial news  
fetch('http://localhost:3000/api/news/all')
    .then(response => response.json())
    .then(displayNews);