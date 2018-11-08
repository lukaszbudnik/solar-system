# solar-system

Sample app written in Three.js showing a simplified view of our Solar System.

By simplified I mean the following:

* shows only the terrestrial planets
* assumes all orbits are circular
* all physical values are rounded (orbit periods, offsets, distances from the Sun, etc)

# Model of celestial bodies

This project uses a recursive model to represent celestial bodies. A `CelestialBody` object can have an array of other `CelestialBody` objects as its satellites.

In the application you can see how it was implemented with Sun -> Earth -> Moon.

# Copy rights

Textures of Sun, Mercury, Venus, Earth, Moon, Mars, and the stars are taken from: https://www.solarsystemscope.com/textures/.

# License

Copyright (c) 2018 Łukasz Budnik

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
