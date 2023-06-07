import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import { Mutations, Actions } from "@/store/enums/StoreEnums";
import { getModule } from "vuex-module-decorators";
import UserModule from "@/store/modules/UserModule";

const userModule = getModule(UserModule);
// import { getModule } from "vuex-module-decorators";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layout/Layout.vue"),
    children: [
      {
        path: "/my-account",
        name: "account",
        redirect: "/my-account/overview",
        component: () => import("@/views/myaccount/Account.vue"),
        children: [
          {
            path: "overview",
            name: "myaccount-overview",
            component: () => import("@/views/myaccount/Overview.vue"),
            beforeEnter: (to, _, next) => {
              console.log(to.path);
              if (to.path == "/my-account/overview") {
                store.dispatch(Actions.PROFILE).then(() => {
                  next();
                });
              }
            },
          },
          {
            path: "settings",
            name: "myaccount-settings",
            component: () => import("@/views/myaccount/Settings.vue"),
          },
          {
            path: "/my-account/password-old-change",
            name: "password-old-change",
            component: () => import("@/views/myaccount/ChangeOldPassword.vue"),
          },
        ],
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
      },
      {
        path: "/Employees",
        name: "Employees",
        component: () => import("@/views/Employees/index.vue"),
        beforeEnter: (to, _, next) => {
          console.log(to.path);
          store.dispatch(Actions.ALLMANAGER_param).then(() => {
            next();
          });
        },
      },
      {
        path: "/Employees/:idManager",
        name: "Employee-details",
        component: () => import("@/views/Employees/viewDetailes.vue"),
        props: true,
        beforeEnter: (to, _, next) => {
          console.log(to.path);
          console.log("done");
          store.dispatch(Actions.SHOWMANAGER, to.params.idManager).then(() => {
            next();
          });
        },
      },
      {
        path: "/PosUsers",
        name: "PosUsers",
        component: () => import("@/views/PosUsers/index.vue"),
        beforeEnter: (to, _, next) => {
          console.log(to.path);
          store.dispatch(Actions.ALLPOSUSERS).then(() => {
            store.dispatch(Actions.ALLBRANCHES).then(() => {
              store.dispatch(Actions.ALLBRANCHES).then(() => {
                store.dispatch(Actions.PROFILE).then(() => {
                  next();
                });
              });
            });
          });
        },
      },
      {
        path: "/PosUsers/:idPosUsers",
        name: "PosUsers-details",
        component: () => import("@/views/PosUsers/viewDetailes.vue"),
        props: true,
        beforeEnter: (to, _, next) => {
          console.log(to.path);
          console.log("done");
          store
            .dispatch(Actions.SHOWPOSTUSERS, to.params.idPosUsers)
            .then(() => {
              next();
            });
        },
      },
      {
        path: "/PosUsers/:idPosUsers/company/:idCompanay_pos",
        name: "showcompany-details",
        component: () => import("@/views/PosUsers/showcompany.vue"),
        props: true,
        beforeEnter: (to, _, next) => {
          console.log(to.path);
          console.log("done");
          store
            .dispatch(Actions.SHOWPOSTUSERS, to.params.idPosUsers)
            .then(() => {
              next();
            });
        },
      },
      {
        path: "/transactions/successful-transactions",
        name: "successful-transactions",
        component: () =>
          import("@/views/transactions/successfulTransactions/index.vue"),
      },
      {
        path: "/transactions/successful-transaction/:iduser",
        name: "successful-transactions-details",
        component: () =>
          import("@/views/transactions/successfulTransactions/Detailes.vue"),
        props: true,
      },
      {
        path: "/transactions/failed-transactions",
        name: "failed-transaction",
        component: () =>
          import("@/views/transactions/failedTransactions/index.vue"),
      },
      {
        path: "/transactions/failed-transactions/:iduser",
        name: "failed-transactions-details",
        component: () =>
          import("@/views/transactions/failedTransactions/Detailes.vue"),
        props: true,
      },
      {
        path: "/companies",
        name: "companies",
        component: () => import("@/views/companies/index.vue"),
        // beforeEnter: (to, _, next) => {
        //   console.log(to.path);
        //     store.dispatch(Actions.ALLCOMPANIES).then(() => {
        //       store.dispatch(Actions.ALLMANAGER).then(() =>{
        //       next();
        //      });
        //     });
        // },
      },
      {
        path: "/companies/:namepage/:idcompanies",
        name: "companies-details",
        component: () => import("@/views/companies/viewDetailes.vue"),
        props: true,
        // beforeEnter: (to, _, next) => {
        //   console.log(to.path);
        //     console.log("done");
        //     store.dispatch(Actions.SHOWCOMPANIES, to.params.idcompanies).then(() => {
        //       next();
        //     });
        // },
      },

      {
        path: "/companies/:namepage/:idcompanies/branches",
        name: "companies-branches-details",
        component: () => import("@/views/companies/viewDetailes_branches.vue"),
        props: true,
        // beforeEnter: (to, _, next) => {
        //   console.log(to.path);
        //     console.log("done");
        //     store.dispatch(Actions.SHOWCOMPANIES, to.params.idcompanies).then(() => {
        //       next();
        //     });
        // },
      },

      {
        path: "/companies/:namepage/:idcompanies_info/:nameDetaiels/:id_detailes",
        name: "detailesInformation-details",
        component: () => import("@/views/companies/detailesInformation.vue"),
        props: true,
        // beforeEnter: (to, _, next) => {
        //   console.log(to.path);
        //     console.log("done");
        //     store.dispatch(Actions.SHOWCOMPANIES, to.params.idcompanies_info).then(() => {
        //       next();
        //     });
        // },
      },
      {
        path: "/companies/:namepage/:idcompanies/branch/:id_branch/manager/:manager_id",
        name: "detailes_bracheInformation-details",
        component: () =>
          import("@/views/companies/detailes_bracheInformation.vue"),
        props: true,
        // beforeEnter: (to, _, next) => {
        //   console.log(to.path);
        //     console.log("done");
        //     store.dispatch(Actions.SHOWCOMPANIES, to.params.idcompanies).then(() => {
        //       next();
        //     });
        // },
      },
      {
        path: "/companies/:namepage/:idcompanies/branch/:id_branch/pos_users",
        name: "detailes_branche_pos-details",
        component: () => import("@/views/companies/pos_users.vue"),
        props: true,
        // beforeEnter: (to, _, next) => {
        //   console.log(to.path);
        //     console.log("done");
        //     store.dispatch(Actions.SHOWCOMPANIES, to.params.idcompanies).then(() => {
        //       next();
        //     });
        // },
      },
      {
        path: "/companies/:namepage/:idcompanies/branch/:id_branch/pos_users/:id_detailes_pos_user",
        name: "detailes_pos_user_company",
        component: () => import("@/views/companies/detailes_pos_user.vue"),
        props: true,
        // beforeEnter: (to, _, next) => {
        //   console.log(to.path);
        //     console.log("done");
        //     store.dispatch(Actions.SHOWCOMPANIES, to.params.idcompanies).then(() => {
        //       next();
        //     });
        // },
      },
      {
        path: "/branches/activated",
        name: "branches_activated",
        component: () => import("@/views/branches/activated/index.vue"),
        beforeEnter: (to, _, next) => {
          console.log(to.path);
          store.dispatch(Actions.ALLBRANCHES).then(() => {
            store.dispatch(Actions.ALLMANAGER).then(() => {
              store.dispatch(Actions.ALLCities).then(() => {
                next();
              });
            });
          });
        },
      },
      {
        path: "/branches/deactivated",
        name: "branches_deactivated",
        component: () => import("@/views/branches/deactivated/index.vue"),
        beforeEnter: (to, _, next) => {
          console.log(to.path);
          store.dispatch(Actions.ALLBRANCHES).then(() => {
            store.dispatch(Actions.ALLMANAGER).then(() => {
              // store.dispatch(Actions.ALLCOMPANIES).then(() =>{
              //   store.dispatch(Actions.ALLCities).then(() =>{
              next();
              //       });
              // });
            });
          });
        },
      },
      {
        path: "/branches/:namepage/:idbranches",
        name: "branches-details",
        component: () => import("@/views/branches/Detailes.vue"),
        props: true,
        beforeEnter: (to, _, next) => {
          console.log(to.path);
          console.log("done");
          store.dispatch(Actions.SHOWBRANCE, to.params.idbranches).then(() => {
            next();
          });
        },
      },
      {
        path: "/branches/:namepage/:id_branch_pos/pos_users",
        name: "branches_pos_users",
        component: () => import("@/views/branches/pos_users.vue"),
        props: true,
        beforeEnter: (to, _, next) => {
          console.log(to.path);
          console.log("done");
          store
            .dispatch(Actions.SHOWBRANCE, to.params.id_branch_pos)
            .then(() => {
              next();
            });
        },
      },
      {
        path: "/branches/:namepage/:idbranches/pos_users/:id_detailes_pos_user",
        name: "detailes_pos_user",
        component: () => import("@/views/branches/detailes_pos_user.vue"),
        props: true,
        beforeEnter: (to, _, next) => {
          console.log(to.path);
          console.log("done");
          store.dispatch(Actions.SHOWBRANCE, to.params.idbranches).then(() => {
            next();
          });
        },
      },
      {
        path: "/branches/:namepage/:idbranches/:nameDetaiels/:id_detailes",
        name: "bracheInformation",
        component: () => import("@/views/branches/bracheInformation.vue"),
        props: true,
        beforeEnter: (to, _, next) => {
          console.log(to.path);
          console.log("done");
          store.dispatch(Actions.SHOWBRANCE, to.params.idbranches).then(() => {
            next();
          });
        },
      },
      {
        path: "/branches/:namepage/:idbranches/company/:id_detailes_company",
        name: "bracheInformation-details",
        component: () =>
          import("@/views/branches/detailes_bracheInformation.vue"),
        props: true,
        beforeEnter: (to, _, next) => {
          console.log(to.path);
          console.log("done");
          store.dispatch(Actions.SHOWBRANCE, to.params.idbranches).then(() => {
            next();
          });
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/components/page-layouts/Auth.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () => import("@/views/authentication/basic-flow/SignIn.vue"),
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () => import("@/views/authentication/basic-flow/SignUp.vue"),
      },
      {
        path: "/password-reset",
        name: "PasswordReset",
        component: () =>
          import("@/views/authentication/basic-flow/PasswordReset.vue"),
        props: true,
      },
      {
        path: "/password-forget",
        name: "password-forget",
        component: () =>
          import("@/views/authentication/basic-flow/PasswordForgot.vue"),
      },
      {
        path: "/password-change",
        name: "password-change",
        component: () =>
          import("@/views/authentication/basic-flow/Changepassword.vue"),
      },
    ],
  },
  {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "404",
    component: () => import("@/views/authentication/Error404.vue"),
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/authentication/Error500.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  // reset config to initial state
  store.commit(Mutations.RESET_LAYOUT_CONFIG);

  // store.dispatch(Actions.VERIFY_AUTH);
  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 200);
});

export default router;
