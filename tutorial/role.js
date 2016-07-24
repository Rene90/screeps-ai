/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role');
 * mod.thing == 'a thing'; // true
 */

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSoldier = require('role.soldier');

module.exports = {
    run: function() {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var builders   = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var updaters   = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var soldiers   = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
        //console.log('Harvesters: ' + harvesters.length);
    
        if(harvesters.length < 2) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        }
        if(builders.length < 3) {
            var newBuilder = Game.spawns["Spawn1"].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
        }
        if(updaters.length < 1) {
            var newUpdater = Game.spawns["Spawn1"].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        }
        if(soldiers.length < 2) {
            var newName = Game.spawns['Spawn1'].createCreep([TOUGH,ATTACK,MOVE], undefined, {role: 'soldier'});
        }
    
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            if(creep.memory.role == 'soldier') {
                roleSoldier.run(creep);
            }
        }
    }
};
