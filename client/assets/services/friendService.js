app.service('shareDataService', function() {
    var friend = {};

    var putFriend = function(newObj) {
        friend = newObj;
    }

    var getFriend = function(){
        return friend;
    }

    return {
        putFriend: putFriend,
        getFriend: getFriend
    };
});
