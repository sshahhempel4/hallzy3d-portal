#!/usr/bin/env python3
"""
Build version-matched, texture-heavy Java resource packs with obvious visual changes.
These avoid shader-include overrides to maximize compatibility.
"""

from __future__ import annotations

import io
import json
import os
import tempfile
import urllib.request
import zipfile
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter, ImageOps

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
    # Friendly aliases for latest build.
    ("Hallzy_Cinematic_Detailed_Java_1.21.11.zip", 75, "1.21.11"),
    ("Hallzy_Cinematic_Detailed_Java_latest.zip", 75, "1.21.11"),
]

DETAIL_TEXTURES = [
    "assets/minecraft/textures/block/stone.png",
    "assets/minecraft/textures/block/dirt.png",
    "assets/minecraft/textures/block/cobblestone.png",
    "assets/minecraft/textures/block/grass_block_top.png",
    "assets/minecraft/textures/block/grass_block_side.png",
    "assets/minecraft/textures/block/sand.png",
    "assets/minecraft/textures/block/oak_planks.png",
    "assets/minecraft/textures/block/deepslate.png",
    "assets/minecraft/textures/block/andesite.png",
    "assets/minecraft/textures/block/diorite.png",
    "assets/minecraft/textures/block/granite.png",
    "assets/minecraft/textures/block/netherrack.png",
    "assets/minecraft/textures/block/end_stone.png",
]

HUD_TEXTURES = [
    "assets/minecraft/textures/gui/sprites/hud/hotbar.png",
    "assets/minecraft/textures/gui/sprites/hud/hotbar_selection.png",
    "assets/minecraft/textures/gui/sprites/hud/crosshair.png",
]

WATER_TEXTURES = [
    "assets/minecraft/textures/block/water_still.png",
    "assets/minecraft/textures/block/water_flow.png",
]

LAVA_TEXTURES = [
    "assets/minecraft/textures/block/lava_still.png",
    "assets/minecraft/textures/block/lava_flow.png",
]

COLORMAP_TEXTURES = [
    "assets/minecraft/textures/colormap/grass.png",
    "assets/minecraft/textures/colormap/foliage.png",
]

ENVIRONMENT_TEXTURES = [
    "assets/minecraft/textures/environment/clouds.png",
    "assets/minecraft/textures/environment/end_sky.png",
    "assets/minecraft/textures/environment/rain.png",
    "assets/minecraft/textures/environment/snow.png",
    "assets/minecraft/textures/environment/celestial/sun.png",
]

MISC_TEXTURES = [
    "assets/minecraft/textures/misc/vignette.png",
]

MOON_PREFIX = "assets/minecraft/textures/environment/celestial/moon/"


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


def grade_cinematic(rgba: Image.Image) -> Image.Image:
    rgb = rgba.convert("RGB")
    detailed = rgb.filter(ImageFilter.DETAIL).filter(ImageFilter.UnsharpMask(radius=1.2, percent=170, threshold=2))
    mixed = Image.blend(rgb, detailed, 0.7)
    mixed = ImageEnhance.Contrast(mixed).enhance(1.28)
    mixed = ImageEnhance.Color(mixed).enhance(1.15)
    mixed = ImageEnhance.Brightness(mixed).enhance(1.03)

    luminance = ImageOps.autocontrast(mixed.convert("L"))
    cool = tint_rgb(mixed, (0.97, 1.00, 1.06))
    warm = tint_rgb(mixed, (1.05, 1.03, 0.98))
    graded = Image.composite(warm, cool, luminance)
    return Image.merge("RGBA", (*graded.split(), rgba.getchannel("A")))


def transform_detail(rgba: Image.Image) -> Image.Image:
    return grade_cinematic(rgba)


def transform_water(rgba: Image.Image) -> Image.Image:
    rgb = rgba.convert("RGB")
    rgb = ImageEnhance.Contrast(rgb).enhance(1.2)
    rgb = ImageEnhance.Color(rgb).enhance(1.35)
    rgb = tint_rgb(rgb, (0.85, 1.02, 1.28))
    return Image.merge("RGBA", (*rgb.split(), rgba.getchannel("A")))


def transform_lava(rgba: Image.Image) -> Image.Image:
    rgb = rgba.convert("RGB")
    rgb = ImageEnhance.Contrast(rgb).enhance(1.22)
    rgb = ImageEnhance.Color(rgb).enhance(1.32)
    rgb = tint_rgb(rgb, (1.16, 1.03, 0.88))
    return Image.merge("RGBA", (*rgb.split(), rgba.getchannel("A")))


def transform_colormap(rgba: Image.Image) -> Image.Image:
    rgb = rgba.convert("RGB")
    rgb = ImageEnhance.Color(rgb).enhance(1.3)
    rgb = ImageEnhance.Contrast(rgb).enhance(1.15)
    rgb = tint_rgb(rgb, (0.9, 1.1, 0.9))
    return Image.merge("RGBA", (*rgb.split(), rgba.getchannel("A")))


def transform_environment(rgba: Image.Image) -> Image.Image:
    rgb = rgba.convert("RGB")
    rgb = ImageEnhance.Contrast(rgb).enhance(1.15)
    rgb = ImageEnhance.Color(rgb).enhance(1.18)
    rgb = tint_rgb(rgb, (0.96, 1.00, 1.08))
    return Image.merge("RGBA", (*rgb.split(), rgba.getchannel("A")))


def transform_sun_or_moon(rgba: Image.Image) -> Image.Image:
    rgb = rgba.convert("RGB")
    rgb = ImageEnhance.Brightness(rgb).enhance(1.12)
    rgb = ImageEnhance.Color(rgb).enhance(1.1)
    glow = rgb.filter(ImageFilter.GaussianBlur(radius=max(1, rgba.width // 12)))
    merged = Image.blend(rgb, glow, 0.35)
    return Image.merge("RGBA", (*merged.split(), rgba.getchannel("A")))


def transform_hud(path: str, rgba: Image.Image) -> Image.Image:
    rgb = rgba.convert("RGB")
    alpha = rgba.getchannel("A")
    if path.endswith("crosshair.png"):
        rgb = tint_rgb(rgb, (0.85, 1.05, 1.2))
        rgb = ImageEnhance.Brightness(rgb).enhance(1.15)
    elif path.endswith("hotbar_selection.png"):
        rgb = tint_rgb(rgb, (0.8, 1.05, 1.25))
        rgb = ImageEnhance.Contrast(rgb).enhance(1.25)
    else:
        rgb = tint_rgb(rgb, (0.86, 0.92, 1.08))
        rgb = ImageEnhance.Contrast(rgb).enhance(1.2)
    return Image.merge("RGBA", (*rgb.split(), alpha))


def transform_vignette(rgba: Image.Image) -> Image.Image:
    rgb = Image.new("RGB", rgba.size, (14, 12, 20))
    alpha = rgba.getchannel("A").point(lambda v: max(0, min(255, int(v * 1.28))))
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
        r = int(20 + 40 * t)
        g = int(26 + 70 * t)
        b = int(50 + 120 * t)
        draw.line([(0, y), (size, y)], fill=(r, g, b, 255))

    draw.rounded_rectangle((8, 8, 120, 120), radius=18, outline=(180, 230, 255, 220), width=4)
    draw.rounded_rectangle((20, 20, 108, 108), radius=14, outline=(120, 190, 255, 180), width=2)
    draw.rectangle((42, 42, 86, 86), outline=(255, 255, 255, 210), width=3)
    draw.line((42, 64, 86, 64), fill=(255, 255, 255, 190), width=2)
    draw.line((64, 42, 64, 86), fill=(255, 255, 255, 190), width=2)
    return image_to_png_bytes(icon)


def build_transformed_assets(client_jar: zipfile.ZipFile) -> dict[str, bytes]:
    assets: dict[str, bytes] = {}

    def add_image(path: str, transform) -> None:
        if path not in client_jar.namelist():
            return
        raw = client_jar.read(path)
        img = Image.open(io.BytesIO(raw)).convert("RGBA")
        transformed = transform(img)
        assets[path] = image_to_png_bytes(transformed)
        sidecar = f"{path}.mcmeta"
        if sidecar in client_jar.namelist():
            assets[sidecar] = client_jar.read(sidecar)

    for path in DETAIL_TEXTURES:
        add_image(path, transform_detail)
    for path in WATER_TEXTURES:
        add_image(path, transform_water)
    for path in LAVA_TEXTURES:
        add_image(path, transform_lava)
    for path in COLORMAP_TEXTURES:
        add_image(path, transform_colormap)
    for path in ENVIRONMENT_TEXTURES:
        if path.endswith("/sun.png"):
            add_image(path, transform_sun_or_moon)
        else:
            add_image(path, transform_environment)
    for path in MISC_TEXTURES:
        add_image(path, transform_vignette)
    for path in HUD_TEXTURES:
        add_image(path, lambda img, p=path: transform_hud(p, img))

    for path in client_jar.namelist():
        if path.startswith(MOON_PREFIX) and path.endswith(".png"):
            add_image(path, transform_sun_or_moon)

    assets["pack.png"] = make_pack_icon()
    return assets


def build_pack_zip(output_name: str, pack_format: int, version_label: str, assets: dict[str, bytes]) -> None:
    pack_meta = {
        "pack": {
            "pack_format": pack_format,
            "description": f"Hallzy Cinematic Detailed ({version_label}) - no OptiFine required",
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
