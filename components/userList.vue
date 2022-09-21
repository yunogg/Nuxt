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
          <!-- </template> -->
        </v-card-actions>
        <v-data-table
          :headers="headers"
          :items="users"
          class="elevation-1"
          :loading="loading">
            <template v-slot:item="{ item }">
              <tr @click="clickPop(item.user_id)" >
                <td>{{ item.user_no}}</td>
                <td>{{ item.user_id}}</td>
                <td>{{ item.user_nm}}</td>
                <td>{{ item.dept_nm}}</td>
                <td>{{ item.user_tel}}</td>
                <td>{{ item.user_mail }}</td>
                <td>{{ item.user_role }}</td>
                <td>{{ item.user_auth }}</td>
                <td>{{ item.use_yn }}</td>
                <td>{{ item.register_dt }}</td>
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
                        <span class="text-h5">사용자 등록</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                                <v-text-field
                                label="id"
                                v-model="userObject.user_id"
                                :rules="[required]"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                label="이름"
                                v-model="userObject.user_nm"
                                :rules="[required]"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                                <v-text-field
                                label="부서"
                                v-model="userObject.dept_nm"
                                :rules="[required]"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-select
                                :items="['Admin', 'Dev']"
                                label="역할"
                                v-model="userObject.user_role"
                                :rules="[required]"
                              ></v-select>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-select
                                :items="['register','approve']"
                                label="권한"
                                v-model="userObject.user_auth"
                                :rules="[required]"
                              ></v-select>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                label="연락처"
                                v-model="userObject.user_tel"
                                placeholder="000-0000-0000"
                                :rules="telRules"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-col cols="12">
                              <v-text-field
                                label="이메일"
                                v-model="userObject.user_mail"
                                prepend-icon="mdi-account"
                                :rules="emailRules"
                              ></v-text-field>
                            </v-col>
                          <v-row>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn v-if="userObject.user_no"
                          color="red darken-1"
                          text
                          @click="deleteUser(userObject.user_id)"
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
  data () {
    return {
      users : [],
      dialog : false,
      dialogTitle : "Customer Delete Dialog",
      dialogText : "Do you want to delete this customer?",
      showSearchPanel : false,
      userObject : {
        user_no : "",
        user_id : "",
        user_nm : "",
        dept_nm : "",
        user_tel : "",
        user_mail : "",
        user_role : "",
        user_auth : "",
        use_yn : "",
        register_dt : "",
      },
      headers : [
          { text: "NO",value: "user_no", sortable: true },
          { text: "계정",value: "user_id", sortable: true },
          { text: "이름",value: "user_nm", sortable: true },
          { text: "부서", value: "dept_nm", sortable: true },
          { text: "연락처", value: "user_tel", sortable: true },
          { text: "메일", value: "user_mail", sortable: true },
          { text: "역할", value: "user_role", sortable: true },
          { text: "권한", value: "user_auth", sortable: true },
          { text: "사용여부", value: "use_yn", sortable: true },
          { text: "등록일", value: "register_dt", sortable: true },
      ],
      loading: false,
      emailRules: [
        v => !!v || '이메일 입력 필수',
        v => /.+@.+\..+/.test(v) || '이메일 형식 오류',
      ],
      telRules: [
        v => !!v || '연락처 입력 필수',
        v => /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/.test(v) || '연락처 형식 오류',
      ],
    }
  },

  methods: {
    async list() {
      if (this.loading) return
        try {
          let rslt = await this.$axios.get('/api/user/selectAllUserObject')
          console.log(rslt.data);
          //데이터 없을 경우 예외처리
             if (!rslt.data){
               console.log("this is false")
               this.loading = false
               alert("데이터가 없습니다");
               return false;
             }
           this.users = rslt.data
           this.loading = false
        } catch (e){
          alert("error")
          this.returnMsg = e.message
          this.loading = false
        }
    },
    async clickPop(user_id) {
      this.selectUserObject(user_id);
      this.dialog = true;
      //this.openDialog()
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
          if( !this.userObject.user_id || !this.userObject.user_nm || !this.userObject.user_tel || !this.userObject.dept_nm || !this.userObject.user_mail|| !this.userObject.user_role|| !this.userObject.user_auth) {
            alert("입력 내용 확인 필요");
            return false;
          }
          let jsonArray = JSON.stringify(this.userObject);
          console.log(jsonArray);
          console.log("user_id : " + this.userObject.user_id);
          if(this.userObject.user_no){
            let rslt = await this.$axios.get('/api/user/update', {params : { data: jsonArray}})
            if(rslt) alert("변경 완료!")
            this.closeDialog();
          }else{
          jsonArray = JSON.stringify(this.userObject);
          let rslt = await this.$axios.get('/api/user/save', {params : { data: jsonArray}})
          if(rslt) alert("저장 완료!")
            this.closeDialog();
          }
        } catch (e){
          alert("error")
          this.returnMsg = e.message
          //console.log(returnMsg);
        }
    },
    async saveDialog() {
        try {
          if( !this.userObject.user_id || !this.userObject.user_nm || !this.userObject.user_tel || !this.userObject.dept_nm || !this.userObject.user_mail|| !this.userObject.user_role|| !this.userObject.user_auth) {
            alert("입력 내용 확인 필요");
            return false;
          }
          let jsonArray = JSON.stringify(this.userObject);
          console.log(jsonArray);
          console.log("user_id : " + this.userObject.user_id);
          if(this.userObject.user_no){
            let rslt = await this.$axios.get('/api/user/update', {params : { data: jsonArray}})
            if(rslt) alert("변경 완료!")
            this.closeDialog();
          }else{
          jsonArray = JSON.stringify(this.userObject);
          let rslt = await this.$axios.get('/api/user/save', {params : { data: jsonArray}})
          if(rslt) alert("저장 완료!")
            this.closeDialog();
          }
        } catch (e){
          alert("error")
          this.returnMsg = e.message
          //console.log(returnMsg);
        }
    },
    initialState() {
      this.userObject = {
        user_no: "",
        user_id: "",
        user_nm:"",
        dept_nm:"",
        user_tel:"",
        user_mail: "",
        user_role: "",
        user_auth: "",
        register_dt: ""
      },
      this.itemFields = [];
      //this.releaseObject. = ''
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
    async selectUserObject(user_id) {
      try {
        let rslt1 = await this.$axios.get('/api/user/selectUserObject', {params : { user_id : user_id }})
        //let rslt1 = await this.$axios.get('/api/user/selectAll')
        console.log(rslt1);
        rslt1 = rslt1.data[0];
        console.log("rslt1 = " + rslt1);
        this.userObject.user_no = rslt1.user_no || '';
        this.userObject.user_id = rslt1.user_id || '';
        this.userObject.user_nm = rslt1.user_nm || '';
        this.userObject.dept_nm = rslt1.dept_nm || '';
        this.userObject.user_tel = rslt1.user_tel || '';
        this.userObject.user_mail = rslt1.user_mail || '';
        this.userObject.user_role = rslt1.user_role || '';
        this.userObject.user_auth = rslt1.user_auth || '';
        this.userObject.use_yn = rslt1.use_yn || '';
        this.userObject.register_dt = rslt1.register_dt || '';
      } catch (e){
        alert("error")
        this.returnMsg = e.message
      }
    },
    deleteUser(user_id) {
      try {
        if(confirm("사용자를 삭제하시겠습니까?")){
          let rslt = this.$axios.get('/api/user/delete', {params : { user_id : user_id }})
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
    },
  },
  mounted() {
    this.list();
  }
}
</script>
