/* eslint-disable */
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
export interface User {
  name: string;
  email: string;
  token: string;
}

export interface UserAuthInfo {
  errors: Array<string>;
  user: User;
  isAuthenticated: boolean;
}

@Module
export default class AuthModule extends VuexModule implements UserAuthInfo {
  errors = [];
   user = {} as User;
   profile_info = {} as object;
  isAuthenticated = !!JwtService.getToken();

  /**
   * Get current user object
   * @returns User
   */
  get currentUser(): User {
    this.user.name= JwtService.getName() as string;
    this.user.email= JwtService.getEmail() as string;
    this.user.token= JwtService.getToken() as string;
    return this.user;
  }

  /**
   * Verify user authentication
   * @returns boolean
   */
  get isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }
  get profileInformation(): object {
    return this.profile_info;
  }
  /**
   * Get authentification errors
   * @returns array
   */
  get getErrors(): Array<string> {
    return this.errors;
  }

  @Mutation
  [Mutations.SET_ERROR](error) {
    this.errors = [];
    console.log("the error",error)
    this.errors = error;
  }

  @Mutation
  [Mutations.SET_AUTH](user) {
    this.isAuthenticated = true;
    this.errors = [];
    this.user = user as User;
    JwtService.saveUser(user);
  }

  @Mutation
  [Mutations.SET_USER](user) {
    this.errors = [];
    this.isAuthenticated = true;
    this.user = user;
    JwtService.saveUpdateUser(user);
  }
  @Mutation
  [Mutations.SET_PROFILE](user) {
    this.errors = [];
    this.profile_info = user;
    console.log("PROFILE  this.profile_info : -" , this.profile_info);
  }

  // @Mutation
  // [Mutations.SET_PASSWORD](password) {
  //   this.user.password = password;
  // }

  @Mutation
  [Mutations.PURGE_AUTH]() {
    this.isAuthenticated = false;
    this.user = {} as User;
    this.errors = [];
    JwtService.destroyToken();
  }
  @Mutation
  [Mutations.SET_TOKEN](token) {
    JwtService.saveToken(token);
  }
  @Action
  [Actions.LOGIN](credentials) {
    return new Promise<void>((resolve, reject) => {
      ApiService.post("/manager_api/login", credentials)
        .then(({ data }) => {
          console.log("the data ",data);
          this.context.commit(Mutations.SET_AUTH, data.data);
          resolve();
        }).catch((response) => {
          this.context.commit(Mutations.SET_ERROR, response.errors);
          reject();
        });
    });
  }

  @Action
  [Actions.SIGNUP](credentials) {
    return new Promise<void>((resolve, reject) => {
      ApiService.post("/manager_api/register", credentials)
        .then(({ data }) => {
          console.log("the data ",data);
          this.context.commit(Mutations.SET_AUTH, data.data);
          resolve();
        }).catch(({ response }) => {
          console.log(response.data.errors);
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
          reject();
        });
    });
  }

  @Action
  [Actions.LOGOUT]() {
    ApiService.setHeader();
    //JwtService.destroyToken();
    const token_logout: any = JwtService.getToken();
    console.log("this.user.token",token_logout);
    console.log("this.user.token",this.user.token);
    return new Promise<void>((resolve, reject) => {
      ApiService.get("manager_api/logout")
        .then(({ data }) => {
          console.log("the data ",data);
          this.context.commit(Mutations.PURGE_AUTH);
          resolve();
        })
        .catch(({ response }) => {
          console.log(response.data.errors);
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
          reject();
        });
    });
  }
  @Action
  [Actions.FORGOT_PASSWORD](payload) {
    return new Promise<void>((resolve, reject) => {
      ApiService.post("manager_api/forget_password", payload)
        .then(({ data }) => {
          console.log(data);
          // this.context.commit(Mutations.SET_AUTH, data);
          resolve();
        })
        .catch(({ response }) => {
          console.log(response.data.errors);
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
          reject();
        });
    });
  }

  @Action
  [Actions.RESET_CODE](payload) {
    return new Promise<void>((resolve, reject) => {
      ApiService.post("manager_api/reset_password", payload)
        .then(({ data }) => {
          console.log("resorce",data.data.token);
          this.context.commit(Mutations.SET_TOKEN,data.data.token)
          resolve();
        })
        .catch(({ response }) => {
          console.log(response.data.errors);
          this.context.commit(Mutations.SET_ERROR, response.data.errors.error);
          reject();
        });
    });
  }
  
  @Action
  [Actions.CHANGE_PASS](payload) {
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.post("manager_api/update_forget_password", payload)
        .then(({ data }) => {
          console.log("resorce",data);
          this.context.commit(Mutations.SET_USER, data.data);
          resolve();
        })
        .catch(({ response }) => {
          console.log(response.data.errors);
          this.context.commit(Mutations.SET_ERROR, response.data.errors.error);
          reject();
        });
    });
  }
  
  @Action
  [Actions.CHANGE_OLDPASS](payload) {
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.post("manager_api/change_password", payload)
        .then(({ data }) => {
          console.log("resorce",data);
          resolve();
        })
        .catch(({ response }) => {
          console.log(response.data.errors);
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
          reject();
        });
    });
  }
  // @Action
  // [Actions.VERIFY_AUTH]() {
  //   if (JwtService.getToken()) {
  //     ApiService.setHeader();
  //     ApiService.get("verify")
  //       .then(({ data }) => {
  //         this.context.commit(Mutations.SET_AUTH, data);
  //       })
  //       .catch(({ response }) => {
  //         this.context.commit(Mutations.SET_ERROR, response.data.errors);
  //       });
  //   } else {
  //     this.context.commit(Mutations.PURGE_AUTH);
  //   }
  // }
  @Action
  [Actions.PROFILE]() {
  ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
    ApiService.get("manager_api/profile")
        .then(({ data }) => {
          console.log("the data ",data);
          this.context.commit(Mutations.SET_PROFILE, data.data);
          resolve();
        }).catch((response) => {
          this.context.commit(Mutations.SET_ERROR, response.data.errors.error);
          reject();
        });
      });
}

  @Action
  [Actions.UPDATE_USER](payload) {
    const key =  localStorage.getItem("key");
    console.log(key);
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.patch("manager_api/profile/"+key ,payload)
        .then(({ data }) => {
          this.context.commit(Mutations.SET_USER, data.data);
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
          reject();
        });
    });
  }
}
