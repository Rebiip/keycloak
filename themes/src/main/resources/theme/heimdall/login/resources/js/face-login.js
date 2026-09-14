(() => {
    'use strict';

    const capture = document.getElementById('face-capture');
    const video = document.getElementById('face-video');
    const canvas = document.getElementById('face-canvas');
    const form = document.getElementById('face-form');
    const field = document.getElementById('facialImage');
    const button = document.getElementById('kc-login');
    const status = document.getElementById('camera-status');
    let stream = null;
    let submitted = false;

    document.body.classList.add('face-login-page');

    const setStatus = (message, error = false) => {
        status.textContent = message;
        status.classList.toggle('face-status-error', error);
        status.setAttribute('role', error ? 'alert' : 'status');
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }
        video.srcObject = null;
    };

    const cameraErrorMessage = error => {
        if (error && (error.name === 'NotAllowedError' || error.name === 'SecurityError')) {
            return capture.dataset.cameraDenied;
        }
        if (error && (error.name === 'NotFoundError' || error.name === 'OverconstrainedError')) {
            return capture.dataset.cameraNotFound;
        }
        return capture.dataset.cameraError;
    };

    const initializeCamera = async () => {
        stopCamera();
        button.disabled = true;
        setStatus(capture.dataset.cameraInitializing);

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setStatus(capture.dataset.cameraUnsupported, true);
            return;
        }

        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: {ideal: 'user'},
                    width: {ideal: 1280},
                    height: {ideal: 720}
                },
                audio: false
            });
            video.srcObject = stream;
            await video.play();
            button.disabled = false;
            setStatus('');
        } catch (error) {
            stopCamera();
            setStatus(cameraErrorMessage(error), true);
        }
    };

    form.addEventListener('submit', event => {
        event.preventDefault();
        if (submitted || !stream || !video.videoWidth || !video.videoHeight) {
            if (!submitted) setStatus(capture.dataset.captureError, true);
            return;
        }

        submitted = true;
        button.disabled = true;
        button.value = capture.dataset.verifying;
        setStatus(capture.dataset.verifying);

        try {
            const scale = Math.min(1, 1280 / video.videoWidth, 720 / video.videoHeight);
            canvas.width = Math.round(video.videoWidth * scale);
            canvas.height = Math.round(video.videoHeight * scale);
            const context = canvas.getContext('2d');
            if (!context) throw new Error('Canvas is unavailable');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            field.value = canvas.toDataURL('image/jpeg', 0.85);
            stopCamera();
            HTMLFormElement.prototype.submit.call(form);
        } catch (error) {
            submitted = false;
            button.disabled = false;
            button.value = button.defaultValue;
            setStatus(capture.dataset.captureError, true);
        }
    });

    window.addEventListener('pagehide', stopCamera);
    window.addEventListener('beforeunload', stopCamera);
    initializeCamera();
})();
