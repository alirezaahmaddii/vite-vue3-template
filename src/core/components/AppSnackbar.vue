<script setup lang="ts">
import { computed } from "vue";
import { useSnackbarStore } from "@/stores/snackbar"; 

const snackbarStore = useSnackbarStore();
const snackbar = computed(() => snackbarStore.snackbarDetail);

const show = computed({
  get() {
    return snackbarStore.show;
  },
  set(value) {
    if (!value) {
      snackbarStore.hideSnackbar(); 
    }
  },
});
</script>

<template>
  <v-snackbar
    v-model="show"
    :color="snackbar?.type"
    :location="snackbar.location"
    :timeout="snackbar?.duration"
    @update:model-value="show = $event"
  >
    {{ snackbar?.message }}

    <template #actions>
      <v-btn
        icon="mdi-close"
        color="white"
        @click="snackbarStore.hideSnackbar()"
      />
    </template>
  </v-snackbar>
</template>


<style lang="scss">
.snackbar {
  direction: rtl;
  visibility: hidden;
  position: fixed;
  left: 50%;
  bottom: 30px !important;
  right: auto;
  transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  // margin-left: -157px;
  background-color: #ff0000;
  color: #fff;
  text-align: center;
  padding: 10px 12px;
  min-width: 300px !important;
  z-index: 999;
  border-radius: 7px;
  font-size: 0.875rem;

  &.info {
    background-color: #2e2e2e;
  }

  &.warn {
    bottom: 67px !important;
    font-size: 13px !important;
    background-color: #e9c81c;
    color: white;
    border-right: 3px solid #e9c81c;
    border-left: 3px solid #e9c81c;
  }

  &.success {
    bottom: 67px !important;
    font-size: 13px !important;
    background-color: var(--v-primary-base);
    color: white;
    border-right: 3px solid var(--v-primary-base);
    border-left: 3px solid var(--v-primary-base);
  }

  .snackbar__close {
    position: absolute;
    left: 12px;
    cursor: pointer;
  }

  .snackbar__message {
    line-height: 2;
  }
}

.snackbar.show {
  visibility: visible;
}

.animation-fade {
  -webkit-animation: fadein 1s, fadeout 1s 3.5s;
  animation: fadein 1s, fadeout 1s 3.5s;
}

.animation-fadein {
  -webkit-animation: fadein 1s;
  animation: fadein 1s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }

  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }

  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }

  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }

  to {
    bottom: 0;
    opacity: 0;
  }
}

</style>
