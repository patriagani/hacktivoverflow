<template>
  <div class="">
    <v-container grid-list-md text-xs>
      <br>
      <v-card>
        <v-container fluid
        grid-list-lg>
        <center>
        <h1>Edit Your Answer on: {{answer.question.title}}</h1>
        </center>
        <v-form
        ref="form"
        >

        <v-textarea
        v-model="description"
        label="Description"
        required
        ></v-textarea>

        <v-textarea
        v-model="code"
        label="Code"
        required
        ></v-textarea>

        <v-btn
        color="success"
        @click="updateAnswer"
        >
        Update Answer
      </v-btn>

    </v-form>
          <v-layout row wrap>
          </v-layout>
        </v-container>
      </v-card>


    </v-container>
  </div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'

  export default {
    components: {
      // HelloWorld
    },
    data: () => {
      return {
        answer: {},
        code: "",
        description: ""
      }
    },
    props: ['url'],
    methods: {
      getAnswer() {
        axios.get(`${this.url}/answers/${this.$route.params.answerId}`)
          .then((response) => {
            this.answer = response.data
          })
          .catch((error) => {
            console.log(error);
          })
      },

      updateAnswer() {
        let obj = {
          title: this.title,
          description: this.description,
          code: this.code
        }
        axios.patch(`${this.url}/answers/${this.$route.params.answerId}`, obj)
          .then((response) => {
            this.$router.push('/dashboard')
          })
          .catch((error) => {
            console.log(error);
          })
      }
    },
    created() {
      this.getAnswer()
    },
    mounted() {
      if (!localStorage.getItem('token')) {
        this.$router.push('/login')
      }
      if (localStorage.getItem('id') !== this.answer.creator) {
        this.$router.push('/dashboard')
      }
    },
    watch: {
      answer: function(value) {
        this.code = value.code
        this.description = value.description
      }
    }
  }
</script>
