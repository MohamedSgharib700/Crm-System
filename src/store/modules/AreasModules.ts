import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IAreas {
  id: number,
  name: string
}
export interface IAreas_forms {
  id: number,
  name: {
    ar: string,
    en: string
  }
}

@Module
export default class AreasModules extends VuexModule {
  error = [];
  areas: IAreas[] = [];
  filedownload:any;
  data_Add = {};

  get GetAreas(): IAreas[] {
    return this.areas;
  }
  get getErrorAreas() {
    return this.error;
  }
  get GetEXPORT_AREAS(): IAreas[] {
    return this.filedownload;
  }

  get getdata_Add_Area(){
    return this.data_Add;
  }

  @Mutation
  [Mutations.SET_Area](data) {
    this.error = [];
    this.areas = [] as IAreas[];
    for (const x in data) {
      this.areas.push(data[x]);
    }
    console.log("this.users", this.areas);
  }

  @Mutation
  [Mutations.SET_SHOW_AREA](data) {
    this.error = [];
    this.areas = [] as IAreas[];
      this.areas.push(data);
    console.log("this.area", this.areas);
  }
  @Mutation
  [Mutations.SET_ERROR_AREA](error) {
    this.error = [];
    this.error = error;
    console.log("this.error", this.error);
  }


  //delete areas
  @Mutation
  [Mutations.SET_DELETE_AREA](data: number) {
    this.error = [];
    console.log('payload', data);
    this.areas = this.areas.filter(admin => admin.id !== data);
    console.log('state.AllAdmins', this.areas);
  }
   //export admin mutation
   @Mutation
   [Mutations.SET_EXPORT_AREAS](data: any) {
    this.error = [];
    this.filedownload = data;
     console.log('payload', data);
     
   }
   @Mutation
   [Mutations.NEW_ADD_AREA](data){
    this.error = [];
    this.data_Add = {};
    this.data_Add = data;
       this.areas.push(data);
       console.log('this.area ==== ', this.areas);
    }

   //update admin
   @Mutation[Mutations.SET_UPDATE_Area](data){
    this.error = [];
    this.data_Add = {};
    this.data_Add = data;
     console.log("data.id == ",data.id);
     const index =  this.areas.findIndex(item => item.id === data.id);
     if (index !== -1) this.areas.splice(index, 1, data);
      }  
  /////////////////////////////////////////////////
  //action   

  //All areas 
  @Action
  async [Actions.ALLAREA]() {
    ApiService.setHeader();
    return await new Promise<void>((resolve, reject) => {
      ApiService.get("/admincp/areas_cusomer")
        .then(({ data }) => {
          console.log("the data ", data);
          this.context.commit(Mutations.SET_Area, data.data);
          resolve();
        }).catch((response) => {
          console.log("response.errors.error", response.errors.error)
          this.context.commit(Mutations.SET_ERROR_AREA, response.errors.error);
          reject();
        });
    });
  }

  //delete area
  @Action
  [Actions.Delete_Area](data: number) {
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.delete('admincp/areas_cusomer/' + data)
        .then((response) => {
          console.log('response', response);
          this.context.commit(Mutations.SET_DELETE_AREA, response);
          resolve();
        }).catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR_AREA, response.data.errors);
        });
    });
  }

  //add admin 
  @Action
  [Actions.ADD_AREA](data) {
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.post('admincp/areas_cusomer', data)
        .then((response) => {
          console.log('response', response);
          this.context.commit(Mutations.NEW_ADD_AREA, response.data.data);
          resolve();
        }).catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR_AREA, response.data.errors);
          reject();
        });
    })
  }
  //add update 
  @Action
  async [Actions.UPDATE_AREA](payload) {
    console.log("payload", payload);
    const ID = payload['key1'];
    const data = payload['key2'];
    console.log("data",data);
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.put(`admincp/areas_cusomer/${ID}`, data)
        .then((response) => {
          console.log('response', response);
          this.context.commit(Mutations.SET_UPDATE_Area, response.data.data);
          resolve();
        }).catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR_AREA, response.data.errors);
          reject();
        });
    })
  }

  //add EXPORT_AREAS 
  // @Action
  // async [Actions.EXPORT_AREAS]() {
  //   ApiService.setHeaderexport();
  //   return await new Promise<void>((resolve, reject) => {
  //     ApiService.get("admincp/export_areas")
  //       .then(({ data }) => {
  //         console.log("the data ", data);
  //         this.context.commit(Mutations.SET_EXPORT_AREAS, data);
  //         resolve();
  //       }).catch((response) => {
  //         console.log("response.errors.error", response.errors.error)
  //         this.context.commit(Mutations.SET_ERROR_AREA, response.errors.message);
  //         reject();
  //       });
  //   });
  // }
   //add admin 
   @Action
   [Actions.IMPORT_AREAS](fd) {
     console.log("hello");
     ApiService.setHeaderfile();
     return new Promise<void>((resolve, reject) => {
       ApiService.post('admincp/import_areas', fd)
         .then((response) => {
           console.log('response', response);
           resolve();
         }).catch(({ response }) => {
          console.log('response', response.data.code);
          if(response.data.code == 404){
            if(response.data.errors.file){
           this.context.commit(Mutations.SET_ERROR_AREA, response.data.errors);
            }else{
           this.context.commit(Mutations.SET_ERROR_AREA,
             `The name_ar field is required. The name_en field is required.`);
            }
          }
           reject();
         });
     })
   }

   @Action
   async [Actions.SHOWAREA](id) {
     ApiService.setHeader();
     return await new Promise<void>((resolve, reject) => {
       ApiService.get("/admincp/areas_cusomer/"+id)
         .then(({ data }) => {
           console.log("the data ", data);
           this.context.commit(Mutations.SET_SHOW_AREA, data.data);
           resolve();
         }).catch((response) => {
           console.log("response.errors.error", response.errors)
           this.context.commit(Mutations.SET_ERROR_AREA, response.errors);
           reject();
         });
     });
   }

}
