export function loadingComponent(container, title) {
    container.innerHTML = `
        <div id="loading" style="width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 0; gap: 15px;">
            <iframe 
                src="https://lottie.host/embed/f1fec7eb-73ec-4387-aa3e-795f79167cdf/vVpbNeXmmf.lottie" 
                style="width: 250px; height: 250px; border: none;"
                title="Loading Animation">
            </iframe>
            <p style="font-size: 1.1rem; font-weight: 600; color: var(--text-color, #333); margin: 0;">${title}</p>
        </div>
    `;
}