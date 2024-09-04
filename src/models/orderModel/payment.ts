// models/Order.ts
import { DataTypes, Model } from 'sequelize';
import { database } from '../../configurations/index';


interface ticket_details {
  ticket_amount: string
ticket_availability: boolean
ticket_description: string
ticket_quantity: string
ticket_type: string
}

export interface OrderAttributes {
    id: string;
    tickets: ticket_details[];
    amount: number;
    owner_id: string;
    order_number: string;
    event_owner_id: string;
    event_id: string;
    owner_email: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Order extends Model<OrderAttributes> {
  [x: string]: any;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    tickets: {
        type: DataTypes.JSON,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    owner_id: {
        type: DataTypes.UUID,
      allowNull: false,
    },
    order_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_owner_id: {
      type: DataTypes.UUID,
    },
    event_id: {
        type: DataTypes.UUID,
    },
    owner_email: {
        type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE    
  },
  updatedAt: {
      type: DataTypes.DATE    
  }
  },
  {
    sequelize: database,
    tableName: 'Order',
    schema: 'event_service'
  }
);

export default Order;


