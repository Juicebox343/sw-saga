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
    let sheetData = {
      owner: this.item.isOwner,
      editable: this.isEditable,
      item: context.item,
      data: context.item.data.data,
      config: CONFIG.swSaga
    }
    console.log(sheetData)
    return sheetData;
  }

  activateListeners(html) {
    super.activateListeners(html);
    // Everything below here is only needed if the sheet is editable

  }
}