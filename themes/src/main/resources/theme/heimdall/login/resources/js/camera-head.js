(() => {
    const TILT_LIMIT_DEG = 25;
    const HEAD_WIDTH = 312;
    const HEAD_HEIGHT = 260;

    const initializeCameraHead = () => {
        const page = document.querySelector('.login-pf-page');

        if (!page) {
            return;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const pageStyle = getComputedStyle(page);

        const headLeft = parseFloat(
            pageStyle.getPropertyValue('--camera-head-left')
        ) || 0;
        const headTop = parseFloat(
            pageStyle.getPropertyValue('--camera-head-top')
        ) || 0;
        const originX = (parseFloat(
            pageStyle.getPropertyValue('--camera-head-origin-x')
        ) || 0) / 100;
        const originY = (parseFloat(
            pageStyle.getPropertyValue('--camera-head-origin-y')
        ) || 0) / 100;

        let animationFrame = null;
        let pointerX = 0;
        let pointerY = 0;

        const updateCameraHead = () => {
            animationFrame = null;

            const pageRect = page.getBoundingClientRect();

            const pivotX = pageRect.left + headLeft + originX * HEAD_WIDTH;
            const pivotY = pageRect.top + headTop + originY * HEAD_HEIGHT;

            const angle = Math.atan2(
                pointerY - pivotY,
                pointerX - pivotX
            ) * 180 / Math.PI;

            const tilt = Math.max(
                -TILT_LIMIT_DEG,
                Math.min(TILT_LIMIT_DEG, angle)
            );

            page.style.setProperty(
                '--camera-head-tilt',
                `${tilt}deg`
            );
        };

        const moveCameraHead = (event) => {
            pointerX = event.clientX;
            pointerY = event.clientY;

            if (animationFrame === null) {
                animationFrame = requestAnimationFrame(
                    updateCameraHead
                );
            }
        };

        document.addEventListener(
            'pointermove',
            moveCameraHead
        );
    };

    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            initializeCameraHead,
            { once: true }
        );
    } else {
        initializeCameraHead();
    }
})();
