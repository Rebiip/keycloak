(() => {
    const initializeCursorFrame = () => {
        const cursorFrame = document.createElement('div');

        cursorFrame.className = 'heimdall-cursor-frame';
        cursorFrame.setAttribute('aria-hidden', 'true');

        const cursorLabelMeta = document.querySelector(
            'meta[name="heimdall-cursor-label"]'
        );

        const cursorLabel = document.createElement('span');
        const usernameInput = document.querySelector('#username');
        const defaultCursorLabel = cursorLabelMeta
            ? cursorLabelMeta.content
            : 'User';

        cursorLabel.className = 'heimdall-cursor-frame-label';
        cursorLabel.textContent = defaultCursorLabel;

        cursorFrame.appendChild(cursorLabel);

        document.documentElement.appendChild(cursorFrame);

        let animationFrame = null;
        let pointerX = 0;
        let pointerY = 0;

        const updateCursorFrame = () => {
            animationFrame = null;

            cursorFrame.style.transform =
                `translate3d(${pointerX - 60}px, ${pointerY - 52}px, 0)`;
        };

        const moveCursorFrame = (event) => {
            pointerX = event.clientX;
            pointerY = event.clientY;

            cursorFrame.classList.add('is-visible');

            if (animationFrame === null) {
                animationFrame = requestAnimationFrame(
                    updateCursorFrame
                );
            }
        };

        const hideCursorFrame = () => {
            cursorFrame.classList.remove('is-visible');
        };

        const updateCursorLabel = () => {
            const username = usernameInput.value.trim();
            const hasUsername = username.length > 0;

            cursorLabel.textContent = hasUsername
                ? username
                : defaultCursorLabel;
            cursorFrame.classList.toggle('has-username', hasUsername);
        };

        document.addEventListener(
            'pointermove',
            moveCursorFrame
        );

        if (usernameInput) {
            usernameInput.addEventListener(
                'focus',
                updateCursorLabel
            );

            usernameInput.addEventListener(
                'input',
                updateCursorLabel
            );
        }

        document.addEventListener(
            'pointerleave',
            hideCursorFrame
        );

        window.addEventListener(
            'blur',
            hideCursorFrame
        );
    };

    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            initializeCursorFrame,
            { once: true }
        );
    } else {
        initializeCursorFrame();
    }
})();
