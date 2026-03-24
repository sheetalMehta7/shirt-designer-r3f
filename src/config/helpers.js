export const downloadCanvasToImage = () => {
  const canvas = document.querySelector("canvas");
  const dataURL = canvas.toDataURL();
  const link = document.createElement("a");

  link.href = dataURL;
  link.download = "canvas.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const reader = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });

export const getContrastingColor = (color) => {
  // Remove the '#' character if it exists
  const hex = color.replace("#", "");

  // Convert the hex string to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the brightness of the color
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black or white depending on the brightness
  return brightness > 128 ? "black" : "white";
};


export const generatePastelColor = (hexColor)=> {
  // Remove '#' if present
  hexColor = hexColor.replace('#', '');

  // Convert to RGB
  let r = parseInt(hexColor.substring(0, 2), 16);
  let g = parseInt(hexColor.substring(2, 4), 16);
  let b = parseInt(hexColor.substring(4, 6), 16);

  // Calculate pastel RGB values
  const pastelFactor = 0.7; // Adjust as needed
  r = Math.floor(r + (255 - r) * pastelFactor);
  g = Math.floor(g + (255 - g) * pastelFactor);
  b = Math.floor(b + (255 - b) * pastelFactor);

  // Convert RGB to hex
  const pastelHex = `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;

  return pastelHex;
}