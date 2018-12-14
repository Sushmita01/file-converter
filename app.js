// Code goes here

var isValid=true;
var uint8View;
var formatted_hexadecimal="";
var hex_array=new Array();
var formatted_ascii="";
var ascii_array=new Array();
hexTextArea=document.getElementById("hex-text-area");
asciiTextArea=document.getElementById("ascii-text-area");


function convertToHexAscii() {	
        for (i=0; i<uint8View.length; i++) {
            let decimal = uint8View[i];
            hex_array.push((decimal<16?"0":"") + decimal.toString(16));
            formatted_hexadecimal = formatted_hexadecimal + "" + (decimal<16?"0":"") + decimal.toString(16) + " ";

            ascii_array.push(String.fromCharCode(decimal));
            formatted_ascii = formatted_ascii + "" +  String.fromCharCode(decimal) + " ";
                
        }
        // console.log(hex_array);	
        hexTextArea.innerText=formatted_hexadecimal;
        // console.log(ascii_array);
        asciiTextArea.innerText=formatted_ascii;		  	
}

        
function readFile(file) {
    var reader = new FileReader();
    reader.onload = function(){
        uint8View = new Uint8Array(reader.result);
        // console.log("unsignedArray",uint8View);
        convertToHexAscii();
        
    };
    reader.readAsArrayBuffer(file);    
    }   

        
function fileSelect(file){    
    console.log(file);
    this.validateSize(file);
    if (this.isValid==true){
        myFile=file;
    }
}

function validateSize(file) {
        var FileSize = file.size/1024/1024 
        if (FileSize > 1) {
            this.isValid=false;
            alert('File size exceeds 1 MB');
        } 
    }


function fileUpload(){
    document.getElementById("fileSelected").innerText="File selected: "+myFile.name;
    readFile(myFile);
}
document.getElementById("convert").addEventListener('click',fileUpload);

//highlight functionality
function highlightAscii(fIdx,range){
    console.log(fIdx,range);
    // document.getElementById("ascii-text-area").innerHTML=ascii_array.splice(0,fIdx).join(" ");

}

hexTextArea.addEventListener('mouseup', function () {
    window.mySelection = this.value.substring(this.selectionStart, this.selectionEnd);
    hexSelectRes=window.mySelection.toString().trim().split(" ");
    if(hexSelectRes.every(val =>    {
        if (val.length!=2) return false;
        else return hex_array.indexOf(val);
    }))
    {
        firstIdx=hex_array.indexOf(hexSelectRes[0]);
        if (firstIdx!==-1) {
            highlightAscii(firstIdx,hexSelectRes.length);
        }
    };
    console.log(hexSelectRes);

  });

  asciiTextArea.addEventListener('mouseup', function () {
    window.mySelection = this.value.substring(this.selectionStart, this.selectionEnd);
    console.log("ascii-text-area",window.mySelection);
    // window.getSelection().toString();
  });





       