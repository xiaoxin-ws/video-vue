<template>
  <div class="pa-3">
    <h3>热门课程</h3>
    <v-container>
      <v-row>
        <v-col md="3" v-for="(item, i) in courses" :key="i">
          <v-hover v-slot:default="{ hover }" >
            <v-card :to="`/courses/${item._id}`" max-width="400" :elevation="hover ? 12 : 2">
              <v-img
                class="white--text align-end"
                height="200px"
                :src="item.cover"
              >
                <v-card-title>{{ item.name }}</v-card-title>
              </v-img>

              <v-card-subtitle class="pb-0">{{ item.name }}</v-card-subtitle>

              <v-card-text class="text--primary">
                <div>{{ item.createdAt }}</div>
                <div>{{ item.updatedAt }}</div>
              </v-card-text>

              <v-card-actions>
                <v-btn color="orange" text>
                  Share
                </v-btn>

                <v-btn color="orange" text>
                  Explore
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
    <div class="text-center">
      
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const res = await $axios.$get('courses')
    return {
      courses: res.data
    }
  }
}
</script>
<style></style>
