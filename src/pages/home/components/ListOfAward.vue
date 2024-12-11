<template>
  <p class="lh-24 fw-700 fs-14 text-surface-n40 mb-3">
    جوایز من
  </p>
  <div class="d-flex flex-column ga-5">
    <div
      v-for="(item, index) in listAward"
      :key="index"
      class="list-award"
      @click="handleClickOnAward(item)"
    >
      <CardOfAward
        :title="item.rewardTitle as string"
        :image-src="item.smallIcon as string"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CardOfAward from "./CardOfAward.vue";
import type {IUserRewards} from "@/core/models/user-info.interface";

defineProps<{
  listAward: IUserRewards[];
}>();

const emit = defineEmits<{
  (event: "awardClick", typeAward: IUserRewards): void;
}>();

const handleClickOnAward = (award: IUserRewards) => {
  emit("awardClick", award);
};
</script>

<style lang="scss" scoped>
.list-award {
  justify-items: center;
}
</style>
