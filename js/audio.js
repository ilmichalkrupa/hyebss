// Lista utworów jest w pliku tracks.json:
//   "base"  – adres folderu z plikami (np. "audio/" albo "https://audio.twojadomena.com/")
//   "tracks" – tytuł + nazwa pliku; kolejność = kolejność na stronie
(async () => {
    const container = document.getElementById('audio-list-container');

    const showMessage = (text) => {
        container.replaceChildren();
        const p = document.createElement('p');
        p.className = 'status-msg';
        p.textContent = text;
        container.appendChild(p);
    };

    let data;
    try {
        const res = await fetch('tracks.json', { cache: 'no-cache' });
        if (!res.ok) throw new Error(res.status);
        data = await res.json();
    } catch (err) {
        showMessage('Nie udało się wczytać listy nagrań. Odśwież stronę.');
        return;
    }

    const base = data.base || 'audio/';
    container.replaceChildren();

    data.tracks.forEach((track) => {
        const item = document.createElement('div');
        item.className = 'audio-item';

        const title = document.createElement('p');
        title.className = 'audio-track-title';
        title.textContent = track.title;

        const audio = document.createElement('audio');
        audio.controls = true;
        audio.preload = 'none'; // nic nie jest pobierane, dopóki nie klikniesz „play”
        audio.src = base + encodeURIComponent(track.file);

        audio.addEventListener('error', () => {
            const err = document.createElement('p');
            err.className = 'audio-error';
            err.textContent = 'Ten plik jest teraz niedostępny.';
            if (!item.querySelector('.audio-error')) item.appendChild(err);
        });

        item.append(title, audio);
        container.appendChild(item);
    });

    // Gra tylko jedno nagranie naraz
    container.addEventListener('play', (e) => {
        container.querySelectorAll('audio').forEach((a) => {
            if (a !== e.target) a.pause();
        });
    }, true);
})();
