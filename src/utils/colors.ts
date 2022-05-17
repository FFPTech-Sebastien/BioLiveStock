// Type to represent a RGB color
export type RgbColor = {
    r: number;
    g: number;
    b: number;
};

/**
 * Checks if the given color is dark or light
 *
 * @param color string
 * @returns true if the color is dark, false if the color is light
 */
export const isColorDark = (color: string): boolean => {
    const rgb = hexToRgb(color);
    if (!rgb) {
        throw Error('Invalid color');
    }

    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness < 130;
};

/**
 * Converts a hex color to rgb
 *
 * @param hex string => hex format
 * @returns RgbColor => { r: 199, g: 199, b: 199 }
 */
export const hexToRgb = (hex: string): RgbColor | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
};

/**
 * Return a color depending on the given background color
 *
 * @param color string => hex format
 * @returns if the background is dark, return a light color, otherwise return a dark color
 */
export const colorDependingOnBackground = (color: string): string => {
    return isColorDark(color) ? '#ffffff' : '#000000';
};
