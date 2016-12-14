exports.bot = new java.awt.Robot();
exports.inputEvent = java.awt.event.InputEvent;
exports.leftClick = exports.inputEvent.BUTTON1_DOWN_MASK;
exports.rightClick = exports.inputEvent.BUTTON3_DOWN_MASK;

exports.on = function (input) {
    if (input == "left")
    {
        exports.bot.mousePress(exports.leftClick);
    }
    else
    {
        exports.bot.mousePress(exports.rightClick);
    }
};

exports.off = function (input) {
    if (input == "left")
    {
        exports.bot.mouseRelease(exports.leftClick);
    }
    else
    {
        exports.bot.mouseRelease(exports.rightClick);
    }
};

exports.wait = function (input) {
    return true;
};

exports.move = function (input) {
    exports.bot.mouseMove(input.x, input.y);
};

exports.sleepFrames = function (fps) {
    var frames = [];

    for (var i = 0; i < fps; i++)
    {
        frames.push({do: "wait", key: 58});
    }

    return frames;
};

exports.nowMousePosition = function () {
    return java.awt.MouseInfo.getPointerInfo().getLocation();
};

exports.clickFrames = function (input, fps) {
    var frames = [];

    frames.push({do: "on", key: input});

    for (var i = 1; i < fps; i++)
    {
        frames.push({do: "wait", key: 58});
    }

    frames.push({do: "off", key: input});

    return frames;
};

exports.moveFrames = function (a, b, fps) {
    var xyz = require('ljXYZ');
    var a = {x: a.x, y: a.y, z: 0};
    var b = {x: b.x, y: b.y, z: 0};

    var xyzframes = xyz.diffFPSFrame(a, b, fps);
    var frames = [];

    for (var i = 0; i < xyzframes.length; i++)
    {
        var xy = xyzframes[i];
        frames.push({do: "move", key: {x: xy.x, y: xy.y}});
    }

    return frames;
};
