<template>
  <!--begin::Navbar-->
  <div class="card mb-5 mb-xl-10">
    <div class="card-body pt-9 pb-0">
      <!--begin::Details-->
      <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
        <!--begin: Pic-->
        <div class="me-7 mb-4">
          <div
            class="
              symbol symbol-100px symbol-lg-160px symbol-fixed
              position-relative
            "
          >
            <img src="media/avatars/blank.png" alt="image" />
            <div
              class="
                position-absolute
                translate-middle
                bottom-0
                start-100
                mb-6
                bg-success
                rounded-circle
                border border-4 border-white
                h-20px
                w-20px
              "
            ></div>
          </div>
        </div>
        <!--end::Pic-->

        <!--begin::Info-->
        <div class="flex-grow-1">
          <!--begin::Title-->
          <div
            class="
              d-flex
              justify-content-between
              align-items-start
              flex-wrap
              mb-2
            "
          >
            <!--begin::User-->
            <div class="d-flex flex-column">
              <!--begin::Name-->
              <div class="d-flex align-items-center mb-2 mt-15">
                <span
                  class="text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
                  >{{user.name}}</span
                >
                <!-- <a href="#">
                  <span class="svg-icon svg-icon-1 svg-icon-primary">
                    <inline-svg src="media/icons/duotune/general/gen026.svg" />
                  </span>
                </a> -->
              </div>
              <!--end::Name-->

              <!--begin::Info-->
              <div class="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
          
                <!-- <span
                  class="
                    d-flex
                    align-items-center
                    text-gray-400 text-hover-primary
                    me-5
                    mb-2
                  "
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg src="media/icons/duotune/general/gen018.svg" />
                  </span>
                  SF, Bay Area
                </span> -->
                <span
                  class="
                    d-flex
                    align-items-center
                    text-gray-400 text-hover-primary
                    mb-2
                  "
                >
                 {{user.email}}
                  <span class="svg-icon svg-icon-4 m-2">
                    <inline-svg
                      src="media/icons/duotune/communication/com011.svg"
                    />
                  </span>
                </span>
              </div>
              <!--end::Info-->
              <div>
              </div>
            </div>
            <!--end::User-->
          </div>
          <!--end::Title-->
        </div>
        <!--end::Info-->
      </div>
      <!--end::Details-->

      <!--begin::Navs-->
      <div class="d-flex overflow-auto h-55px">
        <ul
          class="
            nav nav-stretch nav-line-tabs nav-line-tabs-2x
            border-transparent
            fs-5
            fw-bolder
            flex-nowrap
          "
        >
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              to="/my-account/overview"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              معلومات شخصيه
            </router-link>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <!-- <li class="nav-item">
            <router-link
              to="/my-account/settings"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              ا
            </router-link>
          </li> -->
          <!--end::Nav item-->
        </ul>
      </div>
      <!--begin::Navs-->
    </div>
  </div>
  <!--end::Navbar-->
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "kt-account",
  setup () {
    const store =  useStore();
    const user = computed(() => {
      return store.getters.currentUser
    });
    return {
          user
      }
  }
});
</script>
