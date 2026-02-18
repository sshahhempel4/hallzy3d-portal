#!/usr/bin/env python3
"""
Build high-detail, version-matched Java resource packs with obvious visual upgrades.
No shader include overrides: purely texture-based for maximum pack stability.
"""

from __future__ import annotations

import io
import json
import os
import tempfile
import urllib.request
import zipfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageOps

ROOT = Path("/workspace")
LATEST_REFERENCE_VERSION = "1.21.11"

PACKS = [
    ("Hallzy_Cinematic_Detailed_Java_1.21-1.21.1_pf34.zip", 34, "1.21-1.21.1"),
    ("Hallzy_Cinematic_Detailed_Java_1.21.2-1.21.3_pf42.zip", 42, "1.21.2-1.21.3"),
    ("Hallzy_Cinematic_Detailed_Java_1.21.4_pf46.zip", 46, "1.21.4"),
    ("Hallzy_Cinematic_Detailed_Java_1.21.5_pf55.zip", 55, "1.21.5"),
    ("Hallzy_Cinematic_Detailed_Java_1.21.6-1.21.7_pf63.zip", 63, "1.21.6-1.21.7"),
    ("Hallzy_Cinematic_Detailed_Java_1.21.8_pf64.zip", 64, "1.21.8"),
    ("Hallzy_Cinematic_Detailed_Java_1.21.9-1.21.10_pf69.zip", 69, "1.21.9-1.21.10"),
    ("Hallzy_Cinematic_Detailed_Java_1.21.11_pf75.zip", 75, "1.21.11"),
    ("Hallzy_Cinematic_Detailed_Java_1.21.11.zip", 75, "1.21.11"),
    ("Hallzy_Cinematic_Detailed_Java_latest.zip", 75, "1.21.11"),
]

BLOCK_PREFIX = "assets/minecraft/textures/block/"
ITEM_PREFIX = "assets/minecraft/textures/item/"
HUD_PREFIX = "assets/minecraft/textures/gui/sprites/hud/"
MOON_PREFIX = "assets/minecraft/textures/environment/celestial/moon/"

SPECIAL_WATER = {
    "assets/minecraft/textures/block/water_still.png",
    "assets/minecraft/textures/block/water_flow.png",
}
SPECIAL_LAVA = {
    "assets/minecraft/textures/block/lava_still.png",
    "assets/minecraft/textures/block/lava_flow.png",
}
SPECIAL_COLORMAP = {
    "assets/minecraft/textures/colormap/grass.png",
    "assets/minecraft/textures/colormap/foliage.png",
}
SPECIAL_ENV = {
    "assets/minecraft/textures/environment/clouds.png",
    "assets/minecraft/textures/environment/end_sky.png",
    "assets/minecraft/textures/environment/rain.png",
    "assets/minecraft/textures/environment/snow.png",
    "assets/minecraft/textures/environment/celestial/sun.png",
}
SPECIAL_MISC = {"assets/minecraft/textures/misc/vignette.png"}


def fetch_client_zip(version_id: str) -> zipfile.ZipFile:
    manifest_url = "https://piston-meta.mojang.com/mc/game/version_manifest_v2.json"
    manifest = json.load(urllib.request.urlopen(manifest_url, timeout=30))
    version_entry = next(v for v in manifest["versions"] if v["id"] == version_id)
    version_meta = json.load(urllib.request.urlopen(version_entry["url"], timeout=30))
    jar_bytes = urllib.request.urlopen(version_meta["downloads"]["client"]["url"], timeout=120).read()
    return zipfile.ZipFile(io.BytesIO(jar_bytes))


def mult_channel(channel: Image.Image, factor: float) -> Image.Image:
    return channel.point(lambda v: max(0, min(255, int(v * factor))))


def tint_rgb(rgb: Image.Image, factors: tuple[float, float, float]) -> Image.Image:
    r, g, b = rgb.split()
    return Image.merge("RGB", (mult_channel(r, factors[0]), mult_channel(g, factors[1]), mult_channel(b, factors[2])))


def upscale_factor(width: int, height: int) -> int:
    base = min(width, height)
    if base >= 64:
        return 1
    if base >= 32:
        return 2
    if base >= 16:
        return 4
    return 1


def add_film_grain(rgb: Image.Image, amount: float) -> Image.Image:
    noise = Image.effect_noise(rgb.size, 12).convert("L")
    noise_rgb = Image.merge("RGB", (noise, noise, noise))
    return Image.blend(rgb, noise_rgb, amount)


def grade_hd(rgba: Image.Image, upscale: bool = False) -> Image.Image:
    img = rgba
    if upscale:
        factor = upscale_factor(img.width, img.height)
        if factor > 1:
            img = img.resize((img.width * factor, img.height * factor), Image.Resampling.BICUBIC)

    rgb = img.convert("RGB")
    rgb = ImageEnhance.Contrast(rgb).enhance(1.26)
    rgb = ImageEnhance.Color(rgb).enhance(1.18)
    rgb = ImageEnhance.Brightness(rgb).enhance(1.03)
    rgb = rgb.filter(ImageFilter.UnsharpMask(radius=1.3, percent=180, threshold=2))
    rgb = add_film_grain(rgb, 0.06)

    luminance = ImageOps.autocontrast(rgb.convert("L"))
    cool = tint_rgb(rgb, (0.98, 1.00, 1.06))
    warm = tint_rgb(rgb, (1.04, 1.03, 0.99))
    graded = Image.composite(warm, cool, luminance)
    return Image.merge("RGBA", (*graded.split(), img.getchannel("A")))


def transform_water(rgba: Image.Image) -> Image.Image:
    img = grade_hd(rgba, upscale=True)
    rgb = img.convert("RGB")
    rgb = tint_rgb(rgb, (0.84, 1.00, 1.30))
    rgb = ImageEnhance.Color(rgb).enhance(1.25)
    return Image.merge("RGBA", (*rgb.split(), img.getchannel("A")))


def transform_lava(rgba: Image.Image) -> Image.Image:
    img = grade_hd(rgba, upscale=True)
    rgb = img.convert("RGB")
    rgb = tint_rgb(rgb, (1.17, 1.04, 0.87))
    rgb = ImageEnhance.Color(rgb).enhance(1.25)
    return Image.merge("RGBA", (*rgb.split(), img.getchannel("A")))


def transform_colormap(rgba: Image.Image) -> Image.Image:
    rgb = rgba.convert("RGB")
    rgb = ImageEnhance.Color(rgb).enhance(1.28)
    rgb = ImageEnhance.Contrast(rgb).enhance(1.15)
    rgb = tint_rgb(rgb, (0.92, 1.10, 0.92))
    return Image.merge("RGBA", (*rgb.split(), rgba.getchannel("A")))


def transform_env(rgba: Image.Image, glow: bool = False) -> Image.Image:
    rgb = rgba.convert("RGB")
    rgb = ImageEnhance.Contrast(rgb).enhance(1.15)
    rgb = ImageEnhance.Color(rgb).enhance(1.2)
    rgb = tint_rgb(rgb, (0.96, 1.00, 1.09))
    if glow:
        bloom = rgb.filter(ImageFilter.GaussianBlur(radius=max(1, rgba.width // 10)))
        rgb = Image.blend(rgb, bloom, 0.35)
    return Image.merge("RGBA", (*rgb.split(), rgba.getchannel("A")))


def transform_hud(path: str, rgba: Image.Image) -> Image.Image:
    rgb = rgba.convert("RGB")
    if path.endswith("crosshair.png"):
        rgb = tint_rgb(rgb, (0.84, 1.07, 1.24))
        rgb = ImageEnhance.Brightness(rgb).enhance(1.18)
    elif path.endswith("hotbar_selection.png"):
        rgb = tint_rgb(rgb, (0.82, 1.04, 1.24))
        rgb = ImageEnhance.Contrast(rgb).enhance(1.28)
    else:
        rgb = tint_rgb(rgb, (0.88, 0.94, 1.08))
        rgb = ImageEnhance.Contrast(rgb).enhance(1.18)
    return Image.merge("RGBA", (*rgb.split(), rgba.getchannel("A")))


def transform_vignette(rgba: Image.Image) -> Image.Image:
    rgb = Image.new("RGB", rgba.size, (13, 12, 18))
    alpha = rgba.getchannel("A").point(lambda v: max(0, min(255, int(v * 1.32))))
    return Image.merge("RGBA", (*rgb.split(), alpha))


def image_to_png_bytes(img: Image.Image) -> bytes:
    out = io.BytesIO()
    img.save(out, format="PNG")
    return out.getvalue()


def make_pack_icon() -> bytes:
    size = 128
    icon = Image.new("RGBA", (size, size))
    draw = ImageDraw.Draw(icon)
    for y in range(size):
        t = y / (size - 1)
        r = int(16 + 54 * t)
        g = int(24 + 90 * t)
        b = int(44 + 140 * t)
        draw.line([(0, y), (size, y)], fill=(r, g, b, 255))
    draw.rounded_rectangle((8, 8, 120, 120), radius=18, outline=(188, 236, 255, 230), width=4)
    draw.rounded_rectangle((20, 20, 108, 108), radius=14, outline=(132, 204, 255, 180), width=2)
    draw.rectangle((40, 40, 88, 88), outline=(255, 255, 255, 215), width=3)
    draw.line((40, 64, 88, 64), fill=(255, 255, 255, 195), width=2)
    draw.line((64, 40, 64, 88), fill=(255, 255, 255, 195), width=2)
    return image_to_png_bytes(icon)


def should_transform(path: str) -> bool:
    if not path.endswith(".png"):
        return False
    return (
        path.startswith(BLOCK_PREFIX)
        or path.startswith(ITEM_PREFIX)
        or path.startswith(HUD_PREFIX)
        or path.startswith(MOON_PREFIX)
        or path in SPECIAL_WATER
        or path in SPECIAL_LAVA
        or path in SPECIAL_COLORMAP
        or path in SPECIAL_ENV
        or path in SPECIAL_MISC
    )


def transform_by_path(path: str, rgba: Image.Image) -> Image.Image:
    if path in SPECIAL_WATER:
        return transform_water(rgba)
    if path in SPECIAL_LAVA:
        return transform_lava(rgba)
    if path in SPECIAL_COLORMAP:
        return transform_colormap(rgba)
    if path in SPECIAL_MISC:
        return transform_vignette(rgba)
    if path.startswith(HUD_PREFIX):
        return transform_hud(path, rgba)
    if path.startswith(MOON_PREFIX):
        return transform_env(rgba, glow=True)
    if path == "assets/minecraft/textures/environment/celestial/sun.png":
        return transform_env(rgba, glow=True)
    if path in SPECIAL_ENV:
        return transform_env(rgba, glow=False)
    # Default for block and item textures: HD upscale + cinematic grading.
    return grade_hd(rgba, upscale=True)


def build_transformed_assets(client_jar: zipfile.ZipFile) -> dict[str, bytes]:
    assets: dict[str, bytes] = {}

    for path in client_jar.namelist():
        if not should_transform(path):
            continue
        try:
            raw = client_jar.read(path)
            img = Image.open(io.BytesIO(raw)).convert("RGBA")
        except Exception:
            continue
        transformed = transform_by_path(path, img)
        assets[path] = image_to_png_bytes(transformed)

        sidecar = f"{path}.mcmeta"
        if sidecar in client_jar.namelist():
            assets[sidecar] = client_jar.read(sidecar)

    assets["pack.png"] = make_pack_icon()
    return assets


def build_pack_zip(output_name: str, pack_format: int, version_label: str, assets: dict[str, bytes]) -> None:
    pack_meta = {
        "pack": {
            "pack_format": pack_format,
            "description": f"Hallzy Cinematic Detailed HD ({version_label}) - no OptiFine required",
        }
    }

    with tempfile.TemporaryDirectory(prefix="hallzy_cinematic_pack_") as tmp_dir:
        tmp = Path(tmp_dir)
        (tmp / "pack.mcmeta").write_text(json.dumps(pack_meta, indent=2) + "\n", encoding="utf-8")
        for rel_path, data in assets.items():
            out_path = tmp / rel_path
            out_path.parent.mkdir(parents=True, exist_ok=True)
            out_path.write_bytes(data)

        out_zip = ROOT / output_name
        with zipfile.ZipFile(out_zip, "w", compression=zipfile.ZIP_DEFLATED) as zf:
            for dirpath, _, filenames in os.walk(tmp):
                for filename in filenames:
                    full = Path(dirpath) / filename
                    rel = full.relative_to(tmp)
                    zf.write(full, rel.as_posix())


def main() -> None:
    client = fetch_client_zip(LATEST_REFERENCE_VERSION)
    assets = build_transformed_assets(client)
    for output_name, pack_format, version_label in PACKS:
        build_pack_zip(output_name, pack_format, version_label, assets)
        print(f"built {output_name}")


if __name__ == "__main__":
    main()
