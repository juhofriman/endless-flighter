import * as THREE from 'three';
import { world, stats } from './world';

'use strict';

/* global THREE */

function main() {
  const canvas = document.querySelector('#c');
  const tilecount = document.querySelector('#tilecount');
  const hits = document.querySelector('#hits');

  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize(500, 500)

  const fov = 50;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.x = 2;
  camera.position.y = 2;
  camera.position.z = 3;
  camera.lookAt (new THREE.Vector3 (2, 0, 0));


  const scene = new THREE.Scene();

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  const runWorld = world(scene);

  function render(time) {

    renderer.render(runWorld(), camera);
    tilecount.innerHTML = `tiles: ${stats.tileCount}`;
    hits.innerHTML = `hits: ${stats.hits}`;

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

}


main();
