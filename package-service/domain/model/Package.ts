import {Expose} from "class-transformer"
import {BaseEntity, Column, Entity, ObjectId, ObjectIdColumn, PrimaryColumn,} from "typeorm";
import Location from "compliance-library/domain/dto/Location";

@Entity("packages")
export class Package extends BaseEntity {

    @ObjectIdColumn()
    id!: ObjectId;

    @Expose()
    @PrimaryColumn({name: "package_id"})
    packageId!: string;

    @Expose()
    @Column({name: "active_delivery_id"})
    activeDeliveryId!: string;

    @Expose()
    @Column()
    description!: string;

    @Expose()
    @Column()
    weight!: number;

    @Expose()
    @Column()
    width!: number;

    @Expose()
    @Column()
    height!: number;

    @Expose()
    @Column()
    depth!: number;

    @Expose()
    @Column({name: "from_name"})
    fromName!: string;

    @Expose()
    @Column({name: "from_address"})
    fromAddress!: string;

    @Expose()
    @Column("simple-json", {name: "from_location"})
    fromLocation!: Location;

    @Expose()
    @Column({name: "to_name"})
    toName!: string;

    @Expose()
    @Column({name: "to_address"})
    toAddress!: string;

    @Expose()
    @Column("simple-json", {name: "to_location"})
    toLocation!: Location;
}