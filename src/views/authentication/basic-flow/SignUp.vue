<template>
  <div class="user_page">
    <div class="alert alert-danger" role="alert" v-if="error_show">
      <ul>
        <li v-for="err in error" :key="err.id">{{ err }}</li>
      </ul>
    </div>
  <!--begin::Wrapper-->
  <div class="bg-white rounded shadow-sm p-10 p-lg-15 mx-auto ">
    <!--begin::Form-->
    <Form
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      novalidate="novalidate"
      @submit="onSubmitRegister"
      id="kt_login_signup_form"
      :validation-schema="registration"
    >
      <!--begin::Heading-->
      <div class="mb-10 text-center">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">تسجيل حساب جديد</h1>
        <!--end::Title-->
      </div>
      <!--begin::Separator-->
      <!-- <div class="d-flex align-items-center mb-10">
        <div class="border-bottom border-gray-300 mw-50 w-100"></div>
        <span class="fw-bold text-gray-400 fs-7 mx-2">OR</span>
        <div class="border-bottom border-gray-300 mw-50 w-100"></div>
      </div> -->
      <!--end::Separator-->

      <!--begin::Input group-->
      <div class="row fv-row mb-5">
          <label class="form-label fw-bolder text-dark fs-6">الاسم</label>
          <Field
            class="form-control form-control-lg form-control-solid"
            type="text"
            placeholder=""
            name="name"
            autocomplete="off"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="name" />
            </div>
          </div>
        <!--end::Col-->

      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-5">
        <label class="form-label fw-bolder text-dark fs-6">الايميل</label>
        <Field
          class="form-control form-control-lg form-control-solid"
          type="email"
          placeholder=""
          name="email"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="mb-5 fv-row" data-kt-password-meter="true">
        <!--begin::Wrapper-->
        <div class="mb-1">
          <!--begin::Label-->
          <label class="form-label fw-bolder text-dark fs-6"> كلمة السر </label>
          <!--end::Label-->

          <!--begin::Input wrapper-->
          <div class="position-relative mb-3">
            <Field
              class="form-control form-control-lg form-control-solid"
              type="password"
              placeholder=""
              name="password"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="password" />
              </div>
            </div>
          </div>
          <!--end::Input wrapper-->
        </div>
        <!--end::Wrapper-->
      </div>
      <!--end::Input group--->

      <!--begin::Input group-->
      <div class="fv-row mb-5">
        <label class="form-label fw-bolder text-dark fs-6"
          >تأكيد كلمة السر</label
        >
        <Field
          class="form-control form-control-lg form-control-solid"
          type="password"
          placeholder=""
          name="password_confirmation"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password_confirmation" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-5">
        <label class="form-label fw-bolder text-dark fs-6"
          > الهاتف</label
        >
        <Field
          class="form-control form-control-lg form-control-solid"
          type="tel"
          placeholder=""
          name="phone"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="phone" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-5">
        <label class="form-label fw-bolder text-dark fs-6"
          >رقم الهويه</label
        >
        <Field
          class="form-control form-control-lg form-control-solid"
          type="text"
          placeholder=""
          name="identification_number"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="identification_number" />
          </div>
        </div>
      </div>
      <!--end::Input group-->
      <!--begin::Input group-->
      <div class="fv-row mb-5">
        <label class="form-label fw-bolder text-dark fs-6"
          >تاريخ الميلاد</label
        >
        <Field
          class="form-control form-control-lg form-control-solid"
          type="date"
          placeholder=""
          name="birthdate"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="birthdate" />
          </div>
        </div>
      </div>
      <!--end::Input group-->
      <!--begin::Input group-->
      <div class="fv-row mb-5">
        <label class="form-label fw-bolder text-dark fs-6"
          >رقم التسجيل التجاري</label
        >
        <Field
          class="form-control form-control-lg form-control-solid"
          type="text"
          placeholder=""
          name="commercial_registration_number"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="commercial_registration_number" />
          </div>
        </div>
      </div>
      <!--end::Input group-->
      <!--begin::Input group-->
      <div class="fv-row mb-5">
        <label class="form-label fw-bolder text-dark fs-6"
          >الرقم الضريبي</label
        >
        <Field
          class="form-control form-control-lg form-control-solid"
          type="text"
          placeholder=""
          name="tax_number"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="tax_number" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <button
          id="kt_sign_up_submit"
          ref="submitButton"
          type="submit"
          class="btn btn-lg btn-primary me-4"
        >
          <span  v-if="!loading">تسجيل</span>

          <span class="indicator-progress" v-if="loading">
            من فضلل انتظر...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
          <router-link
          to="/sign-in"
          class="btn btn-lg btn-light-primary fw-bolder"
          >إلغاء</router-link
        >
      </div>
      <!--end::Actions-->
    </Form>
    <!--end::Form-->
  </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as Yup from "yup";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.min.js";

export default defineComponent({
  name: "sign-up",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const error_show = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const error = ref("");

    const submitButton = ref<HTMLElement | null>(null);

    const registration = Yup.object().shape({
      name: Yup.string().required().label("اسم مطلوب"),
      email: Yup.string().min(4).required().email().label("الايميل مطلوب"),
      password: Yup.string().min(4).required().label("كلمه المرور مطلوبه"),
      password_confirmation: Yup.string()
        .min(4)
        .required()
        .oneOf([Yup.ref("password"), null], "يجب ان يشتابه كلمه المرور")
        .label("تأكيد كلمه المرور مطلوب"),
      phone: Yup.string().required().label("الهاتف مطلوب"),
      identification_number: Yup.number().required().label("رقم الهويه مطلوب"),
      birthdate : Yup.string().required().label("تاريخ الميلاد مطلوب"),
      commercial_registration_number : Yup.string().required().label(" رقم التسجيل التجاري مطلوب"),
      tax_number : Yup.string().required().label("الرقم الضريبي مطلوب"),
    });

    const onSubmitRegister = (values) => {
      values.identification_number = parseInt(values.identification_number);
      console.log("value = ",values);

      // Activate indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");

      // Dummy delay
  
            loading.value = true;
        store
          .dispatch(Actions.SIGNUP, values)
          .then(() => {
            loading.value = false;
             router.push({ name: "dashboard" });
          })
          .catch(() => {
            loading.value = false;
            error.value = store.getters.getErrors;
            if (error.value.length !== 0) {
              console.log("error.value.length", error.value);
              error_show.value = true;
            }
          });

          window.scrollTo(0, 0);
          setTimeout(() => {
        submitButton.value?.removeAttribute("data-kt-indicator");
            error_show.value = false;
          }, 5000);
    };

    return {
      registration,
      onSubmitRegister,
      submitButton,
      error_show,
      error
    };
  },
});
</script>
<style  scoped>
 .user_page{
   width: 40%;
 }
</style>