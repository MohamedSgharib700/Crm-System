import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface ICities {
  id: number,
  name: string,
  area:{
    name:string
  }
}
export interface ICities_forms {
  id: number,
  name: {
    ar: string,
    en: string
  },
  area_id:number | undefined
}

@Module
export default class CitiesModules extends VuexModule {
  error = [];
  Cities: ICities[] = [];
  data_Add = {};

  get GetCities(): ICities[] {
    return this.Cities;
  }
  get getErrorcities() {
    return this.error;
  }
  get getdata_Add_cities(){
    return this.data_Add;
  }
  @Mutation
  [Mutations.SET_ALLCities](data) {
    this.Cities = [] as ICities[];
    for (const x in data) {
      this.Cities.push(data[x]);
    }
    console.log("this.Cities", this.Cities);
  }
  @Mutation
  [Mutations.SET_ERROR_Cities](error) {
    this.error = error;
    console.log("this.error", this.error);
  }
//delete admin mutation
@Mutation
[Mutations.SET_DELETE_CITIES](data: number) {
  this.error = [];
  console.log('payload', data);
  this.Cities = this.Cities.filter(admin => admin.id !== data);
  console.log('state.AllAdmins', this.Cities);
}
@Mutation
[Mutations.SET_SHOW_CITIES](data) {
  this.error = [];
  this.Cities = [] as ICities[];
    this.Cities.push(data);
  console.log("this.Cities", this.Cities);
}
@Mutation
[Mutations.NEW_ADD_CITIES](data){
 this.error = [];
 this.data_Add = {};
 this.data_Add = data;
    this.Cities.push(data);
    console.log('this.Cities ==== ', this.Cities);
 }

//update admin
@Mutation[Mutations.SET_UPDATE_CITIES](data){
 this.error = [];
 this.data_Add = {};
 this.data_Add = data;
  console.log("data.id == ",data.id);
  const index =  this.Cities.findIndex(item => item.id === data.id);
  if (index !== -1) this.Cities.splice(index, 1, data);
   }  
  /////////////////////////////////////////////////
  //action   

  //All areas 
  @Action
  async [Actions.ALLCities]() {
    ApiService.setHeader();
    return await new Promise<void>((resolve, reject) => {
      ApiService.get("/manager_api/cities")
        .then(({ data }) => {
          console.log("the data ", data);
          this.context.commit(Mutations.SET_ALLCities, data.data);
          resolve();
        }).catch((response) => {
          console.log("response.errors", response.errors)
          this.context.commit(Mutations.SET_ERROR_Cities, response.errors);
          reject();
        });
    });
  }
    //delete area
    @Action
    [Actions.Delete_CITIES](data: number) {
      ApiService.setHeader();
      return new Promise<void>((resolve, reject) => {
        ApiService.delete('admincp/cities_cusomer/' + data)
          .then((response) => {
            console.log('response', response);
            this.context.commit(Mutations.SET_DELETE_CITIES, response);
            resolve();
          }).catch(({ response }) => {
            this.context.commit(Mutations.SET_ERROR_Cities, response.data.errors);
          });
      });
    }
    @Action
    async [Actions.SHOWCITIES](id) {
      ApiService.setHeader();
      return await new Promise<void>((resolve, reject) => {
        ApiService.get("/admincp/cities_cusomer/"+id)
          .then(({ data }) => {
            console.log("the data ", data);
            this.context.commit(Mutations.SET_SHOW_CITIES, data.data);
            resolve();
          }).catch((response) => {
            console.log("response.errors.error", response.errors)
            this.context.commit(Mutations.SET_ERROR_Cities, response.errors);
            reject();
          });
      });
    }

    @Action
    [Actions.IMPORT_CITIES](fd) {
      console.log("hello");
      ApiService.setHeaderfile();
      return new Promise<void>((resolve, reject) => {
        ApiService.post('admincp/import_cities', fd)
          .then((response) => {
            console.log('response', response);
            resolve();
          }).catch(({ response }) => {
           console.log('response', response.data.code);
              this.context.commit(Mutations.SET_ERROR_Cities, response.data.errors);
            reject();
          });
      })
    }
    
  //add admin 
  @Action
  [Actions.ADD_CITIES](data) {
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.post('admincp/cities_cusomer', data)
        .then((response) => {
          console.log('response', response);
          this.context.commit(Mutations.NEW_ADD_CITIES, response.data.data);
          resolve();
        }).catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR_Cities, response.data.errors);
          reject();
        });
    })
  }
  //add update 
  @Action
  async [Actions.UPDATE_CITIES](payload) {
    console.log("payload", payload);
    const ID = payload['key1'];
    const data = payload['key2'];
    console.log("data",data);
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.put(`admincp/cities_cusomer/${ID}`, data)
        .then((response) => {
          console.log('response', response);
          this.context.commit(Mutations.SET_UPDATE_CITIES, response.data.data);
          resolve();
        }).catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR_Cities, response.data.errors);
          reject();
        });
    })
  }
}
