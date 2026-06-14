(function(window, document){
  "use strict";

  const ruleSets = new Map();

  function applyRules(value, rules){
    return rules.reduce(function(current, pair){
      return current.replace(pair[0], pair[1]);
    }, String(value || ""));
  }

  function registerRules(name, rules){
    if(Array.isArray(rules)) ruleSets.set(name, rules);
  }

  function applyRuleSet(name, root){
    const rules = ruleSets.get(name);
    if(!rules || !rules.length) return;

    const scope = root || document;
    scope.querySelectorAll("body *").forEach(function(element){
      if(element.childNodes && element.childNodes.length === 1 && element.childNodes[0].nodeType === 3){
        element.textContent = applyRules(element.textContent, rules);
      }

      ["placeholder", "title", "aria-label"].forEach(function(attribute){
        if(element.getAttribute && element.getAttribute(attribute)){
          element.setAttribute(attribute, applyRules(element.getAttribute(attribute), rules));
        }
      });
    });

    scope.querySelectorAll("option").forEach(function(option){
      option.textContent = applyRules(option.textContent, rules);
    });
  }

  function applyAll(root){
    ruleSets.forEach(function(_, name){
      applyRuleSet(name, root);
    });
  }

  window.DDText = {
    registerRules,
    applyRules,
    applyRuleSet,
    applyAll
  };
})(window, document);
