(function(window){
  "use strict";

  function render(state){
    const data = state || {};
    const companies = data.companies || [];
    const reportCenterExports = data.reportCenterExports || [];

    window.setTitle("Report Center");

    window.setContent(`
      <div class="executive-hero">
        <h2>Report Center</h2>
        <p>Reports prepared for PDF, CSV and Excel.</p>
      </div>

      <div class="card">
        <h2>New Report</h2>
        <div class="form-grid">
          <select id="reportCompany">
            <option value="">Client</option>
            ${companies.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}
          </select>
          <input id="reportName" placeholder="Report name">
          <select id="reportType"><option>Financial</option><option>Projetos</option><option>CRM</option><option>Operacoes</option><option>SaaS</option><option>Marketplace</option></select>
          <select id="reportFormat"><option>CSV</option><option>PDF</option><option>Excel</option></select>
        </div>
        <button class="primary-btn" onclick="createReportExport()">Prepare Report</button>
      </div>

      <div class="report-grid">
        ${reportCenterExports.length ? reportCenterExports.map(r => `
          <div class="report-card">
            <h2>${r.report_name}</h2>
            <small>${r.report_type}</small><br>
            <span class="export-badge">${r.export_format}</span>
            <p>Status: ${r.status}</p>
          </div>
        `).join("") : "<div class='card'>Nenhum relatorio preparado.</div>"}
      </div>
    `);
  }

  window.DDReportCenterScreen = { render };
})(window);
