<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";
import { gsap } from "gsap";

const isHovered = ref(false);

onMounted(() => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(200, 200);

  const container = document.getElementById("three-button")!;
  container.appendChild(renderer.domElement);

  camera.position.z = 5;

  // Заменяем одну фигуру на ракету
  const geometries = [
    new THREE.BoxGeometry(),
    new THREE.SphereGeometry(0.7, 32, 32),
    new THREE.CylinderGeometry(0.2, 0.5, 1.5, 32), // Тело ракеты
  ];

  const materials = [
    new THREE.MeshStandardMaterial({ color: 0xff5733 }), // Оранжевый
    new THREE.MeshStandardMaterial({ color: 0x33ff57 }), // Зелёный
    new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: false }), // Белый для ракеты
  ];

  const meshes = geometries.map((geo, index) => {
    const mesh = new THREE.Mesh(geo, materials[index]);
    mesh.position.set(0, 0, 0); // Начальная позиция
    mesh.scale.set(0, 0, 0); // Скрытые фигуры
    scene.add(mesh);
    return mesh;
  });

  // Освещение
  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(2, 2, 5);
  scene.add(light);

  // Анимация появления с случайной позицией
  const showFigures = () => {
    meshes.forEach((mesh, index) => {
      const randomX = (Math.random() - 0.5) * 3; // Случайное X
      const randomY = (Math.random() - 0.5) * 3 + 1; // Случайное Y
      const randomZ = (Math.random() - 0.5) * 3; // Случайное Z

      gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 0.7, ease: "power2.out", delay: index * 0.2 });
      gsap.to(mesh.position, {
        x: randomX,
        y: randomY,
        z: randomZ,
        duration: 0.7,
        ease: "power2.out",
        delay: index * 0.2,
      });
    });
  };

  // Анимация исчезновения
  const hideFigures = () => {
    meshes.forEach((mesh, index) => {
      gsap.to(mesh.scale, { x: 0, y: 0, z: 0, duration: 0.7, ease: "power2.in", delay: index * 0.2 });
      gsap.to(mesh.position, {
        x: 0,
        y: 0, // Возвращаем фигуры в центр кнопки
        z: 0,
        duration: 0.7,
        ease: "power2.in",
        delay: index * 0.2,
      });
    });
  };

  // Анимация вращения и рендер
  const animate = () => {
    requestAnimationFrame(animate);
    meshes.forEach((mesh, index) => {
      if (mesh.scale.x > 0) {
        mesh.rotation.x += 0.005 + index * 0.001; // Медленное вращение
        mesh.rotation.y += 0.005 + index * 0.001;
      }
    });
    renderer.render(scene, camera);
  };
  animate();

  // Обработчики событий
  container.addEventListener("mouseover", () => {
    isHovered.value = true;
    showFigures();
  });
  container.addEventListener("mouseleave", () => {
    isHovered.value = false;
    hideFigures();
  });

  // Очистка ресурсов
  onUnmounted(() => {
    renderer.dispose();
    meshes.forEach((mesh) => scene.remove(mesh));
  });
});
</script>

<template>
  <div
    id="three-button"
    style="
      width: 200px;
      height: 200px;
      position: relative;
      margin: auto;
    "
  >
    <button
      style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: transparent;
        color: white;
        border: 2px solid white;
        border-radius: 8px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;

      "
    >
      Hover Me
    </button>
  </div>
</template>

<style>
#three-button {
  position: relative;
  z-index: 1;
}
#three-button canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2; /* Канвас выше кнопки */
}
#three-button:hover button {
  color: #ff5733;
  border-color: #ff5733;
}
</style>
