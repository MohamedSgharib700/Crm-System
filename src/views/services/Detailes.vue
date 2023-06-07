<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">تفاصيل مقدم الخدمه</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body">
      <div class="data">
        
      <!--begin::Row-->
      <div class="row ">
        <!--begin::Label-->
        <label class="col-lg-4">اسم مقدم الخدمه</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 text-center">
          <span>{{ selectServices.name }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
      <!--begin::Row-->
      <div class="row ">
        <!--begin::Label-->
        <label class="col-lg-4">تاريخ الانشاء</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 text-center">
          <span>{{ selectServices.created_at }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
      </div>
      <!--end::Input group-->
      <div class="img_page">
        <img src="../../../public/media/icons/img_show.png" />
      </div>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "account-overview",
  props: ["idservices"],
  setup(props) {
    // const userModule = store.getters.GetUsers;
    const store = useStore();
    const router = useRouter();
    const services = store.getters.GetServices;
    const selectServices = services[0];
    console.log("selectadmin", selectServices);
    // router.replace('/accounts/users');
    onMounted(() => {
      setCurrentPageBreadcrumbs("مقدمين الخدمات"
      , ["/services","قائمه مقدمين الخدمات",
        "تفاصيل"]);
    });

    return {
      selectServices,
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
    padding-top: 0px;
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
        width: 266px;
        height: 339px;
      }
    }
  }
}
.permissions {
  h3 {
    color: #000000;
    font-size: 28px;
    margin-bottom: 40px;
  }
  ul {
    background: #f4f7fe;
    list-style: none;
    border-radius: 8px;

    padding: 32px 0px;
    li {
      text-align: center;
      font-size: 20px;
      color: #d11388;
      font-weight: bold;
    }
  }
}
</style>