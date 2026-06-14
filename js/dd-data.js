(function(window){
  "use strict";

  const TABLES = [
    ["companies", "companies"],
    ["projects", "projects"],
    ["companyUsers", "company_users"],
    ["integrationProviders", "integration_providers"],
    ["integrationConnections", "integration_connections"],
    ["integrationLogs", "integration_logs"],
    ["aiAgents", "ai_agents"],
    ["aiInsights", "ai_insights"],
    ["integrationCredentials", "integration_credentials"],
    ["integrationQueue", "integration_execution_queue"],
    ["integrationWebhooks", "integration_webhooks"],
    ["copilotConversations", "copilot_conversations"],
    ["copilotMessages", "copilot_messages"],
    ["promptTemplates", "prompt_templates"],
    ["executiveKpiSnapshots", "executive_kpi_snapshots"],
    ["reportCenterExports", "report_center_exports"],
    ["automationCenterItems", "automation_center_items"],
    ["mobileAppSettings", "mobile_app_settings"],
    ["pwaSettings", "pwa_settings"],
    ["offlineCacheItems", "offline_cache_items"],
    ["pushNotificationTemplates", "push_notification_templates"],
    ["routePlans", "route_plans"],
    ["routeStops", "route_stops"],
    ["weatherAlerts", "weather_alerts"],
    ["mobileWorkforceTasks", "mobile_workforce_tasks"],
    ["gpsCheckins", "gps_checkins"],
    ["teamCheckins", "team_checkins"],
    ["fieldPhotos", "field_photos"],
    ["fieldSignatures", "field_signatures"],
    ["workOrders", "work_orders"],
    ["workOrderLogs", "work_order_logs"],
    ["projectTimeline", "project_timeline"],
    ["biSnapshots", "bi_snapshots"],
    ["analyticsRankings", "analytics_rankings"],
    ["forecastScenarios", "forecast_scenarios"],
    ["profitabilityRecords", "profitability_records"],
    ["executiveIntelligenceItems", "executive_intelligence_items"],
    ["mapsRouteRequests", "maps_route_requests"],
    ["whatsappMessageQueue", "whatsapp_message_queue"],
    ["gmailMessageQueue", "gmail_message_queue"],
    ["pushNotificationQueue", "push_notification_queue"],
    ["automationFlowTemplates", "automation_flow_templates"],
    ["automationFlowRuns", "automation_flow_runs"],
    ["architectureAuditLogs", "architecture_audit_logs"],
    ["moduleRegistry", "module_registry"],
    ["aiOperationsReadiness", "ai_operations_readiness"],
    ["aiLeadScores", "ai_lead_scores"],
    ["aiQuoteDrafts", "ai_quote_drafts"],
    ["aiProjectRisks", "ai_project_risks"],
    ["aiFinancialAdvice", "ai_financial_advice"],
    ["aiWorkforcePlans", "ai_workforce_plans"],
    ["aiRouteOptimizations", "ai_route_optimizations"],
    ["aiWeatherImpacts", "ai_weather_impacts"],
    ["aiExecutiveReports", "ai_executive_reports"],
    ["aiAutomationRecommendations", "ai_automation_recommendations"],
    ["aiCommandCenterLogs", "ai_command_center_logs"],
    ["userProfiles", "user_profiles"],
    ["roleExperienceSettings", "role_experience_settings"],
    ["roleActivityLogs", "role_activity_logs"]
  ];

  async function loadTables(apiGet){
    const entries = await Promise.all(TABLES.map(async ([stateKey, tableName]) => {
      return [stateKey, await apiGet(tableName)];
    }));
    return Object.fromEntries(entries);
  }

  window.DDData = {
    TABLES,
    loadTables
  };
})(window);
