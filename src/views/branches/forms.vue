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
          <h2 class="fw-bolder" v-if="idUpdateBranch !== undefined">
            تعديل بيانات فرع
          </h2>
          <h2 class="fw-bolder" v-if="idUpdateBranch === undefined">
            أضف فرغ 
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
                <label class="required fs-6 fw-bold mb-2">المدير المالى</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="manager_id">
                  <!-- <el-input
                    v-model="formData.finance_manager_id"
                    type="text"
                    placeholder=""
                  /> -->
                  <el-select
                    v-model="formData.manager_id"
                    filterable
                    :filter-method="filterOptions"
                  >
                    <el-option
                      v-for="manager in managers"
                      :key="manager.id"
                      :value="manager.id"
                      :label="manager.name"
                    />
                  </el-select>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">المدينه</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="city_id">
                  <el-select
                    v-model="formData.city_id"
                    filterable
                    :filter-method="filterOptions"
                  >
                    <el-option
                      v-for="city in cities"
                      :key="city.id"
                      :value="city.id"
                      :label="city.name"
                    />
                  </el-select>
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
import { IBranch_form } from "@/store/modules/BranchesModules";
import { Actions } from "@/store/enums/StoreEnums";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "add-customer-modal",
  components: {},
  props: ["idUpdateBranch"],
  emits: ["enlargeText","enlargeText_close"],
  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const formRef = ref<null | HTMLFormElement>(null);
    const updateCustomerModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = reactive<IBranch_form>({
      name: "",
      company_id: undefined,
      manager_id: undefined,
      city_id: undefined,
    });
    let managers = computed(() => store.getters.getManager);
    console.log("manager = ", managers.value);
    let cities = computed(() => store.getters.GetCities);
    console.log("companies = ", cities.value);
    console.log("props.idUp", props.idUpdateBranch);
    if (props.idUpdateBranch != undefined) {
      const Branches = store.getters.GetBranches;
      console.log("props.idUp", Branches);
      const selectBranches = Branches.find(
        (admin) => admin.id == props.idUpdateBranch
      );
      console.log("selectBranches", selectBranches);
      if (selectBranches) {
        formData.name = selectBranches.name;
        formData.company_id = selectBranches.company.id;
        formData.manager_id = selectBranches.manager.id;
        formData.city_id = selectBranches.city.id;
      }
    }
    const rules = ref({
      name: [
        {
          required: true,
          message: "يجب ادخال الاسم",
          trigger: "change",
        },
      ],
      company_id: [
        {
          required: true,
          message: "يجب ادخال اسم الشركة   ",
          trigger: "change",
        },
      ],
      manager_id: [
        {
          required: true,
          message: "يجب ادخال المدير  ",
          trigger: "change",
        },
      ],
      city_id: [
        {
          required: true,
          message: "يجب ادخال البلد  ",
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
          requestFun();
        } else {
          return false;
        }
      });
    };
    const requestFun = async () => {
      loading.value = true;
      console.log(formData);
      try {
        if (props.idUpdateBranch == undefined) {
          await store.dispatch(Actions.ADD_BRANCHES, {
            name: formData.name,
            company_id: formData.company_id,
            manager_id: formData.manager_id,
            city_id: formData.city_id,
          });
        } else {
          const ID = props.idUpdateBranch;
          const data = {
            name: formData.name,
            company_id: formData.company_id,
            manager_id: formData.manager_id,
            city_id: formData.city_id,
          };
          const payload = { key1: ID, key2: data };
          console.log("payload", payload);
          await store.dispatch(Actions.UPDATE_BRANCHES, payload);
        }
        ShowData();
        loading.value = false;
      } catch {
        loading.value = false;
        ShowData();
      }
    };

    const ShowData = () => {
      console.log("trying");
      context.emit("enlargeText");
    };
  const ShowData_close = () => {
      console.log("trying");
      context.emit("enlargeText_close");
    };
    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      updateCustomerModalRef,
      ShowData,
      managers,
      ShowData_close,
      cities
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
