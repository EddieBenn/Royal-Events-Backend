import {DataTypes, Model} from 'sequelize';
import { database } from '../../configurations/index';

export interface BankAttributes {
    [x: string]: any;
    id?: string;
    owner_id: string;
    bank_name: string;
    account_name: string;
    account_number: string;
    owner_name: string;
    createdAt: Date,
    updatedAt: Date
}

export class Bank extends Model<BankAttributes> {
    [x: string]: any;
}

Bank.init({
     id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
},
owner_id: {
    type: DataTypes.UUID,
    allowNull: false,
},
bank_name: {
    type: DataTypes.STRING,
    allowNull: false,
},
account_name: {
    type: DataTypes.STRING,
    allowNull: false,
},
account_number: {
    type: DataTypes.STRING,
    allowNull: false,
},
owner_name: {
    type: DataTypes.STRING  
},
createdAt: {
    type: DataTypes.DATE    
},
updatedAt: {
    type: DataTypes.DATE    
}

},{
    sequelize: database,
    tableName: 'Bank',
    schema: 'event_service'
}
)

export default Bank