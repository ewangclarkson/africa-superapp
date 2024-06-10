import {Expose} from "class-transformer"
import {BaseEntity, Column, Entity, ObjectId, ObjectIdColumn, PrimaryColumn} from "typeorm";
import {UserRoles} from "compliance-library/config/constants/UserRoles";


@Entity("users")
export class User extends BaseEntity {

    @ObjectIdColumn()
    id!: ObjectId;

    @Expose()
    @PrimaryColumn({name: "user_id"})
    userId!: string;

    @Expose()
    @Column({
        unique: true
    })
    email!: string;

    @Column()
    password!: string;

    @Expose()
    @Column()
    name!: string;

    @Expose()
    @Column({name: "phone_number"})
    phoneNumber!: string;

    @Expose()
    @Column({
        type: 'enum',
        enum: UserRoles,
        array: true,
        default: [],
    })
    roles!: UserRoles[];
}