<template>
  <!--begin::Basic info-->
  <div class="user_page">
    <div class="alert alert-danger" role="alert" v-if="error_show">
      <ul>
        <li v-for="err in error" :key="err.id">{{ err }}</li>
      </ul>
    </div>
    <div class="alert alert-success" role="alert" v-if="Process_success">
      تم عمليه {{ success_action }} بنجاح
    </div>
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_profile_details"
      aria-expanded="true"
      aria-controls="kt_account_profile_details"
    >
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">تعديل بيانات الملف الشخصى</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Content-->
    <div id="kt_account_profile_details" class="collapse show">
      <!--begin::Form-->
      <Form
        id="kt_account_profile_details_form"
        class="form"
        novalidate="novalidate"
        @submit="saveChanges1"
        :validation-schema="profileDetailsValidator"
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-bold fs-6">Avatar</label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Image input-->
              <div
                class="image-input image-input-outline"
                data-kt-image-input="true"
                style="background-image: url(media/avatars/blank.png)"
              >
                <!--begin::Preview existing avatar-->
                <div
                  class="image-input-wrapper w-125px h-125px"
                  :style="`background-image: url(${profileDetails.avatar})`"
                ></div>
                <!--end::Preview existing avatar-->

                <!--begin::Label-->
                <label
                  class="
                    btn btn-icon btn-circle btn-active-color-primary
                    w-25px
                    h-25px
                    bg-white
                    shadow
                  "
                  data-kt-image-input-action="change"
                  data-bs-toggle="tooltip"
                  title="Change avatar"
                >
                  <i class="bi bi-pencil-fill fs-7"></i>

                  <!--begin::Inputs-->

                  <input
                    type="file"
                    @change="handleAvatar"
                    name="avatar"
                    accept=".png, .jpg, .jpeg"
                  />
                  <input type="hidden" name="avatar_remove" />
                  <!--end::Inputs-->
                </label>
                <!--end::Label-->

                <!--begin::Remove-->
                <span
                  class="
                    btn btn-icon btn-circle btn-active-color-primary
                    w-25px
                    h-25px
                    bg-white
                    shadow
                  "
                  data-kt-image-input-action="remove"
                  data-bs-toggle="tooltip"
                  @click="removeImage()"
                  title="Remove avatar"
                >
                  <i class="bi bi-x fs-2"></i>
                </span>
                <!--end::Remove-->
              </div>
              <!--end::Image input-->

              <!--begin::Hint-->
              <div class="form-text">Allowed file types: png, jpg, jpeg.</div>
              <!--end::Hint-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-bold fs-6"
              >الإسم</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg-12 fv-row">
                  <Field
                    type="text"
                    name="name"
                    class="
                      form-control form-control-lg form-control-solid
                      mb-3 mb-lg-0
                    "
                    placeholder="الاسم"
                    v-model="profile.name"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="name" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->

              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-bold fs-6"
              >الإيميل</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="email"
                name="email"
                class="form-control form-control-lg form-control-solid"
                placeholder="الايميل"
                v-model="profile.email"
                style="text-align: right"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="email" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
            <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-bold fs-6"
              >الهاتف</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="tel"
                name="phone"
                class="form-control form-control-lg form-control-solid"
                placeholder="الهاتف"
                v-model="profile.phone"
                style="text-align: right"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="phone" />
                </div>
              </div>
            </div>
            <!--end::Col-->
            </div>
          <!--end::Input group-->
          
            <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-bold fs-6"
              >تاريخ الميلاد</label
            >
            <!--end::Label-->
            <div class="col-lg-8 fv-row">
              <Field
                type="date"
                name="birthdate"
                class="form-control form-control-lg form-control-solid"
                placeholder="تاريخ الميلاد"
                v-model="profile.birthdate"
                style="text-align: right"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="birthdate" />
                </div>
              </div>
            </div>
            </div>
          <!--end::Input group-->
            <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-bold fs-6"
              >رقم الهوية</label
            >
            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="identification_number"
                class="form-control form-control-lg form-control-solid"
                placeholder="رقم الهويه"
                v-model="profile.identification_number"
                style="text-align: right"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="identification_number" />
                </div>
              </div>
            </div>
            <!--end::Col-->
            </div>
          <!--end::Input group-->
            <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-bold fs-6"
              >الوظيقه</label
            >
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="user_type"
                class="form-control form-control-lg form-control-solid"
                placeholder="الوظيقه"
                v-model="profile.user_type"
                style="text-align: right"
                disabled
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="user_type" />
                </div>
              </div>
            </div>
            </div>
          <!--end::Input group-->
        </div>
        <!--end::Card body-->

        <!--begin::Actions-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button
            type="reset"
            class="btn btn-white btn-active-light-primary me-2"
          >
            تجاهل
          </button>

          <button
            type="submit"
            id="kt_account_profile_details_submit"
            ref="submitButton1"
            class="btn btn-primary"
          >
            <span class="indicator-label"> حفظ التعديل </span>
            <span class="indicator-progress">
              إنتظر...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
        <!--end::Actions-->
      </Form>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Basic info-->
   <div class="page-loader" v-if="loading">
      <span class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref,computed } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";

interface ProfileDetails {
  avatar: any;
  name: string;
  surname: string;
  company: string;
  contactPhone: string;
  companySite: string;
  // country: string;
  // language: string;
  // timezone: string;
  // currency: string;
  communications: {
    email: boolean;
    phone: boolean;
  };
  allowMarketing: boolean;
}

export default defineComponent({
  name: "account-settings",
  components: {
    ErrorMessage,
    Field,
    Form,
  },
  setup() {
    const store = useStore();
    const submitButton1 = ref<HTMLElement | null>(null);
    const updateEmailButton = ref<HTMLElement | null>(null);
    const updatePasswordButton = ref<HTMLElement | null>(null);
    const emailFormDisplay = ref(false);
    const passwordFormDisplay = ref(false);
    const loading = ref<boolean>(false);
    const Process_success = ref<boolean>(false);
    const success_action = ref("");
    const error_show = ref<boolean>(false);
    const error = ref([]);

    const profile = computed(() => {
      return store.getters.profileInformation;
    });
    const profileDetailsValidator = Yup.object().shape({
      name: Yup.string().required("الاسم مطلوب").label("الاسم مطلوب"),
      email: Yup.string().email("الميل مطلوب").required("الميل مطلوب").label("الميل مطلوب"),
      phone: Yup.string().required("التلفون مطلوب").label("التلفون مطلوب"),
      birthdate: Yup.string().required("تاريخ الميلاد مطلوب").label("تاريخ الميلاد مطلوب"),
      identification_number: Yup.string().required().label("رقم الهوية مطلوب"),
      user_type: Yup.string().required("اسم الوظيفه مطلوبه").label("اسم الوظيفه مطلوبه"),
    });

    const changeEmail = Yup.object().shape({
      emailaddress: Yup.string().required().email().label("الايميل مطلوب"),
      confirmemailpassword: Yup.string().required().label("الرقم السرى مطلوب"),
    });

    const changePassword = Yup.object().shape({
      currentpassword: Yup.string().required().label("Current password"),
      newpassword: Yup.string().min(4).required().label("Password"),
      confirmpassword: Yup.string()
        .min(4)
        .required()
        .oneOf([Yup.ref("newpassword"), null], "Passwords must match")
        .label("Password Confirmation"),
    });

    const profileDetails = ref<ProfileDetails>({
      avatar: "media/avatars/150-2.jpg",
      name: "Max",
      surname: "Smith",
      company: "Keenthemes",
      contactPhone: "044 3276 454 935",
      companySite: "keenthemes.com",
      // country: "MY",
      // language: "msa",
      // timezone: "Kuala Lumpur",
      // currency: "USD",
      communications: {
        email: false,
        phone: false,
      },
      allowMarketing: false,
    });
    
    const user = computed(() => {
       store.dispatch(Actions.PROFILE)
      return store.getters.currentUser;
    });
    

    const saveChanges1 = (values) => {
      console.log("values", values);
      if (submitButton1.value) {
        // Activate indicator
        submitButton1.value.setAttribute("data-kt-indicator", "on");
            loading.value = true;
 store
          .dispatch(Actions.UPDATE_USER ,values)
          .then(() => {
            loading.value = false;
            Process_success.value = true;
            success_action.value = "التعديل";
          })
          .catch(() => {
            loading.value = false;
            error.value = store.getters.getErrors;
            if (error.value.length !== 0) {
              console.log("error.value.length", error.value.length);
              error_show.value = true;
            }
          });
          window.scrollTo(0, 0);
          setTimeout(() => {
            submitButton1.value?.removeAttribute("data-kt-indicator");
            Process_success.value = false;
            error_show.value = false;
          }, 5000);
      }
    };

    // const createBase64image = (fileObject) => {
    //   const reader = new FileReader();

    //   reader.onload = (e) => {
    //     console.log(e.target?.result);
    //     profileDetails.value.avatar = e.target?.result;
    //   };
    //   // reader.readAsBinaryString(fileObject);
    // };
    const handleAvatar = (e) => {
      const selectedImage = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        profileDetails.value.avatar = reader.result;
      };
      console.log(selectedImage);
      reader.readAsDataURL(selectedImage);
    };

    const removeImage = () => {
      profileDetails.value.avatar = "media/avatars/blank.png";
    };
    onMounted(() => {
      setCurrentPageBreadcrumbs("الملف الشخصى"
      , ["/my-account/overview",
      "تفاصيل الملف الشخصى",
        "تعديل البيانات"]);
    });

    return {
      submitButton1,
      saveChanges1,
      handleAvatar,
      profileDetails,
      emailFormDisplay,
      passwordFormDisplay,
      removeImage,
      profileDetailsValidator,
      changeEmail,
      changePassword,
      updateEmailButton,
      updatePasswordButton,
      user,
      profile,
      loading,
      error,
      success_action,
      Process_success,
      error_show,
    };
  },
});
</script>

<style scoped>
.text-end {
  position: relative;
}
.menu {
  position: absolute;
}
.card .card-header .card-title {
  width: auto;
}
.user_page {
  position: relative;
}
.page-loader {
  display: block;
  position: absolute;
  background: #ffffffb0;
}
.spinner-border {
  margin: 25% 50%;
}
.upload_file_button {
  position: relative;
  overflow: hidden;
}
.upload_file_button input {
  position: absolute;
  width: 100%;
  right: 0px;
  opacity: 0;
}
.message_import {
  margin-top: 10px;
  color: #767676;
}
.swal2-popup .swal2-html-container,
.swal2-popup .swal2-content,
.swal2-popup .swal2-actions {
  margin: 0px;
}
.swal2-icon.swal2-warning {
  color: red;
}
</style>
