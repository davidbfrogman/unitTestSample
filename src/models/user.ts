import { BaseModel } from './base/BaseModel';

export class User extends BaseModel {
    public name: string;
    public email: string;
    public nameAndEmail: string;
}

export class UserUtility{

    public static BuildUsersFromResponse(response: any): Array<User>{
        let usersArray = Array<User>();
        for (var users in response) {
          let user = new User();
          user.name = users;
          user.email = response[users];
          user.nameAndEmail = `${user.name} <${user.email}>`;
          if (user.name.length != 0) {
            usersArray.push(user);
          }
        }
        return usersArray;
    }
}