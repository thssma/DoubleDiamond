(function(window){
  "use strict";

  const RULES = [
    [/AutomaÃ§Ã£o/g, "Automacao"],
    [/automaÃ§Ã£o/g, "automacao"],
    [/AÃ§Ã£o/g, "Acao"],
    [/aÃ§Ã£o/g, "acao"],
    [/OperaÃ§Ãµes/g, "Operacoes"],
    [/operaÃ§Ãµes/g, "operacoes"],
    [/ConfiguraÃ§Ã£o/g, "Configuracao"],
    [/configuraÃ§Ã£o/g, "configuracao"],
    [/PreparaÃ§Ã£o/g, "Preparacao"],
    [/preparaÃ§Ã£o/g, "preparacao"],
    [/InstalaÃ§Ã£o/g, "Instalacao"],
    [/instalaÃ§Ã£o/g, "instalacao"],
    [/DisponÃ­vel/g, "Disponivel"],
    [/disponÃ­vel/g, "disponivel"],
    [/RelatÃ³rio/g, "Relatorio"],
    [/relatÃ³rio/g, "relatorio"],
    [/PrÃ³xima/g, "Proxima"],
    [/prÃ³xima/g, "proxima"],
    [/ServiÃ§o/g, "Servico"],
    [/serviÃ§o/g, "servico"],
    [/InvÃ¡lido/g, "Invalido"],
    [/invÃ¡lido/g, "invalido"],
    [/NÃ£o/g, "Nao"],
    [/nÃ£o/g, "nao"],
    [/JÃ¡/g, "Ja"],
    [/jÃ¡/g, "ja"],
    [/Ã s/g, "as"],
    [/Ãrea/g, "Area"],
    [/TÃ©cnico/g, "Tecnico"],
    [/IrrigaÃ§Ã£o/g, "Irrigacao"],
    [/ExecuÃ§Ã£o/g, "Execucao"],
    [/InspeÃ§Ã£o/g, "Inspecao"],
    [/CoordenaÃ§Ã£o/g, "Coordenacao"],
    [/OrÃ§amento/g, "Orcamento"],
    [/NotificaÃ§Ã£o/g, "Notificacao"],
    [/NotificaÃ§Ãµes/g, "Notificacoes"],
    [/AtualizaÃ§Ã£o/g, "Atualizacao"],
    [/atualizaÃ§Ã£o/g, "atualizacao"],
    [/possÃ­vel/g, "possivel"],
    [/rÃ¡pido/g, "rapido"],
    [/climÃ¡ticos/g, "climaticos"],
    [/crÃ­tico/g, "critico"],
    [/disponÃ­veis/g, "disponiveis"],
    [/presenÃ§a/g, "presenca"],
    [/cobranÃ§a/g, "cobranca"],
    [/•/g, "-"],
    [/Â·/g, "-"]
  ];

  function apply(){
    if(!window.DDText) return;
    window.DDText.registerRules("encodingCleanup", RULES);
    window.DDText.applyRuleSet("encodingCleanup");
  }

  window.DDEncodingCleanup = { RULES, apply };

  document.addEventListener("DOMContentLoaded", function(){ setTimeout(apply, 300); });
  if(window.DDPostProcess){
    window.DDPostProcess.onPageChange("encodingCleanup", apply, [100, 500]);
    window.DDPostProcess.register("encodingCleanup", apply, {everyMs:30000});
  }
})(window);
