<template>
<div>
  <h1>{{thisRoute}}</h1>
  <MindmapCanvas :canvasName="mindmap"/> 
</div> 
</template>

<script>
import MindmapCanvas from './MindmapCanvas';
export default {
    components:{MindmapCanvas},  
    mounted(){
        this.mindmap = this.$route.params.mindmap; 
    },
    computed: {
        thisRoute(){
            return 'This Mindmap = ['+this.mindmap+']';
        }
    }, 
    data(){
        return{
            mindmap: '',
        }
    }

}
</script>
