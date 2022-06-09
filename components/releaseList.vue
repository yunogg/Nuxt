<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <!-- <v-flex xs12 sm6 md4 v-for="article in articles" :key="article._id">
        {{article}}
      </v-flex> -->
      <v-flex xs12>
        <v-card-actions>
          <v-btn color="info" @click="list">조회</v-btn>
        </v-card-actions>
        <v-data-table
          :headers="headers"
          :items="articles"
          :loading="loading"
          @click:row="handleClick()">
          <template slot="items" slot-scope="props">
              <td :class="headers[0].class">{{ props.item.release_dt}}</td>
              <td :class="headers[1].class">{{ props.item.sys_code }}</td>
              <td :class="headers[2].class">{{ props.item.work_code }}</td>
              <td :class="headers[3].class">{{ props.item.title }}</td>
              <td :class="headers[4].class">{{ props.item.register_dt }}</td>
              <td :class="headers[5].class">{{ props.item.register_id }}</td>
              <td :class="headers[6].class">{{ props.item.approve_id }}</td>
              <td :class="headers[7].class">{{ props.item.release_YN }}</td>
          </template>
        </v-data-table>
        <!-- <b-modal id="modal-lg" size="lg">
        
        </b-modal> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

export default {
  name: 'App',
  data () {
    return {
      // ..
      articles: [],
      headers: [
        { text: '예정일', value: 'release_dt', sortable: true },
        { text: '시스템', value: 'sys_code', sortable: true },
        { text: '업무', value: 'work_code', sortable: true },
        { text: '제목', value: 'title', sortable: true },
        { text: '등록일', value: 'register_dt', sortable: true },
        { text: '등록자', value: 'register_id', sortable: true },
        { text: '승인자', value: 'approve_id', sortable: true },
        { text: '배포여부', value: 'release_YN', sortable: true },
      ],
      loading: false
      // ..
    }
  },
  // ..
  methods: {
    // ..
    async list () {
      if (this.loading) return
        try {
          this.loading = true
          let rslt = await this.$axios.get('/api/article')
          console.log(rslt)
          this.articles = rslt.data
          console.log(rslt.data)
          this.loading = false
        } catch (e){
          alert("error")
          this.returnMsg = e.message
          this.loading = false
        }
    },
    handleClick() {
      alert(1)
      console.log(item)
    }
  }
}
</script>