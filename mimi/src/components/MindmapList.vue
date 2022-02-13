<template>
  <div>
    <ul>
      <li 
        v-for="mindmap,idx in mindmaps"
        :key="idx"> 
        <router-link
          :to="this.url + mindmap">  
          {{mindmap}}
        </router-link> 
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    url:{
      type: String, 
    }
  }, 
  async mounted(){
    const resp = await fetch(this.url);
    const data = await resp.json(); 
    this.mindmaps = data.mindmaps; 
  }, 
  data(){
    return{
      mindmaps: [],  
    }
  }
}
</script>
