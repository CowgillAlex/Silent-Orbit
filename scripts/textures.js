

// Array of Minecraft block names (adjust as per your textures)
export const blockTextures = [
    'tile000',
    'tile000',
    'tile000',
    'tile000',
    'tile000',
    'tile000',
    'tile000'
    // Add more block names as needed
];

// Function to get a random block texture URL
export function getRandomTexture() {
    const randomIndex = Math.floor(Math.random() * blockTextures.length);
    const blockName = blockTextures[randomIndex];
    return `textures/block/${blockName}.png`;
}

// Set texture filtering to NearestFilter for pixelated look
