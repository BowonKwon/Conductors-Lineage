/* Conductors' lineage — chart, lineage tree and source panel. Data: window.CL (assets/data.js), strings: window.CL_T. */
(function () {
  'use strict';
  var D = window.CL, T = window.CL_T, EN = document.documentElement.lang === 'en';
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var P = D.p, R = D.r;
  var state = { view: D.views[0].id, mode: 0, T: true, A: true, M: true, C: true, cond: false, cur: null, era: null };
  var LANE = ['#2f6f9f', '#b5523b', '#3f8f5a', '#8a5aa8', '#b8862b', '#2a8c8c', '#a3486f', '#5f6b7a'];

  function full(k) { var p = P[k]; return EN ? (p.e || p.k) : (p.k || p.e); }
  function sur(k) { var p = P[k]; return EN ? (p.es || p.e || p.k) : (p.ks || p.k || p.e); }
  function label(k) { return state.mode === 1 ? sur(k) : full(k); }
  function yrs(p) { return (p.b || '?') + '–' + (p.d || ''); }
  function relOk(r) {
    if (r.s === 'cf' && !state.C) return false;
    if (state.cond && !r.c) return false;
    return true;
  }
  function typeOn(r) { return r.s === 'cf' ? state.C : state[r.t]; }
  var up = function (k) { return R.filter(function (r) { return r.b === k && relOk(r); }); };
  var dn = function (k) { return R.filter(function (r) { return r.a === k && relOk(r); }); };

  /* ---------- text width ---------- */
  var ctx = null;
  function tw(s, px) {
    if (!ctx) { try { ctx = document.createElement('canvas').getContext('2d'); } catch (e) { ctx = false; } }
    if (ctx) { ctx.font = px + 'px ' + getComputedStyle(document.body).fontFamily; return ctx.measureText(s).width; }
    var w = 0; for (var i = 0; i < s.length; i++) w += s.charCodeAt(i) > 0x2e80 ? px : px * 0.56; return w;
  }

  /* ---------- timeline chart ---------- */
  var chart = $('chart'), VB = null, AX = null, MAXZOOM = 1.6;
  function drawChart() {
    if (!chart) return;
    var v = D.views.filter(function (x) { return x.id === state.view; })[0];
    var inPick = {}; v.pick.forEach(function (k) { inPick[k] = 1; });
    var gid = {}; v.lanes.forEach(function (g, i) { g.forEach(function (k) { gid[k] = i; }); });
    var X0 = 84, X1 = 1090, Y0 = 62, W = 1200;
    var ys = v.pick.map(function (k) { return P[k].b; });
    var ymin = Math.floor(Math.min.apply(null, ys) / 10) * 10, ymax = (Math.floor(Math.max.apply(null, ys) / 10) + 1) * 10;
    var xp = function (y) { return X0 + (y - ymin) / (ymax - ymin) * (X1 - X0); };
    var pos = {}, boxes = [], y = Y0;
    v.lanes.forEach(function (g, gi) {
      var rows = [], top = y;
      g.slice().sort(function (a, b) { return P[a].b - P[b].b || (a < b ? -1 : 1); }).forEach(function (k) {
        var x = xp(P[k].b), small = P[k].rt, w = tw(label(k), small ? 11 : 12.5) + 24, ri = 0;
        for (; ri < rows.length; ri++) if (x > rows[ri]) break;
        rows[ri] = x + w; pos[k] = [x, top + 30 + ri * 28];
      });
      var h = 30 + rows.length * 28 + 4; boxes.push([top, h, gi]); y = top + h + 8;
    });
    var H = y + 44, s = [];
    v.pick.forEach(function (k) { var r0 = pos[k][0] + tw(label(k), P[k].rt ? 11 : 12.5) + 30; if (r0 > W) W = Math.ceil(r0); });
    s.push('<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(T.chart_aria.replace('{n}', v.pick.length)) + '" class="v1">');
    s.push('<defs>' + ['T', 'A', 'M', 'C'].map(function (t) { return '<marker id="ar' + t + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="ah ' + t + '"/></marker>'; }).join('') + '</defs>');
    boxes.forEach(function (b) {
      var col = LANE[b[2] % LANE.length], loose = v.loose && b[2] === v.lanes.length - 1;
      s.push('<rect x="8" y="' + b[0] + '" width="' + (W - 16) + '" height="' + b[1] + '" rx="6" fill="' + col + '" class="lane"/>');
      s.push('<text x="16" y="' + (b[0] + 16) + '" class="lanelab" fill="' + col + '">' + esc(loose ? T.lane_loose : T.lane.replace('{n}', b[2] + 1)) + '</text>');
    });
    var step = (ymax - ymin) > 320 ? 50 : 20;
    for (var yr = Math.ceil(ymin / step) * step; yr <= ymax; yr += step) {
      var x = xp(yr);
      s.push('<line x1="' + x.toFixed(1) + '" y1="' + (Y0 - 8) + '" x2="' + x.toFixed(1) + '" y2="' + (H - 38) + '" class="grid"/><text x="' + x.toFixed(1) + '" y="' + (Y0 - 14) + '" class="tick" text-anchor="middle">' + yr + '</text>');
    }
    s.push('<text x="' + X0 + '" y="' + (H - 14) + '" class="axis">' + esc(T.axis) + '</text>');
    var seenCf = {};
    R.forEach(function (r) {
      if (!inPick[r.a] || !inPick[r.b]) return;
      if (r.s === 'cf') { var key = r.a + '|' + r.b; if (seenCf[key]) return; seenCf[key] = 1; }
      var a = pos[r.a], b = pos[r.b], mx = (a[0] + b[0]) / 2, bend = Math.abs(b[1] - a[1]) < 8 ? -22 : 0, t = r.s === 'cf' ? 'C' : r.t;
      s.push('<path d="M' + a[0].toFixed(1) + ',' + a[1].toFixed(1) + ' Q' + mx.toFixed(1) + ',' + ((a[1] + b[1]) / 2 + bend).toFixed(1) + ' ' + b[0].toFixed(1) + ',' + b[1].toFixed(1) +
        '" class="e ' + r.t + (t === 'C' ? ' C' : '') + (r.c ? ' cond' : '') + '" data-a="' + r.a + '" data-b="' + r.b + '" marker-end="url(#ar' + t + ')"/>');
    });
    v.pick.forEach(function (k) {
      var p = P[k], xy = pos[k], rad = p.rt ? 3 : 4.5 + Math.min(p.n, 12) * 0.5, col = LANE[gid[k] % LANE.length];
      s.push('<g class="n' + (p.rt ? ' root' : '') + '" data-k="' + k + '" tabindex="0" role="button" aria-label="' + esc(full(k)) + '"><circle cx="' + xy[0].toFixed(1) + '" cy="' + xy[1].toFixed(1) + '" r="' + rad.toFixed(1) + '" fill="' + col + '"/>' +
        '<text x="' + (xy[0] + rad + 3).toFixed(1) + '" y="' + (xy[1] + 4).toFixed(1) + '">' + esc(label(k)) + '</text></g>');
    });
    s.push('</svg>');
    chart.innerHTML = s.join('');
    VB = [0, 0, W, H]; AX = { xp: xp, ymin: ymin, ymax: ymax };
    applyFilters(); applyEra();
    if (state.cur && inPick[state.cur]) highlight(state.cur); else chart.classList.remove('dim');
    var eb = $('era'); if (eb) [].forEach.call(eb.querySelectorAll('button'), function (b) { var a = +b.dataset.a, z = +b.dataset.b; b.hidden = a !== 0 && ys.filter(function (y) { return y >= a && y <= z; }).length < 3; });  /* a period with fewer than three people of this view is not offered */
    var cnt = $('viewcount'); if (cnt) cnt.textContent = v.sum[EN ? 'en' : 'ko'];
  }
  function applyFilters() {
    if (!chart) return;
    ['T', 'A', 'M', 'C'].forEach(function (t) { chart.classList.toggle('hide' + t, !state[t]); });
    chart.classList.toggle('condonly', state.cond);
  }
  function applyEra() {
    var svg = chart && chart.querySelector('svg'); if (!svg) return;
    if (!state.era || state.era[0] === 0) { svg.setAttribute('viewBox', VB.join(' ')); svg.style.minWidth = ''; return; }
    var L = Math.max(0, AX.xp(Math.max(state.era[0], AX.ymin)) - 70), Rr = Math.min(VB[2], AX.xp(Math.min(state.era[1], AX.ymax)) + 240);
    var minW = VB[2] / MAXZOOM;  /* a narrow period is widened so that labels never grow beyond MAXZOOM times their size in the full view */
    if (Rr - L < minW) { var mid = (L + Rr) / 2; L = mid - minW / 2; Rr = mid + minW / 2; if (L < 0) { Rr -= L; L = 0; } if (Rr > VB[2]) { L = Math.max(0, L - (Rr - VB[2])); Rr = VB[2]; } }
    svg.setAttribute('viewBox', L.toFixed(1) + ' ' + VB[1] + ' ' + (Rr - L).toFixed(1) + ' ' + VB[3]);
  }
  function highlight(k) {
    if (!chart) return;
    chart.classList.add('dim');
    var nb = {}; nb[k] = 1;
    R.forEach(function (r) { if (!relOk(r) || !typeOn(r)) return; if (r.a === k) nb[r.b] = 1; if (r.b === k) nb[r.a] = 1; });
    [].forEach.call(chart.querySelectorAll('.e'), function (x) { x.classList.toggle('on', x.dataset.a === k || x.dataset.b === k); });
    [].forEach.call(chart.querySelectorAll('.n'), function (x) { x.classList.toggle('on', !!nb[x.dataset.k]); });
  }

  /* ---------- panel ---------- */
  var panel = $('panel'), tree = $('tree');
  function tag(r) { return '<span class="tag ' + r.t + '">' + T.type[r.t] + '</span>' + (r.s === 'cf' ? '<span class="tag C">' + T.conflict + '</span>' : ''); }
  function relHtml(r, o) {
    var p = P[o], subj = EN ? r.sje : r.sj, pl = EN ? (r.ple || r.pl) : r.pl, y = EN ? (r.ye || r.y) : r.y;
    var h = '<div class="rel"><a href="' + (T.find_href || '') + '#' + o + '" class="who" data-k="' + o + '">' + esc(full(o)) + '</a> <span class="yr">' + esc(yrs(p)) + '</span>' + tag(r) +
      '<div class="meta">' + (subj ? '<b>' + T.subject + '</b> ' + esc(subj) + (r.cx ? ' ' + T.ctx : '') + ' · ' : '') + esc(y || '') + (r.yu ? ' ' + T.year_unverified : '') + (pl ? (y ? ' · ' : '') + esc(pl) : '') + '</div>';
    r.src.forEach(function (sc) {
      h += '<div class="src">' + (sc.d ? '<span class="tag C deny">' + T.denies + '</span> ' : '') + (sc.q ? (sc.qk === 'p' ? '<span class="para">' + T.paraphrase + ' ' + esc(sc.q.replace(/\s*\(요지\)\s*/g, '')) + '</span>' : '<q>' + esc(sc.q) + '</q>') + '<br>' : '') +
        '<span class="cite">' + esc(sc.c) + '</span>' + (sc.u ? ' <a href="' + esc(sc.u) + '" target="_blank" rel="noopener">' + T.source_link + '</a>' : '') + '</div>';
    });
    return h + '</div>';
  }
  function marksHtml(p) {
    var h = '';
    (p.m || []).forEach(function (m) { if (T.mark[m]) h += '<p class="note mark">' + esc(T.mark[m]) + (m === 'abroad_kr' && p.ab ? ' ' + esc(T.abroad_basis.replace('{b}', EN ? (p.abe || p.ab) : p.ab)) : '') + '</p>'; });
    if (p.g === 'out') h += '<p class="note mark">' + esc(T.outside) + '</p>';
    return h;
  }
  function tenHtml(p) {
    var h = '';
    if (p.ten && p.ten.length) {
      h += '<h3>' + T.tenure_h + '</h3><ul class="ten">' + p.ten.map(function (t) {
        var o = D.orch[t[0]]; return '<li>' + esc(EN ? o[1] : o[0]) + ' ' + esc(t[1]) + '–' + esc(t[2]) + (t[3] !== 'ok' ? ' <span class="tag ' + (t[3] === 'cf' ? 'C' : 'cand') + '">' + (t[3] === 'cf' ? T.conflict : T.candidate) + '</span>' : '') + '</li>';
      }).join('') + '</ul>';
    }
    var tx = EN ? (p.te || '') : (p.tk || '');
    if (tx) h += '<p class="note"><b>' + T.career + '</b> ' + esc(tx) + '</p>';
    else if (EN && p.tk) h += '<p class="note"><b>' + T.career_ko + '</b> <span lang="ko">' + esc(p.tk) + '</span></p>';
    return h;
  }
  function showPanel(k) {
    if (!panel) return;
    var p = P[k], u = up(k), d = dn(k);
    var alt = EN ? (p.k && p.k !== p.e ? p.k : '') : (p.e && p.e !== p.k ? p.e : '');
    panel.innerHTML = '<h2>' + esc(full(k)) + (p.rr && EN ? '<span title="' + esc(T.rr_title) + '">*</span>' : '') + ' <small class="note">' + (alt ? '<span lang="' + (EN ? 'ko' : 'en') + '">' + esc(alt) + '</span> · ' : '') + esc(yrs(p)) + '</small></h2>' +
      (p.kt && !EN ? '<p class="note">' + esc(T.ko_tentative) + '</p>' : '') + (p.rr && EN ? '<p class="note">' + esc(T.rr_title) + '</p>' : '') +
      marksHtml(p) + tenHtml(p) +
      '<h3>' + T.teachers_h + ' ' + u.length + '</h3>' + (u.map(function (r) { return relHtml(r, r.a); }).join('') || '<p class="note">' + T.no_teacher + '</p>') +
      '<h3>' + T.pupils_h + ' ' + d.length + '</h3>' + (d.map(function (r) { return relHtml(r, r.b); }).join('') || '<p class="note">' + T.no_pupil + '</p>') +
      (p.q ? '<p class="note">' + T.wikidata + ' <a href="https://www.wikidata.org/wiki/' + p.q + '" target="_blank" rel="noopener">' + p.q + '</a></p>' : '') +
      (tree ? '' : '<p><a class="btn" href="' + T.find_href + '#' + k + '">' + T.to_tree + '</a></p>');
  }

  /* ---------- lineage tree ---------- */
  var mobile = function () { return window.matchMedia('(max-width:700px)').matches; };
  function gens(k, fn, side) {
    var out = [], seen = {}, fr = [k]; seen[k] = 1;
    for (var g = 1; g <= 3; g++) {
      var nx = [];
      fr.forEach(function (x) { fn(x).forEach(function (r) { var o = side < 0 ? r.a : r.b; if (!seen[o]) { seen[o] = 1; nx.push(o); out.push({ g: side * g, k: o, from: x, r: r }); } }); });
      fr = nx;
    }
    return out;
  }
  function chipCls(r) { return r.s === 'cf' ? 'C' : r.t; }
  function drawTree(k) {
    if (!tree) return;
    var p = P[k], L = gens(k, up, -1), Rt = gens(k, dn, 1), h = '<h2>' + esc(T.tree_h.replace('{name}', full(k))) + '</h2>';
    if (!L.length && !Rt.length) { tree.innerHTML = h + '<p class="note">' + T.tree_none + '</p>'; return; }
    if (mobile()) {
      h += '<div class="mt">';
      for (var g = 3; g >= 1; g--) {
        var l = L.filter(function (n) { return n.g === -g; }); if (!l.length) continue;
        h += '<div class="gen">' + T.gen_up.replace('{n}', g) + '</div><div class="row">' + l.map(function (n) { return '<button type="button" class="chip ' + chipCls(n.r) + '" data-k="' + n.k + '">' + esc(label(n.k)) + ' <small>' + (P[n.k].b || '') + ' → ' + esc(sur(n.from)) + '</small></button>'; }).join('') + '</div><div class="arrow">↓</div>';
      }
      h += '<div class="row"><span class="chip me">' + esc(full(k)) + ' <small>' + (p.b || '') + '</small></span></div>';
      for (g = 1; g <= 3; g++) {
        var d = Rt.filter(function (n) { return n.g === g; }); if (!d.length) continue;
        h += '<div class="arrow">↓</div><div class="gen">' + T.gen_dn.replace('{n}', g) + '</div><div class="row">' + d.map(function (n) { return '<button type="button" class="chip ' + chipCls(n.r) + '" data-k="' + n.k + '">' + esc(label(n.k)) + ' <small>' + esc(sur(n.from)) + ' → ' + (P[n.k].b || '') + '</small></button>'; }).join('') + '</div>';
      }
      tree.innerHTML = h + '</div><p class="note">' + T.tree_note_m + '</p>'; return;
    }
    var cols = { 0: [{ k: k }] }; L.concat(Rt).forEach(function (n) { (cols[n.g] = cols[n.g] || []).push(n); });
    var gs = Object.keys(cols).map(Number).sort(function (a, b) { return a - b; }), Wd = 176, gap = 44, rowH = 30;
    var maxN = Math.max.apply(null, gs.map(function (g) { return cols[g].length; })), Hh = maxN * rowH + 44, X = {};
    gs.forEach(function (g, i) { var n = cols[g].length, off = (maxN - n) * rowH / 2; cols[g].forEach(function (c, j) { X[c.k] = [20 + i * (Wd + gap), 38 + off + j * rowH]; }); });
    var width = 20 + gs.length * (Wd + gap), s = '<svg width="' + width + '" height="' + Hh + '" viewBox="0 0 ' + width + ' ' + Hh + '" role="img" aria-label="' + esc(T.tree_h.replace('{name}', full(k))) + '">';
    gs.forEach(function (g, i) { s += '<text x="' + (20 + i * (Wd + gap) + Wd / 2) + '" y="16" text-anchor="middle" class="tgen">' + esc(g < 0 ? T.gen_up.replace('{n}', -g) : g > 0 ? T.gen_dn.replace('{n}', g) : T.gen_me) + '</text>'; });
    L.concat(Rt).forEach(function (n) {
      var a = n.g < 0 ? X[n.k] : X[n.from], b = n.g < 0 ? X[n.from] : X[n.k];
      s += '<path class="tl ' + chipCls(n.r) + ' t' + n.r.t + '" d="M' + (a[0] + Wd) + ',' + a[1] + ' C' + (a[0] + Wd + gap / 2) + ',' + a[1] + ' ' + (b[0] - gap / 2) + ',' + b[1] + ' ' + b[0] + ',' + b[1] + '"/>';
    });
    Object.keys(X).forEach(function (kk) {
      var q = P[kk], xy = X[kk], nm = label(kk), yy = q.b ? ' ' + q.b : '';
      while (nm.length > 3 && tw(nm + yy, 12) > Wd - 12) nm = nm.slice(0, -2) + '…';
      s += '<g class="tn' + (kk === k ? ' me' : '') + (q.g === 'out' ? ' out' : '') + '" data-k="' + kk + '" tabindex="0" role="button" aria-label="' + esc(full(kk)) + '"><title>' + esc(full(kk)) + '</title><rect x="' + xy[0] + '" y="' + (xy[1] - 11) + '" width="' + Wd + '" height="22" rx="5"/><text x="' + (xy[0] + 7) + '" y="' + (xy[1] + 4) + '">' + esc(nm + yy) + '</text></g>';
    });
    tree.innerHTML = h + '<p class="note">' + T.tree_note + '</p><div class="twrap">' + s + '</svg></div>';
  }

  /* ---------- selection ---------- */
  function show(k, push) {
    if (!P[k]) return;
    state.cur = k; highlight(k); showPanel(k); drawTree(k);
    if (push !== false && history.replaceState) history.replaceState(null, '', '#' + k);
    var q = $('q'); if (q && document.activeElement !== q) q.value = full(k);
  }
  function reset() {
    state.cur = null; if (chart) chart.classList.remove('dim');
    if (panel) panel.innerHTML = '<p class="note">' + T.panel_empty + '</p>';
    if (tree) tree.innerHTML = '<h2>' + T.tree_h0 + '</h2><p class="note">' + T.tree_empty + '</p>';
  }
  function redraw() { drawChart(); if (state.cur) { showPanel(state.cur); drawTree(state.cur); } }

  /* ---------- wiring ---------- */
  document.addEventListener('click', function (ev) {
    var g = ev.target.closest('.n,.tn,a.who,.chip[data-k]');
    if (g) { if (g.tagName === 'A' && !tree && !chart) return; ev.preventDefault(); show(g.dataset.k); if (g.classList.contains('who') || g.classList.contains('chip') || g.classList.contains('tn')) { var t = tree || panel; if (g.classList.contains('who') && t) t.scrollIntoView({ block: 'nearest' }); } return; }
    if (ev.target.closest('svg.v1')) { reset(); if (history.replaceState) history.replaceState(null, '', location.pathname + location.search); }
  });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { var g = ev.target.closest && ev.target.closest('.n,.tn'); if (g) { ev.preventDefault(); show(g.dataset.k); } } });
  [].forEach.call(document.querySelectorAll('input[name=mode]'), function (r) { r.addEventListener('change', function () { state.mode = +r.value; redraw(); }); });
  ['T', 'A', 'M', 'C'].forEach(function (t) { var el = $('f' + t); if (el) el.addEventListener('change', function () { state[t] = el.checked; applyFilters(); if (state.cur) { highlight(state.cur); showPanel(state.cur); drawTree(state.cur); } }); });
  var fc = $('fCond'); if (fc) fc.addEventListener('change', function () { state.cond = fc.checked; applyFilters(); if (state.cur) { highlight(state.cur); showPanel(state.cur); drawTree(state.cur); } });
  [].forEach.call(document.querySelectorAll('#views button'), function (b) {
    b.addEventListener('click', function () {
      [].forEach.call(document.querySelectorAll('#views button'), function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      state.view = b.dataset.v; state.era = null;
      [].forEach.call(document.querySelectorAll('#era button'), function (x) { x.setAttribute('aria-pressed', x.dataset.a === '0' ? 'true' : 'false'); });
      drawChart();
    });
  });
  [].forEach.call(document.querySelectorAll('#era button'), function (b) {
    b.addEventListener('click', function () {
      [].forEach.call(document.querySelectorAll('#era button'), function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      state.era = [+b.dataset.a, +b.dataset.b]; applyEra();
    });
  });
  var q = $('q'), dl = $('names');
  if (q && dl) {
    var idx = {};
    dl.innerHTML = D.order.map(function (k) { var p = P[k], a = full(k), o = EN ? p.k : p.e, v = a + (o && o !== a ? ' (' + o + ')' : ''); idx[v] = k; idx[a] = idx[a] || k; if (o) idx[o] = idx[o] || k; return '<option value="' + esc(v) + '">'; }).join('');
    var go = function () { var k = idx[q.value.trim()]; if (k) show(k); };
    q.addEventListener('change', go); q.addEventListener('input', function () { if (idx[q.value]) go(); });
  }
  var sug = $('sug'); if (sug) sug.innerHTML = D.sug.map(function (k) { return '<button type="button" class="chip" data-k="' + k + '">' + esc(full(k)) + '</button>'; }).join('');
  window.matchMedia('(max-width:700px)').addEventListener('change', function () { if (state.cur) drawTree(state.cur); });
  window.addEventListener('hashchange', function () { var h = decodeURIComponent(location.hash.slice(1)); if (h && P[h] && h !== state.cur) show(h, false); });
  var tb = $('theme'); if (tb) tb.addEventListener('click', function () {
    var cur = document.documentElement.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'), nx = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nx); try { localStorage.setItem('cl-theme', nx); } catch (e) { }
  });
  if (D && (chart || panel || tree)) {
    drawChart(); reset();
    var h0 = decodeURIComponent(location.hash.slice(1)); if (h0 && P[h0]) show(h0, false);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ctx = null; drawChart(); });
  }
})();
