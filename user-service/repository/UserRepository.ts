import {User} from "../domain/model/User";

export default interface UserRepository {

    create(user: User): Promise<User>;

    findOne(id: string): Promise<User | null>;

    find(): Promise<User[]>;

    delete(user:User): Promise<void>;

    update(id:string,user: User): Promise<User>;

}