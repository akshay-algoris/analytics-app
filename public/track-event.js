(function () {
    const analyticsEndpoint = "https://analytics-iuvzjvfxc-akshayalgoris-projects.vercel.app/api/track";

    function sendEvent(eventName, eventData) {
        fetch(analyticsEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                event: eventName,
                data: eventData,
                userAgent: navigator.userAgent, // Send User-Agent from the client
                timestamp: new Date().toISOString(),
            }),
        }).catch((error) => console.error("Analytics Error:", error));
    }

    sendEvent("page_view", {
        url: window.location.href,
        referrer: document.referrer,
    });
})();
