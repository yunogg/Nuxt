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
            v-bind="attrs"
            v-on="on"
            @click="dialog = true"
          >
          등록
          </v-btn>
          <!-- </template> -->
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
                                      <v-dialog
                                        ref="dialog"
                                        v-model="modal"
                                        :return-value.sync="date"
                                        persistent
                                        width="290px"
                                      >
                                        <template v-slot:activator="{ on, attrs }">
                                          <v-text-field
                                            v-model="date"
                                            label="배포일"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                          ></v-text-field>
                                        </template>
                                        <v-date-picker
                                          v-model="date"
                                          scrollable
                                        >
                                          <v-spacer></v-spacer>
                                          <v-btn
                                            text
                                            color="primary"
                                            @click="modal=false"
                                          >
                                            Cancel
                                          </v-btn>
                                          <v-btn
                                            text
                                            color="primary"
                                            @click="$refs.dialog.save(date)"
                                          >
                                            OK
                                          </v-btn>
                                        </v-date-picker>
                                      </v-dialog>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-select
                                :items="['MIS', 'BIS']"
                                label="시스템구분"
                                required
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
                                required
                              ></v-select>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                label="배포명"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                label="배포내용"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-select
                                :items="['0-17', '18-29', '30-54', '54+']"
                                label="Age*"
                                required
                              ></v-select>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-autocomplete
                                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                label="Interests"
                                multiple
                              ></v-autocomplete>
                            </v-col>
                            </v-row>
                            <v-row>

                              <v-btn @click="add" class="primary">add</v-btn>
                              <br>
                              <div
                                v-for="(textField, i) in textFields"
                                :key="i"
                                class="text-fields-row"
                                >
                                  <v-text-field
                                  :label="textField.label1"
                                  v-model="textField.value1"
                                  ></v-text-field>
                                  <v-btn @click="remove(i)" class="error">delete</v-btn>
                                </div>

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
                          @click="dialog = false"
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
      // ..
      modal: false,
      dialog: false,
      textFields: [],
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
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    add () {
        this.textFields.push({ 
          label1: "foo", 
          value1: "",
          label2: "bar",
          value2: ""
        })
     },
    
     remove (index) {
         this.textFields.splice(index, 1)
     }
  }
}
</script>