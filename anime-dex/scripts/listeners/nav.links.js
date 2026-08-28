export function navLinkListener(navLinks, contentContainer, welcomeArticle, loadPage) {
    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetPage = event.target.getAttribute("data-page");
            loadPage(targetPage, contentContainer, welcomeArticle);
        });
    });
}