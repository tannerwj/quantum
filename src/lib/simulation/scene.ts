import * as THREE from 'three';

export function initScene(canvas: HTMLCanvasElement) {
	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0x0a0a0a);
	scene.fog = new THREE.Fog(0x0a0a0a, 20, 50);

	// Camera setup - view from detector screen looking back toward slits and source
	const width = canvas.parentElement?.clientWidth || window.innerWidth;
	const height = Math.min(600, window.innerHeight * 0.7);
	const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
	camera.position.set(-14, 5, 12);
	camera.lookAt(2, 0, 0);

	// Renderer setup
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
		alpha: false
	});
	renderer.setSize(width, height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	// Lighting
	const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
	scene.add(ambientLight);

	const keyLight = new THREE.PointLight(0x00d9ff, 1, 50);
	keyLight.position.set(10, 10, 10);
	scene.add(keyLight);

	const fillLight = new THREE.PointLight(0xff00ff, 0.5, 50);
	fillLight.position.set(-10, 5, 5);
	scene.add(fillLight);

	// Add particle source (left side)
	const sourceGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 16);
	const sourceMaterial = new THREE.MeshStandardMaterial({
		color: 0x00d9ff,
		emissive: 0x00d9ff,
		emissiveIntensity: 0.5,
		metalness: 0.8,
		roughness: 0.2
	});
	const source = new THREE.Mesh(sourceGeometry, sourceMaterial);
	source.rotation.z = Math.PI / 2;
	source.position.set(-8, 0, 0);
	scene.add(source);

	// Add barrier with slits at center
	const { barrier, slitMarkers } = createBarrier(scene);

	// Add detector screen (right side)
	const screen = createDetectorScreen(scene);

	// Add measurement detector camera (initially hidden)
	const detectorCamera = createMeasurementDetector(scene);

	// Add grid floor for depth perception
	const gridHelper = new THREE.GridHelper(30, 30, 0x00d9ff, 0x333333);
	gridHelper.position.y = -5;
	scene.add(gridHelper);

	return { scene, camera, renderer, barrier, slitMarkers, screen, detectorCamera };
}

function createBarrier(scene: THREE.Scene) {
	const barrierMaterial = new THREE.MeshStandardMaterial({
		color: 0x222222,
		metalness: 0.9,
		roughness: 0.1
	});

	// Main barrier plate - taller and wider for better visibility
	const barrierGeometry = new THREE.BoxGeometry(0.4, 18, 4);
	const barrier = new THREE.Mesh(barrierGeometry, barrierMaterial);
	barrier.position.set(0, 0, 0);
	scene.add(barrier);

	// Slit markers (glowing edges) - more prominent
	const slitMarkers: THREE.Mesh[] = [];
	const slitEdgeMaterial = new THREE.MeshStandardMaterial({
		color: 0xff00ff,
		emissive: 0xff00ff,
		emissiveIntensity: 0.6
	});

	// Top slit markers - larger and more visible
	const topMarker1 = new THREE.Mesh(
		new THREE.BoxGeometry(0.5, 0.3, 4.2),
		slitEdgeMaterial
	);
	topMarker1.position.set(0, 1.5, 0);
	scene.add(topMarker1);
	slitMarkers.push(topMarker1);

	// Bottom slit markers - larger and more visible
	const bottomMarker1 = new THREE.Mesh(
		new THREE.BoxGeometry(0.5, 0.3, 4.2),
		slitEdgeMaterial
	);
	bottomMarker1.position.set(0, -1.5, 0);
	scene.add(bottomMarker1);
	slitMarkers.push(bottomMarker1);

	return { barrier, slitMarkers };
}

function createDetectorScreen(scene: THREE.Scene) {
	// Screen backing - much wider for better pattern visibility
	const screenGeometry = new THREE.PlaneGeometry(4, 18);
	const screenMaterial = new THREE.MeshStandardMaterial({
		color: 0x0a0a0a,
		side: THREE.DoubleSide,
		emissive: 0x111111,
		metalness: 0.5,
		roughness: 0.5
	});
	const screen = new THREE.Mesh(screenGeometry, screenMaterial);
	screen.position.set(8, 0, 0);
	screen.rotation.y = Math.PI / 2;
	scene.add(screen);

	// Screen frame
	const frameMaterial = new THREE.MeshStandardMaterial({
		color: 0x333333,
		metalness: 0.8,
		roughness: 0.2
	});

	const frameTop = new THREE.Mesh(
		new THREE.BoxGeometry(4.2, 0.3, 0.3),
		frameMaterial
	);
	frameTop.position.set(8, 9.2, 0);
	scene.add(frameTop);

	const frameBottom = new THREE.Mesh(
		new THREE.BoxGeometry(4.2, 0.3, 0.3),
		frameMaterial
	);
	frameBottom.position.set(8, -9.2, 0);
	scene.add(frameBottom);

	const frameLeft = new THREE.Mesh(
		new THREE.BoxGeometry(4.2, 0.3, 0.3),
		frameMaterial
	);
	frameLeft.position.set(8, 0, -2.1);
	frameLeft.rotation.y = Math.PI / 2;
	scene.add(frameLeft);

	const frameRight = new THREE.Mesh(
		new THREE.BoxGeometry(4.2, 0.3, 0.3),
		frameMaterial
	);
	frameRight.position.set(8, 0, 2.1);
	frameRight.rotation.y = Math.PI / 2;
	scene.add(frameRight);

	return screen;
}

function createMeasurementDetector(scene: THREE.Scene) {
	const detectorGroup = new THREE.Group();

	// Camera body - built with front facing +Z (so lookAt works)
	const bodyGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.8);
	const bodyMaterial = new THREE.MeshStandardMaterial({
		color: 0xff6600,
		metalness: 0.8,
		roughness: 0.2,
		emissive: 0xff3300,
		emissiveIntensity: 0.4
	});
	const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
	detectorGroup.add(body);

	// Camera lens - pointing along +Z (forward)
	const lensGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.4, 16);
	const lensMaterial = new THREE.MeshStandardMaterial({
		color: 0x111111,
		metalness: 0.9,
		roughness: 0.1,
		emissive: 0xff0000,
		emissiveIntensity: 0.3
	});
	const lens = new THREE.Mesh(lensGeometry, lensMaterial);
	lens.rotation.x = Math.PI / 2; // Rotate to point along Z
	lens.position.z = 0.5; // Front of camera
	detectorGroup.add(lens);

	// Laser beam cone - big end toward slits
	const beamGeometry = new THREE.ConeGeometry(1.0, 4, 8, 1, true);
	const beamMaterial = new THREE.MeshBasicMaterial({
		color: 0xff0000,
		transparent: true,
		opacity: 0.2,
		side: THREE.DoubleSide
	});
	const beam = new THREE.Mesh(beamGeometry, beamMaterial);
	beam.rotation.x = -Math.PI / 2; // Flip cone so wide end faces +Z (toward slits)
	beam.position.z = 2.7;
	detectorGroup.add(beam);

	// Position detector: left side of emitter/slits (negative Z side)
	detectorGroup.position.set(-5, 2.5, -3);

	// Point the camera at the slits (0, 0, 0)
	detectorGroup.lookAt(0, 0, 0);

	detectorGroup.visible = false;

	scene.add(detectorGroup);
	return detectorGroup;
}

export function updateSlitPositions(
	slitMarkers: THREE.Mesh[],
	slitSpacing: number,
	slitWidth: number
) {
	const halfSpacing = slitSpacing / 2;
	const halfWidth = slitWidth / 2;

	// Top slit
	slitMarkers[0].position.y = halfSpacing + halfWidth;
	slitMarkers[0].scale.y = Math.max(0.3, slitWidth);

	// Bottom slit
	slitMarkers[1].position.y = -(halfSpacing + halfWidth);
	slitMarkers[1].scale.y = Math.max(0.3, slitWidth);
}

export function updateDetectorVisibility(detectorCamera: THREE.Group, visible: boolean) {
	detectorCamera.visible = visible;
}
