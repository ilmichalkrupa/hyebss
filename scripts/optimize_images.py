"""Generuje lekkie wersje WebP obrazów strony.

Użycie (z katalogu głównego repo):
    pip install pillow
    python scripts/optimize_images.py

Wejście:  images/*.jpeg, gwiazdki.jpg
Wyjście:  images/thumb/*.webp (400 px), images/full/*.webp (1400 px), bg.webp (1920 px)
Metadane EXIF są usuwane.
"""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "images"
VARIANTS = {"thumb": (400, 72), "full": (1400, 80)}  # szerokość px, jakość WebP


def save_webp(im: Image.Image, dst: Path, width: int, quality: int) -> None:
    im = ImageOps.exif_transpose(im).convert("RGB")
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    dst.parent.mkdir(parents=True, exist_ok=True)
    im.save(dst, "WEBP", quality=quality, method=6)


def main() -> None:
    files = sorted(SRC.glob("*.jp*g"))
    for f in files:
        with Image.open(f) as im:
            for name, (w, q) in VARIANTS.items():
                save_webp(im, SRC / name / f"{f.stem}.webp", w, q)
    bg = ROOT / "gwiazdki.jpg"
    if bg.exists():
        with Image.open(bg) as im:
            save_webp(im, ROOT / "bg.webp", 1920, 70)
    print(f"Przetworzono {len(files)} obrazów.")


if __name__ == "__main__":
    main()
