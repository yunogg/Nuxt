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
            :rules="[required]"
          />
          <v-text-field
            v-model="UserPwd" 
            :type="showPassword ? 'text' : 'password'" 
            label="Password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[required]"
            @click:append="showPassword = !showPassword"
            @keyup.enter="login"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success" @click="$router.push('/signup')">등록</v-btn>
        <v-btn color="info" @click="login">로그인</v-btn>
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
    required: function(value) {
        if (value) {
          this.value = true
          return true;
        } else {
          this.valid = false
          return 'This field is required.';
        }
    },   
    async login () {
      if(this.UserId.length < 1 || this.UserPwd.length < 1) {
        alert("ID 또는 비밀번호를 입력하세요.")
        return false
        }
      try {
        console.log("login go")
        //let rslt = await this.$axios.get('/api/user')
        //let rslt = await this.$axios.get('/api')
        let rslt = await this.$axios.get('/api/',{params: {id: this.UserId, pw: this.UserPwd}})
        //let rslt = await this.$axios.get('https://jsonplaceholder.typicode.com/users/')
        // await this.$store.dispatch('check', {
        //   id: this.UserId,
        //   pw: this.UserPwd
        // }).then(() => this.redirect())
        console.log(rslt.data)
        if(rslt.data){
          this.redirect(this.$router.push('/main'))
        }else{
          alert("ID 또는 비밀번호를 확인하세요.")
        }
        
      } catch (e) {
        console.log("err");
        this.returnMsg = e.message
      }
    },
    redirect () {
      console.log("redirect")

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
  }
}
</script>