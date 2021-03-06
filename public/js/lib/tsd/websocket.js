(function() {
    var a = function(b, c) {
        var d = a.resolve(b, c || "/"),
            e = a.modules[d];
        if (!e) throw Error("Failed to resolve module " + b + ", tried " + d);
        var f = a.cache[d],
            g = f ? f.exports : e();
        return g
    };
    a.paths = [], a.modules = {}, a.cache = {}, a.extensions = [".js", ".coffee", ".json"], a._core = {
            assert: !0,
            events: !0,
            fs: !0,
            path: !0,
            vm: !0
        }, a.resolve = function() {
            return function(b, c) {
                function h(b) {
                    if (b = d.normalize(b), a.modules[b]) return b;
                    for (var c = 0; a.extensions.length > c; c++) {
                        var e = a.extensions[c];
                        if (a.modules[b + e]) return b + e
                    }
                }

                function i(b) {
                    b = b.replace(/\/+$/, "");
                    var c = d.normalize(b + "/package.json");
                    if (a.modules[c]) {
                        var e = a.modules[c](),
                            f = e.browserify;
                        if ("object" == typeof f && f.main) {
                            var g = h(d.resolve(b, f.main));
                            if (g) return g
                        } else if ("string" == typeof f) {
                            var g = h(d.resolve(b, f));
                            if (g) return g
                        } else if (e.main) {
                            var g = h(d.resolve(b, e.main));
                            if (g) return g
                        }
                    }
                    return h(b + "/index")
                }

                function j(a, b) {
                    for (var c = k(b), d = 0; c.length > d; d++) {
                        var e = c[d],
                            f = h(e + "/" + a);
                        if (f) return f;
                        var g = i(e + "/" + a);
                        if (g) return g
                    }
                    var f = h(a);
                    return f ? f : void 0
                }

                function k(a) {
                    var b;
                    b = "/" === a ? [""] : d.normalize(a).split("/");
                    for (var c = [], e = b.length - 1; e >= 0; e--)
                        if ("node_modules" !== b[e]) {
                            var f = b.slice(0, e + 1).join("/") + "/node_modules";
                            c.push(f)
                        }
                    return c
                }
                if (c || (c = "/"), a._core[b]) return b;
                var d = a.modules.path();
                c = d.resolve("/", c);
                var e = c || "/";
                if (b.match(/^(?:\.\.?\/|\/)/)) {
                    var f = h(d.resolve(e, b)) || i(d.resolve(e, b));
                    if (f) return f
                }
                var g = j(b, e);
                if (g) return g;
                throw Error("Cannot find module '" + b + "'")
            }
        }(), a.alias = function(b, c) {
            var d = a.modules.path(),
                e = null;
            try {
                e = a.resolve(b + "/package.json", "/")
            } catch (f) {
                e = a.resolve(b, "/")
            }
            for (var g = d.dirname(e), h = (Object.keys || function(a) {
                    var b = [];
                    for (var c in a) b.push(c);
                    return b
                })(a.modules), i = 0; h.length > i; i++) {
                var j = h[i];
                if (j.slice(0, g.length + 1) === g + "/") {
                    var k = j.slice(g.length);
                    a.modules[c + k] = a.modules[g + k]
                } else j === g && (a.modules[c] = a.modules[g])
            }
        },
        function() {
            var b = {},
                c = "undefined" != typeof window ? window : {},
                d = !1;
            a.define = function(e, f) {
                !d && a.modules.__browserify_process && (b = a.modules.__browserify_process(), d = !0);
                var g = a._core[e] ? "" : a.modules.path().dirname(e),
                    h = function(b) {
                        var c = a(b, g),
                            d = a.cache[a.resolve(b, g)];
                        return d && null === d.parent && (d.parent = i), c
                    };
                h.resolve = function(b) {
                    return a.resolve(b, g)
                }, h.modules = a.modules, h.define = a.define, h.cache = a.cache;
                var i = {
                    id: e,
                    filename: e,
                    exports: {},
                    loaded: !1,
                    parent: null
                };
                a.modules[e] = function() {
                    return a.cache[e] = i, f.call(i.exports, h, i, i.exports, g, e, b, c), i.loaded = !0, i.exports
                }
            }
        }(), a.define("path", function(a, b, c, d, e, f) {
            function h(a, b) {
                for (var c = [], d = 0; a.length > d; d++) b(a[d], d, a) && c.push(a[d]);
                return c
            }

            function i(a, b) {
                for (var c = 0, d = a.length; d >= 0; d--) {
                    var e = a[d];
                    "." == e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--)
                }
                if (b)
                    for (; c--; c) a.unshift("..");
                return a
            }
            var j = /^(.+\/(?!$)|\/)?((?:.+?)?(\.[^.]*)?)$/;
            c.resolve = function() {
                for (var a = "", b = !1, c = arguments.length; c >= -1 && !b; c--) {
                    var d = c >= 0 ? arguments[c] : f.cwd();
                    "string" == typeof d && d && (a = d + "/" + a, b = "/" === d.charAt(0))
                }
                return a = i(h(a.split("/"), function(a) {
                    return !!a
                }), !b).join("/"), (b ? "/" : "") + a || "."
            }, c.normalize = function(a) {
                var b = "/" === a.charAt(0),
                    c = "/" === a.slice(-1);
                return a = i(h(a.split("/"), function(a) {
                    return !!a
                }), !b).join("/"), a || b || (a = "."), a && c && (a += "/"), (b ? "/" : "") + a
            }, c.join = function() {
                var a = Array.prototype.slice.call(arguments, 0);
                return c.normalize(h(a, function(a) {
                    return a && "string" == typeof a
                }).join("/"))
            }, c.dirname = function(a) {
                var b = j.exec(a)[1] || "",
                    c = !1;
                return b ? 1 === b.length || c && 3 >= b.length && ":" === b.charAt(1) ? b : b.substring(0, b.length - 1) : "."
            }, c.basename = function(a, b) {
                var c = j.exec(a)[2] || "";
                return b && c.substr(-1 * b.length) === b && (c = c.substr(0, c.length - b.length)), c
            }, c.extname = function(a) {
                return j.exec(a)[3] || ""
            }
        }), a.define("__browserify_process", function(a, b, c, d, e, f) {
            var f = b.exports = {};
            f.nextTick = function() {
                    var a = "undefined" != typeof window && window.setImmediate,
                        b = "undefined" != typeof window && window.postMessage && window.addEventListener;
                    if (a) return function(a) {
                        return window.setImmediate(a)
                    };
                    if (b) {
                        var c = [];
                        return window.addEventListener("message", function(a) {
                                if (a.source === window && "browserify-tick" === a.data && (a.stopPropagation(), c.length > 0)) {
                                    var b = c.shift();
                                    b()
                                }
                            }, !0),
                            function(a) {
                                c.push(a), window.postMessage("browserify-tick", "*")
                            }
                    }
                    return function(a) {
                        setTimeout(a, 0)
                    }
                }(), f.title = "browser", f.browser = !0, f.env = {}, f.argv = [], f.binding = function(b) {
                    if ("evals" === b) return a("vm");
                    throw Error("No such module. (Possibly not yet loaded)")
                },
                function() {
                    var c, b = "/";
                    f.cwd = function() {
                        return b
                    }, f.chdir = function(d) {
                        c || (c = a("path")), b = c.resolve(d, b)
                    }
                }()
        }), a.define("/package.json", function(a, b) {
            b.exports = {
                main: "index.js"
            }
        }), a.define("/websocket.js", function(a, b) {
            function i(a) {
                h.apply(this, arguments), this.socket = a, this.readable = !0, this.writable = !0;
                var b = this,
                    c = function(b, c) {
                        a.on ? a.on(b, c) : a["on" + b] = c
                    };
                c("message", function(a) {
                    a && a.srcElement && a instanceof MessageEvent && (a = a.data), b.emit("data", a)
                }), c("close", function() {
                    b.emit("end")
                }), c("error", function(a) {
                    b.emit("error", a)
                });
                var d = function() {
                    a.send("ACK"), b.emit("connection")
                };
                c("open", d), c("connection", d)
            }
            var h = a("stream").Stream;
            util = a("util"), util.inherits(i, h), i.prototype.write = function(a) {
                try {
                    this.socket.write ? this.socket.write(a) : this.socket.send(a)
                } catch (b) {
                    this.emit("error", b)
                }
            }, i.prototype.end = function() {
                this.emit("end")
            }, b.exports = i
        }), a.define("stream", function(a, b) {
            function j() {
                h.EventEmitter.call(this)
            }
            var h = a("events"),
                i = a("util");
            i.inherits(j, h.EventEmitter), b.exports = j, j.Stream = j, j.prototype.pipe = function(a, b) {
                function d(b) {
                    a.writable && !1 === a.write(b) && c.pause && c.pause()
                }

                function e() {
                    c.readable && c.resume && c.resume()
                }

                function g() {
                    f || (f = !0, a._pipeCount--, j(), a._pipeCount > 0 || a.end())
                }

                function h() {
                    f || (f = !0, a._pipeCount--, j(), a._pipeCount > 0 || a.destroy())
                }

                function i(a) {
                    if (j(), 0 === this.listeners("error").length) throw a
                }

                function j() {
                    c.removeListener("data", d), a.removeListener("drain", e), c.removeListener("end", g), c.removeListener("close", h), c.removeListener("error", i), a.removeListener("error", i), c.removeListener("end", j), c.removeListener("close", j), a.removeListener("end", j), a.removeListener("close", j)
                }
                var c = this;
                c.on("data", d), a.on("drain", e), a._isStdio || b && b.end === !1 || (a._pipeCount = a._pipeCount || 0, a._pipeCount++, c.on("end", g), c.on("close", h));
                var f = !1;
                return c.on("error", i), a.on("error", i), c.on("end", j), c.on("close", j), a.on("end", j), a.on("close", j), a.emit("pipe", c), a
            }
        }), a.define("events", function(a, b, c, d, e, f) {
            function j(a, b) {
                if (a.indexOf) return a.indexOf(b);
                for (var c = 0; a.length > c; c++)
                    if (b === a[c]) return c;
                return -1
            }
            f.EventEmitter || (f.EventEmitter = function() {});
            var h = c.EventEmitter = f.EventEmitter,
                i = "function" == typeof Array.isArray ? Array.isArray : function(a) {
                    return "[object Array]" === Object.prototype.toString.call(a)
                },
                k = 10;
            h.prototype.setMaxListeners = function(a) {
                this._events || (this._events = {}), this._events.maxListeners = a
            }, h.prototype.emit = function(a) {
                if ("error" === a && (!this._events || !this._events.error || i(this._events.error) && !this._events.error.length)) throw arguments[1] instanceof Error ? arguments[1] : Error("Uncaught, unspecified 'error' event.");
                if (!this._events) return !1;
                var b = this._events[a];
                if (!b) return !1;
                if ("function" == typeof b) {
                    switch (arguments.length) {
                        case 1:
                            b.call(this);
                            break;
                        case 2:
                            b.call(this, arguments[1]);
                            break;
                        case 3:
                            b.call(this, arguments[1], arguments[2]);
                            break;
                        default:
                            var c = Array.prototype.slice.call(arguments, 1);
                            b.apply(this, c)
                    }
                    return !0
                }
                if (i(b)) {
                    for (var c = Array.prototype.slice.call(arguments, 1), d = b.slice(), e = 0, f = d.length; f > e; e++) d[e].apply(this, c);
                    return !0
                }
                return !1
            }, h.prototype.addListener = function(a, b) {
                if ("function" != typeof b) throw Error("addListener only takes instances of Function");
                if (this._events || (this._events = {}), this.emit("newListener", a, b), this._events[a])
                    if (i(this._events[a])) {
                        if (!this._events[a].warned) {
                            var c;
                            c = void 0 !== this._events.maxListeners ? this._events.maxListeners : k, c && c > 0 && this._events[a].length > c && (this._events[a].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[a].length), console.trace())
                        }
                        this._events[a].push(b)
                    } else this._events[a] = [this._events[a], b];
                else this._events[a] = b;
                return this
            }, h.prototype.on = h.prototype.addListener, h.prototype.once = function(a, b) {
                var c = this;
                return c.on(a, function d() {
                    c.removeListener(a, d), b.apply(this, arguments)
                }), this
            }, h.prototype.removeListener = function(a, b) {
                if ("function" != typeof b) throw Error("removeListener only takes instances of Function");
                if (!this._events || !this._events[a]) return this;
                var c = this._events[a];
                if (i(c)) {
                    var d = j(c, b);
                    if (0 > d) return this;
                    c.splice(d, 1), 0 == c.length && delete this._events[a]
                } else this._events[a] === b && delete this._events[a];
                return this
            }, h.prototype.removeAllListeners = function(a) {
                return a && this._events && this._events[a] && (this._events[a] = null), this
            }, h.prototype.listeners = function(a) {
                return this._events || (this._events = {}), this._events[a] || (this._events[a] = []), i(this._events[a]) || (this._events[a] = [this._events[a]]), this._events[a]
            }
        }), a.define("util", function(a, b, c) {
            function i(a) {
                return a instanceof Array || Array.isArray(a) || a && a !== Object.prototype && i(a.__proto__)
            }

            function j(a) {
                return a instanceof RegExp || "object" == typeof a && "[object RegExp]" === Object.prototype.toString.call(a)
            }

            function k(a) {
                if (a instanceof Date) return !0;
                if ("object" != typeof a) return !1;
                var b = Date.prototype && p(Date.prototype),
                    c = a.__proto__ && p(a.__proto__);
                return JSON.stringify(c) === JSON.stringify(b)
            }
            a("events"), c.isArray = i, c.isDate = function(a) {
                return "[object Date]" === Object.prototype.toString.call(a)
            }, c.isRegExp = function(a) {
                return "[object RegExp]" === Object.prototype.toString.call(a)
            }, c.print = function() {}, c.puts = function() {}, c.debug = function() {}, c.inspect = function(a, b, d, e) {
                function h(a, d) {
                    if (a && "function" == typeof a.inspect && a !== c && (!a.constructor || a.constructor.prototype !== a)) return a.inspect(d);
                    switch (typeof a) {
                        case "undefined":
                            return g("undefined", "undefined");
                        case "string":
                            var e = "'" + JSON.stringify(a).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                            return g(e, "string");
                        case "number":
                            return g("" + a, "number");
                        case "boolean":
                            return g("" + a, "boolean")
                    }
                    if (null === a) return g("null", "null");
                    var l = o(a),
                        m = b ? p(a) : l;
                    if ("function" == typeof a && 0 === m.length) {
                        if (j(a)) return g("" + a, "regexp");
                        var n = a.name ? ": " + a.name : "";
                        return g("[Function" + n + "]", "special")
                    }
                    if (k(a) && 0 === m.length) return g(a.toUTCString(), "date");
                    var q, r, s;
                    if (i(a) ? (r = "Array", s = ["[", "]"]) : (r = "Object", s = ["{", "}"]), "function" == typeof a) {
                        var t = a.name ? ": " + a.name : "";
                        q = j(a) ? " " + a : " [Function" + t + "]"
                    } else q = "";
                    if (k(a) && (q = " " + a.toUTCString()), 0 === m.length) return s[0] + q + s[1];
                    if (0 > d) return j(a) ? g("" + a, "regexp") : g("[Object]", "special");
                    f.push(a);
                    var u = m.map(function(b) {
                        var c, e;
                        if (a.__lookupGetter__ && (a.__lookupGetter__(b) ? e = a.__lookupSetter__(b) ? g("[Getter/Setter]", "special") : g("[Getter]", "special") : a.__lookupSetter__(b) && (e = g("[Setter]", "special"))), 0 > l.indexOf(b) && (c = "[" + b + "]"), e || (0 > f.indexOf(a[b]) ? (e = null === d ? h(a[b]) : h(a[b], d - 1), e.indexOf("\n") > -1 && (e = i(a) ? e.split("\n").map(function(a) {
                                return "  " + a
                            }).join("\n").substr(2) : "\n" + e.split("\n").map(function(a) {
                                return "   " + a
                            }).join("\n"))) : e = g("[Circular]", "special")), c === void 0) {
                            if ("Array" === r && b.match(/^\d+$/)) return e;
                            c = JSON.stringify("" + b), c.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (c = c.substr(1, c.length - 2), c = g(c, "name")) : (c = c.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), c = g(c, "string"))
                        }
                        return c + ": " + e
                    });
                    f.pop();
                    var v = 0,
                        w = u.reduce(function(a, b) {
                            return v++, b.indexOf("\n") >= 0 && v++, a + b.length + 1
                        }, 0);
                    return u = w > 50 ? s[0] + ("" === q ? "" : q + "\n ") + " " + u.join(",\n  ") + " " + s[1] : s[0] + q + " " + u.join(", ") + " " + s[1]
                }
                var f = [],
                    g = function(a, b) {
                        var c = {
                                bold: [1, 22],
                                italic: [3, 23],
                                underline: [4, 24],
                                inverse: [7, 27],
                                white: [37, 39],
                                grey: [90, 39],
                                black: [30, 39],
                                blue: [34, 39],
                                cyan: [36, 39],
                                green: [32, 39],
                                magenta: [35, 39],
                                red: [31, 39],
                                yellow: [33, 39]
                            },
                            d = {
                                special: "cyan",
                                number: "blue",
                                "boolean": "yellow",
                                undefined: "grey",
                                "null": "bold",
                                string: "green",
                                date: "magenta",
                                regexp: "red"
                            }[b];
                        return d ? "[" + c[d][0] + "m" + a + "[" + c[d][1] + "m" : a
                    };
                return e || (g = function(a) {
                    return a
                }), h(a, d === void 0 ? 2 : d)
            }, c.log = function() {}, c.pump = null;
            var o = Object.keys || function(a) {
                    var b = [];
                    for (var c in a) b.push(c);
                    return b
                },
                p = Object.getOwnPropertyNames || function(a) {
                    var b = [];
                    for (var c in a) Object.hasOwnProperty.call(a, c) && b.push(c);
                    return b
                },
                q = Object.create || function(a, b) {
                    var c;
                    if (null === a) c = {
                        __proto__: null
                    };
                    else {
                        if ("object" != typeof a) throw new TypeError("typeof prototype[" + typeof a + "] != 'object'");
                        var d = function() {};
                        d.prototype = a, c = new d, c.__proto__ = a
                    }
                    return b !== void 0 && Object.defineProperties && Object.defineProperties(c, b), c
                };
            c.inherits = function(a, b) {
                a.super_ = b, a.prototype = q(b.prototype, {
                    constructor: {
                        value: a,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                })
            };
            var r = /%[sdj%]/g;
            c.format = function(a) {
                if ("string" != typeof a) {
                    for (var b = [], d = 0; arguments.length > d; d++) b.push(c.inspect(arguments[d]));
                    return b.join(" ")
                }
                for (var d = 1, e = arguments, f = e.length, g = (a + "").replace(r, function(a) {
                        if ("%%" === a) return "%";
                        if (d >= f) return a;
                        switch (a) {
                            case "%s":
                                return e[d++] + "";
                            case "%d":
                                return Number(e[d++]);
                            case "%j":
                                return JSON.stringify(e[d++]);
                            default:
                                return a
                        }
                    }), h = e[d]; f > d; h = e[++d]) g += null === h || "object" != typeof h ? " " + h : " " + c.inspect(h);
                return g
            }
        }), a.define("/client.js", function(a, b) {
            var h = a("./websocket");
            b.exports = function(a) {
                var b = "";
                b = "https" === window.location.protocol ? "wss" : "ws", b += "://" + window.location.host;
                var c = new WebSocket(b),
                    d = new h(c);
                d.on("connection", function() {
                    a && a(d)
                })
            }, "undefined" != typeof window && (window.websocket = b.exports)
        }), a("/client.js")
})();