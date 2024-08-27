import * as THREE from '../Three/Three.js'; 
import { blocks } from './blocks.js';



/**
 * Function to generate the grid array with texture names
 * @param gridWidth Controls how wide the grid is
 * @param gridHeight Controls how tall the grid is
 * 
 */
export function generateGridArray(gridWidth, gridHeight) {
    const gridArray = [];
    

    // Iterate over each column (i in the grid)
    for (let i = 0; i < gridWidth; i++) {
        const column = [];

        // Iterate over each row (j in the grid)
        for (let j = 0; j < gridHeight; j++) {
            let textureName = blocks.air.name; // Default to air texture

            if (j < 11) {
                textureName = blocks.bedrock.name; // Bottom layers
            } else if (j == 11) {
                textureName = blocks.grass.name; // Layer at terrain height - grass
            }

            column.push(textureName);
        }

        gridArray.push(column);
    }

    return gridArray;
}


// Function to render the grid using the generated array and the provided texture loader
export function renderGrid(scene, gridArray, squareSize, textureLoader) {
    const gridWidth = gridArray.length;
    const gridHeight = gridArray[0].length;

    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {
            const textureName = gridArray[i][j];

            // Load texture and create material if textureName is not null
            if (textureName) {
                const texture = textureLoader.load(`tiles/${textureName}.png`);
                const material = new THREE.MeshLambertMaterial({
                    map: texture,
                    transparent: true,
                    opacity: 1.0
                });

                texture.magFilter = THREE.NearestFilter;
                texture.minFilter = THREE.NearestFilter;
                texture.colorSpace = THREE.SRGBColorSpace;

                // Create square geometry and mesh
                const squareGeometry = new THREE.PlaneGeometry(squareSize, squareSize);
                const squareMesh = new THREE.Mesh(squareGeometry, material);

                // Position square in the grid
                squareMesh.position.set(
                    i * squareSize - (gridWidth * squareSize) / 2,   // Center the grid horizontally
                    j * squareSize - (gridHeight * squareSize) / 2, // Center the grid vertically
                    0
                );

                // Add square to the scene
                scene.add(squareMesh);
            }
        }
    }
}
