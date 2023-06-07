<template>
  <div class="card" >
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
        <template v-slot:cell-email="{ row: customer }">
         {{ customer.email }}
        </template>
        <template v-slot:cell-phone="{ row: customer }">
          {{ customer.phone }}
        </template>
        
        <template v-slot:cell-actions="{ row: customer }">
          <a
            href="#"
            class="btn btn-sm btn-light btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
            >الأدوات
            <span class="svg-icon svg-icon-5 m-0">
              <inline-svg src="media/icons/duotune/arrows/arr072.svg" />
            </span>
          </a>
          <!--begin::Menu-->
          <div
            class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
            data-kt-menu="true"
          >
            <!--begin::Menu item-->
            <div class="menu-item px-3">
             
          <router-link :to="viewLink(customer.id,namepage)">تفاصيل</router-link
              >
            </div>
            <!--end::Menu item-->
            <!--begin::Menu item-->
            <div class="menu-item px-3">
              <a
                >معاملات</a
              >
            </div>
            <!--end::Menu item-->
          </div>
          <!--end::Menu-->
        </template>
      </Datatable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, reactive } from "vue";
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
  props:['idcompanies','id_branch','namepage'],
  setup(props) {
    const store = useStore();
    const checkedCustomers = ref([]);
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
        name: "إيميل",
        key: "email",
        sortable: true,
      },
      {
        name: "الموبيل",
        key: "phone",
        sortable: true,
      },
      // {
      //   name: "serial_number",
      //   key: "serial_number",
      //   sortable: true,
      // },
      // {
      //   name: "serial_code",
      //   key: "serial_code",
      //   sortable: true,
      // },
      // {
      //   name: "identification_number",
      //   key: "identification_number",
      //   sortable: true,
      // },
      // {
      //   name: "created_at",
      //   key: "created_at",
      //   sortable: true,
      // },
      {
        name: "الأدوات",
        key: "actions",
      },

    ]);
    let list = computed(() => store.getters.GetCOMPANIES);
    const information = list.value[0].branches.find((branche) => branche.id == props.id_branch);
    console.log("information",information);
    const tableData = ref<Array<ICompanies>>(information.pos_users);
    console.log("tableData = ",tableData.value);
    const initCustomers = ref<Array<ICompanies>>([]);
    onMounted(() => {
      MenuComponent.reinitialization();
      
      if(props.namepage == 'commercial_register'){
      setCurrentPageBreadcrumbs("الشركات", [
        "/companies/commercial_register",
          "قائمه سجل التجارى",
        "تفاصيل الفروع","تفاصيل حساب نقاط البيع"]);
      }
      else if(props.namepage == 'freelance-documents'){
      setCurrentPageBreadcrumbs("الشركات", [
        "/companies/freelance-documents",
          "قائمه وثائق العمل الحر",
        "تفاصيل الفروع","تفاصيل حساب نقاط البيع"]);
      }
      else if(props.namepage == 'celebrity'){
      setCurrentPageBreadcrumbs("الشركات", [
        "/companies/celebrity",
          "قائمه المشاهير",
        "تفاصيل الفروع","تفاصيل حساب نقاط البيع"]);
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
      let viewLink = (id,namepage) => {
      return "/companies/"+namepage+'/'+props.idcompanies+"/branch/"+props.id_branch+"/pos_users/"+ id;
    };
    return {
      tableData,
      tableHeader,
      search,
      searchItems,
      checkedCustomers,
      viewLink
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
<style scoped lang="scss">
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
.menu-item a{    
    width: 100%;
    display: inline-block;
    padding: 5px ;
    text-align: right;
    cursor: pointer;
}
.card {
  .card-header {
    border: 0px;
    h3 {
      font-size: 28px;
      color: #000000;
      padding: 40px 0px;
    }
  }
  .card-body {
    .data {
      width: 45%;
      display: inline-block;
      padding-top: 0rem !important;
      .row {
        width: 100%;
        background: #f4f7fe;
        padding: 25px 30px;
        border-radius: 8px;
        margin-bottom: 13px;
        label {
          font-size: 20px;
          font-weight: bold;
          color: #686868;
        }
        span {
          font-size: 20px;
          color: #000000;
          font-weight: bold;
          a:hover {
            color: #000000;
          }
        }
      }
      .row_branch {
        background: #d11388;
        width: 40%;
        height: 50px;
        padding: 13px 0px;
        a {
          font-size: 18px;
          color: #ffffff;
          padding: 0px;
          margin: 0px;
          padding: 0px;
          text-align: center;
        }
      }
    }
    .img_page {
      width: 55%;
      display: inline-block;
      vertical-align: top;
      text-align: center;
      img {
        vertical-align: top;
        width: 344px;
        height: 439px;
      }
    }
  }
}
</style>
