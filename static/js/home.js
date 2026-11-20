// Home page behaviour: view toggle (blueprint <-> product), cursor reticle,
// nav rail scroll progress, and the scroll-driven experience timeline.
(function () {
  var pg = document.getElementById('pg');
  if (!pg) return;

  var cur = document.getElementById('cur');
  var rail = document.getElementById('rail');
  var tgl = document.getElementById('tgl');
  var tglLabel = document.getElementById('tgl-label');
  var tl = pg.querySelector('[data-tl]');
  var tlSticky = pg.querySelector('[data-tl-sticky]');
  var tlStep = pg.querySelector('[data-tl-step]');
  var tlFill = pg.querySelector('.tl-fill');
  var tlBtns = Array.prototype.slice.call(pg.querySelectorAll('.tl-b'));
  var tlPanels = Array.prototype.slice.call(pg.querySelectorAll('.tl-p'));
  var tlSegs = Array.prototype.slice.call(pg.querySelectorAll('.tl-seg'));
  var navLinks = Array.prototype.slice.call(rail ? rail.querySelectorAll('.rn:not(.rn-m)') : []);
  var navIds = ['top', 'offer', 'work', 'experience', 'contact'];

  var state = { clean: false, touched: false, go: '', phase: '', morph: false, active: 0, sec: 0 };

  function setMode() {
    var cls = ['pg', 'bp'];
    cls.push(state.touched ? (state.clean ? 'clean' : 'blue') : 'init');
    if (state.go) cls.push('go-' + state.go);
    if (state.go && state.phase === 'exit') cls.push('exit-' + state.go);
    if (state.go && state.phase === 'enter') cls.push('enter-' + state.go);
    if (state.morph) cls.push('morph');
    pg.className = cls.join(' ');
    tgl.setAttribute('aria-pressed', state.clean ? 'true' : 'false');
    tgl.setAttribute('aria-label', state.clean ? 'Switch to blueprint view' : 'Switch to product view');
    tglLabel.textContent = state.clean ? 'Blueprint view' : 'Product view';
  }

  function setActive(a) {
    state.active = a;
    tlBtns.forEach(function (b, i) {
      b.classList.toggle('on', i === a);
      b.setAttribute('aria-pressed', i === a ? 'true' : 'false');
    });
    tlPanels.forEach(function (p, i) {
      p.classList.toggle('on', i === a);
      p.setAttribute('aria-hidden', i === a ? 'false' : 'true');
    });
    tlSegs.forEach(function (s, i) { s.classList.toggle('on', i === a); });
    if (tlFill) tlFill.style.setProperty('--fill', String(a / 3));
    if (tlStep) tlStep.textContent = '0' + (a + 1) + ' / 04';
  }

  function setSec(s) {
    state.sec = s;
    navLinks.forEach(function (n, i) {
      n.classList.toggle('on', i === s);
      n.setAttribute('aria-current', i === s ? 'location' : 'false');
    });
  }

  function syncTl() {
    if (!tl || !tlSticky) return;
    var r = tl.getBoundingClientRect();
    var span = r.height - tlSticky.offsetHeight;
    if (span <= 0) return;
    var p = Math.min(1, Math.max(0, -r.top / span));
    var a = Math.min(3, Math.floor(p * 4));
    if (a !== state.active) setActive(a);
  }

  function syncNav() {
    var de = document.documentElement;
    var max = Math.max(1, de.scrollHeight - window.innerHeight);
    var pct = Math.min(100, Math.max(0, Math.round((window.scrollY / max) * 100)));
    if (rail) {
      rail.style.setProperty('--sp', pct + '%');
      rail.style.setProperty('--spt', JSON.stringify(String(pct).padStart(3, '0') + '%'));
    }
    var c = 0;
    navIds.forEach(function (id, i) {
      var el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) c = i;
    });
    if (window.scrollY + window.innerHeight >= de.scrollHeight - 4) c = navIds.length - 1;
    if (c !== state.sec) setSec(c);
  }

  function onScroll() { syncTl(); syncNav(); }
  document.addEventListener('scroll', onScroll, { passive: true, capture: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  tlBtns.forEach(function (b, i) {
    b.addEventListener('click', function () {
      setActive(i);
      if (!tl || !tlSticky) return;
      var r = tl.getBoundingClientRect();
      var span = r.height - tlSticky.offsetHeight;
      window.scrollTo({ top: window.scrollY + r.top + span * (i + 0.5) / 4, behavior: 'smooth' });
    });
  });

  // cursor reticle
  pg.addEventListener('mousemove', function (e) {
    if (!cur) return;
    cur.style.setProperty('--mx', e.clientX + 'px');
    cur.style.setProperty('--my', e.clientY + 'px');
    var lat = (6.2088 + e.pageY * 0.0001).toFixed(4);
    var lon = (106.8456 + e.pageX * 0.0001).toFixed(4);
    cur.style.setProperty('--ct', JSON.stringify(lat + '° S, ' + lon + '° E'));
    cur.style.setProperty('--co', '1');
  });
  pg.addEventListener('mouseleave', function () { if (cur) cur.style.setProperty('--co', '0'); });

  // view toggle with staged transition: exit -> FLIP morph -> enter
  var busy = false, t1, t2;
  function toggle() {
    if (busy) return;
    var target = !state.clean;
    var tgt = target ? 'clean' : 'blue';
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { state.clean = target; state.touched = true; setMode(); return; }
    busy = true;
    clearTimeout(t1); clearTimeout(t2);
    state.go = tgt; state.phase = 'exit'; setMode();
    t1 = setTimeout(function () {
      var SEL = '.hl h1, .hl p, .hl .cta, .ptf, .cell, .wc, .of h3, .of p, .of ul, h2, .bt, .rn, .tgl, .tl-b, .olt, .rail';
      var vh = window.innerHeight;
      var els = Array.prototype.slice.call(pg.querySelectorAll(SEL)).filter(function (el) {
        var r = el.getBoundingClientRect();
        return r.width > 0 && r.bottom > -120 && r.top < vh + 120;
      });
      var first = els.map(function (el) { return el.getBoundingClientRect(); });
      state.clean = target; state.touched = true; state.phase = 'enter'; state.morph = true;
      setMode();
      els.forEach(function (el, i) {
        var a = first[i];
        var b = el.getBoundingClientRect();
        if (!b.width || !b.height || !el.animate) return;
        var dx = a.left - b.left, dy = a.top - b.top, sx = a.width / b.width, sy = a.height / b.height;
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1 && Math.abs(sx - 1) < 0.01 && Math.abs(sy - 1) < 0.01) return;
        el.animate([
          { transform: 'translate(' + dx + 'px, ' + dy + 'px) scale(' + sx + ', ' + sy + ')', transformOrigin: '0 0' },
          { transform: 'none', transformOrigin: '0 0' }
        ], { duration: 950, delay: (i % 4) * 70, easing: 'cubic-bezier(.6,0,.2,1)', fill: 'backwards' });
      });
      t2 = setTimeout(function () {
        busy = false;
        state.go = ''; state.phase = ''; state.morph = false;
        setMode();
      }, 2700);
    }, 550);
  }
  tgl.addEventListener('click', toggle);
})();
