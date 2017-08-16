if ('serviceWorker' in navigator) {
    const swUrl = new URL('./sw.js', location).href;

    window.addEventListener('load', () => {
        navigator.serviceWorker.register(swUrl).catch((error) => {
            console.log(`Service worker registration failed: ${error}`);
        });

        const currentController = navigator.serviceWorker.controller;

        if (currentController && currentController.scriptURL === swUrl) {
            // Success
        } else {
            navigator.serviceWorker.oncontrollerchange = (event) => {
                if (event.target.controller.scriptURL === swUrl) {
                    // Success
                }
            };
        }
    });
} else {
    console.log('Browser does not support service workers.');
}