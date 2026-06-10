const SUPABASE_URL = "https://phpphqcxzwpuiglkqkls.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBocHBocWN4endwdWlnbGtxa2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwNDE0NTAsImV4cCI6MjA5NjYxNzQ1MH0.z0F0KAHCWKdRTyg5JeNDzAWEbIdFEknT_kmx4QyMz3I";

let clients = [];
let quotes = [];
let services = [];
let projects = [];

const headers = {
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json"
};

window.onload = async () => {
    await loadData();
    renderDashboard();
};

async function loadData(){
    await loadClients();
    await loadQuotes();
    await loadServices();
    await loadProjects();
}

async function loadClients(){
    const response = await fetch(`${SUPABASE_URL}/rest/v1/clients?select=*&order=created_at.desc`, { headers });
    clients = await response.json();
}

async function loadQuotes(){
    const response = await fetch(`${SUPABASE_URL}/rest/v1/quotes?select=*&order=created_at.desc`, { headers });
    quotes = await response.json();
}

async function loadServices(){
    const response = await fetch(`${SUPABASE_URL}/rest/v1/services?select=*&order=created_at.desc`, { headers });
    services = await response.json();
}

async function loadProjects(){
    const response = await fetch(`${SUPABASE_URL}/rest/v1/projects?select=*&order=created_at.desc`, { headers });
    projects = await response.json();
}

function changePage(page, event){
    document.querySelectorAll(".menu-btn").forEach(btn => btn.classList.remove("active"));

    if(event){
        event.target.classList.add("active");
    }

    switch(page){
        case "dashboard":
            renderDashboard();
            break;
        case "clientes":
            renderClientes();
            break;
        case "orcamentos":
            renderOrcamentos();
            break;
        case "servicos":
            renderServicos();
            break;
        case "projetos":
            renderProjetos();
            break;
        default:
            renderPlaceholder(page);
    }
}

function renderDashboard(){
    document.getElementById("pageTitle").innerText = "Dashboard";

    document.getElementById("pageContent").innerHTML = `
        <div class="cards">
            <div class="card">
                <h3>Clientes</h3>
                <p>${clients.length}</p>
            </div>

            <div class="card">
                <h3>Orçamentos</h3>
                <p>${quotes.length}</p>
            </div>

            <div class="card">
                <h3>Serviços</h3>
                <p>${services.length}</p>
            </div>

            <div class="card">
                <h3>Projetos</h3>
                <p>${projects.length}</p>
            </div>

            <div class="card">
                <h3>Receita Estimada</h3>
                <p>R$ ${getApprovedRevenue()}</p>
            </div>
        </div>
    `;
}

function renderClientes(){
    document.getElementById("pageTitle").innerText = "Clientes";

    document.getElementById("pageContent").innerHTML = `
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

        <div class="card">
            <h2>Clientes Cadastrados</h2>
            <div id="clientList"></div>
        </div>
    `;

    updateClientList();
}

async function addClient(){
    const name = document.getElementById("name").value.trim();

    if(!name){
        alert("Digite o nome do cliente.");
        return;
    }

    const newClient = {
        name,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        property_type: document.getElementById("propertyType").value,
        status: document.getElementById("clientStatus").value,
        notes: document.getElementById("notes").value
    };

    const response = await fetch(`${SUPABASE_URL}/rest/v1/clients`, {
        method: "POST",
        headers: { ...headers, "Prefer": "return=representation" },
        body: JSON.stringify(newClient)
    });

    if(!response.ok){
        alert("Erro ao salvar cliente.");
        return;
    }

    await loadClients();
    renderClientes();
}

async function removeClient(id){
    const response = await fetch(`${SUPABASE_URL}/rest/v1/clients?id=eq.${id}`, {
        method: "DELETE",
        headers
    });

    if(!response.ok){
        alert("Erro ao remover cliente.");
        return;
    }

    await loadData();
    renderClientes();
}

function updateClientList(){
    const container = document.getElementById("clientList");

    if(!container) return;

    if(clients.length === 0){
        container.innerHTML = "<p>Nenhum cliente cadastrado.</p>";
        return;
    }

    container.innerHTML = clients.map(client => `
        <div class="client-item">
            <div>
                <strong>${client.name}</strong><br>
                <small>${client.phone || "Sem telefone"} | ${client.email || "Sem email"}</small><br>
                <small>${client.address || "Sem endereço"}</small><br>
                <small>${client.property_type || "Sem tipo"} • ${client.status}</small>
            </div>

            <button class="danger-btn" onclick="removeClient('${client.id}')">Remover</button>
        </div>
    `).join("");
}

function renderOrcamentos(){
    document.getElementById("pageTitle").innerText = "Orçamentos";

    document.getElementById("pageContent").innerHTML = `
        <div class="card">
            <h2>Novo Orçamento</h2>

            <div class="form-grid">
                <select id="quoteClient">
                    <option value="">Selecione o cliente</option>
                    ${clients.map(client => `<option value="${client.id}">${client.name}</option>`).join("")}
                </select>

                <select id="quoteService">
                    <option value="">Serviço</option>
                    ${services.length > 0
                        ? services.map(service => `<option value="${service.name}">${service.name}</option>`).join("")
                        : `<option value="Lawn Care">Lawn Care</option>
                           <option value="Landscaping">Landscaping</option>
                           <option value="Irrigation">Irrigation</option>
                           <option value="Pressure Washing">Pressure Washing</option>`
                    }
                </select>

                <input id="quoteValue" type="number" placeholder="Valor estimado">

                <select id="quoteStatus">
                    <option value="Draft">Draft</option>
                    <option value="Sent">Sent</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>

            <textarea id="quoteDescription" placeholder="Descrição do orçamento"></textarea>

            <button class="primary-btn" onclick="addQuote()">Adicionar Orçamento</button>
        </div>

        <div class="card">
            <h2>Orçamentos Cadastrados</h2>
            <div id="quoteList"></div>
        </div>
    `;

    updateQuoteList();
}

async function addQuote(){
    const clientId = document.getElementById("quoteClient").value;
    const service = document.getElementById("quoteService").value;

    if(!clientId){
        alert("Selecione um cliente.");
        return;
    }

    if(!service){
        alert("Selecione um serviço.");
        return;
    }

    const selectedClient = clients.find(client => client.id === clientId);

    const newQuote = {
        client_id: clientId,
        client_name: selectedClient.name,
        service,
        value: Number(document.getElementById("quoteValue").value || 0),
        status: document.getElementById("quoteStatus").value,
        description: document.getElementById("quoteDescription").value
    };

    const response = await fetch(`${SUPABASE_URL}/rest/v1/quotes`, {
        method: "POST",
        headers: { ...headers, "Prefer": "return=representation" },
        body: JSON.stringify(newQuote)
    });

    if(!response.ok){
        alert("Erro ao salvar orçamento.");
        return;
    }

    await loadQuotes();
    renderOrcamentos();
}

async function removeQuote(id){
    const response = await fetch(`${SUPABASE_URL}/rest/v1/quotes?id=eq.${id}`, {
        method: "DELETE",
        headers
    });

    if(!response.ok){
        alert("Erro ao remover orçamento.");
        return;
    }

    await loadQuotes();
    renderOrcamentos();
}

function updateQuoteList(){
    const container = document.getElementById("quoteList");

    if(!container) return;

    if(quotes.length === 0){
        container.innerHTML = "<p>Nenhum orçamento cadastrado.</p>";
        return;
    }

    container.innerHTML = quotes.map(quote => `
        <div class="quote-item">
            <div>
                <strong>${quote.client_name}</strong><br>
                <small>${quote.service}</small><br>
                <small>${quote.description || "Sem descrição"}</small><br>
                <strong>R$ ${formatMoney(quote.value)}</strong><br>
                <span class="status ${getStatusClass(quote.status)}">${quote.status}</span>
            </div>

            <button class="danger-btn" onclick="removeQuote('${quote.id}')">Remover</button>
        </div>
    `).join("");
}

function renderServicos(){
    document.getElementById("pageTitle").innerText = "Serviços";

    document.getElementById("pageContent").innerHTML = `
        <div class="card">
            <h2>Novo Serviço</h2>

            <div class="form-grid">
                <input id="serviceName" placeholder="Nome do serviço">

                <select id="serviceCategory">
                    <option value="">Categoria</option>
                    <option value="Lawn Care">Lawn Care</option>
                    <option value="Landscaping">Landscaping</option>
                    <option value="Irrigation">Irrigation</option>
                    <option value="Pressure Washing">Pressure Washing</option>
                    <option value="Gutter Cleaning">Gutter Cleaning</option>
                    <option value="Tree Care">Tree Care</option>
                    <option value="Seasonal Cleanup">Seasonal Cleanup</option>
                    <option value="Other">Other</option>
                </select>

                <input id="serviceBasePrice" type="number" placeholder="Preço base">
                <input id="serviceDuration" placeholder="Duração estimada">

                <select id="serviceStatus">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            <textarea id="serviceDescription" placeholder="Descrição do serviço"></textarea>

            <button class="primary-btn" onclick="addService()">Adicionar Serviço</button>
        </div>

        <div class="card">
            <h2>Serviços Cadastrados</h2>
            <div id="serviceList"></div>
        </div>
    `;

    updateServiceList();
}

async function addService(){
    const name = document.getElementById("serviceName").value.trim();

    if(!name){
        alert("Digite o nome do serviço.");
        return;
    }

    const newService = {
        name,
        category: document.getElementById("serviceCategory").value,
        base_price: Number(document.getElementById("serviceBasePrice").value || 0),
        estimated_duration: document.getElementById("serviceDuration").value,
        status: document.getElementById("serviceStatus").value,
        description: document.getElementById("serviceDescription").value
    };

    const response = await fetch(`${SUPABASE_URL}/rest/v1/services`, {
        method: "POST",
        headers: { ...headers, "Prefer": "return=representation" },
        body: JSON.stringify(newService)
    });

    if(!response.ok){
        alert("Erro ao salvar serviço.");
        return;
    }

    await loadServices();
    renderServicos();
}

async function removeService(id){
    const response = await fetch(`${SUPABASE_URL}/rest/v1/services?id=eq.${id}`, {
        method: "DELETE",
        headers
    });

    if(!response.ok){
        alert("Erro ao remover serviço.");
        return;
    }

    await loadServices();
    renderServicos();
}

function updateServiceList(){
    const container = document.getElementById("serviceList");

    if(!container) return;

    if(services.length === 0){
        container.innerHTML = "<p>Nenhum serviço cadastrado.</p>";
        return;
    }

    container.innerHTML = services.map(service => `
        <div class="service-item">
            <div>
                <strong>${service.name}</strong><br>
                <small>${service.category || "Sem categoria"} • ${service.estimated_duration || "Sem duração"}</small><br>
                <strong>R$ ${formatMoney(service.base_price)}</strong><br>
                <small>${service.description || "Sem descrição"}</small><br>
                <span class="status ${service.status === "Active" ? "status-active" : "status-inactive"}">${service.status}</span>
            </div>

            <button class="danger-btn" onclick="removeService('${service.id}')">Remover</button>
        </div>
    `).join("");
}

function renderProjetos(){
    document.getElementById("pageTitle").innerText = "Projetos";

    document.getElementById("pageContent").innerHTML = `
        <div class="card">
            <h2>Novo Projeto</h2>

            <div class="form-grid">
                <select id="projectClient">
                    <option value="">Cliente</option>
                    ${clients.map(client => `<option value="${client.id}">${client.name}</option>`).join("")}
                </select>

                <select id="projectService">
                    <option value="">Serviço</option>
                    ${services.map(service => `<option value="${service.name}">${service.name}</option>`).join("")}
                </select>

                <input id="projectName" placeholder="Nome do Projeto">
                <input id="projectStart" type="date">
                <input id="projectEnd" type="date">

                <select id="projectStatus">
                    <option value="Planning">Planning</option>
                    <option value="Quoted">Quoted</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            <textarea id="projectNotes" placeholder="Observações"></textarea>

            <button class="primary-btn" onclick="addProject()">Criar Projeto</button>
        </div>

        <div class="card">
            <h2>Projetos Cadastrados</h2>
            <div id="projectList"></div>
        </div>
    `;

    updateProjectList();
}

async function addProject(){
    const clientId = document.getElementById("projectClient").value;

    if(!clientId){
        alert("Selecione um cliente.");
        return;
    }

    const selectedClient = clients.find(client => client.id === clientId);

    const newProject = {
        client_id: clientId,
        client_name: selectedClient.name,
        service_name: document.getElementById("projectService").value,
        project_name: document.getElementById("projectName").value || "Projeto sem nome",
        start_date: document.getElementById("projectStart").value || null,
        end_date: document.getElementById("projectEnd").value || null,
        status: document.getElementById("projectStatus").value,
        notes: document.getElementById("projectNotes").value
    };

    const response = await fetch(`${SUPABASE_URL}/rest/v1/projects`, {
        method: "POST",
        headers: { ...headers, "Prefer": "return=representation" },
        body: JSON.stringify(newProject)
    });

    if(!response.ok){
        alert("Erro ao criar projeto.");
        return;
    }

    await loadProjects();
    renderProjetos();
}

async function removeProject(id){
    const response = await fetch(`${SUPABASE_URL}/rest/v1/projects?id=eq.${id}`, {
        method: "DELETE",
        headers
    });

    if(!response.ok){
        alert("Erro ao remover projeto.");
        return;
    }

    await loadProjects();
    renderProjetos();
}

function updateProjectList(){
    const container = document.getElementById("projectList");

    if(!container) return;

    if(projects.length === 0){
        container.innerHTML = "<p>Nenhum projeto cadastrado.</p>";
        return;
    }

    container.innerHTML = projects.map(project => `
        <div class="project-item">
            <div>
                <strong>${project.project_name}</strong><br>
                <small>Cliente: ${project.client_name || "Sem cliente"}</small><br>
                <small>Serviço: ${project.service_name || "Sem serviço"}</small><br>
                <small>Início: ${project.start_date || "Sem data"} • Fim: ${project.end_date || "Sem data"}</small><br>
                <span class="status ${getProjectStatusClass(project.status)}">${project.status}</span>
            </div>

            <button class="danger-btn" onclick="removeProject('${project.id}')">Remover</button>
        </div>
    `).join("");
}

function getStatusClass(status){
    switch(status){
        case "Draft": return "status-draft";
        case "Sent": return "status-sent";
        case "Approved": return "status-approved";
        case "Rejected": return "status-rejected";
        default: return "status-draft";
    }
}

function getProjectStatusClass(status){
    switch(status){
        case "Planning": return "status-planning";
        case "Quoted": return "status-quoted";
        case "Scheduled": return "status-scheduled";
        case "In Progress": return "status-progress";
        case "Completed": return "status-completed";
        case "Cancelled": return "status-cancelled";
        default: return "status-planning";
    }
}

function getApprovedRevenue(){
    const total = quotes
        .filter(quote => quote.status === "Approved")
        .reduce((sum, quote) => sum + Number(quote.value || 0), 0);

    return formatMoney(total);
}

function formatMoney(value){
    return Number(value || 0).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function renderPlaceholder(page){
    document.getElementById("pageTitle").innerText =
        page.charAt(0).toUpperCase() + page.slice(1);

    document.getElementById("pageContent").innerHTML = `
        <div class="card">
            <h2>Módulo em desenvolvimento</h2>
        </div>
    `;
}
