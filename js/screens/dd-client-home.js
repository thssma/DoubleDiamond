(function(window){
  "use strict";

  function renderBase(state){
    const data = state || {};
    const fieldPhotos = data.fieldPhotos || [];
    const reportCenterExports = data.reportCenterExports || [];
    const workOrderLogs = data.workOrderLogs || [];
    const workOrders = data.workOrders || [];
    const teamCheckins = data.teamCheckins || [];
    const projectTimeline = data.projectTimeline || [];
    const fieldSignatures = data.fieldSignatures || [];

    window.setTitle("My Project");

    const recentPhotosSafe = Array.isArray(fieldPhotos) ? fieldPhotos.slice(0, 6) : [];
    const reportsCount = Array.isArray(reportCenterExports) ? reportCenterExports.length : 0;
    const visitsCompleted = Array.isArray(workOrderLogs) ? workOrderLogs.length : 3;
    const projectName = (workOrders && workOrders[0] && (workOrders[0].client_name || workOrders[0].project_name || workOrders[0].service_type)) || "Jardim Residencial";
    const lastUpdate = new Date().toLocaleString("pt-BR", {day:"2-digit", month:"2-digit", hour:"2-digit", minute:"2-digit"});

    window.setContent(`
      <div class="v651-premium-page">
        <section class="v651-premium-hero">
          <div class="v651-hero-top"><div><div class="v651-eyebrow">Client Portal - V66.0</div><h2>My Project</h2><p>Track progress, before/during/after photos, upcoming visits, team, documents e updates.</p></div><div class="v651-status-pill">On Schedule</div></div>
          <div class="v651-progress"><span></span></div><strong>72% completed</strong><p style="color:#d1fae5;margin-top:8px;">Last Update: ${lastUpdate}</p>
          <div class="v651-hero-actions"><button id="ddClientViewReports" class="v651-primary" type="button">View Reports</button></div>
        </section>
        <div class="v66-kpis"><div class="v66-kpi">Total Photos<strong>${recentPhotosSafe.length || 4}</strong></div><div class="v66-kpi">Last Update<strong>${lastUpdate}</strong></div><div class="v66-kpi">Visits Completed<strong>${visitsCompleted || 3}</strong></div><div class="v66-kpi">Progress<strong>72%</strong></div></div>
        <div class="v651-grid"><div class="v651-card"><h3>Next Step</h3><p><strong>Irrigation Installation</strong></p><small>Assigned to: Team Verde</small></div><div class="v651-card"><h3>Next Visit</h3><p><strong>12/06 as 08:00</strong></p><small>Irrigation and site preparation</small></div><div class="v651-card"><h3>Project Status</h3><p><strong>${projectName}</strong></p><small>Project in Progress</small></div><div class="v651-card"><h3>Reports</h3><p><strong>${reportsCount}</strong> disponiveis</p><small>Documents preparados para o cliente</small></div></div>
        <div class="v651-card"><h3>Evolucao do Projeto</h3><div class="v66-tabs"><button class="v66-tab active" data-tab="Todos" onclick="ddV66RenderGallery('Todos')">Todos</button><button class="v66-tab" data-tab="Antes" onclick="ddV66RenderGallery('Antes')">Antes</button><button class="v66-tab" data-tab="Durante" onclick="ddV66RenderGallery('Durante')">Durante</button><button class="v66-tab" data-tab="Depois" onclick="ddV66RenderGallery('Depois')">Depois</button></div><div id="v66GalleryArea" class="v66-gallery-grid"></div></div>
        <div class="v651-card"><h3>Comparacao Antes / Depois</h3><div class="v66-comparison"><div class="v66-compare-card">Antes<br><small>Estado original do projeto</small></div><div class="v66-compare-card after">Depois<br><small>Resultado planejado / evolucao atual</small></div></div></div>
        <div class="v651-grid"><div class="v651-card"><h3>Project Timeline</h3><div class="v651-timeline"><div class="v651-step"><div class="v651-dot">OK</div><div><strong>Contrato aprovado</strong><br><small>Projeto confirmado</small></div></div><div class="v651-step"><div class="v651-dot">OK</div><div><strong>Planejamento</strong><br><small>Escopo e team definidos</small></div></div><div class="v651-step"><div class="v651-dot current">...</div><div><strong>Execucao em andamento</strong><br><small>Instalacao e paisagismo</small></div></div><div class="v651-step"><div class="v651-dot todo">-</div><div><strong>Entrega</strong><br><small>Projeto completed</small></div></div></div></div><div class="v651-card"><h3>Recent Updates</h3><div class="v651-feed-item"><div class="v651-feed-icon">1</div><div><strong>Hoje</strong><br><small>Team iniciou preparacao do terreno</small></div></div><div class="v651-feed-item"><div class="v651-feed-icon">2</div><div><strong>Ontem</strong><br><small>Materiais entregues no local</small></div></div></div></div>
        <div class="v651-grid"><div class="v651-card"><h3>Team Assigned to</h3><div class="v651-team"><div class="v651-person"><div class="v651-avatar">SV</div><div><strong>Supervisor</strong><br><small>Coordenacao do projeto</small></div></div><div class="v651-person"><div class="v651-avatar">PS</div><div><strong>Paisagista</strong><br><small>Execucao e acabamento</small></div></div></div></div><div class="v651-card"><h3>Financial Summary</h3><div class="v651-grid"><div><strong>Total</strong><br><small>R$ 18.000,00</small></div><div><strong>Pago</strong><br><small>R$ 15.000,00</small></div><div><strong>Pendente</strong><br><small>R$ 3.000,00</small></div></div></div></div>
        <div class="v651-card"><h3>Documents</h3><div class="v651-docs"><div class="v651-doc">Contrato</div><div class="v651-doc">Orcamento</div><div class="v651-doc">Reports</div><div class="v651-doc">Garantia</div></div></div>
        <div class="s1-section">
          <h2>Real Operations</h2>
          <div class="s1-grid">
            <div class="s1-card"><h3>Work Orders</h3><strong>${workOrders.length}</strong><span class="s1-pill">work_orders</span></div>
            <div class="s1-card"><h3>Check-ins</h3><strong>${teamCheckins.length}</strong><span class="s1-pill">team_checkins</span></div>
            <div class="s1-card"><h3>Fotos</h3><strong>${fieldPhotos.length}</strong><span class="s1-pill">field_photos</span></div>
            <div class="s1-card"><h3>Timeline</h3><strong>${projectTimeline.length}</strong><span class="s1-pill">project_timeline</span></div>
          </div>
        </div>
        <div class="s2-section">
          <h2>Aprovacao, Assinatura e Report</h2>
          <div class="s2-kpis">
            <div class="s2-kpi"><strong>Assinaturas</strong><br>${fieldSignatures.length}</div>
            <div class="s2-kpi"><strong>Reports</strong><br>${reportCenterExports.length}</div>
            <div class="s2-kpi"><strong>Eventos Timeline</strong><br>${projectTimeline.length}</div>
          </div>
          <div class="s2-actions">
            <button class="primary-btn" onclick="s2ApproveCurrentStep()">Approve Step</button>
            <button class="secondary-btn" onclick="s2CreateReportRecord()">Gerar Registro de Report</button>
          </div>
          <div class="s2-signature">
            <h3>Simple Digital Signature</h3>
            <input id="s2Signer" placeholder="Nome do assinante" value="Client">
            <textarea id="s2Signature" placeholder="Enter signature or confirmation"></textarea>
            <button class="success-btn" onclick="s2SaveSignature()">Save Signature</button>
          </div>
        </div>
      </div>`);

    setTimeout(function(){
      if(typeof window.ddV66RenderGallery === "function") window.ddV66RenderGallery("Todos");
    }, 0);

    const reportsButton = document.getElementById("ddClientViewReports");
    if(reportsButton){
      reportsButton.addEventListener("click", function(){
        if(typeof window.renderReportCenter === "function") window.renderReportCenter();
      });
    }
  }

  window.DDClientHomeScreen = { renderBase };
})(window);
