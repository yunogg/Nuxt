<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card-actions>
          <v-btn color="info" @click="list">조회</v-btn>
          <v-btn
            color="primary"
            @click="dialog = true"
            >
          등록
          </v-btn>
          <v-btn
            color="error"
            @click="approveReleaseObject"
            >
          배포승인
          </v-btn>
          <v-btn
            color="warning"
            @click="cancelReleaseObject"
            >
          승인취소
          </v-btn>
        </v-card-actions>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="items"
          item-key="release_id"
          class="elevation-1"
          show-select
          @click:row="clickPop"
          :loading="loading">
            <!-- <template v-slot:item="{ item }">
              <tr @click="clickPop(item.release_id)" >
                <td>{{ item.release_dt}}</td>
                <td>{{ item.sys_code }}</td>
                <td>{{ item.work_code }}</td>
                <td>{{ item.content }}</td>
                <td>{{ item.register_dt }}</td>
                <td>{{ item.register_id }}</td>
                <td>{{ item.approve_id }}</td>
                <td>{{ item.approve_YN }}</td>
                <td>{{ item.release_YN }}</td>
              </tr>
            </template> -->
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
                                  v-model="datePick"
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
                                    @input="datePick = false"
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
                                    remove
                                </v-btn>
                              </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn v-if="releaseObject.release_id"
                          color="red darken-1"
                          text
                          @click="deleteItem(releaseObject.release_id)"
                        >
                          delete
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="closeDialog"
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
        this.list();
  },
  data () {
    return {
      selected: [],
      datePick : false,
      dialog : false,
      itemFields : [],
      items : [],
      releaseObject : {
        release_id : "",
        release_dt : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        app_code : "ERP",
        sys_code : "",
        work_code : "",
        content : ""
      },
      headers: [
        { text: '예정일', value: 'release_dt', sortable: true },
        { text: '시스템', value: 'sys_code', sortable: true },
        { text: '업무', value: 'work_code', sortable: true },
        { text: '내용', value: 'content', sortable: true },
        { text: '등록일', value: 'register_dt', sortable: true },
        { text: '등록자', value: 'register_id', sortable: true },
        { text: '승인자', value: 'approve_id', sortable: true },
        { text: '승인여부', value: 'approve_YN', sortable: true },
        { text: '배포여부', value: 'release_YN', sortable: true },
      ],
      loading: false
    }
  },
  methods: {
    async list() {
      if (this.loading) return
        try {
          this.loading = true
          let rslt = await this.$axios.get('/api/release/select')
          console.log(rslt.data)
          //데이터 없을 경우 예외처리
            if (!rslt.data){
              console.log("this is false")
              this.loading = false
              alert("데이터가 없습니다");
              return false;
            }
          this.items = rslt.data
          console.log(rslt.data)
          this.loading = false
        } catch (e){
          alert("error")
          this.returnMsg = e.message
          this.loading = false
        }
    },
    clickPop(event, {item}) {
      this.selectReleaseObject(item.release_id);
      this.dialog = true;
      this.openDialog()
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
          let jsonArray = JSON.stringify(this.releaseObject);
          console.log(jsonArray);
          let sourceItems = JSON.stringify(this.itemFields)
          console.log("count : " + this.itemFields.length)
          console.log("release_id : " + this.releaseObject.release_id);
          if(this.releaseObject.release_id){
            let rslt = await this.$axios.get('/api/release/update', {params : { data: jsonArray}})
            if(this.itemFields.length > 0){
              let rslt1 = await this.$axios.get('/api/release/deleteItems', {params : { release_id : this.releaseObject.release_id }})
              let rslt2 = await this.$axios.get('/api/release/saveItems', {params : { release_id : this.releaseObject.release_id , sourceItems: sourceItems }})
            }
            if(rslt|| rslt1 || rslt2) alert("변경 완료!")
            this.closeDialog();
          }else{
          let result = await this.$axios.get('/api/release/makeReleaseId')
          let next_id = result.data
          this.releaseObject.release_id = this.releaseObject.app_code + '_' + next_id
          jsonArray = JSON.stringify(this.releaseObject);
          let rslt = await this.$axios.get('/api/release/save', {params : { data: jsonArray}})
          if(this.itemFields.length > 0){
            let rslt2 = await this.$axios.get('/api/release/saveItems', {params : { release_id : this.releaseObject.release_id , sourceItems: sourceItems }})
          }
          if(rslt || rslt2) alert("저장 완료!")
            this.closeDialog();
          }
        } catch (e){
          alert("error")
          this.returnMsg = e.message
          //console.log(returnMsg);
        }
      
    },
    async selectReleaseObject(release_id) {
      try {
        let rslt1 = await this.$axios.get('/api/release/selectReleaseObject', {params : { release_id : release_id }})
        rslt1 = rslt1.data;
        this.releaseObject.release_id = rslt1.release_id || '';
        this.releaseObject.release_dt = rslt1.release_dt || '';
        this.releaseObject.app_code = rslt1.app_code || '';
        this.releaseObject.sys_code = rslt1.sys_code || '';
        this.releaseObject.work_code = rslt1.work_code || '';
        this.releaseObject.content = rslt1.content || '';
        let rslt2 = await this.$axios.get('/api/release/selectReleaseObjectItems', {params : { release_id : release_id }})
        console.log("selectReleaseObjectItems : " + JSON.stringify(rslt2.data));
        let objectItems = [];
        objectItems = rslt2.data;
        console.log("objectItems : " + objectItems);
         for (let i = 0; i < objectItems.length; i++) {
          console.log(objectItems[i]);
          let itemArray = {};
          itemArray.label1 = "source"
          itemArray.value1 = objectItems[i].source_path;
          console.log("itemArray : " + JSON.stringify(itemArray));
          this.itemFields.push(itemArray);
         }
      } catch (e){
        alert("error")
        this.returnMsg = e.message
      }
    },
    approveReleaseObject() {
      if(confirm("게시물을 승인하시겠습니까?")){
        try {
          for(var key in this.selected) {
            let rslt1 = this.$axios.get('/api/release/approveReleaseObject', {params : { release_id : this.selected[key].release_id }})
            if(!rslt1) {
              throw 'error';
            }
          }
          } catch (e){ 
            alert("error")
            this.returnMsg = e.message
          } finally {
            this.list();
            this.selected = [];
          }
      }
    },
    cancelReleaseObject() {
      if(confirm("게시물을 승인 취소하시겠습니까?")){
        try {
          for(var key in this.selected) {
            let rslt1 = this.$axios.get('/api/release/cancelReleaseObject', {params : { release_id : this.selected[key].release_id }})
              if(!rslt1) {
              throw 'error';
            }
          }
        } catch (e){ 
          alert("error")
          this.returnMsg = e.message
        } finally {
            this.list();
            this.selected = [];
        }
      }
    },
    add() {
        this.itemFields.push({ 
          label1: "source", 
          value1: ""
        })
     },
     remove(index) {
         this.itemFields.splice(index, 1)
     },

     initialState(){
      this.releaseObject = {
        release_id: "",
        release_dt: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        app_code: "ERP",
        sys_code: "",
        work_code: "",
        content: ""
      },
      this.itemFields = [];
      //this.releaseObject. = ''
     },

    parseDate(date) {
      console.log(date);
      if (!date) return null
      //const [month, day, year] = date.split('-')
      const [year, month, day] = date.split('-')
      //console.log('${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}');
      console.log(date.split('-'))
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

    deleteItem(release_id) {
      try {
        if(confirm("게시물을 삭제하시겠습니까?")){
          let rslt = this.$axios.get('/api/release/delete', {params : { release_id : release_id }})
          if(rslt) {
            alert("삭제 완료!");
            this.closeDialog();
          }else{
            throw 'error';
          }
        }
      } catch (e){
        alert("error")
        this.returnMsg = e.message
      };
    }
  }
}
</script>