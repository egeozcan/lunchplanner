function scrollMessagesToBottom(ignoreBottomCheck) {
    var messageBox = $(".chat-messages");
    if (messageBox.length === 0) {
        return;
    }
    var notAtBottom = messageBox[0].scrollHeight - messageBox.scrollTop() !== messageBox.outerHeight();
    if (notAtBottom && !ignoreBottomCheck) {
        return;
    }
    messageBox.animate({scrollTop: messageBox[0].scrollHeight + 5}, 200);
}

Template.visit_details.helpers({
    currentVisit: function () {
        return Collections.Visits.findOne(Session.get("visitId"));
    },
    messages: function () {
        scrollMessagesToBottom();
        var chatMessages = Collections.Visits.findOne(Session.get("visitId")).chatMessages
        if (!document.hasFocus() && !!chatMessages) {
            var lastMessage = chatMessages[chatMessages.length - 1];
            var user = Meteor.users.findOne(lastMessage.user).username;
            var n = notify(user, { body: lastMessage.message });
            n.onclick = function() { $(".chat-message").focus(); };
            setTimeout(function () { n.close(); }, 4000);
        };
        return chatMessages;
    }
});

Template.visit_details.rendered = function () {
    adjustChatBox();
    scrollMessagesToBottom(true);
};

Template.visit_details.events({
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
            scrollMessagesToBottom(true);
        });
    }
})