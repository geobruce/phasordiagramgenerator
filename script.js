var svg;
document.addEventListener("DOMContentLoaded", function(event) {
    
    svg = document.getElementById("labels");
    let textArea = document.getElementById("input_names");
    

    document.getElementById("btn_process").addEventListener("click", function() {
        svg.innerHTML = ''; //Every time the button is clicked clear the SVG and start a clean drawing
        drawLabels();
    });
    
});
function drawLabels(){

    let textArea = document.getElementById("input_names");

    let lines = textArea.value.split("\n"); //Make an array where each item is based on one line of the label name list
    
    let rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    let label_width = 30; // document.getElementById("label-width").value;
    let label_height = 20;//document.getElementById("label-height").value;
    let label_spacing = 3; //document.getElementById("label-spacing").value;
  let label_margin = 1;
  console.log(label_spacing);
    let x0 = 0;
    let y0 = 0;
  
    let stock_width = document.getElementById("stock-width").value;
    let stock_height = document.getElementById("stock-height").value;
    let printed_labels = 0;
    //shape = document.getElementsByTagName("svg")[0];
    svg.setAttribute("viewBox", "0 0 " + stock_width + " " + stock_height); 
    svg.appendChild(drawRect(0,0,stock_width,stock_height,"stroke-width:1; fill: none; stroke: #990000"));
    let labelsInRow = Math.floor(stock_width/(label_width+label_spacing));
    
    for(var i = 0; i < lines.length; i++){
        let fontSize = label_height;
        svg.appendChild(drawRect(x0,y0,label_width,label_height,"stroke-width:1; fill: none; stroke: #009900"));
        textline = drawText(x0+label_width/2,y0+label_height/2,lines[i],fontSize);
        svg.appendChild(textline);
        var box = textline.getBBox();
        console.log(box.width);
        console.log(box.height);
        

       // textline.setAttribute("x",x0 - box.width/2 + label_width/2);
       // textline.setAttribute("y",y0 + label_height/2);
       fontSize = label_height/box.height*label_height;
        textline.setAttribute("font-size",fontSize);
        box = textline.getBBox();
        console.log(box.width);
        console.log(box.height);
        
        if(box.width>(label_width-label_margin*2)){
          fontSize *= label_width / box.width;
          textline.setAttribute("font-size",fontSize);
        }
      
        x0 += label_spacing + label_width;
        if(x0 + label_width>stock_width){
            x0=0;
            y0+= label_spacing + label_height;
        }
        if(y0>stock_height){
            alert("Out of stock");
        }
        //y0 += label_spacing + label_height;  
    }

}
function drawRect(x,y,width,height,style){
    let rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    rect.setAttribute("height",height);
    rect.setAttribute("width",width);
    rect.setAttribute("x",x);
    rect.setAttribute("y",y);
    rect.setAttribute("style",style);   
    return rect;
}
function drawText(x,y,string,label_height){
    let text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.setAttribute("fill", "red");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("text-anchor", "middle");
 
  
    let textNode = document.createTextNode(string);
    text.appendChild(textNode);
    text.setAttribute("font-size",label_height);
    // <text x="0" y="15" fill="red">I love SVG!</text>
    return text;
}



