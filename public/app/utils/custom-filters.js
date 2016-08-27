angular.module('settingsApp').filter('notInArray', function() {
    return function(usersList, tmoMembersArr) {
        return usersList.filter(function(user){
            if(tmoMembersArr.indexOf(user.tag) == -1) {
                return true;
            }
            return false; 
        });
    }
});