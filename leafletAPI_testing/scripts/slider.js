var makerjs = require('makerjs');
var radius = 10
function sliderChange(val)
{
    document.getElementById('sliderStatus').innerHTML = val
}

var model = {
  paths: {
    "arc": new makerjs.paths.Circle(radius)
  }
};

var svg = makerjs.exporter.toSVG(model);
document.getElementById('sliderStatus').innerHTML = radius
document.getElementById('drawing').innerHTML = svg

document.write(svg);
