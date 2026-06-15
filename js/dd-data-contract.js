(function(window){
  "use strict";

  const TABLE_ACCESS = {
    read: "read",
    write: "write",
    ownerWrite: "owner-write",
    backendOnly: "backend-only"
  };

  const MVP_ROUTE_TABLES = {
    clientHome: [
      ["companies", TABLE_ACCESS.read],
      ["projects", TABLE_ACCESS.read],
      ["field_photos", TABLE_ACCESS.read],
      ["field_signatures", TABLE_ACCESS.write],
      ["report_center_exports", TABLE_ACCESS.read],
      ["work_orders", TABLE_ACCESS.read],
      ["work_order_logs", TABLE_ACCESS.read],
      ["project_timeline", TABLE_ACCESS.read]
    ],
    reportCenter: [
      ["companies", TABLE_ACCESS.read],
      ["report_center_exports", TABLE_ACCESS.write]
    ],
    dashboard: [
      ["companies", TABLE_ACCESS.read],
      ["work_orders", TABLE_ACCESS.read],
      ["gps_checkins", TABLE_ACCESS.read],
      ["route_plans", TABLE_ACCESS.read],
      ["weather_alerts", TABLE_ACCESS.read],
      ["bi_snapshots", TABLE_ACCESS.read],
      ["profitability_records", TABLE_ACCESS.read]
    ],
    clients: [
      ["companies", TABLE_ACCESS.ownerWrite],
      ["company_users", TABLE_ACCESS.ownerWrite],
      ["projects", TABLE_ACCESS.read]
    ],
    workOrders: [
      ["companies", TABLE_ACCESS.read],
      ["work_orders", TABLE_ACCESS.write],
      ["work_order_logs", TABLE_ACCESS.write],
      ["field_signatures", TABLE_ACCESS.write]
    ],
    routePlanning: [
      ["companies", TABLE_ACCESS.read],
      ["route_plans", TABLE_ACCESS.write],
      ["route_stops", TABLE_ACCESS.write]
    ],
    fieldDashboard: [
      ["pwa_settings", TABLE_ACCESS.read],
      ["offline_cache_items", TABLE_ACCESS.read],
      ["push_notification_templates", TABLE_ACCESS.read],
      ["route_plans", TABLE_ACCESS.read],
      ["weather_alerts", TABLE_ACCESS.read],
      ["mobile_workforce_tasks", TABLE_ACCESS.read],
      ["gps_checkins", TABLE_ACCESS.read],
      ["work_orders", TABLE_ACCESS.read]
    ],
    mobileWorkforce: [
      ["companies", TABLE_ACCESS.read],
      ["mobile_workforce_tasks", TABLE_ACCESS.write],
      ["gps_checkins", TABLE_ACCESS.write],
      ["team_checkins", TABLE_ACCESS.write],
      ["field_photos", TABLE_ACCESS.write],
      ["work_orders", TABLE_ACCESS.read]
    ],
    weatherCenter: [
      ["companies", TABLE_ACCESS.read],
      ["weather_alerts", TABLE_ACCESS.write]
    ],
    mobileReady: [
      ["companies", TABLE_ACCESS.read],
      ["pwa_settings", TABLE_ACCESS.ownerWrite],
      ["offline_cache_items", TABLE_ACCESS.ownerWrite],
      ["push_notification_templates", TABLE_ACCESS.ownerWrite]
    ],
    pwaCenter: [
      ["companies", TABLE_ACCESS.read],
      ["pwa_settings", TABLE_ACCESS.ownerWrite],
      ["offline_cache_items", TABLE_ACCESS.ownerWrite],
      ["push_notification_templates", TABLE_ACCESS.ownerWrite]
    ],
    profitabilityEngine: [
      ["companies", TABLE_ACCESS.read],
      ["profitability_records", TABLE_ACCESS.ownerWrite]
    ],
    biDashboard: [
      ["companies", TABLE_ACCESS.read],
      ["work_orders", TABLE_ACCESS.read],
      ["gps_checkins", TABLE_ACCESS.read],
      ["route_plans", TABLE_ACCESS.read],
      ["bi_snapshots", TABLE_ACCESS.ownerWrite],
      ["profitability_records", TABLE_ACCESS.read]
    ],
    executiveDashboard: [
      ["companies", TABLE_ACCESS.read],
      ["work_orders", TABLE_ACCESS.read],
      ["gps_checkins", TABLE_ACCESS.read],
      ["route_plans", TABLE_ACCESS.read],
      ["weather_alerts", TABLE_ACCESS.read],
      ["executive_kpi_snapshots", TABLE_ACCESS.ownerWrite]
    ],
    integrationHub: [
      ["companies", TABLE_ACCESS.read],
      ["integration_providers", TABLE_ACCESS.read],
      ["integration_connections", TABLE_ACCESS.ownerWrite],
      ["integration_logs", TABLE_ACCESS.read],
      ["integration_credentials", TABLE_ACCESS.backendOnly],
      ["integration_execution_queue", TABLE_ACCESS.backendOnly],
      ["integration_webhooks", TABLE_ACCESS.backendOnly]
    ],
    configuracoes: [
      ["user_profiles", TABLE_ACCESS.ownerWrite],
      ["role_experience_settings", TABLE_ACCESS.ownerWrite],
      ["role_activity_logs", TABLE_ACCESS.read]
    ]
  };

  const BACKEND_REQUIRED_TABLES = Object.freeze([
    "integration_credentials",
    "integration_execution_queue",
    "integration_webhooks",
    "whatsapp_message_queue",
    "gmail_message_queue",
    "push_notification_queue",
    "automation_flow_runs",
    "ai_command_center_logs"
  ]);

  function tablesForRoute(route){
    return (MVP_ROUTE_TABLES[route] || []).map(function(entry){
      return { table: entry[0], access: entry[1] };
    });
  }

  window.DDDataContract = {
    TABLE_ACCESS,
    MVP_ROUTE_TABLES,
    BACKEND_REQUIRED_TABLES,
    tablesForRoute
  };
})(window);
