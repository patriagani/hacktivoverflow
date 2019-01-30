<template>
  <div class="">
    <v-container grid-list-md text-xs>
      <br>
      <v-card>
        <v-container fluid
        grid-list-lg>
          <v-layout row wrap>
            <v-flex xs2>
              <center>
              <v-btn v-if="isLogin" @click="upVoteQuestion(question._id)" dark color="indigo">Up Vote</v-btn>
              <br>
              <h1>{{(question.upvotes.length - question.downvotes.length)}}</h1>
              <v-btn v-if="isLogin" @click="downVoteQuestion(question._id)" dark color="orange">Down Vote</v-btn>
              </center>
            </v-flex>
            <v-flex xs10>
              <h1>{{question.title}}</h1>
              <h3>Question By: {{question.creator.name}}, on {{new Date(question.date_created).toString()}}</h3>
              <br>
              <p>{{question.description}}</p>
              <h4>Code:</h4>
              <pre class="prettyprint">
                {{question.code}}
              </pre>
              <br>
              <hr>
              <br>
              <h3>{{question.answers.length}} Answers</h3>
              <br>
              <hr>
              <br>
              <div v-for="answer in question.answers">
                <v-container fluid
                grid-list-lg>
                <v-layout row wrap>
                  <v-flex xs2>
                    <center>
                    <v-btn v-if="isLogin" @click="upVoteAnswer(answer._id)" dark color="indigo">Up Vote</v-btn>
                    <br>
                    <h1>{{(answer.upvotes.length - answer.downvotes.length)}}</h1>
                    <v-btn v-if="isLogin" @click="downVoteAnswer(answer._id)" dark color="orange">Down Vote</v-btn>
                    </center>
                  </v-flex>
                  <v-flex xs10>
                    <h3>Answer By: {{answer.creator.name}}, on {{answer.date_created.slice(0,10)}}</h3>
                    <br>
                    <p>{{answer.description}}</p>
                    <div v-if="answer.code">
                      <h4>Code:</h4>
                      <pre class="prettyprint">
                        {{answer.code}}
                      </pre>
                    </div>
                  </v-flex>
                </v-layout>
                </v-container>
              </div>
              <br>
              <h3 v-if="isLogin">Your Answer: </h3>
              <br>
              <v-form
              ref="form"
              v-if="isLogin"
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
              @click="postAnswer"
              >
              Post Answer
              </v-btn>

              </v-form>
            </v-flex>
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
        isLogin: false,
        question: {},
        answer: {},
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
      getAnswer(id) {
        console.log('panggil answer');
        axios.get(`${this.url}/answers/${id}`)
          .then((response) => {
            this.answer = response.data
          })
          .catch((error) => {
            console.log(error);
          })
      },
      postAnswer() {
        let obj ={
          creator: localStorage.getItem('id'),
          question: this.question._id,
          description: this.description,
          code: this.code
        }

        axios.post(`${this.url}/answers/`, obj)
          .then((response) => {
            this.question.answers.push(response.data._id)
            return axios.patch(`${this.url}/questions/${this.$route.params.questionId}`, { $push: { answers: response.data._id } })
          })
          .then((response) => {
            this.getQuestion()
            this.description = ""
            this.code = ""
            console.log('berhasil tambah answers');
          })
          .catch((error) => {
            console.log(error);
          })
      },
      upVoteAnswer(id){
        let votersId = localStorage.getItem('id')

        axios.get(`${this.url}/answers/${id}`)
          .then((response) => {
            this.answer = response.data
            if (this.answer.upvotes.indexOf(votersId) == -1) {
              axios.patch(`${this.url}/answers/${id}`, { $push: { upvotes: localStorage.getItem('id') } })
              .then((response) => {
                if (this.answer.downvotes.indexOf(votersId) != -1) {
                  axios.patch(`${this.url}/answers/${id}`, { $pull: { downvotes: localStorage.getItem('id') } })
                }
                this.getQuestion()
              })
              .catch((error) => {
                console.log(error);
              })
            }
            else {
              axios.patch(`${this.url}/answers/${id}`, { $pull: { upvotes: localStorage.getItem('id') } })
              .then((response) => {
                this.getQuestion()
              })
              .catch((error) => {
                console.log(error);
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })

      },
      downVoteAnswer(id){
        let votersId = localStorage.getItem('id')

        axios.get(`${this.url}/answers/${id}`)
          .then((response) => {
            this.answer = response.data
            if (this.answer.downvotes.indexOf(votersId) == -1) {
              axios.patch(`${this.url}/answers/${id}`, { $push: { downvotes: localStorage.getItem('id') } })
              .then((response) => {
                if (this.answer.upvotes.indexOf(votersId) != -1) {
                  axios.patch(`${this.url}/answers/${id}`, { $pull: { upvotes: localStorage.getItem('id') } })
                }
                this.getQuestion()
              })
              .catch((error) => {
                console.log(error);
              })
            }
            else {
              axios.patch(`${this.url}/answers/${id}`, { $pull: { downvotes: localStorage.getItem('id') } })
              .then((response) => {
                this.getQuestion()
              })
              .catch((error) => {
                console.log(error);
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })

      },
      upVoteQuestion(id) {
        let votersId = localStorage.getItem('id')
        if (this.question.upvotes.indexOf(votersId) == -1) {
          axios.patch(`${this.url}/questions/${id}`, { $push: { upvotes: localStorage.getItem('id') } })
            .then((response) => {
              if (this.question.downvotes.indexOf(votersId) != -1) {
                axios.patch(`${this.url}/questions/${id}`, { $pull: { downvotes: localStorage.getItem('id') } })
              }
              return axios.get(`${this.url}/questions/${this.$route.params.questionId}`)
            })
            .then((response) => {
              this.question = response.data
            })
            .catch((error) => {
              console.log(error);
            })
        }
        else {
          axios.patch(`${this.url}/questions/${id}`, { $pull: { upvotes: localStorage.getItem('id') } })
            .then((response) => {
              this.getQuestion()
            })
            .catch((error) => {
              console.log(error);
            })
        }
      },
      downVoteQuestion(id) {
        let votersId = localStorage.getItem('id')
        if (this.question.downvotes.indexOf(votersId) == -1) {
          axios.patch(`${this.url}/questions/${id}`, { $push: { downvotes: localStorage.getItem('id') } })
            .then((response) => {
              if (this.question.upvotes.indexOf(votersId) != -1) {
                axios.patch(`${this.url}/questions/${id}`, { $pull: { upvotes: localStorage.getItem('id') } })
              }
              return axios.get(`${this.url}/questions/${this.$route.params.questionId}`)
            })
            .then((response) => {
              this.question = response.data
            })
            .catch((error) => {
              console.log(error);
            })
        }
        else {
          axios.patch(`${this.url}/questions/${id}`, { $pull: { downvotes: localStorage.getItem('id') } })
            .then((response) => {
              this.getQuestion()
            })
            .catch((error) => {
              console.log(error);
            })
        }
      }
    },
    created() {
      this.getQuestion()
    },
    mounted() {
      if (localStorage.getItem('token')) {
        this.isLogin = true
      }
      else {
        this.isLogin = false
      }
    }
  }
</script>
