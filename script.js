const SUPABASE_URL = "https://phpphqcxzwpuiglkqkls.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBocHBocWN4endwdWlnbGtxa2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwNDE0NTAsImV4cCI6MjA5NjYxNzQ1MH0.z0F0KAHCWKdRTyg5JeNDzAWEbIdFEknT_kmx4QyMz3I";

let clients = [];
let quotes = [];
let services = [];
let projects = [];
let quotePhotos = [];
let projectPhotos = [];
let financeItems = [];
let appointments = [];
let reports = [];
let employees = [];

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

async function apiDelete(table, id){
  return await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method:"DELETE",
    headers
  });
}

async function loadData(){
  clients = await apiGet("clients");
  quotes = await apiGet("quotes");
  services = await apiGet("services");
  projects = await apiGet("projects");
  quotePhotos = await apiGet("quote_photos");
  projectPhotos = await apiGet("project_photos");
  financeItems = await apiGet("finance");
  appointments = await apiGet("appointments");
  reports = await apiGet("reports");
  employees = await apiGet("employees");
}

function changePage(page, event){
  document.querySelectorAll(".menu-btn").forEach(btn => btn.classList.remove("active"));
  if(event) event.target.classList.add("active");

  const routes = {
    dashboard: renderDashboard,
    clientes: renderClientes,
    orcamentos: renderOrcamentos,
    servicos: renderServicos,
    projetos: renderProjetos,
    fotos: renderFotos,
    fotosProjetos: renderFotosProjetos,
    financeiro: renderFinanceiro,
    agenda: renderAgenda,
    relatorios: renderRelatorios,
    equipe: renderEquipe,
    configuracoes: renderConfiguracoes
  };

  (routes[page] || (() => renderPlaceholder(page)))();
}

function setTitle(title){ document.getElementById("pageTitle").innerText = title; }
function setContent(html){ document.getElementById("pageContent").innerHTML = html; }

/* DASHBOARD EXECUTIVO */
function renderDashboard(){
  setTitle("Dashboard Executivo");

  const approvedRevenue = quotes.filter(q => q.status === "Approved").reduce((s,q) => s + Number(q.value || 0), 0);
  const incomePaid = financeItems.filter(i => i.type === "Income" && i.status === "Paid").reduce((s,i) => s + Number(i.amount || 0), 0);
  const expensesPaid = financeItems.filter(i => i.type === "Expense" && i.status === "Paid").reduce((s,i) => s + Number(i.amount || 0), 0);
  const pendingIncome = financeItems.filter(i => i.type === "Income" && i.status === "Pending").reduce((s,i) => s + Number(i.amount || 0), 0);
  const activeProjects = projects.filter(p => ["Planning","Quoted","Scheduled","In Progress"].includes(p.status)).length;
  const completedProjects = projects.filter(p => p.status === "Completed").length;
  const totalPhotos = quotePhotos.length + projectPhotos.length;

  setContent(`
    <div class="notice">
      V4.5 ativa: Dashboard executivo + Conversão Orçamento → Projeto + Relatório automático.
    </div>

    <div class="cards">
      ${metric("Receita Prevista", "R$ " + formatMoney(approvedRevenue), "purple")}
      ${metric("Receita Recebida", "R$ " + formatMoney(incomePaid), "good")}
      ${metric("Despesas Pagas", "R$ " + formatMoney(expensesPaid), "bad")}
      ${metric("Lucro Real", "R$ " + formatMoney(incomePaid - expensesPaid), "good")}
      ${metric("A Receber", "R$ " + formatMoney(pendingIncome), "warn")}
      ${metric("Projetos Ativos", activeProjects, "purple")}
      ${metric("Projetos Concluídos", completedProjects, "good")}
      ${metric("Fotos", totalPhotos, "")}
      ${metric("Clientes", clients.length, "")}
      ${metric("Equipe", employees.length, "")}
    </div>

    <div class="card">
      <h2>Atalhos de Operação</h2>
      <p>1. Aprove um orçamento em Orçamentos. 2. Clique em Converter em Projeto. 3. Gere relatório automático em Relatórios.</p>
      <div class="action-row">
        <button class="primary-btn" onclick="changePage('orcamentos')">Ir para Orçamentos</button>
        <button class="secondary-btn" onclick="changePage('relatorios')">Gerar Relatório</button>
      </div>
    </div>
  `);
}

function metric(label, value, type=""){
  return `<div class="card metric ${type}"><h3>${label}</h3><p class="big ${type}">${value}</p></div>`;
}

/* CLIENTES */
function renderClientes(){
  setTitle("Clientes");
  setContent(`
    <div class="card">
      <h2>Novo Cliente</h2>
      <div class="form-grid">
        <input id="name" placeholder="Nome">
        <input id="phone" placeholder="Telefone">
        <input id="email" placeholder="Email">
        <input id="address" placeholder="Endereço">
        <select id="propertyType">
          <option value="">Tipo de propriedade</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="HOA Community">HOA Community</option>
          <option value="Office Building">Office Building</option>
        </select>
        <select id="clientStatus">
          <option value="Lead">Lead</option>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>
      </div>
      <textarea id="notes" placeholder="Observações"></textarea>
      <button class="primary-btn" onclick="addClient()">Adicionar Cliente</button>
    </div>
    <div class="card"><h2>Clientes Cadastrados</h2><div id="clientList"></div></div>
  `);
  updateClientList();
}

async function addClient(){
  const name = val("name").trim();
  if(!name) return alert("Digite o nome do cliente.");
  const res = await apiInsert("clients", {
    name, phone:val("phone"), email:val("email"), address:val("address"),
    property_type:val("propertyType"), status:val("clientStatus"), notes:val("notes")
  });
  if(!res.ok) return alert("Erro ao salvar cliente.");
  clients = await apiGet("clients");
  renderClientes();
}

async function removeClient(id){
  const res = await apiDelete("clients", id);
  if(!res.ok) return alert("Erro ao remover cliente.");
  await loadData(); renderClientes();
}

function updateClientList(){
  const el = document.getElementById("clientList");
  if(!clients.length) return el.innerHTML = "<p>Nenhum cliente cadastrado.</p>";
  el.innerHTML = clients.map(c => item(`
    <strong>${c.name}</strong><br>
    <small>${c.phone || "Sem telefone"} | ${c.email || "Sem email"}</small><br>
    <small>${c.address || "Sem endereço"}</small><br>
    <small>${c.property_type || "Sem tipo"} • ${c.status}</small>
  `, `removeClient('${c.id}')`)).join("");
}

/* ORÇAMENTOS + CONVERSÃO */
function renderOrcamentos(){
  setTitle("Orçamentos");
  setContent(`
    <div class="card">
      <h2>Novo Orçamento</h2>
      <div class="form-grid">
        <select id="quoteClient"><option value="">Selecione o cliente</option>${clients.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <select id="quoteService"><option value="">Serviço</option>${services.map(s => `<option value="${s.name}">${s.name}</option>`).join("")}</select>
        <input id="quoteValue" type="number" placeholder="Valor estimado">
        <select id="quoteStatus"><option>Draft</option><option>Sent</option><option>Approved</option><option>Rejected</option></select>
      </div>
      <textarea id="quoteDescription" placeholder="Descrição"></textarea>
      <button class="primary-btn" onclick="addQuote()">Adicionar Orçamento</button>
    </div>
    <div class="card"><h2>Orçamentos Cadastrados</h2><div id="quoteList"></div></div>
  `);
  updateQuoteList();
}

async function addQuote(){
  const clientId = val("quoteClient");
  const service = val("quoteService");
  if(!clientId) return alert("Selecione um cliente.");
  if(!service) return alert("Selecione um serviço.");
  const client = clients.find(c => c.id === clientId);
  const res = await apiInsert("quotes", {
    client_id:clientId, client_name:client.name, service,
    value:Number(val("quoteValue") || 0), status:val("quoteStatus"), description:val("quoteDescription")
  });
  if(!res.ok) return alert("Erro ao salvar orçamento.");
  quotes = await apiGet("quotes"); renderOrcamentos();
}

async function removeQuote(id){
  const res = await apiDelete("quotes", id);
  if(!res.ok) return alert("Erro ao remover orçamento.");
  quotes = await apiGet("quotes"); renderOrcamentos();
}

async function convertQuoteToProject(quoteId){
  const quote = quotes.find(q => q.id === quoteId);
  if(!quote) return alert("Orçamento não encontrado.");

  if(quote.status !== "Approved"){
    return alert("Somente orçamentos com status Approved podem virar projeto.");
  }

  const alreadyExists = projects.some(p =>
    p.client_name === quote.client_name &&
    p.service_name === quote.service &&
    (p.notes || "").includes(`Origem orçamento: ${quote.id}`)
  );

  if(alreadyExists){
    return alert("Este orçamento já foi convertido em projeto.");
  }

  const newProject = {
    client_id: quote.client_id || "",
    client_name: quote.client_name || "",
    service_name: quote.service || "",
    project_name: `${quote.service} - ${quote.client_name}`,
    start_date: null,
    end_date: null,
    status: "Planning",
    notes: `Criado automaticamente a partir de orçamento aprovado.\nOrigem orçamento: ${quote.id}\nValor estimado: R$ ${formatMoney(quote.value)}\nDescrição: ${quote.description || ""}`
  };

  const projectRes = await apiInsert("projects", newProject);

  if(!projectRes.ok){
    alert("Erro ao converter orçamento em projeto.");
    return;
  }

  const financeRes = await apiInsert("finance", {
    type: "Income",
    title: `Receber - ${quote.service} - ${quote.client_name}`,
    related_client: quote.client_name || "",
    related_project: newProject.project_name,
    amount: Number(quote.value || 0),
    status: "Pending",
    due_date: null,
    notes: `Criado automaticamente junto com o projeto.\nOrigem orçamento: ${quote.id}`
  });

  if(!financeRes.ok){
    alert("Projeto criado, mas houve erro ao criar lançamento financeiro.");
  }else{
    alert("Projeto e lançamento financeiro criados com sucesso.");
  }

  await loadData();
  renderOrcamentos();
}

function updateQuoteList(){
  const el = document.getElementById("quoteList");
  if(!quotes.length) return el.innerHTML = "<p>Nenhum orçamento cadastrado.</p>";
  el.innerHTML = quotes.map(q => {
    const converted = projects.some(p =>
      p.client_name === q.client_name &&
      p.service_name === q.service &&
      (p.notes || "").includes(`Origem orçamento: ${q.id}`)
    );

    return `
      <div class="list-item">
        <div>
          <strong>${q.client_name}</strong><br>
          <small>${q.service}</small><br>
          <small>${q.description || "Sem descrição"}</small><br>
          <strong>R$ ${formatMoney(q.value)}</strong><br>
          <span class="status ${quoteStatusClass(q.status)}">${q.status}</span>
          ${converted ? `<span class="status status-completed">Projeto criado</span>` : ""}
          <div class="action-row">
            ${q.status === "Approved" && !converted ? `<button class="success-btn" onclick="convertQuoteToProject('${q.id}')">Converter em Projeto</button>` : ""}
          </div>
        </div>
        <button class="danger-btn" onclick="removeQuote('${q.id}')">Remover</button>
      </div>
    `;
  }).join("");
}

/* SERVIÇOS */
function renderServicos(){
  setTitle("Serviços");
  setContent(`
    <div class="card">
      <h2>Novo Serviço</h2>
      <div class="form-grid">
        <input id="serviceName" placeholder="Nome do serviço">
        <select id="serviceCategory"><option value="">Categoria</option><option>Lawn Care</option><option>Landscaping</option><option>Irrigation</option><option>Pressure Washing</option><option>Gutter Cleaning</option><option>Tree Care</option><option>Seasonal Cleanup</option><option>Other</option></select>
        <input id="serviceBasePrice" type="number" placeholder="Preço base">
        <input id="serviceDuration" placeholder="Duração estimada">
        <select id="serviceStatus"><option>Active</option><option>Inactive</option></select>
      </div>
      <textarea id="serviceDescription" placeholder="Descrição"></textarea>
      <button class="primary-btn" onclick="addService()">Adicionar Serviço</button>
    </div>
    <div class="card"><h2>Serviços Cadastrados</h2><div id="serviceList"></div></div>
  `);
  updateServiceList();
}

async function addService(){
  const name = val("serviceName").trim();
  if(!name) return alert("Digite o nome do serviço.");
  const res = await apiInsert("services", {
    name, category:val("serviceCategory"), base_price:Number(val("serviceBasePrice") || 0),
    estimated_duration:val("serviceDuration"), status:val("serviceStatus"), description:val("serviceDescription")
  });
  if(!res.ok) return alert("Erro ao salvar serviço.");
  services = await apiGet("services"); renderServicos();
}

async function removeService(id){
  const res = await apiDelete("services", id);
  if(!res.ok) return alert("Erro ao remover serviço.");
  services = await apiGet("services"); renderServicos();
}

function updateServiceList(){
  const el = document.getElementById("serviceList");
  if(!services.length) return el.innerHTML = "<p>Nenhum serviço cadastrado.</p>";
  el.innerHTML = services.map(s => item(`
    <strong>${s.name}</strong><br>
    <small>${s.category || "Sem categoria"} • ${s.estimated_duration || "Sem duração"}</small><br>
    <strong>R$ ${formatMoney(s.base_price)}</strong><br>
    <small>${s.description || "Sem descrição"}</small><br>
    <span class="status ${s.status === "Active" ? "status-active" : "status-inactive"}">${s.status}</span>
  `, `removeService('${s.id}')`)).join("");
}

/* PROJETOS */
function renderProjetos(){
  setTitle("Projetos");
  setContent(`
    <div class="card">
      <h2>Novo Projeto</h2>
      <div class="form-grid">
        <select id="projectClient"><option value="">Cliente</option>${clients.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <select id="projectService"><option value="">Serviço</option>${services.map(s => `<option value="${s.name}">${s.name}</option>`).join("")}</select>
        <input id="projectName" placeholder="Nome do Projeto">
        <input id="projectStart" type="date">
        <input id="projectEnd" type="date">
        <select id="projectStatus"><option>Planning</option><option>Quoted</option><option>Scheduled</option><option>In Progress</option><option>Completed</option><option>Cancelled</option></select>
      </div>
      <textarea id="projectNotes" placeholder="Observações"></textarea>
      <button class="primary-btn" onclick="addProject()">Criar Projeto</button>
    </div>
    <div class="card"><h2>Projetos Cadastrados</h2><div id="projectList"></div></div>
  `);
  updateProjectList();
}

async function addProject(){
  const clientId = val("projectClient");
  if(!clientId) return alert("Selecione um cliente.");
  const client = clients.find(c => c.id === clientId);
  const res = await apiInsert("projects", {
    client_id:clientId, client_name:client.name, service_name:val("projectService"),
    project_name:val("projectName") || "Projeto sem nome", start_date:val("projectStart") || null,
    end_date:val("projectEnd") || null, status:val("projectStatus"), notes:val("projectNotes")
  });
  if(!res.ok) return alert("Erro ao criar projeto.");
  projects = await apiGet("projects"); renderProjetos();
}

async function removeProject(id){
  const res = await apiDelete("projects", id);
  if(!res.ok) return alert("Erro ao remover projeto.");
  projects = await apiGet("projects"); renderProjetos();
}

function updateProjectList(){
  const el = document.getElementById("projectList");
  if(!projects.length) return el.innerHTML = "<p>Nenhum projeto cadastrado.</p>";
  el.innerHTML = projects.map(p => item(`
    <strong>${p.project_name}</strong><br>
    <small>Cliente: ${p.client_name || "Sem cliente"}</small><br>
    <small>Serviço: ${p.service_name || "Sem serviço"}</small><br>
    <small>Início: ${p.start_date || "Sem data"} • Fim: ${p.end_date || "Sem data"}</small><br>
    <span class="status ${projectStatusClass(p.status)}">${p.status}</span>
  `, `removeProject('${p.id}')`)).join("");
}

/* FOTOS ORÇAMENTOS */
function renderFotos(){
  setTitle("Fotos de Orçamentos");
  setContent(`
    <div class="card">
      <h2>Enviar Foto</h2>
      <div class="form-grid">
        <select id="photoQuote"><option value="">Selecione o orçamento</option>${quotes.map(q => `<option value="${q.id}">${q.client_name} - ${q.service}</option>`).join("")}</select>
        <input id="photoFile" type="file" accept="image/*">
      </div>
      <button class="primary-btn" onclick="uploadPhoto('quote')">Enviar Foto</button>
    </div>
    <div class="card"><h2>Galeria</h2><div id="photoList"></div></div>
  `);
  renderPhotoGrid("photoList", quotePhotos, "quote");
}

/* FOTOS PROJETOS */
function renderFotosProjetos(){
  setTitle("Fotos de Projetos");
  setContent(`
    <div class="card">
      <h2>Enviar Foto do Projeto</h2>
      <div class="form-grid">
        <select id="projectPhotoProject"><option value="">Selecione o projeto</option>${projects.map(p => `<option value="${p.id}">${p.project_name} - ${p.client_name}</option>`).join("")}</select>
        <select id="projectPhotoType"><option>Before</option><option>During</option><option>After</option></select>
        <input id="projectPhotoFile" type="file" accept="image/*">
      </div>
      <button class="primary-btn" onclick="uploadPhoto('project')">Enviar Foto</button>
    </div>
    <div class="card"><h2>Galeria de Projetos</h2><div id="projectPhotoList"></div></div>
  `);
  renderPhotoGrid("projectPhotoList", projectPhotos, "project");
}

async function uploadPhoto(type){
  const isProject = type === "project";
  const selectId = isProject ? "projectPhotoProject" : "photoQuote";
  const fileId = isProject ? "projectPhotoFile" : "photoFile";
  const bucket = isProject ? "project-photos" : "quote-photos";
  const table = isProject ? "project_photos" : "quote_photos";

  const recordId = val(selectId);
  const file = document.getElementById(fileId).files[0];
  if(!recordId) return alert("Selecione o registro.");
  if(!file) return alert("Selecione uma foto.");

  const ext = file.name.split(".").pop();
  const fileName = `${recordId}-${Date.now()}.${ext}`;

  const uploadRes = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}/${fileName}`, {
    method:"POST",
    headers:{
      "apikey":SUPABASE_ANON_KEY,
      "Authorization":`Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type":file.type,
      "x-upsert":"true"
    },
    body:file
  });

  if(!uploadRes.ok) return alert("Erro ao enviar foto para o Storage.");

  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${fileName}`;

  let payload;
  if(isProject){
    const project = projects.find(p => p.id === recordId);
    payload = {
      project_id:recordId,
      project_label:`${project.project_name} - ${project.client_name}`,
      photo_type:val("projectPhotoType"),
      photo_url:publicUrl
    };
  }else{
    const quote = quotes.find(q => q.id === recordId);
    payload = {
      quote_id:recordId,
      quote_label:`${quote.client_name} - ${quote.service}`,
      photo_url:publicUrl
    };
  }

  const saveRes = await apiInsert(table, payload);
  if(!saveRes.ok) return alert("Foto enviada, mas erro ao salvar registro.");

  if(isProject){
    projectPhotos = await apiGet("project_photos");
    renderFotosProjetos();
  }else{
    quotePhotos = await apiGet("quote_photos");
    renderFotos();
  }
}

async function removePhoto(type, id){
  const table = type === "project" ? "project_photos" : "quote_photos";
  const res = await apiDelete(table, id);
  if(!res.ok) return alert("Erro ao remover foto.");
  if(type === "project"){
    projectPhotos = await apiGet("project_photos");
    renderFotosProjetos();
  }else{
    quotePhotos = await apiGet("quote_photos");
    renderFotos();
  }
}

function renderPhotoGrid(containerId, photos, type){
  const el = document.getElementById(containerId);
  if(!photos.length) return el.innerHTML = "<p>Nenhuma foto enviada.</p>";
  el.innerHTML = `<div class="photo-grid">${photos.map(p => `
    <div class="photo-card">
      <img src="${p.photo_url}" alt="Foto">
      <div class="photo-card-content">
        <strong>${p.quote_label || p.project_label || "Registro"}</strong>
        <small>${p.photo_type || ""}</small>
        <small>${p.created_at ? new Date(p.created_at).toLocaleDateString("pt-BR") : ""}</small>
        <button class="danger-btn" onclick="removePhoto('${type}','${p.id}')">Remover</button>
      </div>
    </div>
  `).join("")}</div>`;
}

/* FINANCEIRO */
function renderFinanceiro(){
  setTitle("Financeiro");
  setContent(`
    <div class="card">
      <h2>Novo Lançamento</h2>
      <div class="form-grid">
        <select id="financeType"><option>Income</option><option>Expense</option></select>
        <input id="financeTitle" placeholder="Título">
        <input id="financeAmount" type="number" placeholder="Valor">
        <select id="financeStatus"><option>Pending</option><option>Paid</option><option>Overdue</option></select>
        <input id="financeDue" type="date">
        <input id="financeClient" placeholder="Cliente relacionado">
        <input id="financeProject" placeholder="Projeto relacionado">
      </div>
      <textarea id="financeNotes" placeholder="Observações"></textarea>
      <button class="primary-btn" onclick="addFinance()">Adicionar</button>
    </div>
    <div class="card"><h2>Lançamentos</h2><div id="financeList"></div></div>
  `);
  updateFinanceList();
}

async function addFinance(){
  const title = val("financeTitle").trim();
  if(!title) return alert("Digite o título.");
  const res = await apiInsert("finance", {
    type:val("financeType"), title, amount:Number(val("financeAmount") || 0), status:val("financeStatus"),
    due_date:val("financeDue") || null, related_client:val("financeClient"),
    related_project:val("financeProject"), notes:val("financeNotes")
  });
  if(!res.ok) return alert("Erro ao salvar financeiro.");
  financeItems = await apiGet("finance"); renderFinanceiro();
}

async function removeFinance(id){
  const res = await apiDelete("finance", id);
  if(!res.ok) return alert("Erro ao remover lançamento.");
  financeItems = await apiGet("finance"); renderFinanceiro();
}

function updateFinanceList(){
  const el = document.getElementById("financeList");
  if(!financeItems.length) return el.innerHTML = "<p>Nenhum lançamento cadastrado.</p>";
  el.innerHTML = financeItems.map(f => item(`
    <strong>${f.title}</strong><br>
    <small>${f.type} • ${f.status} • ${f.due_date || "Sem vencimento"}</small><br>
    <small>${f.related_client || "Sem cliente"} • ${f.related_project || "Sem projeto"}</small><br>
    <strong>R$ ${formatMoney(f.amount)}</strong><br>
    <span class="status ${financeStatusClass(f)}">${f.status}</span>
  `, `removeFinance('${f.id}')`)).join("");
}

/* AGENDA */
function renderAgenda(){
  setTitle("Agenda");
  setContent(`
    <div class="card">
      <h2>Novo Agendamento</h2>
      <div class="form-grid">
        <input id="appointmentTitle" placeholder="Título">
        <select id="appointmentClient"><option value="">Cliente</option>${clients.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <select id="appointmentProject"><option value="">Projeto</option>${projects.map(p => `<option value="${p.id}">${p.project_name}</option>`).join("")}</select>
        <input id="appointmentDate" type="date">
        <input id="appointmentTime" type="time">
        <select id="appointmentStatus"><option>Scheduled</option><option>Completed</option><option>Cancelled</option></select>
      </div>
      <textarea id="appointmentNotes" placeholder="Observações"></textarea>
      <button class="primary-btn" onclick="addAppointment()">Agendar</button>
    </div>
    <div class="card"><h2>Agendamentos</h2><div id="appointmentList"></div></div>
  `);
  updateAppointmentList();
}

async function addAppointment(){
  const title = val("appointmentTitle").trim();
  if(!title) return alert("Digite o título.");
  const client = clients.find(c => c.id === val("appointmentClient"));
  const project = projects.find(p => p.id === val("appointmentProject"));
  const res = await apiInsert("appointments", {
    title, client_id:client?.id || "", client_name:client?.name || "",
    project_id:project?.id || "", project_name:project?.project_name || "",
    appointment_date:val("appointmentDate") || null, appointment_time:val("appointmentTime"),
    status:val("appointmentStatus"), notes:val("appointmentNotes")
  });
  if(!res.ok) return alert("Erro ao salvar agendamento.");
  appointments = await apiGet("appointments"); renderAgenda();
}

async function removeAppointment(id){
  const res = await apiDelete("appointments", id);
  if(!res.ok) return alert("Erro ao remover agendamento.");
  appointments = await apiGet("appointments"); renderAgenda();
}

function updateAppointmentList(){
  const el = document.getElementById("appointmentList");
  if(!appointments.length) return el.innerHTML = "<p>Nenhum agendamento cadastrado.</p>";
  el.innerHTML = appointments.map(a => item(`
    <strong>${a.title}</strong><br>
    <small>${a.client_name || "Sem cliente"} • ${a.project_name || "Sem projeto"}</small><br>
    <small>${a.appointment_date || "Sem data"} às ${a.appointment_time || "--:--"}</small><br>
    <span class="status ${projectStatusClass(a.status)}">${a.status}</span>
  `, `removeAppointment('${a.id}')`)).join("");
}

/* RELATÓRIOS + AUTOMAÇÃO */
function renderRelatorios(){
  setTitle("Relatórios");
  setContent(`
    <div class="card">
      <h2>Novo Relatório</h2>
      <div class="form-grid">
        <select id="reportType"><option>Project</option><option>Client</option><option>Financial</option><option>Photo</option><option>Executive</option></select>
        <input id="reportTitle" placeholder="Título">
        <input id="reportClient" placeholder="Cliente relacionado">
        <input id="reportProject" placeholder="Projeto relacionado">
      </div>
      <textarea id="reportNotes" placeholder="Conteúdo / observações"></textarea>
      <div class="action-row">
        <button class="primary-btn" onclick="addReport()">Salvar Relatório</button>
        <button class="secondary-btn" onclick="generateSummaryReport()">Gerar Resumo Atual</button>
        <button class="success-btn" onclick="generateExecutiveReport()">Gerar Relatório Executivo</button>
      </div>
    </div>
    <div class="card"><h2>Relatórios</h2><div id="reportList"></div></div>
  `);
  updateReportList();
}

async function addReport(){
  const title = val("reportTitle").trim();
  if(!title) return alert("Digite o título.");
  const res = await apiInsert("reports", {
    report_type:val("reportType"), title, related_client:val("reportClient"),
    related_project:val("reportProject"), notes:val("reportNotes")
  });
  if(!res.ok) return alert("Erro ao salvar relatório.");
  reports = await apiGet("reports"); renderRelatorios();
}

async function saveAutoReport(title, notes, type="Executive"){
  const res = await apiInsert("reports", {
    report_type:type,
    title,
    related_client:"",
    related_project:"",
    notes
  });

  if(!res.ok){
    alert("Erro ao salvar relatório automático.");
    return;
  }

  reports = await apiGet("reports");
  alert("Relatório automático salvo.");
  renderRelatorios();
}

async function removeReport(id){
  const res = await apiDelete("reports", id);
  if(!res.ok) return alert("Erro ao remover relatório.");
  reports = await apiGet("reports"); renderRelatorios();
}

function updateReportList(){
  const el = document.getElementById("reportList");
  if(!reports.length) return el.innerHTML = "<p>Nenhum relatório cadastrado.</p>";
  el.innerHTML = reports.map(r => item(`
    <strong>${r.title}</strong><br>
    <small>${r.report_type} • ${r.related_client || "Sem cliente"} • ${r.related_project || "Sem projeto"}</small><br>
    <div class="report-box">${r.notes || "Sem observações"}</div>
  `, `removeReport('${r.id}')`)).join("");
}

function generateSummaryReport(){
  const summary = buildSummaryReport();
  document.getElementById("reportTitle").value = `Resumo DoubleDiamond - ${todayBR()}`;
  document.getElementById("reportType").value = "Executive";
  document.getElementById("reportNotes").value = summary;
}

function generateExecutiveReport(){
  const summary = buildSummaryReport();
  saveAutoReport(`Relatório Executivo DoubleDiamond - ${todayBR()}`, summary, "Executive");
}

function buildSummaryReport(){
  const approvedRevenue = quotes.filter(q => q.status === "Approved").reduce((s,q) => s + Number(q.value || 0), 0);
  const incomePaid = financeItems.filter(i => i.type === "Income" && i.status === "Paid").reduce((s,i) => s + Number(i.amount || 0), 0);
  const expensesPaid = financeItems.filter(i => i.type === "Expense" && i.status === "Paid").reduce((s,i) => s + Number(i.amount || 0), 0);
  const pendingIncome = financeItems.filter(i => i.type === "Income" && i.status === "Pending").reduce((s,i) => s + Number(i.amount || 0), 0);
  const activeProjects = projects.filter(p => ["Planning","Quoted","Scheduled","In Progress"].includes(p.status)).length;
  const completedProjects = projects.filter(p => p.status === "Completed").length;

  return `RELATÓRIO EXECUTIVO DOUBLEDIAMOND
Data: ${todayBR()}

OPERAÇÃO
Clientes cadastrados: ${clients.length}
Serviços cadastrados: ${services.length}
Orçamentos cadastrados: ${quotes.length}
Projetos ativos: ${activeProjects}
Projetos concluídos: ${completedProjects}
Agendamentos: ${appointments.length}
Equipe cadastrada: ${employees.length}

FOTOS E COMPROVAÇÕES
Fotos de orçamentos: ${quotePhotos.length}
Fotos de projetos: ${projectPhotos.length}
Total de fotos: ${quotePhotos.length + projectPhotos.length}

FINANCEIRO
Receita prevista em orçamentos aprovados: R$ ${formatMoney(approvedRevenue)}
Receita recebida: R$ ${formatMoney(incomePaid)}
Despesas pagas: R$ ${formatMoney(expensesPaid)}
Lucro real: R$ ${formatMoney(incomePaid - expensesPaid)}
A receber: R$ ${formatMoney(pendingIncome)}

OBSERVAÇÃO
Este relatório foi gerado automaticamente pelo DoubleDiamond V4.5 Business Automation.`;
}

/* EQUIPE */
function renderEquipe(){
  setTitle("Equipe");
  setContent(`
    <div class="card">
      <h2>Novo Funcionário</h2>
      <div class="form-grid">
        <input id="employeeName" placeholder="Nome">
        <input id="employeeRole" placeholder="Função">
        <input id="employeePhone" placeholder="Telefone">
        <input id="employeeEmail" placeholder="Email">
        <input id="employeeRate" type="number" placeholder="Custo por hora">
        <select id="employeeStatus"><option>Active</option><option>Inactive</option></select>
      </div>
      <textarea id="employeeNotes" placeholder="Observações"></textarea>
      <button class="primary-btn" onclick="addEmployee()">Adicionar Funcionário</button>
    </div>
    <div class="card"><h2>Equipe Cadastrada</h2><div id="employeeList"></div></div>
  `);
  updateEmployeeList();
}

async function addEmployee(){
  const name = val("employeeName").trim();
  if(!name) return alert("Digite o nome.");
  const res = await apiInsert("employees", {
    name, role:val("employeeRole"), phone:val("employeePhone"), email:val("employeeEmail"),
    hourly_rate:Number(val("employeeRate") || 0), status:val("employeeStatus"), notes:val("employeeNotes")
  });
  if(!res.ok) return alert("Erro ao salvar funcionário.");
  employees = await apiGet("employees"); renderEquipe();
}

async function removeEmployee(id){
  const res = await apiDelete("employees", id);
  if(!res.ok) return alert("Erro ao remover funcionário.");
  employees = await apiGet("employees"); renderEquipe();
}

function updateEmployeeList(){
  const el = document.getElementById("employeeList");
  if(!employees.length) return el.innerHTML = "<p>Nenhum funcionário cadastrado.</p>";
  el.innerHTML = employees.map(e => item(`
    <strong>${e.name}</strong><br>
    <small>${e.role || "Sem função"} • ${e.phone || "Sem telefone"} • ${e.email || "Sem email"}</small><br>
    <strong>R$ ${formatMoney(e.hourly_rate)}/h</strong><br>
    <span class="status ${e.status === "Active" ? "status-active" : "status-inactive"}">${e.status}</span>
  `, `removeEmployee('${e.id}')`)).join("");
}

function renderConfiguracoes(){
  setTitle("Configurações");
  setContent(`
    <div class="card">
      <h2>Configurações</h2>
      <p>Projeto conectado ao Supabase.</p>
      <div class="report-box">Versão: V4.5 Business Automation
URL: ${SUPABASE_URL}

Automações ativas:
- Dashboard executivo
- Conversão Orçamento Approved → Projeto
- Lançamento financeiro automático
- Relatório executivo automático</div>
    </div>
  `);
}

/* HELPERS */
function item(content, removeFn){
  return `<div class="list-item"><div>${content}</div><button class="danger-btn" onclick="${removeFn}">Remover</button></div>`;
}

function val(id){
  const el = document.getElementById(id);
  return el ? el.value : "";
}

function quoteStatusClass(status){
  const map = {Draft:"status-draft",Sent:"status-sent",Approved:"status-approved",Rejected:"status-rejected"};
  return map[status] || "status-draft";
}

function projectStatusClass(status){
  const map = {
    Planning:"status-planning",
    Quoted:"status-quoted",
    Scheduled:"status-scheduled",
    "In Progress":"status-progress",
    Completed:"status-completed",
    Cancelled:"status-cancelled"
  };
  return map[status] || "status-planning";
}

function financeStatusClass(item){
  if(item.type === "Income") return "status-income";
  if(item.type === "Expense") return "status-expense";
  if(item.status === "Paid") return "status-paid";
  if(item.status === "Overdue") return "status-overdue";
  return "status-pending";
}

function formatMoney(value){
  return Number(value || 0).toLocaleString("pt-BR", {
    minimumFractionDigits:2,
    maximumFractionDigits:2
  });
}

function todayBR(){
  return new Date().toLocaleDateString("pt-BR");
}

function renderPlaceholder(page){
  setTitle(page.charAt(0).toUpperCase() + page.slice(1));
  setContent(`<div class="card"><h2>Módulo em desenvolvimento</h2></div>`);
}
