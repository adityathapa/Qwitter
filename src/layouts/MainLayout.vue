<template>
  <q-layout view="lHr lpR fFf">

    <q-header class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <span class="text-weight-bold gt-sm">{{ $route.name }}</span>
          <q-icon class="q-pa-sm lt-md absolute-center" name="ion-logo-twitter" size="sm" color="primary" />
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered :width="225">
      <!-- drawer content -->
      <q-icon class="q-pa-sm q-mb-md" name="ion-logo-twitter" size="md" color="primary" />
      <q-list>
          <q-item clickable exact v-ripple to="/">
            <q-item-section avatar>
              <q-icon name="ion-home" size="md" />
            </q-item-section>

            <q-item-section class="fontSize text-weight-bold">Home</q-item-section>
          </q-item>

          <q-item clickable exact v-ripple to="/about">
            <q-item-section avatar>
              <q-icon name="ion-help-circle" size="md"  />
            </q-item-section>

            <q-item-section class="fontSize text-weight-bold">About</q-item-section>
          </q-item>

          <q-item clickable exact v-ripple>
            <q-item-section avatar>
              <q-icon color="black" name="ion-notifications" size="md"  />
            </q-item-section>

            <q-item-section class="fontSize text-weight-bold">Notifications</q-item-section>
          </q-item>
      </q-list>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
      <q-input class="q-ma-sm" rounded standout bottom-slots dense label="Search Qwitter">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
        <template v-slot:append>
          <q-icon name="close" @click="text = ''" class="cursor-pointer" />
        </template>
      </q-input>

      <q-list padding seperator>
        <q-item>
          <q-item-section>
            <q-item-label overline class="text-grey">Ukraine conflict</q-item-label>
            <q-item-label class="text-weight-bold">Ukrainian troops fight Russian advance on Kyiv</q-item-label>
            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label overline class="text-grey">Ukraine conflict</q-item-label>
            <q-item-label class="text-weight-bold">Indian students stranded in Ukraine seek help to come home</q-item-label>
            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label overline class="text-grey">Science</q-item-label>
            <q-item-label class="text-weight-bold">NASA</q-item-label>
            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>

<style scoped>

.fontSize{
  font-size: 18px;
}
</style>