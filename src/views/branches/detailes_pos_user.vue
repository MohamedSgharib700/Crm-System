<template>
  <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      
    <!--begin::Card body-->
    <div class="card-body" >
      <div class="data">
      <!--begin::Row-->
      <div class="row">
        <!--begin::Label-->
        <label class="col-lg-4">الاسم</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 text-center">
          <span >{{ showAllDetailes.name }}</span>
        </div>  
        <!--end::Col-->
      </div>
      <!--end::Row-->
      <!--begin::Row-->
      <div class="row">
        <!--begin::Label-->
        <label class="col-lg-4">الايميل</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 text-center">
          <span >{{ showAllDetailes.email }}</span>
        </div>  
        <!--end::Col-->
      </div>
      <!--end::Row-->
      <!--begin::Row-->
      <div class="row">
        <!--begin::Label-->
        <label class="col-lg-4">التلفون</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 text-center">
          <span >{{ showAllDetailes.phone }}</span>
        </div>  
        <!--end::Col-->
      </div>
      <!--end::Row-->
      <!--begin::Row-->
      <div class="row">
        <!--begin::Label-->
        <label class="col-lg-4">رمز التسلسل</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 text-center">
          <span >{{ showAllDetailes.serial_number }}</span>
        </div>  
        <!--end::Col-->
      </div>
      <!--end::Row-->
      <!--begin::Row-->
      <div class="row">
        <!--begin::Label-->
        <label class="col-lg-4">كود التسلسل</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 text-center">
          <span >{{ showAllDetailes.serial_code }}</span>
        </div>  
        <!--end::Col-->
      </div>
      <!--end::Row-->
      <!--begin::Row-->
      <div class="row">
        <!--begin::Label-->
        <label class="col-lg-4">رقم الهوية</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 text-center">
          <span >{{ showAllDetailes.identification_number }}</span>
        </div>  
        <!--end::Col-->
      </div>
      <!--end::Row-->
      <!--begin::Row-->
      <div class="row">
        <!--begin::Label-->
        <label class="col-lg-4">تاريخ الانشاء</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 text-center">
          <span >{{ showAllDetailes.created_at }}</span>
        </div>  
        <!--end::Col-->
      </div>
      <!--end::Row-->
      </div>
      <div class="img_page">
        <img src="../../../public/media/icons/img_show.png" />
      </div>
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
  props:['id_detailes_pos_user',"namepage"],

setup(props){
    const store = useStore();
    console.log("information",props.id_detailes_pos_user);
    let list = computed(() => store.getters.GetBranches);
    const informations = list.value[0];
    const showAllDetailes = informations.pos_users.find((branche) => branche.id == props.id_detailes_pos_user);

    console.log("information = ",showAllDetailes);
    
    onMounted(() => {
      if(props.namepage == 'activated')
      setCurrentPageBreadcrumbs("الفروع",
       ["/branches/activated", "الفروع المفعله",
       "تفاصيل حسابات نقاط البيع"]);
      else if(props.namepage == 'deactivated')
      setCurrentPageBreadcrumbs("الفروع",
       ["/branches/deactivated", "الفروع الغير مفعله",
       "تفاصيل حسابات نقاط البيع"]);
    });
    return{
        showAllDetailes
    }

}

});
</script>
<style scoped lang="scss">
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
.menu-item a{    
    width: 100%;
    display: inline-block;
    padding: 5px ;
    text-align: right;
    cursor: pointer;
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
