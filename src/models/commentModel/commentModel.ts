import {DataTypes, Model} from 'sequelize';
import { database } from '../../configurations/index';

export interface CommentAttributes {
    [x: string]: any;
    id?: string;
    owner_id: string;
    owner_name: string;
    event_id: string;
    comment: string;
    likes: number;
    likesArr: object;
    dislikes: number;
    dislikesArr: object;
    comment_time: Date;
    createdAt: Date,
    updatedAt: Date
}

export class Comment extends Model<CommentAttributes> {
    [x: string]: any;
}

Comment.init({
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
comment: {
    type: DataTypes.STRING,
    allowNull: false,
},
likes: {
  type: DataTypes.INTEGER    
},
likesArr: {
    type: DataTypes.JSON    
  },
  dislikes: {
    type: DataTypes.INTEGER,
},
dislikesArr: {
    type: DataTypes.JSON
},
comment_time: {
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
    tableName: 'Comment',
    schema: 'event_service'
}
)

export default Comment