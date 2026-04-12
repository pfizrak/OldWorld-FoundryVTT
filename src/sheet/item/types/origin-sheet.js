import BaseOldWorldItemSheet from "../base-item"

export default class OriginSheet extends BaseOldWorldItemSheet {

    static type = "origin"

    static DEFAULT_OPTIONS = {
      classes: [this.type],
    }  

    static PARTS = {
        header : {scrollable: [""], template : 'systems/whtow/templates/item/item-header.hbs', classes: ["sheet-header"] },
        tabs: { scrollable: [""], template: 'templates/generic/tab-navigation.hbs' },
        description: { scrollable: [""], template: 'systems/whtow/templates/item/item-description.hbs' },
        details: { scrollable: [""], template: `systems/whtow/templates/item/types/${this.type}.hbs` },
        effects: { scrollable: [""], template: 'systems/whtow/templates/item/item-effects.hbs' },
      }

      async _prepareContext(options) {
        let context = await super._prepareContext(options);
        context.skillOptions = {
          "*": "Any",
          "" : "All other Skills",
          melee : game.oldworld.config.skills.melee,
          defence : game.oldworld.config.skills.defence,
          shooting : game.oldworld.config.skills.shooting,
          throwing : game.oldworld.config.skills.throwing,
          brawn : game.oldworld.config.skills.brawn,
          toil : game.oldworld.config.skills.toil,
          survival : game.oldworld.config.skills.survival,
          endurance : game.oldworld.config.skills.endurance,
          awareness : game.oldworld.config.skills.awareness,
          dexterity : game.oldworld.config.skills.dexterity,
          athletics : game.oldworld.config.skills.athletics,
          stealth : game.oldworld.config.skills.stealth,
          willpower : game.oldworld.config.skills.willpower,
          recall : game.oldworld.config.skills.recall,
          leadership : game.oldworld.config.skills.leadership,
          charm : game.oldworld.config.skills.charm
        };
        return context;
      }


      async _onDropRollTable(data, ev)
      {
        let table = await RollTable.implementation.fromDropData(data);

        if (ev.target.closest(".careers"))
        {
          this.document.update(this.document.system.careers.set(table));

        }
        else if (ev.target.closest(".talents"))
        {
          this.document.update(this.document.system.talents.table.set(table));
        }
      }

      async _onDropItem(data, ev)
      {
        let item = await Item.implementation.fromDropData(data);

        if (item.type == "talent")
        {
          if (ev.target.closest(".replacement"))
          {
            this.document.update(this.document.system.talents.replacements.add(item));
          }
          else if (ev.target.closest(".optional"))
          {
            this.document.update(this.document.system.talents.optional.add(item));
          }
          else 
          {
            this.document.update(this.document.system.talents.gain.add(item));
          }
        }
        else if (item.type == "lore")
        {
          this.document.update(this.document.system.lores.add({name : item.name}));
        }
      }
  }
  