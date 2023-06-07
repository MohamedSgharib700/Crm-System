import ApiService from "@/core/services/ApiService";
import store from '../index';
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface ICustomer {
  id: number;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: any;
  roles: string;
}


@Module({ name: 'UserModule', dynamic: true, store })
export default class UserModule extends VuexModule {
  error = [];
  users: ICustomer[] = [];
  data_Add = {};

  get GetUsers(): ICustomer[] {
    return this.users;
  }
  get getErrorUsers() {
    return this.error;
  }
  get getdata_Add_users(){
    return this.data_Add;
  }
  //mutation

  @Mutation
  [Mutations.SET_ADMIN](data) {
    this.users = [] as ICustomer[];
    this.error = [];
    for (const x in data) {
      this.users.push(data[x]);
    }
    console.log("this.users", this.users);
  }
  @Mutation
  [Mutations.SET_SHOW_ADMIN](data) {
    this.users = [] as ICustomer[];
    this.error = [];
      this.users.push(data);
    console.log("this.user", this.users);
  }

  @Mutation
  [Mutations.SET_ERROR_USER](error) {
    console.log("this::error", error);
    this.error = [];
    this.error = error;
    console.log("this.error", this.error);
  }
  //delete admin mutation
  @Mutation
  [Mutations.SET_DELETE](data: number) {
    this.error = [];
    console.log('payload', data);
    this.users = this.users.filter(admin => admin.id !== data);
    console.log('state.AllAdmins', this.users);
  }

  //add admin mutation
  @Mutation
  [Mutations.NEW_ADD_ADMIN](data) {
    this.error = [];
    this.data_Add = {};
    this.data_Add = data;
    this.users.push(data);
    console.log('this.users === ', this.users);
  }

  //update admin
  @Mutation [Mutations.SET_UPDATE_ADMIN](data) {
    this.error = [];
    this.data_Add = {};
    this.data_Add = data;
    console.log("data.id == ", data.id);
    const index = this.users.findIndex(item => item.id === data.id);
    if (index !== -1) this.users.splice(index, 1, data);
    console.log('this.areas after update ====', this.users);
  }

  /////////////////////////////////////////////////
  //action   

  //All admin 
  @Action
  async [Actions.ALLADMIN]() {
    ApiService.setHeader();
    return await new Promise<void>((resolve, reject) => {
      ApiService.get("/admincp/adminsCustomer")
        .then(({ data }) => {
          console.log("the data ", data);
          this.context.commit(Mutations.SET_ADMIN, data.data);
          resolve();
        }).catch((response) => {
          console.log("response.errors.error", response.errors.error)
          this.context.commit(Mutations.SET_ERROR_USER, response.errors);
          reject();
        });
    });
  }
  //delete admin
  @Action
  [Actions.Delete_Admin](data: number) {
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.delete('admincp/adminsCustomer/' + data)
        .then((response) => {
          console.log('response', response);
          this.context.commit(Mutations.SET_DELETE, response);
          resolve();
        }).catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR_USER, response.data.errors);
        });
    });
  }

  //add admin 
  @Action
  [Actions.ADD_ADMIN](data) {
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.post('admincp/adminsCustomer', data)
        .then((response) => {
          console.log('response', response);
          this.context.commit(Mutations.NEW_ADD_ADMIN, response.data.data);
          resolve();
        }).catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR_USER, response.data.errors);
          reject();
        });
    })
  }


  //add update 
  @Action
  async [Actions.UPDATE_ADMIN](payload) {
    console.log("payload", payload);
    const ID = payload['key1'];
    const data = payload['key2'];
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.put(`admincp/adminsCustomer/${ID}`, data)
        .then((response) => {

          console.log('response', response);
          this.context.commit(Mutations.SET_UPDATE_ADMIN, response.data.data);
          resolve();
        }).catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR_USER, response.data.errors);
          reject();
        });
    })
  }

  @Action
  async [Actions.SHOWADMIN](id) {
    ApiService.setHeader();
    return await new Promise<void>((resolve, reject) => {
      ApiService.get("/admincp/adminsCustomer/"+ id)
        .then(({ data }) => {
          console.log("the data ", data.data);
          this.context.commit(Mutations.SET_SHOW_ADMIN, data.data);
          resolve();
        }).catch((response) => {
          console.log("response.errors.error", response.errors.error)
          this.context.commit(Mutations.SET_ERROR_USER, response.errors);
          reject();
        });
    });
  }

}
