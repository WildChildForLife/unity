import { juggler } from '@loopback/repository';
export declare class SessionDataSource extends juggler.DataSource {
    static dataSourceName: string;
    constructor(dsConfig?: object);
}
