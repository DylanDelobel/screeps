module.exports = function() {
    StructureSpawn.prototype.createLargestCreep =
        function (energy, jobName) {

            const ROLES = {
                miner: {
                    template: [MOVE, WORK, CARRY],
                    templateCost: 200,
                    upgrade: [WORK],
                    upgradeCost: 100,
                },
                builder: {
                    template: [MOVE, WORK, CARRY],
                    templateCost: 200,
                    upgrade: [WORK],
                    upgradeCost: 100,
                }
            };

            let body = [];

            Array.prototype.push.apply(body, ROLES[jobName]['template']);

            let energyLeft = energy - ROLES[jobName]['templateCost'];

            if (energyLeft <= ROLES[jobName]['upgradeCost']) {
                Array.prototype.push.apply(body, ROLES[jobName]['upgrade']);
            }

            return this.createCreep(body, undefined, { job: jobName, energyFull: false});
        };
};

