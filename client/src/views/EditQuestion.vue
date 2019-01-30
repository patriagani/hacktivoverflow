<template>
  <div class="">
    <v-container grid-list-md text-xs>
      <br>
      <v-card>
        <v-container fluid
        grid-list-lg>
        <center>
        <h1>Edit Your Question: {{question.title}}</h1>
        </center>
        <v-form
        ref="form"
        >

        <v-text-field
        v-model="title"
        label="Title"
        required
        ></v-text-field>

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
        @click="updateQuestion"
        >
        Update Question
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
        question: {},
        title: "",
        code: "",
        description: ""
      }
    },
    props: ['url'],
    methods: {
      getQuestion() {
        axios.get(`${this.url}/questions/${this.$route.params.questionId}`)
          .then((response) => {
            this.question = response.data
          })
          .catch((error) => {
            console.log(error);
          })
      },

      updateQuestion() {
        let obj = {
          title: this.title,
          description: this.description,
          code: this.code
        }
        axios.patch(`${this.url}/questions/${this.$route.params.questionId}`, obj)
          .then((response) => {
            this.$router.push('/dashboard')
          })
          .catch((error) => {
            console.log(error);
          })
      }
    },
    created() {
      this.getQuestion()
    },
    mounted() {
      if (!localStorage.getItem('token')) {
        this.$router.push('/login')
      }
      if (localStorage.getItem('id') !== this.question.creator) {
        this.$router.push('/dashboard')
      }
    },
    watch: {
      question: function(value) {
        this.title = value.title
        this.code = value.code
        this.description = value.description
      }
    }
  }
</script>
