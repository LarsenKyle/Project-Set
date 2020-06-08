<template>
  <div class="Grades">
    <h3
      @click="() => {this.addGradeHandler = !this.addGradeHandler}"
      align="left"
      class="pt-4"
    >Grade Format</h3>
    <v-icon
      @click="() => {this.addGradeHandler = !this.addGradeHandler}"
      class="mt-4 in-line"
      large
    >mdi-arrow-down-bold-hexagon-outline</v-icon>
    <v-radio-group row>
      <v-radio label="YDS/V Scale" value="radio-1"></v-radio>
      <v-radio label="European" value="radio-2"></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
export default {
  name: "GymGrades",
  data() {
    return {
      addGradeHandler: false
    };
  }
};
</script>

<style>
.in-line {
  display: inline;
}
</style>