/* Home page role circle: wheel, drag, keys. Click opens that role page. */
(function(){
  /* Hobby lives in the nav only, and hidden roles are left off the circle */
  var ROLES = window.ROLES.filter(function(r){ return r.key !== 'hobby' && !r.hidden; });
  /* ---------- role dial ---------- */
  var idx = 0, busy = false;
  var zone = document.getElementById('orb-zone'), orb = document.getElementById('orb');
  var list = document.getElementById('roles'), go = document.getElementById('go');
 
  var ring = document.getElementById('orb-ring');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  ROLES.forEach(function(r, i){
    var li = document.createElement('li');
    li.setAttribute('role', 'option');
    var b = document.createElement('button');
    b.type = 'button'; b.textContent = r.label;
    b.addEventListener('click', function(){
      if (i === idx) location.href = r.key + '/'; else setRole(i, i > idx ? 1 : -1);
    });
    li.appendChild(b); list.appendChild(li);
  });

  function layout(){
    var items = list.children, n = ROLES.length, h = list.clientHeight;
    for (var i = 0; i < n; i++){
      var d = i - idx;
      if (d > n / 2) d -= n;
      if (d < -n / 2) d += n;
      var ang = d * 0.52;                     /* radians along the arc */
      var x = 10 + 70 * Math.cos(ang);          /* labels follow the curve of the circle */
      var y = Math.sin(ang) * (h * 0.46);
      var li = items[i];
      li.style.transform = 'translate(' + x + 'px,' + y + 'px) translateY(-50%)';
      li.style.opacity = Math.abs(d) > 2 ? 0 : (d === 0 ? 1 : 0.85);
      li.classList.toggle('active', d === 0);
      li.setAttribute('aria-selected', d === 0 ? 'true' : 'false');
      li.firstChild.tabIndex = Math.abs(d) > 2 ? -1 : 0;
    }
  }

  function paint(){
    var r = ROLES[idx];
    document.documentElement.style.setProperty('--role', r.color);
    ring.style.borderColor = r.color;
    go.href = r.key + '/';
    go.textContent = 'Open this side of me →';
  }

  function setRole(next, dir){
    if (busy) return;
    next = (next + ROLES.length) % ROLES.length;
    if (next === idx) return;
    idx = next;
    layout(); paint();
    if (reduce){orb.innerHTML = avatar(ROLES[idx].key, ROLES[idx].color);return;}
    busy = true;
    orb.className = 'orb ' + (dir > 0 ? 'out-up' : 'out-down');
    setTimeout(function(){
      orb.innerHTML = avatar(ROLES[idx].key, ROLES[idx].color);
      orb.className = 'orb ' + (dir > 0 ? 'in-up' : 'in-down');
      void orb.offsetWidth;
      orb.className = 'orb';
      setTimeout(function(){busy = false;}, 380);
    }, 260);
  }

  orb.innerHTML = avatar(ROLES[0].key, ROLES[0].color);
  paint(); layout();
  window.addEventListener('resize', layout);

  /* wheel over the circle turns the dial instead of scrolling the page */
  var acc = 0;
  zone.addEventListener('wheel', function(e){
    e.preventDefault();
    acc += e.deltaY;
    if (Math.abs(acc) > 40){setRole(idx + (acc > 0 ? 1 : -1), acc > 0 ? 1 : -1);acc = 0;}
  }, {passive:false});

  /* drag or swipe up and down */
  var startY = null, moved = false;
  zone.addEventListener('pointerdown', function(e){startY = e.clientY;moved = false;zone.setPointerCapture(e.pointerId);});
  zone.addEventListener('pointermove', function(e){
    if (startY === null) return;
    var dy = e.clientY - startY;
    if (Math.abs(dy) > 45){setRole(idx + (dy < 0 ? 1 : -1), dy < 0 ? 1 : -1);startY = e.clientY;moved = true;}
  });
  zone.addEventListener('pointerup', function(){
    if (startY !== null && !moved) location.href = ROLES[idx].key + '/';   /* a plain click opens the role */
    startY = null;
  });
  zone.addEventListener('pointercancel', function(){startY = null;});
  zone.addEventListener('keydown', function(e){
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight'){e.preventDefault();setRole(idx + 1, 1);}
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft'){e.preventDefault();setRole(idx - 1, -1);}
    if (e.key === 'Enter'){location.href = ROLES[idx].key + '/';}
  });

})();
