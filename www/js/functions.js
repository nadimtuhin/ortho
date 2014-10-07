function getSrv(name) {
  return angular.element(document.body).injector().get(name);
}