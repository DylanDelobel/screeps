module.exports = function() {
    StructureSpawn.prototype.createLargestCreep =
        function (energy, jobName) {

            let body = [];

            body.push.apply(body, JOBS[jobName]['template']);

            let energyLeft = energy - JOBS[jobName]['templateCost'];

            if (energyLeft <= JOBS[jobName]['upgradeCost']) {
                body.push.apply(body, JOBS[jobName]['upgrade']);
            }

            return this.createCreep(body, undefined, { job: jobName, energyFull: false});
        };
};

