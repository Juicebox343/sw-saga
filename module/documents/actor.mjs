export default class BoilerplateActor extends Actor {

prepareData() {
    super.prepareData();
  }

  prepareBaseData() {

  }
  prepareDerivedData() {
    const actorData = this.data;
    const data = actorData.data;
    const flags = actorData.flags.boilerplate || {};

    this._prepareCharacterData(actorData);
  }

  _prepareCharacterData(actorData){
    if(actorData.type !== 'character') return;

    const data = actorData.data;

    for (let [key, ability] of Object.entries(data.abilities)){
        ability.mod = Math.floor((ability.value - 10) / 2)
    }

   
      data.refDef.value = Math.floor((ability.value - 10) / 2)
  }
  }

  /**
 * Override getRollData() that's supplied to rolls.
 */
getRollData() {
  const data = super.getRollData();

  // Prepare character roll data.
  this._getCharacterRollData(data);
  this._getNpcRollData(data);

  return data;
}

/**
 * Prepare character roll data.
 */
_getCharacterRollData(data) {
  if (this.data.type !== 'character') return;

  // Copy the ability scores to the top level, so that rolls can use
  // formulas like `@str.mod + 4`.
  if (data.abilities) {
    for (let [k, v] of Object.entries(data.abilities)) {
      data[k] = foundry.utils.deepClone(v);
    }
  }

  // Add level for easier access, or fall back to 0.
  if (data.attributes.level) {
    data.lvl = data.attributes.level.value ?? 0;
  }
}
}