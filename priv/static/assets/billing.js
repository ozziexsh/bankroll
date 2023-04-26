function z() {
}
const ot = (t) => t;
function ye(t, e) {
  for (const n in e)
    t[n] = e[n];
  return t;
}
function ut(t) {
  return t();
}
function Be() {
  return /* @__PURE__ */ Object.create(null);
}
function F(t) {
  t.forEach(ut);
}
function Ee(t) {
  return typeof t == "function";
}
function V(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function kt(t) {
  return Object.keys(t).length === 0;
}
function Et(t, ...e) {
  if (t == null)
    return z;
  const n = t.subscribe(...e);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
function ct(t, e, n) {
  t.$$.on_destroy.push(Et(e, n));
}
function xe(t, e, n, r) {
  if (t) {
    const s = at(t, e, n, r);
    return t[0](s);
  }
}
function at(t, e, n, r) {
  return t[1] && r ? ye(n.ctx.slice(), t[1](r(e))) : n.ctx;
}
function qe(t, e, n, r) {
  if (t[2] && r) {
    const s = t[2](r(n));
    if (e.dirty === void 0)
      return s;
    if (typeof s == "object") {
      const l = [], i = Math.max(e.dirty.length, s.length);
      for (let u = 0; u < i; u += 1)
        l[u] = e.dirty[u] | s[u];
      return l;
    }
    return e.dirty | s;
  }
  return e.dirty;
}
function Oe(t, e, n, r, s, l) {
  if (s) {
    const i = at(e, n, r, l);
    t.p(i, s);
  }
}
function Ae(t) {
  if (t.ctx.length > 32) {
    const e = [], n = t.ctx.length / 32;
    for (let r = 0; r < n; r++)
      e[r] = -1;
    return e;
  }
  return -1;
}
function He(t) {
  const e = {};
  for (const n in t)
    n[0] !== "$" && (e[n] = t[n]);
  return e;
}
function fe(t, e, n) {
  return t.set(n), e;
}
function jt(t) {
  return t && Ee(t.destroy) ? t.destroy : z;
}
const ft = typeof window < "u";
let St = ft ? () => window.performance.now() : () => Date.now(), Pe = ft ? (t) => requestAnimationFrame(t) : z;
const se = /* @__PURE__ */ new Set();
function dt(t) {
  se.forEach((e) => {
    e.c(t) || (se.delete(e), e.f());
  }), se.size !== 0 && Pe(dt);
}
function Ct(t) {
  let e;
  return se.size === 0 && Pe(dt), {
    promise: new Promise((n) => {
      se.add(e = { c: t, f: n });
    }),
    abort() {
      se.delete(e);
    }
  };
}
function m(t, e) {
  t.appendChild(e);
}
function pt(t) {
  if (!t)
    return document;
  const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
  return e && e.host ? e : t.ownerDocument;
}
function Mt(t) {
  const e = v("style");
  return Tt(pt(t), e), e.sheet;
}
function Tt(t, e) {
  return m(t.head || t, e), e.sheet;
}
function S(t, e, n) {
  t.insertBefore(e, n || null);
}
function j(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function _t(t, e) {
  for (let n = 0; n < t.length; n += 1)
    t[n] && t[n].d(e);
}
function v(t) {
  return document.createElement(t);
}
function $e(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function P(t) {
  return document.createTextNode(t);
}
function q() {
  return P(" ");
}
function Le() {
  return P("");
}
function _e(t, e, n, r) {
  return t.addEventListener(e, n, r), () => t.removeEventListener(e, n, r);
}
function xt(t) {
  return function(e) {
    return e.preventDefault(), t.call(this, e);
  };
}
function h(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function Ue(t, e) {
  const n = Object.getOwnPropertyDescriptors(t.__proto__);
  for (const r in e)
    e[r] == null ? t.removeAttribute(r) : r === "style" ? t.style.cssText = e[r] : r === "__value" ? t.value = t[r] = e[r] : n[r] && n[r].set ? t[r] = e[r] : h(t, r, e[r]);
}
function qt(t) {
  return Array.from(t.childNodes);
}
function Y(t, e) {
  e = "" + e, t.data !== e && (t.data = e);
}
function U(t, e, n) {
  t.classList[n ? "add" : "remove"](e);
}
function mt(t, e, { bubbles: n = !1, cancelable: r = !1 } = {}) {
  const s = document.createEvent("CustomEvent");
  return s.initCustomEvent(t, n, r, e), s;
}
const ve = /* @__PURE__ */ new Map();
let we = 0;
function Ot(t) {
  let e = 5381, n = t.length;
  for (; n--; )
    e = (e << 5) - e ^ t.charCodeAt(n);
  return e >>> 0;
}
function At(t, e) {
  const n = { stylesheet: Mt(e), rules: {} };
  return ve.set(t, n), n;
}
function Je(t, e, n, r, s, l, i, u = 0) {
  const o = 16.666 / r;
  let a = `{
`;
  for (let _ = 0; _ <= 1; _ += o) {
    const T = e + (n - e) * l(_);
    a += _ * 100 + `%{${i(T, 1 - T)}}
`;
  }
  const c = a + `100% {${i(n, 1 - n)}}
}`, p = `__svelte_${Ot(c)}_${u}`, f = pt(t), { stylesheet: d, rules: b } = ve.get(f) || At(f, t);
  b[p] || (b[p] = !0, d.insertRule(`@keyframes ${p} ${c}`, d.cssRules.length));
  const E = t.style.animation || "";
  return t.style.animation = `${E ? `${E}, ` : ""}${p} ${r}ms linear ${s}ms 1 both`, we += 1, p;
}
function Pt(t, e) {
  const n = (t.style.animation || "").split(", "), r = n.filter(
    e ? (l) => l.indexOf(e) < 0 : (l) => l.indexOf("__svelte") === -1
    // remove all Svelte animations
  ), s = n.length - r.length;
  s && (t.style.animation = r.join(", "), we -= s, we || Lt());
}
function Lt() {
  Pe(() => {
    we || (ve.forEach((t) => {
      const { ownerNode: e } = t.stylesheet;
      e && j(e);
    }), ve.clear());
  });
}
let me;
function de(t) {
  me = t;
}
function Nt() {
  if (!me)
    throw new Error("Function called outside component initialization");
  return me;
}
function Rt() {
  const t = Nt();
  return (e, n, { cancelable: r = !1 } = {}) => {
    const s = t.$$.callbacks[e];
    if (s) {
      const l = mt(e, n, { cancelable: r });
      return s.slice().forEach((i) => {
        i.call(t, l);
      }), !l.defaultPrevented;
    }
    return !0;
  };
}
function zt(t, e) {
  const n = t.$$.callbacks[e.type];
  n && n.slice().forEach((r) => r.call(this, e));
}
const re = [], ke = [];
let ie = [];
const Me = [], It = /* @__PURE__ */ Promise.resolve();
let Te = !1;
function Dt() {
  Te || (Te = !0, It.then(ht));
}
function le(t) {
  ie.push(t);
}
function Ye(t) {
  Me.push(t);
}
const je = /* @__PURE__ */ new Set();
let te = 0;
function ht() {
  if (te !== 0)
    return;
  const t = me;
  do {
    try {
      for (; te < re.length; ) {
        const e = re[te];
        te++, de(e), Bt(e.$$);
      }
    } catch (e) {
      throw re.length = 0, te = 0, e;
    }
    for (de(null), re.length = 0, te = 0; ke.length; )
      ke.pop()();
    for (let e = 0; e < ie.length; e += 1) {
      const n = ie[e];
      je.has(n) || (je.add(n), n());
    }
    ie.length = 0;
  } while (re.length);
  for (; Me.length; )
    Me.pop()();
  Te = !1, je.clear(), de(t);
}
function Bt(t) {
  if (t.fragment !== null) {
    t.update(), F(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(le);
  }
}
function Ht(t) {
  const e = [], n = [];
  ie.forEach((r) => t.indexOf(r) === -1 ? e.push(r) : n.push(r)), n.forEach((r) => r()), ie = e;
}
let ae;
function Ut() {
  return ae || (ae = Promise.resolve(), ae.then(() => {
    ae = null;
  })), ae;
}
function Se(t, e, n) {
  t.dispatchEvent(mt(`${e ? "intro" : "outro"}${n}`));
}
const ge = /* @__PURE__ */ new Set();
let H;
function Q() {
  H = {
    r: 0,
    c: [],
    p: H
    // parent group
  };
}
function K() {
  H.r || F(H.c), H = H.p;
}
function k(t, e) {
  t && t.i && (ge.delete(t), t.i(e));
}
function C(t, e, n, r) {
  if (t && t.o) {
    if (ge.has(t))
      return;
    ge.add(t), H.c.push(() => {
      ge.delete(t), r && (n && t.d(1), r());
    }), t.o(e);
  } else
    r && r();
}
const Jt = { duration: 0 };
function be(t, e, n, r) {
  const s = { direction: "both" };
  let l = e(t, n, s), i = r ? 0 : 1, u = null, o = null, a = null;
  function c() {
    a && Pt(t, a);
  }
  function p(d, b) {
    const E = d.b - i;
    return b *= Math.abs(E), {
      a: i,
      b: d.b,
      d: E,
      duration: b,
      start: d.start,
      end: d.start + b,
      group: d.group
    };
  }
  function f(d) {
    const { delay: b = 0, duration: E = 300, easing: _ = ot, tick: T = z, css: M } = l || Jt, g = {
      start: St() + b,
      b: d
    };
    d || (g.group = H, H.r += 1), u || o ? o = g : (M && (c(), a = Je(t, i, d, E, b, _, M)), d && T(0, 1), u = p(g, E), le(() => Se(t, d, "start")), Ct(($) => {
      if (o && $ > o.start && (u = p(o, E), o = null, Se(t, u.b, "start"), M && (c(), a = Je(t, i, u.b, u.duration, 0, _, l.css))), u) {
        if ($ >= u.end)
          T(i = u.b, 1 - i), Se(t, u.b, "end"), o || (u.b ? c() : --u.group.r || F(u.group.c)), u = null;
        else if ($ >= u.start) {
          const y = $ - u.start;
          i = u.a + u.d * _(y / u.duration), T(i, 1 - i);
        }
      }
      return !!(u || o);
    }));
  }
  return {
    run(d) {
      Ee(l) ? Ut().then(() => {
        l = l(s), f(d);
      }) : f(d);
    },
    end() {
      c(), u = o = null;
    }
  };
}
function Yt(t, e) {
  const n = {}, r = {}, s = { $$scope: 1 };
  let l = t.length;
  for (; l--; ) {
    const i = t[l], u = e[l];
    if (u) {
      for (const o in i)
        o in u || (r[o] = 1);
      for (const o in u)
        s[o] || (n[o] = u[o], s[o] = 1);
      t[l] = u;
    } else
      for (const o in i)
        s[o] = 1;
  }
  for (const i in r)
    i in n || (n[i] = void 0);
  return n;
}
function Fe(t, e, n) {
  const r = t.$$.props[e];
  r !== void 0 && (t.$$.bound[r] = n, n(t.$$.ctx[r]));
}
function B(t) {
  t && t.c();
}
function I(t, e, n, r) {
  const { fragment: s, after_update: l } = t.$$;
  s && s.m(e, n), r || le(() => {
    const i = t.$$.on_mount.map(ut).filter(Ee);
    t.$$.on_destroy ? t.$$.on_destroy.push(...i) : F(i), t.$$.on_mount = [];
  }), l.forEach(le);
}
function D(t, e) {
  const n = t.$$;
  n.fragment !== null && (Ht(n.after_update), F(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function Ft(t, e) {
  t.$$.dirty[0] === -1 && (re.push(t), Dt(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function ue(t, e, n, r, s, l, i, u = [-1]) {
  const o = me;
  de(t);
  const a = t.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: l,
    update: z,
    not_equal: s,
    bound: Be(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (o ? o.$$.context : [])),
    // everything else
    callbacks: Be(),
    dirty: u,
    skip_bound: !1,
    root: e.target || o.$$.root
  };
  i && i(a.root);
  let c = !1;
  if (a.ctx = n ? n(t, e.props || {}, (p, f, ...d) => {
    const b = d.length ? d[0] : f;
    return a.ctx && s(a.ctx[p], a.ctx[p] = b) && (!a.skip_bound && a.bound[p] && a.bound[p](b), c && Ft(t, p)), f;
  }) : [], a.update(), c = !0, F(a.before_update), a.fragment = r ? r(a.ctx) : !1, e.target) {
    if (e.hydrate) {
      const p = qt(e.target);
      a.fragment && a.fragment.l(p), p.forEach(j);
    } else
      a.fragment && a.fragment.c();
    e.intro && k(t.$$.fragment), I(t, e.target, e.anchor, e.customElement), ht();
  }
  de(o);
}
class ce {
  $destroy() {
    D(this, 1), this.$destroy = z;
  }
  $on(e, n) {
    if (!Ee(n))
      return z;
    const r = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return r.push(n), () => {
      const s = r.indexOf(n);
      s !== -1 && r.splice(s, 1);
    };
  }
  $set(e) {
    this.$$set && !kt(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
}
const Gt = "application/json", bt = "Content-Type", Ce = Symbol();
function Ge(t = {}) {
  var e;
  return (e = Object.entries(t).find(([n]) => n.toLowerCase() === bt.toLowerCase())) === null || e === void 0 ? void 0 : e[1];
}
function We(t) {
  return /^application\/.*json.*/.test(t);
}
const Z = function(t, e, n = !1) {
  return Object.entries(e).reduce((r, [s, l]) => {
    const i = t[s];
    return Array.isArray(i) && Array.isArray(l) ? r[s] = n ? [...i, ...l] : l : typeof i == "object" && typeof l == "object" ? r[s] = Z(i, l, n) : r[s] = l, r;
  }, { ...t });
}, oe = {
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
  polyfill(t, e = !0, n = !1, ...r) {
    const s = this.polyfills[t] || (typeof self < "u" ? self[t] : null) || (typeof global < "u" ? global[t] : null);
    if (e && !s)
      throw new Error(t + " is not defined");
    return n && s ? new s(...r) : s;
  }
};
function Wt(t, e = !1) {
  oe.options = e ? t : Z(oe.options, t);
}
function Zt(t, e = !1) {
  oe.polyfills = e ? t : Z(oe.polyfills, t);
}
function Qt(t) {
  oe.errorType = t;
}
const Kt = (t) => (e) => t.reduceRight((n, r) => r(n), e) || e;
class gt extends Error {
}
const Xt = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  t = t._addons.reduce((g, $) => $.beforeRequest && $.beforeRequest(g, t._options, e) || g, t);
  const { _url: n, _options: r, _config: s, _catchers: l, _resolvers: i, _middlewares: u, _addons: o } = t, a = new Map(l), c = Z(s.options, r);
  let p = n;
  const f = Kt(u)((g, $) => (p = g, s.polyfill("fetch")(g, $)))(n, c), d = new Error(), b = f.catch((g) => {
    throw { __wrap: g };
  }).then((g) => {
    if (!g.ok) {
      const $ = new gt();
      if ($.cause = d, $.stack = $.stack + `
CAUSE: ` + d.stack, $.response = g, $.url = p, g.type === "opaque")
        throw $;
      return g.text().then((y) => {
        var x;
        if ($.message = y, s.errorType === "json" || ((x = g.headers.get("Content-Type")) === null || x === void 0 ? void 0 : x.split(";")[0]) === "application/json")
          try {
            $.json = JSON.parse(y);
          } catch {
          }
        throw $.text = y, $.status = g.status, $;
      });
    }
    return g;
  }), E = (g) => g.catch(($) => {
    const y = $.__wrap || $, x = y.status && a.get(y.status) || a.get(y.name) || $.__wrap && a.has(Ce) && a.get(Ce);
    if (x)
      return x(y, t);
    throw y;
  }), _ = (g) => ($) => /* If a callback is provided, then callback with the body result otherwise return the parsed body itself. */ E(g ? b.then((y) => y && y[g]()).then((y) => $ ? $(y) : y) : b.then((y) => $ ? $(y) : y)), T = {
    _wretchReq: t,
    _fetchReq: f,
    _sharedState: e,
    res: _(null),
    json: _("json"),
    blob: _("blob"),
    formData: _("formData"),
    arrayBuffer: _("arrayBuffer"),
    text: _("text"),
    error(g, $) {
      return a.set(g, $), this;
    },
    badRequest(g) {
      return this.error(400, g);
    },
    unauthorized(g) {
      return this.error(401, g);
    },
    forbidden(g) {
      return this.error(403, g);
    },
    notFound(g) {
      return this.error(404, g);
    },
    timeout(g) {
      return this.error(408, g);
    },
    internalError(g) {
      return this.error(500, g);
    },
    fetchError(g) {
      return this.error(Ce, g);
    }
  }, M = o.reduce((g, $) => ({
    ...g,
    ...$.resolver
  }), T);
  return i.reduce((g, $) => $(g, t), M);
}, Vt = {
  _url: "",
  _options: {},
  _config: oe,
  _catchers: /* @__PURE__ */ new Map(),
  _resolvers: [],
  _deferred: [],
  _middlewares: [],
  _addons: [],
  addon(t) {
    return { ...this, _addons: [...this._addons, t], ...t.wretch };
  },
  errorType(t) {
    return {
      ...this,
      _config: {
        ...this._config,
        errorType: t
      }
    };
  },
  polyfills(t, e = !1) {
    return {
      ...this,
      _config: {
        ...this._config,
        polyfills: e ? t : Z(this._config.polyfills, t)
      }
    };
  },
  url(t, e = !1) {
    if (e)
      return { ...this, _url: t };
    const n = this._url.split("?");
    return {
      ...this,
      _url: n.length > 1 ? n[0] + t + "?" + n[1] : this._url + t
    };
  },
  options(t, e = !1) {
    return { ...this, _options: e ? t : Z(this._options, t) };
  },
  headers(t) {
    return { ...this, _options: Z(this._options, { headers: t || {} }) };
  },
  accept(t) {
    return this.headers({ Accept: t });
  },
  content(t) {
    return this.headers({ [bt]: t });
  },
  auth(t) {
    return this.headers({ Authorization: t });
  },
  catcher(t, e) {
    const n = new Map(this._catchers);
    return n.set(t, e), { ...this, _catchers: n };
  },
  resolve(t, e = !1) {
    return { ...this, _resolvers: e ? [t] : [...this._resolvers, t] };
  },
  defer(t, e = !1) {
    return {
      ...this,
      _deferred: e ? [t] : [...this._deferred, t]
    };
  },
  middlewares(t, e = !1) {
    return {
      ...this,
      _middlewares: e ? t : [...this._middlewares, ...t]
    };
  },
  fetch(t = this._options.method, e = "", n = null) {
    let r = this.url(e).options({ method: t });
    const s = Ge(r._options.headers), l = typeof n == "object" && (!r._options.headers || !s || We(s));
    return r = n ? l ? r.json(n, s) : r.body(n) : r, Xt(r._deferred.reduce((i, u) => u(i, i._url, i._options), r));
  },
  get(t = "") {
    return this.fetch("GET", t);
  },
  delete(t = "") {
    return this.fetch("DELETE", t);
  },
  put(t, e = "") {
    return this.fetch("PUT", e, t);
  },
  post(t, e = "") {
    return this.fetch("POST", e, t);
  },
  patch(t, e = "") {
    return this.fetch("PATCH", e, t);
  },
  head(t = "") {
    return this.fetch("HEAD", t);
  },
  opts(t = "") {
    return this.fetch("OPTIONS", t);
  },
  body(t) {
    return { ...this, _options: { ...this._options, body: t } };
  },
  json(t, e) {
    const n = Ge(this._options.headers);
    return this.content(e || We(n) && n || Gt).body(JSON.stringify(t));
  }
};
function X(t = "", e = {}) {
  return { ...Vt, _url: t, _options: e };
}
X.default = X;
X.options = Wt;
X.errorType = Qt;
X.polyfills = Zt;
X.WretchError = gt;
const pe = X("http://localhost:4000", { mode: "cors" }).headers({
  "x-csrf-token": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
});
function en(t) {
  let e, n, r, s, l;
  const i = (
    /*#slots*/
    t[2].default
  ), u = xe(
    i,
    t,
    /*$$scope*/
    t[1],
    null
  );
  let o = [
    /*$$props*/
    t[0],
    {
      class: n = `inline-flex items-center rounded-md bg-black px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 ${/*$$props*/
      t[0].class}`
    }
  ], a = {};
  for (let c = 0; c < o.length; c += 1)
    a = ye(a, o[c]);
  return {
    c() {
      e = v("button"), u && u.c(), Ue(e, a);
    },
    m(c, p) {
      S(c, e, p), u && u.m(e, null), e.autofocus && e.focus(), r = !0, s || (l = _e(
        e,
        "click",
        /*click_handler*/
        t[3]
      ), s = !0);
    },
    p(c, [p]) {
      u && u.p && (!r || p & /*$$scope*/
      2) && Oe(
        u,
        i,
        c,
        /*$$scope*/
        c[1],
        r ? qe(
          i,
          /*$$scope*/
          c[1],
          p,
          null
        ) : Ae(
          /*$$scope*/
          c[1]
        ),
        null
      ), Ue(e, a = Yt(o, [
        p & /*$$props*/
        1 && /*$$props*/
        c[0],
        (!r || p & /*$$props*/
        1 && n !== (n = `inline-flex items-center rounded-md bg-black px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 ${/*$$props*/
        c[0].class}`)) && { class: n }
      ]));
    },
    i(c) {
      r || (k(u, c), r = !0);
    },
    o(c) {
      C(u, c), r = !1;
    },
    d(c) {
      c && j(e), u && u.d(c), s = !1, l();
    }
  };
}
function tn(t, e, n) {
  let { $$slots: r = {}, $$scope: s } = e;
  function l(i) {
    zt.call(this, t, i);
  }
  return t.$$set = (i) => {
    n(0, e = ye(ye({}, e), He(i))), "$$scope" in i && n(1, s = i.$$scope);
  }, e = He(e), [e, s, r, l];
}
class ee extends ce {
  constructor(e) {
    super(), ue(this, e, tn, en, V, {});
  }
}
function nn(t) {
  const e = t - 1;
  return e * e * e + 1;
}
function Ze(t, { delay: e = 0, duration: n = 400, easing: r = ot } = {}) {
  const s = +getComputedStyle(t).opacity;
  return {
    delay: e,
    duration: n,
    easing: r,
    css: (l) => `opacity: ${l * s}`
  };
}
function Qe(t, { delay: e = 0, duration: n = 400, easing: r = nn, start: s = 0, opacity: l = 0 } = {}) {
  const i = getComputedStyle(t), u = +i.opacity, o = i.transform === "none" ? "" : i.transform, a = 1 - s, c = u * (1 - l);
  return {
    delay: e,
    duration: n,
    easing: r,
    css: (p, f) => `
			transform: ${o} scale(${1 - a * f});
			opacity: ${u - c * f}
		`
  };
}
function Ke(t) {
  let e, n, r, s, l, i, u, o, a, c, p;
  const f = (
    /*#slots*/
    t[3].default
  ), d = xe(
    f,
    t,
    /*$$scope*/
    t[2],
    null
  );
  return {
    c() {
      e = v("div"), n = v("div"), s = q(), l = v("div"), i = v("div"), u = v("div"), d && d.c(), h(n, "class", "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"), h(u, "class", "relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"), h(i, "class", "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"), h(l, "class", "fixed inset-0 z-10 overflow-y-auto"), h(e, "class", "relative z-10"), h(e, "aria-labelledby", "modal-title"), h(e, "role", "dialog"), h(e, "aria-modal", "true");
    },
    m(b, E) {
      S(b, e, E), m(e, n), m(e, s), m(e, l), m(l, i), m(i, u), d && d.m(u, null), a = !0, c || (p = [
        _e(u, "click", sn),
        _e(
          i,
          "click",
          /*click_handler_1*/
          t[4]
        )
      ], c = !0);
    },
    p(b, E) {
      d && d.p && (!a || E & /*$$scope*/
      4) && Oe(
        d,
        f,
        b,
        /*$$scope*/
        b[2],
        a ? qe(
          f,
          /*$$scope*/
          b[2],
          E,
          null
        ) : Ae(
          /*$$scope*/
          b[2]
        ),
        null
      );
    },
    i(b) {
      a || (le(() => {
        a && (r || (r = be(n, Ze, { duration: 250 }, !0)), r.run(1));
      }), k(d, b), le(() => {
        a && (o || (o = be(u, Qe, { duration: 250 }, !0)), o.run(1));
      }), a = !0);
    },
    o(b) {
      r || (r = be(n, Ze, { duration: 250 }, !1)), r.run(0), C(d, b), o || (o = be(u, Qe, { duration: 250 }, !1)), o.run(0), a = !1;
    },
    d(b) {
      b && j(e), b && r && r.end(), d && d.d(b), b && o && o.end(), c = !1, F(p);
    }
  };
}
function rn(t) {
  let e, n, r = (
    /*visible*/
    t[0] && Ke(t)
  );
  return {
    c() {
      r && r.c(), e = Le();
    },
    m(s, l) {
      r && r.m(s, l), S(s, e, l), n = !0;
    },
    p(s, [l]) {
      /*visible*/
      s[0] ? r ? (r.p(s, l), l & /*visible*/
      1 && k(r, 1)) : (r = Ke(s), r.c(), k(r, 1), r.m(e.parentNode, e)) : r && (Q(), C(r, 1, 1, () => {
        r = null;
      }), K());
    },
    i(s) {
      n || (k(r), n = !0);
    },
    o(s) {
      C(r), n = !1;
    },
    d(s) {
      r && r.d(s), s && j(e);
    }
  };
}
const sn = (t) => t.stopPropagation();
function ln(t, e, n) {
  let { $$slots: r = {}, $$scope: s } = e, { visible: l } = e;
  const i = Rt(), u = () => i("close");
  return t.$$set = (o) => {
    "visible" in o && n(0, l = o.visible), "$$scope" in o && n(2, s = o.$$scope);
  }, [l, i, s, r, u];
}
class yt extends ce {
  constructor(e) {
    super(), ue(this, e, ln, rn, V, { visible: 0 });
  }
}
const ne = [];
function on(t, e = z) {
  let n;
  const r = /* @__PURE__ */ new Set();
  function s(u) {
    if (V(t, u) && (t = u, n)) {
      const o = !ne.length;
      for (const a of r)
        a[1](), ne.push(a, t);
      if (o) {
        for (let a = 0; a < ne.length; a += 2)
          ne[a][0](ne[a + 1]);
        ne.length = 0;
      }
    }
  }
  function l(u) {
    s(u(t));
  }
  function i(u, o = z) {
    const a = [u, o];
    return r.add(a), r.size === 1 && (n = e(s) || z), u(t), () => {
      r.delete(a), r.size === 0 && n && (n(), n = null);
    };
  }
  return { set: s, update: l, subscribe: i };
}
let J = on({
  subscription: null,
  payment_method: null,
  grace_period: !1,
  canceled: !1,
  recurring: !1
}), $t = null;
function un(t) {
  $t = window.Stripe(t);
}
function cn() {
  return $t;
}
function an(t) {
  let e, n, r = (
    /*payment_method*/
    t[0].payment_type + ""
  ), s, l, i = (
    /*payment_method*/
    t[0].payment_last_four + ""
  ), u, o, a, c, p;
  return c = new ee({
    props: {
      $$slots: { default: [dn] },
      $$scope: { ctx: t }
    }
  }), c.$on(
    "click",
    /*setupPaymentMethod*/
    t[5]
  ), {
    c() {
      e = v("p"), n = P("Your payment method on file is a "), s = P(r), l = P(" ending in "), u = P(i), o = q(), a = v("div"), B(c.$$.fragment), h(e, "class", "text-gray-800 mt-4"), h(a, "class", "mt-4");
    },
    m(f, d) {
      S(f, e, d), m(e, n), m(e, s), m(e, l), m(e, u), S(f, o, d), S(f, a, d), I(c, a, null), p = !0;
    },
    p(f, d) {
      (!p || d & /*payment_method*/
      1) && r !== (r = /*payment_method*/
      f[0].payment_type + "") && Y(s, r), (!p || d & /*payment_method*/
      1) && i !== (i = /*payment_method*/
      f[0].payment_last_four + "") && Y(u, i);
      const b = {};
      d & /*$$scope*/
      8192 && (b.$$scope = { dirty: d, ctx: f }), c.$set(b);
    },
    i(f) {
      p || (k(c.$$.fragment, f), p = !0);
    },
    o(f) {
      C(c.$$.fragment, f), p = !1;
    },
    d(f) {
      f && j(e), f && j(o), f && j(a), D(c);
    }
  };
}
function fn(t) {
  let e, n, r, s, l, i, u, o, a, c, p;
  return c = new ee({
    props: {
      type: "button",
      $$slots: { default: [pn] },
      $$scope: { ctx: t }
    }
  }), c.$on(
    "click",
    /*setupPaymentMethod*/
    t[5]
  ), {
    c() {
      e = v("div"), n = $e("svg"), r = $e("path"), s = q(), l = v("h3"), l.textContent = "No payment method", i = q(), u = v("p"), u.textContent = "You need a payment method to subscribe", o = q(), a = v("div"), B(c.$$.fragment), h(r, "stroke-linecap", "round"), h(r, "stroke-linejoin", "round"), h(r, "d", "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"), h(n, "xmlns", "http://www.w3.org/2000/svg"), h(n, "fill", "none"), h(n, "viewBox", "0 0 24 24"), h(n, "stroke-width", "1.5"), h(n, "stroke", "currentColor"), h(n, "class", "mx-auto h-12 w-12 text-gray-400"), h(l, "class", "mt-2 text-sm font-semibold text-gray-900"), h(u, "class", "mt-1 text-sm text-gray-500"), h(a, "class", "mt-6"), h(e, "class", "text-center mt-6");
    },
    m(f, d) {
      S(f, e, d), m(e, n), m(n, r), m(e, s), m(e, l), m(e, i), m(e, u), m(e, o), m(e, a), I(c, a, null), p = !0;
    },
    p(f, d) {
      const b = {};
      d & /*$$scope*/
      8192 && (b.$$scope = { dirty: d, ctx: f }), c.$set(b);
    },
    i(f) {
      p || (k(c.$$.fragment, f), p = !0);
    },
    o(f) {
      C(c.$$.fragment, f), p = !1;
    },
    d(f) {
      f && j(e), D(c);
    }
  };
}
function dn(t) {
  let e;
  return {
    c() {
      e = P("Update");
    },
    m(n, r) {
      S(n, e, r);
    },
    d(n) {
      n && j(e);
    }
  };
}
function pn(t) {
  let e, n, r;
  return {
    c() {
      e = $e("svg"), n = $e("path"), r = P(`
          Add Payment Method`), h(n, "d", "M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"), h(e, "class", "-ml-0.5 mr-1.5 h-5 w-5"), h(e, "viewBox", "0 0 20 20"), h(e, "fill", "currentColor"), h(e, "aria-hidden", "true");
    },
    m(s, l) {
      S(s, e, l), m(e, n), S(s, r, l);
    },
    p: z,
    d(s) {
      s && j(e), s && j(r);
    }
  };
}
function _n(t) {
  let e, n, r, s, l, i, u, o, a, c = (
    /*setupError*/
    t[3] && Xe(t)
  );
  return i = new ee({
    props: {
      type: "submit",
      disabled: (
        /*paymentStatus*/
        t[4] === /*PaymentStatus*/
        t[1].Loading
      ),
      class: "w-full justify-center",
      $$slots: { default: [hn] },
      $$scope: { ctx: t }
    }
  }), {
    c() {
      e = v("form"), n = v("div"), r = q(), c && c.c(), s = q(), l = v("div"), B(i.$$.fragment), h(n, "id", "stripe-payment-form"), h(l, "class", "mt-4");
    },
    m(p, f) {
      S(p, e, f), m(e, n), m(e, r), c && c.m(e, null), m(e, s), m(e, l), I(i, l, null), u = !0, o || (a = [
        jt(
          /*setupStripeElement*/
          t[6].call(null, n)
        ),
        _e(e, "submit", xt(
          /*submitPaymentMethod*/
          t[7]
        ))
      ], o = !0);
    },
    p(p, f) {
      /*setupError*/
      p[3] ? c ? c.p(p, f) : (c = Xe(p), c.c(), c.m(e, s)) : c && (c.d(1), c = null);
      const d = {};
      f & /*paymentStatus, PaymentStatus*/
      18 && (d.disabled = /*paymentStatus*/
      p[4] === /*PaymentStatus*/
      p[1].Loading), f & /*$$scope*/
      8192 && (d.$$scope = { dirty: f, ctx: p }), i.$set(d);
    },
    i(p) {
      u || (k(i.$$.fragment, p), u = !0);
    },
    o(p) {
      C(i.$$.fragment, p), u = !1;
    },
    d(p) {
      p && j(e), c && c.d(), D(i), o = !1, F(a);
    }
  };
}
function mn(t) {
  let e, n, r, s, l;
  return s = new ee({
    props: {
      class: "w-full justify-center",
      $$slots: { default: [bn] },
      $$scope: { ctx: t }
    }
  }), s.$on(
    "click",
    /*click_handler*/
    t[8]
  ), {
    c() {
      e = v("div"), e.innerHTML = `<div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"><svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path></svg></div> 
      <div class="mt-3 text-center sm:mt-5"><h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Payment method saved</h3> 
        <div class="mt-2"><p class="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            amet labore.</p></div></div>`, n = q(), r = v("div"), B(s.$$.fragment), h(r, "class", "mt-5 sm:mt-6");
    },
    m(i, u) {
      S(i, e, u), S(i, n, u), S(i, r, u), I(s, r, null), l = !0;
    },
    p(i, u) {
      const o = {};
      u & /*$$scope*/
      8192 && (o.$$scope = { dirty: u, ctx: i }), s.$set(o);
    },
    i(i) {
      l || (k(s.$$.fragment, i), l = !0);
    },
    o(i) {
      C(s.$$.fragment, i), l = !1;
    },
    d(i) {
      i && j(e), i && j(n), i && j(r), D(s);
    }
  };
}
function Xe(t) {
  let e, n;
  return {
    c() {
      e = v("p"), n = P(
        /*setupError*/
        t[3]
      ), h(e, "class", "text-red-600 mt-2");
    },
    m(r, s) {
      S(r, e, s), m(e, n);
    },
    p(r, s) {
      s & /*setupError*/
      8 && Y(
        n,
        /*setupError*/
        r[3]
      );
    },
    d(r) {
      r && j(e);
    }
  };
}
function hn(t) {
  let e;
  return {
    c() {
      e = P("Save");
    },
    m(n, r) {
      S(n, e, r);
    },
    d(n) {
      n && j(e);
    }
  };
}
function bn(t) {
  let e;
  return {
    c() {
      e = P("Finish");
    },
    m(n, r) {
      S(n, e, r);
    },
    d(n) {
      n && j(e);
    }
  };
}
function gn(t) {
  let e, n, r, s;
  const l = [mn, _n], i = [];
  function u(o, a) {
    return (
      /*paymentStatus*/
      o[4] === /*PaymentStatus*/
      o[1].Success ? 0 : (
        /*client_secret*/
        o[2] ? 1 : -1
      )
    );
  }
  return ~(e = u(t)) && (n = i[e] = l[e](t)), {
    c() {
      n && n.c(), r = Le();
    },
    m(o, a) {
      ~e && i[e].m(o, a), S(o, r, a), s = !0;
    },
    p(o, a) {
      let c = e;
      e = u(o), e === c ? ~e && i[e].p(o, a) : (n && (Q(), C(i[c], 1, 1, () => {
        i[c] = null;
      }), K()), ~e ? (n = i[e], n ? n.p(o, a) : (n = i[e] = l[e](o), n.c()), k(n, 1), n.m(r.parentNode, r)) : n = null);
    },
    i(o) {
      s || (k(n), s = !0);
    },
    o(o) {
      C(n), s = !1;
    },
    d(o) {
      ~e && i[e].d(o), o && j(r);
    }
  };
}
function yn(t) {
  let e, n, r, s, l, i, u, o;
  const a = [fn, an], c = [];
  function p(f, d) {
    return (
      /*payment_method*/
      f[0] ? 1 : 0
    );
  }
  return s = p(t), l = c[s] = a[s](t), u = new yt({
    props: {
      visible: !!/*client_secret*/
      t[2],
      $$slots: { default: [gn] },
      $$scope: { ctx: t }
    }
  }), u.$on(
    "close",
    /*close_handler*/
    t[9]
  ), {
    c() {
      e = v("div"), n = v("div"), n.innerHTML = '<h3 class="text-base font-semibold leading-6 text-gray-900">Payment Methods</h3>', r = q(), l.c(), i = q(), B(u.$$.fragment), h(n, "class", "border-b border-gray-200 pb-5"), h(e, "class", "rounded-md border border-gray-200 bg-gray-50 p-4");
    },
    m(f, d) {
      S(f, e, d), m(e, n), m(e, r), c[s].m(e, null), S(f, i, d), I(u, f, d), o = !0;
    },
    p(f, [d]) {
      let b = s;
      s = p(f), s === b ? c[s].p(f, d) : (Q(), C(c[b], 1, 1, () => {
        c[b] = null;
      }), K(), l = c[s], l ? l.p(f, d) : (l = c[s] = a[s](f), l.c()), k(l, 1), l.m(e, null));
      const E = {};
      d & /*client_secret*/
      4 && (E.visible = !!/*client_secret*/
      f[2]), d & /*$$scope, client_secret, paymentStatus, PaymentStatus, setupError*/
      8222 && (E.$$scope = { dirty: d, ctx: f }), u.$set(E);
    },
    i(f) {
      o || (k(l), k(u.$$.fragment, f), o = !0);
    },
    o(f) {
      C(l), C(u.$$.fragment, f), o = !1;
    },
    d(f) {
      f && j(e), c[s].d(), f && j(i), D(u, f);
    }
  };
}
function $n(t, e, n) {
  let r;
  ct(t, J, (_) => n(11, r = _));
  let { payment_method: s } = e;
  var l;
  (function(_) {
    _[_.Idle = 0] = "Idle", _[_.Loading = 1] = "Loading", _[_.Success = 2] = "Success", _[_.Error = 3] = "Error";
  })(l || (l = {}));
  let i = null;
  const u = cn();
  let o, a = "", c = l.Idle;
  async function p() {
    const _ = await pe.url("/billing/setup-payment").post().json();
    n(2, i = _.client_secret);
  }
  function f(_) {
    o = u.elements({ clientSecret: i }), o.create("payment").mount(`#${_.id}`);
  }
  async function d() {
    n(4, c = l.Loading);
    const { error: _, setupIntent: T } = await u.confirmSetup({
      elements: o,
      redirect: "if_required",
      confirmParams: {
        return_url: "http://localhost:4000/billing/payment-setup-return"
      }
    });
    if (_) {
      n(4, c = l.Error), n(3, a = _.message);
      return;
    }
    if (n(4, c = l.Success), T) {
      const M = await pe.url("/billing/store-payment").post({
        payment_method_id: T.payment_method
      }).json();
      fe(J, r = M.props, r);
    }
  }
  const b = () => n(2, i = ""), E = () => n(2, i = "");
  return t.$$set = (_) => {
    "payment_method" in _ && n(0, s = _.payment_method);
  }, [
    s,
    l,
    i,
    a,
    c,
    p,
    f,
    d,
    b,
    E
  ];
}
class vn extends ce {
  constructor(e) {
    super(), ue(this, e, $n, yn, V, { payment_method: 0 });
  }
}
function Ve(t, e, n) {
  const r = t.slice();
  return r[5] = e[n], r;
}
function et(t) {
  let e, n = (
    /*feature*/
    t[5] + ""
  ), r;
  return {
    c() {
      e = v("li"), r = P(n);
    },
    m(s, l) {
      S(s, e, l), m(e, r);
    },
    p(s, l) {
      l & /*plan*/
      1 && n !== (n = /*feature*/
      s[5] + "") && Y(r, n);
    },
    d(s) {
      s && j(e);
    }
  };
}
function wn(t) {
  let e, n, r = (
    /*plan*/
    t[0].title + ""
  ), s, l, i = (
    /*price*/
    t[1].price + ""
  ), u, o, a, c = (
    /*plan*/
    t[0].description + ""
  ), p, f, d, b, E, _, T = (
    /*plan*/
    t[0].features
  ), M = [];
  for (let y = 0; y < T.length; y += 1)
    M[y] = et(Ve(t, T, y));
  const g = (
    /*#slots*/
    t[4].default
  ), $ = xe(
    g,
    t,
    /*$$scope*/
    t[3],
    null
  );
  return {
    c() {
      e = v("div"), n = v("h3"), s = P(r), l = P(" @ "), u = P(i), o = q(), a = v("p"), p = P(c), f = q(), d = v("ul");
      for (let y = 0; y < M.length; y += 1)
        M[y].c();
      b = q(), E = v("div"), $ && $.c(), h(n, "class", "text-base font-semibold leading-6 text-gray-900"), h(a, "class", "text-sm text-gray-600"), h(d, "class", "list-disc list-inside mt-2 text-sm text-gray-600"), h(E, "class", "flex space-x-4"), h(e, "class", "border border-gray-200 rounded-md p-4 space-y-2");
    },
    m(y, x) {
      S(y, e, x), m(e, n), m(n, s), m(n, l), m(n, u), m(e, o), m(e, a), m(a, p), m(e, f), m(e, d);
      for (let O = 0; O < M.length; O += 1)
        M[O] && M[O].m(d, null);
      m(e, b), m(e, E), $ && $.m(E, null), _ = !0;
    },
    p(y, [x]) {
      if ((!_ || x & /*plan*/
      1) && r !== (r = /*plan*/
      y[0].title + "") && Y(s, r), (!_ || x & /*price*/
      2) && i !== (i = /*price*/
      y[1].price + "") && Y(u, i), (!_ || x & /*plan*/
      1) && c !== (c = /*plan*/
      y[0].description + "") && Y(p, c), x & /*plan*/
      1) {
        T = /*plan*/
        y[0].features;
        let O;
        for (O = 0; O < T.length; O += 1) {
          const he = Ve(y, T, O);
          M[O] ? M[O].p(he, x) : (M[O] = et(he), M[O].c(), M[O].m(d, null));
        }
        for (; O < M.length; O += 1)
          M[O].d(1);
        M.length = T.length;
      }
      $ && $.p && (!_ || x & /*$$scope*/
      8) && Oe(
        $,
        g,
        y,
        /*$$scope*/
        y[3],
        _ ? qe(
          g,
          /*$$scope*/
          y[3],
          x,
          null
        ) : Ae(
          /*$$scope*/
          y[3]
        ),
        null
      );
    },
    i(y) {
      _ || (k($, y), _ = !0);
    },
    o(y) {
      C($, y), _ = !1;
    },
    d(y) {
      y && j(e), _t(M, y), $ && $.d(y);
    }
  };
}
function kn(t, e, n) {
  let r, { $$slots: s = {}, $$scope: l } = e, { plan: i } = e, { monthly: u = !0 } = e;
  return t.$$set = (o) => {
    "plan" in o && n(0, i = o.plan), "monthly" in o && n(2, u = o.monthly), "$$scope" in o && n(3, l = o.$$scope);
  }, t.$$.update = () => {
    t.$$.dirty & /*monthly, plan*/
    5 && n(1, r = u ? i.prices.monthly : i.prices.yearly);
  }, [i, r, u, l, s];
}
class En extends ce {
  constructor(e) {
    super(), ue(this, e, kn, wn, V, { plan: 0, monthly: 2 });
  }
}
function jn(t) {
  let e, n, r, s, l, i, u, o, a, c, p;
  return {
    c() {
      e = v("button"), n = v("span"), n.textContent = "Use setting", r = q(), s = v("span"), l = q(), i = v("span"), u = q(), o = v("span"), h(n, "class", "sr-only"), h(s, "aria-hidden", "true"), h(s, "class", "pointer-events-none absolute h-full w-full rounded-md bg-white"), h(i, "aria-hidden", "true"), h(i, "class", "pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out"), U(
        i,
        "bg-indigo-600",
        /*enabled*/
        t[0]
      ), U(i, "bg-gray-200", !/*enabled*/
      t[0]), h(o, "aria-hidden", "true"), h(o, "class", "translate-x-0 pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"), U(
        o,
        "translate-x-5",
        /*enabled*/
        t[0]
      ), U(o, "translate-x-0", !/*enabled*/
      t[0]), h(e, "type", "button"), h(e, "class", "group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"), h(e, "role", "switch"), h(e, "aria-checked", a = /*enabled*/
      t[0] ? "true" : "false");
    },
    m(f, d) {
      S(f, e, d), m(e, n), m(e, r), m(e, s), m(e, l), m(e, i), m(e, u), m(e, o), c || (p = _e(
        e,
        "click",
        /*click_handler*/
        t[1]
      ), c = !0);
    },
    p(f, [d]) {
      d & /*enabled*/
      1 && U(
        i,
        "bg-indigo-600",
        /*enabled*/
        f[0]
      ), d & /*enabled*/
      1 && U(i, "bg-gray-200", !/*enabled*/
      f[0]), d & /*enabled*/
      1 && U(
        o,
        "translate-x-5",
        /*enabled*/
        f[0]
      ), d & /*enabled*/
      1 && U(o, "translate-x-0", !/*enabled*/
      f[0]), d & /*enabled*/
      1 && a !== (a = /*enabled*/
      f[0] ? "true" : "false") && h(e, "aria-checked", a);
    },
    i: z,
    o: z,
    d(f) {
      f && j(e), c = !1, p();
    }
  };
}
function Sn(t, e, n) {
  let { enabled: r = !1 } = e;
  const s = () => n(0, r = !r);
  return t.$$set = (l) => {
    "enabled" in l && n(0, r = l.enabled);
  }, [r, s];
}
class Cn extends ce {
  constructor(e) {
    super(), ue(this, e, Sn, jn, V, { enabled: 0 });
  }
}
function tt(t, e, n) {
  const r = t.slice();
  return r[13] = e[n], r;
}
function nt(t) {
  let e;
  return {
    c() {
      e = v("div"), e.innerHTML = `<div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg></div> 
              <div class="ml-3"><h3 class="text-sm font-medium text-yellow-800">You are not subscribed to a plan</h3> 
                <div class="mt-2 text-sm text-yellow-700"><p>Select a plan from the list below</p></div></div></div>`, h(e, "class", "rounded-md bg-yellow-50 p-4");
    },
    m(n, r) {
      S(n, e, r);
    },
    d(n) {
      n && j(e);
    }
  };
}
function Mn(t) {
  let e, n;
  function r() {
    return (
      /*click_handler_1*/
      t[11](
        /*plan*/
        t[13]
      )
    );
  }
  return e = new ee({
    props: {
      type: "button",
      $$slots: { default: [xn] },
      $$scope: { ctx: t }
    }
  }), e.$on("click", r), {
    c() {
      B(e.$$.fragment);
    },
    m(s, l) {
      I(e, s, l), n = !0;
    },
    p(s, l) {
      t = s;
      const i = {};
      l & /*$$scope, $props*/
      65540 && (i.$$scope = { dirty: l, ctx: t }), e.$set(i);
    },
    i(s) {
      n || (k(e.$$.fragment, s), n = !0);
    },
    o(s) {
      C(e.$$.fragment, s), n = !1;
    },
    d(s) {
      D(e, s);
    }
  };
}
function Tn(t) {
  let e, n, r, s = (
    /*$props*/
    t[2].grace_period && rt(t)
  ), l = (
    /*$props*/
    t[2].recurring && st(t)
  );
  return {
    c() {
      s && s.c(), e = q(), l && l.c(), n = Le();
    },
    m(i, u) {
      s && s.m(i, u), S(i, e, u), l && l.m(i, u), S(i, n, u), r = !0;
    },
    p(i, u) {
      /*$props*/
      i[2].grace_period ? s ? (s.p(i, u), u & /*$props*/
      4 && k(s, 1)) : (s = rt(i), s.c(), k(s, 1), s.m(e.parentNode, e)) : s && (Q(), C(s, 1, 1, () => {
        s = null;
      }), K()), /*$props*/
      i[2].recurring ? l ? (l.p(i, u), u & /*$props*/
      4 && k(l, 1)) : (l = st(i), l.c(), k(l, 1), l.m(n.parentNode, n)) : l && (Q(), C(l, 1, 1, () => {
        l = null;
      }), K());
    },
    i(i) {
      r || (k(s), k(l), r = !0);
    },
    o(i) {
      C(s), C(l), r = !1;
    },
    d(i) {
      s && s.d(i), i && j(e), l && l.d(i), i && j(n);
    }
  };
}
function xn(t) {
  let e = (
    /*$props*/
    t[2].subscription ? "Change Plan" : "Subscribe"
  ), n;
  return {
    c() {
      n = P(e);
    },
    m(r, s) {
      S(r, n, s);
    },
    p(r, s) {
      s & /*$props*/
      4 && e !== (e = /*$props*/
      r[2].subscription ? "Change Plan" : "Subscribe") && Y(n, e);
    },
    d(r) {
      r && j(n);
    }
  };
}
function rt(t) {
  let e, n;
  return e = new ee({
    props: {
      $$slots: { default: [qn] },
      $$scope: { ctx: t }
    }
  }), e.$on(
    "click",
    /*resumeSubscription*/
    t[6]
  ), {
    c() {
      B(e.$$.fragment);
    },
    m(r, s) {
      I(e, r, s), n = !0;
    },
    p(r, s) {
      const l = {};
      s & /*$$scope*/
      65536 && (l.$$scope = { dirty: s, ctx: r }), e.$set(l);
    },
    i(r) {
      n || (k(e.$$.fragment, r), n = !0);
    },
    o(r) {
      C(e.$$.fragment, r), n = !1;
    },
    d(r) {
      D(e, r);
    }
  };
}
function qn(t) {
  let e;
  return {
    c() {
      e = P("Resume Subscription");
    },
    m(n, r) {
      S(n, e, r);
    },
    d(n) {
      n && j(e);
    }
  };
}
function st(t) {
  let e, n;
  return e = new ee({
    props: {
      type: "button",
      $$slots: { default: [On] },
      $$scope: { ctx: t }
    }
  }), e.$on(
    "click",
    /*click_handler*/
    t[10]
  ), {
    c() {
      B(e.$$.fragment);
    },
    m(r, s) {
      I(e, r, s), n = !0;
    },
    p(r, s) {
      const l = {};
      s & /*$$scope*/
      65536 && (l.$$scope = { dirty: s, ctx: r }), e.$set(l);
    },
    i(r) {
      n || (k(e.$$.fragment, r), n = !0);
    },
    o(r) {
      C(e.$$.fragment, r), n = !1;
    },
    d(r) {
      D(e, r);
    }
  };
}
function On(t) {
  let e;
  return {
    c() {
      e = P("Cancel Subscription");
    },
    m(n, r) {
      S(n, e, r);
    },
    d(n) {
      n && j(e);
    }
  };
}
function An(t) {
  let e, n, r, s;
  const l = [Tn, Mn], i = [];
  function u(o, a) {
    var c;
    return (
      /*$props*/
      ((c = o[2].subscription) == null ? void 0 : c.stripe_price_id) === /*monthly*/
      (o[1] ? (
        /*plan*/
        o[13].prices.monthly.id
      ) : (
        /*plan*/
        o[13].prices.yearly.id
      )) ? 0 : 1
    );
  }
  return e = u(t), n = i[e] = l[e](t), {
    c() {
      n.c(), r = q();
    },
    m(o, a) {
      i[e].m(o, a), S(o, r, a), s = !0;
    },
    p(o, a) {
      let c = e;
      e = u(o), e === c ? i[e].p(o, a) : (Q(), C(i[c], 1, 1, () => {
        i[c] = null;
      }), K(), n = i[e], n ? n.p(o, a) : (n = i[e] = l[e](o), n.c()), k(n, 1), n.m(r.parentNode, r));
    },
    i(o) {
      s || (k(n), s = !0);
    },
    o(o) {
      C(n), s = !1;
    },
    d(o) {
      i[e].d(o), o && j(r);
    }
  };
}
function it(t) {
  let e, n;
  return e = new En({
    props: {
      plan: (
        /*plan*/
        t[13]
      ),
      monthly: (
        /*monthly*/
        t[1]
      ),
      $$slots: { default: [An] },
      $$scope: { ctx: t }
    }
  }), {
    c() {
      B(e.$$.fragment);
    },
    m(r, s) {
      I(e, r, s), n = !0;
    },
    p(r, s) {
      const l = {};
      s & /*monthly*/
      2 && (l.monthly = /*monthly*/
      r[1]), s & /*$$scope, $props, monthly*/
      65542 && (l.$$scope = { dirty: s, ctx: r }), e.$set(l);
    },
    i(r) {
      n || (k(e.$$.fragment, r), n = !0);
    },
    o(r) {
      C(e.$$.fragment, r), n = !1;
    },
    d(r) {
      D(e, r);
    }
  };
}
function Pn(t) {
  let e, n, r, s, l, i, u, o, a, c, p, f, d, b, E, _, T, M, g, $, y, x, O;
  function he(w) {
    t[8](w);
  }
  let Ne = {};
  /*$props*/
  t[2].payment_method !== void 0 && (Ne.payment_method = /*$props*/
  t[2].payment_method), s = new vn({ props: Ne }), ke.push(() => Fe(s, "payment_method", he));
  let R = !/*$props*/
  t[2].subscription && nt();
  function vt(w) {
    t[9](w);
  }
  let Re = {};
  /*monthly*/
  t[1] !== void 0 && (Re.enabled = /*monthly*/
  t[1]), _ = new Cn({ props: Re }), ke.push(() => Fe(_, "enabled", vt));
  let G = (
    /*plans*/
    t[3]
  ), A = [];
  for (let w = 0; w < G.length; w += 1)
    A[w] = it(tt(t, G, w));
  const wt = (w) => C(A[w], 1, 1, () => {
    A[w] = null;
  });
  return x = new yt({
    props: { visible: (
      /*modal_visible*/
      t[0]
    ) }
  }), x.$on(
    "close",
    /*close_handler*/
    t[12]
  ), {
    c() {
      e = v("div"), n = v("div"), r = v("div"), B(s.$$.fragment), i = q(), u = v("div"), o = v("div"), a = v("div"), a.innerHTML = '<h3 class="text-base font-semibold leading-6 text-gray-900">Plans</h3>', c = q(), R && R.c(), p = q(), f = v("div"), d = v("div"), b = v("span"), b.textContent = "Yearly", E = q(), B(_.$$.fragment), M = q(), g = v("span"), g.textContent = "Monthly", $ = q();
      for (let w = 0; w < A.length; w += 1)
        A[w].c();
      y = q(), B(x.$$.fragment), h(r, "class", "w-1/3"), h(a, "class", "border-b border-gray-200 pb-5"), h(d, "class", "flex items-center space-x-4"), h(f, "class", "space-y-4"), h(o, "class", "space-y-6"), h(u, "class", "flex-1"), h(n, "class", "flex items-start space-x-6"), h(e, "class", "p-12");
    },
    m(w, L) {
      S(w, e, L), m(e, n), m(n, r), I(s, r, null), m(n, i), m(n, u), m(u, o), m(o, a), m(o, c), R && R.m(o, null), m(o, p), m(o, f), m(f, d), m(d, b), m(d, E), I(_, d, null), m(d, M), m(d, g), m(f, $);
      for (let W = 0; W < A.length; W += 1)
        A[W] && A[W].m(f, null);
      m(e, y), I(x, e, null), O = !0;
    },
    p(w, [L]) {
      const W = {};
      !l && L & /*$props*/
      4 && (l = !0, W.payment_method = /*$props*/
      w[2].payment_method, Ye(() => l = !1)), s.$set(W), /*$props*/
      w[2].subscription ? R && (R.d(1), R = null) : R || (R = nt(), R.c(), R.m(o, p));
      const ze = {};
      if (!T && L & /*monthly*/
      2 && (T = !0, ze.enabled = /*monthly*/
      w[1], Ye(() => T = !1)), _.$set(ze), L & /*plans, monthly, cancelSubscription, $props, resumeSubscription, onPlanSelected*/
      126) {
        G = /*plans*/
        w[3];
        let N;
        for (N = 0; N < G.length; N += 1) {
          const De = tt(w, G, N);
          A[N] ? (A[N].p(De, L), k(A[N], 1)) : (A[N] = it(De), A[N].c(), k(A[N], 1), A[N].m(f, null));
        }
        for (Q(), N = G.length; N < A.length; N += 1)
          wt(N);
        K();
      }
      const Ie = {};
      L & /*modal_visible*/
      1 && (Ie.visible = /*modal_visible*/
      w[0]), x.$set(Ie);
    },
    i(w) {
      if (!O) {
        k(s.$$.fragment, w), k(_.$$.fragment, w);
        for (let L = 0; L < G.length; L += 1)
          k(A[L]);
        k(x.$$.fragment, w), O = !0;
      }
    },
    o(w) {
      C(s.$$.fragment, w), C(_.$$.fragment, w), A = A.filter(Boolean);
      for (let L = 0; L < A.length; L += 1)
        C(A[L]);
      C(x.$$.fragment, w), O = !1;
    },
    d(w) {
      w && j(e), D(s), R && R.d(), D(_), _t(A, w), D(x);
    }
  };
}
function Ln(t, e, n) {
  let r;
  ct(t, J, (_) => n(2, r = _));
  let { _props: s } = e;
  fe(J, r = s, r);
  let l = !1, i = !0, u = [
    {
      title: "Plus",
      description: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur fugiat eaque ut velit, suscipit quis ad quaerat temporibus repellat nobis incidunt libero voluptas quibusdam dolores est aliquid. Quae, aliquid illo.",
      features: ["Unlimited devices"],
      prices: {
        monthly: {
          id: "price_1My2srIZboGRpxvjFL3TgK7Y",
          price: "$5 / month"
        },
        yearly: {
          id: "price_1My2srIZboGRpxvjOQDgw6nz",
          price: "$50 / year"
        }
      }
    },
    {
      title: "Pro",
      description: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur fugiat eaque ut velit, suscipit quis ad quaerat temporibus repellat nobis incidunt libero voluptas quibusdam dolores est aliquid. Quae, aliquid illo.",
      features: ["Unlimited devices", "Media uploads"],
      prices: {
        monthly: {
          id: "price_1My2tIIZboGRpxvjesJNyWBE",
          price: "$10 / month"
        },
        yearly: {
          id: "price_1My2tIIZboGRpxvj2jlkRt3i",
          price: "$100 / year"
        }
      }
    }
  ];
  async function o(_) {
    if (!r.payment_method)
      return;
    const T = await pe.url("/billing/subscriptions").post({
      price_id: i ? _.prices.monthly.id : _.prices.yearly.id
    }).json();
    fe(J, r = T.props, r);
  }
  async function a() {
    const _ = await pe.url("/billing/subscriptions").delete().json();
    fe(J, r = _.props, r);
  }
  async function c() {
    const _ = await pe.url("/billing/subscriptions/resume").post().json();
    fe(J, r = _.props, r);
  }
  function p(_) {
    t.$$.not_equal(r.payment_method, _) && (r.payment_method = _, J.set(r));
  }
  function f(_) {
    i = _, n(1, i);
  }
  const d = () => a(), b = (_) => o(_), E = () => n(0, l = !1);
  return t.$$set = (_) => {
    "_props" in _ && n(7, s = _._props);
  }, [
    l,
    i,
    r,
    u,
    o,
    a,
    c,
    s,
    p,
    f,
    d,
    b,
    E
  ];
}
class Nn extends ce {
  constructor(e) {
    super(), ue(this, e, Ln, Pn, V, { _props: 7 });
  }
}
un(
  document.querySelector('meta[name="stripe-pk"]').getAttribute("content")
);
const lt = document.getElementById("__billing-app"), Rn = new Nn({
  target: lt,
  props: { _props: JSON.parse(lt.dataset.props) }
});
export {
  Rn as default
};
