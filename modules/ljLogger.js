logger = function () {
    this.dir = java.io.File.separator
    this.path = (["", "Users", "Public", "Documents", "logs.txt"]).join(this.dir);
    this.file = new java.io.File(this.path);
    this.entity = 0;
    this.location = {x: 0, y: 0, z: 0};
    this.direction = {x: 0, y: 0, z: 0};
    this.fps = 30
    this.enable = false;
    this.ground = 53;
    this.block = 0;
    this.blockLocation = {x: 0, y: 0, z: 0};
    this.blockLogDone = true;
    this.basicY = 55;

    this.flushLogger = function () {
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

        if (! this.enable)
        {
            throw ("logger is disable");
        }

        if (this.blockLogDone)
        {
            this.resetBlock();
        }

        this.entity.setFlying(true);
        this.location = this.setXYZ(this.entity.location);
        this.direction = this.setXYZ(this.entity.location.getDirection());

        this.writeFile(this.getLogs());
    };

    this.resetEntity = function () {

        // look 8
        //var location = new org.bukkit.Location(this.entity.world, 0.5, this.basicY, 0.5);
        //var direction = new org.bukkit.util.Vector(0.85, 0.0, 0.0);

        // look 85
        //var location = new org.bukkit.Location(this.entity.world, -1.898, this.basicY, 0.5);
        //var direction = new org.bukkit.util.Vector(0.5, -0.86, 0.0);

        // look 2
        //var location = new org.bukkit.Location(this.entity.world, 0.5, this.basicY, 0.5);
        //var direction = new org.bukkit.util.Vector(-0.85, 0.0, 0.0);

        // look 25
        //var location = new org.bukkit.Location(this.entity.world, 1.898, this.basicY, 0.5);
        //var direction = new org.bukkit.util.Vector(-0.5, -0.86, 0.0);

        // look 4
        //var location = new org.bukkit.Location(this.entity.world, 0.5, this.basicY, 0.5);
        //var direction = new org.bukkit.util.Vector(0.0, 0.0, -0.85);

        // look 45
        //var location = new org.bukkit.Location(this.entity.world, 0.5, this.basicY, 1.898);
        //var direction = new org.bukkit.util.Vector(0.0, -0.86, -0.5);

        // look 6
        //var location = new org.bukkit.Location(this.entity.world, 0.5, this.basicY, 0.5);
        //var direction = new org.bukkit.util.Vector(0.0, 0.0, 0.85);

        // look 65
        var location = new org.bukkit.Location(this.entity.world, 0.5, this.basicY, -1.898 + 0.5);
        var direction = new org.bukkit.util.Vector(0.0, -0.86, 0.5);

        location.setDirection(direction);

        this.entity.teleport(location);
    };

    this.resetBlock = function () {
        this.block = 0;
        this.blockLocation = {x: 0, y: 0, z: 0};
    };

    this.setXYZ = function (xyz) {
        return {x: (xyz.x).toFixed(5), y: (xyz.y).toFixed(5), z: (xyz.z).toFixed(5)};
    };

    this.enableLogger = function () {
        this.resetBlock();
        this.resetEntity();
        this.enable = true;
    };

    this.disableLogger = function () {
        this.enable = false;
    };

    this.initBlockEvent = function () {
        logger = this;

        events.blockPlace(function(e) {
            logger.block = "place";
            logger.blockLocation = logger.setXYZ((e.getBlock()).location);
            logger.blockLogDone = false;
        });

        events.blockBreak(function(e) {
            logger.block = "break";
            logger.blockLocation = logger.setXYZ((e.getBlock()).location);
            logger.blockLogDone = false;
        });
    };

    this.initUpdater = function () {
        loggerUpdater = setInterval(function(){
            try
            {
                logger.flushLogger();
            }
            catch (e)
            {
                console.log(e);
            }
        }, 1000 / this.fps);

        return loggerUpdater;
    };

    this.getLogs = function () {
        this.blockLogDone = true;

        return JSON.stringify({
            location: this.location,
            direction: this.direction,
            block: this.block,
            blockLocation: this.blockLocation
        });
    };

    this.writeFile = function (contents) {
        if (! this.file.canWrite())
        {
            this.file.createNewFile();
        }

        var writer = new java.io.FileWriter(this.file, true);

        writer.write("\r\n" + contents);
        writer.close();

        return contents;
    };
};

exports.logger = new logger();

exports.loggerUpdater = exports.logger.initUpdater();
exports.logger.initBlockEvent();
