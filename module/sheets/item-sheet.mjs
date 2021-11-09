export default class swSagaItemSheet extends ItemSheet {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 975,
      height: 400,
      classes: ["swsaga", "sheet", "item"],
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }

  /* -------------------------------------------- */

  get template() {
    const path = "systems/swSaga/templates/item";
    return `${path}/item-${this.item.data.type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  getData() {
    const context = super.getData();
    console.log(context)
    let sheetData = {
      owner: this.item.isOwner,
      editable: this.isEditable,
      item: context.item,
      data: context.item.data,
      config: CONFIG.swSaga
    }

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
