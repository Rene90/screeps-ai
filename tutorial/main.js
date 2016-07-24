var role = require("role");

module.exports.loop = function () {
    
    for(var p in Game.spawns["Spawn1"].pos.findPathTo(Game.getObjectById("edeb5da16c0d8ff4e815f47d"))) {
        //console.log("pos:" + p.x + p.y);
        
    }

    role.run();
}
