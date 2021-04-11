/*!
 * Web analytics for Snowplow v3.0.0 (http://bit.ly/sp-js)
 * Copyright 2021 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
"use strict";
! function() {
    function e(e, n) {
        var t, o = {};
        for (t in e) Object.prototype.hasOwnProperty.call(e, t) && 0 > n.indexOf(t) && (o[t] = e[t]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (t = Object.getOwnPropertySymbols(e); r < t.length; r++) 0 > n.indexOf(t[r]) && Object.prototype.propertyIsEnumerable.call(e, t[r]) && (o[t[r]] = e[t[r]])
        }
        return o
    }

    function n(e, n) {
        for (var t = 0, o = n.length, r = e.length; t < o; t++, r++) e[r] = n[t];
        return e
    }

    function t(e) {
        var n = {
            exports: {}
        };
        return e(n, n.exports), n.exports
    }

    function o(e) {
        if (!e) return e;
        var n = 0,
            t = 0,
            o = [];
        if (e) {
            e = unescape(encodeURIComponent(e));
            do {
                var r = e.charCodeAt(n++),
                    a = e.charCodeAt(n++),
                    i = e.charCodeAt(n++),
                    c = r << 16 | a << 8 | i;
                r = c >> 18 & 63, a = c >> 12 & 63, i = c >> 6 & 63, c &= 63, o[t++] = Ve.charAt(r) + Ve.charAt(a) + Ve.charAt(i) + Ve.charAt(c)
            } while (n < e.length);
            n = o.join(""), e = ((e = e.length % 3) ? n.slice(0, e - 3) : n) + "===".slice(e || 3)
        }
        return e.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
    }

    function r() {
        var e, n = {},
            t = [],
            o = [],
            r = function(e, t) {
                null != t && "" !== t && (n[e] = t)
            };
        return {
            add: r,
            addDict: function(e) {
                for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && r(n, e[n])
            },
            addJson: function(e, n, r) {
                r && a(r) && (e = {
                    keyIfEncoded: e,
                    keyIfNotEncoded: n,
                    json: r
                }, o.push(e), t.push(e))
            },
            getPayload: function() {
                return n
            },
            getJson: function() {
                return t
            },
            withJsonProcessor: function(n) {
                e = n
            },
            build: function() {
                return null == e || e(this, o), n
            }
        }
    }

    function a(e) {
        if (!i(e)) return !1;
        for (var n in e)
            if (Object.prototype.hasOwnProperty.call(e, n)) return !0;
        return !1
    }

    function i(e) {
        return null != e && (e.constructor === {}.constructor || e.constructor === [].constructor)
    }

    function c() {
        var e = [],
            n = [];
        return {
            getGlobalPrimitives: function() {
                return e
            },
            getConditionalProviders: function() {
                return n
            },
            addGlobalContexts: function(t) {
                for (var o = [], r = [], a = 0; a < t.length; a++) {
                    var i = t[a];
                    w(i) ? o.push(i) : v(i) && r.push(i)
                }
                e = e.concat(r), n = n.concat(o)
            },
            clearGlobalContexts: function() {
                n = [], e = []
            },
            removeGlobalContexts: function(t) {
                for (var o = function(t) {
                        w(t) ? n = n.filter((function(e) {
                            return JSON.stringify(e) === JSON.stringify(t)
                        })) : v(t) && (e = e.filter((function(e) {
                            return JSON.stringify(e) === JSON.stringify(t)
                        })))
                    }, r = 0; r < t.length; r++) o(t[r])
            },
            getApplicableContexts: function(t) {
                e: {
                    for (var o = 0, r = t.getJson(); o < r.length; o++) {
                        var a = r[o];
                        if ("ue_px" === a.keyIfEncoded && "object" == typeof a.json.data && "string" == typeof(a = a.json.data.schema)) {
                            o = a;
                            break e
                        }
                    }
                    o = ""
                }
                a = "string" == typeof(r = t.getPayload().e) ? r : "",
                r = [];
                var i = T(e, t, a, o);
                return r.push.apply(r, i),
                t = function(e, n, t, o) {
                    var r;
                    return e = A(e).map((function(e) {
                        e: {
                            if (h(e)) {
                                var r = e[0],
                                    a = !1;
                                try {
                                    a = r({
                                        event: n.getPayload(),
                                        eventType: t,
                                        eventSchema: o
                                    })
                                } catch (e) {
                                    a = !1
                                }
                                if (!0 === a) {
                                    e = T(e[1], n, t, o);
                                    break e
                                }
                            } else if (y(e) && function(e, n) {
                                    var t = 0,
                                        o = 0,
                                        r = e.accept;
                                    return Array.isArray(r) ? e.accept.some((function(e) {
                                        return k(e, n)
                                    })) && o++ : "string" == typeof r && k(r, n) && o++, r = e.reject, Array.isArray(r) ? e.reject.some((function(e) {
                                        return k(e, n)
                                    })) && t++ : "string" == typeof r && k(r, n) && t++, 0 < o && 0 === t
                                }(e[0], o)) {
                                e = T(e[1], n, t, o);
                                break e
                            }
                            e = []
                        }
                        if (e && 0 !== e.length) return e
                    })), (r = []).concat.apply(r, e.filter((function(e) {
                        return null != e && e.filter(Boolean)
                    })))
                }(n, t, a, o),
                r.push.apply(r, t),
                r
            }
        }
    }

    function s(e) {
        for (var n, t = [], o = 1; o < arguments.length; o++) t[o - 1] = arguments[o];
        return null !== (n = null == e ? void 0 : e.map((function(e) {
            if ("function" != typeof e) return e;
            try {
                return e.apply(void 0, t)
            } catch (e) {}
        })).filter(Boolean)) && void 0 !== n ? n : []
    }

    function u(e) {
        return !!((e = e.split(".")) && 1 < e.length) && function(e) {
            if ("*" === e[0] || "*" === e[1]) return !1;
            if (0 < e.slice(2).length) {
                var n = !1,
                    t = 0;
                for (e = e.slice(2); t < e.length; t++)
                    if ("*" === e[t]) n = !0;
                    else if (n) return !1;
                return !0
            }
            return 2 == e.length
        }(e)
    }

    function l(e) {
        if (null !== (e = /^iglu:((?:(?:[a-zA-Z0-9-_]+|\*).)+(?:[a-zA-Z0-9-_]+|\*))\/([a-zA-Z0-9-_.]+|\*)\/jsonschema\/([1-9][0-9]*|\*)-(0|[1-9][0-9]*|\*)-(0|[1-9][0-9]*|\*)$/.exec(e)) && u(e[1])) return e.slice(1, 6)
    }

    function f(e) {
        if (e = l(e)) {
            var n = e[0];
            return 5 === e.length && u(n)
        }
        return !1
    }

    function d(e) {
        return Array.isArray(e) && e.every((function(e) {
            return "string" == typeof e
        }))
    }

    function m(e) {
        return d(e) ? e.every((function(e) {
            return f(e)
        })) : "string" == typeof e && f(e)
    }

    function p(e) {
        return !!(a(e) && "schema" in e && "data" in e) && ("string" == typeof e.schema && "object" == typeof e.data)
    }

    function g(e) {
        return "function" == typeof e && 1 >= e.length
    }

    function v(e) {
        return g(e) || p(e)
    }

    function h(e) {
        return !(!Array.isArray(e) || 2 !== e.length) && (Array.isArray(e[1]) ? g(e[0]) && e[1].every(v) : g(e[0]) && v(e[1]))
    }

    function y(e) {
        return !(!Array.isArray(e) || 2 !== e.length) && (!! function(e) {
            var n = 0;
            if (null != e && "object" == typeof e && !Array.isArray(e)) {
                if (Object.prototype.hasOwnProperty.call(e, "accept")) {
                    if (!m(e.accept)) return !1;
                    n += 1
                }
                if (Object.prototype.hasOwnProperty.call(e, "reject")) {
                    if (!m(e.reject)) return !1;
                    n += 1
                }
                return 0 < n && 2 >= n
            }
            return !1
        }(e[0]) && (Array.isArray(e[1]) ? e[1].every(v) : v(e[1])))
    }

    function w(e) {
        return h(e) || y(e)
    }

    function k(e, n) {
        if (!f(e)) return !1;
        if (e = l(e), n = null !== (n = /^iglu:([a-zA-Z0-9-_.]+)\/([a-zA-Z0-9-_]+)\/jsonschema\/([1-9][0-9]*)-(0|[1-9][0-9]*)-(0|[1-9][0-9]*)$/.exec(n)) ? n.slice(1, 6) : void 0, e && n) {
            if (! function(e, n) {
                    if (n = n.split("."), e = e.split("."), n && e) {
                        if (n.length !== e.length) return !1;
                        for (var t = 0; t < e.length; t++)
                            if (!b(n[t], e[t])) return !1;
                        return !0
                    }
                    return !1
                }(e[0], n[0])) return !1;
            for (var t = 1; 5 > t; t++)
                if (!b(e[t], n[t])) return !1;
            return !0
        }
        return !1
    }

    function b(e, n) {
        return e && n && "*" === e || e === n
    }

    function A(e) {
        return Array.isArray(e) ? e : [e]
    }

    function T(e, n, t, o) {
        var r;
        return e = A(e).map((function(e) {
            e: if (p(e)) e = [e];
                else {
                    if (g(e)) {
                        n: {
                            var r = void 0;
                            try {
                                if (r = e({
                                        event: n.getPayload(),
                                        eventType: t,
                                        eventSchema: o
                                    }), Array.isArray(r) && r.every(p) || p(r)) {
                                    var a = r;
                                    break n
                                }
                                a = void 0;
                                break n
                            } catch (e) {}
                            a = void 0
                        }
                        if (p(a)) {
                            e = [a];
                            break e
                        }
                        if (Array.isArray(a)) {
                            e = a;
                            break e
                        }
                    }
                    e = void 0
                }if (e && 0 !== e.length) return e
        })), (r = []).concat.apply(r, e.filter((function(e) {
            return null != e && e.filter(Boolean)
        })))
    }

    function P(e) {
        void 0 === e && (e = {});
        var n = e.base64,
            t = e.corePlugins,
            r = null != t ? t : [];
        e = function(e, n, t) {
            function r(e, n) {
                e = s.getApplicableContexts(e);
                var t = [];
                return n && n.length && t.push.apply(t, n), e && e.length && t.push.apply(t, e), t
            }
            var a = function(e) {
                    return {
                        addPluginContexts: function(n) {
                            var t = null != n ? n : [];
                            return e.forEach((function(e) {
                                try {
                                    e.contexts && t.push.apply(t, e.contexts())
                                } catch (e) {
                                    Re.error("Error adding plugin contexts", e)
                                }
                            })), t
                        }
                    }
                }(n),
                s = c(),
                u = e,
                l = {};
            return {
                track: function(e, i, c) {
                    e.withJsonProcessor(function(e) {
                        return function(n, t) {
                            for (var r = 0; r < t.length; r++) {
                                var a = t[r],
                                    i = JSON.stringify(a.json);
                                e ? n.add(a.keyIfEncoded, o(i)) : n.add(a.keyIfNotEncoded, i)
                            }
                            t.length = 0
                        }
                    }(u)), e.add("eid", Fe.v4()), e.addDict(l), c = function(e) {
                        return null == e ? {
                            type: "dtm",
                            value: (new Date).getTime()
                        } : "number" == typeof e ? {
                            type: "dtm",
                            value: e
                        } : "ttm" === e.type ? {
                            type: "ttm",
                            value: e.value
                        } : {
                            type: "dtm",
                            value: e.value || (new Date).getTime()
                        }
                    }(c), e.add(c.type, c.value.toString()), void 0 !== (i = (i = r(e, a.addPluginContexts(i))) && i.length ? {
                        schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
                        data: i
                    } : void 0) && e.addJson("cx", "co", i), n.forEach((function(n) {
                        try {
                            n.beforeTrack && n.beforeTrack(e)
                        } catch (e) {
                            Re.error("Plugin beforeTrack", e)
                        }
                    })), "function" == typeof t && t(e);
                    var s = e.build();
                    return n.forEach((function(e) {
                        try {
                            e.afterTrack && e.afterTrack(s)
                        } catch (e) {
                            Re.error("Plugin afterTrack", e)
                        }
                    })), s
                },
                addPayloadPair: function(e, n) {
                    l[e] = n
                },
                getBase64Encoding: function() {
                    return u
                },
                setBase64Encoding: function(e) {
                    u = e
                },
                addPayloadDict: function(e) {
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (l[n] = e[n])
                },
                resetPayloadPairs: function(e) {
                    l = i(e) ? e : {}
                },
                setTrackerVersion: function(e) {
                    l.tv = e
                },
                setTrackerNamespace: function(e) {
                    l.tna = e
                },
                setAppId: function(e) {
                    l.aid = e
                },
                setPlatform: function(e) {
                    l.p = e
                },
                setUserId: function(e) {
                    l.uid = e
                },
                setScreenResolution: function(e, n) {
                    l.res = e + "x" + n
                },
                setViewport: function(e, n) {
                    l.vp = e + "x" + n
                },
                setColorDepth: function(e) {
                    l.cd = e
                },
                setTimezone: function(e) {
                    l.tz = e
                },
                setLang: function(e) {
                    l.lang = e
                },
                setIpAddress: function(e) {
                    l.ip = e
                },
                setUseragent: function(e) {
                    l.ua = e
                },
                addGlobalContexts: function(e) {
                    s.addGlobalContexts(e)
                },
                clearGlobalContexts: function() {
                    s.clearGlobalContexts()
                },
                removeGlobalContexts: function(e) {
                    s.removeGlobalContexts(e)
                }
            }
        }(null == n || n, r, e.callback);
        var a = Oe(Oe({}, e), {
            addPlugin: function(e) {
                var n, t;
                e = e.plugin, r.push(e), null === (n = e.logger) || void 0 === n || n.call(e, Re), null === (t = e.activateCorePlugin) || void 0 === t || t.call(e, a)
            }
        });
        return null == r || r.forEach((function(e) {
            var n, t;
            null === (n = e.logger) || void 0 === n || n.call(e, Re), null === (t = e.activateCorePlugin) || void 0 === t || t.call(e, a)
        })), a
    }

    function _(e) {
        var n = e.event;
        return e = {
            schema: "iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0",
            data: {
                schema: e = n.schema,
                data: n.data
            }
        }, (n = r()).add("e", "ue"), n.addJson("ue_px", "ue_pr", e), n
    }

    function C(e) {
        var n = e.pageUrl,
            t = e.pageTitle;
        e = e.referrer;
        var o = r();
        return o.add("e", "pv"), o.add("url", n), o.add("page", t), o.add("refr", e), o
    }

    function S(e) {
        var n = e.pageUrl,
            t = e.pageTitle,
            o = e.referrer,
            a = e.minXOffset,
            i = e.maxXOffset,
            c = e.minYOffset;
        e = e.maxYOffset;
        var s = r();
        return s.add("e", "pp"), s.add("url", n), s.add("page", t), s.add("refr", o), a && !isNaN(Number(a)) && s.add("pp_mix", a.toString()), i && !isNaN(Number(i)) && s.add("pp_max", i.toString()), c && !isNaN(Number(c)) && s.add("pp_miy", c.toString()), e && !isNaN(Number(e)) && s.add("pp_may", e.toString()), s
    }

    function O(e) {
        var n = e.orderId,
            t = e.sku,
            o = e.price,
            a = e.name,
            i = e.category,
            c = e.quantity;
        e = e.currency;
        var s = r();
        return s.add("e", "ti"), s.add("ti_id", n), s.add("ti_sk", t), s.add("ti_nm", a), s.add("ti_ca", i), s.add("ti_pr", o), s.add("ti_qu", c), s.add("ti_cu", e), s
    }

    function x(e) {
        return _({
            event: e = {
                schema: "iglu:com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-1",
                data: E({
                    targetUrl: e.targetUrl,
                    elementId: e.elementId,
                    elementClasses: e.elementClasses,
                    elementTarget: e.elementTarget,
                    elementContent: e.elementContent
                })
            }
        })
    }

    function E(e, n) {
        void 0 === n && (n = {});
        var t, o = {};
        for (t in e)(n[t] || null !== e[t] && void 0 !== e[t]) && (o[t] = e[t]);
        return o
    }

    function I(e) {
        return Number.isInteger && Number.isInteger(e) || "number" == typeof e && isFinite(e) && Math.floor(e) === e
    }

    function j(e) {
        return !(!e || "function" != typeof e)
    }

    function D(e) {
        if (!e || "string" != typeof e.valueOf()) {
            e = e.text || "";
            var n = document.getElementsByTagName("title");
            n && null != n[0] && (e = n[0].text)
        }
        return e
    }

    function N(e) {
        var n = /^(?:(?:https?|ftp):)\/*(?:[^@]+@)?([^:/#]+)/.exec(e);
        return n ? n[1] : e
    }

    function L(e) {
        var n = e.length;
        return "." === e.charAt(--n) && (e = e.slice(0, n)), "*." === e.slice(0, 2) && (e = e.slice(1)), e
    }

    function B(e) {
        var n = window,
            t = "",
            o = M("referrer", n.location.href) || M("referer", n.location.href);
        if (o) return o;
        if (e) return e;
        try {
            t = n.top.document.referrer
        } catch (e) {
            if (n.parent) try {
                t = n.parent.document.referrer
            } catch (e) {
                t = ""
            }
        }
        return "" === t && (t = document.referrer), t
    }

    function z(e, n, t, o) {
        return e.addEventListener ? (e.addEventListener(n, t, o), !0) : e.attachEvent ? e.attachEvent("on" + n, t) : void(e["on" + n] = t)
    }

    function M(e, n) {
        return (e = new RegExp("^[^#]*[?&]" + e + "=([^&#]*)").exec(n)) ? decodeURIComponent(e[1].replace(/\+/g, " ")) : null
    }

    function U(e, n, t) {
        void 0 === t && (t = 63072e3);
        try {
            var o = window.localStorage,
                r = Date.now() + 1e3 * t;
            return o.setItem(e + ".expires", r.toString()), o.setItem(e, n), !0
        } catch (e) {
            return !1
        }
    }

    function F(e) {
        try {
            var n = window.localStorage;
            return n.removeItem(e), n.removeItem(e + ".expires"), !0
        } catch (e) {
            return !1
        }
    }

    function V(e, n, t, o, r, a, i) {
        return 1 < arguments.length ? document.cookie = e + "=" + encodeURIComponent(null != n ? n : "") + (t ? "; Expires=" + new Date(+new Date + 1e3 * t).toUTCString() : "") + (o ? "; Path=" + o : "") + (r ? "; Domain=" + r : "") + (a ? "; SameSite=" + a : "") + (i ? "; Secure" : "") : decodeURIComponent((("; " + document.cookie).split("; " + e + "=")[1] || "").split(";")[0])
    }

    function H(e) {
        return e = parseInt(e), isNaN(e) ? void 0 : e
    }

    function R(e) {
        return e = parseFloat(e), isNaN(e) ? void 0 : e
    }

    function G(e) {
        if (null == e || "object" != typeof e || Array.isArray(e)) return function() {
            return !0
        };
        var n = Object.prototype.hasOwnProperty.call(e, "allowlist"),
            t = X(e);
        return Y(e, (function(e) {
            e: {
                var o = 0;
                for (e = J(e); o < e.length; o++)
                    if (t[e[o]]) {
                        o = !0;
                        break e
                    } o = !1
            }
            return o === n
        }))
    }

    function q(e) {
        if (null == e || "object" != typeof e || Array.isArray(e)) return function() {
            return !0
        };
        var n = e.hasOwnProperty("allowlist"),
            t = X(e);
        return Y(e, (function(e) {
            return e.name in t === n
        }))
    }

    function J(e) {
        return e.className.match(/\S+/g) || []
    }

    function Y(e, n) {
        return e.hasOwnProperty("filter") && e.filter ? e.filter : n
    }

    function X(e) {
        var n = {};
        if (e = e.allowlist || e.denylist) {
            Array.isArray(e) || (e = [e]);
            for (var t = 0; t < e.length; t++) n[e[t]] = !0
        }
        return n
    }

    function K(e, n, t, o, r, a, i, c, s, u, l) {
        function f(e) {
            for (var n = 0, t = 0; t < e.length; t++) {
                var o = e.charCodeAt(t);
                127 >= o ? n += 1 : 2047 >= o ? n += 2 : 55296 <= o && 57343 >= o ? (n += 4, t++) : n = 65535 > o ? n + 3 : n + 4
            }
            return n
        }

        function d(e) {
            for (void 0 === e && (e = !1); w.length && "string" != typeof w[0] && "object" != typeof w[0];) w.shift();
            if (1 > w.length) y = !1;
            else {
                if (!h || "string" != typeof h.valueOf()) throw "No collector configured";
                if (y = !0, P) {
                    var n = function(e) {
                            for (var n = 0, t = 0; n < e.length && !((t += e[n].bytes) >= i);) n += 1;
                            return n
                        },
                        o = void 0;
                    if (x(w)) var r = m(o = h, !0, e),
                        a = n(w);
                    else o = v(w[0]), r = m(o, !1, e), a = 1;
                    var c = setTimeout((function() {
                            r.abort(), y = !1
                        }), u),
                        f = function(e) {
                            for (var n = 0; n < e; n++) w.shift();
                            t && U(S, JSON.stringify(w.slice(0, s))), d()
                        };
                    if (r.onreadystatechange = function() {
                            4 === r.readyState && 200 <= r.status && 400 > r.status ? (clearTimeout(c), f(a)) : 4 === r.readyState && 400 <= r.status && (clearTimeout(c), y = !1)
                        }, x(w)) {
                        if (0 < (n = w.slice(0, a)).length) {
                            if (e = !1, n = n.map((function(e) {
                                    return e.evt
                                })), T) {
                                var k = new Blob([p(g(n))], {
                                    type: "application/json"
                                });
                                try {
                                    e = navigator.sendBeacon(o, k)
                                } catch (n) {
                                    e = !1
                                }
                            }!0 === e ? f(a) : r.send(p(g(n)))
                        }
                    } else r.send()
                } else if (l || x(w)) y = !1;
                else {
                    o = new Image(1, 1);
                    var b = !0;
                    o.onload = function() {
                        b && (b = !1, w.shift(), t && U(S, JSON.stringify(w.slice(0, s))), d())
                    }, o.onerror = function() {
                        b && (y = b = !1)
                    }, o.src = v(w[0]), setTimeout((function() {
                        b && y && (b = !1, d())
                    }), u)
                }
            }
        }

        function m(e, n, t) {
            var o = new XMLHttpRequest;
            return n ? (o.open("POST", e, !t), o.setRequestHeader("Content-Type", "application/json; charset=UTF-8")) : o.open("GET", e, !t), o.withCredentials = !0, l && o.setRequestHeader("SP-Anonymous", "*"), o
        }

        function p(e) {
            return JSON.stringify({
                schema: "iglu:com.snowplowanalytics.snowplow/payload_data/jsonschema/1-0-4",
                data: e
            })
        }

        function g(e) {
            for (var n = (new Date).getTime().toString(), t = 0; t < e.length; t++) e[t].stm = n;
            return e
        }

        function v(e) {
            return c ? h + e.replace("?", "?stm=" + (new Date).getTime() + "&") : h + e
        }
        var h, y = !1,
            w = [];
        o = "string" == typeof o ? o.toLowerCase() : o;
        var k = window.localStorage,
            b = window.navigator,
            A = null === o || !0 === o || "beacon" === o || "true" === o,
            T = !(!(A && b && b.sendBeacon) || function(e) {
                return function(e, n) {
                    return !(!(n = n.match("(iP.+; CPU .*OS (d+)[_d]*.*) AppleWebKit/")) || !n.length) && parseInt(n[0]) <= 13
                }(0, e) || function(e, n, t) {
                    return !(!(t = t.match("(Macintosh;.*Mac OS X (d+)_(d+)[_d]*.*) AppleWebKit/")) || !t.length) && (parseInt(t[0]) <= e || parseInt(t[0]) === e && parseInt(t[1]) <= n)
                }(10, 15, e) && function(e) {
                    return e.match("Version/.* Safari/") && !e.match("Chrom(e|ium)")
                }(e)
            }(b.userAgent)) && A,
            P = !(!window.XMLHttpRequest || !("withCredentials" in new XMLHttpRequest)),
            _ = "get" !== o && P && ("post" === o || A),
            C = _ ? r : "/i",
            S = "snowplowOutQueue_" + e + "_" + (_ ? "post2" : "get");
        if (a = function() {
                try {
                    var e = !!window.localStorage
                } catch (n) {
                    e = !0
                }
                if (!e) return !1;
                try {
                    var n = window.localStorage;
                    return n.setItem("modernizr", "modernizr"), n.removeItem("modernizr"), !0
                } catch (e) {
                    return !1
                }
            }() && t && _ && a || 1, t) try {
            var O = k.getItem(S);
            w = O ? JSON.parse(O) : []
        } catch (e) {}
        Array.isArray(w) || (w = []), n.outQueues.push(w), P && 1 < a && n.bufferFlushers.push((function(e) {
            y || d(e)
        }));
        var x = function(e) {
            return "object" == typeof e[0]
        };
        return {
            enqueueRequest: function(e, n) {
                if (h = n + C, _) {
                    if ((e = function(e) {
                            var n = Object.keys(e).map((function(n) {
                                return [n, e[n]]
                            })).reduce((function(e, n) {
                                return e[n[0]] = n[1].toString(), e
                            }), {});
                            return {
                                evt: n,
                                bytes: f(JSON.stringify(n))
                            }
                        }(e)).bytes >= i) return Re.warn("Event (" + e.bytes + "B) too big, max is " + i), void m(h, !0, !1).send(p(g([e.evt])));
                    w.push(e)
                } else w.push(function(e) {
                    var n, t = "?",
                        o = {
                            co: !0,
                            cx: !0
                        },
                        r = !0;
                    for (n in e) e.hasOwnProperty(n) && !o.hasOwnProperty(n) && (r ? r = !1 : t += "&", t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
                    for (var a in o) e.hasOwnProperty(a) && o.hasOwnProperty(a) && (t += "&" + a + "=" + encodeURIComponent(e[a]));
                    return t
                }(e));
                e = !1, t && (e = U(S, JSON.stringify(w.slice(0, s)))), y || e && !(w.length >= a) || d()
            },
            executeQueue: function() {
                y || d()
            },
            setUseLocalStorage: function(e) {
                t = e
            },
            setAnonymousTracking: function(e) {
                l = e
            },
            setCollectorUrl: function(e) {
                h = e + C
            },
            setBufferSize: function(e) {
                a = e
            }
        }
    }

    function W(e, n, t) {
        return "translate.googleusercontent.com" === e ? ("" === t && (t = n), e = N(n = null != (e = (e = /^(?:https?|ftp)(?::\/*(?:[^?]+))([?][^#]+)/.exec(n)) && 1 < (null == e ? void 0 : e.length) ? M("u", e[1]) : null) ? e : "")) : "cc.bingj.com" !== e && "webcache.googleusercontent.com" !== e || (e = N(n = document.links[0].href)), [e, n, t]
    }

    function Q(e, n, t, o, r, a) {
        var i;
        void 0 === a && (a = {}), e = function(e, n, t, o, r, a) {
            function i() {
                (Ie = W(window.location.hostname, window.location.href, B()))[1] !== De && (Ne = B(De)), je = L(Ie[0]), De = Ie[1]
            }

            function c(e) {
                var n = (new Date).getTime();
                if (null != (e = e.target) && e.href) {
                    n = "_sp=" + Pe + "." + n;
                    var t = e.href.split("#"),
                        o = t[0].split("?"),
                        r = o.shift();
                    if (o = o.join("?")) {
                        for (var a = !0, i = o.split("&"), c = 0; c < i.length; c++)
                            if ("_sp=" === i[c].substr(0, 4)) {
                                a = !1, i[c] = n, o = i.join("&");
                                break
                            } a && (o = n + "&" + o)
                    } else o = n;
                    t[0] = r + "?" + o, n = t.join("#"), e.href = n
                }
            }

            function s(e) {
                for (var n = 0; n < document.links.length; n++) {
                    var t = document.links[n];
                    !t.spDecorationEnabled && e(t) && (z(t, "click", c, !0), z(t, "mousedown", c, !0), t.spDecorationEnabled = !0)
                }
            }

            function u(e) {
                if (ge) {
                    var n = /#.*/;
                    e = e.replace(n, "")
                }
                return ve && (n = /[{}]/g, e = e.replace(n, "")), e
            }

            function l(e) {
                return (e = /^([a-z]+):/.exec(e)) ? e[1] : null
            }

            function f(e) {
                if (e = He + e + "." + Te, "localStorage" == tn) {
                    try {
                        var n = window.localStorage,
                            t = n.getItem(e + ".expires");
                        if (null === t || +t > Date.now()) var o = n.getItem(e);
                        else n.removeItem(e), n.removeItem(e + ".expires"), o = void 0
                    } catch (e) {
                        o = void 0
                    }
                    return o
                }
                if ("cookie" == tn || "cookieAndLocalStorage" == tn) return V(e)
            }

            function d() {
                i(), Te = Ye((Ge || je) + (qe || "/")).slice(0, 4)
            }

            function m() {
                ye = (new Date).getTime()
            }

            function p() {
                var e = g(),
                    n = e[0];
                n < we ? we = n : n > ke && (ke = n), (e = e[1]) < be ? be = e : e > Ae && (Ae = e), m()
            }

            function g() {
                var e = document.compatMode && "BackCompat" !== document.compatMode ? document.documentElement : document.body;
                return [e.scrollLeft || window.pageXOffset, e.scrollTop || window.pageYOffset]
            }

            function v() {
                var e = g(),
                    n = e[0];
                ke = we = n, Ae = be = e = e[1]
            }

            function h() {
                w(He + "ses." + Te, "*", Ze)
            }

            function y(e, n, t, o, r, a) {
                w(He + "id." + Te, e + "." + n + "." + t + "." + o + "." + r + "." + a, Qe)
            }

            function w(e, n, t) {
                nn && !$e || ("localStorage" == tn ? U(e, n, t) : ("cookie" == tn || "cookieAndLocalStorage" == tn) && V(e, n, t, qe, Ge, Je, Xe))
            }

            function k() {
                var e = He + "id." + Te,
                    n = He + "ses." + Te;
                F(e), F(n), V(e, "", -1, "/", Ge, Je, Xe), V(n, "", -1, "/", Ge, Je, Xe)
            }

            function b() {
                if (!nn || $e) {
                    var e = "none" != tn && !!f("ses"),
                        n = A();
                    n[1] ? Pe = n[1] : (Pe = nn ? "" : Fe.v4(), n[1] = Pe), _e = n[6], e || (n[3]++, _e = Fe.v4(), n[6] = _e, n[5] = n[4]), "none" != tn && (h(), n[4] = Math.round((new Date).getTime() / 1e3), n.shift(), y.apply(null, n))
                }
            }

            function A() {
                if ("none" == tn) return [];
                var e = Math.round((new Date).getTime() / 1e3),
                    n = f("id");
                return n ? (e = n.split(".")).unshift("0") : e = ["1", Pe, e, 0, e, ""], e[6] || (e[6] = Fe.v4()), e
            }

            function T(e) {
                return 0 === e.indexOf("http") ? e : ("https:" === document.location.protocol ? "https" : "http") + "://" + e
            }

            function _() {
                cn && null != r.pageViewId || (r.pageViewId = Fe.v4())
            }

            function O() {
                return null == r.pageViewId && (r.pageViewId = Fe.v4()), r.pageViewId
            }

            function x(e, n, t) {
                var o = function(e, n) {
                        i(), e({
                            context: n,
                            pageViewId: O(),
                            minXOffset: we,
                            minYOffset: be,
                            maxXOffset: ke,
                            maxYOffset: Ae
                        }), v()
                    },
                    r = function() {
                        ye + e.configHeartBeatTimer > (new Date).getTime() && o(e.callback, (n || []).concat(t ? t() : []))
                    };
                e.activityInterval = 0 != e.configMinimumVisitLength ? window.setTimeout((function() {
                    ye + e.configMinimumVisitLength > (new Date).getTime() && o(e.callback, (n || []).concat(t ? t() : [])), e.activityInterval = window.setInterval(r, e.configHeartBeatTimer)
                }), e.configMinimumVisitLength) : window.setInterval(r, e.configHeartBeatTimer)
            }

            function E(e) {
                var n = e.minimumVisitLength,
                    t = e.heartbeatDelay;
                if (e = e.callback, I(n) && I(t)) return {
                    configMinimumVisitLength: 1e3 * n,
                    configHeartBeatTimer: 1e3 * t,
                    callback: e
                };
                Re.warn("Activity tracking not enabled, please provide integer values for minimumVisitLength and heartbeatDelay.")
            }

            function j(e) {
                var n = e.context,
                    t = e.minXOffset,
                    o = e.minYOffset,
                    r = e.maxXOffset;
                e = e.maxYOffset;
                var a = document.title;
                a !== Ue && (Ue = a, pe = void 0), Se.track(S({
                    pageUrl: u(me || De),
                    pageTitle: D(pe || Ue),
                    referrer: u(de || Ne),
                    minXOffset: Math.round(t),
                    maxXOffset: Math.round(r),
                    minYOffset: Math.round(o),
                    maxYOffset: Math.round(e)
                }), n)
            }
            var H, R, G, q, J, Y, X, Q, Z, $, ee, ne, te, oe, re, ae, ie, ce, se;
            a.eventMethod = null !== (H = a.eventMethod) && void 0 !== H ? H : "post";
            var ue = function(e) {
                    var n;
                    return null !== (n = e.stateStorageStrategy) && void 0 !== n ? n : "cookieAndLocalStorage"
                },
                le = function(e) {
                    var n, t;
                    return "boolean" != typeof e.anonymousTracking && (null !== (t = !0 === (null === (n = e.anonymousTracking) || void 0 === n ? void 0 : n.withSessionTracking)) && void 0 !== t && t)
                },
                fe = function(e) {
                    var n, t;
                    return "boolean" != typeof e.anonymousTracking && (null !== (t = !0 === (null === (n = e.anonymousTracking) || void 0 === n ? void 0 : n.withServerAnonymisation)) && void 0 !== t && t)
                };
            a.plugins = null !== (R = a.plugins) && void 0 !== R ? R : [], (null === (q = null === (G = null == a ? void 0 : a.contexts) || void 0 === G ? void 0 : G.webPage) || void 0 === q || q) && a.plugins.push({
                contexts: function() {
                    return [{
                        schema: "iglu:com.snowplowanalytics.snowplow/web_page/jsonschema/1-0-0",
                        data: {
                            id: O()
                        }
                    }]
                }
            });
            var de, me, pe, ge, ve, he, ye, we, ke, be, Ae, Te, Pe, _e, Ce, Se = P({
                    base64: a.encodeBase64,
                    corePlugins: a.plugins,
                    callback: function(e) {
                        var n = Math.round((new Date).getTime() / 1e3),
                            t = f("ses"),
                            o = A(),
                            r = o[0],
                            a = o[1],
                            c = o[2],
                            s = o[3],
                            l = o[4],
                            d = o[5];
                        o = o[6];
                        var m = !!he && !!V(he);
                        We || m ? k() : ("0" === r ? (_e = o, t || "none" == tn || (s++, d = l, _e = Fe.v4()), rn = s) : (new Date).getTime() - on > 1e3 * Ze && (_e = Fe.v4(), rn++), e.add("vp", function() {
                            if ("innerWidth" in window) var e = window.innerWidth,
                                n = window.innerHeight;
                            else e = (n = document.documentElement || document.body).clientWidth, n = n.clientHeight;
                            return 0 <= e && 0 <= n ? e + "x" + n : null
                        }()), e.add("ds", function() {
                            var e = document.documentElement,
                                n = document.body,
                                t = Math.max(e.clientWidth, e.offsetWidth, e.scrollWidth);
                            return e = Math.max(e.clientHeight, e.offsetHeight, e.scrollHeight, n ? Math.max(n.offsetHeight, n.scrollHeight) : 0), isNaN(t) || isNaN(e) ? "" : t + "x" + e
                        }()), e.add("vid", $e ? rn : nn ? null : rn), e.add("sid", $e ? _e : nn ? null : _e), e.add("duid", nn ? null : a), e.add("uid", nn ? null : Ce), i(), e.add("refr", u(de || Ne)), e.add("url", u(me || De)), "none" != tn && (y(a, c, rn, n, d, _e), h()), on = (new Date).getTime()), n = !!he && !!V(he), We || n || an.enqueueRequest(e.build(), Be)
                    }
                }),
                xe = navigator.userLanguage || navigator.language,
                Ee = document.characterSet || document.charset,
                Ie = W(window.location.hostname, window.location.href, B()),
                je = L(Ie[0]),
                De = Ie[1],
                Ne = Ie[2],
                Le = null !== (J = a.platform) && void 0 !== J ? J : "web",
                Be = T(o),
                ze = null !== (Y = a.postPath) && void 0 !== Y ? Y : "/com.snowplowanalytics.snowplow/tp2",
                Me = null !== (X = a.appId) && void 0 !== X ? X : "",
                Ue = document.title,
                Ve = null === (Q = a.resetActivityTrackingOnPageView) || void 0 === Q || Q,
                He = null !== (Z = a.cookieName) && void 0 !== Z ? Z : "_sp_",
                Ge = null !== ($ = a.cookieDomain) && void 0 !== $ ? $ : void 0,
                qe = "/",
                Je = null !== (ee = a.cookieSameSite) && void 0 !== ee ? ee : "None",
                Xe = null === (ne = a.cookieSecure) || void 0 === ne || ne,
                Ke = navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack,
                We = void 0 !== a.respectDoNotTrack && (a.respectDoNotTrack && ("yes" === Ke || "1" === Ke)),
                Qe = null !== (te = a.cookieLifetime) && void 0 !== te ? te : 63072e3,
                Ze = null !== (oe = a.sessionCookieTimeout) && void 0 !== oe ? oe : 1800,
                $e = le(a),
                en = fe(a),
                nn = !!a.anonymousTracking,
                tn = ue(a),
                on = (new Date).getTime(),
                rn = 1,
                an = K(e, r, "localStorage" == tn || "cookieAndLocalStorage" == tn, a.eventMethod, ze, null !== (re = a.bufferSize) && void 0 !== re ? re : 1, null !== (ae = a.maxPostBytes) && void 0 !== ae ? ae : 4e4, null === (ie = a.useStm) || void 0 === ie || ie, null !== (ce = a.maxLocalStorageQueueSize) && void 0 !== ce ? ce : 1e3, null !== (se = a.connectionTimeout) && void 0 !== se ? se : 5e3, en),
                cn = !1,
                sn = !1,
                un = {
                    enabled: !1,
                    installed: !1,
                    configurations: {}
                };
            return a.hasOwnProperty("discoverRootDomain") && a.discoverRootDomain && (Ge = function(e, n) {
                for (var t = window.location.hostname, o = "_sp_root_domain_test_" + (new Date).getTime(), r = "_test_value_" + (new Date).getTime(), a = t.split("."), i = a.length - 1; 0 <= i;) {
                    var c = a.slice(i, a.length).join(".");
                    if (V(o, r, 0, "/", c, e, n), V(o) === r) {
                        for (V(o, "", -1, "/", c, e, n), t = document.cookie.split("; "), o = [], r = 0; r < t.length; r++) "_sp_root_domain_test_" === t[r].substring(0, 21) && o.push(t[r]);
                        for (t = o, o = 0; o < t.length; o++) V(t[o], "", -1, "/", c, e, n);
                        return c
                    }--i
                }
                return t
            }(Je, Xe)), Se.setTrackerVersion(t), Se.setTrackerNamespace(n), Se.setAppId(Me), Se.setPlatform(Le), Se.addPayloadPair("cookie", navigator.cookieEnabled ? "1" : "0"), Se.addPayloadPair("cs", Ee), Se.addPayloadPair("lang", xe), Se.addPayloadPair("res", screen.width + "x" + screen.height), Se.addPayloadPair("cd", screen.colorDepth), d(), b(), a.crossDomainLinker && s(a.crossDomainLinker), Oe(Oe({}, {
                getDomainSessionIndex: function() {
                    return rn
                },
                getPageViewId: function() {
                    return O()
                },
                newSession: function() {
                    var e = Math.round((new Date).getTime() / 1e3),
                        n = A(),
                        t = n[1],
                        o = n[2],
                        r = n[3],
                        a = n[4],
                        i = n[5],
                        c = n[6];
                    "0" === n[0] ? (_e = c, "none" != tn && (r++, i = a, _e = Fe.v4()), rn = r, h()) : (_e = Fe.v4(), rn++), "none" != tn && (y(t, o, rn, e, i, _e), h()), on = (new Date).getTime()
                },
                getCookieName: function(e) {
                    return He + e + "." + Te
                },
                getUserId: function() {
                    return Ce
                },
                getDomainUserId: function() {
                    return A()[1]
                },
                getDomainUserInfo: function() {
                    return A()
                },
                setReferrerUrl: function(e) {
                    de = e
                },
                setCustomUrl: function(e) {
                    i();
                    var n, t = De;
                    l(e) ? me = e : "/" === e.slice(0, 1) ? me = l(t) + "://" + N(t) + e : (0 <= (n = (t = u(t)).indexOf("?")) && (t = t.slice(0, n)), (n = t.lastIndexOf("/")) !== t.length - 1 && (t = t.slice(0, n + 1)), me = t + e)
                },
                setDocumentTitle: function(e) {
                    Ue = document.title, pe = e
                },
                discardHashTag: function(e) {
                    ge = e
                },
                discardBrace: function(e) {
                    ve = e
                },
                setCookiePath: function(e) {
                    qe = e, d()
                },
                setVisitorCookieTimeout: function(e) {
                    Qe = e
                },
                crossDomainLinker: function(e) {
                    s(e)
                },
                enableActivityTracking: function(e) {
                    un.enabled = !0, un.configurations.pagePing = E(Oe(Oe({}, e), {
                        callback: j
                    }))
                },
                enableActivityTrackingCallback: function(e) {
                    un.enabled = !0, un.configurations.callback = E(e)
                },
                updatePageActivity: function() {
                    m()
                },
                setOptOutCookie: function(e) {
                    he = e
                },
                setUserId: function(e) {
                    Ce = e
                },
                setUserIdFromLocation: function(e) {
                    i(), Ce = M(e, De)
                },
                setUserIdFromReferrer: function(e) {
                    i(), Ce = M(e, Ne)
                },
                setUserIdFromCookie: function(e) {
                    Ce = V(e)
                },
                setCollectorUrl: function(e) {
                    Be = T(e), an.setCollectorUrl(Be)
                },
                setBufferSize: function(e) {
                    an.setBufferSize(e)
                },
                flushBuffer: function(e) {
                    void 0 === e && (e = {}), an.executeQueue(), e.newBufferSize && an.setBufferSize(e.newBufferSize)
                },
                trackPageView: function(e) {
                    void 0 === e && (e = {}),
                        function(e) {
                            var n = e.title,
                                t = e.context,
                                o = e.timestamp;
                            if (e = e.contextCallback, i(), sn && _(), sn = !0, Ue = document.title, n = D((pe = n) || Ue), Se.track(C({
                                    pageUrl: u(me || De),
                                    pageTitle: n,
                                    referrer: u(de || Ne)
                                }), (t || []).concat(e ? e() : []), o), o = new Date, n = !1, un.enabled && !un.installed) {
                                n = un.installed = !0;
                                var r = {
                                    update: function() {
                                        if ("undefined" != typeof window && "function" == typeof window.addEventListener) {
                                            var e = !1,
                                                n = Object.defineProperty({}, "passive", {
                                                    get: function() {
                                                        e = !0
                                                    }
                                                }),
                                                t = function() {};
                                            window.addEventListener("testPassiveEventSupport", t, n), window.removeEventListener("testPassiveEventSupport", t, n), r.hasSupport = e
                                        }
                                    }
                                };
                                r.update();
                                var a = "onwheel" in document.createElement("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll";
                                Object.prototype.hasOwnProperty.call(r, "hasSupport") ? z(document, a, m, {
                                    passive: !0
                                }) : z(document, a, m), v(), a = function(e, n) {
                                    return void 0 === n && (n = m),
                                        function(e) {
                                            return z(document, e, n)
                                        }
                                }, "click mouseup mousedown mousemove keypress keydown keyup".split(" ").forEach(a(document)), ["resize", "focus", "blur"].forEach(a(window)), a(window, p)("scroll")
                            }
                            if (un.enabled && (Ve || n))
                                for (o in ye = o.getTime(), o = void 0, un.configurations)(n = un.configurations[o]) && (window.clearInterval(n.activityInterval), x(n, t, e))
                        }(e)
                },
                preservePageViewId: function() {
                    cn = !0
                },
                disableAnonymousTracking: function(e) {
                    e && e.stateStorageStrategy ? (a.stateStorageStrategy = e.stateStorageStrategy, a.anonymousTracking = !1, tn = ue(a)) : a.anonymousTracking = !1, nn = !!a.anonymousTracking, $e = le(a), en = fe(a), an.setUseLocalStorage("localStorage" == tn || "cookieAndLocalStorage" == tn), an.setAnonymousTracking(en), b(), an.executeQueue()
                },
                enableAnonymousTracking: function(e) {
                    a.anonymousTracking = e && (null == e ? void 0 : e.options) || !0, nn = !!a.anonymousTracking, $e = le(a), en = fe(a), $e || _(), an.setAnonymousTracking(en)
                },
                clearUserData: k
            }), {
                id: e,
                namespace: n,
                core: Se,
                sharedState: r
            })
        }(e, n, t, o, r, a);
        var c = Oe(Oe({}, e), {
            addPlugin: function(e) {
                var n, t;
                c.core.addPlugin(e), null === (t = (n = e.plugin).activateBrowserPlugin) || void 0 === t || t.call(n, c)
            }
        });
        return null === (i = a.plugins) || void 0 === i || i.forEach((function(e) {
            var n;
            null === (n = e.activateBrowserPlugin) || void 0 === n || n.call(e, c)
        })), c
    }

    function Z(e, n) {
        try {
            ne(null != e ? e : Object.keys(Xe), Xe).forEach(n)
        } catch (e) {
            Re.error("Function failed", e)
        }
    }

    function $(e, n, t) {
        try {
            ne(null != e ? e : Object.keys(n), n).forEach(t)
        } catch (e) {
            Re.error("Function failed", e)
        }
    }

    function ee(e, n, t, o, r, a) {
        return Xe.hasOwnProperty(e) ? null : (Xe[e] = Q(e, n, t, o, r, a), Xe[e])
    }

    function ne(e, n) {
        for (var t = [], o = 0; o < e.length; o++) {
            var r = e[o];
            n.hasOwnProperty(r) ? t.push(n[r]) : Re.warn(r + " not configured")
        }
        return t
    }

    function te() {
        function e() {
            var e;
            if (!n.hasLoaded)
                for (n.hasLoaded = !0, e = 0; e < n.registeredOnLoadHandlers.length; e++) n.registeredOnLoadHandlers[e]();
            return !0
        }
        var n = new Ke,
            t = document,
            o = window;
        return t.visibilityState && z(t, "visibilitychange", (function() {
            "hidden" == document.visibilityState && n.bufferFlushers.forEach((function(e) {
                e(!1)
            }))
        }), !1), z(o, "beforeunload", (function() {
            n.bufferFlushers.forEach((function(e) {
                e(!1)
            }))
        }), !1), t.addEventListener ? t.addEventListener("DOMContentLoaded", (function n() {
            t.removeEventListener("DOMContentLoaded", n, !1), e()
        })) : t.attachEvent && t.attachEvent("onreadystatechange", (function n() {
            "complete" === t.readyState && (t.detachEvent("onreadystatechange", n), e())
        })), z(o, "load", e, !1), n
    }

    function oe(e) {
        if (Ze.userAgentData) {
            var n = {
                isMobile: Ze.userAgentData.mobile,
                brands: Ze.userAgentData.brands
            };
            e && Ze.userAgentData.getHighEntropyValues && Ze.userAgentData.getHighEntropyValues(["platform", "platformVersion", "architecture", "model", "uaFullVersion"]).then((function(e) {
                n.architecture = e.architecture, n.model = e.model, n.platform = e.platform, n.uaFullVersion = e.uaFullVersion, n.platformVersion = e.platformVersion
            }))
        }
        return {
            contexts: function() {
                return n ? [{
                    schema: "iglu:org.ietf/http_client_hints/jsonschema/1-0-0",
                    data: n
                }] : []
            }
        }
    }

    function re() {
        function e(e, n) {
            if (t && "function" == typeof t.get) {
                var o = t.get(e);
                void 0 !== n && void 0 !== o && (o = o[n])
            }
            return o
        }

        function n() {
            return function() {
                var n = e("state"),
                    t = n && n.getActiveExperimentIds(),
                    o = n && n.getVariationMap(),
                    r = e("visitor");
                return t.map((function(e) {
                    var n = o[e],
                        t = n && n.name && n.name.toString() || null;
                    n = n && n.id;
                    var a = r && r.visitorId && r.visitorId.toString() || null;
                    return {
                        experimentId: H(e) || null,
                        variationName: t,
                        variation: H(n) || null,
                        visitorId: a
                    }
                }))
            }().map((function(e) {
                return {
                    schema: "iglu:com.optimizely.optimizelyx/summary/jsonschema/1-0-0",
                    data: e
                }
            }))
        }
        var t = window.optimizely;
        return {
            contexts: function() {
                return t ? n() : []
            }
        }
    }

    function ae() {
        return {
            contexts: function() {
                var e = window,
                    n = (e = e.performance || e.mozPerformance || e.msPerformance || e.webkitPerformance).timing;
                return e = e ? [{
                    schema: "iglu:org.w3/PerformanceTiming/jsonschema/1-0-0",
                    data: {
                        navigationStart: n.navigationStart,
                        redirectStart: n.redirectStart,
                        redirectEnd: n.redirectEnd,
                        fetchStart: n.fetchStart,
                        domainLookupStart: n.domainLookupStart,
                        domainLookupEnd: n.domainLookupEnd,
                        connectStart: n.connectStart,
                        secureConnectionStart: n.secureConnectionStart,
                        connectEnd: n.connectEnd,
                        requestStart: n.requestStart,
                        responseStart: n.responseStart,
                        responseEnd: n.responseEnd,
                        unloadEventStart: n.unloadEventStart,
                        unloadEventEnd: n.unloadEventEnd,
                        domLoading: n.domLoading,
                        domInteractive: n.domInteractive,
                        domContentLoadedEventStart: n.domContentLoadedEventStart,
                        domContentLoadedEventEnd: n.domContentLoadedEventEnd,
                        domComplete: n.domComplete,
                        loadEventStart: n.loadEventStart,
                        loadEventEnd: n.loadEventEnd,
                        msFirstPaint: n.msFirstPaint,
                        chromeFirstPaint: n.chromeFirstPaint,
                        requestEnd: n.requestEnd,
                        proxyStart: n.proxyStart,
                        proxyEnd: n.proxyEnd
                    }
                }] : []
            }
        }
    }

    function ie() {
        var e;
        return {
            activateBrowserPlugin: function(n) {
                e = n.id, rn[n.id] = n
            },
            contexts: function() {
                return an[e] ? [{
                    schema: "iglu:com.snowplowanalytics.snowplow/gdpr/jsonschema/1-0-0",
                    data: an[e]
                }] : []
            },
            logger: function(e) {
                tn = e
            }
        }
    }

    function ce(e) {
        var n;
        return void 0 === e && (e = !1), {
            activateBrowserPlugin: function(t) {
                n = t.id, un[t.id] = [!1, void 0], e && se([n])
            },
            contexts: function() {
                var e, t = null === (e = un[n]) || void 0 === e ? void 0 : e[1];
                return t ? [t] : []
            }
        }
    }

    function se(e) {
        void 0 === e && (e = Object.keys(un)), e.forEach((function(e) {
            un[e] = [!0, on]
        })), !ln && sn.geolocation && sn.geolocation.getCurrentPosition && (ln = !0, sn.geolocation.getCurrentPosition((function(e) {
            var n = e.coords;
            for (var t in on = {
                    schema: "iglu:com.snowplowanalytics.snowplow/geolocation_context/jsonschema/1-1-0",
                    data: {
                        latitude: n.latitude,
                        longitude: n.longitude,
                        latitudeLongitudeAccuracy: n.accuracy,
                        altitude: n.altitude,
                        altitudeAccuracy: n.altitudeAccuracy,
                        bearing: n.heading,
                        speed: n.speed,
                        timestamp: Math.round(e.timestamp)
                    }
                }, un) Object.prototype.hasOwnProperty.call(un, t) && un[t][0] && (un[t] = [!0, on])
        })))
    }

    function ue() {
        return {
            contexts: function() {
                var e = {
                    schema: "iglu:com.google.analytics/cookies/jsonschema/1-0-0",
                    data: {}
                };
                return "__utma __utmb __utmc __utmv __utmz _ga".split(" ").forEach((function(n) {
                    var t = V(n);
                    t && (e.data[n] = t)
                })), [e]
            }
        }
    }

    function le() {
        return {
            activateBrowserPlugin: function(e) {
                mn[e.id] = e
            }
        }
    }

    function fe(e, n, t) {
        for (var o, r, a, i; null !== (o = n.parentElement) && null != o && "A" !== (r = n.tagName.toUpperCase()) && "AREA" !== r;) n = o;
        if (null != (o = n).href) {
            a = (r = o.hostname || N(o.href)).toLowerCase();
            var c = o.href.replace(r, a);
            /^(javascript|vbscript|jscript|mocha|livescript|ecmascript|mailto):/i.test(c) || (r = o.id, a = J(o), i = o.target, o = pn[e.id].linkTrackingContent ? o.innerHTML : void 0, c = unescape(c), e.core.track(x({
                targetUrl: c,
                elementId: r,
                elementClasses: a,
                elementTarget: i,
                elementContent: o
            }), s(t, n)))
        }
    }

    function de(e, n) {
        return function(t) {
            var o = (t = t || window.event).which || t.button,
                r = t.target || t.srcElement;
            "click" === t.type ? r && fe(mn[e], r, n) : "mousedown" === t.type ? 1 !== o && 2 !== o || !r ? pn[e].lastButton = pn[e].lastTarget = null : (pn[e].lastButton = o, pn[e].lastTarget = r) : "mouseup" === t.type && (o === pn[e].lastButton && r === pn[e].lastTarget && fe(mn[e], r, n), pn[e].lastButton = pn[e].lastTarget = null)
        }
    }

    function me(e, n) {
        e = void 0 === e ? {} : e, pn[n] = {
            linkTrackingContent: e.trackContent,
            linkTrackingContext: e.context,
            linkTrackingPseudoClicks: e.pseudoClicks,
            linkTrackingFilter: G(e.options)
        }
    }

    function pe(e) {
        var n, t, o, r = document.links;
        for (o = 0; o < r.length; o++)
            if (null !== (t = (n = pn[e]).linkTrackingFilter) && void 0 !== t && t.call(n, r[o]) && !r[o][e]) {
                var a = e,
                    i = r[o];
                pn[a].linkTrackingPseudoClicks ? (z(i, "mouseup", de(a, pn[a].linkTrackingContext), !1), z(i, "mousedown", de(a, pn[a].linkTrackingContext), !1)) : z(i, "click", de(a, pn[a].linkTrackingContext), !1), r[o][e] = !0
            }
    }

    function ge(e, n) {
        var t = n.context,
            o = e.id + "form",
            r = function(e) {
                return e ? {
                    formFilter: G(e.forms),
                    fieldFilter: q(e.fields),
                    fieldTransform: ve(e.fields)
                } : {
                    formFilter: function() {
                        return !0
                    },
                    fieldFilter: function() {
                        return !0
                    },
                    fieldTransform: hn
                }
            }(n.options);
        Array.prototype.slice.call(document.getElementsByTagName("form")).forEach((function(n) {
            r.formFilter(n) && !n[o] && (Array.prototype.slice.call(vn).forEach((function(a) {
                Array.prototype.slice.call(n.getElementsByTagName(a)).forEach((function(n) {
                    r.fieldFilter(n) && !n[o] && "password" !== n.type.toLowerCase() && (z(n, "focus", we(e, r, "focus_form", t), !1), z(n, "change", we(e, r, "change_form", t), !1), n[o] = !0)
                }))
            })), z(n, "submit", function(e, n, t, o) {
                return function(r) {
                    var a;
                    r = r.target;
                    var i = function(e, n) {
                        var t = [];
                        return Array.prototype.slice.call(vn).forEach((function(o) {
                            o = Array.prototype.slice.call(n.getElementsByTagName(o)).filter((function(n) {
                                return n.hasOwnProperty(e)
                            })), Array.prototype.slice.call(o).forEach((function(e) {
                                if ("submit" !== e.type) {
                                    var n = {
                                        name: he(e),
                                        value: e.value,
                                        nodeName: e.nodeName
                                    };
                                    e.type && "INPUT" === e.nodeName.toUpperCase() && (n.type = e.type), "checkbox" !== e.type && "radio" !== e.type || e.checked || (n.value = null), t.push(n)
                                }
                            }))
                        })), t
                    }(t, r);
                    i.forEach((function(e) {
                        var t;
                        e.value = null !== (t = n.fieldTransform(e.value, e)) && void 0 !== t ? t : e.value
                    })), e.core.track(function(e) {
                        return _({
                            event: {
                                schema: "iglu:com.snowplowanalytics.snowplow/submit_form/jsonschema/1-0-0",
                                data: E({
                                    formId: e.formId,
                                    formClasses: e.formClasses,
                                    elements: e.elements
                                })
                            }
                        })
                    }({
                        formId: null !== (a = he(r)) && void 0 !== a ? a : "",
                        formClasses: J(r),
                        elements: i
                    }), s(o, r, i))
                }
            }(e, r, o, t)), n[o] = !0)
        }))
    }

    function ve(e) {
        return e && Object.prototype.hasOwnProperty.call(e, "transform") ? e.transform : hn
    }

    function he(e) {
        for (var n = 0, t = ["name", "id", "type", "nodeName"]; n < t.length; n++) {
            var o = t[n];
            if (0 != e[o] && "string" == typeof e[o]) return e[o]
        }
        return null
    }

    function ye(e) {
        for (; e && e.nodeName && "HTML" !== e.nodeName.toUpperCase() && "FORM" !== e.nodeName.toUpperCase();) e = e.parentNode;
        return e && e.nodeName && "FORM" === e.nodeName.toUpperCase() ? he(e) : null
    }

    function we(e, n, t, o) {
        return function(r) {
            var a, i;
            if (r = r.target) {
                var c = r.nodeName && "INPUT" === r.nodeName.toUpperCase() ? r.type : null,
                    u = "checkbox" !== r.type || r.checked ? n.fieldTransform(r.value, r) : null;
                ("change_form" === t || "checkbox" !== c && "radio" !== c) && e.core.track(function(e) {
                    var n = "",
                        t = e.schema,
                        o = e.type;
                    return e = {
                        formId: e.formId,
                        elementId: e.elementId,
                        nodeName: e.nodeName,
                        elementClasses: e.elementClasses,
                        value: e.value
                    }, "change_form" === t ? (n = "iglu:com.snowplowanalytics.snowplow/change_form/jsonschema/1-0-0", e.type = o) : "focus_form" === t && (n = "iglu:com.snowplowanalytics.snowplow/focus_form/jsonschema/1-0-0", e.elementType = o), _({
                        event: {
                            schema: n,
                            data: E(e, {
                                value: !0
                            })
                        }
                    })
                }({
                    schema: t,
                    formId: null !== (a = ye(r)) && void 0 !== a ? a : "",
                    elementId: null !== (i = he(r)) && void 0 !== i ? i : "",
                    nodeName: r.nodeName,
                    type: c,
                    elementClasses: J(r),
                    value: null != u ? u : null
                }), s(o, r, c, u))
            }
        }
    }

    function ke() {
        return {
            activateBrowserPlugin: function(e) {
                yn[e.id] = e
            }
        }
    }

    function be() {
        return {
            activateBrowserPlugin: function(e) {
                kn[e.id] = e
            }
        }
    }

    function Ae(e, n) {
        void 0 === n && (n = Object.keys(kn));
        var t = e.message,
            o = e.filename,
            r = e.lineno,
            a = e.colno,
            i = e.error,
            c = e.context,
            s = e.timestamp,
            u = i && i.stack ? i.stack : null;
        $(n, kn, (function(e) {
            e.core.track(_({
                event: {
                    schema: "iglu:com.snowplowanalytics.snowplow/application_error/jsonschema/1-0-1",
                    data: {
                        programmingLanguage: "JAVASCRIPT",
                        message: t || "JS Exception. Browser doesn't support ErrorEvent API",
                        stackTrace: u,
                        lineNumber: r,
                        lineColumn: a,
                        fileName: o
                    }
                }
            }), c, s)
        }))
    }

    function Te() {
        return {
            activateBrowserPlugin: function(e) {
                e.core.setTimezone(An.determine("undefined" != typeof Intl).name())
            }
        }
    }

    function Pe() {
        return {
            activateBrowserPlugin: function(e) {
                Pn[e.id] = e, _n[e.id] = {
                    items: []
                }
            }
        }
    }

    function _e() {
        return {
            activateBrowserPlugin: function(e) {
                Sn[e.id] = e, On[e.id] = []
            }
        }
    }

    function Ce() {
        return {
            activateBrowserPlugin: function(e) {
                En[e.id] = e
            }
        }
    }

    function Se() {
        return {
            activateBrowserPlugin: function(e) {
                jn[e.id] = e
            }
        }
    }
    for (var Oe = function() {
            return (Oe = Object.assign || function(e) {
                for (var n, t = 1, o = arguments.length; t < o; t++)
                    for (var r in n = arguments[t]) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
                return e
            }).apply(this, arguments)
        }, xe = t((function(e) {
            var n = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
            if (n) {
                var t = new Uint8Array(16);
                e.exports = function() {
                    return n(t), t
                }
            } else {
                var o = Array(16);
                e.exports = function() {
                    for (var e, n = 0; 16 > n; n++) 0 == (3 & n) && (e = 4294967296 * Math.random()), o[n] = e >>> ((3 & n) << 3) & 255;
                    return o
                }
            }
        })), Ee = [], Ie = 0; 256 > Ie; ++Ie) Ee[Ie] = (Ie + 256).toString(16).substr(1);
    var je, De, Ne = function(e, n) {
            return n = n || 0, [Ee[e[n++]], Ee[e[n++]], Ee[e[n++]], Ee[e[n++]], "-", Ee[e[n++]], Ee[e[n++]], "-", Ee[e[n++]], Ee[e[n++]], "-", Ee[e[n++]], Ee[e[n++]], "-", Ee[e[n++]], Ee[e[n++]], Ee[e[n++]], Ee[e[n++]], Ee[e[n++]], Ee[e[n++]]].join("")
        },
        Le = 0,
        Be = 0,
        ze = function(e, n, t) {
            if (t = n && t || 0, "string" == typeof e && (n = "binary" === e ? Array(16) : null, e = null), (e = (e = e || {}).random || (e.rng || xe)())[6] = 15 & e[6] | 64, e[8] = 63 & e[8] | 128, n)
                for (var o = 0; 16 > o; ++o) n[t + o] = e[o];
            return n || Ne(e)
        };
    ze.v1 = function(e, n, t) {
        t = n && t || 0;
        var o = n || [],
            r = (e = e || {}).node || je,
            a = void 0 !== e.clockseq ? e.clockseq : De;
        if (null == r || null == a) {
            var i = xe();
            null == r && (r = je = [1 | i[0], i[1], i[2], i[3], i[4], i[5]]), null == a && (a = De = 16383 & (i[6] << 8 | i[7]))
        }
        i = void 0 !== e.msecs ? e.msecs : (new Date).getTime();
        var c = void 0 !== e.nsecs ? e.nsecs : Be + 1,
            s = i - Le + (c - Be) / 1e4;
        if (0 > s && void 0 === e.clockseq && (a = a + 1 & 16383), (0 > s || i > Le) && void 0 === e.nsecs && (c = 0), 1e4 <= c) throw Error("uuid.v1(): Can't create more than 10M uuids/sec");
        for (Le = i, Be = c, De = a, e = (1e4 * (268435455 & (i += 122192928e5)) + c) % 4294967296, o[t++] = e >>> 24 & 255, o[t++] = e >>> 16 & 255, o[t++] = e >>> 8 & 255, o[t++] = 255 & e, e = i / 4294967296 * 1e4 & 268435455, o[t++] = e >>> 8 & 255, o[t++] = 255 & e, o[t++] = e >>> 24 & 15 | 16, o[t++] = e >>> 16 & 255, o[t++] = a >>> 8 | 128, o[t++] = 255 & a, a = 0; 6 > a; ++a) o[t + a] = r[a];
        return n || Ne(o)
    };
    var Me, Ue, Fe = ze.v4 = ze,
        Ve = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    (Ue = Me || (Me = {}))[Ue.none = 0] = "none", Ue[Ue.error = 1] = "error", Ue[Ue.warn = 2] = "warn", Ue[Ue.debug = 3] = "debug", Ue[Ue.info = 4] = "info";
    var He, Re = function(e) {
            return void 0 === e && (e = Me.warn), {
                setLogLevel: function(n) {
                    e = Me[n] ? n : Me.warn
                },
                warn: function(t, o) {
                    for (var r = [], a = 2; a < arguments.length; a++) r[a - 2] = arguments[a];
                    e >= Me.warn && "undefined" != typeof console && (a = "Snowplow: " + t, o ? console.warn.apply(console, n([a + "\n", o], r)) : console.warn.apply(console, n([a], r)))
                },
                error: function(t, o) {
                    for (var r = [], a = 2; a < arguments.length; a++) r[a - 2] = arguments[a];
                    e >= Me.error && "undefined" != typeof console && (a = "Snowplow: " + t + "\n", o ? console.error.apply(console, n([a + "\n", o], r)) : console.error.apply(console, n([a], r)))
                },
                debug: function(t) {
                    for (var o = [], r = 1; r < arguments.length; r++) o[r - 1] = arguments[r];
                    e >= Me.debug && "undefined" != typeof console && console.debug.apply(console, n(["Snowplow: " + t], o))
                },
                info: function(t) {
                    for (var o = [], r = 1; r < arguments.length; r++) o[r - 1] = arguments[r];
                    e >= Me.info && "undefined" != typeof console && console.info.apply(console, n(["Snowplow: " + t], o))
                }
            }
        }(),
        Ge = t((function(e) {
            var n;
            n = {
                rotl: function(e, n) {
                    return e << n | e >>> 32 - n
                },
                rotr: function(e, n) {
                    return e << 32 - n | e >>> n
                },
                endian: function(e) {
                    if (e.constructor == Number) return 16711935 & n.rotl(e, 8) | 4278255360 & n.rotl(e, 24);
                    for (var t = 0; t < e.length; t++) e[t] = n.endian(e[t]);
                    return e
                },
                randomBytes: function(e) {
                    for (var n = []; 0 < e; e--) n.push(Math.floor(256 * Math.random()));
                    return n
                },
                bytesToWords: function(e) {
                    for (var n = [], t = 0, o = 0; t < e.length; t++, o += 8) n[o >>> 5] |= e[t] << 24 - o % 32;
                    return n
                },
                wordsToBytes: function(e) {
                    for (var n = [], t = 0; t < 32 * e.length; t += 8) n.push(e[t >>> 5] >>> 24 - t % 32 & 255);
                    return n
                },
                bytesToHex: function(e) {
                    for (var n = [], t = 0; t < e.length; t++) n.push((e[t] >>> 4).toString(16)), n.push((15 & e[t]).toString(16));
                    return n.join("")
                },
                hexToBytes: function(e) {
                    for (var n = [], t = 0; t < e.length; t += 2) n.push(parseInt(e.substr(t, 2), 16));
                    return n
                },
                bytesToBase64: function(e) {
                    for (var n = [], t = 0; t < e.length; t += 3)
                        for (var o = e[t] << 16 | e[t + 1] << 8 | e[t + 2], r = 0; 4 > r; r++) 8 * t + 6 * r <= 8 * e.length ? n.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(o >>> 6 * (3 - r) & 63)) : n.push("=");
                    return n.join("")
                },
                base64ToBytes: function(e) {
                    e = e.replace(/[^A-Z0-9+\/]/gi, "");
                    for (var n = [], t = 0, o = 0; t < e.length; o = ++t % 4) 0 != o && n.push(("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(e.charAt(t - 1)) & Math.pow(2, -2 * o + 8) - 1) << 2 * o | "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(e.charAt(t)) >>> 6 - 2 * o);
                    return n
                }
            }, e.exports = n
        })),
        qe = {
            utf8: {
                stringToBytes: function(e) {
                    return qe.bin.stringToBytes(unescape(encodeURIComponent(e)))
                },
                bytesToString: function(e) {
                    return decodeURIComponent(escape(qe.bin.bytesToString(e)))
                }
            },
            bin: {
                stringToBytes: function(e) {
                    for (var n = [], t = 0; t < e.length; t++) n.push(255 & e.charCodeAt(t));
                    return n
                },
                bytesToString: function(e) {
                    for (var n = [], t = 0; t < e.length; t++) n.push(String.fromCharCode(e[t]));
                    return n.join("")
                }
            }
        },
        Je = qe,
        Ye = t((function(e) {
            var n, t, o, r;
            n = Je.utf8, t = Je.bin, o = function(e) {
                e.constructor == String ? e = n.stringToBytes(e) : "undefined" != typeof Buffer && "function" == typeof Buffer.isBuffer && Buffer.isBuffer(e) ? e = Array.prototype.slice.call(e, 0) : Array.isArray(e) || (e = e.toString());
                var t = Ge.bytesToWords(e),
                    o = 8 * e.length;
                e = [];
                var r = 1732584193,
                    a = -271733879,
                    i = -1732584194,
                    c = 271733878,
                    s = -1009589776;
                for (t[o >> 5] |= 128 << 24 - o % 32, t[15 + (o + 64 >>> 9 << 4)] = o, o = 0; o < t.length; o += 16) {
                    for (var u = r, l = a, f = i, d = c, m = s, p = 0; 80 > p; p++) {
                        if (16 > p) e[p] = t[o + p];
                        else {
                            var g = e[p - 3] ^ e[p - 8] ^ e[p - 14] ^ e[p - 16];
                            e[p] = g << 1 | g >>> 31
                        }
                        g = (r << 5 | r >>> 27) + s + (e[p] >>> 0) + (20 > p ? 1518500249 + (a & i | ~a & c) : 40 > p ? 1859775393 + (a ^ i ^ c) : 60 > p ? (a & i | a & c | i & c) - 1894007588 : (a ^ i ^ c) - 899497514), s = c, c = i, i = a << 30 | a >>> 2, a = r, r = g
                    }
                    r += u, a += l, i += f, c += d, s += m
                }
                return [r, a, i, c, s]
            }, (r = function(e, n) {
                return e = Ge.wordsToBytes(o(e)), n && n.asBytes ? e : n && n.asString ? t.bytesToString(e) : Ge.bytesToHex(e)
            })._blocksize = 16, r._digestsize = 20, e.exports = r
        })),
        Xe = {},
        Ke = function() {
            this.outQueues = [], this.bufferFlushers = [], this.hasLoaded = !1, this.registeredOnLoadHandlers = []
        },
        We = "undefined" != typeof window ? te() : void 0,
        Qe = Object.freeze({
            __proto__: null,
            addGlobalContexts: function(e, n) {
                Z(n, (function(n) {
                    n.core.addGlobalContexts(e)
                }))
            },
            addPlugin: function(e, n) {
                Z(n, (function(n) {
                    n.addPlugin(e)
                }))
            },
            clearGlobalContexts: function(e) {
                Z(e, (function(e) {
                    e.core.clearGlobalContexts()
                }))
            },
            clearUserData: function(e) {
                Z(e, (function(e) {
                    e.clearUserData()
                }))
            },
            crossDomainLinker: function(e, n) {
                Z(n, (function(n) {
                    n.crossDomainLinker(e)
                }))
            },
            disableAnonymousTracking: function(e, n) {
                Z(n, (function(n) {
                    n.disableAnonymousTracking(e)
                }))
            },
            discardBrace: function(e, n) {
                Z(n, (function(n) {
                    n.discardBrace(e)
                }))
            },
            discardHashTag: function(e, n) {
                Z(n, (function(n) {
                    n.discardHashTag(e)
                }))
            },
            enableActivityTracking: function(e, n) {
                Z(n, (function(n) {
                    n.enableActivityTracking(e)
                }))
            },
            enableActivityTrackingCallback: function(e, n) {
                Z(n, (function(n) {
                    n.enableActivityTrackingCallback(e)
                }))
            },
            enableAnonymousTracking: function(e, n) {
                Z(n, (function(n) {
                    n.enableAnonymousTracking(e)
                }))
            },
            flushBuffer: function(e, n) {
                Z(n, (function(n) {
                    n.flushBuffer(e)
                }))
            },
            newSession: function(e) {
                Z(e, (function(e) {
                    e.newSession()
                }))
            },
            newTracker: function(e, n, t) {
                if (void 0 === t && (t = {}), We) return ee(e, e, "js-3.0.0", n, We, t)
            },
            preservePageViewId: function(e) {
                Z(e, (function(e) {
                    e.preservePageViewId()
                }))
            },
            removeGlobalContexts: function(e, n) {
                Z(n, (function(n) {
                    n.core.removeGlobalContexts(e)
                }))
            },
            setBufferSize: function(e, n) {
                Z(n, (function(n) {
                    n.setBufferSize(e)
                }))
            },
            setCollectorUrl: function(e, n) {
                Z(n, (function(n) {
                    n.setCollectorUrl(e)
                }))
            },
            setCookiePath: function(e, n) {
                Z(n, (function(n) {
                    n.setCookiePath(e)
                }))
            },
            setCustomUrl: function(e, n) {
                Z(n, (function(n) {
                    n.setCustomUrl(e)
                }))
            },
            setDocumentTitle: function(e, n) {
                Z(n, (function(n) {
                    n.setDocumentTitle(e)
                }))
            },
            setOptOutCookie: function(e, n) {
                Z(n, (function(n) {
                    n.setOptOutCookie(e)
                }))
            },
            setReferrerUrl: function(e, n) {
                Z(n, (function(n) {
                    n.setReferrerUrl(e)
                }))
            },
            setUserId: function(e, n) {
                Z(n, (function(n) {
                    n.setUserId(e)
                }))
            },
            setUserIdFromCookie: function(e, n) {
                Z(n, (function(n) {
                    n.setUserIdFromCookie(e)
                }))
            },
            setUserIdFromLocation: function(e, n) {
                Z(n, (function(n) {
                    n.setUserIdFromLocation(e)
                }))
            },
            setUserIdFromReferrer: function(e, n) {
                Z(n, (function(n) {
                    n.setUserIdFromReferrer(e)
                }))
            },
            setVisitorCookieTimeout: function(e, n) {
                Z(n, (function(n) {
                    n.setVisitorCookieTimeout(e)
                }))
            },
            trackPageView: function(e, n) {
                Z(n, (function(n) {
                    n.trackPageView(e)
                }))
            },
            trackSelfDescribingEvent: function(e, n) {
                Z(n, (function(n) {
                    n.core.track(_({
                        event: e.event
                    }), e.context, e.timestamp)
                }))
            },
            trackStructEvent: function(e, n) {
                Z(n, (function(n) {
                    n.core.track(function(e) {
                        var n = e.category,
                            t = e.action,
                            o = e.label,
                            a = e.property;
                        e = e.value;
                        var i = r();
                        return i.add("e", "se"), i.add("se_ca", n), i.add("se_ac", t), i.add("se_la", o), i.add("se_pr", a), i.add("se_va", null == e ? void 0 : e.toString()), i
                    }(e), e.context, e.timestamp)
                }))
            },
            updatePageActivity: function(e) {
                Z(e, (function(e) {
                    e.updatePageActivity()
                }))
            },
            version: "3.0.0"
        }),
        Ze = navigator,
        $e = Object.freeze({
            __proto__: null,
            ClientHintsPlugin: oe
        }),
        en = Object.freeze({
            __proto__: null,
            OptimizelyXPlugin: re
        }),
        nn = Object.freeze({
            __proto__: null,
            PerformanceTimingPlugin: ae
        });
    ! function(e) {
        e.consent = "consent", e.contract = "contract", e.legalObligation = "legal_obligation", e.vitalInterests = "vital_interests", e.publicTask = "public_task", e.legitimateInterests = "legitimate_interests"
    }(He || (He = {}));
    var tn, on, rn = {},
        an = {},
        cn = Object.freeze({
            __proto__: null,
            ConsentPlugin: ie,
            enableGdprContext: function(e, n) {
                void 0 === n && (n = Object.keys(rn));
                var t = e.documentId,
                    o = e.documentVersion,
                    r = e.documentDescription,
                    a = He[e.basisForProcessing];
                a ? n.forEach((function(e) {
                    rn[e] && (an[e] = {
                        basisForProcessing: a,
                        documentId: null != t ? t : null,
                        documentVersion: null != o ? o : null,
                        documentDescription: null != r ? r : null
                    })
                })) : tn.warn("enableGdprContext: basisForProcessing must be one of: consent, contract, legalObligation, vitalInterests, publicTask, legitimateInterests")
            },
            get gdprBasis() {
                return He
            },
            trackConsentGranted: function(e, n) {
                void 0 === n && (n = Object.keys(rn)), $(n, rn, (function(n) {
                    var t = e.expiry,
                        o = {
                            schema: "iglu:com.snowplowanalytics.snowplow/consent_document/jsonschema/1-0-0",
                            data: E({
                                id: e.id,
                                version: e.version,
                                name: e.name,
                                description: e.description
                            })
                        };
                    t = _({
                        event: {
                            schema: "iglu:com.snowplowanalytics.snowplow/consent_granted/jsonschema/1-0-0",
                            data: E({
                                expiry: t
                            })
                        }
                    }), o = [o], n.core.track(t, e.context ? e.context.concat(o) : o, e.timestamp)
                }))
            },
            trackConsentWithdrawn: function(e, n) {
                void 0 === n && (n = Object.keys(rn)), $(n, rn, (function(n) {
                    var t = e.all,
                        o = {
                            schema: "iglu:com.snowplowanalytics.snowplow/consent_document/jsonschema/1-0-0",
                            data: E({
                                id: e.id,
                                version: e.version,
                                name: e.name,
                                description: e.description
                            })
                        };
                    t = _({
                        event: {
                            schema: "iglu:com.snowplowanalytics.snowplow/consent_withdrawn/jsonschema/1-0-0",
                            data: E({
                                all: t
                            })
                        }
                    }), o = [o], n.core.track(t, e.context ? e.context.concat(o) : o, e.timestamp)
                }))
            }
        }),
        sn = navigator,
        un = {},
        ln = !1,
        fn = Object.freeze({
            __proto__: null,
            GeolocationPlugin: ce,
            enableGeolocationContext: se
        }),
        dn = Object.freeze({
            __proto__: null,
            GaCookiesPlugin: ue
        }),
        mn = {},
        pn = {},
        gn = Object.freeze({
            __proto__: null,
            LinkClickTrackingPlugin: le,
            enableLinkClickTracking: function(e, n) {
                void 0 === e && (e = {}), void 0 === n && (n = Object.keys(mn)), n.forEach((function(n) {
                    mn[n] && (mn[n].sharedState.hasLoaded ? (me(e, n), pe(n)) : mn[n].sharedState.registeredOnLoadHandlers.push((function() {
                        me(e, n), pe(n)
                    })))
                }))
            },
            refreshLinkClickTracking: function(e) {
                void 0 === e && (e = Object.keys(mn)), e.forEach((function(e) {
                    mn[e] && (mn[e].sharedState.hasLoaded ? pe(e) : mn[e].sharedState.registeredOnLoadHandlers.push((function() {
                        pe(e)
                    })))
                }))
            },
            trackLinkClick: function(e, n) {
                void 0 === n && (n = Object.keys(pn)), $(n, mn, (function(n) {
                    n.core.track(x(e), e.context, e.timestamp)
                }))
            }
        }),
        vn = ["textarea", "input", "select"],
        hn = function(e) {
            return e
        },
        yn = {},
        wn = Object.freeze({
            __proto__: null,
            FormTrackingPlugin: ke,
            enableFormTracking: function(e, n) {
                void 0 === e && (e = {}), void 0 === n && (n = Object.keys(yn)), n.forEach((function(n) {
                    yn[n] && (yn[n].sharedState.hasLoaded ? ge(yn[n], e) : yn[n].sharedState.registeredOnLoadHandlers.push((function() {
                        ge(yn[n], e)
                    })))
                }))
            }
        }),
        kn = {},
        bn = Object.freeze({
            __proto__: null,
            ErrorTrackingPlugin: be,
            enableErrorTracking: function(e, n) {
                void 0 === e && (e = {}), void 0 === n && (n = Object.keys(kn));
                var t = e.filter,
                    o = e.contextAdder,
                    r = e.context;
                z(window, "error", (function(e) {
                    if (t && j(t) && t(e) || null == t) {
                        var a = n,
                            i = r || [];
                        o && j(o) && (i = i.concat(o(e))), Ae({
                            message: e.message,
                            filename: e.filename,
                            lineno: e.lineno,
                            colno: e.colno,
                            error: e.error,
                            context: i
                        }, a)
                    }
                }), !0)
            },
            trackError: Ae
        }),
        An = t((function(e) {
            var n;
            (n = function() {
                var e = {
                        "America/Denver": ["America/Mazatlan"],
                        "America/Chicago": ["America/Mexico_City"],
                        "America/Asuncion": ["America/Campo_Grande", "America/Santiago"],
                        "America/Montevideo": ["America/Sao_Paulo", "America/Santiago"],
                        "Asia/Beirut": "Asia/Amman Asia/Jerusalem Europe/Helsinki Asia/Damascus Africa/Cairo Asia/Gaza Europe/Minsk Africa/Windhoek".split(" "),
                        "Pacific/Auckland": ["Pacific/Fiji"],
                        "America/Los_Angeles": ["America/Santa_Isabel"],
                        "America/New_York": ["America/Havana"],
                        "America/Halifax": ["America/Goose_Bay"],
                        "America/Godthab": ["America/Miquelon"],
                        "Asia/Dubai": ["Asia/Yerevan"],
                        "Asia/Jakarta": ["Asia/Krasnoyarsk"],
                        "Asia/Shanghai": ["Asia/Irkutsk", "Australia/Perth"],
                        "Australia/Sydney": ["Australia/Lord_Howe"],
                        "Asia/Tokyo": ["Asia/Yakutsk"],
                        "Asia/Dhaka": ["Asia/Omsk"],
                        "Asia/Baku": ["Asia/Yerevan"],
                        "Australia/Brisbane": ["Asia/Vladivostok"],
                        "Pacific/Noumea": ["Asia/Vladivostok"],
                        "Pacific/Majuro": ["Asia/Kamchatka", "Pacific/Fiji"],
                        "Pacific/Tongatapu": ["Pacific/Apia"],
                        "Asia/Baghdad": ["Europe/Minsk", "Europe/Moscow"],
                        "Asia/Karachi": ["Asia/Yekaterinburg"],
                        "Africa/Johannesburg": ["Asia/Gaza", "Africa/Cairo"]
                    },
                    t = function() {
                        for (var e = [], n = 0; 11 >= n; n++)
                            for (var t = 1; 28 >= t; t++) {
                                var o = -new Date(2014, n, t).getTimezoneOffset();
                                o = null !== o ? o : 0, e ? e && e[e.length - 1] !== o && e.push(o) : e.push()
                            }
                        return e
                    },
                    o = function e(n, t, o) {
                        void 0 === t && (t = 864e5, o = 36e5);
                        var r = new Date(n.getTime() - t).getTime();
                        n = n.getTime() + t;
                        for (var a = new Date(r).getTimezoneOffset(), i = null; r < n - o;) {
                            var c = new Date(r);
                            if (c.getTimezoneOffset() !== a) {
                                i = c;
                                break
                            }
                            r += o
                        }
                        return 864e5 === t ? e(i, 36e5, 6e4) : 36e5 === t ? e(i, 6e4, 1e3) : i
                    },
                    r = function(e, n, t, o) {
                        if ("N/A" !== t) return t;
                        if ("Asia/Beirut" === n) {
                            if ("Africa/Cairo" === o.name && 13983768e5 === e[6].s && 14116788e5 === e[6].e || "Asia/Jerusalem" === o.name && 13959648e5 === e[6].s && 14118588e5 === e[6].e) return 0
                        } else if ("America/Santiago" === n) {
                            if ("America/Asuncion" === o.name && 14124816e5 === e[6].s && 1397358e6 === e[6].e || "America/Campo_Grande" === o.name && 14136912e5 === e[6].s && 13925196e5 === e[6].e) return 0
                        } else if ("America/Montevideo" === n) {
                            if ("America/Sao_Paulo" === o.name && 14136876e5 === e[6].s && 1392516e6 === e[6].e) return 0
                        } else if ("Pacific/Auckland" === n && "Pacific/Fiji" === o.name && 14142456e5 === e[6].s && 13961016e5 === e[6].e) return 0;
                        return t
                    },
                    a = function(t, o) {
                        for (var a = {}, i = n.olson.dst_rules.zones, c = i.length, s = e[o], u = 0; u < c; u++) {
                            for (var l = i[u], f = i[u], d = 0, m = 0; m < t.length; m++)
                                if (f.rules[m] && t[m]) {
                                    if (!(t[m].s >= f.rules[m].s && t[m].e <= f.rules[m].e)) {
                                        d = "N/A";
                                        break
                                    }
                                    if (d = 0, d += Math.abs(t[m].s - f.rules[m].s), 864e6 < (d += Math.abs(f.rules[m].e - t[m].e))) {
                                        d = "N/A";
                                        break
                                    }
                                }
                            "N/A" !== (f = r(t, o, d, f)) && (a[l.name] = f)
                        }
                        for (var p in a)
                            if (a.hasOwnProperty(p))
                                for (t = 0; t < s.length; t++)
                                    if (s[t] === p) return p;
                        return o
                    },
                    i = function(e) {
                        var t = function() {
                            for (var e = [], t = 0; t < n.olson.dst_rules.years.length; t++) {
                                var r = n.olson.dst_rules.years[t],
                                    a = new Date(r, 0, 1, 0, 0, 1, 0).getTime();
                                r = new Date(r, 12, 31, 23, 59, 59).getTime();
                                for (var i = new Date(a).getTimezoneOffset(), c = null, s = null; a < r - 864e5;) {
                                    var u = new Date(a),
                                        l = u.getTimezoneOffset();
                                    l !== i && (l < i && (c = u), l > i && (s = u), i = l), a += 864e5
                                }
                                r = !(!c || !s) && {
                                    s: o(c).getTime(),
                                    e: o(s).getTime()
                                }, e.push(r)
                            }
                            return e
                        }();
                        return function(e) {
                            for (var n = 0; n < e.length; n++)
                                if (!1 !== e[n]) return !0;
                            return !1
                        }(t) ? a(t, e) : e
                    };
                return {
                    determine: function(o) {
                        var r = !1,
                            a = function() {
                                var e = 0,
                                    n = t();
                                return 1 < n.length && (e = n[0] - n[1]), 3 < n.length ? n[0] + ",1,weird" : 0 > e ? n[0] + ",1" : 0 < e ? n[1] + ",1,s" : n[0] + ",0"
                            }();
                        return (o || void 0 === o) && (r = function() {
                            var e, n;
                            if (Intl && "undefined" != typeof Intl && void 0 !== Intl.DateTimeFormat && void 0 !== (e = Intl.DateTimeFormat()) && void 0 !== e.resolvedOptions) return (n = e.resolvedOptions().timeZone) && (-1 < n.indexOf("/") || "UTC" === n) ? n : void 0
                        }()), r || (r = n.olson.timezones[a], void 0 !== e[r] && (r = i(r))), {
                            name: function() {
                                return r
                            },
                            using_intl: o || void 0 === o,
                            needle: a,
                            offsets: t()
                        }
                    }
                }
            }()).olson = n.olson || {}, n.olson.timezones = {
                "-720,0": "Etc/GMT+12",
                "-660,0": "Pacific/Pago_Pago",
                "-660,1,s": "Pacific/Apia",
                "-600,1": "America/Adak",
                "-600,0": "Pacific/Honolulu",
                "-570,0": "Pacific/Marquesas",
                "-540,0": "Pacific/Gambier",
                "-540,1": "America/Anchorage",
                "-480,1": "America/Los_Angeles",
                "-480,0": "Pacific/Pitcairn",
                "-420,0": "America/Phoenix",
                "-420,1": "America/Denver",
                "-360,0": "America/Guatemala",
                "-360,1": "America/Chicago",
                "-360,1,s": "Pacific/Easter",
                "-300,0": "America/Bogota",
                "-300,1": "America/New_York",
                "-270,0": "America/Caracas",
                "-240,1": "America/Halifax",
                "-240,0": "America/Santo_Domingo",
                "-240,1,s": "America/Asuncion",
                "-210,1": "America/St_Johns",
                "-180,1": "America/Godthab",
                "-180,0": "America/Buenos_Aires",
                "-180,1,s": "America/Montevideo",
                "-120,0": "America/Noronha",
                "-120,1": "America/Noronha",
                "-60,1": "Atlantic/Azores",
                "-60,0": "Atlantic/Cape_Verde",
                "0,0": "UTC",
                "0,1": "Europe/London",
                "0,1,weird": "Africa/Casablanca",
                "60,1": "Europe/Berlin",
                "60,0": "Africa/Lagos",
                "60,1,weird": "Africa/Casablanca",
                "120,1": "Asia/Beirut",
                "120,1,weird": "Africa/Cairo",
                "120,0": "Africa/Johannesburg",
                "180,0": "Asia/Baghdad",
                "180,1": "Europe/Moscow",
                "210,1": "Asia/Tehran",
                "240,0": "Asia/Dubai",
                "240,1": "Asia/Baku",
                "270,0": "Asia/Kabul",
                "300,1": "Asia/Yekaterinburg",
                "300,0": "Asia/Karachi",
                "330,0": "Asia/Calcutta",
                "345,0": "Asia/Katmandu",
                "360,0": "Asia/Dhaka",
                "360,1": "Asia/Omsk",
                "390,0": "Asia/Rangoon",
                "420,1": "Asia/Krasnoyarsk",
                "420,0": "Asia/Jakarta",
                "480,0": "Asia/Shanghai",
                "480,1": "Asia/Irkutsk",
                "525,0": "Australia/Eucla",
                "525,1,s": "Australia/Eucla",
                "540,1": "Asia/Yakutsk",
                "540,0": "Asia/Tokyo",
                "570,0": "Australia/Darwin",
                "570,1,s": "Australia/Adelaide",
                "600,0": "Australia/Brisbane",
                "600,1": "Asia/Vladivostok",
                "600,1,s": "Australia/Sydney",
                "630,1,s": "Australia/Lord_Howe",
                "660,1": "Asia/Kamchatka",
                "660,0": "Pacific/Noumea",
                "690,0": "Pacific/Norfolk",
                "720,1,s": "Pacific/Auckland",
                "720,0": "Pacific/Majuro",
                "765,1,s": "Pacific/Chatham",
                "780,0": "Pacific/Tongatapu",
                "780,1,s": "Pacific/Apia",
                "840,0": "Pacific/Kiritimati"
            }, n.olson.dst_rules = {
                years: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
                zones: [{
                    name: "Africa/Cairo",
                    rules: [{
                        e: 12199572e5,
                        s: 12090744e5
                    }, {
                        e: 1250802e6,
                        s: 1240524e6
                    }, {
                        e: 12858804e5,
                        s: 12840696e5
                    }, !1, !1, !1, {
                        e: 14116788e5,
                        s: 1406844e6
                    }]
                }, {
                    name: "America/Asuncion",
                    rules: [{
                        e: 12050316e5,
                        s: 12243888e5
                    }, {
                        e: 12364812e5,
                        s: 12558384e5
                    }, {
                        e: 12709548e5,
                        s: 12860784e5
                    }, {
                        e: 13024044e5,
                        s: 1317528e6
                    }, {
                        e: 1333854e6,
                        s: 13495824e5
                    }, {
                        e: 1364094e6,
                        s: 1381032e6
                    }, {
                        e: 13955436e5,
                        s: 14124816e5
                    }]
                }, {
                    name: "America/Campo_Grande",
                    rules: [{
                        e: 12032172e5,
                        s: 12243888e5
                    }, {
                        e: 12346668e5,
                        s: 12558384e5
                    }, {
                        e: 12667212e5,
                        s: 1287288e6
                    }, {
                        e: 12981708e5,
                        s: 13187376e5
                    }, {
                        e: 13302252e5,
                        s: 1350792e6
                    }, {
                        e: 136107e7,
                        s: 13822416e5
                    }, {
                        e: 13925196e5,
                        s: 14136912e5
                    }]
                }, {
                    name: "America/Goose_Bay",
                    rules: [{
                        e: 122559486e4,
                        s: 120503526e4
                    }, {
                        e: 125704446e4,
                        s: 123648486e4
                    }, {
                        e: 128909886e4,
                        s: 126853926e4
                    }, {
                        e: 13205556e5,
                        s: 129998886e4
                    }, {
                        e: 13520052e5,
                        s: 13314456e5
                    }, {
                        e: 13834548e5,
                        s: 13628952e5
                    }, {
                        e: 14149044e5,
                        s: 13943448e5
                    }]
                }, {
                    name: "America/Havana",
                    rules: [{
                        e: 12249972e5,
                        s: 12056436e5
                    }, {
                        e: 12564468e5,
                        s: 12364884e5
                    }, {
                        e: 12885012e5,
                        s: 12685428e5
                    }, {
                        e: 13211604e5,
                        s: 13005972e5
                    }, {
                        e: 13520052e5,
                        s: 13332564e5
                    }, {
                        e: 13834548e5,
                        s: 13628916e5
                    }, {
                        e: 14149044e5,
                        s: 13943412e5
                    }]
                }, {
                    name: "America/Mazatlan",
                    rules: [{
                        e: 1225008e6,
                        s: 12074724e5
                    }, {
                        e: 12564576e5,
                        s: 1238922e6
                    }, {
                        e: 1288512e6,
                        s: 12703716e5
                    }, {
                        e: 13199616e5,
                        s: 13018212e5
                    }, {
                        e: 13514112e5,
                        s: 13332708e5
                    }, {
                        e: 13828608e5,
                        s: 13653252e5
                    }, {
                        e: 14143104e5,
                        s: 13967748e5
                    }]
                }, {
                    name: "America/Mexico_City",
                    rules: [{
                        e: 12250044e5,
                        s: 12074688e5
                    }, {
                        e: 1256454e6,
                        s: 12389184e5
                    }, {
                        e: 12885084e5,
                        s: 1270368e6
                    }, {
                        e: 1319958e6,
                        s: 13018176e5
                    }, {
                        e: 13514076e5,
                        s: 13332672e5
                    }, {
                        e: 13828572e5,
                        s: 13653216e5
                    }, {
                        e: 14143068e5,
                        s: 13967712e5
                    }]
                }, {
                    name: "America/Miquelon",
                    rules: [{
                        e: 12255984e5,
                        s: 12050388e5
                    }, {
                        e: 1257048e6,
                        s: 12364884e5
                    }, {
                        e: 12891024e5,
                        s: 12685428e5
                    }, {
                        e: 1320552e6,
                        s: 12999924e5
                    }, {
                        e: 13520016e5,
                        s: 1331442e6
                    }, {
                        e: 13834512e5,
                        s: 13628916e5
                    }, {
                        e: 14149008e5,
                        s: 13943412e5
                    }]
                }, {
                    name: "America/Santa_Isabel",
                    rules: [{
                        e: 12250116e5,
                        s: 1207476e6
                    }, {
                        e: 12564612e5,
                        s: 12389256e5
                    }, {
                        e: 12891204e5,
                        s: 12685608e5
                    }, {
                        e: 132057e7,
                        s: 13000104e5
                    }, {
                        e: 13520196e5,
                        s: 133146e7
                    }, {
                        e: 13834692e5,
                        s: 13629096e5
                    }, {
                        e: 14149188e5,
                        s: 13943592e5
                    }]
                }, {
                    name: "America/Santiago",
                    rules: [{
                        e: 1206846e6,
                        s: 1223784e6
                    }, {
                        e: 1237086e6,
                        s: 12552336e5
                    }, {
                        e: 127035e7,
                        s: 12866832e5
                    }, {
                        e: 13048236e5,
                        s: 13138992e5
                    }, {
                        e: 13356684e5,
                        s: 13465584e5
                    }, {
                        e: 1367118e6,
                        s: 13786128e5
                    }, {
                        e: 13985676e5,
                        s: 14100624e5
                    }]
                }, {
                    name: "America/Sao_Paulo",
                    rules: [{
                        e: 12032136e5,
                        s: 12243852e5
                    }, {
                        e: 12346632e5,
                        s: 12558348e5
                    }, {
                        e: 12667176e5,
                        s: 12872844e5
                    }, {
                        e: 12981672e5,
                        s: 1318734e6
                    }, {
                        e: 13302216e5,
                        s: 13507884e5
                    }, {
                        e: 13610664e5,
                        s: 1382238e6
                    }, {
                        e: 1392516e6,
                        s: 14136876e5
                    }]
                }, {
                    name: "Asia/Amman",
                    rules: [{
                        e: 1225404e6,
                        s: 12066552e5
                    }, {
                        e: 12568536e5,
                        s: 12381048e5
                    }, {
                        e: 12883032e5,
                        s: 12695544e5
                    }, {
                        e: 13197528e5,
                        s: 13016088e5
                    }, !1, !1, {
                        e: 14147064e5,
                        s: 13959576e5
                    }]
                }, {
                    name: "Asia/Damascus",
                    rules: [{
                        e: 12254868e5,
                        s: 120726e7
                    }, {
                        e: 125685e7,
                        s: 12381048e5
                    }, {
                        e: 12882996e5,
                        s: 12701592e5
                    }, {
                        e: 13197492e5,
                        s: 13016088e5
                    }, {
                        e: 13511988e5,
                        s: 13330584e5
                    }, {
                        e: 13826484e5,
                        s: 1364508e6
                    }, {
                        e: 14147028e5,
                        s: 13959576e5
                    }]
                }, {
                    name: "Asia/Dubai",
                    rules: [!1, !1, !1, !1, !1, !1, !1]
                }, {
                    name: "Asia/Gaza",
                    rules: [{
                        e: 12199572e5,
                        s: 12066552e5
                    }, {
                        e: 12520152e5,
                        s: 12381048e5
                    }, {
                        e: 1281474e6,
                        s: 126964086e4
                    }, {
                        e: 1312146e6,
                        s: 130160886e4
                    }, {
                        e: 13481784e5,
                        s: 13330584e5
                    }, {
                        e: 13802292e5,
                        s: 1364508e6
                    }, {
                        e: 1414098e6,
                        s: 13959576e5
                    }]
                }, {
                    name: "Asia/Irkutsk",
                    rules: [{
                        e: 12249576e5,
                        s: 12068136e5
                    }, {
                        e: 12564072e5,
                        s: 12382632e5
                    }, {
                        e: 12884616e5,
                        s: 12697128e5
                    }, !1, !1, !1, !1]
                }, {
                    name: "Asia/Jerusalem",
                    rules: [{
                        e: 12231612e5,
                        s: 12066624e5
                    }, {
                        e: 1254006e6,
                        s: 1238112e6
                    }, {
                        e: 1284246e6,
                        s: 12695616e5
                    }, {
                        e: 131751e7,
                        s: 1301616e6
                    }, {
                        e: 13483548e5,
                        s: 13330656e5
                    }, {
                        e: 13828284e5,
                        s: 13645152e5
                    }, {
                        e: 1414278e6,
                        s: 13959648e5
                    }]
                }, {
                    name: "Asia/Kamchatka",
                    rules: [{
                        e: 12249432e5,
                        s: 12067992e5
                    }, {
                        e: 12563928e5,
                        s: 12382488e5
                    }, {
                        e: 12884508e5,
                        s: 12696984e5
                    }, !1, !1, !1, !1]
                }, {
                    name: "Asia/Krasnoyarsk",
                    rules: [{
                        e: 12249612e5,
                        s: 12068172e5
                    }, {
                        e: 12564108e5,
                        s: 12382668e5
                    }, {
                        e: 12884652e5,
                        s: 12697164e5
                    }, !1, !1, !1, !1]
                }, {
                    name: "Asia/Omsk",
                    rules: [{
                        e: 12249648e5,
                        s: 12068208e5
                    }, {
                        e: 12564144e5,
                        s: 12382704e5
                    }, {
                        e: 12884688e5,
                        s: 126972e7
                    }, !1, !1, !1, !1]
                }, {
                    name: "Asia/Vladivostok",
                    rules: [{
                        e: 12249504e5,
                        s: 12068064e5
                    }, {
                        e: 12564e8,
                        s: 1238256e6
                    }, {
                        e: 12884544e5,
                        s: 12697056e5
                    }, !1, !1, !1, !1]
                }, {
                    name: "Asia/Yakutsk",
                    rules: [{
                        e: 1224954e6,
                        s: 120681e7
                    }, {
                        e: 12564036e5,
                        s: 12382596e5
                    }, {
                        e: 1288458e6,
                        s: 12697092e5
                    }, !1, !1, !1, !1]
                }, {
                    name: "Asia/Yekaterinburg",
                    rules: [{
                        e: 12249684e5,
                        s: 12068244e5
                    }, {
                        e: 1256418e6,
                        s: 1238274e6
                    }, {
                        e: 12884724e5,
                        s: 12697236e5
                    }, !1, !1, !1, !1]
                }, {
                    name: "Asia/Yerevan",
                    rules: [{
                        e: 1224972e6,
                        s: 1206828e6
                    }, {
                        e: 12564216e5,
                        s: 12382776e5
                    }, {
                        e: 1288476e6,
                        s: 12697272e5
                    }, {
                        e: 13199256e5,
                        s: 13011768e5
                    }, !1, !1, !1]
                }, {
                    name: "Australia/Lord_Howe",
                    rules: [{
                        e: 12074076e5,
                        s: 12231342e5
                    }, {
                        e: 12388572e5,
                        s: 12545838e5
                    }, {
                        e: 12703068e5,
                        s: 12860334e5
                    }, {
                        e: 13017564e5,
                        s: 1317483e6
                    }, {
                        e: 1333206e6,
                        s: 13495374e5
                    }, {
                        e: 13652604e5,
                        s: 1380987e6
                    }, {
                        e: 139671e7,
                        s: 14124366e5
                    }]
                }, {
                    name: "Australia/Perth",
                    rules: [{
                        e: 12068136e5,
                        s: 12249576e5
                    }, !1, !1, !1, !1, !1, !1]
                }, {
                    name: "Europe/Helsinki",
                    rules: [{
                        e: 12249828e5,
                        s: 12068388e5
                    }, {
                        e: 12564324e5,
                        s: 12382884e5
                    }, {
                        e: 12884868e5,
                        s: 1269738e6
                    }, {
                        e: 13199364e5,
                        s: 13011876e5
                    }, {
                        e: 1351386e6,
                        s: 13326372e5
                    }, {
                        e: 13828356e5,
                        s: 13646916e5
                    }, {
                        e: 14142852e5,
                        s: 13961412e5
                    }]
                }, {
                    name: "Europe/Minsk",
                    rules: [{
                        e: 12249792e5,
                        s: 12068352e5
                    }, {
                        e: 12564288e5,
                        s: 12382848e5
                    }, {
                        e: 12884832e5,
                        s: 12697344e5
                    }, !1, !1, !1, !1]
                }, {
                    name: "Europe/Moscow",
                    rules: [{
                        e: 12249756e5,
                        s: 12068316e5
                    }, {
                        e: 12564252e5,
                        s: 12382812e5
                    }, {
                        e: 12884796e5,
                        s: 12697308e5
                    }, !1, !1, !1, !1]
                }, {
                    name: "Pacific/Apia",
                    rules: [!1, !1, !1, {
                        e: 13017528e5,
                        s: 13168728e5
                    }, {
                        e: 13332024e5,
                        s: 13489272e5
                    }, {
                        e: 13652568e5,
                        s: 13803768e5
                    }, {
                        e: 13967064e5,
                        s: 14118264e5
                    }]
                }, {
                    name: "Pacific/Fiji",
                    rules: [!1, !1, {
                        e: 12696984e5,
                        s: 12878424e5
                    }, {
                        e: 13271544e5,
                        s: 1319292e6
                    }, {
                        e: 1358604e6,
                        s: 13507416e5
                    }, {
                        e: 139005e7,
                        s: 1382796e6
                    }, {
                        e: 14215032e5,
                        s: 14148504e5
                    }]
                }, {
                    name: "Europe/London",
                    rules: [{
                        e: 12249828e5,
                        s: 12068388e5
                    }, {
                        e: 12564324e5,
                        s: 12382884e5
                    }, {
                        e: 12884868e5,
                        s: 1269738e6
                    }, {
                        e: 13199364e5,
                        s: 13011876e5
                    }, {
                        e: 1351386e6,
                        s: 13326372e5
                    }, {
                        e: 13828356e5,
                        s: 13646916e5
                    }, {
                        e: 14142852e5,
                        s: 13961412e5
                    }]
                }, {
                    name: "Africa/Windhoek",
                    rules: [{
                        e: 12207492e5,
                        s: 120744e7
                    }, {
                        e: 12521988e5,
                        s: 12388896e5
                    }, {
                        e: 12836484e5,
                        s: 12703392e5
                    }, {
                        e: 1315098e6,
                        s: 13017888e5
                    }, {
                        e: 13465476e5,
                        s: 13332384e5
                    }, {
                        e: 13779972e5,
                        s: 13652928e5
                    }, {
                        e: 14100516e5,
                        s: 13967424e5
                    }]
                }]
            }, e.exports = n
        })),
        Tn = Object.freeze({
            __proto__: null,
            TimezonePlugin: Te
        }),
        Pn = {},
        _n = {},
        Cn = Object.freeze({
            __proto__: null,
            EcommercePlugin: Pe,
            addItem: function(e, n) {
                void 0 === n && (n = Object.keys(Pn)), n.forEach((function(n) {
                    _n[n] && _n[n].items.push(e)
                }))
            },
            addTrans: function(e, n) {
                void 0 === n && (n = Object.keys(Pn)), n.forEach((function(n) {
                    _n[n] && (_n[n].transaction = e)
                }))
            },
            trackAddToCart: function(e, n) {
                void 0 === n && (n = Object.keys(Pn)), $(n, Pn, (function(n) {
                    n.core.track(_({
                        event: {
                            schema: "iglu:com.snowplowanalytics.snowplow/add_to_cart/jsonschema/1-0-0",
                            data: E({
                                sku: e.sku,
                                quantity: e.quantity,
                                name: e.name,
                                category: e.category,
                                unitPrice: e.unitPrice,
                                currency: e.currency
                            })
                        }
                    }), e.context, e.timestamp)
                }))
            },
            trackRemoveFromCart: function(e, n) {
                void 0 === n && (n = Object.keys(Pn)), $(n, Pn, (function(n) {
                    n.core.track(_({
                        event: {
                            schema: "iglu:com.snowplowanalytics.snowplow/remove_from_cart/jsonschema/1-0-0",
                            data: E({
                                sku: e.sku,
                                quantity: e.quantity,
                                name: e.name,
                                category: e.category,
                                unitPrice: e.unitPrice,
                                currency: e.currency
                            })
                        }
                    }), e.context, e.timestamp)
                }))
            },
            trackTrans: function(e) {
                void 0 === e && (e = Object.keys(Pn)), $(e, Pn, (function(e) {
                    var n = _n[e.id].transaction;
                    for (n && e.core.track(function(e) {
                            var n = e.orderId,
                                t = e.total,
                                o = e.affiliation,
                                a = e.tax,
                                i = e.shipping,
                                c = e.city,
                                s = e.state,
                                u = e.country;
                            e = e.currency;
                            var l = r();
                            return l.add("e", "tr"), l.add("tr_id", n), l.add("tr_af", o), l.add("tr_tt", t), l.add("tr_tx", a), l.add("tr_sh", i), l.add("tr_ci", c), l.add("tr_st", s), l.add("tr_co", u), l.add("tr_cu", e), l
                        }(n), n.context, n.timestamp), n = 0; n < _n[e.id].items.length; n++) {
                        var t = _n[e.id].items[n];
                        e.core.track(O(t), t.context, t.timestamp)
                    }
                    _n[e.id] = {
                        items: []
                    }
                }))
            }
        }),
        Sn = {},
        On = {},
        xn = Object.freeze({
            __proto__: null,
            EnhancedEcommercePlugin: _e,
            addEnhancedEcommerceActionContext: function(e, n) {
                void 0 === e && (e = {}), void 0 === n && (n = Object.keys(Sn));
                var t = e.id,
                    o = e.affiliation,
                    r = e.revenue,
                    a = e.tax,
                    i = e.shipping,
                    c = e.coupon,
                    s = e.list,
                    u = e.step,
                    l = e.option,
                    f = e.currency;
                n.forEach((function(e) {
                    On[e] && On[e].push({
                        schema: "iglu:com.google.analytics.enhanced-ecommerce/actionFieldObject/jsonschema/1-0-0",
                        data: {
                            id: t,
                            affiliation: o,
                            revenue: R(r),
                            tax: R(a),
                            shipping: R(i),
                            coupon: c,
                            list: s,
                            step: H(u),
                            option: l,
                            currency: f
                        }
                    })
                }))
            },
            addEnhancedEcommerceImpressionContext: function(e, n) {
                void 0 === e && (e = {}), void 0 === n && (n = Object.keys(Sn));
                var t = e.id,
                    o = e.name,
                    r = e.list,
                    a = e.brand,
                    i = e.category,
                    c = e.variant,
                    s = e.position,
                    u = e.price,
                    l = e.currency;
                n.forEach((function(e) {
                    On[e] && On[e].push({
                        schema: "iglu:com.google.analytics.enhanced-ecommerce/impressionFieldObject/jsonschema/1-0-0",
                        data: {
                            id: t,
                            name: o,
                            list: r,
                            brand: a,
                            category: i,
                            variant: c,
                            position: H(s),
                            price: R(u),
                            currency: l
                        }
                    })
                }))
            },
            addEnhancedEcommerceProductContext: function(e, n) {
                void 0 === e && (e = {}), void 0 === n && (n = Object.keys(Sn));
                var t = e.id,
                    o = e.name,
                    r = e.list,
                    a = e.brand,
                    i = e.category,
                    c = e.variant,
                    s = e.price,
                    u = e.quantity,
                    l = e.coupon,
                    f = e.position,
                    d = e.currency;
                n.forEach((function(e) {
                    On[e] && On[e].push({
                        schema: "iglu:com.google.analytics.enhanced-ecommerce/productFieldObject/jsonschema/1-0-0",
                        data: {
                            id: t,
                            name: o,
                            list: r,
                            brand: a,
                            category: i,
                            variant: c,
                            price: R(s),
                            quantity: H(u),
                            coupon: l,
                            position: H(f),
                            currency: d
                        }
                    })
                }))
            },
            addEnhancedEcommercePromoContext: function(e, n) {
                void 0 === e && (e = {}), void 0 === n && (n = Object.keys(Sn));
                var t = e.id,
                    o = e.name,
                    r = e.creative,
                    a = e.position,
                    i = e.currency;
                n.forEach((function(e) {
                    On[e] && On[e].push({
                        schema: "iglu:com.google.analytics.enhanced-ecommerce/promoFieldObject/jsonschema/1-0-0",
                        data: {
                            id: t,
                            name: o,
                            creative: r,
                            position: a,
                            currency: i
                        }
                    })
                }))
            },
            trackEnhancedEcommerceAction: function(e, n) {
                void 0 === e && (e = {}), void 0 === n && (n = Object.keys(Sn)), $(n, Sn, (function(n) {
                    var t = On[n.id].concat(e.context || []);
                    On[n.id].length = 0, n.core.track(_({
                        event: {
                            schema: "iglu:com.google.analytics.enhanced-ecommerce/action/jsonschema/1-0-0",
                            data: {
                                action: e.action
                            }
                        }
                    }), t, e.timestamp)
                }))
            }
        }),
        En = {},
        In = Object.freeze({
            __proto__: null,
            AdTrackingPlugin: Ce,
            trackAdClick: function(e, n) {
                void 0 === n && (n = Object.keys(En)), $(n, En, (function(n) {
                    n.core.track(function(e) {
                        return _({
                            event: e = {
                                schema: "iglu:com.snowplowanalytics.snowplow/ad_click/jsonschema/1-0-0",
                                data: E({
                                    targetUrl: e.targetUrl,
                                    clickId: e.clickId,
                                    costModel: e.costModel,
                                    cost: e.cost,
                                    bannerId: e.bannerId,
                                    zoneId: e.zoneId,
                                    impressionId: e.impressionId,
                                    advertiserId: e.advertiserId,
                                    campaignId: e.campaignId
                                })
                            }
                        })
                    }(e), e.context, e.timestamp)
                }))
            },
            trackAdConversion: function(e, n) {
                void 0 === n && (n = Object.keys(En)), $(n, En, (function(n) {
                    n.core.track(function(e) {
                        return _({
                            event: e = {
                                schema: "iglu:com.snowplowanalytics.snowplow/ad_conversion/jsonschema/1-0-0",
                                data: E({
                                    conversionId: e.conversionId,
                                    costModel: e.costModel,
                                    cost: e.cost,
                                    category: e.category,
                                    action: e.action,
                                    property: e.property,
                                    initialValue: e.initialValue,
                                    advertiserId: e.advertiserId,
                                    campaignId: e.campaignId
                                })
                            }
                        })
                    }(e), e.context, e.timestamp)
                }))
            },
            trackAdImpression: function(e, n) {
                void 0 === n && (n = Object.keys(En)), $(n, En, (function(n) {
                    n.core.track(function(e) {
                        return _({
                            event: e = {
                                schema: "iglu:com.snowplowanalytics.snowplow/ad_impression/jsonschema/1-0-0",
                                data: E({
                                    impressionId: e.impressionId,
                                    costModel: e.costModel,
                                    cost: e.cost,
                                    targetUrl: e.targetUrl,
                                    bannerId: e.bannerId,
                                    zoneId: e.zoneId,
                                    advertiserId: e.advertiserId,
                                    campaignId: e.campaignId
                                })
                            }
                        })
                    }(e), e.context, e.timestamp)
                }))
            }
        }),
        jn = {},
        Dn = Object.freeze({
            __proto__: null,
            SiteTrackingPlugin: Se,
            trackSiteSearch: function(e, n) {
                void 0 === n && (n = Object.keys(jn)), $(n, jn, (function(n) {
                    n.core.track(_({
                        event: {
                            schema: "iglu:com.snowplowanalytics.snowplow/site_search/jsonschema/1-0-0",
                            data: E({
                                terms: e.terms,
                                filters: e.filters,
                                totalResults: e.totalResults,
                                pageResults: e.pageResults
                            })
                        }
                    }), e.context, e.timestamp)
                }))
            },
            trackSocialInteraction: function(e, n) {
                void 0 === n && (n = Object.keys(jn)), $(n, jn, (function(n) {
                    n.core.track(function(e) {
                        return _({
                            event: e = {
                                schema: "iglu:com.snowplowanalytics.snowplow/social_interaction/jsonschema/1-0-0",
                                data: E({
                                    action: e.action,
                                    network: e.network,
                                    target: e.target
                                })
                            }
                        })
                    }(e), e.context, e.timestamp)
                }))
            },
            trackTiming: function(e, n) {
                void 0 === n && (n = Object.keys(jn));
                var t = e.category,
                    o = e.variable,
                    r = e.timing,
                    a = e.label,
                    i = e.context,
                    c = e.timestamp;
                $(n, jn, (function(e) {
                    e.core.track(_({
                        event: {
                            schema: "iglu:com.snowplowanalytics.snowplow/timing/jsonschema/1-0-0",
                            data: {
                                category: t,
                                variable: o,
                                timing: r,
                                label: a
                            }
                        }
                    }), i, c)
                }))
            }
        }),
        Nn = window.GlobalSnowplowNamespace.shift(),
        Ln = window[Nn];
    Ln.q = function(n, t) {
        function o(e) {
            var n = e.split(":");
            return [e = n[0], n = 1 < n.length ? n[1].split(";") : void 0]
        }

        function r(e, n) {
            if (y[e]) try {
                y[e].apply(null, n)
            } catch (n) {
                Re.error(e + " failed", n)
            } else Re.warn(e + " is not an available function")
        }

        function a() {
            0 === Object.keys(g).length && v.forEach((function(e) {
                var n = e[1];
                void 0 !== y[e[0]] && y[e[0]].length > n.length && Array.isArray(n[0]) && (n = [{}, n[0]]), r(e[0], n)
            }))
        }

        function i(e) {
            y = Oe(Oe({}, y), e)
        }

        function c(t) {
            if ("string" != typeof t[0] || "string" != typeof t[1] || void 0 !== t[2] && "object" != typeof t[2]) Re.error("newTracker failed", Error("Invalid parameters"));
            else {
                var o = n + "_" + t[0],
                    r = t[2],
                    a = function(n) {
                        var t, o = null !== (t = null == n ? void 0 : n.contexts) && void 0 !== t ? t : {},
                            r = o.performanceTiming;
                        t = o.gaCookies, n = o.geolocation, o.optimizelyExperiments, o.optimizelyStates, o.optimizelyVariations, o.optimizelyVisitor, o.optimizelyAudiences, o.optimizelyDimensions, o.optimizelySummary;
                        var a = o.optimizelyXSummary;
                        o = o.clientHints;
                        var i = [];
                        return r && (r = e(nn, ["PerformanceTimingPlugin"]), i.push([ae(), r])), a && (r = e(en, ["OptimizelyXPlugin"]), i.push([re(), r])), o && (r = e($e, ["ClientHintsPlugin"]), i.push([oe("object" == typeof o && o.includeHighEntropy), r])), t && (r = e(dn, ["GaCookiesPlugin"]), i.push([ue(), r])), r = e(cn, ["ConsentPlugin"]), i.push([ie(), r]), r = e(fn, ["GeolocationPlugin"]), i.push([ce(n), r]), r = e(gn, ["LinkClickTrackingPlugin"]), i.push([le(), r]), r = e(wn, ["FormTrackingPlugin"]), i.push([ke(), r]), r = e(bn, ["ErrorTrackingPlugin"]), i.push([be(), r]), r = e(Cn, ["EcommercePlugin"]), i.push([Pe(), r]), r = e(xn, ["EnhancedEcommercePlugin"]), i.push([_e(), r]), r = e(In, ["AdTrackingPlugin"]), i.push([Ce(), r]), r = e(Dn, ["SiteTrackingPlugin"]), i.push([Se(), r]), r = e(Tn, ["TimezonePlugin"]), i.push([Te(), r]), i
                    }(r);
                (o = ee(o, t[0], "js-" + h, t[1], m, Oe(Oe({}, r), {
                    plugins: a.map((function(e) {
                        return e[0]
                    }))
                }))) ? (p.push(o.id), a.forEach((function(e) {
                    i(e[1])
                }))) : Re.warn(t[0] + " already exists")
            }
        }

        function s(n, t) {
            function o(e) {
                Object.prototype.hasOwnProperty.call(g, e) && (l.clearTimeout(g[e].timeout), delete g[e], a())
            }
            var r;
            if ("string" == typeof n[0] && d(n[1]) && (void 0 === n[2] || Array.isArray(n[2]))) {
                var c = n[0],
                    s = n[1],
                    u = n[2];
                (null === (r = n[3]) || void 0 === r || r) && (r = l.setTimeout((function() {
                    o(c)
                }), 5e3), g[c] = {
                    timeout: r
                }), (r = f.createElement("script")).setAttribute("src", c), r.setAttribute("async", "1"), z(r, "error", (function() {
                    o(c), Re.warn("Failed to load plugin " + s[0] + " from " + c)
                }), !0), z(r, "load", (function() {
                    var n = s[1],
                        r = l[s[0]];
                    if (r && "object" == typeof r) {
                        var a = r[n];
                        n = e(r, ["symbol" == typeof n ? n : n + ""]), y.addPlugin.apply(null, [{
                            plugin: a.apply(null, u)
                        }, t]), i(n)
                    }
                    o(c)
                }), !0), f.head.appendChild(r)
            } else {
                if ("object" == typeof n[0] && "string" == typeof n[1] && (void 0 === n[2] || Array.isArray(n[2]))) {
                    var m = n[0],
                        p = n[1];
                    if (r = n[2], m) return n = m[p], m = e(m, ["symbol" == typeof p ? p : p + ""]), y.addPlugin.apply(null, [{
                        plugin: n.apply(null, r)
                    }, t]), void i(m)
                }
                Re.warn("Failed to add Plugin: " + n[1])
            }
        }

        function u() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            for (t = 0; t < e.length; t += 1) {
                var a = e[t],
                    i = Array.prototype.shift.call(a);
                if (j(i)) try {
                    for (var u = {}, l = 0, f = ne(p, Xe); l < f.length; l++) {
                        var d = f[l];
                        u[d.id.replace(n + "_", "")] = d
                    }
                    i.apply(u, a)
                } catch (e) {
                    Re.error("Tracker callback failed", e)
                } finally {
                    continue
                }
                i = (u = o(i))[0], u = u[1], "newTracker" === i ? c(a) : (u = u ? u.map((function(e) {
                    return n + "_" + e
                })) : p, "addPlugin" === i ? s(a, u) : (l = void 0, l = void 0 !== a[0] ? [a[0], u] : void 0 !== y[i] && 2 === y[i].length ? [{}, u] : [u], 0 < Object.keys(g).length ? v.push([i, l]) : r(i, l)))
            }
        }
        for (var l = window, f = document, m = te(), p = [], g = {}, v = [], h = "3.0.0", y = e(Qe, ["version"]), w = 0; w < t.length; w++) u(t[w]);
        return {
            push: u
        }
    }(Nn, Ln.q)
}();
//# sourceMappingURL=sp.js.map