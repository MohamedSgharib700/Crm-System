<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">تفاصيل وثسيقه العمل الحر</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body p-9">
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-bold text-muted">The Name</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bolder fs-6 text-dark">{{ selectadmin.name }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-bold text-muted">Email</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 fv-row">
          <span class="fw-bold fs-6">{{ selectadmin.email }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-bold text-muted">Role</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <a href="#" class="fw-bold fs-6 text-dark text-hover-primary">{{
            selectadmin.roles
          }}</a>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->

  <!--begin::Row-->

  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
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
              Accordion Item #1
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
                <li><p>List1</p></li>
                <li><p>List1</p></li>
                <li><p>List1</p></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--end::Col-->
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "account-overview",
  props: ["iduser"],
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const admins = store.getters.GetUsers;
    const selectadmin = admins.find((admin) => admin.id == props.iduser);
    console.log("selectadmin", props.iduser);
    if (!selectadmin) {
      router.back();
    }
    // router.replace('/accounts/users');
    onMounted(() => {
      setCurrentPageBreadcrumbs("Overview", ["Account"]);
    });

    return {
      selectadmin,
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
      color: black;
      background-color: white;
      .collapsed {
        background-color: white;
      }
    }
  }
}
</style>

