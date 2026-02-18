#version 150

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
    return pow(clamp(fogValue, 0.0, 1.0), 1.15);
}

vec3 hallzy_cinematic_grade(vec3 color) {
    float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
    vec3 coolShadows = color * vec3(0.97, 1.00, 1.05);
    vec3 warmHighlights = color * vec3(1.03, 1.02, 0.99);
    return mix(coolShadows, warmHighlights, smoothstep(0.25, 0.85, luminance));
}

// Legacy 1.21.0-1.21.5 API
vec4 linear_fog(vec4 inColor, float vertexDistance, float fogStart, float fogEnd, vec4 fogColor) {
    if (vertexDistance <= fogStart) {
        return vec4(hallzy_cinematic_grade(inColor.rgb), inColor.a);
    }

    float fogValue = vertexDistance < fogEnd ? smoothstep(fogStart, fogEnd, vertexDistance) : 1.0;
    float blend = hallzy_fog_curve(fogValue) * fogColor.a;
    vec3 gradedColor = hallzy_cinematic_grade(inColor.rgb);
    vec3 gradedFog = hallzy_cinematic_grade(fogColor.rgb);
    return vec4(mix(gradedColor, gradedFog, blend), inColor.a);
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

// Modern 1.21.6+ API
float linear_fog_value(float vertexDistance, float fogStart, float fogEnd) {
    if (vertexDistance <= fogStart) {
        return 0.0;
    } else if (vertexDistance >= fogEnd) {
        return 1.0;
    }

    return (vertexDistance - fogStart) / (fogEnd - fogStart);
}

float total_fog_value(
    float sphericalVertexDistance,
    float cylindricalVertexDistance,
    float environmentalStart,
    float environmantalEnd,
    float renderDistanceStart,
    float renderDistanceEnd
) {
    float environmentalFog = linear_fog_value(sphericalVertexDistance, environmentalStart, environmantalEnd);
    float distanceFog = linear_fog_value(cylindricalVertexDistance, renderDistanceStart, renderDistanceEnd);
    float combinedFog = max(environmentalFog, distanceFog);
    return hallzy_fog_curve(combinedFog);
}

vec4 apply_fog(
    vec4 inColor,
    float sphericalVertexDistance,
    float cylindricalVertexDistance,
    float environmentalStart,
    float environmantalEnd,
    float renderDistanceStart,
    float renderDistanceEnd,
    vec4 fogColor
) {
    float fogValue = total_fog_value(
        sphericalVertexDistance,
        cylindricalVertexDistance,
        environmentalStart,
        environmantalEnd,
        renderDistanceStart,
        renderDistanceEnd
    );
    float blend = fogValue * fogColor.a;
    vec3 gradedColor = hallzy_cinematic_grade(inColor.rgb);
    vec3 gradedFog = hallzy_cinematic_grade(fogColor.rgb);
    return vec4(mix(gradedColor, gradedFog, blend), inColor.a);
}

float fog_spherical_distance(vec3 pos) {
    return length(pos);
}

float fog_cylindrical_distance(vec3 pos) {
    float distXZ = length(pos.xz);
    float distY = abs(pos.y);
    return max(distXZ, distY);
}
