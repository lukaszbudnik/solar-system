
var moon = new CelestialBody('Moon', '2k_moon.jpg', 1737, 28, 384400, PlanetCorrection, EarthMoonDistanceCorrection, 0);
var earth = new CelestialBody('Earth', '2k_earth_daymap.jpg', 6371, 365, AU, PlanetCorrection, SunPlanetsDistanceCorrection, 0, [moon]);

var planets = [
  new CelestialBody('Mercury', '2k_mercury.jpg', 2440, 88, 0.387 * AU, PlanetCorrection, SunPlanetsDistanceCorrection, -9),
  new CelestialBody('Venus', '2k_venus_atmosphere.jpg', 6052, 225, 0.723 * AU, PlanetCorrection, SunPlanetsDistanceCorrection, -86),
  earth,
  new CelestialBody('Mars', '2k_mars.jpg', 3390, 687, 1.524 * AU, PlanetCorrection, SunPlanetsDistanceCorrection, 110)
];

var sun = new CelestialBody('Sun', '2k_sun.jpg', 695508, 0, 0, SunCorrection, 0, 0, planets);
// recomputes all positions
sun.move(0);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();
scene.background = new THREE.Color('white');
var camera = new THREE.PerspectiveCamera(1.1 * ViewSize, window.innerWidth/window.innerHeight, 0.1, 1000);

var controls = new THREE.TrackballControls(camera);
controls.addEventListener('change', render);

var texture = new THREE.TextureLoader().load("textures/2k_stars.jpg");
scene.background = texture;

function addToScene(cb) {
  scene.add(cb.mesh);
  if (cb.center != null) {
    scene.add(cb.orbit);
  }
  if (cb.satellites != null) {
    cb.satellites.forEach(function (s) {
      addToScene(s);
    });
  }
}

addToScene(sun);

camera.position.z = 150;

var theta = 0;
var step = 1/180;
var days = 0;

var animate = function () {

  sun.move(theta);

  theta += step;
  days = parseInt(theta * 360 / Math.PI / 2);

  requestAnimationFrame(animate);
  render();
  controls.update();

};

function render() {
	renderer.render(scene, camera);
}

animate();
