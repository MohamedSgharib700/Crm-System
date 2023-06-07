<template>
  <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0" v-if="nameDetaiels == 'finance_manager'">
          تفاصيل المدير المالى
        </h3>
        <h3 class="fw-bolder m-0" v-else-if="nameDetaiels == 'owner'">
          تفاصيل المدير التنفيذى
        </h3>
        <h3 class="fw-bolder m-0" v-else-if="nameDetaiels == 'manager'">
          تفاصيل المدير التنفيذى
        </h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body">
      <div class="data">
        <!--begin::Row-->
        <div class="row">
          <!--begin::Label-->
          <label class="col-lg-4">الأسم</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8 text-center">
            <span
              
              v-if="nameDetaiels == 'finance_manager'"
              >{{ information.finance_manager.name }}</span
            >
            <span
              
              v-else-if="nameDetaiels == 'owner'"
              >{{ information.owner.name }}</span
            >
          </div>
          <!--end::Col-->
        </div>
        <div class="row">
          <!--begin::Label-->
          <label class="col-lg-4">الايميل</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8 text-center">
            <span
              
              v-if="nameDetaiels == 'finance_manager'"
              >{{ information.finance_manager.email }}</span
            >
            <span
              
              v-if="nameDetaiels == 'owner'"
              >{{ information.owner.email }}</span
            >
          </div>
          <!--end::Col-->
        </div>
        <div class="row">
          <!--begin::Label-->
          <label class="col-lg-4">الموبيل</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8 text-center">
            <span
              
              v-if="nameDetaiels == 'finance_manager'"
              >{{ information.finance_manager.phone }}</span
            >
            <span
              
              v-if="nameDetaiels == 'owner'"
              >{{ information.owner.phone }}</span
            >
          </div>
          <!--end::Col-->
        </div>
        <div class="row">
          <!--begin::Label-->
          <label class="col-lg-4"> الوظيفه</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8 text-center">
            <span
              
              v-if="nameDetaiels == 'finance_manager'"
              >{{ information.finance_manager.user_type }}</span
            >
            <span
              
              v-if="nameDetaiels == 'owner'"
              >{{ information.owner.user_type }}</span
            >
          </div>
        </div>
        <!--end::Col-->
        <div class="row">
          <!--begin::Label-->
          <label class="col-lg-4">تاريخ الميلاد </label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8 text-center">
            <span
              
              v-if="nameDetaiels == 'finance_manager'"
              >{{ information.finance_manager.birthdate }}</span
            >
            <span
              
              v-if="nameDetaiels == 'owner'"
              >{{ information.owner.birthdate }}</span
            >
          </div>
          <!--end::Col-->
        </div>
      </div>

      <div class="img_page">
        <img src="../../../public/media/icons/img_show.png" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, reactive } from "vue";
import { useStore } from "vuex";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";

export default defineComponent({
  name: "Users-listing",
  props: ["nameDetaiels","namepage"],

  setup(props) {
    const store = useStore();
    console.log("information", props.nameDetaiels);
    let list = computed(() => store.getters.GetCOMPANIES);
    console.log("tableData = ", list.value[0]);
    const information = list.value[0];
    
    onMounted(()=>{
      if(props.nameDetaiels == "finance_manager"){
        
      if(props.namepage == 'commercial_register'){
      setCurrentPageBreadcrumbs("الشركات", [
        "/companies/commercial_register",
          "قائمه سجل التجارى",
        "تفاصيل المدير المالى"]);
      }
      else if(props.namepage == 'freelance-documents'){
      setCurrentPageBreadcrumbs("الشركات", [
        "/companies/freelance-documents",
          "قائمه وثائق العمل الحر",
        "تفاصيل المدير المالى"]);
      }
      else if(props.namepage == 'celebrity'){
      setCurrentPageBreadcrumbs("الشركات", [
        "/companies/celebrity",
          "قائمه المشاهير",
        "تفاصيل المدير المالى"]);
      }
      }
      else if(props.nameDetaiels == "owner")
      if(props.namepage == 'commercial_register'){
      setCurrentPageBreadcrumbs("الشركات", [
        "/companies/commercial_register",
          "قائمه سجل التجارى",
        "تفاصيل المدير التنفيذى"]);
      }
      else if(props.namepage == 'freelance-documents'){
      setCurrentPageBreadcrumbs("الشركات", [
        "/companies/freelance-documents",
          "قائمه وثائق العمل الحر",
        "تفاصيل المدير التنفيذى"]);
      }
      else if(props.namepage == 'celebrity'){
      setCurrentPageBreadcrumbs("الشركات", [
        "/companies/celebrity",
          "قائمه المشاهير",
       "تفاصيل المدير التنفيذى"]);
      }
    })
    return {
      information,
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
  .list {
    li {
      display: inline-block;
      width: 20%;
    }
  }
}
.card {
  .card-header {
    border: 0px;
    h3 {
      font-size: 28px;
      color: #000000;
      padding: 40px 0px;
    }
  }
  .card-body {
    .data {
      width: 45%;
      display: inline-block;
      padding-top: 0rem !important;
      .row {
        width: 100%;
        background: #f4f7fe;
        padding: 25px 30px;
        border-radius: 8px;
        margin-bottom: 13px;
        label {
          font-size: 20px;
          font-weight: bold;
          color: #686868;
        }
        span {
          font-size: 20px;
          color: #000000;
          font-weight: bold;
          a:hover {
            color: #000000;
          }
        }
      }
      .row_branch {
        background: #d11388;
        width: 40%;
        height: 50px;
        padding: 13px 0px;
        a {
          font-size: 18px;
          color: #ffffff;
          padding: 0px;
          margin: 0px;
          padding: 0px;
          text-align: center;
        }
      }
    }
    .img_page {
      width: 55%;
      display: inline-block;
      vertical-align: top;
      text-align: center;
      img {
        vertical-align: top;
        width: 344px;
        height: 439px;
      }
    }
  }
}
</style>
