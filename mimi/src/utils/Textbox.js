import drawPolygon from "./polygon";

class TextObject{ 
    constructor(ctx, x, y){
        this.ctx = ctx; 
        this.x = x; 
        this.y = y;
        this.text = "Start Typing"; 
        this.selected = false;
        this.paddingVertical = 10; 
        this.paddingHorizontal = 10; 
        this.setDefaultProperties(); 
    }
    setDefaultProperties(){
        this.ctx.font = "30px Arial";
        this.ctx.lineWidth = 3; 
    }
    getFontDimensions = (text) =>{
        const metrics = this.ctx.measureText(text);  
        const width = metrics.width;
        let height = Math.abs(metrics.fontBoundingBoxDescent) +  Math.abs(metrics.fontBoundingBoxAscent);
        // firefox bug 
        if(!height){
            height = this.ctx.measureText("M"); 
        }
        return {width, height};  
    }
    drawTextLines(){
        const textLines = this.text.split("\n"); 
        for(let i = 0; i < textLines.length; i++){
            const {height} = this.getFontDimensions(textLines[i]);
            this.ctx.fillText(textLines[i], this.x, this.y + (i* height) ); 
        }
    }
    getMaxWidth(){
        let maxWidth =0;
        const textLines = this.text.split("\n"); 
        for(let i = 0; i < textLines.length; i++){
            const {width} = this.getFontDimensions(textLines[i]); 
            if(width > maxWidth){
                maxWidth = width; 
            }
        }
        return maxWidth; 
    }
    // returns top x and y and width and height of box 
    getBoxDimensions(){
        const textLines = this.text.split("\n"); 
        const {height} = this.getFontDimensions("Text"); // arbitrary text 
        const maxWidth = this.getMaxWidth(); 
        // this is not an exact science, it is the one that works best visually with experimentation 
        return [this.x - this.paddingHorizontal, 
                this.y - height - this.paddingVertical,
                maxWidth + (2*this.paddingHorizontal), 
                (textLines.length + 1 )*height + (2*this.paddingVertical)]; 
    }
    drawTextBox(){
        const [x, y, width, height] = this.getBoxDimensions();
        const points = [[x , y ], 
                        [x+width, y], 
                        [x+width, y+height], 
                        [x, y+height]]; 
        if(this.selected){
            this.ctx.strokeStyle = "red"; 
        }
        this.ctx.fillStyle = "white"; 
        this.ctx.fillRect(x, y, width, height); // fill text box to be white
        this.ctx.fillStyle = "black"; 
        drawPolygon(this.ctx, points, 20); // 20 is the radius 
        this.ctx.stroke();
        this.ctx.strokeStyle = "black";
    }
    inBoundingBox(x, y){
        const [thisX, thisY, width, height] = this.getBoxDimensions();
        return (x >= thisX && x <= thisX + width) && (y >= thisY && y <= thisY + height); 
    }
    isSelected(){
        return this.selected === true; 
    }
    // param: value = true || false 
    setSelected(value){
        this.selected = value; 
    }
    toggleSelected(){
        this.selected = !this.selected; 
    }
    setText(newText){
        this.text = newText; 
    }

}

// export this code 
export default TextObject;   