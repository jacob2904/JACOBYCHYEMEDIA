/* ===== Jacob Ychye — Media Kit interactions ===== */
(function () {
  "use strict";

  /* Nav background on scroll */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 30) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Number formatting */
  function format(n, decimals, suffix) {
    var s;
    if (decimals > 0) s = n.toFixed(decimals);
    else s = Math.round(n).toLocaleString("en-US");
    return s + (suffix || "");
  }

  /* Count-up animation */
  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1500;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      // easeOutExpo
      var e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = format(target * e, decimals, suffix);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = format(target, decimals, suffix);
    }
    requestAnimationFrame(step);
  }

  /* Donut chart */
  function drawDonut(card) {
    var r = 52;
    var C = 2 * Math.PI * r;
    var segs = card.querySelectorAll(".donut-seg");
    segs.forEach(function (seg) {
      var pct = parseFloat(seg.getAttribute("data-pct"));
      var offsetPct = parseFloat(seg.getAttribute("data-offset") || "0");
      var dash = (pct / 100) * C;
      // start animation from 0 then grow
      seg.style.strokeDashoffset = -((offsetPct / 100) * C);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          seg.style.strokeDasharray = dash + " " + (C - dash);
        });
      });
    });
  }

  /* Fill bars / split / vbars when a section reveals */
  function fillCharts(scope) {
    scope.querySelectorAll(".bar-fill").forEach(function (b) {
      var val = parseFloat(b.getAttribute("data-val"));
      var max = parseFloat(b.getAttribute("data-max"));
      requestAnimationFrame(function () { b.style.width = (val / max) * 100 + "%"; });
    });
    scope.querySelectorAll(".vbar-fill").forEach(function (b) {
      var val = parseFloat(b.getAttribute("data-val"));
      var max = parseFloat(b.getAttribute("data-max"));
      requestAnimationFrame(function () { b.style.height = (val / max) * 100 + "%"; });
    });
    scope.querySelectorAll(".split-bar").forEach(function (sb) {
      var fill = sb.getAttribute("data-fill");
      var span = sb.querySelector(".split-fill");
      if (span) requestAnimationFrame(function () { span.style.width = fill + "%"; });
    });
  }

  /* Reveal on scroll via IntersectionObserver */
  var revealed = new WeakSet();
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting || revealed.has(entry.target)) return;
      revealed.add(entry.target);
      entry.target.classList.add("in");

      // count-ups inside (and the element itself)
      var nums = entry.target.querySelectorAll("[data-count]");
      nums.forEach(countUp);
      if (entry.target.hasAttribute("data-count")) countUp(entry.target);

      if (entry.target.classList.contains("donut-card")) drawDonut(entry.target);
      fillCharts(entry.target);
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });

  document.querySelectorAll(".reveal").forEach(function (el, i) {
    // light stagger inside grids
    var parent = el.parentElement;
    if (parent && /glance-grid|reach-grid|eng-grid|pillar-grid|partner-grid|hero-stats/.test(parent.className)) {
      var sibs = Array.prototype.indexOf.call(parent.children, el);
      el.style.transitionDelay = (sibs % 6) * 0.08 + "s";
    }
    io.observe(el);
  });

  /* Hero counters fire immediately (above the fold) */
  document.querySelectorAll(".hero [data-count]").forEach(function (el) {
    // handled by observer too, but ensure visible ones run
  });
})();
