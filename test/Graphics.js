let g = new Graphics();

let Image = new Graphics.Image(5, 5, (ct) => {ct.beginPath();})

let imageload = await Graphics.Image.load('xx');
let x = 1, y = 1, w = 1, h = 1;
let a = 1, b = 1, c = 1, d = 1, e = 1, f = 1;
let startAngle = 1, endAngle = 1;
let radius = 1, radiusX = 1, radiusY = 1;

g.pushLayer()

g.clearRect(x, y, w, h);
g.beginPath();
g.moveTo(x, y);
g.lineTo(x, y);
g.quadraticCurveTo(cpx, cpy, x, y);
g.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
g.arc(x, y, radius, startAngle, endAngle);
g.arcTo(x, y, x2, y2, radius);
g.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle);
g.rect(x, y, w, h);
g.closePath();
g.stroke(...args);
g.fill(...args);
g.strokeRect(x, y, w, h);
g.fillRect(x, y, w, h);
g.fillText("", x, y, maxWidth);
g.setLineDash(...args);
g.save();
g.restore();
g.scale(x, y);
g.translate(x, y);
g.rotate(radian, x, y);
g.transform(a, b, c, d, e, f);
g.setTransform(a, b, c, d, e, f);

g.draw(Graphics.Path, params: drawPathParams);
g.draw(Graphics.Image, params: drawImageParams);
g.draw(Graphics.Text, params: drawTextParams);

g.pushLayer(x, y, w, h, 0.5, "");
g.pushLayer("", 0.5, "");