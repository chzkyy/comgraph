import * as THREE from "./three.js-master/build/three.module.js";
import { OrbitControls } from "./three.js-master/examples/jsm/controls/OrbitControls.js";

const initialize = () => {
  const scene = new THREE.Scene();
  const camera = createCamera();
  const renderer = createRenderer();
  const loader = new THREE.TextureLoader();
  const AmbientLight = createAmbientLight(scene);
  const pointlight = createPointLight(scene);
    
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0,0,0);
  controls.minDistance = 100;
  controls.maxDistance = 100;
  controls.dampingFactor = 0.1;
  controls.maxPolarAngle = Math.PI / 2;
  controls.enabled = true;
  controls.enableDamping = true;
  controls.autoRotate = true;
  
  const board = createBoard(scene, loader);
  
  /***** Snowman Insert *****/
  const belowCircular = objekSnowmanBawah();
  belowCircular.position.set(0, -8, -30);

  const middleCircular = objekSnowmanTengah();
  middleCircular.position.set(0, 2, -30);

  const upperCircular = objekSnowmanAtas();
  upperCircular.position.set(0, 9, -30);

  const leftArm = objektanganKiriLengan();
  //leftArm.rotate.set(60 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD);
  leftArm.position.set(-8, 5, -30);

  const leftThumb  = objektanganKiriJariAtas();
  leftThumb.position.set(-10, 6.5, -30);

  const leftlittleFinger = objektanganKiriJariBawah();
  leftlittleFinger.position.set(-10.5, 5.5, -30);

  const rightArm = objektanganKananLengan();
  //leftArm.rotate.set(60 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD);
  rightArm.position.set(8, 5, -30);

  const rightThumb  = objektanganKananJariAtas();
  rightThumb.position.set(10, 6.5, -30);

  const rightlittleFinger = objektanganKananJariBawah();
  rightlittleFinger.position.set(10.5, 5.5, -30);

  const leftEye = objekBolaHitam();
  leftEye.position.set(-1, 9, -25);
  leftEye.scale.set(0.5, 0.5, 0.5);
  
  const rightEye = objekBolaHitam();
  rightEye.position.set(1, 9, -25);
  rightEye.scale.set(0.5, 0.5, 0.5);

  const carrotNose = objekHidung();
  carrotNose.position.set(0, 8, -25);
  carrotNose.scale.set(0.5, 0.5, 0.5);
  
  //grouping object Badan
  const body = new THREE.Group();
  body.add(belowCircular);
  body.add(middleCircular);
  body.add(upperCircular);
  
  //grouping object tangan kiri (sisi kita)
  const leftFullHand = new THREE.Group();
  leftFullHand.add(leftArm);
  leftFullHand.add(leftThumb);
  leftFullHand.add(leftlittleFinger);
  
  //grouping object tangan kanan (sisi kita)
  const rightFullHand = new THREE.Group();
  rightFullHand.add(rightArm);
  rightFullHand.add(rightThumb);
  rightFullHand.add(rightlittleFinger);

  //grouping object muka
  const face = new THREE.Group();
  face.add(leftEye);
  face.add(rightEye);
  face.add(carrotNose);
  
  //grouping object snowman full
  const snowmanFull = new THREE.Group();
  snowmanFull.add(body);
  snowmanFull.add(leftFullHand);
  snowmanFull.add(rightFullHand);
  snowmanFull.add(face);
  scene.add(snowmanFull);

  const render = () => {
      requestAnimationFrame(render);
      controls.update();
      renderer.render(scene, camera);
  }
  
  render();
}

// untuk mengatur camera
const createCamera = () => {
  const [fov, aspect, near, far] = 
  [60, window.innerWidth / window.innerHeight, 0.1, 2000];
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 30);
  camera.lookAt(0, 0, 0);

  return camera;
}

// untuk merender canva
const createRenderer = () => {
  const renderer = new THREE.WebGLRenderer({ antialias: true});
  renderer.setClearColor("#4F96FF");
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;
  renderer.basicShadowMap = true;

  return renderer;
}

// untuk mengatur pencahayaan
const createPointLight = (scene) => {
  const pointlight = new THREE.PointLight(
    '#FFFFFF', 2);
  pointlight.position.set(1, 1, 10);
  pointlight.castShadow = true;
  pointlight.shadow.camera.far = 1200;

  scene.add(pointlight);
  return pointlight;
}

const createAmbientLight = (scene) => {
  const AmbientLight = new THREE.AmbientLight('#211E1E', 0.2);

  scene.add(AmbientLight);
  return AmbientLight;
}

// untuk membuat floor
const createBoard = (scene, loader) => {
  const geometry = new THREE.BoxGeometry(500, 500, 7);
  const material = new THREE.MeshBasicMaterial({
    color: '#ffff',
  });
  const chessboard = new THREE.Mesh(geometry, material);

  chessboard.position.set(0, -16, 30);
  chessboard.rotateX(Math.PI / 2);
  chessboard.rotateY(0);
  chessboard.rotateZ(Math.PI/2);
  chessboard.receiveShadow = true;
  chessboard.castShadow = true;

  scene.add(chessboard);
  return chessboard;
}

/* START: Buat fungsi tampilkan 3d object snowman*/
const objekSnowmanBawah = () => {
    const bentukBola = new THREE.SphereGeometry(7, 32, 16 );
    const materialb = new THREE.MeshPhongMaterial();
    const bolaBawah = new THREE.Mesh( bentukBola, materialb );
    return bolaBawah;
}

const objekSnowmanTengah = () => {
    const bentukBola = new THREE.SphereGeometry(5, 32, 16);
    const materialb = new THREE.MeshPhongMaterial();
    const bolaBawah = new THREE.Mesh( bentukBola, materialb );
    return bolaBawah;
}

const objekSnowmanAtas = () => {
    const bentukBola = new THREE.SphereGeometry(3, 32, 16);
    const materialb = new THREE.MeshPhongMaterial();
    const bolaBawah = new THREE.Mesh( bentukBola, materialb );
    return bolaBawah;
}

const objektanganKiriLengan = () => {
    const lenganMaterial = new THREE.BoxGeometry(8, 0.5, 0.5);
    const material = new THREE.MeshPhongMaterial();
    const kiriLengan = new THREE.Mesh( lenganMaterial, material );
    kiriLengan.material.color.set(0x4b3621);
    //Café Noir Color
    kiriLengan.rotateZ(-25 * THREE.Math.DEG2RAD);
    return kiriLengan;
}

const objektanganKiriJariAtas = () => {
  const lenganMaterial = new THREE.BoxGeometry(2, 0.5, 0.5);
  const material = new THREE.MeshPhongMaterial();
  const kirijariAtas = new THREE.Mesh( lenganMaterial, material );
  kirijariAtas.material.color.set(0x4b3621);
  //Café Noir Color
  kirijariAtas.rotateZ(110 * THREE.Math.DEG2RAD);
  return kirijariAtas;
}

const objektanganKiriJariBawah = () => {
  const lenganMaterial = new THREE.BoxGeometry(2, 0.5, 0.5);
  const material = new THREE.MeshPhongMaterial();
  const kirijariBawah = new THREE.Mesh( lenganMaterial, material );
  kirijariBawah.material.color.set(0x4b3621);
  //Café Noir Color
  kirijariBawah.rotateZ(-155 * THREE.Math.DEG2RAD);
  return kirijariBawah;
}

const objektanganKananLengan = () => {
  const lenganMaterial = new THREE.BoxGeometry(8, 0.5, 0.5);
  const material = new THREE.MeshPhongMaterial();
  const kiriLengan = new THREE.Mesh( lenganMaterial, material );
  kiriLengan.material.color.set(0x4b3621);
  //Café Noir Color
  kiriLengan.rotateZ(25 * THREE.Math.DEG2RAD);
  return kiriLengan;
}

const objektanganKananJariAtas = () => {
const lenganMaterial = new THREE.BoxGeometry(2, 0.5, 0.5);
const material = new THREE.MeshPhongMaterial();
const kirijariAtas = new THREE.Mesh( lenganMaterial, material );
kirijariAtas.material.color.set(0x4b3621);
//Café Noir Color
kirijariAtas.rotateZ(-110 * THREE.Math.DEG2RAD);
return kirijariAtas;
}

const objektanganKananJariBawah = () => {
const lenganMaterial = new THREE.BoxGeometry(2, 0.5, 0.5);
const material = new THREE.MeshPhongMaterial();
const kirijariBawah = new THREE.Mesh( lenganMaterial, material );
kirijariBawah.material.color.set(0x4b3621);
//Café Noir Color
kirijariBawah.rotateZ(155 * THREE.Math.DEG2RAD);
return kirijariBawah;
}

const objekBolaHitam = () => {
  const bentukBola = new THREE.SphereGeometry(1, 32, 16);
  const materialb = new THREE.MeshPhongMaterial();
  const mata = new THREE.Mesh( bentukBola, materialb );
  mata.material.color.set(0x000000);
  return mata;
}

const objekHidung = () => {
  const bentuk = new THREE.ConeGeometry(1, 5, 32);
  const material = new THREE.MeshPhongMaterial();
  const hidung = new THREE.Mesh( bentuk, material );
  hidung.material.color.set(0xff6700);
  hidung.rotateX(90 * THREE.Math.DEG2RAD)
  //safety orange
  return hidung;
}
/* END: Fungsi membuat objek Snowman */

// untuk memanggil init
initialize();
