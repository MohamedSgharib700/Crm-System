<template>
    <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body" >
      <div class="data">
      <!--begin::Row-->
      <div class="row">
        <!--begin::Label-->
        <label class="col-lg-4">الأسم</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 text-center">
          <span >{{ information.manager.name }}</span>
        </div>  
        <!--end::Col-->
      </div>
      <div class="row">
        <!--begin::Label-->
        <label class="col-lg-4">الايميل</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 text-center">
          <span >{{ information.manager.email }}</span>
        </div>
        <!--end::Col-->
      </div>
      <div class="row">
        <!--begin::Label-->
        <label class="col-lg-4">الموبيل</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 text-center">
          <span >{{ information.manager.phone }}</span>
        </div>
        <!--end::Col-->
      </div>
      <div class="row">
        <!--begin::Label-->
        <label class="col-lg-4">الوظيفه</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 text-center">
          <span >{{ information.manager.user_type }}</span>
        </div>
        
    </div>
        <!--end::Col-->
      <div class="row">
        <!--begin::Label-->
        <label class="col-lg-4">تاريخ الميلاد </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 text-center">
          <span >{{ information.manager.birthdate }}</span>
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
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";

export default defineComponent({
  name: "Users-listing",
  props:['nameDetaiels','id_branch','namepage'],

setup(props){
    const store = useStore();
    console.log("information",props.id_branch);
    let list = computed(() => store.getters.GetCOMPANIES);
    console.log("tableData = ",list.value[0]);
    const informations = list.value[0];
    const information = informations.branches.find((branche) => branche.id == props.id_branch);

    console.log("information = ",information);
    
    onMounted(() => {
      
      if(props.namepage == 'commercial_register'){
      setCurrentPageBreadcrumbs("الشركات", [
        "/companies/commercial_register",
          "قائمه سجل التجارى",
        "تفاصيل الفروع","تفاصيل المدير"]);
      }
      else if(props.namepage == 'freelance-documents'){
      setCurrentPageBreadcrumbs("الشركات", [
        "/companies/freelance-documents",
          "قائمه وثائق العمل الحر",
        "تفاصيل الفروع","تفاصيل المدير"]);
      }
      else if(props.namepage == 'celebrity'){
      setCurrentPageBreadcrumbs("الشركات", [
        "/companies/celebrity",
          "قائمه المشاهير",
       "تفاصيل الفروع","تفاصيل المدير"]);
      }
    });
    return{
        information
    }

}

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
