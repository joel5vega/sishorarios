(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[21],{294:function(e,t,a){"use strict";a.d(t,"a",(function(){return u}));var n=a(0),r=a.n(n),i=a(499),o=a(236),c=a(338),l=a(259),s=Object(o.a)({root:{display:"flex",flexDirection:"column",flexShrink:3,flexGrow:2},info:{marginRight:2},avatar:{fontSize:function(e){return e.size},borderRadius:8,alignContent:"center",justifyContent:"align-center",verticalAlign:"center",backgroundColor:function(e){return e.color}},overline:{fontSize:function(e){return e.size},justifyContent:"center",minWidth:"150px"},name:{fontSize:function(e){return e.size},fontWeight:500,justifyContent:"center",color:"#495869"}});function u(e){var t=e.avatar,a=e.nombre,n=e.tipo,o=s(e);return r.a.createElement("div",{className:"tarjeta"},r.a.createElement(c.Row,Object.assign({gap:1},e),r.a.createElement(i.a,{className:o.avatar},t),r.a.createElement(c.Item,{position:"left"},r.a.createElement(l.a,{className:o.overline},n),r.a.createElement(l.a,{className:o.name},a))))}},489:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return f}));var n=a(4),r=a(5),i=a(9),o=a(10),c=a(0),l=a.n(c),s=a(294),u=a(6),m=a(12),f=function(e){Object(i.a)(a,e);var t=Object(o.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).state={url:m.a.apiUrl()},r}return Object(r.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this,t=this.props.datos;return l.a.createElement("div",null,l.a.createElement("div",{className:""},l.a.createElement("div",{className:""},l.a.createElement("div",{className:"tarjetas-titulo"},"Docentes"),l.a.createElement("div",{className:"cuadricula"},t.map((function(t){return l.a.createElement("div",{key:t.id,className:"cuadro"},"docente"===t.puesto&&l.a.createElement(u.c,{to:{pathname:"/clase/view",state:{fuente:e.state.url+"clases/responsable/"+t.id,titulo:" "+t.titulo+t.nombre}}},l.a.createElement(s.a,{tipo:t.nombre+" "+t.ap_paterno,nombre:t.puesto,avatar:t.titulo,size:"1rem",enlace:e.state.url+"responsable/"+t.id,color:"#0066CC"})))})))),l.a.createElement("div",{className:"tarjetas"},l.a.createElement("div",{className:"tarjetas-titulo"},"Auxiliares"),t.map((function(t){return l.a.createElement("div",{key:t.id},"auxiliar"===t.puesto&&l.a.createElement(s.a,{nombre:t.nombre+" "+t.ap_paterno,tipo:t.puesto,sigla:t.titulo,enlace:e.state.url+"responsable/"+t.id,color:"#00CCFF"}))})))))}}]),a}(c.Component)}}]);
//# sourceMappingURL=21.f7dcb567.chunk.js.map