#version 150

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
