var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init(jsn){
    //init data
var json = jsn
//    var json = {
//  "id": "aUniqueIdentifier",
//  "name": "usually a nodes name",
//  "data": {
//    "some key": "some value",
//    "some other key": "some other value"
//   },
//  "children": [ {
//                "id": "232_42",
//                "name": "KUCHTA Band",
//                "data": {
//                    "tsomekey":"twitter je nununu",
//                    "image":"n0M.png"
//                },
//                "children": []}]
//};

//var json = {
//  "id": "aUniqueIdentifier",
//  "name": "usually a nodes name",
//  "data": {
//    "some key": "some value",
//    "some other key": "some other value"
//   },
//  "children": [],
//  "id": "232_42",
//                "name": "KUCHTA Band",
//                "data": {
//                    "tsomekey":"twitter je nununu",
//                    "image":"n0M.png"
//                },
//                "children": []
//
//};
    //end
    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth - 50, h = infovis.offsetHeight - 50;
    
    //init Hypertree
    var ht = new $jit.Hypertree({
      //id of the visualization container
      injectInto: 'infovis',
      //canvas width and height
      width: w,
      height: h,
      //Change node and edge styles such as
      //color, width and dimensions.
      Node: {
          dim: 9,
          color: "#f00",
      },
      Edge: {        
          lineWidth: 2,
          color: "#088"
      },
      Label:{
           textAlign: 'left',

      },
      onBeforeCompute: function(node){
        Log.write("centering");
      },
      //Attach event handlers and add text to the
      //labels. This method is only triggered on label
      //creation
      onCreateLabel: function(domElement, node){
          odkaz="http://seznam.cz"
          domElement.className = "beztextu";
          if(node.data.image){
              if(node._depth<1)
                        domElement.innerHTML = "<em class='sn'>"+node.name+"</em><br /><img src=\""+ node.data.image +"\">"+ "<span class='textViz'>"+node.data.tsomekey + "</span>";
//              else    domElement.innerHTML = node.name + "<br /><img src=\""+ node.data.image +"\">"+ "<span class='textViz'>"+node.data.tsomekey + "</span>";
                else domElement.innerHTML = "<em class='sn'>"+node.name+"</em><br /><img src=\""+ node.data.image +"\">"+ "<span class='textViz'>"+node.data.tsomekey + "</span>";
          }

          else
            domElement.innerHTML = node.name + "<br />"+ "<span class='textViz'>"+node.data.tsomekey+"</span>";
          $jit.util.addEvent(domElement, 'click', function () {
              
              ht.onClick(node.id);
          });
      },
      //Change node styles when labels are placed
      //or moved.
      onPlaceLabel: function(domElement, node){
          var style = domElement.style;
          style.display = '';
          style.cursor = 'pointer';
          style.textAlign='left';
//          text v základním robrazeni
          if (node._depth < 1) {
              style.fontSize = "0.8em";
              style.color = "yellow";
//              style.display = "inline";
              domElement.className = "stextem";

          }
          else if (node._depth == 1) {
              style.fontSize = "0.8em";
              style.color = "#fff";
//              style.display = "inline";
//              domElement.className = "beztextu";
                if(domElement.className == "stextem")
                    domElement.className = "beztextu";
             
          } else if(node._depth == 2){
              style.fontSize = "0.7em";
              style.color = "#555";
              if(domElement.className == "stextem")
                    domElement.className = "beztextu";
             
//              domElement.className = "beztextu";
              

          } else {
              style.display = 'none';
          }

          var left = parseInt(style.left);
          var w = domElement.offsetWidth;
          style.left = (left - w / 2) + 'px';         
      },
      
      onAfterCompute: function(){
           //uprava
          Log.write("done");
          
          //Build the right column relations list.
          //This is done by collecting the information (stored in the data property) 
          //for all the nodes adjacent to the centered node.
       var node = ht.graph.getClosestNodeToOrigin("current");
          var html = "<h4>" + node.name + "</h4><b>Connections:</b>";
          html += "<ul>";
          node.eachAdjacency(function(adj){
              var child = adj.nodeTo;
              if (child.data) {
                  var rel = (child.data.band == node.name) ? child.data.relation : node.data.relation;
                  html += "<li>" + child.name + " " + "<div class=\"relation\">(relation: " + rel + ")</div></li>";
              }
          });
          html += "</ul>";
          $jit.id('inner-details').innerHTML = html;
      }
    });
    //load JSON data.
    ht.loadJSON(json);
    //compute positions and plot.
    ht.refresh();
    //end
    ht.controller.onAfterCompute();
}
