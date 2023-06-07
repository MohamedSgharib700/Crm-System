import { createStore } from "vuex";
import { config } from "vuex-module-decorators";

import AuthModule from "@/store/modules/AuthModule";
import BodyModule from "@/store/modules/BodyModule";
import BreadcrumbsModule from "@/store/modules/BreadcrumbsModule";
import ConfigModule from "@/store/modules/ConfigModule";
import AreasModules from "@/store/modules/AreasModules";
import RolesModules from "@/store/modules/RolesModules";
import CompaniesModules from "@/store/modules/CompaniesModules";
import BranchesModules from "@/store/modules/BranchesModules";
import CitiesModules from "@/store/modules/CitiesModules";
import ManagerModule from "@/store/modules/ManagerModule";
import BanksModules from "@/store/modules/BanksModules";
import ServicesModule from "@/store/modules/ServicesModule";
import PosusersModule from "@/store/modules/PosusersModule";


config.rawError = true;

const store = createStore({
  modules: {
    AuthModule,
    BodyModule,
    BreadcrumbsModule,
    ConfigModule,
    AreasModules,
    RolesModules,
    CompaniesModules,
    BranchesModules,
    CitiesModules,
    ManagerModule,
    BanksModules,
    ServicesModule,
    PosusersModule
   
  },
});

export default store;
