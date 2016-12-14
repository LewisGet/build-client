builder = function () {
    this.entity = 0;
    this.x = 0; this.y = 5; this.z = 0;
    this.direction = {x: 6, y: 0, z: 0.0058};
    this.fps = 30;
    this.toDoLocationList = [];
    this.toDoLookAtList = [];
    this.toDoMouse = [];
    this.toDoInput = [];

    this.lastBlock = 0;
    this.initBlock = 0;
    this.lineStart = 0;

    this.flushBuilder = function () {
        if (this.entity == 0)
        {
            defaultEntity = org.bukkit.Bukkit.getPlayer("LewisJang");

            if (defaultEntity)
            {
                this.entity = defaultEntity;
            }
            else
            {
                throw ("entity need to init.");
            }
        }

        this.entity.setFlying(true);

        this.updateToDo();

        var location = new org.bukkit.Location(this.entity.world, (this.x).toFixed(3), (this.y).toFixed(3), (this.z).toFixed(3));

        // 這裡有個數學的 bug ，因為方向換算角度是用三角公式。
        // 所以如果 x y z 有值為 0 時，將無法計算角度。 (方向不存在 0,0,0)
        var direction = new org.bukkit.util.Vector((this.direction.x).toFixed(5), (this.direction.y).toFixed(5), (this.direction.z).toFixed(5));

        location.setDirection(direction);

        this.entity.teleport(location);
    };

    this.initBlockEvent = function () {
        builder = this;

        events.blockPlace(function(e) {
            builder.lastBlock = e.getBlock();

            if (builder.initBlock == 0)
            {
                builder.initBlock = e.getBlock();
            }
        });

        events.blockBreak(function(e) {
            // nothing yet.
        });
    };

    this.initUpdater = function () {
        builderUpdater = setInterval(function(){
            try
            {
                builder.flushBuilder();
            }
            catch (e)
            {
                console.log(e);
            }
        }, 1000 / this.fps);

        return builderUpdater;
    };

    this.updateToDo = function () {
        this.updateToDoLocation();
        this.updateToDoLookAt();
        this.updateToDoInput();
        this.updateToDoMouse();
    };

    this.updateToDoLocation = function () {
        var newToDoLocationList = [];

        for (var i = 0; i < this.toDoLocationList.length; i++)
        {
            var toDo = this.toDoLocationList[i];

            if (i == 0)
            {
                this.x = toDo.x;
                this.y = toDo.y;
                this.z = toDo.z;
            }
            else
            {
                newToDoLocationList.push(toDo);
            }
        }

        this.toDoLocationList = newToDoLocationList;
    };

    this.updateToDoLookAt = function () {
        var newToDoLookAtList = [];

        for (var i = 0; i < this.toDoLookAtList.length; i++)
        {
            var toDo = this.toDoLookAtList[i];

            if (i == 0)
            {
                this.direction.x = toDo.x;
                this.direction.y = toDo.y;
                this.direction.z = toDo.z;
            }
            else
            {
                newToDoLookAtList.push(toDo);
            }
        }

        this.toDoLookAtList = newToDoLookAtList;
    };

    this.isLocationControllerDone = function () {
        return ! (this.toDoLocationList.length > 0 || this.toDoLookAtList.length > 0);
    };

    this.updateToDoMouse = function () {
        if (! this.isLocationControllerDone())
        {
            return false;
        }

        var mouse = require('ljMouse');

        var newToDoMouse = [];

        for (var i = 0; i < this.toDoMouse.length; i++)
        {
            var toDo = this.toDoMouse[i];

            if (i == 0)
            {
                mouse[toDo.do](toDo.key);
            }
            else
            {
                newToDoMouse.push(toDo);
            }
        }

        this.toDoMouse = newToDoMouse;

        return true;
    };

    this.updateToDoInput = function () {
        if (! this.isLocationControllerDone())
        {
            return false;
        }

        var input = require('ljInput');

        var newToDoInput = [];

        for (var i = 0; i < this.toDoInput.length; i++)
        {
            var toDo = this.toDoInput[i];

            if (i == 0)
            {
                input[toDo.do](toDo.key);
            }
            else
            {
                newToDoInput.push(toDo);
            }
        }

        this.toDoInput = newToDoInput;

        return true;
    };

    this.pushLocation = function (frames) {
        for (var i = 0; i < frames.length; i++)
        {
            this.toDoLocationList.push(frames[i]);
        }
    };

    this.pushLookAt = function (frames) {
        for (var i = 0; i < frames.length; i++)
        {
            this.toDoLookAtList.push(frames[i]);
        }
    };

    this.pushMouse = function (frames) {
        for (var i = 0; i < frames.length; i++)
        {
            this.toDoMouse.push(frames[i]);
        }
    };

    this.pushInput = function (frames) {
        for (var i = 0; i < frames.length; i++)
        {
            this.toDoInput.push(frames[i]);
        }
    };

    this.moveToAndLookAt = function (toLocation, lookAt) {
        this.moveTo(toLocation);
        this.lookAt(lookAt);
    };

    this.moveTo = function (toLocation) {
        var xyz = require('ljXYZ');
        var startLocation = this.entity.location;

        // 如果還沒執行完待執行清單，要以最後待執行位置來算
        if (this.toDoLocationList.length > 0)
        {
            startLocation = this.toDoLocationList[this.toDoLocationList.length - 1];
        }

        var locationFrames = xyz.diffFrameByMixSpeed(startLocation, toLocation, 5);

        this.pushLocation(locationFrames);
    };

    this.lookAt = function (lookAt) {
        var xyz = require('ljXYZ');
        var startLookAt = this.entity.location.getDirection();

        if (this.toDoLookAtList.length > 0)
        {
            startLookAt = this.toDoLookAtList[this.toDoLookAtList.length - 1];
        }

        var lookAtFrames = xyz.diffFrame(startLookAt, lookAt, (Math.random() + 0.2).toFixed(2));

        this.pushLookAt(lookAtFrames);
    };

    this.lookDown = function () {
        var x = ((Math.random() - 0.5) * 0.01);
        var y = -1.0;
        var z = ((Math.random() - 0.5) * 0.01);

        this.lookAt({x: x, y: y, z: z});
    };

    this.openItemSelect = function () {
        var frames = require('ljFrames');

        this.pushInput(frames.openItemSelect());
    };

    this.searchOrangeWool = function () {
        var frames = require('ljFrames');

        this.pushInput(frames.search("orange wool"));
    };

    this.takeFirstOneItem = function () {
        var frames = require('ljFrames');

        var input = frames.search("orange wool");
        var mouseWait = frames.sleepMouse(input.length);

        this.pushInput(input);
        this.pushMouse(mouseWait);

        var mouse = frames.moveToFirstOne();
        var inputWait = frames.sleepInput(mouse.length);

        this.pushInput(inputWait);
        this.pushMouse(mouse);

        var input = frames.push("1");

        this.pushInput(input);

        var inputWait = frames.sleepInput(1);

        this.pushInput(inputWait);

        var input = frames.closeItemSelect();

        this.pushInput(input);
    };
};

exports.builder = new builder();

exports.builderUpdater = exports.builder.initUpdater();
exports.builder.initBlockEvent();