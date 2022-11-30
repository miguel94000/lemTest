import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { Exports } from "../both/collections";

import "./main.html";

/**
 * Choisie au hasard l'URL
 */
 function randomUrlWheel() {
  const tabUrl = [
    "https://www.lempire.com/",
    "https://www.lemlist.com/",
    "https://www.lemverse.com/",
    "https://www.lemstash.com/",
  ];
  return tabUrl[Math.floor(Math.random() * (tabUrl.length - 1))];
}

/**
 * Compte à rebours export
 */
 async function countdown(myProgressBarSelector) {
  return new Promise((resolve, reject) => {
    let width = 0;
    const identity = setInterval(() => {
      width += 5; // Augmente de 5% toute les secondes
      myProgressBarSelector.css("width", width + "%");
      if (width === 100) {
        clearInterval(identity);
        resolve(true);
      }
    }, 1000); // Chaque seconde
  });
}

Template.tp_export.onCreated(function () {
  this.idCount = ReactiveVar(0);
  this.exportsIsExist = ReactiveVar(false);
});

Template.tp_export.helpers({
  exports() {
    let exports = Exports.find().fetch()
    Template.instance().exportsIsExist.set(exports.length > 0 ? true : false);
    return exports
  },
  idCount() {
    return Template.instance().idCount.get();
  },
  exportsIsExist() {
    return Template.instance().exportsIsExist.get();
  }
});

Template.tp_export.events({
  async "click .js-add-export"(event, instance) {
    Template.instance().idCount.set(Template.instance().idCount.get() + 1);

    let idCountStr = Template.instance().idCount.get().toString()
    let myProgressBarId= 'myProgressBarId-' + idCountStr
    let urlId= 'urlId-' + idCountStr
    let exportDocument = {
      url: randomUrlWheel(),
      myProgressBarId: myProgressBarId,
      urlId: urlId
    }

    await Exports.insert(exportDocument)

    let myProgressBarSelector = instance.$("#"+myProgressBarId)
    let urlIdSelector = instance.$("#"+urlId)

    countdown(myProgressBarSelector).then((isFinish) => {
      if (isFinish) {
        // Arrivé 100%: afficher balise <a> et cacher <div id="myProgressBar">
        myProgressBarSelector.css("visibility", "hidden")
        urlIdSelector.css("visibility", "visible")
      }
    });
  },
});