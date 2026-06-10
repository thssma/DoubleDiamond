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
  renderMobileReady();
}

function formatMoneyExecutive(value){
  return Number(value || 0).toLocaleString("pt-BR", {
    minimumFractionDigits:2,
    maximumFractionDigits:2
  });
}
