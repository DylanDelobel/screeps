module.exports = {
    run: function(creep) {
        let spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS, {
            filter: (s) => (s.structureType == STRUCTURE_SPAWN)
        });

        // transfer energy to spawn
        if (spawn.energy != spawn.energyCapacity && spawn != null) {
            if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }
            // transfer energy to controller
        } else {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};