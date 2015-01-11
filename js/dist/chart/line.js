define("echarts/chart/line",["require","../component/base","./base","zrender/shape/BrokenLine","../util/shape/Icon","../util/shape/HalfSmoothPolygon","../component/axis","../component/grid","../component/dataZoom","../config","../util/ecData","zrender/tool/util","zrender/tool/color","../chart"],function(e){function t(e,t,i,o,r){n.call(this,e,t,i,o,r),a.call(this),this.refresh(o)}function i(e,t,i){var n=t.x,a=t.y,o=t.width,s=t.height,l=s/2;t.symbol.match("empty")&&(e.fillStyle="#fff"),t.brushType="both";var h=t.symbol.replace("empty","").toLowerCase();h.match("star")?(l=h.replace("star","")-0||5,a-=1,h="star"):("rectangle"===h||"arrow"===h)&&(n+=(o-s)/2,o=s);var d="";if(h.match("image")&&(d=h.replace(new RegExp("^image:\\/\\/"),""),h="image",n+=Math.round((o-s)/2)-1,o=s+=2),h=r.prototype.iconLibrary[h]){var m=t.x,c=t.y;e.moveTo(m,c+l),e.lineTo(m+5,c+l),e.moveTo(m+t.width-5,c+l),e.lineTo(m+t.width,c+l);var p=this;h(e,{x:n+4,y:a+4,width:o-8,height:s-8,n:l,image:d},function(){p.modSelf(),i()})}else e.moveTo(n,a+l),e.lineTo(n+o,a+l)}var n=e("../component/base"),a=e("./base"),o=e("zrender/shape/BrokenLine"),r=e("../util/shape/Icon"),s=e("../util/shape/HalfSmoothPolygon");e("../component/axis"),e("../component/grid"),e("../component/dataZoom");var l=e("../config"),h=e("../util/ecData"),d=e("zrender/tool/util"),m=e("zrender/tool/color");return t.prototype={type:l.CHART_TYPE_LINE,_buildShape:function(){this.finalPLMap={},this._bulidPosition()},_buildHorizontal:function(e,t,i,n){for(var a,o,r,s,l,h,d,m,c,p,u=this.series,V=i[0][0],U=u[V],y=U.xAxisIndex,g=this.component.xAxis.getAxis(y),f={},b=0,_=t;_>b&&null!=g.getNameByIndex(b);b++){r=g.getCoordByIndex(b);for(var x=0,k=i.length;k>x;x++){a=u[i[x][0]].yAxisIndex||0,o=this.component.yAxis.getAxis(a),h=l=m=d=o.getCoord(0);for(var L=0,v=i[x].length;v>L;L++)V=i[x][L],U=u[V],c=U.data[b],p=null!=c?null!=c.value?c.value:c:"-",f[V]=f[V]||[],n[V]=n[V]||{min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY,sum:0,counter:0,average:0},"-"!==p?(p>=0?(l-=L>0?o.getCoordSize(p):h-o.getCoord(p),s=l):0>p&&(d+=L>0?o.getCoordSize(p):o.getCoord(p)-m,s=d),f[V].push([r,s,b,g.getNameByIndex(b),r,h]),n[V].min>p&&(n[V].min=p,n[V].minY=s,n[V].minX=r),n[V].max<p&&(n[V].max=p,n[V].maxY=s,n[V].maxX=r),n[V].sum+=p,n[V].counter++):f[V].length>0&&(this.finalPLMap[V]=this.finalPLMap[V]||[],this.finalPLMap[V].push(f[V]),f[V]=[])}l=this.component.grid.getY();for(var W,x=0,k=i.length;k>x;x++)for(var L=0,v=i[x].length;v>L;L++)V=i[x][L],U=u[V],c=U.data[b],p=null!=c?null!=c.value?c.value:c:"-","-"==p&&this.deepQuery([c,U,this.option],"calculable")&&(W=this.deepQuery([c,U],"symbolSize"),l+=2*W+5,s=l,this.shapeList.push(this._getCalculableItem(V,b,g.getNameByIndex(b),r,s,"horizontal")))}for(var w in f)f[w].length>0&&(this.finalPLMap[w]=this.finalPLMap[w]||[],this.finalPLMap[w].push(f[w]),f[w]=[]);this._calculMarkMapXY(n,i,"y"),this._buildBorkenLine(e,this.finalPLMap,g,"horizontal")},_buildVertical:function(e,t,i,n){for(var a,o,r,s,l,h,d,m,c,p,u=this.series,V=i[0][0],U=u[V],y=U.yAxisIndex,g=this.component.yAxis.getAxis(y),f={},b=0,_=t;_>b&&null!=g.getNameByIndex(b);b++){s=g.getCoordByIndex(b);for(var x=0,k=i.length;k>x;x++){a=u[i[x][0]].xAxisIndex||0,o=this.component.xAxis.getAxis(a),h=l=m=d=o.getCoord(0);for(var L=0,v=i[x].length;v>L;L++)V=i[x][L],U=u[V],c=U.data[b],p=null!=c?null!=c.value?c.value:c:"-",f[V]=f[V]||[],n[V]=n[V]||{min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY,sum:0,counter:0,average:0},"-"!==p?(p>=0?(l+=L>0?o.getCoordSize(p):o.getCoord(p)-h,r=l):0>p&&(d-=L>0?o.getCoordSize(p):m-o.getCoord(p),r=d),f[V].push([r,s,b,g.getNameByIndex(b),h,s]),n[V].min>p&&(n[V].min=p,n[V].minX=r,n[V].minY=s),n[V].max<p&&(n[V].max=p,n[V].maxX=r,n[V].maxY=s),n[V].sum+=p,n[V].counter++):f[V].length>0&&(this.finalPLMap[V]=this.finalPLMap[V]||[],this.finalPLMap[V].push(f[V]),f[V]=[])}l=this.component.grid.getXend();for(var W,x=0,k=i.length;k>x;x++)for(var L=0,v=i[x].length;v>L;L++)V=i[x][L],U=u[V],c=U.data[b],p=null!=c?null!=c.value?c.value:c:"-","-"==p&&this.deepQuery([c,U,this.option],"calculable")&&(W=this.deepQuery([c,U],"symbolSize"),l-=2*W+5,r=l,this.shapeList.push(this._getCalculableItem(V,b,g.getNameByIndex(b),r,s,"vertical")))}for(var w in f)f[w].length>0&&(this.finalPLMap[w]=this.finalPLMap[w]||[],this.finalPLMap[w].push(f[w]),f[w]=[]);this._calculMarkMapXY(n,i,"x"),this._buildBorkenLine(e,this.finalPLMap,g,"vertical")},_buildOther:function(e,t,i,n){for(var a,o,r=this.series,s={},l=0,h=i.length;h>l;l++)for(var d=0,m=i[l].length;m>d;d++){var c=i[l][d],p=r[c],u=p.xAxisIndex||0;a=this.component.xAxis.getAxis(u);var V=p.yAxisIndex||0;o=this.component.yAxis.getAxis(V);var U=o.getCoord(0);s[c]=s[c]||[],n[c]=n[c]||{min0:Number.POSITIVE_INFINITY,min1:Number.POSITIVE_INFINITY,max0:Number.NEGATIVE_INFINITY,max1:Number.NEGATIVE_INFINITY,sum0:0,sum1:0,counter0:0,counter1:0,average0:0,average1:0};for(var y=0,g=p.data.length;g>y;y++){var f=p.data[y],b=null!=f?null!=f.value?f.value:f:"-";if(b instanceof Array){var _=a.getCoord(b[0]),x=o.getCoord(b[1]);s[c].push([_,x,y,b[0],_,U]),n[c].min0>b[0]&&(n[c].min0=b[0],n[c].minY0=x,n[c].minX0=_),n[c].max0<b[0]&&(n[c].max0=b[0],n[c].maxY0=x,n[c].maxX0=_),n[c].sum0+=b[0],n[c].counter0++,n[c].min1>b[1]&&(n[c].min1=b[1],n[c].minY1=x,n[c].minX1=_),n[c].max1<b[1]&&(n[c].max1=b[1],n[c].maxY1=x,n[c].maxX1=_),n[c].sum1+=b[1],n[c].counter1++}}}for(var k in s)s[k].length>0&&(this.finalPLMap[k]=this.finalPLMap[k]||[],this.finalPLMap[k].push(s[k]),s[k]=[]);this._calculMarkMapXY(n,i,"xy"),this._buildBorkenLine(e,this.finalPLMap,a,"other")},_buildBorkenLine:function(e,t,i,n){for(var a,r="other"==n?"horizontal":n,l=this.series,c=e.length-1;c>=0;c--){var p=e[c],u=l[p],V=t[p];if(u.type===this.type&&null!=V)for(var U=this._getBbox(p,r),y=this._sIndex2ColorMap[p],g=this.query(u,"itemStyle.normal.lineStyle.width"),f=this.query(u,"itemStyle.normal.lineStyle.type"),b=this.query(u,"itemStyle.normal.lineStyle.color"),_=this.getItemStyleColor(this.query(u,"itemStyle.normal.color"),p,-1),x=null!=this.query(u,"itemStyle.normal.areaStyle"),k=this.query(u,"itemStyle.normal.areaStyle.color"),L=0,v=V.length;v>L;L++){var W=V[L],w="other"!=n&&this._isLarge(r,W);if(w)W=this._getLargePointList(r,W);else for(var X=0,I=W.length;I>X;X++)a=u.data[W[X][2]],(this.deepQuery([a,u,this.option],"calculable")||this.deepQuery([a,u],"showAllSymbol")||"categoryAxis"===i.type&&i.isMainAxis(W[X][2])&&"none"!=this.deepQuery([a,u],"symbol"))&&this.shapeList.push(this._getSymbol(p,W[X][2],W[X][3],W[X][0],W[X][1],r));var K=new o({zlevel:this._zlevelBase,style:{miterLimit:g,pointList:W,strokeColor:b||_||y,lineWidth:g,lineType:f,smooth:this._getSmooth(u.smooth),smoothConstraint:U,shadowColor:this.query(u,"itemStyle.normal.lineStyle.shadowColor"),shadowBlur:this.query(u,"itemStyle.normal.lineStyle.shadowBlur"),shadowOffsetX:this.query(u,"itemStyle.normal.lineStyle.shadowOffsetX"),shadowOffsetY:this.query(u,"itemStyle.normal.lineStyle.shadowOffsetY")},hoverable:!1,_main:!0,_seriesIndex:p,_orient:r});if(h.pack(K,l[p],p,0,L,l[p].name),this.shapeList.push(K),x){var S=new s({zlevel:this._zlevelBase,style:{miterLimit:g,pointList:d.clone(W).concat([[W[W.length-1][4],W[W.length-1][5]],[W[0][4],W[0][5]]]),brushType:"fill",smooth:this._getSmooth(u.smooth),smoothConstraint:U,color:k?k:m.alpha(y,.5)},highlightStyle:{brushType:"fill"},hoverable:!1,_main:!0,_seriesIndex:p,_orient:r});h.pack(S,l[p],p,0,L,l[p].name),this.shapeList.push(S)}}}},_getBbox:function(e,t){var i=this.component.grid.getBbox(),n=this.xMarkMap[e];return null!=n.minX0?[[Math.min(n.minX0,n.maxX0,n.minX1,n.maxX1),Math.min(n.minY0,n.maxY0,n.minY1,n.maxY1)],[Math.max(n.minX0,n.maxX0,n.minX1,n.maxX1),Math.max(n.minY0,n.maxY0,n.minY1,n.maxY1)]]:("horizontal"===t?(i[0][1]=Math.min(n.minY,n.maxY),i[1][1]=Math.max(n.minY,n.maxY)):(i[0][0]=Math.min(n.minX,n.maxX),i[1][0]=Math.max(n.minX,n.maxX)),i)},_isLarge:function(e,t){return t.length<2?!1:"horizontal"===e?Math.abs(t[0][0]-t[1][0])<.5:Math.abs(t[0][1]-t[1][1])<.5},_getLargePointList:function(e,t){var i;i="horizontal"===e?this.component.grid.getWidth():this.component.grid.getHeight();for(var n=t.length,a=[],o=0;i>o;o++)a[o]=t[Math.floor(n/i*o)];return a},_getSmooth:function(e){return e?.3:0},_getCalculableItem:function(e,t,i,n,a,o){var r=this.series,s=r[e].calculableHolderColor||this.ecTheme.calculableHolderColor,l=this._getSymbol(e,t,i,n,a,o);return l.style.color=s,l.style.strokeColor=s,l.rotation=[0,0],l.hoverable=!1,l.draggable=!1,l.style.text=void 0,l},_getSymbol:function(e,t,i,n,a,o){var r=this.series,s=r[e],l=s.data[t],h=this.getSymbolShape(s,e,l,t,i,n,a,this._sIndex2ShapeMap[e],this._sIndex2ColorMap[e],"#fff","vertical"===o?"horizontal":"vertical");return h.zlevel=this._zlevelBase+1,this.deepQuery([l,s,this.option],"calculable")&&(this.setCalculable(h),h.draggable=!0),h},getMarkCoord:function(e,t){var i=this.series[e],n=this.xMarkMap[e],a=this.component.xAxis.getAxis(i.xAxisIndex),o=this.component.yAxis.getAxis(i.yAxisIndex);if(t.type&&("max"===t.type||"min"===t.type||"average"===t.type)){var r=null!=t.valueIndex?t.valueIndex:null!=n.maxX0?"1":"";return[n[t.type+"X"+r],n[t.type+"Y"+r],n[t.type+"Line"+r],n[t.type+r]]}return["string"!=typeof t.xAxis&&a.getCoordByIndex?a.getCoordByIndex(t.xAxis||0):a.getCoord(t.xAxis||0),"string"!=typeof t.yAxis&&o.getCoordByIndex?o.getCoordByIndex(t.yAxis||0):o.getCoord(t.yAxis||0)]},refresh:function(e){e&&(this.option=e,this.series=e.series),this.backupShapeList(),this._buildShape()},ontooltipHover:function(e,t){for(var i,n,a=e.seriesIndex,o=e.dataIndex,r=a.length;r--;)if(i=this.finalPLMap[a[r]])for(var s=0,l=i.length;l>s;s++){n=i[s];for(var h=0,d=n.length;d>h;h++)o===n[h][2]&&t.push(this._getSymbol(a[r],n[h][2],n[h][3],n[h][0],n[h][1],"horizontal"))}},addDataAnimation:function(e){for(var t=this.series,i={},n=0,a=e.length;a>n;n++)i[e[n][0]]=e[n];for(var o,r,s,l,h,d,m,n=this.shapeList.length-1;n>=0;n--)if(h=this.shapeList[n]._seriesIndex,i[h]&&!i[h][3]){if(this.shapeList[n]._main&&this.shapeList[n].style.pointList.length>1){if(d=this.shapeList[n].style.pointList,r=Math.abs(d[0][0]-d[1][0]),l=Math.abs(d[0][1]-d[1][1]),m="horizontal"===this.shapeList[n]._orient,i[h][2]){if("half-smooth-polygon"===this.shapeList[n].type){var c=d.length;this.shapeList[n].style.pointList[c-3]=d[c-2],this.shapeList[n].style.pointList[c-3][m?0:1]=d[c-4][m?0:1],this.shapeList[n].style.pointList[c-2]=d[c-1]}this.shapeList[n].style.pointList.pop(),m?(o=r,s=0):(o=0,s=-l)}else{if(this.shapeList[n].style.pointList.shift(),"half-smooth-polygon"===this.shapeList[n].type){var p=this.shapeList[n].style.pointList.pop();m?p[0]=d[0][0]:p[1]=d[0][1],this.shapeList[n].style.pointList.push(p)}m?(o=-r,s=0):(o=0,s=l)}this.zr.modShape(this.shapeList[n].id,{style:{pointList:this.shapeList[n].style.pointList}},!0)}else{if(i[h][2]&&this.shapeList[n]._dataIndex===t[h].data.length-1){this.zr.delShape(this.shapeList[n].id);continue}if(!i[h][2]&&0===this.shapeList[n]._dataIndex){this.zr.delShape(this.shapeList[n].id);continue}}this.shapeList[n].position=[0,0],this.zr.animate(this.shapeList[n].id,"").when(500,{position:[o,s]}).start()}}},r.prototype.iconLibrary.legendLineIcon=i,d.inherits(t,a),d.inherits(t,n),e("../chart").define("line",t),t}),define("echarts/util/shape/HalfSmoothPolygon",["require","zrender/shape/Base","zrender/shape/util/smoothBezier","zrender/tool/util","zrender/shape/Polygon"],function(e){function t(e){i.call(this,e)}var i=e("zrender/shape/Base"),n=e("zrender/shape/util/smoothBezier"),a=e("zrender/tool/util");return t.prototype={type:"half-smooth-polygon",buildPath:function(t,i){var a=i.pointList;if(!(a.length<2))if(i.smooth){var o=n(a.slice(0,-2),i.smooth,!1,i.smoothConstraint);t.moveTo(a[0][0],a[0][1]);for(var r,s,l,h=a.length,d=0;h-3>d;d++)r=o[2*d],s=o[2*d+1],l=a[d+1],t.bezierCurveTo(r[0],r[1],s[0],s[1],l[0],l[1]);t.lineTo(a[h-2][0],a[h-2][1]),t.lineTo(a[h-1][0],a[h-1][1]),t.lineTo(a[0][0],a[0][1])}else e("zrender/shape/Polygon").prototype.buildPath(t,i)}},a.inherits(t,i),t});
