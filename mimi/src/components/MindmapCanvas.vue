<template>
    <div>
        <button @click="handleDelete">Delete</button>
        <canvas 
            height="600" 
            width="1800" 
            ref="canvas"
            @mousedown="handleMouseDown"
            @mousemove="handleMouseMove"
            @mouseup="handleMouseUp" 
            >
        </canvas>
    </div> 
</template>

<script>
import TextObject from '../utils/Textbox';
export default {
    props:{
        canvasName: {
           type : String
        }, 
    }, 
    mounted(){
        this.ctx = this.$refs.canvas.getContext("2d");
        window.addEventListener("keydown", (event) =>{
            this.keyPressed = event.key;
            this.keyPressedCount++; 
        });
    },
    watch:{
        keyPressedCount(){ 
            this.handleKeyDown(); 
        }
    }, 
    data(){
        return{
            clickLoc: {x:null, y:null}, 
            keyPressed: '',
            keyPressedCount: 0,  
            ctx: '',
            activeTextBox: null,
            textboxes: [],
            dragging: false,
            dragStart: {}, 
            dragEnd: {}, 
        }
    }, 
    methods:{
        // returns: TextObject || Null 
        getTextBoxAtLocation(x, y){
            return this.textboxes.find(textbox => textbox.inBoundingBox(x, y));  
        }, 
        handleMouseDown(e){
            // set and log canvas clicks 
            const {x, y} = this.getCursorPosition(this.$refs.canvas, e);
            this.clickLoc = {x, y}; 
            // is there a textbox at given location
            const textbox = this.getTextBoxAtLocation(x, y);
            if(textbox){
                this.activeTextBox = textbox;
                this.dragging = true;
                this.dragStart = {x, y}; 
            }else{
                this.activeTextBox = new TextObject(this.ctx, x, y);
                this.textboxes.push(this.activeTextBox); 
            }
            this.redrawCanvas();  
        },
        handleMouseMove(e){
            if(!this.dragging) return 
            const {x, y} = this.getCursorPosition(this.$refs.canvas, e);
            const offsetX = x - this.clickLoc.x; 
            const offsetY = y - this.clickLoc.y; 
            this.activeTextBox.x += offsetX; 
            this.activeTextBox.y += offsetY;
            this.clickLoc = {x, y}; 
            this.redrawCanvas(); 
        },
        handleMouseUp(e){
            if(this.dragging){
                const {x, y} = this.getCursorPosition(this.$refs.canvas, e);
                this.clickLoc = {x, y}; 
                this.dragEnd = {x, y}; 
                let dragOccured = Math.abs(this.dragStart.x - this.dragEnd.x) >= 1 && Math.abs(this.dragStart.y - this.dragEnd.y) >=1;
                // was just a click 
                if(!dragOccured){
                    this.activeTextBox.toggleSelected();  
                }
            }
            this.dragging = false;
            this.redrawCanvas();
        }, 
        handleKeyDown(){
            if(!this.activeTextBox) return 

            if(this.keyPressed.length === 1){
                this.activeTextBox.text += this.keyPressed;
            }
            if(this.keyPressed === "Enter"){
                this.activeTextBox.text += "\n"; 
            }
            if(this.keyPressed === "Backspace"){
                if(this.activeTextBox.text.length === 0) return; 
                this.activeTextBox.text = this.activeTextBox.text.slice(0, this.activeTextBox.text.length -1); 
            }
            this.redrawCanvas(); 
        },
        // deletes selected textboxes 
        handleDelete(){
            this.textboxes = this.textboxes.filter(textbox => !textbox.isSelected());
            this.activeTextBox = null;   
            this.redrawCanvas();
        }, 
        redrawCanvas(){
            this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
            // draw every textbox except for the active textbox 
            this.textboxes.forEach(textbox =>{
                if(textbox !== this.activeTextBox){
                    this.drawTextBox(textbox); 
                }
            });
            // draw active textbox last so that it gives the appearance that it is being dragged 
            // over top the other textboxes
            if(!this.activeTextBox) return 
            this.drawTextBox(this.activeTextBox); 
        },
        drawTextBox(textbox){
            if(!textbox) return 
            // need to draw textbox before textlines as it fills a rect with white in its implementation 
            textbox.drawTextBox(); 
            textbox.drawTextLines();
        }, 
        getCursorPosition(canvas,event){  
            const rect = canvas.getBoundingClientRect(); 
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            return {x, y};  
        }, 
    }
}
</script>

<style scoped>
canvas{
    border: 1px solid; 
}
</style>