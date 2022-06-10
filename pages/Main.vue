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
                <v-list-item @click="this.$router.push('/login')">
                  <v-list-item-content>
                    <v-list-item-title>
                      releaseList
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
            <releaseList></releaseList>
            </v-sheet>
          </v-col>
        </v-row>
                  

      </v-container>

    </v-main>
  </v-app>
</template>

<script>
import releaseList from '../components/releaseList.vue'

  export default {
    data: () => ({
      links: [
        'admin',
        'logout'
      ],
      menus: [
        {
          title: 'ReleaseList',
          vertical: 'ReleaseList',
          link: '/releaseList'
        },
        {
          title: 'Order',
          vertical: 'Order',
          link: '/orders'
        },
        {
          title: 'Customer',
          vertical: 'Customer',
          link: '/customers'
        },
        {
          title: 'Product',
          vertical: 'Product',
          link: '/products'
        },
        {
          title: 'About',
          vertical: 'About',
          link: '/about'
        }
      ]
    }),
    components: {
      releaseList
    }
  }
</script>