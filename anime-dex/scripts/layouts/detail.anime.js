import { jikanMoeInstance } from "../data/jikan.js";
import { BaseLoadLayouts } from "./base.load.layouts.js";

export class DetailAnime extends BaseLoadLayouts {
    constructor(welcomeArticle, contentContainer, animeId, loadPage) {
        super(contentContainer);
        this.welcomeArticle = welcomeArticle;
        this.animeId = animeId;
        this.loadPage = loadPage;
    }

    render() {
        (async () => {
            await this._renderPage();
        })();
    }

    async _renderPage() {
        this.welcomeArticle.style.display = 'none';
        this.contentContainer.innerHTML = '';
        this.contentContainer.classList.remove('anime-grid');
        this.contentContainer.style.display = 'block';

        await this.loadDetailComponent({
            fetchCallback: () => jikanMoeInstance.getAnimeDetail(this.animeId),
            loadTitle: "Loading anime details... 🎬",
            errorTitle: "Failed to load anime details.",

            detailRenderer: (anime) => `
                <div class="detail-container" style="background: #fff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                    <button id="btn-back" style="margin-bottom: 20px; padding: 8px 16px; cursor: pointer; border-radius: 6px; border: 1px solid #ccc;">← Back</button>
                    
                    <div style="display: flex; gap: 30px; flex-wrap: wrap;">
                        <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}" style="border-radius: 8px; width: 250px; object-fit: cover;">
                        
                        <div style="flex: 1; min-width: 280px;">
                            <h2 style="color: var(--primary-color); font-size: 2rem; margin-bottom: 10px;">${anime.title}</h2>
                            <p style="color: #666; font-size: 1.1rem; margin-bottom: 15px;"><em>${anime.title_japanese || ''}</em></p>
                            
                            <p><strong>⭐ Score:</strong> ${anime.score || 'N/A'} (${anime.scored_by ? anime.scored_by.toLocaleString() + ' votes' : ''})</p>
                            <p><strong>📺 Type / Status:</strong> ${anime.type} / ${anime.status}</p>
                            <p><strong>🎞️ Episodes:</strong> ${anime.episodes || 'Unknown'}</p>
                            <p><strong>🏷️ Genres:</strong> ${anime.genres.map(g => g.name).join(', ')}</p>
                            <p><strong>🏢 Studio:</strong> ${anime.studios.map(s => s.name).join(', ')}</p>
                            <p><strong>🔞 Rating:</strong> ${anime.rating || 'N/A'}</p>
                        </div>
                    </div>

                    <div style="margin-top: 30px;">
                        <h3>Synopsis</h3>
                        <p style="line-height: 1.6; color: var(--text-color); margin-top: 10px;">${anime.synopsis || 'No synopsis available.'}</p>
                    </div>

                    ${anime.trailer?.embed_url ? `
                        <div style="margin-top: 30px;">
                            <h3>Official Trailer</h3>
                            <iframe src="${anime.trailer.embed_url}" width="100%" height="400" frameborder="0" allowfullscreen style="margin-top: 10px; border-radius: 8px;"></iframe>
                        </div>
                    ` : ''}
                </div>
            `,

            postRenderCallback: () => {
                document.getElementById('btn-back').addEventListener('click', () => {
                    const welcomeArticle = document.querySelector(".welcome-article");
                    this.loadPage('beranda', this.contentContainer, welcomeArticle);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            }
        });
    }
}