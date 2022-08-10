<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="32"
        ></v-avatar>

        <v-btn
          v-for="link in links"
          :key="link"
          text
        >
          {{ link }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item-group
                  color="primary"
                >
                  <v-list-item
                    v-for="(menu, i) in menus"
                    :key="i"
                    @click="setCurrentView(menu.title)"
                  >
                    <v-list-item-icon>
                      <v-icon v-text="menu.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="menu.title" ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
            <component v-bind:is="currentView"></component>
            <!--<releaseList></releaseList>-->
            <!--<userList></userList>-->
            <!--<about></about>-->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import releaseList from '../pages/releaseList.vue'
import userList from '../pages/userList.vue'
import about from '../pages/about.vue'

function requireAuth() {
//function requireAuth(to: TODO, from: TODO, next: TODO) {
  console.log("requireAuth");
  // console.log(`userModule.isSignedI ${userModule.isSignedIn}`);
  // if (!userModule.isSignedIn) {
  //   next({
  //     path: "/login",
  //     query: { redirect: to.fullPath }
  //   });
  // } else {
  //   next();
  // }
}

  export default {
    data: () => ({
      currentView: 'releaseList',
      links: [
        'admin',
        'logout'
      ],
      menus: [
        {
          title: 'ReleaseList',
          vertical: 'ReleaseList',
          link: '/releaseList',
          icon: 'mdi-folder',
          beforeEnter: requireAuth
        },
        {
          title: 'userList',
          vertical: 'userList',
          link: '/userList',
          icon: 'mdi-account'
        },
        {
          title: 'about',
          vertical: 'about',
          link: '/about',
          icon: 'mdi-info'
        },
      ]
    }),
    components: {
      releaseList,
      userList,
      about
    },
    methods: {
      setCurrentView(link) {
        this.currentView = link
      },
    }
  }
</script>