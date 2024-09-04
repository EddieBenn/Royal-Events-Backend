import {DataTypes, Model} from 'sequelize';
import { database } from '../../configurations/index';

export interface TicketAttributes {
    [x: string]: any;
    id?: string;
    owner_id: string;
    owner_name: string;
    event_id: string;
    order_number: string;
    event_name: string;
    event_type: string;
    ticket_type: string;
    quantity: number;
    total_cost: number;
    createdAt: Date,
    updatedAt: Date
}

export class Ticket extends Model<TicketAttributes> {
    [x: string]: any;
}

Ticket.init({
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
order_number: {
    type: DataTypes.STRING,
    allowNull: false,
},
event_name: {
  type: DataTypes.STRING    
},
event_type: {
    type: DataTypes.STRING    
  },
  ticket_type: {
    type: DataTypes.STRING,
},
quantity: {
    type: DataTypes.INTEGER
},
total_cost: {
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
    tableName: 'Ticket',
    schema: 'event_service'
}
)

export default Ticket