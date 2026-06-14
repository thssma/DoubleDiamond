(function(window){
  "use strict";

  const ROUTE_ALIASES = {
    home: "dashboard",
    clientPortal: "clientHome",
    field: "mobileWorkforce",
    billingDashboard: "profitabilityEngine",
    saasDashboard: "dashboard",
    marketplaceDashboard: "integrationHub"
  };

  const ROLE_PAGE_ACCESS = {
    client: ["clientHome", "reportCenter"],
    employee: [
      "dashboard",
      "workOrders",
      "routePlanning",
      "fieldDashboard",
      "mobileWorkforce",
      "weatherCenter",
      "mobileReady",
      "pwaCenter",
      "clientHome",
      "reportCenter"
    ],
    owner: null
  };

  const ROLE_DEFAULT_PAGE = {
    client: "clientHome",
    employee: "mobileWorkforce",
    owner: "dashboard"
  };

  const ROLE_NAV_LABELS = {
    client: ["Client Portal", "Reports"],
    employee: [
      "Home",
      "Work Orders",
      "Routes",
      "Field",
      "Workforce",
      "Weather",
      "Mobile Ready",
      "PWA",
      "Reports"
    ],
    owner: null
  };

  const ROLE_BLOCKED_KEYWORDS = {
    client: [
      "work orders",
      "routes",
      "field",
      "workforce",
      "weather",
      "mobile ready",
      "pwa",
      "finance",
      "intelligence",
      "administration",
      "command center",
      "owner"
    ],
    employee: ["finance", "intelligence", "administration", "owner"],
    owner: []
  };

  const ROUTE_RENDERERS = {
    dashboard: "renderDashboard",
    clients: "renderClients",
    integrationHub: "renderIntegrationHub",
    aiFoundation: "renderAIFoundation",
    realIntegrations: "renderRealIntegrations",
    copilot: "renderCopilot",
    credentialManager: "renderCredentialManager",
    executiveDashboard: "renderExecutiveDashboard",
    kpiCenter: "renderKpiCenter",
    automationCenter: "renderAutomationCenter",
    reportCenter: "renderReportCenter",
    mobileReady: "renderMobileReady",
    fieldDashboard: "renderFieldDashboard",
    pwaCenter: "renderPwaCenter",
    routePlanning: "renderRoutePlanning",
    weatherCenter: "renderWeatherCenter",
    mobileWorkforce: "renderMobileWorkforce",
    workOrders: "renderWorkOrders",
    biDashboard: "renderBIDashboard",
    analyticsCenter: "renderAnalyticsCenter",
    forecastEngine: "renderForecastEngine",
    profitabilityEngine: "renderProfitabilityEngine",
    executiveIntelligence: "renderExecutiveIntelligence",
    mapsReal: "renderMapsReal",
    whatsappReal: "renderWhatsAppReal",
    gmailReal: "renderGmailReal",
    pushReal: "renderPushReal",
    automationFlowsReal: "renderAutomationFlowsReal",
    architectureHardening: "renderArchitectureHardening",
    aiReadiness: "renderAIReadiness",
    aiLeadScoring: "renderAILeadScoring",
    aiQuoteGenerator: "renderAIQuoteGenerator",
    aiProjectRisk: "renderAIProjectRisk",
    aiFinancialAdvisor: "renderAIFinancialAdvisor",
    aiWorkforcePlanner: "renderAIWorkforcePlanner",
    aiRouteOptimization: "renderAIRouteOptimization",
    aiWeatherImpact: "renderAIWeatherImpact",
    aiExecutiveReports: "renderAIExecutiveReports",
    aiAutomationRecommendations: "renderAIAutomationRecommendations",
    aiOperationsCommand: "renderAICommandCenter",
    roleExperience: "renderRoleExperience",
    ownerHome: "renderOwnerHome",
    employeeHome: "renderEmployeeHome",
    clientHome: "renderClientHome",
    configuracoes: "renderConfiguracoes"
  };

  function normalizeRoute(page){
    return ROUTE_ALIASES[page] || page;
  }

  function normalizeRole(role){
    return ["client", "employee", "owner"].includes(role) ? role : "client";
  }

  function defaultPageForRole(role){
    return ROLE_DEFAULT_PAGE[normalizeRole(role)] || ROLE_DEFAULT_PAGE.client;
  }

  function isPageAllowed(role, page){
    const normalizedRole = normalizeRole(role);
    const normalizedPage = normalizeRoute(page);
    const allowed = ROLE_PAGE_ACCESS[normalizedRole];
    return allowed === null || allowed.includes(normalizedPage);
  }

  function normalizeText(text){
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function isNavLabelAllowed(role, text){
    const normalizedRole = normalizeRole(role);
    const allowed = ROLE_NAV_LABELS[normalizedRole];
    if(allowed === null) return true;

    const normalizedText = normalizeText(text).toLowerCase();
    return allowed.some(label => normalizedText.includes(label.toLowerCase()));
  }

  function getRouteRenderer(page, scope){
    const normalizedPage = normalizeRoute(page);
    const rendererName = ROUTE_RENDERERS[normalizedPage] || ROUTE_RENDERERS.dashboard;
    const rendererScope = scope || window;
    return typeof rendererScope[rendererName] === "function" ? rendererScope[rendererName] : null;
  }

  window.DDCore = {
    ROUTE_ALIASES,
    ROUTE_RENDERERS,
    ROLE_PAGE_ACCESS,
    ROLE_DEFAULT_PAGE,
    ROLE_NAV_LABELS,
    ROLE_BLOCKED_KEYWORDS,
    normalizeRoute,
    normalizeRole,
    defaultPageForRole,
    isPageAllowed,
    normalizeText,
    isNavLabelAllowed,
    getRouteRenderer
  };
})(window);
