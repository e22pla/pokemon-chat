ig.module('game.entities.non-weltmeister.bubble')

.requires('impact.entity', 'impact.font')

.defines(function() {

	EntityBubble = ig.Entity.extend({

		size: {
			x: 16,
			y: 16
		},

		// Load image resources.
		topLeft: new ig.Image('media/chat-bubble-tleft.png'),
		topRight: new ig.Image('media/chat-bubble-tright.png'),
		bottomLeft: new ig.Image('media/chat-bubble-bleft.png'),
		bottomRight: new ig.Image('media/chat-bubble-bright.png'),
		pointer: new ig.Image('media/chat-bubble-point.png'),
		fill: new ig.Image('media/chat-bubble-fill.png'),
		font: new ig.Font('media/font.white.with.shadow.png'),

		// Raw, unprocessed message.
		msg: '',

		// Name of the entity to follow.
		from: '',

		// Processed version of msg.
		toPrint: '',

		// Maximum width in pixels for text.
		msgMaxWidth: 100,

		// Used to kill() old bubbles.
		timer: null,

		// Time in seconds before entity is killed.
		lifespan: 3,

		// This value is calculated later.
		heightOfMessage: 0,

		// This value is calculated later.
		longestLine: 0,

		// How much space does Impact put between lines?
		spaceBetweenLines: 2,

		// Breaks up msg into an array of small messages which don't exceed msgMaxWidth.
		process: function() {

			// Break into individual words.
			var words = this.msg.split(' ');

			// Create an array where we'll store our <=msgMaxWidth lines.
			var lines = new Array();

			// Initialize our first line.
			var currentLine = '';

			// Try adding words to the current line.
			for (var i = 0; i < words.length; i++) {

				// Only add a space if it's not the first word.
				var space = (i == 0) ? '' : ' ';

				// Add a word to the current line.
				var tryStr = currentLine + space + words[i];

				// Does the current line fit within the maxium width?
				if (this.font.widthForString(tryStr) <= this.msgMaxWidth) {

					// It fits, commit word to current line.
					currentLine = tryStr;
				} else {

					// Record potential longest line.
					this.recordLongestLine(currentLine);

					// Add current line to the rest.
					lines.push(currentLine);

					// Start a new line off with one word.
					currentLine = words[i];
				}
			}

			// Add the final line.
			if (currentLine != '') {

				// Record potential longest line.
				this.recordLongestLine(currentLine);

				// Add current line to the rest.
				lines.push(currentLine);

			}

			// Combine lines back together into a single string.
			for (var i = 0; i < lines.length; i++) {

				// Set new line character if not the first line.
				if (i != 0) this.toPrint += "\n";

				// Add current line.
				this.toPrint += lines[i];

				// Add to message height.
				this.heightOfMessage += this.font.height;
			}

			// Shave the few pixels Impact adds below text.
			this.heightOfMessage -= 3;

			// Removes extra pixel added by Impact - DO NOT CHANGE!
			this.longestLine -= 1;
		},

		// Compares line width to longest recorded width and keeps highest value.
		recordLongestLine: function(line) {

			// Get width of current line.
			var lineWidth = this.font.widthForString(line);

			// Check if this has been the longest line so far.
			if (lineWidth > this.longestLine) {
				// Record new longest line.
				this.longestLine = lineWidth;
			}
		},

		// Initialize
		init: function(x, y, settings) {
			this.parent(x, y, settings);

			// Create timer for death count-down.
			this.timer = new ig.Timer();

			// Start count-down to this entity's death.
			this.timer.set(this.lifespan);

			// Prepare the message before it can be drawn.
			this.process();
		},

		draw: function(reallyDraw) {

			// Only draw when the 'reallyDraw' param is true, 
			// so it ignores the "normal" draw call
			if (reallyDraw) {

				// Try to find reference entity.
				var target = ig.game.getEntityByName(this.from);

				// Check if we found entity.
				if (target != undefined) {

					// Use target entity's position.
					this.pos.x = target.pos.x;
					this.pos.y = target.pos.y;
				}

				// Position bubble not to hide target/source.
				var x = this.pos.x - ig.game.screen.x + this.size.x / 2;
				var y = this.pos.y - ig.game.screen.y - this.size.y - this.heightOfMessage + 2;

				// Add some space around the text.
				var padding = 2;

				// Assume all corner images share the same dimensions.
				var cornerWidth = this.topLeft.width;
				var cornerHeight = this.topLeft.height;

				// Fill in rectangles.
				this.fill.draw(
				x - this.longestLine / 2 - padding - cornerWidth, y - padding, 0, 0, this.longestLine + padding * 2 + cornerWidth * 2, this.heightOfMessage + padding * 2);
				this.fill.draw(
				x - this.longestLine / 2 - padding, y - padding - cornerHeight, 0, 0, this.longestLine + padding * 2, this.topLeft.height);
				this.fill.draw(
				x - this.longestLine / 2 - padding, y + this.heightOfMessage + padding, 0, 0, this.longestLine + padding * 2, this.topLeft.height);

				// Draw corners.
				this.topLeft.draw(
				x - this.longestLine / 2 - padding - cornerWidth, y - padding - cornerHeight);
				this.topRight.draw(
				x + this.longestLine / 2 + padding, y - padding - cornerHeight);
				this.bottomLeft.draw(
				x - this.longestLine / 2 - padding - cornerWidth, y + this.heightOfMessage + padding);
				this.bottomRight.draw(
				x + this.longestLine / 2 + padding, y + this.heightOfMessage + padding);
				this.pointer.draw(
				x - this.pointer.width / 2, y + this.heightOfMessage + padding + cornerHeight);

				// Draw message.
				this.font.draw(
				this.toPrint, x, y, ig.Font.ALIGN.CENTER);

				// Call parent.
				this.parent();
			}
		},

		update: function() {
			this.parent();

			// Kill this entity after it's lifespan.
			if (this.timer.delta() >= 0) this.kill();
		}

	});
});
