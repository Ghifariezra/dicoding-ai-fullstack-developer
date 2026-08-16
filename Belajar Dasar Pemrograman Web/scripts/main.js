import { loadPage } from "./pages/load.page.js";
import { DetailAnime } from "./layouts/detail.anime.js";
import { renderFooter } from "./layouts/footer.js";
import { navLinkListener } from "./listeners/nav.links.js";
import { toggleMenu } from "./listeners/toggle.js";

document.addEventListener("DOMContentLoaded", () => {
    const logo = document.getElementById("logo-container");
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll(".nav-links a[data-page]");
    const contentContainer = document.getElementById("anime-container");
    const welcomeArticle = document.querySelector(".welcome-article");

    // 1. Tambahkan Event Listener untuk logo
    if (logo) {
        logo.addEventListener("click", (event) => {
            event.preventDefault();
            loadPage('beranda', contentContainer, welcomeArticle);
        });
    }

    // 2. Tambahkan Event Listener untuk tombol hamburger
    toggleMenu(hamburgerBtn, navMenu);    

    // 3. Tambahkan Event Listener pada setiap tautan navigasi
    navLinkListener(navLinks, contentContainer, welcomeArticle, loadPage);
    
    // 4. Jalankan loadPage('beranda') secara default saat web pertama kali dibuka
    loadPage('beranda', contentContainer, welcomeArticle);
    
    const footer = document.getElementById("footer");
    renderFooter(footer);

    document.addEventListener('click', (event) => {
        const card = event.target.closest('.anime-card');
        if (card && card.dataset.id) {
            const animeId = card.dataset.id;
            const detailView = new DetailAnime(
                welcomeArticle,
                contentContainer, 
                animeId, 
                loadPage
            );
            detailView.render();
        }
    });
});