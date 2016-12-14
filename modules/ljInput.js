exports.bot = new java.awt.Robot();
exports.keyEvent = java.awt.event.KeyEvent;

exports.on = function (input) {
    exports.bot.keyPress(exports.keyEvent["VK_" + input]);
};

exports.off = function (input) {
    exports.bot.keyRelease(exports.keyEvent["VK_" + input]);
};

exports.wait = function (input) {
    return true;
};

exports.keyDownFrames = function (input, fps) {
    var frames = [];

    frames.push({do: "on", key: input});

    for (var i = 1; i < fps; i++)
    {
        frames.push({do: "wait", key: 58});
    }

    frames.push({do: "off", key: input});

    return frames;
};

exports.sleepFrames = function (fps) {
    var frames = [];

    for (var i = 0; i < fps; i++)
    {
        frames.push({do: "wait", key: 58});
    }

    return frames;
};

exports.inputTextFrames = function (inputString) {
    inputString = inputString.toUpperCase();

    var frames = [];

    for (var i = 0; i < inputString.length; i++)
    {
        var input = inputString[i];

        if (input == " ")
        {
            input = "SPACE";
        }

        var newFrames = exports.keyDownFrames(input, 1);
        frames = frames.concat(newFrames);

        frames.push({do: "wait", key: 58});
    }

    return frames
};