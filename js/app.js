document.addEventListener("DOMContentLoaded", () => {
	
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		1,
		900
	);

	const renderer = new THREE.WebGLRenderer();
	
	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	controls.enableDamping = true;
	controls.dampingFactor = 1;
	controls.enableZoom = true;
	controls.enablePan = false;

	controls.mouseButtons = {
		LEFT: THREE.MOUSE.ROTATE,
		MIDDLE: THREE.MOUSE.DOLLY,
		RIGHT: THREE.MOUSE.PAN,
	};
	controls.keys = {
		LEFT: "KeyQ", //left arrow
		UP: "KeyZ", // up arrow
		RIGHT: "KeyD", // right arrow
		BOTTOM: "KeyS", // down arrow
	};
	controls.touches = {
		ONE: THREE.TOUCH.ROTATE,
		TWO: THREE.TOUCH.DOLLY_PAN,
	};

	/*test*/

	const texture = new THREE.TextureLoader().load(
		"./assets/TexturesCom_Metal_RedHotSteel_header.jpg"
	);
	const textureL = new THREE.TextureLoader().load(
		"./assets/Lune.jpg"
	);
	const textureC = new THREE.TextureLoader().load(
		"./assets/ciel.jpg"
	);

	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(4, 4);

	const geometry = new THREE.SphereGeometry(14, 64, 32);
	const material = new THREE.MeshBasicMaterial({
		color: 0xf39c12,
		map: texture,
	});
	const sphere = new THREE.Mesh(geometry, material);
	scene.add(sphere);
	const materialC = new THREE.MeshBasicMaterial({
		map: textureC,
	});
	const geoL = new THREE.SphereGeometry(14, 64, 32);
	const materialL = new THREE.MeshBasicMaterial({
		map: textureL,
	});
	const sphereL = new THREE.Mesh(geoL, materialL);
	scene.add(sphereL);

	camera.position.z = 40;
	/*Light/Shadow*/
	scene.add(new THREE.AmbientLight(0xffffff, 0.5));
	renderer.setClearColor(0x1111, 1.0);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	let color = 0xffffff;
	let intensity = 3;
	let light = new THREE.PointLight(color, intensity);
	light.position.set(0, 10, 0);
	scene.add(light);
	let helper = new THREE.PointLightHelper(light);
	scene.add(helper);

	/* function updateLight() {
		helper.update();
	}
	//Create a sphere that cast shadows (but does not receive them)
	const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
	const sphereMaterial = new THREE.MeshStandardMaterial({
		color: 0x2c3e50,
	}); */
	//cube

	const cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
	const cubeGeometry2 = new THREE.BoxGeometry(10, 11, 10);
	const cubeMaterial = new THREE.MeshStandardMaterial({
		color: 0x2c3e50,
	});
	const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

	cube.position.x = -10;
	cube.position.y = -26;

	scene.add(cube);

	const cube2 = new THREE.Mesh(cubeGeometry2, cubeMaterial);
	cube2.position.y = -25;
	scene.add(cube2);

	const clock = new THREE.Clock();
	let time = Date.now();

	const tick = () => {
		//clock
		const elapsedTime = clock.getElapsedTime();

		//time
		const CurrentTime = Date.now();
		const deltaTime = CurrentTime - time;
		time = CurrentTime;

		light.position.y = Math.sin(elapsedTime) * 100;
		light.position.x = Math.cos(elapsedTime) * 100;
		//update object
		//mesh.rotation.y = Math.sin(elapsedTime)
		sphere.position.y = Math.sin(elapsedTime) * 100;
		sphere.position.x = Math.cos(elapsedTime) * 100;

		sphereL.position.y = Math.sin(elapsedTime) * -100;
		sphereL.position.x = Math.cos(elapsedTime) * -100;

		//mesh.rotation.x = Math.cos(elapsedTime)

		//update camera
		//camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
		//camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
		//camera.position.y = cursor.y * 3
		//camera.lookAt(mesh.position)
		//update controls
		controls.update();

		//render
		renderer.render(scene, camera);
		window.requestAnimationFrame(tick);
	};
	tick();
	//Create a plane that receives shadows (but does not cast them)
	const herbe = new THREE.TextureLoader().load("./assets/Grass0027_6_download600.jpg");
	const cubeplane = new THREE.BoxGeometry(150, 1, 150);
	const material4 = new THREE.MeshBasicMaterial({});
	const SolCube = new THREE.Mesh(
		cubeplane,
		new THREE.MeshBasicMaterial({
			color: 0x009432,
			map: herbe,
		})
	);
	SolCube.position.y = -31;
	SolCube.receiveShadow = true;
	scene.add(SolCube);
	const planeGeo = new THREE.PlaneGeometry(150, 150);
	const planeMesh = new THREE.Mesh(
		planeGeo,
		new THREE.MeshBasicMaterial({
			color: 0x009432,
			map: herbe,
		})
	);
	planeMesh.receiveShadow = true;
	planeMesh.rotation.x -= Math.PI / 2;
	planeMesh.position.y += -30;
	scene.add(planeMesh);
	
	
	//Create a helper for the shadow camera (optional)

	let animate = () => {
		requestAnimationFrame(animate);
		if (sphereL.position.y <= 0) {
			scene.background = new THREE.Color( 0x87CEEB );
		}	
		else {
			scene.background = new THREE.Color( 0x2c3e50 );
		}
		controls.update();
		sphere.rotation.y += 0.01;
		sphereL.rotation.y += 0.01;

		renderer.render(scene, camera);
	};

	animate();
});