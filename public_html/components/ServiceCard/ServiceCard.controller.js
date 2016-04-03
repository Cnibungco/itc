function ServiceCardController() {

}

myApp.component('card', {
  templateUrl: 'components/ServiceCard/ServiceCard.view.html',
  controller: ServiceCardController,
  bindings: {
    text: '='
  }
});