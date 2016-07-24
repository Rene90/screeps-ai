var getSpawnEnergy = function(creep, spawn) {
    if(spawn.transferEnergy(creep)) {
        creep.moveTo(spawn);
    }
};

var getSourcesEnergy = function(creep, source) {
    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
    }
};

var updateBuildingMode = function(creep) {
    if(creep.carry.energy > 0)
        creep.memory.building = true;
    else
        creep.memory.building = false;
};

var roleRoadBuilder = {
    run: function(creep) {

        var _sources = creep.room.find(FIND_SOURCES);
        var _room = creep.room;
        var _spawn = Game.spawns['Spawn1'];
        var _constructs = _room.find(FIND_CONSTRUCTION_SITES);
        var _structures = _room.find(FIND_STRUCTURES);

        if(!creep.memory.pathFlag)
            creep.memory.pathFlag = 0;

        var _sourceToConnect = _sources[creep.memory.pathFlag];

        if(!creep.memory.building && _spawn.energy > creep.carryCapacity && creep.carry.energy == 0) {
           getSpawnEnergy(creep, _spawn);
        } else if(!creep.memory.building && creep.carry.energy < creep.carryCapacity) {
            getSourcesEnergy(creep, _sourceToConnect);
        } else {
            updateBuildingMode(creep);

            if(_constructs.length == 0) {
                if(!creep.memory.path) {
                    creep.memory.path = _room.findPath(_spawn.pos, _sourceToConnect.pos);
                    creep.memory.currentPathPos = 0;
                }

                var x = creep.pos.x;
                var y = creep.pos.y;

                while(creep.memory.currentPathPos < creep.memory.path.length) {
                    x = creep.memory.path[creep.memory.currentPathPos].x;
                    y= creep.memory.path[creep.memory.currentPathPos].y;

                    creep.memory.currentPathPos++;

                    if(creep.memory.currentPathPos >= creep.memory.path.length) {
                        creep.memory.pathFlag++;

                        if(creep.memory.pathFlag < _sources.length) {
                            _sourceToConnect = _sources[creep.memory.pathFlag];
                            creep.memory.path = _room.findPath(_spawn.pos, _sourceToConnect.pos);
                            creep.memory.currentPathPos = 0;
                        }
                    }

                    if(!(_room.lookForAt('structure',x,y).length > 0 || _room.lookForAt('constructionSite',x,y).length > 0)) {
                        break;
                    }
                }

                _room.createConstructionSite(x,y,STRUCTURE_ROAD);
            }

            if(_constructs.length > 0 && creep.build(_constructs[0]) == ERR_NOT_IN_RANGE) {
                 creep.moveTo(_constructs[0]);
            }
        }
    }
};

module.exports = roleRoadBuilder;
