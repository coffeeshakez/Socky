// import React, { Component } from "react";
// import * as THREE from "three";
// const OrbitControls = require("three-orbit-controls")(THREE);

// var colors = ['#dff69e', 
//               '#00ceff', 
//               '#002bca', 
//               '#ff00e0', 
//               '#3f159f', 
//               '#71b583', 
//               '#00a2ff'];

// class Test extends Component {
//   constructor(props) {
//     super(props);
//     this.animate = this.animate.bind(this);
//     this.initializeCamera = this.initializeCamera.bind(this);
//     this.initializeOrbits = this.initializeOrbits.bind(this);
//     this.createLight = this.createLight.bind(this);
//     this.getRandomColor = this.getRandomColor.bind(this);
//     this.hexToRgb = this.hexToRgb.bind(this);
//     this.handleMouseMove = this.handleMouseMove.bind(this);
//     this.getCanvasRelativePosition = this.getCanvasRelativePosition.bind(this);
//     this.checkCollision = this.checkCollision.bind(this);
//     this.pointInCircle = this.pointInCircle.bind(this);
//   }
// componentDidMount() {

//     this.camera_y = 200;
//     this.camera_x = 200;
//     this.speed = 5;
//     this.mousePos = new THREE.Vector3(0, 0 , 0.5);
//     this.speed = {x: 1, y: 1};
//     this.smoothing = 10;

//     this.width = 10000;
//     this.height = 10000;
    
    

//     document.addEventListener('mousemove', this.handleMouseMove, false);

//     this.particles = [];
//     const width = this.mount.clientWidth;
//     const height = this.mount.clientHeight;
//     this.scene = new THREE.Scene();
//     this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
    
//     this.renderer = new THREE.WebGLRenderer({ antialias: true });
//     // this.renderer.setClearColor( 0xffffff, 1);

//     this.controls = new OrbitControls(this.camera, this.renderer.domElement);
//     this.renderer.setSize(width, height);
//     this.mount.appendChild(this.renderer.domElement);
    

//     const  pointColor = "#ff5808";
//     const directionalLight = new THREE.DirectionalLight(pointColor);
//     directionalLight.position.set(-40, 60, -10);
//     directionalLight.castShadow = true;
    
//     directionalLight.distance = 0;
//     directionalLight.intensity = 0.5;
//     directionalLight.shadowMapHeight = 1024;
//     directionalLight.shadowMapWidth = 1024;
//     this.scene.add( directionalLight );
  
//     this.createPlayer(100, Math.random() * this.width, Math.random() * this.height)
//     this.addParticles(300);
//     this.createLight();
//     this.initializeOrbits();
//     this.initializeCamera();
//     this.animate();
//   }


// componentWillUnmount() {
//     cancelAnimationFrame(this.frameId);
//     this.mount.removeChild(this.renderer.domElement);
//   }
// initializeOrbits() {
//     this.controls.rotateSpeed = 1.0;
//     this.controls.zoomSpeed = 1;
//     this.controls.panSpeed = 0.8;
//   }

// initializeCamera() {
//     const width = this.mount.clientWidth;
//     const height = this.mount.clientHeight;

//     //Start camera at player position.
//     this.camera.position.x = this.player.position.x;
//     this.camera.position.y = this.player.position.y;
//     this.camera.position.z = 2000;
//   }

//   addParticles(noOfParticles){

//     for (let index = 0; index < noOfParticles; index++) {
//       const randColor = this.getRandomColor();
//       const randSize = Math.floor(Math.random() * 50)
//       const sphereGeometry = new THREE.SphereGeometry( randSize, randSize, randSize );
//       const sphereMaterial  = new THREE.MeshPhongMaterial( {color: randColor, shininess: 100} );
      
//       let sphere = new THREE.Mesh( sphereGeometry, sphereMaterial )

//       sphere.position.x = Math.random() * this.width;
//       sphere.position.y = Math.random() * this.height;
      
//       sphere.receiveShadow = true;
        
//         this.particles.push(sphere);
//     }

//     for (let index = 0; index < this.particles.length; index++) {
//         this.scene.add(this.particles[index]);
        
//     }
//   }

//   movePlayer(){
//     const posX = this.player.position.x;
//     const posY = this.player.position.y;
    
//       if(this.mousePos.x  > window.innerWidth / 2 && posX < this.width){
//         this.player.position.x += 10;
//         this.camera.position.x += 10;
//       }

//       if(this.mousePos.x  < window.innerWidth / 2  && posX > 0){
//         this.player.position.x -= 10;
//         this.camera.position.x -= 10;
//       } 

//       if(this.mousePos.y > window.innerHeight / 2 && posY > 0){
//         this.player.position.y -= 10;
//         this.camera.position.y -= 10;
//        }

//       if(this.mousePos.y < window.innerHeight / 2 && posY < this.height){
//         this.player.position.y += 10;
//         this.camera.position.y += 10;
//       } 
//   }

//   handleMouseMove(event) {

    
//     this.mousePos = {x: event.clientX, y: event.clientY}


//     //To get mousepos in actual 3d space.
// //   this.mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
// // 	this.mousePos.y = - (event.clientY / window.innerHeight) * 2 + 1;

// //  // Make the sphere follow the mouse
// //   let vector = new THREE.Vector3(this.mousePos.x, this.mousePos.y, 0.5);
// // 	vector.unproject( this.camera );
// // 	let dir = vector.sub( this.camera.position ).normalize();
// // 	let distance = - this.camera.position.z / dir.z;
// //   let pos = this.camera.position.clone().add( dir.multiplyScalar( distance ) );
// //   this.mousePos = pos;
//   }

//   getCanvasRelativePosition(event) {
//     const rect = this.mount.getBoundingClientRect();
//     console.log("RECTANGLE: ", rect.left, rect.top)
//     return {
//       x: event.clientX - rect.left,
//       y: event.clientY - rect.top,
//     };
//   }


//   updateSpeed(){
//     const width = this.mount.clientWidth;
//     const height = this.mount.clientHeight;
//     console.log("Speed: " , this.speed);
//   }
  
//    createLight() {
//     this.light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.3)
//     this.scene.add(this.light);
//     const shadowLight = new THREE.DirectionalLight(0xffffff, .8);
//     shadowLight.position.set(1, 1, 1);
//        this.scene.add(shadowLight);
//   }

//   animateParticles(){
//     for (let index = 0; index < this.particles.length; index++) {
//         this.particles[index].rotateY(Math.random() / 50);
//         this.particles[index].rotateX(Math.random() / 50);
//     }
//   }

//   // checkCollision(){

//   //   let vector = new THREE.Vector3( 10000, 10000, 10000);
//   //   projector.unprojectVector( vector, camera );

//   //   let raycaster = new THREE.Raycaster( this.camera.position, vector.sub( camera.position ).normalize() );

//   //   let intersects = raycaster.intersectObjects( objects );

//   //   console.log(intersects);
//   // }


//   // x,y is the point to test
// // cx, cy is circle center, and radius is circle radius
//  pointInCircle(x, y, cx, cy, radius) {
//   let distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
//   return distancesquared <= radius * radius;
// }


//   checkCollision(){
//     let playerObj = this.player;

//     for (let index = 0; index < this.particles.length; index++) {

//       let particlePosX = this.particles[index].position.x;
//       let particlePosY = this.particles[index].position.y;
//       let playerPosX = playerObj.position.x;
//       let playerPosY = playerObj.position.y;
//       let playerRadius = playerObj.geometry.boundingSphere.radius

//       if(this.pointInCircle(particlePosX, particlePosY, playerPosX, playerPosY, playerRadius)){
//         let radius = this.particles[index].geometry.boundingSphere.radius;
//         this.scene.remove(this.particles[index]);
//         this.particles.splice(index, 1);
//         this.growPlayer(radius);
//       }
//     }
//   }

//   createPlayer(radius, posX, posY){
//     const sphereGeometry = new THREE.SphereGeometry( radius, 100, 100 );
//     const sphereMaterial  = new THREE.MeshPhongMaterial( {color: 0xffffff, shininess: 1000} );
      
//       let player = new THREE.Mesh( sphereGeometry, sphereMaterial )

//       // this.player.position.x = Math.random() * this.width;
//       // this.player.position.y = Math.random() * this.height;

//       player.position.x = posX;
//       player.position.y = posY;
      
//       player.receiveShadow = true;

//       player.geometry.computeBoundingSphere();

//       this.scene.remove(this.player)
//       this.player = player;
//       this.scene.add(this.player)
      
//   }

//   growPlayer(amount){
//     if(this.player){
//       let radius = this.player.geometry.boundingSphere.radius + amount/2;
//       let playerX = this.player.position.x;
//       let playerY = this.player.position.y;
//       this.createPlayer(radius, playerX , playerY)
//       this.camera.position.z = this.camera.position.z + amount
//     }
//   }

// animate() {
//     this.frameId = window.requestAnimationFrame(this.animate);
//     this.renderer.render(this.scene, this.camera);
//     this.movePlayer();
//     this.checkCollision();
//     //Render react;
//     this.render();
//     // this.animateParticles();
//   }
  
// getRandomColor(){
//     var col = this.hexToRgb(colors[Math.floor(Math.random()*colors.length)]);
//     var threecol = new THREE.Color("rgb("+col.r+","+col.g+","+col.b+")");
//     return threecol;
//   }
    
// hexToRgb(hex) {
//     var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//     return result ? {
//       r: parseInt(result[1], 16),
//       g: parseInt(result[2], 16),
//       b: parseInt(result[3], 16)
//     } : null;
//   }

// render() {
//     return (
//       <div>
        
//         {/* <div id="info">
//           <h1 style={{position: "absolute;", top: "10px;", left: "0;", color: "white;", zIndex: "100;"}}>{this.player.geometry.radius ? this.player.geometry.radius : "ingen påegn du r dårli"} </h1>
//         </div> */}
        
        
//         <div
//           id="boardCanvas"
//           style={{ width: "100vw", height: "100vh", backgroundColor: 'white'}}
//           ref={mount => {
//             this.mount = mount;
//           }}
//         />
//       </div>
//     );
//   }
// }
// export default Test;