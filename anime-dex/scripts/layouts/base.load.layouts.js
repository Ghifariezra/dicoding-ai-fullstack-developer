import { errorComponent } from "../components/error.component.js";
import { loadingComponent } from "../components/loading.js";

export class BaseLoadLayouts {
    constructor(contentContainer) {
        this.contentContainer = contentContainer;
    }

    async loadComponent({ container, fetchCallback, loadTitle, errorTitle, sectionTitle, sectionDesc, cardRenderer }) {
        const targetContainer = container || this.contentContainer;

        loadingComponent(targetContainer, loadTitle);

        try {
            const responseJson = await fetchCallback();
            const items = await this._sortAnime(responseJson.data);

            let htmlContent = '';

            if (sectionTitle && sectionDesc) {
                htmlContent += `
                    <div style="width: 100%; margin-bottom: 10px;">
                        <h3 style="color: var(--primary-color);">${sectionTitle}</h3>
                        <p style="color: var(--text-color); font-size: 0.9rem;">${sectionDesc}</p>
                    </div>
                `;
            }

            htmlContent += items.map(cardRenderer).join('');

            targetContainer.innerHTML = htmlContent;
        } catch (error) {
            errorComponent(targetContainer, errorTitle);
        }
    }

    async loadDetailComponent({ fetchCallback, loadTitle, errorTitle, detailRenderer, postRenderCallback }) {
        loadingComponent(this.contentContainer, loadTitle);

        try {
            const responseJson = await fetchCallback();
            const data = responseJson.data;

            this.contentContainer.innerHTML = detailRenderer(data);

            if (postRenderCallback) {
                postRenderCallback();
            }
        } catch (error) {
            errorComponent(this.contentContainer, errorTitle);
        }
    }

    async _sortAnime(data) {
        const shuffledAnimes = [...data].sort(() => 0.5 - Math.random());
        const selectedAnimes = shuffledAnimes.slice(0, 5);
        return selectedAnimes;
    }
}