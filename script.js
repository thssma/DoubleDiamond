const SUPABASE_URL = "https://phpphqcxzwpuiglkqkls.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBocHBocWN4endwdWlnbGtxa2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwNDE0NTAsImV4cCI6MjA5NjYxNzQ1MH0.z0F0KAHCWKdRTyg5JeNDzAWEbIdFEknT_kmx4QyMz3I";

let companies = [];
let companyUsers = [];
let integrationProviders = [];
let integrationConnections = [];
let integrationLogs = [];
let aiAgents = [];
let aiInsights = [];

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
}

function changePage(page, event){
  document.querySelectorAll(".menu-btn").forEach(btn => btn.classList.remove("active"));
  if(event) event.target.classList.add("active");

  const routes = {
    dashboard: renderDashboard,
    empresas: renderEmpresas,
    integrationHub: renderIntegrationHub,
    aiFoundation: renderAIFoundation,
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
