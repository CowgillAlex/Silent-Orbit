export class SmoothUtils {
    /**
     * Linear easing (no easing, no acceleration).
     * @param {number} start - The starting value.
     * @param {number} end - The ending value.
     * @param {number} progress - The progress of the animation (0 to 1).
     * @returns {number} - The eased value.
     */
    static easeLinear(start, end, progress) {
        return start + (end - start) * progress;
    }

    /**
     * Ease-in (accelerating from zero velocity).
     * @param {number} start - The starting value.
     * @param {number} end - The ending value.
     * @param {number} progress - The progress of the animation (0 to 1).
     * @returns {number} - The eased value.
     */
    static easeIn(start, end, progress) {
        return start + (end - start) * Math.pow(progress, 2);
    }

    /**
     * Ease-out (decelerating to zero velocity).
     * @param {number} start - The starting value.
     * @param {number} end - The ending value.
     * @param {number} progress - The progress of the animation (0 to 1).
     * @returns {number} - The eased value.
     */
    static easeOut(start, end, progress) {
        return start + (end - start) * (1 - Math.pow(1 - progress, 2));
    }

    /**
     * Ease-in-out (accelerating until halfway, then decelerating).
     * @param {number} start - The starting value.
     * @param {number} end - The ending value.
     * @param {number} progress - The progress of the animation (0 to 1).
     * @returns {number} - The eased value.
     */
    static easeInOut(start, end, progress) {
        return start + (end - start) * (1 - Math.cos(progress * Math.PI)) / 2;
    }

    /**
     * Ease-out-in (decelerating halfway, then accelerating).
     * @param {number} start - The starting value.
     * @param {number} end - The ending value.
     * @param {number} progress - The progress of the animation (0 to 1).
     * @returns {number} - The eased value.
     */
    static easeOutIn(start, end, progress) {
        return progress < 0.5
            ? this.easeOut(start, (start + end) / 2, progress * 2)
            : this.easeIn((start + end) / 2, end, (progress - 0.5) * 2);
    }

    /**
     * Bounce effect (mimics a bouncing motion).
     * @param {number} start - The starting value.
     * @param {number} end - The ending value.
     * @param {number} progress - The progress of the animation (0 to 1).
     * @returns {number} - The eased value.
     */
    static easeBounce(start, end, progress) {
        return start + (end - start) * Math.abs(Math.sin(6 * Math.PI * progress) * (1 - progress));
    }

    /**
     * Elastic effect (overshooting and oscillating).
     * @param {number} start - The starting value.
     * @param {number} end - The ending value.
     * @param {number} progress - The progress of the animation (0 to 1).
     * @returns {number} - The eased value.
     */
    static easeElastic(start, end, progress) {
        return start + (end - start) * (-Math.pow(2, 10 * (progress - 1)) * Math.sin((progress - 1.1) * 5 * Math.PI));
    }

    /**
     * Overshoot effect (goes beyond the target and returns).
     * @param {number} start - The starting value.
     * @param {number} end - The ending value.
     * @param {number} progress - The progress of the animation (0 to 1).
     * @returns {number} - The eased value.
     */
    static easeOvershoot(start, end, progress) {
        const s = 1.70158;
        return start + (end - start) * ((progress -= 1) * progress * ((s + 1) * progress + s) + 1);
    }

    /**
     * Custom power easing (allows customization of the easing curve).
     * @param {number} start - The starting value.
     * @param {number} end - The ending value.
     * @param {number} progress - The progress of the animation (0 to 1).
     * @param {number} [power=2] - The power of the easing curve. Higher values create sharper transitions.
     * @returns {number} - The eased value.
     */
    static easeCustomPower(start, end, progress, power = 2) {
        return start + (end - start) * Math.pow(progress, power);
    }

    /**
     * Oscillating effect (creates a back-and-forth motion).
     * @param {number} start - The starting value.
     * @param {number} end - The ending value.
     * @param {number} progress - The progress of the animation (0 to 1).
     * @param {number} [frequency=4] - The frequency of the oscillation. Higher values increase the number of oscillations.
     * @returns {number} - The eased value.
     */
    static easeOscillate(start, end, progress, frequency = 4) {
        return start + (end - start) * (1 - Math.cos(progress * frequency * Math.PI)) / 2;
    }
}
