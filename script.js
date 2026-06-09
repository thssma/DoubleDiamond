const clients = [];

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

            </div>

            <textarea
                id="notes"
                placeholder="Observações">
            </textarea>

            <button
                class="primary-btn"
                onclick="addClient()">

                Adicionar Cliente

            </button>

        </div>

        <br>

        <div class="card">

            <h2>Clientes Cadastrados</h2>

            <div id="clientList"></div>

        </div>
    `;

    updateClientList();
}

function addClient(){

    const name =
        document.getElementById("name").value.trim();

    if(!name){

        alert("Digite o nome do cliente");

        return;
    }

    clients.push({
        name,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        notes: document.getElementById("notes").value
    });

    updateClientList();
}

function removeClient(index){

    clients.splice(index,1);

    updateClientList();
}

function updateClientList(){

    const container =
        document.getElementById("clientList");

    if(!container) return;

    if(clients.length === 0){

        container.innerHTML =
            "<p>Nenhum cliente cadastrado.</p>";

        return;
    }

    container.innerHTML =
        clients.map((client,index)=>`

            <div class="client-item">

                <div>

                    <strong>${client.name}</strong>

                    <br>

                    ${client.phone}

                </div>

                <button
                    class="danger-btn"
                    onclick="removeClient(${index})">

                    Remover

                </button>

            </div>

        `).join("");
}

function renderPlaceholder(page){

    document.getElementById("pageTitle").innerText =
        page;

    document.getElementById("pageContent").innerHTML = `
        <div class="card">
            <h2>Módulo em desenvolvimento</h2>
        </div>
    `;
}
