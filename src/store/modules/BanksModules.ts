import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IBanks {
  id: number,
  name: string
}
export interface IBanks_forms {
  id: number,
  name:string
}

@Module
export default class BanksModules extends VuexModule {
  error = [];
  banks: IBanks[] = [];
  data_Add = {};

  get GetBanks(): IBanks[] {
    return this.banks;
  }
  get getErrorBanks() {
    return this.error;
  } 
  get getdata_Add_bankes(){
    return this.data_Add;
  }
  @Mutation
  [Mutations.SET_Banks](data) {
    this.error = [];
    this.banks = [] as IBanks[];
    for (const x in data) {
      this.banks.push(data[x]);
    }
    console.log("this.users", this.banks);
  }
  @Mutation
  [Mutations.SET_SHOW_Banks](data) {
    this.error = [];
    this.banks = [] as IBanks[];
      this.banks.push(data);
    console.log("this.area", this.banks);
  }
  
  @Mutation
  [Mutations.SET_ERROR_BANKS](error) {
    this.error = [];
    this.error = error;
    console.log("this.error", this.error);
  }
  
  @Mutation
  [Mutations.NEW_ADD_BANK](data){
    this.error = [];
    this.data_Add = {};
    this.data_Add = data;
      this.banks.push(data);
      console.log('this.area ==== ', this.banks);
   }
  
  //delete admin mutation
  @Mutation
  [Mutations.SET_DELETE_BANKES](data: number) {
    this.error = [];
    console.log('payload', data);
    this.banks = this.banks.filter(admin => admin.id !== data);
    console.log('state.AllAdmins', this.banks);
  }
  
   //update admin
   @Mutation[Mutations.SET_UPDATE_Banks](data){
    this.error = [];
    this.data_Add = {};
    this.data_Add = data;
     console.log("data.id == ",data.id);
     const index =  this.banks.findIndex(item => item.id === data.id);
     if (index !== -1) this.banks.splice(index, 1, data);
      }  
  /////////////////////////////////////////////////
  //action   

  //All areas 
  @Action
  async [Actions.ALLBANKS]() {
    ApiService.setHeader();
    return await new Promise<void>((resolve, reject) => {
      ApiService.get("/admincp/banks_cusomer")
        .then(({ data }) => {
          console.log("the data ", data);
          this.context.commit(Mutations.SET_Banks, data.data);
          resolve();
        }).catch((response) => {
          console.log("response.errors.error", response.errors.error)
          this.context.commit(Mutations.SET_ERROR_BANKS, response.errors.error);
          reject();
        });
    });
  }
  
  @Action
  async [Actions.SHOWBANKS](id) {
    ApiService.setHeader();
    return await new Promise<void>((resolve, reject) => {
      ApiService.get("/admincp/banks_cusomer/"+id)
        .then(({ data }) => {
          console.log("the data ", data);
          this.context.commit(Mutations.SET_SHOW_Banks, data.data);
          resolve();
        }).catch((response) => {
          console.log("response.errors.error", response.errors.error)
          this.context.commit(Mutations.SET_ERROR_BANKS, response.errors.error);
          reject();
        });
    });
  }
  
  //delete area
  @Action
  [Actions.Delete_BANKES](data: number) {
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.delete('admincp/banks_cusomer/' + data)
        .then((response) => {
          console.log('response', response);
          this.context.commit(Mutations.SET_DELETE_BANKES, response);
          resolve();
        }).catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR_BANKS, response.data.error);
          reject();
        });
    });
  }
  

  //add banke 
  @Action
  [Actions.ADD_BANK](data) {
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.post('admincp/banks_cusomer', data)
        .then((response) => {
          console.log('response', response);
          this.context.commit(Mutations.NEW_ADD_BANK, response.data.data);
          resolve();
        }).catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR_BANKS, response.data.errors);
          reject();
        });
    })
  }
  
  //add UPDATE_BANK 
  @Action
  async [Actions.UPDATE_BANK](payload) {
    console.log("payload", payload);
    const ID = payload['key1'];
    const data = payload['key2'];
    console.log("data",data);
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.put(`admincp/banks_cusomer/${ID}`, data)
        .then((response) => {
          console.log('response', response);
          this.context.commit(Mutations.SET_UPDATE_Banks, response.data.data);
          resolve();
        }).catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR_BANKS, response.data.errors);
          reject();
        });
    })
  }
}