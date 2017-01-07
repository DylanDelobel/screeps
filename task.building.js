let taskTransfer = require('task.transfer');

module.exports = {
    run: function(creep) {
        let constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

        // if one is found
        if (constructionSite != undefined) {
            // try to build, if the constructionSite is not in range
            if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                // move towards the constructionSite
                creep.moveTo(constructionSite);
            }
        }
        // if no constructionSite is found
        else {
            taskTransfer.run(creep);
        }
    }
};