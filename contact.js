const form=document.querySelector('#contact');
const button=form.querySelector('button');
const status=document.querySelector('#status');
let widget=null,token='',stickyNotice=false;
function available(){button.disabled=!token;}
form.addEventListener('input',()=>{if(stickyNotice){stickyNotice=false;status.textContent='';}});
async function setup(){
  try {
    const response=await fetch('https://api.createwithprince.com/api/public-config');
    if(!response.ok) throw new Error();
    const {turnstileSiteKey}=await response.json();
    if(!turnstileSiteKey) throw new Error();
    // The external verification script may load after this file.
    for(let tries=0;!window.turnstile&&tries<50;tries++) await new Promise(resolve=>setTimeout(resolve,100));
    if(!window.turnstile) throw new Error();
    status.textContent='Please complete the verification to send your message.';
    widget=window.turnstile.render('#verification',{sitekey:turnstileSiteKey,callback(value){token=value;if(!stickyNotice)status.textContent='';available()},'expired-callback'(){token='';status.textContent='Please verify again.';available()},'error-callback'(){token='';status.textContent='Verification is temporarily unavailable.';available()}});
  }catch {status.textContent='The contact form is temporarily unavailable. Please try again later.';}
}
form.addEventListener('submit',async event=>{
  event.preventDefault();if(!form.reportValidity()||!token)return;
  button.disabled=true;status.textContent='Sending your message…';
  try {
    const values=new FormData(form);
    const response=await fetch('https://api.createwithprince.com/api/contact',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name:values.get('name'),email:values.get('email'),message:values.get('message'),website:values.get('website'),token})});
    const result=await response.json();if(!response.ok)throw new Error(result.error||'Your message could not be sent. Please try again.');
    form.reset();token='';stickyNotice=true;status.textContent='Thank you. Your message has been sent.';if(widget!==null)window.turnstile.reset(widget);
  }catch(error){token='';stickyNotice=true;status.textContent=error.message||'Your message could not be sent. Please try again.';if(widget!==null)window.turnstile.reset(widget);}
  available();
});
setup();
