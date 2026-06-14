(function(window){
  "use strict";

  const runtime = window.DD_RUNTIME_CONFIG || {};
  const demoPins = runtime.DEMO_PINS || {};

  window.DDConfig = {
    SUPABASE_URL: "https://phpphqcxzwpuiglkqkls.supabase.co",
    SUPABASE_ANON_KEY: runtime.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBocHBocWN4endwdWlnbGtxa2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwNDE0NTAsImV4cCI6MjA5NjYxNzQ1MH0.z0F0KAHCWKdRTyg5JeNDzAWEbIdFEknT_kmx4QyMz3I",
    DEMO_MODE: runtime.DEMO_MODE !== false,
    DEMO_PINS: {
      owner: demoPins.owner || "owner123",
      employee: demoPins.employee || "field123"
    }
  };
})(window);
