#version 150

#define MINECRAFT_LIGHT_POWER   (0.66)
#define MINECRAFT_AMBIENT_LIGHT (0.36)

layout(std140) uniform Lighting {
    vec3 Light0_Direction;
    vec3 Light1_Direction;
};

// 1.21.9+ helper retained for new core shader paths.
vec2 minecraft_compute_light(vec3 lightDir0, vec3 lightDir1, vec3 normal) {
    return vec2(dot(lightDir0, normal), dot(lightDir1, normal));
}

vec4 minecraft_mix_light_separate(vec2 light, vec4 color) {
    vec2 lightValue = max(vec2(0.0), light);
    float lightAccum = min(1.0, (lightValue.x + lightValue.y) * MINECRAFT_LIGHT_POWER + MINECRAFT_AMBIENT_LIGHT);

    float directional = clamp((lightValue.x + lightValue.y) * 0.5, 0.0, 1.0);
    float contrastBoost = mix(0.90, 1.05, smoothstep(0.20, 0.95, directional));
    float finalLight = clamp(lightAccum * contrastBoost, 0.0, 1.0);

    return vec4(color.rgb * finalLight, color.a);
}

// Shared entry point used by legacy and modern shaders.
vec4 minecraft_mix_light(vec3 lightDir0, vec3 lightDir1, vec3 normal, vec4 color) {
    vec2 light = minecraft_compute_light(lightDir0, lightDir1, normal);
    return minecraft_mix_light_separate(light, color);
}

// Legacy 1.21.0-1.21.5 helper retained for compatibility.
vec4 minecraft_sample_lightmap(sampler2D lightMap, ivec2 uv) {
    return texture(lightMap, clamp(uv / 256.0, vec2(0.5 / 16.0), vec2(15.5 / 16.0)));
}
