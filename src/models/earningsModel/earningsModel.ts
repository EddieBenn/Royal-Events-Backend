import {DataTypes, Model} from 'sequelize';
import { database } from '../../configurations/index';

export interface EarningsAttributes {
    [x: string]: any;
    id?: string;
    owner_id: string;
    owner_name: string;
    event_id: string;
    order_date: string;
    event_name: string;
    order_number: string;
    ticket_quantity: number;
    ticket_cost: number;
    event_category: string;
    ticket_type: string;
    total_amount: number;
    amount_earned: number;
    createdAt: Date,
    updatedAt: Date
}

export class Earning extends Model<EarningsAttributes> {
    [x: string]: any;
}

Earning.init({
     id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
},
owner_id: {
    type: DataTypes.STRING,
    allowNull: false,
},
owner_name: {
    type: DataTypes.STRING,
    allowNull: false,
},
event_id: {
    type: DataTypes.UUID,
    allowNull: false,
},
order_date: {
    type: DataTypes.DATE,
    allowNull: false,
},
event_name: {
    type: DataTypes.STRING  
},
order_number: {
    type: DataTypes.STRING  
},
ticket_quantity: {
    type: DataTypes.INTEGER  
},
ticket_cost: {
    type: DataTypes.INTEGER  
},
event_category: {
    type: DataTypes.STRING  
},
ticket_type: {
    type: DataTypes.STRING  
},

total_amount: {
    type: DataTypes.INTEGER  
},
amount_earned: {
    type: DataTypes.INTEGER    
},
createdAt: {
    type: DataTypes.DATE    
},
updatedAt: {
    type: DataTypes.DATE    
}

},{
    sequelize: database,
    tableName: 'Earning',
    schema: 'event_service'
}
)

export default Earning