<template>
  <div
    v-if="loading"
    id="loading"
    class="loading"
  >
    <div class="loading-container">
      <div class="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useLoadingStore } from "@/stores/loading"; // Adjust the path based on your project structure

const loadingStore = useLoadingStore();

const loading = computed(() => loadingStore.isLoading);
</script>

<style lang="scss">
.loading {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1101;

  .loading-container {
    position: relative;
    width: 100%;
    height: 100%;

    .lds-ellipsis {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 80px;
      height: 20px;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);

      & div {
        position: absolute;
        top: 0;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: #fff;
        -webkit-animation-timing-function: cubic-bezier(0, 1, 1, 0);
        animation-timing-function: cubic-bezier(0, 1, 1, 0);

        &:nth-child(1) {
          left: 8px;
          -webkit-animation: 0.6s infinite lds-ellipsis1;
          animation: 0.6s infinite lds-ellipsis1;
        }

        &:nth-child(2) {
          left: 8px;
          -webkit-animation: 0.6s infinite lds-ellipsis2;
          animation: 0.6s infinite lds-ellipsis2;
        }

        &:nth-child(3) {
          left: 32px;
          -webkit-animation: 0.6s infinite lds-ellipsis2;
          animation: 0.6s infinite lds-ellipsis2;
        }

        &:nth-child(4) {
          left: 56px;
          -webkit-animation: 0.6s infinite lds-ellipsis3;
          animation: 0.6s infinite lds-ellipsis3;
        }
      }
    }
  }
}

@-webkit-keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    -o-transform: scale(0);
    -ms-transform: scale(0);
  }

  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    -ms-transform: scale(1);
  }
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    -o-transform: scale(0);
    -ms-transform: scale(0);
  }

  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    -ms-transform: scale(1);
  }
}

@-webkit-keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    -ms-transform: scale(1);
  }

  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    -o-transform: scale(0);
    -ms-transform: scale(0);
  }
}

@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    -ms-transform: scale(1);
  }

  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    -o-transform: scale(0);
    -ms-transform: scale(0);
  }
}

@-webkit-keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
    -webkit-transform: translate(0, 0);
    -moz-transform: translate(0, 0);
    -o-transform: translate(0, 0);
    -ms-transform: translate(0, 0);
  }

  100% {
    transform: translate(24px, 0);
    -webkit-transform: translate(24px, 0);
    -moz-transform: translate(24px, 0);
    -o-transform: translate(24px, 0);
    -ms-transform: translate(24px, 0);
  }
}

@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
    -webkit-transform: translate(0, 0);
    -moz-transform: translate(0, 0);
    -o-transform: translate(0, 0);
    -ms-transform: translate(0, 0);
  }

  100% {
    transform: translate(24px, 0);
    -webkit-transform: translate(24px, 0);
    -moz-transform: translate(24px, 0);
    -o-transform: translate(24px, 0);
    -ms-transform: translate(24px, 0);
  }
}
</style>
