import {DataTypes, Model} from 'sequelize';
import { database } from '../../configurations/index';


type ticketType = {
    ticket_type: string;
    ticket_amount: number;
    ticket_quantity: number;
    ticket_description: string;
    ticket_availability: boolean
}

type organizer = {
    id_of_organizer: string;
    name_of_organizer: string;
    image_of_organizer: string;
    email_of_organiser: string;
    username_of_oganiser: string;
}

export enum eventType {
    BUSINESS = "Business",
    CHARITY = "Charity",
    COMMUNITY = "Community",
    CONCERT = "Concert",
    CONFERENCE = "Conference",
    EXHIBITION = "Exhibition",
    EXECUTIVE_MEETING = "Corporate off-sites & executive meeting",
    FASHION_SHOW = "Fashion show and red carpet",
    FESTIVAL = "Festival",
    FUNDRAISING = "Fundraising",
    HYBRID = "Hybrid",
    NETWORKING = "Networking",
    PRIVATE_PARTY = "Private Party",
    PRODUCT_LAUNCH = "Product launch",
    SEMINAR = "Seminar",
    SPORTS_AND_COMPETITION = "Sports and competition",
    TEAM_BUILDING = "Team building",
    TRADE_SHOW = "Trade show",
    VIRTUAL = "Virtual",
    WEDDING = "Wedding",
    WORKSHOP = "Workshop",
    OTHER = "Other",
  }

type event_registered_users = {
    id_of_user: string;
    name_of_user: string;
    email_of_user:string;
    no_of_tickets: number;
    date_purchased: Date;
    total_amount_paid: number;
}

export interface EventAttributes {
    [x: string]: any;
    id?: string;
    title?: string;
    type?: string;
    event_image: string;
    description?: string;
    event_date: Date;
    event_time: string;
    location?: string;
    ticket_types: ticketType[]
    no_of_attendees: string;
    owner_id: string;
    tickets_bought: number;
    organizers?: organizer[];
    likes: number;
    likesArr: [];
    dislikesArr: [];
    isBlocked: boolean;
    registered_users: event_registered_users[]
    dislikes: number;
    createdAt: Date,
    updatedAt: Date
}

export class Event extends Model<EventAttributes> {
    [x: string]: any;
}

Event.init({
     id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
},
title: {
    type: DataTypes.STRING,
    allowNull: false,
},
event_image: {
    type: DataTypes.STRING,
    allowNull: false,
},
type: {
    type: DataTypes.ENUM(...Object.values(eventType)),
    allowNull: false,
},
description: {
    type: DataTypes.STRING,
    allowNull: false,
},
event_date: {
  type: DataTypes.DATE    
},
event_time: {
    type: DataTypes.STRING    
  },
  likesArr: {
    type: DataTypes.JSON    
  },
  dislikesArr: {
    type: DataTypes.JSON    
  },
ticket_types: {
    type: DataTypes.JSON,
    allowNull: false,
},
owner_id: {
    type: DataTypes.STRING,
    allowNull: false,
},
tickets_bought: {
    type: DataTypes.INTEGER,
},
likes: {
    type: DataTypes.INTEGER,
},
isBlocked: {
    type: DataTypes.BOOLEAN
},
registered_users: {
    type: DataTypes.JSON,
},
dislikes: {
    type: DataTypes.INTEGER,
},
location:{
    type: DataTypes.STRING,
    allowNull: false
},
no_of_attendees:{
    type: DataTypes.INTEGER
},
organizers:{
    type: DataTypes.JSON
},
createdAt: {
    type: DataTypes.DATE    
},
updatedAt: {
    type: DataTypes.DATE    
}

},{
    sequelize: database,
    tableName: 'Event'
}
)

export default Event