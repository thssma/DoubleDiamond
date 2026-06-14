const fs = require("fs");
const vm = require("vm");

const source = fs.readFileSync("js/ui/dd-product-ux.js", "utf8");
const sandbox = {
  window: {},
  document: {
    addEventListener(){},
    querySelector(){ return null; },
    querySelectorAll(){ return []; },
    getElementById(){ return null; },
    body: { dataset: {} }
  },
  localStorage: { getItem(){ return null; } },
  getComputedStyle(){ return { display: "" }; },
  setTimeout(){},
  console
};

vm.createContext(sandbox);
vm.runInContext(source, sandbox, { filename: "js/ui/dd-product-ux.js" });

const routes = sandbox.window.DDProductUX && sandbox.window.DDProductUX.MVP_ROUTES;
if(!routes) throw new Error("DDProductUX.MVP_ROUTES was not exported.");

const expected = {
  client: ["clientHome", "reportCenter"],
  employee: ["dashboard", "workOrders", "routePlanning", "fieldDashboard", "mobileWorkforce", "weatherCenter", "mobileReady", "pwaCenter", "reportCenter"],
  owner: ["dashboard", "clients", "workOrders", "routePlanning", "fieldDashboard", "mobileWorkforce", "weatherCenter", "reportCenter", "profitabilityEngine", "biDashboard", "executiveDashboard", "integrationHub", "configuracoes"]
};

const blocked = [
  "aiFoundation",
  "aiOperationsCommand",
  "aiLeadScoring",
  "aiQuoteGenerator",
  "aiProjectRisk",
  "aiFinancialAdvisor",
  "aiWorkforcePlanner",
  "aiRouteOptimization",
  "aiWeatherImpact",
  "aiExecutiveReports",
  "aiAutomationRecommendations",
  "automationCenter",
  "automationFlowsReal",
  "roleExperience",
  "ownerHome",
  "employeeHome"
];

for(const [role, roleRoutes] of Object.entries(expected)){
  const actual = routes[role] || [];
  const missing = roleRoutes.filter(route => !actual.includes(route));
  const extra = actual.filter(route => !roleRoutes.includes(route));
  if(missing.length || extra.length){
    throw new Error(`${role} scope mismatch. Missing: ${missing.join(", ") || "none"}. Extra: ${extra.join(", ") || "none"}.`);
  }
}

for(const route of blocked){
  const exposed = Object.entries(routes).filter(([, roleRoutes]) => roleRoutes.includes(route)).map(([role]) => role);
  if(exposed.length){
    throw new Error(`Prototype route ${route} exposed for: ${exposed.join(", ")}`);
  }
}

console.log("MVP scope validation passed.");
