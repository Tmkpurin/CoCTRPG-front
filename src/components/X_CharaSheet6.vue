<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card-text>{{ investigatorname }}</v-card-text>
        <v-card-text>{{ occupation }}</v-card-text>
      </v-col>
      <v-col cols="6">
        <v-img :src="image" height="20" cover></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
defineProps({
  // eslint-disable-next-line vue/prop-name-casing
  _id: {
    type: String,
    default: '',
  },
  investigatorname: {
    type: String,
    default: '',
  },
  occupation: {
    type: String,
    default: '',
  },
  collegesdegrees: {
    type: String,
    default: '',
  },
  birthplace: {
    type: String,
    default: '',
  },
  mentaldisorders: {
    type: String,
    default: '',
  },
  sex: {
    type: String,
    default: '',
  },
  age: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  str: {
    type: Number,
    default: 0,
  },
  con: {
    type: Number,
    default: 0,
  },
  pow: {
    type: Number,
    default: 0,
  },
  dex: {
    type: Number,
    default: 0,
  },
  app: {
    type: Number,
    default: 0,
  },
  siz: {
    type: Number,
    default: 0,
  },
  int: {
    type: Number,
    default: 0,
  },
  edu: {
    type: Number,
    default: 0,
  },
  idea: {
    type: Number,
    default: 0,
  },
  know: {
    type: Number,
    default: 0,
  },
  luck: {
    type: Number,
    default: 0,
  },
  hp: {
    type: Number,
    default: 0,
  },
  mp: {
    type: Number,
    default: 0,
  },
  san: {
    type: Number,
    default: 0,
  },
  db: {
    type: String,
    default: '',
  },
  spothidden: {
    type: Number,
    default: 0,
  },
  listen: {
    type: Number,
    default: 0,
  },
  libraryuse: {
    type: Number,
    default: 0,
  },
})
</script>
