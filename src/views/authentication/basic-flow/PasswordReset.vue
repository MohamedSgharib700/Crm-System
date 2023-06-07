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
        <h1 class="text-dark mb-3">أدخل الكود </h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-bold fs-4">
         قم بإدخال الكود المرسل للإيميل {{email_reset}} المكون من 6 أرقام فقط
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <label class="form-label fw-bolder text-gray-900 fs-6">كود الدخول</label>
        <Field
          class="form-control form-control-solid"
          type="text"
          placeholder="xxx xxx"
          name="forget_code"
          autocomplete="off"
          style="text-align: center;font-size: 27px;"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="forget_code" />
          </div>
        </div>
      </div>
        <Field
          class="form-control form-control-solid"
          type="email"
          placeholder="email"
          name="email"
          autocomplete="off"
          style="display:none"
          v-model="email"
        />
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="d-flex flex-wrap justify-content-center pb-lg-0">
        <button
          type="submit"
          ref="submitButton"
          id="kt_password_reset_submit"
          class="btn btn-lg btn-primary fw-bolder me-4"
        >
          <span class="indicator-label"> إرسال </span>
          <span class="indicator-progress">
            إنتظر قليلا ...
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
  <!--end::Wrapper-->
  </div>
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
  props:['email_reset'],
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const email = ref(props.email_reset);
    const submitButton = ref<HTMLElement | null>(null);
    const error_show = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const error = ref("");
    if(email.value == null){
      router.push({ name: "password-forget" });
    }
    //Create form validation object
    const forgotPassword = Yup.object().shape({
      forget_code: Yup.number().min(6).required().label("forget_code"),
      email: Yup.string().required().label("email"),
    });

    //Form submit function
    const onSubmitForgotPassword = (values) => {
      // Activate loading indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");
      //dummy delay
        // Send login request
        console.log(values);
        store
          .dispatch(Actions.RESET_CODE, values)
          .then(() => {
              router.push({ name: "password-change" });
          })
          .catch(() => {
            // Alert then login failed
            loading.value = false;
            error.value = store.getters.getErrors;
            if (error.value.length !== 0) {
              console.log("error.value.length", error.value);
              error_show.value = true;
            }
          });
        submitButton.value?.removeAttribute("data-kt-indicator");

        window.scrollTo(0, 0);
          setTimeout(() => {
            error_show.value = false;
          }, 5000);
    };

    return {
      onSubmitForgotPassword,
      forgotPassword,
      submitButton,
      email,
      error_show,
      error
    };
  },
});
</script>
