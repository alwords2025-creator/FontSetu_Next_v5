const $=id=>document.getElementById(id);
const toast=msg=>{const e=$("toast");e.textContent=msg;e.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("show"),2600)};
const STORE={history:"fontsetu_next_history",visits:"fontsetu_next_visits",impressions:"fontsetu_next_impressions",affiliates:"fontsetu_next_affiliates",settings:"fontsetu_next_settings"};
const get=(key,fallback)=>{try{const v=JSON.parse(localStorage.getItem(key));return v??fallback}catch{return fallback}};
const put=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
let history=get(STORE.history,[]), affiliates=get(STORE.affiliates,[]), settings=get(STORE.settings,{});
function stamp(){return new Date().toLocaleString(undefined,{year:"numeric",month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"})}
function logAction(action,details=""){history.unshift({time:new Date().toISOString(),action,details});history=history.slice(0,500);put(STORE.history,history);renderHistory();renderStats()}
function renderHistory(){const body=$("historyTable");if(!body)return;body.innerHTML="";if(!history.length){body.innerHTML='<tr><td colspan="3">No actions recorded yet.</td></tr>'}else history.forEach(item=>{const tr=document.createElement("tr");[new Date(item.time).toLocaleString(),item.action,item.details||"—"].forEach(v=>{const td=document.createElement("td");td.textContent=v;tr.append(td)});body.append(tr)});$("historyTotal").textContent=history.length;$("firstRecord").textContent=history.length?new Date(history[history.length-1].time).toLocaleDateString():"—";$("lastRecord").textContent=history.length?new Date(history[0].time).toLocaleString():"—";$("historyViews").textContent=get(STORE.impressions,0)}
function renderStats(){$("visitCount").textContent=get(STORE.visits,1);$("impressionCount").textContent=get(STORE.impressions,1);$("actionCount").textContent=history.length;$("lastActivity").textContent=history.length?new Date(history[0].time).toLocaleTimeString():"Not yet";$("todayDate").textContent=new Date().toLocaleDateString(undefined,{weekday:"short",year:"numeric",month:"short",day:"numeric"});$("updatedAt").textContent=stamp()}
function tick(){$("liveClock").textContent=stamp()}
tick();setInterval(tick,1000);$("year").textContent=new Date().getFullYear();
put(STORE.visits,get(STORE.visits,0)+1);
function recordView(page){put(STORE.impressions,get(STORE.impressions,0)+1);logAction("Page viewed",page);$("crumb").textContent=page.toUpperCase();$("pageTitle").textContent=({home:"Dashboard",converter:"Font converter",pdf:"PDF & images",editor:"Image editor",history:"Project history",ads:"Ads & affiliate",settings:"Settings"})[page]||page}
function showPage(page){document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));const target=$(page+"-page");if(target)target.classList.add("active");document.querySelectorAll(".side-link").forEach(a=>a.classList.toggle("active",a.dataset.page===page));recordView(page);window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll("[data-page]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();showPage(a.dataset.page)}));
document.querySelectorAll("[data-goto]").forEach(a=>a.addEventListener("click",()=>showPage(a.dataset.goto)));
renderStats();renderHistory();recordView("home");
async function clip(action,id){const f=$(id);if(action==="clear"){f.value="";logAction("Clear text",id);return toast("Cleared.")}if(action==="copy"||action==="cut"){try{await navigator.clipboard.writeText(f.value);if(action==="cut")f.value="";toast(action==="copy"?"Copied":"Cut to clipboard");logAction(action==="copy"?"Copy text":"Cut text",id)}catch{f.focus();f.select();toast("Clipboard blocked. Use keyboard shortcuts.")}}if(action==="paste"){try{f.value=await navigator.clipboard.readText();logAction("Paste text",id);toast("Pasted")}catch{f.focus();toast("Use Ctrl+V or allow clipboard access")}}}
document.querySelectorAll("[data-clip]").forEach(b=>b.addEventListener("click",()=>clip(b.dataset.clip,b.dataset.target)));
// KrutiDev 010 conversion engine: ordered sequence maps plus matra/reph reordering.
// KrutiDev is a legacy font encoding; this engine targets KrutiDev 010/10, not Shivaji or 055.
const K2U_FROM = [
"ñ","Q+Z","sas","aa",")Z","ZZ","‘","’","“","”",
"å","ƒ","„","…","†","‡","ˆ","‰","Š","‹",
"¶+","d+","[+k","[+","x+","T+","t+","M+","<+","Q+",";+","j+","u+",
"Ùk","Ù","ä","–","—","é","™","=kk","f=k",
"à","á","â","ã","ºz","º","í","{k","{","=","«",
"Nî","Vî","Bî","Mî","<î","|","K","}",
"J","Vª","Mª","<ªª","Nª","Ø","Ý","nzZ","æ","ç","Á","xz","#",":",
"v‚","vks","vkS","vk","v","b±","Ã","bZ","b","m","Å",",s",",","_",
"ô","d","Dk","D","£","[k","[","x","Xk","X","Ä","?k","?","³",
"p","Pk","P","N","t","Tk","T",">","÷","¥",
"ê","ë","V","B","ì","ï","M+","<+","M","<",".k",".",
"r","Rk","R","Fk","F",")","n","/k","èk","/","Ë","è","u","Uk","U",
"i","Ik","I","Q","¶","c","Ck","C","Hk","H","e","Ek","E",
";","¸","j","y","Yk","Y","G","o","Ok","O",
"'k","'","\"k","\"","l","Lk","L","g",
"È","z","Ì","Í","Î","Ï","Ñ","Ò","Ó","Ô","Ö","Ø","Ù","Ük","Ü",
"‚","¨","ks","©","kS","k","h","q","w","`","s","¢","S",
"a","¡","%","W","•","·","∙","·","~j","~","\\","+"," ः",
"^","*","Þ","ß","(","¼","½","¿","À","¾","A","-","&","Œ","]","~ ","@","ाे","ाॅ","ंै","े्र","अौ","अो","आॅ"
];
const K2U_TO = [
"॰","QZ+","sa","a","र्द्ध","Z","\"","\"","'","'",
"०","१","२","३","४","५","६","७","८","९",
"फ़्","क़","ख़","ख़्","ग़","ज़्","ज़","ड़","ढ़","फ़","य़","ऱ","ऩ",
"त्त","त्त्","क्त","दृ","कृ","न्न","न्न्","=k","f=",
"ह्न","ह्य","हृ","ह्म","ह्र","ह्","द्द","क्ष","क्ष्","त्र","त्र्",
"छ्य","ट्य","ठ्य","ड्य","ढ्य","द्य","ज्ञ","द्व",
"श्र","ट्र","ड्र","ढ्र","छ्र","क्र","फ्र","र्द्र","द्र","प्र","प्र","ग्र","रु","रू",
"ऑ","ओ","औ","आ","अ","ईं","ई","ई","इ","उ","ऊ","ऐ","ए","ऋ",
"क्क","क","क","क्","ख","ख","ख्","ग","ग","ग्","घ","घ","घ्","ङ",
"च","च","च्","छ","ज","ज","ज्","झ","झ्","ञ",
"ट्ट","ट्ठ","ट","ठ","ड्ड","ड्ढ","ड़","ढ़","ड","ढ","ण","ण्",
"त","त","त्","थ","थ्","द्ध","द","ध","ध","ध्","ध्","ध्","न","न","न्",
"प","प","प्","फ","फ्","ब","ब","ब्","भ","भ्","म","म","म्",
"य","य्","र","ल","ल","ल्","ळ","व","व","व्",
"श","श्","ष","ष्","स","स","स्","ह",
"ीं","्र","द्द","ट्ट","ट्ठ","ड्ड","कृ","भ","्य","ड्ढ","झ्","क्र","त्त्","श","श्",
"ॉ","ो","ो","ौ","ौ","ा","ी","ु","ू","ृ","े","े","ै",
"ं","ँ","ः","ॅ","ऽ","ऽ","ऽ","्र","्र","्","़",":",
"‘","’","“","”",";","(",")","{","}","=","।",".","-","µ","॰",",","् ","/",
"ो","ॉ","ैं","्रे","औ","ओ","ऑ"
];
const U2K_FROM = [
"‘","’","“","”","(",")","{","}","=","।","?","-","µ","॰",",",".","् ",
"०","१","२","३","४","५","६","७","८","९","x","+",";","_",
"फ़्","क़","ख़","ग़","ज़्","ज़","ड़","ढ़","फ़","य़","ऱ","ऩ",
"त्त्","त्त","क्त","दृ","कृ","श्व","ह्न","ह्य","हृ","ह्म","ह्र","ह्","द्द","क्ष्","क्ष","त्र्","त्र","ज्ञ",
"छ्य","ट्य","ठ्य","ड्य","ढ्य","द्य","द्व","श्र","ट्र","ड्र","ढ्र","छ्र","क्र","फ्र","द्र","प्र","ग्र","रु","रू","्र",
"ओ","औ","आ","अ","ई","इ","उ","ऊ","ऐ","ए","ऋ",
"क्","क","क्क","ख्","ख","ग्","ग","घ्","घ","ङ",
"चै","च्","च","छ","ज्","ज","झ्","झ","ञ",
"ट्ट","ट्ठ","ट","ठ","ड्ड","ड्ढ","ड","ढ","ण्","ण",
"त्","त","थ्","थ","द्ध","द","ध्","ध","न्","न",
"प्","प","फ्","फ","ब्","ब","भ्","भ","म्","म",
"य्","य","र","ल्","ल","ळ","व्","व",
"श्","श","ष्","ष","स्","स","ह",
"ऑ","ॉ","ो","ौ","ा","ी","ु","ू","ृ","े","ै","ं","ँ","ः","ॅ","ऽ","् ","्","़","/"
];
const U2K_TO = [
"^","*","Þ","ß","¼","½","¿","À","¾","A","\\","-","&","Œ","]","-","~ ",
"å","ƒ","„","…","†","‡","ˆ","‰","Š","‹","Û","$","(","&",
"¶+","d+","[k+","x+","T+","t+","M+","<+","Q+",";+","j+","u+",
"Ù","Ùk","ä","–","—","Üo","à","á","â","ã","ºz","º","í","{","{k","«","=","K",
"Nî","Vî","Bî","Mî","<î","|","}","J","Vª","Mª","<ªª","Nª","Ø","Ý","æ","ç","xz","#",":","z",
"vks","vkS","vk","v","bZ","b","m","Å",",s",",","_",
"D","d","ô","[","[k","X","x","?","?k","³",
"pkS","P","p","N","T","t","÷",">","¥",
"ê","ë","V","B","ì","ï","M","<",".",".k",
"R","r","F","Fk",")","n","è","èk","U","u",
"I","i","¶","Q","C","c","H","Hk","E","e",
"¸",";","j","Y","y","G","O","o",
"'","'k","\"","\"k","L","l","g",
"v‚","‚","ks","kS","k","h","q","w","`","s","S","a","¡","%","W","·","~ ","~","+","@"
];
function applyPairs(text, from, to) {
  // Single-pass longest-match replacement. Sequential split/join can re-process
  // newly generated Devanagari/ASCII output as if it were still source encoding,
  // corrupting letters and matras on longer words.
  const pairs = from.map((key, i) => [key, to[i]])
    .filter(([a,b]) => typeof a === "string" && a.length > 0 && b !== undefined)
    .sort((a,b) => b[0].length - a[0].length);
  const escaped = pairs.map(([key]) => key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!escaped.length) return text;
  const lookup = new Map(pairs);
  const matcher = new RegExp(escaped.join("|"), "g");
  return text.replace(matcher, match => lookup.get(match));
}
function krutiToUnicode(input) {
  let source = input.replace(/’/g,"'");
  // In the supplied KrutiDev 010 news text, ? before an amount is used as the rupee sign.
  // Other question marks continue through the normal KrutiDev glyph mapping.
  source = source.replace(/\?(?=\s*\d)/g, "₹");
  let out = applyPairs(source, K2U_FROM, K2U_TO);
  out = out.replace(/±/g,"Zं").replace(/Æ/g,"र्f").replace(/Ç/g,"fa").replace(/É/g,"र्fa").replace(/Ê/g,"ीZ");
  // KrutiDev types the short-i sign before its syllable; Unicode stores it after.
  out = out.replace(/fa(.?)/g, (_, next) => next + "िं");
  out = out.replace(/f(.?)/g, (_, next) => next + "ि");
  out = out.replace(/ि्(.?)/g, "्$1ि");
  // Reph marker Z moves to the beginning of the preceding syllable.
  out = out.replace(/([\u0900-\u0939\u093C\u0941-\u094D]*)([\u0915-\u0939क़ख़ग़ज़ड़ढ़फ़य़ऱऩळ])([ािीुूृेैोौंँॅ]*)Z/g, "$1र्$2$3");
  out = out.replace(/Z/g, "र्").replace(/््/g,"्");
  return out.normalize("NFC");
}
function unicodeToKruti(input) {
  let out = input.normalize("NFC").replace(/₹/g, "\uE000");
  const nukta = {"क़":"क़","ख़":"ख़","ग़":"ग़","ज़":"ज़","ड़":"ड़","ढ़":"ढ़","फ़":"फ़","य़":"य़","ऱ":"ऱ","ऩ":"ऩ"};
  for (const [a,b] of Object.entries(nukta)) out = out.split(a).join(b);
  // Move short-i before the consonant cluster, and reph after its syllable.
  out = out.replace(/([क-हक़ख़ग़ज़ड़ढ़फ़य़ऱऩळ]+्)*([क-हक़ख़ग़ज़ड़ढ़फ़य़ऱऩळ])ि/g, (m, prefix="", last) => "f" + prefix + last);
  out = out.replace(/र्((?:[क-हक़ख़ग़ज़ड़ढ़फ़य़ऱऩळ](?:्[क-हक़ख़ग़ज़ड़ढ़फ़य़ऱऩळ])*)[ािीुूृेैोौंँॅ]*)/g, "$1Z");
  // Preserve the project's legacy rupee placeholder after ordinary punctuation mapping.
  return applyPairs(out, U2K_FROM, U2K_TO).replace(/\uE000/g, "?");
}
function replaceLongest(input,map){ return applyPairs(input,Object.keys(map),Object.values(map)); }
let swapped=false,lastOutputId="unicodeOutput";
function setConverterLabels(){ $("leftLabelSmall").textContent=swapped?"INPUT":"INPUT"; $("rightLabelSmall").textContent="INPUT / RESULT"; $("leftLabel").textContent=swapped?"Unicode (Hindi / Marathi)":"KrutiDev (legacy)"; $("rightLabel").textContent=swapped?"KrutiDev (legacy)":"Unicode (Hindi / Marathi)"; $("leftTag").textContent=swapped?"Unicode text":"Legacy text"; }
$("toUnicode").addEventListener("click",()=>{const source=swapped?$("unicodeOutput"):$("krutiInput"),target=swapped?$("krutiInput"):$("unicodeOutput");const v=source.value;if(!v.trim())return toast("Enter KrutiDev text");target.value=krutiToUnicode(v);lastOutputId=target.id;logAction("Font conversion","KrutiDev to Unicode");toast("Converted. Please review the result.")});
$("toKruti").addEventListener("click",()=>{const source=swapped?$("krutiInput"):$("unicodeOutput"),target=swapped?$("unicodeOutput"):$("krutiInput");const v=source.value;if(!v.trim())return toast("Enter Unicode text");target.value=unicodeToKruti(v);lastOutputId=target.id;logAction("Font conversion","Unicode to KrutiDev");toast("Converted. Please review the result.")});
$("swapDirection").addEventListener("click",()=>{const left=$("krutiInput"),right=$("unicodeOutput"),v=left.value;left.value=right.value;right.value=v;swapped=!swapped;setConverterLabels();logAction("Swap converter boxes",swapped?"Unicode on left":"KrutiDev on left")});
setConverterLabels();
function outputText(){return $(lastOutputId).value||$("unicodeOutput").value||$("krutiInput").value||""}
function download(blob,name){const u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)}
$("downloadTxt").addEventListener("click",()=>{const t=outputText();if(!t)return toast("No output to download");download(new Blob([t],{type:"text/plain;charset=utf-8"}),"fontsetu-output.txt");logAction("Download TXT","Font converter output")});
$("downloadTxtPdf").addEventListener("click",()=>{const t=outputText();if(!t)return toast("No output to export");if(!window.jspdf)return toast("PDF library not loaded");const {jsPDF}=window.jspdf;const d=new jsPDF();d.setFont("helvetica");d.text(d.splitTextToSize(t,175),15,20);d.save("fontsetu-output.pdf");logAction("Export PDF","Font converter output (Latin fonts best)")});
$("textUpload").addEventListener("change",async e=>{const f=e.target.files[0];if(!f)return;$("krutiInput").value=await f.text();$("unicodeOutput").value="";swapped=false;setConverterLabels();showPage("converter");logAction("Upload text file",f.name);toast("Text loaded")});
if(window.pdfjsLib)pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
$("pdfUpload").addEventListener("change",async e=>{const f=e.target.files[0];if(!f)return;const area=$("pdfPreviewArea");area.innerHTML="";$("pdfStatus").textContent="Reading PDF…";if(!window.pdfjsLib){$("pdfStatus").textContent="PDF.js unavailable; check internet";return}try{const pdf=await pdfjsLib.getDocument({data:await f.arrayBuffer()}).promise;$("pdfStatus").textContent=`${pdf.numPages} page(s) detected.`;for(let n=1;n<=pdf.numPages;n++){const page=await pdf.getPage(n),vp=page.getViewport({scale:1.1}),canvas=document.createElement("canvas");canvas.width=vp.width;canvas.height=vp.height;await page.render({canvasContext:canvas.getContext("2d"),viewport:vp}).promise;const card=document.createElement("div");card.className="preview-card";const p=document.createElement("p");p.textContent=`Page ${n}`;const b=document.createElement("button");b.className="btn small";b.textContent="Download PNG";b.onclick=()=>canvas.toBlob(blob=>download(blob,`fontsetu-page-${n}.png`));card.append(canvas,p,b);area.append(card)}logAction("PDF rendered",`${f.name} · ${pdf.numPages} pages`)}catch(err){console.error(err);$("pdfStatus").textContent="Unable to render PDF; file may be damaged or encrypted"}});
let selectedImages=[];$("imageUpload").addEventListener("change",e=>{selectedImages=Array.from(e.target.files||[]).filter(f=>/^image\/(jpeg|png)$/.test(f.type));$("imageList").innerHTML="";selectedImages.forEach(f=>{const s=document.createElement("span");s.className="image-chip";s.textContent=f.name;$("imageList").append(s)});$("imageStatus").textContent=`${selectedImages.length} image(s) selected.`});
const readData=f=>new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(f)}),loadImg=s=>new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=s});
$("imagesToPdfBtn").addEventListener("click",async()=>{if(!selectedImages.length)return toast("Select JPG/PNG images");if(!window.jspdf)return toast("PDF library not loaded");try{const {jsPDF}=window.jspdf;let doc;for(let n=0;n<selectedImages.length;n++){const f=selectedImages[n],src=await readData(f),img=await loadImg(src),ori=img.width>=img.height?"landscape":"portrait";if(!n)doc=new jsPDF({orientation:ori,unit:"pt",format:"a4"});else doc.addPage("a4",ori);const w=doc.internal.pageSize.getWidth(),h=doc.internal.pageSize.getHeight(),s=Math.min((w-30)/img.width,(h-30)/img.height),iw=img.width*s,ih=img.height*s;doc.addImage(src,f.type==="image/png"?"PNG":"JPEG",(w-iw)/2,(h-ih)/2,iw,ih)}doc.save("fontsetu-images.pdf");logAction("Images converted to PDF",`${selectedImages.length} image(s)`);toast("PDF downloaded")}catch(e){console.error(e);toast("Could not create PDF")}});
/* Fabric.js image editor */
let canvas=null;function initCanvas(){if(!window.fabric){$("editorCanvas").insertAdjacentText("afterend"," Fabric.js not loaded; check internet.");return}canvas=new fabric.Canvas("editorCanvas",{backgroundColor:"#ffffff",preserveObjectStacking:true});canvas.setWidth(900);canvas.setHeight(600);canvas.renderAll();canvas.on("object:added",()=>{});canvas.on("object:modified",()=>logAction("Edit image","Canvas object modified"));window.addEventListener("keydown",e=>{if((e.key==="Delete"||e.key==="Backspace")&&canvas&&canvas.getActiveObject()&&!["INPUT","TEXTAREA"].includes(document.activeElement.tagName)){canvas.remove(canvas.getActiveObject());canvas.discardActiveObject();canvas.renderAll();logAction("Edit image","Deleted selected object")}})}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initCanvas);else initCanvas();
$("editorUpload").addEventListener("change",e=>{const f=e.target.files[0];if(!f)return;if(!window.fabric)return toast("Editor library not loaded");const r=new FileReader();r.onload=ev=>fabric.Image.fromURL(ev.target.result,img=>{if(!canvas)return;canvas.clear();canvas.setBackgroundColor("#fff",canvas.renderAll.bind(canvas));const scale=Math.min(860/img.width,560/img.height,1);img.set({left:(900-img.width*scale)/2,top:(600-img.height*scale)/2,scaleX:scale,scaleY:scale,selectable:true});canvas.add(img);canvas.setActiveObject(img);canvas.renderAll();logAction("Upload image to editor",f.name);toast("Image loaded")});r.readAsDataURL(f)});
$("addText").addEventListener("click",()=>{if(!canvas)return toast("Editor unavailable");const text=$("overlayText").value.trim();if(!text)return toast("Type text first");const obj=new fabric.Textbox(text,{left:70,top:60,fontSize:Math.min(120,Math.max(10,Number($("textSize").value)||32)),fill:$("textColor").value,fontFamily:"Arial",width:500});canvas.add(obj);canvas.setActiveObject(obj);canvas.renderAll();logAction("Add image text",text.slice(0,80))});
$("addRect").addEventListener("click",()=>{if(!canvas)return;const o=new fabric.Rect({left:100,top:100,width:180,height:100,fill:$("shapeColor").value,opacity:.8});canvas.add(o);canvas.setActiveObject(o);canvas.renderAll();logAction("Add rectangle","Image editor")});
$("addCircle").addEventListener("click",()=>{if(!canvas)return;const o=new fabric.Circle({left:150,top:150,radius:55,fill:$("shapeColor").value,opacity:.8});canvas.add(o);canvas.setActiveObject(o);canvas.renderAll();logAction("Add circle","Image editor")});
$("applyFilters").addEventListener("click",()=>{if(!canvas)return;const obj=canvas.getObjects().find(o=>o.type==="image");if(!obj)return toast("Upload/select an image first");obj.filters=[];obj.filters.push(new fabric.Image.filters.Brightness({brightness:Number($("brightness").value)}));obj.filters.push(new fabric.Image.filters.Contrast({contrast:Number($("contrast").value)}));obj.applyFilters();canvas.renderAll();logAction("Apply image filters",`Brightness ${$("brightness").value}; contrast ${$("contrast").value}`);toast("Filters applied")});
$("resetEditor").addEventListener("click",()=>{if(!canvas)return;canvas.clear();canvas.setBackgroundColor("#fff",canvas.renderAll.bind(canvas));logAction("Reset image canvas","");toast("Canvas reset")});
$("downloadImage").addEventListener("click",()=>{if(!canvas)return;const a=document.createElement("a");a.href=canvas.toDataURL({format:"png",multiplier:1});a.download="fontsetu-edited-image.png";a.click();logAction("Download edited image","PNG export")});
function renderAffiliates(){const list=$("affiliateList");list.innerHTML="";if(!affiliates.length){list.textContent="No affiliate links added yet.";list.className="affiliate-list muted";return}list.className="affiliate-list";affiliates.forEach((item,i)=>{const row=document.createElement("div");row.className="affiliate-item";const wrap=document.createElement("div"),a=document.createElement("a");a.href=item.url;a.target="_blank";a.rel="noopener sponsored";a.textContent=item.name;const small=document.createElement("small");small.textContent=item.url;wrap.append(a,small);const del=document.createElement("button");del.className="btn small";del.textContent="Remove";del.onclick=()=>{affiliates.splice(i,1);put(STORE.affiliates,affiliates);renderAffiliates();logAction("Remove affiliate link",item.name)};row.append(wrap,del);list.append(row)})}
$("addAffiliate").addEventListener("click",()=>{const name=$("affiliateName").value.trim(),url=$("affiliateUrl").value.trim();try{const u=new URL(url);if(!["http:","https:"].includes(u.protocol))throw Error()}catch{return toast("Enter a valid http(s) affiliate URL")}if(!name)return toast("Enter a display name");affiliates.push({name,url,created:new Date().toISOString()});put(STORE.affiliates,affiliates);$("affiliateName").value="";$("affiliateUrl").value="";renderAffiliates();logAction("Add affiliate link",name);toast("Affiliate link saved locally")});renderAffiliates();
$("savePublisher").addEventListener("click",()=>{settings.publisherId=$("publisherId").value.trim();put(STORE.settings,settings);logAction("Save AdSense note","Publisher ID stored locally only");toast("Saved locally; this does not activate ads")});
$("saveSiteName").addEventListener("click",()=>{const name=$("siteNameInput").value.trim()||"FontSetu Next";settings.siteName=name;put(STORE.settings,settings);applySiteName();logAction("Update site name",name);toast("Site name updated")});
function applySiteName(){const name=settings.siteName||"FontSetu";document.querySelectorAll(".brand>span:nth-child(2)").forEach(el=>{el.innerHTML="";const b=document.createElement("span");b.textContent=name;const sm=document.createElement("small");sm.textContent="NEXT · WORKSPACE";el.append(b,sm)});$("footerBrand").textContent=name;$("siteNameInput").value=name;if(settings.publisherId)$("publisherId").value=settings.publisherId}applySiteName();
$("exportHistory").addEventListener("click",()=>{download(new Blob([JSON.stringify({exportedAt:new Date().toISOString(),history,visits:get(STORE.visits,0),impressions:get(STORE.impressions,0),affiliates,settings},null,2)],{type:"application/json"}),"fontsetu-history-backup.json");logAction("Export history","JSON")});
$("backupData").addEventListener("click",()=>{download(new Blob([JSON.stringify({exportedAt:new Date().toISOString(),history,visits:get(STORE.visits,0),impressions:get(STORE.impressions,0),affiliates,settings},null,2)],{type:"application/json"}),"fontsetu-local-backup.json");logAction("Download data backup","JSON")});
$("clearHistory").addEventListener("click",()=>{if(!confirm("Clear all recorded actions?"))return;history=[];put(STORE.history,history);renderHistory();renderStats();toast("History cleared")});
$("resetData").addEventListener("click",()=>{if(!confirm("Reset local history, counters, affiliate links and settings? This cannot be undone."))return;Object.values(STORE).forEach(k=>localStorage.removeItem(k));history=[];affiliates=[];settings={};put(STORE.visits,1);put(STORE.impressions,0);renderAffiliates();applySiteName();renderHistory();renderStats();toast("Local data reset")});
