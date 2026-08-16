import { Beranda } from "../layouts/beranda.js";
import { TopAnime } from "../layouts/top.anime.js";
import { MusimIni } from "../layouts/current.season.js";

export function loadPage(page, contentContainer, welcomeArticle) {
    contentContainer.innerHTML = '<p id="loading">Loading page...</p>';

    const beranda = new Beranda(contentContainer);
    const topAnime = new TopAnime(contentContainer);
    const musimIni = new MusimIni(contentContainer);

    switch (page) {
        case 'beranda':
            welcomeArticle.style.display = 'block';
            beranda.render();
            break;

        case 'top-anime':
            welcomeArticle.style.display = 'none';
            topAnime.render();
            break;

        case 'musim-ini':
            welcomeArticle.style.display = 'none';
            musimIni.render();
            break;

        default:
            welcomeArticle.style.display = 'block';
            beranda.render();
    }
}