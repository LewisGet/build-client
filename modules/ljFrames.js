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

var functionsName = Object.keys(frames);

for (var i = 0; i < functionsName.length; i++)
{
    var functionName = functionsName[i];

    // 註冊所有 function
    exports[functionName] = frames[functionName];
}

