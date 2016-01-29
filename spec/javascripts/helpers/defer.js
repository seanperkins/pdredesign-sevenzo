window.createSuccessDefer = function($q, resolve) {
  var def = $q.defer();
  def.resolve(resolve);
  return { $promise: def.promise };
};

window.createRejectDefer = function($q, resolve) {
  var def = $q.defer();
  def.reject(resolve);
  return { $promise: def.promise };
};

