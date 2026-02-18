#!/usr/bin/env python3
import json
import os
import tempfile
import zipfile
from pathlib import Path

ROOT = Path("/workspace")

FOG_LEGACY = """#version 150

float hallzy_fog_curve(float fogValue) {
    return pow(clamp(fogValue, 0.0, 1.0), 1.2);
}

vec3 hallzy_cinematic_grade(vec3 color) {
    float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
    vec3 coolShadows = color * vec3(0.97, 1.00, 1.05);
    vec3 warmHighlights = color * vec3(1.03, 1.02, 0.99);
    return mix(coolShadows, warmHighlights, smoothstep(0.25, 0.85, luminance));
}

vec4 linear_fog(vec4 inColor, float vertexDistance, float fogStart, float fogEnd, vec4 fogColor) {
    vec3 gradedColor = hallzy_cinematic_grade(inColor.rgb);

    if (vertexDistance <= fogStart) {
        return vec4(gradedColor, inColor.a);
    }

    float fogValue = vertexDistance < fogEnd ? smoothstep(fogStart, fogEnd, vertexDistance) : 1.0;
    vec3 gradedFog = hallzy_cinematic_grade(fogColor.rgb);
    return vec4(mix(gradedColor, gradedFog, hallzy_fog_curve(fogValue) * fogColor.a), inColor.a);
}

float linear_fog_fade(float vertexDistance, float fogStart, float fogEnd) {
    if (vertexDistance <= fogStart) {
        return 1.0;
    } else if (vertexDistance >= fogEnd) {
        return 0.0;
    }

    return smoothstep(fogEnd, fogStart, vertexDistance);
}

float fog_distance(vec3 pos, int shape) {
    if (shape == 0) {
        return length(pos);
    } else {
        float distXZ = length(pos.xz);
        float distY = abs(pos.y);
        return max(distXZ, distY);
    }
}
"""

LIGHT_LEGACY = """#version 150

#define MINECRAFT_LIGHT_POWER   (0.64)
#define MINECRAFT_AMBIENT_LIGHT (0.36)

vec4 minecraft_mix_light(vec3 lightDir0, vec3 lightDir1, vec3 normal, vec4 color) {
    float light0 = max(0.0, dot(lightDir0, normal));
    float light1 = max(0.0, dot(lightDir1, normal));
    float lightAccum = min(1.0, (light0 + light1) * MINECRAFT_LIGHT_POWER + MINECRAFT_AMBIENT_LIGHT);

    float directional = clamp((light0 + light1) * 0.5, 0.0, 1.0);
    float contrastBoost = mix(0.92, 1.06, smoothstep(0.20, 0.95, directional));
    float finalLight = clamp(lightAccum * contrastBoost, 0.0, 1.0);

    return vec4(color.rgb * finalLight, color.a);
}

vec4 minecraft_sample_lightmap(sampler2D lightMap, ivec2 uv) {
    return texture(lightMap, clamp(uv / 256.0, vec2(0.5 / 16.0), vec2(15.5 / 16.0)));
}
"""

FOG_MID = """#version 150

layout(std140) uniform Fog {
    vec4 FogColor;
    float FogEnvironmentalStart;
    float FogEnvironmentalEnd;
    float FogRenderDistanceStart;
    float FogRenderDistanceEnd;
    float FogSkyEnd;
    float FogCloudsEnd;
};

float hallzy_fog_curve(float fogValue) {
    return pow(clamp(fogValue, 0.0, 1.0), 1.2);
}

vec3 hallzy_cinematic_grade(vec3 color) {
    float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
    vec3 coolShadows = color * vec3(0.97, 1.00, 1.05);
    vec3 warmHighlights = color * vec3(1.03, 1.02, 0.99);
    return mix(coolShadows, warmHighlights, smoothstep(0.25, 0.85, luminance));
}

float linear_fog_value(float vertexDistance, float fogStart, float fogEnd) {
    if (vertexDistance <= fogStart) {
        return 0.0;
    } else if (vertexDistance >= fogEnd) {
        return 1.0;
    }

    return (vertexDistance - fogStart) / (fogEnd - fogStart);
}

float total_fog_value(float sphericalVertexDistance, float cylindricalVertexDistance, float environmentalStart, float environmantalEnd, float renderDistanceStart, float renderDistanceEnd) {
    float fogValue = max(
        linear_fog_value(sphericalVertexDistance, environmentalStart, environmantalEnd),
        linear_fog_value(cylindricalVertexDistance, renderDistanceStart, renderDistanceEnd)
    );
    return hallzy_fog_curve(fogValue);
}

vec4 apply_fog(vec4 inColor, float sphericalVertexDistance, float cylindricalVertexDistance, float environmentalStart, float environmantalEnd, float renderDistanceStart, float renderDistanceEnd, vec4 fogColor) {
    float fogValue = total_fog_value(sphericalVertexDistance, cylindricalVertexDistance, environmentalStart, environmantalEnd, renderDistanceStart, renderDistanceEnd);
    vec3 gradedColor = hallzy_cinematic_grade(inColor.rgb);
    vec3 gradedFog = hallzy_cinematic_grade(fogColor.rgb);
    return vec4(mix(gradedColor, gradedFog, fogValue * fogColor.a), inColor.a);
}

float fog_spherical_distance(vec3 pos) {
    return length(pos);
}

float fog_cylindrical_distance(vec3 pos) {
    float distXZ = length(pos.xz);
    float distY = abs(pos.y);
    return max(distXZ, distY);
}
"""

LIGHT_MID = """#version 150

#define MINECRAFT_LIGHT_POWER   (0.64)
#define MINECRAFT_AMBIENT_LIGHT (0.36)

layout(std140) uniform Lighting {
    vec3 Light0_Direction;
    vec3 Light1_Direction;
};

vec4 minecraft_mix_light(vec3 lightDir0, vec3 lightDir1, vec3 normal, vec4 color) {
    float light0 = max(0.0, dot(lightDir0, normal));
    float light1 = max(0.0, dot(lightDir1, normal));
    float lightAccum = min(1.0, (light0 + light1) * MINECRAFT_LIGHT_POWER + MINECRAFT_AMBIENT_LIGHT);

    float directional = clamp((light0 + light1) * 0.5, 0.0, 1.0);
    float contrastBoost = mix(0.92, 1.06, smoothstep(0.20, 0.95, directional));
    float finalLight = clamp(lightAccum * contrastBoost, 0.0, 1.0);

    return vec4(color.rgb * finalLight, color.a);
}
"""

FOG_MODERN = """#version 330

layout(std140) uniform Fog {
    vec4 FogColor;
    float FogEnvironmentalStart;
    float FogEnvironmentalEnd;
    float FogRenderDistanceStart;
    float FogRenderDistanceEnd;
    float FogSkyEnd;
    float FogCloudsEnd;
};

float hallzy_fog_curve(float fogValue) {
    return pow(clamp(fogValue, 0.0, 1.0), 1.2);
}

vec3 hallzy_cinematic_grade(vec3 color) {
    float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
    vec3 coolShadows = color * vec3(0.97, 1.00, 1.05);
    vec3 warmHighlights = color * vec3(1.03, 1.02, 0.99);
    return mix(coolShadows, warmHighlights, smoothstep(0.25, 0.85, luminance));
}

float linear_fog_value(float vertexDistance, float fogStart, float fogEnd) {
    if (vertexDistance <= fogStart) {
        return 0.0;
    } else if (vertexDistance >= fogEnd) {
        return 1.0;
    }

    return (vertexDistance - fogStart) / (fogEnd - fogStart);
}

float total_fog_value(float sphericalVertexDistance, float cylindricalVertexDistance, float environmentalStart, float environmantalEnd, float renderDistanceStart, float renderDistanceEnd) {
    float fogValue = max(
        linear_fog_value(sphericalVertexDistance, environmentalStart, environmantalEnd),
        linear_fog_value(cylindricalVertexDistance, renderDistanceStart, renderDistanceEnd)
    );
    return hallzy_fog_curve(fogValue);
}

vec4 apply_fog(vec4 inColor, float sphericalVertexDistance, float cylindricalVertexDistance, float environmentalStart, float environmantalEnd, float renderDistanceStart, float renderDistanceEnd, vec4 fogColor) {
    float fogValue = total_fog_value(sphericalVertexDistance, cylindricalVertexDistance, environmentalStart, environmantalEnd, renderDistanceStart, renderDistanceEnd);
    vec3 gradedColor = hallzy_cinematic_grade(inColor.rgb);
    vec3 gradedFog = hallzy_cinematic_grade(fogColor.rgb);
    return vec4(mix(gradedColor, gradedFog, fogValue * fogColor.a), inColor.a);
}

float fog_spherical_distance(vec3 pos) {
    return length(pos);
}

float fog_cylindrical_distance(vec3 pos) {
    float distXZ = length(pos.xz);
    float distY = abs(pos.y);
    return max(distXZ, distY);
}
"""

LIGHT_MODERN = """#version 330

#define MINECRAFT_LIGHT_POWER   (0.64)
#define MINECRAFT_AMBIENT_LIGHT (0.36)

layout(std140) uniform Lighting {
    vec3 Light0_Direction;
    vec3 Light1_Direction;
};

vec2 minecraft_compute_light(vec3 lightDir0, vec3 lightDir1, vec3 normal) {
    return vec2(dot(lightDir0, normal), dot(lightDir1, normal));
}

vec4 minecraft_mix_light_separate(vec2 light, vec4 color) {
    vec2 lightValue = max(vec2(0.0), light);
    float lightAccum = min(1.0, (lightValue.x + lightValue.y) * MINECRAFT_LIGHT_POWER + MINECRAFT_AMBIENT_LIGHT);

    float directional = clamp((lightValue.x + lightValue.y) * 0.5, 0.0, 1.0);
    float contrastBoost = mix(0.92, 1.06, smoothstep(0.20, 0.95, directional));
    float finalLight = clamp(lightAccum * contrastBoost, 0.0, 1.0);

    return vec4(color.rgb * finalLight, color.a);
}

vec4 minecraft_mix_light(vec3 lightDir0, vec3 lightDir1, vec3 normal, vec4 color) {
    vec2 light = minecraft_compute_light(lightDir0, lightDir1, normal);
    return minecraft_mix_light_separate(light, color);
}
"""

SHADER_VARIANTS = {
    "legacy": (FOG_LEGACY, LIGHT_LEGACY),
    "mid": (FOG_MID, LIGHT_MID),
    "modern": (FOG_MODERN, LIGHT_MODERN),
}

PACK_BUILD_MATRIX = [
    ("Hallzy_VanillaShader_Java_1.21-1.21.1_pf34.zip", 34, "1.21-1.21.1", "legacy"),
    ("Hallzy_VanillaShader_Java_1.21.2-1.21.3_pf42.zip", 42, "1.21.2-1.21.3", "legacy"),
    ("Hallzy_VanillaShader_Java_1.21.4_pf46.zip", 46, "1.21.4", "legacy"),
    ("Hallzy_VanillaShader_Java_1.21.5_pf55.zip", 55, "1.21.5", "legacy"),
    ("Hallzy_VanillaShader_Java_1.21.6-1.21.7_pf63.zip", 63, "1.21.6-1.21.7", "mid"),
    ("Hallzy_VanillaShader_Java_1.21.8_pf64.zip", 64, "1.21.8", "mid"),
    ("Hallzy_VanillaShader_Java_1.21.9-1.21.10_pf69.zip", 69, "1.21.9-1.21.10", "modern"),
    ("Hallzy_VanillaShader_Java_1.21.11_pf75.zip", 75, "1.21.11", "modern"),
    ("Hallzy_VanillaShader_Java_1.21.11.zip", 75, "1.21.11", "modern"),
    ("Hallzy_VanillaShader_Java_1.21.11_hotfix1.zip", 75, "1.21.11", "modern"),
]


def write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def build_pack_zip(output_name: str, pack_format: int, version_label: str, variant: str) -> None:
    fog, light = SHADER_VARIANTS[variant]
    with tempfile.TemporaryDirectory(prefix="hallzy_pack_") as tmp:
        tmp_path = Path(tmp)
        pack_meta = {
            "pack": {
                "pack_format": pack_format,
                "description": f"Hallzy Vanilla Shader (Java {version_label}) - no OptiFine required",
            }
        }
        write_text(tmp_path / "pack.mcmeta", json.dumps(pack_meta, indent=2) + "\n")
        write_text(tmp_path / "assets/minecraft/shaders/include/fog.glsl", fog)
        write_text(tmp_path / "assets/minecraft/shaders/include/light.glsl", light)

        out_path = ROOT / output_name
        with zipfile.ZipFile(out_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
            for dirpath, _, filenames in os.walk(tmp_path):
                for filename in filenames:
                    full_path = Path(dirpath) / filename
                    rel_path = full_path.relative_to(tmp_path)
                    zf.write(full_path, rel_path.as_posix())


def main() -> None:
    for file_name, pack_format, version_label, variant in PACK_BUILD_MATRIX:
        build_pack_zip(file_name, pack_format, version_label, variant)
        print(f"built {file_name}")


if __name__ == "__main__":
    main()
