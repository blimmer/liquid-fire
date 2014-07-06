import { animate, stop } from "./animate";

export default function predefinedTransitions(){
  this.setDefault({duration: 250});

  this.defineTransition('toRight', function(oldView, insertNewView) {
    stop(oldView);
    return insertNewView().then(function(newView){
      return Promise.all([
        animate(oldView, {translateX: "-100%"}),
        animate(newView, {translateX: ["0%", "100%"]})
      ]);
    });
  });

  this.defineTransition('toLeft', function(oldView, insertNewView) {
    stop(oldView);
    return insertNewView().then(function(newView){
      return Promise.all([
        animate(oldView, {translateX: "100%"}),
        animate(newView, {translateX: ["0%", "-100%"]})
      ]);
    });
  });

  this.defineTransition('crossFade', function(oldView, insertNewView) {
    stop(oldView);
    return animate(oldView, {opacity: 0})
      .then(insertNewView)
      .then(function(newView){
        return animate(newView, {opacity: [1, 0]});
      });
  });
}
