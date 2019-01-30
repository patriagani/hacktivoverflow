<template>
  <div class="">
    <v-container grid-list-md text-xs>
      <center>
      <div>
        <v-btn @click="allQuestions" dark color="indigo">All Questions</v-btn>
        <v-btn @click="yourQuestion" dark color="indigo">Your Questions</v-btn>
        <v-btn @click="yourAnswers" dark color="indigo">Your Answers</v-btn>
        <v-btn @click="createQuestion" dark color="indigo">Create Question</v-btn>
      </div>
     </center>
      <br>
      <div v-if="page == 'createquestion'">
        <center><h1>Create New Question</h1></center>
        <br>
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
        @click="createNewQuestion"
        >
        Create New Question
        </v-btn>

        </v-form>
      </div>
      <div v-if="page == 'allquestions'">
        <v-card v-for="question in allques">
          <v-container
            fluid
            grid-list-lg
          >
            <v-card-title>
              <router-link :to="{ name: 'question', params: {questionId: question._id} }"><h2>{{question.title}}</h2></router-link>
            </v-card-title>
            <v-card-text>
              <h4>Votes: {{(question.upvotes.length - question.downvotes.length)}} | Answer: {{question.answers.length}}</h4>
              <p>By: {{question.creator.name}}</p>
            </v-card-text>
          </v-container>
        </v-card>
      </div>
      <div v-if="page == 'yourquestion'">
        <v-card v-for="question in yourques">
          <v-container
            fluid
            grid-list-lg
          >
            <v-layout row wrap>
              <v-flex xs8>
                <v-card-title>
                  <router-link :to="{ name: 'question', params: {questionId: question._id} }"><h2>{{question.title}}</h2></router-link>
                </v-card-title>
                <v-card-text>
                  <h4>Votes: {{(question.upvotes.length - question.downvotes.length)}} | Answer: {{question.answers.length}}</h4>
                  <p>By: {{question.creator.name}}</p>
                </v-card-text>
              </v-flex>
              <v-flex xs4>
                <v-card-actions>
                  <br>
                  <v-btn @click="editQuestion(question._id)" dark color="blue">Edit Question</v-btn>
                  <v-btn @click="deleteQuestion(question._id)" dark color="orange">Delete Question</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </div>
      <div v-if="page == 'youranswers'">
        <v-card v-for="answer in yourans">
          <v-container
            fluid
            grid-list-lg
          >
            <v-layout row wrap>
              <v-flex xs8>
                <v-card-title>
                  <h2>Your answer on: </h2>
                  <router-link :to="{ name: 'question', params: {questionId: answer.question._id} }"><h2>{{answer.question.title}}</h2></router-link>
                </v-card-title>
                <v-card-text>
                  <p>{{answer.description}}</p>
                  <h4>Votes: {{(answer.upvotes.length - answer.downvotes.length)}}</h4>
                  <p>Question By: {{answer.question.creator.name}}</p>
                </v-card-text>
              </v-flex>
              <v-flex xs4>
                <v-card-actions>
                  <br>
                  <v-btn @click="editAnswer(answer._id)" dark color="blue">Edit Answer</v-btn><br>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </div>
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
        page: "allquestions",
        allques: [],
        yourques: [],
        yourans: [],

        title: "",
        description: "",
        code: "",
      }
    },
    props: ['url'],
    methods: {
      allQuestions() {
        this.page = "allquestions"
      },
      yourQuestion() {
        this.page = "yourquestion"
      },
      yourAnswers() {
        this.page = "youranswers"
      },
      createQuestion() {
        this.page = "createquestion"
      },
      toQuestion(id) {
        this.$router.push(`/question/${id}`)
      },
      getQuestions() {
        this.allques = []
        this.yourques = []
        axios.get(`${this.url}/questions`)
          .then((response) => {
            response.data.forEach((question) => {
              this.allques.push(question)
              if (question.creator._id == localStorage.getItem('id')) {
                this.yourques.push(question)
              }
            })
            this.allques.reverse()
          })
          .catch((error) => {
            console.log(error.message);
          })
      },
      createNewQuestion() {
        let obj = {
          creator: localStorage.getItem('id'),
          title: this.title,
          description: this.description,
          code: this.code,
        }

        axios.post(`${this.url}/questions`, obj)
          .then((response) => {
            console.log('Berhasil tambah question');
            this.allques = []
            this.getQuestions()
            this.page = "allquestions"
          })
          .catch((error) => {
            console.log(error);
          })
      },
      editQuestion(id) {
        this.$router.push(`/question/edit/${id}/`)
      },
      editAnswer(id) {
        this.$router.push(`/answer/edit/${id}/`)
      },
      deleteQuestion(id) {
        axios.delete(`${this.url}/questions/${id}`)
          .then((response) => {
            this.getQuestions()
            return axios.delete(`${this.url}/answers/many/${id}`)
          })
          .then((response) => {
            console.log('berhasil delete answer juga, ini mau get question');
          })
          .catch((error) => {
            console.log(error);
          })

      },
      getAnswers() {
        axios.get(`${this.url}/answers/user/${localStorage.getItem('id')}`)
        .then((response) => {
          this.yourans = response.data
        })
        .catch((error) => {
          console.log(error.message);
        })
      }
    },
    created() {
      this.getQuestions()
      this.getAnswers()
    },
    mounted() {
      if (!localStorage.getItem('token')) {
        this.$router.push('/login')
      }
    },
  }
</script>
