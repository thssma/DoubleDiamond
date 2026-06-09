function changePage(page){

    const title = document.getElementById("pageTitle");
    const content = document.getElementById("pageContent");

    document.querySelectorAll(".menu-btn")
        .forEach(btn => btn.classList.remove("active"));

    event.target.classList.add("active");

    switch(page){

        case "dashboard":

            title.innerText = "Dashboard";

            content.innerHTML = `
                <div class="cards">
                    <div class="card">
                        <h3>Clientes</h3>
                        <p>0</p>
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
        break;

        default:

            title.innerText =
                page.charAt(0).toUpperCase() + page.slice(1);

            content.innerHTML = `
                <div class="card">
                    <h2>${title.innerText}</h2>
                    <p>Módulo em desenvolvimento.</p>
                </div>
            `;
    }
}
