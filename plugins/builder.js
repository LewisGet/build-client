builder = function () {
    this.entity = 0;
    this.x = 0; this.y = 0; this.z = 0;
    this.direction = {x: 0, y: 0, z: 0};
    this.fps = 30;

    this.flushBuilder = function () {

        if (this.entity == 0)
        {
            throw ("entity need to init.");
        }

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
};

exports.builder = new builder();

exports.builderUpdater = exports.builder.initUpdater();
