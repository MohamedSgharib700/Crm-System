<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <span class="svg-icon svg-icon-1 position-absolute ms-6">
            <inline-svg src="media/icons/duotune/general/gen021.svg" />
          </span>
          <input
            type="text"
            v-model="search"
            @input="searchItems()"
            class="form-control form-control-solid w-250px ps-15"
            placeholder="بحث"
          />
        </div>
        <!--end::Search-->
      </div>
      <!--begin::Card title-->
    </div>
    <div class="card-body pt-0">
      <Datatable
        :table-data="tableData"
        :table-header="tableHeader"
        :enable-items-per-page-dropdown="true"
      >
        <template v-slot:cell-checkbox="slotProps">
          <div
            class="form-check form-check-sm form-check-custom form-check-solid"
          >
            <input
              class="form-check-input"
              type="checkbox"
              :value="slotProps.row.id"
              v-model="checkedCustomers"
            />
          </div>
        </template>
        <template v-slot:cell-name="{ row: customer }">
          {{ customer.name }}
        </template>
        <template v-slot:cell-manager="{ row: customer }">
          <router-link :to="viewLinkDetailes(customer.id,customer.manager.id,namepage)">{{ customer.manager.name }}</router-link>
        </template>
        <template v-slot:cell-city="{ row: customer }">
          {{ customer.city.name.ar }}
        </template>

        <template v-slot:cell-pos_users="{ row: customer }">
           <router-link :to="viewLinkDetailes_pos(customer.id,namepage)"  v-if="customer.pos_users.length !== 0"
           class="btn btn-sm btn-light btn-active-light-primary"
            >حسابات نقاط البيع
          </router-link>
          <span class="btn btn-sm btn-light btn-active-light-primary" v-else>لا يوجد pos  لهذا الفرع</span>
        </template>
      </Datatable>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { ICompanies } from "@/store/modules/CompaniesModules";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "Users-listing",
  components: {
    Datatable,
  },
  props:['idcompanies','namepage'],
  setup(props) {
    const store = useStore();
    const checkedCustomers = ref([]);
    // const UpdateCustomer = ref<boolean>(true);
    const loading = ref<boolean>(false);
    // const idUpdate = ref(null);
    const tableHeader = ref([
      {
        key: "checkbox",
      },
      {
        name: "الاسم",
        key: "name",
        sortable: true,
      },
      {
        name: "المدير",
        key: "manager",
        sortable: true,
      },
      {
        name: "المدينه",
        key: "city",
        sortable: true,
      },   
      {
        name: " الحسابات",
        key: "pos_users",
      },
    ]);
    let list = computed(() => store.getters.GetCOMPANIES);
     let viewLinkDetailes = (id,manager_id,namepage) => {
      return "/companies/"+ namepage+'/'+props.idcompanies +"/branch/"+ id +"/manager/"+manager_id;
    };
    let viewLinkDetailes_pos = (id,namepage) => {
      return "/companies/"+ namepage+'/'+props.idcompanies +"/branch/"+id + '/pos_users';
    };
    const tableData = ref<Array<ICompanies>>(list.value[0].branches);
    console.log("tableData = ",tableData.value);
    const initCustomers = ref<Array<ICompanies>>([]);
    onMounted(() => {
      MenuComponent.reinitialization();
      
      if(props.namepage == 'commercial_register'){
      setCurrentPageBreadcrumbs("الشركات", [
        "/companies/commercial_register",
          "قائمه سجل التجارى",
        "تفاصيل الفروع"]);
      }
      else if(props.namepage == 'freelance-documents'){
      setCurrentPageBreadcrumbs("الشركات", [
        "/companies/freelance-documents",
          "قائمه وثائق العمل الحر",
        "تفاصيل الفروع"]);
      }
      else if(props.namepage == 'celebrity'){
      setCurrentPageBreadcrumbs("الشركات", [
        "/companies/celebrity",
          "قائمه المشاهير",
        "تفاصيل الفروع"]);
      }
      initCustomers.value.splice(0, tableData.value.length, ...tableData.value);
    });

    const search = ref<string>("");
    const searchItems = () => {
      tableData.value.splice(0, tableData.value.length, ...initCustomers.value);
      if (search.value !== "") {
        let results: Array<ICompanies> = [];
        for (let j = 0; j < tableData.value.length; j++) {
          if (searchingFunc(tableData.value[j].name, search.value)) {
            results.push(tableData.value[j]);
          }
        }
        tableData.value.splice(0, tableData.value.length, ...results);
      }
    };

    const searchingFunc = (obj, value): boolean => {
      for (let key in obj) {
        if (!Number.isInteger(obj[key]) && !(typeof obj[key] === "object")) {
          if (obj[key].indexOf(value) != -1) {
            return true;
          }
        }
      }
      return false;
    };

    return {
      tableData,
      tableHeader,
      search,
      searchItems,
      checkedCustomers,
      viewLinkDetailes,
      viewLinkDetailes_pos
    };
  },

  data() {
    return {
      UpdateCustomer: false,
      idUpdate: null,
    };
  },
  methods: {
    onEnlargeText() {
      console.log("enlarging text");
      this.UpdateCustomer = false;
      console.log(this.UpdateCustomer);
    },
    viewForms(id) {
      this.idUpdate = id;
      console.log("idUpdate.value", this.idUpdate);
      this.UpdateCustomer = true;
      console.log("idUpdate.value", this.UpdateCustomer);
    },
  },
});
</script>
<style scoped>
.text-end {
  position: relative;
}
.menu {
  position: absolute;
}
.card .card-header .card-title {
  width: auto;
}
.user_page {
  position: relative;
}
.page-loader {
  display: block;
  position: absolute;
  background: #ffffffb0;
}
.spinner-border {
  margin: 25% 50%;
}
.upload_file_button {
  position: relative;
  overflow: hidden;
}
.upload_file_button input {
  position: absolute;
  width: 100%;
  right: 0px;
  opacity: 0;
}
.message_import {
  margin-top: 10px;
  color: #767676;
}
</style>
