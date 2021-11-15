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
  }
}