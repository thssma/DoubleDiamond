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
let projectChecklists = [];
let projectTasks = [];
let projectTimeline = [];
let projectTeam = [];

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


async function apiPatch(table, id, data){
  return await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method:"PATCH",
    headers:{...headers, "Prefer":"return=representation"},
    body:JSON.stringify(data)
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
  projectChecklists = await apiGet("project_checklists");
  projectTasks = await apiGet("project_tasks");
  projectTimeline = await apiGet("project_timeline");
  projectTeam = await apiGet("project_team");
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
    configuracoes: renderConfiguracoes,
    operacoes: renderOperacoes,
    kanban: renderKanban
  };

  (routes[page] || (() => renderPlaceholder(page)))();
}

function setTitle(title){ document.getElementById("pageTitle").innerText = title; }
function setContent(html){ document.getElementById("pageContent").innerHTML = html; }

/* DASHBOARD EXECUTIVO */
function renderDashboard(){
  setTitle("Dashboard Executivo V6");

  const approvedRevenue = quotes.filter(q => q.status === "Approved").reduce((s,q) => s + Number(q.value || 0), 0);
  const incomePaid = financeItems.filter(i => i.type === "Income" && i.status === "Paid").reduce((s,i) => s + Number(i.amount || 0), 0);
  const expensesPaid = financeItems.filter(i => i.type === "Expense" && i.status === "Paid").reduce((s,i) => s + Number(i.amount || 0), 0);
  const pendingIncome = financeItems.filter(i => i.type === "Income" && i.status === "Pending").reduce((s,i) => s + Number(i.amount || 0), 0);
  const activeProjects = projects.filter(p => ["Planning","Quoted","Scheduled","In Progress"].includes(p.status)).length;
  const completedProjects = projects.filter(p => p.status === "Completed").length;
  const totalPhotos = quotePhotos.length + projectPhotos.length;
  const pendingTasks = projectTasks.filter(t => t.status !== "Completed").length;
  const weekAppointments = appointments.filter(a => isThisWeek(a.appointment_date)).length;

  setContent(`
    <div class="notice">
      V6.0 ativa: Agenda Inteligente + Financeiro por Projeto + Relatórios Operacionais + Dashboard Executivo + Kanban de Obras.
    </div>

    <div class="cards">
      ${metric("Receita Prevista", "R$ " + formatMoney(approvedRevenue), "purple")}
      ${metric("Receita Recebida", "R$ " + formatMoney(incomePaid), "good")}
      ${metric("Despesas Pagas", "R$ " + formatMoney(expensesPaid), "bad")}
      ${metric("Lucro Real", "R$ " + formatMoney(incomePaid - expensesPaid), "good")}
      ${metric("A Receber", "R$ " + formatMoney(pendingIncome), "warn")}
      ${metric("Projetos Ativos", activeProjects, "purple")}
      ${metric("Projetos Concluídos", completedProjects, "good")}
      ${metric("Tarefas Pendentes", pendingTasks, "warn")}
      ${metric("Agenda da Semana", weekAppointments, "")}
      ${metric("Fotos", totalPhotos, "")}
      ${metric("Clientes", clients.length, "")}
      ${metric("Equipe", employees.length, "")}
    </div>

    <div class="card">
      <h2>Centro Executivo</h2>
      <p>Use o Kanban para acompanhar obras, a Agenda para planejar execução e o Financeiro para acompanhar lucro por projeto.</p>
      <div class="action-row">
        <button class="primary-btn" onclick="changePage('kanban')">Abrir Kanban</button>
        <button class="secondary-btn" onclick="changePage('agenda')">Abrir Agenda</button>
        <button class="secondary-btn" onclick="changePage('financeiro')">Abrir Financeiro</button>
        <button class="success-btn" onclick="changePage('relatorios')">Gerar Relatório</button>
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

/* FINANCEIRO POR PROJETO V6 */
function renderFinanceiro(){
  setTitle("Financeiro por Projeto");
  setContent(`
    <div class="card">
      <h2>Novo Lançamento</h2>
      <div class="form-grid">
        <select id="financeType"><option>Income</option><option>Expense</option></select>
        <input id="financeTitle" placeholder="Título">
        <input id="financeAmount" type="number" placeholder="Valor">
        <select id="financeStatus"><option>Pending</option><option>Paid</option><option>Overdue</option></select>
        <input id="financeDue" type="date">

        <select id="financeProjectSelect">
          <option value="">Projeto relacionado</option>
          ${projects.map(p => `<option value="${p.project_name}">${p.project_name} - ${p.client_name}</option>`).join("")}
        </select>

        <input id="financeClient" placeholder="Cliente relacionado">
        <select id="financeCategory">
          <option value="">Categoria</option>
          <option>Labor</option>
          <option>Material</option>
          <option>Equipment</option>
          <option>Fuel</option>
          <option>Subscription</option>
          <option>Other</option>
        </select>
      </div>
      <textarea id="financeNotes" placeholder="Observações"></textarea>
      <button class="primary-btn" onclick="addFinance()">Adicionar</button>
    </div>

    <div class="card">
      <h2>Resumo Financeiro por Projeto</h2>
      <div id="projectFinanceSummary"></div>
    </div>

    <div class="card"><h2>Lançamentos</h2><div id="financeList"></div></div>
  `);
  updateProjectFinanceSummary();
  updateFinanceList();
}

async function addFinance(){
  const title = val("financeTitle").trim();
  if(!title) return alert("Digite o título.");

  const res = await apiInsert("finance", {
    type: val("financeType"),
    title,
    amount: Number(val("financeAmount") || 0),
    status: val("financeStatus"),
    due_date: val("financeDue") || null,
    related_client: val("financeClient"),
    related_project: val("financeProjectSelect"),
    category: val("financeCategory"),
    notes: val("financeNotes")
  });

  if(!res.ok) return alert("Erro ao salvar financeiro.");

  const project = projects.find(p => p.project_name === val("financeProjectSelect"));
  if(project?.id){
    await createTimeline(project.id, `Lançamento financeiro criado: ${title} - R$ ${formatMoney(val("financeAmount"))}`);
  }

  financeItems = await apiGet("finance");
  projectTimeline = await apiGet("project_timeline");
  renderFinanceiro();
}

async function updateFinanceStatus(id, status){
  const item = financeItems.find(f => f.id === id);
  const res = await apiPatch("finance", id, { status });

  if(!res.ok) return alert("Erro ao atualizar lançamento.");

  const project = projects.find(p => p.project_name === item?.related_project);
  if(project?.id){
    await createTimeline(project.id, `Financeiro atualizado para ${status}: ${item.title}`);
  }

  financeItems = await apiGet("finance");
  projectTimeline = await apiGet("project_timeline");
  renderFinanceiro();
}

async function removeFinance(id){
  const item = financeItems.find(f => f.id === id);
  const res = await apiDelete("finance", id);

  if(!res.ok) return alert("Erro ao remover lançamento.");

  const project = projects.find(p => p.project_name === item?.related_project);
  if(project?.id){
    await createTimeline(project.id, `Lançamento financeiro removido: ${item.title}`);
  }

  financeItems = await apiGet("finance");
  projectTimeline = await apiGet("project_timeline");
  renderFinanceiro();
}

function updateProjectFinanceSummary(){
  const el = document.getElementById("projectFinanceSummary");

  if(!projects.length){
    el.innerHTML = "<p>Nenhum projeto cadastrado.</p>";
    return;
  }

  el.innerHTML = projects.map(project => {
    const related = financeItems.filter(f => f.related_project === project.project_name);
    const income = related.filter(f => f.type === "Income").reduce((s,f) => s + Number(f.amount || 0), 0);
    const expense = related.filter(f => f.type === "Expense").reduce((s,f) => s + Number(f.amount || 0), 0);
    const paidIncome = related.filter(f => f.type === "Income" && f.status === "Paid").reduce((s,f) => s + Number(f.amount || 0), 0);
    const paidExpense = related.filter(f => f.type === "Expense" && f.status === "Paid").reduce((s,f) => s + Number(f.amount || 0), 0);

    return `
      <div class="soft-box">
        <strong>${project.project_name}</strong><br>
        <small>${project.client_name || "Sem cliente"}</small>
        <div class="kpi-row">
          ${metric("Receita", "R$ " + formatMoney(income), "good")}
          ${metric("Custo", "R$ " + formatMoney(expense), "bad")}
          ${metric("Lucro Previsto", "R$ " + formatMoney(income - expense), "purple")}
          ${metric("Lucro Real", "R$ " + formatMoney(paidIncome - paidExpense), "good")}
        </div>
      </div>
    `;
  }).join("");
}

function updateFinanceList(){
  const el = document.getElementById("financeList");
  if(!financeItems.length) return el.innerHTML = "<p>Nenhum lançamento cadastrado.</p>";

  el.innerHTML = financeItems.map(f => `
    <div class="list-item">
      <div>
        <strong>${f.title}</strong><br>
        <small>${f.type} • ${f.status} • ${f.due_date || "Sem vencimento"} • ${f.category || "Sem categoria"}</small><br>
        <small>${f.related_client || "Sem cliente"} • ${f.related_project || "Sem projeto"}</small><br>
        <strong>R$ ${formatMoney(f.amount)}</strong><br>
        <span class="status ${financeStatusClass(f)}">${f.status}</span>
      </div>
      <div class="action-row">
        <button class="secondary-btn" onclick="updateFinanceStatus('${f.id}', 'Paid')">Pago</button>
        <button class="secondary-btn" onclick="updateFinanceStatus('${f.id}', 'Overdue')">Atrasado</button>
        <button class="danger-btn" onclick="removeFinance('${f.id}')">Remover</button>
      </div>
    </div>
  `).join("");
}

/* AGENDA INTELIGENTE V6 */
function renderAgenda(){
  setTitle("Agenda Inteligente");
  setContent(`
    <div class="card">
      <h2>Novo Agendamento</h2>
      <div class="form-grid">
        <input id="appointmentTitle" placeholder="Título">

        <select id="appointmentType">
          <option value="Visit">Visita</option>
          <option value="Maintenance">Manutenção</option>
          <option value="Execution">Execução</option>
          <option value="Delivery">Entrega</option>
          <option value="Emergency">Emergência</option>
        </select>

        <select id="appointmentClient">
          <option value="">Cliente</option>
          ${clients.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}
        </select>

        <select id="appointmentProject">
          <option value="">Projeto</option>
          ${projects.map(p => `<option value="${p.id}">${p.project_name}</option>`).join("")}
        </select>

        <select id="appointmentEmployee">
          <option value="">Responsável</option>
          ${employees.map(e => `<option value="${e.name}">${e.name}</option>`).join("")}
        </select>

        <input id="appointmentDate" type="date">
        <input id="appointmentTime" type="time">

        <select id="appointmentStatus">
          <option>Scheduled</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      <textarea id="appointmentNotes" placeholder="Observações"></textarea>
      <button class="primary-btn" onclick="addAppointment()">Agendar</button>
    </div>

    <div class="card">
      <h2>Agenda</h2>
      <div class="action-row">
        <button class="secondary-btn" onclick="renderAgenda()">Todos</button>
        <button class="secondary-btn" onclick="filterAgenda('Scheduled')">Scheduled</button>
        <button class="secondary-btn" onclick="filterAgenda('Completed')">Completed</button>
        <button class="secondary-btn" onclick="filterAgenda('Cancelled')">Cancelled</button>
      </div>
      <div id="appointmentList"></div>
    </div>
  `);
  updateAppointmentList();
}

async function addAppointment(){
  const title = val("appointmentTitle").trim();
  if(!title) return alert("Digite o título.");

  const client = clients.find(c => c.id === val("appointmentClient"));
  const project = projects.find(p => p.id === val("appointmentProject"));

  const res = await apiInsert("appointments", {
    title,
    appointment_type: val("appointmentType"),
    client_id: client?.id || "",
    client_name: client?.name || "",
    project_id: project?.id || "",
    project_name: project?.project_name || "",
    assigned_to: val("appointmentEmployee"),
    appointment_date: val("appointmentDate") || null,
    appointment_time: val("appointmentTime"),
    status: val("appointmentStatus"),
    notes: val("appointmentNotes")
  });

  if(!res.ok) return alert("Erro ao salvar agendamento.");

  if(project?.id){
    await createTimeline(project.id, `Agendamento criado: ${title} (${val("appointmentType")})`);
  }

  appointments = await apiGet("appointments");
  projectTimeline = await apiGet("project_timeline");
  renderAgenda();
}

async function updateAppointmentStatus(id, status){
  const appointment = appointments.find(a => a.id === id);
  const res = await apiPatch("appointments", id, { status });

  if(!res.ok) return alert("Erro ao atualizar agendamento.");

  if(appointment?.project_id){
    await createTimeline(appointment.project_id, `Agendamento atualizado para ${status}: ${appointment.title}`);
  }

  appointments = await apiGet("appointments");
  projectTimeline = await apiGet("project_timeline");
  renderAgenda();
}

async function removeAppointment(id){
  const appointment = appointments.find(a => a.id === id);
  const res = await apiDelete("appointments", id);

  if(!res.ok) return alert("Erro ao remover agendamento.");

  if(appointment?.project_id){
    await createTimeline(appointment.project_id, `Agendamento removido: ${appointment.title}`);
  }

  appointments = await apiGet("appointments");
  projectTimeline = await apiGet("project_timeline");
  renderAgenda();
}

function filterAgenda(status){
  updateAppointmentList(status);
}

function updateAppointmentList(filterStatus = ""){
  const el = document.getElementById("appointmentList");
  let list = [...appointments];

  if(filterStatus){
    list = list.filter(a => a.status === filterStatus);
  }

  list.sort((a,b) => String(a.appointment_date || "").localeCompare(String(b.appointment_date || "")));

  if(!list.length) return el.innerHTML = "<p>Nenhum agendamento encontrado.</p>";

  el.innerHTML = list.map(a => `
    <div class="list-item">
      <div>
        <strong>${a.title}</strong><br>
        <small>${a.appointment_type || "Visit"} • ${a.client_name || "Sem cliente"} • ${a.project_name || "Sem projeto"}</small><br>
        <small>${a.appointment_date || "Sem data"} às ${a.appointment_time || "--:--"} • Responsável: ${a.assigned_to || "Sem responsável"}</small><br>
        <span class="status ${projectStatusClass(a.status)}">${a.status}</span>
      </div>
      <div class="action-row">
        <button class="secondary-btn" onclick="updateAppointmentStatus('${a.id}', 'Completed')">Concluir</button>
        <button class="secondary-btn" onclick="updateAppointmentStatus('${a.id}', 'Cancelled')">Cancelar</button>
        <button class="danger-btn" onclick="removeAppointment('${a.id}')">Remover</button>
      </div>
    </div>
  `).join("");
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
  const pendingTasks = projectTasks.filter(t => t.status !== "Completed").length;
  const checklistPercent = getChecklistCompletion();

  const projectLines = projects.map(project => {
    const relatedFinance = financeItems.filter(f => f.related_project === project.project_name);
    const income = relatedFinance.filter(f => f.type === "Income").reduce((s,f) => s + Number(f.amount || 0), 0);
    const expense = relatedFinance.filter(f => f.type === "Expense").reduce((s,f) => s + Number(f.amount || 0), 0);
    const tasks = projectTasks.filter(t => t.project_id === project.id);
    const photos = projectPhotos.filter(p => p.project_id === project.id);
    return `- ${project.project_name} | Cliente: ${project.client_name || "N/A"} | Status: ${project.status} | Tarefas: ${tasks.length} | Fotos: ${photos.length} | Lucro previsto: R$ ${formatMoney(income - expense)}`;
  }).join("\n");

  return `RELATÓRIO EXECUTIVO DOUBLEDIAMOND V6
Data: ${todayBR()}

OPERAÇÃO
Clientes cadastrados: ${clients.length}
Serviços cadastrados: ${services.length}
Orçamentos cadastrados: ${quotes.length}
Projetos ativos: ${activeProjects}
Projetos concluídos: ${completedProjects}
Tarefas pendentes: ${pendingTasks}
Checklist geral concluído: ${checklistPercent}%
Agendamentos: ${appointments.length}
Agendamentos nesta semana: ${appointments.filter(a => isThisWeek(a.appointment_date)).length}
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

PROJETOS
${projectLines || "Nenhum projeto cadastrado."}

OBSERVAÇÃO
Este relatório foi gerado automaticamente pelo DoubleDiamond V6.0 Full Suite.`;
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
  employees = await apiGet("employees");
  projectChecklists = await apiGet("project_checklists");
  projectTasks = await apiGet("project_tasks");
  projectTimeline = await apiGet("project_timeline");
  projectTeam = await apiGet("project_team"); renderEquipe();
}

async function removeEmployee(id){
  const res = await apiDelete("employees", id);
  if(!res.ok) return alert("Erro ao remover funcionário.");
  employees = await apiGet("employees");
  projectChecklists = await apiGet("project_checklists");
  projectTasks = await apiGet("project_tasks");
  projectTimeline = await apiGet("project_timeline");
  projectTeam = await apiGet("project_team"); renderEquipe();
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


/* OPERAÇÕES V5 */
function renderOperacoes(){
  setTitle("Operations Center");

  setContent(`
    <div class="notice">
      V5.0 ativa: Checklist, Tarefas, Equipe por Projeto e Timeline Operacional.
    </div>

    <div class="operation-grid">
      <div class="card">
        <h2>Checklist por Projeto</h2>
        <div class="form-grid">
          <select id="checkProject">
            <option value="">Projeto</option>
            ${projects.map(p => `<option value="${p.id}">${p.project_name} - ${p.client_name}</option>`).join("")}
          </select>
          <input id="checkItem" placeholder="Item do checklist">
        </div>
        <button class="primary-btn" onclick="addChecklistItem()">Adicionar Item</button>
      </div>

      <div class="card">
        <h2>Tarefa por Projeto</h2>
        <div class="form-grid">
          <select id="taskProject">
            <option value="">Projeto</option>
            ${projects.map(p => `<option value="${p.id}">${p.project_name} - ${p.client_name}</option>`).join("")}
          </select>
          <input id="taskTitle" placeholder="Título da tarefa">
          <select id="taskEmployee">
            <option value="">Responsável</option>
            ${employees.map(e => `<option value="${e.name}">${e.name}</option>`).join("")}
          </select>
          <select id="taskStatus">
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button class="primary-btn" onclick="addProjectTask()">Adicionar Tarefa</button>
      </div>

      <div class="card">
        <h2>Equipe por Projeto</h2>
        <div class="form-grid">
          <select id="teamProject">
            <option value="">Projeto</option>
            ${projects.map(p => `<option value="${p.id}">${p.project_name} - ${p.client_name}</option>`).join("")}
          </select>
          <select id="teamEmployee">
            <option value="">Funcionário</option>
            ${employees.map(e => `<option value="${e.id}">${e.name} - ${e.role || "Equipe"}</option>`).join("")}
          </select>
        </div>
        <button class="primary-btn" onclick="addProjectTeamMember()">Vincular Equipe</button>
      </div>

      <div class="card">
        <h2>Evento Manual</h2>
        <div class="form-grid">
          <select id="timelineProject">
            <option value="">Projeto</option>
            ${projects.map(p => `<option value="${p.id}">${p.project_name} - ${p.client_name}</option>`).join("")}
          </select>
          <input id="timelineEvent" placeholder="Evento da timeline">
        </div>
        <button class="primary-btn" onclick="addTimelineManual()">Registrar Evento</button>
      </div>
    </div>

    <div class="card">
      <h2>Resumo Operacional</h2>
      <div id="operationsSummary"></div>
    </div>
  `);

  renderOperationsSummary();
}

async function createTimeline(projectId, event){
  if(!projectId || !event) return;

  await apiInsert("project_timeline", {
    project_id: projectId,
    event
  });

  projectTimeline = await apiGet("project_timeline");
}

async function addChecklistItem(){
  const projectId = val("checkProject");
  const item = val("checkItem").trim();

  if(!projectId) return alert("Selecione um projeto.");
  if(!item) return alert("Digite o item do checklist.");

  const res = await apiInsert("project_checklists", {
    project_id: projectId,
    item,
    completed: false
  });

  if(!res.ok) return alert("Erro ao criar item.");

  await createTimeline(projectId, `Checklist criado: ${item}`);
  projectChecklists = await apiGet("project_checklists");
  renderOperacoes();
}

async function toggleChecklist(id, currentStatus){
  const record = projectChecklists.find(i => i.id === id);
  const res = await apiPatch("project_checklists", id, {
    completed: !currentStatus
  });

  if(!res.ok) return alert("Erro ao atualizar checklist.");

  await createTimeline(record.project_id, `Checklist ${!currentStatus ? "concluído" : "reaberto"}: ${record.item}`);
  projectChecklists = await apiGet("project_checklists");
  renderOperacoes();
}

async function removeChecklistItem(id){
  const record = projectChecklists.find(i => i.id === id);
  const res = await apiDelete("project_checklists", id);

  if(!res.ok) return alert("Erro ao remover checklist.");

  if(record) await createTimeline(record.project_id, `Checklist removido: ${record.item}`);
  projectChecklists = await apiGet("project_checklists");
  renderOperacoes();
}

async function addProjectTask(){
  const projectId = val("taskProject");
  const title = val("taskTitle").trim();

  if(!projectId) return alert("Selecione um projeto.");
  if(!title) return alert("Digite o título da tarefa.");

  const res = await apiInsert("project_tasks", {
    project_id: projectId,
    title,
    assigned_to: val("taskEmployee"),
    status: val("taskStatus")
  });

  if(!res.ok) return alert("Erro ao criar tarefa.");

  await createTimeline(projectId, `Tarefa criada: ${title}`);
  projectTasks = await apiGet("project_tasks");
  renderOperacoes();
}

async function updateTaskStatus(id, status){
  const task = projectTasks.find(t => t.id === id);

  const res = await apiPatch("project_tasks", id, { status });

  if(!res.ok) return alert("Erro ao atualizar tarefa.");

  await createTimeline(task.project_id, `Tarefa atualizada para ${status}: ${task.title}`);
  projectTasks = await apiGet("project_tasks");
  renderOperacoes();
}

async function removeProjectTask(id){
  const task = projectTasks.find(t => t.id === id);

  const res = await apiDelete("project_tasks", id);

  if(!res.ok) return alert("Erro ao remover tarefa.");

  if(task) await createTimeline(task.project_id, `Tarefa removida: ${task.title}`);
  projectTasks = await apiGet("project_tasks");
  renderOperacoes();
}

async function addProjectTeamMember(){
  const projectId = val("teamProject");
  const employeeId = val("teamEmployee");

  if(!projectId) return alert("Selecione um projeto.");
  if(!employeeId) return alert("Selecione um funcionário.");

  const exists = projectTeam.some(t => t.project_id === projectId && t.employee_id === employeeId);

  if(exists) return alert("Esse funcionário já está vinculado a este projeto.");

  const res = await apiInsert("project_team", {
    project_id: projectId,
    employee_id: employeeId
  });

  if(!res.ok) return alert("Erro ao vincular equipe.");

  const employee = employees.find(e => e.id === employeeId);
  await createTimeline(projectId, `Equipe vinculada: ${employee?.name || "Funcionário"}`);
  projectTeam = await apiGet("project_team");
  renderOperacoes();
}

async function removeProjectTeamMember(id){
  const relation = projectTeam.find(t => t.id === id);

  const res = await apiDelete("project_team", id);

  if(!res.ok) return alert("Erro ao remover membro da equipe.");

  if(relation) await createTimeline(relation.project_id, "Membro removido da equipe.");
  projectTeam = await apiGet("project_team");
  renderOperacoes();
}

async function addTimelineManual(){
  const projectId = val("timelineProject");
  const event = val("timelineEvent").trim();

  if(!projectId) return alert("Selecione um projeto.");
  if(!event) return alert("Digite o evento.");

  await createTimeline(projectId, event);
  renderOperacoes();
}

function renderOperationsSummary(){
  const el = document.getElementById("operationsSummary");

  if(!projects.length){
    el.innerHTML = "<p>Nenhum projeto cadastrado.</p>";
    return;
  }

  el.innerHTML = projects.map(project => {
    const checks = projectChecklists.filter(c => c.project_id === project.id);
    const done = checks.filter(c => c.completed).length;
    const percent = checks.length ? Math.round((done / checks.length) * 100) : 0;
    const tasks = projectTasks.filter(t => t.project_id === project.id);
    const team = projectTeam.filter(t => t.project_id === project.id);
    const timeline = projectTimeline.filter(t => t.project_id === project.id).slice(0, 6);

    return `
      <div class="card">
        <h2>${project.project_name}</h2>
        <small>Cliente: ${project.client_name || "Sem cliente"} • Status: ${project.status}</small>

        <div class="progress-wrap">
          <div class="progress-bar" style="width:${percent}%"></div>
        </div>
        <span class="mini-label">${percent}% do checklist concluído</span>

        <div class="operation-grid">
          <div>
            <h3>Checklist</h3>
            ${checks.length ? checks.map(c => `
              <div class="list-item">
                <div>
                  <strong>${c.completed ? "✅" : "⬜"} ${c.item}</strong>
                </div>
                <div class="action-row">
                  <button class="secondary-btn" onclick="toggleChecklist('${c.id}', ${c.completed})">
                    ${c.completed ? "Reabrir" : "Concluir"}
                  </button>
                  <button class="danger-btn" onclick="removeChecklistItem('${c.id}')">Remover</button>
                </div>
              </div>
            `).join("") : "<p>Nenhum item.</p>"}
          </div>

          <div>
            <h3>Tarefas</h3>
            ${tasks.length ? tasks.map(t => `
              <div class="list-item">
                <div>
                  <strong>${t.title}</strong><br>
                  <small>${t.assigned_to || "Sem responsável"}</small><br>
                  <span class="status ${projectStatusClass(t.status)}">${t.status}</span>
                </div>
                <div class="action-row">
                  <button class="secondary-btn" onclick="updateTaskStatus('${t.id}', 'In Progress')">Em andamento</button>
                  <button class="success-btn" onclick="updateTaskStatus('${t.id}', 'Completed')">Concluir</button>
                  <button class="danger-btn" onclick="removeProjectTask('${t.id}')">Remover</button>
                </div>
              </div>
            `).join("") : "<p>Nenhuma tarefa.</p>"}
          </div>

          <div>
            <h3>Equipe</h3>
            ${team.length ? team.map(member => {
              const emp = employees.find(e => e.id === member.employee_id);
              return `
                <div class="list-item">
                  <div>
                    <strong>${emp?.name || "Funcionário"}</strong><br>
                    <small>${emp?.role || "Sem função"}</small>
                  </div>
                  <button class="danger-btn" onclick="removeProjectTeamMember('${member.id}')">Remover</button>
                </div>
              `;
            }).join("") : "<p>Nenhuma equipe vinculada.</p>"}
          </div>

          <div>
            <h3>Timeline</h3>
            ${timeline.length ? timeline.map(t => `
              <div class="list-item">
                <div>
                  <strong>${t.event}</strong><br>
                  <small>${t.created_at ? new Date(t.created_at).toLocaleString("pt-BR") : ""}</small>
                </div>
              </div>
            `).join("") : "<p>Nenhum evento.</p>"}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function getChecklistCompletion(){
  if(!projectChecklists.length) return 0;

  const done = projectChecklists.filter(i => i.completed).length;

  return Math.round((done / projectChecklists.length) * 100);
}


function renderConfiguracoes(){
  setTitle("Configurações");
  setContent(`
    <div class="card">
      <h2>Configurações</h2>
      <p>Projeto conectado ao Supabase.</p>
      <div class="report-box">Versão: V6.0 Full Suite
URL: ${SUPABASE_URL}

Automações ativas:
- Dashboard executivo
- Conversão Orçamento Approved → Projeto
- Lançamento financeiro automático
- Relatório executivo automático
- Checklist por projeto
- Tarefas por projeto
- Equipe por projeto
- Timeline operacional
- Operations Center V5
- Agenda Inteligente V6
- Financeiro por Projeto V6
- Kanban de Obras V6
- Relatório Executivo V6</div>
    </div>
  `);
}


/* KANBAN V6 */
function renderKanban(){
  setTitle("Kanban de Obras");

  const columns = [
    "Planning",
    "Quoted",
    "Scheduled",
    "In Progress",
    "Completed",
    "Cancelled"
  ];

  setContent(`
    <div class="notice">
      Use o Kanban para acompanhar o estágio das obras. A mudança de status atualiza o projeto no Supabase.
    </div>

    <div class="kanban-board">
      ${columns.map(status => `
        <div class="kanban-column">
          <h3>${status}</h3>
          ${projects.filter(p => p.status === status).map(project => `
            <div class="kanban-card">
              <strong>${project.project_name}</strong>
              <small>${project.client_name || "Sem cliente"}</small><br>
              <small>${project.service_name || "Sem serviço"}</small>
              <select onchange="updateProjectStatus('${project.id}', this.value)">
                ${columns.map(option => `
                  <option value="${option}" ${option === project.status ? "selected" : ""}>${option}</option>
                `).join("")}
              </select>
            </div>
          `).join("") || "<p>Nenhum projeto.</p>"}
        </div>
      `).join("")}
    </div>
  `);
}

async function updateProjectStatus(projectId, status){
  const project = projects.find(p => p.id === projectId);

  const res = await apiPatch("projects", projectId, { status });

  if(!res.ok){
    alert("Erro ao atualizar status do projeto.");
    return;
  }

  await createTimeline(projectId, `Status do projeto alterado para ${status}`);

  projects = await apiGet("projects");
  projectTimeline = await apiGet("project_timeline");

  renderKanban();
}

function isThisWeek(dateString){
  if(!dateString) return false;

  const date = new Date(dateString + "T00:00:00");
  const today = new Date();

  const first = new Date(today);
  first.setDate(today.getDate() - today.getDay());

  const last = new Date(first);
  last.setDate(first.getDate() + 6);

  return date >= first && date <= last;
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
