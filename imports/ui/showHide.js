import './showHide.html';

Template.showHide.onCreated(function(){
  this.isHidden = new ReactiveVar(true);
});

Template.showHide.helpers({
  isHidden() {
    return Template.instance().isHidden.get();
  },
});

Template.showHide.events({
  'click .cacher' (event, template) {
    template.isHidden.set(true);
  },

  'click .montrer' (event, template) {
    template.isHidden.set(false);
  },
  
});
