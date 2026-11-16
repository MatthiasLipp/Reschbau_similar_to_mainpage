const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
// Alle Inline-Skripte auf Syntax prüfen, ohne sie auszuführen.
for(const m of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))new vm.Script(m[1]);
const track=html.slice(html.indexOf('  function trackMeta('),html.indexOf('</script>',html.indexOf('  function trackMeta(')));
const helper=html.slice(html.indexOf('  const trackingEntry'),html.indexOf('  function baueGHLPayload'));
const send=html.slice(html.indexOf('  async function sendeAnGHL('),html.indexOf('\n\n  const START_Q'));
const submit=html.slice(html.indexOf("  let submissionState='idle'"),html.indexOf('\n\n  renderBody();',html.indexOf("  let submissionState='idle'")));
(async()=>{
for(const scenario of ['success','denied','http500','network','double','pixel_throws']){
 let events=[],posts=0,windows=[],nodes={nextBtn:{disabled:false,parentNode:{appendChild:n=>nodes[n.id]=n}}};
 const ctx={URLSearchParams,answers:{Vorhaben:'Sanierung'},kontakt:{name:'LOCAL TEST',consent:true},QUESTIONS:[],WA_TEXT_SANIERUNG:'Test',WA_TEXT_NEUBAU:'Test',WA_NUMBER:'000',GHL_WEBHOOK_URL:'https://local.invalid',GHL_HEADERS:{},generiereRefKey:()=> 'RB-TESTAA',baueGHLPayload:k=>({ref_key:k}),encodeURIComponent,localStorage:{getItem:()=>scenario==='denied'?'denied':'granted'},document:{cookie:'_fbp=fb.1.1794850000000.123456; _fbc=fb.1.1794850000000.TESTCLICK',getElementById:id=>nodes[id],createElement:()=>({setAttribute(){},appendChild(){}})},window:{location:{search:'?utm_campaign=resch_sanierung&fbclid=PRIVATE&email=PRIVATE',pathname:'/'},open:()=>{let w={location:{},close(){this.closed=true}};windows.push(w);return w}},fetch:async()=>{posts++;if(scenario==='network')throw Error('simulated');return {ok:scenario!=='http500',status:scenario==='http500'?500:200}},fbq:(...a)=>{if(scenario==='pixel_throws')throw Error('blocked');events.push(a)}};
 ctx.window.fbq=ctx.fbq;
 vm.createContext(ctx);vm.runInContext(track+helper+send+submit,ctx);
 await vm.runInContext(scenario==='double'?'Promise.all([submit(),submit()])':'submit()',ctx);
 const failure=['http500','network'].includes(scenario);
 assert.equal(posts,1);assert.equal(events.length,failure||scenario==='denied'||scenario==='pixel_throws'?0:1);
 assert.equal(windows.filter(w=>w.location.href).length,failure?0:1);
 assert.equal(nodes.nextBtn.disabled,true);
 if(events.length)assert.equal(events[0][3].eventID,'RB-TESTAA');
 const payload=vm.runInContext("trackingPayload('RB-TESTAA')",ctx);
 assert.equal(payload.utm_campaign,'resch_sanierung');assert.equal(payload.fbclid,scenario==='denied'?undefined:'PRIVATE');assert.equal(payload.fbp,scenario==='denied'?undefined:'fb.1.1794850000000.123456');assert.equal(payload.fbc,scenario==='denied'?undefined:'fb.1.1794850000000.TESTCLICK');assert.equal(payload.email,undefined);assert.equal(payload.tracking_consent,scenario!=='denied');
 if(failure){assert.match(nodes.submissionStatus.textContent,/nicht bestätigt/);assert.equal(windows[0].closed,true);await vm.runInContext('submit()',ctx);assert.equal(posts,1);}
 console.log('PASS '+scenario);
}
})();
