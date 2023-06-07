<template>
  <div class="user_page">
    <!--begin::details View-->
    <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
      <!--begin::Card header-->
      <div class="card-header cursor-pointer">
        <!--begin::Card title-->
        <div class="card-title m-0">
          <h3 class="fw-bolder m-0">تفاصيل حساب نقاط البيع</h3>
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
              <span>{{ selectPosUsers.name }}</span>
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
              <span>{{ selectPosUsers.email }}</span>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
          <!--begin::Row-->
          <div class="row">
            <!--begin::Label-->
            <label class="col-lg-4">الموبيل</label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 text-center">
              <span>{{ selectPosUsers.phone }}</span>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
          <!--begin::Row-->
          <div class="row">
            <!--begin::Label-->
            <label class="col-lg-4"> رقم سري</label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 text-center">
              <span>{{ selectPosUsers.serial_number }}</span>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
          <!--begin::Row-->
          <div class="row">
            <!--begin::Label-->
            <label class="col-lg-4"> كود سري</label>
            <!--end::Label-->
            <!--begin::Col-->
            <div class="col-lg-8 text-center">
              <span>{{ selectPosUsers.serial_code }}</span>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
          <!--begin::Row-->
          <div class="row">
            <!--begin::Label-->
            <label class="col-lg-4"> فرع</label>
            <!--end::Label-->
            <!--begin::Col-->
            <div class="col-lg-8 text-center">
              <span> <router-link :to="viewLink(selectPosUsers.branch.id)">{{ selectPosUsers.branch.name }}</router-link></span>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
          <!--begin::Row-->
          <div class="row">
            <!--begin::Label-->
            <label class="col-lg-4"> شركه</label>
            <!--end::Label-->
            <!--begin::Col-->
            <div class="col-lg-8 text-center">
              <span>
                <router-link :to="viewLinkDetailes(selectPosUsers.company.id)">
                  {{ selectPosUsers.company.name }}
                </router-link>
              </span>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import { Actions } from "@/store/enums/StoreEnums";
export default defineComponent({
  name: "account-overview",
  props: ["idPosUsers"],
  setup(props) {
    // const userModule = store.getters.GetUsers;
    const store = useStore();
    const router = useRouter();
    const managers = store.getters.getPosUsers;
    console.log("getPosUsers", managers);
    const selectPosUsers = managers[0];
    console.log("selectadmin", selectPosUsers);
    // router.replace('/accounts/users');

    onMounted(() => {
      setCurrentPageBreadcrumbs("حسابات نقاط البيع", [
        "/PosUsers",
        "قائمه حسابات نقاط البيع",
        "تفاصيل",
      ]);
    });
    const download_submit = () => {
      axios({
        url: "http://rasid-staging.tasaheel.org/admincp/export_areas",
        method: "GET",
        responseType: "blob", // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "areas.xlsx"); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    };
   let viewLinkDetailes = (id) => {
      return (
        "/PosUsers/"+
        props.idPosUsers +
        "/company/"+
        id
      );
    };
    let viewLink = (id) => {
      const namepage = ref("");
      if(selectPosUsers.branch.deactivated_at == null){
         namepage.value = "activated";
      }else{
         namepage.value = "deactivated";
      }
      return "/branches/"+namepage.value +"/" + id;
    };
    return {
      selectPosUsers,
      download_submit,
      viewLinkDetailes,
      viewLink
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
.form-switch {
  position: relative;
}
.card .card-body .data .row .span_switch {
  font-size: 15px;
  position: absolute;
  z-index: 20;
  color: white;
  top: 4px;
}
.card .card-body .data .row .left_span {
  right: 13px;
}
.form-check .form-check-input {
  width: 85px;
  height: 33px;
}
.card .card-body .data .row .right_span {
  left: 10px;
  color: black;
}

a:not([href]):not([class]),
a:not([href]):not([class]):hover {
  cursor: pointer;
  color: #d11388;
}
.card .card-body .data .row span {
    font-size: 15px;
    color: #000000ab;
    font-weight: bold;
}
</style>
