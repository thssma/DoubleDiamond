(function(window){
  "use strict";

  const config = window.DDConfig || {};
  const SUPABASE_URL = config.SUPABASE_URL || "";
  const SUPABASE_ANON_KEY = config.SUPABASE_ANON_KEY || "";

  function apiHeaders(extraHeaders){
    return {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      ...(extraHeaders || {})
    };
  }

  async function apiGet(table){
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*&order=created_at.desc`, {
      headers: apiHeaders()
    });
    if(!response.ok) return [];
    return await response.json();
  }

  async function apiInsert(table, data){
    return await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: apiHeaders({"Prefer": "return=representation"}),
      body: JSON.stringify(data)
    });
  }

  async function apiPatch(table, id, data){
    return await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
      method: "PATCH",
      headers: apiHeaders({"Prefer": "return=representation"}),
      body: JSON.stringify(data)
    });
  }

  async function apiDelete(table, id){
    return await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
      method: "DELETE",
      headers: apiHeaders()
    });
  }

  window.DDApi = {
    apiHeaders,
    apiGet,
    apiInsert,
    apiPatch,
    apiDelete
  };

  window.apiGet = apiGet;
  window.apiInsert = apiInsert;
  window.apiPatch = apiPatch;
  window.apiDelete = apiDelete;
})(window);
