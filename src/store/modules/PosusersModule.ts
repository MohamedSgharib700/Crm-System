import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IPosUsers {
  id: number;
  name: string;
  email: string;
  phone: any;
  identification_number: string;
  created_at: string;
}
export interface IPosUsers_Form {
  branch_id:number|undefined;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: any;
  identification_number: string;
  serial_number:string;
  serial_code:string
}




@Module
export default class ManagerModule extends VuexModule {
  error = [];
  PosUsers: IPosUsers[] = [];
  data_Add = {};

  get getPosUsers() {
    return this.PosUsers;
  }
  get getErrorPosUsers() {
    return this.error;
  }
  get getdata_Add_PosUsers(){
 return this.data_Add;
 }
   // set manager
   @Mutation
   [Mutations.SET_POSUSERS](data) {
     this.error = [];
     this.PosUsers = [] as IPosUsers[];
     for (const x in data) {
       this.PosUsers.push(data[x]);
     }
     console.log("this.Manager", this.PosUsers);
   }
   @Mutation
   [Mutations.SET_SHOW_PosUsers](data) {
     this.error = [];
     this.PosUsers = [] as IPosUsers[];
     this.PosUsers.push(data);
     console.log("this.area", this.PosUsers);
   }
  
   @Mutation
   [Mutations.SET_ERROR_POSUSERS](error) {
     this.error = [];
     this.error = error;
     console.log("this.error", this.error);
   }
   @Mutation
  [Mutations.NEW_ADD_POSUSERS](data){
    this.error = [];
    this.data_Add = {};
    this.data_Add = data;
      this.PosUsers.unshift(data);
      console.log('this.Manager ==== ', this.PosUsers);
   }
     //update admin
  @Mutation[Mutations.SET_UPDATE_POSUSERS](data){
    this.error = [];
    console.log("data.id == ",data.id);
    this.data_Add = {};
    this.data_Add = data;
    const index =  this.PosUsers.findIndex(item => item.id === data.id);
    if (index !== -1) this.PosUsers.splice(index, 1, data);
     }  

//delete Manager mutation
@Mutation
[Mutations.SET_DELETE_POS_USERS](data: number) {
  this.error = [];
  console.log("payload", data);
  this.PosUsers = this.PosUsers.filter((admin) => admin.id !== data);
  console.log("state.AllAdmins", this.PosUsers);
}
  /////////////////////////////////
  //Get All Maneger
  @Action
  async [Actions.ALLPOSUSERS]() {
    ApiService.setHeader();
    return await new Promise<void>((resolve, reject) => {
      ApiService.get("manager_api/pos-users")
        .then(({ data }) => {
          console.log("the data ", data);
          this.context.commit(Mutations.SET_POSUSERS, data.data);
          resolve();
        })
        .catch((response) => {
          console.log("response.errors.error", response.data.errors);
          this.context.commit(
            Mutations.SET_ERROR_POSUSERS,
            response.data.errors
          );
          reject();
        });
    });
  } 
  
  //show posusers
  @Action
  async [Actions.SHOWPOSTUSERS](id) {
    ApiService.setHeader();
    return await new Promise<void>((resolve, reject) => {
      ApiService.get("/manager_api/pos-users/" + id)
        .then(({ data }) => {
          console.log("the data ", data);
          this.context.commit(Mutations.SET_SHOW_PosUsers, data.data);
          resolve();
        })
        .catch((response) => {
          console.log("response.errors.error", response.errors);
          this.context.commit(
            Mutations.SET_ERROR_POSUSERS,
            response.data.errors
          );
          reject();
        });
    });
  }
 //delete posusers
 @Action
 [Actions.DELETE_POS_USERS](data: number) {
   ApiService.setHeader();
   return new Promise<void>((resolve, reject) => {
     ApiService.delete("manager_api/pos-users/" + data)
       .then((response) => {
         console.log("response", response);
         this.context.commit(Mutations.SET_DELETE_POS_USERS, response);
         resolve();
       })
       .catch(({ response }) => {
         this.context.commit(
           Mutations.SET_ERROR_Manager,
           response.data.errors
         );
       });
       reject();
   });
 }
  //add manager
  @Action
  [Actions.Add_ADD_POSUSERS](data) {
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.post("manager_api/pos-users", data)
        .then((response) => {
          console.log("response", response);
          this.context.commit(Mutations.NEW_ADD_POSUSERS, response.data.data);
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(
            Mutations.SET_ERROR_POSUSERS,
            response.data.errors
          );
          reject();
        });
    });
  }
  
    //add update 
    @Action
    async [Actions.UPDATE_POSUSERS](payload) {
      console.log("payload", payload);
      const ID = payload['key1'];
      const data = payload['key2'];
      console.log("data",data);
      ApiService.setHeader();
      return new Promise<void>((resolve, reject) => {
        ApiService.put(`manager_api/pos-users/${ID}`, data)
          .then((response) => {
            console.log('response', response);
            this.context.commit(Mutations.SET_UPDATE_POSUSERS, response.data.data);
            resolve();
          }).catch(({ response }) => {
            this.context.commit(Mutations.SET_ERROR_POSUSERS, response.data.errors);
            reject();
          });
      })
    }
 }