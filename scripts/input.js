// input.js
export const keysPressed = {};
/**
 * Handles key down
 * @param camera The camera
 * @param event Event 
 *
 */
export function handleKeyDown(camera, event) {
    keysPressed[event.key] = true;
}

export function handleKeyUp(camera, event) {
    keysPressed[event.key] = false;
}

export function handleKeyPress(camera) {
    const moveDistance = 0.5; // Distance to move per key press

    if (keysPressed['ArrowUp']) {
        camera.position.y += moveDistance; // Move camera up
    }
    if (keysPressed['ArrowDown']) {
        camera.position.y -= moveDistance; // Move camera down
    }
    if (keysPressed['ArrowLeft']) {
        camera.position.x -= moveDistance; // Move camera left
    }
    if (keysPressed['ArrowRight']) {
        camera.position.x += moveDistance; // Move camera right
    }

    camera.updateProjectionMatrix();
}
