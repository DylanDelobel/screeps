require('prototype.spawn')();
require('creeps.jobs');

let taskGather = require('task.gather');
let taskTransfer = require('task.transfer');
let taskRepair = require('task.repair');

module.exports.loop = function () {
    if (Game.cpu.bucket < 500) {
        console.log("EMERGENCY! Bucket empty, skipping tick!");
        Game.notify('Bucket is half empty ! optimize your code');
        return;
    }

    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            console.log('<span style="color:rgb(250,0,0)">' + name + ' Just died. </span>');
            delete Memory.creeps[name];
        }
    }
    // for every creep name in Game.creeps
    for (let creepName in Game.creeps) {
        // get the creep object
        let creep = Game.creeps[creepName];
        // check if the creep is full
        if (creep.carry.energy == 0) {
            creep.memory.energyFull = false;
        }

        // exec task on the energy state
        if (creep.memory.energyFull == false) {
            taskGather.run(creep);
        } else {
            if (creep.memory.job == 'miner') {
                taskTransfer.run(creep);
            } else {
                taskRepair.run(creep);
            }
        }
    }
    // iterate over all the spawns
    for (let spawnName in Game.spawns) {
        /** @type {Spawn} */
        let spawn = Game.spawns[spawnName];

        let creepsInRoom = spawn.room.find(FIND_MY_CREEPS);

        let nbrCreepsMiner = _.sum(creepsInRoom, (c) => c.memory.job == 'miner');
        let nbrCreepsBuilder = _.sum(creepsInRoom, (c) => c.memory.job == 'builder');

        if (nbrCreepsMiner < 4) {
            let name = spawn.createLargestCreep(300, 'miner');

            if (!(name < 0)) {
                console.log('<span style="color:rgb(0,250,0)">' + name + ' Just spawn. JOBS = miner </span>');
            }
        } else if (nbrCreepsBuilder < 1) {
            let name = spawn.createLargestCreep(300, 'builder');

            if (!(name < 0)) {
                console.log('<span style="color:rgb(0,250,0)">' + name + ' Just spawn. JOBS = builder </span>');
            }
        }
    }
}