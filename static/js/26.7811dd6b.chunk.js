(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[26],{287:function(e,a,t){"use strict";t.r(a);var n=t(6),i=t(7),l=t(14),c=t(15),s=t(0),o=t.n(s),m=t(18),r=(t(168),t(20)),u=t(12),d=t(34),v=t.n(d),E=t(22),p=function(e){Object(l.a)(t,e);var a=Object(c.a)(t);function t(e){var i;return Object(n.a)(this,t),(i=a.call(this,e)).state={usuario:"",url:E.a.apiUrl(),externo:!1,clase:i.props.id,clases:{}},i}return Object(i.a)(t,[{key:"componentDidMount",value:function(){}},{key:"getDatos",value:function(e){var a=this,t=this.state.url+"clases/"+e;v.a.get(t).then((function(e){a.setState({clases:e.data,loading:!1})}))}},{key:"componentDidUpdate",value:function(e){this.props.location!==e.location&&this.onRouteChanged()}},{key:"onRouteChanged",value:function(){console.log("ROUTE CHANGED")}},{key:"render",value:function(){var e=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"][this.props.clase.daysOfWeek],a=this.props.clase,t=a.materia,n=a.paralelo,i=a.semestre,l=a.tipo,c=a.tituloResponsable,s=a.responsable,m=a.ambiente,d=a.startTime,v=a.endTime,E=a.title;return o.a.createElement("div",null,o.a.createElement("div",{className:"informacion"},o.a.createElement("div",{className:"itemPrincipal"},o.a.createElement("div",{className:"itemTitulo"},o.a.createElement(r.a,{icon:u.b})," ",o.a.createElement("b",null," Materia")),o.a.createElement("div",{className:"itemInfo"},E," ",n),o.a.createElement("div",{className:"itemInfo"},t),o.a.createElement("div",{className:"itemInfo"},o.a.createElement("b",null,"Tipo: ")," ",l),o.a.createElement("div",{className:"itemInfo"},o.a.createElement("b",null,"Semestre: ")," ",i)),o.a.createElement("div",{className:"itemSecundario"},o.a.createElement("div",{className:"itemTitulo"},o.a.createElement(r.a,{icon:u.g}),"Horario"),o.a.createElement("div",{className:"itemInfo"},o.a.createElement("b",null,e," :")),o.a.createElement("div",{className:"itemInfo"},d," - ",v)),o.a.createElement("div",{className:"itemSecundario"},o.a.createElement("div",{className:"itemTitulo"},o.a.createElement(r.a,{icon:u.z}),"Docencia"),o.a.createElement("div",{className:"itemInfo"},c,". ",s)),o.a.createElement("div",{className:"itemSecundario"},o.a.createElement("div",{className:"itemTitulo"},o.a.createElement(r.a,{icon:u.w}),o.a.createElement("b",null,"Ambiente")),o.a.createElement("div",{className:"itemInfo"},m))))}}]),t}(s.Component);a.default=Object(m.f)(p)}}]);
//# sourceMappingURL=26.7811dd6b.chunk.js.map