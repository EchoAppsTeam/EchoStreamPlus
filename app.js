(function($) {
"use strict";

if (Echo.App.isDefined("Echo.Apps.StreamPlus")) return;

var stream = Echo.App.manifest("Echo.Apps.StreamPlus");

stream.config = {
	"targetURL": undefined,
	"dependencies": {
		"Janrain": {"appId": undefined},
		"StreamServer": {"appkey": undefined}
	},
	"advanced": {}
};

stream.dependencies = [{
	"url": "//cdn.echoenabled.com/apps/echo/conversations/v1.3/app.js",
	"app": "Echo.Apps.Conversations"
}, {
	"url": "{config:cdnBaseURL.sdk}/streamserver.pack.js",
	"app": "Echo.StreamServer.Controls.Stream"
}];

stream.templates.main =
	'<div class="{class:container}">' +
		'<div class="{class:content}"></div>' +
	'</div>';

stream.init = function() {
	this._removeUserInvalidationFrom(this);
	this.render();
	this.ready();
};

stream.renderers.content = function(element) {
	this.initComponent({
		"id": "Conversations",
		"component": "Echo.Apps.Conversations",
		"config": $.extend(true, {}, this.config.get("advanced"), {
			"target": element,
			"targetURL": this.config.get("targetURL"),
			"dependencies": this.config.get("dependencies")
		})
	});
	return element;
};

// removing "Echo.UserSession.onInvalidate" subscription from an app
// to avoid double-handling of the same evernt (by Canvas and by the widget itself)
stream.methods._removeUserInvalidationFrom = function() {
	var topic = "Echo.UserSession.onInvalidate";
	$.map(Array.prototype.slice.call(arguments), function(inst) {
		$.each(inst.subscriptionIDs, function(id) {
			var obj = $.grep(Echo.Events._subscriptions[topic].global.handlers, function(o) {
				return o.id === id;
			})[0];
			if (obj && obj.id) {
				Echo.Events.unsubscribe({"handlerId": obj.id});
				return false;
			}
		});
	});
};

Echo.App.create(stream);

})(Echo.jQuery);
