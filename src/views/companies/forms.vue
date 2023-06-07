<template>
  <div
    class="modal fade show"
    id="kt_modal_update_customer"
    ref="updateCustomerModalRef"
    tabindex="-1"
    aria-modal="true"
    style="display: block; background: rgb(20 20 20 / 28%)"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_update_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder" v-if="idUpdateCompany !== undefined">
            تعديل بيانات شركة
          </h2>
          <h2 class="fw-bolder" v-if="idUpdateCompany === undefined">
            أضف شركة
          </h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_update_customer_close"
            data-bs-dismiss="modal"
            @click="ShowData_close"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form
          @submit.prevent="submit()"
          :model="formData"
          :rules="rules"
          ref="formRef"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_update_customer_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_update_customer_header"
              data-kt-scroll-wrappers="#kt_modal_update_customer_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2"
                  >المدير التنفيذى</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="owner_id">
                  <!-- <el-input
                    v-model="formData.owner_id"
                    type="text"
                    placeholder=""
                  /> -->
                  <el-select
                    v-model="formData.owner_id"
                    filterable
                    :filter-method="filterOptions"
                  >
                    <el-option
                      v-for="option in managers"
                      :key="option.id"
                      :value="option.id"
                      :label="option.name"
                    />
                  </el-select>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">المدير المالى</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="finance_manager_id">
                  <el-select
                    v-model="formData.finance_manager_id"
                    filterable
                    :filter-method="filterOptions"
                  >
                    <el-option
                      v-for="option in managers"
                      :key="option.id"
                      :value="option.id"
                      :label="option.name"
                    />
                  </el-select>
                </el-form-item>

                <!--end::Input-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">الاسم</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="name">
                  <el-input
                    v-model="formData.name"
                    type="text"
                    placeholder=""
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">رقم الضريبى</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="tax_number">
                  <el-input
                    v-model="formData.tax_number"
                    type="text"
                    placeholder=""
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2"
                  >commercial_register</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="commercial_register">
                  <el-input
                    v-model="formData.commercial_register"
                    type="text"
                    placeholder=""
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">

            <!--begin::Button-->
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary"
              type="submit"
            >
              <span v-if="!loading" class="indicator-label">
                حفظ
                <span class="svg-icon svg-icon-3 ms-2 me-0">
                  <inline-svg src="icons/duotune/arrows/arr064.svg" />
                </span>
              </span>
              <span v-if="loading" class="indicator-progress">
                انتظر.....
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
            <!--begin::Button-->
            <button
              type="reset"
              id="kt_modal_update_customer_cancel"
              class="btn btn-light me-3"
            >
              إلغاء
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, computed } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useStore } from "vuex";
import { ICompanies_forms } from "@/store/modules/CompaniesModules";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "add-customer-modal",
  components: {},
  props: ["idUpdateCompany"],
  emits: ["enlargeText","enlargeText_close"],
  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const formRef = ref<null | HTMLFormElement>(null);
    const updateCustomerModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = reactive<ICompanies_forms>({
      owner_id: undefined,
      finance_manager_id: undefined,
      name: "",
      tax_number: "",
      commercial_register: "",
    });

    let managers = computed(() => store.getters.getManager);
    console.log("manager = ", managers.value);
    console.log("props.idUp", props.idUpdateCompany);
    if (props.idUpdateCompany != undefined) {
      const admins = store.getters.GetCOMPANIES;
      const selectadmin = admins.find(
        (admin) => admin.id == props.idUpdateCompany
      );
      console.log("selectadmin", selectadmin);
      if (selectadmin) {
        formData.owner_id = selectadmin.owner.id;
        formData.finance_manager_id = selectadmin.finance_manager.id;
        formData.name = selectadmin.name;
        formData.tax_number = selectadmin.tax_number;
        formData.commercial_register = selectadmin.commercial_register;
      }
    }
    const rules = ref({
      owner_id: [
        {
          required: true,
          message: "يجب ادخال المدير التنفيذى",
          trigger: "change",
        },
      ],
      finance_manager_id: [
        {
          required: true,
          message: "يجب ادخال المدير المالى",
          trigger: "change",
        },
      ],
      name: [
        {
          required: true,
          message: "يجب ادخال الاسم",
          trigger: "change",
        },
      ],
      tax_number: [
        {
          required: true,
          message: "يجب ادخال رقم الضريبى  ",
          trigger: "change",
        },
      ],
      commercial_register: [
        {
          required: true,
          message: "يجب ادخال رقم التجارى  ",
          trigger: "change",
        },
      ],
    });

    const submit = async () => {
      if (!formRef.value) {
        return;
      }
      formRef.value.validate((valid) => {
        if (valid) {
          console.log("formData.tax", formData.tax_number.length);
          if (formData.tax_number.length == 15) {
            if (formData.commercial_register.length == 15) {
              requestFun();
            } else {
              // Swal.fire({
              //   text: "Sorry, commercial_register Must be 10 numbers",
              //   icon: "error",
              //   buttonsStyling: false,
              //   confirmButtonText: "Ok, got it!",
              //   customClass: {
              //     confirmButton: "btn btn-primary",
              //   },
              // });
              store.commit(Mutations.SET_ERROR_COMPANIES, {
                error:"سجل التجارى الضريبى يجب ان يكون 15 رقم"
                });
        ShowData();
            }
          } else {
              store.commit(Mutations.SET_ERROR_COMPANIES, {
                error:"رقم الضريبى يجب ان يكون 15 رقم"
                });
        ShowData();
          }
        } else {
          return false;
        }
      });
    };
    const requestFun = async () => {
      loading.value = true;
      console.log(formData);
      try {
        if (props.idUpdateCompany == undefined) {
          await store.dispatch(Actions.ADD_COMPANY, {
            owner_id: formData.owner_id,
            finance_manager_id: formData.finance_manager_id,
            name: formData.name,
            tax_number: formData.tax_number,
            commercial_register: formData.commercial_register,
          });
        } else {
          const ID = props.idUpdateCompany;
          const data = {
            owner_id: formData.owner_id,
            finance_manager_id: formData.finance_manager_id,
            name: formData.name,
            tax_number: formData.tax_number,
            commercial_register: formData.commercial_register,
          };
          const payload = { key1: ID, key2: data };
          console.log("payload", payload);
          await store.dispatch(Actions.UPDATE_COMPAINES, payload);
        }
        ShowData();
        loading.value = false;
      } catch {
        ShowData();
        loading.value = false;
      }
    };

    const ShowData = () => {
      console.log("trying");
      context.emit("enlargeText");
    };
    const ShowData_close = (() => {
      console.log("trying");
      context.emit("enlargeText_close");
    });

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      updateCustomerModalRef,
      ShowData,
      managers,
      ShowData_close
    };
  },
});
</script>
<style scoped>
select,
.el-select,
datalist {
  width: 100%;
  height: 42px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}
.option[value="2"] {
  display: none;
}
input[list] {
  width: 100%;
}
option[value="string"] {
  display: none;
}
.datalist-input {
  display: none;
}
</style>
