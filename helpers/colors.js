function cutHex(hex) {
  return hex.charAt(0) == "#" ? hex.substring(1, 7) : hex;
}

function hexToRGB(hex) {
  const red = parseInt(cutHex(hex).substring(0, 2), 16);
  const green = parseInt(cutHex(hex).substring(2, 4), 16);
  const blue = parseInt(cutHex(hex).substring(4, 6), 16);

  return {red, green, blue};
}

function RGBToHex({red, green, blue}) {
  let hexRed = red.toString(16),
      hexGreen = green.toString(16),
      hexBlue = blue.toString(16);

  hexRed = (hexRed.length == 1)? "0" + hexRed: hexRed;
  hexGreen = (hexGreen.length == 1)? "0" + hexGreen: hexGreen;
  hexBlue = (hexBlue.length == 1)? "0" + hexBlue: hexBlue;

  return "#" + hexRed + hexGreen + hexBlue;
}

function shadeColor({red, green, blue}, percent) {
  let tempRed = parseInt(red * (100 + percent) / 100),
      tempGreen = parseInt(green * (100 + percent) / 100),
      tempBlue = parseInt(blue * (100 + percent) / 100);

  tempRed = Math.min(tempRed, 255);
  tempGreen = Math.min(tempGreen, 255);
  tempBlue = Math.min(tempBlue, 255);

  return {red: tempRed, green: tempGreen, blue: tempBlue};
}

module.exports = function(Handlebars) {
  Handlebars.registerHelper('colorRange', function(color) {
    const colors = [];
    const rgb = hexToRGB(color);

    for (let shade = -95; shade < 100; shade += 5) {
      const newShade = shadeColor(rgb, shade);
      const hexShade = RGBToHex(newShade);
      colors.push(hexShade);
    }
    return JSON.stringify(colors);
  });
};
