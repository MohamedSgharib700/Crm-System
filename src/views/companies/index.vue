<template>
  <div class="user_page">
    <div class="alert alert-danger" role="alert" v-if="error_show">
      <ul>
        <li v-for="err in error" :key="err.id">{{ err }}</li>
      </ul>
    </div>
    <div class="alert alert-success" role="alert" v-if="Process_success">
      تم عمليه {{ success_action }} بنجاح
    </div>
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
              placeholder="بحث عن شركة"
            />
          </div>
          <!--end::Search-->
        </div>
        <!--begin::Card title-->
        <!--begin::Card toolbar-->
        <div class="card-toolbar">
          <!--begin::Toolbar-->
          <div
            v-if="checkedCustomers.length === 0"
            class="d-flex justify-content-end"
            data-kt-customer-table-toolbar="base"
          >
            <!--end::Toolbar-->

            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                نوع الشركه
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a class="dropdown-item" @click="choose_company('done')"
                    >مفعله</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" @click="choose_company('No_done')"
                    >غير مفعله</a
                  >
                </li>
              </ul>
            </div>
            <!--begin::Add customer-->
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_add_customer"
              @click="viewForms(undefined)"
            >
              <span class="svg-icon svg-icon-2">
                <inline-svg src="media/icons/duotone/Navigation/Plus.svg" />
              </span>
              إضاف شركة
            </button>
            <!--end::Add customer-->
          </div>
          <!--end::Toolbar-->
          <!--begin::Group actions-->
          <div
            v-else
            class="d-flex justify-content-end align-items-center"
            data-kt-customer-table-toolbar="selected"
          >
            <div class="fw-bolder me-5">
              <span class="me-2">{{ checkedCustomers.length }}</span
              >إختيار
            </div>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteFewCustomers()"
            >
              مسح ما تم إختياره
            </button>
          </div>
          <!--end::Group actions-->
          <!--begin::Group actions-->
          <div
            class="d-flex justify-content-end align-items-center d-none"
            data-kt-customer-table-toolbar="selected"
          >
            <div class="fw-bolder me-5">
              <span
                class="me-2"
                data-kt-customer-table-select="selected_count"
              ></span
              >إختيار
            </div>
            <button
              type="button"
              class="btn btn-danger"
              data-kt-customer-table-select="delete_selected"
            >
              مسح ما تم إختياره
            </button>
          </div>
          <!--end::Group actions-->
        </div>
        <!--end::Card toolbar-->
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
          <template v-slot:cell-tax_number="{ row: customer }">
            {{ customer.tax_number }}
          </template>
          <template v-slot:cell-created_at="{ row: customer }">
            {{ customer.created_at }}
          </template>

          <template v-slot:cell-actions="{ row: customer }">
            <a
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
                <router-link
                  :to="viewLink(customer.id, 'commercial_register')"
                  class="menu-link px-3"
                  >تفاصيل</router-link
                >
              </div>
              <!--end::Menu item-->
              <!--begin::Menu item-->
              <div class="menu-item px-3">
                <a @click="deleteCustomer(customer.id)" class="menu-link px-3"
                  >حذف</a
                >
              </div>
              <!--end::Menu item-->
              <!--begin::Menu item-->
              <div class="menu-item px-3">
                <a
                  data-bs-toggle="modal"
                  data-bs-target="#kt_modal_update_customer"
                  class="menu-link px-3"
                  @click="viewForms(customer.id)"
                  >تعديل</a
                >
              </div>
              <!--end::Menu item-->
            </div>
            <!--end::Menu-->
          </template>
        </Datatable>
      </div>
    </div>

    <div class="page-loader" v-if="loading">
      <span class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </span>
    </div>
    <div v-if="UpdateCustomer === true">
      <FormsCustomerModal
        :idUpdateCompany="idUpdate"
        @enlargeText="onEnlargeText"
        @enlargeText_close="onEnlargeText_close"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
// import ExportCustomerModal from "@/components/modals/forms/ExportCustomerModal.vue";
import FormsCustomerModal from "./forms.vue";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ICompanies } from "@/store/modules/CompaniesModules";
import { Actions } from "@/store/enums/StoreEnums";
import axios from "axios";
import FileSaver from "file-saver";

export default defineComponent({
  name: "Users-listing",
  components: {
    Datatable,
    // ExportCustomerModal,
    FormsCustomerModal,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const checkedCustomers = ref([]);
    // const UpdateCustomer = ref<boolean>(true);
    const loading = ref<boolean>(false);
    const UpdateCustomer = ref<boolean>(false);
    const delete_success = ref<boolean>(false);
    const Process_success = ref<boolean>(false);
    const error_show = ref<boolean>(false);
    const error = ref([]);
    const idUpdate = ref(undefined);
    const success_action = ref("");
    const tableHeader = ref([
      {
        key: "checkbox",
      },
      {
        name: "الاسم",
        key: "name",
        sortable: true,
      },
      // {
      //   name: "المدير التنفيذى",
      //   key: "owner",
      //   sortable: true,
      // },
      // {
      //   name: "المدير المالى",
      //   key: "finance",
      //   sortable: true,
      // },
      {
        name: "رقم الضريبى",
        key: "tax_number",
        sortable: true,
      },
      {
        name: "تاريخ الانشاء",
        key: "created_at",
        sortable: true,
      },
      {
        name: "الأدوات",
        key: "actions",
      },
    ]);
    let list = computed(() => store.getters.GetCOMPANIES);
    let tableData = ref<Array<ICompanies>>(list.value);

    const choose_company = (type) => {
      console.log("type", type);
      let results: Array<ICompanies> = [];
      if (type == "done") {
        tableData.value.splice(
          0,
          tableData.value.length,
          ...initCustomers.value
        );
        for (let j = 0; j < tableData.value.length; j++) {
          if (tableData.value[j].deactivated_at == null) {
            results.push(tableData.value[j]);
          }
        }
        tableData.value.splice(0, tableData.value.length, ...results);
      } else {
        tableData.value.splice(
          0,
          tableData.value.length,
          ...initCustomers.value
        );
        for (let j = 0; j < tableData.value.length; j++) {
          if (tableData.value[j].deactivated_at !== null) {
            results.push(tableData.value[j]);
          }
        }
        tableData.value.splice(0, tableData.value.length, ...results);
      }
    };
    let viewLink = (id, namepage) => {
      return "/companies/" + namepage + "/" + id;
    };
    const initCustomers = ref<Array<ICompanies>>([]);
    onMounted(() => {
      MenuComponent.reinitialization();
      setCurrentPageBreadcrumbs("الشركات", [
        "/companies/commercial_register",
        "قائمه سجل التجارى",
      ]);
      initCustomers.value.splice(0, tableData.value.length, ...tableData.value);
    });

    const deleteFewCustomers = () => {
      checkedCustomers.value.forEach((item) => {
        deleteCustomer(item);
      });
      checkedCustomers.value.length = 0;
    };

    const deleteCustomer = (id) => {
      loading.value = true;
      Swal.fire({
        text: "تأكيد عمليه الحذف",
        icon: "error",
        confirmButtonText: "حذف",
        cancelButtonText: "إلغاء",
        showCloseButton: true,
        showCancelButton: true,
        customClass: {
          confirmButton: "btn btn-danger",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            store.dispatch(Actions.Delete_COMPANIES, id);
            for (let i = 0; i < tableData.value.length; i++) {
              if (tableData.value[i].id === id) {
                tableData.value.splice(i, 1);
              }
            }
            loading.value = false;
            Process_success.value = true;
            success_action.value = "الحذف";
          } catch {
            loading.value = false;
            error.value = store.getters.getErrorCOMPANIES;
            if (error.value.length !== 0) {
              console.log("error.value.length", error.value.length);
              error_show.value = true;
            }
          }
          window.scrollTo(0, 0);
          setTimeout(() => {
            Process_success.value = false;
            error_show.value = false;
            success_action.value = "";
          }, 3000);
        }
      });
    };
    const search = ref<string>("");
    const searchItems = () => {
      tableData.value.splice(0, tableData.value.length, ...initCustomers.value);
      if (search.value !== "") {
        let results: Array<ICompanies> = [];
        for (let j = 0; j < tableData.value.length; j++) {
          if (searchingFunc(tableData.value[j], search.value)) {
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

    const onEnlargeText = () => {
      console.log("enlarging text");
      UpdateCustomer.value = false;
      console.log(UpdateCustomer.value);
      error.value = store.getters.getErrorCOMPANIES;
      console.log("error.value == ", error.value);
      if (error.value.length !== 0) {
        error_show.value = true;
      }
      if (error.value.length == 0) {
        Process_success.value = true;
        let data = store.getters.getdata_Add_commpany;
        if (idUpdate.value == undefined) {
          success_action.value = "الإضافه";
          let select = tableData.value.find((admin) => admin.id == data.id);
          console.log("hello select", select);
          console.log("hello select");
          if (!select) {
            console.log("hello select", data);
            tableData.value.push(data);
          }
        } else if (idUpdate.value !== undefined) {
          for (let i = 0; i < tableData.value.length; i++) {
            if (tableData.value[i].id === idUpdate.value) {
              if (i !== -1) tableData.value.splice(i, 1, data);
            }
          }
          success_action.value = "التعديل";
        }
      }
      window.scrollTo(0, 0);
      setTimeout(() => {
        Process_success.value = false;
        error_show.value = false;
      }, 3000);
    };
    const onEnlargeText_close = () => {
      console.log("enlarging text");
      UpdateCustomer.value = false;
    };
    const viewForms = (id) => {
      idUpdate.value = id;
      console.log("idUpdate.value", idUpdate.value);
      UpdateCustomer.value = true;
      console.log("idUpdate.value", UpdateCustomer.value);
      Process_success.value = false;
      success_action.value = "";
    };
    return {
      tableData,
      tableHeader,
      deleteCustomer,
      search,
      searchItems,
      checkedCustomers,
      deleteFewCustomers,
      viewLink,
      choose_company,
      delete_success,
      loading,
      error,
      idUpdate,
      UpdateCustomer,
      viewForms,
      onEnlargeText,
      success_action,
      Process_success,
      onEnlargeText_close,
      error_show,
    };
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
.dropdown {
  margin: 0px 10px;
}
.dropdown ul {
  left: -20px;
  top: 2px;
}
.dropdown ul li {
  cursor: pointer;
}
</style>
