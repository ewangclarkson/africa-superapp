import {Package} from "../domain/model/Package";

export default interface PackageRepository {

    create(packageObject: Package): Promise<Package>;

    findOne(id: string): Promise<Package | null>;

    find(): Promise<Package[]>;

    delete(packageObject: Package): Promise<void>;

    update(id:string,packageObject: Package): Promise<Package>;

}