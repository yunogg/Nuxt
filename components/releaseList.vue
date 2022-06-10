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
          :loading="loading">
            <template v-slot:item="{ item }">
              <tr @click="clickPop(item.realease_id)" v-b-modal.modal-lg>
                <td>{{ item.release_dt}}</td>
                <td>{{ item.sys_code }}</td>
                <td>{{ item.work_code }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.register_dt }}</td>
                <td>{{ item.register_id }}</td>
                <td>{{ item.approve_id }}</td>
                <td>{{ item.release_YN }}</td>
              </tr>
            </template>
        </v-data-table>

        <v-dialog v-model="dialog" persistent max-width="900px">
          <v-card>
            <v-card-title>
              <template>
                <span class="headline" large>소스목록</span>
              </template>
              <v-spacer></v-spacer>
              <v-btn icon @click="closeDialog()"> 
                닫기
              </v-btn>
            </v-card-title>
            <!-- <v-card-text>
              <v-row>
                <v-col cols="12" sm="12" md="12" style="position: relative; border:1px solid #41B883; border-style:dashed; ">
                  소스리스트내역
                </v-col>
              </v-row>
            </v-card-text> -->
          </v-card>
        </v-dialog>

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
        { text: '제목', value: 'content', sortable: true },
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
    clickPop(realease_id) {
      alert(realease_id)
    },
    openDialog() { //Dialog 열리는 동작
      this.dialog = true;
    },
    closeDialog() { //Dialog 닫히는 동작
      this.dialog = false;
    },
  }
}
</script>