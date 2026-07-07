const cursorRing = document.getElementById('custom-cursor-ring');

let mouseX = 0, mouseY = 0;   // Real-time mouse values
let ringX = 0, ringY = 0;     // Inertial tracking positions

// Linear interpolation tracking formula
const lerp = (start, end, factor) => start + (end - start) * factor;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function renderCursorLoop() {
  // Graceful lag coefficient tracking (0.15 matches the video's drift physics)
  ringX = lerp(ringX, mouseX, 0.15);
  ringY = lerp(ringY, mouseY, 0.15);
  
  cursorRing.style.left = `${ringX}px`;
  cursorRing.style.top = `${ringY}px`;
  
  requestAnimationFrame(renderCursorLoop);
}
requestAnimationFrame(renderCursorLoop);

// --- Element Interaction Tracking ---
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
  // Expand cursor into an open lens overlay when framing text strings
  item.addEventListener('mouseenter', () => {
    cursorRing.classList.add('expanded-lens');
  });
  
  // Instantly return to default upscale baseline diameter when leaving list area
  item.addEventListener('mouseleave', () => {
    cursorRing.classList.remove('expanded-lens');
  });
});
