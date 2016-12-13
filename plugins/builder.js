builder = function () {
    this.entity = 0;
    this.x = 0; this.y = 0; this.z = 0;
    this.direction = {x: 0, y: 0, z: 0};
    this.fps = 30;
    this.toDoLocationList = [];
    this.toDoLookAtList = [];
    this.bot = new java.awt.Robot();
    this.keyEvent = java.awt.event.KeyEvent;
    this.inputEvent = java.awt.event.InputEvent;

    this.flushBuilder = function () {
        if (this.entity == 0)
        {
            throw ("entity need to init.");
        }

        this.updateToDo();

        var location = new org.bukkit.Location(this.entity.world, (this.x).toFixed(3), (this.y).toFixed(3), (this.z).toFixed(3));
        var direction = new org.bukkit.util.Vector((this.direction.x).toFixed(3), (this.direction.y).toFixed(3), (this.direction.z).toFixed(3));

        location.setDirection(direction);

        this.entity.teleport(location);
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

    this.rightClick = function () {
        var rightClick = this.inputEvent.BUTTON3_DOWN_MASK;

        bot.mousePress(rightClick);
        bot.mouseRelease(rightClick);
    };

    this.leftClick = function () {
        var leftClick = this.inputEvent.BUTTON1_DOWN_MASK;

        bot.mousePress(leftClick);
        bot.mouseRelease(leftClick);
    };

    this.updateToDo = function () {
        var newToDoLocationList = [];
        var newToDoLookAtList = [];

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

        for (var i = 0; i < this.toDoLookAtList.length; i++)
        {
            var toDo = this.toDoLookAtList[i];

            if (i == 0)
            {
                this.x = toDo.x;
                this.y = toDo.y;
                this.z = toDo.z;
            }
            else
            {
                newToDoLookAtList.push(toDo);
            }
        }
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
};

exports.builder = new builder();

exports.builderUpdater = exports.builder.initUpdater();
