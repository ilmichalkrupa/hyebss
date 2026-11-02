// slug = fragment adresu (np. gazeta.html#warszawa), prefix = początek nazwy pliku w images/
const magazines = [
    { slug: 'warszawa',         name: 'Warszawa',         prefix: 'Warszawa',   count: 24 },
    { slug: 'creep',            name: 'Creep',            prefix: 'sunscreen2', count: 32 },
    { slug: 'krem-do-opalania', name: 'Krem do opalania', prefix: 'sunscreen3', count: 44 },
    { slug: 'prezydenci',       name: 'Prezydenci',       prefix: 'sunscreen4', count: 44 },
];

const grid = document.getElementById('magazines-grid');
let lightbox = null;

const thumb = (prefix, i) => `images/thumb/${prefix}.${i}.webp`;
const full  = (prefix, i) => `images/full/${prefix}.${i}.webp`;

function makeImg(src, alt, { srcset, sizes } = {}) {
    const img = document.createElement('img');
    img.src = src;
    if (srcset) { img.srcset = srcset; img.sizes = sizes; }
    img.alt = alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.width = 400;
    img.height = 566;
    return img;
}

function renderCoverList() {
    grid.replaceChildren();
    grid.className = 'grid';
    document.title = 'Gazeta – haveyoueverbeensunscreened';

    const home = document.createElement('div');
    home.className = 'back-button-container grid-header';
    home.innerHTML = '<a href="index.html" class="back-button">← Strona główna</a>';
    grid.appendChild(home);

    magazines.forEach((mag) => {
        const a = document.createElement('a');
        a.className = 'magazine';
        a.href = `#${mag.slug}`;

        const h2 = document.createElement('h2');
        h2.textContent = mag.name;

        const img = makeImg(thumb(mag.prefix, 1), `Okładka: ${mag.name}`, {
            srcset: `${thumb(mag.prefix, 1)} 400w, ${full(mag.prefix, 1)} 1400w`,
            sizes: '(max-width: 768px) 50vw, 25vw',
        });

        a.append(h2, img);
        grid.appendChild(a);
    });
}

function renderMagazine(mag) {
    grid.replaceChildren();
    grid.className = 'magazine-detail-view';
    document.title = `${mag.name} – haveyoueverbeensunscreened`;

    const header = document.createElement('div');
    header.className = 'back-button-container';
    const back = document.createElement('a');
    back.href = '#';
    back.className = 'back-button';
    back.textContent = '← Powrót do gazet';
    const h1 = document.createElement('h1');
    h1.className = 'magazine-title';
    h1.textContent = mag.name;
    header.append(back, h1);
    grid.appendChild(header);

    const pages = document.createElement('div');
    pages.className = 'pages-tile-grid';
    for (let i = 1; i <= mag.count; i++) {
        const a = document.createElement('a');
        a.href = full(mag.prefix, i);
        a.className = 'glightbox';
        a.dataset.gallery = mag.slug;
        a.appendChild(makeImg(thumb(mag.prefix, i), `${mag.name}, strona ${i}`));
        pages.appendChild(a);
    }
    grid.appendChild(pages);

    lightbox = GLightbox({ selector: '.glightbox', loop: false });
}

function route() {
    if (lightbox) { lightbox.destroy(); lightbox = null; }
    const slug = decodeURIComponent(location.hash.slice(1));
    const mag = magazines.find((m) => m.slug === slug);
    mag ? renderMagazine(mag) : renderCoverList();
    window.scrollTo(0, 0);
}

window.addEventListener('hashchange', route);
route();
