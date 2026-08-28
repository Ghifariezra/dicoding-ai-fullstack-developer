import { jikanMoeInstance } from "../data/jikan.js";
import { BaseLoadLayouts } from "./base.load.layouts.js";

export class MusimIni extends BaseLoadLayouts {
    constructor(contentContainer) {
        super(contentContainer);
    }

    async _sortAnime(data) {
        return data;
    }

    render() {
        this.contentContainer.innerHTML = '';
        this.contentContainer.className = '';
        this.contentContainer.style.display = 'block';

        const headerDiv = document.createElement('div');
        headerDiv.style.marginBottom = '25px';
        headerDiv.innerHTML = `
            <h3 style="color: var(--primary-color); font-size: 1.5rem;">🌸 Currently Airing This Season</h3>
            <p style="color: var(--text-color); font-size: 0.95rem; margin-top: 5px;">List of anime currently broadcasting this season.</p>
        `;
        this.contentContainer.appendChild(headerDiv);

        const gridContainer = document.createElement('section');
        gridContainer.className = 'anime-grid';
        this.contentContainer.appendChild(gridContainer);

        this.loadComponent({
            container: gridContainer,
            fetchCallback: () => jikanMoeInstance.getSeasonNow(),
            loadTitle: "Fetching Currently Airing Anime... 📺",
            errorTitle: "Failed to load current season anime.",
            cardRenderer: (anime) => `
                <article class="anime-card" data-id="${anime.mal_id}" style="cursor: pointer; position: relative;" tabindex="0">
                    <!-- Badge Status di pojok kiri atas gambar -->
                    <div style="position: absolute; top: 0; left: 0; background: var(--secondary-color, #ff9800); color: white; padding: 5px 12px; border-radius: 8px 0 8px 0; font-weight: bold; z-index: 1; font-size: 0.85rem;">
                        ${anime.status || 'Airing'}
                    </div>
                    
                    <img src="${anime.images.jpg.image_url}" alt="Poster ${anime.title}">
                    <div class="anime-info">
                        <h3 style="font-size: 1.1rem; margin-bottom: 8px;">${anime.title}</h3>
                        <p class="rating">⭐ Score: <strong>${anime.score || 'N/A'}</strong></p>
                        <p><strong>📺 Type:</strong> ${anime.type || 'Unknown'} (${anime.episodes || '?'} eps)</p>
                        <p><strong>🏷️ Genres:</strong> ${anime.genres ? anime.genres.map(g => g.name).join(', ') : 'N/A'}</p>
                    </div>
                </article>
            `
        });
    }
}