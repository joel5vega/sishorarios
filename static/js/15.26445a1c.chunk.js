(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[15,21],{269:function(e,t,a){"use strict";a.d(t,"a",(function(){return h}));var n=a(6),i=a(7),r=a(11),o=a(12),s=a(0),l=a.n(s),c=a(32),u=a.n(c),d=a(292),m=a(282),v=a(293),p=a(294),b=a(295),h=(a(272),function(e){Object(r.a)(a,e);var t=Object(o.a)(a);function a(e){var i;return Object(n.a)(this,a),(i=t.call(this,e)).EventDetail=function(e){var t=e.event,a=e.el,n=t.extendedProps,r=n.paralelo,o=n.ambiente,s=n.tituloResponsable,c=n.responsable,d=l.a.createElement("div",{className:"dato-cal"},l.a.createElement("div",{className:"dato-cal-sigla"},t.title,"-",r),l.a.createElement("div",{className:"dato-cal-responsable"},s,".",c),l.a.createElement("div",{className:"dato-cal-ambiente"},o)),m=l.a.createElement("div",{className:"dato-cal"},l.a.createElement("div",{className:"dato-cal-ambiente"},t.extendedProps.ambiente,l.a.createElement("br",null)),l.a.createElement("div",{className:"dato-cal-sigla"},t.title,"-",r));return"timeGridWeek"===i.props.view?u.a.render(d,a):u.a.render(m,a),a},i.dateClick=function(e){var t=i.props.getDateClick,a={day:e.date.getDay(),startTime:e.date.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!1}),date:e.date};console.log(a),t(a)},i.eventDrop=function(e){var t=e.event;console.log(e);var a={day:t.start.getDay(),startTime:t.start.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!1}),endTime:t.end.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!1}),date:t.start.getUTCDate()};console.log(a)},i.eventClick=function(e){(0,i.props.eventClick)(e)},i.DefinirColor=function(e){return(e.event.tipo="teoria")?"var(--color-second-1)":"var(--color-second-2)"},i.state={loading:!1,clases:[],fuente:i.props.fuente,width:window.innerWidth,view:"timeGridWeek"},i}return Object(i.a)(a,[{key:"render",value:function(){var e=this.props.view;return this.state.loading?l.a.createElement("div",null,"cargando todavia"):"undefined"===this.state.fuente?l.a.createElement("div",null,"No se encuentra fuente"):l.a.createElement(d.a,{plugins:[v.a,m.d,b.a,p.a],defaultView:e,header:!1,columnHeaderFormat:{weekday:"short"},height:"auto",slotLabelFormat:{hour:"numeric",minute:"2-digit",omitZeroMinute:!1},locale:"es",events:this.props.fuente,slotEventOverlap:!1,eventOverlap:!1,longPressDelay:"1000",eventRender:this.EventDetail,hiddenDays:"0",allDaySlot:!1,navLinks:"true",editable:"true",minTime:"7:30",maxTime:"21:00",slotLabelInterval:"00:30:00",nowIndicator:!0,dateClick:this.dateClick,eventClick:this.eventClick,eventDrop:this.eventDrop})}}]),a}(s.Component))},272:function(e,t,a){},296:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return h}));var n=a(17),i=a.n(n),r=a(29),o=a(6),s=a(7),l=a(11),c=a(12),u=a(35),d=a.n(u),m=a(0),v=a.n(m),p=a(339),b=a(15),h=function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={usuario:"",api:b.a.apiUrl(),ambiente:{total:{},diario:{}}},n}return Object(s.a)(a,[{key:"componentDidMount",value:function(){this.getDatosAmbientes()}},{key:"getDatosAmbientes",value:function(){var e=Object(r.a)(i.a.mark((function e(){var t,a=this;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=this.state.api+"/datos?tipo=ambiente";try{d.a.get(t).then((function(e){a.setState({ambiente:e.data.ambiente})}))}catch(n){console.log(n)}case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state.ambiente,t=e.diario,a=e.total,n=Object.keys(a),i={mantainAspectRatio:!1,responsive:!0,scales:{y:{ticks:{stepSize:8,callback:function(e,t,a){return e+" hrs."}}},x:{ticks:{padding:1,display:"auto",autoSkip:!0,callback:function(e,t,a){return"length"===n[e]?"":n[e]}}}}},r={labels:n,datasets:[{type:"bar",label:"Uso total",backgroundColor:"#40916C",borderColor:"black",borderWidth:1,hoverBackgroundColor:"rgba(216,243,220,0.1)",hoverBorderColor:"rgba(8, 28, 21)",data:a,skipNull:!0}]};return v.a.createElement("div",{className:"cuadro"},v.a.createElement("div",{className:"tarjeta-big"},v.a.createElement("div",{className:"tarjetas-titulo"},"Uso de Ambientes por d\xeda"),Object.keys(t).map((function(e){return v.a.createElement("div",{className:"tarjeta-big",key:e},v.a.createElement("div",{className:"tarjeta-peque"},v.a.createElement(p.a,{data:{labels:Object.keys(t[e]),datasets:[{label:e,backgroundColor:"#40916C",borderColor:"black",data:t[e]}]},options:{mantainAspectRatio:!1,responsive:!0,scales:{y:{ticks:{callback:function(e,t,a){return e+" h."}}},x:{ticks:{display:"auto",autoSkip:!0,callback:function(e,t,a){if("length"!==n[e])return["Lun","Mar","Mie","Jue","Vie","Sab."][t]}}}}}})))}))),v.a.createElement("div",{className:"tarjetas-titulo"},"Uso semanal de ambientes"),v.a.createElement("div",{className:"diagrama"},v.a.createElement(p.a,{data:r,options:i})))}}]),a}(m.Component)},349:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return d}));var n=a(6),i=a(7),r=a(11),o=a(12),s=a(0),l=a.n(s),c=a(296),u=a(269),d=function(e){Object(r.a)(a,e);var t=Object(o.a)(a);function a(e){var i;return Object(n.a)(this,a),(i=t.call(this,e)).state={usuario:"",responsable:{},ambiente:{}},i}return Object(i.a)(a,[{key:"eventClick",value:function(e){}},{key:"getDateClick",value:function(e){}},{key:"render",value:function(){var e=this.state.responsable.docente_equivalente,t=this.props.clases.eventos;return l.a.createElement("div",{className:"tarjeta-big"},l.a.createElement("div",{className:"col border-right"},l.a.createElement("div",{className:"tarjeta-titulo"},"Actividades en curso ",t),l.a.createElement(u.a,{fuente:this.props.clases,getDateClick:this.getDateClick,eventClick:this.eventClick,view:"timeGrid"})),l.a.createElement("div",{className:"col"},l.a.createElement(c.default,{datos:this.state.ambiente})),e)}}]),a}(s.Component)}}]);
//# sourceMappingURL=15.26445a1c.chunk.js.map