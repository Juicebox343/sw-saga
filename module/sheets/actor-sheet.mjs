export default class swSagaActorSheet extends ActorSheet {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 700,
      height: 900,
      classes: ["swsaga", "sheet", "actor"],
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }

/* -------------------------------------------- */

  get template() {
    const path = "systems/swSaga/templates/actor";
    return `${path}/actor-${this.actor.data.type}-sheet.hbs`;
  }

  getData() {
    const context = super.getData();
    let sheetData = {
      owner: this.actor.isOwner,
      editable: this.isEditable,
      actor: context.actor,
      data: context.actor.data.data,
      weapons: context.items.filter(function(item){return item.type == 'weapon'}),
      config: CONFIG.swSaga
    }
    
    console.log(sheetData)
    return sheetData;
  }
  /* -------------------------------------------- */

  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Roll handlers, click handlers, etc. would go here.
  }
}
