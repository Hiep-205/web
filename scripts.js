
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");


resizeCanvas();


window.addEventListener("resize", resizeCanvas);
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}


let particles = [];


window.addEventListener("click", (e) => {
  createFirework(e.clientX, e.clientY);
});


window.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  createFirework(touch.clientX, touch.clientY);
});



function createFirework(x, y) {
  const colors = ["#ff4b5c", "#ffd166", "#06d6a0", "#118ab2", "#ef476f"];
  const count = 50; 
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = Math.random() * 5 + 2;
    particles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      radius: Math.random() * 3 + 2,
      decay: Math.random() * 0.02 + 0.015,
    });
  }
}


function animate() {
  
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.05;
    p.alpha -= p.decay;

    if (p.alpha <= 0) {
      particles.splice(i, 1);
      continue;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.alpha})`;
    ctx.fill();
  }

  requestAnimationFrame(animate);
}


function hexToRgb(hex) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r},${g},${b}`;
}


animate();
