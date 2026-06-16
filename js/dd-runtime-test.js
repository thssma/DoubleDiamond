(function(window){
  "use strict";

  const functionBaseUrl = "https://phpphqcxzwpuiglkqkls.supabase.co/functions/v1";

  window.DD_RUNTIME_CONFIG = {
    DEMO_MODE: false,
    BACKEND_ENDPOINTS: {
      default: `${functionBaseUrl}/doublediamond-dispatch`,
      "whatsapp_message_queue.insert": `${functionBaseUrl}/send-whatsapp`,
      "gmail_message_queue.insert": `${functionBaseUrl}/send-gmail`,
      "push_notification_queue.insert": `${functionBaseUrl}/send-push`,
      "automation_flow_runs.insert": `${functionBaseUrl}/run-automation`,
      "ai_command_center_logs.insert": `${functionBaseUrl}/run-ai-command`
    }
  };
})(window);
