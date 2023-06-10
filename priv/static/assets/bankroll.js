function I() {
}
const nn = (n) => n;
function fe(n, e) {
  for (const t in e)
    n[t] = e[t];
  return n;
}
function kn(n) {
  return !!n && (typeof n == "object" || typeof n == "function") && typeof n.then == "function";
}
function ln(n) {
  return n();
}
function gt() {
  return /* @__PURE__ */ Object.create(null);
}
function Se(n) {
  n.forEach(ln);
}
function Re(n) {
  return typeof n == "function";
}
function ce(n, e) {
  return n != n ? e == e : n !== e || n && typeof n == "object" || typeof n == "function";
}
function yn(n) {
  return Object.keys(n).length === 0;
}
function wn(n, ...e) {
  if (n == null)
    return I;
  const t = n.subscribe(...e);
  return t.unsubscribe ? () => t.unsubscribe() : t;
}
function ut(n, e, t) {
  n.$$.on_destroy.push(wn(e, t));
}
function Ve(n, e, t, l) {
  if (n) {
    const r = rn(n, e, t, l);
    return n[0](r);
  }
}
function rn(n, e, t, l) {
  return n[1] && l ? fe(t.ctx.slice(), n[1](l(e))) : t.ctx;
}
function Ze(n, e, t, l) {
  if (n[2] && l) {
    const r = n[2](l(t));
    if (e.dirty === void 0)
      return r;
    if (typeof r == "object") {
      const s = [], i = Math.max(e.dirty.length, r.length);
      for (let u = 0; u < i; u += 1)
        s[u] = e.dirty[u] | r[u];
      return s;
    }
    return e.dirty | r;
  }
  return e.dirty;
}
function Qe(n, e, t, l, r, s) {
  if (r) {
    const i = rn(e, t, l, s);
    n.p(i, r);
  }
}
function Ke(n) {
  if (n.ctx.length > 32) {
    const e = [], t = n.ctx.length / 32;
    for (let l = 0; l < t; l++)
      e[l] = -1;
    return e;
  }
  return -1;
}
function he(n) {
  const e = {};
  for (const t in n)
    t[0] !== "$" && (e[t] = n[t]);
  return e;
}
function He(n, e, t) {
  return n.set(t), e;
}
function Mn(n) {
  return n && Re(n.destroy) ? n.destroy : I;
}
const sn = typeof window < "u";
let Sn = sn ? () => window.performance.now() : () => Date.now(), ft = sn ? (n) => requestAnimationFrame(n) : I;
const Ae = /* @__PURE__ */ new Set();
function on(n) {
  Ae.forEach((e) => {
    e.c(n) || (Ae.delete(e), e.f());
  }), Ae.size !== 0 && ft(on);
}
function Cn(n) {
  let e;
  return Ae.size === 0 && ft(on), {
    promise: new Promise((t) => {
      Ae.add(e = { c: n, f: t });
    }),
    abort() {
      Ae.delete(e);
    }
  };
}
function _(n, e) {
  n.appendChild(e);
}
function un(n) {
  if (!n)
    return document;
  const e = n.getRootNode ? n.getRootNode() : n.ownerDocument;
  return e && e.host ? e : n.ownerDocument;
}
function En(n) {
  const e = v("style");
  return Yn(un(n), e), e.sheet;
}
function Yn(n, e) {
  return _(n.head || n, e), e.sheet;
}
function C(n, e, t) {
  n.insertBefore(e, t || null);
}
function M(n) {
  n.parentNode && n.parentNode.removeChild(n);
}
function Xe(n, e) {
  for (let t = 0; t < n.length; t += 1)
    n[t] && n[t].d(e);
}
function v(n) {
  return document.createElement(n);
}
function we(n) {
  return document.createElementNS("http://www.w3.org/2000/svg", n);
}
function z(n) {
  return document.createTextNode(n);
}
function N() {
  return z(" ");
}
function be() {
  return z("");
}
function Ee(n, e, t, l) {
  return n.addEventListener(e, t, l), () => n.removeEventListener(e, t, l);
}
function Dn(n) {
  return function(e) {
    return e.preventDefault(), n.call(this, e);
  };
}
function g(n, e, t) {
  t == null ? n.removeAttribute(e) : n.getAttribute(e) !== t && n.setAttribute(e, t);
}
function bt(n, e) {
  const t = Object.getOwnPropertyDescriptors(n.__proto__);
  for (const l in e)
    e[l] == null ? n.removeAttribute(l) : l === "style" ? n.style.cssText = e[l] : l === "__value" ? n.value = n[l] = e[l] : t[l] && t[l].set ? n[l] = e[l] : g(n, l, e[l]);
}
function Ne(n, e) {
  for (const t in e)
    g(n, t, e[t]);
}
function Tn(n) {
  let e;
  return {
    /* push */
    p(...t) {
      e = t, e.forEach((l) => n.push(l));
    },
    /* remove */
    r() {
      e.forEach((t) => n.splice(n.indexOf(t), 1));
    }
  };
}
function jn(n) {
  return Array.from(n.childNodes);
}
function Q(n, e) {
  e = "" + e, n.data !== e && (n.data = e);
}
function ue(n, e, t) {
  n.classList[t ? "add" : "remove"](e);
}
function fn(n, e, { bubbles: t = !1, cancelable: l = !1 } = {}) {
  const r = document.createEvent("CustomEvent");
  return r.initCustomEvent(n, t, l, e), r;
}
const Je = /* @__PURE__ */ new Map();
let Ge = 0;
function On(n) {
  let e = 5381, t = n.length;
  for (; t--; )
    e = (e << 5) - e ^ n.charCodeAt(t);
  return e >>> 0;
}
function An(n, e) {
  const t = { stylesheet: En(e), rules: {} };
  return Je.set(n, t), t;
}
function $t(n, e, t, l, r, s, i, u = 0) {
  const o = 16.666 / l;
  let f = `{
`;
  for (let b = 0; b <= 1; b += o) {
    const Y = e + (t - e) * s(b);
    f += b * 100 + `%{${i(Y, 1 - Y)}}
`;
  }
  const a = f + `100% {${i(t, 1 - t)}}
}`, c = `__svelte_${On(a)}_${u}`, h = un(n), { stylesheet: d, rules: m } = Je.get(h) || An(h, n);
  m[c] || (m[c] = !0, d.insertRule(`@keyframes ${c} ${a}`, d.cssRules.length));
  const p = n.style.animation || "";
  return n.style.animation = `${p ? `${p}, ` : ""}${c} ${l}ms linear ${r}ms 1 both`, Ge += 1, c;
}
function Ln(n, e) {
  const t = (n.style.animation || "").split(", "), l = t.filter(
    e ? (s) => s.indexOf(e) < 0 : (s) => s.indexOf("__svelte") === -1
    // remove all Svelte animations
  ), r = t.length - l.length;
  r && (n.style.animation = l.join(", "), Ge -= r, Ge || Nn());
}
function Nn() {
  ft(() => {
    Ge || (Je.forEach((n) => {
      const { ownerNode: e } = n.stylesheet;
      e && M(e);
    }), Je.clear());
  });
}
let Ie;
function ke(n) {
  Ie = n;
}
function ct() {
  if (!Ie)
    throw new Error("Function called outside component initialization");
  return Ie;
}
function cn(n) {
  ct().$$.on_mount.push(n);
}
function at() {
  const n = ct();
  return (e, t, { cancelable: l = !1 } = {}) => {
    const r = n.$$.callbacks[e];
    if (r) {
      const s = fn(e, t, { cancelable: l });
      return r.slice().forEach((i) => {
        i.call(n, s);
      }), !s.defaultPrevented;
    }
    return !0;
  };
}
function an(n, e) {
  const t = n.$$.callbacks[e.type];
  t && t.slice().forEach((l) => l.call(this, e));
}
const je = [], rt = [];
let Le = [];
const st = [], zn = /* @__PURE__ */ Promise.resolve();
let it = !1;
function Pn() {
  it || (it = !0, zn.then(dt));
}
function ze(n) {
  Le.push(n);
}
function Hn(n) {
  st.push(n);
}
const et = /* @__PURE__ */ new Set();
let De = 0;
function dt() {
  if (De !== 0)
    return;
  const n = Ie;
  do {
    try {
      for (; De < je.length; ) {
        const e = je[De];
        De++, ke(e), Bn(e.$$);
      }
    } catch (e) {
      throw je.length = 0, De = 0, e;
    }
    for (ke(null), je.length = 0, De = 0; rt.length; )
      rt.pop()();
    for (let e = 0; e < Le.length; e += 1) {
      const t = Le[e];
      et.has(t) || (et.add(t), t());
    }
    Le.length = 0;
  } while (je.length);
  for (; st.length; )
    st.pop()();
  it = !1, et.clear(), ke(n);
}
function Bn(n) {
  if (n.fragment !== null) {
    n.update(), Se(n.before_update);
    const e = n.dirty;
    n.dirty = [-1], n.fragment && n.fragment.p(n.ctx, e), n.after_update.forEach(ze);
  }
}
function In(n) {
  const e = [], t = [];
  Le.forEach((l) => n.indexOf(l) === -1 ? e.push(l) : t.push(l)), t.forEach((l) => l()), Le = e;
}
let Be;
function Rn() {
  return Be || (Be = Promise.resolve(), Be.then(() => {
    Be = null;
  })), Be;
}
function tt(n, e, t) {
  n.dispatchEvent(fn(`${e ? "intro" : "outro"}${t}`));
}
const Fe = /* @__PURE__ */ new Set();
let ye;
function ne() {
  ye = {
    r: 0,
    c: [],
    p: ye
    // parent group
  };
}
function le() {
  ye.r || Se(ye.c), ye = ye.p;
}
function y(n, e) {
  n && n.i && (Fe.delete(n), n.i(e));
}
function S(n, e, t, l) {
  if (n && n.o) {
    if (Fe.has(n))
      return;
    Fe.add(n), ye.c.push(() => {
      Fe.delete(n), l && (t && n.d(1), l());
    }), n.o(e);
  } else
    l && l();
}
const Un = { duration: 0 };
function We(n, e, t, l) {
  const r = { direction: "both" };
  let s = e(n, t, r), i = l ? 0 : 1, u = null, o = null, f = null;
  function a() {
    f && Ln(n, f);
  }
  function c(d, m) {
    const p = d.b - i;
    return m *= Math.abs(p), {
      a: i,
      b: d.b,
      d: p,
      duration: m,
      start: d.start,
      end: d.start + m,
      group: d.group
    };
  }
  function h(d) {
    const { delay: m = 0, duration: p = 300, easing: b = nn, tick: Y = I, css: W } = s || Un, T = {
      start: Sn() + m,
      b: d
    };
    d || (T.group = ye, ye.r += 1), u || o ? o = T : (W && (a(), f = $t(n, i, d, p, m, b, W)), d && Y(0, 1), u = c(T, p), ze(() => tt(n, d, "start")), Cn((E) => {
      if (o && E > o.start && (u = c(o, p), o = null, tt(n, u.b, "start"), W && (a(), f = $t(n, i, u.b, u.duration, 0, b, s.css))), u) {
        if (E >= u.end)
          Y(i = u.b, 1 - i), tt(n, u.b, "end"), o || (u.b ? a() : --u.group.r || Se(u.group.c)), u = null;
        else if (E >= u.start) {
          const H = E - u.start;
          i = u.a + u.d * b(H / u.duration), Y(i, 1 - i);
        }
      }
      return !!(u || o);
    }));
  }
  return {
    run(d) {
      Re(s) ? Rn().then(() => {
        s = s(r), h(d);
      }) : h(d);
    },
    end() {
      a(), u = o = null;
    }
  };
}
function vt(n, e) {
  const t = e.token = {};
  function l(r, s, i, u) {
    if (e.token !== t)
      return;
    e.resolved = u;
    let o = e.ctx;
    i !== void 0 && (o = o.slice(), o[i] = u);
    const f = r && (e.current = r)(o);
    let a = !1;
    e.block && (e.blocks ? e.blocks.forEach((c, h) => {
      h !== s && c && (ne(), S(c, 1, 1, () => {
        e.blocks[h] === c && (e.blocks[h] = null);
      }), le());
    }) : e.block.d(1), f.c(), y(f, 1), f.m(e.mount(), e.anchor), a = !0), e.block = f, e.blocks && (e.blocks[s] = f), a && dt();
  }
  if (kn(n)) {
    const r = ct();
    if (n.then((s) => {
      ke(r), l(e.then, 1, e.value, s), ke(null);
    }, (s) => {
      if (ke(r), l(e.catch, 2, e.error, s), ke(null), !e.hasCatch)
        throw s;
    }), e.current !== e.pending)
      return l(e.pending, 0), !0;
  } else {
    if (e.current !== e.then)
      return l(e.then, 1, e.value, n), !0;
    e.resolved = n;
  }
}
function qn(n, e, t) {
  const l = e.slice(), { resolved: r } = n;
  n.current === n.then && (l[n.value] = r), n.current === n.catch && (l[n.error] = r), n.block.p(l, t);
}
function xe(n, e) {
  const t = {}, l = {}, r = { $$scope: 1 };
  let s = n.length;
  for (; s--; ) {
    const i = n[s], u = e[s];
    if (u) {
      for (const o in i)
        o in u || (l[o] = 1);
      for (const o in u)
        r[o] || (t[o] = u[o], r[o] = 1);
      n[s] = u;
    } else
      for (const o in i)
        r[o] = 1;
  }
  for (const i in l)
    i in t || (t[i] = void 0);
  return t;
}
function Wn(n, e, t) {
  const l = n.$$.props[e];
  l !== void 0 && (n.$$.bound[l] = t, t(n.$$.ctx[l]));
}
function G(n) {
  n && n.c();
}
function F(n, e, t, l) {
  const { fragment: r, after_update: s } = n.$$;
  r && r.m(e, t), l || ze(() => {
    const i = n.$$.on_mount.map(ln).filter(Re);
    n.$$.on_destroy ? n.$$.on_destroy.push(...i) : Se(i), n.$$.on_mount = [];
  }), s.forEach(ze);
}
function J(n, e) {
  const t = n.$$;
  t.fragment !== null && (In(t.after_update), Se(t.on_destroy), t.fragment && t.fragment.d(e), t.on_destroy = t.fragment = null, t.ctx = []);
}
function Fn(n, e) {
  n.$$.dirty[0] === -1 && (je.push(n), Pn(), n.$$.dirty.fill(0)), n.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function de(n, e, t, l, r, s, i, u = [-1]) {
  const o = Ie;
  ke(n);
  const f = n.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: s,
    update: I,
    not_equal: r,
    bound: gt(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (o ? o.$$.context : [])),
    // everything else
    callbacks: gt(),
    dirty: u,
    skip_bound: !1,
    root: e.target || o.$$.root
  };
  i && i(f.root);
  let a = !1;
  if (f.ctx = t ? t(n, e.props || {}, (c, h, ...d) => {
    const m = d.length ? d[0] : h;
    return f.ctx && r(f.ctx[c], f.ctx[c] = m) && (!f.skip_bound && f.bound[c] && f.bound[c](m), a && Fn(n, c)), h;
  }) : [], f.update(), a = !0, Se(f.before_update), f.fragment = l ? l(f.ctx) : !1, e.target) {
    if (e.hydrate) {
      const c = jn(e.target);
      f.fragment && f.fragment.l(c), c.forEach(M);
    } else
      f.fragment && f.fragment.c();
    e.intro && y(n.$$.fragment), F(n, e.target, e.anchor, e.customElement), dt();
  }
  ke(o);
}
class _e {
  $destroy() {
    J(this, 1), this.$destroy = I;
  }
  $on(e, t) {
    if (!Re(t))
      return I;
    const l = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return l.push(t), () => {
      const r = l.indexOf(t);
      r !== -1 && l.splice(r, 1);
    };
  }
  $set(e) {
    this.$$set && !yn(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
}
const Jn = "application/json", dn = "Content-Type", nt = Symbol();
function kt(n = {}) {
  var e;
  return (e = Object.entries(n).find(([t]) => t.toLowerCase() === dn.toLowerCase())) === null || e === void 0 ? void 0 : e[1];
}
function yt(n) {
  return /^application\/.*json.*/.test(n);
}
const Ce = function(n, e, t = !1) {
  return Object.entries(e).reduce((l, [r, s]) => {
    const i = n[r];
    return Array.isArray(i) && Array.isArray(s) ? l[r] = t ? [...i, ...s] : s : typeof i == "object" && typeof s == "object" ? l[r] = Ce(i, s, t) : l[r] = s, l;
  }, { ...n });
}, Pe = {
  // Default options
  options: {},
  // Error type
  errorType: "text",
  // Polyfills
  polyfills: {
    // fetch: null,
    // FormData: null,
    // URLSearchParams: null,
    // performance: null,
    // PerformanceObserver: null,
    // AbortController: null
  },
  polyfill(n, e = !0, t = !1, ...l) {
    const r = this.polyfills[n] || (typeof self < "u" ? self[n] : null) || (typeof global < "u" ? global[n] : null);
    if (e && !r)
      throw new Error(n + " is not defined");
    return t && r ? new r(...l) : r;
  }
};
function Gn(n, e = !1) {
  Pe.options = e ? n : Ce(Pe.options, n);
}
function Vn(n, e = !1) {
  Pe.polyfills = e ? n : Ce(Pe.polyfills, n);
}
function Zn(n) {
  Pe.errorType = n;
}
const Qn = (n) => (e) => n.reduceRight((t, l) => l(t), e) || e;
class _n extends Error {
}
const Kn = (n) => {
  const e = /* @__PURE__ */ Object.create(null);
  n = n._addons.reduce((T, E) => E.beforeRequest && E.beforeRequest(T, n._options, e) || T, n);
  const { _url: t, _options: l, _config: r, _catchers: s, _resolvers: i, _middlewares: u, _addons: o } = n, f = new Map(s), a = Ce(r.options, l);
  let c = t;
  const h = Qn(u)((T, E) => (c = T, r.polyfill("fetch")(T, E)))(t, a), d = new Error(), m = h.catch((T) => {
    throw { __wrap: T };
  }).then((T) => {
    if (!T.ok) {
      const E = new _n();
      if (E.cause = d, E.stack = E.stack + `
CAUSE: ` + d.stack, E.response = T, E.url = c, T.type === "opaque")
        throw E;
      return T.text().then((H) => {
        var P;
        if (E.message = H, r.errorType === "json" || ((P = T.headers.get("Content-Type")) === null || P === void 0 ? void 0 : P.split(";")[0]) === "application/json")
          try {
            E.json = JSON.parse(H);
          } catch {
          }
        throw E.text = H, E.status = T.status, E;
      });
    }
    return T;
  }), p = (T) => T.catch((E) => {
    const H = E.__wrap || E, P = H.status && f.get(H.status) || f.get(H.name) || E.__wrap && f.has(nt) && f.get(nt);
    if (P)
      return P(H, n);
    throw H;
  }), b = (T) => (E) => /* If a callback is provided, then callback with the body result otherwise return the parsed body itself. */ p(T ? m.then((H) => H && H[T]()).then((H) => E ? E(H) : H) : m.then((H) => E ? E(H) : H)), Y = {
    _wretchReq: n,
    _fetchReq: h,
    _sharedState: e,
    res: b(null),
    json: b("json"),
    blob: b("blob"),
    formData: b("formData"),
    arrayBuffer: b("arrayBuffer"),
    text: b("text"),
    error(T, E) {
      return f.set(T, E), this;
    },
    badRequest(T) {
      return this.error(400, T);
    },
    unauthorized(T) {
      return this.error(401, T);
    },
    forbidden(T) {
      return this.error(403, T);
    },
    notFound(T) {
      return this.error(404, T);
    },
    timeout(T) {
      return this.error(408, T);
    },
    internalError(T) {
      return this.error(500, T);
    },
    fetchError(T) {
      return this.error(nt, T);
    }
  }, W = o.reduce((T, E) => ({
    ...T,
    ...E.resolver
  }), Y);
  return i.reduce((T, E) => E(T, n), W);
}, Xn = {
  _url: "",
  _options: {},
  _config: Pe,
  _catchers: /* @__PURE__ */ new Map(),
  _resolvers: [],
  _deferred: [],
  _middlewares: [],
  _addons: [],
  addon(n) {
    return { ...this, _addons: [...this._addons, n], ...n.wretch };
  },
  errorType(n) {
    return {
      ...this,
      _config: {
        ...this._config,
        errorType: n
      }
    };
  },
  polyfills(n, e = !1) {
    return {
      ...this,
      _config: {
        ...this._config,
        polyfills: e ? n : Ce(this._config.polyfills, n)
      }
    };
  },
  url(n, e = !1) {
    if (e)
      return { ...this, _url: n };
    const t = this._url.split("?");
    return {
      ...this,
      _url: t.length > 1 ? t[0] + n + "?" + t[1] : this._url + n
    };
  },
  options(n, e = !1) {
    return { ...this, _options: e ? n : Ce(this._options, n) };
  },
  headers(n) {
    return { ...this, _options: Ce(this._options, { headers: n || {} }) };
  },
  accept(n) {
    return this.headers({ Accept: n });
  },
  content(n) {
    return this.headers({ [dn]: n });
  },
  auth(n) {
    return this.headers({ Authorization: n });
  },
  catcher(n, e) {
    const t = new Map(this._catchers);
    return t.set(n, e), { ...this, _catchers: t };
  },
  resolve(n, e = !1) {
    return { ...this, _resolvers: e ? [n] : [...this._resolvers, n] };
  },
  defer(n, e = !1) {
    return {
      ...this,
      _deferred: e ? [n] : [...this._deferred, n]
    };
  },
  middlewares(n, e = !1) {
    return {
      ...this,
      _middlewares: e ? n : [...this._middlewares, ...n]
    };
  },
  fetch(n = this._options.method, e = "", t = null) {
    let l = this.url(e).options({ method: n });
    const r = kt(l._options.headers), s = typeof t == "object" && (!l._options.headers || !r || yt(r));
    return l = t ? s ? l.json(t, r) : l.body(t) : l, Kn(l._deferred.reduce((i, u) => u(i, i._url, i._options), l));
  },
  get(n = "") {
    return this.fetch("GET", n);
  },
  delete(n = "") {
    return this.fetch("DELETE", n);
  },
  put(n, e = "") {
    return this.fetch("PUT", e, n);
  },
  post(n, e = "") {
    return this.fetch("POST", e, n);
  },
  patch(n, e = "") {
    return this.fetch("PATCH", e, n);
  },
  head(n = "") {
    return this.fetch("HEAD", n);
  },
  opts(n = "") {
    return this.fetch("OPTIONS", n);
  },
  body(n) {
    return { ...this, _options: { ...this._options, body: n } };
  },
  json(n, e) {
    const t = kt(this._options.headers);
    return this.content(e || yt(t) && t || Jn).body(JSON.stringify(n));
  }
};
function Ye(n = "", e = {}) {
  return { ...Xn, _url: n, _options: e };
}
Ye.default = Ye;
Ye.options = Gn;
Ye.errorType = Zn;
Ye.polyfills = Vn;
Ye.WretchError = _n;
const xn = document.getElementById("__bankroll-app"), el = JSON.parse(xn.dataset.props), mn = new URL(el.base_url);
mn.search = "";
const ve = Ye(mn.toString(), { mode: "cors" }).headers({
  "x-csrf-token": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
});
function tl() {
  return ve.url("/props").get().json();
}
function nl(n) {
  return ve.url("/subscriptions").post({ price_id: n }).json();
}
function ll(n) {
  let e, t, l, r;
  return {
    c() {
      e = we("svg"), t = we("circle"), l = we("path"), g(t, "class", "opacity-25"), g(t, "cx", "12"), g(t, "cy", "12"), g(t, "r", "10"), g(t, "stroke", "currentColor"), g(t, "stroke-width", "4"), g(l, "class", "opacity-75"), g(l, "fill", "currentColor"), g(l, "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"), g(e, "class", r = `animate-spin text-white ${/*$$props*/
      n[0].class}`), g(e, "xmlns", "http://www.w3.org/2000/svg"), g(e, "fill", "none"), g(e, "viewBox", "0 0 24 24");
    },
    m(s, i) {
      C(s, e, i), _(e, t), _(e, l);
    },
    p(s, [i]) {
      i & /*$$props*/
      1 && r !== (r = `animate-spin text-white ${/*$$props*/
      s[0].class}`) && g(e, "class", r);
    },
    i: I,
    o: I,
    d(s) {
      s && M(e);
    }
  };
}
function rl(n, e, t) {
  return n.$$set = (l) => {
    t(0, e = fe(fe({}, e), he(l)));
  }, e = he(e), [e];
}
class sl extends _e {
  constructor(e) {
    super(), de(this, e, rl, ll, ce, {});
  }
}
function wt(n) {
  let e, t;
  return e = new sl({ props: { class: "w-4 h-4 mr-2" } }), {
    c() {
      G(e.$$.fragment);
    },
    m(l, r) {
      F(e, l, r), t = !0;
    },
    i(l) {
      t || (y(e.$$.fragment, l), t = !0);
    },
    o(l) {
      S(e.$$.fragment, l), t = !1;
    },
    d(l) {
      J(e, l);
    }
  };
}
function il(n) {
  let e, t, l, r, s, i, u, o = (
    /*loading*/
    n[0] && wt()
  );
  const f = (
    /*#slots*/
    n[5].default
  ), a = Ve(
    f,
    n,
    /*$$scope*/
    n[4],
    null
  );
  let c = [
    /*$$props*/
    n[3],
    {
      disabled: l = /*$$props*/
      n[3].disabled || /*loading*/
      n[0]
    },
    {
      class: r = `inline-flex items-center rounded-md px-2.5 py-1.5 text-sm disabled:bg-opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${/*classMap*/
      n[2][
        /*variant*/
        n[1]
      ]} ${/*$$props*/
      n[3].class}`
    }
  ], h = {};
  for (let d = 0; d < c.length; d += 1)
    h = fe(h, c[d]);
  return {
    c() {
      e = v("button"), o && o.c(), t = N(), a && a.c(), bt(e, h);
    },
    m(d, m) {
      C(d, e, m), o && o.m(e, null), _(e, t), a && a.m(e, null), e.autofocus && e.focus(), s = !0, i || (u = Ee(
        e,
        "click",
        /*click_handler*/
        n[6]
      ), i = !0);
    },
    p(d, [m]) {
      /*loading*/
      d[0] ? o ? m & /*loading*/
      1 && y(o, 1) : (o = wt(), o.c(), y(o, 1), o.m(e, t)) : o && (ne(), S(o, 1, 1, () => {
        o = null;
      }), le()), a && a.p && (!s || m & /*$$scope*/
      16) && Qe(
        a,
        f,
        d,
        /*$$scope*/
        d[4],
        s ? Ze(
          f,
          /*$$scope*/
          d[4],
          m,
          null
        ) : Ke(
          /*$$scope*/
          d[4]
        ),
        null
      ), bt(e, h = xe(c, [
        m & /*$$props*/
        8 && /*$$props*/
        d[3],
        (!s || m & /*$$props, loading*/
        9 && l !== (l = /*$$props*/
        d[3].disabled || /*loading*/
        d[0])) && { disabled: l },
        (!s || m & /*variant, $$props*/
        10 && r !== (r = `inline-flex items-center rounded-md px-2.5 py-1.5 text-sm disabled:bg-opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${/*classMap*/
        d[2][
          /*variant*/
          d[1]
        ]} ${/*$$props*/
        d[3].class}`)) && { class: r }
      ]));
    },
    i(d) {
      s || (y(o), y(a, d), s = !0);
    },
    o(d) {
      S(o), S(a, d), s = !1;
    },
    d(d) {
      d && M(e), o && o.d(), a && a.d(d), i = !1, u();
    }
  };
}
function ol(n, e, t) {
  let { $$slots: l = {}, $$scope: r } = e, { loading: s = !1 } = e, { variant: i = "default" } = e;
  const u = {
    default: "shadow-sm bg-black text-white hover:bg-gray-800 focus-visible:outline-gray-600",
    danger: "shadow-sm bg-red-600 text-white hover:bg-red-500",
    "danger-ghost": "text-red-500 hover:bg-red-200 focus-visible:outline-red-100",
    "info-ghost": "text-blue-500 hover:bg-blue-200 focus-visible:outline-blue-100",
    basic: "shadow-sm bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
  };
  function o(f) {
    an.call(this, n, f);
  }
  return n.$$set = (f) => {
    t(3, e = fe(fe({}, e), he(f))), "loading" in f && t(0, s = f.loading), "variant" in f && t(1, i = f.variant), "$$scope" in f && t(4, r = f.$$scope);
  }, e = he(e), [s, i, u, e, r, l, o];
}
class me extends _e {
  constructor(e) {
    super(), de(this, e, ol, il, ce, { loading: 0, variant: 1 });
  }
}
const Te = [];
function ul(n, e = I) {
  let t;
  const l = /* @__PURE__ */ new Set();
  function r(u) {
    if (ce(n, u) && (n = u, t)) {
      const o = !Te.length;
      for (const f of l)
        f[1](), Te.push(f, n);
      if (o) {
        for (let f = 0; f < Te.length; f += 2)
          Te[f][0](Te[f + 1]);
        Te.length = 0;
      }
    }
  }
  function s(u) {
    r(u(n));
  }
  function i(u, o = I) {
    const f = [u, o];
    return l.add(f), l.size === 1 && (t = e(r) || I), u(n), () => {
      l.delete(f), l.size === 0 && t && (t(), t = null);
    };
  }
  return { set: r, update: s, subscribe: i };
}
let Me = ul({
  subscription: null,
  payment_method: null,
  grace_period: !1,
  canceled: !1,
  recurring: !1,
  plans: [],
  base_url: "",
  finalize_url: "",
  on_trial: !1,
  trial_ends_at: null,
  fix_subscription_url: "",
  customer_id: "",
  customer_type: "",
  current_user_id: null,
  customer_display_name: "",
  company_display_name: "",
  ended: !1
});
function fl(n) {
  const e = n - 1;
  return e * e * e + 1;
}
function Mt(n, { delay: e = 0, duration: t = 400, easing: l = nn } = {}) {
  const r = +getComputedStyle(n).opacity;
  return {
    delay: e,
    duration: t,
    easing: l,
    css: (s) => `opacity: ${s * r}`
  };
}
function St(n, { delay: e = 0, duration: t = 400, easing: l = fl, start: r = 0, opacity: s = 0 } = {}) {
  const i = getComputedStyle(n), u = +i.opacity, o = i.transform === "none" ? "" : i.transform, f = 1 - r, a = u * (1 - s);
  return {
    delay: e,
    duration: t,
    easing: l,
    css: (c, h) => `
			transform: ${o} scale(${1 - f * h});
			opacity: ${u - a * h}
		`
  };
}
function Ct(n) {
  let e, t, l, r, s, i, u, o, f, a, c, h;
  const d = (
    /*#slots*/
    n[5].default
  ), m = Ve(
    d,
    n,
    /*$$scope*/
    n[4],
    null
  );
  return {
    c() {
      e = v("div"), t = v("div"), r = N(), s = v("div"), i = v("div"), u = v("div"), m && m.c(), g(t, "class", "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"), g(u, "class", o = `relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full ${/*sizeMap*/
      n[2][
        /*size*/
        n[1]
      ]} sm:p-6`), g(i, "class", "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"), g(s, "class", "fixed inset-0 z-10 overflow-y-auto"), g(e, "class", "relative z-10"), g(e, "aria-labelledby", "modal-title"), g(e, "role", "dialog"), g(e, "aria-modal", "true");
    },
    m(p, b) {
      C(p, e, b), _(e, t), _(e, r), _(e, s), _(s, i), _(i, u), m && m.m(u, null), a = !0, c || (h = [
        Ee(u, "click", al),
        Ee(
          i,
          "click",
          /*click_handler_1*/
          n[6]
        )
      ], c = !0);
    },
    p(p, b) {
      m && m.p && (!a || b & /*$$scope*/
      16) && Qe(
        m,
        d,
        p,
        /*$$scope*/
        p[4],
        a ? Ze(
          d,
          /*$$scope*/
          p[4],
          b,
          null
        ) : Ke(
          /*$$scope*/
          p[4]
        ),
        null
      ), (!a || b & /*size*/
      2 && o !== (o = `relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full ${/*sizeMap*/
      p[2][
        /*size*/
        p[1]
      ]} sm:p-6`)) && g(u, "class", o);
    },
    i(p) {
      a || (ze(() => {
        a && (l || (l = We(t, Mt, { duration: 250 }, !0)), l.run(1));
      }), y(m, p), ze(() => {
        a && (f || (f = We(u, St, { duration: 250 }, !0)), f.run(1));
      }), a = !0);
    },
    o(p) {
      l || (l = We(t, Mt, { duration: 250 }, !1)), l.run(0), S(m, p), f || (f = We(u, St, { duration: 250 }, !1)), f.run(0), a = !1;
    },
    d(p) {
      p && M(e), p && l && l.end(), m && m.d(p), p && f && f.end(), c = !1, Se(h);
    }
  };
}
function cl(n) {
  let e, t, l = (
    /*visible*/
    n[0] && Ct(n)
  );
  return {
    c() {
      l && l.c(), e = be();
    },
    m(r, s) {
      l && l.m(r, s), C(r, e, s), t = !0;
    },
    p(r, [s]) {
      /*visible*/
      r[0] ? l ? (l.p(r, s), s & /*visible*/
      1 && y(l, 1)) : (l = Ct(r), l.c(), y(l, 1), l.m(e.parentNode, e)) : l && (ne(), S(l, 1, 1, () => {
        l = null;
      }), le());
    },
    i(r) {
      t || (y(l), t = !0);
    },
    o(r) {
      S(l), t = !1;
    },
    d(r) {
      l && l.d(r), r && M(e);
    }
  };
}
const al = (n) => n.stopPropagation();
function dl(n, e, t) {
  let { $$slots: l = {}, $$scope: r } = e, { visible: s } = e, { size: i = "lg" } = e, u = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
    "3xl": "sm:max-w-3xl",
    "4xl": "sm:max-w-4xl"
  };
  const o = at(), f = () => o("close");
  return n.$$set = (a) => {
    "visible" in a && t(0, s = a.visible), "size" in a && t(1, i = a.size), "$$scope" in a && t(4, r = a.$$scope);
  }, [s, i, u, o, r, l, f];
}
class _t extends _e {
  constructor(e) {
    super(), de(this, e, dl, cl, ce, { visible: 0, size: 1 });
  }
}
let pn = null;
function _l(n) {
  pn = window.Stripe(n);
}
function hn() {
  return pn;
}
async function gn(n) {
  const e = await nl(n.priceId);
  if ("message" in e && n.onErrorMessage(e.message), "client_secret" in e) {
    const l = await hn().handleNextAction({
      clientSecret: e.client_secret
    });
    n.onNextAction(l);
  }
  "props" in e && n.onSuccess(e);
}
function ml(n) {
  let e, t, l, r, s, i, u, o, f, a = (
    /*setupError*/
    n[2] && Et(n)
  );
  return i = new me({
    props: {
      type: "submit",
      disabled: (
        /*paymentStatus*/
        n[3] === /*PaymentStatus*/
        n[0].Submitting
      ),
      class: "w-full justify-center",
      $$slots: { default: [gl] },
      $$scope: { ctx: n }
    }
  }), {
    c() {
      e = v("form"), t = v("div"), l = N(), a && a.c(), r = N(), s = v("div"), G(i.$$.fragment), g(t, "id", "stripe-payment-form"), g(s, "class", "mt-4");
    },
    m(c, h) {
      C(c, e, h), _(e, t), _(e, l), a && a.m(e, null), _(e, r), _(e, s), F(i, s, null), u = !0, o || (f = [
        Mn(
          /*setupStripeElement*/
          n[4].call(null, t)
        ),
        Ee(e, "submit", Dn(
          /*submitPaymentMethod*/
          n[5]
        ))
      ], o = !0);
    },
    p(c, h) {
      /*setupError*/
      c[2] ? a ? a.p(c, h) : (a = Et(c), a.c(), a.m(e, r)) : a && (a.d(1), a = null);
      const d = {};
      h & /*paymentStatus, PaymentStatus*/
      9 && (d.disabled = /*paymentStatus*/
      c[3] === /*PaymentStatus*/
      c[0].Submitting), h & /*$$scope*/
      4096 && (d.$$scope = { dirty: h, ctx: c }), i.$set(d);
    },
    i(c) {
      u || (y(i.$$.fragment, c), u = !0);
    },
    o(c) {
      S(i.$$.fragment, c), u = !1;
    },
    d(c) {
      c && M(e), a && a.d(), J(i), o = !1, Se(f);
    }
  };
}
function pl(n) {
  let e;
  return {
    c() {
      e = v("p"), e.textContent = "Success!";
    },
    m(t, l) {
      C(t, e, l);
    },
    p: I,
    i: I,
    o: I,
    d(t) {
      t && M(e);
    }
  };
}
function hl(n) {
  let e;
  return {
    c() {
      e = v("p"), e.textContent = "Loading...";
    },
    m(t, l) {
      C(t, e, l);
    },
    p: I,
    i: I,
    o: I,
    d(t) {
      t && M(e);
    }
  };
}
function Et(n) {
  let e, t;
  return {
    c() {
      e = v("p"), t = z(
        /*setupError*/
        n[2]
      ), g(e, "class", "text-red-600 mt-2");
    },
    m(l, r) {
      C(l, e, r), _(e, t);
    },
    p(l, r) {
      r & /*setupError*/
      4 && Q(
        t,
        /*setupError*/
        l[2]
      );
    },
    d(l) {
      l && M(e);
    }
  };
}
function gl(n) {
  let e;
  return {
    c() {
      e = z("Save");
    },
    m(t, l) {
      C(t, e, l);
    },
    d(t) {
      t && M(e);
    }
  };
}
function bl(n) {
  let e, t, l, r;
  const s = [hl, pl, ml], i = [];
  function u(o, f) {
    return (
      /*paymentStatus*/
      o[3] === /*PaymentStatus*/
      o[0].GettingClientSecret ? 0 : (
        /*paymentStatus*/
        o[3] === /*PaymentStatus*/
        o[0].Success ? 1 : (
          /*clientSecret*/
          o[1] ? 2 : -1
        )
      )
    );
  }
  return ~(e = u(n)) && (t = i[e] = s[e](n)), {
    c() {
      t && t.c(), l = be();
    },
    m(o, f) {
      ~e && i[e].m(o, f), C(o, l, f), r = !0;
    },
    p(o, [f]) {
      let a = e;
      e = u(o), e === a ? ~e && i[e].p(o, f) : (t && (ne(), S(i[a], 1, 1, () => {
        i[a] = null;
      }), le()), ~e ? (t = i[e], t ? t.p(o, f) : (t = i[e] = s[e](o), t.c()), y(t, 1), t.m(l.parentNode, l)) : t = null);
    },
    i(o) {
      r || (y(t), r = !0);
    },
    o(o) {
      S(t), r = !1;
    },
    d(o) {
      ~e && i[e].d(o), o && M(l);
    }
  };
}
function $l(n, e, t) {
  let l;
  ut(n, Me, (p) => t(9, l = p));
  let { onSuccess: r } = e, { returnUrl: s = l.finalize_url } = e;
  var i;
  (function(p) {
    p[p.GettingClientSecret = 0] = "GettingClientSecret", p[p.EnteringCardInfo = 1] = "EnteringCardInfo", p[p.Submitting = 2] = "Submitting", p[p.Success = 3] = "Success", p[p.Error = 4] = "Error";
  })(i || (i = {}));
  const u = hn();
  let o = null, f, a = "", c = i.GettingClientSecret;
  cn(async () => {
    t(3, c = i.GettingClientSecret), await h(), t(3, c = i.EnteringCardInfo);
  });
  async function h() {
    const p = await ve.url("/setup-payment").post().json();
    t(1, o = p.client_secret);
  }
  function d(p) {
    f = u.elements({ clientSecret: o }), f.create("payment").mount(`#${p.id}`);
  }
  async function m() {
    t(3, c = i.Submitting);
    const { error: p, setupIntent: b } = await u.confirmSetup({
      elements: f,
      redirect: "if_required",
      confirmParams: { return_url: s }
    });
    if (p) {
      t(3, c = i.Error), t(2, a = p.message);
      return;
    }
    if (!b) {
      t(3, c = i.Error), t(2, a = "Something went wrong. Please try again.");
      return;
    }
    const Y = await ve.url("/payment-method").post({
      payment_method_id: b.payment_method
    }).json();
    r(Y), t(3, c = i.Success);
  }
  return n.$$set = (p) => {
    "onSuccess" in p && t(6, r = p.onSuccess), "returnUrl" in p && t(7, s = p.returnUrl);
  }, [
    i,
    o,
    a,
    c,
    d,
    m,
    r,
    s
  ];
}
class vl extends _e {
  constructor(e) {
    super(), de(this, e, $l, bl, ce, { onSuccess: 6, returnUrl: 7 });
  }
}
function kl(n) {
  let e, t, l;
  const r = (
    /*#slots*/
    n[4].default
  ), s = Ve(
    r,
    n,
    /*$$scope*/
    n[3],
    null
  );
  return {
    c() {
      e = v("span"), s && s.c(), g(e, "class", t = `inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${/*classMap*/
      n[1][
        /*variant*/
        n[0]
      ]} ${/*$$props*/
      n[2].class}`);
    },
    m(i, u) {
      C(i, e, u), s && s.m(e, null), l = !0;
    },
    p(i, [u]) {
      s && s.p && (!l || u & /*$$scope*/
      8) && Qe(
        s,
        r,
        i,
        /*$$scope*/
        i[3],
        l ? Ze(
          r,
          /*$$scope*/
          i[3],
          u,
          null
        ) : Ke(
          /*$$scope*/
          i[3]
        ),
        null
      ), (!l || u & /*variant, $$props*/
      5 && t !== (t = `inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${/*classMap*/
      i[1][
        /*variant*/
        i[0]
      ]} ${/*$$props*/
      i[2].class}`)) && g(e, "class", t);
    },
    i(i) {
      l || (y(s, i), l = !0);
    },
    o(i) {
      S(s, i), l = !1;
    },
    d(i) {
      i && M(e), s && s.d(i);
    }
  };
}
function yl(n, e, t) {
  let { $$slots: l = {}, $$scope: r } = e, { variant: s = "default" } = e;
  const i = {
    default: "bg-gray-50 text-gray-600 ring-gray-500/10",
    danger: "bg-red-50 text-red-700 ring-red-600/10",
    warning: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
    info: "bg-blue-50 text-blue-700 ring-blue-700/10",
    success: "bg-green-50 text-green-700 ring-green-600/20"
  };
  return n.$$set = (u) => {
    t(2, e = fe(fe({}, e), he(u))), "variant" in u && t(0, s = u.variant), "$$scope" in u && t(3, r = u.$$scope);
  }, e = he(e), [s, i, e, r, l];
}
class Ue extends _e {
  constructor(e) {
    super(), de(this, e, yl, kl, ce, { variant: 0 });
  }
}
function Yt(n, e, t) {
  const l = n.slice();
  return l[13] = e[t], l;
}
function wl(n) {
  let e, t;
  return {
    c() {
      e = v("p"), t = z(
        /*setupError*/
        n[4]
      );
    },
    m(l, r) {
      C(l, e, r), _(e, t);
    },
    p(l, r) {
      r & /*setupError*/
      16 && Q(
        t,
        /*setupError*/
        l[4]
      );
    },
    i: I,
    o: I,
    d(l) {
      l && M(e);
    }
  };
}
function Ml(n) {
  let e;
  return {
    c() {
      e = v("p"), e.textContent = "Processing subscription...";
    },
    m(t, l) {
      C(t, e, l);
    },
    p: I,
    i: I,
    o: I,
    d(t) {
      t && M(e);
    }
  };
}
function Sl(n) {
  let e, t, l, r, s;
  l = new vl({
    props: {
      returnUrl: (
        /*returnUrl*/
        n[7]
      ),
      onSuccess: (
        /*onPaymentSuccess*/
        n[8]
      )
    }
  });
  let i = (
    /*plan*/
    n[2] && Dt(n)
  );
  return {
    c() {
      e = v("div"), t = v("div"), G(l.$$.fragment), r = N(), i && i.c(), g(t, "class", "flex-1"), g(e, "class", "flex flex-col sm:flex-row");
    },
    m(u, o) {
      C(u, e, o), _(e, t), F(l, t, null), _(e, r), i && i.m(e, null), s = !0;
    },
    p(u, o) {
      /*plan*/
      u[2] ? i ? (i.p(u, o), o & /*plan*/
      4 && y(i, 1)) : (i = Dt(u), i.c(), y(i, 1), i.m(e, null)) : i && (ne(), S(i, 1, 1, () => {
        i = null;
      }), le());
    },
    i(u) {
      s || (y(l.$$.fragment, u), y(i), s = !0);
    },
    o(u) {
      S(l.$$.fragment, u), S(i), s = !1;
    },
    d(u) {
      u && M(e), J(l), i && i.d();
    }
  };
}
function Cl(n) {
  let e, t, l, r, s, i, u, o, f, a, c, h;
  function d(b, Y) {
    return (
      /*priceId*/
      b[1] ? jl : Tl
    );
  }
  let m = d(n), p = m(n);
  return c = new me({
    props: {
      class: "w-full justify-center",
      $$slots: { default: [Ol] },
      $$scope: { ctx: n }
    }
  }), c.$on(
    "click",
    /*onFinish*/
    n[9]
  ), {
    c() {
      e = v("div"), t = v("div"), t.innerHTML = '<svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path></svg>', l = N(), r = v("div"), s = v("h3"), s.textContent = "Success", i = N(), u = v("div"), o = v("p"), p.c(), f = N(), a = v("div"), G(c.$$.fragment), g(t, "class", "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"), g(s, "class", "text-base font-semibold leading-6 text-gray-900"), g(s, "id", "modal-title"), g(o, "class", "text-sm text-gray-500"), g(u, "class", "mt-2"), g(r, "class", "mt-3 text-center sm:mt-5"), g(a, "class", "mt-5 sm:mt-6");
    },
    m(b, Y) {
      C(b, e, Y), _(e, t), _(e, l), _(e, r), _(r, s), _(r, i), _(r, u), _(u, o), p.m(o, null), C(b, f, Y), C(b, a, Y), F(c, a, null), h = !0;
    },
    p(b, Y) {
      m !== (m = d(b)) && (p.d(1), p = m(b), p && (p.c(), p.m(o, null)));
      const W = {};
      Y & /*$$scope*/
      65536 && (W.$$scope = { dirty: Y, ctx: b }), c.$set(W);
    },
    i(b) {
      h || (y(c.$$.fragment, b), h = !0);
    },
    o(b) {
      S(c.$$.fragment, b), h = !1;
    },
    d(b) {
      b && M(e), p.d(), b && M(f), b && M(a), J(c);
    }
  };
}
function Dt(n) {
  let e, t, l, r, s, i = (
    /*plan*/
    n[2].description + ""
  ), u, o, f;
  function a(p, b) {
    var Y;
    return (
      /*plan*/
      ((Y = p[2].prices.monthly) == null ? void 0 : Y.id) == /*priceId*/
      p[1] ? Yl : El
    );
  }
  let c = a(n), h = c(n), d = (
    /*plan*/
    n[2].trial_days && !/*$props*/
    n[6].subscription && Tt(n)
  ), m = (
    /*plan*/
    n[2].features.length && jt(n)
  );
  return {
    c() {
      e = v("div"), t = v("h2"), h.c(), l = N(), d && d.c(), r = N(), s = v("p"), u = z(i), o = N(), m && m.c(), g(t, "class", "text-2xl font-semibold"), g(s, "class", "text-gray-600 text-sm"), g(e, "class", "sm:w-[40%] space-y-2 mt-4 sm:mt-0 sm:ml-4 py-2 px-4 rounded-lg bg-gray-100");
    },
    m(p, b) {
      C(p, e, b), _(e, t), h.m(t, null), _(e, l), d && d.m(e, null), _(e, r), _(e, s), _(s, u), _(e, o), m && m.m(e, null), f = !0;
    },
    p(p, b) {
      c === (c = a(p)) && h ? h.p(p, b) : (h.d(1), h = c(p), h && (h.c(), h.m(t, null))), /*plan*/
      p[2].trial_days && !/*$props*/
      p[6].subscription ? d ? (d.p(p, b), b & /*plan, $props*/
      68 && y(d, 1)) : (d = Tt(p), d.c(), y(d, 1), d.m(e, r)) : d && (ne(), S(d, 1, 1, () => {
        d = null;
      }), le()), (!f || b & /*plan*/
      4) && i !== (i = /*plan*/
      p[2].description + "") && Q(u, i), /*plan*/
      p[2].features.length ? m ? m.p(p, b) : (m = jt(p), m.c(), m.m(e, null)) : m && (m.d(1), m = null);
    },
    i(p) {
      f || (y(d), f = !0);
    },
    o(p) {
      S(d), f = !1;
    },
    d(p) {
      p && M(e), h.d(), d && d.d(), m && m.d();
    }
  };
}
function El(n) {
  let e = (
    /*plan*/
    n[2].title + ""
  ), t, l, r = (
    /*plan*/
    n[2].prices.yearly.price + ""
  ), s, i;
  return {
    c() {
      t = z(e), l = z(" @ "), s = z(r), i = z("/year");
    },
    m(u, o) {
      C(u, t, o), C(u, l, o), C(u, s, o), C(u, i, o);
    },
    p(u, o) {
      o & /*plan*/
      4 && e !== (e = /*plan*/
      u[2].title + "") && Q(t, e), o & /*plan*/
      4 && r !== (r = /*plan*/
      u[2].prices.yearly.price + "") && Q(s, r);
    },
    d(u) {
      u && M(t), u && M(l), u && M(s), u && M(i);
    }
  };
}
function Yl(n) {
  let e = (
    /*plan*/
    n[2].title + ""
  ), t, l, r = (
    /*plan*/
    n[2].prices.monthly.price + ""
  ), s, i;
  return {
    c() {
      t = z(e), l = z(" @ "), s = z(r), i = z("/month");
    },
    m(u, o) {
      C(u, t, o), C(u, l, o), C(u, s, o), C(u, i, o);
    },
    p(u, o) {
      o & /*plan*/
      4 && e !== (e = /*plan*/
      u[2].title + "") && Q(t, e), o & /*plan*/
      4 && r !== (r = /*plan*/
      u[2].prices.monthly.price + "") && Q(s, r);
    },
    d(u) {
      u && M(t), u && M(l), u && M(s), u && M(i);
    }
  };
}
function Tt(n) {
  let e, t;
  return e = new Ue({
    props: {
      variant: "success",
      $$slots: { default: [Dl] },
      $$scope: { ctx: n }
    }
  }), {
    c() {
      G(e.$$.fragment);
    },
    m(l, r) {
      F(e, l, r), t = !0;
    },
    p(l, r) {
      const s = {};
      r & /*$$scope, plan*/
      65540 && (s.$$scope = { dirty: r, ctx: l }), e.$set(s);
    },
    i(l) {
      t || (y(e.$$.fragment, l), t = !0);
    },
    o(l) {
      S(e.$$.fragment, l), t = !1;
    },
    d(l) {
      J(e, l);
    }
  };
}
function Dl(n) {
  let e = (
    /*plan*/
    n[2].trial_days + ""
  ), t, l;
  return {
    c() {
      t = z(e), l = z(" day trial");
    },
    m(r, s) {
      C(r, t, s), C(r, l, s);
    },
    p(r, s) {
      s & /*plan*/
      4 && e !== (e = /*plan*/
      r[2].trial_days + "") && Q(t, e);
    },
    d(r) {
      r && M(t), r && M(l);
    }
  };
}
function jt(n) {
  let e, t = (
    /*plan*/
    n[2].features
  ), l = [];
  for (let r = 0; r < t.length; r += 1)
    l[r] = Ot(Yt(n, t, r));
  return {
    c() {
      e = v("ul");
      for (let r = 0; r < l.length; r += 1)
        l[r].c();
      g(e, "class", "text-gray-600 text-sm list-inside list-disc");
    },
    m(r, s) {
      C(r, e, s);
      for (let i = 0; i < l.length; i += 1)
        l[i] && l[i].m(e, null);
    },
    p(r, s) {
      if (s & /*plan*/
      4) {
        t = /*plan*/
        r[2].features;
        let i;
        for (i = 0; i < t.length; i += 1) {
          const u = Yt(r, t, i);
          l[i] ? l[i].p(u, s) : (l[i] = Ot(u), l[i].c(), l[i].m(e, null));
        }
        for (; i < l.length; i += 1)
          l[i].d(1);
        l.length = t.length;
      }
    },
    d(r) {
      r && M(e), Xe(l, r);
    }
  };
}
function Ot(n) {
  let e, t = (
    /*feature*/
    n[13] + ""
  ), l;
  return {
    c() {
      e = v("li"), l = z(t);
    },
    m(r, s) {
      C(r, e, s), _(e, l);
    },
    p(r, s) {
      s & /*plan*/
      4 && t !== (t = /*feature*/
      r[13] + "") && Q(l, t);
    },
    d(r) {
      r && M(e);
    }
  };
}
function Tl(n) {
  let e;
  return {
    c() {
      e = z("Your Payment information was set up successfully.");
    },
    m(t, l) {
      C(t, e, l);
    },
    d(t) {
      t && M(e);
    }
  };
}
function jl(n) {
  let e;
  return {
    c() {
      e = z(`Your payment information and subscription were set up
              successfully.`);
    },
    m(t, l) {
      C(t, e, l);
    },
    d(t) {
      t && M(e);
    }
  };
}
function Ol(n) {
  let e;
  return {
    c() {
      e = z("Finish");
    },
    m(t, l) {
      C(t, e, l);
    },
    d(t) {
      t && M(e);
    }
  };
}
function Al(n) {
  let e, t, l, r;
  const s = [Cl, Sl, Ml, wl], i = [];
  function u(o, f) {
    return (
      /*paymentStatus*/
      o[5] === /*PaymentStatus*/
      o[3].Success ? 0 : (
        /*paymentStatus*/
        o[5] === /*PaymentStatus*/
        o[3].EnterPaymentInfo ? 1 : (
          /*paymentStatus*/
          o[5] === /*PaymentStatus*/
          o[3].SubmittingSubscription ? 2 : (
            /*paymentStatus*/
            o[5] === /*PaymentStatus*/
            o[3].Error ? 3 : -1
          )
        )
      )
    );
  }
  return ~(e = u(n)) && (t = i[e] = s[e](n)), {
    c() {
      t && t.c(), l = be();
    },
    m(o, f) {
      ~e && i[e].m(o, f), C(o, l, f), r = !0;
    },
    p(o, f) {
      let a = e;
      e = u(o), e === a ? ~e && i[e].p(o, f) : (t && (ne(), S(i[a], 1, 1, () => {
        i[a] = null;
      }), le()), ~e ? (t = i[e], t ? t.p(o, f) : (t = i[e] = s[e](o), t.c()), y(t, 1), t.m(l.parentNode, l)) : t = null);
    },
    i(o) {
      r || (y(t), r = !0);
    },
    o(o) {
      S(t), r = !1;
    },
    d(o) {
      ~e && i[e].d(o), o && M(l);
    }
  };
}
function Ll(n) {
  let e, t;
  return e = new _t({
    props: {
      visible: (
        /*visible*/
        n[0]
      ),
      size: (
        /*priceId*/
        n[1] ? "2xl" : "lg"
      ),
      $$slots: { default: [Al] },
      $$scope: { ctx: n }
    }
  }), e.$on(
    "close",
    /*onFinish*/
    n[9]
  ), {
    c() {
      G(e.$$.fragment);
    },
    m(l, r) {
      F(e, l, r), t = !0;
    },
    p(l, [r]) {
      const s = {};
      r & /*visible*/
      1 && (s.visible = /*visible*/
      l[0]), r & /*priceId*/
      2 && (s.size = /*priceId*/
      l[1] ? "2xl" : "lg"), r & /*$$scope, priceId, paymentStatus, PaymentStatus, plan, $props, setupError*/
      65662 && (s.$$scope = { dirty: r, ctx: l }), e.$set(s);
    },
    i(l) {
      t || (y(e.$$.fragment, l), t = !0);
    },
    o(l) {
      S(e.$$.fragment, l), t = !1;
    },
    d(l) {
      J(e, l);
    }
  };
}
function Nl(n, e, t) {
  let l;
  ut(n, Me, (b) => t(6, l = b));
  let { visible: r } = e, { priceId: s = null } = e, { plan: i = null } = e, { onSuccess: u } = e;
  const o = at();
  var f;
  (function(b) {
    b[b.EnterPaymentInfo = 0] = "EnterPaymentInfo", b[b.SubmittingSubscription = 1] = "SubmittingSubscription", b[b.Success = 2] = "Success", b[b.Error = 3] = "Error";
  })(f || (f = {}));
  let a = "", c = f.EnterPaymentInfo, h = d();
  function d() {
    const b = new URL(l.finalize_url);
    return s && b.searchParams.set("price_id", s), b.toString();
  }
  async function m() {
    if (!s) {
      u(await tl()), t(5, c = f.Success);
      return;
    }
    t(5, c = f.SubmittingSubscription), await gn({
      priceId: s,
      onErrorMessage(b) {
        t(5, c = f.Error), t(4, a = b);
      },
      onNextAction({ error: b, paymentIntent: Y }) {
        b ? (t(5, c = f.Error), t(4, a = "Payment method could not be added. Please try a different payment method.")) : (Y == null ? void 0 : Y.status) == "succeeded" ? t(5, c = f.Success) : (Y == null ? void 0 : Y.status) == "processing";
      },
      onSuccess(b) {
        u({ props: b.props }), t(5, c = f.Success);
      }
    });
  }
  function p() {
    o("close");
  }
  return n.$$set = (b) => {
    "visible" in b && t(0, r = b.visible), "priceId" in b && t(1, s = b.priceId), "plan" in b && t(2, i = b.plan), "onSuccess" in b && t(10, u = b.onSuccess);
  }, n.$$.update = () => {
    n.$$.dirty & /*visible, PaymentStatus*/
    9 && (r || (t(5, c = f.EnterPaymentInfo), t(4, a = "")));
  }, [
    r,
    s,
    i,
    f,
    a,
    c,
    l,
    h,
    m,
    p,
    u
  ];
}
class zl extends _e {
  constructor(e) {
    super(), de(this, e, Nl, Ll, ce, {
      visible: 0,
      priceId: 1,
      plan: 2,
      onSuccess: 10
    });
  }
}
function Pl(n) {
  let e, t, l, r, s, i, u, o, f, a, c;
  return {
    c() {
      e = v("button"), t = v("span"), t.textContent = "Use setting", l = N(), r = v("span"), s = N(), i = v("span"), u = N(), o = v("span"), g(t, "class", "sr-only"), g(r, "aria-hidden", "true"), g(r, "class", "pointer-events-none absolute h-full w-full rounded-md bg-white"), g(i, "aria-hidden", "true"), g(i, "class", "pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out"), ue(
        i,
        "bg-black",
        /*enabled*/
        n[0]
      ), ue(i, "bg-gray-200", !/*enabled*/
      n[0]), g(o, "aria-hidden", "true"), g(o, "class", "translate-x-0 pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"), ue(
        o,
        "translate-x-5",
        /*enabled*/
        n[0]
      ), ue(o, "translate-x-0", !/*enabled*/
      n[0]), g(e, "type", "button"), g(e, "class", "group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"), g(e, "role", "switch"), g(e, "aria-checked", f = /*enabled*/
      n[0] ? "true" : "false");
    },
    m(h, d) {
      C(h, e, d), _(e, t), _(e, l), _(e, r), _(e, s), _(e, i), _(e, u), _(e, o), a || (c = Ee(
        e,
        "click",
        /*onClick*/
        n[1]
      ), a = !0);
    },
    p(h, [d]) {
      d & /*enabled*/
      1 && ue(
        i,
        "bg-black",
        /*enabled*/
        h[0]
      ), d & /*enabled*/
      1 && ue(i, "bg-gray-200", !/*enabled*/
      h[0]), d & /*enabled*/
      1 && ue(
        o,
        "translate-x-5",
        /*enabled*/
        h[0]
      ), d & /*enabled*/
      1 && ue(o, "translate-x-0", !/*enabled*/
      h[0]), d & /*enabled*/
      1 && f !== (f = /*enabled*/
      h[0] ? "true" : "false") && g(e, "aria-checked", f);
    },
    i: I,
    o: I,
    d(h) {
      h && M(e), a = !1, c();
    }
  };
}
function Hl(n, e, t) {
  let { enabled: l = !1 } = e, { onChange: r = null } = e;
  function s() {
    t(0, l = !l), r == null || r(l);
  }
  return n.$$set = (i) => {
    "enabled" in i && t(0, l = i.enabled), "onChange" in i && t(2, r = i.onChange);
  }, [l, s, r];
}
class Bl extends _e {
  constructor(e) {
    super(), de(this, e, Hl, Pl, ce, { enabled: 0, onChange: 2 });
  }
}
var tn;
(tn = document.querySelector('meta[name="csrf-token"]')) == null || tn.getAttribute("content");
function At(n) {
  let e, t;
  return {
    c() {
      e = v("h3"), t = z(
        /*title*/
        n[0]
      ), g(e, "class", "text-base font-semibold leading-6 text-gray-900");
    },
    m(l, r) {
      C(l, e, r), _(e, t);
    },
    p(l, r) {
      r & /*title*/
      1 && Q(
        t,
        /*title*/
        l[0]
      );
    },
    d(l) {
      l && M(e);
    }
  };
}
function Il(n) {
  let e, t, l, r = (
    /*title*/
    n[0] && At(n)
  );
  const s = (
    /*#slots*/
    n[2].default
  ), i = Ve(
    s,
    n,
    /*$$scope*/
    n[1],
    null
  );
  return {
    c() {
      e = v("div"), r && r.c(), t = N(), i && i.c(), g(e, "class", "bg-white shadow border border-gray-200 rounded-lg p-4 space-y-2");
    },
    m(u, o) {
      C(u, e, o), r && r.m(e, null), _(e, t), i && i.m(e, null), l = !0;
    },
    p(u, [o]) {
      /*title*/
      u[0] ? r ? r.p(u, o) : (r = At(u), r.c(), r.m(e, t)) : r && (r.d(1), r = null), i && i.p && (!l || o & /*$$scope*/
      2) && Qe(
        i,
        s,
        u,
        /*$$scope*/
        u[1],
        l ? Ze(
          s,
          /*$$scope*/
          u[1],
          o,
          null
        ) : Ke(
          /*$$scope*/
          u[1]
        ),
        null
      );
    },
    i(u) {
      l || (y(i, u), l = !0);
    },
    o(u) {
      S(i, u), l = !1;
    },
    d(u) {
      u && M(e), r && r.d(), i && i.d(u);
    }
  };
}
function Rl(n, e, t) {
  let { $$slots: l = {}, $$scope: r } = e, { title: s = "" } = e;
  return n.$$set = (i) => {
    "title" in i && t(0, s = i.title), "$$scope" in i && t(1, r = i.$$scope);
  }, [s, r, l];
}
class lt extends _e {
  constructor(e) {
    super(), de(this, e, Rl, Il, ce, { title: 0 });
  }
}
function Ul(n) {
  let e, t, l = [
    { xmlns: "http://www.w3.org/2000/svg" },
    { fill: "none" },
    { viewBox: "0 0 24 24" },
    { "stroke-width": "1.5" },
    { stroke: "currentColor" },
    /*$$props*/
    n[0]
  ], r = {};
  for (let s = 0; s < l.length; s += 1)
    r = fe(r, l[s]);
  return {
    c() {
      e = we("svg"), t = we("path"), g(t, "stroke-linecap", "round"), g(t, "stroke-linejoin", "round"), g(t, "d", "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"), Ne(e, r);
    },
    m(s, i) {
      C(s, e, i), _(e, t);
    },
    p(s, [i]) {
      Ne(e, r = xe(l, [
        { xmlns: "http://www.w3.org/2000/svg" },
        { fill: "none" },
        { viewBox: "0 0 24 24" },
        { "stroke-width": "1.5" },
        { stroke: "currentColor" },
        i & /*$$props*/
        1 && /*$$props*/
        s[0]
      ]));
    },
    i: I,
    o: I,
    d(s) {
      s && M(e);
    }
  };
}
function ql(n, e, t) {
  return n.$$set = (l) => {
    t(0, e = fe(fe({}, e), he(l)));
  }, e = he(e), [e];
}
class bn extends _e {
  constructor(e) {
    super(), de(this, e, ql, Ul, ce, {});
  }
}
var Wl = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, ot = {}, Fl = {
  get exports() {
    return ot;
  },
  set exports(n) {
    ot = n;
  }
};
(function(n, e) {
  (function(t, l) {
    n.exports = l();
  })(Wl, function() {
    var t = 1e3, l = 6e4, r = 36e5, s = "millisecond", i = "second", u = "minute", o = "hour", f = "day", a = "week", c = "month", h = "quarter", d = "year", m = "date", p = "Invalid Date", b = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, Y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, W = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(A) {
      var w = ["th", "st", "nd", "rd"], k = A % 100;
      return "[" + A + (w[(k - 20) % 10] || w[k] || w[0]) + "]";
    } }, T = function(A, w, k) {
      var L = String(A);
      return !L || L.length >= w ? A : "" + Array(w + 1 - L.length).join(k) + A;
    }, E = { s: T, z: function(A) {
      var w = -A.utcOffset(), k = Math.abs(w), L = Math.floor(k / 60), $ = k % 60;
      return (w <= 0 ? "+" : "-") + T(L, 2, "0") + ":" + T($, 2, "0");
    }, m: function A(w, k) {
      if (w.date() < k.date())
        return -A(k, w);
      var L = 12 * (k.year() - w.year()) + (k.month() - w.month()), $ = w.clone().add(L, c), D = k - $ < 0, q = w.clone().add(L + (D ? -1 : 1), c);
      return +(-(L + (k - $) / (D ? $ - q : q - $)) || 0);
    }, a: function(A) {
      return A < 0 ? Math.ceil(A) || 0 : Math.floor(A);
    }, p: function(A) {
      return { M: c, y: d, w: a, d: f, D: m, h: o, m: u, s: i, ms: s, Q: h }[A] || String(A || "").toLowerCase().replace(/s$/, "");
    }, u: function(A) {
      return A === void 0;
    } }, H = "en", P = {};
    P[H] = W;
    var V = function(A) {
      return A instanceof x;
    }, te = function A(w, k, L) {
      var $;
      if (!w)
        return H;
      if (typeof w == "string") {
        var D = w.toLowerCase();
        P[D] && ($ = D), k && (P[D] = k, $ = D);
        var q = w.split("-");
        if (!$ && q.length > 1)
          return A(q[0]);
      } else {
        var U = w.name;
        P[U] = w, $ = U;
      }
      return !L && $ && (H = $), $ || !L && H;
    }, R = function(A, w) {
      if (V(A))
        return A.clone();
      var k = typeof w == "object" ? w : {};
      return k.date = A, k.args = arguments, new x(k);
    }, B = E;
    B.l = te, B.i = V, B.w = function(A, w) {
      return R(A, { locale: w.$L, utc: w.$u, x: w.$x, $offset: w.$offset });
    };
    var x = function() {
      function A(k) {
        this.$L = te(k.locale, null, !0), this.parse(k);
      }
      var w = A.prototype;
      return w.parse = function(k) {
        this.$d = function(L) {
          var $ = L.date, D = L.utc;
          if ($ === null)
            return /* @__PURE__ */ new Date(NaN);
          if (B.u($))
            return /* @__PURE__ */ new Date();
          if ($ instanceof Date)
            return new Date($);
          if (typeof $ == "string" && !/Z$/i.test($)) {
            var q = $.match(b);
            if (q) {
              var U = q[2] - 1 || 0, ee = (q[7] || "0").substring(0, 3);
              return D ? new Date(Date.UTC(q[1], U, q[3] || 1, q[4] || 0, q[5] || 0, q[6] || 0, ee)) : new Date(q[1], U, q[3] || 1, q[4] || 0, q[5] || 0, q[6] || 0, ee);
            }
          }
          return new Date($);
        }(k), this.$x = k.x || {}, this.init();
      }, w.init = function() {
        var k = this.$d;
        this.$y = k.getFullYear(), this.$M = k.getMonth(), this.$D = k.getDate(), this.$W = k.getDay(), this.$H = k.getHours(), this.$m = k.getMinutes(), this.$s = k.getSeconds(), this.$ms = k.getMilliseconds();
      }, w.$utils = function() {
        return B;
      }, w.isValid = function() {
        return this.$d.toString() !== p;
      }, w.isSame = function(k, L) {
        var $ = R(k);
        return this.startOf(L) <= $ && $ <= this.endOf(L);
      }, w.isAfter = function(k, L) {
        return R(k) < this.startOf(L);
      }, w.isBefore = function(k, L) {
        return this.endOf(L) < R(k);
      }, w.$g = function(k, L, $) {
        return B.u(k) ? this[L] : this.set($, k);
      }, w.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, w.valueOf = function() {
        return this.$d.getTime();
      }, w.startOf = function(k, L) {
        var $ = this, D = !!B.u(L) || L, q = B.p(k), U = function($e, j) {
          var X = B.w($.$u ? Date.UTC($.$y, j, $e) : new Date($.$y, j, $e), $);
          return D ? X : X.endOf(f);
        }, ee = function($e, j) {
          return B.w($.toDate()[$e].apply($.toDate("s"), (D ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(j)), $);
        }, O = this.$W, K = this.$M, Z = this.$D, se = "set" + (this.$u ? "UTC" : "");
        switch (q) {
          case d:
            return D ? U(1, 0) : U(31, 11);
          case c:
            return D ? U(1, K) : U(0, K + 1);
          case a:
            var oe = this.$locale().weekStart || 0, ie = (O < oe ? O + 7 : O) - oe;
            return U(D ? Z - ie : Z + (6 - ie), K);
          case f:
          case m:
            return ee(se + "Hours", 0);
          case o:
            return ee(se + "Minutes", 1);
          case u:
            return ee(se + "Seconds", 2);
          case i:
            return ee(se + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, w.endOf = function(k) {
        return this.startOf(k, !1);
      }, w.$set = function(k, L) {
        var $, D = B.p(k), q = "set" + (this.$u ? "UTC" : ""), U = ($ = {}, $[f] = q + "Date", $[m] = q + "Date", $[c] = q + "Month", $[d] = q + "FullYear", $[o] = q + "Hours", $[u] = q + "Minutes", $[i] = q + "Seconds", $[s] = q + "Milliseconds", $)[D], ee = D === f ? this.$D + (L - this.$W) : L;
        if (D === c || D === d) {
          var O = this.clone().set(m, 1);
          O.$d[U](ee), O.init(), this.$d = O.set(m, Math.min(this.$D, O.daysInMonth())).$d;
        } else
          U && this.$d[U](ee);
        return this.init(), this;
      }, w.set = function(k, L) {
        return this.clone().$set(k, L);
      }, w.get = function(k) {
        return this[B.p(k)]();
      }, w.add = function(k, L) {
        var $, D = this;
        k = Number(k);
        var q = B.p(L), U = function(K) {
          var Z = R(D);
          return B.w(Z.date(Z.date() + Math.round(K * k)), D);
        };
        if (q === c)
          return this.set(c, this.$M + k);
        if (q === d)
          return this.set(d, this.$y + k);
        if (q === f)
          return U(1);
        if (q === a)
          return U(7);
        var ee = ($ = {}, $[u] = l, $[o] = r, $[i] = t, $)[q] || 1, O = this.$d.getTime() + k * ee;
        return B.w(O, this);
      }, w.subtract = function(k, L) {
        return this.add(-1 * k, L);
      }, w.format = function(k) {
        var L = this, $ = this.$locale();
        if (!this.isValid())
          return $.invalidDate || p;
        var D = k || "YYYY-MM-DDTHH:mm:ssZ", q = B.z(this), U = this.$H, ee = this.$m, O = this.$M, K = $.weekdays, Z = $.months, se = function(j, X, ae, ge) {
          return j && (j[X] || j(L, D)) || ae[X].slice(0, ge);
        }, oe = function(j) {
          return B.s(U % 12 || 12, j, "0");
        }, ie = $.meridiem || function(j, X, ae) {
          var ge = j < 12 ? "AM" : "PM";
          return ae ? ge.toLowerCase() : ge;
        }, $e = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: O + 1, MM: B.s(O + 1, 2, "0"), MMM: se($.monthsShort, O, Z, 3), MMMM: se(Z, O), D: this.$D, DD: B.s(this.$D, 2, "0"), d: String(this.$W), dd: se($.weekdaysMin, this.$W, K, 2), ddd: se($.weekdaysShort, this.$W, K, 3), dddd: K[this.$W], H: String(U), HH: B.s(U, 2, "0"), h: oe(1), hh: oe(2), a: ie(U, ee, !0), A: ie(U, ee, !1), m: String(ee), mm: B.s(ee, 2, "0"), s: String(this.$s), ss: B.s(this.$s, 2, "0"), SSS: B.s(this.$ms, 3, "0"), Z: q };
        return D.replace(Y, function(j, X) {
          return X || $e[j] || q.replace(":", "");
        });
      }, w.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, w.diff = function(k, L, $) {
        var D, q = B.p(L), U = R(k), ee = (U.utcOffset() - this.utcOffset()) * l, O = this - U, K = B.m(this, U);
        return K = (D = {}, D[d] = K / 12, D[c] = K, D[h] = K / 3, D[a] = (O - ee) / 6048e5, D[f] = (O - ee) / 864e5, D[o] = O / r, D[u] = O / l, D[i] = O / t, D)[q] || O, $ ? K : B.a(K);
      }, w.daysInMonth = function() {
        return this.endOf(c).$D;
      }, w.$locale = function() {
        return P[this.$L];
      }, w.locale = function(k, L) {
        if (!k)
          return this.$L;
        var $ = this.clone(), D = te(k, L, !0);
        return D && ($.$L = D), $;
      }, w.clone = function() {
        return B.w(this.$d, this);
      }, w.toDate = function() {
        return new Date(this.valueOf());
      }, w.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, w.toISOString = function() {
        return this.$d.toISOString();
      }, w.toString = function() {
        return this.$d.toUTCString();
      }, A;
    }(), re = x.prototype;
    return R.prototype = re, [["$ms", s], ["$s", i], ["$m", u], ["$H", o], ["$W", f], ["$M", c], ["$y", d], ["$D", m]].forEach(function(A) {
      re[A[1]] = function(w) {
        return this.$g(w, A[0], A[1]);
      };
    }), R.extend = function(A, w) {
      return A.$i || (A(w, x, R), A.$i = !0), R;
    }, R.locale = te, R.isDayjs = V, R.unix = function(A) {
      return R(1e3 * A);
    }, R.en = P[H], R.Ls = P, R.p = {}, R;
  });
})(Fl);
const Oe = ot;
function Lt(n) {
  let e, t, l;
  return {
    c() {
      e = v("div"), t = v("p"), l = z(
        /*description*/
        n[1]
      ), g(e, "class", "mt-2 text-sm text-yellow-700");
    },
    m(r, s) {
      C(r, e, s), _(e, t), _(t, l);
    },
    p(r, s) {
      s & /*description*/
      2 && Q(
        l,
        /*description*/
        r[1]
      );
    },
    d(r) {
      r && M(e);
    }
  };
}
function Nt(n) {
  let e, t, l;
  return {
    c() {
      e = v("div"), t = v("a"), l = z(
        /*linkText*/
        n[4]
      ), g(
        t,
        "href",
        /*linkHref*/
        n[5]
      ), g(t, "class", "rounded-md bg-yellow-50 px-2 py-1.5 text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"), g(e, "class", "mt-4 text-sm text-yellow-700");
    },
    m(r, s) {
      C(r, e, s), _(e, t), _(t, l);
    },
    p(r, s) {
      s & /*linkText*/
      16 && Q(
        l,
        /*linkText*/
        r[4]
      ), s & /*linkHref*/
      32 && g(
        t,
        "href",
        /*linkHref*/
        r[5]
      );
    },
    d(r) {
      r && M(e);
    }
  };
}
function zt(n) {
  let e, t, l, r, s;
  return {
    c() {
      e = v("div"), t = v("button"), l = z(
        /*buttonText*/
        n[2]
      ), g(t, "type", "button"), g(t, "class", "rounded-md bg-yellow-50 px-2 py-1.5 text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"), g(e, "class", "mt-4");
    },
    m(i, u) {
      C(i, e, u), _(e, t), _(t, l), r || (s = Ee(t, "click", function() {
        Re(
          /*buttonClick*/
          n[3]
        ) && n[3].apply(this, arguments);
      }), r = !0);
    },
    p(i, u) {
      n = i, u & /*buttonText*/
      4 && Q(
        l,
        /*buttonText*/
        n[2]
      );
    },
    d(i) {
      i && M(e), r = !1, s();
    }
  };
}
function Jl(n) {
  let e, t, l, r, s, i, u, o, f, a, c = (
    /*description*/
    n[1] && Lt(n)
  ), h = (
    /*linkText*/
    n[4] && /*linkHref*/
    n[5] && Nt(n)
  ), d = (
    /*buttonText*/
    n[2] && /*buttonClick*/
    n[3] && zt(n)
  );
  return {
    c() {
      e = v("div"), t = v("div"), l = v("div"), l.innerHTML = '<svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>', r = N(), s = v("div"), i = v("h3"), u = z(
        /*title*/
        n[0]
      ), o = N(), c && c.c(), f = N(), h && h.c(), a = N(), d && d.c(), g(l, "class", "flex-shrink-0"), g(i, "class", "text-sm font-medium text-yellow-800"), g(s, "class", "ml-3"), g(t, "class", "flex"), g(e, "class", "rounded-md bg-yellow-50 p-4");
    },
    m(m, p) {
      C(m, e, p), _(e, t), _(t, l), _(t, r), _(t, s), _(s, i), _(i, u), _(s, o), c && c.m(s, null), _(s, f), h && h.m(s, null), _(s, a), d && d.m(s, null);
    },
    p(m, [p]) {
      p & /*title*/
      1 && Q(
        u,
        /*title*/
        m[0]
      ), /*description*/
      m[1] ? c ? c.p(m, p) : (c = Lt(m), c.c(), c.m(s, f)) : c && (c.d(1), c = null), /*linkText*/
      m[4] && /*linkHref*/
      m[5] ? h ? h.p(m, p) : (h = Nt(m), h.c(), h.m(s, a)) : h && (h.d(1), h = null), /*buttonText*/
      m[2] && /*buttonClick*/
      m[3] ? d ? d.p(m, p) : (d = zt(m), d.c(), d.m(s, null)) : d && (d.d(1), d = null);
    },
    i: I,
    o: I,
    d(m) {
      m && M(e), c && c.d(), h && h.d(), d && d.d();
    }
  };
}
function Gl(n, e, t) {
  let { title: l } = e, { description: r = null } = e, { buttonText: s = null } = e, { buttonClick: i = null } = e, { linkText: u = null } = e, { linkHref: o = null } = e;
  return n.$$set = (f) => {
    "title" in f && t(0, l = f.title), "description" in f && t(1, r = f.description), "buttonText" in f && t(2, s = f.buttonText), "buttonClick" in f && t(3, i = f.buttonClick), "linkText" in f && t(4, u = f.linkText), "linkHref" in f && t(5, o = f.linkHref);
  }, [l, r, s, i, u, o];
}
class qe extends _e {
  constructor(e) {
    super(), de(this, e, Gl, Jl, ce, {
      title: 0,
      description: 1,
      buttonText: 2,
      buttonClick: 3,
      linkText: 4,
      linkHref: 5
    });
  }
}
function Vl(n) {
  let e, t, l = [
    { xmlns: "http://www.w3.org/2000/svg" },
    { fill: "none" },
    { viewBox: "0 0 24 24" },
    { "stroke-width": "1.5" },
    { stroke: "currentColor" },
    /*$$props*/
    n[0]
  ], r = {};
  for (let s = 0; s < l.length; s += 1)
    r = fe(r, l[s]);
  return {
    c() {
      e = we("svg"), t = we("path"), g(t, "stroke-linecap", "round"), g(t, "stroke-linejoin", "round"), g(t, "d", "M12 4.5v15m7.5-7.5h-15"), Ne(e, r);
    },
    m(s, i) {
      C(s, e, i), _(e, t);
    },
    p(s, [i]) {
      Ne(e, r = xe(l, [
        { xmlns: "http://www.w3.org/2000/svg" },
        { fill: "none" },
        { viewBox: "0 0 24 24" },
        { "stroke-width": "1.5" },
        { stroke: "currentColor" },
        i & /*$$props*/
        1 && /*$$props*/
        s[0]
      ]));
    },
    i: I,
    o: I,
    d(s) {
      s && M(e);
    }
  };
}
function Zl(n, e, t) {
  return n.$$set = (l) => {
    t(0, e = fe(fe({}, e), he(l)));
  }, e = he(e), [e];
}
class $n extends _e {
  constructor(e) {
    super(), de(this, e, Zl, Vl, ce, {});
  }
}
function Ql(n) {
  let e, t, l = [
    { xmlns: "http://www.w3.org/2000/svg" },
    { fill: "none" },
    { viewBox: "0 0 24 24" },
    { "stroke-width": "1.5" },
    { stroke: "currentColor" },
    /*$$props*/
    n[0]
  ], r = {};
  for (let s = 0; s < l.length; s += 1)
    r = fe(r, l[s]);
  return {
    c() {
      e = we("svg"), t = we("path"), g(t, "stroke-linecap", "round"), g(t, "stroke-linejoin", "round"), g(t, "d", "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"), Ne(e, r);
    },
    m(s, i) {
      C(s, e, i), _(e, t);
    },
    p(s, [i]) {
      Ne(e, r = xe(l, [
        { xmlns: "http://www.w3.org/2000/svg" },
        { fill: "none" },
        { viewBox: "0 0 24 24" },
        { "stroke-width": "1.5" },
        { stroke: "currentColor" },
        i & /*$$props*/
        1 && /*$$props*/
        s[0]
      ]));
    },
    i: I,
    o: I,
    d(s) {
      s && M(e);
    }
  };
}
function Kl(n, e, t) {
  return n.$$set = (l) => {
    t(0, e = fe(fe({}, e), he(l)));
  }, e = he(e), [e];
}
class Xl extends _e {
  constructor(e) {
    super(), de(this, e, Kl, Ql, ce, {});
  }
}
function xl(n) {
  let e;
  return {
    c() {
      e = z(
        /*confirmText*/
        n[3]
      );
    },
    m(t, l) {
      C(t, e, l);
    },
    p(t, l) {
      l & /*confirmText*/
      8 && Q(
        e,
        /*confirmText*/
        t[3]
      );
    },
    d(t) {
      t && M(e);
    }
  };
}
function er(n) {
  let e;
  return {
    c() {
      e = z("Nevermind");
    },
    m(t, l) {
      C(t, e, l);
    },
    d(t) {
      t && M(e);
    }
  };
}
function tr(n) {
  let e, t, l, r, s, i, u, o, f, a, c, h, d, m, p, b;
  return d = new me({
    props: {
      type: "button",
      variant: "danger",
      loading: (
        /*confirmLoading*/
        n[4]
      ),
      $$slots: { default: [xl] },
      $$scope: { ctx: n }
    }
  }), d.$on(
    "click",
    /*click_handler*/
    n[6]
  ), p = new me({
    props: {
      type: "button",
      variant: "basic",
      $$slots: { default: [er] },
      $$scope: { ctx: n }
    }
  }), p.$on(
    "click",
    /*click_handler_1*/
    n[7]
  ), {
    c() {
      e = v("div"), t = v("div"), t.innerHTML = '<svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"></path></svg>', l = N(), r = v("div"), s = v("h3"), i = z(
        /*title*/
        n[1]
      ), u = N(), o = v("div"), f = v("p"), a = z(
        /*content*/
        n[2]
      ), c = N(), h = v("div"), G(d.$$.fragment), m = N(), G(p.$$.fragment), g(t, "class", "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"), g(s, "class", "text-base font-semibold leading-6 text-gray-900"), g(s, "id", "modal-title"), g(f, "class", "text-sm text-gray-500"), g(o, "class", "mt-2"), g(r, "class", "mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left"), g(e, "class", "sm:flex sm:items-start"), g(h, "class", "mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4 sm:space-x-2");
    },
    m(Y, W) {
      C(Y, e, W), _(e, t), _(e, l), _(e, r), _(r, s), _(s, i), _(r, u), _(r, o), _(o, f), _(f, a), C(Y, c, W), C(Y, h, W), F(d, h, null), _(h, m), F(p, h, null), b = !0;
    },
    p(Y, W) {
      (!b || W & /*title*/
      2) && Q(
        i,
        /*title*/
        Y[1]
      ), (!b || W & /*content*/
      4) && Q(
        a,
        /*content*/
        Y[2]
      );
      const T = {};
      W & /*confirmLoading*/
      16 && (T.loading = /*confirmLoading*/
      Y[4]), W & /*$$scope, confirmText*/
      520 && (T.$$scope = { dirty: W, ctx: Y }), d.$set(T);
      const E = {};
      W & /*$$scope*/
      512 && (E.$$scope = { dirty: W, ctx: Y }), p.$set(E);
    },
    i(Y) {
      b || (y(d.$$.fragment, Y), y(p.$$.fragment, Y), b = !0);
    },
    o(Y) {
      S(d.$$.fragment, Y), S(p.$$.fragment, Y), b = !1;
    },
    d(Y) {
      Y && M(e), Y && M(c), Y && M(h), J(d), J(p);
    }
  };
}
function nr(n) {
  let e, t;
  return e = new _t({
    props: {
      visible: (
        /*visible*/
        n[0]
      ),
      $$slots: { default: [tr] },
      $$scope: { ctx: n }
    }
  }), e.$on(
    "close",
    /*close_handler*/
    n[8]
  ), {
    c() {
      G(e.$$.fragment);
    },
    m(l, r) {
      F(e, l, r), t = !0;
    },
    p(l, [r]) {
      const s = {};
      r & /*visible*/
      1 && (s.visible = /*visible*/
      l[0]), r & /*$$scope, confirmLoading, confirmText, content, title*/
      542 && (s.$$scope = { dirty: r, ctx: l }), e.$set(s);
    },
    i(l) {
      t || (y(e.$$.fragment, l), t = !0);
    },
    o(l) {
      S(e.$$.fragment, l), t = !1;
    },
    d(l) {
      J(e, l);
    }
  };
}
function lr(n, e, t) {
  let { visible: l } = e, { title: r } = e, { content: s } = e, { confirmText: i = "Confirm" } = e, { confirmLoading: u = !1 } = e;
  const o = at(), f = () => o("confirm"), a = () => o("close");
  function c(h) {
    an.call(this, n, h);
  }
  return n.$$set = (h) => {
    "visible" in h && t(0, l = h.visible), "title" in h && t(1, r = h.title), "content" in h && t(2, s = h.content), "confirmText" in h && t(3, i = h.confirmText), "confirmLoading" in h && t(4, u = h.confirmLoading);
  }, [
    l,
    r,
    s,
    i,
    u,
    o,
    f,
    a,
    c
  ];
}
class rr extends _e {
  constructor(e) {
    super(), de(this, e, lr, nr, ce, {
      visible: 0,
      title: 1,
      content: 2,
      confirmText: 3,
      confirmLoading: 4
    });
  }
}
function Pt(n, e, t) {
  const l = n.slice();
  return l[35] = e[t], l;
}
function Ht(n, e, t) {
  const l = n.slice();
  return l[38] = e[t], l;
}
function Bt(n, e, t) {
  const l = n.slice();
  return l[42] = e[t], l;
}
function It(n) {
  let e, t;
  return e = new qe({
    props: {
      title: "We couldn't process your last payment and it is now overdue. Please fix the issue by visiting this link below.",
      linkText: "Fix Issues",
      linkHref: (
        /*$props*/
        n[0].fix_subscription_url
      )
    }
  }), {
    c() {
      G(e.$$.fragment);
    },
    m(l, r) {
      F(e, l, r), t = !0;
    },
    p(l, r) {
      const s = {};
      r[0] & /*$props*/
      1 && (s.linkHref = /*$props*/
      l[0].fix_subscription_url), e.$set(s);
    },
    i(l) {
      t || (y(e.$$.fragment, l), t = !0);
    },
    o(l) {
      S(e.$$.fragment, l), t = !1;
    },
    d(l) {
      J(e, l);
    }
  };
}
function Rt(n) {
  let e, t, l, r;
  const s = [ir, sr], i = [];
  function u(o, f) {
    return (
      /*$props*/
      o[0].grace_period ? 0 : 1
    );
  }
  return e = u(n), t = i[e] = s[e](n), {
    c() {
      t.c(), l = be();
    },
    m(o, f) {
      i[e].m(o, f), C(o, l, f), r = !0;
    },
    p(o, f) {
      let a = e;
      e = u(o), e === a ? i[e].p(o, f) : (ne(), S(i[a], 1, 1, () => {
        i[a] = null;
      }), le(), t = i[e], t ? t.p(o, f) : (t = i[e] = s[e](o), t.c()), y(t, 1), t.m(l.parentNode, l));
    },
    i(o) {
      r || (y(t), r = !0);
    },
    o(o) {
      S(t), r = !1;
    },
    d(o) {
      i[e].d(o), o && M(l);
    }
  };
}
function sr(n) {
  let e, t;
  return e = new qe({
    props: {
      title: "You are currently on a trial",
      description: `Your trial will end on ${/*$props*/
      n[0].trial_ends_at} and your subscription will begin.`
    }
  }), {
    c() {
      G(e.$$.fragment);
    },
    m(l, r) {
      F(e, l, r), t = !0;
    },
    p(l, r) {
      const s = {};
      r[0] & /*$props*/
      1 && (s.description = `Your trial will end on ${/*$props*/
      l[0].trial_ends_at} and your subscription will begin.`), e.$set(s);
    },
    i(l) {
      t || (y(e.$$.fragment, l), t = !0);
    },
    o(l) {
      S(e.$$.fragment, l), t = !1;
    },
    d(l) {
      J(e, l);
    }
  };
}
function ir(n) {
  let e, t;
  return e = new qe({
    props: {
      title: "You are currently on a trial",
      description: `You have cancelled the trial but you can continue using it until ${/*$props*/
      n[0].trial_ends_at}.`
    }
  }), {
    c() {
      G(e.$$.fragment);
    },
    m(l, r) {
      F(e, l, r), t = !0;
    },
    p(l, r) {
      const s = {};
      r[0] & /*$props*/
      1 && (s.description = `You have cancelled the trial but you can continue using it until ${/*$props*/
      l[0].trial_ends_at}.`), e.$set(s);
    },
    i(l) {
      t || (y(e.$$.fragment, l), t = !0);
    },
    o(l) {
      S(e.$$.fragment, l), t = !1;
    },
    d(l) {
      J(e, l);
    }
  };
}
function Ut(n) {
  var l;
  let e, t;
  return e = new qe({
    props: {
      title: "Your subscription has been canceled",
      description: `It will end on ${Oe(
        /*$props*/
        (l = n[0].subscription) == null ? void 0 : l.ends_at
      ).format("YYYY-MM-DD")}.`
    }
  }), {
    c() {
      G(e.$$.fragment);
    },
    m(r, s) {
      F(e, r, s), t = !0;
    },
    p(r, s) {
      var u;
      const i = {};
      s[0] & /*$props*/
      1 && (i.description = `It will end on ${Oe(
        /*$props*/
        (u = r[0].subscription) == null ? void 0 : u.ends_at
      ).format("YYYY-MM-DD")}.`), e.$set(i);
    },
    i(r) {
      t || (y(e.$$.fragment, r), t = !0);
    },
    o(r) {
      S(e.$$.fragment, r), t = !1;
    },
    d(r) {
      J(e, r);
    }
  };
}
function qt(n) {
  let e, t;
  return e = new qe({
    props: {
      title: "Your subscription has ended",
      description: "To resubscribe, choose a plan below."
    }
  }), {
    c() {
      G(e.$$.fragment);
    },
    m(l, r) {
      F(e, l, r), t = !0;
    },
    i(l) {
      t || (y(e.$$.fragment, l), t = !0);
    },
    o(l) {
      S(e.$$.fragment, l), t = !1;
    },
    d(l) {
      J(e, l);
    }
  };
}
function Wt(n) {
  let e, t, l, r, s, i, u, o, f, a;
  return t = new Xl({
    props: { class: "mx-auto h-12 w-12 text-gray-400" }
  }), f = new me({
    props: {
      type: "button",
      $$slots: { default: [or] },
      $$scope: { ctx: n }
    }
  }), f.$on(
    "click",
    /*click_handler*/
    n[24]
  ), {
    c() {
      e = v("div"), G(t.$$.fragment), l = N(), r = v("h3"), r.textContent = "You do not have a subscription", s = N(), i = v("p"), i.textContent = "Choose a plan to get started", u = N(), o = v("div"), G(f.$$.fragment), g(r, "class", "mt-2 text-sm font-semibold text-gray-900"), g(i, "class", "mt-1 text-sm text-gray-500"), g(o, "class", "mt-6"), g(e, "class", "text-center mt-6");
    },
    m(c, h) {
      C(c, e, h), F(t, e, null), _(e, l), _(e, r), _(e, s), _(e, i), _(e, u), _(e, o), F(f, o, null), a = !0;
    },
    p(c, h) {
      const d = {};
      h[1] & /*$$scope*/
      16384 && (d.$$scope = { dirty: h, ctx: c }), f.$set(d);
    },
    i(c) {
      a || (y(t.$$.fragment, c), y(f.$$.fragment, c), a = !0);
    },
    o(c) {
      S(t.$$.fragment, c), S(f.$$.fragment, c), a = !1;
    },
    d(c) {
      c && M(e), J(t), J(f);
    }
  };
}
function or(n) {
  let e, t, l;
  return e = new $n({
    props: { class: "-ml-0.5 mr-1.5 h-5 w-5" }
  }), {
    c() {
      G(e.$$.fragment), t = z(`
                    Choose Plan`);
    },
    m(r, s) {
      F(e, r, s), C(r, t, s), l = !0;
    },
    p: I,
    i(r) {
      l || (y(e.$$.fragment, r), l = !0);
    },
    o(r) {
      S(e.$$.fragment, r), l = !1;
    },
    d(r) {
      J(e, r), r && M(t);
    }
  };
}
function Ft(n) {
  let e, t, l, r = (
    /*activePlan*/
    n[14].plan.title + ""
  ), s, i, u = (
    /*activePlan*/
    (n[14].type === "monthly" ? (
      /*activePlan*/
      n[14].plan.prices.monthly.price
    ) : (
      /*activePlan*/
      n[14].plan.prices.yearly.price
    )) + ""
  ), o, f, a = (
    /*activePlan*/
    n[14].type + ""
  ), c, h, d, m, p, b, Y, W;
  const T = [cr, fr, ur], E = [];
  function H(P, V) {
    return (
      /*$props*/
      P[0].canceled ? (
        /*$props*/
        P[0].canceled && /*$props*/
        P[0].grace_period ? 1 : (
          /*$props*/
          P[0].ended ? 2 : -1
        )
      ) : 0
    );
  }
  return ~(b = H(n)) && (Y = E[b] = T[b](n)), {
    c() {
      e = v("div"), t = v("p"), l = z("You are currently subscribed to the "), s = z(r), i = z(` plan
                  @ `), o = z(u), f = N(), c = z(a), h = z("."), d = N(), m = v("div"), p = v("div"), Y && Y.c(), g(e, "class", "mt-2 max-w-xl text-sm text-gray-500"), g(p, "class", "flex items-center space-x-2 mt-5");
    },
    m(P, V) {
      C(P, e, V), _(e, t), _(t, l), _(t, s), _(t, i), _(t, o), _(t, f), _(t, c), _(t, h), C(P, d, V), C(P, m, V), _(m, p), ~b && E[b].m(p, null), W = !0;
    },
    p(P, V) {
      (!W || V[0] & /*activePlan*/
      16384) && r !== (r = /*activePlan*/
      P[14].plan.title + "") && Q(s, r), (!W || V[0] & /*activePlan*/
      16384) && u !== (u = /*activePlan*/
      (P[14].type === "monthly" ? (
        /*activePlan*/
        P[14].plan.prices.monthly.price
      ) : (
        /*activePlan*/
        P[14].plan.prices.yearly.price
      )) + "") && Q(o, u), (!W || V[0] & /*activePlan*/
      16384) && a !== (a = /*activePlan*/
      P[14].type + "") && Q(c, a);
      let te = b;
      b = H(P), b === te ? ~b && E[b].p(P, V) : (Y && (ne(), S(E[te], 1, 1, () => {
        E[te] = null;
      }), le()), ~b ? (Y = E[b], Y ? Y.p(P, V) : (Y = E[b] = T[b](P), Y.c()), y(Y, 1), Y.m(p, null)) : Y = null);
    },
    i(P) {
      W || (y(Y), W = !0);
    },
    o(P) {
      S(Y), W = !1;
    },
    d(P) {
      P && M(e), P && M(d), P && M(m), ~b && E[b].d();
    }
  };
}
function ur(n) {
  let e, t;
  return e = new me({
    props: {
      $$slots: { default: [ar] },
      $$scope: { ctx: n }
    }
  }), e.$on(
    "click",
    /*click_handler_3*/
    n[27]
  ), {
    c() {
      G(e.$$.fragment);
    },
    m(l, r) {
      F(e, l, r), t = !0;
    },
    p(l, r) {
      const s = {};
      r[1] & /*$$scope*/
      16384 && (s.$$scope = { dirty: r, ctx: l }), e.$set(s);
    },
    i(l) {
      t || (y(e.$$.fragment, l), t = !0);
    },
    o(l) {
      S(e.$$.fragment, l), t = !1;
    },
    d(l) {
      J(e, l);
    }
  };
}
function fr(n) {
  let e, t;
  return e = new me({
    props: {
      loading: (
        /*resumeLoading*/
        n[12]
      ),
      $$slots: { default: [dr] },
      $$scope: { ctx: n }
    }
  }), e.$on(
    "click",
    /*resumeSubscription*/
    n[17]
  ), {
    c() {
      G(e.$$.fragment);
    },
    m(l, r) {
      F(e, l, r), t = !0;
    },
    p(l, r) {
      const s = {};
      r[0] & /*resumeLoading*/
      4096 && (s.loading = /*resumeLoading*/
      l[12]), r[1] & /*$$scope*/
      16384 && (s.$$scope = { dirty: r, ctx: l }), e.$set(s);
    },
    i(l) {
      t || (y(e.$$.fragment, l), t = !0);
    },
    o(l) {
      S(e.$$.fragment, l), t = !1;
    },
    d(l) {
      J(e, l);
    }
  };
}
function cr(n) {
  var s;
  let e, t, l, r = (
    /*$props*/
    ((s = n[0].subscription) == null ? void 0 : s.status) !== "incomplete" && Jt(n)
  );
  return t = new me({
    props: {
      variant: "danger-ghost",
      $$slots: { default: [mr] },
      $$scope: { ctx: n }
    }
  }), t.$on(
    "click",
    /*click_handler_2*/
    n[26]
  ), {
    c() {
      r && r.c(), e = N(), G(t.$$.fragment);
    },
    m(i, u) {
      r && r.m(i, u), C(i, e, u), F(t, i, u), l = !0;
    },
    p(i, u) {
      var f;
      /*$props*/
      ((f = i[0].subscription) == null ? void 0 : f.status) !== "incomplete" ? r ? (r.p(i, u), u[0] & /*$props*/
      1 && y(r, 1)) : (r = Jt(i), r.c(), y(r, 1), r.m(e.parentNode, e)) : r && (ne(), S(r, 1, 1, () => {
        r = null;
      }), le());
      const o = {};
      u[1] & /*$$scope*/
      16384 && (o.$$scope = { dirty: u, ctx: i }), t.$set(o);
    },
    i(i) {
      l || (y(r), y(t.$$.fragment, i), l = !0);
    },
    o(i) {
      S(r), S(t.$$.fragment, i), l = !1;
    },
    d(i) {
      r && r.d(i), i && M(e), J(t, i);
    }
  };
}
function ar(n) {
  let e;
  return {
    c() {
      e = z("Select A Plan");
    },
    m(t, l) {
      C(t, e, l);
    },
    d(t) {
      t && M(e);
    }
  };
}
function dr(n) {
  let e;
  return {
    c() {
      e = z("Resume Subscription");
    },
    m(t, l) {
      C(t, e, l);
    },
    d(t) {
      t && M(e);
    }
  };
}
function Jt(n) {
  let e, t;
  return e = new me({
    props: {
      variant: "default",
      $$slots: { default: [_r] },
      $$scope: { ctx: n }
    }
  }), e.$on(
    "click",
    /*click_handler_1*/
    n[25]
  ), {
    c() {
      G(e.$$.fragment);
    },
    m(l, r) {
      F(e, l, r), t = !0;
    },
    p(l, r) {
      const s = {};
      r[1] & /*$$scope*/
      16384 && (s.$$scope = { dirty: r, ctx: l }), e.$set(s);
    },
    i(l) {
      t || (y(e.$$.fragment, l), t = !0);
    },
    o(l) {
      S(e.$$.fragment, l), t = !1;
    },
    d(l) {
      J(e, l);
    }
  };
}
function _r(n) {
  let e;
  return {
    c() {
      e = z("Change Plan");
    },
    m(t, l) {
      C(t, e, l);
    },
    d(t) {
      t && M(e);
    }
  };
}
function mr(n) {
  let e;
  return {
    c() {
      e = z("Cancel Subscription");
    },
    m(t, l) {
      C(t, e, l);
    },
    d(t) {
      t && M(e);
    }
  };
}
function pr(n) {
  let e, t, l, r, s, i, u, o = (
    /*$props*/
    n[0].fix_subscription_url && It(n)
  ), f = (
    /*$props*/
    n[0].on_trial && Rt(n)
  ), a = (
    /*$props*/
    n[0].canceled && !/*$props*/
    n[0].on_trial && /*$props*/
    n[0].grace_period && Ut(n)
  ), c = (
    /*$props*/
    n[0].ended && qt()
  ), h = !/*activePlan*/
  n[14] && Wt(n), d = (
    /*activePlan*/
    n[14] && Ft(n)
  );
  return {
    c() {
      o && o.c(), e = N(), f && f.c(), t = N(), a && a.c(), l = N(), c && c.c(), r = N(), h && h.c(), s = N(), d && d.c(), i = be();
    },
    m(m, p) {
      o && o.m(m, p), C(m, e, p), f && f.m(m, p), C(m, t, p), a && a.m(m, p), C(m, l, p), c && c.m(m, p), C(m, r, p), h && h.m(m, p), C(m, s, p), d && d.m(m, p), C(m, i, p), u = !0;
    },
    p(m, p) {
      /*$props*/
      m[0].fix_subscription_url ? o ? (o.p(m, p), p[0] & /*$props*/
      1 && y(o, 1)) : (o = It(m), o.c(), y(o, 1), o.m(e.parentNode, e)) : o && (ne(), S(o, 1, 1, () => {
        o = null;
      }), le()), /*$props*/
      m[0].on_trial ? f ? (f.p(m, p), p[0] & /*$props*/
      1 && y(f, 1)) : (f = Rt(m), f.c(), y(f, 1), f.m(t.parentNode, t)) : f && (ne(), S(f, 1, 1, () => {
        f = null;
      }), le()), /*$props*/
      m[0].canceled && !/*$props*/
      m[0].on_trial && /*$props*/
      m[0].grace_period ? a ? (a.p(m, p), p[0] & /*$props*/
      1 && y(a, 1)) : (a = Ut(m), a.c(), y(a, 1), a.m(l.parentNode, l)) : a && (ne(), S(a, 1, 1, () => {
        a = null;
      }), le()), /*$props*/
      m[0].ended ? c ? p[0] & /*$props*/
      1 && y(c, 1) : (c = qt(), c.c(), y(c, 1), c.m(r.parentNode, r)) : c && (ne(), S(c, 1, 1, () => {
        c = null;
      }), le()), /*activePlan*/
      m[14] ? h && (ne(), S(h, 1, 1, () => {
        h = null;
      }), le()) : h ? (h.p(m, p), p[0] & /*activePlan*/
      16384 && y(h, 1)) : (h = Wt(m), h.c(), y(h, 1), h.m(s.parentNode, s)), /*activePlan*/
      m[14] ? d ? (d.p(m, p), p[0] & /*activePlan*/
      16384 && y(d, 1)) : (d = Ft(m), d.c(), y(d, 1), d.m(i.parentNode, i)) : d && (ne(), S(d, 1, 1, () => {
        d = null;
      }), le());
    },
    i(m) {
      u || (y(o), y(f), y(a), y(c), y(h), y(d), u = !0);
    },
    o(m) {
      S(o), S(f), S(a), S(c), S(h), S(d), u = !1;
    },
    d(m) {
      o && o.d(m), m && M(e), f && f.d(m), m && M(t), a && a.d(m), m && M(l), c && c.d(m), m && M(r), h && h.d(m), m && M(s), d && d.d(m), m && M(i);
    }
  };
}
function hr(n) {
  let e, t, l, r, s, i, u = (
    /*$props*/
    n[0].payment_method.payment_last_four + ""
  ), o, f, a, c, h;
  return l = new bn({ props: { class: "w-6 h-6" } }), c = new me({
    props: {
      variant: "basic",
      $$slots: { default: [br] },
      $$scope: { ctx: n }
    }
  }), c.$on(
    "click",
    /*redirectToSetup*/
    n[22]
  ), {
    c() {
      e = v("div"), t = v("div"), G(l.$$.fragment), r = N(), s = v("span"), i = z("Ending with "), o = z(u), f = N(), a = v("div"), G(c.$$.fragment), g(s, "class", "text-sm font-medium text-gray-900"), g(t, "class", "flex items-center space-x-2"), g(e, "class", "flex items-center justify-between p-2 bg-gray-50 rounded-lg");
    },
    m(d, m) {
      C(d, e, m), _(e, t), F(l, t, null), _(t, r), _(t, s), _(s, i), _(s, o), _(e, f), _(e, a), F(c, a, null), h = !0;
    },
    p(d, m) {
      (!h || m[0] & /*$props*/
      1) && u !== (u = /*$props*/
      d[0].payment_method.payment_last_four + "") && Q(o, u);
      const p = {};
      m[1] & /*$$scope*/
      16384 && (p.$$scope = { dirty: m, ctx: d }), c.$set(p);
    },
    i(d) {
      h || (y(l.$$.fragment, d), y(c.$$.fragment, d), h = !0);
    },
    o(d) {
      S(l.$$.fragment, d), S(c.$$.fragment, d), h = !1;
    },
    d(d) {
      d && M(e), J(l), J(c);
    }
  };
}
function gr(n) {
  let e, t, l, r, s, i, u, o, f, a;
  return t = new bn({
    props: { class: "mx-auto h-12 w-12 text-gray-400" }
  }), f = new me({
    props: {
      type: "button",
      $$slots: { default: [$r] },
      $$scope: { ctx: n }
    }
  }), f.$on(
    "click",
    /*redirectToSetup*/
    n[22]
  ), {
    c() {
      e = v("div"), G(t.$$.fragment), l = N(), r = v("h3"), r.textContent = "No payment method", s = N(), i = v("p"), i.textContent = "You need a payment method to subscribe", u = N(), o = v("div"), G(f.$$.fragment), g(r, "class", "mt-2 text-sm font-semibold text-gray-900"), g(i, "class", "mt-1 text-sm text-gray-500"), g(o, "class", "mt-6"), g(e, "class", "text-center mt-6");
    },
    m(c, h) {
      C(c, e, h), F(t, e, null), _(e, l), _(e, r), _(e, s), _(e, i), _(e, u), _(e, o), F(f, o, null), a = !0;
    },
    p(c, h) {
      const d = {};
      h[1] & /*$$scope*/
      16384 && (d.$$scope = { dirty: h, ctx: c }), f.$set(d);
    },
    i(c) {
      a || (y(t.$$.fragment, c), y(f.$$.fragment, c), a = !0);
    },
    o(c) {
      S(t.$$.fragment, c), S(f.$$.fragment, c), a = !1;
    },
    d(c) {
      c && M(e), J(t), J(f);
    }
  };
}
function br(n) {
  let e;
  return {
    c() {
      e = z("Update");
    },
    m(t, l) {
      C(t, e, l);
    },
    d(t) {
      t && M(e);
    }
  };
}
function $r(n) {
  let e, t, l;
  return e = new $n({
    props: { class: "-ml-0.5 mr-1.5 h-5 w-5" }
  }), {
    c() {
      G(e.$$.fragment), t = z(`
                    Add Payment Method`);
    },
    m(r, s) {
      F(e, r, s), C(r, t, s), l = !0;
    },
    p: I,
    i(r) {
      l || (y(e.$$.fragment, r), l = !0);
    },
    o(r) {
      S(e.$$.fragment, r), l = !1;
    },
    d(r) {
      J(e, r), r && M(t);
    }
  };
}
function vr(n) {
  let e, t, l, r;
  const s = [gr, hr], i = [];
  function u(o, f) {
    return (
      /*$props*/
      o[0].payment_method ? 1 : 0
    );
  }
  return e = u(n), t = i[e] = s[e](n), {
    c() {
      t.c(), l = be();
    },
    m(o, f) {
      i[e].m(o, f), C(o, l, f), r = !0;
    },
    p(o, f) {
      let a = e;
      e = u(o), e === a ? i[e].p(o, f) : (ne(), S(i[a], 1, 1, () => {
        i[a] = null;
      }), le(), t = i[e], t ? t.p(o, f) : (t = i[e] = s[e](o), t.c()), y(t, 1), t.m(l.parentNode, l));
    },
    i(o) {
      r || (y(t), r = !0);
    },
    o(o) {
      S(t), r = !1;
    },
    d(o) {
      i[e].d(o), o && M(l);
    }
  };
}
function Gt(n) {
  let e, t, l, r = {
    ctx: n,
    current: null,
    token: null,
    hasCatch: !1,
    pending: Dr,
    then: yr,
    catch: kr,
    value: 41,
    blocks: [, , ,]
  };
  return vt(t = /*invoicePromise*/
  n[13], r), {
    c() {
      e = be(), r.block.c();
    },
    m(s, i) {
      C(s, e, i), r.block.m(s, r.anchor = i), r.mount = () => e.parentNode, r.anchor = e, l = !0;
    },
    p(s, i) {
      n = s, r.ctx = n, i[0] & /*invoicePromise*/
      8192 && t !== (t = /*invoicePromise*/
      n[13]) && vt(t, r) || qn(r, n, i);
    },
    i(s) {
      l || (y(r.block), l = !0);
    },
    o(s) {
      for (let i = 0; i < 3; i += 1) {
        const u = r.blocks[i];
        S(u);
      }
      l = !1;
    },
    d(s) {
      s && M(e), r.block.d(s), r.token = null, r = null;
    }
  };
}
function kr(n) {
  return {
    c: I,
    m: I,
    p: I,
    i: I,
    o: I,
    d: I
  };
}
function yr(n) {
  let e, t, l, r;
  const s = [Mr, wr], i = [];
  function u(o, f) {
    return (
      /*response*/
      o[41].invoices.length === 0 ? 0 : 1
    );
  }
  return e = u(n), t = i[e] = s[e](n), {
    c() {
      t.c(), l = be();
    },
    m(o, f) {
      i[e].m(o, f), C(o, l, f), r = !0;
    },
    p(o, f) {
      let a = e;
      e = u(o), e === a ? i[e].p(o, f) : (ne(), S(i[a], 1, 1, () => {
        i[a] = null;
      }), le(), t = i[e], t ? t.p(o, f) : (t = i[e] = s[e](o), t.c()), y(t, 1), t.m(l.parentNode, l));
    },
    i(o) {
      r || (y(t), r = !0);
    },
    o(o) {
      S(t), r = !1;
    },
    d(o) {
      i[e].d(o), o && M(l);
    }
  };
}
function wr(n) {
  let e, t, l = (
    /*response*/
    n[41].invoices
  ), r = [];
  for (let i = 0; i < l.length; i += 1)
    r[i] = Vt(Bt(n, l, i));
  const s = (i) => S(r[i], 1, 1, () => {
    r[i] = null;
  });
  return {
    c() {
      e = v("ul");
      for (let i = 0; i < r.length; i += 1)
        r[i].c();
      g(e, "class", "divide-y divide-gray-100");
    },
    m(i, u) {
      C(i, e, u);
      for (let o = 0; o < r.length; o += 1)
        r[o] && r[o].m(e, null);
      t = !0;
    },
    p(i, u) {
      if (u[0] & /*invoicePromise*/
      8192) {
        l = /*response*/
        i[41].invoices;
        let o;
        for (o = 0; o < l.length; o += 1) {
          const f = Bt(i, l, o);
          r[o] ? (r[o].p(f, u), y(r[o], 1)) : (r[o] = Vt(f), r[o].c(), y(r[o], 1), r[o].m(e, null));
        }
        for (ne(), o = l.length; o < r.length; o += 1)
          s(o);
        le();
      }
    },
    i(i) {
      if (!t) {
        for (let u = 0; u < l.length; u += 1)
          y(r[u]);
        t = !0;
      }
    },
    o(i) {
      r = r.filter(Boolean);
      for (let u = 0; u < r.length; u += 1)
        S(r[u]);
      t = !1;
    },
    d(i) {
      i && M(e), Xe(r, i);
    }
  };
}
function Mr(n) {
  let e;
  return {
    c() {
      e = v("p"), e.textContent = "No invoices yet.";
    },
    m(t, l) {
      C(t, e, l);
    },
    p: I,
    i: I,
    o: I,
    d(t) {
      t && M(e);
    }
  };
}
function Sr(n) {
  let e, t;
  return e = new Ue({
    props: {
      class: "uppercase",
      $$slots: { default: [Er] },
      $$scope: { ctx: n }
    }
  }), {
    c() {
      G(e.$$.fragment);
    },
    m(l, r) {
      F(e, l, r), t = !0;
    },
    p(l, r) {
      const s = {};
      r[0] & /*invoicePromise*/
      8192 | r[1] & /*$$scope*/
      16384 && (s.$$scope = { dirty: r, ctx: l }), e.$set(s);
    },
    i(l) {
      t || (y(e.$$.fragment, l), t = !0);
    },
    o(l) {
      S(e.$$.fragment, l), t = !1;
    },
    d(l) {
      J(e, l);
    }
  };
}
function Cr(n) {
  let e, t;
  return e = new Ue({
    props: {
      variant: "success",
      $$slots: { default: [Yr] },
      $$scope: { ctx: n }
    }
  }), {
    c() {
      G(e.$$.fragment);
    },
    m(l, r) {
      F(e, l, r), t = !0;
    },
    p(l, r) {
      const s = {};
      r[1] & /*$$scope*/
      16384 && (s.$$scope = { dirty: r, ctx: l }), e.$set(s);
    },
    i(l) {
      t || (y(e.$$.fragment, l), t = !0);
    },
    o(l) {
      S(e.$$.fragment, l), t = !1;
    },
    d(l) {
      J(e, l);
    }
  };
}
function Er(n) {
  let e = (
    /*invoice*/
    n[42].status + ""
  ), t;
  return {
    c() {
      t = z(e);
    },
    m(l, r) {
      C(l, t, r);
    },
    p(l, r) {
      r[0] & /*invoicePromise*/
      8192 && e !== (e = /*invoice*/
      l[42].status + "") && Q(t, e);
    },
    d(l) {
      l && M(t);
    }
  };
}
function Yr(n) {
  let e;
  return {
    c() {
      e = z("PAID");
    },
    m(t, l) {
      C(t, e, l);
    },
    d(t) {
      t && M(e);
    }
  };
}
function Vt(n) {
  let e, t, l, r, s, i = Oe(
    /*invoice*/
    n[42].created,
    "YYYY-MM-DD"
  ).format("MMMM D, YYYY") + "", u, o, f, a, c, h, d, m, p, b = (
    /*invoice*/
    (n[42].total / 100).toFixed(2) + ""
  ), Y, W, T, E, H, P, V = Oe(
    /*invoice*/
    n[42].created,
    "YYYY-MM-DD"
  ).format("MMMM D, YYYY") + "", te, R, B, x;
  const re = [Cr, Sr], A = [];
  function w(k, L) {
    return (
      /*invoice*/
      k[42].status === "paid" ? 0 : 1
    );
  }
  return a = w(n), c = A[a] = re[a](n), {
    c() {
      e = v("li"), t = v("div"), l = v("div"), r = v("p"), s = v("time"), u = z(i), f = N(), c.c(), h = N(), d = v("div"), m = v("p"), p = z("$"), Y = z(b), W = N(), T = v("div"), E = v("a"), H = z(`View Invoice
                            `), P = v("span"), te = z(V), B = N(), g(s, "datetime", o = /*invoice*/
      n[42].created), g(r, "class", "text-sm font-semibold leading-6 text-gray-900"), g(l, "class", "flex items-start gap-x-3"), g(m, "class", "truncate"), g(d, "class", "mt-0 flex items-center gap-x-2 text-xs leading-5 text-gray-500"), g(t, "class", "min-w-0"), g(P, "class", "sr-only"), g(E, "href", R = /*invoice*/
      n[42].hosted_invoice_url), g(E, "class", "inline-flex items-center rounded-md px-2.5 py-1.5 text-sm disabled:bg-opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 shadow-sm bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"), g(E, "target", "_blank"), g(T, "class", "flex flex-none items-center gap-x-4"), g(e, "class", "flex items-center justify-between gap-x-6 py-5");
    },
    m(k, L) {
      C(k, e, L), _(e, t), _(t, l), _(l, r), _(r, s), _(s, u), _(l, f), A[a].m(l, null), _(t, h), _(t, d), _(d, m), _(m, p), _(m, Y), _(e, W), _(e, T), _(T, E), _(E, H), _(E, P), _(P, te), _(e, B), x = !0;
    },
    p(k, L) {
      (!x || L[0] & /*invoicePromise*/
      8192) && i !== (i = Oe(
        /*invoice*/
        k[42].created,
        "YYYY-MM-DD"
      ).format("MMMM D, YYYY") + "") && Q(u, i), (!x || L[0] & /*invoicePromise*/
      8192 && o !== (o = /*invoice*/
      k[42].created)) && g(s, "datetime", o);
      let $ = a;
      a = w(k), a === $ ? A[a].p(k, L) : (ne(), S(A[$], 1, 1, () => {
        A[$] = null;
      }), le(), c = A[a], c ? c.p(k, L) : (c = A[a] = re[a](k), c.c()), y(c, 1), c.m(l, null)), (!x || L[0] & /*invoicePromise*/
      8192) && b !== (b = /*invoice*/
      (k[42].total / 100).toFixed(2) + "") && Q(Y, b), (!x || L[0] & /*invoicePromise*/
      8192) && V !== (V = Oe(
        /*invoice*/
        k[42].created,
        "YYYY-MM-DD"
      ).format("MMMM D, YYYY") + "") && Q(te, V), (!x || L[0] & /*invoicePromise*/
      8192 && R !== (R = /*invoice*/
      k[42].hosted_invoice_url)) && g(E, "href", R);
    },
    i(k) {
      x || (y(c), x = !0);
    },
    o(k) {
      S(c), x = !1;
    },
    d(k) {
      k && M(e), A[a].d();
    }
  };
}
function Dr(n) {
  let e;
  return {
    c() {
      e = v("p"), e.textContent = "Loading...";
    },
    m(t, l) {
      C(t, e, l);
    },
    p: I,
    i: I,
    o: I,
    d(t) {
      t && M(e);
    }
  };
}
function Tr(n) {
  let e, t, l = (
    /*invoicePromise*/
    n[13] && Gt(n)
  );
  return {
    c() {
      l && l.c(), e = be();
    },
    m(r, s) {
      l && l.m(r, s), C(r, e, s), t = !0;
    },
    p(r, s) {
      /*invoicePromise*/
      r[13] ? l ? (l.p(r, s), s[0] & /*invoicePromise*/
      8192 && y(l, 1)) : (l = Gt(r), l.c(), y(l, 1), l.m(e.parentNode, e)) : l && (ne(), S(l, 1, 1, () => {
        l = null;
      }), le());
    },
    i(r) {
      t || (y(l), t = !0);
    },
    o(r) {
      S(l), t = !1;
    },
    d(r) {
      l && l.d(r), r && M(e);
    }
  };
}
function jr(n) {
  let e;
  return {
    c() {
      e = v("p"), e.textContent = "Your subscription has been activated!";
    },
    m(t, l) {
      C(t, e, l);
    },
    p: I,
    i: I,
    o: I,
    d(t) {
      t && M(e);
    }
  };
}
function Or(n) {
  let e, t, l, r, s, i, u, o, f, a, c, h, d, m, p, b, Y = (
    /*monthly*/
    n[2]
  ), W, T, E, H, P;
  function V(w) {
    n[29](w);
  }
  let te = { onChange: (
    /*func*/
    n[28]
  ) };
  /*monthly*/
  n[2] !== void 0 && (te.enabled = /*monthly*/
  n[2]), u = new Bl({ props: te }), rt.push(() => Wn(u, "enabled", V));
  let R = xt(n), B = (
    /*planState*/
    n[9] === /*PlanModalState*/
    n[1].Error && en(n)
  );
  const x = [zr, Nr], re = [];
  function A(w, k) {
    return (
      /*activePlan*/
      w[14] ? 0 : 1
    );
  }
  return E = A(n), H = re[E] = x[E](n), {
    c() {
      e = v("div"), t = v("h3"), t.textContent = "Select a plan", l = N(), r = v("div"), s = v("span"), s.textContent = "Yearly", i = N(), G(u.$$.fragment), f = N(), a = v("span"), a.textContent = "Monthly", c = N(), h = v("div"), d = v("fieldset"), m = v("legend"), m.textContent = "Plan selection", p = N(), b = v("div"), R.c(), W = N(), B && B.c(), T = N(), H.c(), g(t, "class", "text-base font-semibold leading-6 text-gray-900"), g(r, "class", "flex items-center space-x-2"), g(m, "class", "sr-only"), g(b, "class", "space-y-4"), g(e, "class", "space-y-4");
    },
    m(w, k) {
      C(w, e, k), _(e, t), _(e, l), _(e, r), _(r, s), _(r, i), F(u, r, null), _(r, f), _(r, a), _(e, c), _(e, h), _(h, d), _(d, m), _(d, p), _(d, b), R.m(b, null), _(e, W), B && B.m(e, null), _(e, T), re[E].m(e, null), P = !0;
    },
    p(w, k) {
      const L = {};
      k[0] & /*newPlanSelect*/
      64 && (L.onChange = /*func*/
      w[28]), !o && k[0] & /*monthly*/
      4 && (o = !0, L.enabled = /*monthly*/
      w[2], Hn(() => o = !1)), u.$set(L), k[0] & /*monthly*/
      4 && ce(Y, Y = /*monthly*/
      w[2]) ? (ne(), S(R, 1, 1, I), le(), R = xt(w), R.c(), y(R, 1), R.m(b, null)) : R.p(w, k), /*planState*/
      w[9] === /*PlanModalState*/
      w[1].Error ? B ? B.p(w, k) : (B = en(w), B.c(), B.m(e, T)) : B && (B.d(1), B = null);
      let $ = E;
      E = A(w), E === $ ? re[E].p(w, k) : (ne(), S(re[$], 1, 1, () => {
        re[$] = null;
      }), le(), H = re[E], H ? H.p(w, k) : (H = re[E] = x[E](w), H.c()), y(H, 1), H.m(e, null));
    },
    i(w) {
      P || (y(u.$$.fragment, w), y(R), y(H), P = !0);
    },
    o(w) {
      S(u.$$.fragment, w), S(R), S(H), P = !1;
    },
    d(w) {
      w && M(e), J(u), R.d(w), B && B.d(), re[E].d();
    }
  };
}
function Zt(n) {
  let e, t;
  return e = new Ue({
    props: {
      variant: "success",
      $$slots: { default: [Ar] },
      $$scope: { ctx: n }
    }
  }), {
    c() {
      G(e.$$.fragment);
    },
    m(l, r) {
      F(e, l, r), t = !0;
    },
    p(l, r) {
      const s = {};
      r[0] & /*$props*/
      1 | r[1] & /*$$scope*/
      16384 && (s.$$scope = { dirty: r, ctx: l }), e.$set(s);
    },
    i(l) {
      t || (y(e.$$.fragment, l), t = !0);
    },
    o(l) {
      S(e.$$.fragment, l), t = !1;
    },
    d(l) {
      J(e, l);
    }
  };
}
function Ar(n) {
  let e = (
    /*plan*/
    n[35].trial_days + ""
  ), t, l;
  return {
    c() {
      t = z(e), l = z(" day trial");
    },
    m(r, s) {
      C(r, t, s), C(r, l, s);
    },
    p(r, s) {
      s[0] & /*$props*/
      1 && e !== (e = /*plan*/
      r[35].trial_days + "") && Q(t, e);
    },
    d(r) {
      r && M(t), r && M(l);
    }
  };
}
function Qt(n) {
  let e, t = (
    /*feature*/
    n[38] + ""
  ), l;
  return {
    c() {
      e = v("li"), l = z(t);
    },
    m(r, s) {
      C(r, e, s), _(e, l);
    },
    p(r, s) {
      s[0] & /*$props*/
      1 && t !== (t = /*feature*/
      r[38] + "") && Q(l, t);
    },
    d(r) {
      r && M(e);
    }
  };
}
function Kt(n) {
  let e, t, l;
  return t = new Ue({
    props: {
      variant: "info",
      $$slots: { default: [Lr] },
      $$scope: { ctx: n }
    }
  }), {
    c() {
      e = v("span"), G(t.$$.fragment), g(e, "class", "inline-block mt-2");
    },
    m(r, s) {
      C(r, e, s), F(t, e, null), l = !0;
    },
    i(r) {
      l || (y(t.$$.fragment, r), l = !0);
    },
    o(r) {
      S(t.$$.fragment, r), l = !1;
    },
    d(r) {
      r && M(e), J(t);
    }
  };
}
function Lr(n) {
  let e;
  return {
    c() {
      e = z("This is your current plan");
    },
    m(t, l) {
      C(t, e, l);
    },
    d(t) {
      t && M(e);
    }
  };
}
function Xt(n) {
  var $e;
  let e, t, l, r = !1, s, i, u, o, f, a, c = (
    /*plan*/
    n[35].title + ""
  ), h, d, m, p, b, Y = (
    /*plan*/
    n[35].description + ""
  ), W, T, E, H, P = (
    /*activePlan*/
    (($e = n[14]) == null ? void 0 : $e.price) === /*getPriceForView*/
    n[20](
      /*plan*/
      n[35]
    ).id && !/*$props*/
    n[0].ended
  ), V, te, R, B = (
    /*getPriceForView*/
    n[20](
      /*plan*/
      n[35]
    ).price + ""
  ), x, re, A, w, k = (
    /*monthly*/
    n[2] ? "mo" : "yr"
  ), L, $, D, q, U, ee, O, K, Z = (
    /*plan*/
    n[35].trial_days && !/*$props*/
    n[0].subscription && Zt(n)
  ), se = (
    /*plan*/
    n[35].features
  ), oe = [];
  for (let j = 0; j < se.length; j += 1)
    oe[j] = Qt(Ht(n, se, j));
  let ie = P && Kt(n);
  return ee = Tn(
    /*$$binding_groups*/
    n[31][0]
  ), {
    c() {
      var j, X, ae;
      e = v("label"), t = v("input"), i = N(), u = v("span"), o = v("span"), f = v("span"), a = v("span"), h = z(c), d = N(), Z && Z.c(), m = N(), p = v("span"), b = v("span"), W = z(Y), T = N(), E = v("ul");
      for (let ge = 0; ge < oe.length; ge += 1)
        oe[ge].c();
      H = N(), ie && ie.c(), V = N(), te = v("span"), R = v("span"), x = z(B), re = N(), A = v("span"), w = z("/"), L = z(k), $ = N(), D = v("span"), q = N(), g(t, "type", "radio"), g(t, "name", "server-size"), t.__value = l = /*getPriceForView*/
      n[20](
        /*plan*/
        n[35]
      ).id, t.value = t.__value, g(t, "class", "sr-only"), g(t, "aria-labelledby", "server-size-0-label"), g(t, "aria-describedby", "server-size-0-description-0 server-size-0-description-1"), t.disabled = s = /*planState*/
      n[9] === /*PlanModalState*/
      n[1].Loading || /*activePlan*/
      ((j = n[14]) == null ? void 0 : j.price) === /*getPriceForView*/
      n[20](
        /*plan*/
        n[35]
      ).id && !/*$props*/
      n[0].ended, g(f, "id", "server-size-0-label"), g(f, "class", "font-medium text-gray-900"), g(E, "class", "list-inside list-disc mt-2"), g(p, "id", "server-size-0-description-0"), g(p, "class", "text-gray-500 text-sm"), g(o, "class", "flex flex-col text-sm"), g(u, "class", "flex items-center"), g(R, "class", "font-medium text-gray-900"), g(A, "class", "ml-1 text-gray-500 sm:ml-0"), g(te, "id", "server-size-0-description-1"), g(te, "class", "mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"), g(D, "class", "pointer-events-none absolute -inset-px rounded-lg border-2"), g(D, "aria-hidden", "true"), g(e, "class", "relative block cursor-pointer rounded-lg border px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between"), ue(
        e,
        "border-gray-300",
        /*getPriceForView*/
        n[20](
          /*plan*/
          n[35]
        ).id !== /*newPlanSelect*/
        n[6]
      ), ue(
        e,
        "border-black",
        /*getPriceForView*/
        n[20](
          /*plan*/
          n[35]
        ).id === /*newPlanSelect*/
        n[6]
      ), ue(
        e,
        "ring-2",
        /*getPriceForView*/
        n[20](
          /*plan*/
          n[35]
        ).id === /*newPlanSelect*/
        n[6]
      ), ue(
        e,
        "ring-black",
        /*getPriceForView*/
        n[20](
          /*plan*/
          n[35]
        ).id === /*newPlanSelect*/
        n[6]
      ), ue(
        e,
        "bg-gray-100",
        /*activePlan*/
        ((X = n[14]) == null ? void 0 : X.price) === /*getPriceForView*/
        n[20](
          /*plan*/
          n[35]
        ).id && !/*$props*/
        n[0].ended
      ), ue(
        e,
        "bg-white",
        /*activePlan*/
        ((ae = n[14]) == null ? void 0 : ae.price) !== /*getPriceForView*/
        n[20](
          /*plan*/
          n[35]
        ).id
      ), ee.p(t);
    },
    m(j, X) {
      C(j, e, X), _(e, t), t.checked = t.__value === /*newPlanSelect*/
      n[6], _(e, i), _(e, u), _(u, o), _(o, f), _(f, a), _(a, h), _(f, d), Z && Z.m(f, null), _(o, m), _(o, p), _(p, b), _(b, W), _(p, T), _(p, E);
      for (let ae = 0; ae < oe.length; ae += 1)
        oe[ae] && oe[ae].m(E, null);
      _(p, H), ie && ie.m(p, null), _(e, V), _(e, te), _(te, R), _(R, x), _(te, re), _(te, A), _(A, w), _(A, L), _(e, $), _(e, D), _(e, q), U = !0, O || (K = Ee(
        t,
        "change",
        /*input_change_handler*/
        n[30]
      ), O = !0);
    },
    p(j, X) {
      var ae, ge, mt, pt;
      if ((!U || X[0] & /*$props*/
      1 && l !== (l = /*getPriceForView*/
      j[20](
        /*plan*/
        j[35]
      ).id)) && (t.__value = l, t.value = t.__value, r = !0), (!U || X[0] & /*planState, PlanModalState, activePlan, $props*/
      16899 && s !== (s = /*planState*/
      j[9] === /*PlanModalState*/
      j[1].Loading || /*activePlan*/
      ((ae = j[14]) == null ? void 0 : ae.price) === /*getPriceForView*/
      j[20](
        /*plan*/
        j[35]
      ).id && !/*$props*/
      j[0].ended)) && (t.disabled = s), (r || X[0] & /*newPlanSelect, $props*/
      65) && (t.checked = t.__value === /*newPlanSelect*/
      j[6]), (!U || X[0] & /*$props*/
      1) && c !== (c = /*plan*/
      j[35].title + "") && Q(h, c), /*plan*/
      j[35].trial_days && !/*$props*/
      j[0].subscription ? Z ? (Z.p(j, X), X[0] & /*$props*/
      1 && y(Z, 1)) : (Z = Zt(j), Z.c(), y(Z, 1), Z.m(f, null)) : Z && (ne(), S(Z, 1, 1, () => {
        Z = null;
      }), le()), (!U || X[0] & /*$props*/
      1) && Y !== (Y = /*plan*/
      j[35].description + "") && Q(W, Y), X[0] & /*$props*/
      1) {
        se = /*plan*/
        j[35].features;
        let pe;
        for (pe = 0; pe < se.length; pe += 1) {
          const ht = Ht(j, se, pe);
          oe[pe] ? oe[pe].p(ht, X) : (oe[pe] = Qt(ht), oe[pe].c(), oe[pe].m(E, null));
        }
        for (; pe < oe.length; pe += 1)
          oe[pe].d(1);
        oe.length = se.length;
      }
      X[0] & /*activePlan, $props*/
      16385 && (P = /*activePlan*/
      ((ge = j[14]) == null ? void 0 : ge.price) === /*getPriceForView*/
      j[20](
        /*plan*/
        j[35]
      ).id && !/*$props*/
      j[0].ended), P ? ie ? X[0] & /*activePlan, $props*/
      16385 && y(ie, 1) : (ie = Kt(j), ie.c(), y(ie, 1), ie.m(p, null)) : ie && (ne(), S(ie, 1, 1, () => {
        ie = null;
      }), le()), (!U || X[0] & /*$props*/
      1) && B !== (B = /*getPriceForView*/
      j[20](
        /*plan*/
        j[35]
      ).price + "") && Q(x, B), (!U || X[0] & /*monthly*/
      4) && k !== (k = /*monthly*/
      j[2] ? "mo" : "yr") && Q(L, k), (!U || X[0] & /*getPriceForView, $props, newPlanSelect*/
      1048641) && ue(
        e,
        "border-gray-300",
        /*getPriceForView*/
        j[20](
          /*plan*/
          j[35]
        ).id !== /*newPlanSelect*/
        j[6]
      ), (!U || X[0] & /*getPriceForView, $props, newPlanSelect*/
      1048641) && ue(
        e,
        "border-black",
        /*getPriceForView*/
        j[20](
          /*plan*/
          j[35]
        ).id === /*newPlanSelect*/
        j[6]
      ), (!U || X[0] & /*getPriceForView, $props, newPlanSelect*/
      1048641) && ue(
        e,
        "ring-2",
        /*getPriceForView*/
        j[20](
          /*plan*/
          j[35]
        ).id === /*newPlanSelect*/
        j[6]
      ), (!U || X[0] & /*getPriceForView, $props, newPlanSelect*/
      1048641) && ue(
        e,
        "ring-black",
        /*getPriceForView*/
        j[20](
          /*plan*/
          j[35]
        ).id === /*newPlanSelect*/
        j[6]
      ), (!U || X[0] & /*activePlan, getPriceForView, $props*/
      1064961) && ue(
        e,
        "bg-gray-100",
        /*activePlan*/
        ((mt = j[14]) == null ? void 0 : mt.price) === /*getPriceForView*/
        j[20](
          /*plan*/
          j[35]
        ).id && !/*$props*/
        j[0].ended
      ), (!U || X[0] & /*activePlan, getPriceForView, $props*/
      1064961) && ue(
        e,
        "bg-white",
        /*activePlan*/
        ((pt = j[14]) == null ? void 0 : pt.price) !== /*getPriceForView*/
        j[20](
          /*plan*/
          j[35]
        ).id
      );
    },
    i(j) {
      U || (y(Z), y(ie), U = !0);
    },
    o(j) {
      S(Z), S(ie), U = !1;
    },
    d(j) {
      j && M(e), Z && Z.d(), Xe(oe, j), ie && ie.d(), ee.r(), O = !1, K();
    }
  };
}
function xt(n) {
  let e, t, l = (
    /*$props*/
    n[0].plans
  ), r = [];
  for (let i = 0; i < l.length; i += 1)
    r[i] = Xt(Pt(n, l, i));
  const s = (i) => S(r[i], 1, 1, () => {
    r[i] = null;
  });
  return {
    c() {
      for (let i = 0; i < r.length; i += 1)
        r[i].c();
      e = be();
    },
    m(i, u) {
      for (let o = 0; o < r.length; o += 1)
        r[o] && r[o].m(i, u);
      C(i, e, u), t = !0;
    },
    p(i, u) {
      if (u[0] & /*getPriceForView, $props, newPlanSelect, activePlan, monthly, planState, PlanModalState*/
      1065543) {
        l = /*$props*/
        i[0].plans;
        let o;
        for (o = 0; o < l.length; o += 1) {
          const f = Pt(i, l, o);
          r[o] ? (r[o].p(f, u), y(r[o], 1)) : (r[o] = Xt(f), r[o].c(), y(r[o], 1), r[o].m(e.parentNode, e));
        }
        for (ne(), o = l.length; o < r.length; o += 1)
          s(o);
        le();
      }
    },
    i(i) {
      if (!t) {
        for (let u = 0; u < l.length; u += 1)
          y(r[u]);
        t = !0;
      }
    },
    o(i) {
      r = r.filter(Boolean);
      for (let u = 0; u < r.length; u += 1)
        S(r[u]);
      t = !1;
    },
    d(i) {
      Xe(r, i), i && M(e);
    }
  };
}
function en(n) {
  let e, t;
  return {
    c() {
      e = v("p"), t = z(
        /*planMessage*/
        n[8]
      ), g(e, "class", "text-red-500");
    },
    m(l, r) {
      C(l, e, r), _(e, t);
    },
    p(l, r) {
      r[0] & /*planMessage*/
      256 && Q(
        t,
        /*planMessage*/
        l[8]
      );
    },
    d(l) {
      l && M(e);
    }
  };
}
function Nr(n) {
  let e, t;
  return e = new me({
    props: {
      class: "w-full text-center justify-center",
      disabled: !/*newPlanSelect*/
      n[6] || /*planState*/
      n[9] === /*PlanModalState*/
      n[1].Loading,
      $$slots: { default: [Pr] },
      $$scope: { ctx: n }
    }
  }), e.$on(
    "click",
    /*onPlanSelected*/
    n[15]
  ), {
    c() {
      G(e.$$.fragment);
    },
    m(l, r) {
      F(e, l, r), t = !0;
    },
    p(l, r) {
      const s = {};
      r[0] & /*newPlanSelect, planState, PlanModalState*/
      578 && (s.disabled = !/*newPlanSelect*/
      l[6] || /*planState*/
      l[9] === /*PlanModalState*/
      l[1].Loading), r[1] & /*$$scope*/
      16384 && (s.$$scope = { dirty: r, ctx: l }), e.$set(s);
    },
    i(l) {
      t || (y(e.$$.fragment, l), t = !0);
    },
    o(l) {
      S(e.$$.fragment, l), t = !1;
    },
    d(l) {
      J(e, l);
    }
  };
}
function zr(n) {
  let e, t;
  return e = new me({
    props: {
      class: "w-full text-center justify-center",
      disabled: !/*newPlanSelect*/
      n[6] || /*planState*/
      n[9] === /*PlanModalState*/
      n[1].Loading,
      $$slots: { default: [Hr] },
      $$scope: { ctx: n }
    }
  }), e.$on(
    "click",
    /*onPlanSelected*/
    n[15]
  ), {
    c() {
      G(e.$$.fragment);
    },
    m(l, r) {
      F(e, l, r), t = !0;
    },
    p(l, r) {
      const s = {};
      r[0] & /*newPlanSelect, planState, PlanModalState*/
      578 && (s.disabled = !/*newPlanSelect*/
      l[6] || /*planState*/
      l[9] === /*PlanModalState*/
      l[1].Loading), r[1] & /*$$scope*/
      16384 && (s.$$scope = { dirty: r, ctx: l }), e.$set(s);
    },
    i(l) {
      t || (y(e.$$.fragment, l), t = !0);
    },
    o(l) {
      S(e.$$.fragment, l), t = !1;
    },
    d(l) {
      J(e, l);
    }
  };
}
function Pr(n) {
  let e;
  return {
    c() {
      e = z("Subscribe");
    },
    m(t, l) {
      C(t, e, l);
    },
    d(t) {
      t && M(e);
    }
  };
}
function Hr(n) {
  let e;
  return {
    c() {
      e = z("Change Plan");
    },
    m(t, l) {
      C(t, e, l);
    },
    d(t) {
      t && M(e);
    }
  };
}
function Br(n) {
  let e, t, l, r;
  const s = [Or, jr], i = [];
  function u(o, f) {
    return (
      /*planState*/
      o[9] !== /*PlanModalState*/
      o[1].Success ? 0 : 1
    );
  }
  return e = u(n), t = i[e] = s[e](n), {
    c() {
      t.c(), l = be();
    },
    m(o, f) {
      i[e].m(o, f), C(o, l, f), r = !0;
    },
    p(o, f) {
      let a = e;
      e = u(o), e === a ? i[e].p(o, f) : (ne(), S(i[a], 1, 1, () => {
        i[a] = null;
      }), le(), t = i[e], t ? t.p(o, f) : (t = i[e] = s[e](o), t.c()), y(t, 1), t.m(l.parentNode, l));
    },
    i(o) {
      r || (y(t), r = !0);
    },
    o(o) {
      S(t), r = !1;
    },
    d(o) {
      i[e].d(o), o && M(l);
    }
  };
}
function Ir(n) {
  let e, t, l, r, s, i, u, o, f = (
    /*$props*/
    n[0].company_display_name + ""
  ), a, c, h, d, m, p, b = (
    /*$props*/
    n[0].customer_display_name + ""
  ), Y, W, T, E, H, P, V, te, R, B, x, re, A, w, k, L;
  return H = new lt({
    props: {
      title: "My Subscription",
      $$slots: { default: [pr] },
      $$scope: { ctx: n }
    }
  }), V = new lt({
    props: {
      title: "Payment Methods",
      $$slots: { default: [vr] },
      $$scope: { ctx: n }
    }
  }), R = new lt({
    props: {
      title: "Invoices",
      $$slots: { default: [Tr] },
      $$scope: { ctx: n }
    }
  }), x = new zl({
    props: {
      visible: (
        /*paymentModalVisible*/
        n[5]
      ),
      priceId: (
        /*priceAfterPayment*/
        n[3]
      ),
      plan: (
        /*planAfterPayment*/
        n[4]
      ),
      onSuccess: (
        /*onPaymentModalSuccess*/
        n[19]
      )
    }
  }), x.$on(
    "close",
    /*onPaymentModalClose*/
    n[18]
  ), A = new _t({
    props: {
      visible: (
        /*planSelectModalVisible*/
        n[7]
      ),
      $$slots: { default: [Br] },
      $$scope: { ctx: n }
    }
  }), A.$on(
    "close",
    /*closePlanModal*/
    n[21]
  ), k = new rr({
    props: {
      title: "Cancel Subscription",
      content: "Are you sure you wish to cancel your subscription? You will be able to continue to use the product until the end of your billing period.",
      visible: (
        /*cancelModalVisible*/
        n[10]
      ),
      confirmLoading: (
        /*cancelLoading*/
        n[11]
      )
    }
  }), k.$on(
    "close",
    /*close_handler*/
    n[32]
  ), k.$on(
    "confirm",
    /*cancelSubscription*/
    n[16]
  ), {
    c() {
      e = v("div"), t = v("div"), l = v("div"), r = v("div"), s = v("div"), i = v("p"), i.innerHTML = '<a href="/">← Back to app</a>', u = N(), o = v("h1"), a = z(f), c = N(), h = v("h3"), h.textContent = "Billing Portal", d = N(), m = v("p"), p = z("Customer: "), Y = z(b), W = N(), T = v("div"), E = v("div"), G(H.$$.fragment), P = N(), G(V.$$.fragment), te = N(), G(R.$$.fragment), B = N(), G(x.$$.fragment), re = N(), G(A.$$.fragment), w = N(), G(k.$$.fragment), g(i, "class", "hover:underline text-gray-900"), g(o, "class", "text-4xl font-bold mt-6"), g(h, "class", "text-xl mt-2"), g(m, "class", "mt-2 text-gray-600 text-sm"), g(s, "class", "max-w-2xl mx-auto"), g(r, "class", "bg-white px-4 py-12 border-b border-b-gray-200"), g(E, "class", "max-w-2xl mx-auto space-y-6"), g(T, "class", "py-12 px-4"), g(l, "class", ""), g(t, "class", ""), g(e, "class", "");
    },
    m($, D) {
      C($, e, D), _(e, t), _(t, l), _(l, r), _(r, s), _(s, i), _(s, u), _(s, o), _(o, a), _(s, c), _(s, h), _(s, d), _(s, m), _(m, p), _(m, Y), _(l, W), _(l, T), _(T, E), F(H, E, null), _(E, P), F(V, E, null), _(E, te), F(R, E, null), C($, B, D), F(x, $, D), C($, re, D), F(A, $, D), C($, w, D), F(k, $, D), L = !0;
    },
    p($, D) {
      (!L || D[0] & /*$props*/
      1) && f !== (f = /*$props*/
      $[0].company_display_name + "") && Q(a, f), (!L || D[0] & /*$props*/
      1) && b !== (b = /*$props*/
      $[0].customer_display_name + "") && Q(Y, b);
      const q = {};
      D[0] & /*cancelModalVisible, planSelectModalVisible, $props, resumeLoading, activePlan*/
      21633 | D[1] & /*$$scope*/
      16384 && (q.$$scope = { dirty: D, ctx: $ }), H.$set(q);
      const U = {};
      D[0] & /*$props*/
      1 | D[1] & /*$$scope*/
      16384 && (U.$$scope = { dirty: D, ctx: $ }), V.$set(U);
      const ee = {};
      D[0] & /*invoicePromise*/
      8192 | D[1] & /*$$scope*/
      16384 && (ee.$$scope = { dirty: D, ctx: $ }), R.$set(ee);
      const O = {};
      D[0] & /*paymentModalVisible*/
      32 && (O.visible = /*paymentModalVisible*/
      $[5]), D[0] & /*priceAfterPayment*/
      8 && (O.priceId = /*priceAfterPayment*/
      $[3]), D[0] & /*planAfterPayment*/
      16 && (O.plan = /*planAfterPayment*/
      $[4]), x.$set(O);
      const K = {};
      D[0] & /*planSelectModalVisible*/
      128 && (K.visible = /*planSelectModalVisible*/
      $[7]), D[0] & /*newPlanSelect, planState, PlanModalState, activePlan, planMessage, monthly, $props*/
      17223 | D[1] & /*$$scope*/
      16384 && (K.$$scope = { dirty: D, ctx: $ }), A.$set(K);
      const Z = {};
      D[0] & /*cancelModalVisible*/
      1024 && (Z.visible = /*cancelModalVisible*/
      $[10]), D[0] & /*cancelLoading*/
      2048 && (Z.confirmLoading = /*cancelLoading*/
      $[11]), k.$set(Z);
    },
    i($) {
      L || (y(H.$$.fragment, $), y(V.$$.fragment, $), y(R.$$.fragment, $), y(x.$$.fragment, $), y(A.$$.fragment, $), y(k.$$.fragment, $), L = !0);
    },
    o($) {
      S(H.$$.fragment, $), S(V.$$.fragment, $), S(R.$$.fragment, $), S(x.$$.fragment, $), S(A.$$.fragment, $), S(k.$$.fragment, $), L = !1;
    },
    d($) {
      $ && M(e), J(H), J(V), J(R), $ && M(B), J(x, $), $ && M(re), J(A, $), $ && M(w), J(k, $);
    }
  };
}
function Rr(n, e, t) {
  let l, r;
  ut(n, Me, (O) => t(0, r = O));
  var s;
  (function(O) {
    O[O.Idle = 0] = "Idle", O[O.Loading = 1] = "Loading", O[O.Success = 2] = "Success", O[O.Error = 3] = "Error";
  })(s || (s = {}));
  let { _props: i } = e;
  He(Me, r = i, r);
  let u = !0, o = null, f = null, a = !1, c = null, h = !1, d = "", m = s.Idle, p = !1, b = !1, Y = !1, W = null;
  cn(() => {
    t(13, W = V());
  });
  function T(O) {
    var K, Z;
    if (!O || O.stripe_status == "canceled")
      return null;
    for (const se of r.plans) {
      if (((K = se.prices.monthly) == null ? void 0 : K.id) === O.subscription_items[0].stripe_price_id)
        return {
          plan: se,
          price: se.prices.monthly.id,
          type: "monthly"
        };
      if (((Z = se.prices.yearly) == null ? void 0 : Z.id) === O.subscription_items[0].stripe_price_id)
        return {
          plan: se,
          price: se.prices.yearly.id,
          type: "yearly"
        };
    }
    return null;
  }
  async function E() {
    if (t(9, m = s.Loading), !l) {
      const O = await ve.url("/checkout-subscription").post({ price_id: c }).json();
      O.message ? (t(9, m = s.Error), t(8, d = O.message)) : window.location.href = O.url;
      return;
    }
    await gn({
      priceId: c,
      onErrorMessage(O) {
        t(9, m = s.Error), t(8, d = O);
      },
      onNextAction({ error: O, paymentIntent: K }) {
        O ? (t(8, d = "We failed to charge your payment method. Please try a different payment method."), t(9, m = s.Error)) : (K == null ? void 0 : K.status) == "succeeded" ? t(9, m = s.Success) : (K == null ? void 0 : K.status) == "processing";
      },
      onSuccess(O) {
        He(Me, r = O.props, r), t(9, m = s.Success), t(13, W = V());
      }
    });
  }
  async function H() {
    t(11, b = !0);
    const O = await ve.url("/subscriptions").delete().json();
    He(Me, r = O.props, r), t(11, b = !1), t(10, p = !1);
  }
  async function P() {
    t(12, Y = !0);
    const O = await ve.url("/subscriptions/resume").post().json();
    He(Me, r = O.props, r), t(12, Y = !1);
  }
  function V() {
    return ve.url("/invoices").get().json();
  }
  function te() {
    t(5, a = !1), t(3, o = null), t(4, f = null);
  }
  function R(O) {
    He(Me, r = O.props, r), t(13, W = V());
  }
  function B(O) {
    return u ? O.prices.monthly : O.prices.yearly;
  }
  function x() {
    t(7, h = !1), t(9, m = s.Idle), t(8, d = ""), t(6, c = null);
  }
  async function re() {
    const O = await ve.url("/checkout-setup").post().json();
    window.location.href = O.url;
  }
  const A = [[]], w = () => t(7, h = !0), k = () => t(7, h = !0), L = () => t(10, p = !0), $ = () => t(7, h = !0), D = () => t(6, c = null);
  function q(O) {
    u = O, t(2, u);
  }
  function U() {
    c = this.__value, t(6, c);
  }
  const ee = () => t(10, p = !1);
  return n.$$set = (O) => {
    "_props" in O && t(23, i = O._props);
  }, n.$$.update = () => {
    n.$$.dirty[0] & /*$props*/
    1 && t(14, l = T(r.subscription));
  }, [
    r,
    s,
    u,
    o,
    f,
    a,
    c,
    h,
    d,
    m,
    p,
    b,
    Y,
    W,
    l,
    E,
    H,
    P,
    te,
    R,
    B,
    x,
    re,
    i,
    w,
    k,
    L,
    $,
    D,
    q,
    U,
    A,
    ee
  ];
}
class Ur extends _e {
  constructor(e) {
    super(), de(this, e, Rr, Ir, ce, { _props: 23 }, null, [-1, -1]);
  }
}
const vn = document.getElementById("__bankroll-app"), qr = JSON.parse(vn.dataset.props);
_l(
  document.querySelector('meta[name="stripe-pk"]').getAttribute("content")
);
new Ur({
  target: vn,
  props: { _props: qr }
});
