import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IBranches {
  id: number;
  name: string;
  pos_users: any;
  company:{
    name:string
  };
  city:{
    area:{
    name:string
    }
  },
  created_at:string
}
export interface IBranch_form {
  name: string;
  company_id: number | undefined;
  manager_id: number | undefined;
  city_id: number | undefined;
}
@Module
export default class BranchesModules extends VuexModule {
  error = [];
  Branches: IBranches[] = [];
  Branches_activited: IBranches[] = [];
  Branches_deactived: IBranches[] = [];
  data_Add = {};

  get GetBranches(): IBranches[] {
    return this.Branches;
  }
  get GetBranches_activited(): IBranches[] {
    return this.Branches_activited;
  } get GetBranches_deactived(): IBranches[] {
    return this.Branches_deactived;
  }
  get getErrorBranches() {
    return this.error;
  }
  get getdata_Add_Branches(){
 return this.data_Add;
 }

  @Mutation
  [Mutations.SET_BRANCHES](data) {
    this.error=[];
    this.Branches = [] as IBranches[];
    this.Branches_activited = [] as IBranches[];
    this.Branches_deactived = [] as IBranches[];
    for (const x in data) {
      this.Branches.push(data[x]);
      if(data[x].deactivated_at == null) this.Branches_activited.push(data[x]);
      else this.Branches_deactived.push(data[x]);
    }
    console.log("this.Branches", this.Branches);
  }
  @Mutation
  [Mutations.SET_SHOW_BRANCHES](data) {
    this.error=[];
    this.Branches = [] as IBranches[];
    this.Branches.push(data);
    console.log("this.Branches", this.Branches);
  }
  @Mutation
  [Mutations.SET_ERROR_BRANCHES](error) {
    this.error=[];
    this.error = error;
    console.log("this.error", this.error);
  }
  //delete admin mutation
  @Mutation
  [Mutations.SET_DELETE_BRANCHES](data: number) {
    this.error=[];
    console.log("payload", data);
    this.Branches = this.Branches.filter((admin) => admin.id !== data);
    console.log("state.AllAdmins", this.Branches);
  }

  @Mutation
  [Mutations.NEW_ADD_BRANCHES](data) {
    this.error=[];
    this.data_Add = {};
    this.data_Add = data;
    this.Branches.push(data);
    if(data.deactivated_at == null) this.Branches_activited.push(data);
    else this.Branches_deactived.push(data);
    console.log("this.area ==== ", this.Branches);
  }

  //update Companies
  @Mutation [Mutations.SET_UPDATE_BRANCHES](data) {
    this.error=[];
    this.data_Add = {};
    this.data_Add = data;
    console.log("data.id == ", data.id);
    console.log("this.area ==== ", this.Branches);
    const index = this.Branches.findIndex((item) => item.id === data.id);
    if (index !== -1) this.Branches.splice(index, 1, data);
    //Branches_activited
    if(data.deactivated_at == null) {
    console.log("this.area ==== ", this.Branches_activited);
    const index = this.Branches_activited.findIndex((item) => item.id === data.id);
    if (index !== -1) this.Branches_activited.splice(index, 1, data);
    }
    else{
    //Branches_deactived
    console.log("this.area ==== ", this.Branches_deactived);
    const index = this.Branches_deactived.findIndex((item) => item.id === data.id);
    if (index !== -1) this.Branches_deactived.splice(index, 1, data);
    }
  }

  //All areas
  @Action
  async [Actions.ALLBRANCHES]() {
    ApiService.setHeader();
    return await new Promise<void>((resolve, reject) => {
      ApiService.get("/manager_api/branches")
        .then(({ data }) => {
          console.log("the data ", data);
          this.context.commit(Mutations.SET_BRANCHES, data.data);
          resolve();
        })
        .catch((response) => {
          console.log("response.errors.error", response.errors);
          this.context.commit(
            Mutations.SET_ERROR_BRANCHES,
            response.errors
          );
          reject();
        });
    });
  }
  @Action
  async [Actions.SHOWBRANCE](id) {
    ApiService.setHeader();
    return await new Promise<void>((resolve, reject) => {
      ApiService.get("/manager_api/branches/" + id)
        .then(({ data }) => {
          console.log("the data ", data);
          this.context.commit(Mutations.SET_SHOW_BRANCHES, data.data);
          resolve();
        })
        .catch((response) => {
          console.log("response.errors.error", response.errors);
          this.context.commit(
            Mutations.SET_ERROR_BRANCHES,
            response.errors
          );
          reject();
        });
    });
  }
  //add Companies
  @Action
  [Actions.ADD_BRANCHES](data) {
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.post("manager_api/branches", data)
        .then((response) => {
          console.log("response", response);
          this.context.commit(Mutations.NEW_ADD_BRANCHES, response.data.data);
          resolve();
        })
        .catch(({ response }) => {
        this.context.commit(
          Mutations.SET_ERROR_BRANCHES,
          response.data.errors
        );
          reject();
        });
    });
  }
  //update Companies
  @Action
  async [Actions.UPDATE_BRANCHES](payload) {
    console.log("payload", payload);
    const ID = payload["key1"];
    const data = payload["key2"];
    console.log("data", data);
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.put(`manager_api/branches/${ID}`, data)
        .then((response) => {
          console.log("response", response);
          this.context.commit(Mutations.SET_UPDATE_BRANCHES, response.data.data);
          resolve();
        })
        .catch(({ response }) => {
        this.context.commit(
          Mutations.SET_ERROR_BRANCHES,
          response.data.errors
        );
          reject();
        });
    });
  }

  //delete Companies
  @Action
  [Actions.Delete_BRANCHES](data: number) {
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.delete("manager_api/branches/" + data)
        .then((response) => {
          console.log("response", response);
          this.context.commit(Mutations.SET_DELETE_BRANCHES, response);
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR_BRANCHES, response.data.errors);
        });
    });
  }

}
