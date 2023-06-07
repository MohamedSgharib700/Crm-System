<template>
  <div class="user_page">
    <div class="alert alert-danger" role="alert" v-if="error_show">
      <span>{{ error }}</span>
    </div>
    <!--begin::Wrapper-->
    <div class="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
      <!--begin::Form-->
      <Form
        class="form w-100"
        id="kt_login_signin_form"
        @submit="onSubmitLogin"
        :validation-schema="login"
      >
        <!--begin::Heading-->
        <div class="text-center mb-10">
          <!--begin::Title-->
          <h1 class="text-dark mb-3">تسجيل الدخول</h1>
          <!--end::Title-->

          <!--begin::Link-->
          <!--end::Link-->
        </div>
        <!--begin::Heading-->

        <!--begin::Input group-->
        <div class="fv-row mb-10">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bolder text-dark"
            >البريد الالكتروني</label
          >
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            class="form-control form-control-lg form-control-solid"
            type="text"
            name="email"
            autocomplete="true"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="email" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="fv-row mb-10">
          <!--begin::Wrapper-->
          <div class="d-flex flex-stack mb-2">
            <!--begin::Label-->
            <label class="form-label fw-bolder text-dark fs-6 mb-0"
              >كلمه المرور</label
            >
            <!--end::Label-->

            <!--begin::Link-->
            <router-link
              to="/password-forget"
              class="link-primary fs-6 fw-bolder"
            >
              هل نسيت كلمه المرور؟
            </router-link>
            <!--end::Link-->
          </div>
          <!--end::Wrapper-->

          <!--begin::Input-->
          <Field
            class="form-control form-control-lg form-control-solid"
            type="password"
            name="password"
            autocomplete="off"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="password" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Actions-->
        <div class="text-center">
          <!--begin::Submit button-->
          <button
            type="submit"
            ref="submitButton"
            id="kt_sign_in_submit"
            class="btn btn-lg btn-primary w-100 mb-5"
          >
            <!-- <span class="indicator-label" v-if="!loading">تسجيل الدخول</span> -->
            <span v-if="!loading">تسجيل الدخول</span>

            <span class="indicator-progress" v-if="loading">
              من فضلل انتظر...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
          <!--end::Submit button-->
        </div>

        <!--begin::Link-->
        <!-- <router-link
          to="/sign-up"
          class="link-primary fs-6 fw-bolder link_sign_up"
        >
          حساب جديد
        </router-link> -->
        <!--end::Link-->
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
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import * as Yup from "yup";

export default defineComponent({
  name: "sign-in",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const token = ref(localStorage.getItem("token"));
    const error_show = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const error = ref("");
    if (token.value !== null) {
      console.log("token = ", token.value);
      router.push({ name: "dashboard" });
    }

    const submitButton = ref<HTMLElement | null>(null);

    //Create form validation object
    const login = Yup.object().shape({
      email: Yup.string()
        .email("الايميل مطلوب")
        .required("الايميل مطلوب")
        .label("الايميل مطلوب"),
      password: Yup.string()
        .min(4)
        .required("الباسورد مطلوب")
        .label("الباسورد مطلوب"),
    });

    //Form submit function
    const onSubmitLogin = (values) => {
      // Clear existing errors

      if (submitButton.value) {
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }

      // Dummy delay
      // Send login request
      loading.value = true;
      store
        .dispatch(Actions.LOGIN, values)
        .then(() => {
          loading.value = false;
          router.push({ name: "dashboard" });
        })
        .catch(() => {
          loading.value = false;
          error.value = "خطأ فى البيانات المدخله";
          if (error.value.length !== 0) {
            console.log("error.value.length", error.value);
            error_show.value = true;
          }
        });

      window.scrollTo(0, 0);
      setTimeout(() => {
        error_show.value = false;
      }, 5000);
    };

    return {
      onSubmitLogin,
      login,
      submitButton,
      error_show,
      error,
      loading,
    };
  },
});
</script>
<style scoped>
.link_sign_up {
  text-align: center;
  width: 100%;
  display: block;
  text-decoration: underline;
}
</style>
