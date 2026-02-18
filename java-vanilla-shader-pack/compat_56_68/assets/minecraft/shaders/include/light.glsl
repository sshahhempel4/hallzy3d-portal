#version 150

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
