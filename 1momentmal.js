const video = document.getElementById('video');
const countdownElement = document.getElementById('countdown');
const stoppedText = document.getElementById('stopped-text');
const saveButton = document.querySelector('.speicher');
const momentForm = document.getElementById('momentmal-form');


// Accessing the user's camera and streaming it to the video element
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        video.srcObject = stream;
        video.play();
    })
    .catch(function(err) {
        console.error('Error accessing the camera: ', err);
    });

function takePicture() {
    if (video.paused || video.ended) {
        alert('EIN MOMENT NACH DEM ANDEREN');
    } else {
        let countdown = 3;
        countdownElement.style.display = 'block';
        const countdownInterval = setInterval(() => {
            if (countdown > 0) {
                countdownElement.textContent = countdown;
                countdown--;
            } else {
                clearInterval(countdownInterval);
                countdownElement.style.display = 'none';
                stoppedText.style.display = 'block'; // Display stopped text
                countdownElement.textContent = 'DIGGI :)';
                video.pause(); // Pause the video stream
                video.style.filter = 'blur(10px)'; // Apply blur effect
                saveButton.disabled = false; // Enable save button

                saveImageLocally();
            }
        }, 1000);
    }
}

function saveImageLocally(){
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataURL = canvas.toDataURL('image/png');

    localStorage.setItem('capturedImage', imageDataURL)
}

function speicherKnopf() {
    momentForm.style.display = 'block';
    saveButton.disabled = true;
}