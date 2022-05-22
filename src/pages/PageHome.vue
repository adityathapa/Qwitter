<template>
  <q-page>
    <q-scroll-area style="height: 100vh; width:100%;">
      <div class="row q-pa-md items-end q-gutter-sm">
      <div class="col">
        <q-input class="newQweet" bottom-slots v-model="newQweetContent" placeholder="What's happening?" counter maxlength="280" autogrow>
        <template v-slot:before>
          <q-avatar size="45px">
            <img src="https://cdn.quasar.dev/img/avatar5.jpg">
          </q-avatar>
        </template>

        <template v-slot:append>
          <q-icon size="sm" v-if="newQweetContent !== ''" name="close" @click="newQweetContent = ''" class="cursor-pointer" />
        </template>
        </q-input>
      </div>
      <div class="col col-shrink q-mb-lg">
        <q-btn @click="addQweet" unelevated rounded color="primary" label="Qweet" no-caps :disable="!newQweetContent" />
      </div>
    </div>

    <q-separator class="q-mt-md border-check" size="10px" color="grey-3"/>

    <div>
      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated slideInLeft slow"
          leave-active-class="animated slideOutLeft slow"
        >
        <q-item class="q-py-md" v-for="qweet in qweets" :key="qweet.id">
          <q-item-section avatar top>
            <q-avatar size="45px">
              <img src="https://cdn.quasar.dev/img/avatar5.jpg">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-bold text-subtitle1">GamingOnLinux 
              <span class="text-grey-7 text-body2">@gamingonlinux
              <br class="lt-md">&bull; {{ relativeDate(qweet.date) }}  
              </span>
              </q-item-label>
              
            <q-item-label class="text-body1 qweet-content">
              {{qweet.content}}
            </q-item-label>

            <div class="row q-mt-md qweet-icons">
              <div class="col">
                <q-btn flat round color="grey" icon="chat"/>
              </div>
              <div class="col">
                <q-btn flat round color="grey" icon="cached" />
              </div>
              <div class="col">
                <q-btn flat round :color="qweet.liked ? 'red' : 'grey'" icon="favorite" @click="setLike(qweet)" />
                <span class="text-body2">{{qweet.numberOfLikes}}</span>
              </div>
              <div class="col">
                <q-btn @click="deleteQweetFromDatabase(qweet)" flat round color="grey" icon="delete" />
              </div>
            </div>
          </q-item-section>

          <q-item-section side top>
            
          </q-item-section>
        </q-item>
      </transition-group>
      </q-list>
    </div>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { formatDistance } from 'date-fns'
import db from 'src/boot/firebase'
import { collection, query, orderBy, doc, where, addDoc, deleteDoc, onSnapshot, updateDoc } from "firebase/firestore";
 

export default defineComponent({
  name: 'PageHome',
  data() {
    return {
      newQweetContent: '',
      qweets: [
      ]
    }
  },
  methods: {
    relativeDate(value) {
      return(formatDistance(value, new Date))+" ago"
    },
    addQweet(){
      console.log("New qweet added")
      let newQweet = {
        content: this.newQweetContent,
        date: Date.now(),
        liked: false,
        numberOfLikes: 0
      }
      const docRef = addDoc(collection(db, "qweets"), newQweet).then(() => {
        this.newQweetContent = ''
      });
    },
    deleteQweetFromDatabase(qweet){
      let idToDelete = qweet.id
      const docRef = deleteDoc(doc(db, "qweets", idToDelete)).then(() => {
        console.log("Deleted successfully")
      })
    },
    deleteQweet(qweet){ //autoupdating
      console.log("Deleting qweet")
      let idToDelete = qweet.id
      let index = this.qweets.findIndex(qweet => qweet.id === idToDelete)
      this.qweets.splice(index, 1)
    },
    reflectChanges(qweet){
      this.qweets.unshift(qweet)
    },
    likeCheck(qweet){
      return (qweet.liked == true)
    },
    setLike(qweet){
      if(qweet.liked)
      {
        qweet.liked = false
        qweet.numberOfLikes--
        this.updateLikes(qweet)
      }
      else{
        qweet.liked = true
        qweet.numberOfLikes++
        this.updateLikes(qweet)
      }
    },
    updateLikes(qweet){
      let idToUpdate = qweet.id
      let likedStatus = qweet.liked
      let numberOfLikesStatus = qweet.numberOfLikes

      const updateRef = doc(db, "qweets", idToUpdate)

      const docRef = updateDoc(updateRef, {
        liked : likedStatus,
        numberOfLikes: numberOfLikesStatus
      })
    }
  },
  mounted() {
    const q = query(collection(db, "qweets"), orderBy('date'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let qweetChange = change.doc.data()
        qweetChange.id = change.doc.id
        if (change.type === "added") {
            console.log("New qweet: ", this.reflectChanges(qweetChange))
        }
        if (change.type === "modified") {
            console.log("Modified qweet: ", qweetChange);
        }
        if (change.type === "removed") {
            console.log("Removed qweet: ", this.deleteQweet(qweetChange));
        }
      });
    });
  },
})
</script>

<style lang="sass">
.qweets
  font-size: 15px

.newQweet
  font-size: 17px

.border-check
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4

div .qweet-icons
  margin-left: -10px

div .qweet-content
  white-space: pre-line

</style>