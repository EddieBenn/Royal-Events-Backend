import { DataTypes, Model } from "sequelize";
import { database } from "../../configurations/index";

export enum role {
  ADMIN = "Admin",
  USER = "User",
}

type report = {
  name_of_reporter: string;
  address_of_reporter: string;
  report: string;
};

export interface UserAttributes {
  id?: string;
  first_name?: string;
  last_name?: string;
  user_name: string;
  email: string;
  phone_number: string;
  profile_picture: string;
  address: string;
  state: string;
  zip_code: string;
  password: string;
  role: string;
  identity_document: string;
  is_completed_profile: boolean;
  isVerified: boolean;
  isBlocked: boolean;
  isAddAccount: boolean;
  reports: report[];
  createdAt: Date;
  updatedAt: Date;
}

export class User extends Model<UserAttributes> {
    [x: string]: any;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    is_completed_profile: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    identity_document: {
      type: DataTypes.STRING
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_picture: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isAddAccount: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    reports: {
      type: DataTypes.JSON,
    },
    zip_code: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required",
        },
        notEmpty: {
          msg: "Password is required",
        },
      },
    },
    role: {
      type: DataTypes.ENUM(...Object.values(role)),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: database,
    tableName: "User",
  }
);

export default User;