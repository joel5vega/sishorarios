(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[25],{316:function(e,a,t){"use strict";t.r(a);var n=t(66),c=t(56),s=t(6),i=t(7),l=t(11),o=t(12),r=t(0),m=t.n(r),d=t(57),h=t(80),b=function(e){Object(l.a)(t,e);var a=Object(o.a)(t);function t(){return Object(s.a)(this,t),a.apply(this,arguments)}return Object(i.a)(t,[{key:"render",value:function(){var e=this.props,a=e.label,t=e.value,n=e.datos,c=e.handleChange;return m.a.createElement("div",{className:"tarjeta-peque"},m.a.createElement("label",null,a),m.a.createElement("div",{className:"fila"},n.map((function(e){return m.a.createElement("div",{key:e.id},"General"!==e.nombre&&m.a.createElement("div",{key:e.id,className:"tarjeta-peque"},m.a.createElement("input",{type:"checkbox",onChange:c,value:e.id,name:e.id,checked:t[e.id]}),m.a.createElement("p",{key:e.id,value:e.id},e.nombre)))}))))}}]),t}(r.Component);t.d(a,"default",(function(){return u}));var u=function(e){Object(l.a)(t,e);var a=Object(o.a)(t);function t(e){var i;return Object(s.a)(this,t),(i=a.call(this,e)).checkMenciones=function(e){var a={};return e.map((function(e){a=Object(c.a)(Object(c.a)({},a),{},Object(n.a)({},e.id,!0))})),i.setState({mencionesSeleccionadas:a,selected:Object(c.a)(Object(c.a)({},i.state.selected),{},{menciones:a})}),console.log(a),a},i.handleChange=function(e){var a=e.target,t=a.value,s=a.name;i.setState({selected:Object(c.a)(Object(c.a)({},i.state.selected),{},Object(n.a)({},s,t))}),console.log(s),console.log(t),i.props.onChange(e)},i.handleCheckChange=function(e){var a=e.target,t=a.name,s=a.checked;i.setState({mencionesSeleccionadas:Object(c.a)(Object(c.a)({},i.state.mencionesSeleccionadas),{},Object(n.a)({},t,s)),selected:Object(c.a)(Object(c.a)({},i.state.selected),{},Object(n.a)({},"menciones",Object(c.a)(Object(c.a)({},i.state.selected.menciones),{},Object(n.a)({},t,s))))}),i.props.onCheckChange(e)},i.state={usuario:"",menciones:{3:!1,4:!1},selected:{sigla:"ETN-",nombre:"",semestre:"default",tipo:"default",pensum:"default",menciones:{2:!1,3:!1,4:!1}}},i}return Object(i.a)(t,[{key:"componentDidMount",value:function(){this.props.datos&&(this.setState({selected:this.props.datos}),this.props.datos.menciones||this.setState({selected:Object(c.a)(Object(c.a)({},this.state.selected),{},{menciones:{2:!1,3:!1,4:!1}})}))}},{key:"render",value:function(){var e=this.state.selected,a=e.sigla,t=e.nombre,n=e.tipo,c=e.semestre,s=e.pensum_id,i=e.menciones,l=this.props.menciones,o=this.props.pensums;return m.a.createElement("div",{className:"formulario"},m.a.createElement("div",{className:"itemSecundario"},m.a.createElement("div",{className:"itemInfo"},m.a.createElement(d.a,{label:"Sigla",nombre:"sigla",valor:a,handleChange:this.handleChange})),m.a.createElement("div",{className:"itemInfo"},m.a.createElement(d.a,{label:"Nombre",nombre:"nombre",valor:t,handleChange:this.handleChange})),m.a.createElement("div",{className:"itemInfo"},m.a.createElement(h.a,{label:"Semestre",value:c,name:"semestre",handleChange:this.handleChange,datos:[{id:"1",nombre:"1"},{id:"2",nombre:"2"},{id:"3",nombre:"3"},{id:"4",nombre:"4"},{id:"5",nombre:"5"},{id:"6",nombre:"6"},{id:"7",nombre:"7"},{id:"8",nombre:"8"},{id:"9",nombre:"9"},{id:"10",nombre:"10"}]}))),m.a.createElement("div",{className:"itemLargo"},m.a.createElement("div",{className:"itemInfo"},m.a.createElement(b,{label:"Menciones",value:i,name:"mencion",handleChange:this.handleCheckChange,datos:l}))),m.a.createElement("div",{className:"itemSecundario"},m.a.createElement("div",{className:"itemInfo"},m.a.createElement(h.a,{label:"Tipo",value:n,name:"tipo",handleChange:this.handleChange,datos:[{id:"teoria",nombre:"Teoria"},{id:"laboratorio",nombre:"Laboratorio"}]})),m.a.createElement("div",{className:"itemInfo"},m.a.createElement(h.a,{label:"Pensum",value:s,name:"pensum",handleChange:this.handleChange,datos:o}))))}}]),t}(r.Component)}}]);
//# sourceMappingURL=25.ef516452.chunk.js.map