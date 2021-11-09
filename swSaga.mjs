// Import sheet classes.
import swSagaActorSheet from "./module/sheets/actor-sheet.mjs";
import swSagaItemSheet from "./module/sheets/item-sheet.mjs";
// Import helper/utility classes and constants.
import { swSaga } from "./module/config.mjs";


async function preloadHandlebarsTemplates(){
  const templatePaths = [
    "systems/swSaga/templates/partials/character-details.hbs",
    "systems/swSaga/templates/partials/stat-block.hbs",
  ];
  return loadTemplates(templatePaths);
}


/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', async function() {
  console.log('initializing Star Wars: Saga Edition System')
  
  CONFIG.swSaga = swSaga;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("swSaga", swSagaActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("swSaga", swSagaItemSheet, { makeDefault: true });

  preloadHandlebarsTemplates();
  
});
