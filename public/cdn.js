(function (a, b, f, g) {
    var c = /(; |#|&|^)dcdn=(\d)/.exec(location.hash + "; " + a.cookie);
    if (!c || !c[2] || +c[2]) {
        var d = a.createElement("script"),
            e = function () {
                d.src = g;
                var b = a.getElementsByTagName("script"),
                    c = b[0];
                c.parentNode.insertBefore(d, 1 < b.length ? c.nextSibling : c)
            };
        f() ? (a.write('<plaintext style="display:none">'), setTimeout(function () {
            b.dCDN || (b.dCDN = {});
            b.dCDN.cap = true;
            d.onerror = function () {
                a.cookie = "dcdn=0; expires=" + (new Date(Date.now() + 18E5)).toGMTString() + "; path=/";
                b.location = b.location.href;
            };
            e();
        }, 0)) : e();
    }
})(document, window, function () {
    var a = /webkit|msie\s10|(firefox)[\/\s](\d+)|(opera)[\s\S]*version[\/\s](\d+)|3ds/i.exec(navigator.userAgent);
    return !a || a[1] && 4 > +a[2] || a[3] && 11 > +a[4] ? !1 : !0;
}, "lib.js");