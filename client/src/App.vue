<template>
  <v-app>
    <v-toolbar dark color='indigo'>
      <h1>HacktivOverflow</h1>
      <v-btn flat @click="toHome" >Home</v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-if="isLogin==false" @click="toLogin" flat >Log-in</v-btn>
        <v-btn v-if="isLogin" @click="toDashboard" flat >Dashboard</v-btn>
        <v-btn v-if="isLogin" @click="logOut" flat >Log-out</v-btn>
        <v-btn v-if="isLogin==false" @click="toRegister" flat >Register</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view :url="url" @user-login="userLogin" >
      </router-view>
    </v-content>
    <v-footer
      dark
      height="auto"
    >
      <v-card
        flat
        tile
        class="text-xs-center"
        color='indigo'
      >
        <v-card-text>
          <h1>HacktivOverflow</h1>
        </v-card-text>

        <v-card-text>
          Help fellow programmers to answer their questions, so you will be helped when you have trouble, with HacktivOverflow we connect all programmers to help each other. Don't worry there is no fee of all our services, this is all completely free.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          &copy;2019 — <strong>HacktivOverflow</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {

  },
  data () {
    return {
      isLogin: false,
      url: 'https://hacktivoverflow-server.patriagani.site',
    }
  },
  methods: {
    toHome() {
      this.$router.push(`/`)
    },
    toDashboard() {
      this.$router.push(`/dashboard`)
    },
    toLogin() {
      this.$router.push(`/login`)
    },
    toRegister() {
      this.$router.push(`/register`)
    },
    userLogin() {
      this.isLogin = true
    },
    logOut() {
      localStorage.clear()
      this.isLogin = false
      this.$router.push(`/`)
    }
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.isLogin = true
    }
  }
}

</script>
