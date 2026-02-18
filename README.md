# Hallzy Vanilla Shader Pack (Java Edition)

This repository includes a downloadable, vanilla-friendly shader-style resource pack for **Minecraft Java Edition 1.21.x**.

## What this pack does

- Adds shader-like visual grading without OptiFine
- Adjusts vanilla fog for smoother cinematic distance haze
- Tweaks vanilla lighting for deeper contrast and cleaner highlights
- Works as a normal Java resource pack (`.zip`)

## No OptiFine required

This is a **resource pack shader override** using Minecraft Java's built-in shader include files, so it runs in the base game on macOS.

## Version compatibility

- Compatible range: **Java 1.21.0 through 1.21.11**
- `pack.mcmeta` declares:
  - `pack_format: 75`
  - `supported_formats: { min_inclusive: 34, max_inclusive: 75 }`
- Uses overlay splits so each 1.21 shader pipeline gets matching include signatures:
  - `compat_34_55` for Java 1.21.0 to 1.21.5
  - `compat_56_68` for Java 1.21.6 to 1.21.8
  - root shaders for Java 1.21.9+

## Download file

After build, use:

- `Hallzy_VanillaShader_Java_1.21.11.zip`
- `Hallzy_VanillaShader_Java_1.21.11_hotfix1.zip` (same contents, cache-busting filename)

## Install on MacBook (macOS, Java Edition)

1. Open Finder.
2. Press `Cmd + Shift + G`.
3. Paste:
   `~/Library/Application Support/minecraft/resourcepacks`
4. Copy `Hallzy_VanillaShader_Java_1.21.11_hotfix1.zip` into that folder.
5. Launch Minecraft Java 1.21.x.
6. Go to **Options -> Resource Packs** and enable the pack.
7. Move the pack to the top of the active stack if needed.

## Troubleshooting

- If Minecraft says **incompatible**, confirm you are on Java **1.21.x**.
- If Minecraft says **broken**, remove old copies of this pack from `resourcepacks` and keep only the latest zip.
- Do not extract the zip. Put the zip file itself into the `resourcepacks` folder.
- Disable other shader/resource packs while testing (pack conflicts can trigger shader compile errors).
- If the pack loads but visuals look unchanged, set **Video Settings -> Graphics: Fancy/Fabulous** and restart the world once.

## Source files

Pack source lives in:

- `java-vanilla-shader-pack/pack.mcmeta`
- `java-vanilla-shader-pack/assets/minecraft/shaders/include/fog.glsl`
- `java-vanilla-shader-pack/assets/minecraft/shaders/include/light.glsl`
- `java-vanilla-shader-pack/compat_34_55/assets/minecraft/shaders/include/fog.glsl`
- `java-vanilla-shader-pack/compat_34_55/assets/minecraft/shaders/include/light.glsl`
- `java-vanilla-shader-pack/compat_56_68/assets/minecraft/shaders/include/fog.glsl`
- `java-vanilla-shader-pack/compat_56_68/assets/minecraft/shaders/include/light.glsl`