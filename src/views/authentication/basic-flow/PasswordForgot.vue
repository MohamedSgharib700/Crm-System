<template>
  <div class="user_page">
    <div class="alert alert-danger" role="alert" v-if="error_show">
      <ul>
        <li v-for="err in error" :key="err.id">{{ err }}</li>
      </ul>
    </div>
  <!--begin::Wrapper-->
  <div class="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
    <!--begin::Form-->
    <Form
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      @submit="onSubmitForgotPassword"
      id="kt_login_password_reset_form"
      :validation-schema="forgotPassword"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">هل نسيت كلمه المرور؟</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-bold fs-4">
          أدخل بريدك الإلكترونى لاعادة رقم المرور
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <label class="form-label fw-bolder text-gray-900 fs-6">البريد الإلكترونى</label>
        <Field
          class="form-control form-control-solid"
          type="email"
          placeholder=""
          name="email"
          autocomplete="off"
          style="text-align:right"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="d-flex flex-wrap justify-content-center pb-lg-0">
        <button
          type="submit"
          ref="submitButton"
          id="kt_password_reset_submit"
          class="btn btn-lg btn-primary fw-bolder me-4"
        >
          <span  v-if="!loading">إرسال</span>

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
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import * as Yup from "yup";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.min.js";

export default defineComponent({
  name: "password-reset",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const submitButton = ref<HTMLElement | null>(null);
    const loading = ref<boolean>(false);
    const error_show = ref<boolean>(false);
    const error = ref([]);

    //Create form validation object
    const forgotPassword = Yup.object().shape({
      email: Yup.string().email().required().label("Email"),
    });

    //Form submit function
    const onSubmitForgotPassword = (values) => {
      // Activate loading indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");

      // dummy delay
        // Send login request
            loading.value = true;
        store
          .dispatch(Actions.FORGOT_PASSWORD, values)
          .then(() => {
            loading.value = false;
              console.log('values.email',values.email);
              router.push({name: 'PasswordReset', params: {email_reset: values.email }});
          })
          .catch(() => {
            loading.value = false;
            // Alert then login failed
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
      onSubmitForgotPassword,
      forgotPassword,
      submitButton,
      loading,
      error_show,
      error
    };
  },
});
</script>
