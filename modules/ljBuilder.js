builder = function () {
    this.entity = 0;
    this.x = 0; this.y = 5.8; this.z = 0;
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

    this.isLocationControllerDone = function () {
        return ! (this.toDoLocationList.length > 0 || this.toDoLookAtList.length > 0);
    };

    this.isBotControllerDone = function () {
        return ! (this.toDoMouse.length > 0 || this.toDoInput.length > 0);
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

    this.updateToDoMouse = function () {
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
    };

    this.updateToDoInput = function () {
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

    this.getLastLocation = function () {
        var lastLocation = this.entity.location;

        if (this.toDoLocationList.length > 0)
        {
            lastLocation = this.toDoLocationList[this.toDoLocationList.length - 1];
        }

        return lastLocation;
    };

    this.getLastLookAt = function () {
        var lastLookAt = this.entity.location.getDirection();

        if (this.toDoLookAtList.length > 0)
        {
            lastLookAt = this.toDoLookAtList[this.toDoLookAtList.length - 1];
        }

        return lastLookAt;
    };

    this.moveToAndLookAt = function (toLocation, lookAt) {
        var action = this.moveTo(toLocation);

        this.lookAt(lookAt);

        return action;
    };

    this.moveTo = function (toLocation) {
        var xyz = require('ljXYZ');
        var startLocation = this.getLastLocation();

        var locationFrames = xyz.diffFrameByMixSpeed(startLocation, toLocation, 5);

        this.pushLocation(locationFrames);

        return locationFrames.length;
    };

    this.lookAt = function (lookAt) {
        var xyz = require('ljXYZ');
        var startLookAt = this.getLastLookAt();

        var lookAtFrames = xyz.diffFrame(startLookAt, lookAt, (Math.random() + 0.2).toFixed(2));

        this.pushLookAt(lookAtFrames);

        return lookAtFrames.length;
    };

    this.lookDown = function () {
        var x = ((Math.random() - 0.5) * 0.01);
        var y = -1.0;
        var z = ((Math.random() - 0.5) * 0.01);

        return this.lookAt({x: x, y: y, z: z});
    };

    this.openItemSelect = function () {
        var frames = require('ljFrames');

        var action = frames.openItemSelect();

        this.pushInput(action);

        return action.length;
    };

    this.takeFirstOneItem = function (itemName) {
        var frames = require('ljFrames');
        var totalAction = 0;

        var input = frames.search(itemName);
        var mouseWait = frames.sleepMouse(input.length);

        this.pushInput(input);
        this.pushMouse(mouseWait);
        totalAction += input.length;

        var mouse = frames.moveToFirstOne();
        var inputWait = frames.sleepInput(mouse.length);

        this.pushInput(inputWait);
        this.pushMouse(mouse);
        totalAction += inputWait.length;

        var input = frames.push("1");

        this.pushInput(input);
        this.pushMouse(frames.sleepMouse(input.length));
        totalAction += input.length;

        var inputWait = frames.sleepInput(1);

        this.pushInput(inputWait);
        this.pushMouse(frames.sleepMouse(inputWait.length));
        totalAction += inputWait.length;

        var input = frames.closeItemSelect();

        this.pushInput(input);
        this.pushMouse(frames.sleepMouse(input.length));
        totalAction += input.length;

        return totalAction;
    };

    this.rightClick = function () {
        var frames = require('ljFrames');
        var action = frames.rightClick();

        this.pushMouse(action);
        this.pushInput(frames.sleepInput(action.length));

        return action.length;
    };

    this.leftClick = function () {
        var frames = require('ljFrames');
        var action = frames.leftClick();

        this.pushMouse(action);
        this.pushInput(frames.sleepInput(action.length));

        return action.length;
    };

    this.isTaking = function (typeId, data) {
        var item = this.entity.itemInHand.data;

        return (item.itemTypeId == typeId && item.data == data);
    };

    this.botWait = function (fps) {
        var frames = require('ljFrames');

        var waitInput = frames.sleepInput(fps);
        var waitMouse = frames.sleepMouse(fps);

        this.pushInput(waitInput);
        this.pushMouse(waitMouse);

        return fps;
    };

    this.LLWait = function (fps) {
        var frames = require('ljFrames');

        var waitLocation = frames.sleepLocation(this.getLastLocation(), fps);
        var waitLookAt = frames.sleepLookAt(this.getLastLookAt(), fps);

        this.pushLocation(waitLocation);
        this.pushLookAt(waitLookAt);

        return fps;
    };

    this.buildBlock = function (x, y, typeId, data) {
        var frames = require('ljFrames');
        var totalAction = 0;

        if (! this.isTaking(typeId, data))
        {
            var dataset = require('ljDataset');
            var item = dataset.getItemByIdData(typeId, data);
            var waitTakeTime = this.takeFirstOneItem(item.name);
            totalAction += this.LLWait(waitTakeTime);
        }

        var waitMoveTo = this.moveTo({x: (x + 0.5), y: this.y, z: (y + 0.5)});
        totalAction += this.botWait(waitMoveTo);

        var waitLookDownTime = this.lookDown();
        totalAction += this.botWait(waitLookDownTime);

        var waitRightClick = this.rightClick();
        totalAction += this.LLWait(waitRightClick);

        return totalAction;
    };
};

exports.builder = new builder();

exports.builderUpdater = exports.builder.initUpdater();
exports.builder.initBlockEvent();
