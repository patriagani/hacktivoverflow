<template>
  <div>
    <v-jumbotron
      v-if="viewquestion == false && ischristmas == true"
      height="100vh"
      dark
      src="https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/1733951/1360/906/m1/fpnw/wm1/etiqvk3f4nphmidizbovjvbb3hknfxavvsqaujeqo794ptgu7a5bmxupgmmvihzx-.jpg?1475761847&s=d58fe38f735fdf2fa9d9d36b0306deb1"
    >
      <v-container fill-height>
        <v-layout align-center>
          <v-flex text-xs-center>
            <h3 class="display-3">Merry Christmas</h3>
            <h3>HacktivOverflow</h3>
            <h2>We help you to answer your unaswered question</h2>
            <h5>Just kidding :)</h5>
            <br><br>
            <v-btn flat outline large @click="displayQuestion">
              Explore Now
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>

    <v-jumbotron
      v-if="viewquestion == false && isnewyear == true"
      height="100vh"
      dark
      src="http://freshxmas.com/wp-content/uploads/2018/11/animatedew-year-images-extraordinary-photo-inspirations-years-fireworks-animation_7je4m8vb__f0000-animation-motion-background-storyblocks-video.png"
    >
      <v-container fill-height>
        <v-layout align-center>
          <v-flex text-xs-center>
            <h3 class="display-3">Happy New Year</h3>
            <h3>HacktivOverflow</h3>
            <h2>We help you to answer your unaswered question</h2>
            <h5>Just kidding :)</h5>
            <br><br>
            <v-btn flat outline large @click="displayQuestion">
              Explore Now
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>

    <v-jumbotron
      v-if="viewquestion == false && defaulthome == true"
      :gradient="gradient"
      height="100vh"
      dark
      src="https://i.ytimg.com/vi/KFqsdtEabk0/maxresdefault.jpg"
    >
      <v-container fill-height>
        <v-layout align-center>
          <v-flex text-xs-center>
            <h3 class="display-3">HacktivOverflow</h3>
            <h2>We help you to answer your unaswered question</h2>
            <h5>Just kidding :)</h5>
            <br><br>
            <v-btn flat outline large @click="displayQuestion">
              Explore Now
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>

    <div v-if="viewquestion">
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
  </div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'

  export default {
    components: {
      // HelloWorld
    },
    data() {
      return {
        allques: [],
        ischristmas: false,
        defaulthome: true,
        isnewyear: false,
        viewquestion: false,
        gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)'
      }
    },
    props: ['url'],
    methods: {
      getQuestions() {
        this.allques = []
        axios.get(`${this.url}/questions`)
          .then((response) => {
            response.data.forEach((question) => {
              this.allques.push(question)
            })
            this.allques.reverse()
          })
          .catch((error) => {
            console.log(error.message);
          })
      },
      displayQuestion() {
        this.viewquestion = true
      },
      bigdayCheck() {
        axios.get(`${this.url}/bigday`)
          .then((response) => {
            if (response.data.christmas) {
              this.ischristmas = true
              this.defaulthome = false
            }
            else if (response.data.newyear) {
              this.isnewyear = true
              this.defaulthome = false
            }
            else {
              this.defaulthome = true
            }
          })
          .catch((error) => {
            console.log(error);
          })
      }
    },
    created() {
      this.getQuestions()
      this.bigdayCheck()
    },
  }
</script>
