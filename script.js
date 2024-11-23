document.getElementById('upload-btn').addEventListener('click', () => {
    const fileInput = document.getElementById('ppt-upload');
    if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
        document.getElementById('slide-viewer').innerText = `File "${fileName}" telah diunggah.`;
    } else {
        alert("Pilih file PowerPoint terlebih dahulu!");
    }
});

// Perekaman audio
let mediaRecorder;
let audioChunks = [];

document.getElementById('start-record').addEventListener('click', async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = event => audioChunks.push(event.data);
    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioURL = URL.createObjectURL(audioBlob);
        document.getElementById('audio-playback').src = audioURL;
        audioChunks = [];
    };

    mediaRecorder.start();
    document.getElementById('start-record').disabled = true;
    document.getElementById('stop-record').disabled = false;
});

document.getElementById('stop-record').addEventListener('click', () => {
    mediaRecorder.stop();
    document.getElementById('start-record').disabled = false;
    document.getElementById('stop-record').disabled = true;
});
