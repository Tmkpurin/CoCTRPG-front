import{ah as Fe,$ as we,x as Z,o as q,ab as ke,a4 as s,ag as Ue,a0 as De,a1 as Pe,a2 as k,c as t,ax as Se,aa as d,ay as G,az as Ae,aA as J,a5 as Q,a6 as Y,aB as e,a3 as z,a8 as T,a7 as M,ad as p,aw as r,aC as Be}from"./index-DLbUNHb9.js";import{c as Ce,a as v,b as i,u as Ne,d as u,V as ze}from"./index.esm-B9qOmT6h.js";import{b as ee}from"./route-block-B_A1xBdJ.js";import{V as Te}from"./VContainer-B5SQmn9o.js";import{V as U}from"./VDivider-x1LuGNcv.js";import{V as b,a as m}from"./VRow-BGoYdfwg.js";import{V as le}from"./VTable-CdnEdn60.js";import{V as Me}from"./VTextarea-BWUntw4Y.js";const $e={class:"my-6"},je={class:"text-h6 mr-2"},Ee={class:"my-6"},Re={class:"my-6"},Ie={class:"text-h6"},Ke={class:"text-h6"},Oe={class:"text-h6"},Le={class:"text-h6"},He={class:"my-6"},We={class:"text-h6"},Xe={class:"text-h6"},Ze={class:"my-6"},qe={class:"text-h6"},Ge={class:"text-h6"},Je={class:"my-6"},Qe={class:"my-6"},Ye={class:"my-6"},te=25,ae=25,ne=25,oe={__name:"charasheetNew",setup(el){const{apiAuth:se}=Ue(),de=De(),$=we(),ue=Ce({investigator_name:v().default(""),occupation:v().default(""),colleges_degrees:v().default(""),birthplace:v().default(""),mental_disorders:v().default(""),sex:v().default(""),age:v().default(""),str:i().integer().default(0),con:i().integer().default(0),pow:i().integer().default(0),dex:i().integer().default(0),app:i().integer().default(0),siz:i().integer().default(0),int:i().integer().default(0),edu:i().integer().default(0),hp:i().integer().default(0),mp:i().integer().default(0),san:i().integer().default(0),opspothidden:i().integer().default(0),ipspothidden:i().integer().default(0),gpspothidden:i().integer().default(0),oplisten:i().integer().default(0),iplisten:i().integer().default(0),gplisten:i().integer().default(0),oplibraryuse:i().integer().default(0),iplibraryuse:i().integer().default(0),gplibraryuse:i().integer().default(0),background:v().default("")}),{handleSubmit:ie,isSubmitting:D}=Ne({validationSchema:ue}),pe=u("investigator_name"),re=u("occupation"),me=u("colleges_degrees"),ce=u("birthplace"),ve=u("mental_disorders"),be=u("sex"),fe=u("age"),j=u("str"),E=u("con"),g=u("pow"),ge=u("dex"),Ve=u("app"),P=u("siz"),S=u("int"),A=u("edu"),R=u("hp"),I=u("mp"),K=u("san"),V=u("opspothidden"),h=u("ipspothidden"),B=u("gpspothidden"),y=u("oplisten"),x=u("iplisten"),C=u("gplisten"),_=u("oplibraryuse"),F=u("iplibraryuse"),N=u("gplibraryuse"),O=u("background"),f=Z([]),L=Z([]),he=[{label:"姓名",model:pe},{label:"職業",model:re},{label:"學校・學位",model:me},{label:"出身",model:ce},{label:"精神障礙",model:ve},{label:"性別",model:be},{label:"年齡",model:fe}],H=[{label:"STR",model:j},{label:"CON",model:E},{label:"POW",model:g},{label:"DEX",model:ge},{label:"APP",model:Ve},{label:"SIZ",model:P},{label:"INT",model:S},{label:"EDU",model:A}],c=q(()=>({idea:parseFloat(S.value.value*5)||0,know:parseFloat(A.value.value*5)||0,luck:parseFloat(g.value.value*5)||0,hp:Math.ceil(((parseFloat(E.value.value)||0)+(parseFloat(P.value.value)||0))/2),mp:parseFloat(g.value.value)||0,san:parseFloat(g.value.value*5)||0,occupationpoints:parseFloat(A.value.value)*20||0,moveoccupationpoints:(parseFloat(V.value.value)||0)+(parseFloat(y.value.value)||0)+(parseFloat(_.value.value)||0),interestpoints:parseFloat(S.value.value)*10||0,moveinterestpoints:(parseFloat(h.value.value)||0)+(parseFloat(x.value.value)||0)+(parseFloat(F.value.value)||0),totalspothidden:te+(parseFloat(V.value.value)||0)+(parseFloat(h.value.value)||0)+(parseFloat(B.value.value)||0),totallisten:ae+(parseFloat(y.value.value)||0)+(parseFloat(x.value.value)||0)+(parseFloat(C.value.value)||0),totallibraryuse:ne+(parseFloat(_.value.value)||0)+(parseFloat(F.value.value)||0)+(parseFloat(N.value.value)||0)})),ye=q(()=>{const n=(parseFloat(j.value.value)||0)+(parseFloat(P.value.value)||0);return n<=12?"-1D6":n<=16?"-1D4":n<=24?"0":n<=32?"+1D4":n<=40?"+1D6":`+${Math.floor((n-25)/16)+1}D6`}),xe=ie(async n=>{var l,w,o;try{console.log("按完送出:",n),Object.keys(n).forEach(X=>{n[X]===void 0&&(n[X]="")});const a=new FormData;a.append("investigator_name",n.investigator_name),a.append("occupation",n.occupation),a.append("colleges_degrees",n.colleges_degrees),a.append("birthplace",n.birthplace),a.append("mental_disorders",n.mental_disorders),a.append("sex",n.sex),a.append("age",n.age),a.append("str",n.str),a.append("con",n.con),a.append("pow",n.pow),a.append("dex",n.dex),a.append("app",n.app),a.append("siz",n.siz),a.append("int",n.int),a.append("edu",n.edu),a.append("idea",n.idea),a.append("know",n.know),a.append("luck",n.luck),a.append("db",n.db),a.append("hp",n.hp),a.append("mp",n.mp),a.append("san",n.san),a.append("opspothidden",n.opspothidden),a.append("ipspothidden",n.ipspothidden),a.append("gpspothidden",n.gpspothidden),a.append("oplisten",n.oplisten),a.append("iplisten",n.iplisten),a.append("gplisten",n.gplisten),a.append("oplibraryuse",n.oplibraryuse),a.append("iplibraryuse",n.iplibraryuse),a.append("gplibraryuse",n.gplibraryuse),a.append("background",n.background),f.value.length>0&&((l=f.value[0])!=null&&l.file)&&a.append("image",f.value[0].file);const _e=(await se.post("/charasheetsix",a)).data.result._id;$({text:"保存成功",snackbarProps:{color:"green"}}),de.push(`/charasheetsix/${_e}`)}catch(a){console.log(a),$({text:((o=(w=a==null?void 0:a.response)==null?void 0:w.data)==null?void 0:o.message)||"unknownError",snackbarProps:{color:"red"}})}});return(n,l)=>{const w=Pe("VueFileAgent");return k(),ke(Te,{width:"800px",fluid:""},{default:s(()=>[t(Be,{"max-width":"auto",class:"mx-auto",variant:"text"},{default:s(()=>[t(Se,null,{default:s(()=>[t(ze,{disabled:d(D),onSubmit:G(d(xe),["prevent"]),onKeydown:l[15]||(l[15]=Ae(G(()=>{},["prevent"]),["enter"]))},{default:s(()=>[t(J,null,{default:s(()=>[t(Q,{type:"submit",loading:d(D),variant:"outlined"},{default:s(()=>l[16]||(l[16]=[Y(" 儲存 ")])),_:1},8,["loading"])]),_:1}),t(U),e("section",$e,[t(b,{align:"center",justify:"center"},{default:s(()=>[(k(),z(M,null,T(he,o=>t(m,{key:o.label,cols:"12",class:"d-flex align-center"},{default:s(()=>[e("label",je,p(o.label),1),t(r,{modelValue:o.model.value.value,"onUpdate:modelValue":a=>o.model.value.value=a,type:"text",density:"compact",variant:"outlined","hide-details":""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)),64)),t(m,{cols:"3"},{default:s(()=>[l[17]||(l[17]=e("label",{class:"text-h6"},"上傳調查員圖像",-1)),t(w,{ref:"fileAgent",modelValue:f.value,"onUpdate:modelValue":l[0]||(l[0]=o=>f.value=o),"raw-model-value":L.value,"onUpdate:rawModelValue":l[1]||(l[1]=o=>L.value=o),accept:"image/jpeg, image/png",deletable:"","max-size":"1MB","help-text":"點擊選取圖片或拖曳圖片"},null,8,["modelValue","raw-model-value"])]),_:1})]),_:1})]),e("section",Ee,[t(le,{class:"border"},{default:s(()=>[e("thead",null,[e("tr",null,[(k(),z(M,null,T(H,(o,a)=>e("th",{key:a,class:"text-h6"},p(o.label),1)),64))])]),e("tbody",null,[e("tr",null,[(k(),z(M,null,T(H,(o,a)=>e("td",{key:a},[t(r,{modelValue:o.model.value.value,"onUpdate:modelValue":W=>o.model.value.value=W,type:"number",density:"compact",variant:"outlined","hide-spin-buttons":!0,"hide-details":""},null,8,["modelValue","onUpdate:modelValue"])])),64))])])]),_:1})]),e("section",Re,[t(b,{align:"center",class:"ml-1"},{default:s(()=>[t(m,{cols:"3"},{default:s(()=>[e("label",Ie,"Idea："+p(c.value.idea),1)]),_:1}),t(m,{cols:"3"},{default:s(()=>[e("label",Ke,"Know："+p(c.value.know),1)]),_:1}),t(m,{cols:"3"},{default:s(()=>[e("label",Oe,"Luck："+p(c.value.luck),1)]),_:1}),t(m,{cols:"3"},{default:s(()=>[e("label",Le,"DB："+p(ye.value),1)]),_:1})]),_:1})]),e("section",He,[t(b,{align:"center",class:"ml-1"},{default:s(()=>[t(m,{cols:"2"},{default:s(()=>[e("label",We,"HP："+p(c.value.hp),1),t(r,{modelValue:d(R).value.value,"onUpdate:modelValue":l[2]||(l[2]=o=>d(R).value.value=o),type:"number",density:"compact",variant:"outlined","hide-spin-buttons":!0,"hide-details":""},null,8,["modelValue"])]),_:1}),t(m,{cols:"2",class:"text-h6"},{default:s(()=>[e("label",null,"MP："+p(c.value.mp),1),t(r,{modelValue:d(I).value.value,"onUpdate:modelValue":l[3]||(l[3]=o=>d(I).value.value=o),type:"number",density:"compact",variant:"outlined","hide-spin-buttons":!0,"hide-details":""},null,8,["modelValue"])]),_:1}),t(m,{cols:"2"},{default:s(()=>[e("label",Xe,"SAN："+p(c.value.san),1),t(r,{modelValue:d(K).value.value,"onUpdate:modelValue":l[4]||(l[4]=o=>d(K).value.value=o),type:"number",density:"compact",variant:"outlined","hide-spin-buttons":!0,"hide-details":""},null,8,["modelValue"])]),_:1})]),_:1})]),t(U),e("section",Ze,[t(b,{justify:"start",align:"center"},{default:s(()=>[t(m,{cols:"2"},{default:s(()=>l[18]||(l[18]=[e("label",{class:"text-h4"},"技能",-1)])),_:1}),t(m,{cols:"4"},{default:s(()=>[e("label",qe,"職業技能點數："+p(c.value.occupationpoints)+"/"+p(c.value.moveoccupationpoints),1)]),_:1}),t(m,{cols:"4"},{default:s(()=>[e("label",Ge,"興趣技能點數："+p(c.value.interestpoints)+"/"+p(c.value.moveinterestpoints),1)]),_:1})]),_:1})]),e("section",Je,[t(le,{class:"border"},{default:s(()=>[l[22]||(l[22]=e("thead",null,[e("tr",null,[e("th",null,"技能"),e("th",null,"初始值"),e("th",null,"職業P"),e("th",null,"興趣P"),e("th",null,"成長P"),e("th",null,"合計")])],-1)),e("tbody",null,[e("tr",null,[l[19]||(l[19]=e("td",null,"偵查",-1)),e("td",null,p(te)),e("td",null,[t(r,{modelValue:d(V).value.value,"onUpdate:modelValue":l[5]||(l[5]=o=>d(V).value.value=o),type:"number",density:"compact",variant:"outlined","hide-spin-buttons":!0,"hide-details":""},null,8,["modelValue"])]),e("td",null,[t(r,{modelValue:d(h).value.value,"onUpdate:modelValue":l[6]||(l[6]=o=>d(h).value.value=o),type:"number",density:"compact",variant:"outlined","hide-spin-buttons":!0,"hide-details":""},null,8,["modelValue"])]),e("td",null,[t(r,{modelValue:d(B).value.value,"onUpdate:modelValue":l[7]||(l[7]=o=>d(B).value.value=o),type:"number",density:"compact",variant:"outlined","hide-spin-buttons":!0,"hide-details":""},null,8,["modelValue"])]),e("td",null,p(c.value.totalspothidden),1)]),e("tr",null,[l[20]||(l[20]=e("td",null,"聆聽",-1)),e("td",null,p(ae)),e("td",null,[t(r,{modelValue:d(y).value.value,"onUpdate:modelValue":l[8]||(l[8]=o=>d(y).value.value=o),type:"number",density:"compact",variant:"outlined","hide-spin-buttons":!0,"hide-details":""},null,8,["modelValue"])]),e("td",null,[t(r,{modelValue:d(x).value.value,"onUpdate:modelValue":l[9]||(l[9]=o=>d(x).value.value=o),type:"number",density:"compact",variant:"outlined","hide-spin-buttons":!0,"hide-details":""},null,8,["modelValue"])]),e("td",null,[t(r,{modelValue:d(C).value.value,"onUpdate:modelValue":l[10]||(l[10]=o=>d(C).value.value=o),type:"number",density:"compact",variant:"outlined","hide-spin-buttons":!0,"hide-details":""},null,8,["modelValue"])]),e("td",null,p(c.value.totallisten),1)]),e("tr",null,[l[21]||(l[21]=e("td",null,"圖書館使用",-1)),e("td",null,p(ne)),e("td",null,[t(r,{modelValue:d(_).value.value,"onUpdate:modelValue":l[11]||(l[11]=o=>d(_).value.value=o),type:"number",density:"compact",variant:"outlined","hide-spin-buttons":!0,"hide-details":""},null,8,["modelValue"])]),e("td",null,[t(r,{modelValue:d(F).value.value,"onUpdate:modelValue":l[12]||(l[12]=o=>d(F).value.value=o),type:"number",density:"compact",variant:"outlined","hide-spin-buttons":!0,"hide-details":""},null,8,["modelValue"])]),e("td",null,[t(r,{modelValue:d(N).value.value,"onUpdate:modelValue":l[13]||(l[13]=o=>d(N).value.value=o),type:"number",density:"compact",variant:"outlined","hide-spin-buttons":!0,"hide-details":""},null,8,["modelValue"])]),e("td",null,p(c.value.totallibraryuse),1)])])]),_:1})]),t(U),e("section",Qe,[t(b,{justify:"start",align:"center"},{default:s(()=>[t(m,null,{default:s(()=>l[23]||(l[23]=[e("label",{class:"text-h4"},"背景故事",-1)])),_:1})]),_:1})]),e("section",Ye,[t(b,null,{default:s(()=>[t(m,null,{default:s(()=>[t(Me,{modelValue:d(O).value.value,"onUpdate:modelValue":l[14]||(l[14]=o=>d(O).value.value=o),type:"text",variant:"outlined","auto-grow":""},null,8,["modelValue"])]),_:1})]),_:1})]),t(U),t(J,null,{default:s(()=>[t(Q,{type:"submit",loading:d(D),variant:"outlined"},{default:s(()=>l[24]||(l[24]=[Y(" 儲存 ")])),_:1},8,["loading"])]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1})]),_:1})]),_:1})}}};typeof ee=="function"&&ee(oe);const il=Fe(oe,[["__scopeId","data-v-e2cf175b"]]);export{il as default};
