// Import sheet classes.
import swSagaActorSheet from "./module/sheets/actor-sheet.mjs";
import swSagaActor from "./module/documents/actor.mjs";
import swSagaItem from "./module/documents/item.mjs";
import swSagaItemSheet from "./module/sheets/item-sheet.mjs";
// Import helper/utility classes and constants.
import { swSaga } from "./module/config.mjs";


async function preloadHandlebarsTemplates(){
  const templatePaths = [
    "systems/swSaga/templates/item/partials/components/armor-card.hbs",
    "systems/swSaga/templates/item/partials/components/weapon-card.hbs"

  ];
  return loadTemplates(templatePaths);
}


/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', async function() {
  console.log('Loading swsaga system')
  
  CONFIG.swSaga = swSaga;
  CONFIG.Actor.documentClass = swSagaActor;
  CONFIG.Item.documentClass = swSagaItem;
  
  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("swSaga", swSagaActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("swSaga", swSagaItemSheet, { makeDefault: true });

  preloadHandlebarsTemplates();

  Handlebars.registerHelper('setBonus', (actorObject, skillObject, x, y) =>{
    let armor = 0;
    let talent = 0;
    let feat = 0;
    let equipment = 0;
    if (x === y){
      return actorObject.abilities[x].mod + (skillObject.trained ? 5 : 0) + (Math.floor(actorObject.characterLevel / 2));
    }
    return null;
  })
  
});
