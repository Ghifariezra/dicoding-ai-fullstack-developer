export function errorComponent(container, errorMessage) {
    container.innerHTML = `
        <article class="anime-card" style="padding: 30px 20px; width: 100%; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <iframe 
                src="https://lottie.host/embed/cee126fe-7ea7-42cc-b021-61398fcf410f/tYDjCcM6yq.lottie" 
                style="width: 350px; height: 280px; border: none;"
                title="Error Animation">
            </iframe>
            <h3 style="color: #e74c3c; margin: -30px 0 10px 0; font-size: 1.5rem; font-weight: 700;">Oops! Failed to fetch data.</h3>
            <p style="color: #666; margin: 0; max-width: 500px; line-height: 1.5; font-size: 1.05rem;">${errorMessage}</p>
        </article>
    `;
}