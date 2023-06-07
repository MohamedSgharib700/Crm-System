import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IRoles {
  id: number;
  name: string;
  slug:string;
  permissions: [],
}
export interface IRoles_admin {
  id: number;
  name: string;
  role:any;
}
export interface IPERMISIONS {
  name:string;
  slug:string;
  permissions: Array<string>
}
@Module
export default class ServicesModule extends VuexModule {
    error = [] ;
    roles: IRoles []=[];
    admins: IRoles_admin []=[];
    permisions : IPERMISIONS [] = [];
    get GetRoles(): IRoles[] {
        return this.roles;
      }
      get GetRoles_Admins(): IRoles_admin[] {
          return this.admins;
        }
        get GetPERMISIONS(): IPERMISIONS[] {
            return this.permisions;
          }
      get getErrorRoles() {
        return this.error;
      }
    
  @Mutation
  [Mutations.SET_ROLES](data) {
    this.error = [];
    this.roles = [] as IRoles[];
    for (const x in data) {
      this.roles.push(data[x]);
    }
    console.log("this.roles", this.roles);
  }

  @Mutation
  [Mutations.SET_ROLES_ADMINS](data) {
    this.error = [];
    this.admins = [] as IRoles_admin[];
    for (const x in data) {
      this.admins.push(data[x]);
    }
    console.log("this.roles", this.admins);
  }
  
  @Mutation
  [Mutations.NEW_ADD_ROLE](data){
    this.error = [];
    this.roles.push(data);
      console.log('this.area ==== ', this.roles);
   }
    //update admin
    @Mutation[Mutations.SET_UPDATE_ROLE](data){
      console.log("data.id == ",data.id);
      const index =  this.roles.findIndex(item => item.id === data.id);
      if (index !== -1) this.roles.splice(index, 1, data);
       }  

  @Mutation
  [Mutations.SET_SHOW_ROLES](data) {
    this.error = [];
    this.roles = [] as IRoles[];
      this.roles.push(data);
    console.log("this.area", this.roles);
  }
  @Mutation
  [Mutations.SET_ERROR_ROLES](error) {
    this.error = [];
    this.error = error;
    console.log("this.error", this.error);
  }
  
  @Mutation
  [Mutations.SET_PERMISIONS](data) {
    this.error = [];
    this.permisions = [] as IPERMISIONS[];
    for (const x in data) {
    this.permisions.push(data[x]);
  }
    console.log("this.permisions", this.permisions);
  }
   //delete role mutation
   @Mutation
   [Mutations.SET_DELETE_ROLE](data: number) {
    this.error = [];
     console.log('payload', data);
     this.roles = this.roles.filter(admin => admin.id !== data);
     console.log('state.AllAdmins', this.roles);
   }
    //All areas 
    @Action
    async [Actions.ALLROLES]() {
      ApiService.setHeader();
      return await new Promise<void>((resolve, reject) => {
        ApiService.get("/admincp/roles_customer")
          .then(({ data }) => {
            console.log("the data ", data);
            this.context.commit(Mutations.SET_ROLES, data.data);
            resolve();
          }).catch((response) => {
            console.log("response.errors.error", response.errors.error)
            this.context.commit(Mutations.SET_ERROR_ROLES, response.errors);
            reject();
          });
      });
    }
    @Action
    async [Actions.SHOWROLE](id) {
      ApiService.setHeader();
      return await new Promise<void>((resolve, reject) => {
        ApiService.get("/admincp/roles_customer/"+id)
          .then(({ data }) => {
            console.log("the data ", data.data);
            this.context.commit(Mutations.SET_SHOW_ROLES, data.data.roles);
            resolve();
          }).catch((response) => {
            console.log("response.errors.error", response.errors.error)
            this.context.commit(Mutations.SET_ERROR_ROLES, response.errors);
            reject();
          });
      });
    }
    
    @Action
    async [Actions.SHOW_ROLE_ADMINS](slug) {
      ApiService.setHeader();
      return await new Promise<void>((resolve, reject) => {
        ApiService.get("/admincp/admins_role/"+slug)
          .then(({ data }) => {
            console.log("the data ", data.data);
            this.context.commit(Mutations.SET_ROLES_ADMINS, data.data);
            resolve();
          }).catch((response) => {
            console.log("response.errors.error", response.errors.error)
            this.context.commit(Mutations.SET_ERROR_ROLES, response.errors);
            reject();
          });
      });
    }

    @Action
    async [Actions.SHOW_PERMISIONS]() {
      ApiService.setHeader();
      return await new Promise<void>((resolve, reject) => {
        ApiService.get("/admincp/permissions")
          .then(({ data }) => {
            console.log("the data ", data.data);
            this.context.commit(Mutations.SET_PERMISIONS, data.data);
            resolve();
          }).catch((response) => {
            console.log("response.errors.error", response.errors.error)
            this.context.commit(Mutations.SET_ERROR_ROLES, response.errors);
            reject();
          });
      });
    }
    //add ROLE 
  @Action
  [Actions.ADD_ROLE](data) {
    console.log('response', data);
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.post('admincp/roles_customer', data)
        .then((response) => {
          console.log('response', response);
          this.context.commit(Mutations.NEW_ADD_ROLE, response.data.data);
          resolve();
        }).catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR_ROLES, response.data.errors);
          reject();
        });
    })
  }

  @Action
  async [Actions.UPDATE_ROLE](payload) {
    console.log("payload", payload);
    const ID = payload['key1'];
    const data = payload['key2'];
    console.log("data",data);
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.put(`admincp/roles_customer/${ID}`, data)
        .then((response) => {
          console.log('response', response);
          this.context.commit(Mutations.SET_UPDATE_ROLE, response.data.data);
          resolve();
        }).catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR_ROLES, response.data.errors);
          reject();
        });
    })
  }
     //delete role
  @Action
  [Actions.DELETE_ROLE](data: number) {
    console.log(data);
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.delete('admincp/roles_customer/' + data)
        .then((response) => {
          console.log('response', response);
          this.context.commit(Mutations.SET_DELETE_ROLE, response);
          resolve();
        }).catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR_AREA, response.data.message);
        });
    });
  }
}