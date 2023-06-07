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
            placeholder="بحث عن شجل تجاري"
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
          <!--begin::Export-->
          <!-- <button
            type="button"
            class="btn btn-light-primary me-3"
            data-bs-toggle="modal"
            data-bs-target="#kt_customers_export_modal"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr078.svg" />
            </span>
            Export
          </button> -->
          <!--end::Export-->

          <!--begin::Add customer-->
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_customer"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotone/Navigation/Plus.svg" />
            </span>
            إضاف تقرير
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
        <template v-slot:cell-email="{ row: customer }">
          <a href="#" class="text-gray-600 text-hover-primary mb-1">
            {{ customer.email }}
          </a>
        </template>
        <template v-slot:cell-roles="{ row: customer }">
          <a href="#" class="text-gray-600 text-hover-primary mb-1">
            {{ customer.roles }}
          </a>
        </template>
        <template v-slot:cell-actions="{ row: customer }">
          <a
            href="#"
            class="btn btn-sm btn-light btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
            >الانشطة
            <span class="svg-icon svg-icon-5 m-0">
              <inline-svg src="media/icons/duotune/arrows/arr072.svg" />
            </span>
          </a>
          <!--begin::Menu-->
          <div
            class="
              menu
              menu-sub
              menu-sub-dropdown
              menu-column
              menu-rounded
              menu-gray-600
              menu-state-bg-light-primary
              fw-bold
              fs-7
              w-125px
              py-4
            "
            data-kt-menu="true"
          >
            <!--begin::Menu item-->
            <div class="menu-item px-3">
              <router-link :to="viewLink(customer.id)" class="menu-link px-3"
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
                @click="viewLinkUpdate(customer.id)"
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

  <span v-if="loading" class="indicator-progress">
    Please wait...
    <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
  </span>
  <ExportCustomerModal></ExportCustomerModal>
  <AddCustomerModal />
  <div v-if="UpdateCustomer === true">
    <UpdateCustomerModal :idUpdate="idUpdate" @enlargeText="onEnlargeText" />
  </div>
  <div>{{ UpdateCustomer }}</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import ExportCustomerModal from "@/components/modals/forms/ExportCustomerModal.vue";
import AddCustomerModal from "@/components/modals/forms/AddCustomerModal.vue";
import UpdateCustomerModal from "@/components/modals/forms/UpdateCustomerModal.vue";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ICustomer } from "@/store/modules/UserModule";
// import { getModule } from "vuex-module-decorators";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "Users-listing",
  components: {
    Datatable,
    ExportCustomerModal,
    AddCustomerModal,
    UpdateCustomerModal,
  },
  setup() {
    // const userModule = getModule(USERS);
    const store = useStore();
    const router = useRouter();
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
        name: "الميل",
        key: "email",
        sortable: true,
      },
      {
        name: "وظيفة",
        key: "roles",
        sortable: true,
      },
      {
        name: "الانشطة",
        key: "actions",
      },
    ]);
    let list = computed(() => store.getters.GetUsers);
    let viewLink = (id) => {
      return "/reports/transactions/" + id;
    };
    // const viewLinkUpdate = (id) => {
    //   idUpdate.value = id;
    //   console.log("idUpdate.value", idUpdate.value);
    // };

    // watch(idUpdate, () => {
    //   UpdateCustomer.value = true;
    //   console.log("idUpdate.value", UpdateCustomer.value);
    // });
    const tableData = ref<Array<ICustomer>>(list.value);
    const initCustomers = ref<Array<ICustomer>>([]);
    onMounted(() => {
      MenuComponent.reinitialization();
      setCurrentPageBreadcrumbs("Users Listing", ["Apps", "Users"]);
      initCustomers.value.splice(0, tableData.value.length, ...tableData.value);
    });

    const deleteFewCustomers = () => {
      checkedCustomers.value.forEach((item) => {
        deleteCustomer(item);
      });
      checkedCustomers.value.length = 0;
    };

    const deleteCustomer = async (id) => {
      loading.value = true;
      try {
        await store.dispatch(Actions.Delete_Admin, id);
        for (let i = 0; i < tableData.value.length; i++) {
          if (tableData.value[i].id === id) {
            tableData.value.splice(i, 1);
          }
        }
        loading.value = false;
      } catch {
        Swal.fire({
          text: store.getters.getErrorUsers,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });

        loading.value = false;
      }
    };

    const search = ref<string>("");
    const searchItems = () => {
      tableData.value.splice(0, tableData.value.length, ...initCustomers.value);
      if (search.value !== "") {
        let results: Array<ICustomer> = [];
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

    onMounted(() => {
      store.getters.GetUsers;
    });

    return {
      tableData,
      tableHeader,
      deleteCustomer,
      search,
      searchItems,
      checkedCustomers,
      deleteFewCustomers,
      viewLink,
      // viewLinkUpdate,
      // idUpdate : idUpdate.value,
      // UpdateCustomer: UpdateCustomer.value,
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
    viewLinkUpdate(id) {
      this.idUpdate = id;
      console.log("idUpdate.value", this.idUpdate);
      this.UpdateCustomer = true;
      console.log("idUpdate.value", this.UpdateCustomer);
    },
  },
});
</script>
<style scoped>
.card .card-header .card-title {
  width: auto;
}
</style>
