const ViewSize = 100;

const AU = 150000000;

// our Solar system is huge and it's impossible to show everything at the same scale
// below are some corrections
const SunPlanetsDistanceCorrection = 1;
const PlanetCorrection = 800;
const SunCorrection = 20;
const EarthMoonDistanceCorrection = 40;

function CelestialBody(name, texture, radius, period, distanceFromCenter, sizeCorrection, distanceCorrection, offset, satellites) {

    var self = this;

    var scale = radius / AU * ViewSize * sizeCorrection;
    var distanceFromCenterScale = distanceFromCenter / AU * ViewSize * distanceCorrection;

    var geometry = new THREE.SphereGeometry(1, 32, 32);
    var texture = new THREE.TextureLoader().load('textures/' + texture);
    var material = new THREE.MeshBasicMaterial({ map: texture });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(scale, scale, scale);

    self.name = name;
    self.radius = radius;
    self.period = period;
    self.distanceFromCenter = distanceFromCenter;
    self.scale = scale;
    self.distanceFromCenterScale = distanceFromCenterScale;
    self.satellites = [];
    self.offset = THREE.Math.degToRad(365.0 / self.period * offset);
    self.mesh = mesh;
    self.center = null;
    self.orbit = null;

    self.move = function (theta) {
      self.selfMove(theta);
      if (self.satellites != null) {
        self.satellites.forEach(function(s) {
          s.move(theta);
        });
      }
    };

    self.selfMove = function (theta) {
      if (self.center != null) {
        var multi = 360 / self.period;
        var angle = multi * theta;
        if (self.offset != null) {
          angle += self.offset;
        }
        var x = self.center.mesh.position.x;
        var y = self.center.mesh.position.y;
        self.mesh.position.x = x + self.distanceFromCenterScale * Math.sin(angle);
        self.mesh.position.y = y - self.distanceFromCenterScale * Math.cos(angle);
        self.orbit.position.x = self.center.mesh.position.x;
        self.orbit.position.y = self.center.mesh.position.y;
      }
    }

    self.setCenter = function (center) {
      var curve = new THREE.EllipseCurve(
        center.mesh.position.x,  center.mesh.position.y,
        self.distanceFromCenterScale, self.distanceFromCenterScale,
        0,  2 * Math.PI
      );
      var points = curve.getPoints(64);
      var geometry = new THREE.BufferGeometry().setFromPoints(points);
      var material = new THREE.LineBasicMaterial({ color : 'white' });
      var orbit = new THREE.Line(geometry, material);

      self.orbit = orbit;
      self.center = center;
    }

    self.addSatellite = function (s) {
      s.setCenter(self);
      self.satellites.push(s);
    }

    if (satellites != null) {
      satellites.forEach(function (s) {
        self.addSatellite(s);
      });
    }

    if (self.offset != null) {
      self.selfMove(self.offset);
    }

}
