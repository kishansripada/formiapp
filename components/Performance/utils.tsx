export function convertToCentimeters(feet: number, inches: number): number {
    const inchesToCentimeters = inches * 2.54;
    const feetToCentimeters = feet * 12 * 2.54;
    const totalCentimeters = inchesToCentimeters + feetToCentimeters;
    return Math.round(totalCentimeters * 10) / 10;
 }
 
 export function convertToFeetAndInches(centimeters: number): {
    feet: number;
    inches: number;
 } {
    const inchesToCentimeters = 2.54;
    const inches = Math.round(centimeters / inchesToCentimeters);
    const feet = Math.floor(inches / 12);
    return { feet, inches: inches % 12 };
 }
 