layui.define("view", function (e) {
    var a = layui.jquery, t = layui.laytpl, i = layui.element, n = layui.table, l = layui.upload, s = layui.setter,
        r = layui.view, o = layui.device(), u = a(window), d = a("body"), c = a("#" + s.container), y = "layui-show",
        f = "layui-hide", m = "layui-this", h = "layui-disabled", p = "#LAY_app_body", v = "LAY_app_flexible",
        b = "layadmin-layout-tabs", g = "layadmin-side-spread-sm", x = "layadmin-tabsbody-item",
        C = "layui-icon-shrink-right", k = "layui-icon-spread-left", P = "layadmin-side-shrink",
        F = "LAY-system-side-menu", A = {
            v: "1.7.1 std", req: r.req, exit: r.exit, escape: function (e) {
                return String(e || "").replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;")
            }, on: function (e, a) {
                return layui.onevent.call(this, s.MOD_NAME, e, a)
            }, sendAuthCode: function (e) {
                e = a.extend({seconds: 60, elemPhone: "#LAY_phone", elemVercode: "#LAY_vercode"}, e);
                var t, i = e.seconds, n = a(e.elem), l = function (a) {
                    i--, i < 0 ? (n.removeClass(h).html("\u83b7\u53d6\u9a8c\u8bc1\u7801"), i = e.seconds, clearInterval(t)) : n.addClass(h).html(i + "\u79d2\u540e\u91cd\u83b7"), a || (t = setInterval(function () {
                        l(!0)
                    }, 1e3))
                };
                e.elemPhone = a(e.elemPhone), e.elemVercode = a(e.elemVercode), n.on("click", function () {
                    var t = e.elemPhone, n = t.val();
                    if (i === e.seconds && !a(this).hasClass(h)) {
                        if (!/^1\d{10}$/.test(n)) return t.focus(), layer.msg("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7");
                        if ("object" == typeof e.ajax) {
                            var s = e.ajax.success;
                            delete e.ajax.success
                        }
                        A.req(a.extend(!0, {
                            url: "/auth/code", type: "get", data: {phone: n}, success: function (a) {
                                layer.msg("\u9a8c\u8bc1\u7801\u5df2\u53d1\u9001\u81f3\u4f60\u7684\u624b\u673a\uff0c\u8bf7\u6ce8\u610f\u67e5\u6536", {
                                    icon: 1,
                                    shade: 0
                                }), e.elemVercode.focus(), l(), s && s(a)
                            }
                        }, e.ajax))
                    }
                })
            }, screen: function () {
                var e = u.width();
                return e > 1200 ? 3 : e > 992 ? 2 : e > 768 ? 1 : 0
            }, sideFlexible: function (e) {
                var t = c, i = a("#" + v), n = A.screen();
                "spread" === e ? (i.removeClass(k).addClass(C), n < 2 ? t.addClass(g) : t.removeClass(g), t.removeClass(P)) : (i.removeClass(C).addClass(k), n < 2 ? t.removeClass(P) : t.addClass(P), t.removeClass(g)), layui.event.call(this, s.MOD_NAME, "side({*})", {status: e})
            }, popup: r.popup, popupRight: function (e) {
                return A.popup.index = layer.open(a.extend({
                    type: 1,
                    id: "LAY_adminPopupR",
                    anim: -1,
                    title: !1,
                    closeBtn: !1,
                    offset: "r",
                    shade: .1,
                    shadeClose: !0,
                    skin: "layui-anim layui-anim-rl layui-layer-adminRight",
                    area: "300px"
                }, e))
            }, theme: function (e) {
                var i = (s.theme, layui.data(s.tableName)), n = "LAY_layadmin_theme", l = document.createElement("style"),
                    r = t([".layui-side-menu,", ".layadmin-pagetabs .layui-tab-title li:after,", ".layadmin-pagetabs .layui-tab-title li.layui-this:after,", ".layui-layer-administrator .layui-layer-title,", ".layadmin-side-shrink .layui-side-menu .layui-nav>.layui-nav-item>.layui-nav-child", "{background-color:{{d.color.main}} !important;}", ".layui-nav-tree .layui-this,", ".layui-nav-tree .layui-this>a,", ".layui-nav-tree .layui-nav-child dd.layui-this,", ".layui-nav-tree .layui-nav-child dd.layui-this a", "{background-color:{{d.color.selected}} !important;}", ".layui-layout-administrator .layui-logo{background-color:{{d.color.logo || d.color.main}} !important;}", "{{# if(d.color.header){ }}", ".layui-layout-administrator .layui-header{background-color:{{ d.color.header }};}", ".layui-layout-administrator .layui-header a,", ".layui-layout-administrator .layui-header a cite{color: #f8f8f8;}", ".layui-layout-administrator .layui-header a:hover{color: #fff;}", ".layui-layout-administrator .layui-header .layui-nav .layui-nav-more{border-top-color: #fbfbfb;}", ".layui-layout-administrator .layui-header .layui-nav .layui-nav-mored{border-color: transparent; border-bottom-color: #fbfbfb;}", ".layui-layout-administrator .layui-header .layui-nav .layui-this:after, .layui-layout-administrator .layui-header .layui-nav-bar{background-color: #fff; background-color: rgba(255,255,255,.5);}", ".layadmin-pagetabs .layui-tab-title li:after{display: none;}", "{{# } }}"].join("")).render(e = a.extend({}, i.theme, e)),
                    o = document.getElementById(n);
                "styleSheet" in l ? (l.setAttribute("type", "text/css"), l.styleSheet.cssText = r) : l.innerHTML = r, l.id = n, o && d[0].removeChild(o), d[0].appendChild(l), d.attr("layadmin-themealias", e.color.alias), i.theme = i.theme || {}, layui.each(e, function (e, a) {
                    i.theme[e] = a
                }), layui.data(s.tableName, {key: "theme", value: i.theme})
            }, initTheme: function (e) {
                var a = s.theme;
                e = e || 0, a.color[e] && (a.color[e].index = e, A.theme({color: a.color[e]}))
            }, tabsPage: {}, tabsBody: function (e) {
                return a(p).find("." + x).eq(e || 0)
            }, tabsBodyChange: function (e, a) {
                a = a || {}, A.tabsBody(e).addClass(y).siblings().removeClass(y), z.rollPage("auto", e), layui.event.call(this, s.MOD_NAME, "tabsPage({*})", {
                    url: a.url,
                    text: a.text
                })
            }, resize: function (e) {
                var a = layui.router(), t = a.path.join("-");
                A.resizeFn[t] && (u.off("resize", A.resizeFn[t]), delete A.resizeFn[t]), "off" !== e && (e(), A.resizeFn[t] = e, u.on("resize", A.resizeFn[t]))
            }, resizeFn: {}, runResize: function () {
                var e = layui.router(), a = e.path.join("-");
                A.resizeFn[a] && A.resizeFn[a]()
            }, delResize: function () {
                this.resize("off")
            }, closeThisTabs: function () {
                A.tabsPage.index && a(T).eq(A.tabsPage.index).find(".layui-tab-close").trigger("click")
            }, fullScreen: function () {
                var e = document.documentElement,
                    a = e.requestFullScreen || e.webkitRequestFullScreen || e.mozRequestFullScreen || e.msRequestFullscreen;
                "undefined" != typeof a && a && a.call(e)
            }, exitScreen: function () {
                document.documentElement;
                document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen()
            }
        }, z = A.events = {
            flexible: function (e) {
                var a = e.find("#" + v), t = a.hasClass(k);
                A.sideFlexible(t ? "spread" : null)
            }, refresh: function () {
                var e = ".layadmin-iframe", t = a("." + x).length;
                A.tabsPage.index >= t && (A.tabsPage.index = t - 1);
                var i = A.tabsBody(A.tabsPage.index).find(e);
                i[0].contentWindow.location.reload(!0)
            }, serach: function (e) {
                e.off("keypress").on("keypress", function (a) {
                    if (this.value.replace(/\s/g, "") && 13 === a.keyCode) {
                        var t = e.attr("lay-action"), i = e.attr("lay-text") || "\u641c\u7d22";
                        t += this.value, i = i + ' <span style="color: #FF5722;">' + A.escape(this.value) + "</span>", layui.index.openTabsPage(t, i), z.serach.keys || (z.serach.keys = {}), z.serach.keys[A.tabsPage.index] = this.value, this.value === z.serach.keys[A.tabsPage.index] && z.refresh(e), this.value = ""
                    }
                })
            }, message: function (e) {
                e.find(".layui-badge-dot").remove()
            }, theme: function () {
                A.popupRight({
                    id: "LAY_adminPopupTheme", success: function () {
                        r(this.id).render("system/theme")
                    }
                })
            }, note: function (e) {
                var a = A.screen() < 2, t = layui.data(s.tableName).note;
                z.note.index = A.popup({
                    title: "\u672c\u5730\u4fbf\u7b7e",
                    shade: 0,
                    offset: ["41px", a ? null : e.offset().left - 250 + "px"],
                    anim: -1,
                    id: "LAY_adminNote",
                    skin: "layadmin-note layui-anim layui-anim-upbit",
                    content: '<textarea placeholder="\u5185\u5bb9"></textarea>',
                    resize: !1,
                    success: function (e, a) {
                        var i = e.find("textarea"),
                            n = void 0 === t ? "\u4fbf\u7b7e\u4e2d\u7684\u5185\u5bb9\u4f1a\u5b58\u50a8\u5728\u672c\u5730\uff0c\u8fd9\u6837\u5373\u4fbf\u4f60\u5173\u6389\u4e86\u6d4f\u89c8\u5668\uff0c\u5728\u4e0b\u6b21\u6253\u5f00\u65f6\uff0c\u4f9d\u7136\u4f1a\u8bfb\u53d6\u5230\u4e0a\u4e00\u6b21\u7684\u8bb0\u5f55\u3002\u662f\u4e2a\u975e\u5e38\u5c0f\u5de7\u5b9e\u7528\u7684\u672c\u5730\u5907\u5fd8\u5f55" : t;
                        i.val(n).focus().on("keyup", function () {
                            layui.data(s.tableName, {key: "note", value: this.value})
                        })
                    }
                })
            }, fullscreen: function (e) {
                var a = "layui-icon-screen-full", t = "layui-icon-screen-restore", i = e.children("i");
                i.hasClass(a) ? (A.fullScreen(), i.addClass(t).removeClass(a)) : (A.exitScreen(), i.addClass(a).removeClass(t))
            }, about: function () {
                A.popupRight({
                    id: "LAY_adminPopupAbout", success: function () {
                        r(this.id).render("system/about")
                    }
                })
            }, more: function () {
                A.popupRight({
                    id: "LAY_adminPopupMore", success: function () {
                        r(this.id).render("system/more")
                    }
                })
            }, back: function () {
                history.back()
            }, setTheme: function (e) {
                var a = e.data("index");
                e.siblings(".layui-this").data("index");
                e.hasClass(m) || (e.addClass(m).siblings(".layui-this").removeClass(m), A.initTheme(a))
            }, rollPage: function (e, t) {
                var i = a("#LAY_app_tabsheader"), n = i.children("li"), l = (i.prop("scrollWidth"), i.outerWidth()),
                    s = parseFloat(i.css("left"));
                if ("left" === e) {
                    if (!s && s <= 0) return;
                    var r = -s - l;
                    n.each(function (e, t) {
                        var n = a(t), l = n.position().left;
                        if (l >= r) return i.css("left", -l), !1
                    })
                } else "auto" === e ? !function () {
                    var e, r = n.eq(t);
                    if (r[0]) {
                        if (e = r.position().left, e < -s) return i.css("left", -e);
                        if (e + r.outerWidth() >= l - s) {
                            var o = e + r.outerWidth() - (l - s);
                            n.each(function (e, t) {
                                var n = a(t), l = n.position().left;
                                if (l + s > 0 && l - s > o) return i.css("left", -l), !1
                            })
                        }
                    }
                }() : n.each(function (e, t) {
                    var n = a(t), r = n.position().left;
                    if (r + n.outerWidth() >= l - s) return i.css("left", -r), !1
                })
            }, leftPage: function () {
                z.rollPage("left")
            }, rightPage: function () {
                z.rollPage()
            }, closeThisTabs: function () {
                var e = parent === self ? A : parent.layui.admin;
                e.closeThisTabs()
            }, closeOtherTabs: function (e) {
                var t = "LAY-system-pagetabs-remove";
                "all" === e ? (a(T + ":gt(0)").remove(), a(p).find("." + x + ":gt(0)").remove(), a(T).eq(0).trigger("click")) : (a(T).each(function (e, i) {
                    e && e != A.tabsPage.index && (a(i).addClass(t), A.tabsBody(e).addClass(t))
                }), a("." + t).remove())
            }, closeAllTabs: function () {
                z.closeOtherTabs("all")
            }, shade: function () {
                A.sideFlexible()
            }, im: function () {
                A.popup({
                    id: "LAY-popup-layim-demo",
                    shade: 0,
                    area: ["800px", "300px"],
                    title: "\u9762\u677f\u5916\u7684\u64cd\u4f5c\u793a\u4f8b",
                    offset: "lb",
                    success: function () {
                        layui.view(this.id).render("layim/demo").then(function () {
                            layui.use("im")
                        })
                    }
                })
            }
        };
    !function () {
        var e = layui.data(s.tableName);
        e.theme ? A.theme(e.theme) : s.theme && A.initTheme(s.theme.initColorIndex), "pageTabs" in layui.setter || (layui.setter.pageTabs = !0), s.pageTabs || (a("#LAY_app_tabs").addClass(f), c.addClass("layadmin-tabspage-none")), o.ie && o.ie < 10 && r.error("IE" + o.ie + "\u4e0b\u8bbf\u95ee\u53ef\u80fd\u4e0d\u4f73\uff0c\u63a8\u8350\u4f7f\u7528\uff1aChrome / Firefox / Edge \u7b49\u9ad8\u7ea7\u6d4f\u89c8\u5668", {
            offset: "auto",
            id: "LAY_errorIE"
        })
    }(), i.on("tab(" + b + ")", function (e) {
        A.tabsPage.index = e.index
    }), A.on("tabsPage(setMenustatus)", function (e) {
        var t = e.url, i = function (e) {
            return {list: e.children(".layui-nav-child"), a: e.children("*[lay-href]")}
        }, n = a("#" + F), l = "layui-nav-itemed", s = function (e) {
            e.each(function (e, n) {
                var s = a(n), r = i(s), o = r.list.children("dd"), u = t === r.a.attr("lay-href");
                if (o.each(function (e, n) {
                    var s = a(n), r = i(s), o = r.list.children("dd"), u = t === r.a.attr("lay-href");
                    if (o.each(function (e, n) {
                        var s = a(n), r = i(s), o = t === r.a.attr("lay-href");
                        if (o) {
                            var u = r.list[0] ? l : m;
                            return s.addClass(u).siblings().removeClass(u), !1
                        }
                    }), u) {
                        var d = r.list[0] ? l : m;
                        return s.addClass(d).siblings().removeClass(d), !1
                    }
                }), u) {
                    var d = r.list[0] ? l : m;
                    return s.addClass(d).siblings().removeClass(d), !1
                }
            })
        };
        n.find("." + m).removeClass(m), A.screen() < 2 && A.sideFlexible(), s(n.children("li"))
    }), i.on("nav(layadmin-system-side-menu)", function (e) {
        e.siblings(".layui-nav-child")[0] && c.hasClass(P) && (A.sideFlexible("spread"), layer.close(e.data("index"))), A.tabsPage.type = "nav"
    }), i.on("nav(layadmin-pagetabs-nav)", function (e) {
        var a = e.parent();
        a.removeClass(m), a.parent().removeClass(y)
    });
    var _ = function (e) {
        var a = (e.attr("lay-id"), e.attr("lay-attr")), t = e.index();
        A.tabsBodyChange(t, {url: a})
    }, T = "#LAY_app_tabsheader>li";
    d.on("click", T, function () {
        var e = a(this), t = e.index();
        A.tabsPage.type = "tab", A.tabsPage.index = t, _(e)
    }), i.on("tabDelete(" + b + ")", function (e) {
        var t = a(T + ".layui-this");
        e.index && A.tabsBody(e.index).remove(), _(t), A.delResize()
    }), d.on("click", "*[lay-href]", function () {
        var e = a(this), t = e.attr("lay-href"), i = e.attr("lay-text");
        layui.router();
        A.tabsPage.elem = e;
        var n = parent === self ? layui : top.layui;
        n.index.openTabsPage(t, i || e.text()), t === A.tabsBody(A.tabsPage.index).find("iframe").attr("src") && A.events.refresh()
    }), d.on("click", "*[layadmin-event]", function () {
        var e = a(this), t = e.attr("layadmin-event");
        z[t] && z[t].call(this, e)
    }), d.on("mouseenter", "*[lay-tips]", function () {
        var e = a(this);
        if (!e.parent().hasClass("layui-nav-item") || c.hasClass(P)) {
            var t = e.attr("lay-tips"), i = e.attr("lay-offset"), n = e.attr("lay-direction"), l = layer.tips(t, this, {
                tips: n || 1, time: -1, success: function (e, a) {
                    i && e.css("margin-left", i + "px")
                }
            });
            e.data("index", l)
        }
    }).on("mouseleave", "*[lay-tips]", function () {
        layer.close(a(this).data("index"))
    });
    var L = layui.data.resizeSystem = function () {
        layer.closeAll("tips"), L.lock || setTimeout(function () {
            A.sideFlexible(A.screen() < 2 ? "" : "spread"), delete L.lock
        }, 100), L.lock = !0
    };
    u.on("resize", layui.data.resizeSystem), !function () {
        var e = s.request;
        if (e.tokenName) {
            var a = {};
            a[e.tokenName] = layui.data(s.tableName)[e.tokenName] || "", n.set({
                headers: a,
                where: a
            }), l.set({headers: a, data: a})
        }
    }(), e("administrator", A)
});