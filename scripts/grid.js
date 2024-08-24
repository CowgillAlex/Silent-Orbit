import * as THREE from '../Three/Three.js'; // Adjust path as necessary

import { blocks } from './blocks.js';
import { PerlinNoise } from './pnoise.js';
//import { noise2D } from './noise.js';


/**
 * Function to generate the grid array with texture names
 * @param gridSize Controls how wide and tall the grid is
 * 
 */
export function generateGridArray(gridSize) {
    // Define texture names for layers
    //const textures = blocks

    const gridArray = [];
    const perlin = new PerlinNoise()
    // Iterate over each column (i in the grid)
    for (let i = 0; i < gridSize; i++) {
        // Calculate terrain height using Math.sin (or any function)

        //const terrainHeight = Math.floor(Math.sin(i/2) * 2 + 40) + (0.5 * Math.cos(i/4)); // Adjust amplitude and frequency as needed
         // Adjust amplitude and frequency as needed

        const column = [];

        // Iterate over each row (j in the grid)
        for (let j = 0; j < gridSize; j++) {
            // Determine texture based on terrain height and current row
            let textureName = blocks.air.name; // Default to air texture (above terrain height)
            
            if (j < 11) {
                textureName = blocks.bedrock.name; // Bottom layers (below terrain height - 1)
            } 
             else if (j==11) {
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
    for (let i = 0; i < gridArray.length; i++) {
        for (let j = 0; j < gridArray[i].length; j++) {
            const textureName = gridArray[i][j];

            // Load texture and create material if textureName is not null
            if (textureName) {
                const texture = textureLoader.load(`tiles/${textureName}.png`);
                const material = new THREE.MeshLambertMaterial({ map: texture,
                    transparent: true,
    opacity: 1.0
                 });

                texture.magFilter = THREE.NearestFilter;
                texture.minFilter = THREE.NearestFilter;
                texture.colorSpace = THREE.SRGBColorSpace

                // Create square geometry and mesh
                const squareGeometry = new THREE.PlaneGeometry(squareSize, squareSize);
                const squareMesh = new THREE.Mesh(squareGeometry, material);

                // Position square in the grid
                squareMesh.position.set(
                    i * squareSize - (gridArray.length * squareSize) / 2, // Center the grid horizontally
                    j * squareSize - (gridArray[i].length * squareSize) / 2, // Center the grid vertically
                    0
                );

                // Add square to the scene
                scene.add(squareMesh);
            }
        }
    }
}
