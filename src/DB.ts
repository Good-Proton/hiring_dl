import { Database, RunResult, Statement } from 'sqlite3';

export interface IRunResult {
    lastId: number
    changes: number
}
export type IAllResult = any[];
export type IResult = IRunResult | IAllResult;

export default class DB {
    constructor(filename: string) {
        this.db = new Database(filename);
    }

    public async exec(sql: string) {
        return new Promise<void>((resolve, reject) => {
            this.db.exec(sql, function (this: Statement, err: Error | null) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    public async run(sql: string, params?: any[] | object) {
        return new Promise<IRunResult>((resolve, reject) => {
            this.db.run(sql, params, function (this: RunResult, err: Error | null) {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        lastId: this.lastID,
                        changes: this.changes
                    });
                }
            });
        });
    }

    public async all(sql: string, params?: any[] | object) {
        return new Promise<IAllResult>((resolve, reject) => {
            this.db.all(sql, params, function (this: Statement, err: Error | null, rows: any[]) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    public async get(sql: string, params?: any[] | object) {
        return new Promise<any>((resolve, reject) => {
            this.db.get(sql, params, function (this: Statement, err: Error | null, row: any) {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    private db: Database;
}
