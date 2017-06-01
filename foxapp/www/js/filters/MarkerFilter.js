/**
 * Created by user on 01/06/17.
 */
angular.module('foxapp')
.filter('filterByCriteria', [function(){

  return function(items, criteria, category){
  if(criteria === undefined)
    criteria = '';

  switch(criteria){

    default:
      return filterByName(items, criteria);
  }
};

function filterByName(items, criteria){

    if(criteria === '') {
      return items;
    }

    var filtered = [];

    for (var mrk in items) {
      if (items[mrk].nom.toLowerCase().indexOf(criteria.toLowerCase()) !== -1)
        filtered.push(items[mrk]);
    }

    return filtered;
  }

}]);