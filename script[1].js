const container = document.getElementById('hearts');

function rand(min, max){ return Math.random()*(max-min)+min; }

function createHeart(){
  const el = document.createElement('div');
  el.className = 'heart';
  const size = rand(18,36);
  el.style.width = size + 'px';
  el.style.height = size + 'px';
  el.style.left = rand(5,95) + 'vw';
  el.style.top = (100 + rand(0,20)) + 'vh';
  el.style.opacity = (rand(0.6,1)).toFixed(2);
  el.style.transform = `rotate(45deg) scale(${rand(0.8,1.3)})`;

  const duration = rand(4500,9000);
  const drift = rand(-60,60);

  el.animate([
    { transform: el.style.transform, opacity: el.style.opacity, offset: 0 },
    { transform: `translate(${drift}px, -60vh) rotate(45deg) scale(${rand(1.1,1.8)})`, opacity: 0, offset: 1 }
  ], { duration: duration, easing: 'cubic-bezier(.22,.9,.12,1)', fill: 'forwards' });

  container.appendChild(el);

  setTimeout(()=> {
    if(el && el.parentNode) el.parentNode.removeChild(el);
  }, duration + 200);
}

// spawn hearts at interval with some randomness
let timer = setInterval(createHeart, 350);

// spawn a burst on click/tap
document.addEventListener('click', (e)=>{
  for(let i=0;i<10;i++){
    setTimeout(createHeart, i*80);
  }
});

// accessibility: reduce motion respecting
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  clearInterval(timer);
}
