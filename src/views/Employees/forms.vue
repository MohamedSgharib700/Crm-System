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
          <h2 class="fw-bolder" v-if="idUpdateManager !== undefined">
            تعديل بيانات موظف
          </h2>
          <h2 class="fw-bolder" v-if="idUpdateManager === undefined">أضف موظف</h2>
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
                <label class="required fs-6 fw-bold mb-2">الأسم</label>
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
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">الأيميل</span>

                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="Email address must be active"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="email">
                  <el-input
                    v-model="formData.email"
                    type="email"
                    autocomplete="true"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">الباسورد</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="password">
                  <el-input
                    v-model="formData.password"
                    type="password"
                    placeholder=""
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">تأكيد الباسورد</label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="password_confirmation">
                  <el-input
                    v-model="formData.password_confirmation"
                    type="password"
                    placeholder=""
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">الموبيل</label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="phone">
                  <el-input
                    v-model="formData.phone"
                    type="tel"
                    placeholder=""
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">رقم الهوية</label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="identification_number">
                  <el-input
                    v-model="formData.identification_number"
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
                <label class="required fs-6 fw-bold mb-2">الوظيفه</label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="roles">
                  <!-- <el-input
                    v-model="formData.roles"
                    type="text"
                    placeholder=""
                  /> -->
                  <el-select
                    v-model="formData.user_type"
                    filterable
                    :filter-method="filterOptions"
                  >
                    <el-option value="branch_manager"/>
                    <el-option value="finance_manager"/>
                    </el-select>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">تاريخ الميلاد</label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="birthdate">
                  <!-- <el-input
                    v-model="formData.roles"
                    type="text"
                    placeholder=""
                  /> -->
                  <el-input
                    v-model="formData.birthdate"
                    type="date"
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
              type="reset"
              id="kt_modal_update_customer_cancel"
              class="btn btn-light me-3"
            >
              إلغاء
            </button>
            <!--end::Button-->

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
                 انتظر...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
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
import UserModule from "@/store/modules/UserModule";
import { IManager_form } from "@/store/modules/ManagerModule";
import { getModule } from "vuex-module-decorators";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "add-customer-modal",
  components: {},
  props: ["idUpdateManager"],
  emits: ["enlargeText","enlargeText_close"],
  setup(props, context) {
    const userModule = getModule(UserModule);
    const store = useStore();
    const router = useRouter();
    const formRef = ref<null | HTMLFormElement>(null);
    const updateCustomerModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = reactive<IManager_form>({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone: "",
      identification_number: "",
      user_type: "",
      birthdate: null,
    });

    let listRole = computed(() => {
      return store.getters.GetRoles;
    });
    console.log("listRole", listRole.value);

    console.log("props.idUp", props.idUpdateManager);
    if (props.idUpdateManager != undefined) {
      const managers = store.getters.getManager;
      const selectmanagers = managers.find(
        (admin) => admin.id == props.idUpdateManager
      );
      console.log("selectadmin", selectmanagers);
      if (selectmanagers) {
        formData.name = selectmanagers.name;
        formData.email = selectmanagers.email;
        formData.password = selectmanagers.password;
        formData.password_confirmation = selectmanagers.password_confirmation;
        formData.phone = selectmanagers.phone;
        formData.identification_number = selectmanagers.identification_number;
        formData.user_type = selectmanagers.user_type;
        formData.birthdate = selectmanagers.birthdate;
      }
    }
    const rules = ref({
      name: [
        {
          required: true,
          message: "الاسم مطلوب",
          trigger: "change",
        },
      ],
      email: [
        {
          required: true,
          message: "الايميل مطلوب",
          trigger: "change",
        },
      ],
      password: [
        {
          required: true,
          message: "الباسورد مطلوب",
          trigger: "change",
        },
      ],
      password_confirmation: [
        {
          required: true,
          message: "تأكيد الباسورد مطلوب",
          trigger: "change",
        },
      ],
      phone: [
        {
          required: true,
          message: "الموبيل مطلوب",
          trigger: "change",
        },
      ],
      identification_number: [
        {
          required: true,
          message: "رقم الهويه مطلوبه",
          trigger: "change",
        },
      ],
      user_type: [
        {
          required: true,
          message: "الوظيفه مطلوبه",
          trigger: "change",
        },
      ],
      birthdate: [
        {
          required: true,
          message: "عيد الميلاد مطلوب",
          trigger: "change",
        },
      ],
    });

    const ShowData = () => {
      console.log("trying");
      context.emit("enlargeText");
    };
    const ShowData_close = () => {
      console.log("trying");
      context.emit("enlargeText_close");
    };
    const submit = async () => {
      if (!formRef.value) {
        return;
      }
      console.log("formData", formData.name);
      formRef.value.validate((valid) => {
        if (valid) {
          if (formData.password.length < 6) {
              console.log("formData password in  = ", formData.password.length);
              store.commit(Mutations.SET_ERROR_Manager, {
                error: "الرقم السرى يجب ان يكون 6 حروف فأكثر ",
              });
              ShowData();
          } else if (formData.password !== formData.password_confirmation) {
              console.log("formData password in  = ", formData.password);
              store.commit(Mutations.SET_ERROR_Manager, {
                error:
                  "يجب ان يكون حقل تأكيد الرقم السرى مساويا لقيمة حقل الرقم السرى",
              });
              ShowData();
          } else {
            requestFun();
          }
        } else {
          return false;
        }
      });
    };
    const requestFun = async () => {
      loading.value = true;
      try {
        if (props.idUpdateManager == undefined) {
          await store.dispatch(Actions.ADD_MANAGER, {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.password_confirmation,
            phone: formData.phone,
            identification_number: formData.identification_number,
            user_type: formData.user_type,
            birthdate: formData.birthdate,
          });
        } else {
          const ID = props.idUpdateManager;
          const data = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.password_confirmation,
            phone: formData.phone,
            identification_number: formData.identification_number,
            user_type: formData.user_type,
            birthdate: formData.birthdate,
          };
          const payload = { key1: ID, key2: data };
          console.log("payload", payload);
          await store.dispatch(Actions.UPDATE_MANAGER, payload);
        }
        ShowData();
        loading.value = false;
      } catch {
        loading.value = false;
        ShowData();
    }
    }
    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      updateCustomerModalRef,
      ShowData,
      listRole,
      ShowData_close
    };
  },
});
</script>
<style scoped lang="scss">
input[type="tel"],
input[type="url"],
input[type="email"],
input[type="number"] {
  text-align: right;
  direction: rtl;
}
select,
.el-select {
  width: 100%;
  height: 42px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}
</style>
