<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">تفاصيل الشركة</h3>
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
            <span>{{ company.name }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Row-->
        <!--begin::Row-->
        <div class="row">
          <!--begin::Label-->
          <label class="col-lg-4">رقم الضريبى</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8 text-center">
            <span>{{ company.tax_number }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Row-->
        <!--begin::Row-->
        <div class="row">
          <!--begin::Label-->
          <label class="col-lg-4">السجل التجارى</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8 text-center">
            <span>{{ company.commercial_register }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Row-->
        <!--begin::Row-->
        <div class="row">
          <!--begin::Label-->
          <label class="col-lg-4">المدير التنفيذى</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8 text-center">
            <span>
              <router-link :to="viewLinkDetailes('owner',company.owner.id,namepage)">{{
                company.owner.name
              }}</router-link></span
            >
          </div>
          <!--end::Col-->
        </div>
        <!--end::Row-->
        <!--begin::Row-->
        <div class="row">
          <!--begin::Label-->
          <label class="col-lg-4">المدير المالى</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8 text-center">
            <span>
              <router-link :to="viewLinkDetailes('finance_manager',company.finance_manager.id,namepage)">{{
                company.finance_manager.name
              }}</router-link></span
            >
          </div>
          <!--end::Col-->
        </div>
        <!--end::Row-->
        <!--begin::Row-->
        <div class="row row_branch" v-if="company.branches.length != 0">
          <!--begin::Label-->
          <router-link :to="viewLink(namepage)">الفروع</router-link>
          <!--end::Col-->
        </div>
        <div class="row row_branch" v-else>
          <!--begin::Label-->
          <a @click="show_branches">الفروع</a>
          <!--end::Col-->
        </div>
          <div class="row text-center" v-show="No_branches">
            <span>لا يوجد فروع</span>
          </div>
      </div>
      <!--end::Row-->

      <div class="img_page">
        <img src="../../../public/media/icons/img_show.png" />
      </div>
      <!--end::Input group-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "account-overview",
  props: ["idcompanies",'namepage'],
  setup(props) {
    // const userModule = store.getters.GetUsers;
    const store = useStore();
    const router = useRouter();
    const companies = store.getters.GetCOMPANIES;
    const company = companies.find((admin) => admin.id == props.idcompanies);
    const No_branches =  ref<boolean>(false);
    console.log("selectadmin", company);
    onMounted(() => {
      if(props.namepage == 'commercial_register'){
      setCurrentPageBreadcrumbs("الشركات", [
        "/companies/commercial_register",
          "قائمه سجل التجارى",
        "تفاصيل"]);
      }
      else if(props.namepage == 'freelance-documents'){
      setCurrentPageBreadcrumbs("الشركات", [
        "/companies/freelance-documents",
          "قائمه وثائق العمل الحر",
        "تفاصيل"]);
      }
      else if(props.namepage == 'celebrity'){
      setCurrentPageBreadcrumbs("الشركات", [
        "/companies/celebrity",
          "قائمه المشاهير",
        "تفاصيل"]);
      }
    });
    let viewLink = (namepage) => {
      return "/companies/" +namepage+"/"+ props.idcompanies+"/branches/";
    };
    let show_branches = () => {
      No_branches.value = !No_branches.value
    };
    let viewLinkDetailes = (nameDetaiels,id,namepage) => {
      return (
        "/companies/" +
        namepage+
        "/"+
        props.idcompanies +
        "/" +
        nameDetaiels+
        "/"+id
      );
    };
    return {
      company,
      viewLink,
      viewLinkDetailes,
      No_branches,
      show_branches
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
