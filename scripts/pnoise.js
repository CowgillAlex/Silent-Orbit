
    export class PerlinNoise {
        constructor() {
            this.seed = Math.random();
        }

      

        setSeed(args) {
            this.seed = args.SEED;
        }

        getNoise1D(args) {
            const x = args.X;
            return this.perlinNoise1D(x);
        }

        getNoise2D(args) {
            const x = args.X;
            const y = args.Y;
            return this.perlinNoise2D(x, y);
        }

        getNoise3D(args) {
            const x = args.X;
            const y = args.Y;
            const z = args.Z;
            return this.perlinNoise3D(x, y, z);
        }

        perlinNoise1D(x) {
            const floorX = Math.floor(x);
            const t = x - floorX;
            const tRemapSmoothstep = t * t * (3 - 2 * t);

            const xMin = floorX;
            const xMax = xMin + 1;

            const y = this.lerp(this.random(xMin), this.random(xMax), tRemapSmoothstep);

            return y;
        }

        perlinNoise2D(x, y) {
            const floorX = Math.floor(x);
            const floorY = Math.floor(y);
            const tX = x - floorX;
            const tY = y - floorY;
            const tRemapSmoothstepX = tX * tX * (3 - 2 * tX);
            const tRemapSmoothstepY = tY * tY * (3 - 2 * tY);

            const xMin = floorX;
            const xMax = xMin + 1;

            const yMin = floorY;
            const yMax = yMin + 1;

            const sx = this.lerp(this.random(xMin, yMin), this.random(xMax, yMin), tRemapSmoothstepX);
            const sy = this.lerp(this.random(xMin, yMax), this.random(xMax, yMax), tRemapSmoothstepX);

            const value = this.lerp(sx, sy, tRemapSmoothstepY);

            return value;
        }

        perlinNoise3D(x, y, z) {
            const floorX = Math.floor(x);
            const floorY = Math.floor(y);
            const floorZ = Math.floor(z);
            const tX = x - floorX;
            const tY = y - floorY;
            const tZ = z - floorZ;
            const tRemapSmoothstepX = tX * tX * (3 - 2 * tX);
            const tRemapSmoothstepY = tY * tY * (3 - 2 * tY);
            const tRemapSmoothstepZ = tZ * tZ * (3 - 2 * tZ);

            const xMin = floorX;
            const xMax = xMin + 1;

            const yMin = floorY;
            const yMax = yMin + 1;

            const zMin = floorZ;
            const zMax = zMin + 1;

            const sx = this.lerp(this.random(xMin, yMin, zMin), this.random(xMax, yMin, zMin), tRemapSmoothstepX);
            const sy = this.lerp(this.random(xMin, yMax, zMin), this.random(xMax, yMax, zMin), tRemapSmoothstepX);
            const sz = this.lerp(this.random(xMin, yMin, zMax), this.random(xMax, yMin, zMax), tRemapSmoothstepX);

            const sxy = this.lerp(sx, sy, tRemapSmoothstepY);
            const szw = this.lerp(sz, this.random(xMin, yMax, zMax), tRemapSmoothstepY);

            const value = this.lerp(sxy, szw, tRemapSmoothstepZ);

            return value;
        }

        random(...args) {
            let value = 0;
            for (const arg of args) {
                value += arg * 10000;
            }
            value += this.seed * 10000;
            value = Math.sin(value) * 10000;
            return value - Math.floor(value);
        }

        lerp(a, b, t) {
            return a + t * (b - a);
        }
    }
