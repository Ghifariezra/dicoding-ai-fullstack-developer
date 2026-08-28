import { delay, jikanMoeInstance } from "../data/jikan.js";
import { BaseLoadLayouts } from "./base.load.layouts.js";

export class Beranda extends BaseLoadLayouts {
    constructor(contentContainer) {
        super(contentContainer);
    }

    render() {
        (async () => {
            await this._renderPage();
        })();
    }

    async _renderPage() {
        // Bersihkan kontainer utama
        this.contentContainer.innerHTML = '';
        this.contentContainer.classList.remove('anime-grid');
        this.contentContainer.style.display = 'block';

        // Buat 3 kontainer seksi terpisah menggunakan fungsi helper
        const recommendationsSection = this._createSection();
        const seasonNowSection = this._createSection();
        const charactersSection = this._createSection(false);

        // Tempelkan seksi ke halaman
        this.contentContainer.append(recommendationsSection, seasonNowSection, charactersSection);

        // Render secara berurutan
        await this._recommendationsComponent(recommendationsSection);
        await delay(1000);
        await this._seasonNowComponent(seasonNowSection);
        await delay(1000);
        await this._charactersComponent(charactersSection);

        // Aksesibilitas Keyboard (Enter)
        this.contentContainer.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                const focusedCard = event.target.closest('.anime-card');
                if (focusedCard) {
                    event.preventDefault();
                    focusedCard.click();
                }
            }
        });
    }

    _createSection(withMargin = true) {
        const section = document.createElement('section');
        section.className = 'anime-grid';
        if (withMargin) section.style.marginBottom = '40px';
        return section;
    }

    async _recommendationsComponent(container) {
        await this.loadComponent({
            container: container,
            fetchCallback: () => jikanMoeInstance.getTopAnime(),
            loadTitle: "Searching for 5 special recommendations... 🎲",
            errorTitle: "Failed to load recommendations.",
            sectionTitle: "Today's Top 5 Recommendations",
            sectionDesc: "Check out these anime picks—you might just find your next favorite show!",
            cardRenderer: (anime) => this._animeCardTemplate(anime, `<strong>Genre:</strong> ${anime.genres.map(g => g.name).join(', ')}`)
        });
    }

    async _seasonNowComponent(container) {
        await this.loadComponent({
            container: container,
            fetchCallback: () => jikanMoeInstance.getSeasonNow(),
            loadTitle: "Fetching currently airing anime... 📺",
            errorTitle: "Failed to load currently airing anime.",
            sectionTitle: "Currently Airing This Season",
            sectionDesc: "Trending shows that are actively broadcasting right now!",
            cardRenderer: (anime) => this._animeCardTemplate(anime, `<strong>Episodes:</strong> ${anime.episodes ? anime.episodes + ' eps' : 'Airing'}`)
        });
    }

    async _charactersComponent(container) {
        await this.loadComponent({
            container: container,
            fetchCallback: () => jikanMoeInstance.getTopCharacters(),
            loadTitle: "Loading popular anime characters... 👤",
            errorTitle: "Failed to load popular characters.",
            sectionTitle: "Most Popular Characters",
            sectionDesc: "Fan-favorite iconic characters in anime history.",
            cardRenderer: (char) => `
                <article class="anime-card" data-id="${char.mal_id}" style="cursor: pointer;" tabindex="0" role="button" aria-label="Lihat detail karakter ${char.name}">
                    <img src="${char.images.jpg.image_url}" alt="Foto karakter ${char.name}">
                    <div class="anime-info">
                        <h3>${char.name}</h3>
                        <p class="rating">❤️ Favorites: ${char.favorites ? char.favorites.toLocaleString() : 'N/A'}</p>
                        <p title="${char.about ? char.about : ''}">${char.about ? char.about.substring(0, 80) + '...' : 'No character bio available.'}</p>
                    </div>
                </article>
            `
        });
    }

    _animeCardTemplate(anime, extraInfo) {
        return `
            <article class="anime-card" data-id="${anime.mal_id}" style="cursor: pointer;" tabindex="0" role="button" aria-label="Lihat detail anime ${anime.title}">
                <img src="${anime.images.jpg.image_url}" alt="Poster anime ${anime.title}">
                <div class="anime-info">
                    <h3>${anime.title}</h3>
                    <p class="rating">⭐ Score: ${anime.score ? anime.score : 'N/A'}</p>
                    <p>${extraInfo}</p>
                    <p title="${anime.synopsis ? anime.synopsis : 'No synopsis available.'}">${anime.synopsis ? anime.synopsis.substring(0, 100) + '...' : 'No synopsis available.'}</p>
                </div>
            </article>
        `;
    }
}