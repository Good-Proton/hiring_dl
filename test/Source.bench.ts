import Source from '../src/Source';

import DB from '../src/DB';
import { PersonId } from '../src/interfaces';
import TargetCollection from '../src/TargetCollection';

import t from 'tap';

const mutiplier = 20;
const packetSize = 1000;
t.test(`${mutiplier * packetSize} people and ${packetSize} mutations`, async t => {
    const source = new Source(new DB(':memory:'));
    const people: PersonId[] = [...Array(20000).keys()];

    let totalTime = 0n;

    await t.test('fill initial', async t => {
        const start = process.hrtime.bigint();
        for (let i = 0; i < mutiplier; ++i) {
            const packet = people.slice(i * packetSize, (i + 1) * packetSize);
            await source.addToTarget(packet);
        }
        const duration = process.hrtime.bigint() - start;
        t.pass(`duration: ${duration}ns`);
        t.pass(`db size: ${JSON.stringify(await source.getSize())}`);
        totalTime += duration;
    });

    await t.test('mutations', async t => {
        const start = process.hrtime.bigint();
        for (let i = 0; i < packetSize; ++i) {
            const packet = people.slice(i * mutiplier, (i + 1) * mutiplier);
            await source.removeFromTarget(packet);
            await source.addToTarget(packet);
        }
        const duration = process.hrtime.bigint() - start;
        t.same(await new TargetCollection(source).slice(), people, '`target` is valid');
        t.pass(`duration: ${duration}ns`);
        t.pass(`db size: ${JSON.stringify(await source.getSize())}`);
        totalTime += duration;
    });

    t.pass(`total time: ${totalTime}ns`);
    t.pass(`db size: ${JSON.stringify(await source.getSize())}`);
});
