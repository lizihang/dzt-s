define("echarts/chart/force",["require","../component/base","./base","../data/Graph","../layout/Force","zrender/shape/Line","zrender/shape/BezierCurve","zrender/shape/Image","../util/shape/Icon","../config","../util/ecData","zrender/tool/util","zrender/config","zrender/tool/vector","../chart"],function(e){"use strict";function t(e,t,o,d,c){var p=this;s.call(this,e,t,o,d,c),r.call(this),this.__nodePositionMap={},this._graph=new l(!0),this._layout=new h,this._layout.onupdate=function(){p._step()},this._steps=1,this.ondragstart=function(){i.apply(p,arguments)},this.ondragend=function(){a.apply(p,arguments)},this.ondrop=function(){},this.shapeHandler.ondragstart=function(){p.isDragstart=!0},this.onmousemove=function(){n.apply(p,arguments)},this.refresh(d)}function i(e){if(this.isDragstart&&e.target){var t=e.target;t.fixed=!0,this.isDragstart=!1,this.zr.on(y.EVENT.MOUSEMOVE,this.onmousemove)}}function n(){this._layout.temperature=.8,this._step()}function a(e,t){if(this.isDragend&&e.target){var i=e.target;i.fixed=!1,t.dragIn=!0,t.needRefresh=!1,this.isDragend=!1,this.zr.un(y.EVENT.MOUSEMOVE,this.onmousemove)}}function o(e,t,i){var n=U.create();return n[0]=(Math.random()-.5)*i+e,n[1]=(Math.random()-.5)*i+t,n}var s=e("../component/base"),r=e("./base"),l=e("../data/Graph"),h=e("../layout/Force"),d=e("zrender/shape/Line"),c=e("zrender/shape/BezierCurve"),p=e("zrender/shape/Image"),m=e("../util/shape/Icon"),u=e("../config"),g=e("../util/ecData"),V=e("zrender/tool/util"),y=e("zrender/config"),U=e("zrender/tool/vector");return t.prototype={constructor:t,type:u.CHART_TYPE_FORCE,_init:function(){var e,t=this.component.legend,i=this.series;this.clear();for(var n=0,a=i.length;a>n;n++){var o=i[n];if(o.type===u.CHART_TYPE_FORCE){if(i[n]=this.reformOption(i[n]),e=i[n].name||"",this.selectedMap[e]=t?t.isSelected(e):!0,!this.selectedMap[e])continue;this.buildMark(n),this._initSerie(o,n);break}}},_getNodeCategory:function(e,t){return e.categories&&e.categories[t.category||0]},_getNodeQueryTarget:function(e,t,i){i=i||"normal";var n=this._getNodeCategory(e,t)||{};return[t.itemStyle&&t.itemStyle[i],n&&n.itemStyle&&n.itemStyle[i],e.itemStyle[i].nodeStyle]},_getEdgeQueryTarget:function(e,t,i){return i=i||"normal",[t.itemStyle&&t.itemStyle[i],e.itemStyle[i].linkStyle]},_initSerie:function(e,t){this._temperature=1,this._graph=e.data?this._getSerieGraphFromDataMatrix(e):this._getSerieGraphFromNodeLinks(e),this._buildLinkShapes(e,t),this._buildNodeShapes(e,t),this.zr.modLayer(this.getZlevelBase(),{panable:e.roam===!0||"move"===e.roam,zoomable:e.roam===!0||"scale"===e.roam}),this._initLayout(e),this._step()},_getSerieGraphFromDataMatrix:function(e){for(var t=[],i=0,n=[],a=0;a<e.matrix.length;a++)n[a]=e.matrix[a].slice();for(var o=e.data||e.nodes,a=0;a<o.length;a++){var s={},r=o[a];for(var h in r)"name"===h?s.id=r.name:s[h]=r[h];var d=this._getNodeCategory(e,r),c=d?d.name:r.name;if(this.selectedMap[c]=this.isSelected(c),this.selectedMap[c])t.push(s),i++;else{n.splice(i,1);for(var p=0;p<n.length;p++)n[p].splice(i,1)}}var m=l.fromMatrix(t,n,!0);return m.eachNode(function(e,t){e.layout={size:e.data.value,mass:0},e.rawIndex=t}),m.eachEdge(function(e){e.layout={weight:e.data.weight}}),m},_getSerieGraphFromNodeLinks:function(e){for(var t=new l(!0),i=e.data||e.nodes,n=0,a=i.length;a>n;n++){var o=i[n];if(o&&!o.ignore){var s=this._getNodeCategory(e,o),r=s?s.name:o.name;if(this.selectedMap[r]=this.isSelected(r),this.selectedMap[r]){var h=t.addNode(o.name,o);h.rawIndex=n}}}for(var n=0,a=e.links.length;a>n;n++){var d=e.links[n],c=d.source,p=d.target;"number"==typeof c&&(c=i[c],c&&(c=c.name)),"number"==typeof p&&(p=i[p],p&&(p=p.name));var m=t.addEdge(c,p,d);m&&(m.rawIndex=n)}return t.eachNode(function(e){var t=e.data.value;if(null==t){t=0;for(var i=0;i<e.edges.length;i++)t+=e.edges[i].data.weight||0}e.layout={size:t,mass:0}}),t.eachEdge(function(e){e.layout={weight:null==e.data.weight?1:e.data.weight}}),t},_initLayout:function(e){var t=this._graph,i=t.nodes.length,n=this.query(e,"minRadius"),a=this.query(e,"maxRadius");this._steps=e.steps||1,this._layout.center=this.parseCenter(this.zr,e.center),this._layout.width=this.parsePercent(e.size,this.zr.getWidth()),this._layout.height=this.parsePercent(e.size,this.zr.getHeight()),this._layout.large=e.large,this._layout.scaling=e.scaling,this._layout.ratioScaling=e.ratioScaling,this._layout.gravity=e.gravity,this._layout.temperature=1,this._layout.coolDown=e.coolDown,this._layout.preventNodeEdgeOverlap=e.preventOverlap,this._layout.preventNodeOverlap=e.preventOverlap;for(var s=1/0,r=-1/0,l=0;i>l;l++){var h=t.nodes[l];r=Math.max(h.layout.size,r),s=Math.min(h.layout.size,s)}for(var d=r-s,l=0;i>l;l++){var h=t.nodes[l];d>0?(h.layout.size=(h.layout.size-s)*(a-n)/d+n,h.layout.mass=h.layout.size/a):(h.layout.size=(a-n)/2,h.layout.mass=.5)}for(var l=0;i>l;l++){var h=t.nodes[l];if("undefined"!=typeof this.__nodePositionMap[h.id])h.layout.position=U.create(),U.copy(h.layout.position,this.__nodePositionMap[h.id]);else if("undefined"!=typeof h.data.initial)h.layout.position=U.create(),U.copy(h.layout.position,h.data.initial);else{var c=this._layout.center,p=Math.min(this._layout.width,this._layout.height);h.layout.position=o(c[0],c[1],.8*p)}var m=h.shape.style,u=h.layout.size;m.width=m.width||2*u,m.height=m.height||2*u,m.x=-m.width/2,m.y=-m.height/2,U.copy(h.shape.position,h.layout.position)}i=t.edges.length,r=-1/0;for(var l=0;i>l;l++){var g=t.edges[l];g.layout.weight>r&&(r=g.layout.weight)}for(var l=0;i>l;l++){var g=t.edges[l];g.layout.weight/=r}this._layout.init(t,e.useWorker)},_buildNodeShapes:function(e,t){var i=this._graph,n=this.query(e,"categories");i.eachNode(function(i){var a=this._getNodeCategory(e,i.data),o=[i.data,a,e],s=this._getNodeQueryTarget(e,i.data),r=this._getNodeQueryTarget(e,i.data,"emphasis"),l=new m({style:{x:0,y:0,color:this.deepQuery(s,"color"),brushType:"both",strokeColor:this.deepQuery(s,"strokeColor")||this.deepQuery(s,"borderColor"),lineWidth:this.deepQuery(s,"lineWidth")||this.deepQuery(s,"borderWidth")},highlightStyle:{color:this.deepQuery(r,"color","emphasis"),strokeColor:this.deepQuery(r,"strokeColor","emphasis")||this.deepQuery(r,"borderColor","emphasis"),lineWidth:this.deepQuery(r,"lineWidth","emphasis")||this.deepQuery(r,"borderWidth","emphasis")},clickable:e.clickable,zlevel:this.getZlevelBase()});l.style.color||(l.style.color=this.getColor(a?a.name:i.id)),l.style.iconType=this.deepQuery(o,"symbol"),l.style.width=l.style.height=2*(this.deepQuery(o,"symbolSize")||0),l.style.iconType.match("image")&&(l.style.image=l.style.iconType.replace(new RegExp("^image:\\/\\/"),""),l=new p({style:l.style,highlightStyle:l.highlightStyle,clickable:l.clickable})),this.deepQuery(o,"itemStyle.normal.label.show")&&(l.style.text=null==i.data.label?i.id:i.data.label,l.style.textPosition=this.deepQuery(o,"itemStyle.normal.label.position"),l.style.textColor=this.deepQuery(o,"itemStyle.normal.label.textStyle.color"),l.style.textFont=this.getFont(this.deepQuery(o,"itemStyle.normal.label.textStyle")||{})),this.deepQuery(o,"itemStyle.emphasis.label.show")&&(l.highlightStyle.textPosition=this.deepQuery(o,"itemStyle.emphasis.label.position"),l.highlightStyle.textColor=this.deepQuery(o,"itemStyle.emphasis.label.textStyle.color"),l.highlightStyle.textFont=this.getFont(this.deepQuery(o,"itemStyle.emphasis.label.textStyle")||{})),this.deepQuery(o,"draggable")&&(this.setCalculable(l),l.dragEnableTime=0,l.draggable=!0,l.ondragstart=this.shapeHandler.ondragstart,l.ondragover=null);var h="";if("undefined"!=typeof i.category){var a=n[i.category];h=a&&a.name||""}g.pack(l,e,t,i.data,i.rawIndex,i.data.name||"",i.category),this.shapeList.push(l),this.zr.addShape(l),i.shape=l},this)},_buildLinkShapes:function(e,t){for(var i=this._graph,n=i.edges.length,a=0;n>a;a++){var o=i.edges[a],s=o.data,r=o.node1,l=o.node2,h=this._getEdgeQueryTarget(e,o),p=this.deepQuery(h,"type");e.linkSymbol&&"none"!==e.linkSymbol&&(p="line");var u="line"===p?d:c,y=new u({style:{xStart:0,yStart:0,xEnd:0,yEnd:0,lineWidth:1},clickable:this.query(e,"clickable"),highlightStyle:{},zlevel:this.getZlevelBase()});if(V.merge(y.style,this.query(e,"itemStyle.normal.linkStyle"),!0),V.merge(y.highlightStyle,this.query(e,"itemStyle.emphasis.linkStyle"),!0),"undefined"!=typeof s.itemStyle&&(s.itemStyle.normal&&V.merge(y.style,s.itemStyle.normal,!0),s.itemStyle.emphasis&&V.merge(y.highlightStyle,s.itemStyle.emphasis,!0)),y.style.lineWidth=y.style.lineWidth||y.style.width,y.style.strokeColor=y.style.strokeColor||y.style.color,y.highlightStyle.lineWidth=y.highlightStyle.lineWidth||y.highlightStyle.width,y.highlightStyle.strokeColor=y.highlightStyle.strokeColor||y.highlightStyle.color,g.pack(y,e,t,o.data,null==o.rawIndex?a:o.rawIndex,o.data.name||r.id+" - "+l.id,r.id,l.id),this.shapeList.push(y),this.zr.addShape(y),o.shape=y,e.linkSymbol&&"none"!==e.linkSymbol){var U=new m({style:{x:-5,y:0,width:e.linkSymbolSize[0],height:e.linkSymbolSize[1],iconType:e.linkSymbol,brushType:"fill",color:y.style.strokeColor,opacity:y.style.opacity,shadowBlur:y.style.shadowBlur,shadowColor:y.style.shadowColor,shadowOffsetX:y.style.shadowOffsetX,shadowOffsetY:y.style.shadowOffsetY},highlightStyle:{brushType:"fill"},position:[0,0],rotation:0});y._symbolShape=U,this.shapeList.push(U),this.zr.addShape(U)}}},_updateLinkShapes:function(){for(var e=U.create(),t=this._graph.edges,i=0,n=t.length;n>i;i++){var a=t[i],o=a.node1.shape,s=a.node2.shape,r=o.position,l=s.position;if(a.shape.style.xStart=r[0],a.shape.style.yStart=r[1],a.shape.style.xEnd=l[0],a.shape.style.yEnd=l[1],"bezier-curve"===a.shape.type&&(a.shape.style.cpX1=(r[0]+l[0])/2-(l[1]-r[1])/4,a.shape.style.cpY1=(r[1]+l[1])/2-(r[0]-l[0])/4),a.shape.modSelf(),a.shape._symbolShape){var h=a.shape._symbolShape;U.copy(h.position,s.position),U.sub(e,o.position,s.position),U.normalize(e,e),U.scaleAndAdd(h.position,h.position,e,s.style.width/2+2);var d=Math.atan2(e[1],e[0]);h.rotation=Math.PI/2-d,h.modSelf()}}},_syncNodePositions:function(){for(var e=this._graph,t=0;t<e.nodes.length;t++){var i=e.nodes[t],n=i.layout.position,a=i.data,o=i.shape;o.fixed||a.fixX&&a.fixY?U.copy(n,o.position):a.fixX?(n[0]=o.position[0],o.position[1]=n[1]):a.fixY?(n[1]=o.position[1],o.position[0]=n[0]):0==isNaN(a.fixX-0)&&0==isNaN(a.fixY-0)?(o.position[0]+=(n[0]-o.position[0])*a.fixX,n[0]=o.position[0],o.position[1]+=(n[1]-o.position[1])*a.fixY,n[1]=o.position[1]):0==isNaN(a.fixX-0)?(o.position[0]+=(n[0]-o.position[0])*a.fixX,n[0]=o.position[0],o.position[1]=n[1]):0==isNaN(a.fixY-0)?(o.position[1]+=(n[1]-o.position[1])*a.fixY,n[1]=o.position[1],o.position[0]=n[0]):U.copy(o.position,n);var s=a.name;if(s){var r=this.__nodePositionMap[s];r||(r=this.__nodePositionMap[s]=U.create()),U.copy(r,n)}o.modSelf()}},_step:function(){this._syncNodePositions(),this._updateLinkShapes(),this.zr.refreshNextFrame(),this._layout.temperature>.01?this._layout.step(this._steps):this.messageCenter.dispatch(u.EVENT.FORCE_LAYOUT_END,{},{},this.myChart)},refresh:function(e){if(e&&(this.option=e,this.series=this.option.series),this.legend=this.component.legend,this.legend)this.getColor=function(e){return this.legend.getColor(e)},this.isSelected=function(e){return this.legend.isSelected(e)};else{var t={},i=0;this.getColor=function(e){return t[e]?t[e]:(t[e]||(t[e]=this.zr.getColor(i++)),t[e])},this.isSelected=function(){return!0}}this._init()},dispose:function(){this.clear(),this.shapeList=null,this.effectList=null,this._layout.dispose(),this._layout=null,this.__nodePositionMap={}},getPosition:function(){var e=[];return this._graph.eachNode(function(t){t.layout&&e.push({name:t.data.name,position:Array.prototype.slice.call(t.layout.position)})}),e}},V.inherits(t,r),V.inherits(t,s),e("../chart").define("force",t),t}),define("echarts/data/Graph",["require","zrender/tool/util"],function(e){var t=e("zrender/tool/util"),i=function(e){this._directed=e||!1,this.nodes=[],this.edges=[],this._nodesMap={},this._edgesMap={}};i.prototype.isDirected=function(){return this._directed},i.prototype.addNode=function(e,t){if(this._nodesMap[e])return this._nodesMap[e];var n=new i.Node(e,t);return this.nodes.push(n),this._nodesMap[e]=n,n},i.prototype.getNodeById=function(e){return this._nodesMap[e]},i.prototype.addEdge=function(e,t,n){if("string"==typeof e&&(e=this._nodesMap[e]),"string"==typeof t&&(t=this._nodesMap[t]),e&&t){var a=e.id+"-"+t.id;if(this._edgesMap[a])return this._edgesMap[a];var o=new i.Edge(e,t,n);return this._directed&&(e.outEdges.push(o),t.inEdges.push(o)),e.edges.push(o),e!==t&&t.edges.push(o),this.edges.push(o),this._edgesMap[a]=o,o}},i.prototype.removeEdge=function(e){var i=e.node1,n=e.node2,a=i.id+"-"+n.id;this._directed&&(i.outEdges.splice(t.indexOf(i.outEdges,e),1),n.inEdges.splice(t.indexOf(n.inEdges,e),1)),i.edges.splice(t.indexOf(i.edges,e),1),i!==n&&n.edges.splice(t.indexOf(n.edges,e),1),delete this._edgesMap[a],this.edges.splice(t.indexOf(this.edges,e),1)},i.prototype.getEdge=function(e,t){return"string"!=typeof e&&(e=e.id),"string"!=typeof t&&(t=t.id),this._directed?this._edgesMap[e+"-"+t]||this._edgesMap[t+"-"+e]:this._edgesMap[e+"-"+t]},i.prototype.removeNode=function(e){if("string"!=typeof e||(e=this._nodesMap[e])){delete this._nodesMap[e.id],this.nodes.splice(t.indexOf(this.nodes,e),1);for(var i=0;i<this.edges.length;){var n=this.edges[i];n.node1===e||n.node2===e?this.removeEdge(n):i++}}},i.prototype.filterNode=function(e,t){for(var i=this.nodes.length,n=0;i>n;)e.call(t,this.nodes[n],n)?n++:(this.removeNode(this.nodes[n]),i--)},i.prototype.filterEdge=function(e,t){for(var i=this.edges.length,n=0;i>n;)e.call(t,this.edges[n],n)?n++:(this.removeEdge(this.edges[n]),i--)},i.prototype.eachNode=function(e,t){for(var i=this.nodes.length,n=0;i>n;n++)this.nodes[n]&&e.call(t,this.nodes[n],n)},i.prototype.eachEdge=function(e,t){for(var i=this.edges.length,n=0;i>n;n++)this.edges[n]&&e.call(t,this.edges[n],n)},i.prototype.clear=function(){this.nodes.length=0,this.edges.length=0,this._nodesMap={},this._edgesMap={}},i.prototype.breadthFirstTraverse=function(e,t,i,n){if("string"==typeof t&&(t=this._nodesMap[t]),t){var a="edges";"out"===i?a="outEdges":"in"===i&&(a="inEdges");for(var o=0;o<this.nodes.length;o++)this.nodes[o].__visited=!1;if(!e.call(n,t,null))for(var s=[t];s.length;)for(var r=s.shift(),l=r[a],o=0;o<l.length;o++){var h=l[o],d=h.node1===r?h.node2:h.node1;if(!d.__visited){if(e.call(d,d,r))return;s.push(d),d.__visited=!0}}}},i.prototype.clone=function(){for(var e=new i(this._directed),t=0;t<this.nodes.length;t++)e.addNode(this.nodes[t].id,this.nodes[t].data);for(var t=0;t<this.edges.length;t++){var n=this.edges[t];e.addEdge(n.node1.id,n.node2.id,n.data)}return e};var n=function(e,t){this.id=e,this.data=t||null,this.inEdges=[],this.outEdges=[],this.edges=[]};n.prototype.degree=function(){return this.edges.length},n.prototype.inDegree=function(){return this.inEdges.length},n.prototype.outDegree=function(){return this.outEdges.length};var a=function(e,t,i){this.node1=e,this.node2=t,this.data=i||null};return i.Node=n,i.Edge=a,i.fromMatrix=function(e,t,n){if(t&&t.length&&t[0].length===t.length&&e.length===t.length){for(var a=t.length,o=new i(n),s=0;a>s;s++){var r=o.addNode(e[s].id,e[s]);r.data.value=0,n&&(r.data.outValue=r.data.inValue=0)}for(var s=0;a>s;s++)for(var l=0;a>l;l++){var h=t[s][l];n&&(o.nodes[s].data.outValue+=h,o.nodes[l].data.inValue+=h),o.nodes[s].data.value+=h,o.nodes[l].data.value+=h}for(var s=0;a>s;s++)for(var l=s;a>l;l++){var h=t[s][l];if(0!==h){var d=o.nodes[s],c=o.nodes[l],p=o.addEdge(d,c,{});if(p.data.weight=h,s!==l&&n&&t[l][s]){var m=o.addEdge(c,d,{});m.data.weight=t[l][s]}}}return o}},i}),define("echarts/layout/Force",["require","./forceLayoutWorker","zrender/tool/vector"],function(e){function t(){return Math.round((new Date).getTime()/100)%1e7}function i(){if("undefined"!=typeof Worker&&"undefined"!=typeof Blob)try{var e=new Blob([a.getWorkerCode()]);n=window.URL.createObjectURL(e)}catch(t){n=""}return n}var n,a=e("./forceLayoutWorker"),o=e("zrender/tool/vector"),s=window.requestAnimationFrame||window.msRequestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(e){setTimeout(e,16)},r="undefined"==typeof Float32Array?Array:Float32Array,l=function(e){"undefined"==typeof n&&i(),e=e||{},this.width=e.width||500,this.height=e.height||500,this.center=e.center||[this.width/2,this.height/2],this.ratioScaling=e.ratioScaling||!1,this.scaling=e.scaling||1,this.gravity="undefined"!=typeof e.gravity?e.gravity:1,this.large=e.large||!1,this.preventNodeOverlap=e.preventNodeOverlap||!1,this.preventNodeEdgeOverlap=e.preventNodeEdgeOverlap||!1,this.maxSpeedIncrease=e.maxSpeedIncrease||1,this.onupdate=e.onupdate||function(){},this.temperature=e.temperature||1,this.coolDown=e.coolDown||.99,this._layout=null,this._layoutWorker=null,this._token=0;var t=this,a=this._$onupdate;this._$onupdate=function(e){a.call(t,e)}};return l.prototype.updateConfig=function(){var e=this.width,t=this.height,i=Math.min(e,t),n={center:this.center,width:this.ratioScaling?e:i,height:this.ratioScaling?t:i,scaling:this.scaling||1,gravity:this.gravity||1,barnesHutOptimize:this.large,preventNodeOverlap:this.preventNodeOverlap,preventNodeEdgeOverlap:this.preventNodeEdgeOverlap,maxSpeedIncrease:this.maxSpeedIncrease};if(this._layoutWorker)this._layoutWorker.postMessage({cmd:"updateConfig",config:n});else for(var a in n)this._layout[a]=n[a]},l.prototype.init=function(e,i){if(n&&i)try{this._layoutWorker||(this._layoutWorker=new Worker(n),this._layoutWorker.onmessage=this._$onupdate),this._layout=null}catch(o){this._layoutWorker=null,this._layout||(this._layout=new a)}else this._layout||(this._layout=new a),this._layoutWorker&&(this._layoutWorker.terminate(),this._layoutWorker=null);this.temperature=1,this.graph=e;for(var s=e.nodes.length,l=new r(2*s),h=new r(s),d=new r(s),c=0;s>c;c++){var p=e.nodes[c];l[2*c]=p.layout.position[0],l[2*c+1]=p.layout.position[1],h[c]="undefined"==typeof p.layout.mass?1:p.layout.mass,d[c]="undefined"==typeof p.layout.size?1:p.layout.size,p.layout.__index=c}s=e.edges.length;for(var m=new r(2*s),u=new r(s),c=0;s>c;c++){var g=e.edges[c];m[2*c]=g.node1.layout.__index,m[2*c+1]=g.node2.layout.__index,u[c]=g.layout.weight||1}this._token=t(),this._layoutWorker?this._layoutWorker.postMessage({cmd:"init",nodesPosition:l,nodesMass:h,nodesSize:d,edges:m,edgesWeight:u,token:this._token}):(this._layout.setToken(this._token),this._layout.initNodes(l,h,d),this._layout.initEdges(m,u)),this.updateConfig()},l.prototype.step=function(e){var t=this.graph.nodes;if(this._layoutWorker){for(var i=new r(2*t.length+1),n=0;n<t.length;n++){var a=t[n];i[2*n+1]=a.layout.position[0],i[2*n+2]=a.layout.position[1]}this._layoutWorker.postMessage(i.buffer,[i.buffer]),this._layoutWorker.postMessage({cmd:"update",steps:e,temperature:this.temperature,coolDown:this.coolDown});for(var n=0;e>n;n++)this.temperature*=this.coolDown}else{s(this._$onupdate);for(var n=0;n<t.length;n++){var a=t[n];o.copy(this._layout.nodes[n].position,a.layout.position)}for(var n=0;e>n;n++)this._layout.temperature=this.temperature,this._layout.update(),this.temperature*=this.coolDown}},l.prototype._$onupdate=function(e){if(this._layoutWorker){var t=new Float32Array(e.data),i=t[0];if(i===this._token){for(var n=0;n<this.graph.nodes.length;n++){var a=this.graph.nodes[n];a.layout.position[0]=t[2*n+1],a.layout.position[1]=t[2*n+2]}this.onupdate&&this.onupdate()}}else if(this._layout&&this._layout.tokenMatch(this._token)){for(var n=0;n<this.graph.nodes.length;n++){var a=this.graph.nodes[n];o.copy(a.layout.position,this._layout.nodes[n].position)}this.onupdate&&this.onupdate()}},l.prototype.dispose=function(){this._layoutWorker&&this._layoutWorker.terminate(),this._layoutWorker=null,this._layout=null,this._token=0},l}),define("zrender/shape/BezierCurve",["require","./Base","../tool/util"],function(e){"use strict";var t=e("./Base"),i=function(e){this.brushTypeOnly="stroke",this.textPosition="end",t.call(this,e)};return i.prototype={type:"bezier-curve",buildPath:function(e,t){e.moveTo(t.xStart,t.yStart),"undefined"!=typeof t.cpX2&&"undefined"!=typeof t.cpY2?e.bezierCurveTo(t.cpX1,t.cpY1,t.cpX2,t.cpY2,t.xEnd,t.yEnd):e.quadraticCurveTo(t.cpX1,t.cpY1,t.xEnd,t.yEnd)},getRect:function(e){if(e.__rect)return e.__rect;var t=Math.min(e.xStart,e.xEnd,e.cpX1),i=Math.min(e.yStart,e.yEnd,e.cpY1),n=Math.max(e.xStart,e.xEnd,e.cpX1),a=Math.max(e.yStart,e.yEnd,e.cpY1),o=e.cpX2,s=e.cpY2;"undefined"!=typeof o&&"undefined"!=typeof s&&(t=Math.min(t,o),i=Math.min(i,s),n=Math.max(n,o),a=Math.max(a,s));var r=e.lineWidth||1;return e.__rect={x:t-r,y:i-r,width:n-t+r,height:a-i+r},e.__rect}},e("../tool/util").inherits(i,t),i}),define("echarts/layout/forceLayoutWorker",["require","zrender/tool/vector"],function e(t){"use strict";function i(){this.subRegions=[],this.nSubRegions=0,this.node=null,this.mass=0,this.centerOfMass=null,this.bbox=new l(4),this.size=0}function n(){this.position=s.create(),this.force=s.create(),this.forcePrev=s.create(),this.speed=s.create(),this.speedPrev=s.create(),this.mass=1,this.inDegree=0,this.outDegree=0}function a(e,t){this.node1=e,this.node2=t,this.weight=1}function o(){this.barnesHutOptimize=!1,this.barnesHutTheta=1.5,this.repulsionByDegree=!1,this.preventNodeOverlap=!1,this.preventNodeEdgeOverlap=!1,this.strongGravity=!0,this.gravity=1,this.scaling=1,this.edgeWeightInfluence=1,this.center=[0,0],this.width=500,this.height=500,this.maxSpeedIncrease=1,this.nodes=[],this.edges=[],this.bbox=new l(4),this._rootRegion=new i,this._rootRegion.centerOfMass=s.create(),this._massArr=null,this._k=0}var s,r="undefined"==typeof window&&"undefined"==typeof t;s=r?{create:function(e,t){var i=new Float32Array(2);return i[0]=e||0,i[1]=t||0,i},dist:function(e,t){var i=t[0]-e[0],n=t[1]-e[1];return Math.sqrt(i*i+n*n)},len:function(e){var t=e[0],i=e[1];return Math.sqrt(t*t+i*i)},scaleAndAdd:function(e,t,i,n){return e[0]=t[0]+i[0]*n,e[1]=t[1]+i[1]*n,e},scale:function(e,t,i){return e[0]=t[0]*i,e[1]=t[1]*i,e},add:function(e,t,i){return e[0]=t[0]+i[0],e[1]=t[1]+i[1],e},sub:function(e,t,i){return e[0]=t[0]-i[0],e[1]=t[1]-i[1],e},dot:function(e,t){return e[0]*t[0]+e[1]*t[1]},normalize:function(e,t){var i=t[0],n=t[1],a=i*i+n*n;return a>0&&(a=1/Math.sqrt(a),e[0]=t[0]*a,e[1]=t[1]*a),e},negate:function(e,t){return e[0]=-t[0],e[1]=-t[1],e},copy:function(e,t){return e[0]=t[0],e[1]=t[1],e},set:function(e,t,i){return e[0]=t,e[1]=i,e}}:t("zrender/tool/vector");var l="undefined"==typeof Float32Array?Array:Float32Array;if(i.prototype.beforeUpdate=function(){for(var e=0;e<this.nSubRegions;e++)this.subRegions[e].beforeUpdate();this.mass=0,this.centerOfMass&&(this.centerOfMass[0]=0,this.centerOfMass[1]=0),this.nSubRegions=0,this.node=null},i.prototype.afterUpdate=function(){this.subRegions.length=this.nSubRegions;for(var e=0;e<this.nSubRegions;e++)this.subRegions[e].afterUpdate()},i.prototype.addNode=function(e){if(0===this.nSubRegions){if(null==this.node)return void(this.node=e);this._addNodeToSubRegion(this.node),this.node=null}this._addNodeToSubRegion(e),this._updateCenterOfMass(e)},i.prototype.findSubRegion=function(e,t){for(var i=0;i<this.nSubRegions;i++){var n=this.subRegions[i];if(n.contain(e,t))return n}},i.prototype.contain=function(e,t){return this.bbox[0]<=e&&this.bbox[2]>=e&&this.bbox[1]<=t&&this.bbox[3]>=t},i.prototype.setBBox=function(e,t,i,n){this.bbox[0]=e,this.bbox[1]=t,this.bbox[2]=i,this.bbox[3]=n,this.size=(i-e+n-t)/2},i.prototype._newSubRegion=function(){var e=this.subRegions[this.nSubRegions];return e||(e=new i,this.subRegions[this.nSubRegions]=e),this.nSubRegions++,e},i.prototype._addNodeToSubRegion=function(e){var t=this.findSubRegion(e.position[0],e.position[1]),i=this.bbox;if(!t){var n=(i[0]+i[2])/2,a=(i[1]+i[3])/2,o=(i[2]-i[0])/2,s=(i[3]-i[1])/2,r=e.position[0]>=n?1:0,l=e.position[1]>=a?1:0,t=this._newSubRegion();t.setBBox(r*o+i[0],l*s+i[1],(r+1)*o+i[0],(l+1)*s+i[1])}t.addNode(e)},i.prototype._updateCenterOfMass=function(e){null==this.centerOfMass&&(this.centerOfMass=s.create());var t=this.centerOfMass[0]*this.mass,i=this.centerOfMass[1]*this.mass;t+=e.position[0]*e.mass,i+=e.position[1]*e.mass,this.mass+=e.mass,this.centerOfMass[0]=t/this.mass,this.centerOfMass[1]=i/this.mass},o.prototype.nodeToNodeRepulsionFactor=function(e,t,i){return i*i*e/t},o.prototype.edgeToNodeRepulsionFactor=function(e,t,i){return i*e/t},o.prototype.attractionFactor=function(e,t,i){return e*t/i},o.prototype.initNodes=function(e,t,i){this.temperature=1;var a=e.length/2;this.nodes.length=0;for(var o="undefined"!=typeof i,s=0;a>s;s++){var r=new n;r.position[0]=e[2*s],r.position[1]=e[2*s+1],r.mass=t[s],o&&(r.size=i[s]),this.nodes.push(r)}this._massArr=t,o&&(this._sizeArr=i)},o.prototype.initEdges=function(e,t){var i=e.length/2;this.edges.length=0;for(var n="undefined"!=typeof t,o=0;i>o;o++){var s=e[2*o],r=e[2*o+1],l=this.nodes[s],h=this.nodes[r];if(l&&h){l.outDegree++,h.inDegree++;var d=new a(l,h);n&&(d.weight=t[o]),this.edges.push(d)}}},o.prototype.update=function(){var e=this.nodes.length;if(this.updateBBox(),this._k=.4*this.scaling*Math.sqrt(this.width*this.height/e),this.barnesHutOptimize){this._rootRegion.setBBox(this.bbox[0],this.bbox[1],this.bbox[2],this.bbox[3]),this._rootRegion.beforeUpdate();for(var t=0;e>t;t++)this._rootRegion.addNode(this.nodes[t]);this._rootRegion.afterUpdate()}else{var i=0,n=this._rootRegion.centerOfMass;s.set(n,0,0);for(var t=0;e>t;t++){var a=this.nodes[t];i+=a.mass,s.scaleAndAdd(n,n,a.position,a.mass)}i>0&&s.scale(n,n,1/i)}this.updateForce(),this.updatePosition()},o.prototype.updateForce=function(){for(var e=this.nodes.length,t=0;e>t;t++){var i=this.nodes[t];s.copy(i.forcePrev,i.force),s.copy(i.speedPrev,i.speed),s.set(i.force,0,0)}this.updateNodeNodeForce(),this.gravity>0&&this.updateGravityForce(),this.updateEdgeForce(),this.preventNodeEdgeOverlap&&this.updateNodeEdgeForce()},o.prototype.updatePosition=function(){for(var e=this.nodes.length,t=s.create(),i=0;e>i;i++){var n=this.nodes[i],a=n.speed;s.scale(n.force,n.force,1/30);var o=s.len(n.force)+.1,r=Math.min(o,500)/o;s.scale(n.force,n.force,r),s.add(a,a,n.force),s.scale(a,a,this.temperature),s.sub(t,a,n.speedPrev);var l=s.len(t);if(l>0){s.scale(t,t,1/l);var h=s.len(n.speedPrev);h>0&&(l=Math.min(l/h,this.maxSpeedIncrease)*h,s.scaleAndAdd(a,n.speedPrev,t,l))}var d=s.len(a),r=Math.min(d,100)/(d+.1);s.scale(a,a,r),s.add(n.position,n.position,a)}},o.prototype.updateNodeNodeForce=function(){for(var e=this.nodes.length,t=0;e>t;t++){var i=this.nodes[t];if(this.barnesHutOptimize)this.applyRegionToNodeRepulsion(this._rootRegion,i);else for(var n=t+1;e>n;n++){var a=this.nodes[n];this.applyNodeToNodeRepulsion(i,a,!1)}}},o.prototype.updateGravityForce=function(){for(var e=0;e<this.nodes.length;e++)this.applyNodeGravity(this.nodes[e])},o.prototype.updateEdgeForce=function(){for(var e=0;e<this.edges.length;e++)this.applyEdgeAttraction(this.edges[e])},o.prototype.updateNodeEdgeForce=function(){for(var e=0;e<this.nodes.length;e++)for(var t=0;t<this.edges.length;t++)this.applyEdgeToNodeRepulsion(this.edges[t],this.nodes[e])},o.prototype.applyRegionToNodeRepulsion=function(){var e=s.create();return function(t,i){if(t.node)this.applyNodeToNodeRepulsion(t.node,i,!0);else{if(0===t.mass&&0===i.mass)return;s.sub(e,i.position,t.centerOfMass);var n=e[0]*e[0]+e[1]*e[1];if(n>this.barnesHutTheta*t.size*t.size){var a=this._k*this._k*(i.mass+t.mass)/(n+1);s.scaleAndAdd(i.force,i.force,e,2*a)}else for(var o=0;o<t.nSubRegions;o++)this.applyRegionToNodeRepulsion(t.subRegions[o],i)}}}(),o.prototype.applyNodeToNodeRepulsion=function(){var e=s.create();return function(t,i,n){if(t!==i&&(0!==t.mass||0!==i.mass)){s.sub(e,t.position,i.position);var a=e[0]*e[0]+e[1]*e[1];if(0!==a){var o,r=t.mass+i.mass,l=Math.sqrt(a);s.scale(e,e,1/l),this.preventNodeOverlap?(l=l-t.size-i.size,l>0?o=this.nodeToNodeRepulsionFactor(r,l,this._k):0>=l&&(o=this._k*this._k*10*r)):o=this.nodeToNodeRepulsionFactor(r,l,this._k),n||s.scaleAndAdd(t.force,t.force,e,2*o),s.scaleAndAdd(i.force,i.force,e,2*-o)}}}}(),o.prototype.applyEdgeAttraction=function(){var e=s.create();return function(t){var i=t.node1,n=t.node2;s.sub(e,i.position,n.position);var a,o=s.len(e);a=0===this.edgeWeightInfluence?1:1==this.edgeWeightInfluence?t.weight:Math.pow(t.weight,this.edgeWeightInfluence);var r;if(!(this.preventOverlap&&(o=o-i.size-n.size,0>=o))){var r=this.attractionFactor(a,o,this._k);s.scaleAndAdd(i.force,i.force,e,-r),s.scaleAndAdd(n.force,n.force,e,r)}}}(),o.prototype.applyNodeGravity=function(){var e=s.create();return function(t){s.sub(e,this.center,t.position),this.width>this.height?e[1]*=this.width/this.height:e[0]*=this.height/this.width;var i=s.len(e)/100;this.strongGravity?s.scaleAndAdd(t.force,t.force,e,i*this.gravity*t.mass):s.scaleAndAdd(t.force,t.force,e,this.gravity*t.mass/(i+1))}}(),o.prototype.applyEdgeToNodeRepulsion=function(){var e=s.create(),t=s.create(),i=s.create();return function(n,a){var o=n.node1,r=n.node2;if(o!==a&&r!==a){s.sub(e,r.position,o.position),s.sub(t,a.position,o.position);var l=s.len(e);s.scale(e,e,1/l);var h=s.dot(e,t);if(!(0>h||h>l)){s.scaleAndAdd(i,o.position,e,h);var d=s.dist(i,a.position)-a.size,c=this.edgeToNodeRepulsionFactor(a.mass,Math.max(d,.1),100);s.sub(e,a.position,i),s.normalize(e,e),s.scaleAndAdd(a.force,a.force,e,c),s.scaleAndAdd(o.force,o.force,e,-c),s.scaleAndAdd(r.force,r.force,e,-c)}}}}(),o.prototype.updateBBox=function(){for(var e=1/0,t=1/0,i=-1/0,n=-1/0,a=0;a<this.nodes.length;a++){var o=this.nodes[a].position;e=Math.min(e,o[0]),t=Math.min(t,o[1]),i=Math.max(i,o[0]),n=Math.max(n,o[1])}this.bbox[0]=e,this.bbox[1]=t,this.bbox[2]=i,this.bbox[3]=n},o.getWorkerCode=function(){var t=e.toString();return t.slice(t.indexOf("{")+1,t.lastIndexOf("return"))},o.prototype.setToken=function(e){this._token=e},o.prototype.tokenMatch=function(e){return e===this._token},r){var h=null;self.onmessage=function(e){if(e.data instanceof ArrayBuffer){if(!h)return;for(var t=new Float32Array(e.data),i=(t.length-1)/2,n=0;i>n;n++){var a=h.nodes[n];a.position[0]=t[2*n+1],a.position[1]=t[2*n+2]}}else switch(e.data.cmd){case"init":h||(h=new o),h.initNodes(e.data.nodesPosition,e.data.nodesMass,e.data.nodesSize),h.initEdges(e.data.edges,e.data.edgesWeight),h._token=e.data.token;break;case"updateConfig":if(h)for(var s in e.data.config)h[s]=e.data.config[s];break;case"update":var r=e.data.steps;if(h){var i=h.nodes.length,t=new Float32Array(2*i+1);h.temperature=e.data.temperature;for(var n=0;r>n;n++)h.update(),h.temperature*=e.data.coolDown;for(var n=0;i>n;n++){var a=h.nodes[n];t[2*n+1]=a.position[0],t[2*n+2]=a.position[1]}t[0]=h._token,self.postMessage(t.buffer,[t.buffer])}else{var l=new Float32Array;self.postMessage(l.buffer,[l.buffer])}}}}return o});
