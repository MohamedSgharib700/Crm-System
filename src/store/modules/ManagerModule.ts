import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IManager {
  id: number;
  name: string;
  email: string;
  created_at: string;
  user_type:string;
  is_active:boolean
}
export interface IManager_form {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: any;
  identification_number: string;
  user_type:string;
  birthdate:any
}




@Module
export default class ManagerModule extends VuexModule {
  error = [];
  Manager: IManager[] = [];
  Manager_active:IManager[] = [];
  data_Add = {};

  get getManager() {
    return this.Manager;
  }
  get getManager_active() {
    return this.Manager_active;
  }
  get geterrorManager() {
    return this.error;
  }
  get getdata_Add_Manager(){
 return this.data_Add;
 }
  // set manager
  @Mutation
  [Mutations.SET_MANAGER](data) {
    this.error = [];
    this.Manager = [] as IManager[];
    for (const x in data) {
      this.Manager.push(data[x]);
    }
    console.log("this.Manager", this.Manager);
  }
  // set manager
  @Mutation
  [Mutations.SET_MANAGER_active](data) {
    this.error = [];
    this.Manager_active = [] as IManager[];
    for (const x in data) {
      this.Manager_active.push(data[x]);
    }
    console.log("this.Manager", this.Manager);
  }
  @Mutation
  [Mutations.SET_SHOW_MANAGER](data) {
    this.error = [];
    this.Manager = [] as IManager[];
    this.Manager.push(data);
    console.log("this.area", this.Manager);
  }
  @Mutation
  [Mutations.SET_ERROR_Manager](error) {
    this.error = [];
    this.error = error;
    console.log("this.error", this.error);
  }
  //delete Manager mutation
  @Mutation
  [Mutations.SET_DELETE_MANAGER](data: number) {
    this.error = [];
    console.log("payload", data);
    this.Manager = this.Manager.filter((admin) => admin.id !== data);
    console.log("state.AllAdmins", this.Manager);
  }

  @Mutation
  [Mutations.NEW_ADD_MANAGER](data){
    this.error = [];
    this.data_Add = {};
    this.data_Add = data;
      this.Manager.unshift(data);
      console.log('this.Manager ==== ', this.Manager);
   }

  //update admin
  @Mutation[Mutations.SET_UPDATE_MANAGER](data){
    this.error = [];
    console.log("data.id == ",data.id);
    this.data_Add = {};
    this.data_Add = data;
    const index =  this.Manager.findIndex(item => item.id === data.id);
    if (index !== -1) this.Manager.splice(index, 1, data);
     }  

  /////////////////////////////////
  //Get All Maneger
  @Action
  async [Actions.ALLMANAGER]() {
    ApiService.setHeader();
    return await new Promise<void>((resolve, reject) => {
      ApiService.get("manager_api/branch_managers_dont_have_branch")
        .then(({ data }) => {
          console.log("the data ", data);
          this.context.commit(Mutations.SET_MANAGER, data.data);
          resolve();
        })
        .catch((response) => {
          console.log("response.errors.error", response.data.errors);
          this.context.commit(
            Mutations.SET_ERROR_Manager,
            response.data.errors
          );
          reject();
        });
    });
  }
  @Action
  async [Actions.ALLMANAGER_param]() {
    ApiService.setHeader();
    return await new Promise<void>((resolve, reject) => {
      ApiService.get("/manager_api/managers")
        .then(({ data }) => {
          console.log("the data ", data);
          this.context.commit(Mutations.SET_MANAGER, data.data);
          resolve();
        })
        .catch((response) => {
          console.log("response.errors.error", response.errors);
          this.context.commit(
            Mutations.SET_ERROR_Manager,
            response.errors
          );
          reject();
        });
    });
  }

  //show active
  
  @Action
  async [Actions.ALLMANAGER_hasActive](num) {
    ApiService.setHeader();
    return await new Promise<void>((resolve, reject) => {
      ApiService.get("/admincp/managers_cusomer?is_active="+num+"&has_delegation=1&has_company=0")
        .then(({ data }) => {
          console.log("the data ", data);
          this.context.commit(Mutations.SET_MANAGER_active, data.data);
          resolve();
        })
        .catch((response) => {
          console.log("response.errors.error", response.errors);
          this.context.commit(
            Mutations.SET_ERROR_Manager,
            response.errors
          );
          reject();
        });
    });
  }
  //show managers
  @Action
  async [Actions.SHOWMANAGER](id) {
    ApiService.setHeader();
    return await new Promise<void>((resolve, reject) => {
      ApiService.get("/manager_api/managers/" + id)
        .then(({ data }) => {
          console.log("the data ", data);
          this.context.commit(Mutations.SET_SHOW_MANAGER, data.data);
          resolve();
        })
        .catch((response) => {
          console.log("response.errors.error", response.errors);
          this.context.commit(
            Mutations.SET_ERROR_Manager,
            response.data.errors
          );
          reject();
        });
    });
  }
  //delete managers
  @Action
  [Actions.DELETE_MANAGER](data: number) {
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.delete("manager_api/managers/" + data)
        .then((response) => {
          console.log("response", response);
          this.context.commit(Mutations.SET_DELETE_MANAGER, response);
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
    [Actions.ADD_MANAGER](data) {
      ApiService.setHeader();
      return new Promise<void>((resolve, reject) => {
        ApiService.post("manager_api/managers", data)
          .then((response) => {
            console.log("response", response);
            this.context.commit(Mutations.NEW_ADD_MANAGER, response.data.data);
            resolve();
          })
          .catch(({ response }) => {
            this.context.commit(
              Mutations.SET_ERROR_Manager,
              response.data.errors
            );
            reject();
          });
      });
    }
    

    //update
    //add update 
    @Action
    async [Actions.UPDATE_MANAGER](payload) {
      console.log("payload", payload);
      const ID = payload['key1'];
      const data = payload['key2'];
      console.log("data",data);
      ApiService.setHeader();
      return new Promise<void>((resolve, reject) => {
        ApiService.put(`manager_api/managers/${ID}`, data)
          .then((response) => {
            console.log('response', response);
            this.context.commit(Mutations.SET_UPDATE_MANAGER, response.data.data);
            resolve();
          }).catch(({ response }) => {
            this.context.commit(Mutations.SET_ERROR_Manager, response.data.errors);
            reject();
          });
      })
    }
  //show managers
  @Action
  async [Actions.IS_ACTIVE](payload) {
    const ID = payload["key1"];
    const data = payload["key2"];
    ApiService.setHeader();
    return await new Promise<void>((resolve, reject) => {
      ApiService.post("/manager_api/managers/" + ID+'/change-status',data)
        .then(({ data }) => {
          console.log("the data ", data);
          resolve();
        })
        .catch((response) => {
          this.context.commit(
            Mutations.SET_ERROR_Manager,
            response
          );
          reject();
        });
    });
  }
}
