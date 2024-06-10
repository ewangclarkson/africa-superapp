import {Expose} from "class-transformer"
import {BaseEntity, Column, Entity, ObjectId, ObjectIdColumn, PrimaryColumn} from "typeorm";
import Location from "compliance-library/domain/dto/Location";
import {DeliveryStatus} from "../../config/constants/DeliveryStatus";

@Entity("deliveries")
export class Delivery extends BaseEntity {

    @ObjectIdColumn()
    id!: ObjectId;

    @Expose()
    @PrimaryColumn({name: "delivery_id"})
    deliveryId!: string;

    @Expose()
    @Column({name: "package_id"})
    packageId!: string;

    @Expose()
    @Column({name: "pickup_time"})
    pickupTime!: Date;

    @Expose()
    @Column({name: "start_time"})
    startTime!: Date;

    @Expose()
    @Column({name: "end_time"})
    endTime!: Date;

    @Expose()
    @Column()
    status!: DeliveryStatus;

    @Expose()
    @Column("simple-json")
    location!: Location;
}