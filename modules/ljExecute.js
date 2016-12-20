execute = function () {
    this.dir = java.io.File.separator
    this.path = 0;
    this.file = 0;
    this.action = 0;
    this.entity = 0;
    this.location = {x: 0, y: 0, z: 0};
    this.direction = {x: 0, y: 0, z: 0};
    this.fps = 30;
    this.enable = false;

    this.flushExecute = function () {
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
            throw ("execute is disable");
        }

        this.entity.setFlying(true);
        this.updateExecute();

        var location = new org.bukkit.Location(this.entity.world, this.location.x, this.location.y, this.location.z);
        var direction = new org.bukkit.util.Vector(this.direction.x, this.direction.y, this.direction.z);

        location.setDirection(direction);
        this.entity.teleport(location);
    };

    this.initUpdater = function () {
        executeUpdater = setInterval(function(){
            try
            {
                execute.flushExecute();
            }
            catch (e)
            {
                console.log(e);
            }
        }, 1000 / this.fps);

        return executeUpdater;
    };

    this.setXYZ = function (xyz) {
        xyz.x = (parseFloat(xyz.x)).toFixed(5);
        xyz.y = (parseFloat(xyz.y)).toFixed(5);
        xyz.z = (parseFloat(xyz.z)).toFixed(5);

        return {x: xyz.x, y: xyz.y, z: xyz.z};
    };

    this.enableExecute = function () {
        this.enable = true;
    };

    this.disableExecute = function () {
        this.enable = false;
    };

    this.updateExecute = function () {
        this.path = (["", "Users", "Public", "Documents", "execute", this.action.toString() + ".txt"]).join(this.dir);
        this.file = new java.io.File(this.path);

        var toDo = JSON.parse(this.readFile());

        if (toDo.message == "done")
        {
            console.log("no more command");
            this.action++;

            return true;
        }

        this.location = this.setXYZ(toDo.location);
        this.direction = this.setXYZ(toDo.direction);

        console.log("command update");
        this.writeFile(this.doneMessage());
        this.action++;

        return true;
    };

    this.readFile = function () {
        var reader = new java.io.FileReader(this.file);
        var readerBuffered = new java.io.BufferedReader(reader);

        var contents = [];

        while (readerBuffered.ready())
        {
            contents.push(readerBuffered.readLine());
        }

        return contents.join("");
    };

    this.writeFile = function (contents) {
        if (! this.file.canWrite())
        {
            this.file.createNewFile();
        }

        var writer = new java.io.FileWriter(this.file, false);

        writer.write("\r\n" + contents);
        writer.close();

        return contents;
    };

    this.doneMessage = function () {
        return JSON.stringify({message: "done"});
    };
};

exports.execute = new execute();

exports.executeUpdater = exports.execute.initUpdater();
