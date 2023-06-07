<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">تفاصيل</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body ">
      <div class="data">
      <!--begin::Row-->
      <div class="row">
        <!--begin::Label-->
        <label class="col-lg-4">الاسم</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 text-center">
          <span>{{ selectBranches.name }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
      <!--begin::Row-->
      <div class="row">
        <!--begin::Label-->
        <label class="col-lg-4">المدينه</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 text-center">
          <span>{{ selectBranches.city.name }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
      <!--begin::Row-->
      <div class="row">
        <!--begin::Label-->
        <label class="col-lg-4">الشركة</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 text-center">
           <span>
              <router-link :to="viewLinkDetailes(selectBranches.company.id)">{{
                selectBranches.company.name
              }}</router-link></span
            >
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
      <!--begin::Row-->
      <div class="row">
        <!--begin::Label-->
        <label class="col-lg-4">مدير الفروع</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 text-center">
           <span>
              <router-link :to="viewLinkDetailes_manager('manager',selectBranches.manager.id)">{{
                selectBranches.manager.name
              }}</router-link></span
            >
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
      
        <!--begin::Row-->
        <div class="row row_branch" v-if="selectBranches.pos_users.length != 0">
          <!--begin::Label-->
          <router-link :to="viewLink()">حسابات نقاط البيع</router-link>
          <!--end::Col-->
        </div>
        <div class="row row_branch" v-else>
          <!--begin::Label-->
          <a @click="show_branches">حسابات نقاط البيع</a>
          <!--end::Col-->
        </div>
          <div class="row text-center" v-show="No_branches">
            <span>لا يوجد حسابات نقاط البيع</span>
          </div>
      </div>
      <div class="img_page">
        <img src="../../../public/media/icons/img_show.png" />
      </div>
      <!--end::Input group-->
      <!--end::Row-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->

  <!--begin::Row-->

  <!--end::Col-->
</template>

<script lang="ts">
import { defineComponent, onMounted, computed,ref } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";

export default defineComponent({
  name: "account-overview",
  props: ["idbranches","namepage"],
  setup(props) {
    const store = useStore();
    const Branches = store.getters.GetBranches;
    const No_branches =  ref<boolean>(false);
    const selectBranches = Branches[0];
    console.log("selectBranches", selectBranches);
    // router.replace('/accounts/users');
    onMounted(() => {
      if(props.namepage == 'activated')
      setCurrentPageBreadcrumbs("الفروع",
       ["/branches/activated", "الفروع المفعله",
       "تفاصيل"]);
      else if(props.namepage == 'deactivated')
      setCurrentPageBreadcrumbs("الفروع",
       ["/branches/deactivated", "الفروع الغير مفعله",
       "تفاصيل"]);
    });
    
    let show_branches = () => {
      No_branches.value = !No_branches.value
    };
      let viewLink = () => {
      return "/branches/"+props.namepage+"/"+props.idbranches+"/pos_users";
    };
    
    let viewLinkDetailes = (id) => {
      return (
        "/branches/"+props.namepage+"/" +
        props.idbranches +
        "/company/"+
        id
      );
    };
    let viewLinkDetailes_manager = (nameDetaiels,id) => {
      return (
        "/branches/" +props.namepage+"/" +
        props.idbranches +
        "/" +
        nameDetaiels+
        "/"+
        id
      );
    };

    return {
      selectBranches,
      show_branches,
      viewLink,
      No_branches,
      viewLinkDetailes,
      viewLinkDetailes_manager
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
      width: 40%;
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
      width: 60%;
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


