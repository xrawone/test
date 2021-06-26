class Treeview {
  constructor(treeviewId,imageBaseUrl){
    this.treeviewId = treeviewId; 
    this.selected=null;
    this.imageBase=imageBaseUrl;
  };
  on(eventName,fn){
    var me = this;
    switch(eventName){
      case "select":{
document.querySelector(this.treeviewId).addEventListener("click",(event)=>{ if (event.target.nodeName=='SUMMARY'){
      if (me.selected != null){document.getElementById(me.selected).removeAttribute("selected");
                              }
  document.getElementById(event.target.id).setAttribute("selected","true");
 console.log(event.target.id);     
      me.selected=event.target.id;
      event.target.setAttribute("open",!event.target.parentNode.hasAttribute("open"));
      fn(event)
      }});
    break;}
    }
  }
  appendData(data,targetId){
    document.getElementById(targetId).parentNode.innerHTML += this.walkData(data);    
  };
  replaceData(data,targetId){
    if (targetId!=null){
      var target=document.getElementById(targetId);
      target.outerHTML = this.walkData(data)
    }
    else {
      var target = document.querySelector(this.treeviewId);
      target.innerHTML = this.walkData(data);
    }
  };
  walkData(data){
    var me=this;
    var buf = Object.keys(data).map((key)=>`<details><summary  id="${key}" ${Object.keys(data[key]).map((subkey)=>{return subkey != 'children'?`data-${subkey}="${data[key][subkey]}"`:' '}).join(' ')}><img class="icon" src="${me.imageBase}${data[key].icon?data[key].icon:data[key].children?'Folder.png':'Item.png'}"> </img>${data[key].label}</summary>
     ${data[key].children?me.walkData(data[key].children):""}</details>`); 
     return buf.join("\n")
  }; 
  open(id){
    var node = document.getElementById(id);
    while(node.parentNode.nodeName=="DETAILS"){
      node = node.parentNode;
      node.setAttribute("open","true");
    }
  };
  close(id){
    var node = document.getElementById(id).parentNode;
    node.removeAttribute("open");
    var detailNodes = node.querySelectorAll("DETAILS");
  console.log(detailNodes);  detailNodes.forEach((node)=>node.removeAttribute("open"));
  };
  select(id){
    this.open(id);
    document.getElementById(id).focus();
    document.getElementById(id).click();
  }
}

var data = {categories:{
  label:"संचालक समिति",
  description:"This<br>identifies<br> the<br> different<br> classes <br>of <br>objects<br> in the data model",
  children:{
  "class:bidesh":{
    label:"नेपाल बिभाग",
    type:"class:category",
    description:"Recipients of medical care services.",
    children:{
    "patient:janeDoe":{label:"केन्द्रिय समिती", 
    icon:"Woman.png",           
    type:"class:patient",    
            description:"35 year old writer of mystery novels",
             postalCode:"98027",
            children:{
             "jd:plans":{
                label:"प्रदेश समित",
                children:{
                  "plan:JDHI1":{label:"H", type:"class:plan",icon:"Plan.png"},
                  "plan:JDDI1":{label:"Dental Insurance JDDI1", type:"class:plan",icon:"Plan.png"},
                  "plan:JDVI1":{label:"Vision Insurance JDVI1", type:"class:plan",icon:"Plan.png"},
                  "plan:JDHI1":{label:"Health Insurance JDHI1", type:"class:plan",icon:"Plan.png"},
                  "plan:JDDI1":{label:"Dental Insurance JDDI1", type:"class:plan",icon:"Plan.png"},
                  "plan:JDVI1":{label:"Vision Insurance JDVI1", type:"class:plan",icon:"Plan.png"},
                  "plan:JDVI1":{label:"Vision Insurance JDVI1", type:"class:plan",icon:"Plan.png"}
             
             
              }
            }
            }
            },
   
    }
  }
  }
}};

var physicians = {
  "class:physician":{
    label:"बिदेश  बिभाग",
    type:"class:category",
    description:"Individual providers of medical care services"
  }
};


var treeview = new Treeview(".treeview","https://s3-us-west-2.amazonaws.com/s.cdpn.io/620300/");
treeview.on("select",(event)=>{
  var node = event.target;
  var data = node.dataset
  display.innerHTML = `<div class="label">${data.label}</div>${data.description?`<div class="descr">${data.description}</div>`:''}`;
  console.log(event.target)
});
    treeview.replaceData(data);

    treeview.select("patient:janeDoe")
    treeview.appendData(physicians,"categories");
    
                              