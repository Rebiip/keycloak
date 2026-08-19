(() => {
    const initializeCursorFrame = () => {
        const cursorFrame = document.createElement('div');

        cursorFrame.className = 'heimdall-cursor-frame';
        cursorFrame.setAttribute('aria-hidden', 'true');

        const cursorLabelMeta = document.querySelector(
            'meta[name="heimdall-cursor-label"]'
        );

        const cursorLabel = document.createElement('span');

        cursorLabel.className = 'heimdall-cursor-frame-label';
        cursorLabel.textContent = cursorLabelMeta
            ? cursorLabelMeta.content
            : 'User';

        cursorFrame.appendChild(cursorLabel);

        document.documentElement.appendChild(cursorFrame);

        let animationFrame = null;
        let pointerX = 0;
        let pointerY = 0;

        const updateCursorFrame = () => {
            animationFrame = null;

            cursorFrame.style.transform =
                `translate3d(${pointerX - 36}px, ${pointerY - 32}px, 0)`;
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
            cursorFrame.classList.remove('is-pressed');
        };

        const pressCursorFrame = () => {
            cursorFrame.classList.add('is-pressed');
        };

        const releaseCursorFrame = () => {
            cursorFrame.classList.remove('is-pressed');
        };

        document.addEventListener(
            'pointermove',
            moveCursorFrame
        );

        document.addEventListener(
            'pointerdown',
            pressCursorFrame
        );

        document.addEventListener(
            'pointerup',
            releaseCursorFrame
        );

        document.addEventListener(
            'pointercancel',
            releaseCursorFrame
        );

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
