<template>
  <v-app>
      <v-card width="400" class="mx-auto mt-5">
      <v-card-title class="pb-0">
        <h1>SignUp</h1>
      </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Email"
                name="email"
                prepend-icon="mdi-account"
                :rules="emailRules"
                type="text"
                v-model="email"
              ></v-text-field>
              <v-text-field 
                label="Username"
                name="username" 
                prepend-icon="mdi-account-circle"
                :rules="[required]"
                type="text"
                v-model="username"
              ></v-text-field>
              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
                :rules="[required, min8]"
                required
              ></v-text-field>
              <v-text-field
                id="confirm"
                label="Confirm Password"
                name="confirm"
                prepend-icon="mdi-alert-circle-check"
                type="password"
                v-model="confirm"
                :rules="[required, matchingPasswords]"
              ></v-text-field>
            </v-form>
          </v-card-text>
            <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="success" @click="$router.push('/login')">로그인</v-btn>
            <v-btn color="info" @click="signup">등록</v-btn>
          </v-card-actions>
        </v-card>
        </v-app>
</template>

<script>
export default {
    data: () => ({
      showPassword: false,
      valid: true,
      email: '',
      username: '',
      password: '',
      confirm: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
    }),
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
      min8: function(value) {
        if (value.length >= 8) {
          this.value = true
          return true;
        } else {
          this.valid = false
          return 'Password should have more than 8 characters.';
        }
      },
      matchingPasswords: function() {
        if (this.password === this.confirm) {
          this.value = true
          return true;
        } else {
          this.valid = false
          return 'Passwords does not match.';
        }
      },
      signup: function() {
        alert("등록!");
      },
    },
}
</script>