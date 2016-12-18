module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // find source
        let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

        // harvest energy
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }

        // once full switch state
        if (creep.carry.energy == creep.carryCapacity) {
            creep.memory.energyFull = true;
        }
    }
};