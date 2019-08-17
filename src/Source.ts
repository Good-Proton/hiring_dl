import DB from './DB';
import { PersonId } from './interfaces';

export default class Source {
    constructor(db: DB) {
        this.db = db;
        this.queuePromise = this.initialize();
    }

    @queued @transaction
    public async addToTarget(people: Iterable<PersonId>) {
        ...
    }

    @queued @transaction
    public async removeFromTarget(people: Iterable<PersonId>) {
        ...
    }

    @queued @transaction
    public async addToQueue(people: Iterable<PersonId>) {
        ...
    }

    @queued @transaction
    public async removeFromQueue(people: Iterable<PersonId>) {
       ...
    }

    @queued @transaction
    public async clearTarget() {
        ...
    }

    ...

    @queued @transaction
    public async getSize() {
        const size: {
            size: number
            page_count: number
            page_size: number
        } = await this.db.get(`
            SELECT page_count * page_size as size, page_count, page_size 
            FROM pragma_page_count(), pragma_page_size()
        `);

        const tables: Array<{ name: string }> =
            await this.db.all(`SELECT name FROM sqlite_master WHERE type = 'table'`);
        let rowCount = 0;
        for (const table of tables) {
            rowCount += (await this.db.get(`SELECT COUNT(*) as count FROM ${table.name}`)).count;
        }

        return {
            ...size,
            row_count: rowCount
        };
    }

    private async initialize() {
        await this.db.exec(`
            CREATE TABLE IF NOT EXISTS target_people(
                id INTEGER PRIMARY KEY,
                ...
            );
            CREATE TABLE IF NOT EXISTS results(
                id INTEGER PRIMARY KEY,
                person_id INTEGER NOT NULL,
                ...
                FOREIGN KEY(version_id) REFERENCES versions(id)
            );
            ...
        `);
    }

    protected db: DB;
    protected queuePromise: Promise<void>;
}

// tslint:disable:ban-types
// tslint:disable:no-empty
type Functions<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];

function queued<T extends Source, M extends Functions<T>>(target: T, method: M, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = async function (this: T) {
        const promise = this.queuePromise.then(() => original.apply(this, arguments));
        this.queuePromise = promise.catch(e => { });
        return promise;
    };
}

function transaction<T extends Source, M extends Functions<T>>(target: T, method: M, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = async function (this: T) {
        await this.db.run('BEGIN IMMEDIATE');
        try {
            const r = await original.apply(this, arguments);
            await this.db.run('COMMIT TRANSACTION');
            return r;
        } catch (e) {
            await this.db.run('ROLLBACK');
            throw e;
        }
    };
}
