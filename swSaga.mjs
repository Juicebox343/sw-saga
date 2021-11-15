// Import sheet classes.
import swSagaActorSheet from "./module/sheets/actor-sheet.mjs";
import swSagaActor from "./module/documents/actor.mjs";
import swSagaItemSheet from "./module/sheets/item-sheet.mjs";
// Import helper/utility classes and constants.
import { swSaga } from "./module/config.mjs";


async function preloadHandlebarsTemplates(){
  const templatePaths = [
    "systems/swSaga/templates/actor/partials/character-details.hbs",
    "systems/swSaga/templates/actor/partials/stat-block.hbs",
    "systems/swSaga/templates/actor/partials/condition-track.hbs",
    "systems/swSaga/templates/actor/partials/character-page.hbs",
    "systems/swSaga/templates/actor/partials/current-equipment.hbs",
    "systems/swSaga/templates/actor/partials/feats-talents.hbs",
    "systems/swSaga/templates/item/partials/components/item-card.hbs"

  ];
  return loadTemplates(templatePaths);
}


/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', async function() {
  console.log('initializing Star Wars: Saga Edition System')
  
  CONFIG.swSaga = swSaga;
  CONFIG.Actor.documentClass = swSagaActor;
  
  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("swSaga", swSagaActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("swSaga", swSagaItemSheet, { makeDefault: true });

  preloadHandlebarsTemplates();
  
});
