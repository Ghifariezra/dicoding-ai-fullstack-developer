import { FetchDataAPI } from "./fetch.js";

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class JikanMoe extends FetchDataAPI {
    _BASE_URL = 'https://api.jikan.moe/v4';
    _cache = {};

    // 1. Mengambil Top Anime
    async getTopAnime() {
        const url = `${this._BASE_URL}/top/anime`;
        return await this._fetchWithRetry(url);
    }

    // 2. Mengambil Anime Musim Ini
    async getSeasonNow() {
        const url = `${this._BASE_URL}/seasons/now`;
        return await this._fetchWithRetry(url);
    }

    // 3. Mengambil Karakter Terpopuler
    async getTopCharacters() {
        const url = `${this._BASE_URL}/top/characters`;
        return await this._fetchWithRetry(url);
    }

    // 4. Mengambil Detail Full Anime berdasarkan ID dengan Fallback
    async getAnimeDetail(id) {
        await delay(500);

        try {
            const urlFull = `${this._BASE_URL}/anime/${id}/full`;
            return await this._fetchWithRetry(urlFull, 3, 2000);

        } catch (error) {
            console.warn(`Endpoint /full gagal (504). Mengalihkan ke data dasar untuk ID ${id}...`);

            const urlBasic = `${this._BASE_URL}/anime/${id}`;
            return await this._fetchWithRetry(urlBasic, 3, 1000);
        }
    }

    async _fetchWithRetry(url, retries = 3, delayMs = 1500) {
        if (this._cache[url]) {
            // console.log(`[Cache Hit] Mengambil data dari cache lokal untuk: ${url}`);
            return this._cache[url];
        }

        for (let i = 0; i < retries; i++) {
            try {
                const data = await this.get(url);

                this._cache[url] = data;

                return data;
            } catch (error) {
                console.warn(`[Percobaan ${i + 1}/${retries}] Gagal mengambil data dari ${url}. Menunggu ${delayMs}ms...`);
                if (i < retries - 1) {
                    await delay(delayMs);
                } else {
                    throw error;
                }
            }
        }
    }
}

export const jikanMoeInstance = new JikanMoe();