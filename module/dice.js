export function SkillCheck(){
    const element = event.currentTarget;
    const dataset = element.dataset;
    if (dataset.roll) {
      let label = dataset.label ? `Rolling ${dataset.label}` : '';
      let roll = new Roll(dataset.roll, this.actor.getRollData());
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode'),
      });
      return roll;
    }
}