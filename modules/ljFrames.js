var frames = {};

var functionsName = Object.keys(frames);

for (var i = 0; i < functionsName.length; i++)
{
    var functionName = functionsName[i];

    // 註冊所有 function
    exports[functionName] = frames[functionName];
}

