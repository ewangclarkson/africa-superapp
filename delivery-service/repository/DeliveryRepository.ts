import {Delivery} from "../domain/model/Delivery";

export default interface DeliveryRepository {

    create(delivery: Delivery): Promise<Delivery>;

    findOne(id: string): Promise<Delivery | null>;

    find(): Promise<Delivery[]>;

    delete(delivery:Delivery): Promise<void>;

    update(id:string,delivery: Delivery): Promise<Delivery>;

}