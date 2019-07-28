import Source from '../src/Source';

import CompletedCollection from '../src/CompletedCollection';
import DB from '../src/DB';
import { PersonId } from '../src/interfaces';
import QueuedCollection from '../src/QueuedCollection';
import TargetCollection from '../src/TargetCollection';
import script from './Source.int.json';

import t from 'tap';

t.test('Intergration test', async t => {
    const db = new DB(':memory:');
    const source = new Source(db);

    const targetCollection = new TargetCollection(source);
    const queuedCollection = new QueuedCollection(source);
    const completedCollection = new CompletedCollection(source);

    let i = 0;
    for (const step of script as Step[]) {
        await t.test(`step ${i++} "${step.type}"`, async t => {
            switch (step.type) {
                case 'add-to-target': {
                    await source.addToTarget(step.people);
                    break;
                }
                case 'remove-from-target': {
                    await source.removeFromTarget(step.people);
                    break;
                }
                case 'add-to-queue': {
                    await source.addToQueue(step.people);
                    break;
                }
                case 'remove-from-queue': {
                    await source.removeFromQueue(step.people);
                    break;
                }
                case 'save-result': {
                    await source.saveResult(step.person);
                    break;
                }
                case 'none':
                default:
            }

            t.same(await targetCollection.slice(), step.target, '`target` is valid');
            t.same(await queuedCollection.slice(), step.queued, '`queued` is valid');
            t.same(await completedCollection.slice(), step.completed, '`completed` is valid');
        });
    }

    t.pass(`db size: ${JSON.stringify(await source.getSize())}`);
});

interface IStepCommon {
    target: PersonId[]
    queued: PersonId[]
    completed: PersonId[]
}

type NoneStep = IStepCommon & {
    type: 'none'
};

type AddToTargetStep = IStepCommon & {
    type: 'add-to-target'
    people: PersonId[]
};

type RemoveFromTargetStep = IStepCommon & {
    type: 'remove-from-target'
    people: PersonId[]
};

type AddToQueueStep = IStepCommon & {
    type: 'add-to-queue'
    people: PersonId[]
};

type RemoveFromQueueStep = IStepCommon & {
    type: 'remove-from-queue'
    people: PersonId[]
};

type SaveResultStep = IStepCommon & {
    type: 'save-result'
    person: PersonId
};

type Step = NoneStep | AddToTargetStep | RemoveFromTargetStep | AddToQueueStep | RemoveFromQueueStep | SaveResultStep;
