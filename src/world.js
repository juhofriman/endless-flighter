'use strict';

import * as THREE from 'three';

var left = false;
var right = false;
window.addEventListener("keydown",
    function(e){
        if(e.keyCode === 65) {
          left = true;
        }
        if(e.keyCode === 83) {
          right = true;
        }
    },
false);

window.addEventListener('keyup',
    function(e){
      if(e.keyCode === 65) {
        left = false;
      }
      if(e.keyCode === 83) {
        right = false;
      }
    },
false);

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function newPlayer(scene) {
  const playerGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);

  const playerMaterial = new THREE.MeshPhongMaterial({color: 0x99aa77});  // greenish blue

  const playerObject = new THREE.Mesh(playerGeometry, playerMaterial);
  playerObject.position.x = 0;
  playerObject.position.y = 0;
  playerObject.position.z = 0;
  scene.add(playerObject);
  return playerObject;
}

function newTile(scene, x, y) {
  const tileGeometry = new THREE.BoxGeometry(getRandomArbitrary(2, 4), 0.2, 0.2);

  const tileMaterial = new THREE.MeshPhongMaterial({color: 0xaa99cc});  // greenish blue

  const tileObject = new THREE.Mesh(tileGeometry, tileMaterial);
  tileObject.position.x = getRandomArbitrary(0, 4);
  tileObject.position.y = 0;
  tileObject.position.z = -5;
  scene.add(tileObject);
  return tileObject;
}

export const stats = {
  tileCount: 0,
  hits: 0
};

export function world(scene) {

  const closure = {
    player: newPlayer(scene),
    tiletator: 100,
    tiles: [
    ]
  };



  return function(action) {
    stats.tileCount = closure.tiles.length;

    closure.tiletator--;
    if(closure.tiletator === 0) {
      closure.tiles.push(newTile(scene, 1, 1));
      closure.tiletator = getRandomInt(150, 250);
    }
    closure.tiles.forEach((tile) => {
      tile.position.z += 0.02;
    });
    if(right && closure.player.position.x < 5) {
      closure.player.position.x += 0.05;
    }
    if(left && closure.player.position.x > -0.5) {
      closure.player.position.x -= 0.05;
    }

    return scene;
  }
}
