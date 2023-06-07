import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IServices {
  id: number,
  name: string,
  created_at : string
}
export interface ISERVICES_forms {
  id: number,
  name: {
    ar: string,
    en: string
  },
}

@Module
export default class CitiesModules extends VuexModule {
    error = [];
    Services: IServices[] = [];
    data_Add = {};
     get GetServices(): IServices[] {
        return this.Services;
      }
      get getErrorServices() {
        return this.error;
      }
     get getdata_Add_services(){
    return this.data_Add;
    }
    
  @Mutation
  [Mutations.SET_ALLservices](data) {
    this.Services = [] as IServices[];
    for (const x in data) {
      this.Services.push(data[x]);
    }
    console.log("this.Cities", this.Services);
  }
  @Mutation
  [Mutations.SET_ERROR_services](error) {
    this.error = error;
    console.log("this.error", this.error);
  }

   @Mutation
  [Mutations.SET_SHOW_SERVICES](data) {
    this.error = [];
    this.Services = [] as IServices[];
      this.Services.push(data);
    console.log("this.area", this.Services);
  }
   //delete services
   @Mutation
   [Mutations.SET_DELETE_SERVICES](data: number) {
     this.error = [];
     console.log('payload', data);
     this.Services = this.Services.filter(admin => admin.id !== data);
     console.log('state.AllAdmins', this.Services);
   }
   @Mutation
   [Mutations.NEW_ADD_SERVICES](data){
    this.error = [];
    this.data_Add = {};
    this.data_Add = data;
       this.Services.push(data);
       console.log('this.Services ==== ', this.Services);
    }

   //update admin
   @Mutation[Mutations.SET_UPDATE_SERVICES](data){
    this.error = [];
    this.data_Add = {};
    this.data_Add = data;
     console.log("data.id == ",data.id);
     const index =  this.Services.findIndex(item => item.id === data.id);
     if (index !== -1) this.Services.splice(index, 1, data);
      }  
  /////////////////////////////////////////////////////////////
   //All services 
   @Action
   async [Actions.ALLServices]() {
     ApiService.setHeader();
     return await new Promise<void>((resolve, reject) => {
       ApiService.get("/admincp/servicesproviders_customer")
         .then(({ data }) => {
           console.log("the data ", data);
           this.context.commit(Mutations.SET_ALLservices, data.data);
           resolve();
         }).catch((response) => {
           console.log("response.errors.error", response.errors.error)
           this.context.commit(Mutations.SET_ERROR_services, response.errors.error);
           reject();
         });
     });
   }
   //SHOW
   @Action
   async [Actions.SHOWSERVICES](id) {
     ApiService.setHeader();
     return await new Promise<void>((resolve, reject) => {
       ApiService.get("/admincp/servicesproviders_customer/"+id)
         .then(({ data }) => {
           console.log("the data ", data);
           this.context.commit(Mutations.SET_SHOW_SERVICES, data.data);
           resolve();
         }).catch((response) => {
           console.log("response.errors.error", response.errors)
           this.context.commit(Mutations.SET_ERROR_services, response.errors);
           reject();
         });
     });
   }  
     //delete services
  @Action
  [Actions.Delete_Services](data: number) {
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.delete('admincp/servicesproviders_customer/' + data)
        .then((response) => {
          console.log('response', response);
          this.context.commit(Mutations.SET_DELETE_SERVICES, response);
          resolve();
        }).catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR_services, response.data.errors);
        });
    });
  }
    //add admin 
    @Action
    [Actions.ADD_SERVICES](data) {
      ApiService.setHeader();
      return new Promise<void>((resolve, reject) => {
        ApiService.post('admincp/servicesproviders_customer', data)
          .then((response) => {
            console.log('response', response);
            this.context.commit(Mutations.NEW_ADD_SERVICES, response.data.data);
            resolve();
          }).catch(({ response }) => {
            this.context.commit(Mutations.SET_ERROR_services, response.data.errors);
            reject();
          });
      })
    }
    //add update 
    @Action
    async [Actions.UPDATE_SERVICES](payload) {
      console.log("payload", payload);
      const ID = payload['key1'];
      const data = payload['key2'];
      console.log("data",data);
      ApiService.setHeader();
      return new Promise<void>((resolve, reject) => {
        ApiService.put(`admincp/servicesproviders_customer/${ID}`, data)
          .then((response) => {
            console.log('response', response);
            this.context.commit(Mutations.SET_UPDATE_SERVICES, response.data.data);
            resolve();
          }).catch(({ response }) => {
            this.context.commit(Mutations.SET_ERROR_services, response.data.errors);
            reject();
          });
      })
    }
}