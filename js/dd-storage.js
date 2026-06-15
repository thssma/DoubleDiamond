(function(window){
  "use strict";

  const PREFIX = "dd_";

  function key(name){
    return String(name || "").startsWith(PREFIX) ? String(name) : PREFIX + String(name || "");
  }

  function get(name, fallback){
    try{
      const raw = localStorage.getItem(key(name));
      return raw === null ? fallback : raw;
    }catch(e){
      return fallback;
    }
  }

  function set(name, value){
    try{
      localStorage.setItem(key(name), String(value));
      return true;
    }catch(e){
      return false;
    }
  }

  function remove(name){
    try{
      localStorage.removeItem(key(name));
      return true;
    }catch(e){
      return false;
    }
  }

  function getJson(name, fallback){
    const raw = get(name, null);
    if(raw === null) return fallback;
    try{
      return JSON.parse(raw);
    }catch(e){
      return fallback;
    }
  }

  function setJson(name, value){
    try{
      localStorage.setItem(key(name), JSON.stringify(value));
      return true;
    }catch(e){
      return false;
    }
  }

  window.DDStorage = {
    key,
    get,
    set,
    remove,
    getJson,
    setJson
  };
})(window);
