<template>
  <div class="user_page">
    <!--begin::details View-->
    <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
      <!--begin::Card header-->
      <div class="card-header cursor-pointer">
        <!--begin::Card title-->
        <div class="card-title m-0">
          <h3 class="fw-bolder m-0">تفاصيل الموظف</h3>
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
              <span>{{ selectmanager.name }}</span>
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
              <span>{{ selectmanager.email }}</span>
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
              <span>{{ selectmanager.phone }}</span>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
          <!--begin::Row-->
          <div class="row">
            <!--begin::Label-->
            <label class="col-lg-4"> الوظيفه</label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 text-center">
              <span>{{ selectmanager.user_type }}</span>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
          <!--begin::Row-->
          <div class="row">
            <!--begin::Label-->
            <label class="col-lg-4">تاريخ الميلاد </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 text-center">
              <span>{{ selectmanager.birthdate }}</span>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
          <!--begin::Row-->
          <div class="row">
            <!--begin::Label-->
            <label class="col-lg-4">ملف التفويض </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 text-center">
              <!--begin::Export-->
              <span>
                <!-- <a @click="download_submit">
            تحميل
          </a> -->

                <a target="_blank" :href="selectmanager.delegation_file">
                  تحميل
                </a>
              </span>
              <!--end::Export-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
          <!--begin::Row-->
          <div class="row">
            <!--begin::Label-->
            <label class="col-lg-4">حالة الحساب</label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 text-center">
              <!--begin::Export-->
              <span>
                <div
                  class="form-check form-switch"
                  style="display: inline-block"
                  data-toggle="toggle"
                >
                  <!-- <el-form-item >
              <el-switch
                id="flexSwitchCheckChecked"
                 v-model="selectmanager.is_active"
     active-text=" مفعل "
    inactive-text="غير مفعل"
    active-color="#D11388"
                @click="is_Active(selectmanager.id,selectmanager.is_active)"
                data-toggle="toggle" data-class="fast"
              />
                </el-form-item> -->

                  <span class="left_span span_switch" v-if="show_active == true"
                    >نشط</span
                  >
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckChecked"
                    :checked="selectmanager.is_active"
                    @click="is_Active(selectmanager.id, $event)"
                  />
                  <span
                    class="right_span span_switch"
                    v-if="show_active == false"
                    >غير نشط</span
                  >
                </div>
              </span>
              <!--end::Export-->
            </div>  
            <div class="alert alert-danger" role="alert" v-if="error_show_notActive">
      <span>{{ errorNotActive }}</span>
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
  props: ["idManager"],
  setup(props) {
    // const userModule = store.getters.GetUsers;
    const store = useStore();
    const router = useRouter();
    const show_active = ref<boolean>(false);
    const managers = store.getters.getManager;
    const selectmanager = managers[0];
    show_active.value = selectmanager.is_active;
    const errorNotActive = ref(
      "عذرا لايمكن تفعيل المدير المالي لانه يوجد مدير مالي بالفعل لهذه الشركة"
    );
    const error_show_notActive = ref<boolean>(false);
    console.log("selectadmin", selectmanager);
    // router.replace('/accounts/users');

    onMounted(() => {
      setCurrentPageBreadcrumbs("ملفات التفويض", [
        "/managers",
        "قائمه ملفات التفويض",
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

    const is_Active = (id, event) => {
      if (event.target.checked == true) {
        show_active.value = true;
      } else {
        show_active.value = false;
      }
      const data = {
        // is_active:event
        is_active: event.target.checked,
      };
      const payload = { key1: id, key2: data };
      store
        .dispatch(Actions.IS_ACTIVE, payload)
        .then(() => {
          console.log("okky");
        })
        .catch(() => {
          console.log("No");
          error_show_notActive.value = true;
          if (event.target.checked == true) {
            show_active.value = false;
            event.target.checked = false
          } else {
            show_active.value = true;
            event.target.checked = true
          }
        });

      // window.scrollTo(0, 0);
      setTimeout(() => {
        error_show_notActive.value = false;
      }, 5000);
    };
    return {
      selectmanager,
      download_submit,
      is_Active,
      show_active,
      error_show_notActive,
      errorNotActive,
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
