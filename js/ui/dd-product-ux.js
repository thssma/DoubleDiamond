(function(window, document){
  "use strict";

  const MVP_ROUTES = {
    client: ["clientHome", "reportCenter"],
    employee: ["dashboard", "workOrders", "routePlanning", "fieldDashboard", "mobileWorkforce", "weatherCenter", "mobileReady", "pwaCenter", "reportCenter"],
    owner: ["dashboard", "clients", "workOrders", "routePlanning", "fieldDashboard", "mobileWorkforce", "weatherCenter", "reportCenter", "profitabilityEngine", "biDashboard", "executiveDashboard", "integrationHub", "configuracoes"]
  };

  const ROUTE_LABELS = {
    dashboard: "Home",
    clients: "Clients",
    workOrders: "Work Orders",
    routePlanning: "Routes",
    fieldDashboard: "Field",
    mobileWorkforce: "Workforce",
    weatherCenter: "Weather",
    mobileReady: "Mobile",
    pwaCenter: "PWA",
    clientHome: "Client Portal",
    reportCenter: "Reports",
    profitabilityEngine: "Profitability",
    biDashboard: "BI Dashboard",
    executiveDashboard: "Executive",
    integrationHub: "Integrations",
    configuracoes: "Settings"
  };

  const GROUP_LABELS = {
    "Operations": "Operations",
    "Clients": "Clients",
    "Finance": "Finance",
    "Intelligence": "Prototype Lab",
    "Administration": "Administration"
  };

  const ROLE_CONTEXT = {
    client: {
      title: "Client workspace",
      detail: "Project status, reports, photos, approvals, and documents."
    },
    employee: {
      title: "Field workspace",
      detail: "Daily work, routes, field updates, weather, and mobile execution."
    },
    owner: {
      title: "Owner workspace",
      detail: "Operations, clients, field performance, reporting, and business controls."
    }
  };

  function getRole(){
    if(window.DDRoleUI && typeof window.DDRoleUI.getRole === "function") return window.DDRoleUI.getRole("client");
    if(window.DDAuth && typeof window.DDAuth.getRole === "function") return window.DDAuth.getRole("client");
    if(window.DDStorage) return window.DDStorage.get("dd_role", "client");
    return localStorage.getItem("dd_role") || "client";
  }

  function getRouteFromElement(element){
    const onclick = element.getAttribute && (element.getAttribute("onclick") || "");
    const match = onclick.match(/changePage\('([^']+)'/);
    if(!match) return "";
    if(window.DDCore && typeof window.DDCore.normalizeRoute === "function") return window.DDCore.normalizeRoute(match[1]);
    return match[1];
  }

  function setButtonLabel(button, route){
    const label = ROUTE_LABELS[route];
    const span = button.querySelector("span");
    if(label && span) span.textContent = label;
  }

  function labelGroups(){
    document.querySelectorAll(".nav-group-head span:first-child").forEach(function(label){
      const text = (label.textContent || "").replace(/[^\w\s]/g, "").trim();
      Object.keys(GROUP_LABELS).forEach(function(key){
        if(text.includes(key)) label.textContent = GROUP_LABELS[key];
      });
    });
  }

  function applyNavigation(){
    const role = getRole();
    const allowed = MVP_ROUTES[role] || MVP_ROUTES.client;

    document.querySelectorAll(".menu-btn").forEach(function(button){
      const route = getRouteFromElement(button);
      if(!route) return;
      setButtonLabel(button, route);

      const shouldShow = allowed.includes(route);
      if(shouldShow){
        if(button.dataset.mvpHidden === "true"){
          button.style.display = "";
          delete button.dataset.mvpHidden;
        }
      }else{
        button.style.display = "none";
        button.dataset.mvpHidden = "true";
      }
    });

    document.querySelectorAll(".nav-group").forEach(function(group){
      const visible = Array.from(group.querySelectorAll(".menu-btn")).some(function(button){
        return getComputedStyle(button).display !== "none";
      });
      group.style.display = visible ? "" : "none";
      if(visible) group.classList.add("is-open");
    });

    labelGroups();
    document.body.dataset.ddMvpUx = "true";
  }

  function guardRoute(page){
    const role = getRole();
    const normalized = window.DDCore && typeof window.DDCore.normalizeRoute === "function" ? window.DDCore.normalizeRoute(page) : page;
    const allowed = MVP_ROUTES[role] || MVP_ROUTES.client;
    if(allowed.includes(normalized)) return normalized;
    if(window.DDCore && typeof window.DDCore.defaultPageForRole === "function") return window.DDCore.defaultPageForRole(role);
    return role === "owner" ? "dashboard" : role === "employee" ? "mobileWorkforce" : "clientHome";
  }

  function installRouteGuard(){
    if(window.__ddProductUxRouteGuard || typeof window.changePage !== "function") return;
    const originalChangePage = window.changePage;
    window.changePage = function(page, event){
      return originalChangePage.call(this, guardRoute(page), event);
    };
    window.__ddProductUxRouteGuard = true;
  }

  function applyHeader(){
    const eyebrow = document.querySelector(".topbar .eyebrow");
    const subtitle = document.querySelector(".topbar .subtitle");
    if(eyebrow) eyebrow.textContent = "DoubleDiamond MVP";
    if(subtitle) subtitle.textContent = "Focused landscaping operations by role.";
  }

  function hideOutOfScopeActions(){
    const role = getRole();
    const allowed = MVP_ROUTES[role] || MVP_ROUTES.client;
    document.querySelectorAll("#pageContent [onclick*=\"changePage\"]").forEach(function(element){
      const route = getRouteFromElement(element);
      if(!route) return;
      if(allowed.includes(route)){
        if(element.dataset.mvpActionHidden === "true"){
          element.style.display = "";
          delete element.dataset.mvpActionHidden;
        }
      }else{
        element.style.display = "none";
        element.dataset.mvpActionHidden = "true";
      }
    });
  }

  function improveEmptyStates(){
    document.querySelectorAll("#pageContent .card, #pageContent .report-card, #pageContent .enterprise-card, #pageContent .v651-card").forEach(function(card){
      const text = (card.textContent || "").trim();
      if(!text) return;
      const isEmpty = /Nenhum|Nenhuma|No photos|No reports|Nothing/i.test(text);
      if(isEmpty){
        card.classList.add("dd-empty-state");
        if(!card.querySelector(".dd-empty-state-note")){
          const note = document.createElement("small");
          note.className = "dd-empty-state-note";
          note.textContent = "This area is ready. Add real records to populate it.";
          card.appendChild(note);
        }
      }
    });
  }

  function ensureRoleContext(){
    const content = document.getElementById("pageContent");
    if(!content) return;
    const role = getRole();
    const copy = ROLE_CONTEXT[role] || ROLE_CONTEXT.client;
    let context = content.querySelector(".dd-role-context");
    if(!context){
      context = document.createElement("div");
      context.className = "dd-role-context";
      content.prepend(context);
    }
    context.innerHTML = `<strong>${copy.title}</strong><span>${copy.detail}</span>`;
  }

  function apply(){
    installRouteGuard();
    applyNavigation();
    applyHeader();
    hideOutOfScopeActions();
    improveEmptyStates();
    ensureRoleContext();
  }

  window.DDProductUX = {
    MVP_ROUTES,
    ROUTE_LABELS,
    apply,
    applyNavigation,
    applyHeader,
    hideOutOfScopeActions,
    improveEmptyStates,
    ensureRoleContext,
    guardRoute,
    installRouteGuard
  };

  document.addEventListener("DOMContentLoaded", function(){ setTimeout(apply, 250); });
  if(window.DDPostProcess){
    window.DDPostProcess.onPageChange("productUx", apply, [50, 300, 900]);
    window.DDPostProcess.register("productUx", apply, {everyMs:30000});
  }
})(window, document);
