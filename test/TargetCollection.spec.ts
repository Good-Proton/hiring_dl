import TargetCollection from '../src/TargetCollection';

import DB from '../src/DB';
import { PersonId } from '../src/interfaces';
import Source from '../src/Source';

import t from 'tap';

const source = new Source(new DB(':memory:'));

t.afterEach(async () => {
    await source.removeFromTarget(await source.getPeople('target'));
});

t.test('`.size`, `.length`', async t => {
    const people: PersonId[] = [];
    const target = new TargetCollection(source);

    t.pass('empty collection');
    t.equal(await target.size, people.length,
        '`.size` resolves to correct number');
    t.equal(await target.length, people.length,
        '`.length` resolves to correct number');

    t.pass('add to collection');
    const toAdd = [1, 2, 3];
    people.push(...toAdd);
    await source.addToTarget(toAdd);

    t.equal(await target.size, people.length,
        '`.size` resolves to correct number');
    t.equal(await target.length, people.length,
        '`.length` resolves to correct number');

    t.pass('remove from collection');
    const toRemove = people.splice(2, 1);
    await source.removeFromTarget(toRemove);

    t.equal(await target.size, people.length,
        '`.size` resolves to correct number');
    t.equal(await target.length, people.length,
        '`.length` resolves to correct number');
});

t.test('`.first`, `.last`', async t => {
    const people: PersonId[] = [];
    const target = new TargetCollection(source);

    t.pass('empty collection');
    t.equal(await target.first, undefined,
        '`.first` resolves to correct person (`undefined`)');
    t.equal(await target.last, undefined,
        '`.last` resolves to correct person (`undefined`)');

    t.pass('add single item to collection');
    const toAddSingle = [1];
    people.push(...toAddSingle);
    await source.addToTarget(toAddSingle);

    t.equal(await target.first, people[0],
        '`.first` resolves to correct person');
    t.equal(await target.last, people[0],
        '`.last` resolves to correct person');

    t.pass('add items to collection');
    const toAdd = [2, 3];
    people.push(...toAdd);
    await source.addToTarget(toAdd);

    t.equal(await target.first, people[0],
        '`.first` resolves to correct person');
    t.equal(await target.last, people[people.length - 1],
        '`.last` resolves to correct person');

    t.pass('remove first item from collection');
    const toRemoveFirst = people.splice(0, 1);
    await source.removeFromTarget(toRemoveFirst);

    t.equal(await target.first, people[0],
        '`.first` resolves to correct person');
    t.equal(await target.last, people[people.length - 1],
        '`.last` resolves to correct person');

    t.pass('remove last from collection');
    const toRemoveLast = people.splice(people.length - 1, 1);
    await source.removeFromTarget(toRemoveLast);

    t.equal(await target.first, people[0],
        '`.first` resolves to correct person');
    t.equal(await target.last, people[people.length - 1],
        '`.last` resolves to correct person');
});

t.test('`.get()`', async t => {
    const people: PersonId[] = [];
    const target = new TargetCollection(source);

    t.pass('empty collection');
    t.equal(await target.get(0), undefined,
        '`.get(0)` resolves to correct person (`undefined`)');
    t.equal(await target.get(1), undefined,
        '`.get(1)` resolves to correct person (`undefined`)');

    t.pass('add single item to collection');
    const toAddSingle = [1];
    people.push(...toAddSingle);
    await source.addToTarget(toAddSingle);

    t.equal(await target.get(0), people[0],
        '`.get(0)` resolves to correct person');
    t.equal(await target.get(-1), people[people.length - 1],
        '`.get(-1)` resolves to correct person');
    t.equal(await target.get(1), undefined,
        '`.get(1)` resolves to correct person (`undefined`)');

    t.pass('add items to collection');
    const toAdd = [2, 3];
    people.push(...toAdd);
    await source.addToTarget(toAdd);

    t.equal(await target.get(0), people[0],
        '`.get(0)` resolves to correct person');
    t.equal(await target.get(-1), people[people.length - 1],
        '`.get(-1)` resolves to correct person');
    t.equal(await target.get(1), people[1],
        '`.get(1)` resolves to correct person');
    t.equal(await target.get(-2), people[people.length - 2],
        '`.get(-1)` resolves to correct person');
    t.equal(await target.get(people.length), people[people.length],
        '`.get(i > people.length)` resolves to correct person (`undefined`)');

    t.pass('remove first item from collection');
    const toRemoveFirst = people.splice(0, 1);
    await source.removeFromTarget(toRemoveFirst);

    t.equal(await target.get(0), people[0],
        '`.get(0)` resolves to correct person');
    t.equal(await target.get(-1), people[people.length - 1],
        '`.get(-1)` resolves to correct person');
    t.equal(await target.get(1), people[1],
        '`.get(1)` resolves to correct person');
    t.equal(await target.get(people.length), people[people.length],
        '`.get(i > people.length)` resolves to correct person (`undefined`)');

    t.pass('remove last from collection');
    const toRemoveLast = people.splice(people.length - 1, 1);
    await source.removeFromTarget(toRemoveLast);

    t.equal(await target.get(0), people[0],
        '`.get(0)` resolves to correct person');
    t.equal(await target.get(-1), people[people.length - 1],
        '`.get(-1)` resolves to correct person');
    t.equal(await target.get(1), people[1],
        '`.get(1)` resolves to correct person');
    t.equal(await target.get(people.length), people[people.length],
        '`.get(i > people.length)` resolves to correct person (`undefined`)');
});

t.test('`[Symbol.asyncIterator]`', async t => {
    const target = new TargetCollection(source);

    await t.test('empty collection', async t => {
        const iterator = target[Symbol.asyncIterator]();

        const iterated = [];
        for await (const person of { [Symbol.asyncIterator]() { return iterator; } }) {
            iterated.push(person);
        }

        t.same(iterated, [], 'iterates sucessfully');
    });

    await t.test('add to empty collection', async t => {
        const iterator = target[Symbol.asyncIterator]();

        const iterated = [];
        for await (const person of { [Symbol.asyncIterator]() { return iterator; } }) {
            iterated.push(person);
        }

        t.same(iterated, [],
            'iterates sucessfully over empty collection');

        const toAdd = [1, 2, 3];
        await source.addToTarget(toAdd);

        for await (const person of { [Symbol.asyncIterator]() { return iterator; } }) {
            iterated.push(person);
        }

        t.same(iterated, toAdd,
            'iterates sucessfully after adding to collection (iterator does not invalidate)');
    });

    await t.test('add to non-empty collection', async t => {
        const people: PersonId[] = [1, 2, 3];
        await source.addToTarget(people);
        const iterator = target[Symbol.asyncIterator]();

        const iterated = [];
        for await (const person of { [Symbol.asyncIterator]() { return iterator; } }) {
            iterated.push(person);
        }

        t.same(iterated, people,
            'iterates sucessfully over non-empty collection');

        const toAdd = [4, 5, 6];
        await source.addToTarget(toAdd);

        for await (const person of { [Symbol.asyncIterator]() { return iterator; } }) {
            iterated.push(person);
        }

        t.same(iterated, [...people, ...toAdd],
            'iterates sucessfully after adding to collection (iterator does not invalidate)');
    });

    await t.test('remove from non-empty collection', async t => {
        const people: PersonId[] = [1, 2, 3, 4];
        await source.addToTarget(people);
        const iterator = target[Symbol.asyncIterator]();

        const iterated = [];
        for await (const person of { [Symbol.asyncIterator]() { return iterator; } }) {
            iterated.push(person);
            break;
        }

        t.same(iterated, people.slice(0, 1),
            'iterates sucessfully single time over non-empty collection');

        const removedNext = people.splice(1, 1);
        await source.removeFromTarget(removedNext);

        for await (const person of { [Symbol.asyncIterator]() { return iterator; } }) {
            iterated.push(person);
            break;
        }

        t.same(iterated, people.slice(0, 2),
            'continues to iterate sucessfully after removing next item from the middle (iterator does not invalidate)');

        const removedPrev = people.splice(1, 1);
        await source.removeFromTarget(removedPrev);
        for await (const person of { [Symbol.asyncIterator]() { return iterator; } }) {
            iterated.push(person);
        }

        people.splice(1, 0, ...removedPrev);
        t.same(iterated, people,
            'continues to iterate sucessfully after removing prev item from the middle (iterator does not invalidate)');

        const removedAll = people.splice(0, people.length);
        await source.removeFromTarget(removedAll);
        people.push(1, 2, 3, 4);
        await source.addToTarget(people);
        iterated.splice(0, iterated.length);

        for await (const person of { [Symbol.asyncIterator]() { return iterator; } }) {
            iterated.push(person);
        }

        t.same(iterated, people,
            'continues to iterate sucessfully after resetting collection (iterator does not invalidate)');
    });
});

t.test('`.slice()`', async t => {
    const people = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    source.addToTarget(people);
    const target = new TargetCollection(source);

    t.same(await target.slice(), people.slice(), '`.slice()` returns valid array');
    t.same(await target.slice(1), people.slice(1), '`.slice(1)` returns valid array');
    t.same(await target.slice(-1), people.slice(-1), '`.slice(-1)` returns valid array');
    t.same(await target.slice(1, 1), [], '`.slice(1, 1)` returns valid array (empty)');
    t.same(await target.slice(1, 5), people.slice(1, 5), '`.slice(1, 5)` returns valid array');
    t.same(await target.slice(1, -2), people.slice(1, -2), '`.slice(1, -2)` returns valid array');
    t.same(await target.slice(-5, -2), people.slice(-5, -2), '`.slice(-5, -2)` returns valid array');
    t.same(await target.slice(-8, 8), people.slice(-8, 8), '`.slice(-8, 8)` returns valid array');
    t.same(await target.slice(-1, 1), [], '`.slice(-1, 1)` returns valid array (empty)');

    const removed = people.splice(5, 1);
    source.removeFromTarget(removed);
    
    t.same(await target.slice(), people.slice(), 'after item removed `.slice()` returns valid array');
    t.same(await target.slice(1), people.slice(1), 'after item removed `.slice(1)` returns valid array');
    t.same(await target.slice(-1), people.slice(-1), 'after item removed `.slice(-1)` returns valid array');
    t.same(await target.slice(1, 1), [], 'after item removed `.slice(1, 1)` returns valid array (empty)');
    t.same(await target.slice(1, 5), people.slice(1, 5), 'after item removed `.slice(1, 5)` returns valid array');
    t.same(await target.slice(1, -2), people.slice(1, -2), 'after item removed `.slice(1, -2)` returns valid array');
    t.same(await target.slice(-5, -2), people.slice(-5, -2), 'after item removed `.slice(-5, -2)` returns valid array');
    t.same(await target.slice(-8, 8), people.slice(-8, 8), 'after item removed `.slice(-8, 8)` returns valid array');
    t.same(await target.slice(-1, 1), [], 'after item removed `.slice(-1, 1)` returns valid array (empty)');
});
