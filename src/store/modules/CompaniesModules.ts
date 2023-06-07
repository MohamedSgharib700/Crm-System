import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface ICompanies {
  id: number;
  name: string;
  tax_number: string;
  commercial_register: string;
  deactivated_at:any
}

export interface ICompanies_forms {
  owner_id: number | undefined;
  finance_manager_id: number | undefined;
  name: string;
  tax_number: string;
  commercial_register: string;
}
@Module
export default class CompaniesModules extends VuexModule {
  error = [];
  Companies: ICompanies[] = [];
  Companies_comm: ICompanies[] = [];
  Companies_freelance: ICompanies[] = [];
  Companies_celebrity: ICompanies[] = [];
  data_Add = {};

  get GetCOMPANIES(): ICompanies[] {
    console.log("this.Companies.get == ",this.Companies);
    return this.Companies;
  }
  get GetCompanies_comm(): ICompanies[] {
    return this.Companies_comm;
  } 
  get GetCompanies_freelance(): ICompanies[] {
    return this.Companies_freelance;
  }
  get GetCompanies_celebrity(): ICompanies[] {
    return this.Companies_celebrity;
  }
  get getErrorCOMPANIES() {
    return this.error;
  }
  get getdata_Add_commpany(){
    return this.data_Add;
  }
  @Mutation
  [Mutations.SET_COMPANIES](data) {
    this.error = [];
    this.Companies_comm = [] as ICompanies[];
    this.Companies_freelance = [] as ICompanies[];
    this.Companies_celebrity = [] as ICompanies[];
    for (const x in data) {
      this.Companies.push(data[x]);
      if(data[x].type == "commercial_register") this.Companies_comm.push(data[x]);
      if(data[x].type == "freelance")  this.Companies_freelance.push(data[x]);
      else this.Companies_celebrity.push(data[x]);
    }
    console.log("this.users", this.Companies);
  }
  @Mutation
  [Mutations.SET_SHOW_COMPANIES](data) {
    this.error = [];
    this.Companies = [] as ICompanies[];
    this.Companies.push(data);
    console.log("this.area", this.Companies);
  }
  @Mutation
  [Mutations.SET_ERROR_COMPANIES](error) {
    this.error = [];
    console.log("this::error", error);
    this.error = [];
    this.error = error;
    console.log("this.error", this.error);
  }
  //delete admin mutation
  @Mutation
  [Mutations.SET_DELETE_COMPANIES](data: number) {
    this.error = [];
    console.log("payload", data);
    this.Companies = this.Companies.filter((admin) => admin.id !== data);
    console.log("state.AllAdmins", this.Companies);
  }

  @Mutation
  [Mutations.NEW_ADD_Companies](data) {
    this.error = [];
    this.data_Add = {};
    this.data_Add = data;
    // if(data.deactivated_at == null) this.Companies_activited.push(data);
    // else this.Companies_deactived.push(data);
    this.GetCOMPANIES.push(data);
  }

   //update Companies
   @Mutation[Mutations.SET_UPDATE_COMPAINES](data){
    this.error = [];
    this.data_Add = {};
    this.data_Add = data;
    console.log("this.data ==== ", data);
    console.log("data.id == ",data.id);
    const index =  this.Companies.findIndex(item => item.id === data.id);
    if (index !== -1) this.Companies.splice(index, 1, data);
    //Branches_activited
    // if(data.deactivated_at == null) {
    //   console.log("this.area ==== ", this.Companies_activited);
    //   const index = this.Companies_activited.findIndex((item) => item.id === data.id);
    //   if (index !== -1) this.Companies_activited.splice(index, 1, data);
    //   }
    //   else{
    //   //Branches_deactived
    //   console.log("this.area ==== ", this.Companies_deactived);
    //   const index = this.Companies_deactived.findIndex((item) => item.id === data.id);
    //   if (index !== -1) this.Companies_deactived.splice(index, 1, data);
    //   }
     }  



  ///////////////////////////////////////////////////////////

  //All Companies
  @Action
  async [Actions.ALLCOMPANIES]() {
    ApiService.setHeader();
    return await new Promise<void>((resolve, reject) => {
      ApiService.get("/admincp/companies_cusomer")
        .then(({ data }) => {
          console.log("the data ", data);
          this.context.commit(Mutations.SET_COMPANIES, data.data);
          resolve();
        })
        .catch((response) => {
          console.log("response.errors.error", response.errors);
          this.context.commit(
            Mutations.SET_ERROR_COMPANIES,
            response.errors.error
          );
          reject();
        });
    });
  }

  //show Companies
  @Action
  async [Actions.SHOWCOMPANIES](id) {
    ApiService.setHeader();
    return await new Promise<void>((resolve, reject) => {
      ApiService.get("/manager_api/my/company/" + id)
        .then(({ data }) => {
          console.log("the data ", data);
          this.context.commit(Mutations.SET_SHOW_COMPANIES, data.data);
          resolve();
        })
        .catch((response) => {
          console.log("response.errors.error", response.errors);
          this.context.commit(
            Mutations.SET_ERROR_COMPANIES,
            response.errors.error
          );
          reject();
        });
    });
  }

  //delete Companies
  @Action
  [Actions.Delete_COMPANIES](data: number) {
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.delete("admincp/companies_cusomer/" + data)
        .then((response) => {
          console.log("response", response);
          this.context.commit(Mutations.SET_DELETE_COMPANIES, response);
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR_AREA,response.data.errors);
        });
    });
  }

  //add Companies
  @Action
  [Actions.ADD_COMPANY](data) {
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.post("admincp/companies_cusomer", data)
        .then((response) => {
          console.log("response", response);
          this.context.commit(Mutations.NEW_ADD_Companies, response.data.data);
          resolve();
        })
        .catch(({ response }) => {
        this.context.commit(
          Mutations.SET_ERROR_COMPANIES,
          response.data.errors
        );
          reject();
        });
    });
  }

  //update Companies
  @Action
  async [Actions.UPDATE_COMPAINES](payload) {
    console.log("payload", payload);
    const ID = payload["key1"];
    const data = payload["key2"];
    console.log("data", data);
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.put(`admincp/companies_cusomer/${ID}`, data)
        .then((response) => {
          console.log("response", response);
          this.context.commit(Mutations.SET_UPDATE_COMPAINES, response.data.data);
          resolve();
        })
        .catch(({ response }) => {
        this.context.commit(
          Mutations.SET_ERROR_COMPANIES,
          response.data.errors
        );
          reject();
        });
    });
  }

}
