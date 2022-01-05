import * as Dice from "../dice.js";


export default class swSagaActorSheet extends ActorSheet {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 850,
      height: 880,
      classes: ["swsaga", "sheet", "actor"],
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "skills" }]
    });
  }

/* -------------------------------------------- */

  get template() {
    const path = "systems/swSaga/templates/actor";
    return `${path}/actor-${this.actor.data.type}-sheet.hbs`;
  }

  itemContextMenu = [
    {
      name: game.i18n.localize('swSaga.sheet.edit'),
      icon: '<i class="fas fa-edit"></i>',
      callback: element => {
        const item = this.actor.items.get(element.data('item-id'));
        item.sheet.render(true);
      }
    },
    {
      name: game.i18n.localize('swSaga.sheet.delete'),
      icon: '<i class="fas fa-trash"></i>',
      callback: element => {
        const item = this.actor.items.get(element.data('item-id'));
        item.delete();
      }
    },

  ]

  getData() {
    const context = super.getData();
    let sheetData = {
      owner: this.actor.isOwner,
      editable: this.isEditable,
      actor: context.actor,
      data: context.actor.data.data,
      weapons: context.items.filter(function(item){return item.type == 'weapon'}),
      armor: context.items.filter(function(item){return item.type == 'armor'}),
      class: context.items.filter(function(item){return item.type == 'class'}),
      species: context.items.filter(function(item){return item.type == 'species'}),
      feats: context.items.filter(function(item){return item.type == 'feat'}),
      talents: context.items.filter(function(item){return item.type == 'talent'}),
      force: context.items.filter(function(item){return item.type == 'forcePower'}),
      equipment: context.items.filter(function(item){return item.type == 'equipment'}),
      consumables: context.items.filter(function(item){return item.type == 'consumables'}),
      config: CONFIG.swSaga
    }
    return sheetData;
  }
  /* -------------------------------------------- */

  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    html.find("input[type='checkbox'").change(this._onSkillEdit.bind(this));

    // Roll handlers, click handlers, etc. would go here.
    html.find(".rollable").click(Dice.rollD20.bind(this));
    html.find(".item-create").click(this._onItemCreate.bind(this));
    // html.find(".item-edit").click(this._onItemEdit.bind(this));
    html.find(".item-roll").click(Dice.rollD20.bind(this));
    html.find(".item-damage").click(Dice.rollDamage.bind(this));
    html.find(".item-delete").click(this._onItemDelete.bind(this));

    new ContextMenu(html, ".item-card", this.itemContextMenu);
  }

  _onSkillEdit(event){
    event.preventDefault();
    let skill = {};
    let element = event.currentTarget;
    let itemId = element.closest(".item").dataset.itemId;
    skill["data.skills." + itemId + ".trained"] = element.checked;
    return this.actor.update(skill)
  }

  _onItemCreate(event){
    event.preventDefault();
    let element = event.currentTarget;

    let itemData = {
      name: game.i18n.localize("swSaga.sheet.newItem"),
    }
    return this.actor.items.new(itemData)
  }

  // _onItemEdit(event){
  //   event.preventDefault();
  //   console.log('hey')
  //   let element = event.currentTarget;
  //   let itemId = element.closest(".item").dataset.itemId;
  //   let item = this.actor.items.get(itemId);
  //   item.sheet.render(true);
  // }

  _onItemDelete(event){
    event.preventDefault();
    const li = event.currentTarget.closest(".item");
    const item = this.actor.items.get(li.dataset.itemId);
    return item.delete();
  }
}