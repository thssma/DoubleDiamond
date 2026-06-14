(function(window){
  "use strict";

  const tasks = new Map();
  const pending = new Map();
  const pageChangeTasks = new Map();
  const TICK_MS = 5000;
  let pageChangeHooked = false;

  function safeRun(name, fn){
    try{
      if(typeof fn === "function") fn();
    }catch(error){
      console.warn(`Postprocess task skipped: ${name}`, error);
    }
  }

  function register(name, fn, options){
    const settings = options || {};
    tasks.set(name, {
      fn,
      everyMs: settings.everyMs || 30000,
      lastRun: 0
    });

    if(settings.runSoon !== false){
      runSoon(name, fn, settings.delayMs || 250);
    }
  }

  function runSoon(name, fn, delayMs){
    const key = name || "anonymous";
    clearTimeout(pending.get(key));
    pending.set(key, setTimeout(function(){
      pending.delete(key);
      safeRun(key, fn);
      const task = tasks.get(key);
      if(task) task.lastRun = Date.now();
    }, delayMs || 250));
  }

  function runDue(){
    const now = Date.now();
    tasks.forEach(function(task, name){
      if(now - task.lastRun >= task.everyMs){
        task.lastRun = now;
        safeRun(name, task.fn);
      }
    });
  }

  function ensurePageChangeHook(){
    if(pageChangeHooked || typeof window.changePage !== "function") return;
    const originalChangePage = window.changePage;
    window.changePage = function(){
      const result = originalChangePage.apply(this, arguments);
      pageChangeTasks.forEach(function(task, name){
        task.delays.forEach(function(delay){
          runSoon(`${name}:${delay}`, task.fn, delay);
        });
      });
      return result;
    };
    pageChangeHooked = true;
  }

  function onPageChange(name, fn, delays){
    pageChangeTasks.set(name, {
      fn,
      delays: delays && delays.length ? delays : [250]
    });
    ensurePageChangeHook();
  }

  setInterval(runDue, TICK_MS);

  window.DDPostProcess = {
    register,
    runSoon,
    runDue,
    onPageChange,
    ensurePageChangeHook
  };
})(window);
