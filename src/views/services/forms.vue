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
          <h2 class="fw-bolder" v-if="idUpdateServices !== undefined">
            تعديل بيانات مدينه
          </h2>
          <h2 class="fw-bolder" v-if="idUpdateServices === undefined">أضف مدينه</h2>
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
                <label class="required fs-6 fw-bold mb-2">الإسم مقدم خدمه بالعربى</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="name.ar">
                  <el-input
                    v-model="formData.name.ar"
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
                انتظر....
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
import { defineComponent, ref, reactive, onMounted ,computed} from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useStore } from "vuex";
import { ISERVICES_forms } from "@/store/modules/ServicesModule";
import { Actions } from "@/store/enums/StoreEnums";
import { useRouter } from "vue-router";
import { number } from "yup/lib/locale";

export default defineComponent({
  name: "add-customer-modal",
  components: {},
  props: ["idUpdateServices"],
  emits: ["enlargeText","enlargeText_close"],
  setup(props,context) {
    const store = useStore();
    const router = useRouter();
    const formRef = ref<null | HTMLFormElement>(null);
    const updateCustomerModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = reactive<ISERVICES_forms>({
      id: props.idUpdateServices,
      name:{
      ar: "",
      en: "",
      },
    });
    console.log("props.idUp", props.idUpdateServices);
    if (props.idUpdateServices != undefined) {
    let services = computed(() => store.getters.GetServices);
      const selectServices = services.value.find((admin) => admin.id == props.idUpdateServices);
      console.log("selectServices", selectServices);
      if (selectServices) {
        formData.name.ar = selectServices.name;
        formData.name.en = selectServices.name;
      }
    }
    const rules = ref({
     name:{
           ar: [
        {
          required: true,
          message: "الاسم مدينه مطلوب بالعربى",
          trigger: "change",
        },
      ],
      en: [
        {
          required: true,
          message: "services name English is required",
          trigger: "change",
        },
      ],
     },
    });

    const submit = async () => {
      if (!formRef.value) {
        return;
      }
      formRef.value.validate((valid) => {
          if (valid) {
            requestFun();
          } else {
            return false;
          }
        });
    };
    const requestFun = async () => {
      loading.value = true;
        try {
          if( props.idUpdateServices == undefined){
            await store.dispatch(Actions.ADD_SERVICES ,{  
              name:{
                  ar: formData.name.ar,
                  en: formData.name.ar,
              },
            });
          }
          else{
          const ID = formData.id;
          const data = {
              name:{
                  ar: formData.name.ar,
                  en: formData.name.ar,
              },
          };
          const payload = { key1: ID, key2: data };
          console.log("payload", payload);
          await store.dispatch(Actions.UPDATE_SERVICES, payload);
          }
           ShowData();
            loading.value = false;
        } catch {
          loading.value = false;
           ShowData();

        }
    
    };

    const ShowData = (() => {
      console.log("trying");
      context.emit("enlargeText");
    });
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
      ShowData_close,
    };
  },
});
</script>

<style scoped>
select,
.el-select {
  width: 100%;
  height: 42px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}
</style>