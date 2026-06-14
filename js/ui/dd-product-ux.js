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

  function getRole(){
    if(window.DDRoleUI && typeof window.DDRoleUI.getRole === "function") return window.DDRoleUI.getRole("client");
    if(window.DDAuth && typeof window.DDAuth.getRole === "function") return window.DDAuth.getRole("client");
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

  function apply(){
    installRouteGuard();
    applyNavigation();
    applyHeader();
  }

  window.DDProductUX = {
    MVP_ROUTES,
    ROUTE_LABELS,
    apply,
    applyNavigation,
    applyHeader,
    guardRoute,
    installRouteGuard
  };

  document.addEventListener("DOMContentLoaded", function(){ setTimeout(apply, 250); });
  if(window.DDPostProcess){
    window.DDPostProcess.onPageChange("productUx", apply, [50, 300]);
    window.DDPostProcess.register("productUx", apply, {everyMs:30000});
  }
})(window, document);
