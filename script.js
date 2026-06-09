const clients = [];
const quotes = [];

window.onload = () => {
    renderDashboard();
};

function changePage(page, event){

    document
        .querySelectorAll(".menu-btn")
        .forEach(btn => btn.classList.remove("active"));

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
                <h3>Projetos</h3>
                <p>0</p>
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

            <button class="primary-btn" onclick="addClient()">
                Adicionar Cliente
            </button>

        </div>

        <div class="card">

            <h2>Clientes Cadastrados</h2>

            <div id="clientList"></div>

        </div>
    `;

    updateClientList();
}

function addClient(){

    const name = document.getElementById("name").value.trim();

    if(!name){
        alert("Digite o nome do cliente");
        return;
    }

    clients.push({
        name,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        propertyType: document.getElementById("propertyType").value,
        status: document.getElementById("clientStatus").value,
        notes: document.getElementById("notes").value
    });

    renderClientes();
}

function removeClient(index){

    clients.splice(index,1);

    renderClientes();
}

function updateClientList(){

    const container = document.getElementById("clientList");

    if(!container) return;

    if(clients.length === 0){

        container.innerHTML = "<p>Nenhum cliente cadastrado.</p>";

        return;
    }

    container.innerHTML = clients.map((client,index)=>`

        <div class="client-item">

            <div>
                <strong>${client.name}</strong><br>
                <small>${client.phone || "Sem telefone"} | ${client.email || "Sem email"}</small><br>
                <small>${client.address || "Sem endereço"}</small><br>
                <small>${client.propertyType || "Sem tipo"} • ${client.status}</small>
            </div>

            <button class="danger-btn" onclick="removeClient(${index})">
                Remover
            </button>

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
                    ${clients.map((client, index) => `
                        <option value="${index}">${client.name}</option>
                    `).join("")}
                </select>

                <select id="quoteService">
                    <option value="">Serviço</option>
                    <option value="Lawn Care">Lawn Care</option>
                    <option value="Landscaping">Landscaping</option>
                    <option value="Irrigation">Irrigation</option>
                    <option value="Pressure Washing">Pressure Washing</option>
                    <option value="Gutter Cleaning">Gutter Cleaning</option>
                    <option value="Tree Care">Tree Care</option>
                    <option value="Seasonal Cleanup">Seasonal Cleanup</option>
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

            <button class="primary-btn" onclick="addQuote()">
                Adicionar Orçamento
            </button>

        </div>

        <div class="card">

            <h2>Orçamentos Cadastrados</h2>

            <div id="quoteList"></div>

        </div>
    `;

    updateQuoteList();
}

function addQuote(){

    const clientIndex = document.getElementById("quoteClient").value;
    const service = document.getElementById("quoteService").value;
    const value = document.getElementById("quoteValue").value;
    const status = document.getElementById("quoteStatus").value;
    const description = document.getElementById("quoteDescription").value;

    if(clientIndex === ""){
        alert("Selecione um cliente.");
        return;
    }

    if(!service){
        alert("Selecione um serviço.");
        return;
    }

    quotes.push({
        clientName: clients[clientIndex].name,
        service,
        value,
        status,
        description
    });

    renderOrcamentos();
}

function removeQuote(index){

    quotes.splice(index,1);

    renderOrcamentos();
}

function updateQuoteList(){

    const container = document.getElementById("quoteList");

    if(!container) return;

    if(quotes.length === 0){

        container.innerHTML = "<p>Nenhum orçamento cadastrado.</p>";

        return;
    }

    container.innerHTML = quotes.map((quote,index)=>`

        <div class="quote-item">

            <div>
                <strong>${quote.clientName}</strong><br>
                <small>${quote.service}</small><br>
                <small>${quote.description || "Sem descrição"}</small><br>
                <strong>R$ ${formatMoney(quote.value)}</strong><br>
                <span class="status ${getStatusClass(quote.status)}">
                    ${quote.status}
                </span>
            </div>

            <button class="danger-btn" onclick="removeQuote(${index})">
                Remover
            </button>

        </div>

    `).join("");
}

function getStatusClass(status){

    switch(status){

        case "Draft":
            return "status-draft";

        case "Sent":
            return "status-sent";

        case "Approved":
            return "status-approved";

        case "Rejected":
            return "status-rejected";

        default:
            return "status-draft";
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
