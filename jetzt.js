
/*! jetzt 2014-03-26
 * https://ds300.github.io/jetzt/
 * Copyright (c) 2014 David Sheldrick and contributors; Licensed Apache 2.0 */
! function (a) {
	return "undefined" != typeof a.jetzt ? void console.warn("jetzt unable to initialize, window.jetzt already set") : void(a.jetzt = {})
}(this),
function (a) {
	function b(a, b, c) {
		var d = [];
		a.className.trim().length >= 0 && (d = a.className.split(/\s+/)), b.split(/\s+/).forEach(function (a) {
			c(d, a)
		}), a.className = d.join(" ")
	}
	var c = a.jetzt,
		d = {};
	c.helpers = d, d.removeFromArray = function (a, b) {
		var c = a.indexOf(b);
		c > -1 && a.splice(c, 1)
	}, d.getScrollTop = function () {
		return document.body.scrollTop || document.documentElement.scrollTop
	}, d.getScrollLeft = function () {
		return document.body.scrollLeft || document.documentElement.scrollLeft
	}, d.elem = function (a, b, c) {
		var d = document.createElement(a);
		return d.className = b || "", c && c.forEach(function (a) {
			d.appendChild(a)
		}), d
	}, d.div = function (a, b) {
		return d.elem("div", a, b)
	}, d.span = function (a, b) {
		return d.elem("span", a, b)
	}, d.addClass = function (a, c) {
		b(a, c, function (a, b) {
			d.removeFromArray(a, b), a.push(b)
		})
	}, d.removeClass = function (a, c) {
		b(a, c, d.removeFromArray)
	}, d.hasClass = function (a, c) {
		var d = !0;
		return b(a, c, function (a, b) {
			d = d && a.indexOf(b) > -1
		}), d
	}, d.realTypeOf = function (a) {
		return Object.prototype.toString.call(a).slice(8, -1)
	}, d.flatten = function (a) {
		var b = [],
			c = function d(a) {
				"[object Array]" === Object.prototype.toString.call(a) ? a.forEach(d) : b.push(a)
			};
		return c(a), b
	}, d.clamp = function (a, b, c) {
		return Math.min(Math.max(b, a), c)
	}, d.recursiveExtend = function () {
		for (var a = arguments[0], b = 1; b < arguments.length; b++) {
			var c = arguments[b];
			for (var e in c)
				if (c.hasOwnProperty(e))
					if (a.hasOwnProperty(e)) {
						var f = a[e],
							g = c[e];
						a[e] = "Object" === d.realTypeOf(f) && "Object" === d.realTypeOf(g) ? d.recursiveExtend({}, f, g) : g
					} else a[e] = c[e]
		}
		return a
	}, d.keys = function (a) {
		var b = [];
		for (var c in a) a.hasOwnProperty(c) && b.push(c);
		return b
	}, d.clone = function (a) {
		return JSON.parse(JSON.stringify(a))
	}
}(this),
function (a) {
	function b() {
		n.forEach(function (a) {
			a()
		})
	}

	function c(a, b) {
		if (0 === b.length) throw new Error("No keys specified.");
		var d = b[0];
		if (1 === b.length) return a.hasOwnProperty(d) || console.warn("config lookup: no key '" + d + "'"), a[d];
		var e = a[d];
		return "Object" !== h.realTypeOf(e) ? void console.warn("config lookup: no key '" + d + "'") : c(e, b.slice(1))
	}

	function d(a, b, c) {
		if (0 === b.length) throw new Error("No keys specified.");
		var d = b[0];
		if (1 === b.length) a[d] = c;
		else {
			var e = a[d];
			"Object" !== h.realTypeOf(e) && (e = {}, a[d] = e), _put(e, b.slice(1), c)
		}
	}

	function e() {
		p.set(JSON.stringify(m))
	}

	function f(c) {
		try {
			var d = JSON.parse(c || "{}"),
				f = !1;
			d.config_version != i && (d.custom_themes && h.keys(d.custom_themes).forEach(function (a) {
				var b = d.custom_themes[a];
				d.custom_themes[a] = h.recursiveExtend(j.Classic, b)
			}), d.config_version = i, f = !0), h.recursiveExtend(m, d), a.jazz = m, f && e(), b()
		} catch (g) {
			throw new Error("corrupt config json", g)
		}
	}
	var g = a.jetzt,
		h = g.helpers,
		i = 0,
		j = [{
			name: "Classic",
			dark: {
				backdrop_opacity: "0.86",
				colors: {
					backdrop: "#000000",
					background: "#303030",
					foreground: "#E0E0E0",
					message: "#909090",
					pivot: "#73b5ee",
					progress_bar_background: "#000000",
					progress_bar_foreground: "#3a5566",
					reticle: "#656565",
					wrap_background: "#404040",
					wrap_foreground: "#a1a1a1"
				}
			},
			light: {
				backdrop_opacity: "0.07",
				colors: {
					backdrop: "black",
					background: "#fbfbfb",
					foreground: "#333333",
					message: "#929292",
					pivot: "#E01000",
					progress_bar_background: "black",
					progress_bar_foreground: "#00c00a",
					reticle: "#efefef",
					wrap_background: "#f1f1f1",
					wrap_foreground: "#666"
				}
			}
		}],
		k = {
			normal: 1,
			start_clause: 1,
			end_clause: 1.8,
			start_sentence: 1.3,
			end_sentence: 2.2,
			start_paragraph: 2,
			end_paragraph: 2.8,
			short_space: 1.5,
			long_space: 2.2
		},
		l = {
			config_version: i,
			target_wpm: 500,
			scale: 1,
			dark: 1,
			selected_theme: 0,
			show_message: !1,
			selection_color: "#FF0000",
			modifiers: k,
			font_family: "Menlo, Monaco, Consolas, monospace",
			custom_themes: []
		},
		m = h.clone(l),
		n = [],
		o = "jetzt_options",
		p = {
			get: function (a) {
				var b = localStorage.getItem(o);
				a(b ? "{}" : b)
			},
			set: function (a) {
				localStorage.setItem(o, a)
			}
		},
		q = function (a, f) {
			return "string" == typeof a && (a = [a]), 1 === arguments.length ? c(m, a) : (d(m, a, f), e(), b(), void 0)
		};
	g.config = q, q.DEFAULTS = h.clone(l), q.DEFAULT_THEMES = h.clone(j), q.onChange = function (a) {
		return n.push(a),
			function () {
				h.removeFromArray(n, a)
			}
	}, q.setBackend = function (a) {
		p = a, this.refresh(), b()
	}, q.refresh = function (a) {
		p.get(function (b) {
			f(b), a && a()
		})
	}, q.getSelectedTheme = function () {
		return j[m.selected_theme] || j[0]
	}, q.maxModifier = function (a, b) {
		return this(["modifiers", a]) > this(["modifiers", b]) ? a : b
	}, q.adjustWPM = function (a) {
		m.target_wpm = h.clamp(100, m.target_wpm + a, 1500), b(), e()
	}, q.adjustScale = function (a) {
		this("scale", h.clamp(0, m.scale + a, 1))
	}, q.save = function () {
		e()
	}, q.refresh()
}(this),
function (a) {
	function b(a) {
		return a.length > 13 || a.length > 9 && a.indexOf("-") > -1
	}

	function c(a) {
		if (b(a)) {
			var d = [],
				e = a.indexOf("-");
			if (e > 0 && e < a.length - 1) return d.push(a.substr(0, e)), d.push(a.substr(e + 1)), j.flatten(d.map(c));
			for (var f = Math.ceil(a.length / 8), g = Math.ceil(a.length / f); f--;) d.push(a.substr(0, g)), a = a.substr(g);
			return d
		}
		return [a]
	}

	function d(a) {
		var b = c(a);
		if (b.length > 1)
			for (var d = 0; d < b.length - 1; d++) b[d] += "-";
		return b
	}

	function e() {
		var a = [],
			c = "normal",
			e = [],
			f = null;
		this.modNext = function (a) {
			c = k.maxModifier(c, a)
		}, this.modPrev = function (b) {
			if (a.length > 0) {
				var c = a[a.length - 1].modifier;
				a[a.length - 1].modifier = k.maxModifier(c, b)
			}
		}, this.pushWrap = function (a) {
			e.push(a)
		}, this.popWrap = function (a) {
			var b = e.lastIndexOf(a);
			b > -1 && e.splice(e.lastIndexOf(a), e.length)
		}, this.clearWrap = function () {
			e = []
		};
		var g = function (a) {
			return a.leftWrap = e.map(function (a) {
				return a.left
			}).join(""), a.rightWrap = e.map(function (a) {
				return a.right
			}).reverse().join(""), a
		};
		this.spacer = function () {
			f ? f.modifier = "long_space" : f = g({
				token: "   ",
				modifier: "short_space"
			})
		};
		var h = function (b) {
			f && a.push(f), a.push(g({
				token: b,
				modifier: c
			})), c = "normal", f = null
		};
		this.token = function (a) {
			b(a) ? d(a).forEach(h) : h(a)
		}, this.getInstructions = function () {
			return a
		}
	}

	function f(a, b) {
		for (var c = b ? b : new e, d = null, h = 0; h < a.childNodes.length; h++) switch (d = a.childNodes[h], d.nodeName) {
			case "H1":
				c.modNext("start_paragraph"), f(d, c), c.spacer(), c.clearWrap(), c.modPrev("end_paragraph");
				break;
			case "SCRIPT":
				break;
			case "#text":
				d.textContent.trim().length > 0 && g(d.textContent.trim(), c);
				break;
			case "P":
				c.clearWrap(), c.modNext("start_paragraph"), f(d, c), c.modPrev("end_paragraph"), c.clearWrap();
				break;
			case "#comment":
				break;
			default:
				f(d, c)
		}
		return c.getInstructions()
	}

	function g(a, b) {
		for (var c = a.match(/["«»“”\(\)\/–—]|--+|\n+|[^\s"“«»”\(\)\/–—]+/g), d = b ? b : new e, f = !1, g = 0; g < c.length; g++) {
			var h = c[g];
			switch (h) {
				case "“":
					d.spacer(), d.pushWrap(l.double_quote), d.modNext("start_clause");
					break;
				case "”":
					d.popWrap(l.double_quote), d.modPrev("end_clause"), d.spacer();
					break;
				case "«":
					d.spacer(), d.pushWrap(l.guillemot), d.modNext("start_clause");
					break;
				case "»":
					d.popWrap(l.guillemot), d.modPrev("end_clause"), d.spacer();
					break;
				case '"':
					f ? (d.popWrap(l.double_quote), d.spacer(), d.modNext("start_clause")) : (d.spacer(), d.pushWrap(l.double_quote), d.modPrev("end_clause")), f = !f;
					break;
				case "(":
					d.spacer(), d.pushWrap(l.parens), d.modNext("start_clause");
					break;
				case ")":
					d.popWrap(l.parens), d.modPrev("end_clause"), d.spacer();
					break;
				default:
					h.match(/^(\/|--+|—|–)$/) ? (d.modNext("start_clause"), d.token(h), d.modNext("start_clause")) : h.match(/[.?!…]+$/) ? (d.modNext("end_sentence"), d.token(h), d.modNext("start_sentence")) : h.match(/[,;:]$/) ? (d.modNext("end_clause"), d.token(h), d.modNext("start_clause")) : h.match(/\n+/) ? (h.length > 1 || g > 0 && c[g - 1].match(/[.?!…'"”]+$/)) && (d.clearWrap(), d.modPrev("end_paragraph"), d.spacer(), d.modNext("start_paragraph"), f = !1) : h.match(/^".+$/) ? (f = !0, d.modNext("start_clause"), d.token(h.substr(1))) : d.token(h)
			}
		}
		return d.getInstructions()
	}

	function h(a, b) {
		var c = new e;
		return "Array" === j.realTypeOf(b) ? b.forEach(function (b) {
			c.modNext("start_paragraph"), a(b, c), c.clearWrap(), c.modPrev("end_paragraph")
		}) : a(b, c), c.getInstructions()
	}
	var i = a.jetzt,
		j = i.helpers,
		k = i.config,
		l = {
			guillemot: {
				left: "«",
				right: "»"
			},
			double_quote: {
				left: "“",
				right: "”"
			},
			parens: {
				left: "(",
				right: ")"
			},
			heading1: {
				left: "H1",
				right: ""
			}
		};
	i.parse = {
		string: function (a) {
			return h(g, a)
		},
		dom: function (a) {
			return h(f, a)
		}
	}
}(this),
function (a) {
	function b(a) {
		var b = 6e4 / e("target_wpm");
		if ("normal" !== a.modifier) return b * e(["modifiers", a.modifier]);
		var c = a.token.length,
			d = 1;
		switch (c) {
			case 6:
			case 7:
				d = 1.2;
				break;
			case 8:
			case 9:
				d = 1.4;
				break;
			case 10:
			case 11:
				d = 1.8;
				break;
			case 12:
			case 13:
				d = 2
		}
		return b * d
	}

	function c(a) {
		function c(b) {
			"undefined" == typeof b && (b = n < a.length ? a[n] : a[a.length - 1]), l.setWord(b.token), l.setWrap(b.leftWrap, b.rightWrap), l.setProgress(100 * (n / a.length)), 1 === n ? g() : n === a.length ? h() : n % 5 === 0 && e()
		}

		function e() {
			var b = a.length,
				c = Math.round((new Date).getTime() / 1e3),
				d = c - l.started,
				e = d * (b - n) / n;
			l.setMessage(Math.round(e) + "s left")
		}

		function g() {
			var a = Math.round((new Date).getTime() / 1e3);
			l.started = a
		}

		function h() {
			var b = a.length,
				c = Math.round((new Date).getTime() / 1e3),
				d = c - l.started;
			l.setMessage(b + " words in " + d + "s")
		}

		function i(a) {
			c(a), j(b(a))
		}

		function j(b) {
			k = setTimeout(function () {
				m && n < a.length ? i(a[n++]) : m = !1
			}, b)
		}
		var k, l = d.view.reader,
			m = !1,
			n = 0;
		this.start = function () {
			n === a.length && (n = 0), m = !0, j(0)
		}, this.stop = function () {
			clearTimeout(k), m = !1
		}, this.toggleRunning = function (a) {
			a !== m && (m ? this.stop() : this.start())
		}, this.prevSentence = function () {
			for (n = Math.max(0, n - 5); n > 0 && !f[a[n].modifier];) n--;
			m || c()
		}, this.nextSentence = function () {
			for (n = Math.min(n + 1, a.length - 1); n < a.length - 1 && !f[a[n].modifier];) n++;
			m || c()
		}, this.prevParagraph = function () {
			for (n = Math.max(0, n - 5); n > 0 && "start_paragraph" != a[n].modifier;) n--;
			m || c()
		}, this.nextParagraph = function () {
			for (n = Math.min(n + 1, a.length - 1); n < a.length - 1 && "start_paragraph" != a[n].modifier;) n++;
			m || c()
		}
	}
	var d = a.jetzt,
		e = d.config,
		f = {
			start_sentence: !0,
			start_paragraph: !0
		};
	d.exec = function (a) {
		return new c(a)
	}
}(this),
function (a) {
	function b(a) {
		var b = a.length;
		return 2 > b ? 0 : 6 > b ? 1 : 10 > b ? 2 : 14 > b ? 3 : 4
	}

	function c() {
		var c, d = g("sr-backdrop"),
			i = g("sr-wpm"),
			j = g("sr-wrap sr-left"),
			k = g("sr-wrap sr-right"),
			l = h(),
			m = h(),
			n = h("sr-pivot"),
			o = g("sr-word", [l, n, m]),
			p = g("sr-progress"),
			q = g("sr-message"),
			r = g("sr-reticle"),
			s = f.elem("input", "sr-input"),
			t = g("sr-word-box", [r, p, q, o, i, s]),
			u = g("sr-reader", [j, t, k]),
			v = g("sr-reader-wrapper", [u]);
		s.onkeyup = s.onkeypress = function (a) {
			return a.ctrlKey || a.metaKey ? void 0 : (a.stopImmediatePropagation(), !1)
		};
		var w = function () {
			s.focus()
		};
		this.onBackdropClick = function (a) {
			d.onclick = a
		}, this.onKeyDown = function (a) {
			s.onkeydown = a
		}, this.dark = !1, this.applyConfig = function () {
			this.dark = e("dark"), this.applyTheme(e.getSelectedTheme()), this.setScale(e("scale")), this.setWPM(e("target_wpm")), this.setFont(e("font_family")), e("show_message") ? this.showMessage() : this.hideMessage()
		}, this.appendTo = function (a) {
			a.appendChild(d), a.appendChild(v), v.offsetWidth, f.addClass(v, "in")
		}, this.watchConfig = function () {
			var a = this;
			c = e.onChange(function () {
				a.applyConfig()
			})
		}, this.unwatchConfig = function () {
			c && c()
		}, this.show = function (b) {
			this.appendTo(document.body), this.applyConfig(), this.watchConfig();
			var c = f.getScrollTop();
			w(), document.body.scrollTop = c, document.documentElement.scrollTop = c, s.onblur = w, "function" == typeof b && a.setTimeout(b, 340)
		}, this.hide = function (b) {
			c(), s.onblur = null, s.blur(), d.style.opacity = 0, f.removeClass(v, "in"), a.setTimeout(function () {
				d.remove(), v.remove(), "function" == typeof b && b()
			}, 340)
		}, this.setScale = function (a) {
			v.style.webkitTransform = "translate(-50%, -50%) scale(" + a + ")", v.style.mozTransform = "translate(-50%, -50%) scale(" + a + ")", v.style.transform = "translate(-50%, -50%) scale(" + a + ")"
		}, this.setWPM = function (a) {
			i.innerHTML = a + ""
		}, this.setFont = function (a) {
			l.style.fontFamily = a, n.style.fontFamily = a, m.style.fontFamily = a, j.style.fontFamily = a, k.style.fontFamily = a, i.style.fontFamily = a, q.style.fontFamily = a
		}, this.applyTheme = function (a) {
			var b;
			b = this.dark ? a.dark : a.light;
			var c = b.colors;
			d.offsetWidth, d.style.opacity = b.backdrop_opacity, d.style.backgroundColor = c.backdrop, t.style.backgroundColor = c.background, l.style.color = c.foreground, m.style.color = c.foreground, j.style.backgroundColor = c.wrap_background, k.style.backgroundColor = c.wrap_background, j.style.color = c.wrap_foreground, k.style.color = c.wrap_foreground, r.style.borderColor = c.reticle, n.style.color = c.pivot, p.style.borderColor = c.progress_bar_foreground, p.style.backgroundColor = c.progress_bar_background, q.style.color = c.message, i.style.color = c.message
		}, this.setProgress = function (a) {
			p.style.borderLeftWidth = Math.ceil(4 * a) + "px"
		}, this.setMessage = function (a) {
			q.innerHTML = a
		}, this.showMessage = function () {
			q.style.display = "block"
		}, this.hideMessage = function () {
			q.style.display = "none"
		}, this.started = !1, this.setWord = function (a) {
			var c = b(a.replace(/[?.,!:;*-]+$/, ""));
			l.innerHTML = a.substr(0, c), n.innerHTML = a.substr(c, 1), m.innerHTML = a.substr(c + 1), o.offsetWidth;
			var d = r.offsetLeft + r.offsetWidth / 2;
			o.style.left = d - n.offsetLeft - n.offsetWidth / 2 + "px"
		}, this.setWrap = function (a, b) {
			j.innerHTML = a, k.innerHTML = b;
			var c = j.offsetWidth,
				d = k.offsetWidth;
			v.style.paddingLeft = "50px", v.style.paddingRight = "50px", c > d ? v.style.paddingRight = 50 + (c - d) + "px" : d > c && (v.style.paddingLeft = 50 + (d - c) + "px")
		}, this.clear = function () {
			this.setWrap("", ""), this.setWord("   ")
		}
	}
	var d = a.jetzt,
		e = d.config,
		f = d.helpers,
		g = f.div,
		h = f.span,
		i = {};
	d.view = i, i.Reader = c;
	var j;
	i.__defineGetter__("reader", function () {
		return j || (j = new c), j
	});
	var k = [];
	i.addOverlay = function (b) {
		var c = b.getBoundingClientRect(),
			d = f.div("sr-overlay");
		return d.style.top = f.getScrollTop() + c.top + "px", d.style.left = f.getScrollLeft() + c.left + "px", d.style.width = c.width + "px", d.style.height = c.height + "px", d.style.backgroundColor = e("selection_color"), document.body.appendChild(d), b.___jetztOverlay = d, k.push(b), c.top < a.innerHeight
	}, i.removeOverlay = function (a) {
		a.___jetztOverlay && (a.___jetztOverlay.remove(), delete a.___jetztOverlay, f.removeFromArray(k, a))
	}, i.removeAllOverlays = function () {
		for (var a = k.length; a--;) {
			var b = k[a];
			b.___jetztOverlay.remove(), delete b.___jetztOverlay
		}
		k = []
	};
	i.highlightRange = function () {}
}(this),
function (a) {
	function b(b, c) {
		a.addEventListener(b, c)
	}

	function c(b, c) {
		a.removeEventListener(b, c)
	}

	function d() {
		var a = [],
			d = null,
			g = function () {
				overlays = [];
				for (var b = 0, c = a.length; c > b && e.view.addOverlay(a[b]); b++);
			},
			h = function (b) {
				e.view.removeAllOverlays(), a = b, g()
			},
			i = {
				DIV: !0,
				ARTICLE: !0,
				BLOCKQUOTE: !0,
				MAIN: !0,
				SECTION: !0,
				UL: !0,
				OL: !0,
				DL: !0
			},
			j = {
				P: !0,
				H1: !0,
				H2: !0,
				H3: !0,
				H4: !0,
				H5: !0,
				H6: !0,
				SPAN: !0,
				DL: !0,
				OL: !0,
				UL: !0,
				BLOCKQUOTE: !0,
				SECTION: !0
			},
			k = function (a) {
				for (var b = a, c = a.parentNode; c && !i[c.tagName];) b = c, c = b.parentNode;
				if (c) {
					for (var d = c.childNodes, e = d.length, f = [], g = 0; d[g] !== b;) g++;
					for (; e > g; g++) {
						var h = d[g];
						j[h.tagName] && f.push(h)
					}
					return f
				}
				return [a]
			},
			l = function () {
				e.view.removeAllOverlays(), c("mouseover", m), c("mousemove", o), c("keydown", p), c("keyup", q), c("click", n), d && f.removeClass(d, "sr-pointer")
			},
			m = function (a) {
				d && f.removeClass(d, "sr-pointer"), f.addClass(a.target, "sr-pointer"), d = a.target, h(a.altKey ? [a.target] : k(a.target))
			},
			n = function () {
				l(), e.init(e.parse.dom(a))
			},
			o = function (a) {
				m(a), c("mousemove", o)
			},
			p = function (b) {
				27 === b.keyCode ? l() : b.altKey && a.length > 1 && h([a[0]])
			},
			q = function (b) {
				b.altKey || 1 !== a.length || h(k(a[0]))
			};
		b("mouseover", m), b("click", n), b("mousemove", o), b("keydown", p), b("keyup", q)
	}
	  var e = a.jetzt,
		    f = e.helpers;
	  e.select = function (b) {
		    var c;
		    c = void 0 === b ? a.getSelection().toString() : b.selectionText, c.trim().length > 0 ? (e.init(e.parse.string(c)), a.getSelection().removeAllRanges()) : d()
	  }
    e.fromText = function (text) {
		    var c = text;
        e.init(e.parse.string(c))
    }
}(this),
function (a) {
	function b(a) {
		a.preventDefault(), a.stopImmediatePropagation()
	}
	var c = a.jetzt,
		d = (c.helpers, c.config),
		e = {};
	c.control = e, e.keyboard = function (a) {
		c.view.reader.onKeyDown(function (e) {
			if (!e.ctrlKey && !e.metaKey) switch (e.keyCode) {
				case 27:
				case 192:
					b(e), c.quit();
					break;
				case 38:
					b(e), d.adjustWPM(10);
					break;
				case 40:
					b(e), d.adjustWPM(-10);
					break;
				case 37:
					b(e), e.altKey ? a.prevParagraph() : a.prevSentence();
					break;
				case 39:
					b(e), e.altKey ? a.nextParagraph() : a.nextSentence();
					break;
				case 32:
					b(e), a.toggleRunning();
					break;
				case 187:
				case 107:
				case 61:
					b(e), d.adjustScale(.1);
					break;
				case 109:
				case 189:
				case 173:
					b(e), d.adjustScale(-.1);
					break;
				case 48:
					b(e), d("dark", !d("dark"));
					break;
				case 191:
					b(e), d("show_message", !d("show_message"))
			}
		})
	}, a.addEventListener("keydown", function (a) {
		!c.isOpen() && a.altKey && 83 === a.keyCode && (a.preventDefault(), c.select())
	})
}(this),
function (a) {
	var b, c = a.jetzt,
		d = c.view.reader;
	c.init = function (a) {
		if (b) throw new Error("jetzt already initialised");
		d.clear(), b = c.exec(a), c.control.keyboard(b), d.show(), d.onBackdropClick(c.quit), setTimeout(function () {
			b.start()
		}, 500)
	}, c.quit = function () {
		b.stop(), d.hide(), b = null
	}, c.isOpen = function () {
		return !!b
	}
}(this);
