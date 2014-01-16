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
	"url": "//cdn.echoenabled.com/apps/echo/conversations/app.js",
	"app": "Echo.Apps.Conversations"
}, {
	"url": "{config:cdnBaseURL.sdk}/streamserver.pack.js",
	"app": "Echo.StreamServer.Controls.Stream"
}];

stream.templates.main =
	'<div class="{class:container}">' +
		'<div class="{class:content}"></div>' +
	'</div>';

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

Echo.App.create(stream);

})(Echo.jQuery);
