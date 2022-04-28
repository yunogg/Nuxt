<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title class="pb-0">
        <h1>Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="UserId" 
            label="Username" 
            prepend-icon="mdi-account-circle"
          />
          <v-text-field
            v-model="UserPwd" 
            :type="showPassword ? 'text' : 'password'" 
            label="Password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success" @click="$router.push('/signup')">등록</v-btn>
        <v-btn color="info" @click="login" >로그인</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      showPassword: false,
      UserId: '',
      UserPwd: '',
    }
  },
  methods: {
    //login: function() {
    //let vm = this.UserId;
    
    async login () {
      try {
        console.log("login go")
        //let rslt = await this.$axios.get('/api/user')
        //let rslt = await this.$axios.get('/api')
        let rslt = await this.$axios.get('/api/',{params: {id: this.UserId, pw: this.UserPwd}})
        //let rslt = await this.$axios.get('/api/login')
        //let rslt = await this.$axios.get('https://jsonplaceholder.typicode.com/users/')
        //console.log(rslt)
        //console.log(rslt.data)
        // await this.$store.dispatch('check', {
        //   id: this.UserId,
        //   pw: this.UserPwd
        // }).then(() => this.redirect())
        // this.$http.post('api/check', {
        //   id: this.UserId,
        //   pwd: this.UserPwd
        // }).then(console.log("ththth")
        console.log(rslt.data)
      } catch (e) {
        console.log("err");
        this.returnMsg = e.message
      }
    },
    redirect () {
      console.log("redirect")
      this.$router.push('/Main')
    },
      //Main페이지 이동
      //this.$router.push('/main')
      
      //this.$auth.loginWithRedirect();
      
      //const package = await $http.$get('https://unpkg.com/nuxt/package.json')
      //var rslt = await $http.get('https://jsonplaceholder.typicode.com/users/')
      // console.log(rslt);
      // this.$http.get('api/movies')
      // .then((response) => {
      //   response.data? $push('/signup') : $push('/signup')
      // })
    async fetchSomething() {
      alert("fetch something");
      let rslt = await this.$axios.get('https://jsonplaceholder.typicode.com/users/')
      console.log(rslt);
      console.log(rslt.data[0].username);
    },
    // async login2 () {
    //   try {
    //     await this.$store.dispatch('login', {
    //       id: this.frmId,
    //       pw: this.frmPw
    //     }).then(() => this.redirect())
    //   } catch (e) {
    //     this.returnMsg = e.message
    //   }
    // },
  }
}
</script>