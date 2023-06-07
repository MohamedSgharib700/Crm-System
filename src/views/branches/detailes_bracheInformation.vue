<template>
  <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
    <!--begin::Card header-->

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
            <span>{{ company.company.name }}</span>
          </div>
          <!--end::Col-->
        </div>
        <div class="row">
          <!--begin::Label-->
          <label class="col-lg-4">رقم الضريبى</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8 text-center">
            <span>{{ company.company.tax_number }}</span>
          </div>
          <!--end::Col-->
        </div>
        <div class="row" v-if="company.company.commercial_register">
          <!--begin::Label-->
          <label class="col-lg-4">السجل التجارى</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8 text-center">
            <span>{{ company.company.commercial_register }}</span>
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
  props: ["nameDetaiels", "idbranches","namepage"],

  setup(props) {
    const store = useStore();
    console.log("information", props.idbranches);
    let companies = computed(() => store.getters.GetBranches);
    let company = ref(companies.value[0]);
    console.log("companies = ", company.value);

    // let viewLinkDetailes = (nameDetaiels,id) => {
    //   return (
    //     "/companies/" +
    //     company.value.id +
    //     "/" +
    //     nameDetaiels+
    //     "/"+id
    //   );
    // };
        onMounted(() => {
      if(props.namepage == 'activated')
      setCurrentPageBreadcrumbs("الفروع",
       ["/branches/activated", "الفروع المفعله",
       "تفاصيل الشركة"]);
      else if(props.namepage == 'deactivated')
      setCurrentPageBreadcrumbs("الفروع",
       ["/branches/deactivated", "الفروع الغير مفعله",
       "تفاصيل الشركة"]);
    });
    return {
      company,
      // viewLinkDetailes
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
