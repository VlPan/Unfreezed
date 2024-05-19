function hexToRgb(hex) {
  let r: any = 0, g: any = 0, b: any = 0;

  // 3 digits
  if (hex.length == 4) {
      r = "0x" + hex[1] + hex[1];
      g = "0x" + hex[2] + hex[2];
      b = "0x" + hex[3] + hex[3];
  }
  // 6 digits
  else if (hex.length == 7) {
      r = "0x" + hex[1] + hex[2];
      g = "0x" + hex[3] + hex[4];
      b = "0x" + hex[5] + hex[6];
  }
  return "rgb("+ +r + "," + +g + "," + +b + ")";
}
// console.log(hexToRgb("#90EE90")); // rgb(144,238,144)

function hexToRgba(hex, opacity) {
  let r: any = 0, g: any = 0, b: any = 0;

  // 3 digits
  if (hex.length == 4) {
      r = "0x" + hex[1] + hex[1];
      g = "0x" + hex[2] + hex[2];
      b = "0x" + hex[3] + hex[3];
  }
  // 6 digits
  else if (hex.length == 7) {
      r = "0x" + hex[1] + hex[2];
      g = "0x" + hex[3] + hex[4];
      b = "0x" + hex[5] + hex[6];
  }

  if (opacity) {
      return "rgba(" + +r + "," + +g + "," + +b + "," + opacity + ")";
  }
  else {
      return "rgba("+ +r + "," + +g + "," + +b + ")";
  }
}
// console.log(hexToRgba("#90EE90", 0.5)); // rgba(144,238,144,0.5)