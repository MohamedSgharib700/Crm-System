<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">تفاصيل الملف الشخصى</h3>
      </div>
      <!--end::Card title-->
      <div>
        
      <!--begin::Action-->
      <router-link
        to="/my-account/settings"
        class="btn btn-primary align-self-center mt-5" style="margin-left:10px"
        >تعديل البيانات</router-link
      >
      <!--end::Action-->

      <!--begin::Link-->
      <router-link
        to="/my-account/password-old-change"
        class="btn btn-primary align-self-center mt-5"
      >
        تغير كلمه المرور
      </router-link>
      <!--end::Link-->
      </div>
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body p-9">
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-1 fw-bold text-muted">الإسم</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-11">
          <span class="fw-bolder fs-6 text-dark">{{ profile.name }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-1 fw-bold text-muted">إيميل</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-11 fv-row">
          <span class="fw-bold fs-6 text-dark">{{ profile.email }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7" v-if="profile.role !== null">
        <!--begin::Label-->
        <label class="col-lg-1 fw-bold text-muted"> تاريخ الميلاد </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-11 d-flex align-items-center">
          <span class="fw-bolder fs-6 text-dark">{{ profile.birthdate }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7" v-if="profile.role !== null">
        <!--begin::Label-->
        <label class="col-lg-1 fw-bold text-muted">الهاتف</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-11 d-flex align-items-center">
          <span class="fw-bolder fs-6 text-dark">{{ profile.phone }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7" v-if="profile.role !== null">
        <!--begin::Label-->
        <label class="col-lg-1 fw-bold text-muted">رقم الهوية</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-11 d-flex align-items-center">
          <span class="fw-bolder fs-6 text-dark">{{
            profile.identification_number
          }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7" v-if="profile.role !== null">
        <!--begin::Label-->
        <label class="col-lg-1 fw-bold text-muted">الوظيفه</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-11 d-flex align-items-center">
          <span class="fw-bolder fs-6 text-dark">{{ profile.user_type }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->
  <!--begin::details View-->
  <!-- <div class="card mb-5 mb-xl-10" id="kt_profile_details_view" 
              v-if="profile.role !== null"> -->
  <!--begin::Card header-->
  <!-- <div class="card-header cursor-pointer">
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
              
            >
              أذونات
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <ul class="list">
                <li v-for="pre in profile.role.permissions" v-bind:key="pre.id">
                  <p>{{ pre.slug }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  <!-- </div> -->
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";

export default defineComponent({
  name: "account-overview",
  setup() {
    const store = useStore();
    const user = computed(() => {
      return store.getters.currentUser;
    });
    const profile = computed(() => {
      return store.getters.profileInformation;
    });
    console.log("the profile = ", profile.value);
    onMounted(() => {
      setCurrentPageBreadcrumbs("الملف الشخصى",
       ["/my-account/overview",
      "تفاصيل الملف الشخصى",]);
    });
    return {
      user,
      profile,
    };
  },
});
</script>
<style scoped lang="scss">
#accordionExample {
  width: 100%;
  .accordion-item {
    border: 0px;
    button {
      font-size: 17px;
      color: rgb(66, 58, 58);
      background-color: white;
      .collapsed {
        background-color: white;
      }
    }
    .list {
      li {
        display: inline-block;
        width: 20%;
      }
    }
  }
}
</style>
