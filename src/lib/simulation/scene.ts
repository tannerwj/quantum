import * as THREE from 'three';

export function initScene(canvas: HTMLCanvasElement) {
	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0x0a0a0a);

	// Camera setup
	const width = canvas.parentElement?.clientWidth || window.innerWidth;
	const height = Math.min(600, window.innerHeight * 0.7);
	const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
	camera.position.z = 15;

	// Renderer setup
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
		alpha: false
	});
	renderer.setSize(width, height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	// Lighting
	const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(ambientLight);

	const pointLight = new THREE.PointLight(0x00d9ff, 1, 100);
	pointLight.position.set(0, 10, 10);
	scene.add(pointLight);

	// Add barrier with slits
	addBarrier(scene);

	return { scene, camera, renderer };
}

function addBarrier(scene: THREE.Scene) {
	const barrierMaterial = new THREE.MeshStandardMaterial({
		color: 0x333333,
		metalness: 0.8,
		roughness: 0.2
	});

	// Top part of barrier
	const topBarrier = new THREE.Mesh(
		new THREE.BoxGeometry(0.2, 10, 0.5),
		barrierMaterial
	);
	topBarrier.position.set(0, 3, 0);
	scene.add(topBarrier);

	// Bottom part of barrier
	const bottomBarrier = new THREE.Mesh(
		new THREE.BoxGeometry(0.2, 10, 0.5),
		barrierMaterial
	);
	bottomBarrier.position.set(0, -3, 0);
	scene.add(bottomBarrier);

	// Detector screen
	const screenGeometry = new THREE.PlaneGeometry(0.1, 15);
	const screenMaterial = new THREE.MeshStandardMaterial({
		color: 0x1a1a1a,
		side: THREE.DoubleSide,
		emissive: 0x111111
	});
	const screen = new THREE.Mesh(screenGeometry, screenMaterial);
	screen.position.set(8, 0, 0);
	screen.rotation.y = Math.PI / 2;
	scene.add(screen);
}
