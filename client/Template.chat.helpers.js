Template.chat.helpers({
    messages: function () {
        Template.chat.helperFunctions.scrollMessagesToBottom();
        var chatMessages = Collections.Visits.findOne(Session.get("visitId")).chatMessages;
        if (!document.hasFocus() && !!chatMessages) {
            var lastMessage = chatMessages[chatMessages.length - 1];
            var user = Meteor.users.findOne(lastMessage.user).username;
            var n = notify(user, { body: lastMessage.message });
            n.onclick = function() { $(".chat-message").focus(); };
            setTimeout(function () { n.close(); }, 4000);
        }
        return chatMessages;
    }
});
Template.chat.helperFunctions = {};
Template.chat.helperFunctions.adjustChatBox = function () {
    var cb = $(".chat-box");
    if (!cb.length) {
        return;
    }
    var possibleHeight = $(window).height() - cb.offset().top - $(".footer").height() - 70;
    var height = Math.max(possibleHeight, 200);
    cb.children(".chat-messages").height(height - 60);
    cb.height(height);
};

Template.chat.helperFunctions.scrollMessagesToBottom = function (ignoreBottomCheck) {
    var messageBox = $(".chat-messages");
    if (messageBox.length === 0) {
        return;
    }
    var notAtBottom = messageBox[0].scrollHeight - messageBox.scrollTop() !== messageBox.outerHeight();
    if (notAtBottom && !ignoreBottomCheck) {
        return;
    }
    messageBox.animate({scrollTop: messageBox[0].scrollHeight + 5}, 200);
};

$(window).on("resize", Template.chat.helperFunctions.adjustChatBox);

Template.chat.rendered = function () {
    Template.chat.helperFunctions.adjustChatBox();
    Template.chat.helperFunctions.scrollMessagesToBottom(true);
    console.log("rendered chat");
};

Template.chat.events({
    "keyup input.chat-message": function (e) {
        if (e.keyCode !== 13) {
            return true;
        }
        var input = $(e.currentTarget);
        var val = input.val();
        if (val.length < 2) {
            return;
        }
        input.val("");
        Meteor.call("sendChatMessageToVisit", Session.get("visitId"), val, function (err, res) {
            if (err) {
                alert(err.reason);
                return;
            }
            Template.chat.helperFunctions.scrollMessagesToBottom(true);
        });
    }
});