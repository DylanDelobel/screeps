let jobs = require('./creeps.jobs');

module.exports = function() {
    StructureSpawn.prototype.createLargestCreep =
        function (energy, jobName) {

            let body = [];

            //Memory.spawns.Spawn1.test = jobs;
            Array.prototype.push.apply(body, JOBS[jobName]['template']);

            let energyLeft = energy - JOBS[jobName]['templateCost'];

            if (energyLeft <= JOBS[jobName]['upgradeCost']) {
                Array.prototype.push.apply(body, JOBS[jobName]['upgrade']);
            }

            return this.createCreep(body, undefined, { job: jobName, energyFull: false});
        };
};

