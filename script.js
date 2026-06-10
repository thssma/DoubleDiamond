const SUPABASE_URL = "https://phpphqcxzwpuiglkqkls.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBocHBocWN4endwdWlnbGtxa2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwNDE0NTAsImV4cCI6MjA5NjYxNzQ1MH0.z0F0KAHCWKdRTyg5JeNDzAWEbIdFEknT_kmx4QyMz3I";

let companies = [];
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
let fieldPhotos = [];
let fieldSignatures = [];
let workOrders = [];
let workOrderLogs = [];
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



const headers = {
  "apikey": SUPABASE_ANON_KEY,
  "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json"
};

window.onload = async () => {
  await loadData();
  renderDashboard();
};

async function apiGet(table){
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*&order=created_at.desc`, { headers });
  if(!res.ok) return [];
  return await res.json();
}

async function apiInsert(table, data){
  return await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method:"POST",
    headers:{...headers, "Prefer":"return=representation"},
    body:JSON.stringify(data)
  });
}

async function apiPatch(table, id, data){
  return await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method:"PATCH",
    headers:{...headers, "Prefer":"return=representation"},
    body:JSON.stringify(data)
  });
}

async function apiDelete(table, id){
  return await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method:"DELETE",
    headers
  });
}

async function loadData(){
  companies = await apiGet("companies");
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
  fieldPhotos = await apiGet("field_photos");
  fieldSignatures = await apiGet("field_signatures");
  workOrders = await apiGet("work_orders");
  workOrderLogs = await apiGet("work_order_logs");
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

}

function changePage(page, event){
  document.querySelectorAll(".menu-btn").forEach(btn => btn.classList.remove("active"));
  if(event) event.target.classList.add("active");

  const routes = {
    dashboard: renderDashboard,
    empresas: renderEmpresas,
    integrationHub: renderIntegrationHub,
    aiFoundation: renderAIFoundation,
    realIntegrations: renderRealIntegrations,
    copilot: renderCopilot,
    credentialManager: renderCredentialManager,
    executiveDashboard: renderExecutiveDashboard,
    kpiCenter: renderKpiCenter,
    automationCenter: renderAutomationCenter,
    reportCenter: renderReportCenter,
    mobileReady: renderMobileReady,
    fieldDashboard: renderFieldDashboard,
    pwaCenter: renderPwaCenter,
    routePlanning: renderRoutePlanning,
    weatherCenter: renderWeatherCenter,
    mobileWorkforce: renderMobileWorkforce,
    workOrders: renderWorkOrders,
    biDashboard: renderBIDashboard,
    analyticsCenter: renderAnalyticsCenter,
    forecastEngine: renderForecastEngine,
    profitabilityEngine: renderProfitabilityEngine,
    executiveIntelligence: renderExecutiveIntelligence,
    mapsReal: renderMapsReal,
    whatsappReal: renderWhatsAppReal,
    gmailReal: renderGmailReal,
    pushReal: renderPushReal,
    automationFlowsReal: renderAutomationFlowsReal,
    configuracoes: renderConfiguracoes
  };

  (routes[page] || renderDashboard)();
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
  setTitle("Enterprise Core");

  setContent(`
    <div class="foundation-note">
      Enterprise Core prepara o DoubleDiamond para SaaS multiempresa, integrações externas e IA futura.
    </div>

    <div class="cards">
      ${metric("Empresas", companies.length)}
      ${metric("Usuários Empresa", companyUsers.length)}
      ${metric("Providers", integrationProviders.length)}
      ${metric("Conexões", integrationConnections.length)}
      ${metric("AI Agents", aiAgents.length)}
      ${metric("AI Insights", aiInsights.length)}
    </div>
  `);
}

function renderEmpresas(){
  setTitle("Empresas");

  setContent(`
    <div class="foundation-note">V14 Multiempresa: camada inicial para SaaS.</div>

    <div class="card">
      <h2>Nova Empresa</h2>
      <div class="form-grid">
        <input id="companyName" placeholder="Nome da empresa">
        <input id="companyEmail" placeholder="Email">
        <input id="companyPhone" placeholder="Telefone">
        <select id="companyPlan"><option>Starter</option><option>Professional</option><option>Enterprise</option></select>
        <select id="companyStatus"><option>Active</option><option>Inactive</option><option>Trial</option></select>
      </div>
      <button class="primary-btn" onclick="addCompany()">Adicionar Empresa</button>
    </div>

    <div class="card">
      <h2>Usuário da Empresa</h2>
      <div class="form-grid">
        <select id="companyUserCompany"><option value="">Empresa</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input id="companyUserName" placeholder="Nome do usuário">
        <input id="companyUserEmail" placeholder="Email do usuário">
        <select id="companyUserRole"><option>Owner</option><option>Manager</option><option>Employee</option><option>Client</option></select>
      </div>
      <button class="primary-btn" onclick="addCompanyUser()">Adicionar Usuário</button>
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
            <button class="danger-btn" onclick="removeCompany('${company.id}')">Remover Empresa</button>
          </div>
        `;
      }).join("") || "<div class='card'><p>Nenhuma empresa cadastrada.</p></div>"}
    </div>
  `);
}

async function addCompany(){
  const name = val("companyName").trim();
  if(!name) return alert("Digite o nome da empresa.");

  const res = await apiInsert("companies", {
    name,
    email: val("companyEmail"),
    phone: val("companyPhone"),
    plan: val("companyPlan"),
    status: val("companyStatus")
  });

  if(!res.ok) return alert("Erro ao criar empresa.");

  companies = await apiGet("companies");
  renderEmpresas();
}

async function removeCompany(id){
  const res = await apiDelete("companies", id);
  if(!res.ok) return alert("Erro ao remover empresa.");

  companies = await apiGet("companies");
  companyUsers = await apiGet("company_users");
  renderEmpresas();
}

async function addCompanyUser(){
  const companyId = val("companyUserCompany");
  const name = val("companyUserName").trim();

  if(!companyId) return alert("Selecione a empresa.");
  if(!name) return alert("Digite o nome do usuário.");

  const res = await apiInsert("company_users", {
    company_id: companyId,
    user_name: name,
    user_email: val("companyUserEmail"),
    role: val("companyUserRole"),
    status: "Active"
  });

  if(!res.ok) return alert("Erro ao criar usuário da empresa.");

  companyUsers = await apiGet("company_users");
  renderEmpresas();
}

function renderIntegrationHub(){
  setTitle("Integration Hub");

  setContent(`
    <div class="foundation-note">V15 Integration Hub: estrutura para Google, WhatsApp, OpenAI e pagamentos.</div>

    <div class="card">
      <h2>Nova Conexão</h2>
      <div class="form-grid">
        <select id="integrationCompany"><option value="">Empresa</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
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
                  <strong>${company?.name || "Empresa"}</strong><br>
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

  if(!companyId) return alert("Selecione a empresa.");
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
      title: "Multiempresa sem empresa cadastrada",
      message: "Crie a primeira empresa para iniciar a preparação SaaS.",
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
      <p>Versão estrutural para V14 Multiempresa, V15 Integration Hub e V16 AI Foundation.</p>
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
          <option value="">Empresa</option>
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
  if(!companyId) return alert("Selecione a empresa.");

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
          <option value="">Empresa</option>
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
          <small>${companies.find(c => c.id === cred.company_id)?.name || "Empresa"}</small><br>
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
  if(!companyId) return alert("Selecione a empresa.");

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
    return "Análise simulada: priorize projetos com tarefas pendentes, baixa saúde operacional e falta de equipe.";
  }

  if(lower.includes("venda") || lower.includes("crm") || lower.includes("lead")){
    return "Análise simulada: priorize leads quentes, empresas em trial e planos com maior potencial de conversão.";
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
      ${metric("Recebido", "R$ " + formatMoneyExecutive(m.paidTotal))}
      ${metric("Empresas Ativas", m.activeCompanies)}
      ${metric("Conexões", m.connections)}
      ${metric("AI Insights", m.insights)}
      ${metric("Fila Integrações", m.queue)}
      ${metric("Relatórios", m.reports)}
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
      <div class="kpi-card kpi-good"><h3>Receita por Empresa</h3><p class="kpi-number">R$ ${formatMoneyExecutive(avgRevenue)}</p></div>
      <div class="kpi-card kpi-warn"><h3>Taxa de Conexão</h3><p class="kpi-number">${conversion}%</p></div>
      <div class="kpi-card kpi-good"><h3>Recebimento</h3><p class="kpi-number">${collectionRate}%</p></div>
      <div class="kpi-card kpi-warn"><h3>Automação</h3><p class="kpi-number">${m.automations}</p></div>
      <div class="kpi-card kpi-warn"><h3>Relatórios</h3><p class="kpi-number">${m.reports}</p></div>
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
          <option value="">Empresa</option>
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
          <small>${companies.find(c => c.id === a.company_id)?.name || "Empresa"}</small>
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
  if(!companyId) return alert("Selecione a empresa.");

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
  setTitle("Centro de Relatórios");

  setContent(`
    <div class="executive-hero">
      <h2>Report Center</h2>
      <p>Central de relatórios preparada para PDF, CSV e Excel.</p>
    </div>

    <div class="card">
      <h2>Novo Relatório</h2>
      <div class="form-grid">
        <select id="reportCompany">
          <option value="">Empresa</option>
          ${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}
        </select>
        <input id="reportName" placeholder="Nome do relatório">
        <select id="reportType"><option>Financeiro</option><option>Projetos</option><option>CRM</option><option>Operações</option><option>SaaS</option><option>Marketplace</option></select>
        <select id="reportFormat"><option>CSV</option><option>PDF</option><option>Excel</option></select>
      </div>
      <button class="primary-btn" onclick="createReportExport()">Preparar Relatório</button>
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
  if(!companyId) return alert("Selecione a empresa.");

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
          <option value="">Empresa</option>
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
          <h2>${companies.find(c => c.id === s.company_id)?.name || "Empresa"}</h2>
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
  if(!companyId) return alert("Selecione a empresa.");

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
  fieldPhotos = await apiGet("field_photos");
  fieldSignatures = await apiGet("field_signatures");
  workOrders = await apiGet("work_orders");
  workOrderLogs = await apiGet("work_order_logs");
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
      <p>PWA, offline, push, rotas, clima, equipe externa, GPS, fotos, assinatura e ordens de serviço.</p>
    </div>

    <div class="cards">
      ${metric("PWA Settings", pwaSettings.length)}
      ${metric("Cache Offline", offlineCacheItems.length)}
      ${metric("Push Templates", pushNotificationTemplates.length)}
      ${metric("Rotas", routePlans.length)}
      ${metric("Alertas Clima", weatherAlerts.length)}
      ${metric("Tarefas Campo", mobileWorkforceTasks.length)}
      ${metric("GPS Check-ins", gpsCheckins.length)}
      ${metric("Ordens Serviço", workOrders.length)}
    </div>

    <div class="field-phone">
      <div class="field-phone-screen">
        <h2>DoubleDiamond Field</h2>
        <p>Modo equipe em campo</p>
        <button class="field-phone-button">Check-in GPS</button>
        <button class="field-phone-button">Fotos</button>
        <button class="field-phone-button">Ordem de Serviço</button>
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
        <select id="pwaCompany"><option value="">Empresa</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
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
        <select id="cacheCompany"><option value="">Empresa</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input id="cacheKey" placeholder="Cache Key. Ex: projects">
        <select id="cacheModule"><option>Clientes</option><option>Projetos</option><option>Agenda</option><option>Tarefas</option><option>Ordens</option></select>
        <select id="cacheStatus"><option>Ready</option><option>Syncing</option><option>Error</option></select>
      </div>
      <button class="secondary-btn" onclick="saveOfflineCache()">Salvar Cache</button>
    </div>

    <div class="card">
      <h2>Push Template</h2>
      <div class="form-grid">
        <select id="pushCompany"><option value="">Empresa</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
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
  if(!companyId) return alert("Selecione a empresa.");

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
  if(!companyId) return alert("Selecione a empresa.");

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
  if(!companyId) return alert("Selecione a empresa.");

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
      <p>Planejamento de rotas para visitas, execução e equipe externa.</p>
    </div>

    <div class="card">
      <h2>Nova Rota</h2>
      <div class="form-grid">
        <select id="routeCompany"><option value="">Empresa</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input id="routeName" placeholder="Nome da rota">
        <input id="routeAssigned" placeholder="Responsável">
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
        <input id="stopClient" placeholder="Cliente">
        <input id="stopAddress" placeholder="Endereço">
        <input id="stopOrder" type="number" placeholder="Ordem">
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
  if(!companyId) return alert("Selecione a empresa.");

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
        <select id="weatherCompany"><option value="">Empresa</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
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
  if(!companyId) return alert("Selecione a empresa.");

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
      <p>Controle de equipe externa, check-in GPS, upload de fotos e aceite digital.</p>
    </div>

    <div class="card">
      <h2>Nova Tarefa de Campo</h2>
      <div class="form-grid">
        <select id="mwCompany"><option value="">Empresa</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input id="mwEmployee" placeholder="Funcionário">
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
        <select id="gpsCompany"><option value="">Empresa</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input id="gpsEmployee" placeholder="Funcionário">
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
        <select id="photoCompany"><option value="">Empresa</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input id="photoProject" placeholder="Projeto">
        <input id="photoEmployee" placeholder="Funcionário">
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
  if(!companyId) return alert("Selecione a empresa.");

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
  if(!companyId) return alert("Selecione a empresa.");

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
  renderMobileWorkforce();
}

async function addFieldPhoto(){
  const companyId = val("photoCompany");
  if(!companyId) return alert("Selecione a empresa.");

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
  setTitle("Ordens de Serviço");

  setContent(`
    <div class="field-hero">
      <h2>Smart Work Orders</h2>
      <p>Ordens de serviço com status, prioridade, execução, assinatura e histórico.</p>
    </div>

    <div class="card">
      <h2>Nova Ordem de Serviço</h2>
      <div class="form-grid">
        <select id="woCompany"><option value="">Empresa</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input id="woNumber" placeholder="Número OS">
        <input id="woClient" placeholder="Cliente">
        <input id="woProject" placeholder="Projeto">
        <input id="woAssigned" placeholder="Responsável">
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
        <select id="sigWorkOrder"><option value="">Ordem de Serviço</option>${workOrders.map(w => `<option value="${w.id}">${w.work_order_number} - ${w.client_name}</option>`).join("")}</select>
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
            <p>Responsável: ${w.assigned_to || "N/A"}</p>
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
  if(!companyId) return alert("Selecione a empresa.");

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
      ${metric("Receita Total", "R$ " + formatMoneyBI(m.invoiceTotal))}
      ${metric("Recebido", "R$ " + formatMoneyBI(m.paidTotal))}
      ${metric("MRR", "R$ " + formatMoneyBI(m.mrr))}
      ${metric("Lucro Estimado", "R$ " + formatMoneyBI(m.profit))}
      ${metric("Margem", m.margin + "%")}
      ${metric("Empresas", m.companies)}
      ${metric("Ordens Serviço", m.workOrders)}
      ${metric("Rotas", m.routes)}
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
        <select id="rankingCompany"><option value="">Empresa</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <select id="rankingType"><option>Top Cliente</option><option>Top Serviço</option><option>Top Projeto</option><option>Top Funcionário</option><option>Top Receita</option></select>
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
  if(!companyId) return alert("Selecione a empresa.");

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
        <select id="profitCompany"><option value="">Empresa</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <select id="profitType"><option>Cliente</option><option>Projeto</option><option>Serviço</option><option>Operação</option></select>
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
  if(!companyId) return alert("Selecione a empresa.");

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
    items.push(["Financeiro", "Margem baixa", "A margem estimada está abaixo de 25%. Revise custos, preço e produtividade.", "Warning"]);
  }

  if(m.mrr <= 0){
    items.push(["SaaS", "MRR zerado", "Ainda não há receita recorrente mensal. Priorize planos e assinaturas ativas.", "Warning"]);
  }

  if(m.workOrders > 0 && m.gps === 0){
    items.push(["Operação", "Ordens sem GPS", "Existem ordens de serviço, mas nenhum check-in GPS. Incentive uso do mobile em campo.", "Info"]);
  }

  if(m.routes === 0){
    items.push(["Campo", "Rotas não planejadas", "Nenhuma rota cadastrada. Planejamento de rotas reduz tempo e combustível.", "Info"]);
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
    <div class="realint-hero"><h2>Google Maps Real Ready</h2><p>Rotas com link real para Google Maps e fila para cálculo backend.</p></div>
    <div class="realint-warning">Distância/tempo automáticos exigem Google Maps API no backend. O frontend gera link de navegação seguro.</div>
    <div class="card">
      <h2>Nova Rota Google Maps</h2>
      <div class="form-grid">
        <select id="mapsCompany"><option value="">Empresa</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
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
  if(!companyId) return alert("Selecione a empresa.");
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
        <select id="waCompany"><option value="">Empresa</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
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
  if(!companyId) return alert("Selecione a empresa.");
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
        <select id="gmailCompany"><option value="">Empresa</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
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
  if(!companyId) return alert("Selecione a empresa.");
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
        <select id="pushRealCompany"><option value="">Empresa</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
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
  if(!companyId) return alert("Selecione a empresa.");
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
    <div class="realint-hero"><h2>Automation Flows Real</h2><p>Fluxos conectando Lead, Orçamento, Projeto, OS, WhatsApp, Email e Relatório.</p></div>
    <div class="card">
      <h2>Novo Flow Template</h2>
      <div class="form-grid">
        <select id="flowCompany"><option value="">Empresa</option>${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
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
  if(!companyId) return alert("Selecione a empresa.");
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
        <select id="mapsCompany"><option value="">Empresa</option>${companyOptionsReal()}</select>
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

  if(!companyId) return alert("Selecione a empresa.");
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
        <select id="waCompany"><option value="">Empresa</option>${companyOptionsReal()}</select>
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
  if(!companyId) return alert("Selecione a empresa.");

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
        <select id="gmailCompany"><option value="">Empresa</option>${companyOptionsReal()}</select>
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
  if(!companyId) return alert("Selecione a empresa.");

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
        <select id="pushRealCompany"><option value="">Empresa</option>${companyOptionsReal()}</select>
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
  if(!companyId) return alert("Selecione a empresa.");

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
    <div class="realint-hero"><h2>Automation Flows Real</h2><p>Fluxos conectando Lead, Orçamento, Projeto, OS, WhatsApp, Email e Relatório.</p></div>

    <div class="card">
      <h2>Novo Flow Template</h2>
      <div class="form-grid">
        <select id="flowCompany"><option value="">Empresa</option>${companyOptionsReal()}</select>
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
  if(!companyId) return alert("Selecione a empresa.");

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
