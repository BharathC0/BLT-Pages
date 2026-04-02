/**
 * BLT Mega Menu — Drop-in Script
 *
 * Injects the OWASP BLT navigation bar into any site with a single tag:
 *
 *   <script src="https://owasp-blt.github.io/BLT-Pages/js/blt-mega-menu.js"></script>
 *
 * No dependencies. No build step. Works on every OWASP-BLT repo page.
 *
 * License: AGPLv3
 */
(function () {
  "use strict";

  var BLT_BASE       = "https://blt.owasp.org";
  var BLT_LOGO       = "https://github.com/OWASP-BLT/BLT/raw/main/website/static/img/logos/logo.png";
  var MENU_BAR_ID    = "blt-mega-menu-bar";

 
  if (document.getElementById(MENU_BAR_ID)) return;
  var SECTIONS = [
    {
      label: "Platform",
      icon: "\uD83D\uDEE1\uFE0F",
      items: [
        { label: "Report a Bug",        url: BLT_BASE + "/report/",        icon: "\uD83D\uDC1B" },
        { label: "Bug Bounties",         url: BLT_BASE + "/hunts/",         icon: "\uD83D\uDCB0" },
        { label: "Leaderboard",          url: BLT_BASE + "/leaderboard/",   icon: "\uD83C\uDFC6" },
        { label: "Security Adventures",  url: BLT_BASE + "/adventures/",    icon: "\uD83D\uDDFA\uFE0F" },
        { label: "Education",            url: BLT_BASE + "/education/",     icon: "\uD83D\uDCDA" },
      ],
    },
    {
      label: "Repositories",
      icon: "\uD83D\uDCC2",
      items: [
        { label: "BLT",         url: "https://github.com/OWASP-BLT/BLT",         icon: "\uD83D\uDC1B" },
        { label: "BLT-API",     url: "https://github.com/OWASP-BLT/BLT-API",     icon: "\uD83D\uDCE1" },
        { label: "BLT-Pages",   url: "https://github.com/OWASP-BLT/BLT-Pages",   icon: "\uD83D\uDCC4" },
        { label: "BLT-Pool",    url: "https://github.com/OWASP-BLT/BLT-Pool",    icon: "\uD83E\uDDE9" },
        { label: "BLT-MCP",     url: "https://github.com/OWASP-BLT/BLT-MCP",     icon: "\uD83E\uDD16" },
        { label: "BLT-Action",  url: "https://github.com/OWASP-BLT/BLT-Action",  icon: "\u26A1" },
        { label: "BLT-Flutter", url: "https://github.com/OWASP-BLT/BLT-Flutter", icon: "\uD83D\uDCF1" },
        { label: "BLT-Extension", url: "https://github.com/OWASP-BLT/BLT-Extension", icon: "\uD83E\uDDE9" },
      ],
    },
    {
      label: "Community",
      icon: "\uD83D\uDC65",
      items: [
        { label: "Contributors",   url: BLT_BASE + "/contributors/",  icon: "\uD83E\uDD1D" },
        { label: "Organizations",  url: BLT_BASE + "/organizations/", icon: "\uD83C\uDFE2" },
        { label: "Social Feed",    url: BLT_BASE + "/social/",        icon: "\uD83D\uDCE3" },
        { label: "OWASP Slack",    url: "https://owasp.org/slack/invite", icon: "\uD83D\uDCAC" },
      ],
    },
    {
      label: "Rewards",
      icon: "\uD83E\uDD53",
      items: [
        { label: "Bacon Points",  url: BLT_BASE + "/bacon/",       icon: "\uD83E\uDE99" },
        { label: "Start a Hunt",  url: BLT_BASE + "/start-hunt/",  icon: "\uD83C\uDFAF" },
        { label: "Prizes",        url: BLT_BASE + "/prizes/",      icon: "\uD83C\uDF81" },
        { label: "Sponsors",      url: BLT_BASE + "/sponsors/",    icon: "\u2764\uFE0F" },
      ],
    },
  ];
  var CSS = [
    "#" + MENU_BAR_ID + "{all:initial;display:block;width:100%;background:#fff;border-bottom:2px solid #ef4444;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;position:relative;z-index:2147483647;box-sizing:border-box;}",
    "#blt-mn-inner{display:flex;align-items:center;padding:0 16px;height:52px;gap:4px;max-width:100%;}",
    "#blt-mn-logo{display:flex;align-items:center;gap:8px;text-decoration:none!important;margin-right:12px;flex-shrink:0;}",
    "#blt-mn-logo img{height:28px;width:auto;}",
    "#blt-mn-logo span{font-size:13px;font-weight:700;color:#ef4444;white-space:nowrap;}",
    ".blt-mn-item{position:relative;}",
    ".blt-mn-btn{display:flex;align-items:center;gap:4px;padding:6px 10px;background:none;border:none;cursor:pointer;font-size:13px;font-weight:600;color:#374151;border-radius:6px;white-space:nowrap;transition:background .15s,color .15s;}",
    ".blt-mn-btn:hover,.blt-mn-btn.open{background:#fef2f2;color:#ef4444;}",
    ".blt-mn-caret{font-size:9px;transition:transform .2s;display:inline-block;}",
    ".blt-mn-btn.open .blt-mn-caret{transform:rotate(180deg);}",
    ".blt-mn-drop{display:none;position:absolute;top:calc(100% + 6px);left:0;background:#fff;border:1px solid #e5e7eb;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,.12);min-width:210px;padding:8px;z-index:2147483647;animation:blt-fadein .15s ease;}",
    ".blt-mn-drop.open{display:block;}",
    "@keyframes blt-fadein{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}",
    ".blt-mn-drop a{display:flex!important;align-items:center;gap:10px;padding:9px 12px;border-radius:7px;text-decoration:none!important;color:#374151!important;font-size:13px;font-weight:500;transition:background .12s;}",
    ".blt-mn-drop a:hover{background:#fef2f2;color:#ef4444!important;}",
    ".blt-mn-ico{font-size:15px;width:20px;text-align:center;flex-shrink:0;}",
    "#blt-mn-cta{margin-left:auto;display:flex;align-items:center;gap:8px;flex-shrink:0;}",
    "#blt-mn-cta a{padding:6px 14px;border-radius:6px;font-size:13px;font-weight:700;text-decoration:none!important;white-space:nowrap;}",
    "#blt-mn-cta .blt-sec{background:#f3f4f6;color:#374151!important;}",
    "#blt-mn-cta .blt-sec:hover{background:#e5e7eb;}",
    "#blt-mn-cta .blt-pri{background:#ef4444;color:#fff!important;}",
    "#blt-mn-cta .blt-pri:hover{background:#dc2626;}",
    "#blt-mn-ham{display:none;background:none;border:none;cursor:pointer;padding:6px;margin-left:auto;font-size:20px;color:#374151;}",
    "#blt-mn-mob{display:none;flex-direction:column;background:#fff;border-top:1px solid #e5e7eb;padding:8px 16px 16px;}",
    "#blt-mn-mob.open{display:flex;}",
    ".blt-mob-hd{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;padding:12px 0 4px;}",
    ".blt-mob-lnk{display:flex!important;align-items:center;gap:10px;padding:9px 4px;text-decoration:none!important;color:#374151!important;font-size:14px;border-bottom:1px solid #f3f4f6;}",
    ".blt-mob-lnk:hover{color:#ef4444!important;}",
    "@media(max-width:768px){.blt-mn-item{display:none!important}#blt-mn-cta{display:none!important}#blt-mn-ham{display:block!important}}",
  ].join("");

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function buildDesktop() {
    return SECTIONS.map(function (sec) {
      var links = sec.items.map(function (it) {
        return '<a href="' + esc(it.url) + '" target="_blank" rel="noopener noreferrer">'
          + '<span class="blt-mn-ico">' + it.icon + "</span>"
          + "<span>" + esc(it.label) + "</span></a>";
      }).join("");
      return '<div class="blt-mn-item">'
        + '<button class="blt-mn-btn" type="button">'
        + sec.icon + " " + esc(sec.label)
        + ' <span class="blt-mn-caret">&#9660;</span></button>'
        + '<div class="blt-mn-drop">' + links + "</div></div>";
    }).join("");
  }

  function buildMobile() {
    return SECTIONS.map(function (sec) {
      var links = sec.items.map(function (it) {
        return '<a class="blt-mob-lnk" href="' + esc(it.url) + '" target="_blank" rel="noopener noreferrer">'
          + it.icon + " " + esc(it.label) + "</a>";
      }).join("");
      return '<div class="blt-mob-hd">' + sec.icon + " " + esc(sec.label) + "</div>" + links;
    }).join("");
  }

  function buildBar() {
    return '<div id="' + MENU_BAR_ID + '">'
      + '<div id="blt-mn-inner">'
        + '<a id="blt-mn-logo" href="' + BLT_BASE + '" target="_blank" rel="noopener noreferrer">'
          + '<img src="' + esc(BLT_LOGO) + '" alt="OWASP BLT" />'
          + "<span>OWASP BLT</span></a>"
        + buildDesktop()
        + '<div id="blt-mn-cta">'
          + '<a class="blt-sec" href="' + BLT_BASE + '/report/" target="_blank" rel="noopener noreferrer">\uD83D\uDC1B Report Bug</a>'
          + '<a class="blt-pri" href="' + BLT_BASE + '/accounts/signup/" target="_blank" rel="noopener noreferrer">Join BLT</a>'
        + "</div>"
        + '<button id="blt-mn-ham" type="button" aria-label="Toggle BLT menu">&#9776;</button>'
      + "</div>"
      + '<div id="blt-mn-mob">' + buildMobile() + "</div>"
    + "</div>";
  }

  /* ------------------------------------------------------------------
   * Init
   * ------------------------------------------------------------------ */
  function init() {
    // Inject styles
    var style = document.createElement("style");
    style.id = "blt-mega-menu-styles";
    style.textContent = CSS;
    document.head.appendChild(style);

    // Inject bar
    var tmp = document.createElement("div");
    tmp.innerHTML = buildBar();
    var bar = tmp.firstChild;
    document.body.insertBefore(bar, document.body.firstChild);

    // Desktop dropdowns
    var items = bar.querySelectorAll(".blt-mn-item");
    items.forEach(function (item) {
      var btn  = item.querySelector(".blt-mn-btn");
      var drop = item.querySelector(".blt-mn-drop");
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var opening = !drop.classList.contains("open");
        // close all
        items.forEach(function (i) {
          i.querySelector(".blt-mn-btn").classList.remove("open");
          i.querySelector(".blt-mn-drop").classList.remove("open");
        });
        if (opening) {
          btn.classList.add("open");
          drop.classList.add("open");
        }
      });
    });

    document.addEventListener("click", function () {
      items.forEach(function (i) {
        i.querySelector(".blt-mn-btn").classList.remove("open");
        i.querySelector(".blt-mn-drop").classList.remove("open");
      });
    });

    var ham = bar.querySelector("#blt-mn-ham");
    var mob = bar.querySelector("#blt-mn-mob");
    ham.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = mob.classList.toggle("open");
      ham.innerHTML = isOpen ? "&#10005;" : "&#9776;";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
