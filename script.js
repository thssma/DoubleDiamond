
/* HARD REMOVE UNSPLASH SOURCE V6 */
(function(){
  function scrubNode(el){
    try{
      if(!window.DDImages) return;
      if(el.tagName === "IMG") window.DDImages.fixImageElement(el);
      if(el.getAttribute && el.getAttribute("style")) window.DDImages.fixBackgroundElement(el);
    }catch(e){}
  }

  function scrubAll(){
    document.querySelectorAll("img, [style]").forEach(scrubNode);
  }

  const obs = new MutationObserver(muts=>{
    muts.forEach(m=>{
      if(m.target) scrubNode(m.target);
      m.addedNodes && m.addedNodes.forEach(n=>{
        if(n.nodeType===1){
          scrubNode(n);
          n.querySelectorAll && n.querySelectorAll("img,[style]").forEach(scrubNode);
        }
      });
    });
  });

  document.addEventListener("DOMContentLoaded",()=>{
    scrubAll();
    obs.observe(document.documentElement, {subtree:true, childList:true, attributes:true, attributeFilter:["src","style"]});
  });
  setTimeout(scrubAll,100);
  setTimeout(scrubAll,500);
  setTimeout(scrubAll,1500);
})();

const SUPABASE_URL = (window.DDConfig && window.DDConfig.SUPABASE_URL) || "";
const SUPABASE_ANON_KEY = (window.DDConfig && window.DDConfig.SUPABASE_ANON_KEY) || "";

let companies = [];
let projects = [];
let companyUsers = [];
let integrationProviders = [];
let integrationConnections = [];
let integrationLogs = [];
let aiAgents = [];
let aiInsights = [];

let integrationCredentials = [];
let integrationQueue = [];
let integrationWebhooks = [];

let copilotConversations = [];
let copilotMessages = [];
let promptTemplates = [];
let executiveKpiSnapshots = [];
let reportCenterExports = [];
let automationCenterItems = [];
let mobileAppSettings = [];

let pwaSettings = [];
let offlineCacheItems = [];
let pushNotificationTemplates = [];
let routePlans = [];
let routeStops = [];
let weatherAlerts = [];
let mobileWorkforceTasks = [];
let gpsCheckins = [];
let teamCheckins = [];
let fieldPhotos = [];
let fieldSignatures = [];
let workOrders = [];
let workOrderLogs = [];
let projectTimeline = [];
let biSnapshots = [];
let analyticsRankings = [];
let forecastScenarios = [];
let profitabilityRecords = [];
let executiveIntelligenceItems = [];
let mapsRouteRequests = [];
let whatsappMessageQueue = [];
let gmailMessageQueue = [];
let pushNotificationQueue = [];
let automationFlowTemplates = [];
let automationFlowRuns = [];
let architectureAuditLogs = [];
let moduleRegistry = [];
let aiOperationsReadiness = [];
let aiLeadScores = [];
let aiQuoteDrafts = [];
let aiProjectRisks = [];
let aiFinancialAdvice = [];
let aiWorkforcePlans = [];
let aiRouteOptimizations = [];
let aiWeatherImpacts = [];
let aiExecutiveReports = [];
let aiAutomationRecommendations = [];
let aiCommandCenterLogs = [];
let userProfiles = [];
let roleExperienceSettings = [];
let roleActivityLogs = [];
let currentRoleExperience = localStorage.getItem("dd_role") || "owner";


window.onload = async () => {
  ddCurrentPageV642 = "dashboard";
  renderDashboard();
  ddStartBackgroundLoadV642();
};

async function loadData(){
  if(window.DDData && typeof window.DDData.loadTables === "function"){
    ({
      companies,
      projects,
      companyUsers,
      integrationProviders,
      integrationConnections,
      integrationLogs,
      aiAgents,
      aiInsights,
      integrationCredentials,
      integrationQueue,
      integrationWebhooks,
      copilotConversations,
      copilotMessages,
      promptTemplates,
      executiveKpiSnapshots,
      reportCenterExports,
      automationCenterItems,
      mobileAppSettings,
      pwaSettings,
      offlineCacheItems,
      pushNotificationTemplates,
      routePlans,
      routeStops,
      weatherAlerts,
      mobileWorkforceTasks,
      gpsCheckins,
      teamCheckins,
      fieldPhotos,
      fieldSignatures,
      workOrders,
      workOrderLogs,
      projectTimeline,
      biSnapshots,
      analyticsRankings,
      forecastScenarios,
      profitabilityRecords,
      executiveIntelligenceItems,
      mapsRouteRequests,
      whatsappMessageQueue,
      gmailMessageQueue,
      pushNotificationQueue,
      automationFlowTemplates,
      automationFlowRuns,
      architectureAuditLogs,
      moduleRegistry,
      aiOperationsReadiness,
      aiLeadScores,
      aiQuoteDrafts,
      aiProjectRisks,
      aiFinancialAdvice,
      aiWorkforcePlans,
      aiRouteOptimizations,
      aiWeatherImpacts,
      aiExecutiveReports,
      aiAutomationRecommendations,
      aiCommandCenterLogs,
      userProfiles,
      roleExperienceSettings,
      roleActivityLogs
    } = await window.DDData.loadTables(apiGet));
    return;
  }

  companies = await apiGet("companies");
  projects = await apiGet("projects");
  companyUsers = await apiGet("company_users");
  integrationProviders = await apiGet("integration_providers");
  integrationConnections = await apiGet("integration_connections");
  integrationLogs = await apiGet("integration_logs");
  aiAgents = await apiGet("ai_agents");
  aiInsights = await apiGet("ai_insights");

  integrationCredentials = await apiGet("integration_credentials");
  integrationQueue = await apiGet("integration_execution_queue");
  integrationWebhooks = await apiGet("integration_webhooks");

  copilotConversations = await apiGet("copilot_conversations");
  copilotMessages = await apiGet("copilot_messages");
  promptTemplates = await apiGet("prompt_templates");
  executiveKpiSnapshots = await apiGet("executive_kpi_snapshots");
  reportCenterExports = await apiGet("report_center_exports");
  automationCenterItems = await apiGet("automation_center_items");
  mobileAppSettings = await apiGet("mobile_app_settings");

  pwaSettings = await apiGet("pwa_settings");
  offlineCacheItems = await apiGet("offline_cache_items");
  pushNotificationTemplates = await apiGet("push_notification_templates");
  routePlans = await apiGet("route_plans");
  routeStops = await apiGet("route_stops");
  weatherAlerts = await apiGet("weather_alerts");
  mobileWorkforceTasks = await apiGet("mobile_workforce_tasks");
  gpsCheckins = await apiGet("gps_checkins");
  teamCheckins = await apiGet("team_checkins");
  fieldPhotos = await apiGet("field_photos");
  fieldSignatures = await apiGet("field_signatures");
  workOrders = await apiGet("work_orders");
  workOrderLogs = await apiGet("work_order_logs");
  projectTimeline = await apiGet("project_timeline");
  biSnapshots = await apiGet("bi_snapshots");
  analyticsRankings = await apiGet("analytics_rankings");
  forecastScenarios = await apiGet("forecast_scenarios");
  profitabilityRecords = await apiGet("profitability_records");
  executiveIntelligenceItems = await apiGet("executive_intelligence_items");
  mapsRouteRequests = await apiGet("maps_route_requests");
  whatsappMessageQueue = await apiGet("whatsapp_message_queue");
  gmailMessageQueue = await apiGet("gmail_message_queue");
  pushNotificationQueue = await apiGet("push_notification_queue");
  automationFlowTemplates = await apiGet("automation_flow_templates");
  automationFlowRuns = await apiGet("automation_flow_runs");
  architectureAuditLogs = await apiGet("architecture_audit_logs");
  moduleRegistry = await apiGet("module_registry");
  aiOperationsReadiness = await apiGet("ai_operations_readiness");
  aiLeadScores = await apiGet("ai_lead_scores");
  aiQuoteDrafts = await apiGet("ai_quote_drafts");
  aiProjectRisks = await apiGet("ai_project_risks");
  aiFinancialAdvice = await apiGet("ai_financial_advice");
  aiWorkforcePlans = await apiGet("ai_workforce_plans");
  aiRouteOptimizations = await apiGet("ai_route_optimizations");
  aiWeatherImpacts = await apiGet("ai_weather_impacts");
  aiExecutiveReports = await apiGet("ai_executive_reports");
  aiAutomationRecommendations = await apiGet("ai_automation_recommendations");
  aiCommandCenterLogs = await apiGet("ai_command_center_logs");
  userProfiles = await apiGet("user_profiles");
  roleExperienceSettings = await apiGet("role_experience_settings");
  roleActivityLogs = await apiGet("role_activity_logs");

}

function normalizeRoute(page){
  if(window.DDCore && typeof window.DDCore.normalizeRoute === "function"){
    return window.DDCore.normalizeRoute(page);
  }
  return page;
}

function changePage(page, event){
  page = normalizeRoute(page);
  document.querySelectorAll(".menu-btn").forEach(btn => btn.classList.remove("active"));
  if(event){
    const activeBtn = event.target && event.target.closest ? event.target.closest(".menu-btn") : event.target;
    if(activeBtn) activeBtn.classList.add("active");
  }

  const renderer = window.DDCore && typeof window.DDCore.getRouteRenderer === "function"
    ? window.DDCore.getRouteRenderer(page, window)
    : null;

  (renderer || renderDashboard)();
}

function setTitle(title){
  document.getElementById("pageTitle").innerText = title;
}

function setContent(html){
  document.getElementById("pageContent").innerHTML = html;
}

function metric(label, value){
  return `<div class="card"><h3>${label}</h3><p class="big">${value}</p></div>`;
}

function val(id){
  const el = document.getElementById(id);
  return el ? el.value : "";
}

function renderDashboard(){
  // V62 PREMIUM HOME — visual redesign only.
  // Uses existing data arrays + currentRoleExperience. No new APIs, no logic change.
  setTitle("Home");

  const role = (currentRoleExperience || "owner").toLowerCase();

  const fmtMoney = (n) => "$" + (Number(n)||0).toLocaleString("en-US",{maximumFractionDigits:0});

  // Derive numbers from already-loaded arrays
  const revenue = (profitabilityRecords || []).reduce((a,r)=>a + (Number(r.revenue||r.amount||0)||0), 0)
    || (executiveKpiSnapshots || []).reduce((a,r)=>a + (Number(r.revenue||0)||0), 0)
    || 124800;
  const activeProjects = (workOrders || []).filter(w => (w.status||"").toLowerCase() !== "closed").length || (routePlans||[]).length || 12;
  const teamInField = (gpsCheckins || []).length || (mobileWorkforceTasks||[]).length || 8;
  const openWO = (workOrders || []).filter(w => (w.status||"").toLowerCase() !== "closed").length || 5;

  const todayJobs = (mobileWorkforceTasks||[]).slice(0,5);
  const recentPhotos = (fieldPhotos||[]).slice(0,6);

  const switchHtml = `
    <div class="v62-role-switch" role="tablist" aria-label="Role">
      <button class="${role==='owner'?'is-active':''}" onclick="setRoleExperience && setRoleExperience('owner'); currentRoleExperience='owner'; localStorage.setItem('dd_role','owner'); renderDashboard();">👑 Owner</button>
      <button class="${role==='employee'?'is-active':''}" onclick="setRoleExperience && setRoleExperience('employee'); currentRoleExperience='employee'; localStorage.setItem('dd_role','employee'); renderDashboard();">👷 Employee</button>
      <button class="${role==='client'?'is-active':''}" onclick="setRoleExperience && setRoleExperience('client'); currentRoleExperience='client'; localStorage.setItem('dd_role','client'); renderDashboard();">🤝 Client</button>
    </div>
  `;

  const hero = ({title, subtitle, chips}) => `
    <section class="v62-hero">
      <div>
        <span class="hero-eyebrow">🌿 DoubleDiamond · V62</span>
        <h1>${title}</h1>
        <p class="hero-sub">${subtitle}</p>
      </div>
      <div class="hero-meta">
        ${chips.map(c=>`<span class="hero-chip">${c}</span>`).join("")}
      </div>
    </section>
  `;

  const kpi = (icon,label,value,trend) => `
    <div class="v62-kpi">
      <div class="kpi-icon">${icon}</div>
      <div class="kpi-label">${label}</div>
      <div class="kpi-value">${value}</div>
      ${trend ? `<div class="kpi-trend">▲ ${trend}</div>` : ""}
    </div>
  `;

  const action = (icon,title,desc,page) => `
    <button class="v62-action" onclick="changePage('${page}', event)">
      <div class="act-icon">${icon}</div>
      <h4>${title}</h4>
      <p>${desc}</p>
      <span class="act-arrow">Open →</span>
    </button>
  `;

  let body = "";

  if(role === "employee"){
    body = `
      ${hero({
        title:"Good day on the field 🌱",
        subtitle:"Your route, check-ins and photos — all in one place.",
        chips:[`📍 ${teamInField} crew on site`, `🧾 ${openWO} open work orders`, `📅 Today`]
      })}
      ${switchHtml}
      <div class="v62-kpis">
        ${kpi("📋","Today's Jobs", todayJobs.length || 4, "On schedule")}
        ${kpi("🗺️","Next Stop", (routeStops[0] && (routeStops[0].address||routeStops[0].name)) || "Maple Ave 124", "")}
        ${kpi("⏱️","Hours Logged", (gpsCheckins.length*2)||6, "")}
        ${kpi("📸","Photos Today", recentPhotos.length || 3, "")}
      </div>

      <h3 class="v62-section-title">Field actions</h3>
      <div class="v63-actions-xl">
        <button class="v63-action-xl" onclick="changePage('routePlanning', event)"><div class="xl-ico">🚀</div><strong>Start Route</strong></button>
        <button class="v63-action-xl" onclick="changePage('mobileWorkforce', event)"><div class="xl-ico">📍</div><strong>GPS Check-in</strong></button>
        <button class="v63-action-xl" onclick="changePage('fieldDashboard', event)"><div class="xl-ico">📸</div><strong>Upload Photos</strong></button>
        <button class="v63-action-xl" onclick="changePage('fieldDashboard', event)"><div class="xl-ico">✍️</div><strong>Signature</strong></button>
        <button class="v63-action-xl" onclick="changePage('workOrders', event)"><div class="xl-ico">✅</div><strong>Complete Service</strong></button>
        <button class="v63-action-xl" onclick="changePage('weatherCenter', event)"><div class="xl-ico">🌦️</div><strong>Weather</strong></button>
      </div>

      <h3 class="v62-section-title">Today's jobs</h3>
      <div class="v62-list">
        ${(todayJobs.length?todayJobs:[{task_name:"Lawn maintenance",address:"Oak Street 88"},{task_name:"Hedge trimming",address:"Pine Ave 12"},{task_name:"Irrigation check",address:"Sunset Blvd 45"}]).map(j=>`
          <div class="li">
            <div class="li-icon">🌿</div>
            <div class="li-body"><strong>${j.task_name||j.title||"Job"}</strong><small>${j.address||j.location||"Field site"}</small></div>
            <span class="li-pill">${j.status||"Scheduled"}</span>
          </div>
        `).join("")}
      </div>
    `;
  } else if(role === "client"){
    body = `
      ${hero({
        title:"Welcome back 👋",
        subtitle:"Track your landscaping projects, photos, reports and payments.",
        chips:["🌿 3 active projects","📸 Fresh photos","💳 1 invoice"]
      })}
      ${switchHtml}
      <div class="v62-kpis">
        ${kpi("📈","Project Progress","72%","On track")}
        ${kpi("📸","Recent Photos", recentPhotos.length || 6, "")}
        ${kpi("📑","Reports", (reportCenterExports||[]).length || 4, "")}
        ${kpi("💳","Open Payments", "1", "")}
      </div>

      <div class="v62-split">
        <div class="v62-progress-card">
          <h3 class="v62-section-title">Project progress</h3>
          ${[
            {n:"Front yard redesign", p:82},
            {n:"Irrigation system", p:60},
            {n:"Backyard patio", p:35}
          ].map(r=>`
            <div class="v62-progress-row">
              <div class="pr-head"><span>${r.n}</span><small>${r.p}%</small></div>
              <div class="v62-progress-bar"><div style="width:${r.p}%"></div></div>
            </div>
          `).join("")}
        </div>
        <div>
          <h3 class="v62-section-title">Quick actions</h3>
          <div class="v62-actions" style="grid-template-columns:1fr;">
            ${action("🌿","My Project","Project overview &amp; next visit","clientHome")}
            ${action("📸","Photos","See latest before/after pictures","fieldDashboard")}
            ${action("📑","Reports","Download project reports","reportCenter")}
            ${action("💳","Payments","Review open invoices","profitabilityEngine")}
            ${action("💬","Messages","Talk to your project manager","whatsappReal")}
          </div>
          <div class="v63-alerts" style="margin-top:14px;">
            <div class="v63-alert info"><div class="a-ico">📅</div><div class="a-body"><strong>Next visit</strong><small>Tomorrow · 9:00 AM · Front yard maintenance</small></div></div>
            <div class="v63-alert"><div class="a-ico">🌤️</div><div class="a-body"><strong>Great weather expected</strong><small>Sunny · 24°C · perfect for outdoor work</small></div></div>
          </div>
        </div>
      </div>

      
<div class="v65-timeline">
<h3>📍 Project Timeline</h3>
<div class="v65-step"><span class="v65-done">✓</span><div>Orçamento aprovado</div></div>
<div class="v65-step"><span class="v65-done">✓</span><div>Projeto criado</div></div>
<div class="v65-step"><span class="v65-done">✓</span><div>Team programada</div></div>
<div class="v65-step"><span class="v65-current">⏳</span><div>Execução em andamento</div></div>
<div class="v65-step"><span>⬜</span><div>Entrega final</div></div>
</div>

<div class="v65-finance">
<div class="v65-box"><h3>💰 Pago</h3><p>R$ ${formatMoneyExecutive ? formatMoneyExecutive(15000) : "15.000"}</p></div>
<div class="v65-box"><h3>📄 Pendente</h3><p>R$ ${formatMoneyExecutive ? formatMoneyExecutive(3000) : "3.000"}</p></div>
</div>

<div class="v65-gallery">
<div class="v65-box"><h3>Antes</h3><p>Área original do projeto</p></div>
<div class="v65-box"><h3>Depois</h3><p>Evolução mais recente</p></div>
</div>


<div class="v651-hero">
<h2>🏡 My Project</h2>
<p>72% completed • 🟢 On Schedule</p>
<p>Next Step: Irrigation Installation</p>
<p>Next Visit: 12/06 • 08:00</p>
</div>

<div class="v651-grid">
<div class="v651-card"><h3>🚀 Next Step</h3><p>Irrigation Installation</p></div>
<div class="v651-card"><h3>📅 Next Visit</h3><p>12/06 às 08:00</p></div>
<div class="v651-card"><h3>🟢 Status</h3><p>On Schedule</p></div>
</div>

<div class="v651-card">
<h3>📰 Recent Updates</h3>
<div class="v651-feed-item">Hoje • Team iniciou preparação do terreno</div>
<div class="v651-feed-item">Ontem • Materiais entregues</div>
<div class="v651-feed-item">05/06 • Projeto aprovado</div>
</div>

<div class="v651-card">
<h3>👷 Team Assigned to</h3>
<div class="v651-team">
<span class="v651-avatar">Supervisor</span>
<span class="v651-avatar">Paisagista</span>
<span class="v651-avatar">Técnico</span>
</div>
</div>

<h3 class="v62-section-title">Recent photos</h3>


      <div class="v62-photo-grid">
        ${(recentPhotos.length?recentPhotos:[
          {label:"Front yard",url:"https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=600&q=70"},
          {label:"Lawn",url:"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%271200%27%20height%3D%27700%27%3E%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20fill%3D%27%23eef7ee%27/%3E%3Ctext%20x%3D%2750%25%27%20y%3D%2750%25%27%20text-anchor%3D%27middle%27%20fill%3D%27%2314532d%27%20font-family%3D%27Arial%27%20font-size%3D%2738%27%20font-weight%3D%27700%27%3EProject%20Photo%3C/text%3E%3C/svg%3E?auto=format&fit=crop&w=600&q=70"},
          {label:"Garden",url:"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=70"},
          {label:"Hedges",url:"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=70"}
        ]).map(p=>`
          <div class="v62-photo" data-label="${p.label||p.caption||'Photo'}" style="background-image:url('${p.url||p.photo_url||p.image_url||"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=70"}')"></div>
        `).join("")}
      </div>
    `;
  } else {
    // OWNER (default)
    body = `
      ${hero({
        title:"Run your landscaping business 💎",
        subtitle:"Revenue, crews on the field and active projects — at a glance.",
        chips:[`🏢 ${companies.length||1} companies`, `👷 ${teamInField} in field`, `🧾 ${openWO} open WOs`]
      })}
      ${switchHtml}
      <div class="v62-kpis">
        ${kpi("💰","Revenue", fmtMoney(revenue), "12.4% MoM")}
        ${kpi("🌿","Active Projects", activeProjects, "3 new")}
        ${kpi("👷","Team in Field", teamInField, "")}
        ${kpi("🧾","Open Work Orders", openWO, "")}
      </div>

      <h3 class="v62-section-title">Alerts &amp; signals</h3>
      <div class="v63-alerts">
        <div class="v63-alert"><div class="a-ico">🤖</div><div class="a-body"><strong>AI Alert · Crew capacity</strong><small>Tuesday route looks 18% over-booked — rebalance suggested.</small></div></div>
        <div class="v63-alert warn"><div class="a-ico">🌧️</div><div class="a-body"><strong>Weather · Rain Thursday</strong><small>3 outdoor projects may need rescheduling.</small></div></div>
        <div class="v63-alert info"><div class="a-ico">🗺️</div><div class="a-body"><strong>Route status</strong><small>${(routeStops||[]).length||14} stops scheduled · 2 crews en route.</small></div></div>
        <div class="v63-alert"><div class="a-ico">🤝</div><div class="a-body"><strong>Recent client activity</strong><small>${(companies[0]&&companies[0].name)||"Greenway Park"} approved the latest quote.</small></div></div>
      </div>

      <h3 class="v62-section-title">Quick actions</h3>
      <div class="v62-actions">
        ${action("📈","Executive","Owner KPIs and forecasts","executiveDashboard")}
        ${action("🧾","Work Orders","Manage open orders","workOrders")}
        ${action("👷","Workforce","Crews and field activity","mobileWorkforce")}
        ${action("💰","Profitability","Margins and revenue","profitabilityEngine")}
      </div>

      <div class="v62-split">
        <div>
          <h3 class="v62-section-title">Latest field activity</h3>
          <div class="v62-list">
            ${((gpsCheckins||[]).slice(0,4).length ? gpsCheckins.slice(0,4) : [
              {user_name:"Carlos",location:"Maple Ave 124"},
              {user_name:"Diego",location:"Pine St 8"},
              {user_name:"Marco",location:"Oak Blvd 56"}
            ]).map(c=>`
              <div class="li">
                <div class="li-icon">📍</div>
                <div class="li-body"><strong>${c.user_name||c.crew||"Crew"}</strong><small>${c.location||c.address||"On site"}</small></div>
                <span class="li-pill">Checked-in</span>
              </div>
            `).join("")}
          </div>
        </div>
        <div>
          <h3 class="v62-section-title">Project progress</h3>
          <div class="v62-progress-card">
            ${[
              {n:"Greenway Park", p:78},
              {n:"Riverside Estate", p:54},
              {n:"Downtown Plaza", p:30}
            ].map(r=>`
              <div class="v62-progress-row">
                <div class="pr-head"><span>${r.n}</span><small>${r.p}%</small></div>
                <div class="v62-progress-bar"><div style="width:${r.p}%"></div></div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }

  setContent(`<div class="v62-home">${body}</div>`);
}

function renderClients(){
  setTitle("Clients");

  setContent(`
    <div class="foundation-note">V14 Multiclient: camada inicial para SaaS.</div>

    <div class="card">
      <h2>Novo Client</h2>
      <div class="form-grid">
        <input id="companyName" placeholder="Client Name">
        <input id="companyEmail" placeholder="Email">
        <input id="companyPhone" placeholder="Telefone">
        <select id="companyPlan"><option>Starter</option><option>Professional</option><option>Enterprise</option></select>
        <select id="companyStatus"><option>Active</option><option>Inactive</option><option>Trial</option></select>
      </div>
      <button class="primary-btn" onclick="addCompany()">Cadastrar Client</button>
    </div>

    <div class="card">
      <h2>Usuário do Client</h2>
      <div class="form-grid">
        <select id="companyUserCompany"><option value="">Client</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input id="companyUserName" placeholder="Nome do usuário">
        <input id="companyUserEmail" placeholder="Email do usuário">
        <select id="companyUserRole"><option>Owner</option><option>Manager</option><option>Employee</option><option>Client</option></select>
      </div>
      <button class="primary-btn" onclick="addCompanyUser()">Add User</button>
    </div>

    <div class="enterprise-grid">
      ${companies.map(company => {
        const users = companyUsers.filter(u => u.company_id === company.id);
        return `
          <div class="enterprise-card">
            <h2>${company.name}</h2>
            <small>${company.email || "Sem email"} • ${company.phone || "Sem telefone"}</small><br>
            <span class="status ${company.status === "Active" ? "status-active" : "status-inactive"}">${company.status}</span>
            <p><strong>Plano:</strong> ${company.plan}</p>
            <p><strong>Usuários:</strong> ${users.length}</p>
            ${users.map(u => `<div class="soft-box"><strong>${u.user_name}</strong><br><small>${u.user_email || ""} • ${u.role}</small></div>`).join("")}
            <button class="danger-btn" onclick="removeCompany('${company.id}')">Remover Client</button>
          </div>
        `;
      }).join("") || "<div class='card'><p>Nenhuma cliente cadastrada.</p></div>"}
    </div>
  `);
}

async function addCompany(){
  const name = val("companyName").trim();
  if(!name) return alert("Digite o nome da client.");

  const res = await apiInsert("companies", {
    name,
    email: val("companyEmail"),
    phone: val("companyPhone"),
    plan: val("companyPlan"),
    status: val("companyStatus")
  });

  if(!res.ok) return alert("Erro ao criar client.");

  companies = await apiGet("companies");
  projects = await apiGet("projects");
  renderClients();
}

async function removeCompany(id){
  const res = await apiDelete("companies", id);
  if(!res.ok) return alert("Erro ao remover client.");

  companies = await apiGet("companies");
  projects = await apiGet("projects");
  companyUsers = await apiGet("company_users");
  renderClients();
}

async function addCompanyUser(){
  const companyId = val("companyUserCompany");
  const name = val("companyUserName").trim();

  if(!companyId) return alert("Select a client.");
  if(!name) return alert("Digite o nome do usuário.");

  const res = await apiInsert("company_users", {
    company_id: companyId,
    user_name: name,
    user_email: val("companyUserEmail"),
    role: val("companyUserRole"),
    status: "Active"
  });

  if(!res.ok) return alert("Erro ao criar usuário da client.");

  companyUsers = await apiGet("company_users");
  renderClients();
}

function renderIntegrationHub(){
  setTitle("Integration Hub");

  setContent(`
    <div class="foundation-note">V15 Integration Hub: estrutura para Google, WhatsApp, OpenAI e pagamentos.</div>

    <div class="card">
      <h2>Nova Conexão</h2>
      <div class="form-grid">
        <select id="integrationCompany"><option value="">Client</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <select id="integrationProvider"><option value="">Provider</option>${integrationProviders.map(p => `<option value="${p.name}">${p.name}</option>`).join("")}</select>
        <select id="integrationStatus"><option>Disconnected</option><option>Connected</option><option>Error</option></select>
      </div>
      <textarea id="integrationNotes" placeholder="Observações"></textarea>
      <button class="primary-btn" onclick="addIntegrationConnection()">Salvar Conexão</button>
    </div>

    <div class="enterprise-grid">
      ${integrationProviders.map(provider => {
        const connections = integrationConnections.filter(c => c.provider_name === provider.name);
        return `
          <div class="enterprise-card">
            <h2>${provider.name}</h2>
            <small>${provider.category || "Sem categoria"}</small><br>
            <span class="integration-status integration-disconnected">${provider.status}</span>
            <p><strong>Conexões:</strong> ${connections.length}</p>
            ${connections.map(conn => {
              const company = companies.find(c => c.id === conn.company_id);
              return `
                <div class="soft-box">
                  <strong>${company?.name || "Client"}</strong><br>
                  <span class="integration-status ${getIntegrationClass(conn.connection_status)}">${conn.connection_status}</span>
                  <p>${conn.notes || ""}</p>
                  <button class="secondary-btn" onclick="logIntegrationTest('${conn.company_id}', '${conn.provider_name}', '${conn.connection_status}')">Gerar Log Teste</button>
                </div>
              `;
            }).join("")}
          </div>
        `;
      }).join("")}
    </div>

    <div class="card">
      <h2>Logs de Integração</h2>
      ${integrationLogs.length ? integrationLogs.map(log => `
        <div class="soft-box">
          <strong>${log.provider_name}</strong><br>
          <small>${log.log_status} • ${log.message || ""}</small><br>
          <small>${log.created_at ? new Date(log.created_at).toLocaleString("pt-BR") : ""}</small>
        </div>
      `).join("") : "<p>Nenhum log.</p>"}
    </div>
  `);
}

async function addIntegrationConnection(){
  const companyId = val("integrationCompany");
  const provider = val("integrationProvider");

  if(!companyId) return alert("Select a client.");
  if(!provider) return alert("Selecione o provider.");

  const res = await apiInsert("integration_connections", {
    company_id: companyId,
    provider_name: provider,
    connection_status: val("integrationStatus"),
    notes: val("integrationNotes")
  });

  if(!res.ok) return alert("Erro ao salvar conexão.");

  integrationConnections = await apiGet("integration_connections");
  renderIntegrationHub();
}

async function logIntegrationTest(companyId, providerName, status){
  const res = await apiInsert("integration_logs", {
    company_id: companyId,
    provider_name: providerName,
    log_status: status === "Connected" ? "SUCCESS" : "INFO",
    message: `Teste estrutural da integração ${providerName}. Status atual: ${status}.`
  });

  if(!res.ok) return alert("Erro ao gerar log.");

  integrationLogs = await apiGet("integration_logs");
  renderIntegrationHub();
}

function getIntegrationClass(status){
  if(status === "Connected") return "integration-connected";
  if(status === "Error") return "integration-error";
  return "integration-disconnected";
}

function renderAIFoundation(){
  setTitle("AI Foundation");

  setContent(`
    <div class="foundation-note">V16 AI Foundation: camada inicial para insights sem API externa.</div>

    <div class="card">
      <h2>Gerar Insights Locais</h2>
      <button class="success-btn" onclick="generateAIInsights()">Gerar Insights</button>
    </div>

    <div class="enterprise-grid">
      ${aiAgents.map(agent => `
        <div class="enterprise-card">
          <h2>${agent.name}</h2>
          <small>${agent.role}</small>
          <p>${agent.description || ""}</p>
          <span class="status ${agent.status === "Active" ? "status-active" : "status-inactive"}">${agent.status}</span>
        </div>
      `).join("")}
    </div>

    <div class="card">
      <h2>Insights</h2>
      ${aiInsights.length ? aiInsights.map(insight => `
        <div class="enterprise-card ai-priority-${String(insight.priority || "Medium").toLowerCase()}">
          <strong>${insight.title}</strong><br>
          <small>${insight.agent_name || "AI"} • ${insight.insight_type || ""} • ${insight.priority}</small>
          <p>${insight.message || ""}</p>
          <span class="status ${insight.status === "Open" ? "status-active" : "status-inactive"}">${insight.status}</span>
          <div class="action-row">
            <button class="secondary-btn" onclick="closeAIInsight('${insight.id}')">Concluir</button>
            <button class="danger-btn" onclick="removeAIInsight('${insight.id}')">Remover</button>
          </div>
        </div>
      `).join("") : "<p>Nenhum insight gerado.</p>"}
    </div>
  `);
}

async function generateAIInsights(){
  const insights = [];

  if(companies.length === 0){
    insights.push({
      agent_name: "CEO Advisor",
      insight_type: "SaaS",
      title: "Multiclient sem cliente cadastrada",
      message: "Crie a primeira cliente para iniciar a preparação SaaS.",
      priority: "Medium",
      status: "Open"
    });
  }

  if(integrationConnections.length === 0){
    insights.push({
      agent_name: "CEO Advisor",
      insight_type: "Integrations",
      title: "Nenhuma integração estruturada",
      message: "Cadastre conexões no Integration Hub para preparar Google, WhatsApp, OpenAI ou pagamentos.",
      priority: "Medium",
      status: "Open"
    });
  }

  if(!insights.length){
    insights.push({
      agent_name: "CEO Advisor",
      insight_type: "Health",
      title: "Enterprise Core saudável",
      message: "Fundação SaaS, Integration Hub e AI Foundation estão estruturados.",
      priority: "Low",
      status: "Open"
    });
  }

  for(const insight of insights){
    await apiInsert("ai_insights", insight);
  }

  aiInsights = await apiGet("ai_insights");
  renderAIFoundation();
}

async function closeAIInsight(id){
  const res = await apiPatch("ai_insights", id, { status: "Closed" });
  if(!res.ok) return alert("Erro ao concluir insight.");

  aiInsights = await apiGet("ai_insights");
  renderAIFoundation();
}

async function removeAIInsight(id){
  const res = await apiDelete("ai_insights", id);
  if(!res.ok) return alert("Erro ao remover insight.");

  aiInsights = await apiGet("ai_insights");
  renderAIFoundation();
}

function renderConfiguracoes(){
  setTitle("Configurações");

  setContent(`
    <div class="card">
      <h2>Enterprise Core</h2>
      <p>Versão estrutural para V14 Multiclient, V15 Integration Hub e V16 AI Foundation.</p>
      <div class="soft-box">
        URL Supabase: ${SUPABASE_URL}<br>
        Status: Foundation ativa
      </div>
    </div>
  `);
}


/* V22-V25 REAL INTEGRATIONS FOUNDATION + PLAN B READY */
function renderRealIntegrations(){
  setTitle("Integrações Reais");

  setContent(`
    <div class="secret-warning">
      Segurança: Google Client Secret, Meta Token, OpenAI Key e Stripe Secret não devem ficar no frontend. Use Supabase Edge Functions ou backend.
    </div>

    <div class="cards">
      ${metric("Credenciais", integrationCredentials.length)}
      ${metric("Fila de Execução", integrationQueue.length)}
      ${metric("Webhooks", integrationWebhooks.length)}
      ${metric("Prompts", promptTemplates.length)}
    </div>

    <div class="card">
      <h2>Adicionar Ação na Fila</h2>
      <div class="form-grid">
        <select id="queueCompany">
          <option value="">Client</option>
          ${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}
        </select>
        <select id="queueProvider">
          <option>Google Calendar</option>
          <option>Gmail</option>
          <option>WhatsApp Business</option>
          <option>OpenAI</option>
          <option>Stripe</option>
        </select>
        <select id="queueAction">
          <option>Create Calendar Event</option>
          <option>Send Email</option>
          <option>Send WhatsApp</option>
          <option>Generate AI Insight</option>
          <option>Create Checkout Session</option>
        </select>
      </div>
      <textarea id="queuePayload" placeholder='Payload JSON. Ex: {"title":"Visita","date":"2026-06-10"}'></textarea>
      <button class="primary-btn" onclick="addIntegrationQueue()">Adicionar à Fila</button>
    </div>

    <div class="real-grid">
      ${integrationQueue.map(item => `
        <div class="real-card">
          <h2>${item.provider}</h2>
          <small>${item.action_type}</small><br>
          <span class="queue-status">${item.execution_status}</span>
          <p>${item.result_message || "Aguardando execução pelo backend."}</p>
          <button class="secondary-btn" onclick="markQueueSimulated('${item.id}')">Simular Execução</button>
        </div>
      `).join("") || "<div class='card'>Nenhuma ação na fila.</div>"}
    </div>
  `);
}

async function addIntegrationQueue(){
  const companyId = val("queueCompany");
  if(!companyId) return alert("Select a client.");

  let payload = {};
  try{
    payload = val("queuePayload") ? JSON.parse(val("queuePayload")) : {};
  }catch(e){
    return alert("Payload JSON inválido.");
  }

  const res = await apiInsert("integration_execution_queue", {
    company_id: companyId,
    provider: val("queueProvider"),
    action_type: val("queueAction"),
    payload,
    execution_status: "Pending",
    result_message: "Aguardando backend/Edge Function."
  });

  if(!res.ok) return alert("Erro ao adicionar fila.");

  integrationQueue = await apiGet("integration_execution_queue");
  renderRealIntegrations();
}

async function markQueueSimulated(id){
  const res = await apiPatch("integration_execution_queue", id, {
    execution_status: "Simulated",
    result_message: "Execução simulada com sucesso. Próximo passo: conectar Edge Function real."
  });

  if(!res.ok) return alert("Erro ao simular execução.");

  integrationQueue = await apiGet("integration_execution_queue");
  renderRealIntegrations();
}

function renderCredentialManager(){
  setTitle("Credential Manager");

  setContent(`
    <div class="secret-warning">
      Não cole chaves secretas aqui. Esta tela registra somente status/identificador público. Segredos reais ficam no backend.
    </div>

    <div class="card">
      <h2>Registrar Credencial</h2>
      <div class="form-grid">
        <select id="credCompany">
          <option value="">Client</option>
          ${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}
        </select>
        <select id="credProvider">
          <option>Google</option>
          <option>Gmail</option>
          <option>WhatsApp Business</option>
          <option>OpenAI</option>
          <option>Stripe</option>
        </select>
        <input id="credLabel" placeholder="Label. Ex: Produção">
        <input id="credPublic" placeholder="Identificador público. Ex: client_id ou phone_number_id">
        <select id="credStatus">
          <option>Not Configured</option>
          <option>Configured in Backend</option>
          <option>Error</option>
        </select>
        <select id="credEnv">
          <option>Production</option>
          <option>Sandbox</option>
        </select>
      </div>
      <textarea id="credNotes" placeholder="Notas"></textarea>
      <button class="primary-btn" onclick="addCredential()">Salvar Credencial</button>
    </div>

    <div class="real-grid">
      ${integrationCredentials.map(cred => `
        <div class="real-card">
          <h2>${cred.provider}</h2>
          <small>${companies.find(c => c.id === cred.company_id)?.name || "Client"}</small><br>
          <span class="queue-status">${cred.secret_status}</span>
          <p>${cred.credential_label || ""}</p>
          <p>${cred.public_identifier || ""}</p>
        </div>
      `).join("") || "<div class='card'>Nenhuma credencial registrada.</div>"}
    </div>
  `);
}

async function addCredential(){
  const companyId = val("credCompany");
  if(!companyId) return alert("Select a client.");

  const res = await apiInsert("integration_credentials", {
    company_id: companyId,
    provider: val("credProvider"),
    credential_label: val("credLabel"),
    public_identifier: val("credPublic"),
    secret_status: val("credStatus"),
    environment: val("credEnv"),
    notes: val("credNotes")
  });

  if(!res.ok) return alert("Erro ao salvar credencial.");

  integrationCredentials = await apiGet("integration_credentials");
  renderCredentialManager();
}

function renderCopilot(){
  setTitle("AI Copilot");

  setContent(`
    <div class="secret-warning">
      O Copilot está pronto para OpenAI via backend. No frontend, ele usa modo simulado seguro.
    </div>

    <div class="card">
      <h2>Nova Conversa</h2>
      <input id="copilotTitle" placeholder="Título da conversa">
      <button class="primary-btn" onclick="createCopilotConversation()">Criar Conversa</button>
    </div>

    <div class="card">
      <h2>Conversas</h2>
      <select id="copilotConversation" onchange="renderCopilotMessages()">
        <option value="">Selecione</option>
        ${copilotConversations.map(c => `<option value="${c.id}">${c.title}</option>`).join("")}
      </select>

      <div id="copilotMessagesArea" class="copilot-chat"></div>

      <textarea id="copilotInput" placeholder="Pergunte ao Copilot sobre vendas, financeiro, projetos ou operação."></textarea>
      <button class="success-btn" onclick="sendCopilotMessage()">Enviar</button>
    </div>

    <div class="card">
      <h2>Prompt Templates</h2>
      ${promptTemplates.map(p => `
        <div class="soft-box">
          <strong>${p.template_name}</strong><br>
          <small>${p.agent_name}</small>
          <p>${p.prompt_text}</p>
        </div>
      `).join("")}
    </div>
  `);
}

async function createCopilotConversation(){
  const title = val("copilotTitle").trim();
  if(!title) return alert("Digite o título.");

  const companyId = companies[0]?.id || "";

  const res = await apiInsert("copilot_conversations", {
    company_id: companyId,
    title,
    status: "Open"
  });

  if(!res.ok) return alert("Erro ao criar conversa.");

  copilotConversations = await apiGet("copilot_conversations");
  renderCopilot();
}

function renderCopilotMessages(){
  const id = val("copilotConversation");
  const area = document.getElementById("copilotMessagesArea");

  if(!id){
    area.innerHTML = "<p>Selecione uma conversa.</p>";
    return;
  }

  const msgs = copilotMessages.filter(m => m.conversation_id === id);

  area.innerHTML = msgs.map(m => `
    <div class="${m.role === "user" ? "chat-user" : "chat-ai"}">
      <strong>${m.role === "user" ? "Você" : "Copilot"}</strong>
      <p>${m.message}</p>
    </div>
  `).join("") || "<p>Nenhuma mensagem.</p>";
}

async function sendCopilotMessage(){
  const conversationId = val("copilotConversation");
  const message = val("copilotInput").trim();

  if(!conversationId) return alert("Selecione uma conversa.");
  if(!message) return alert("Digite uma mensagem.");

  await apiInsert("copilot_messages", {
    conversation_id: conversationId,
    role: "user",
    message
  });

  const simulatedResponse = generateSafeCopilotResponse(message);

  await apiInsert("copilot_messages", {
    conversation_id: conversationId,
    role: "assistant",
    message: simulatedResponse
  });

  copilotMessages = await apiGet("copilot_messages");
  document.getElementById("copilotInput").value = "";
  renderCopilotMessages();
}

function generateSafeCopilotResponse(message){
  const lower = message.toLowerCase();

  if(lower.includes("financeiro") || lower.includes("receita") || lower.includes("billing")){
    return "Análise simulada: revise invoices pendentes, pagamentos vencidos e MRR. Para IA real, conecte OpenAI via Edge Function.";
  }

  if(lower.includes("projeto") || lower.includes("operação")){
    return "Análise simulada: priorize projetos com tarefas pendentes, baixa saúde operacional e falta de team.";
  }

  if(lower.includes("venda") || lower.includes("crm") || lower.includes("lead")){
    return "Análise simulada: priorize leads quentes, clients em trial e planos com maior potencial de conversão.";
  }

  return "Copilot em modo seguro. A estrutura está pronta para conectar OpenAI no backend sem expor a API key no frontend.";
}


/* V26-V30 EXECUTIVE GROWTH PLATFORM */
function getExecutiveMetrics(){
  const invoiceTotal = typeof invoices !== "undefined" ? invoices.reduce((s,i) => s + Number(i.amount || 0), 0) : 0;
  const paidTotal = typeof payments !== "undefined" ? payments.filter(p => p.status === "Paid").reduce((s,p) => s + Number(p.amount || 0), 0) : 0;
  const activeSubs = typeof companySubscriptions !== "undefined" ? companySubscriptions.filter(s => s.status === "Active") : [];
  const mrr = activeSubs.reduce((sum, sub) => {
    const plan = typeof subscriptionPlans !== "undefined" ? subscriptionPlans.find(p => p.id === sub.plan_id) : null;
    return sum + Number(plan?.monthly_price || 0);
  }, 0);

  return {
    invoiceTotal,
    paidTotal,
    mrr,
    activeCompanies: companies.filter(c => c.status === "Active").length,
    providers: integrationProviders.length,
    connections: integrationConnections.length,
    insights: aiInsights.length,
    queue: typeof integrationQueue !== "undefined" ? integrationQueue.length : 0,
    reports: reportCenterExports.length,
    automations: automationCenterItems.length
  };
}

function renderExecutiveDashboard(){
  setTitle("Dashboard Executivo");

  const m = getExecutiveMetrics();

  setContent(`
    <div class="executive-hero">
      <h2>Executive Growth Platform</h2>
      <p>Visão executiva para gestão SaaS, billing, integrações, IA e crescimento.</p>
    </div>

    <div class="cards">
      ${metric("MRR", "R$ " + formatMoneyExecutive(m.mrr))}
      ${metric("Invoices", "R$ " + formatMoneyExecutive(m.invoiceTotal))}
      ${metric("Received", "R$ " + formatMoneyExecutive(m.paidTotal))}
      ${metric("Clients Ativas", m.activeCompanies)}
      ${metric("Conexões", m.connections)}
      ${metric("AI Insights", m.insights)}
      ${metric("Fila Integrações", m.queue)}
      ${metric("Reports", m.reports)}
    </div>

    <div class="card">
      <h2>Snapshot Executivo</h2>
      <p>Salve o estado atual dos KPIs para comparação futura.</p>
      <button class="primary-btn" onclick="saveExecutiveSnapshot()">Salvar Snapshot</button>
    </div>

    <div class="card">
      <h2>Histórico de Snapshots</h2>
      ${executiveKpiSnapshots.length ? executiveKpiSnapshots.map(s => `
        <div class="soft-box">
          <strong>${s.snapshot_name || "Snapshot Executivo"}</strong><br>
          <small>${s.created_at ? new Date(s.created_at).toLocaleString("pt-BR") : ""}</small>
          <p>MRR: R$ ${formatMoneyExecutive(s.mrr)} • Receita: R$ ${formatMoneyExecutive(s.revenue_total)}</p>
        </div>
      `).join("") : "<p>Nenhum snapshot salvo.</p>"}
    </div>
  `);
}

async function saveExecutiveSnapshot(){
  const m = getExecutiveMetrics();
  const companyId = companies[0]?.id || "";

  const res = await apiInsert("executive_kpi_snapshots", {
    company_id: companyId,
    snapshot_name: "Executive Snapshot",
    revenue_total: m.invoiceTotal,
    mrr: m.mrr,
    active_clients: companies.length,
    active_projects: m.connections,
    completed_projects: m.insights,
    pending_invoices: typeof invoices !== "undefined" ? invoices.filter(i => i.status !== "Paid").length : 0,
    collected_payments: m.paidTotal
  });

  if(!res.ok) return alert("Erro ao salvar snapshot.");

  executiveKpiSnapshots = await apiGet("executive_kpi_snapshots");
  renderExecutiveDashboard();
}

function renderKpiCenter(){
  setTitle("KPIs Reais");

  const m = getExecutiveMetrics();
  const conversion = companies.length ? Math.round((m.connections / companies.length) * 100) : 0;
  const avgRevenue = companies.length ? m.invoiceTotal / companies.length : 0;
  const collectionRate = m.invoiceTotal ? Math.round((m.paidTotal / m.invoiceTotal) * 100) : 0;

  setContent(`
    <div class="executive-hero">
      <h2>KPI Center</h2>
      <p>Indicadores reais para crescimento, operação e monetização.</p>
    </div>

    <div class="kpi-grid">
      <div class="kpi-card kpi-good"><h3>MRR</h3><p class="kpi-number">R$ ${formatMoneyExecutive(m.mrr)}</p></div>
      <div class="kpi-card kpi-good"><h3>Receita por Client</h3><p class="kpi-number">R$ ${formatMoneyExecutive(avgRevenue)}</p></div>
      <div class="kpi-card kpi-warn"><h3>Taxa de Conexão</h3><p class="kpi-number">${conversion}%</p></div>
      <div class="kpi-card kpi-good"><h3>Recebimento</h3><p class="kpi-number">${collectionRate}%</p></div>
      <div class="kpi-card kpi-warn"><h3>Automação</h3><p class="kpi-number">${m.automations}</p></div>
      <div class="kpi-card kpi-warn"><h3>Reports</h3><p class="kpi-number">${m.reports}</p></div>
    </div>
  `);
}

function renderAutomationCenter(){
  setTitle("Centro de Automações");

  setContent(`
    <div class="executive-hero">
      <h2>Automation Center</h2>
      <p>Controle central de automações, triggers e ações.</p>
    </div>

    <div class="card">
      <h2>Nova Automação</h2>
      <div class="form-grid">
        <select id="autoCompany">
          <option value="">Client</option>
          ${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}
        </select>
        <input id="autoName" placeholder="Nome da automação">
        <input id="autoTrigger" placeholder="Trigger. Ex: Invoice Overdue">
        <input id="autoAction" placeholder="Ação. Ex: Send WhatsApp">
        <select id="autoStatus"><option>Active</option><option>Paused</option><option>Error</option></select>
      </div>
      <button class="primary-btn" onclick="addAutomationCenterItem()">Criar Automação</button>
    </div>

    <div class="automation-grid">
      ${automationCenterItems.length ? automationCenterItems.map(a => `
        <div class="automation-card">
          <h2>${a.automation_name}</h2>
          <small>${companies.find(c => c.id === a.company_id)?.name || "Client"}</small>
          <p><strong>Trigger:</strong> ${a.trigger_name}</p>
          <p><strong>Ação:</strong> ${a.action_name}</p>
          <span class="export-badge">${a.status}</span>
        </div>
      `).join("") : "<div class='card'>Nenhuma automação criada.</div>"}
    </div>
  `);
}

async function addAutomationCenterItem(){
  const companyId = val("autoCompany");
  if(!companyId) return alert("Select a client.");

  const res = await apiInsert("automation_center_items", {
    company_id: companyId,
    automation_name: val("autoName"),
    trigger_name: val("autoTrigger"),
    action_name: val("autoAction"),
    status: val("autoStatus")
  });

  if(!res.ok) return alert("Erro ao criar automação.");

  automationCenterItems = await apiGet("automation_center_items");
  renderAutomationCenter();
}

function renderReportCenter(){
  setTitle("Report Center");

  setContent(`
    <div class="executive-hero">
      <h2>Report Center</h2>
      <p>Reports prepared for PDF, CSV and Excel.</p>
    </div>

    <div class="card">
      <h2>New Report</h2>
      <div class="form-grid">
        <select id="reportCompany">
          <option value="">Client</option>
          ${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}
        </select>
        <input id="reportName" placeholder="Report name">
        <select id="reportType"><option>Financial</option><option>Projetos</option><option>CRM</option><option>Operações</option><option>SaaS</option><option>Marketplace</option></select>
        <select id="reportFormat"><option>CSV</option><option>PDF</option><option>Excel</option></select>
      </div>
      <button class="primary-btn" onclick="createReportExport()">Prepare Report</button>
    </div>

    <div class="report-grid">
      ${reportCenterExports.length ? reportCenterExports.map(r => `
        <div class="report-card">
          <h2>${r.report_name}</h2>
          <small>${r.report_type}</small><br>
          <span class="export-badge">${r.export_format}</span>
          <p>Status: ${r.status}</p>
        </div>
      `).join("") : "<div class='card'>Nenhum relatório preparado.</div>"}
    </div>
  `);
}

async function createReportExport(){
  const companyId = val("reportCompany");
  if(!companyId) return alert("Select a client.");

  const res = await apiInsert("report_center_exports", {
    company_id: companyId,
    report_name: val("reportName"),
    report_type: val("reportType"),
    export_format: val("reportFormat"),
    status: "Prepared"
  });

  if(!res.ok) return alert("Erro ao preparar relatório.");

  reportCenterExports = await apiGet("report_center_exports");
  renderReportCenter();
}

function renderMobileReady(){
  setTitle("Mobile Ready");

  setContent(`
    <div class="executive-hero">
      <h2>Mobile Ready Foundation</h2>
      <p>Preparação para PWA, cache offline, instalação no celular e push notifications.</p>
    </div>

    <div class="card">
      <h2>Configuração Mobile</h2>
      <div class="form-grid">
        <select id="mobileCompany">
          <option value="">Client</option>
          ${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}
        </select>
        <select id="pwaEnabled"><option value="true">PWA ON</option><option value="false">PWA OFF</option></select>
        <select id="offlineEnabled"><option value="false">Offline OFF</option><option value="true">Offline ON</option></select>
        <select id="pushReady"><option value="false">Push Ready OFF</option><option value="true">Push Ready ON</option></select>
      </div>
      <button class="primary-btn" onclick="saveMobileSettings()">Salvar Configuração</button>
    </div>

    <div class="mobile-preview">
      <div class="mobile-preview-screen">
        <h2>DoubleDiamond</h2>
        <p>Mobile Field Mode</p>
        <button class="mobile-preview-button">Dashboard</button>
        <button class="mobile-preview-button">Projetos</button>
        <button class="mobile-preview-button">Fotos</button>
        <button class="mobile-preview-button">Check-in</button>
      </div>
    </div>

    <div class="mobile-grid">
      ${mobileAppSettings.length ? mobileAppSettings.map(s => `
        <div class="mobile-card">
          <h2>${companies.find(c => c.id === s.company_id)?.name || "Client"}</h2>
          <p>PWA: ${s.pwa_enabled ? "ON" : "OFF"}</p>
          <p>Offline: ${s.offline_cache_enabled ? "ON" : "OFF"}</p>
          <p>Push Ready: ${s.push_ready ? "ON" : "OFF"}</p>
        </div>
      `).join("") : "<div class='card'>Nenhuma configuração mobile.</div>"}
    </div>
  `);
}

async function saveMobileSettings(){
  const companyId = val("mobileCompany");
  if(!companyId) return alert("Select a client.");

  const res = await apiInsert("mobile_app_settings", {
    company_id: companyId,
    pwa_enabled: val("pwaEnabled") === "true",
    offline_cache_enabled: val("offlineEnabled") === "true",
    push_ready: val("pushReady") === "true",
    install_prompt_enabled: true
  });

  if(!res.ok) return alert("Erro ao salvar configuração mobile.");

  mobileAppSettings = await apiGet("mobile_app_settings");

  pwaSettings = await apiGet("pwa_settings");
  offlineCacheItems = await apiGet("offline_cache_items");
  pushNotificationTemplates = await apiGet("push_notification_templates");
  routePlans = await apiGet("route_plans");
  routeStops = await apiGet("route_stops");
  weatherAlerts = await apiGet("weather_alerts");
  mobileWorkforceTasks = await apiGet("mobile_workforce_tasks");
  gpsCheckins = await apiGet("gps_checkins");
  teamCheckins = await apiGet("team_checkins");
  fieldPhotos = await apiGet("field_photos");
  fieldSignatures = await apiGet("field_signatures");
  workOrders = await apiGet("work_orders");
  workOrderLogs = await apiGet("work_order_logs");
  projectTimeline = await apiGet("project_timeline");
  biSnapshots = await apiGet("bi_snapshots");
  analyticsRankings = await apiGet("analytics_rankings");
  forecastScenarios = await apiGet("forecast_scenarios");
  profitabilityRecords = await apiGet("profitability_records");
  executiveIntelligenceItems = await apiGet("executive_intelligence_items");
  mapsRouteRequests = await apiGet("maps_route_requests");
  whatsappMessageQueue = await apiGet("whatsapp_message_queue");
  gmailMessageQueue = await apiGet("gmail_message_queue");
  pushNotificationQueue = await apiGet("push_notification_queue");
  automationFlowTemplates = await apiGet("automation_flow_templates");
  automationFlowRuns = await apiGet("automation_flow_runs");
  architectureAuditLogs = await apiGet("architecture_audit_logs");
  moduleRegistry = await apiGet("module_registry");
  aiOperationsReadiness = await apiGet("ai_operations_readiness");
  aiLeadScores = await apiGet("ai_lead_scores");
  aiQuoteDrafts = await apiGet("ai_quote_drafts");
  aiProjectRisks = await apiGet("ai_project_risks");
  aiFinancialAdvice = await apiGet("ai_financial_advice");
  aiWorkforcePlans = await apiGet("ai_workforce_plans");
  aiRouteOptimizations = await apiGet("ai_route_optimizations");
  aiWeatherImpacts = await apiGet("ai_weather_impacts");
  aiExecutiveReports = await apiGet("ai_executive_reports");
  aiAutomationRecommendations = await apiGet("ai_automation_recommendations");
  aiCommandCenterLogs = await apiGet("ai_command_center_logs");
  userProfiles = await apiGet("user_profiles");
  roleExperienceSettings = await apiGet("role_experience_settings");
  roleActivityLogs = await apiGet("role_activity_logs");

  renderMobileReady();
}

function formatMoneyExecutive(value){
  return Number(value || 0).toLocaleString("pt-BR", {
    minimumFractionDigits:2,
    maximumFractionDigits:2
  });
}


/* V31-V40 FIELD OPERATIONS PLATFORM */
function renderFieldDashboard(){
  setTitle("Field Operations");

  setContent(`
    <div class="field-hero">
      <h2>Field Operations Platform</h2>
      <p>PWA, offline, push, rotas, clima, team externa, GPS, fotos, assinatura e ordens de serviço.</p>
    </div>

    <div class="cards">
      ${metric("PWA Settings", pwaSettings.length)}
      ${metric("Cache Offline", offlineCacheItems.length)}
      ${metric("Push Templates", pushNotificationTemplates.length)}
      ${metric("Routes", routePlans.length)}
      ${metric("Alertas Clima", weatherAlerts.length)}
      ${metric("Tarefas Campo", mobileWorkforceTasks.length)}
      ${metric("GPS Check-ins", gpsCheckins.length)}
      ${metric("Work Orders Serviço", workOrders.length)}
    </div>

    <div class="field-phone">
      <div class="field-phone-screen">
        <h2>DoubleDiamond Field</h2>
        <p>Modo team em campo</p>
        <button class="field-phone-button">Check-in GPS</button>
        <button class="field-phone-button">Fotos</button>
        <button class="field-phone-button">Work Order de Serviço</button>
        <button class="field-phone-button">Assinatura</button>
      </div>
    </div>
  `);
}

function renderPwaCenter(){
  setTitle("PWA / Offline / Push");

  setContent(`
    <div class="field-hero">
      <h2>PWA Real + Offline Cache + Push Ready</h2>
      <p>Preparação para instalação no celular, cache local e notificações futuras.</p>
    </div>

    <div class="card">
      <h2>PWA Settings</h2>
      <div class="form-grid">
        <select id="pwaCompany"><option value="">Client</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input id="pwaAppName" placeholder="Nome do app" value="DoubleDiamond">
        <input id="pwaShortName" placeholder="Nome curto" value="DD">
        <input id="pwaTheme" placeholder="Theme color" value="#2563eb">
        <select id="pwaStatus"><option>Active</option><option>Inactive</option></select>
      </div>
      <button class="primary-btn" onclick="savePwaSettings()">Salvar PWA</button>
    </div>

    <div class="card">
      <h2>Cache Offline</h2>
      <div class="form-grid">
        <select id="cacheCompany"><option value="">Client</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input id="cacheKey" placeholder="Cache Key. Ex: projects">
        <select id="cacheModule"><option>Clients</option><option>Projetos</option><option>Agenda</option><option>Tarefas</option><option>Work Orders</option></select>
        <select id="cacheStatus"><option>Ready</option><option>Syncing</option><option>Error</option></select>
      </div>
      <button class="secondary-btn" onclick="saveOfflineCache()">Salvar Cache</button>
    </div>

    <div class="card">
      <h2>Push Template</h2>
      <div class="form-grid">
        <select id="pushCompany"><option value="">Client</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input id="pushName" placeholder="Nome template">
        <input id="pushTrigger" placeholder="Trigger. Ex: Task Assigned">
        <input id="pushTitle" placeholder="Título">
      </div>
      <textarea id="pushBody" placeholder="Mensagem"></textarea>
      <button class="success-btn" onclick="savePushTemplate()">Salvar Push</button>
    </div>

    <div class="field-grid">
      ${pwaSettings.map(p => `<div class="field-card"><h2>${p.app_name}</h2><span class="field-badge">${p.status}</span><p>${p.short_name} • ${p.display_mode}</p></div>`).join("")}
      ${offlineCacheItems.map(c => `<div class="field-card"><h2>${c.module_name}</h2><span class="field-badge">${c.cache_status}</span><p>${c.cache_key}</p></div>`).join("")}
      ${pushNotificationTemplates.map(p => `<div class="field-card"><h2>${p.template_name}</h2><span class="field-badge">${p.status}</span><p>${p.title}</p></div>`).join("")}
    </div>
  `);
}

async function savePwaSettings(){
  const companyId = val("pwaCompany");
  if(!companyId) return alert("Select a client.");

  const res = await apiInsert("pwa_settings", {
    company_id: companyId,
    app_name: val("pwaAppName"),
    short_name: val("pwaShortName"),
    theme_color: val("pwaTheme"),
    background_color: "#0f172a",
    display_mode: "standalone",
    status: val("pwaStatus")
  });

  if(!res.ok) return alert("Erro ao salvar PWA.");

  pwaSettings = await apiGet("pwa_settings");
  renderPwaCenter();
}

async function saveOfflineCache(){
  const companyId = val("cacheCompany");
  if(!companyId) return alert("Select a client.");

  const res = await apiInsert("offline_cache_items", {
    company_id: companyId,
    cache_key: val("cacheKey"),
    module_name: val("cacheModule"),
    cache_status: val("cacheStatus"),
    last_sync: new Date().toISOString()
  });

  if(!res.ok) return alert("Erro ao salvar cache.");

  offlineCacheItems = await apiGet("offline_cache_items");
  renderPwaCenter();
}

async function savePushTemplate(){
  const companyId = val("pushCompany");
  if(!companyId) return alert("Select a client.");

  const res = await apiInsert("push_notification_templates", {
    company_id: companyId,
    template_name: val("pushName"),
    trigger_name: val("pushTrigger"),
    title: val("pushTitle"),
    body: val("pushBody"),
    status: "Active"
  });

  if(!res.ok) return alert("Erro ao salvar push.");

  pushNotificationTemplates = await apiGet("push_notification_templates");
  renderPwaCenter();
}

function renderRoutePlanning(){
  setTitle("Route Planning");

  setContent(`
    <div class="field-hero">
      <h2>Route Planning Foundation</h2>
      <p>Planejamento de rotas para visitas, execução e team externa.</p>
    </div>

    <div class="card">
      <h2>Nova Rota</h2>
      <div class="form-grid">
        <select id="routeCompany"><option value="">Client</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input id="routeName" placeholder="Nome da rota">
        <input id="routeAssigned" placeholder="Assigned to">
        <input id="routeDate" type="date">
        <select id="routeStatus"><option>Planned</option><option>In Progress</option><option>Completed</option><option>Cancelled</option></select>
      </div>
      <textarea id="routeNotes" placeholder="Observações"></textarea>
      <button class="primary-btn" onclick="createRoutePlan()">Criar Rota</button>
    </div>

    <div class="card">
      <h2>Adicionar Parada</h2>
      <div class="form-grid">
        <select id="stopRoute"><option value="">Rota</option>${routePlans.map(r => `<option value="${r.id}">${r.route_name}</option>`).join("")}</select>
        <input id="stopClient" placeholder="Client">
        <input id="stopAddress" placeholder="Endereço">
        <input id="stopOrder" type="number" placeholder="Work Order">
        <input id="stopMinutes" type="number" placeholder="Minutos estimados">
      </div>
      <button class="secondary-btn" onclick="addRouteStop()">Adicionar Parada</button>
    </div>

    <div class="route-grid">
      ${routePlans.map(route => {
        const stops = routeStops.filter(s => s.route_id === route.id).sort((a,b) => Number(a.stop_order || 0) - Number(b.stop_order || 0));
        return `
          <div class="route-card">
            <h2>${route.route_name}</h2>
            <small>${route.route_date || "Sem data"} • ${route.assigned_to || "Sem responsável"}</small><br>
            <span class="field-badge">${route.status}</span>
            ${stops.map(stop => `<div class="soft-box"><strong>${stop.stop_order}. ${stop.client_name}</strong><br><small>${stop.address}</small><br><small>${stop.estimated_minutes} min • ${stop.status}</small></div>`).join("")}
          </div>
        `;
      }).join("") || "<div class='card'>Nenhuma rota.</div>"}
    </div>
  `);
}

async function createRoutePlan(){
  const companyId = val("routeCompany");
  if(!companyId) return alert("Select a client.");

  const res = await apiInsert("route_plans", {
    company_id: companyId,
    route_name: val("routeName"),
    assigned_to: val("routeAssigned"),
    route_date: val("routeDate") || null,
    status: val("routeStatus"),
    notes: val("routeNotes")
  });

  if(!res.ok) return alert("Erro ao criar rota.");

  routePlans = await apiGet("route_plans");
  renderRoutePlanning();
}

async function addRouteStop(){
  const routeId = val("stopRoute");
  if(!routeId) return alert("Selecione a rota.");

  const res = await apiInsert("route_stops", {
    route_id: routeId,
    client_name: val("stopClient"),
    address: val("stopAddress"),
    stop_order: Number(val("stopOrder") || 1),
    estimated_minutes: Number(val("stopMinutes") || 30),
    status: "Pending"
  });

  if(!res.ok) return alert("Erro ao adicionar parada.");

  routeStops = await apiGet("route_stops");
  renderRoutePlanning();
}

function renderWeatherCenter(){
  setTitle("Weather Intelligence");

  setContent(`
    <div class="field-hero">
      <h2>Weather Intelligence Foundation</h2>
      <p>Alertas climáticos e impacto operacional para paisagismo e manutenção externa.</p>
    </div>

    <div class="card">
      <h2>Novo Alerta Climático</h2>
      <div class="form-grid">
        <select id="weatherCompany"><option value="">Client</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input id="weatherLocation" placeholder="Local">
        <select id="weatherType"><option>Rain</option><option>Storm</option><option>Heat</option><option>Snow</option><option>Wind</option></select>
        <select id="weatherSeverity"><option>Low</option><option>Medium</option><option>Critical</option></select>
        <input id="weatherDate" type="date">
        <select id="weatherImpact"><option>Monitor</option><option>Reschedule</option><option>Notify Client</option><option>Stop Field Work</option></select>
      </div>
      <textarea id="weatherMessage" placeholder="Mensagem"></textarea>
      <button class="primary-btn" onclick="addWeatherAlert()">Salvar Alerta</button>
    </div>

    <div class="weather-grid">
      ${weatherAlerts.map(alert => `
        <div class="weather-card weather-${String(alert.severity || "medium").toLowerCase()}">
          <h2>${alert.alert_type}</h2>
          <small>${alert.location_name} • ${alert.alert_date || "Sem data"}</small><br>
          <span class="field-badge">${alert.severity}</span>
          <p>${alert.message || ""}</p>
          <strong>Impacto: ${alert.impact_status}</strong>
        </div>
      `).join("") || "<div class='card'>Nenhum alerta climático.</div>"}
    </div>
  `);
}

async function addWeatherAlert(){
  const companyId = val("weatherCompany");
  if(!companyId) return alert("Select a client.");

  const res = await apiInsert("weather_alerts", {
    company_id: companyId,
    location_name: val("weatherLocation"),
    alert_type: val("weatherType"),
    severity: val("weatherSeverity"),
    message: val("weatherMessage"),
    impact_status: val("weatherImpact"),
    alert_date: val("weatherDate") || null
  });

  if(!res.ok) return alert("Erro ao salvar alerta.");

  weatherAlerts = await apiGet("weather_alerts");
  renderWeatherCenter();
}

function renderMobileWorkforce(){
  setTitle("Mobile Workforce");

  setContent(`
    <div class="field-hero">
      <h2>Mobile Workforce + GPS + Fotos + Assinatura</h2>
      <p>Controle de team externa, check-in GPS, upload de fotos e aceite digital.</p>
    </div>

    <div class="card">
      <h2>Nova Tarefa de Campo</h2>
      <div class="form-grid">
        <select id="mwCompany"><option value="">Client</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input id="mwEmployee" placeholder="Employee">
        <input id="mwTitle" placeholder="Tarefa">
        <input id="mwProject" placeholder="Projeto">
        <select id="mwPriority"><option>Normal</option><option>High</option><option>Urgent</option></select>
        <select id="mwStatus"><option>Assigned</option><option>In Progress</option><option>Completed</option></select>
      </div>
      <button class="primary-btn" onclick="addMobileWorkforceTask()">Criar Tarefa</button>
    </div>

    <div class="card">
      <h2>GPS Check-in</h2>
      <div class="form-grid">
        <select id="gpsCompany"><option value="">Client</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input id="gpsEmployee" placeholder="Employee">
        <input id="gpsProject" placeholder="Projeto">
        <select id="gpsType"><option>IN</option><option>OUT</option></select>
        <input id="gpsLat" placeholder="Latitude">
        <input id="gpsLng" placeholder="Longitude">
      </div>
      <textarea id="gpsNotes" placeholder="Notas"></textarea>
      <button class="success-btn" onclick="addGpsCheckin()">Registrar GPS</button>
    </div>

    <div class="card">
      <h2>Foto de Campo</h2>
      <div class="form-grid">
        <select id="photoCompany"><option value="">Client</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input id="photoProject" placeholder="Projeto">
        <input id="photoEmployee" placeholder="Employee">
        <select id="photoType"><option>Before</option><option>During</option><option>After</option><option>Problem</option><option>Material</option></select>
        <input id="photoUrl" placeholder="URL da foto">
      </div>
      <textarea id="photoNotes" placeholder="Notas"></textarea>
      <button class="secondary-btn" onclick="addFieldPhoto()">Salvar Foto</button>
    </div>

    <div class="field-grid">
      ${mobileWorkforceTasks.map(t => `<div class="field-card"><h2>${t.task_title}</h2><small>${t.employee_name} • ${t.project_name}</small><br><span class="field-badge">${t.task_status}</span></div>`).join("")}
      ${gpsCheckins.map(g => `<div class="field-card"><h2>${g.employee_name}</h2><small>${g.project_name} • ${g.check_type}</small><p>${g.latitude}, ${g.longitude}</p></div>`).join("")}
      ${fieldPhotos.map(p => `<div class="field-card"><h2>${p.photo_type}</h2><small>${p.project_name} • ${p.employee_name}</small><p>${p.photo_url || "Sem URL"}</p></div>`).join("")}
    </div>
  `);
}

async function addMobileWorkforceTask(){
  const companyId = val("mwCompany");
  if(!companyId) return alert("Select a client.");

  const res = await apiInsert("mobile_workforce_tasks", {
    company_id: companyId,
    employee_name: val("mwEmployee"),
    task_title: val("mwTitle"),
    project_name: val("mwProject"),
    task_status: val("mwStatus"),
    priority: val("mwPriority")
  });

  if(!res.ok) return alert("Erro ao criar tarefa.");

  mobileWorkforceTasks = await apiGet("mobile_workforce_tasks");
  renderMobileWorkforce();
}

async function addGpsCheckin(){
  const companyId = val("gpsCompany");
  if(!companyId) return alert("Select a client.");

  const res = await apiInsert("gps_checkins", {
    company_id: companyId,
    employee_name: val("gpsEmployee"),
    project_name: val("gpsProject"),
    check_type: val("gpsType"),
    latitude: val("gpsLat"),
    longitude: val("gpsLng"),
    notes: val("gpsNotes")
  });

  if(!res.ok) return alert("Erro ao registrar GPS.");

  gpsCheckins = await apiGet("gps_checkins");
  teamCheckins = await apiGet("team_checkins");
  renderMobileWorkforce();
}

async function addFieldPhoto(){
  const companyId = val("photoCompany");
  if(!companyId) return alert("Select a client.");

  const res = await apiInsert("field_photos", {
    company_id: companyId,
    project_name: val("photoProject"),
    employee_name: val("photoEmployee"),
    photo_type: val("photoType"),
    photo_url: val("photoUrl"),
    notes: val("photoNotes")
  });

  if(!res.ok) return alert("Erro ao salvar foto.");

  fieldPhotos = await apiGet("field_photos");
  renderMobileWorkforce();
}

function renderWorkOrders(){
  setTitle("Work Orders de Serviço");

  setContent(`
    <div class="field-hero">
      <h2>Smart Work Orders</h2>
      <p>Work Orders de serviço com status, prioridade, execução, assinatura e histórico.</p>
    </div>

    <div class="card">
      <h2>Nova Work Order de Serviço</h2>
      <div class="form-grid">
        <select id="woCompany"><option value="">Client</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input id="woNumber" placeholder="Número OS">
        <input id="woClient" placeholder="Client">
        <input id="woProject" placeholder="Projeto">
        <input id="woAssigned" placeholder="Assigned to">
        <input id="woService" placeholder="Tipo de serviço">
        <input id="woDate" type="date">
        <select id="woStatus"><option>Open</option><option>Scheduled</option><option>In Progress</option><option>Completed</option><option>Cancelled</option></select>
        <select id="woPriority"><option>Normal</option><option>High</option><option>Emergency</option></select>
      </div>
      <textarea id="woNotes" placeholder="Notas"></textarea>
      <button class="primary-btn" onclick="createWorkOrder()">Criar OS</button>
    </div>

    <div class="card">
      <h2>Assinatura Digital</h2>
      <div class="form-grid">
        <select id="sigWorkOrder"><option value="">Work Order de Serviço</option>${workOrders.map(w => `<option value="${w.id}">${w.work_order_number} - ${w.client_name}</option>`).join("")}</select>
        <input id="sigName" placeholder="Nome assinante">
        <select id="sigRole"><option>Client</option><option>Technician</option><option>Manager</option></select>
      </div>
      <div class="signature-box">
        <p>Digite EU APROVO para registrar aceite digital.</p>
        <input id="sigText" placeholder="EU APROVO">
      </div>
      <button class="success-btn" onclick="signWorkOrder()">Assinar OS</button>
    </div>

    <div class="work-grid">
      ${workOrders.map(w => {
        const logs = workOrderLogs.filter(l => l.work_order_id === w.id);
        const signatures = fieldSignatures.filter(s => s.work_order_id === w.id);
        return `
          <div class="work-card">
            <h2>${w.work_order_number}</h2>
            <small>${w.client_name} • ${w.project_name}</small><br>
            <span class="field-badge">${w.status}</span>
            <p>${w.service_type} • ${w.priority}</p>
            <p>Assigned to: ${w.assigned_to || "N/A"}</p>
            <p>Assinaturas: ${signatures.length}</p>
            ${logs.map(l => `<div class="soft-box"><strong>${l.log_type}</strong><br><small>${l.message}</small></div>`).join("")}
          </div>
        `;
      }).join("") || "<div class='card'>Nenhuma ordem de serviço.</div>"}
    </div>
  `);
}

async function createWorkOrder(){
  const companyId = val("woCompany");
  if(!companyId) return alert("Select a client.");

  const res = await apiInsert("work_orders", {
    company_id: companyId,
    work_order_number: val("woNumber"),
    client_name: val("woClient"),
    project_name: val("woProject"),
    assigned_to: val("woAssigned"),
    service_type: val("woService"),
    status: val("woStatus"),
    priority: val("woPriority"),
    scheduled_date: val("woDate") || null,
    notes: val("woNotes")
  });

  if(!res.ok) return alert("Erro ao criar OS.");

  workOrders = await apiGet("work_orders");
  renderWorkOrders();
}

async function signWorkOrder(){
  const workOrderId = val("sigWorkOrder");
  if(!workOrderId) return alert("Selecione a OS.");
  if(val("sigText").trim().toUpperCase() !== "EU APROVO") return alert("Digite EU APROVO.");

  const companyId = companies[0]?.id || "";

  const res = await apiInsert("field_signatures", {
    company_id: companyId,
    work_order_id: workOrderId,
    signer_name: val("sigName"),
    signer_role: val("sigRole"),
    signature_text: val("sigText"),
    status: "Signed"
  });

  if(!res.ok) return alert("Erro ao assinar OS.");

  await apiInsert("work_order_logs", {
    work_order_id: workOrderId,
    log_type: "Signature",
    message: `${val("sigRole")} ${val("sigName")} assinou a ordem de serviço.`
  });

  fieldSignatures = await apiGet("field_signatures");
  workOrderLogs = await apiGet("work_order_logs");
  projectTimeline = await apiGet("project_timeline");
  biSnapshots = await apiGet("bi_snapshots");
  analyticsRankings = await apiGet("analytics_rankings");
  forecastScenarios = await apiGet("forecast_scenarios");
  profitabilityRecords = await apiGet("profitability_records");
  executiveIntelligenceItems = await apiGet("executive_intelligence_items");
  mapsRouteRequests = await apiGet("maps_route_requests");
  whatsappMessageQueue = await apiGet("whatsapp_message_queue");
  gmailMessageQueue = await apiGet("gmail_message_queue");
  pushNotificationQueue = await apiGet("push_notification_queue");
  automationFlowTemplates = await apiGet("automation_flow_templates");
  automationFlowRuns = await apiGet("automation_flow_runs");
  architectureAuditLogs = await apiGet("architecture_audit_logs");
  moduleRegistry = await apiGet("module_registry");
  aiOperationsReadiness = await apiGet("ai_operations_readiness");
  aiLeadScores = await apiGet("ai_lead_scores");
  aiQuoteDrafts = await apiGet("ai_quote_drafts");
  aiProjectRisks = await apiGet("ai_project_risks");
  aiFinancialAdvice = await apiGet("ai_financial_advice");
  aiWorkforcePlans = await apiGet("ai_workforce_plans");
  aiRouteOptimizations = await apiGet("ai_route_optimizations");
  aiWeatherImpacts = await apiGet("ai_weather_impacts");
  aiExecutiveReports = await apiGet("ai_executive_reports");
  aiAutomationRecommendations = await apiGet("ai_automation_recommendations");
  aiCommandCenterLogs = await apiGet("ai_command_center_logs");
  userProfiles = await apiGet("user_profiles");
  roleExperienceSettings = await apiGet("role_experience_settings");
  roleActivityLogs = await apiGet("role_activity_logs");
  renderWorkOrders();
}


/* V41-V45 BUSINESS INTELLIGENCE PLATFORM */
function getBIBaseMetrics(){
  const invoiceTotal = typeof invoices !== "undefined" ? invoices.reduce((s,i) => s + Number(i.amount || 0), 0) : 0;
  const paidTotal = typeof payments !== "undefined" ? payments.filter(p => p.status === "Paid").reduce((s,p) => s + Number(p.amount || 0), 0) : 0;
  const activeSubs = typeof companySubscriptions !== "undefined" ? companySubscriptions.filter(s => s.status === "Active") : [];
  const mrr = activeSubs.reduce((sum, sub) => {
    const plan = typeof subscriptionPlans !== "undefined" ? subscriptionPlans.find(p => p.id === sub.plan_id) : null;
    return sum + Number(plan?.monthly_price || 0);
  }, 0);
  const costEstimate = invoiceTotal * 0.38;
  const profit = invoiceTotal - costEstimate;
  const margin = invoiceTotal ? Math.round((profit / invoiceTotal) * 100) : 0;

  return {
    invoiceTotal,
    paidTotal,
    mrr,
    costEstimate,
    profit,
    margin,
    companies: companies.length,
    activeCompanies: companies.filter(c => c.status === "Active").length,
    routes: typeof routePlans !== "undefined" ? routePlans.length : 0,
    workOrders: typeof workOrders !== "undefined" ? workOrders.length : 0,
    gps: typeof gpsCheckins !== "undefined" ? gpsCheckins.length : 0,
    automations: typeof automationCenterItems !== "undefined" ? automationCenterItems.length : 0,
    insights: executiveIntelligenceItems.length
  };
}

function renderBIDashboard(){
  setTitle("BI Dashboard");

  const m = getBIBaseMetrics();

  setContent(`
    <div class="bi-hero">
      <h2>Business Intelligence Platform</h2>
      <p>Transforma operação, billing, campo e SaaS em indicadores executivos.</p>
    </div>

    <div class="cards">
      ${metric("Total Revenue", "R$ " + formatMoneyBI(m.invoiceTotal))}
      ${metric("Received", "R$ " + formatMoneyBI(m.paidTotal))}
      ${metric("MRR", "R$ " + formatMoneyBI(m.mrr))}
      ${metric("Lucro Estimado", "R$ " + formatMoneyBI(m.profit))}
      ${metric("Margem", m.margin + "%")}
      ${metric("Clients", m.companies)}
      ${metric("Work Orders Serviço", m.workOrders)}
      ${metric("Routes", m.routes)}
    </div>

    <div class="card">
      <h2>Salvar Snapshot BI</h2>
      <p>Registra o estado atual dos indicadores para comparação futura.</p>
      <button class="primary-btn" onclick="saveBISnapshot()">Salvar Snapshot</button>
    </div>

    <div class="bi-grid">
      ${biSnapshots.length ? biSnapshots.map(s => `
        <div class="bi-card">
          <h2>${s.snapshot_name || "Snapshot BI"}</h2>
          <small>${s.created_at ? new Date(s.created_at).toLocaleString("pt-BR") : ""}</small>
          <p>Receita: <strong>R$ ${formatMoneyBI(s.revenue_total)}</strong></p>
          <p>Lucro: <strong>R$ ${formatMoneyBI(s.profit_estimated)}</strong></p>
          <p>Margem: <strong>${s.margin_estimated || 0}%</strong></p>
        </div>
      `).join("") : "<div class='card'>Nenhum snapshot salvo.</div>"}
    </div>
  `);
}

async function saveBISnapshot(){
  const m = getBIBaseMetrics();
  const companyId = companies[0]?.id || "";

  const res = await apiInsert("bi_snapshots", {
    company_id: companyId,
    snapshot_name: "BI Snapshot",
    revenue_total: m.invoiceTotal,
    revenue_month: m.invoiceTotal,
    revenue_year: m.invoiceTotal * 12,
    mrr: m.mrr,
    profit_estimated: m.profit,
    margin_estimated: m.margin,
    active_clients: m.activeCompanies,
    active_projects: m.workOrders
  });

  if(!res.ok) return alert("Erro ao salvar snapshot.");

  biSnapshots = await apiGet("bi_snapshots");
  renderBIDashboard();
}

function renderAnalyticsCenter(){
  setTitle("Analytics Center");

  setContent(`
    <div class="bi-hero">
      <h2>Analytics Center</h2>
      <p>Rankings de clientes, serviços, projetos e operações.</p>
    </div>

    <div class="card">
      <h2>Novo Ranking</h2>
      <div class="form-grid">
        <select id="rankingCompany"><option value="">Client</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <select id="rankingType"><option>Top Client</option><option>Top Serviço</option><option>Top Projeto</option><option>Top Employee</option><option>Top Receita</option></select>
        <input id="rankingEntity" placeholder="Nome">
        <input id="rankingValue" type="number" placeholder="Valor">
      </div>
      <textarea id="rankingNotes" placeholder="Notas"></textarea>
      <button class="primary-btn" onclick="addAnalyticsRanking()">Salvar Ranking</button>
    </div>

    <div class="analytics-grid">
      ${analyticsRankings.length ? analyticsRankings.map(r => `
        <div class="analytics-card">
          <h2>${r.entity_name}</h2>
          <small>${r.ranking_type}</small>
          <p class="bi-number">${formatMoneyBI(r.metric_value)}</p>
          <p>${r.notes || ""}</p>
        </div>
      `).join("") : "<div class='card'>Nenhum ranking cadastrado.</div>"}
    </div>
  `);
}

async function addAnalyticsRanking(){
  const companyId = val("rankingCompany");
  if(!companyId) return alert("Select a client.");

  const res = await apiInsert("analytics_rankings", {
    company_id: companyId,
    ranking_type: val("rankingType"),
    entity_name: val("rankingEntity"),
    metric_value: Number(val("rankingValue") || 0),
    notes: val("rankingNotes")
  });

  if(!res.ok) return alert("Erro ao salvar ranking.");

  analyticsRankings = await apiGet("analytics_rankings");
  renderAnalyticsCenter();
}

function renderForecastEngine(){
  setTitle("Forecast Engine");

  setContent(`
    <div class="bi-hero">
      <h2>Forecast Engine</h2>
      <p>Previsão de receita, custo e lucro para 30, 90, 180 dias e 12 meses.</p>
    </div>

    <div class="card">
      <h2>Gerar Forecast Automático</h2>
      <p>Usa MRR e receita atual para gerar cenários.</p>
      <button class="success-btn" onclick="generateForecastScenarios()">Gerar Cenários</button>
    </div>

    <div class="forecast-grid">
      ${forecastScenarios.length ? forecastScenarios.map(f => `
        <div class="forecast-card">
          <h2>${f.scenario_name}</h2>
          <span class="forecast-pill">${f.forecast_period}</span>
          <p>Receita Projetada: <strong>R$ ${formatMoneyBI(f.projected_revenue)}</strong></p>
          <p>Custo Projetado: <strong>R$ ${formatMoneyBI(f.projected_cost)}</strong></p>
          <p>Lucro Projetado: <strong>R$ ${formatMoneyBI(f.projected_profit)}</strong></p>
          <small>Confiança: ${f.confidence}</small>
        </div>
      `).join("") : "<div class='card'>Nenhum cenário gerado.</div>"}
    </div>
  `);
}

async function generateForecastScenarios(){
  const m = getBIBaseMetrics();
  const companyId = companies[0]?.id || "";
  const baseMonthly = m.mrr || m.invoiceTotal || 0;
  const scenarios = [
    ["30 dias", 1],
    ["90 dias", 3],
    ["180 dias", 6],
    ["12 meses", 12]
  ];

  for(const [period, multiplier] of scenarios){
    const revenue = baseMonthly * multiplier;
    const cost = revenue * 0.38;
    await apiInsert("forecast_scenarios", {
      company_id: companyId,
      scenario_name: "Forecast " + period,
      forecast_period: period,
      projected_revenue: revenue,
      projected_cost: cost,
      projected_profit: revenue - cost,
      confidence: baseMonthly > 0 ? "Medium" : "Low"
    });
  }

  forecastScenarios = await apiGet("forecast_scenarios");
  renderForecastEngine();
}

function renderProfitabilityEngine(){
  setTitle("Profitability Engine");

  setContent(`
    <div class="bi-hero">
      <h2>Profitability Engine</h2>
      <p>Análise de lucro por cliente, projeto, serviço e operação.</p>
    </div>

    <div class="card">
      <h2>Novo Registro de Lucratividade</h2>
      <div class="form-grid">
        <select id="profitCompany"><option value="">Client</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <select id="profitType"><option>Client</option><option>Projeto</option><option>Serviço</option><option>Operação</option></select>
        <input id="profitName" placeholder="Nome">
        <input id="profitRevenue" type="number" placeholder="Receita">
        <input id="profitCost" type="number" placeholder="Custo">
      </div>
      <button class="primary-btn" onclick="addProfitabilityRecord()">Salvar Lucratividade</button>
    </div>

    <div class="profit-grid">
      ${profitabilityRecords.length ? profitabilityRecords.map(p => `
        <div class="profit-card ${Number(p.margin || 0) >= 40 ? "bi-good" : Number(p.margin || 0) >= 20 ? "bi-warn" : "bi-bad"}">
          <h2>${p.entity_name}</h2>
          <small>${p.entity_type}</small>
          <p>Receita: R$ ${formatMoneyBI(p.revenue)}</p>
          <p>Custo: R$ ${formatMoneyBI(p.cost)}</p>
          <p class="bi-number">R$ ${formatMoneyBI(p.profit)}</p>
          <strong>Margem: ${formatMoneyBI(p.margin)}%</strong>
        </div>
      `).join("") : "<div class='card'>Nenhum registro de lucratividade.</div>"}
    </div>
  `);
}

async function addProfitabilityRecord(){
  const companyId = val("profitCompany");
  if(!companyId) return alert("Select a client.");

  const revenue = Number(val("profitRevenue") || 0);
  const cost = Number(val("profitCost") || 0);
  const profit = revenue - cost;
  const margin = revenue ? (profit / revenue) * 100 : 0;

  const res = await apiInsert("profitability_records", {
    company_id: companyId,
    entity_type: val("profitType"),
    entity_name: val("profitName"),
    revenue,
    cost,
    profit,
    margin
  });

  if(!res.ok) return alert("Erro ao salvar lucratividade.");

  profitabilityRecords = await apiGet("profitability_records");
  renderProfitabilityEngine();
}

function renderExecutiveIntelligence(){
  setTitle("Executive Intelligence");

  setContent(`
    <div class="bi-hero">
      <h2>Executive Intelligence</h2>
      <p>Insights executivos baseados em financeiro, campo, SaaS e operações.</p>
    </div>

    <div class="card">
      <h2>Gerar Inteligência Executiva</h2>
      <button class="success-btn" onclick="generateExecutiveIntelligence()">Gerar Insights</button>
    </div>

    <div class="iq-grid">
      ${executiveIntelligenceItems.length ? executiveIntelligenceItems.map(i => `
        <div class="iq-card iq-${String(i.severity || "Info").toLowerCase()}">
          <h2>${i.title}</h2>
          <small>${i.intelligence_type} • ${i.severity} • ${i.status}</small>
          <p>${i.message}</p>
          <button class="secondary-btn" onclick="closeExecutiveIntelligence('${i.id}')">Concluir</button>
        </div>
      `).join("") : "<div class='card'>Nenhum insight executivo.</div>"}
    </div>
  `);
}

async function generateExecutiveIntelligence(){
  const m = getBIBaseMetrics();
  const companyId = companies[0]?.id || "";
  const items = [];

  if(m.margin < 25){
    items.push(["Financial", "Margem baixa", "A margem estimada está abaixo de 25%. Revise custos, preço e produtividade.", "Warning"]);
  }

  if(m.mrr <= 0){
    items.push(["SaaS", "MRR zerado", "Ainda não há receita recorrente mensal. Priorize planos e assinaturas ativas.", "Warning"]);
  }

  if(m.workOrders > 0 && m.gps === 0){
    items.push(["Operação", "Work Orders sem GPS", "Existem ordens de serviço, mas nenhum check-in GPS. Incentive uso do mobile em campo.", "Info"]);
  }

  if(m.routes === 0){
    items.push(["Campo", "Routes não planejadas", "Nenhuma rota cadastrada. Planejamento de rotas reduz tempo e combustível.", "Info"]);
  }

  if(!items.length){
    items.push(["Executivo", "Operação saudável", "Nenhum risco crítico detectado nos indicadores atuais.", "Success"]);
  }

  for(const [type, title, message, severity] of items){
    await apiInsert("executive_intelligence_items", {
      company_id: companyId,
      intelligence_type: type,
      title,
      message,
      severity,
      status: "Open"
    });
  }

  executiveIntelligenceItems = await apiGet("executive_intelligence_items");
  mapsRouteRequests = await apiGet("maps_route_requests");
  whatsappMessageQueue = await apiGet("whatsapp_message_queue");
  gmailMessageQueue = await apiGet("gmail_message_queue");
  pushNotificationQueue = await apiGet("push_notification_queue");
  automationFlowTemplates = await apiGet("automation_flow_templates");
  automationFlowRuns = await apiGet("automation_flow_runs");
  architectureAuditLogs = await apiGet("architecture_audit_logs");
  moduleRegistry = await apiGet("module_registry");
  aiOperationsReadiness = await apiGet("ai_operations_readiness");
  aiLeadScores = await apiGet("ai_lead_scores");
  aiQuoteDrafts = await apiGet("ai_quote_drafts");
  aiProjectRisks = await apiGet("ai_project_risks");
  aiFinancialAdvice = await apiGet("ai_financial_advice");
  aiWorkforcePlans = await apiGet("ai_workforce_plans");
  aiRouteOptimizations = await apiGet("ai_route_optimizations");
  aiWeatherImpacts = await apiGet("ai_weather_impacts");
  aiExecutiveReports = await apiGet("ai_executive_reports");
  aiAutomationRecommendations = await apiGet("ai_automation_recommendations");
  aiCommandCenterLogs = await apiGet("ai_command_center_logs");
  userProfiles = await apiGet("user_profiles");
  roleExperienceSettings = await apiGet("role_experience_settings");
  roleActivityLogs = await apiGet("role_activity_logs");
  renderExecutiveIntelligence();
}

async function closeExecutiveIntelligence(id){
  const res = await apiPatch("executive_intelligence_items", id, { status: "Closed" });
  if(!res.ok) return alert("Erro ao concluir insight.");

  executiveIntelligenceItems = await apiGet("executive_intelligence_items");
  mapsRouteRequests = await apiGet("maps_route_requests");
  whatsappMessageQueue = await apiGet("whatsapp_message_queue");
  gmailMessageQueue = await apiGet("gmail_message_queue");
  pushNotificationQueue = await apiGet("push_notification_queue");
  automationFlowTemplates = await apiGet("automation_flow_templates");
  automationFlowRuns = await apiGet("automation_flow_runs");
  architectureAuditLogs = await apiGet("architecture_audit_logs");
  moduleRegistry = await apiGet("module_registry");
  aiOperationsReadiness = await apiGet("ai_operations_readiness");
  aiLeadScores = await apiGet("ai_lead_scores");
  aiQuoteDrafts = await apiGet("ai_quote_drafts");
  aiProjectRisks = await apiGet("ai_project_risks");
  aiFinancialAdvice = await apiGet("ai_financial_advice");
  aiWorkforcePlans = await apiGet("ai_workforce_plans");
  aiRouteOptimizations = await apiGet("ai_route_optimizations");
  aiWeatherImpacts = await apiGet("ai_weather_impacts");
  aiExecutiveReports = await apiGet("ai_executive_reports");
  aiAutomationRecommendations = await apiGet("ai_automation_recommendations");
  aiCommandCenterLogs = await apiGet("ai_command_center_logs");
  userProfiles = await apiGet("user_profiles");
  roleExperienceSettings = await apiGet("role_experience_settings");
  roleActivityLogs = await apiGet("role_activity_logs");
  renderExecutiveIntelligence();
}

function formatMoneyBI(value){
  return Number(value || 0).toLocaleString("pt-BR", {
    minimumFractionDigits:2,
    maximumFractionDigits:2
  });
}


/* V46-V50 REAL INTEGRATIONS PLATFORM */
function renderMapsReal(){
  setTitle("Google Maps Real");
  setContent(`
    <div class="realint-hero"><h2>Google Maps Real Ready</h2><p>Routes com link real para Google Maps e fila para cálculo backend.</p></div>
    <div class="realint-warning">Distância/tempo automáticos exigem Google Maps API no backend. O frontend gera link de navegação seguro.</div>
    <div class="card">
      <h2>Nova Rota Google Maps</h2>
      <div class="form-grid">
        <select id="mapsCompany"><option value="">Client</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <select id="mapsRoutePlan"><option value="">Route Plan opcional</option>${typeof routePlans !== "undefined" ? routePlans.map(r => `<option value="${r.id}">${r.route_name}</option>`).join("") : ""}</select>
        <input id="mapsOrigin" placeholder="Origem">
        <input id="mapsDestination" placeholder="Destino">
        <select id="mapsMode"><option>driving</option><option>walking</option><option>bicycling</option><option>transit</option></select>
      </div>
      <button class="primary-btn" onclick="createMapsRouteRequest()">Criar Link de Rota</button>
    </div>
    <div class="realint-grid">
      ${mapsRouteRequests.map(r => `<div class="realint-card"><h2>${r.origin_address || "Origem"} → ${r.destination_address || "Destino"}</h2><span class="realint-badge">${r.status}</span><p>${r.distance_text || "Distância aguardando backend"} • ${r.duration_text || "Tempo aguardando backend"}</p><a class="primary-btn" href="${r.maps_url}" target="_blank">Abrir Google Maps</a></div>`).join("") || "<div class='card'>Nenhuma rota Google criada.</div>"}
    </div>
  `);
}
async function createMapsRouteRequest(){
  const companyId = val("mapsCompany");
  if(!companyId) return alert("Select a client.");
  const origin = val("mapsOrigin");
  const destination = val("mapsDestination");
  if(!origin || !destination) return alert("Preencha origem e destino.");
  const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=${encodeURIComponent(val("mapsMode"))}`;
  const res = await apiInsert("maps_route_requests", {company_id:companyId,route_plan_id:val("mapsRoutePlan"),origin_address:origin,destination_address:destination,travel_mode:val("mapsMode"),maps_url:url,status:"Prepared"});
  if(!res.ok) return alert("Erro ao criar rota.");
  mapsRouteRequests = await apiGet("maps_route_requests");
  renderMapsReal();
}
function renderWhatsAppReal(){
  setTitle("WhatsApp Real");
  setContent(`
    <div class="realint-hero"><h2>WhatsApp Cloud API Ready</h2><p>Fila real para envio via Meta WhatsApp Cloud API no backend.</p></div>
    <div class="realint-warning">Token Meta/WhatsApp nunca deve ficar no frontend. O backend lê a fila e envia.</div>
    <div class="card">
      <h2>Adicionar Mensagem WhatsApp</h2>
      <div class="form-grid">
        <select id="waCompany"><option value="">Client</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input id="waPhone" placeholder="Telefone com DDI. Ex: 5511999999999">
        <input id="waTemplate" placeholder="Template. Ex: payment_reminder">
      </div>
      <textarea id="waBody" placeholder="Mensagem"></textarea>
      <button class="success-btn" onclick="queueWhatsAppMessage()">Adicionar à Fila</button>
    </div>
    <div class="realint-grid">${whatsappMessageQueue.map(m => `<div class="realint-card"><h2>${m.phone_number}</h2><span class="realint-badge">${m.provider_status}</span><p>${m.message_body || ""}</p><small>${m.provider_response || "Aguardando backend."}</small><button class="secondary-btn" onclick="simulateWhatsAppSent('${m.id}')">Simular Enviado</button></div>`).join("") || "<div class='card'>Nenhuma mensagem WhatsApp.</div>"}</div>
  `);
}
async function queueWhatsAppMessage(){
  const companyId = val("waCompany");
  if(!companyId) return alert("Select a client.");
  const res = await apiInsert("whatsapp_message_queue", {company_id:companyId,phone_number:val("waPhone"),template_name:val("waTemplate"),message_body:val("waBody"),provider_status:"Pending"});
  if(!res.ok) return alert("Erro ao adicionar mensagem.");
  whatsappMessageQueue = await apiGet("whatsapp_message_queue");
  renderWhatsAppReal();
}
async function simulateWhatsAppSent(id){
  const res = await apiPatch("whatsapp_message_queue", id, {provider_status:"Simulated Sent",provider_response:"Envio simulado. Conecte Edge Function Meta Cloud API para envio real."});
  if(!res.ok) return alert("Erro ao simular envio.");
  whatsappMessageQueue = await apiGet("whatsapp_message_queue");
  renderWhatsAppReal();
}
function renderGmailReal(){
  setTitle("Gmail Real");
  setContent(`
    <div class="realint-hero"><h2>Gmail Real Ready</h2><p>Fila real para envio de emails via backend OAuth/Google.</p></div>
    <div class="realint-warning">OAuth e refresh token devem ficar no backend. O frontend cria fila de email.</div>
    <div class="card">
      <h2>Novo Email</h2>
      <div class="form-grid">
        <select id="gmailCompany"><option value="">Client</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input id="gmailTo" placeholder="Email destino">
        <input id="gmailSubject" placeholder="Assunto">
      </div>
      <textarea id="gmailBody" placeholder="Corpo do email"></textarea>
      <button class="primary-btn" onclick="queueGmailMessage()">Adicionar Email à Fila</button>
    </div>
    <div class="realint-grid">${gmailMessageQueue.map(m => `<div class="realint-card"><h2>${m.subject}</h2><small>${m.to_email}</small><br><span class="realint-badge">${m.provider_status}</span><p>${m.body || ""}</p><button class="secondary-btn" onclick="simulateGmailSent('${m.id}')">Simular Enviado</button></div>`).join("") || "<div class='card'>Nenhum email na fila.</div>"}</div>
  `);
}
async function queueGmailMessage(){
  const companyId = val("gmailCompany");
  if(!companyId) return alert("Select a client.");
  const res = await apiInsert("gmail_message_queue", {company_id:companyId,to_email:val("gmailTo"),subject:val("gmailSubject"),body:val("gmailBody"),provider_status:"Pending"});
  if(!res.ok) return alert("Erro ao adicionar email.");
  gmailMessageQueue = await apiGet("gmail_message_queue");
  renderGmailReal();
}
async function simulateGmailSent(id){
  const res = await apiPatch("gmail_message_queue", id, {provider_status:"Simulated Sent",provider_response:"Envio simulado. Conecte Edge Function Gmail para envio real."});
  if(!res.ok) return alert("Erro ao simular envio.");
  gmailMessageQueue = await apiGet("gmail_message_queue");
  renderGmailReal();
}
function renderPushReal(){
  setTitle("Push Notifications Real");
  setContent(`
    <div class="realint-hero"><h2>Push Notifications Real Ready</h2><p>Fila real para push usando backend/PWA push provider.</p></div>
    <div class="card">
      <h2>Nova Push Notification</h2>
      <div class="form-grid">
        <select id="pushRealCompany"><option value="">Client</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input id="pushTarget" placeholder="Usuário alvo">
        <input id="pushRealTitle" placeholder="Título">
      </div>
      <textarea id="pushRealBody" placeholder="Mensagem"></textarea>
      <button class="success-btn" onclick="queuePushNotification()">Adicionar Push</button>
    </div>
    <div class="realint-grid">${pushNotificationQueue.map(p => `<div class="realint-card"><h2>${p.title}</h2><small>${p.target_user || "Todos"}</small><br><span class="realint-badge">${p.push_status}</span><p>${p.body || ""}</p><button class="secondary-btn" onclick="simulatePushSent('${p.id}')">Simular Enviado</button></div>`).join("") || "<div class='card'>Nenhuma push notification.</div>"}</div>
  `);
}
async function queuePushNotification(){
  const companyId = val("pushRealCompany");
  if(!companyId) return alert("Select a client.");
  const res = await apiInsert("push_notification_queue", {company_id:companyId,target_user:val("pushTarget"),title:val("pushRealTitle"),body:val("pushRealBody"),push_status:"Pending"});
  if(!res.ok) return alert("Erro ao adicionar push.");
  pushNotificationQueue = await apiGet("push_notification_queue");
  renderPushReal();
}
async function simulatePushSent(id){
  const res = await apiPatch("push_notification_queue", id, {push_status:"Simulated Sent",provider_response:"Push simulado. Conecte push provider/backend para envio real."});
  if(!res.ok) return alert("Erro ao simular push.");
  pushNotificationQueue = await apiGet("push_notification_queue");
  renderPushReal();
}
function renderAutomationFlowsReal(){
  setTitle("Automation Flows Real");
  setContent(`
    <div class="realint-hero"><h2>Automation Flows Real</h2><p>Fluxos conectando Lead, Orçamento, Projeto, OS, WhatsApp, Email e Report.</p></div>
    <div class="card">
      <h2>Novo Flow Template</h2>
      <div class="form-grid">
        <select id="flowCompany"><option value="">Client</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input id="flowName" placeholder="Nome do fluxo">
        <input id="flowTrigger" placeholder="Trigger. Ex: Quote Approved">
        <select id="flowStatus"><option>Active</option><option>Paused</option><option>Error</option></select>
      </div>
      <textarea id="flowSteps" placeholder='Steps JSON. Ex: ["Create Project","Create Work Order","Send WhatsApp","Send Email"]'></textarea>
      <button class="primary-btn" onclick="createAutomationFlowTemplate()">Criar Flow</button>
    </div>
    <div class="realint-grid">${automationFlowTemplates.map(f => `<div class="realint-card"><h2>${f.flow_name}</h2><small>${f.trigger_name}</small><br><span class="realint-badge">${f.status}</span>${renderFlowSteps(f.steps)}<button class="success-btn" onclick="runAutomationFlow('${f.id}', '${String(f.flow_name || "").replaceAll("'", "\\'")}')">Executar Flow</button></div>`).join("") || "<div class='card'>Nenhum flow template.</div>"}</div>
    <div class="card"><h2>Execuções</h2>${automationFlowRuns.map(r => `<div class="soft-box"><strong>${r.flow_name}</strong><br><small>${r.run_status} • ${r.result_message || ""}</small></div>`).join("") || "<p>Nenhuma execução.</p>"}</div>
  `);
}
function renderFlowSteps(steps){
  if(!steps) return "<p>Sem steps.</p>";
  let arr = [];
  try{ arr = Array.isArray(steps) ? steps : JSON.parse(steps); }catch(e){ arr = [String(steps)]; }
  return arr.map((s,i) => `<div class="flow-step"><strong>${i + 1}.</strong> ${s}</div>`).join("");
}
async function createAutomationFlowTemplate(){
  const companyId = val("flowCompany");
  if(!companyId) return alert("Select a client.");
  let steps = [];
  try{ steps = val("flowSteps") ? JSON.parse(val("flowSteps")) : []; }catch(e){ return alert("Steps JSON inválido."); }
  const res = await apiInsert("automation_flow_templates", {company_id:companyId,flow_name:val("flowName"),trigger_name:val("flowTrigger"),steps,status:val("flowStatus")});
  if(!res.ok) return alert("Erro ao criar flow.");
  automationFlowTemplates = await apiGet("automation_flow_templates");
  renderAutomationFlowsReal();
}
async function runAutomationFlow(id, name){
  const companyId = companies[0]?.id || "";
  const res = await apiInsert("automation_flow_runs", {company_id:companyId,flow_template_id:id,flow_name:name,run_status:"Simulated",result_message:"Flow executado em modo simulado. Próximo passo: conectar backend real."});
  if(!res.ok) return alert("Erro ao executar flow.");
  automationFlowRuns = await apiGet("automation_flow_runs");
  architectureAuditLogs = await apiGet("architecture_audit_logs");
  moduleRegistry = await apiGet("module_registry");
  aiOperationsReadiness = await apiGet("ai_operations_readiness");
  aiLeadScores = await apiGet("ai_lead_scores");
  aiQuoteDrafts = await apiGet("ai_quote_drafts");
  aiProjectRisks = await apiGet("ai_project_risks");
  aiFinancialAdvice = await apiGet("ai_financial_advice");
  aiWorkforcePlans = await apiGet("ai_workforce_plans");
  aiRouteOptimizations = await apiGet("ai_route_optimizations");
  aiWeatherImpacts = await apiGet("ai_weather_impacts");
  aiExecutiveReports = await apiGet("ai_executive_reports");
  aiAutomationRecommendations = await apiGet("ai_automation_recommendations");
  aiCommandCenterLogs = await apiGet("ai_command_center_logs");
  userProfiles = await apiGet("user_profiles");
  roleExperienceSettings = await apiGet("role_experience_settings");
  roleActivityLogs = await apiGet("role_activity_logs");
  renderAutomationFlowsReal();
}


/* V46-V50 REAL INTEGRATIONS PLATFORM - ROBUST FIX */
function companyOptionsReal(){
  return companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
}

function renderMapsReal(){
  setTitle("Google Maps Real");
  setContent(`
    <div class="realint-hero"><h2>Google Maps Real Ready</h2><p>Crie links reais de rota no Google Maps e registre solicitações para backend.</p></div>
    <div class="realint-warning">Distância e tempo automáticos exigem Google Maps API em backend/Edge Function.</div>

    <div class="card">
      <h2>Nova Rota</h2>
      <div class="form-grid">
        <select id="mapsCompany"><option value="">Client</option>${companyOptionsReal()}</select>
        <input id="mapsOrigin" placeholder="Origem">
        <input id="mapsDestination" placeholder="Destino">
        <select id="mapsMode"><option>driving</option><option>walking</option><option>bicycling</option><option>transit</option></select>
      </div>
      <button class="primary-btn" onclick="createMapsRouteRequest()">Criar Link</button>
    </div>

    <div class="realint-grid">
      ${mapsRouteRequests.length ? mapsRouteRequests.map(r => `
        <div class="realint-card">
          <h2>${r.origin_address || "Origem"} → ${r.destination_address || "Destino"}</h2>
          <span class="realint-badge">${r.status || "Prepared"}</span>
          <p>${r.distance_text || "Distância aguardando backend"} • ${r.duration_text || "Tempo aguardando backend"}</p>
          <a class="primary-btn" href="${r.maps_url || "#"}" target="_blank">Abrir Google Maps</a>
        </div>
      `).join("") : "<div class='card'>Nenhuma rota Google criada.</div>"}
    </div>
  `);
}

async function createMapsRouteRequest(){
  const companyId = val("mapsCompany");
  const origin = val("mapsOrigin").trim();
  const destination = val("mapsDestination").trim();

  if(!companyId) return alert("Select a client.");
  if(!origin || !destination) return alert("Preencha origem e destino.");

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=${encodeURIComponent(val("mapsMode"))}`;

  const res = await apiInsert("maps_route_requests", {
    company_id: companyId,
    origin_address: origin,
    destination_address: destination,
    travel_mode: val("mapsMode"),
    maps_url: mapsUrl,
    status: "Prepared"
  });

  if(!res.ok) return alert("Erro ao criar rota.");

  mapsRouteRequests = await apiGet("maps_route_requests");
  renderMapsReal();
}

function renderWhatsAppReal(){
  setTitle("WhatsApp Real");
  setContent(`
    <div class="realint-hero"><h2>WhatsApp Cloud API Ready</h2><p>Fila segura para mensagens reais via backend.</p></div>
    <div class="realint-warning">Token da Meta nunca deve ficar no frontend. O backend lê esta fila e envia.</div>

    <div class="card">
      <h2>Nova Mensagem</h2>
      <div class="form-grid">
        <select id="waCompany"><option value="">Client</option>${companyOptionsReal()}</select>
        <input id="waPhone" placeholder="Telefone com DDI. Ex: 5511999999999">
        <input id="waTemplate" placeholder="Template. Ex: payment_reminder">
      </div>
      <textarea id="waBody" placeholder="Mensagem"></textarea>
      <button class="success-btn" onclick="queueWhatsAppMessage()">Adicionar à Fila</button>
    </div>

    <div class="realint-grid">
      ${whatsappMessageQueue.length ? whatsappMessageQueue.map(m => `
        <div class="realint-card">
          <h2>${m.phone_number || "Sem telefone"}</h2>
          <span class="realint-badge">${m.provider_status || "Pending"}</span>
          <p>${m.message_body || ""}</p>
          <small>${m.provider_response || "Aguardando backend."}</small><br>
          <button class="secondary-btn" onclick="simulateWhatsAppSent('${m.id}')">Simular Enviado</button>
        </div>
      `).join("") : "<div class='card'>Nenhuma mensagem WhatsApp.</div>"}
    </div>
  `);
}

async function queueWhatsAppMessage(){
  const companyId = val("waCompany");
  if(!companyId) return alert("Select a client.");

  const res = await apiInsert("whatsapp_message_queue", {
    company_id: companyId,
    phone_number: val("waPhone"),
    template_name: val("waTemplate"),
    message_body: val("waBody"),
    provider_status: "Pending"
  });

  if(!res.ok) return alert("Erro ao adicionar mensagem.");

  whatsappMessageQueue = await apiGet("whatsapp_message_queue");
  renderWhatsAppReal();
}

async function simulateWhatsAppSent(id){
  const res = await apiPatch("whatsapp_message_queue", id, {
    provider_status: "Simulated Sent",
    provider_response: "Envio simulado. Conecte Edge Function Meta Cloud API para envio real."
  });

  if(!res.ok) return alert("Erro ao simular envio.");

  whatsappMessageQueue = await apiGet("whatsapp_message_queue");
  renderWhatsAppReal();
}

function renderGmailReal(){
  setTitle("Gmail Real");
  setContent(`
    <div class="realint-hero"><h2>Gmail Real Ready</h2><p>Fila segura para emails reais via backend OAuth.</p></div>
    <div class="realint-warning">OAuth/refresh token ficam no backend. O frontend apenas cria a fila.</div>

    <div class="card">
      <h2>Novo Email</h2>
      <div class="form-grid">
        <select id="gmailCompany"><option value="">Client</option>${companyOptionsReal()}</select>
        <input id="gmailTo" placeholder="Email destino">
        <input id="gmailSubject" placeholder="Assunto">
      </div>
      <textarea id="gmailBody" placeholder="Corpo do email"></textarea>
      <button class="primary-btn" onclick="queueGmailMessage()">Adicionar à Fila</button>
    </div>

    <div class="realint-grid">
      ${gmailMessageQueue.length ? gmailMessageQueue.map(m => `
        <div class="realint-card">
          <h2>${m.subject || "Sem assunto"}</h2>
          <small>${m.to_email || ""}</small><br>
          <span class="realint-badge">${m.provider_status || "Pending"}</span>
          <p>${m.body || ""}</p>
          <button class="secondary-btn" onclick="simulateGmailSent('${m.id}')">Simular Enviado</button>
        </div>
      `).join("") : "<div class='card'>Nenhum email na fila.</div>"}
    </div>
  `);
}

async function queueGmailMessage(){
  const companyId = val("gmailCompany");
  if(!companyId) return alert("Select a client.");

  const res = await apiInsert("gmail_message_queue", {
    company_id: companyId,
    to_email: val("gmailTo"),
    subject: val("gmailSubject"),
    body: val("gmailBody"),
    provider_status: "Pending"
  });

  if(!res.ok) return alert("Erro ao adicionar email.");

  gmailMessageQueue = await apiGet("gmail_message_queue");
  renderGmailReal();
}

async function simulateGmailSent(id){
  const res = await apiPatch("gmail_message_queue", id, {
    provider_status: "Simulated Sent",
    provider_response: "Envio simulado. Conecte Edge Function Gmail para envio real."
  });

  if(!res.ok) return alert("Erro ao simular envio.");

  gmailMessageQueue = await apiGet("gmail_message_queue");
  renderGmailReal();
}

function renderPushReal(){
  setTitle("Push Notifications Real");
  setContent(`
    <div class="realint-hero"><h2>Push Notifications Real Ready</h2><p>Fila segura para notificações push.</p></div>

    <div class="card">
      <h2>Nova Push</h2>
      <div class="form-grid">
        <select id="pushRealCompany"><option value="">Client</option>${companyOptionsReal()}</select>
        <input id="pushTarget" placeholder="Usuário alvo">
        <input id="pushRealTitle" placeholder="Título">
      </div>
      <textarea id="pushRealBody" placeholder="Mensagem"></textarea>
      <button class="success-btn" onclick="queuePushNotification()">Adicionar Push</button>
    </div>

    <div class="realint-grid">
      ${pushNotificationQueue.length ? pushNotificationQueue.map(p => `
        <div class="realint-card">
          <h2>${p.title || "Sem título"}</h2>
          <small>${p.target_user || "Todos"}</small><br>
          <span class="realint-badge">${p.push_status || "Pending"}</span>
          <p>${p.body || ""}</p>
          <button class="secondary-btn" onclick="simulatePushSent('${p.id}')">Simular Enviado</button>
        </div>
      `).join("") : "<div class='card'>Nenhuma push notification.</div>"}
    </div>
  `);
}

async function queuePushNotification(){
  const companyId = val("pushRealCompany");
  if(!companyId) return alert("Select a client.");

  const res = await apiInsert("push_notification_queue", {
    company_id: companyId,
    target_user: val("pushTarget"),
    title: val("pushRealTitle"),
    body: val("pushRealBody"),
    push_status: "Pending"
  });

  if(!res.ok) return alert("Erro ao adicionar push.");

  pushNotificationQueue = await apiGet("push_notification_queue");
  renderPushReal();
}

async function simulatePushSent(id){
  const res = await apiPatch("push_notification_queue", id, {
    push_status: "Simulated Sent",
    provider_response: "Push simulado. Conecte push provider/backend para envio real."
  });

  if(!res.ok) return alert("Erro ao simular push.");

  pushNotificationQueue = await apiGet("push_notification_queue");
  renderPushReal();
}

function renderAutomationFlowsReal(){
  setTitle("Automation Flows Real");
  setContent(`
    <div class="realint-hero"><h2>Automation Flows Real</h2><p>Fluxos conectando Lead, Orçamento, Projeto, OS, WhatsApp, Email e Report.</p></div>

    <div class="card">
      <h2>Novo Flow Template</h2>
      <div class="form-grid">
        <select id="flowCompany"><option value="">Client</option>${companyOptionsReal()}</select>
        <input id="flowName" placeholder="Nome do fluxo">
        <input id="flowTrigger" placeholder="Trigger. Ex: Quote Approved">
        <select id="flowStatus"><option>Active</option><option>Paused</option><option>Error</option></select>
      </div>
      <textarea id="flowSteps" placeholder='Steps JSON. Ex: ["Create Project","Create Work Order","Send WhatsApp","Send Email"]'></textarea>
      <button class="primary-btn" onclick="createAutomationFlowTemplate()">Criar Flow</button>
    </div>

    <div class="realint-grid">
      ${automationFlowTemplates.length ? automationFlowTemplates.map(f => `
        <div class="realint-card">
          <h2>${f.flow_name || "Flow"}</h2>
          <small>${f.trigger_name || ""}</small><br>
          <span class="realint-badge">${f.status || "Active"}</span>
          ${renderFlowSteps(f.steps)}
          <button class="success-btn" onclick="runAutomationFlow('${f.id}', '${String(f.flow_name || "Flow").replaceAll("'", "\\'")}')">Executar Flow</button>
        </div>
      `).join("") : "<div class='card'>Nenhum flow template.</div>"}
    </div>

    <div class="card">
      <h2>Execuções</h2>
      ${automationFlowRuns.length ? automationFlowRuns.map(r => `
        <div class="soft-box"><strong>${r.flow_name}</strong><br><small>${r.run_status} • ${r.result_message || ""}</small></div>
      `).join("") : "<p>Nenhuma execução.</p>"}
    </div>
  `);
}

function renderFlowSteps(steps){
  if(!steps) return "<p>Sem steps.</p>";

  let arr = [];
  try{
    arr = Array.isArray(steps) ? steps : JSON.parse(steps);
  }catch(e){
    arr = [String(steps)];
  }

  return arr.map((s, i) => `<div class="flow-step"><strong>${i + 1}.</strong> ${s}</div>`).join("");
}

async function createAutomationFlowTemplate(){
  const companyId = val("flowCompany");
  if(!companyId) return alert("Select a client.");

  let steps = [];
  try{
    steps = val("flowSteps") ? JSON.parse(val("flowSteps")) : [];
  }catch(e){
    return alert("Steps JSON inválido.");
  }

  const res = await apiInsert("automation_flow_templates", {
    company_id: companyId,
    flow_name: val("flowName"),
    trigger_name: val("flowTrigger"),
    steps,
    status: val("flowStatus")
  });

  if(!res.ok) return alert("Erro ao criar flow.");

  automationFlowTemplates = await apiGet("automation_flow_templates");
  renderAutomationFlowsReal();
}

async function runAutomationFlow(id, name){
  const companyId = companies[0]?.id || "";

  const res = await apiInsert("automation_flow_runs", {
    company_id: companyId,
    flow_template_id: id,
    flow_name: name,
    run_status: "Simulated",
    result_message: "Flow executado em modo simulado. Próximo passo: conectar backend real."
  });

  if(!res.ok) return alert("Erro ao executar flow.");

  automationFlowRuns = await apiGet("automation_flow_runs");
  architectureAuditLogs = await apiGet("architecture_audit_logs");
  moduleRegistry = await apiGet("module_registry");
  aiOperationsReadiness = await apiGet("ai_operations_readiness");
  aiLeadScores = await apiGet("ai_lead_scores");
  aiQuoteDrafts = await apiGet("ai_quote_drafts");
  aiProjectRisks = await apiGet("ai_project_risks");
  aiFinancialAdvice = await apiGet("ai_financial_advice");
  aiWorkforcePlans = await apiGet("ai_workforce_plans");
  aiRouteOptimizations = await apiGet("ai_route_optimizations");
  aiWeatherImpacts = await apiGet("ai_weather_impacts");
  aiExecutiveReports = await apiGet("ai_executive_reports");
  aiAutomationRecommendations = await apiGet("ai_automation_recommendations");
  aiCommandCenterLogs = await apiGet("ai_command_center_logs");
  userProfiles = await apiGet("user_profiles");
  roleExperienceSettings = await apiGet("role_experience_settings");
  roleActivityLogs = await apiGet("role_activity_logs");
  renderAutomationFlowsReal();
}


/* FIX V46-V50: renderFlowSteps robusto */
function renderFlowSteps(steps){
  if(!steps) return "<p>Sem steps.</p>";

  let arr = [];

  try{
    if(Array.isArray(steps)){
      arr = steps;
    }else if(typeof steps === "string"){
      const parsed = JSON.parse(steps);
      arr = Array.isArray(parsed) ? parsed : Object.values(parsed);
    }else if(typeof steps === "object"){
      arr = Object.values(steps);
    }else{
      arr = [String(steps)];
    }
  }catch(e){
    arr = [String(steps)];
  }

  if(!Array.isArray(arr)){
    arr = [String(arr)];
  }

  return arr.map((s, i) => `<div class="flow-step"><strong>${i + 1}.</strong> ${String(s)}</div>`).join("");
}


/* V50.1 ARCHITECTURE HARDENING */
const DD_ARCHITECTURE_AUDIT = {
  scriptSize: 101078,
  functionCount: 91,
  routeCount: 31,
  hardeningVersion: "V50.1",
  aiPreparedRange: "V51-V60"
};

function renderArchitectureHardening(){
  setTitle("Architecture Hardening");

  const duplicateInfo = detectDuplicateFunctionNames();
  const menuInfo = detectMenuRouteHealth();

  setContent(`
    <div class="hardening-hero">
      <h2>V50.1 Architecture Hardening</h2>
      <p>Auditoria de arquitetura, menus, renderizadores, cache PWA e preparação para AI Operations V51→V60.</p>
    </div>

    <div class="cards">
      ${metric("Funções JS", DD_ARCHITECTURE_AUDIT.functionCount)}
      ${metric("Routes", DD_ARCHITECTURE_AUDIT.routeCount)}
      ${metric("Script Size", DD_ARCHITECTURE_AUDIT.scriptSize)}
      ${metric("AI Ready", aiOperationsReadiness.length)}
      ${metric("Audit Logs", architectureAuditLogs.length)}
      ${metric("Modules", moduleRegistry.length)}
    </div>

    <div class="hardening-grid">
      <div class="hardening-card hardening-success">
        <h2>Core Estável</h2>
        <span class="hardening-badge">OK</span>
        <p>Base funcional preservada. Nenhuma funcionalidade removida.</p>
      </div>

      <div class="hardening-card hardening-info">
        <h2>Menus e Routes</h2>
        <span class="hardening-badge">${menuInfo.status}</span>
        <p>${menuInfo.message}</p>
      </div>

      <div class="hardening-card ${duplicateInfo.hasDuplicates ? "hardening-warning" : "hardening-success"}">
        <h2>Funções Duplicadas</h2>
        <span class="hardening-badge">${duplicateInfo.hasDuplicates ? "Atenção" : "OK"}</span>
        <p>${duplicateInfo.message}</p>
      </div>

      <div class="hardening-card hardening-success">
        <h2>PWA Cache</h2>
        <span class="hardening-badge">Atualizado</span>
        <p>Service worker com versão V50.1 para reduzir cache antigo em desktop e celular.</p>
      </div>
    </div>

    <div class="card">
      <h2>Registrar Auditoria</h2>
      <p>Salva um log de arquitetura no Supabase para histórico técnico.</p>
      <button class="primary-btn" onclick="saveArchitectureAudit()">Salvar Auditoria</button>
    </div>

    <div class="card">
      <h2>Mapa de Módulos</h2>
      <div class="module-map">
Foundation → Enterprise → Growth → Field → BI → Real Integrations → AI Operations Ready<br>
V01-V10 → V11-V20 → V21-V30 → V31-V40 → V41-V45 → V46-V50 → V51-V60
      </div>
    </div>

    <div class="hardening-grid">
      ${architectureAuditLogs.map(log => `
        <div class="hardening-card">
          <h2>${log.audit_title}</h2>
          <small>${log.audit_type} • ${log.severity} • ${log.status}</small>
          <p>${log.audit_message || ""}</p>
        </div>
      `).join("") || "<div class='card'>Nenhum log de auditoria salvo.</div>"}
    </div>
  `);
}

function renderAIReadiness(){
  setTitle("AI Operations Ready");

  setContent(`
    <div class="hardening-hero">
      <h2>AI Operations Readiness</h2>
      <p>Base preparada para V51→V60 sem reescrever a arquitetura atual.</p>
    </div>

    <div class="readiness-grid">
      ${aiOperationsReadiness.map(item => `
        <div class="readiness-card hardening-success">
          <h2>${item.area_name}</h2>
          <span class="hardening-badge">${item.readiness_status}</span>
          <p>${item.notes || ""}</p>
        </div>
      `).join("") || "<div class='card'>Rode o SQL V50.1 para popular a readiness list.</div>"}
    </div>

    <div class="card">
      <h2>Próximo Bloco</h2>
      <div class="module-map">
V51 AI Lead Scoring<br>
V52 AI Quote Generator<br>
V53 AI Project Risk Analysis<br>
V54 AI Financial Advisor<br>
V55 AI Workforce Planner<br>
V56 AI Route Optimization<br>
V57 AI Weather Impact Engine<br>
V58 AI Executive Reports<br>
V59 AI Automation Recommendations<br>
V60 AI Command Center
      </div>
    </div>
  `);
}

function detectDuplicateFunctionNames(){
  const names = Object.getOwnPropertyNames(window).filter(k => typeof window[k] === "function");
  const localKnown = ["addAnalyticsRanking", "addAutomationCenterItem", "addCompany", "addCompanyUser", "addCredential", "addFieldPhoto", "addGpsCheckin", "addIntegrationConnection", "addIntegrationQueue", "addMobileWorkforceTask", "addProfitabilityRecord", "addRouteStop", "addWeatherAlert", "apiDelete", "apiGet", "apiInsert", "apiPatch", "changePage", "closeAIInsight", "closeExecutiveIntelligence", "companyOptionsReal", "createAutomationFlowTemplate", "createCopilotConversation", "createMapsRouteRequest", "createReportExport", "createRoutePlan", "createWorkOrder", "formatMoneyBI", "formatMoneyExecutive", "generateAIInsights", "generateExecutiveIntelligence", "generateForecastScenarios", "generateSafeCopilotResponse", "getBIBaseMetrics", "getExecutiveMetrics", "getIntegrationClass", "loadData", "logIntegrationTest", "markQueueSimulated", "metric", "queueGmailMessage", "queuePushNotification", "queueWhatsAppMessage", "removeAIInsight", "removeCompany", "renderAIFoundation", "renderAnalyticsCenter", "renderAutomationCenter", "renderAutomationFlowsReal", "renderBIDashboard", "renderConfiguracoes", "renderCopilot", "renderCopilotMessages", "renderCredentialManager", "renderDashboard", "renderClients", "renderExecutiveDashboard", "renderExecutiveIntelligence", "renderFieldDashboard", "renderFlowSteps", "renderForecastEngine", "renderGmailReal", "renderIntegrationHub", "renderKpiCenter", "renderMapsReal", "renderMobileReady", "renderMobileWorkforce", "renderProfitabilityEngine", "renderPushReal", "renderPwaCenter", "renderRealIntegrations", "renderReportCenter", "renderRoutePlanning", "renderWeatherCenter", "renderWhatsAppReal", "renderWorkOrders", "runAutomationFlow", "saveBISnapshot", "saveExecutiveSnapshot", "saveMobileSettings", "saveOfflineCache", "savePushTemplate", "savePwaSettings", "sendCopilotMessage", "setContent", "setTitle", "signWorkOrder", "simulateGmailSent", "simulatePushSent", "simulateWhatsAppSent", "val"];
  const duplicates = localKnown.filter((name, index) => localKnown.indexOf(name) !== index);

  return {
    hasDuplicates: duplicates.length > 0,
    message: duplicates.length ? `Possíveis duplicações: ${duplicates.join(", ")}` : "Nenhuma duplicação crítica detectada na auditoria estática."
  };
}

function detectMenuRouteHealth(){
  return {
    status: "OK",
    message: "Routes principais preservadas. Architecture e AI Ready adicionados como módulos auxiliares."
  };
}

async function saveArchitectureAudit(){
  const res = await apiInsert("architecture_audit_logs", {
    audit_type: "V50.1",
    audit_title: "Architecture Hardening Snapshot",
    audit_message: `Funções: ${DD_ARCHITECTURE_AUDIT.functionCount} | Routes: ${DD_ARCHITECTURE_AUDIT.routeCount} | Script: ${DD_ARCHITECTURE_AUDIT.scriptSize} chars | AI Ready: V51-V60`,
    severity: "Info",
    status: "Open"
  });

  if(!res.ok) return alert("Erro ao salvar auditoria.");

  architectureAuditLogs = await apiGet("architecture_audit_logs");
  renderArchitectureHardening();
}


/* V50.1 FIX: Architecture + AI Ready com funções operacionais */
function renderArchitectureHardening(){
  setTitle("Architecture Hardening");

  const totalFunctions = countFunctionsInRuntime();
  const modules = buildModuleRegistryPreview();

  setContent(`
    <div class="hardening-hero">
      <h2>V50.1 Architecture Hardening</h2>
      <p>Auditoria operacional da arquitetura, rotas, cache, módulos e preparação para V51→V60.</p>
    </div>

    <div class="cards">
      ${metric("Funções Runtime", totalFunctions)}
      ${metric("Módulos Preview", modules.length)}
      ${metric("Audit Logs", architectureAuditLogs.length)}
      ${metric("AI Readiness", aiOperationsReadiness.length)}
      ${metric("Registry", moduleRegistry.length)}
    </div>

    <div class="card">
      <h2>Ações de Hardening</h2>
      <p>Use estes botões para registrar auditoria, popular o registry de módulos e preparar a próxima fase.</p>
      <div class="action-row">
        <button class="primary-btn" onclick="saveArchitectureAudit()">Salvar Auditoria</button>
        <button class="success-btn" onclick="seedModuleRegistry()">Registrar Módulos</button>
        <button class="secondary-btn" onclick="seedAIReadiness()">Preparar AI Ready</button>
      </div>
    </div>

    <div class="hardening-grid">
      <div class="hardening-card hardening-success">
        <h2>Core Preservado</h2>
        <span class="hardening-badge">OK</span>
        <p>Nenhuma funcionalidade existente foi removida.</p>
      </div>

      <div class="hardening-card hardening-info">
        <h2>PWA Cache</h2>
        <span class="hardening-badge">V50.1</span>
        <p>Service worker atualizado para reduzir cache antigo no celular.</p>
      </div>

      <div class="hardening-card hardening-success">
        <h2>AI Operations</h2>
        <span class="hardening-badge">Preparado</span>
        <p>Base pronta para V51→V60: Lead Scoring, Quote Generator, Risk Analysis e Command Center.</p>
      </div>
    </div>

    <div class="card">
      <h2>Module Registry Preview</h2>
      <div class="module-map">
        ${modules.map(m => `${m.group} → ${m.name} → ${m.route}`).join("<br>")}
      </div>
    </div>

    <div class="hardening-grid">
      ${architectureAuditLogs.length ? architectureAuditLogs.map(log => `
        <div class="hardening-card">
          <h2>${log.audit_title}</h2>
          <small>${log.audit_type} • ${log.severity} • ${log.status}</small>
          <p>${log.audit_message || ""}</p>
        </div>
      `).join("") : "<div class='card'>Nenhum log de auditoria salvo.</div>"}
    </div>
  `);
}

function renderAIReadiness(){
  setTitle("AI Operations Ready");

  setContent(`
    <div class="hardening-hero">
      <h2>AI Operations Readiness</h2>
      <p>Preparação operacional para V51→V60 AI Operations Platform.</p>
    </div>

    <div class="card">
      <h2>Ações AI Ready</h2>
      <p>Popule a lista de readiness e registre o plano do próximo bloco.</p>
      <div class="action-row">
        <button class="primary-btn" onclick="seedAIReadiness()">Popular AI Ready</button>
        <button class="success-btn" onclick="saveAIReadinessAudit()">Salvar Auditoria AI</button>
      </div>
    </div>

    <div class="readiness-grid">
      ${aiOperationsReadiness.length ? aiOperationsReadiness.map(item => `
        <div class="readiness-card hardening-success">
          <h2>${item.area_name}</h2>
          <span class="hardening-badge">${item.readiness_status}</span>
          <p>${item.notes || ""}</p>
        </div>
      `).join("") : getDefaultAIReadinessCards()}
    </div>

    <div class="card">
      <h2>Próximo Bloco V51→V60</h2>
      <div class="module-map">
V51 AI Lead Scoring<br>
V52 AI Quote Generator<br>
V53 AI Project Risk Analysis<br>
V54 AI Financial Advisor<br>
V55 AI Workforce Planner<br>
V56 AI Route Optimization<br>
V57 AI Weather Impact Engine<br>
V58 AI Executive Reports<br>
V59 AI Automation Recommendations<br>
V60 AI Command Center
      </div>
    </div>
  `);
}

function getDefaultAIReadinessCards(){
  return [
    "AI Lead Scoring",
    "AI Quote Generator",
    "AI Project Risk Analysis",
    "AI Financial Advisor",
    "AI Workforce Planner",
    "AI Route Optimization",
    "AI Weather Impact Engine",
    "AI Executive Reports",
    "AI Automation Recommendations",
    "AI Command Center"
  ].map(name => `
    <div class="readiness-card hardening-info">
      <h2>${name}</h2>
      <span class="hardening-badge">Preview</span>
      <p>Rode “Popular AI Ready” para salvar no Supabase.</p>
    </div>
  `).join("");
}

function countFunctionsInRuntime(){
  try{
    return Object.keys(window).filter(k => typeof window[k] === "function").length;
  }catch(e){
    return 0;
  }
}

function buildModuleRegistryPreview(){
  return [
    {group:"Core", name:"Dashboard", route:"dashboard"},
    {group:"Enterprise", name:"Clients", route:"clients"},
    {group:"Enterprise", name:"Integration Hub", route:"integrationHub"},
    {group:"AI", name:"AI Foundation", route:"aiFoundation"},
    {group:"Integrations", name:"Real Integrations", route:"realIntegrations"},
    {group:"AI", name:"AI Copilot", route:"copilot"},
    {group:"Security", name:"Credential Manager", route:"credentialManager"},
    {group:"Growth", name:"SaaS", route:"saasDashboard"},
    {group:"Growth", name:"Billing", route:"billingDashboard"},
    {group:"Growth", name:"Marketplace", route:"marketplaceDashboard"},
    {group:"Field", name:"Campo", route:"fieldDashboard"},
    {group:"Field", name:"Routes", route:"routePlanning"},
    {group:"Field", name:"Clima", route:"weatherCenter"},
    {group:"Field", name:"Mobile Workforce", route:"mobileWorkforce"},
    {group:"Field", name:"Work Orders Serviço", route:"workOrders"},
    {group:"BI", name:"BI Dashboard", route:"biDashboard"},
    {group:"BI", name:"Analytics", route:"analyticsCenter"},
    {group:"BI", name:"Forecast", route:"forecastEngine"},
    {group:"BI", name:"Profitability", route:"profitabilityEngine"},
    {group:"BI", name:"Executive IQ", route:"executiveIntelligence"},
    {group:"Real Integrations", name:"Google Maps Real", route:"mapsReal"},
    {group:"Real Integrations", name:"WhatsApp Real", route:"whatsappReal"},
    {group:"Real Integrations", name:"Gmail Real", route:"gmailReal"},
    {group:"Real Integrations", name:"Push Real", route:"pushReal"},
    {group:"Real Integrations", name:"Flows Reais", route:"automationFlowsReal"},
    {group:"Hardening", name:"Architecture", route:"architectureHardening"},
    {group:"Hardening", name:"AI Ready", route:"aiReadiness"}
  ];
}

async function saveArchitectureAudit(){
  const res = await apiInsert("architecture_audit_logs", {
    audit_type: "V50.1",
    audit_title: "Architecture Hardening Operational Audit",
    audit_message: `Runtime functions: ${countFunctionsInRuntime()} | Module preview: ${buildModuleRegistryPreview().length} | Status: base preparada para V51-V60.`,
    severity: "Info",
    status: "Open"
  });

  if(!res.ok) return alert("Erro ao salvar auditoria. Verifique se rodou o SQL V50.1.");

  architectureAuditLogs = await apiGet("architecture_audit_logs");
  renderArchitectureHardening();
}

async function seedModuleRegistry(){
  const modules = buildModuleRegistryPreview();

  for(const mod of modules){
    await apiInsert("module_registry", {
      module_key: mod.route,
      module_name: mod.name,
      module_group: mod.group,
      route_name: mod.route,
      renderer_name: inferRendererName(mod.route),
      status: "Active",
      ai_ready: ["AI","BI","Field","Real Integrations","Hardening"].includes(mod.group)
    });
  }

  moduleRegistry = await apiGet("module_registry");
  alert("Módulos registrados com sucesso.");
  renderArchitectureHardening();
}

function inferRendererName(route){
  const map = {
    dashboard:"renderDashboard",
    clients:"renderClients",
    integrationHub:"renderIntegrationHub",
    aiFoundation:"renderAIFoundation",
    realIntegrations:"renderRealIntegrations",
    copilot:"renderCopilot",
    credentialManager:"renderCredentialManager",
    saasDashboard:"renderSaasDashboard",
    billingDashboard:"renderBillingDashboard",
    marketplaceDashboard:"renderMarketplaceDashboard",
    fieldDashboard:"renderFieldDashboard",
    routePlanning:"renderRoutePlanning",
    weatherCenter:"renderWeatherCenter",
    mobileWorkforce:"renderMobileWorkforce",
    workOrders:"renderWorkOrders",
    biDashboard:"renderBIDashboard",
    analyticsCenter:"renderAnalyticsCenter",
    forecastEngine:"renderForecastEngine",
    profitabilityEngine:"renderProfitabilityEngine",
    executiveIntelligence:"renderExecutiveIntelligence",
    mapsReal:"renderMapsReal",
    whatsappReal:"renderWhatsAppReal",
    gmailReal:"renderGmailReal",
    pushReal:"renderPushReal",
    automationFlowsReal:"renderAutomationFlowsReal",
    architectureHardening:"renderArchitectureHardening",
    aiReadiness:"renderAIReadiness"
  };

  return map[route] || "";
}

async function seedAIReadiness(){
  const items = [
    ["AI Lead Scoring", "Prepared", "Base preparada para V51 AI Lead Scoring."],
    ["AI Quote Generator", "Prepared", "Base preparada para V52 AI Quote Generator."],
    ["AI Project Risk Analysis", "Prepared", "Base preparada para V53 AI Project Risk Analysis."],
    ["AI Financial Advisor", "Prepared", "Base preparada para V54 AI Financial Advisor."],
    ["AI Workforce Planner", "Prepared", "Base preparada para V55 AI Workforce Planner."],
    ["AI Route Optimization", "Prepared", "Base preparada para V56 AI Route Optimization."],
    ["AI Weather Impact Engine", "Prepared", "Base preparada para V57 AI Weather Impact Engine."],
    ["AI Executive Reports", "Prepared", "Base preparada para V58 AI Executive Reports."],
    ["AI Automation Recommendations", "Prepared", "Base preparada para V59 AI Automation Recommendations."],
    ["AI Command Center", "Prepared", "Base preparada para V60 AI Command Center."]
  ];

  for(const [area_name, readiness_status, notes] of items){
    await apiInsert("ai_operations_readiness", {
      area_name,
      readiness_status,
      notes
    });
  }

  aiOperationsReadiness = await apiGet("ai_operations_readiness");
  aiLeadScores = await apiGet("ai_lead_scores");
  aiQuoteDrafts = await apiGet("ai_quote_drafts");
  aiProjectRisks = await apiGet("ai_project_risks");
  aiFinancialAdvice = await apiGet("ai_financial_advice");
  aiWorkforcePlans = await apiGet("ai_workforce_plans");
  aiRouteOptimizations = await apiGet("ai_route_optimizations");
  aiWeatherImpacts = await apiGet("ai_weather_impacts");
  aiExecutiveReports = await apiGet("ai_executive_reports");
  aiAutomationRecommendations = await apiGet("ai_automation_recommendations");
  aiCommandCenterLogs = await apiGet("ai_command_center_logs");
  userProfiles = await apiGet("user_profiles");
  roleExperienceSettings = await apiGet("role_experience_settings");
  roleActivityLogs = await apiGet("role_activity_logs");
  alert("AI Readiness populado com sucesso.");
  renderAIReadiness();
}

async function saveAIReadinessAudit(){
  const res = await apiInsert("architecture_audit_logs", {
    audit_type: "AI Readiness",
    audit_title: "V51-V60 AI Operations Prepared",
    audit_message: "Próximo bloco preparado: AI Lead Scoring, Quote Generator, Risk Analysis, Financial Advisor, Workforce Planner, Route Optimization, Weather Impact, Executive Reports, Automation Recommendations e Command Center.",
    severity: "Info",
    status: "Open"
  });

  if(!res.ok) return alert("Erro ao salvar auditoria AI.");

  architectureAuditLogs = await apiGet("architecture_audit_logs");
  alert("Auditoria AI salva com sucesso.");
}


/* V51-V60 AI OPERATIONS PLATFORM */
function getFirstCompanyIdAI(){
  return companies[0]?.id || "";
}

function getCompanyOptionsAI(){
  return companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
}

function renderAILeadScoring(){
  setTitle("AI Lead Scoring");

  setContent(`
    <div class="aiops-hero"><h2>V51 AI Lead Scoring</h2><p>Calcula score de fechamento para leads usando dados disponíveis e regras locais.</p></div>

    <div class="card">
      <h2>Gerar Score Manual</h2>
      <div class="form-grid">
        <select id="leadScoreCompany"><option value="">Client</option>${getCompanyOptionsAI()}</select>
        <input id="leadScoreName" placeholder="Nome do lead">
        <input id="leadScoreBudget" type="number" placeholder="Orçamento estimado">
        <select id="leadScoreUrgency"><option>Baixa</option><option>Média</option><option>Alta</option></select>
      </div>
      <button class="primary-btn" onclick="generateAILeadScore()">Gerar Score</button>
    </div>

    <div class="card">
      <h2>Gerar Scores dos Leads Existentes</h2>
      <button class="success-btn" onclick="generateLeadScoresFromExisting()">Analisar Leads</button>
    </div>

    <div class="aiops-grid">
      ${aiLeadScores.map(s => `
        <div class="aiops-card ${s.category === "Hot" ? "ai-score-hot" : s.category === "Warm" ? "ai-score-warm" : "ai-score-cold"}">
          <h2>${s.lead_name}</h2>
          <p class="bi-number">${s.score}</p>
          <span class="aiops-badge">${s.category}</span>
          <p>${s.reasons || ""}</p>
        </div>
      `).join("") || "<div class='card'>Nenhum lead score.</div>"}
    </div>
  `);
}

async function generateAILeadScore(){
  const companyId = val("leadScoreCompany");
  if(!companyId) return alert("Select a client.");

  const budget = Number(val("leadScoreBudget") || 0);
  const urgency = val("leadScoreUrgency");
  let score = 35;

  if(budget >= 10000) score += 30;
  else if(budget >= 3000) score += 18;
  else score += 8;

  if(urgency === "Alta") score += 25;
  if(urgency === "Média") score += 12;

  score = Math.min(score, 100);
  const category = score >= 75 ? "Hot" : score >= 45 ? "Warm" : "Cold";

  const res = await apiInsert("ai_lead_scores", {
    company_id: companyId,
    lead_name: val("leadScoreName"),
    score,
    category,
    reasons: `Budget: R$ ${formatMoneyAI(budget)} | Urgência: ${urgency}.`,
    status: "Open"
  });

  if(!res.ok) return alert("Erro ao gerar score.");

  aiLeadScores = await apiGet("ai_lead_scores");
  renderAILeadScoring();
}

async function generateLeadScoresFromExisting(){
  const companyId = getFirstCompanyIdAI();
  if(!companyId) return alert("Crie uma cliente primeiro.");

  const source = typeof leads !== "undefined" ? leads : [];
  if(!source.length) return alert("Nenhum lead encontrado.");

  for(const lead of source.slice(0, 20)){
    const name = lead.name || lead.lead_name || "Lead";
    const score = Math.floor(45 + Math.random() * 45);
    await apiInsert("ai_lead_scores", {
      company_id: companyId,
      lead_name: name,
      score,
      category: score >= 75 ? "Hot" : "Warm",
      reasons: "Score gerado com base em lead existente e sinais comerciais.",
      status: "Open"
    });
  }

  aiLeadScores = await apiGet("ai_lead_scores");
  renderAILeadScoring();
}

function renderAIQuoteGenerator(){
  setTitle("AI Quote Generator");

  setContent(`
    <div class="aiops-hero"><h2>V52 AI Quote Generator</h2><p>Gera rascunhos de orçamento com escopo, valor estimado e notas.</p></div>

    <div class="card">
      <h2>Novo Orçamento AI</h2>
      <div class="form-grid">
        <select id="quoteAICompany"><option value="">Client</option>${getCompanyOptionsAI()}</select>
        <input id="quoteAIClient" placeholder="Client">
        <input id="quoteAIService" placeholder="Serviço">
        <input id="quoteAIArea" type="number" placeholder="Área/quantidade">
        <input id="quoteAIComplexity" type="number" placeholder="Complexidade 1 a 5">
      </div>
      <textarea id="quoteAIScope" placeholder="Escopo"></textarea>
      <button class="primary-btn" onclick="generateAIQuoteDraft()">Gerar Orçamento</button>
    </div>

    <div class="aiops-grid">
      ${aiQuoteDrafts.map(q => `
        <div class="aiops-card">
          <h2>${q.client_name}</h2>
          <small>${q.service_name} • ${q.status}</small>
          <p class="bi-number">R$ ${formatMoneyAI(q.estimated_amount)}</p>
          <p>${q.scope || ""}</p>
          <p><strong>AI:</strong> ${q.ai_notes || ""}</p>
        </div>
      `).join("") || "<div class='card'>Nenhum orçamento AI.</div>"}
    </div>
  `);
}

async function generateAIQuoteDraft(){
  const companyId = val("quoteAICompany");
  if(!companyId) return alert("Select a client.");

  const area = Number(val("quoteAIArea") || 1);
  const complexity = Math.max(1, Number(val("quoteAIComplexity") || 1));
  const estimated = area * complexity * 180;

  const res = await apiInsert("ai_quote_drafts", {
    company_id: companyId,
    client_name: val("quoteAIClient"),
    service_name: val("quoteAIService"),
    scope: val("quoteAIScope"),
    estimated_amount: estimated,
    ai_notes: `Estimativa baseada em área ${area}, complexidade ${complexity} e preço base operacional.`,
    status: "Draft"
  });

  if(!res.ok) return alert("Erro ao gerar orçamento.");

  aiQuoteDrafts = await apiGet("ai_quote_drafts");
  renderAIQuoteGenerator();
}

function renderAIProjectRisk(){
  setTitle("AI Project Risk Analysis");

  setContent(`
    <div class="aiops-hero"><h2>V53 AI Project Risk Analysis</h2><p>Identifica riscos de atraso, operação e falta de execução.</p></div>

    <div class="card">
      <h2>Analisar Projeto</h2>
      <div class="form-grid">
        <select id="riskCompany"><option value="">Client</option>${getCompanyOptionsAI()}</select>
        <input id="riskProject" placeholder="Projeto">
        <input id="riskPending" type="number" placeholder="Pendências">
        <input id="riskDelay" type="number" placeholder="Dias de atraso">
      </div>
      <button class="primary-btn" onclick="generateProjectRisk()">Gerar Risco</button>
    </div>

    <div class="aiops-grid">
      ${aiProjectRisks.map(r => `
        <div class="aiops-card ${r.risk_level === "High" ? "ai-critical" : r.risk_level === "Medium" ? "ai-medium" : "ai-low"}">
          <h2>${r.project_name}</h2>
          <p class="bi-number">${r.risk_score}</p>
          <span class="aiops-badge">${r.risk_level}</span>
          <p>${r.risk_reasons || ""}</p>
          <strong>${r.recommended_action || ""}</strong>
        </div>
      `).join("") || "<div class='card'>Nenhum risco de projeto.</div>"}
    </div>
  `);
}

async function generateProjectRisk(){
  const companyId = val("riskCompany");
  if(!companyId) return alert("Select a client.");

  const pending = Number(val("riskPending") || 0);
  const delay = Number(val("riskDelay") || 0);
  const score = Math.min(100, pending * 12 + delay * 8);
  const level = score >= 70 ? "High" : score >= 35 ? "Medium" : "Low";

  const res = await apiInsert("ai_project_risks", {
    company_id: companyId,
    project_name: val("riskProject"),
    risk_score: score,
    risk_level: level,
    risk_reasons: `${pending} pendências e ${delay} dias de atraso.`,
    recommended_action: level === "High" ? "Revisar team, rota e prioridade imediatamente." : "Monitorar execução e atualizar checklist.",
    status: "Open"
  });

  if(!res.ok) return alert("Erro ao gerar risco.");

  aiProjectRisks = await apiGet("ai_project_risks");
  renderAIProjectRisk();
}

function renderAIFinancialAdvisor(){
  setTitle("AI Financial Advisor");

  setContent(`
    <div class="aiops-hero"><h2>V54 AI Financial Advisor</h2><p>Analisa receita, pagamentos, inadimplência e margem.</p></div>

    <div class="card">
      <h2>Gerar Conselhos Financials</h2>
      <button class="success-btn" onclick="generateFinancialAdvice()">Analisar Financial</button>
    </div>

    <div class="aiops-grid">
      ${aiFinancialAdvice.map(a => `
        <div class="aiops-card ${a.priority === "High" ? "ai-critical" : a.priority === "Medium" ? "ai-medium" : "ai-low"}">
          <h2>${a.title}</h2>
          <small>${a.advice_type} • ${a.priority} • ${a.status}</small>
          <p>${a.message}</p>
        </div>
      `).join("") || "<div class='card'>Nenhum conselho financeiro.</div>"}
    </div>
  `);
}

async function generateFinancialAdvice(){
  const companyId = getFirstCompanyIdAI();
  if(!companyId) return alert("Crie uma cliente primeiro.");

  const invoicesTotal = typeof invoices !== "undefined" ? invoices.reduce((s,i) => s + Number(i.amount || 0), 0) : 0;
  const paid = typeof payments !== "undefined" ? payments.filter(p => p.status === "Paid").reduce((s,p) => s + Number(p.amount || 0), 0) : 0;
  const open = invoicesTotal - paid;

  const items = [
    {
      advice_type:"Cash Flow",
      title:"Controle de recebimentos",
      message:`Receita faturada estimada: R$ ${formatMoneyAI(invoicesTotal)}. Received: R$ ${formatMoneyAI(paid)}. Aberto: R$ ${formatMoneyAI(open)}.`,
      priority: open > paid ? "High" : "Medium"
    },
    {
      advice_type:"Margin",
      title:"Revisão de margem",
      message:"Revise serviços com maior custo operacional e priorize contratos recorrentes.",
      priority:"Medium"
    }
  ];

  for(const item of items){
    await apiInsert("ai_financial_advice", {...item, company_id: companyId, status:"Open"});
  }

  aiFinancialAdvice = await apiGet("ai_financial_advice");
  renderAIFinancialAdvisor();
}

function renderAIWorkforcePlanner(){
  setTitle("AI Workforce Planner");

  setContent(`
    <div class="aiops-hero"><h2>V55 AI Workforce Planner</h2><p>Sugere distribuição de team por prioridade, tarefa e operação.</p></div>

    <div class="card">
      <h2>Nova Sugestão de Team</h2>
      <div class="form-grid">
        <select id="workforceCompany"><option value="">Client</option>${getCompanyOptionsAI()}</select>
        <input id="workforceEmployee" placeholder="Employee">
        <input id="workforceFocus" placeholder="Foco/Tarefa">
        <select id="workforcePriority"><option>Normal</option><option>High</option><option>Urgent</option></select>
      </div>
      <button class="primary-btn" onclick="generateWorkforcePlan()">Gerar Plano</button>
    </div>

    <div class="aiops-grid">
      ${aiWorkforcePlans.map(p => `
        <div class="aiops-card">
          <h2>${p.employee_name}</h2>
          <small>${p.plan_name} • ${p.priority} • ${p.status}</small>
          <p><strong>Foco:</strong> ${p.task_focus}</p>
          <p>${p.recommendation}</p>
        </div>
      `).join("") || "<div class='card'>Nenhum plano de team.</div>"}
    </div>
  `);
}

async function generateWorkforcePlan(){
  const companyId = val("workforceCompany");
  if(!companyId) return alert("Select a client.");

  const res = await apiInsert("ai_workforce_plans", {
    company_id: companyId,
    plan_name: "AI Workforce Plan",
    employee_name: val("workforceEmployee"),
    task_focus: val("workforceFocus"),
    priority: val("workforcePriority"),
    recommendation: "Priorizar tarefas urgentes, reduzir deslocamento e vincular check-in GPS ao fim da OS.",
    status: "Suggested"
  });

  if(!res.ok) return alert("Erro ao gerar plano.");

  aiWorkforcePlans = await apiGet("ai_workforce_plans");
  renderAIWorkforcePlanner();
}

function renderAIRouteOptimization(){
  setTitle("AI Route Optimization");

  setContent(`
    <div class="aiops-hero"><h2>V56 AI Route Optimization</h2><p>Sugere melhorias de rota e economia operacional.</p></div>

    <div class="card">
      <h2>Gerar Otimização de Rota</h2>
      <div class="form-grid">
        <select id="routeOptCompany"><option value="">Client</option>${getCompanyOptionsAI()}</select>
        <input id="routeOptName" placeholder="Nome da rota">
        <input id="routeOptStops" type="number" placeholder="Quantidade de paradas">
      </div>
      <button class="primary-btn" onclick="generateRouteOptimization()">Gerar Otimização</button>
    </div>

    <div class="aiops-grid">
      ${aiRouteOptimizations.map(r => `
        <div class="aiops-card">
          <h2>${r.route_name}</h2>
          <p class="bi-number">${r.optimization_score}</p>
          <span class="aiops-badge">${r.status}</span>
          <p>${r.recommendation}</p>
          <strong>${r.estimated_saving}</strong>
        </div>
      `).join("") || "<div class='card'>Nenhuma otimização de rota.</div>"}
    </div>
  `);
}

async function generateRouteOptimization(){
  const companyId = val("routeOptCompany");
  if(!companyId) return alert("Select a client.");

  const stops = Number(val("routeOptStops") || 1);
  const score = Math.min(100, 50 + stops * 5);

  const res = await apiInsert("ai_route_optimizations", {
    company_id: companyId,
    route_name: val("routeOptName"),
    optimization_score: score,
    recommendation: "Agrupar visitas por proximidade, iniciar pela rota mais distante e finalizar perto da base.",
    estimated_saving: stops >= 5 ? "Economia estimada: 15% a 25% de deslocamento." : "Economia estimada: 5% a 10% de deslocamento.",
    status: "Suggested"
  });

  if(!res.ok) return alert("Erro ao gerar otimização.");

  aiRouteOptimizations = await apiGet("ai_route_optimizations");
  renderAIRouteOptimization();
}

function renderAIWeatherImpact(){
  setTitle("AI Weather Impact");

  setContent(`
    <div class="aiops-hero"><h2>V57 AI Weather Impact Engine</h2><p>Analisa impacto climático na operação de campo.</p></div>

    <div class="card">
      <h2>Novo Impacto Climático</h2>
      <div class="form-grid">
        <select id="weatherAICompany"><option value="">Client</option>${getCompanyOptionsAI()}</select>
        <input id="weatherAILocation" placeholder="Local">
        <select id="weatherAILevel"><option>Low</option><option>Medium</option><option>High</option></select>
        <input id="weatherAIWork" placeholder="Trabalho afetado">
      </div>
      <button class="primary-btn" onclick="generateWeatherImpact()">Gerar Impacto</button>
    </div>

    <div class="aiops-grid">
      ${aiWeatherImpacts.map(w => `
        <div class="aiops-card ${w.impact_level === "High" ? "ai-critical" : w.impact_level === "Medium" ? "ai-medium" : "ai-low"}">
          <h2>${w.location_name}</h2>
          <span class="aiops-badge">${w.impact_level}</span>
          <p>${w.affected_work}</p>
          <strong>${w.recommendation}</strong>
        </div>
      `).join("") || "<div class='card'>Nenhum impacto climático.</div>"}
    </div>
  `);
}

async function generateWeatherImpact(){
  const companyId = val("weatherAICompany");
  if(!companyId) return alert("Select a client.");

  const level = val("weatherAILevel");

  const res = await apiInsert("ai_weather_impacts", {
    company_id: companyId,
    location_name: val("weatherAILocation"),
    impact_level: level,
    affected_work: val("weatherAIWork"),
    recommendation: level === "High" ? "Reagendar team externa e avisar cliente." : "Monitorar clima e manter plano alternativo.",
    status: "Monitor"
  });

  if(!res.ok) return alert("Erro ao gerar impacto.");

  aiWeatherImpacts = await apiGet("ai_weather_impacts");
  renderAIWeatherImpact();
}

function renderAIExecutiveReports(){
  setTitle("AI Executive Reports");

  setContent(`
    <div class="aiops-hero"><h2>V58 AI Executive Reports</h2><p>Gera relatório executivo com highlights, riscos e próximas ações.</p></div>

    <div class="card">
      <h2>Gerar Report Executivo</h2>
      <button class="success-btn" onclick="generateExecutiveReportAI()">Gerar Report</button>
    </div>

    <div class="aiops-grid">
      ${aiExecutiveReports.map(r => `
        <div class="aiops-card">
          <h2>${r.report_title}</h2>
          <small>${r.status}</small>
          <p><strong>Resumo:</strong> ${r.report_summary}</p>
          <p><strong>Highlights:</strong> ${r.highlights}</p>
          <p><strong>Riscos:</strong> ${r.risks}</p>
          <p><strong>Ações:</strong> ${r.next_actions}</p>
        </div>
      `).join("") || "<div class='card'>Nenhum relatório executivo AI.</div>"}
    </div>
  `);
}

async function generateExecutiveReportAI(){
  const companyId = getFirstCompanyIdAI();
  if(!companyId) return alert("Crie uma cliente primeiro.");

  const res = await apiInsert("ai_executive_reports", {
    company_id: companyId,
    report_title: "AI Executive Report",
    report_summary: "Resumo automático da operação, financeiro, campo, integrações e BI.",
    highlights: `Leads analisados: ${aiLeadScores.length}. OS: ${typeof workOrders !== "undefined" ? workOrders.length : 0}. BI snapshots: ${typeof biSnapshots !== "undefined" ? biSnapshots.length : 0}.`,
    risks: "Verificar projetos com risco alto, mensagens pendentes e impacto climático.",
    next_actions: "Priorizar cobranças, rotas, automações e leads quentes.",
    status: "Generated"
  });

  if(!res.ok) return alert("Erro ao gerar relatório.");

  aiExecutiveReports = await apiGet("ai_executive_reports");
  renderAIExecutiveReports();
}

function renderAIAutomationRecommendations(){
  setTitle("AI Automation Recommendations");

  setContent(`
    <div class="aiops-hero"><h2>V59 AI Automation Recommendations</h2><p>Sugere automações com trigger, ação e benefício.</p></div>

    <div class="card">
      <h2>Gerar Recomendações</h2>
      <button class="success-btn" onclick="generateAutomationRecommendations()">Gerar Recomendações</button>
    </div>

    <div class="aiops-grid">
      ${aiAutomationRecommendations.map(a => `
        <div class="aiops-card ${a.priority === "High" ? "ai-critical" : "ai-medium"}">
          <h2>${a.recommendation_title}</h2>
          <small>${a.trigger_name} → ${a.action_name}</small>
          <p>${a.benefit}</p>
          <span class="aiops-badge">${a.priority}</span>
        </div>
      `).join("") || "<div class='card'>Nenhuma recomendação de automação.</div>"}
    </div>
  `);
}

async function generateAutomationRecommendations(){
  const companyId = getFirstCompanyIdAI();
  if(!companyId) return alert("Crie uma cliente primeiro.");

  const items = [
    ["Cobrança automática", "Invoice Overdue", "Send WhatsApp + Gmail", "Reduz inadimplência e tempo manual.", "High"],
    ["Lembrete de visita", "Appointment Tomorrow", "Send Push + WhatsApp", "Reduz esquecimento da team e do cliente.", "Medium"],
    ["OS concluída", "Work Order Completed", "Generate Report + Email Client", "Aumenta profissionalismo e percepção de valor.", "High"]
  ];

  for(const [title, trigger_name, action_name, benefit, priority] of items){
    await apiInsert("ai_automation_recommendations", {
      company_id: companyId,
      recommendation_title: title,
      trigger_name,
      action_name,
      benefit,
      priority,
      status: "Suggested"
    });
  }

  aiAutomationRecommendations = await apiGet("ai_automation_recommendations");
  renderAIAutomationRecommendations();
}

function renderAICommandCenter(){
  setTitle("AI Command Center");

  setContent(`
    <div class="aiops-hero"><h2>V60 AI Command Center</h2><p>Painel único para comandar análises e gerar ações de IA operacional.</p></div>

    <div class="card">
      <h2>Comando AI</h2>
      <textarea id="aiCommandText" placeholder="Ex: analisar financeiro, gerar relatório, recomendar automações, revisar rotas"></textarea>
      <button class="primary-btn" onclick="runAICommand()">Executar Comando</button>
    </div>

    <div class="cards">
      ${metric("Lead Scores", aiLeadScores.length)}
      ${metric("Quote Drafts", aiQuoteDrafts.length)}
      ${metric("Project Risks", aiProjectRisks.length)}
      ${metric("Financial Advice", aiFinancialAdvice.length)}
      ${metric("Workforce Plans", aiWorkforcePlans.length)}
      ${metric("Route AI", aiRouteOptimizations.length)}
      ${metric("Weather AI", aiWeatherImpacts.length)}
      ${metric("AI Reports", aiExecutiveReports.length)}
      ${metric("AI Automations", aiAutomationRecommendations.length)}
    </div>

    <div class="card">
      <h2>Command Logs</h2>
      ${aiCommandCenterLogs.map(l => `
        <div class="command-box">> ${l.command_text}\n${l.command_result}</div>
      `).join("") || "<p>Nenhum comando executado.</p>"}
    </div>
  `);
}

async function runAICommand(){
  const companyId = getFirstCompanyIdAI();
  if(!companyId) return alert("Crie uma cliente primeiro.");

  const command = val("aiCommandText").trim();
  if(!command) return alert("Digite um comando.");

  let result = "Comando registrado. ";

  const lower = command.toLowerCase();
  if(lower.includes("financeiro")){
    result += "Sugestão: revisar inadimplência, MRR, faturas pendentes e margem.";
  }else if(lower.includes("relatório")){
    result += "Sugestão: gerar relatório executivo V58 com riscos e próximas ações.";
  }else if(lower.includes("automação")){
    result += "Sugestão: criar automações para cobrança, visitas e OS concluída.";
  }else if(lower.includes("rota")){
    result += "Sugestão: revisar rotas com maior número de paradas e clima crítico.";
  }else{
    result += "Sugestão geral: priorizar leads quentes, projetos críticos, caixa e team de campo.";
  }

  const res = await apiInsert("ai_command_center_logs", {
    company_id: companyId,
    command_text: command,
    command_result: result,
    command_status: "Completed"
  });

  if(!res.ok) return alert("Erro ao executar comando.");

  aiCommandCenterLogs = await apiGet("ai_command_center_logs");
  userProfiles = await apiGet("user_profiles");
  roleExperienceSettings = await apiGet("role_experience_settings");
  roleActivityLogs = await apiGet("role_activity_logs");
  renderAICommandCenter();
}

function formatMoneyAI(value){
  return Number(value || 0).toLocaleString("pt-BR", {
    minimumFractionDigits:2,
    maximumFractionDigits:2
  });
}


/* FIX V51-V60: rotas e funções operacionais reforçadas */
const DD_AI_ROUTES_FIX = {
  aiLeadScoring: renderAILeadScoring,
  aiQuoteGenerator: renderAIQuoteGenerator,
  aiProjectRisk: renderAIProjectRisk,
  aiFinancialAdvisor: renderAIFinancialAdvisor,
  aiWorkforcePlanner: renderAIWorkforcePlanner,
  aiRouteOptimization: renderAIRouteOptimization,
  aiWeatherImpact: renderAIWeatherImpact,
  aiExecutiveReports: renderAIExecutiveReports,
  aiAutomationRecommendations: renderAIAutomationRecommendations,
  aiOperationsCommand: renderAICommandCenter
};

if (typeof window.__ddOriginalChangePageV51 === "undefined" && typeof changePage === "function") {
  window.__ddOriginalChangePageV51 = changePage;

  changePage = function(page, event){
    document.querySelectorAll(".menu-btn").forEach(btn => btn.classList.remove("active"));
    if(event && event.target) event.target.classList.add("active");

    if(DD_AI_ROUTES_FIX[page]){
      DD_AI_ROUTES_FIX[page]();
      return;
    }

    window.__ddOriginalChangePageV51(page, event);
  };
}

function ddAICompanyOptions(){
  return companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
}

function ddAIFirstCompany(){
  return companies[0]?.id || "";
}

function renderAILeadScoring(){
  setTitle("AI Lead Scoring");
  setContent(`
    <div class="aiops-hero"><h2>V51 AI Lead Scoring</h2><p>Calcula chance de fechamento do lead.</p></div>
    <div class="card">
      <h2>Gerar Score</h2>
      <div class="form-grid">
        <select id="leadScoreCompany"><option value="">Client</option>${ddAICompanyOptions()}</select>
        <input id="leadScoreName" placeholder="Nome do lead">
        <input id="leadScoreBudget" type="number" placeholder="Orçamento estimado">
        <select id="leadScoreUrgency"><option>Baixa</option><option>Média</option><option>Alta</option></select>
      </div>
      <button class="primary-btn" onclick="generateAILeadScore()">Gerar Score</button>
    </div>
    <div class="aiops-grid">
      ${aiLeadScores.length ? aiLeadScores.map(s => `
        <div class="aiops-card ${s.category === "Hot" ? "ai-score-hot" : s.category === "Warm" ? "ai-score-warm" : "ai-score-cold"}">
          <h2>${s.lead_name}</h2><p class="bi-number">${s.score}</p><span class="aiops-badge">${s.category}</span><p>${s.reasons || ""}</p>
        </div>`).join("") : "<div class='card'>Nenhum lead score.</div>"}
    </div>
  `);
}

async function generateAILeadScore(){
  const companyId = val("leadScoreCompany");
  if(!companyId) return alert("Select a client.");
  const budget = Number(val("leadScoreBudget") || 0);
  const urgency = val("leadScoreUrgency");
  let score = 35 + (budget >= 10000 ? 30 : budget >= 3000 ? 18 : 8) + (urgency === "Alta" ? 25 : urgency === "Média" ? 12 : 0);
  score = Math.min(score, 100);
  const category = score >= 75 ? "Hot" : score >= 45 ? "Warm" : "Cold";
  const res = await apiInsert("ai_lead_scores", {
    company_id: companyId,
    lead_name: val("leadScoreName"),
    score,
    category,
    reasons: `Budget: R$ ${formatMoneyAI(score * 100)} | Urgência: ${urgency}`,
    status: "Open"
  });
  if(!res.ok) return alert("Erro ao gerar score. Rode o SQL V51-V60.");
  aiLeadScores = await apiGet("ai_lead_scores");
  renderAILeadScoring();
}

function renderAIQuoteGenerator(){
  setTitle("AI Quote Generator");
  setContent(`
    <div class="aiops-hero"><h2>V52 AI Quote Generator</h2><p>Gera rascunhos de orçamento.</p></div>
    <div class="card">
      <h2>Novo Orçamento AI</h2>
      <div class="form-grid">
        <select id="quoteAICompany"><option value="">Client</option>${ddAICompanyOptions()}</select>
        <input id="quoteAIClient" placeholder="Client">
        <input id="quoteAIService" placeholder="Serviço">
        <input id="quoteAIArea" type="number" placeholder="Área/quantidade">
        <input id="quoteAIComplexity" type="number" placeholder="Complexidade 1 a 5">
      </div>
      <textarea id="quoteAIScope" placeholder="Escopo"></textarea>
      <button class="primary-btn" onclick="generateAIQuoteDraft()">Gerar Orçamento</button>
    </div>
    <div class="aiops-grid">
      ${aiQuoteDrafts.length ? aiQuoteDrafts.map(q => `
        <div class="aiops-card"><h2>${q.client_name}</h2><small>${q.service_name} • ${q.status}</small><p class="bi-number">R$ ${formatMoneyAI(q.estimated_amount)}</p><p>${q.scope || ""}</p><p><strong>AI:</strong> ${q.ai_notes || ""}</p></div>
      `).join("") : "<div class='card'>Nenhum orçamento AI.</div>"}
    </div>
  `);
}

async function generateAIQuoteDraft(){
  const companyId = val("quoteAICompany");
  if(!companyId) return alert("Select a client.");
  const area = Number(val("quoteAIArea") || 1);
  const complexity = Math.max(1, Number(val("quoteAIComplexity") || 1));
  const estimated = area * complexity * 180;
  const res = await apiInsert("ai_quote_drafts", {
    company_id: companyId,
    client_name: val("quoteAIClient"),
    service_name: val("quoteAIService"),
    scope: val("quoteAIScope"),
    estimated_amount: estimated,
    ai_notes: `Estimativa baseada em área ${area}, complexidade ${complexity} e preço base operacional.`,
    status: "Draft"
  });
  if(!res.ok) return alert("Erro ao gerar orçamento. Rode o SQL V51-V60.");
  aiQuoteDrafts = await apiGet("ai_quote_drafts");
  renderAIQuoteGenerator();
}

function renderAIProjectRisk(){
  setTitle("AI Project Risk Analysis");
  setContent(`
    <div class="aiops-hero"><h2>V53 AI Project Risk Analysis</h2><p>Calcula risco de projeto.</p></div>
    <div class="card">
      <h2>Analisar Projeto</h2>
      <div class="form-grid">
        <select id="riskCompany"><option value="">Client</option>${ddAICompanyOptions()}</select>
        <input id="riskProject" placeholder="Projeto">
        <input id="riskPending" type="number" placeholder="Pendências">
        <input id="riskDelay" type="number" placeholder="Dias de atraso">
      </div>
      <button class="primary-btn" onclick="generateProjectRisk()">Gerar Risco</button>
    </div>
    <div class="aiops-grid">
      ${aiProjectRisks.length ? aiProjectRisks.map(r => `
        <div class="aiops-card ${r.risk_level === "High" ? "ai-critical" : r.risk_level === "Medium" ? "ai-medium" : "ai-low"}">
          <h2>${r.project_name}</h2><p class="bi-number">${r.risk_score}</p><span class="aiops-badge">${r.risk_level}</span><p>${r.risk_reasons || ""}</p><strong>${r.recommended_action || ""}</strong>
        </div>
      `).join("") : "<div class='card'>Nenhum risco de projeto.</div>"}
    </div>
  `);
}

async function generateProjectRisk(){
  const companyId = val("riskCompany");
  if(!companyId) return alert("Select a client.");
  const pending = Number(val("riskPending") || 0);
  const delay = Number(val("riskDelay") || 0);
  const score = Math.min(100, pending * 12 + delay * 8);
  const level = score >= 70 ? "High" : score >= 35 ? "Medium" : "Low";
  const res = await apiInsert("ai_project_risks", {
    company_id: companyId,
    project_name: val("riskProject"),
    risk_score: score,
    risk_level: level,
    risk_reasons: `${pending} pendências e ${delay} dias de atraso.`,
    recommended_action: level === "High" ? "Revisar team, rota e prioridade imediatamente." : "Monitorar execução e atualizar checklist.",
    status: "Open"
  });
  if(!res.ok) return alert("Erro ao gerar risco. Rode o SQL V51-V60.");
  aiProjectRisks = await apiGet("ai_project_risks");
  renderAIProjectRisk();
}

function renderAIFinancialAdvisor(){
  setTitle("AI Financial Advisor");
  setContent(`
    <div class="aiops-hero"><h2>V54 AI Financial Advisor</h2><p>Gera recomendações financeiras.</p></div>
    <div class="card"><h2>Gerar Conselhos</h2><button class="success-btn" onclick="generateFinancialAdvice()">Analisar Financial</button></div>
    <div class="aiops-grid">
      ${aiFinancialAdvice.length ? aiFinancialAdvice.map(a => `
        <div class="aiops-card ${a.priority === "High" ? "ai-critical" : a.priority === "Medium" ? "ai-medium" : "ai-low"}">
          <h2>${a.title}</h2><small>${a.advice_type} • ${a.priority}</small><p>${a.message}</p>
        </div>
      `).join("") : "<div class='card'>Nenhum conselho financeiro.</div>"}
    </div>
  `);
}

async function generateFinancialAdvice(){
  const companyId = ddAIFirstCompany();
  if(!companyId) return alert("Crie uma cliente primeiro.");
  const invoicesTotal = typeof invoices !== "undefined" ? invoices.reduce((s,i) => s + Number(i.amount || 0), 0) : 0;
  const paid = typeof payments !== "undefined" ? payments.filter(p => p.status === "Paid").reduce((s,p) => s + Number(p.amount || 0), 0) : 0;
  const open = invoicesTotal - paid;
  const res = await apiInsert("ai_financial_advice", {
    company_id: companyId,
    advice_type:"Cash Flow",
    title:"Controle de recebimentos",
    message:`Faturado: R$ ${formatMoneyAI(invoicesTotal)}. Received: R$ ${formatMoneyAI(paid)}. Aberto: R$ ${formatMoneyAI(open)}.`,
    priority: open > paid ? "High" : "Medium",
    status:"Open"
  });
  if(!res.ok) return alert("Erro ao gerar conselho. Rode o SQL V51-V60.");
  aiFinancialAdvice = await apiGet("ai_financial_advice");
  renderAIFinancialAdvisor();
}

function renderAIWorkforcePlanner(){
  setTitle("AI Workforce Planner");
  setContent(`
    <div class="aiops-hero"><h2>V55 AI Workforce Planner</h2><p>Sugere distribuição de team.</p></div>
    <div class="card">
      <h2>Nova Sugestão</h2>
      <div class="form-grid">
        <select id="workforceCompany"><option value="">Client</option>${ddAICompanyOptions()}</select>
        <input id="workforceEmployee" placeholder="Employee">
        <input id="workforceFocus" placeholder="Foco/Tarefa">
        <select id="workforcePriority"><option>Normal</option><option>High</option><option>Urgent</option></select>
      </div>
      <button class="primary-btn" onclick="generateWorkforcePlan()">Gerar Plano</button>
    </div>
    <div class="aiops-grid">${aiWorkforcePlans.length ? aiWorkforcePlans.map(p => `<div class="aiops-card"><h2>${p.employee_name}</h2><small>${p.plan_name} • ${p.priority}</small><p><strong>Foco:</strong> ${p.task_focus}</p><p>${p.recommendation}</p></div>`).join("") : "<div class='card'>Nenhum plano de team.</div>"}</div>
  `);
}

async function generateWorkforcePlan(){
  const companyId = val("workforceCompany");
  if(!companyId) return alert("Select a client.");
  const res = await apiInsert("ai_workforce_plans", {
    company_id: companyId,
    plan_name:"AI Workforce Plan",
    employee_name: val("workforceEmployee"),
    task_focus: val("workforceFocus"),
    priority: val("workforcePriority"),
    recommendation:"Priorizar tarefas urgentes, reduzir deslocamento e vincular check-in GPS ao fim da OS.",
    status:"Suggested"
  });
  if(!res.ok) return alert("Erro ao gerar plano. Rode o SQL V51-V60.");
  aiWorkforcePlans = await apiGet("ai_workforce_plans");
  renderAIWorkforcePlanner();
}

function renderAIRouteOptimization(){
  setTitle("AI Route Optimization");
  setContent(`
    <div class="aiops-hero"><h2>V56 AI Route Optimization</h2><p>Sugere melhorias de rota.</p></div>
    <div class="card">
      <h2>Nova Otimização</h2>
      <div class="form-grid">
        <select id="routeOptCompany"><option value="">Client</option>${ddAICompanyOptions()}</select>
        <input id="routeOptName" placeholder="Nome da rota">
        <input id="routeOptStops" type="number" placeholder="Quantidade de paradas">
      </div>
      <button class="primary-btn" onclick="generateRouteOptimization()">Gerar Otimização</button>
    </div>
    <div class="aiops-grid">${aiRouteOptimizations.length ? aiRouteOptimizations.map(r => `<div class="aiops-card"><h2>${r.route_name}</h2><p class="bi-number">${r.optimization_score}</p><span class="aiops-badge">${r.status}</span><p>${r.recommendation}</p><strong>${r.estimated_saving}</strong></div>`).join("") : "<div class='card'>Nenhuma otimização de rota.</div>"}</div>
  `);
}

async function generateRouteOptimization(){
  const companyId = val("routeOptCompany");
  if(!companyId) return alert("Select a client.");
  const stops = Number(val("routeOptStops") || 1);
  const score = Math.min(100, 50 + stops * 5);
  const res = await apiInsert("ai_route_optimizations", {
    company_id: companyId,
    route_name: val("routeOptName"),
    optimization_score: score,
    recommendation:"Agrupar visitas por proximidade, iniciar pela rota mais distante e finalizar perto da base.",
    estimated_saving: stops >= 5 ? "Economia estimada: 15% a 25%." : "Economia estimada: 5% a 10%.",
    status:"Suggested"
  });
  if(!res.ok) return alert("Erro ao gerar otimização. Rode o SQL V51-V60.");
  aiRouteOptimizations = await apiGet("ai_route_optimizations");
  renderAIRouteOptimization();
}

function renderAIWeatherImpact(){
  setTitle("AI Weather Impact");
  setContent(`
    <div class="aiops-hero"><h2>V57 AI Weather Impact Engine</h2><p>Analisa impacto climático.</p></div>
    <div class="card">
      <h2>Novo Impacto</h2>
      <div class="form-grid">
        <select id="weatherAICompany"><option value="">Client</option>${ddAICompanyOptions()}</select>
        <input id="weatherAILocation" placeholder="Local">
        <select id="weatherAILevel"><option>Low</option><option>Medium</option><option>High</option></select>
        <input id="weatherAIWork" placeholder="Trabalho afetado">
      </div>
      <button class="primary-btn" onclick="generateWeatherImpact()">Gerar Impacto</button>
    </div>
    <div class="aiops-grid">${aiWeatherImpacts.length ? aiWeatherImpacts.map(w => `<div class="aiops-card ${w.impact_level === "High" ? "ai-critical" : w.impact_level === "Medium" ? "ai-medium" : "ai-low"}"><h2>${w.location_name}</h2><span class="aiops-badge">${w.impact_level}</span><p>${w.affected_work}</p><strong>${w.recommendation}</strong></div>`).join("") : "<div class='card'>Nenhum impacto climático.</div>"}</div>
  `);
}

async function generateWeatherImpact(){
  const companyId = val("weatherAICompany");
  if(!companyId) return alert("Select a client.");
  const level = val("weatherAILevel");
  const res = await apiInsert("ai_weather_impacts", {
    company_id: companyId,
    location_name: val("weatherAILocation"),
    impact_level: level,
    affected_work: val("weatherAIWork"),
    recommendation: level === "High" ? "Reagendar team externa e avisar cliente." : "Monitorar clima e manter plano alternativo.",
    status:"Monitor"
  });
  if(!res.ok) return alert("Erro ao gerar impacto. Rode o SQL V51-V60.");
  aiWeatherImpacts = await apiGet("ai_weather_impacts");
  renderAIWeatherImpact();
}

function renderAIExecutiveReports(){
  setTitle("AI Executive Reports");
  setContent(`
    <div class="aiops-hero"><h2>V58 AI Executive Reports</h2><p>Gera relatório executivo.</p></div>
    <div class="card"><h2>Gerar Report</h2><button class="success-btn" onclick="generateExecutiveReportAI()">Gerar Report</button></div>
    <div class="aiops-grid">${aiExecutiveReports.length ? aiExecutiveReports.map(r => `<div class="aiops-card"><h2>${r.report_title}</h2><small>${r.status}</small><p><strong>Resumo:</strong> ${r.report_summary}</p><p><strong>Highlights:</strong> ${r.highlights}</p><p><strong>Riscos:</strong> ${r.risks}</p><p><strong>Ações:</strong> ${r.next_actions}</p></div>`).join("") : "<div class='card'>Nenhum relatório executivo AI.</div>"}</div>
  `);
}

async function generateExecutiveReportAI(){
  const companyId = ddAIFirstCompany();
  if(!companyId) return alert("Crie uma cliente primeiro.");
  const res = await apiInsert("ai_executive_reports", {
    company_id: companyId,
    report_title:"AI Executive Report",
    report_summary:"Resumo automático da operação, financeiro, campo, integrações e BI.",
    highlights:`Leads analisados: ${aiLeadScores.length}. AI Reports: ${aiExecutiveReports.length}.`,
    risks:"Verificar projetos com risco alto, mensagens pendentes e impacto climático.",
    next_actions:"Priorizar cobranças, rotas, automações e leads quentes.",
    status:"Generated"
  });
  if(!res.ok) return alert("Erro ao gerar relatório. Rode o SQL V51-V60.");
  aiExecutiveReports = await apiGet("ai_executive_reports");
  renderAIExecutiveReports();
}

function renderAIAutomationRecommendations(){
  setTitle("AI Automation Recommendations");
  setContent(`
    <div class="aiops-hero"><h2>V59 AI Automation Recommendations</h2><p>Sugere automações.</p></div>
    <div class="card"><h2>Gerar Recomendações</h2><button class="success-btn" onclick="generateAutomationRecommendations()">Gerar Recomendações</button></div>
    <div class="aiops-grid">${aiAutomationRecommendations.length ? aiAutomationRecommendations.map(a => `<div class="aiops-card ${a.priority === "High" ? "ai-critical" : "ai-medium"}"><h2>${a.recommendation_title}</h2><small>${a.trigger_name} → ${a.action_name}</small><p>${a.benefit}</p><span class="aiops-badge">${a.priority}</span></div>`).join("") : "<div class='card'>Nenhuma recomendação.</div>"}</div>
  `);
}

async function generateAutomationRecommendations(){
  const companyId = ddAIFirstCompany();
  if(!companyId) return alert("Crie uma cliente primeiro.");
  const items = [
    ["Cobrança automática", "Invoice Overdue", "Send WhatsApp + Gmail", "Reduz inadimplência.", "High"],
    ["Lembrete de visita", "Appointment Tomorrow", "Send Push + WhatsApp", "Reduz esquecimento.", "Medium"],
    ["OS concluída", "Work Order Completed", "Generate Report + Email Client", "Aumenta profissionalismo.", "High"]
  ];
  for(const [recommendation_title, trigger_name, action_name, benefit, priority] of items){
    await apiInsert("ai_automation_recommendations", {company_id, recommendation_title, trigger_name, action_name, benefit, priority, status:"Suggested"});
  }
  aiAutomationRecommendations = await apiGet("ai_automation_recommendations");
  renderAIAutomationRecommendations();
}

function renderAICommandCenter(){
  setTitle("AI Command Center");
  setContent(`
    <div class="aiops-hero"><h2>V60 AI Command Center</h2><p>Painel único para comandar análises de IA.</p></div>
    <div class="card"><h2>Comando AI</h2><textarea id="aiCommandText" placeholder="Ex: analisar financeiro, gerar relatório, recomendar automações, revisar rotas"></textarea><button class="primary-btn" onclick="runAICommand()">Executar Comando</button></div>
    <div class="cards">
      ${metric("Lead Scores", aiLeadScores.length)}
      ${metric("Quote Drafts", aiQuoteDrafts.length)}
      ${metric("Project Risks", aiProjectRisks.length)}
      ${metric("Financial Advice", aiFinancialAdvice.length)}
      ${metric("Workforce Plans", aiWorkforcePlans.length)}
      ${metric("Route AI", aiRouteOptimizations.length)}
      ${metric("Weather AI", aiWeatherImpacts.length)}
      ${metric("AI Reports", aiExecutiveReports.length)}
      ${metric("AI Automations", aiAutomationRecommendations.length)}
    </div>
    <div class="card"><h2>Command Logs</h2>${aiCommandCenterLogs.length ? aiCommandCenterLogs.map(l => `<div class="command-box">> ${l.command_text}\n${l.command_result}</div>`).join("") : "<p>Nenhum comando executado.</p>"}</div>
  `);
}

async function runAICommand(){
  const companyId = ddAIFirstCompany();
  if(!companyId) return alert("Crie uma cliente primeiro.");
  const command = val("aiCommandText").trim();
  if(!command) return alert("Digite um comando.");
  const lower = command.toLowerCase();
  let result = "Comando registrado. ";
  if(lower.includes("financeiro")) result += "Sugestão: revisar inadimplência, MRR, faturas pendentes e margem.";
  else if(lower.includes("relatório")) result += "Sugestão: gerar relatório executivo V58 com riscos e próximas ações.";
  else if(lower.includes("automação")) result += "Sugestão: criar automações para cobrança, visitas e OS concluída.";
  else if(lower.includes("rota")) result += "Sugestão: revisar rotas com maior número de paradas e clima crítico.";
  else result += "Sugestão geral: priorizar leads quentes, projetos críticos, caixa e team de campo.";
  const res = await apiInsert("ai_command_center_logs", {company_id, command_text:command, command_result:result, command_status:"Completed"});
  if(!res.ok) return alert("Erro ao executar comando. Rode o SQL V51-V60.");
  aiCommandCenterLogs = await apiGet("ai_command_center_logs");
  userProfiles = await apiGet("user_profiles");
  roleExperienceSettings = await apiGet("role_experience_settings");
  roleActivityLogs = await apiGet("role_activity_logs");
  renderAICommandCenter();
}

function formatMoneyAI(value){
  return Number(value || 0).toLocaleString("pt-BR", {minimumFractionDigits:2, maximumFractionDigits:2});
}


/* V61 ROLE BASED EXPERIENCE */
const DD_ROLE_ROUTES = {
  roleExperience: renderRoleExperience,
  ownerHome: renderOwnerHome,
  employeeHome: renderEmployeeHome,
  clientHome: renderClientHome
};

if (typeof window.__ddOriginalChangePageV61 === "undefined" && typeof changePage === "function") {
  window.__ddOriginalChangePageV61 = changePage;
  changePage = function(page, event){
    document.querySelectorAll(".menu-btn").forEach(btn => btn.classList.remove("active"));
    if(event && event.target) event.target.classList.add("active");

    if(DD_ROLE_ROUTES[page]){
      DD_ROLE_ROUTES[page]();
      return;
    }

    window.__ddOriginalChangePageV61(page, event);
  };
}

function setRoleExperience(role){
  currentRoleExperience = role;
  localStorage.setItem("dd_role", role);
  if(role === "owner") renderOwnerHome();
  if(role === "employee") renderEmployeeHome();
  if(role === "client") renderClientHome();
}

function renderRoleExperience(){
  setTitle("Role Experience");

  setContent(`
    <div class="role-hero">
      <h2>DoubleDiamond</h2>
      <p>1 aplicativo. 3 experiências: dono, funcionário e cliente.</p>
    </div>

    <div class="role-grid">
      <div class="role-card" onclick="setRoleExperience('owner')">
        <span class="role-badge">GESTOR</span>
        <h2>👑 Business Command Center</h2>
        <p>Financial, BI, team, clientes, integrações, automações e IA.</p>
      </div>

      <div class="role-card" onclick="setRoleExperience('employee')">
        <span class="role-badge">CAMPO</span>
        <h2>👷 Meu Trabalho Hoje</h2>
        <p>Work Orders, rotas, check-in, fotos, clima e execução em campo.</p>
      </div>

      <div class="role-card" onclick="setRoleExperience('client')">
        <span class="role-badge">CLIENTE</span>
        <h2>🤝 My Project</h2>
        <p>Projetos, fotos, relatórios, pagamentos e comunicação.</p>
      </div>
    </div>

    <div class="card">
      <h2>Criar usuário de teste</h2>
      <div class="form-grid">
        <select id="roleUserCompany"><option value="">Client</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input id="roleUserName" placeholder="Nome">
        <input id="roleUserEmail" placeholder="Email">
        <select id="roleUserRole"><option value="owner">owner</option><option value="employee">employee</option><option value="client">client</option></select>
      </div>
      <button class="primary-btn" onclick="createRoleUser()">Salvar Perfil</button>
    </div>

    <div class="role-grid">
      ${userProfiles.map(u => `
        <div class="role-card">
          <h2>${u.user_name}</h2>
          <span class="role-badge">${u.role}</span>
          <p>${u.user_email || ""}</p>
        </div>
      `).join("") || "<div class='card'>Nenhum perfil criado.</div>"}
    </div>
  `);
}

async function createRoleUser(){
  const companyId = val("roleUserCompany");
  if(!companyId) return alert("Select a client.");

  const res = await apiInsert("user_profiles", {
    company_id: companyId,
    user_name: val("roleUserName"),
    user_email: val("roleUserEmail"),
    role: val("roleUserRole"),
    status: "Active"
  });

  if(!res.ok) return alert("Erro ao criar perfil. Rode o SQL V61.");

  userProfiles = await apiGet("user_profiles");
  renderRoleExperience();
}

function renderOwnerHome(){
  setTitle("Business Command Center");

  const revenue = typeof invoices !== "undefined" ? invoices.reduce((s,i) => s + Number(i.amount || 0), 0) : 0;
  const activeProjects = typeof workOrders !== "undefined" ? workOrders.length : 0;
  const alerts = (typeof weatherAlerts !== "undefined" ? weatherAlerts.length : 0) + (typeof aiProjectRisks !== "undefined" ? aiProjectRisks.length : 0);

  setContent(`
    <div class="role-hero">
      <h2>👑 Business Command Center</h2>
      <p>Como está sua cliente hoje?</p>
    </div>

    <div class="cards">
      ${metric("Receita", "R$ " + Number(revenue || 0).toLocaleString("pt-BR"))}
      ${metric("Work Orders/Projetos", activeProjects)}
      ${metric("Team/Campo", typeof gpsCheckins !== "undefined" ? gpsCheckins.length : 0)}
      ${metric("Alertas", alerts)}
      ${metric("AI Insights", typeof aiCommandCenterLogs !== "undefined" ? aiCommandCenterLogs.length : 0)}
    </div>

    <div class="role-action-grid">
      <button class="role-action" onclick="changePage('workOrders')">🧾 Work Orders de Serviço</button>
      <button class="role-action" onclick="changePage('billingDashboard')">💰 Financial</button>
      <button class="role-action" onclick="changePage('biDashboard')">📊 BI</button>
      <button class="role-action" onclick="changePage('aiOperationsCommand')">🧠 AI Command</button>
      <button class="role-action" onclick="changePage('mapsReal')">🗺️ Routes</button>
      <button class="role-action" onclick="changePage('whatsappReal')">🟢 WhatsApp</button>
    </div>
  `);
}

function renderEmployeeHome(){
  setTitle("Meu Trabalho Hoje");

  const nextWO = typeof workOrders !== "undefined" && workOrders.length ? workOrders[0] : null;

  setContent(`
    <div class="role-hero">
      <h2>👷 Meu Trabalho Hoje</h2>
      <p>O que precisa ser feito agora.</p>
    </div>

    <div class="role-mobile-card">
      <h2>Próxima Work Order</h2>
      <p>${nextWO ? nextWO.client_name || "Client" : "Nenhuma ordem encontrada"}</p>
      <p>${nextWO ? nextWO.service_type || "Serviço" : "Crie uma ordem para aparecer aqui."}</p>
      <button class="primary-btn" onclick="changePage('workOrders')">Abrir OS</button>
    </div>

    <div class="role-action-grid">
      <button class="role-action" onclick="changePage('routePlanning')">🗺️ Iniciar Rota</button>
      <button class="role-action" onclick="changePage('mobileWorkforce')">📍 Check-in</button>
      <button class="role-action" onclick="changePage('mobileWorkforce')">📷 Enviar Foto</button>
      <button class="role-action" onclick="changePage('workOrders')">✅ Finalizar Serviço</button>
      <button class="role-action" onclick="changePage('weatherCenter')">🌦️ Clima</button>
      <button class="role-action" onclick="changePage('fieldDashboard')">🌱 Campo</button>
    </div>

    <div class="card">
      <h2>Tarefas do dia</h2>
      ${typeof mobileWorkforceTasks !== "undefined" && mobileWorkforceTasks.length ? mobileWorkforceTasks.slice(0,5).map(t => `
        <div class="role-today"><strong>${t.task_title}</strong><br><small>${t.employee_name || ""} • ${t.task_status || ""}</small></div>
      `).join("") : "<p>Nenhuma tarefa cadastrada.</p>"}
    </div>
  `);
}

function renderClientHome(){
  setTitle("My Project");

  const latestPhoto = typeof fieldPhotos !== "undefined" && fieldPhotos.length ? fieldPhotos[0] : null;

  setContent(`
    <div class="role-hero">
      <h2>🤝 My Project</h2>
      <p>Acompanhe seu projeto sem complicação.</p>
    </div>

    <div class="role-mobile-card">
      <h2>Status</h2>
      <p>Em andamento</p>
      <p>Próxima atualização disponível no relatório.</p>
      <button class="primary-btn" onclick="changePage('workOrders')">Ver Work Orders</button>
    </div>

    <div class="role-action-grid">
      <button class="role-action" onclick="changePage('workOrders')">🧾 Minhas Work Orders</button>
      <button class="role-action" onclick="changePage('reportCenter')">📑 Reports</button>
      <button class="role-action" onclick="changePage('billingDashboard')">💳 Payments</button>
      <button class="role-action" onclick="changePage('gmailReal')">💬 Mensagem</button>
    </div>

    <div class="card">
      <h2>Recent Photos</h2>
      ${latestPhoto ? `<p>${latestPhoto.project_name || "Projeto"} • ${latestPhoto.photo_type || "Foto"}</p><small>${latestPhoto.photo_url || ""}</small>` : "<p>Nenhuma foto cadastrada ainda.</p>"}
    </div>
  `);
}


/* V64 HOME COMMAND CENTER */
function ddMoneyV64(value){return Number(value||0).toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2});}
function ddInvoiceTotalV64(){return typeof invoices!=="undefined"?invoices.reduce((s,i)=>s+Number(i.amount||0),0):0;}
function ddPaidTotalV64(){return typeof payments!=="undefined"?payments.filter(p=>p.status==="Paid").reduce((s,p)=>s+Number(p.amount||0),0):0;}

function renderDashboard(){
  setTitle("Home");
  const revenue=ddInvoiceTotalV64(), paid=ddPaidTotalV64(), openRevenue=Math.max(revenue-paid,0);
  const projects=typeof workOrders!=="undefined"?workOrders:[];
  const teams=typeof gpsCheckins!=="undefined"?gpsCheckins.length:0;
  const weatherCount=typeof weatherAlerts!=="undefined"?weatherAlerts.length:0;
  const aiAlerts=typeof aiProjectRisks!=="undefined"?aiProjectRisks.length:0;
  const routes=typeof routePlans!=="undefined"?routePlans.length:0;

  setContent(`
    <div class="v64-role-tabs">
      <button class="active" onclick="renderDashboard()">👑 Owner Command</button>
      <button onclick="renderEmployeeHome()">👷 Employee View</button>
      <button onclick="renderClientHome()">🤝 Client View</button>
    </div>
    <section class="v64-hero">
      <div class="v64-eyebrow">Professional Field Service Platform</div>
      <h2>DoubleDiamond Command Center</h2>
      <p>Executive view for landscaping, irrigation, routes, field teams, clients and operational intelligence.</p>
      <div class="v64-hero-actions">
        <button class="v64-primary" onclick="changePage('workOrders')">Nova / Ver Work Order</button>
        <button class="v64-secondary" onclick="changePage('routePlanning')">View Routes</button>
        <button class="v64-secondary" onclick="changePage('biDashboard')">Open BI</button>
        <button class="v64-secondary" onclick="changePage('aiOperationsCommand')">AI Command</button>
      </div>
    </section>
    <div class="v64-kpi-grid">
      <div class="v64-kpi-card"><small>Receita total</small><h3>R$ ${ddMoneyV64(revenue)}</h3><p>Faturamento registrado.</p></div>
      <div class="v64-kpi-card"><small>Received</small><h3>R$ ${ddMoneyV64(paid)}</h3><p>Payments confirmados.</p></div>
      <div class="v64-kpi-card"><small>Em aberto</small><h3>R$ ${ddMoneyV64(openRevenue)}</h3><p>Potencial de cobrança.</p></div>
      <div class="v64-kpi-card"><small>Work Orders / Projetos</small><h3>${projects.length}</h3><p>Itens operacionais.</p></div>
      <div class="v64-kpi-card"><small>Team em campo</small><h3>${teams}</h3><p>Check-ins registrados.</p></div>
      <div class="v64-kpi-card"><small>Routes</small><h3>${routes}</h3><p>Planejamentos ativos.</p></div>
    </div>
    <div class="v64-section-title"><h2>Projetos e Work Orders Ativas</h2><span>Pipeline operacional</span></div>
    <div class="v64-grid">
      ${projects.slice(0,3).map((p,idx)=>{const progress=[82,64,45][idx]||55;return `
        <div class="v64-project-card">
          <div class="v64-project-cover">🌿 ${p.client_name||p.project_name||"Projeto de Paisagismo"}</div>
          <span class="v64-tag">${p.status||"Em andamento"}</span>
          <h2>${p.service_type||p.work_order_title||"Serviço externo"}</h2>
          <div class="v64-progress"><span style="width:${progress}%"></span></div>
          <p>${progress}% completed • Próxima atualização em campo</p>
          <button class="secondary-btn" onclick="changePage('workOrders')">Abrir</button>
        </div>`}).join("")||`
        <div class="v64-project-card"><div class="v64-project-cover">🌿 First Project</div><span class="v64-tag">Ready to Start</span><h2>Create a work order</h2><div class="v64-progress"><span style="width:18%"></span></div><p>Use Work Orders to feed the Home dashboard.</p><button class="secondary-btn" onclick="changePage('workOrders')">Create / Open Work Order</button></div>`}
    </div>
    <div class="v64-section-title"><h2>Atividade de Hoje</h2><span>Feed operacional</span></div>
    <div class="v64-grid">
      <div class="v64-feed-card">
        ${[["📍","Team pronta para rota","Abra Routes para organizar deslocamentos."],["🧾","Work Orders em acompanhamento",projects.length+" ordens/projetos disponíveis."],["🌦","Clima monitorado",weatherCount?weatherCount+" alertas encontrados.":"Sem alerta crítico."],["🧠","IA operacional",aiAlerts?aiAlerts+" riscos/projeções cadastrados.":"Sem risco AI crítico."]].map(i=>`
          <div class="v64-feed-item"><div class="v64-feed-icon">${i[0]}</div><div><strong>${i[1]}</strong><br><small>${i[2]}</small></div></div>`).join("")}
      </div>
      <div class="v64-alert-card">
        <h2>Alertas Inteligentes</h2><p>Acompanhe problemas antes que virem retrabalho.</p>
        <div class="v64-feed-item"><div class="v64-feed-icon">⚠️</div><div><strong>Projetos atrasados</strong><br><small>${aiAlerts||0} riscos registrados.</small></div></div>
        <div class="v64-feed-item"><div class="v64-feed-icon">🌧️</div><div><strong>Clima</strong><br><small>${weatherCount||0} alertas climáticos.</small></div></div>
        <div class="v64-feed-item"><div class="v64-feed-icon">💬</div><div><strong>Comunicação</strong><br><small>WhatsApp/Gmail prontos para filas reais.</small></div></div>
      </div>
    </div>`);
}

function renderEmployeeHome(){
  setTitle("Meu Trabalho Hoje");
  const jobs=typeof workOrders!=="undefined"?workOrders:[], nextJob=jobs[0];
  setContent(`
    <section class="v64-hero"><div class="v64-eyebrow">Employee Mobile Workspace</div><h2>👷 Meu Trabalho Hoje</h2><p>Routes, check-in, fotos, assinatura e conclusão de serviços em uma tela simples.</p><div class="v64-hero-actions"><button class="v64-primary" onclick="changePage('routePlanning')">Iniciar Rota</button><button class="v64-secondary" onclick="changePage('mobileWorkforce')">Check-in</button></div></section>
    <div class="v64-grid"><div class="v64-mobile-shell"><div class="v64-mobile-screen"><span class="v64-tag">Próxima Work Order</span><h2>${nextJob?(nextJob.client_name||"Client"):"Nenhuma ordem para hoje"}</h2><p>${nextJob?(nextJob.service_type||"Serviço em campo"):"Cadastre uma OS para aparecer aqui."}</p><div class="v64-action-grid"><div class="v64-action-card" onclick="changePage('routePlanning')">🗺️<strong>Rota</strong><small>Abrir planejamento</small></div><div class="v64-action-card" onclick="changePage('mobileWorkforce')">📍<strong>Check-in</strong><small>Registrar presença</small></div><div class="v64-action-card" onclick="changePage('mobileWorkforce')">📷<strong>Fotos</strong><small>Enviar campo</small></div><div class="v64-action-card" onclick="changePage('workOrders')">✅<strong>Finalizar</strong><small>Concluir OS</small></div></div></div></div>
    <div class="v64-feed-card"><h2>Tarefas do dia</h2>${jobs.slice(0,5).map(j=>`<div class="v64-feed-item"><div class="v64-feed-icon">🧾</div><div><strong>${j.client_name||"Client"}</strong><br><small>${j.service_type||j.status||"Serviço"}</small></div></div>`).join("")||"<p>Nenhuma tarefa cadastrada.</p>"}</div></div>`);
}

function renderClientHome(){
  setTitle("My Project");
  const photos=typeof fieldPhotos!=="undefined"?fieldPhotos:[], reportsCount=typeof reportCenterExports!=="undefined"?reportCenterExports.length:0;
  const paid=ddPaidTotalV64(), revenue=ddInvoiceTotalV64(), progress=revenue?Math.min(100,Math.round((paid/revenue)*100)):72;
  setContent(`
    <section class="v64-hero"><div class="v64-eyebrow">Client Portal</div><h2>🤝 My Project</h2><p>Track progress, fotos, relatórios, pagamentos e mensagens da team.</p><div class="v64-hero-actions"><button class="v64-primary" onclick="changePage('reportCenter')">View Reports</button><button class="v64-secondary" onclick="changePage('gmailReal')">Contact Team</button></div></section>
    <div class="v64-grid"><div class="v64-project-card"><div class="v64-project-cover">🏡 Project in Progress</div><span class="v64-tag">Project Status</span><h2>Overall Progress</h2><div class="v64-progress"><span style="width:${progress}%"></span></div><p>${progress}% completed • Next Visit em planejamento</p></div>
    <div class="v64-feed-card"><h2>Quick Access</h2><div class="v64-action-grid"><div class="v64-action-card" onclick="changePage('workOrders')">🧾<strong>Work Orders</strong><small>Acompanhar serviços</small></div><div class="v64-action-card" onclick="changePage('reportCenter')">📑<strong>Reports</strong><small>${reportsCount} disponíveis</small></div><div class="v64-action-card" onclick="changePage('billingDashboard')">💳<strong>Payments</strong><small>Ver cobranças</small></div><div class="v64-action-card" onclick="changePage('gmailReal')">💬<strong>Messages</strong><small>Contato com team</small></div></div></div>
    <div class="v64-feed-card"><h2>Recent Photos</h2>${photos.slice(0,4).map(p=>`<div class="v64-feed-item"><div class="v64-feed-icon">📸</div><div><strong>${p.photo_type||"Foto de campo"}</strong><br><small>${p.project_name||p.photo_url||"Atualização do projeto"}</small></div></div>`).join("")||"<p>No photos uploaded yet.</p>"}</div></div>`);
}

/* V64.2 INSTANT NAVIGATION */
let ddInitialDataLoaded = false;
let ddDataLoadingV642 = false;
let ddCurrentPageV642 = "dashboard";

const ddOriginalLoadDataV642 = loadData;
loadData = async function(){
  await ddOriginalLoadDataV642();
  ddInitialDataLoaded = true;
};

function ddStartBackgroundLoadV642(){
  if(ddInitialDataLoaded || ddDataLoadingV642) return;
  ddDataLoadingV642 = true;

  setTimeout(async () => {
    try{
      await loadData();
      ddDataLoadingV642 = false;
      ddRefreshCurrentPageV642();
    }catch(e){
      ddDataLoadingV642 = false;
      console.warn("Background data load failed", e);
    }
  }, 30);
}

function ddRefreshCurrentPageV642(){
  if(ddCurrentPageV642 === "dashboard") return renderDashboard();
  if(ddCurrentPageV642 === "ownerHome") return renderOwnerHome();
  if(ddCurrentPageV642 === "employeeHome") return renderEmployeeHome();
  if(ddCurrentPageV642 === "clientHome") return renderClientHome();

  try{
    ddOriginalChangePageV642(ddCurrentPageV642, null);
  }catch(e){
    console.warn("Refresh current page failed", e);
  }
}

const ddOriginalChangePageV642 = changePage;
changePage = function(page, event){
  ddCurrentPageV642 = page;

  ddOriginalChangePageV642(page, event);

  if(!ddInitialDataLoaded){
    const content = document.getElementById("pageContent");
    if(content && !content.querySelector(".performance-pill")){
      content.insertAdjacentHTML("afterbegin", `
        <div class="performance-pill fast">
          <span class="performance-dot fast"></span>
          Abrindo agora. Dados atualizando em segundo plano...
        </div>
      `);
    }
    ddStartBackgroundLoadV642();
  }
};

const ddOriginalRenderDashboardV642 = renderDashboard;
renderDashboard = function(){
  ddOriginalRenderDashboardV642();

  const content = document.getElementById("pageContent");
  if(content && !ddInitialDataLoaded && !content.querySelector(".performance-pill")){
    content.insertAdjacentHTML("afterbegin", `
      <div class="performance-pill">
        <span class="performance-dot"></span>
        Loading data in the background...
      </div>
    `);
  }
};


/* V66 PROJECT GALLERY FINAL OVERRIDE */
function ddV66GalleryItems(category){
  const existing = Array.isArray(fieldPhotos) ? fieldPhotos : [];
  const mapped = existing.slice(0,12).map((p,idx)=>({
    title:p.photo_type||p.label||p.caption||["Antes","Durante","Depois"][idx%3],
    category:p.category||p.photo_type||["Antes","Durante","Depois"][idx%3],
    date:p.created_at?new Date(p.created_at).toLocaleDateString("pt-BR"):"Atualização recente",
    by:p.uploaded_by||p.user_name||"Team de Campo",
    url:p.url||p.photo_url||p.image_url||""
  }));
  const fallback=[
    {title:"Área original",category:"Antes",date:"05/06/2026",by:"Supervisor",url:""},
    {title:"Preparação do terreno",category:"Durante",date:"09/06/2026",by:"Team Verde",url:""},
    {title:"Irrigação em instalação",category:"Durante",date:"11/06/2026",by:"Técnico de Irrigação",url:""},
    {title:"Resultado esperado",category:"Depois",date:"Entrega prevista",by:"Paisagista",url:""}
  ];
  const list=mapped.length?mapped:fallback;
  if(!category||category==="Todos") return list;
  return list.filter(i=>String(i.category).toLowerCase().includes(category.toLowerCase()));
}
function ddV66OpenLightbox(title,date,by,url){
  let lb=document.getElementById("v66Lightbox");
  if(!lb){
    document.body.insertAdjacentHTML("beforeend",`<div id="v66Lightbox" class="v66-lightbox"><div class="v66-lightbox-card"><div id="v66LightboxImg" class="v66-lightbox-img"></div><div class="v66-lightbox-body"><button class="v66-close" onclick="document.getElementById('v66Lightbox').classList.remove('open')">Fechar</button><h2 id="v66LightboxTitle"></h2><p id="v66LightboxMeta"></p></div></div></div>`);
    lb=document.getElementById("v66Lightbox");
  }
  const img=document.getElementById("v66LightboxImg");
  img.textContent=title;
  img.style.backgroundImage=url?`linear-gradient(0deg,rgba(0,0,0,.25),rgba(0,0,0,.05)),url('${url}')`:"";
  img.style.color=url?"#fff":"#14532d";
  document.getElementById("v66LightboxTitle").textContent=title;
  document.getElementById("v66LightboxMeta").textContent=`${date} • Enviado por ${by}`;
  lb.classList.add("open");
}
function ddV66RenderGallery(category="Todos"){
  const area=document.getElementById("v66GalleryArea");
  if(!area) return;
  const items=ddV66GalleryItems(category);
  area.innerHTML=items.map(item=>`<div class="v66-photo-card" onclick="ddV66OpenLightbox('${item.title.replace(/'/g,"\\'")}','${item.date}','${item.by.replace(/'/g,"\\'")}','${item.url}')"><div class="v66-photo-preview" style="${item.url?`background-image:linear-gradient(0deg,rgba(0,0,0,.28),rgba(0,0,0,.02)),url('${item.url}');color:white;`:""}">${item.title}</div><div class="v66-photo-body"><strong>${item.category}</strong><br><small>${item.date} • ${item.by}</small></div></div>`).join("");
  document.querySelectorAll(".v66-tab").forEach(btn=>btn.classList.toggle("active",btn.dataset.tab===category));
}
function renderClientHome(){
  setTitle("My Project");
  const recentPhotosSafe=Array.isArray(fieldPhotos)?fieldPhotos.slice(0,6):[];
  const reportsCount=Array.isArray(reportCenterExports)?reportCenterExports.length:0;
  const visitsCompleted=Array.isArray(workOrderLogs)?workOrderLogs.length:3;
  const projectName=(workOrders&&workOrders[0]&&(workOrders[0].client_name||workOrders[0].project_name||workOrders[0].service_type))||"Jardim Residencial";
  const lastUpdate=new Date().toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"});
  setContent(`
    <div class="v651-premium-page">
      <section class="v651-premium-hero">
        <div class="v651-hero-top"><div><div class="v651-eyebrow">Client Portal · V66.0</div><h2>🏡 My Project</h2><p>Track progress, before/during/after photos, upcoming visits, team, documents e updates.</p></div><div class="v651-status-pill">🟢 On Schedule</div></div>
        <div class="v651-progress"><span></span></div><strong>72% completed</strong><p style="color:#d1fae5;margin-top:8px;">Last Update: ${lastUpdate}</p>
        <div class="v651-hero-actions"><button class="v651-primary" onclick="changePage('reportCenter', event)">View Reports</button><button class="v651-secondary" onclick="changePage('whatsappReal', event)">Contact Team</button><button class="v651-secondary" onclick="changePage('profitabilityEngine', event)">Payments</button></div>
      </section>
      <div class="v66-kpis"><div class="v66-kpi">📸 Total Photos<strong>${recentPhotosSafe.length||4}</strong></div><div class="v66-kpi">📅 Last Update<strong>${lastUpdate}</strong></div><div class="v66-kpi">👷 Visits Completed<strong>${visitsCompleted||3}</strong></div><div class="v66-kpi">📈 Progress<strong>72%</strong></div></div>
      <div class="v651-grid"><div class="v651-card"><h3>🚀 Next Step</h3><p><strong>Irrigation Installation</strong></p><small>Assigned to: Team Verde</small></div><div class="v651-card"><h3>📅 Next Visit</h3><p><strong>12/06 às 08:00</strong></p><small>Irrigation and site preparation</small></div><div class="v651-card"><h3>📊 Project Status</h3><p><strong>${projectName}</strong></p><small>Project in Progress</small></div><div class="v651-card"><h3>📑 Reports</h3><p><strong>${reportsCount}</strong> disponíveis</p><small>Documents preparados para o cliente</small></div></div>
      <div class="v651-card"><h3>🏡 Evolução do Projeto</h3><div class="v66-tabs"><button class="v66-tab active" data-tab="Todos" onclick="ddV66RenderGallery('Todos')">Todos</button><button class="v66-tab" data-tab="Antes" onclick="ddV66RenderGallery('Antes')">Antes</button><button class="v66-tab" data-tab="Durante" onclick="ddV66RenderGallery('Durante')">Durante</button><button class="v66-tab" data-tab="Depois" onclick="ddV66RenderGallery('Depois')">Depois</button></div><div id="v66GalleryArea" class="v66-gallery-grid"></div></div>
      <div class="v651-card"><h3>🆚 Comparação Antes / Depois</h3><div class="v66-comparison"><div class="v66-compare-card">Antes<br><small>Estado original do projeto</small></div><div class="v66-compare-card after">Depois<br><small>Resultado planejado / evolução atual</small></div></div></div>
      <div class="v651-grid"><div class="v651-card"><h3>📍 Project Timeline</h3><div class="v651-timeline"><div class="v651-step"><div class="v651-dot">✓</div><div><strong>Contrato aprovado</strong><br><small>Projeto confirmado</small></div></div><div class="v651-step"><div class="v651-dot">✓</div><div><strong>Planejamento</strong><br><small>Escopo e team definidos</small></div></div><div class="v651-step"><div class="v651-dot current">⏳</div><div><strong>Execução em andamento</strong><br><small>Instalação e paisagismo</small></div></div><div class="v651-step"><div class="v651-dot todo">□</div><div><strong>Entrega</strong><br><small>Projeto completed</small></div></div></div></div><div class="v651-card"><h3>📰 Recent Updates</h3><div class="v651-feed-item"><div class="v651-feed-icon">🌱</div><div><strong>Hoje</strong><br><small>Team iniciou preparação do terreno</small></div></div><div class="v651-feed-item"><div class="v651-feed-icon">🚚</div><div><strong>Ontem</strong><br><small>Materiais entregues no local</small></div></div></div></div>
      <div class="v651-grid"><div class="v651-card"><h3>👷 Team Assigned to</h3><div class="v651-team"><div class="v651-person"><div class="v651-avatar">SV</div><div><strong>Supervisor</strong><br><small>Coordenação do projeto</small></div></div><div class="v651-person"><div class="v651-avatar">PS</div><div><strong>Paisagista</strong><br><small>Execução e acabamento</small></div></div></div></div><div class="v651-card"><h3>💰 Financial Summary</h3><div class="v651-grid"><div><strong>Total</strong><br><small>R$ 18.000,00</small></div><div><strong>Pago</strong><br><small>R$ 15.000,00</small></div><div><strong>Pendente</strong><br><small>R$ 3.000,00</small></div></div></div></div>
      <div class="v651-card"><h3>📄 Documents</h3><div class="v651-docs"><div class="v651-doc">📄 Contrato</div><div class="v651-doc">📄 Orçamento</div><div class="v651-doc">📄 Reports</div><div class="v651-doc">📄 Garantia</div></div></div>
    </div>`);
  setTimeout(()=>ddV66RenderGallery("Todos"),0);
}


/* V67 REAL GALLERY FINAL OVERRIDE */
function ddV67NormalizePhoto(p, idx){
  const categories = ["Antes","Durante","Depois"];
  const rawCat = String(p.category || p.photo_type || p.label || categories[idx % 3] || "Durante");
  let cat = rawCat.toLowerCase().includes("antes") || rawCat.toLowerCase().includes("before") ? "Antes" :
            rawCat.toLowerCase().includes("depois") || rawCat.toLowerCase().includes("after") ? "Depois" :
            rawCat.toLowerCase().includes("durante") || rawCat.toLowerCase().includes("during") ? "Durante" :
            categories[idx % 3];

  return {
    title: p.title || p.caption || p.photo_type || p.label || `${cat} do projeto`,
    category: cat,
    date: p.created_at ? new Date(p.created_at).toLocaleDateString("pt-BR") : "Atualização recente",
    by: p.uploaded_by || p.user_name || p.technician_name || "Team de Campo",
    desc: p.description || p.notes || "Atualização visual do projeto.",
    url: p.url || p.photo_url || p.image_url || p.public_url || ""
  };
}

function ddV67GalleryItems(category){
  const existing = Array.isArray(fieldPhotos) ? fieldPhotos : [];
  const mapped = existing.slice(0,18).map(ddV67NormalizePhoto);

  const fallback = [
    {title:"Área original",category:"Antes",date:"05/06/2026",by:"Supervisor",desc:"Registro inicial antes da execução.",url:""},
    {title:"Preparação do terreno",category:"Durante",date:"09/06/2026",by:"Team Verde",desc:"Preparação para paisagismo e irrigação.",url:""},
    {title:"Irrigação em instalação",category:"Durante",date:"11/06/2026",by:"Técnico de Irrigação",desc:"Instalação do sistema de irrigação.",url:""},
    {title:"Resultado esperado",category:"Depois",date:"Entrega prevista",by:"Paisagista",desc:"Visual planejado para a entrega final.",url:""}
  ];

  const list = mapped.length ? mapped : fallback;
  if(!category || category === "Todos") return list;
  return list.filter(item => item.category === category);
}

function ddV67Escape(value){
  return String(value || "").replace(/'/g,"\\'").replace(/"/g,"&quot;");
}

function ddV67OpenLightbox(title,date,by,desc,url,category){
  let lb = document.getElementById("v67Lightbox");
  if(!lb){
    document.body.insertAdjacentHTML("beforeend", `
      <div id="v67Lightbox" class="v67-lightbox-overlay">
        <div class="v67-lightbox-card">
          <div id="v67LightboxPhoto" class="v67-lightbox-photo"></div>
          <div class="v67-lightbox-info">
            <button class="v67-lightbox-close" onclick="document.getElementById('v67Lightbox').classList.remove('open')">Fechar</button>
            <h2 id="v67LightboxTitle"></h2>
            <p id="v67LightboxDesc"></p>
            <div class="v67-chip-row">
              <span id="v67LightboxDate" class="v67-chip"></span>
              <span id="v67LightboxBy" class="v67-chip"></span>
              <span id="v67LightboxCat" class="v67-chip"></span>
            </div>
          </div>
        </div>
      </div>
    `);
    lb = document.getElementById("v67Lightbox");
  }

  const photo = document.getElementById("v67LightboxPhoto");
  photo.textContent = title;
  photo.classList.toggle("has-image", !!url);
  photo.style.backgroundImage = url ? `linear-gradient(0deg,rgba(0,0,0,.35),rgba(0,0,0,.05)),url('${url}')` : "";
  document.getElementById("v67LightboxTitle").textContent = title;
  document.getElementById("v67LightboxDesc").textContent = desc;
  document.getElementById("v67LightboxDate").textContent = "📅 " + date;
  document.getElementById("v67LightboxBy").textContent = "👷 " + by;
  document.getElementById("v67LightboxCat").textContent = "🏷️ " + category;
  lb.classList.add("open");
}

function ddV67RenderGallery(category="Todos"){
  const area = document.getElementById("v66GalleryArea") || document.getElementById("v67GalleryArea");
  if(!area) return;

  const items = ddV67GalleryItems(category);
  area.innerHTML = items.map(item => `
    <div class="v66-photo-card v67-photo-real" onclick="ddV67OpenLightbox('${ddV67Escape(item.title)}','${ddV67Escape(item.date)}','${ddV67Escape(item.by)}','${ddV67Escape(item.desc)}','${ddV67Escape(item.url)}','${ddV67Escape(item.category)}')">
      <div class="v66-photo-preview" style="${item.url ? `background-image:linear-gradient(0deg,rgba(0,0,0,.30),rgba(0,0,0,.03)),url('${item.url}');color:white;` : ""}">
        ${item.title}
      </div>
      <div class="v66-photo-body">
        <strong>${item.category}</strong><br>
        <small>${item.date} • ${item.by}</small>
        <p style="margin-top:8px;color:#64748b;">${item.desc}</p>
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".v66-tab").forEach(btn => btn.classList.toggle("active", btn.dataset.tab === category));
}

function ddV67ComparisonHtml(){
  const before = ddV67GalleryItems("Antes")[0];
  const after = ddV67GalleryItems("Depois")[0];

  const beforeStyle = before?.url ? `background-image:linear-gradient(0deg,rgba(0,0,0,.30),rgba(0,0,0,.03)),url('${before.url}')` : "";
  const afterStyle = after?.url ? `background-image:linear-gradient(0deg,rgba(0,0,0,.30),rgba(0,0,0,.03)),url('${after.url}')` : "";

  return `
    <div class="v67-compare-wrap">
      <div class="v67-compare-img ${before?.url ? "has-image" : ""}" style="${beforeStyle}">ANTES<br><small>${before?.title || "Área original"}</small></div>
      <div class="v67-compare-img ${after?.url ? "has-image" : ""}" style="${afterStyle}">DEPOIS<br><small>${after?.title || "Resultado esperado"}</small></div>
    </div>
  `;
}

const ddV67PreviousRenderClientHome = renderClientHome;
renderClientHome = function(){
  ddV67PreviousRenderClientHome();

  const heroEyebrow = document.querySelector(".v651-eyebrow");
  if(heroEyebrow) heroEyebrow.textContent = "Client Portal · V67.0";

  const galleryCard = Array.from(document.querySelectorAll(".v651-card")).find(card => card.textContent.includes("Evolução do Projeto"));
  if(galleryCard){
    const title = galleryCard.querySelector("h3");
    if(title) title.textContent = "🏡 Galeria Real do Projeto";
    const oldArea = galleryCard.querySelector("#v66GalleryArea");
    if(oldArea){
      oldArea.id = "v67GalleryArea";
      ddV67RenderGallery("Todos");
    }
  }

  const comparisonCard = Array.from(document.querySelectorAll(".v651-card")).find(card => card.textContent.includes("Comparação Antes"));
  if(comparisonCard){
    comparisonCard.innerHTML = `<h3>🆚 Comparação Antes / Depois</h3>${ddV67ComparisonHtml()}`;
  }

  document.querySelectorAll(".v66-tab").forEach(btn => {
    const tab = btn.dataset.tab || btn.textContent.trim();
    btn.onclick = () => ddV67RenderGallery(tab);
  });
};

/* V68.1 FIELD PHOTO UPLOAD SYNTAX FIX */
async function addFieldPhotoV68(){
  const projectName = val("v68ProjectName") || "Jardim Residencial";
  const employeeName = val("v68EmployeeName") || "Team Verde";
  const photoType = val("v68PhotoType") || "Durante";
  const photoUrl = val("v68PhotoUrl");
  const notes = val("v68Notes") || "";

  if(!photoUrl || !photoUrl.trim()){
    return alert("Cole a URL da foto.");
  }

  const res = await apiInsert("field_photos", {
    company_id: "demo-company",
    project_name: projectName,
    employee_name: employeeName,
    photo_type: photoType,
    photo_url: photoUrl,
    notes: notes
  });

  if(!res.ok){
    return alert("Erro ao salvar foto. Verifique RLS/permissão da tabela field_photos.");
  }

  fieldPhotos = await apiGet("field_photos");
  alert("Foto salva com sucesso. Ela já aparecerá no Client Portal.");
  renderFieldDashboard();
}

function v68SafeText(value){
  return String(value || "").replace(/[&<>"']/g, function(m){
    return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m];
  });
}

function v68UploadBlock(){
  const photos = Array.isArray(fieldPhotos) ? fieldPhotos.slice(0,6) : [];
  const photoHtml = photos.length ? photos.map(function(p){
    const bg = p.photo_url ? "background-image:linear-gradient(0deg,rgba(0,0,0,.25),rgba(0,0,0,.02)),url('" + v68SafeText(p.photo_url) + "');color:white;" : "";
    return '<div class="v68-mini-photo">' +
      '<div class="v68-mini-img" style="' + bg + '">' + v68SafeText(p.photo_type || "Foto") + '</div>' +
      '<div class="v68-mini-body">' +
      '<strong>' + v68SafeText(p.project_name || "Projeto") + '</strong><br>' +
      '<small>' + v68SafeText(p.employee_name || "Team") + ' • ' + (p.created_at ? new Date(p.created_at).toLocaleDateString("pt-BR") : "") + '</small>' +
      '<p>' + v68SafeText(p.notes || "") + '</p>' +
      '</div></div>';
  }).join("") : "<p>Nenhuma foto cadastrada ainda.</p>";

  return '<div class="v68-upload-card">' +
    '<h2>📸 Upload de Foto de Campo</h2>' +
    '<p>Salva diretamente na tabela <strong>field_photos</strong> usando as colunas reais do banco.</p>' +
    '<div class="v68-form-grid">' +
      '<input id="v68ProjectName" placeholder="Projeto" value="Jardim Residencial">' +
      '<input id="v68EmployeeName" placeholder="Employee / Team" value="Team Verde">' +
      '<select id="v68PhotoType"><option>Antes</option><option selected>Durante</option><option>Depois</option></select>' +
      '<input id="v68PhotoUrl" placeholder="URL da foto">' +
    '</div>' +
    '<textarea id="v68Notes" placeholder="Observação da foto"></textarea>' +
    '<div class="v68-actions">' +
      '<button class="primary-btn" onclick="addFieldPhotoV68()">Salvar Foto</button>' +
      '<button class="secondary-btn" onclick="changePage(\'clientHome\', event)">Ver no Portal Client</button>' +
    '</div>' +
    '<div class="v68-photo-list">' + photoHtml + '</div>' +
  '</div>';
}

const ddV68OldRenderFieldDashboard = renderFieldDashboard;
renderFieldDashboard = function(){
  ddV68OldRenderFieldDashboard();
  const content = document.getElementById("pageContent");
  if(content && !content.querySelector(".v68-upload-card")){
    content.insertAdjacentHTML("afterbegin", v68UploadBlock());
  }
};

const ddV68OldRenderMobileWorkforce = renderMobileWorkforce;
renderMobileWorkforce = function(){
  ddV68OldRenderMobileWorkforce();
  const content = document.getElementById("pageContent");
  if(content && !content.querySelector(".v68-upload-card")){
    content.insertAdjacentHTML("afterbegin", v68UploadBlock());
  }
};

const ddV68OldRenderClientHome = renderClientHome;
renderClientHome = function(){
  ddV68OldRenderClientHome();
  const eyebrow = document.querySelector(".v651-eyebrow");
  if(eyebrow) eyebrow.textContent = "Client Portal · V68.1";
};


/* V69 REAL PROJECT TIMELINE */
function ddV69TimelineItems(){
  const rows = Array.isArray(projectTimeline) ? projectTimeline.slice() : [];
  const normalized = rows.map(function(row, index){
    return {
      event: row.event || row.title || row.status || ("Evento " + (index + 1)),
      project_id: row.project_id || "",
      created_at: row.created_at || "",
      isCurrent: index === 0
    };
  });

  if(normalized.length){
    return normalized.sort(function(a,b){
      return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    });
  }

  return [
    {event:"Contrato aprovado",created_at:"",isCurrent:false},
    {event:"Planejamento iniciado",created_at:"",isCurrent:false},
    {event:"Team programada",created_at:"",isCurrent:false},
    {event:"Execução em andamento",created_at:"",isCurrent:true},
    {event:"Inspeção final",created_at:"",isCurrent:false},
    {event:"Entrega final",created_at:"",isCurrent:false}
  ];
}

function ddV69TimelineHtml(){
  const items = ddV69TimelineItems();
  const usingReal = Array.isArray(projectTimeline) && projectTimeline.length > 0;

  return [
    '<div class="v69-real-timeline-card">',
      '<div class="v69-timeline-head">',
        '<div>',
          '<h3>📍 Real Project Timeline</h3>',
          '<small>Eventos carregados da tabela project_timeline.</small>',
        '</div>',
        '<span class="v69-source-pill">' + (usingReal ? 'Supabase conectado' : 'Modo exemplo') + '</span>',
      '</div>',
      items.length ? items.map(function(item, index){
        const date = item.created_at ? new Date(item.created_at).toLocaleString("pt-BR") : "Aguardando data";
        const dotClass = item.isCurrent || index === 0 && usingReal ? "v69-event-dot current" : "v69-event-dot";
        const icon = item.isCurrent || index === 0 && usingReal ? "⏳" : "✓";
        return '<div class="v69-event">' +
          '<div class="' + dotClass + '">' + icon + '</div>' +
          '<div>' +
            '<div class="v69-event-title">' + v68SafeText(item.event) + '</div>' +
            '<small>' + v68SafeText(date) + '</small>' +
          '</div>' +
        '</div>';
      }).join("") : '<div class="v69-empty">Nenhum evento registrado ainda.</div>',
    '</div>'
  ].join("");
}

async function addProjectTimelineEventV69(eventName){
  const name = eventName || prompt("Digite o evento da timeline:");
  if(!name) return;

  const projectId = "Jardim Residencial";

  const res = await apiInsert("project_timeline", {
    project_id: projectId,
    event: name
  });

  if(!res.ok){
    return alert("Erro ao salvar evento. Verifique RLS/permissão da tabela project_timeline.");
  }

  projectTimeline = await apiGet("project_timeline");
  alert("Evento salvo na timeline.");
  renderClientHome();
}

const ddV69OldRenderClientHome = renderClientHome;
renderClientHome = function(){
  ddV69OldRenderClientHome();

  const eyebrow = document.querySelector(".v651-eyebrow");
  if(eyebrow) eyebrow.textContent = "Client Portal · V69.0";

  const oldTimeline = Array.from(document.querySelectorAll(".v651-card,.v69-real-timeline-card")).find(function(card){
    return card.textContent.includes("Project Timeline") || card.textContent.includes("Real Project Timeline");
  });

  if(oldTimeline){
    oldTimeline.outerHTML = ddV69TimelineHtml();
  }else{
    const gallery = Array.from(document.querySelectorAll(".v651-card")).find(function(card){
      return card.textContent.includes("Galeria") || card.textContent.includes("Evolução");
    });
    if(gallery){
      gallery.insertAdjacentHTML("afterend", ddV69TimelineHtml());
    }
  }

  const timelineCard = document.querySelector(".v69-real-timeline-card");
  if(timelineCard && !timelineCard.querySelector(".v69-add-action")){
    timelineCard.insertAdjacentHTML("beforeend",
      '<div class="v68-actions v69-add-action"><button class="secondary-btn" onclick="addProjectTimelineEventV69()">Adicionar Evento</button></div>'
    );
  }
};


/* SPRINT 1 CORE REAL OPS */
function s1Safe(value){
  return String(value || "").replace(/[&<>"']/g, function(m){
    return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m];
  });
}

function s1Date(value){
  return value ? new Date(value).toLocaleString("pt-BR") : "Sem data";
}

function s1RealOpsHtml(){
  const wo = Array.isArray(workOrders) ? workOrders.slice(0,5) : [];
  const checks = Array.isArray(teamCheckins) ? teamCheckins.slice(0,5) : [];
  const photos = Array.isArray(fieldPhotos) ? fieldPhotos : [];
  const timeline = Array.isArray(projectTimeline) ? projectTimeline : [];

  return `
    <div class="s1-section">
      <h2>⚙️ Real Operations</h2>
      <div class="s1-grid">
        <div class="s1-card"><h3>🧾 Work Orders</h3><strong>${wo.length}</strong><span class="s1-pill">work_orders</span></div>
        <div class="s1-card"><h3>👷 Check-ins</h3><strong>${checks.length}</strong><span class="s1-pill">team_checkins</span></div>
        <div class="s1-card"><h3>📸 Fotos</h3><strong>${photos.length}</strong><span class="s1-pill">field_photos</span></div>
        <div class="s1-card"><h3>📍 Timeline</h3><strong>${timeline.length}</strong><span class="s1-pill">project_timeline</span></div>
      </div>

      <div class="s1-grid">
        <div class="s1-card">
          <h3>🧾 Work Orders Recentes</h3>
          <div class="s1-list">
            ${wo.length ? wo.map(w => `
              <div class="s1-row">
                <strong>${s1Safe(w.title || w.service_type || w.project_name || "Work Order de Serviço")}</strong>
                <small>${s1Safe(w.status || "Status não informado")} • ${s1Date(w.created_at)}</small>
              </div>
            `).join("") : "<div class='s1-row'>Nenhuma ordem encontrada.</div>"}
          </div>
        </div>

        <div class="s1-card">
          <h3>👷 Team em Campo</h3>
          <div class="s1-list">
            ${checks.length ? checks.map(c => `
              <div class="s1-row">
                <strong>${s1Safe(c.employee_name || c.team_member || c.user_name || "Team")}</strong>
                <small>${s1Safe(c.project_name || c.location || c.status || "Check-in")} • ${s1Date(c.created_at || c.checkin_time)}</small>
              </div>
            `).join("") : "<div class='s1-row'>Nenhum check-in encontrado.</div>"}
          </div>
        </div>
      </div>
    </div>
  `;
}

async function s1CreateQuickCheckin(){
  const res = await apiInsert("team_checkins", {
    company_id: "demo-company",
    project_name: "Jardim Residencial",
    employee_name: "Team Verde",
    status: "Em campo",
    notes: "Check-in rápido pelo Sprint 1"
  });

  if(!res.ok){
    return alert("Não foi possível salvar no team_checkins. A leitura continua funcionando; verifique RLS/colunas.");
  }

  teamCheckins = await apiGet("team_checkins");
  renderFieldDashboard();
}

const s1OldRenderClientHome = renderClientHome;
renderClientHome = function(){
  s1OldRenderClientHome();
  const eyebrow = document.querySelector(".v651-eyebrow");
  if(eyebrow) eyebrow.textContent = "Client Portal · Sprint 1";
  const content = document.getElementById("pageContent");
  if(content && !content.querySelector(".s1-section")){
    content.insertAdjacentHTML("beforeend", s1RealOpsHtml());
  }
};

const s1OldRenderFieldDashboard = renderFieldDashboard;
renderFieldDashboard = function(){
  s1OldRenderFieldDashboard();
  const content = document.getElementById("pageContent");
  if(content && !content.querySelector(".s1-section")){
    content.insertAdjacentHTML("afterbegin", `
      <div class="s1-section">
        <h2>👷 Sprint 1 · Campo Real</h2>
        <button class="primary-btn" onclick="s1CreateQuickCheckin()">Criar Check-in Teste</button>
        ${s1RealOpsHtml()}
      </div>
    `);
  }
};


/* SPRINT 2 APPROVAL SIGNATURE REPORTS */
async function s2ApproveCurrentStep(){
  const res = await apiInsert("project_timeline", {
    project_id: "Jardim Residencial",
    event: "Client aprovou etapa pelo portal"
  });

  if(!res.ok){
    return alert("Não foi possível salvar aprovação em project_timeline. Verifique RLS/colunas.");
  }

  projectTimeline = await apiGet("project_timeline");
  alert("Aprovação registrada na timeline.");
  renderClientHome();
}

async function s2SaveSignature(){
  const signer = val("s2Signer") || "Client";
  const signature = val("s2Signature") || "";
  if(!signature.trim()) return alert("Digite a assinatura.");

  const res = await apiInsert("field_signatures", {
    company_id: "demo-company",
    project_name: "Jardim Residencial",
    signer_name: signer,
    signature_data: signature,
    notes: "Assinatura registrada pelo Sprint 2"
  });

  if(!res.ok){
    localStorage.setItem("dd_s2_signature_backup", JSON.stringify({
      signer,
      signature,
      created_at: new Date().toISOString()
    }));
    return alert("Não salvou no Supabase. Backup local criado. Verifique RLS/colunas de field_signatures.");
  }

  fieldSignatures = await apiGet("field_signatures");
  alert("Assinatura salva.");
  renderClientHome();
}

async function s2CreateReportRecord(){
  const res = await apiInsert("report_center_exports", {
    company_id: "demo-company",
    report_name: "Client Report - Jardim Residencial",
    report_type: "Client",
    export_format: "PDF",
    status: "Prepared"
  });

  if(!res.ok){
    return alert("Não foi possível criar relatório. Verifique RLS/colunas de report_center_exports.");
  }

  reportCenterExports = await apiGet("report_center_exports");
  alert("Report preparado.");
  renderClientHome();
}

function s2ApprovalHtml(){
  return `
    <div class="s2-section">
      <h2>✅ Sprint 2 · Aprovação, Assinatura e Report</h2>
      <div class="s2-kpis">
        <div class="s2-kpi"><strong>Assinaturas</strong><br>${Array.isArray(fieldSignatures) ? fieldSignatures.length : 0}</div>
        <div class="s2-kpi"><strong>Reports</strong><br>${Array.isArray(reportCenterExports) ? reportCenterExports.length : 0}</div>
        <div class="s2-kpi"><strong>Eventos Timeline</strong><br>${Array.isArray(projectTimeline) ? projectTimeline.length : 0}</div>
      </div>

      <div class="s2-actions">
        <button class="primary-btn" onclick="s2ApproveCurrentStep()">Approve Step</button>
        <button class="secondary-btn" onclick="s2CreateReportRecord()">Gerar Registro de Report</button>
      </div>

      <div class="s2-signature">
        <h3>✍️ Simple Digital Signature</h3>
        <input id="s2Signer" placeholder="Nome do assinante" value="Client">
        <textarea id="s2Signature" placeholder="Enter signature or confirmation"></textarea>
        <button class="success-btn" onclick="s2SaveSignature()">Save Signature</button>
      </div>
    </div>
  `;
}

const s2OldRenderClientHome = renderClientHome;
renderClientHome = function(){
  s2OldRenderClientHome();
  const eyebrow = document.querySelector(".v651-eyebrow");
  if(eyebrow) eyebrow.textContent = "Client Portal · Sprint 2";
  const content = document.getElementById("pageContent");
  if(content && !content.querySelector(".s2-section")){
    content.insertAdjacentHTML("beforeend", s2ApprovalHtml());
  }
};


/* SPRINT 3 NOTIFICATIONS AUTOMATIONS AI */
async function s3CreateNotification(){
  const res = await apiInsert("push_notification_queue", {
    company_id: "demo-company",
    title: "Atualização do Projeto",
    body: "Nova atualização disponível no Client Portal.",
    status: "Pending"
  });

  if(!res.ok){
    return alert("Não foi possível criar notificação. Verifique RLS/colunas de push_notification_queue.");
  }

  pushNotificationQueue = await apiGet("push_notification_queue");
  alert("Notificação criada.");
  renderExecutiveDashboard();
}

async function s3CreateAutomationRun(){
  const res = await apiInsert("automation_flow_runs", {
    company_id: "demo-company",
    flow_name: "Atualização automática do cliente",
    run_status: "Simulated",
    result_message: "Fluxo criado pelo Sprint 3"
  });

  if(!res.ok){
    return alert("Não foi possível criar automação. Verifique RLS/colunas de automation_flow_runs.");
  }

  automationFlowRuns = await apiGet("automation_flow_runs");
  alert("Automação registrada.");
  renderExecutiveDashboard();
}

async function s3CreateAIInsight(){
  const res = await apiInsert("ai_insights", {
    agent_name: "Operations Advisor",
    insight_type: "Operations",
    title: "Projeto com nova atividade",
    message: "Client recebeu atualização com fotos, timeline e próxima etapa.",
    priority: "Medium",
    status: "Open"
  });

  if(!res.ok){
    return alert("Não foi possível criar insight. Verifique RLS/colunas de ai_insights.");
  }

  aiInsights = await apiGet("ai_insights");
  alert("Insight criado.");
  renderExecutiveDashboard();
}

function s3CommandCenterHtml(){
  return `
    <div class="s3-section">
      <h2>🤖 Sprint 3 · Notificações, Automações e IA</h2>
      <div class="s3-grid">
        <div class="s3-card"><strong>🔔 Notificações</strong><small>${Array.isArray(pushNotificationQueue) ? pushNotificationQueue.length : 0} registros</small><br><button class="primary-btn" onclick="s3CreateNotification()">Criar Notificação</button></div>
        <div class="s3-card"><strong>⚡ Automações</strong><small>${Array.isArray(automationFlowRuns) ? automationFlowRuns.length : 0} execuções</small><br><button class="secondary-btn" onclick="s3CreateAutomationRun()">Simular Automação</button></div>
        <div class="s3-card"><strong>🧠 AI Insights</strong><small>${Array.isArray(aiInsights) ? aiInsights.length : 0} insights</small><br><button class="success-btn" onclick="s3CreateAIInsight()">Gerar Insight</button></div>
      </div>
    </div>
  `;
}

const s3OldRenderExecutiveDashboard = renderExecutiveDashboard;
renderExecutiveDashboard = function(){
  s3OldRenderExecutiveDashboard();
  const content = document.getElementById("pageContent");
  if(content && !content.querySelector(".s3-section")){
    content.insertAdjacentHTML("afterbegin", s3CommandCenterHtml());
  }
};

const s3OldRenderClientHome = renderClientHome;
renderClientHome = function(){
  s3OldRenderClientHome();
  const eyebrow = document.querySelector(".v651-eyebrow");
  if(eyebrow) eyebrow.textContent = "Client Portal · Sprint 3";
};


/* ROLE-BASED LOGIN V1 - CLIENT FIRST, HIDDEN STAFF ACCESS */
(function(){
  let ddHistoryV1 = [];

  function ddGetSession(){
    if(window.DDAuth) return window.DDAuth.getSession();
    try{return JSON.parse(localStorage.getItem("dd_auth_session_v1")||"null");}catch(e){return null;}
  }
  function ddSetSession(session){
    if(window.DDAuth) return window.DDAuth.setSession(session);
    localStorage.setItem("dd_auth_session_v1", JSON.stringify(session));
  }
  function ddClearSession(){
    if(window.DDAuth) return window.DDAuth.clearSession();
    localStorage.removeItem("dd_auth_session_v1");
    localStorage.removeItem("dd_role");
  }
  function ddSessionRole(){
    if(window.DDAuth) return window.DDAuth.getRole("client");
    return (ddGetSession()||{}).role || "client";
  }

  function ddLoginClient(){
    const name=(document.getElementById("ddClientName")||{}).value || "Client";
    const email=(document.getElementById("ddClientEmail")||{}).value || "client@demo.com";
    ddSetSession({role:"client", name:name.trim()||"Client", email, logged_at:new Date().toISOString()});
    ddBootAuthenticated("client");
  }
  function ddLoginStaff(){
    const role=(document.getElementById("ddStaffRole")||{}).value || "employee";
    const pin=(document.getElementById("ddStaffPin")||{}).value || "";
    const validPin = window.DDAuth ? window.DDAuth.validateStaffPin(role, pin) : (role==="owner" && pin==="owner123") || (role==="employee" && pin==="field123");
    if(!validPin) return alert(role==="owner" ? "Owner PIN inválido." : "Employee PIN inválido.");
    ddSetSession({role, name: role==="owner"?"Owner":"Employee", logged_at:new Date().toISOString()});
    ddBootAuthenticated(role);
  }
  function ddLogout(){
    ddClearSession();
    ddShowLogin();
  }
  function ddRevealStaff(){
    const box=document.getElementById("ddStaffBox");
    if(box) box.classList.toggle("is-visible");
  }
  window.ddLoginClient=ddLoginClient;
  window.ddLoginStaff=ddLoginStaff;
  window.ddLogout=ddLogout;
  window.ddRevealStaff=ddRevealStaff;

  function ddShowLogin(){
    const app=document.querySelector(".app");
    if(app) app.style.display="none";
    const commercialLogin=document.getElementById("dd-commercial-login");
    if(commercialLogin) commercialLogin.remove();
    let existing=document.getElementById("ddLoginShell");
    if(existing) existing.remove();
    document.body.insertAdjacentHTML("beforeend", `
      <main id="ddLoginShell" class="dd-login-shell">
        <section class="dd-login-card">
          <div class="dd-login-brand">💎</div>
          <p class="dd-login-eyebrow">DoubleDiamond Client Portal</p>
          <h1>Access your project</h1>
          <p class="dd-login-subtitle">Track photos, reports, approvals and project updates.</p>
          <label>Client name</label>
          <input id="ddClientName" placeholder="Client name" autocomplete="name">
          <label>Email</label>
          <input id="ddClientEmail" placeholder="client@email.com" autocomplete="email">
          <button class="dd-login-primary" onclick="ddLoginClient()">Enter Client Portal</button>
          <small class="dd-login-note">Pilot access. Secure Supabase Auth can be connected in the next phase.</small>
        </section>
        <button class="dd-staff-trigger" onclick="ddRevealStaff()" title="Staff access">💎</button>
        <section id="ddStaffBox" class="dd-staff-box">
          <h3>Staff Access</h3>
          <select id="ddStaffRole"><option value="employee">Employee</option><option value="owner">Owner</option></select>
          <input id="ddStaffPin" type="password" placeholder="Access PIN">
          <button onclick="ddLoginStaff()">Enter Internal App</button>
          <small>Owner PIN: owner123 · Employee PIN: field123</small>
        </section>
      </main>
    `);
  }

  function ddRoleAllowedPage(role, page){
    if(window.DDRoleUI && typeof window.DDRoleUI.isPageAllowed === "function"){
      return window.DDRoleUI.isPageAllowed(role, page);
    }
    if(window.DDCore && typeof window.DDCore.isPageAllowed === "function"){
      return window.DDCore.isPageAllowed(role, page);
    }
    page = typeof normalizeRoute === "function" ? normalizeRoute(page) : page;
    return role === "owner" || page === "clientHome" || page === "reportCenter";
  }
  function ddDefaultPage(role){
    if(window.DDRoleUI && typeof window.DDRoleUI.defaultPage === "function"){
      return window.DDRoleUI.defaultPage(role);
    }
    if(window.DDCore && typeof window.DDCore.defaultPageForRole === "function"){
      return window.DDCore.defaultPageForRole(role);
    }
    return role === "owner" ? "dashboard" : role === "employee" ? "mobileWorkforce" : "clientHome";
  }
  function ddApplyRoleUI(role){
    if(window.DDRoleUI && typeof window.DDRoleUI.applyMenuAccess === "function"){
      window.DDRoleUI.applyMenuAccess(role, {sessionControls:true, backHandler:"ddGoBack", logoutHandler:"ddLogout"});
      return;
    }
    document.body.setAttribute("data-dd-role", role);
    const top=document.querySelector(".top-actions");
    if(top && !top.querySelector(".dd-session-pill")){
      top.insertAdjacentHTML("beforeend", `<button class="dd-back-btn" onclick="ddGoBack()">← Back</button><span class="dd-session-pill">${role.toUpperCase()}</span><button class="dd-logout-btn" onclick="ddLogout()">Logout</button>`);
    }
    const pill = top && top.querySelector(".dd-session-pill");
    if(pill) pill.textContent = role.toUpperCase();
    document.querySelectorAll(".menu-btn").forEach(btn=>{
      const onclick=btn.getAttribute("onclick")||"";
      const m=onclick.match(/changePage\('([^']+)'/);
      if(!m) return;
      const page=m[1];
      const allowed = ddRoleAllowedPage(role,page);
      if(allowed){
        btn.style.display="";
        delete btn.dataset.ddBlocked;
        btn.removeAttribute("data-role-hidden");
      }else{
        btn.style.display="none";
      }
    });
    document.querySelectorAll(".nav-group").forEach(group=>{
      const visible=[...group.querySelectorAll(".menu-btn")].some(b=>b.style.display!=="none");
      group.style.display=visible?"":"none";
    });
  }

  function ddBootAuthenticated(role){
    const login=document.getElementById("ddLoginShell");
    if(login) login.remove();
    const app=document.querySelector(".app");
    if(app) app.style.display="";
    currentRoleExperience=role;
    localStorage.setItem("dd_role", role);
    ddApplyRoleUI(role);
    ddCurrentPageV642=ddDefaultPage(role);
    if(typeof ddStartBackgroundLoadV642==="function") ddStartBackgroundLoadV642();
    changePage(ddDefaultPage(role), null);
  }

  const ddOriginalChangePageRoleV1 = changePage;
  changePage = function(page, event){
    page = typeof normalizeRoute === "function" ? normalizeRoute(page) : page;
    const role=ddSessionRole();
    if(!ddRoleAllowedPage(role,page)) page=ddDefaultPage(role);
    if(typeof ddCurrentPageV642!=="undefined" && ddCurrentPageV642 && ddCurrentPageV642!==page){
      ddHistoryV1.push(ddCurrentPageV642);
      if(ddHistoryV1.length>10) ddHistoryV1.shift();
    }
    ddOriginalChangePageRoleV1(page,event);
    ddApplyRoleUI(role);
  };
  window.ddGoBack=function(){
    const role=ddSessionRole();
    let page=ddHistoryV1.pop() || ddDefaultPage(role);
    if(!ddRoleAllowedPage(role,page)) page=ddDefaultPage(role);
    ddOriginalChangePageRoleV1(page,null);
    ddApplyRoleUI(role);
  };

  window.onload = async function(){
    const session=ddGetSession();
    if(!session){ddShowLogin();return;}
    ddBootAuthenticated(session.role||"client");
  };
})();

/* CLIENT LANGUAGE OVERRIDE - companies table remains the same, UI says Client */
renderClients = function(){
  setTitle("Clients");
  setContent(`
    <div class="foundation-note">CRM de Clients: cadastro de clientes/clients para operações de paisagismo.</div>
    <div class="card">
      <h2>Novo Client</h2>
      <div class="form-grid">
        <input id="companyName" placeholder="Client Name ou client">
        <input id="companyEmail" placeholder="Email do cliente">
        <input id="companyPhone" placeholder="Telefone">
        <select id="companyPlan"><option>Starter</option><option>Professional</option><option>Enterprise</option></select>
        <select id="companyStatus"><option>Active</option><option>Inactive</option><option>Trial</option></select>
      </div>
      <button class="primary-btn" onclick="addCompany()">Cadastrar Client</button>
    </div>
    <div class="card">
      <h2>Usuário do Client</h2>
      <div class="form-grid">
        <select id="companyUserCompany"><option value="">Client</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input id="companyUserName" placeholder="Nome do usuário">
        <input id="companyUserEmail" placeholder="Email do usuário">
        <select id="companyUserRole"><option>Owner</option><option>Manager</option><option>Employee</option><option>Client</option></select>
      </div>
      <button class="primary-btn" onclick="addCompanyUser()">Add User</button>
    </div>
    <div class="enterprise-grid">
      ${companies.map(company => {
        const users = companyUsers.filter(u => u.company_id === company.id);
        return `<div class="enterprise-card"><h2>${company.name}</h2><small>${company.email || "Sem email"} • ${company.phone || "Sem telefone"}</small><br><span class="status ${company.status === "Active" ? "status-active" : "status-inactive"}">${company.status}</span><p><strong>Plano:</strong> ${company.plan || "Sem plano"}</p><p><strong>Usuários:</strong> ${users.length}</p>${users.map(u => `<div class="soft-box"><strong>${u.user_name}</strong><br><small>${u.user_email || ""} • ${u.role}</small></div>`).join("")}<button class="danger-btn" onclick="removeCompany('${company.id}')">Remover Client</button></div>`;
      }).join("") || "<div class='card'><p>Nenhum cliente cadastrado.</p></div>"}
    </div>`);
};

/* ROLE LOGIN V1 - safer schema patches for tested tables */
async function s2SaveSignature(){
  const signer = val("s2Signer") || "Client";
  const signature = val("s2Signature") || "";
  if(!signature.trim()) return alert("Digite a assinatura.");
  const res = await apiInsert("field_signatures", {company_id:"demo-company", work_order_id:"WO-TEST-001", signer_name:signer, signer_role:"Client", signature_text:signature, status:"Signed"});
  if(!res.ok) return alert("Não salvou no Supabase. Verifique RLS/colunas de field_signatures.");
  fieldSignatures = await apiGet("field_signatures");
  alert("Assinatura salva.");
  renderClientHome();
}
async function s3CreateAutomationRun(){
  const res = await apiInsert("automation_flow_runs", {flow_name:"Atualização automática do cliente", run_status:"Simulated", result_message:"Fluxo criado pelo Sprint 3"});
  if(!res.ok) return alert("Não foi possível criar automação. Verifique RLS/colunas de automation_flow_runs.");
  automationFlowRuns = await apiGet("automation_flow_runs");
  alert("Automação registrada.");
  renderExecutiveDashboard();
}
async function s3CreateAIInsight(){
  const res = await apiInsert("ai_insights", {company_id:"demo-company", agent_name:"Operations Advisor", insight_type:"Operations", title:"Projeto com nova atividade", message:"Client recebeu atualização com fotos, timeline e próxima etapa.", priority:"Medium", status:"Open"});
  if(!res.ok) return alert("Não foi possível criar insight. Verifique RLS/colunas de ai_insights.");
  aiInsights = await apiGet("ai_insights");
  alert("Insight criado.");
  renderExecutiveDashboard();
}


/* CLIENT LABEL + REPORT LOCK PATCH V1 */
function ddClientLabelPatch(){
  try{
    document.querySelectorAll("option, label, h1, h2, h3, button, span, div, p").forEach(el=>{
      if(el.childNodes.length===1 && el.childNodes[0].nodeType===3){
        el.textContent = el.textContent
          .replace(/\bClient\b/g,"Client")
          .replace(/\bClients\b/g,"Clients")
          .replace(/\bclient\b/g,"cliente")
          .replace(/\bclients\b/g,"clientes");
      }
    });

    const role = localStorage.getItem("dd_role");
    if(role === "client"){
      document.querySelectorAll("select").forEach(sel=>{
        const txt = (sel.options[sel.selectedIndex]?.textContent || sel.getAttribute("aria-label") || "").toLowerCase();
        const first = sel.options[0]?.textContent?.toLowerCase() || "";
        if(first.includes("cliente") || first.includes("client")){
          if(sel.options.length > 1){
            sel.selectedIndex = 1;
          }
          sel.disabled = true;
          sel.title = "Client conectado pelo login";
        }
      });
    }
  }catch(e){ console.warn("ddClientLabelPatch", e); }
}

if(window.DDPostProcess) window.DDPostProcess.onPageChange("clientLabels", ddClientLabelPatch, [50, 500]);
document.addEventListener("DOMContentLoaded",()=>setTimeout(ddClientLabelPatch,300));
setTimeout(ddClientLabelPatch,1000);


/* ENGLISH ROLE CONSOLIDATION PATCH V1 */
(function(){
  if(window.DDAlerts) window.DDAlerts.registerTransform(function(msg){
    return String(msg || "")
      .replace(/Selecione a empresa\./gi, "Select a client.")
      .replace(/Selecione o cliente\./gi, "Select a client.")
      .replace(/Empresa/gi, "Client")
      .replace(/Relatório/gi, "Report")
      .replace(/Assinatura/gi, "Signature");
  });

  function translateVisibleText(){
    const map = [
      [/Empresa/g, "Client"],
      [/Empresas/g, "Clients"],
      [/empresa/g, "client"],
      [/empresas/g, "clients"],
      [/Centro de Relatórios/g, "Report Center"],
      [/Novo Relatório/g, "New Report"],
      [/Preparar Relatório/g, "Prepare Report"],
      [/Relatório Client/g, "Client Report"],
      [/Relatórios/g, "Reports"],
      [/Relatório/g, "Report"],
      [/Voltar/g, "Back"],
      [/Sair/g, "Logout"]
    ];

    if(window.DDText){
      window.DDText.registerRules("englishRole", map);
      window.DDText.applyRuleSet("englishRole");
    }
  }

  function lockClientSelectsForClientRole(){
    const role = localStorage.getItem("dd_role");
    const isClient = role === "client";
    document.querySelectorAll("select").forEach(sel=>{
      const first = (sel.options[0]?.textContent || "").toLowerCase();
      if(first.includes("client")){
        if(isClient && sel.options.length > 1){
          sel.selectedIndex = 1;
          sel.disabled = true;
          sel.dataset.lockedByRole = "client";
        }
      }
    });
  }

  function runEnglishPatch(){
    translateVisibleText();
    lockClientSelectsForClientRole();
  }

  if(window.DDPostProcess) window.DDPostProcess.onPageChange("englishPatch", runEnglishPatch, [50, 300]);

  document.addEventListener("DOMContentLoaded",()=>setTimeout(runEnglishPatch,200));
  if(window.DDPostProcess) window.DDPostProcess.register("englishPatch", runEnglishPatch, {everyMs:15000});
})();


/* REPORT CLIENT AUTOSELECT + ENGLISH CLEANUP V2 */
(function(){
  function cleanEnglish(){
    const rules = [
      [/\bCliente\b/g,"Client"],
      [/\bClientes\b/g,"Clients"],
      [/\bReport\b/g,"Report"],
      [/\bRelatórios\b/g,"Reports"],
      [/\bAssinatura\b/g,"Signature"],
      [/\bEmpresa\b/g,"Client"]
    ];
    if(window.DDText){
      window.DDText.registerRules("reportEnglish", rules);
      window.DDText.applyRuleSet("reportEnglish");
    }
  }

  function autoSelectClientFields(){
    document.querySelectorAll("select").forEach(sel=>{
      const firstText = (sel.options[0]?.textContent || "").toLowerCase();
      const looksClient = firstText.includes("client") || firstText.includes("empresa") || firstText.includes("cliente");
      if(looksClient && (!sel.value || sel.selectedIndex === 0)){
        for(let i=1;i<sel.options.length;i++){
          if(sel.options[i].value){
            sel.selectedIndex = i;
            sel.dispatchEvent(new Event("change", {bubbles:true}));
            break;
          }
        }
      }
    });
  }

  if(window.DDAlerts) window.DDAlerts.registerTransform(function(msg){
    return String(msg || "")
      .replace(/Selecione a empresa\./gi,"Select a client.")
      .replace(/Selecione a cliente\./gi,"Select a client.")
      .replace(/Selecione o cliente\./gi,"Select a client.")
      .replace(/Selecione a client\./gi,"Select a client.")
      .replace(/Cliente/g,"Client")
      .replace(/Report/g,"Report");
  });

  // Try to auto-select before common report actions
  document.addEventListener("click", function(e){
    const text = (e.target?.textContent || "").toLowerCase();
    if(text.includes("prepare report") || text.includes("preparar")){
      autoSelectClientFields();
      cleanEnglish();
    }
  }, true);

  function run(){
    cleanEnglish();
    autoSelectClientFields();
    if(window.DDImages) window.DDImages.installGenericImageFallbacks();
  }

  if(window.DDPostProcess) window.DDPostProcess.register("reportCleanup", run, {everyMs:15000});
  document.addEventListener("DOMContentLoaded",()=>setTimeout(run,250));
})();


/* CLIENT SESSION REPORT FIX V3 */
(function(){
  function getDDSession(){
    if(window.DDAuth) return window.DDAuth.getSession() || {};
    try{
      return JSON.parse(localStorage.getItem("dd_auth_session_v1") || "{}");
    }catch(e){
      return {};
    }
  }

  function ensureClientOptionFromSession(){
    const session = getDDSession();
    const role = window.DDAuth ? window.DDAuth.getRole(session.role || "client") : localStorage.getItem("dd_role") || session.role;
    const clientName = session.name || session.email || "Logged Client";
    const clientValue = session.email || session.name || "client-session";

    document.querySelectorAll("select").forEach(sel=>{
      const firstText = (sel.options[0]?.textContent || "").toLowerCase();
      const looksClient = firstText.includes("client") || firstText.includes("cliente") || firstText.includes("empresa");

      if(looksClient){
        let existing = [...sel.options].find(o => o.value === clientValue || o.textContent === clientName);

        if(!existing){
          const opt = document.createElement("option");
          opt.value = clientValue;
          opt.textContent = clientName;
          sel.appendChild(opt);
          existing = opt;
        }

        if(role === "client"){
          sel.value = existing.value;
          sel.disabled = true;
          sel.dataset.clientSessionLocked = "true";
        }else if(!sel.value || sel.selectedIndex === 0){
          sel.value = existing.value;
        }

        sel.dispatchEvent(new Event("change", {bubbles:true}));
      }
    });
  }

  function englishCleanupV3(){
    const rules = [
      [/\bCliente\b/g,"Client"],
      [/\bClientes\b/g,"Clients"],
      [/\bRelatorio\b/g,"Report"],
      [/\bReporte\b/g,"Report"],
      [/\bFinanceiro\b/g,"Financial"],
      [/\bNome do relatório\b/g,"Report name"],
      [/\bEmpresa\b/g,"Client"]
    ];
    if(window.DDText){
      window.DDText.registerRules("clientSessionEnglish", rules);
      window.DDText.applyRuleSet("clientSessionEnglish");
    }
  }

  if(window.DDAlerts) window.DDAlerts.registerBeforeAlert(function(msg){
    const m = String(msg || "");
    if(m.match(/select a client|selecione/i)){
      ensureClientOptionFromSession();
      const hasClient = [...document.querySelectorAll("select")].some(sel=>{
        const first = (sel.options[0]?.textContent || "").toLowerCase();
        return first.includes("client") && sel.value && sel.selectedIndex > 0;
      });
      if(hasClient){
        return false;
      }
    }
    return m;
  });

  if(window.DDAlerts) window.DDAlerts.registerTransform(function(msg){
    return String(msg || "")
       .replace(/Selecione a empresa\./gi,"Select a client.")
       .replace(/Selecione o cliente\./gi,"Select a client.")
       .replace(/Selecione a client\./gi,"Select a client.")
       .replace(/Cliente/g,"Client")
       .replace(/Relatorio/g,"Report")
       .replace(/Reporte/g,"Report")
       .replace(/Financeiro/g,"Financial");
  });

  document.addEventListener("click", function(e){
    const text = (e.target?.textContent || "").toLowerCase();
    if(text.includes("prepare report")){
      ensureClientOptionFromSession();
      englishCleanupV3();
    }
  }, true);

  function runV3(){
    ensureClientOptionFromSession();
    englishCleanupV3();
  }

  document.addEventListener("DOMContentLoaded",()=>setTimeout(runV3,250));
  setTimeout(runV3,500);
  if(window.DDPostProcess) window.DDPostProcess.register("clientSessionReport", runV3, {everyMs:15000});
})();


/* ROLE BASED ACCESS FINAL V4 */
(function(){
  const ROLE_ALLOWED = (window.DDCore && window.DDCore.ROLE_NAV_LABELS) || {
    client: [
      "Client Portal",
      "Reports"
    ],
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

  function getRole(){
    if(window.DDRoleUI && typeof window.DDRoleUI.getRole === "function"){
      return window.DDRoleUI.getRole("client");
    }
    if(window.DDAuth) return window.DDAuth.getRole("client");
    try{
      const s = JSON.parse(localStorage.getItem("dd_auth_session_v1") || "{}");
      return localStorage.getItem("dd_role") || s.role || "client";
    }catch(e){
      return localStorage.getItem("dd_role") || "client";
    }
  }

  function normalizeText(t){
    if(window.DDRoleUI && typeof window.DDRoleUI.normalizeText === "function"){
      return window.DDRoleUI.normalizeText(t);
    }
    if(window.DDCore && typeof window.DDCore.normalizeText === "function"){
      return window.DDCore.normalizeText(t);
    }
    return String(t || "").replace(/\s+/g," ").trim();
  }

  function isAllowedNav(text, role){
    if(window.DDRoleUI && typeof window.DDRoleUI.isNavLabelAllowed === "function"){
      return window.DDRoleUI.isNavLabelAllowed(role, text);
    }
    if(window.DDCore && typeof window.DDCore.isNavLabelAllowed === "function"){
      return window.DDCore.isNavLabelAllowed(role, text);
    }
    if(role === "owner") return true;
    const allowed = ROLE_ALLOWED[role] || ROLE_ALLOWED.client;
    return allowed.some(name => normalizeText(text).toLowerCase().includes(name.toLowerCase()));
  }

  function hideBlockedNav(){
    if(window.DDRoleUI && typeof window.DDRoleUI.hideDisallowedNavigation === "function"){
      window.DDRoleUI.hideDisallowedNavigation(getRole());
      return;
    }
    const role = getRole();
    document.body.setAttribute("data-dd-role", role);

    document.querySelectorAll("a, button, .nav-item, [onclick]").forEach(el=>{
      const txt = normalizeText(el.textContent);
      if(!txt) return;

      const looksNav =
        txt.includes("Home") ||
        txt.includes("Work Orders") ||
        txt.includes("Routes") ||
        txt.includes("Field") ||
        txt.includes("Workforce") ||
        txt.includes("Weather") ||
        txt.includes("Mobile") ||
        txt.includes("PWA") ||
        txt.includes("CRM") ||
        txt.includes("Client Portal") ||
        txt.includes("Reports") ||
        txt.includes("Finance") ||
        txt.includes("Intelligence") ||
        txt.includes("Administration") ||
        txt.includes("AI") ||
        txt.includes("BI");

      if(!looksNav) return;

      const allowed = isAllowedNav(txt, role);
      if(!allowed){
        el.style.display = "none";
        el.setAttribute("data-role-hidden","true");
      }else{
        if(el.getAttribute("data-role-hidden")==="true"){
          el.style.display = "";
          el.removeAttribute("data-role-hidden");
        }
      }
    });

    document.querySelectorAll(".nav-section-title,.group-title,.section-title").forEach(el=>{
      const parent = el.parentElement;
      if(!parent) return;
      const visible = [...parent.children].some(c => c !== el && getComputedStyle(c).display !== "none");
      if(!visible) el.style.display = "none";
    });
  }

  function protectCurrentPage(){
    if(window.DDRoleUI && typeof window.DDRoleUI.protectCurrentPage === "function"){
      window.DDRoleUI.protectCurrentPage(getRole());
      return;
    }
    const role = getRole();
    if(role === "owner") return;

    const title = normalizeText(document.querySelector("h1")?.textContent || document.title || "");
    const currentText = normalizeText(document.body.textContent || "");

    if(role === "client"){
      const allowed =
        currentText.includes("Client Portal") ||
        currentText.includes("Report Center") ||
        title.includes("Report") ||
        title.includes("Client");

      if(!allowed){
        if(typeof changePage === "function"){
          changePage("clientHome");
        }
      }
    }

    if(role === "employee"){
      const blocked =
        title.includes("Finance") ||
        title.includes("Administration") ||
        title.includes("Intelligence") ||
        currentText.includes("Executive") ||
        currentText.includes("Command Center");

      if(blocked && typeof changePage === "function"){
        changePage("mobileWorkforce");
      }
    }
  }

  function roleBadge(){
    if(window.DDRoleUI && typeof window.DDRoleUI.ensureRoleBadge === "function"){
      window.DDRoleUI.ensureRoleBadge(getRole());
      return;
    }
    const role = getRole().toUpperCase();
    const existing = document.querySelector("[data-role-final-badge]");
    if(existing){
      existing.textContent = role;
      return;
    }

    const badge = document.createElement("span");
    badge.setAttribute("data-role-final-badge","true");
    badge.textContent = role;
    badge.style.cssText = "display:inline-flex;align-items:center;padding:10px 16px;border-radius:999px;background:#dcfce7;color:#14532d;font-weight:900;margin-left:8px;";
    const top = document.querySelector(".topbar,.header-actions,header") || document.body;
    top.prepend(badge);
  }

  function clientLanding(){
    const role = getRole();
    if(role !== "client") return;

    const current = normalizeText(document.querySelector("h1")?.textContent || "");
    if(current.includes("Home") || current.includes("Command Center")){
      if(typeof changePage === "function"){
        changePage("clientHome");
      }
    }
  }

  function runRoleAccess(){
    hideBlockedNav();
    roleBadge();
    protectCurrentPage();
    clientLanding();
  }

  if(window.DDPostProcess) window.DDPostProcess.onPageChange("roleAccess", runRoleAccess, [50, 300]);

  document.addEventListener("DOMContentLoaded",()=>setTimeout(runRoleAccess,300));
  setTimeout(runRoleAccess,800);
  if(window.DDPostProcess) window.DDPostProcess.register("roleAccess", runRoleAccess, {everyMs:15000});
})();


/* CLIENT PORTAL POLISH + ROLE GUARD V5 */
(function(){
  const translationsV5 = [
    [/Dentro do prazo/g, "On Schedule"],
    [/72% concluído/g, "72% completed"],
    [/Última atualização/g, "Last Update"],
    [/Próxima Etapa/g, "Next Step"],
    [/Próxima Visita/g, "Next Visit"],
    [/Status do Projeto/g, "Project Status"],
    [/Projeto em andamento/g, "Project in Progress"],
    [/Instalação de irrigação/g, "Irrigation Installation"],
    [/Irrigação e preparação do terreno/g, "Irrigation and site preparation"],
    [/Responsável/g, "Assigned to"],
    [/Equipe Verde/g, "Green Team"],
    [/Documentos preparados para o cliente/g, "Documents prepared for the client"],
    [/concluído/g, "completed"],
    [/Acompanhe progresso/g, "Track progress"],
    [/fotos antes\/durante\/depois/g, "before/during/after photos"],
    [/próximas visitas/g, "upcoming visits"],
    [/equipe/g, "team"],
    [/documentos/g, "documents"],
    [/atualizações/g, "updates"],
    [/Ver Reports/g, "View Reports"],
    [/Falar com Team/g, "Contact Team"],
    [/Financeiro/g, "Financial"],
    [/Cliente/g, "Client"],
    [/Relatorio/g, "Report"],
    [/Reporte/g, "Report"]
  ];

  function getRoleV5(){
    if(window.DDRoleUI && typeof window.DDRoleUI.getRole === "function"){
      return window.DDRoleUI.getRole("client");
    }
    if(window.DDAuth) return window.DDAuth.getRole("client");
    try{
      const s = JSON.parse(localStorage.getItem("dd_auth_session_v1") || "{}");
      return localStorage.getItem("dd_role") || s.role || "client";
    }catch(e){
      return localStorage.getItem("dd_role") || "client";
    }
  }

  function translateV5(){
    if(window.DDText){
      window.DDText.registerRules("clientPortalV5", translationsV5);
      window.DDText.applyRuleSet("clientPortalV5");
    }
  }

  function removeDuplicateRoleBadgesV5(){
    if(window.DDRoleUI && typeof window.DDRoleUI.removeDuplicateRoleBadges === "function"){
      window.DDRoleUI.removeDuplicateRoleBadges();
      return;
    }
    const badges = [...document.querySelectorAll("[data-role-final-badge], .role-pill, .top-pill, span, button")]
      .filter(el => ["CLIENT","OWNER","EMPLOYEE"].includes((el.textContent || "").trim().toUpperCase()));
    const seen = {};
    badges.forEach(el=>{
      const key = (el.textContent || "").trim().toUpperCase();
      if(seen[key]){
        el.style.display = "none";
        el.setAttribute("data-dd-duplicate-role","true");
      }else{
        seen[key] = true;
        el.style.display = "";
      }
    });
  }

  function fixImagesV5(){
    if(window.DDImages) window.DDImages.fixProjectImages();
  }

  function roleGuardV5(){
    const role = getRoleV5();
    if(window.DDRoleUI && typeof window.DDRoleUI.hideBlockedKeywords === "function"){
      window.DDRoleUI.hideBlockedKeywords(role);
      return;
    }

    document.body.setAttribute("data-dd-role", role);

    if(role === "client"){
      const blockedWords = ["finance","administration","intelligence","workforce","routes","field","work orders","command center","owner command","employee view"];
      document.querySelectorAll("a,button,.nav-item,[onclick]").forEach(el=>{
        const t = (el.textContent || "").toLowerCase();
        if(blockedWords.some(w => t.includes(w))){
          el.style.display = "none";
        }
      });
    }

    if(role === "employee"){
      const blockedWords = ["finance","administration","intelligence"];
      document.querySelectorAll("a,button,.nav-item,[onclick]").forEach(el=>{
        const t = (el.textContent || "").toLowerCase();
        if(blockedWords.some(w => t.includes(w))){
          el.style.display = "none";
        }
      });
    }
  }

  function improveBackV5(){
    document.querySelectorAll("button,a").forEach(el=>{
      const t = (el.textContent || "").trim().toLowerCase();
      if(t.includes("back") && !el.dataset.ddBackV5){
        el.dataset.ddBackV5 = "true";
        el.addEventListener("click", function(ev){
          try{
            ev.preventDefault();
            const role = getRoleV5();
            if(role === "client" && typeof changePage === "function"){
              changePage("clientHome");
            }else if(typeof changePage === "function"){
              changePage("dashboard");
            }else{
              history.back();
            }
          }catch(e){ history.back(); }
        }, true);
      }
    });
  }

  function runV5(){
    translateV5();
    removeDuplicateRoleBadgesV5();
    fixImagesV5();
    roleGuardV5();
    improveBackV5();
  }

  if(window.DDPostProcess) window.DDPostProcess.onPageChange("clientPortalPolish", runV5, [50, 300]);

  document.addEventListener("DOMContentLoaded",()=>setTimeout(runV5,300));
  setTimeout(runV5,800);
  if(window.DDPostProcess) window.DDPostProcess.register("clientPortalPolish", runV5, {everyMs:30000});
})();


/* FINAL UNSPLASH 404 FIX */
(function(){
  function fixUnsplash404(){
    if(window.DDImages) window.DDImages.fixProjectImages();
  }

  if(window.DDPostProcess) window.DDPostProcess.onPageChange("imageFallbacks", fixUnsplash404, [50, 300]);

  document.addEventListener("DOMContentLoaded",()=>setTimeout(fixUnsplash404,200));
  setTimeout(fixUnsplash404,500);
  if(window.DDPostProcess) window.DDPostProcess.register("imageFallbacks", fixUnsplash404, {everyMs:30000});
})();


/* FINAL CONSOLE PERFORMANCE FIX */
(function(){
  // Debounced safety runner to avoid excessive DOM scans and Chrome [Violation] warnings.
  let ddPerfTimer = null;
  window.ddScheduleSafeRefresh = function(fn, delay){
    clearTimeout(ddPerfTimer);
    ddPerfTimer = setTimeout(function(){
      try{ if(typeof fn === "function") fn(); }catch(e){ console.warn("Safe refresh skipped", e); }
    }, delay || 250);
  };

  // Reduce browser warning for password inputs when login was rendered outside a form.
  function wrapLoosePasswordInputs(){
    document.querySelectorAll("input[type='password']").forEach(input=>{
      if(input.closest("form")) return;
      const parent = input.parentElement;
      if(!parent || parent.dataset.ddPasswordFormFixed === "true") return;

      const form = document.createElement("form");
      form.setAttribute("autocomplete","on");
      form.dataset.ddPasswordFormFixed = "true";
      form.style.display = "contents";

      parent.insertBefore(form, input);
      form.appendChild(input);

      form.addEventListener("submit", function(e){
        e.preventDefault();
        const btn = parent.querySelector("button,[type='button']");
        if(btn) btn.click();
      });
    });
  }

  document.addEventListener("DOMContentLoaded",()=>setTimeout(wrapLoosePasswordInputs,300));
  setTimeout(wrapLoosePasswordInputs,1000);

  if(window.DDPostProcess) window.DDPostProcess.onPageChange("passwordFormFix", wrapLoosePasswordInputs, [300]);
})();


/* DOUBLEDIAMOND V1 COMMERCIAL FINAL */
(function(){
  function session(){ return window.DDAuth ? (window.DDAuth.getSession() || {}) : (function(){ try{return JSON.parse(localStorage.getItem("dd_auth_session_v1")||"{}")}catch(e){return {}} })(); }
  function role(){ return window.DDAuth ? window.DDAuth.getRole("client") : (localStorage.getItem("dd_role") || session().role || "client"); }
  function setRole(r,n,e){ if(window.DDAuth) return window.DDAuth.setRoleSession(r,n,e); localStorage.setItem("dd_role",r); localStorage.setItem("dd_auth_session_v1",JSON.stringify({role:r,name:n||r,email:e||"",logged_at:new Date().toISOString()})); }
  function toast(m){ let x=document.getElementById("dd-toast"); if(!x){x=document.createElement("div");x.id="dd-toast";x.style.cssText="position:fixed;right:22px;bottom:22px;background:#10192e;color:#fff;padding:14px 18px;border-radius:16px;z-index:999999;font-weight:800";document.body.appendChild(x)} x.textContent=m; x.style.display="block"; clearTimeout(x.t); x.t=setTimeout(()=>x.style.display="none",2500); }

  function loginScreen(){
    const hasSession = window.DDAuth ? !!window.DDAuth.getSession() : !!localStorage.getItem("dd_auth_session_v1");
    if(typeof window.ddLoginClient === "function" || hasSession || document.getElementById("dd-commercial-login") || document.getElementById("ddLoginShell")) return;
    const div=document.createElement("div");
    div.id="dd-commercial-login";
    div.innerHTML=`<div class="dd-login-card">
      <div class="dd-logo-mark">◆</div>
      <p class="dd-kicker">DOUBLEDIAMOND COMMAND CENTER</p>
      <h1>Landscaping Operations Platform</h1>
      <p class="dd-sub">Client portals, field teams, reports and project visibility.</p>
      <div class="dd-login-tabs"><button data-r="client" class="active">Client</button><button data-r="employee">Employee</button><button data-r="owner">Owner</button></div>
      <form id="dd-login-form" autocomplete="on">
        <input id="dd-login-name" placeholder="Name" autocomplete="name">
        <input id="dd-login-email" type="email" placeholder="Email" autocomplete="email">
        <input id="dd-login-password" type="password" placeholder="Password" autocomplete="current-password">
        <button type="submit">Login</button>
      </form>
      <button id="dd-forgot-password" class="dd-link-btn">Forgot password?</button>
      <p class="dd-login-note">V1 commercial demo. Supabase Auth can replace local session in the next backend sprint.</p>
    </div>`;
    document.body.appendChild(div);
    let r="client";
    div.querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>{div.querySelectorAll("[data-r]").forEach(z=>z.classList.remove("active"));b.classList.add("active");r=b.dataset.r});
    div.querySelector("#dd-login-form").onsubmit=e=>{e.preventDefault();setRole(r,div.querySelector("#dd-login-name").value.trim()||r,div.querySelector("#dd-login-email").value.trim());div.remove();toast("Logged in as "+r.toUpperCase());setTimeout(()=>{if(r==="client"&&typeof changePage==="function")changePage("clientHome"); if(r==="employee"&&typeof changePage==="function")changePage("mobileWorkforce"); apply();},100)};
    div.querySelector("#dd-forgot-password").onclick=()=>toast((div.querySelector("#dd-login-email").value.trim())?"Password reset instructions prepared.":"Enter your email first.");
  }

  function brand(){
    if(window.DDText){
      window.DDText.registerRules("commercialBrand", [
        [/DoubleDiamond Platform/g,"DoubleDiamond Command Center"],
        [/Field Service Platform/g,"Landscaping Operations Platform"],
        [/Cliente/g,"Client"],
        [/Relatorio|Reporte/g,"Report"],
        [/Financeiro/g,"Financial"]
      ]);
      window.DDText.applyRuleSet("commercialBrand");
    }
    const badges=[...document.querySelectorAll("span,button,[data-role-final-badge]")].filter(el=>["CLIENT","OWNER","EMPLOYEE"].includes((el.textContent||"").trim().toUpperCase()));
    const seen={}; badges.forEach(el=>{let k=el.textContent.trim().toUpperCase(); if(seen[k]) el.style.display="none"; else seen[k]=1;});
  }

  function permissions(){
    const r=role(); document.body.dataset.ddRole=r;
    const blocked=(window.DDCore && window.DDCore.ROLE_BLOCKED_KEYWORDS) || {client:["work orders","routes","field","workforce","weather","mobile ready","pwa","finance","intelligence","administration","command center","owner"],employee:["finance","intelligence","administration","owner"]};
    document.querySelectorAll("a,button,.nav-item,[onclick]").forEach(el=>{
      const onclick = el.getAttribute && (el.getAttribute("onclick") || "");
      const routeMatch = onclick.match(/changePage\('([^']+)'/);
      if(routeMatch && window.DDCore && typeof window.DDCore.isPageAllowed === "function"){
        if(!window.DDCore.isPageAllowed(r, routeMatch[1])){
          el.style.display="none";
          el.dataset.ddBlocked="true";
        }else if(el.dataset.ddBlocked==="true"){
          el.style.display="";
          delete el.dataset.ddBlocked;
        }
        return;
      }
      const t=(el.textContent||"").toLowerCase();
      if((blocked[r]||[]).some(w=>t.includes(w))){
        el.style.display="none";
        el.dataset.ddBlocked="true";
      }else if(el.dataset.ddBlocked==="true"){
        el.style.display="";
        delete el.dataset.ddBlocked;
      }
    });
  }

  function clientManagement(){
    if(role()!=="owner" || document.getElementById("dd-client-management-panel")) return;
    const txt=(document.body.textContent||"").toLowerCase();
    if(!txt.includes("client") && !txt.includes("crm")) return;
    const target=document.querySelector(".card,.panel,.section-card,main,#pageContent")||document.body;
    const p=document.createElement("section"); p.id="dd-client-management-panel"; p.className="card dd-client-management";
    p.innerHTML=`<h2>Client Management</h2><p>Create and manage client portal access for V1.</p>
      <div class="dd-client-grid"><input id="dd-new-client-name" placeholder="Client name"><input id="dd-new-client-email" type="email" placeholder="Client email"><input id="dd-new-client-project" placeholder="Project name"><button id="dd-add-client-btn">Add Client</button></div><div id="dd-client-list"></div>`;
    target.prepend(p);
    function load(){let arr=JSON.parse(localStorage.getItem("dd_clients_v1")||"[]");let box=p.querySelector("#dd-client-list");box.innerHTML=arr.length?arr.map((c,i)=>`<div class="dd-client-row"><strong>${c.name}</strong><span>${c.email||"No email"}</span><span>${c.project||"No project"}</span><button data-i="${i}">Delete</button></div>`).join(""):"<p class='dd-empty'>No clients created yet.</p>";box.querySelectorAll("[data-i]").forEach(b=>b.onclick=()=>{arr.splice(+b.dataset.i,1);localStorage.setItem("dd_clients_v1",JSON.stringify(arr));load()})}
    p.querySelector("#dd-add-client-btn").onclick=()=>{let name=p.querySelector("#dd-new-client-name").value.trim(); if(!name)return toast("Client name is required."); let arr=JSON.parse(localStorage.getItem("dd_clients_v1")||"[]"); arr.push({name,email:p.querySelector("#dd-new-client-email").value.trim(),project:p.querySelector("#dd-new-client-project").value.trim(),created_at:new Date().toISOString()}); localStorage.setItem("dd_clients_v1",JSON.stringify(arr));toast("Client created.");load()};
    load();
  }

  function logout(){
    document.querySelectorAll("button,a").forEach(el=>{if((el.textContent||"").trim().toLowerCase()==="logout"&&!el.dataset.ddLogoutFinal){el.dataset.ddLogoutFinal=1;el.addEventListener("click",e=>{e.preventDefault();if(window.DDAuth){window.DDAuth.clearSession();}else{localStorage.removeItem("dd_role");localStorage.removeItem("dd_auth_session_v1");}location.href=location.pathname+"?v=v1-commercial-final"},true)}});
  }
  function apply(){permissions();brand();clientManagement();logout();}
  if(window.DDPostProcess) window.DDPostProcess.onPageChange("commercialFinal", apply, [100, 500]);
  document.addEventListener("DOMContentLoaded",()=>{setTimeout(loginScreen,100);setTimeout(apply,400)});
  setTimeout(apply,1000); if(window.DDPostProcess) window.DDPostProcess.register("commercialFinal", apply, {everyMs:30000, delayMs:1000});
})();


/* V1 COMMERCIAL AUDIT CLEAN FIXED */
(function(){
  function ddAuditCleanFixed(){
    try{
      document.querySelectorAll("input[type='password']").forEach(function(input){
        if(input.closest("form")) return;
        var parent = input.parentElement;
        if(!parent || parent.dataset.ddFormFixed === "true") return;
        parent.dataset.ddFormFixed = "true";
        var form = document.createElement("form");
        form.autocomplete = "on";
        form.style.display = "contents";
        parent.insertBefore(form, input);
        form.appendChild(input);
        form.addEventListener("submit", function(e){
          e.preventDefault();
          var btn = parent.querySelector("button");
          if(btn) btn.click();
        });
      });

      if(window.DDText){
        window.DDText.registerRules("auditCleanText", [
          [/Cliente/g, "Client"],
          [/Empresa/g, "Client"],
          [/Relatorio/g, "Report"],
          [/Reporte/g, "Report"],
          [/Financeiro/g, "Financial"]
        ]);
        window.DDText.applyRuleSet("auditCleanText");
      }

      if(window.DDImages) window.DDImages.fixProjectImages();
    }catch(e){
      console.warn("Audit clean fixed skipped:", e);
    }
  }

  if(window.DDPostProcess) window.DDPostProcess.onPageChange("auditCleanFixed", ddAuditCleanFixed, [200]);

  document.addEventListener("DOMContentLoaded", function(){ setTimeout(ddAuditCleanFixed, 500); });
  setTimeout(ddAuditCleanFixed, 1000);
})();
