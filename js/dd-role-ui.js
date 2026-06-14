(function(window){
  "use strict";

  const FALLBACK_ALLOWED = {
    client: ["Client Portal", "Reports"],
    employee: ["Home", "Work Orders", "Routes", "Field", "Workforce", "Weather", "Mobile Ready", "PWA", "Reports"],
    owner: null
  };

  const FALLBACK_BLOCKED = {
    client: ["finance", "administration", "intelligence", "workforce", "routes", "field", "work orders", "command center", "owner command", "employee view"],
    employee: ["finance", "administration", "intelligence"],
    owner: []
  };

  function getRole(defaultRole){
    if(window.DDAuth && typeof window.DDAuth.getRole === "function"){
      return window.DDAuth.getRole(defaultRole || "client");
    }
    try{
      const session = JSON.parse(localStorage.getItem("dd_auth_session_v1") || "{}");
      return localStorage.getItem("dd_role") || session.role || defaultRole || "client";
    }catch(e){
      return localStorage.getItem("dd_role") || defaultRole || "client";
    }
  }

  function normalizeText(text){
    if(window.DDCore && typeof window.DDCore.normalizeText === "function"){
      return window.DDCore.normalizeText(text);
    }
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function defaultPage(role){
    if(window.DDCore && typeof window.DDCore.defaultPageForRole === "function"){
      return window.DDCore.defaultPageForRole(role);
    }
    return role === "owner" ? "dashboard" : role === "employee" ? "mobileWorkforce" : "clientHome";
  }

  function isPageAllowed(role, page){
    if(window.DDCore && typeof window.DDCore.isPageAllowed === "function"){
      return window.DDCore.isPageAllowed(role, page);
    }
    const normalizedPage = typeof window.normalizeRoute === "function" ? window.normalizeRoute(page) : page;
    return role === "owner" || normalizedPage === "clientHome" || normalizedPage === "reportCenter";
  }

  function isNavLabelAllowed(role, text){
    if(window.DDCore && typeof window.DDCore.isNavLabelAllowed === "function"){
      return window.DDCore.isNavLabelAllowed(role, text);
    }
    if(role === "owner") return true;
    const allowed = FALLBACK_ALLOWED[role] || FALLBACK_ALLOWED.client;
    const normalized = normalizeText(text).toLowerCase();
    return allowed.some(label => normalized.includes(label.toLowerCase()));
  }

  function setBodyRole(role){
    document.body.setAttribute("data-dd-role", role);
  }

  function ensureSessionControls(role, options){
    const settings = options || {};
    const top = document.querySelector(".top-actions");
    if(!top) return;
    if(!top.querySelector(".dd-session-pill")){
      top.insertAdjacentHTML("beforeend", `<button class="dd-back-btn" onclick="${settings.backHandler || "ddGoBack"}()">Back</button><span class="dd-session-pill">${role.toUpperCase()}</span><button class="dd-logout-btn" onclick="${settings.logoutHandler || "ddLogout"}()">Logout</button>`);
    }
    const pill = top.querySelector(".dd-session-pill");
    if(pill) pill.textContent = role.toUpperCase();
  }

  function applyMenuAccess(role, options){
    const settings = options || {};
    setBodyRole(role);
    if(settings.sessionControls) ensureSessionControls(role, settings);

    document.querySelectorAll(".menu-btn").forEach(btn => {
      const onclick = btn.getAttribute("onclick") || "";
      const match = onclick.match(/changePage\('([^']+)'/);
      if(!match) return;
      const allowed = isPageAllowed(role, match[1]);
      if(allowed){
        btn.style.display = "";
        delete btn.dataset.ddBlocked;
        btn.removeAttribute("data-role-hidden");
      }else{
        btn.style.display = "none";
        btn.setAttribute("data-role-hidden", "true");
      }
    });

    document.querySelectorAll(".nav-group").forEach(group => {
      const visible = [...group.querySelectorAll(".menu-btn")].some(button => button.style.display !== "none");
      group.style.display = visible ? "" : "none";
    });
  }

  function hideDisallowedNavigation(role){
    setBodyRole(role);
    document.querySelectorAll("a, button, .nav-item, [onclick]").forEach(el => {
      const text = normalizeText(el.textContent);
      if(!text) return;
      const looksNav = /Home|Work Orders|Routes|Field|Workforce|Weather|Mobile|PWA|CRM|Client Portal|Reports|Finance|Intelligence|Administration|AI|BI/.test(text);
      if(!looksNav) return;
      if(!isNavLabelAllowed(role, text)){
        el.style.display = "none";
        el.setAttribute("data-role-hidden", "true");
      }else if(el.getAttribute("data-role-hidden") === "true"){
        el.style.display = "";
        el.removeAttribute("data-role-hidden");
      }
    });

    document.querySelectorAll(".nav-section-title,.group-title,.section-title").forEach(el => {
      const parent = el.parentElement;
      if(!parent) return;
      const visible = [...parent.children].some(child => child !== el && getComputedStyle(child).display !== "none");
      if(!visible) el.style.display = "none";
    });
  }

  function hideBlockedKeywords(role, keywords){
    const blockedWords = keywords || (window.DDCore && window.DDCore.ROLE_BLOCKED_KEYWORDS && window.DDCore.ROLE_BLOCKED_KEYWORDS[role]) || FALLBACK_BLOCKED[role] || [];
    if(!blockedWords.length) return;
    setBodyRole(role);
    document.querySelectorAll("a,button,.nav-item,[onclick]").forEach(el => {
      const text = (el.textContent || "").toLowerCase();
      if(blockedWords.some(word => text.includes(word))){
        el.style.display = "none";
        el.setAttribute("data-role-hidden", "true");
      }
    });
  }

  function ensureRoleBadge(role){
    const value = String(role || getRole()).toUpperCase();
    const existing = document.querySelector("[data-role-final-badge]");
    if(existing){
      existing.textContent = value;
      return existing;
    }

    const badge = document.createElement("span");
    badge.setAttribute("data-role-final-badge", "true");
    badge.textContent = value;
    badge.style.cssText = "display:inline-flex;align-items:center;padding:10px 16px;border-radius:999px;background:#dcfce7;color:#14532d;font-weight:900;margin-left:8px;";
    const top = document.querySelector(".topbar,.header-actions,header") || document.body;
    top.prepend(badge);
    return badge;
  }

  function removeDuplicateRoleBadges(){
    const badges = [...document.querySelectorAll("[data-role-final-badge], .role-pill, .top-pill, span, button")]
      .filter(el => ["CLIENT", "OWNER", "EMPLOYEE"].includes((el.textContent || "").trim().toUpperCase()));
    const seen = {};
    badges.forEach(el => {
      const key = (el.textContent || "").trim().toUpperCase();
      if(seen[key]){
        el.style.display = "none";
        el.setAttribute("data-dd-duplicate-role", "true");
      }else{
        seen[key] = true;
        el.style.display = "";
      }
    });
  }

  function protectCurrentPage(role){
    if(role === "owner") return;
    const title = normalizeText(document.querySelector("h1")?.textContent || document.title || "");
    const currentText = normalizeText(document.body.textContent || "");

    if(role === "client"){
      const allowed = currentText.includes("Client Portal") || currentText.includes("Report Center") || title.includes("Report") || title.includes("Client");
      if(!allowed && typeof window.changePage === "function") window.changePage("clientHome");
    }

    if(role === "employee"){
      const blocked = title.includes("Finance") || title.includes("Administration") || title.includes("Intelligence") || currentText.includes("Executive") || currentText.includes("Command Center");
      if(blocked && typeof window.changePage === "function") window.changePage("mobileWorkforce");
    }
  }

  function applyRoleAccess(role){
    const activeRole = role || getRole("client");
    hideDisallowedNavigation(activeRole);
    ensureRoleBadge(activeRole);
    protectCurrentPage(activeRole);
  }

  window.DDRoleUI = {
    getRole,
    normalizeText,
    defaultPage,
    isPageAllowed,
    isNavLabelAllowed,
    setBodyRole,
    ensureSessionControls,
    applyMenuAccess,
    hideDisallowedNavigation,
    hideBlockedKeywords,
    ensureRoleBadge,
    removeDuplicateRoleBadges,
    protectCurrentPage,
    applyRoleAccess
  };
})(window);
