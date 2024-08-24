import { GUI } from './lil-gui.js';
export const gui = new GUI({title:'debug'})
 const myObject = {
	cameraX: 10,
    cameraY: 10,
    cameraZ: 10

};

gui.add(myObject, 'cameraX', -100, 100, 1)
gui.add(myObject, 'cameraY', -53, 200, 1)
gui.add(myObject, 'cameraZ', -100, 100, 1)


