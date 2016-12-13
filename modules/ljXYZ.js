var xyz = {};

/**
 * 兩個三圍座標差值
 *
 * @param object a {x: float, y: float, z: float}
 * @param object b {x: float, y: float, z: float}
 *
 * @return object {x: float, y: float, z: float}
 */
xyz.diff = function (a, b) {
    var xyz = {};

    xyz.x = a.x - b.x;
    xyz.y = a.y - b.y;
    xyz.z = a.z - b.z;

    return xyz;
};

/**
 * 兩個三圍座標合併
 *
 * @param object a {x: float, y: float, z: float}
 * @param object b {x: float, y: float, z: float}
 *
 * @return object {x: float, y: float, z: float}
 */
xyz.merge = function (a, b) {
    var xyz = {};

    xyz.x = a.x + b.x;
    xyz.y = a.y + b.y;
    xyz.z = a.z + b.z;

    return xyz;
};

/**
 * 分割三圍座標
 *
 * @param object xyz {x: float, y: float, z: float}
 * @param int part
 *
 * @return object {x: float, y: float, z: float}
 */
xyz.split = function (a, part) {
    var xyz = {};

    xyz.x = a.x / part;
    xyz.y = a.y / part;
    xyz.z = a.z / part;

    return xyz;
};

/**
 * 三圍座標放大
 *
 * @param object xyz {x: float, y: float, z: float}
 * @param float part
 *
 * @return object {x: float, y: float, z: float}
 */
xyz.multiply = function (a, multiply) {
    var xyz = {};

    xyz.x = a.x * multiply;
    xyz.y = a.y * multiply;
    xyz.z = a.z * multiply;

    return xyz;
};

/**
 * 三圍座標距離
 *
 * @param object a {x: float, y: float, z: float}
 * @param object b {x: float, y: float, z: float}
 *
 * @return object {x: float, y: float, z: float}
 */
xyz.distance = function (a, b) {
    var xyzDiff = xyz.diff(a, b);

    var x = Math.pow(xyzDiff.x, 2);
    var y = Math.pow(xyzDiff.y, 2);
    var z = Math.pow(xyzDiff.z, 2);

    return Math.sqrt(x + y + z);
};

xyz.diffFrame = function (a, b, sec) {
    var frames = [];
    var fps = 30;
    var totalFrames = sec * fps;

    // 總差距
    var xyzDiff = xyz.diff(b, a);

    // 每個影格得差距
    var xyzFrameDiff = xyz.split(xyzDiff, totalFrames);

    for (var i = 0; i < totalFrames; i++)
    {
        // 這次影格跟初始的差距
        var thisFrameDiff = xyz.multiply(xyzFrameDiff, i);
        var thisFrame = xyz.merge(a, thisFrameDiff);

        frames.push(thisFrame);
    }

    // 結數到 b
    frames.push(b);

    return frames;
};

xyz.diffFrameByMixSpeed = function (a, b, maxInOneSec) {
    var distance = xyz.distance(a, b);

    var splitPart = distance / maxInOneSec;

    return xyz.diffFrame(a, b, splitPart);
};

var functionsName = Object.keys(xyz);

for (var i = 0; i < functionsName.length; i++)
{
    var functionName = functionsName[i];

    // 註冊所有 function
    exports[functionName] = xyz[functionName];
}
