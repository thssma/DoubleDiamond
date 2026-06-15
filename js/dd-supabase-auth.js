(function(window){
  "use strict";

  const config = window.DDConfig || {};
  const storage = window.DDStorage;
  const SESSION_KEY = "dd_supabase_auth_session_v1";

  function isConfigured(){
    return Boolean(config.SUPABASE_URL && config.SUPABASE_ANON_KEY);
  }

  function authUrl(path){
    return `${config.SUPABASE_URL}/auth/v1/${path}`;
  }

  function headers(token){
    return {
      "apikey": config.SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };
  }

  function saveSession(session){
    if(storage) storage.setJson(SESSION_KEY, session);
    else localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  function getSession(){
    if(storage) return storage.getJson(SESSION_KEY, null);
    try{ return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); }catch(e){ return null; }
  }

  function clearSession(){
    if(storage) storage.remove(SESSION_KEY);
    else localStorage.removeItem(SESSION_KEY);
  }

  async function signInWithPassword(email, password){
    if(!isConfigured()) throw new Error("Supabase Auth is not configured");
    const response = await fetch(authUrl("token?grant_type=password"), {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ email, password })
    });
    const payload = await response.json().catch(function(){ return {}; });
    if(!response.ok) throw new Error(payload.error_description || payload.msg || "Supabase Auth sign-in failed");
    saveSession(payload);
    return payload;
  }

  async function signOut(){
    const session = getSession();
    const token = session && session.access_token;
    if(token && isConfigured()){
      await fetch(authUrl("logout"), {
        method: "POST",
        headers: headers(token)
      }).catch(function(){});
    }
    clearSession();
  }

  function userMetadata(){
    const session = getSession();
    const user = session && session.user;
    const app = (user && user.app_metadata) || {};
    const meta = (user && user.user_metadata) || {};
    return {
      role: app.role || meta.role || "",
      company_id: app.company_id || meta.company_id || "",
      email: user && user.email || ""
    };
  }

  window.DDSupabaseAuth = {
    SESSION_KEY,
    isConfigured,
    signInWithPassword,
    signOut,
    getSession,
    clearSession,
    userMetadata
  };
})(window);
