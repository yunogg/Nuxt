<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <!-- <v-flex xs12 sm6 md4 v-for="article in articles" :key="article._id">
        {{article}}
      </v-flex> -->
      <v-flex xs12>
        <v-card-actions>
          <v-btn color="info" @click="list">조회</v-btn>
          <!-- <template v-slot:activator="{ on, attrs }"> -->
          <v-btn
            color="primary"
            @click="dialog = true"
            >
          등록
          </v-btn>
            <v-btn
            color="red"
            dark
            >
          삭제
          </v-btn>
          <!-- </template> -->
        </v-card-actions>
        <v-data-table
          :headers="headers"
          :items="articles"
          :loading="loading">
            <template v-slot:item="{ item }">
              <tr @click="clickPop(item.release_id)" >
                <td>{{ item.release_dt}}</td>
                <td>{{ item.sys_code }}</td>
                <td>{{ item.work_code }}</td>
                <td>{{ item.content }}</td>
                <td>{{ item.register_dt }}</td>
                <td>{{ item.register_id }}</td>
                <td>{{ item.approve_id }}</td>
                <td>{{ item.release_YN }}</td>
              </tr>
            </template>
        </v-data-table>
                  <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="600px"
                  >

                    <v-card>
                      <v-card-title>
                        <span class="text-h5">배포 등록</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                                <v-menu
                                  v-model="menu2"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="auto"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      v-model="releaseObject.release_dt"
                                      label="배포일"
                                      prepend-icon="mdi-calendar"
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                      @blur="date = parseDate(releaseObject.release_dt)"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="releaseObject.release_dt"
                                    @input="menu2 = false"
                                  ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-select
                                :items="['공통', 'MIS', 'BIS']"
                                label="시스템구분"
                                v-model="releaseObject.sys_code"
                                :rules="[required]"
                              ></v-select>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-select
                                :items="['APP', 'DB']"
                                label="업무구분"
                                v-model="releaseObject.work_code"
                                :rules="[required]"
                              ></v-select>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                label="배포내용"
                                v-model="releaseObject.content"
                                :rules="[required]"
                              ></v-text-field>
                            </v-col>
                              <v-col cols="12">
                                <v-btn @click="add" class="primary">add</v-btn>
                              </v-col>
                              <br>
                              <v-col
                                v-for="(itemField, i) in itemFields"
                                :key="i"
                                cols="12">
                                <v-text-field
                                  :label="itemField.label1"
                                  v-model="itemField.value1">
                                </v-text-field>
                                <v-btn @click="remove(i)"
                                  class="error">
                                    delete
                                </v-btn>
                              </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialog = false"
                        >
                          Close
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="saveDialog"
                        >
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

export default {
  name: 'App',
  mounted:function(){
        //this.list();
  },
  data () {
    return {
      // ..
      menu2: false,
      dialog: false,
      itemFields: [],
      articles: [],
      releaseObject : {
        release_id: "",
        release_dt: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        app_code: "ERP",
        sys_code: "",
        work_code: "",
        content: ""
      },
      headers: [
        { text: '예정일', value: 'release_dt', sortable: true },
        { text: '시스템', value: 'sys_code', sortable: true },
        { text: '업무', value: 'work_code', sortable: true },
        { text: '내용', value: 'content', sortable: true },
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
          let rslt = await this.$axios.get('/api/article/select')
          console.log(rslt)
          //데이터 없을 경우 예외처리
            if (!rslt){
              this.loading = false
              return
            }
          this.articles = rslt.data
          console.log(rslt.data)
          this.loading = false
        } catch (e){
          alert("error")
          this.returnMsg = e.message
          this.loading = false
        }
    },
    clickPop(release_id) {
      alert(release_id)
    },
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
      this.list()
      this.initialState()
    },
    async saveDialog() {
        try {
          if( !this.releaseObject.sys_code || !this.releaseObject.work_code || !this.releaseObject.content ) {
            alert("입력 내용 확인 필요");
            return false;
          }
          let sourceItems = JSON.stringify(this.itemFields)
          console.log("count : " + this.itemFields.length)
          let result = await this.$axios.get('/api/article/makeReleaseId')
          let next_id = result.data
          this.releaseObject.release_id = this.releaseObject.app_code + '_' + next_id
          let jsonArray = JSON.stringify(this.releaseObject);
          console.log(jsonArray);
          let rslt = await this.$axios.get('/api/article/save', {params : { data: jsonArray}})
          let rslt2 = await this.$axios.get('/api/article/itemSave', {params : { release_id : this.releaseObject.release_id , sourceItems: sourceItems }})
          if(rslt || rslt2) alert("저장 완료!")
            this.closeDialog();
        } catch (e){
          alert("error")
          this.returnMsg = e.message
          //console.log(returnMsg);
        }
      
    },
    add () {
        this.itemFields.push({ 
          label1: "source", 
          value1: ""
        })
     },
    
     remove (index) {
         this.itemFields.splice(index, 1)
     },
     initialState(){
      this.releaseObject.release_dt = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
      this.releaseObject.sys_code = ''
      this.releaseObject.work_code = ''
      this.releaseObject.content = ''
      //this.releaseObject. = ''
     },
    parseDate (date) {
      if (!date) return null
      const [month, day, year] = date.split('-')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    required: function(value) {
        if (value) {
          this.value = true
          return true;
        } else {
          this.valid = false
          return 'This field is required.';
        }
    },  
  }
}
</script>