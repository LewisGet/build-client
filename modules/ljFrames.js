var frames = {};

/**
 * 兩個三圍影格
 *
 * @param array a [{x: float, y: float, z: float}... ]
 * @param array b [{x: float, y: float, z: float}... ]
 *
 * @return array [{x: float, y: float, z: float}... ]
 */
frames.merge = function (a, b) {
    var xyz = require('ljXYZ');
    var frameTotalIndex = Math.max(a.length, b.length);
    var frames = [];

    for (var i = 0; i < frameTotalIndex; i++)
    {
        if (a[i] && b[i])
        {
            var c = xyz.merge(a[i], b[i]);
            frames.push(c);
        }
        else if (a[i])
        {
            frames.push(a[i]);
        }
        else
        {
            frames.push(b[i]);
        }
    }

    return frames;
};

frames.openItemSelect = function () {
    var input = require('ljInput');

    var value = input.keyDownFrames("E", 2);

    return value;
};

frames.closeItemSelect = function () {
    var input = require('ljInput');

    var value = input.keyDownFrames("ESCAPE", 2);

    return value;
};

frames.search = function (text) {
    var input = require('ljInput');

    var value = frames.openItemSelect();

    value = value.concat(input.sleepFrames(3));
    value = value.concat(input.inputTextFrames(text));

    return value;
};

frames.push = function (key) {
    var input = require('ljInput');

    return input.keyDownFrames(key, 2);
};

frames.moveToFirstOne = function () {
    var mouse = require('ljMouse');

    var start = mouse.nowMousePosition();

    return mouse.moveFrames(start, {x: 633, y: 365}, 5);
};

frames.leftClick = function () {
    var mouse = require('ljMouse');

    return mouse.clickFrames("left", 2);
};

frames.rightClick = function () {
    var mouse = require('ljMouse');

    return mouse.clickFrames("right", 2);
};

frames.sleepMouse = function (fps) {
    var mouse = require('ljMouse');

    return mouse.sleepFrames(fps);
};

frames.sleepInput = function (fps) {
    var input = require('ljInput');

    return input.sleepFrames(fps);
};

frames.sleepXYZ = function (xyz, fps) {
    var value = [];

    for (var i = 0; i < fps; i++)
    {
        value.push(xyz);
    }

    return value;
};

frames.sleepLocation = function (xyz, fps) {
    return frames.sleepXYZ(xyz, fps);
};

frames.sleepLookAt = function (xyz, fps) {
    return frames.sleepXYZ(xyz, fps);
};

var functionsName = Object.keys(frames);

for (var i = 0; i < functionsName.length; i++)
{
    var functionName = functionsName[i];

    // 註冊所有 function
    exports[functionName] = frames[functionName];
}

