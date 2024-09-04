import {DataTypes, Model} from 'sequelize';
import { database } from '../../configurations/index';

export interface ReportAttributes {
    [x: string]: any;
    id?: string;
    owner_id: string;
    owner_name: string;
    event_id: string;
    report: string;
    report_time: Date;
    createdAt: Date,
    updatedAt: Date
}

export class Report extends Model<ReportAttributes> {
    [x: string]: any;
}

Report.init({
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
report: {
    type: DataTypes.STRING,
    allowNull: false,
},
report_time: {
    type: DataTypes.DATE  
},
createdAt: {
    type: DataTypes.DATE    
},
updatedAt: {
    type: DataTypes.DATE    
}

},{
    sequelize: database,
    tableName: 'Report'
}
)

export default Report