const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('ppt-upload');
const fileList = document.getElementById('file-list');

// Unggah file
uploadBtn.addEventListener('click', async () => {
    if (fileInput.files.length === 0) {
        alert("Pilih file terlebih dahulu!");
        return;
    }

    const formData = new FormData();
    formData.append('pptFile', fileInput.files[0]);

    try {
        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        alert(result.message);
        fetchFiles(); // Refresh daftar file
    } catch (error) {
        console.error("Gagal mengunggah file:", error);
        alert("Gagal mengunggah file!");
    }
});

// Ambil daftar file
async function fetchFiles() {
    try {
        const response = await fetch('http://localhost:3000/files');
        const files = await response.json();

        fileList.innerHTML = '';
        files.forEach(file => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="http://localhost:3000${file.url}" target="_blank">${file.name}</a>`;
            fileList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Gagal mengambil daftar file:", error);
        fileList.innerHTML = '<li>Error memuat daftar file!</li>';
    }
}

// Muat daftar file saat pertama kali
fetchFiles();
