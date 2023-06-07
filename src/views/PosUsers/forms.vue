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
          <h2 class="fw-bolder" v-if="idUpdatePosUsers !== undefined">
            تعديل حساب لنقاط البيع
          </h2>
          <h2 class="fw-bolder" v-if="idUpdatePosUsers === undefined">أضف حساب لنقاط البيع</h2>
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

                <el-form-item prop="branch_id">
                <!--begin::Input-->
                 <el-select
                  placeholder="اسم الفرع"
                  filterable
                  :filter-method="filterOptions"
                  v-model="formData.branch_id"
                >
                  <el-option
                    v-for="option in branches"
                    :key="option.id"
                    :value="option.id"
                    :label="option.name"
                  />
                </el-select>
                <!--end::Input-->
                </el-form-item>
              </div>
              <!--end::Input group-->
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
import { IPosUsers_Form } from "@/store/modules/PosusersModule";
import { getModule } from "vuex-module-decorators";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "add-customer-modal",
  components: {},
  props: ["idUpdatePosUsers"],
  emits: ["enlargeText","enlargeText_close"],
  setup(props, context) {
    const userModule = getModule(UserModule);
    const store = useStore();
    const router = useRouter();
    const formRef = ref<null | HTMLFormElement>(null);
    const updateCustomerModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = reactive<IPosUsers_Form>({
      branch_id: undefined,
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone: "",
      identification_number: "",
      serial_number: "",
      serial_code: "",
    });

    let branches = computed(() => store.getters.GetBranches);
    console.log("branches = ", branches.value);
    const profile = computed(() => store.getters.profileInformation);
    console.log("profile = ", profile.value);

    console.log("props.idUpdatePosUsers", props.idUpdatePosUsers);
    if (props.idUpdatePosUsers != undefined) {
      const postusers = store.getters.getPosUsers;
      const selectPosusers = postusers.find(
        (admin) => admin.id == props.idUpdatePosUsers
      );
      console.log("selectadmin", selectPosusers);
      if (selectPosusers) {
        formData.branch_id = selectPosusers.branch.id;
        formData.name = selectPosusers.name;
        formData.email = selectPosusers.email;
        formData.password = selectPosusers.password;
        formData.password_confirmation = selectPosusers.password_confirmation;
        formData.phone = selectPosusers.phone;
        formData.identification_number = selectPosusers.identification_number;
        formData.serial_number = selectPosusers.serial_number;
        formData.serial_code = selectPosusers.serial_code;
      }
    }
    const rules = ref({
      branch_id: [
        {
          required: true,
          message: "الفرع مطلوب",
          trigger: "change",
        },
      ],
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
              store.commit(Mutations.SET_ERROR_POSUSERS, {
                error: "الرقم السرى يجب ان يكون 6 حروف فأكثر ",
              });
              ShowData();
          } else if (formData.password !== formData.password_confirmation) {
              console.log("formData password in  = ", formData.password);
              store.commit(Mutations.SET_ERROR_POSUSERS, {
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
        if (props.idUpdatePosUsers == undefined) {
          console.log("profile =" ,profile.value.company_id);
          await store.dispatch(Actions.Add_ADD_POSUSERS, {
            company_id : profile.value.company_id,
            branch_id : formData.branch_id,
            name: formData.name,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.password_confirmation,
            phone: formData.phone,
            identification_number: formData.identification_number,
            serial_number: "654554",
            serial_code: "454654",
          });
        } else {
          const ID = props.idUpdatePosUsers;
          const data = {
            company_id : profile.value.company_id,
            branch_id : formData.branch_id,
            name: formData.name,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.password_confirmation,
            phone: formData.phone,
            identification_number: formData.identification_number,
            serial_number: formData.serial_number,
            serial_code: formData.serial_code,
          };
          const payload = { key1: ID, key2: data };
          console.log("payload", payload);
          await store.dispatch(Actions.UPDATE_POSUSERS, payload);
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
      branches,
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
