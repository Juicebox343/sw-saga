export function rollD20(event){
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    console.log(element)
    if (dataset.roll) {
      let label = dataset.label ? `Rolling ${dataset.label}` : '';
      // let label = dataset.label ? `Attacking with ${dataset.label}` : '';
      let roll = new Roll(dataset.roll, this.actor.getRollData());
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode'),
      });
      return roll;
    }
}

export function rollDamage(event){
  const element = event.currentTarget;
  const dataset = element.dataset;
  if (dataset.roll) {
    let label = dataset.label ? `What is this ${dataset.label}` : '';
    let roll = new Roll(dataset.roll, this.actor.getRollData());
    roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: label,
      rollMode: game.settings.get('core', 'rollMode'),
    });
    return roll;
  }
}
