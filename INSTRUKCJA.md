# Wdrożenie nowej wersji strony

## Co jest w paczce
| Ścieżka | Opis |
|---|---|
| index.html, gazeta.html, audio.html, index.css | poprawiony kod (mobile, nawigacja, adresy #gazety) |
| js/gazeta.js, js/audio.js | skrypty (wyniesione z HTML) |
| tracks.json | lista nagrań – tu dopisujesz nowe utwory |
| images/thumb/, images/full/ | obrazy WebP (400 px i 1400 px), zamiast images/*.jpeg |
| bg.webp | tło (228 kB zamiast 1,5 MB), zamiast gwiazdki.jpg |
| vendor/ | GLightbox 3.3.1 lokalnie (zamiast CDN) |
| _headers | nagłówki bezpieczeństwa i cache (Cloudflare Pages) |
| .gitignore | blokuje .DS_Store |
| scripts/optimize_images.py | konwersja nowych skanów gazet do WebP |

## Nowa gazeta
1. Wrzuć skany jako images/NAZWA.1.jpeg, NAZWA.2.jpeg, …
2. `python scripts/optimize_images.py`, potem usuń pliki .jpeg.
3. Dopisz wiersz w js/gazeta.js w tablicy `magazines`.

## Nowe nagranie (po przejściu na R2)
1. Wgraj plik MP3 do bucketu R2 (nazwa bez spacji i polskich znaków).
2. Dopisz linię w tracks.json: `{ "title": "Tytuł", "file": "nazwa.mp3" }`.
