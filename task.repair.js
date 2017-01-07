let taskBuilding = require('task.building');

module.exports = {
    run: function(creep) {
        let structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
        });

        // if we find one
        if (structure != undefined) {
            // try to repair it, if it is out of range
            if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                // move towards it
                creep.moveTo(structure);
            }
        }
        // if we can't fine one
        else {
            // look for construction sites
            taskBuilding.run(creep);
        }
    }
};