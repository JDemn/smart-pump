import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url';

/**
 * @class Connection
 * @description Class responsible for managing the connection to a local database using the `users.json` file for storage.
 * The class initializes and manages reading and writing data in a JSON file using `Low` and `JSONFile` as adapters.
 */

export class Connection {
    constructor(){
        this.db = null;
        this.dbConnection();
    }
    dbConnection = async () => {
        const __dirname = dirname(fileURLToPath(import.meta.url));
        
        const file = join(__dirname, '../../data/users.json');

        const defaultData = { users: [] };

        const adapter = new JSONFile(file);
        this.db = new Low(adapter, defaultData);

        await this.db.read();
        this.db.data ||= defaultData;

        await this.db.write();
    }
}

