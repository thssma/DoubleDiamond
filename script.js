const clients = [];

function changePage(page, event){

    const title = document.getElementById("pageTitle");
    const content = document.getElementById("pageContent");

    document.querySelectorAll(".menu-btn")
        .forEach(btn => btn.classList.remove("active"));

    if(event){
        event.target.classList.add("active");
    }

    if(page === "dashboard"){
        renderDashboard(title, content);
    }

    if(page === "clientes"){
        renderClientes(title, content);
    }

    if(page !== "dashboard" && page !== "clientes"){
        title.innerText = page.charAt(0).toUpperCase() + page.slice(1);

        content.innerHTML = `
            <div class="card">
                <h2>${title.innerText}</h2>
                <p>Módulo em desenvolvimento.</p>
            </div>
        `;
    }
}

function renderDashboard(title, content){
    title.innerText = "Dashboard";

    content.innerHTML = `
        <div class="cards">
            <div class="card">
                <h3>Clientes</h3>
                <p>${clients.length}</p>
            </div>

            <div class="card">
                <h3>Orçamentos</h3>
                <p>0</p>
            </div>

            <div class="card">
                <h3>Projetos</h3>
                <p>0</p>
            </div>

            <div class="card">
                <h3>Receita</h3>
                <p>R$ 0,00</p>
            </div>
        </div>
    `;
}

function renderClientes(title, content){
    title.innerText = "Clientes";

    content.innerHTML = `
        <div class="card">
            <h2>Novo Cliente</h2>

            <div class="form-grid">
                <input id="clientName" placeholder="Nome do cliente">
                <input id="clientPhone" placeholder="Telefone">
                <input id="clientEmail" placeholder="Email">
                <input id="clientAddress" placeholder="Endereço">

                <select id="clientPropertyType">
                    <option value="">Tipo de propriedade</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="HOA Community">HOA Community</option>
                    <option value="Office Building">Office Building</option>
                </select>

                <select id="clientStatus">
                    <option value="Ativo">Ativo</option>
                    <option value="Lead">Lead</option>
                    <option value="Inativo">Inativo</option>
                </select>
            </div>

            <textarea id="clientNotes" placeholder="Observações"></textarea>

            <button class="primary-btn" onclick="addClient()">
                Adicionar Cliente
            </button>
        </div>

        <div class="card">
            <h2>Lista de Clientes</h2>
            <div id="clientList"></div>
        </div>
    `;

    renderClientList();
}

function addClient(){
    const name = document.getElementById("clientName").value.trim();
    const phone = document.getElementById("clientPhone").value.trim();
    const email = document.getElementById("clientEmail").value.trim();
    const address = document.getElementById("clientAddress").value.trim();
    const propertyType = document.getElementById("clientPropertyType").value;
    const status = document.getElementById("clientStatus").value;
    const notes = document.getElementById("clientNotes").value.trim();

    if(!name){
        alert("Digite o nome do cliente.");
        return;
    }

    clients.push({
        name,
        phone,
        email,
        address,
        propertyType,
        status,
        notes
    });

    renderClientes(
        document.getElementById("pageTitle"),
        document.getElementById("pageContent")
    );
}

function removeClient(index){
    clients.splice(index, 1);
    renderClientList();
}

function renderClientList(){
    const list = document.getElementById("clientList");

    if(!list) return;

    if(clients.length === 0){
        list.innerHTML = "<p>Nenhum cliente cadastrado.</p>";
        return;
    }

    list.innerHTML = clients.map((client, index) => `
        <div class="client-item">
            <div>
                <strong>${client.name}</strong>
                <p>${client.phone || "Sem telefone"} | ${client.email || "Sem email"}</p>
                <p>${client.address || "Sem endereço"}</p>
                <small>${client.propertyType || "Sem tipo"} • ${client.status}</small>
            </div>

            <button class="danger-btn" onclick="removeClient(${index})">
                Remover
            </button>
        </div>
    `).join("");
}
