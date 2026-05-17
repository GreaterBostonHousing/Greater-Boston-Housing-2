import { useState, useEffect, useCallback } from "react";

const useWidth = () => {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    let t;
    const fn = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const nw = window.innerWidth;
        setW(p => Math.abs(p - nw) > 100 ? nw : p);
      }, 500);
    };
    window.addEventListener("resize", fn);
    return () => { window.removeEventListener("resize", fn); clearTimeout(t); };
  }, []);
  return w;
};

const DAILY_RATE = 1400 / 30.4375;

function calcPrice(ci, co) {
  if (!ci || !co) return null;
  const d1 = new Date(ci + "T00:00:00"), d2 = new Date(co + "T00:00:00");
  if (d2 <= d1) return null;
  const days = Math.round((d2 - d1) / 86400000);
  const months = Math.floor(days / 30.4375);
  const remDays = Math.round(days - months * 30.4375);
  const total = Math.round(days * DAILY_RATE);
  return { days, months, remDays, total };
}

const C = {
  bg:"#12100d", surface:"#1c1712", surface2:"#26201a", border:"#3a2e22",
  accent:"#C8944A", accentDim:"#a07535", text:"#F0E6D0", muted:"#A89070",
  dim:"#6B5840", green:"#6B9A52", greenBg:"#0e180a", greenBorder:"#253d14",
};

const rooms = [
  { id:1, name:"Room 1", bed:"Queen Bed", accent:"#C8944A",
    features:["Queen Bed","Wall-mounted Roku TV","USB Charging Hub","Standard Closet","Private Smart Lock","Hardwood Floors"],
    description:"Bright queen room with light blue walls, wall-mounted Roku TV, bedside USB charging hub, and a private smart lock.",
    images:[
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778982432/IMG_2830_kbp2mw.jpg",label:"Room 1 – Main View"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778982432/IMG_2826_kymchh.jpg",label:"Room 1 – Bed & Window"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778982430/IMG_2913_siqpqj.jpg",label:"Room 1 – TV & Door"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778982424/IMG_2866_d1ogof.jpg",label:"Room 1 – USB Hub"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778982423/IMG_2827_losbfk.jpg",label:"Room 1 – Closet"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778982419/IMG_2829_ffuzgd.jpg",label:"Room 1 – Window View"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778982362/IMG_2911_ekhol6.jpg",label:"Room 1 – Full View"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778982362/IMG_2910_d8aq6z.jpg",label:"Room 1 – Detail View"}
    ],
  },
  { id:2, name:"Room 2", bed:"Queen Bed", accent:"#B8843A",
    features:["Queen Bed","Platform Bed Frame","Wall-mounted Smart TV","USB Charging Hub","Faux Fur Rug","Smart Lock"],
    description:"Stylish queen room with dark wood platform frame, cozy faux fur rug, wall-mounted smart TV, and curtained closet.",
    images:[
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778983522/IMG_2916_ue2rxy.jpg",label:"Room 2 – Wide View"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778983520/IMG_2915_axa7xu.jpg",label:"Room 2 – Bed Side"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778983520/IMG_2919_yvxuea.jpg",label:"Room 2 – Closet & Shelf"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778983516/IMG_2917_gknffa.jpg",label:"Room 2 – Bed Close-up"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778983512/IMG_2858_fimwqp.jpg",label:"Room 2 – TV View"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778983510/IMG_2838_cmn0ht.jpg",label:"Room 2 – Corner View"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778983507/IMG_2831_tlqhfr.jpg",label:"Room 2 – Full Room"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778983505/IMG_2833_qn02xz.jpg",label:"Room 2 – Detail View"}
    ],
  },
  { id:3, name:"Room 3", bed:"Queen Bed", accent:"#A87830",
    features:["Queen Bed","Large Dresser","Flat Screen TV","Curtained Closet","Double Windows","Smart Lock"],
    description:"Spacious queen room with two large windows, excellent natural light, full dresser with flat screen TV, and wide curtained closet.",
    images:[
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778983884/IMG_2843_zhtlvt.jpg",label:"Room 3 – Main View"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778983885/IMG_2845_ng6cyl.jpg",label:"Room 3 – Bed & Windows"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778983886/IMG_2846_ujfw9t.jpg",label:"Room 3 – Closet Open"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778983891/IMG_2923_fgmiey.jpg",label:"Room 3 – Full Room"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778983888/IMG_2920_pkwxh9.jpg",label:"Room 3 – Window Light"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778983894/IMG_2925_tjvfdq.jpg",label:"Room 3 – Dresser & TV"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778983895/IMG_2924_bzfg0r.jpg",label:"Room 3 – Corner View"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778983886/IMG_2858_evoonp.jpg",label:"Room 3 – Detail View"}
    ],
  },
  { id:4, name:"Room 4", bed:"Full Bed", accent:"#C8944A",
    features:["Full Bed","Work Desk & Gaming Chair","Flat Screen TV","Bookshelf","USB Charging Hub","Smart Lock"],
    description:"Perfect for remote workers! Dedicated desk with gaming chair, flat screen TV, bookshelf, and USB hub.",
    images:[
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778984164/IMG_2794_jzojjr.jpg",label:"Room 4 – Main (Night)"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778984167/IMG_2792_vpgqze.jpg",label:"Room 4 – Bed (Night)"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778984159/IMG_2790_poajxo.jpg",label:"Room 4 – Desk & Chair"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778984160/IMG_2791_m4cuuw.jpg",label:"Room 4 – TV & Bookshelf"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778984162/IMG_2793_uyhvag.jpg",label:"Room 4 – Workspace"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778984168/IMG_2860_nnnhe7.jpg",label:"Room 4 – Full View"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778984168/IMG_2865_sh1mxu.jpg",label:"Room 4 – Corner View"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778983886/IMG_2858_evoonp.jpg",label:"Room 4 – Detail View"}
    ],
  },
  { id:5, name:"Room 5", bed:"2 Twin Beds", accent:"#B8843A",
    features:["2 Twin Beds","Large Flat Screen TV","White Dresser","Sliding Mirror Closet","USB Charging Hub","Smart Lock"],
    description:"Ideal for travel companions! Two twin beds, large TV on white dresser, sliding mirror closet, and shared USB hub.",
    images:[
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778984331/IMG_2851_tataof.jpg",label:"Room 5 – Twin Layout"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778984335/IMG_2853_pmdjpu.jpg",label:"Room 5 – TV & Dresser"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778984347/IMG_2855_fwlbel.jpg",label:"Room 5 – TV & Closet"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778984335/IMG_2852_ehlegf.jpg",label:"Room 5 – Smart Lock Door"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778984345/IMG_2857_xbdefp.jpg",label:"Room 5 – Bed Detail"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778984343/IMG_2854_oh0gbw.jpg",label:"Room 5 – Full View"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778984346/IMG_2856_zrczpv.jpg",label:"Room 5 – Corner View"},
      {url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778984340/IMG_2858_atablc.jpg",label:"Room 5 – Detail View"}
    ],
  },
];

const spaces = [
  {name:"Kitchen",icon:"🍳",highlights:["Stainless steel fridge w/ ice & water","In-unit stacked washer/dryer","Dining table for 6 guests","Coffee machine included","Dark countertops & cabinetry"],images:[{url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778984547/IMG_2848_tsccqv.jpg",label:"Kitchen – Main View"},{url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778984543/IMG_2789_mdidgg.jpg",label:"Kitchen – Appliances"}]},
  {name:"Living Room",icon:"🛋️",highlights:["Large flat screen TV","Leather recliner sofa set","Glass coffee table","Faux fur area rug","Framed artwork & arched doorway"],images:[{url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778984547/IMG_2840_frnqbw.jpg",label:"Living Room – Sofa Set"},{url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778984548/IMG_2842_hj1mpy.jpg",label:"Living Room – TV & Lounge"}]},
  {name:"Bathroom",icon:"🚿",highlights:["Modern LED ring ceiling light","Walk-in shower with curtain","Vanity with mirror cabinet","Clean tile floors","Bath mat included"],images:[{url:"https://res.cloudinary.com/dwtoz0ygv/image/upload/v1778984548/IMG_3243_cjxiht.jpg",label:"Bathroom – Full View"}]},
];

const amenities = [
  {icon:"📶",label:"High-Speed WiFi"},{icon:"💡",label:"All Utilities Included"},
  {icon:"🚗",label:"Free Parking"},{icon:"🫧",label:"In-Unit Washer/Dryer"},
  {icon:"☕",label:"Coffee Machine"},{icon:"👔",label:"Ironing Board"},
  {icon:"🔐",label:"Private Smart Lock"},{icon:"📺",label:"Smart TV in Every Room"},
  {icon:"⚡",label:"USB Charging Hubs"},{icon:"🛋️",label:"Shared Living Room"},
  {icon:"🍳",label:"Full Shared Kitchen"},{icon:"🚿",label:"Shared Bathroom"},
];

const nearbyPlaces = [
  {icon:"🏙️",name:"Downtown Boston",detail:"6 miles · ~7 min drive · 14 min by subway"},
  {icon:"✈️",name:"Logan International Airport",detail:"7 miles · ~20 min drive"},
  {icon:"🎓",name:"Tufts University",detail:"1.5 miles · walkable · Green Line on campus"},
  {icon:"🏥",name:"Mass General Hospital",detail:"~6 miles · 15 min via I-93 or Green Line"},
  {icon:"🏥",name:"Beth Israel Deaconess",detail:"~7 miles · 20 min drive or transit"},
  {icon:"🏥",name:"Tufts Medical Center",detail:"~6 miles · Green Line direct"},
  {icon:"🛍️",name:"Assembly Row",detail:"1.5 miles · shops, dining & entertainment"},
  {icon:"🎓",name:"Harvard University",detail:"~5 miles · Bus 96 to Harvard Sq."},
  {icon:"🎓",name:"MIT",detail:"~5 miles · Green Line to Red Line"},
  {icon:"🌊",name:"Mystic Lakes & Trails",detail:"Minutes away · parks & nature"},
  {icon:"🏙️",name:"Somerville / Davis Sq.",detail:"2 miles · restaurants & nightlife"},
  {icon:"🏥",name:"Lahey Hospital Burlington",detail:"~12 miles · 20 min via I-93 North"},
];

const transitItems = [
  {type:"🚇 Green Line (GLX)",lines:["Medford/Tufts Station — light rail direct to Cambridge & Boston","Ball Square Station — frequent service, short headways","One-seat ride to Government Center, Park Street, downtown"]},
  {type:"🚉 Commuter Rail (Lowell Line)",lines:["West Medford Station — direct trains into North Station Boston","Easily accessible within 10–15 min drive or bus","Great for North End, TD Garden, Back Bay"]},
  {type:"🚌 MBTA Bus Routes",lines:["Route 94 — Medford Square to Davis Square (Red Line)","Route 95 — West Medford to Sullivan Square (Orange Line)","Route 96 — Medford Square to Harvard Square (Red Line)"]},
  {type:"🟠 Orange Line",lines:["Wellington Station (~10 min) — into downtown Boston","Direct access to Back Bay, Downtown Crossing & Ruggles"]},
];

const highways = [
  {route:"I-93",desc:"Direct access to downtown Boston southbound and New Hampshire northbound. Exit 23 puts you in Medford Square in minutes."},
  {route:"Route 16",desc:"East-west connector to Cambridge, Everett, and Revere. Great for Logan Airport without highway congestion."},
  {route:"Route 28",desc:"Connects Medford to Somerville, Malden, and Stoneham for quick access to northern suburbs."},
  {route:"Route 38",desc:"Runs through Medford connecting to Woburn and Lowell northbound, and Somerville southbound."},
  {route:"I-95 / Route 128",desc:"Boston's major ring road reachable in 20–25 min, connecting to Rhode Island, Maine, and all of New England."},
];

function ImgSlot({url,label,height,radius="8px"}) {
  const [err,setErr] = useState(false);
  if(url&&!err) return <img src={url} alt={label} onError={()=>setErr(true)} style={{width:"100%",height,objectFit:"cover",borderRadius:radius,display:"block"}}/>;
  return(
    <div style={{width:"100%",height,borderRadius:radius,background:"#1a1410",border:`2px dashed ${C.border}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"8px"}}>
      <span style={{fontSize:"20px"}}>📷</span>
      <span style={{fontSize:"10px",fontWeight:"700",color:C.muted,textAlign:"center",padding:"0 6px",lineHeight:"1.3"}}>{label}</span>
    </div>
  );
}

function Gallery({images,mainH=200}) {
  const [active,setActive] = useState(0);
  const n = images.length;
  const th = n>8?30:n>5?34:40;
  return(
    <div>
      <ImgSlot url={images[active]?.url} label={images[active]?.label} height={mainH} radius="12px 12px 0 0"/>
      {n>1&&(
        <div style={{display:"flex",flexWrap:n>8?"wrap":"nowrap",gap:"2px",padding:"2px",background:"#080604",borderRadius:"0 0 12px 12px"}}>
          {images.map((img,i)=>(
            <div key={i} onClick={()=>setActive(i)} style={{flex:n>8?"0 0 calc(12.5% - 2px)":"1",cursor:"pointer",borderRadius:"4px",overflow:"hidden",border:`2px solid ${i===active?C.accent:"transparent"}`}}>
              <ImgSlot url={img.url} label={img.label} height={th} radius="2px"/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RoomCard({room,onBook,isMobile}) {
  const [hov,setHov] = useState(false);
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:C.surface,borderRadius:"16px",overflow:"hidden",border:`1px solid ${hov?room.accent+"55":C.border}`,boxShadow:hov?`0 12px 40px rgba(0,0,0,0.5),0 0 0 1px ${room.accent}33`:undefined,transition:"all 0.3s ease"}}>
      <Gallery images={room.images} mainH={200}/>
      <div style={{background:`linear-gradient(90deg,${room.accent}20,transparent)`,borderBottom:`1px solid ${room.accent}30`,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{fontSize:"10px",letterSpacing:"2px",color:room.accent,fontWeight:"700",textTransform:"uppercase"}}>🛏️ {room.bed}</div>
          <div style={{fontSize:"19px",fontWeight:"800",color:C.text,fontFamily:"'Playfair Display',serif"}}>{room.name}</div>
        </div>
        <div style={{background:`${room.accent}18`,border:`1px solid ${room.accent}40`,borderRadius:"7px",padding:"3px 9px",fontSize:"10px",fontWeight:"800",color:room.accent}}>🔐 SMART LOCK</div>
      </div>
      <div style={{padding:"14px 16px 18px",flex:1,display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px",flexWrap:"wrap"}}>
          <span style={{fontSize:"26px",fontWeight:"800",color:C.text}}>$1,400<span style={{fontSize:"12px",fontWeight:"500",color:C.muted}}>/mo</span></span>
          <span style={{fontSize:"12px",color:C.dim,textDecoration:"line-through"}}>$1,500</span>
          <span style={{background:C.greenBg,color:C.green,borderRadius:"6px",padding:"2px 8px",fontSize:"10px",fontWeight:"800",border:`1px solid ${C.greenBorder}`}}>SAVE $100</span>
        </div>
        <p style={{fontSize:"13px",color:C.muted,lineHeight:"1.65",margin:"0 0 12px",flex:1}}>{room.description}</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:"5px",marginBottom:"14px"}}>
          {room.features.slice(0,3).map((f,i)=>(<span key={i} style={{background:`${room.accent}12`,color:room.accent,borderRadius:"6px",padding:"3px 8px",fontSize:"10px",fontWeight:"700",border:`1px solid ${room.accent}30`}}>{f}</span>))}
          <span style={{background:C.surface2,color:C.muted,borderRadius:"6px",padding:"3px 8px",fontSize:"10px",fontWeight:"700",border:`1px solid ${C.border}`}}>+{room.features.length-3} more</span>
        </div>
        <button onClick={()=>onBook(room)} style={{background:`linear-gradient(135deg,${room.accent},${C.accentDim})`,color:"#0d0a06",border:"none",borderRadius:"10px",padding:"13px",fontSize:"14px",fontWeight:"700",cursor:"pointer",transition:"all 0.2s"}}>
          Book This Room →
        </button>
      </div>
    </div>
  );
}

function SpaceCard({space}) {
  return(
    <div style={{background:C.surface,borderRadius:"16px",overflow:"hidden",border:`1px solid ${C.border}`}}>
      <Gallery images={space.images} mainH={160}/>
      <div style={{background:`linear-gradient(90deg,${C.accent}18,transparent)`,borderBottom:`1px solid ${C.border}`,padding:"10px 16px",display:"flex",alignItems:"center",gap:"8px"}}>
        <span style={{fontSize:"20px"}}>{space.icon}</span>
        <h3 style={{color:C.text,fontFamily:"'Playfair Display',serif",fontSize:"17px",fontWeight:"700",margin:0}}>{space.name}</h3>
      </div>
      <div style={{padding:"14px 16px"}}>
        {space.highlights.map((h,i)=>(<div key={i} style={{display:"flex",gap:"7px",marginBottom:"6px",fontSize:"12px",color:C.muted,lineHeight:"1.4"}}><span style={{color:C.accent,fontWeight:"800"}}>✓</span><span>{h}</span></div>))}
      </div>
    </div>
  );
}

function PriceBreakdown({ci,co}) {
  const p = calcPrice(ci,co);
  if(!p) return null;
  const fmt = d => new Date(d+"T00:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
  const durStr = [p.months>0?`${p.months} month${p.months>1?"s":""}`:null, p.remDays>0?`${p.remDays} day${p.remDays>1?"s":""}`:null].filter(Boolean).join(" + ")||`${p.days} days`;
  return(
    <div style={{background:`${C.accent}10`,border:`1px solid ${C.accent}35`,borderRadius:"12px",padding:"14px 16px",marginBottom:"4px"}}>
      <div style={{fontSize:"11px",fontWeight:"800",color:C.accent,marginBottom:"10px",letterSpacing:"1px",textTransform:"uppercase"}}>📅 Stay Estimate</div>
      {[[`Check-in`,fmt(ci)],[`Check-out`,fmt(co)],[`Duration`,`${durStr} (${p.days} days total)`],[`Rate`,`$1,400/mo`]].map(([k,v])=>(
        <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:"13px",color:C.muted,marginBottom:"5px"}}><span>{k}</span><strong style={{color:C.text}}>{v}</strong></div>
      ))}
      <div style={{borderTop:`1px solid ${C.accent}30`,paddingTop:"8px",marginTop:"4px",display:"flex",justifyContent:"space-between",fontWeight:"800",fontSize:"20px",color:C.text}}>
        <span>Total</span><span style={{color:C.accent}}>${p.total.toLocaleString()}</span>
      </div>
    </div>
  );
}

function SmsPreview({name,moveIn}) {
  const dateStr = moveIn?new Date(moveIn+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}):"your check-in day";
  const msg = `🏠 Greater Boston Housing\n\nGood morning, ${name||"Tenant"}!\nToday is your check-in day.\n\n🔐 Your private door code:\n[ Sent separately for security ]\n\n🕙 Check-in: 3:00 PM\nCheck-out: 11:00 AM\n\n📍 Address & WiFi details included above.`;
  return(
    <div style={{background:"#080604",borderRadius:"14px",padding:"14px",border:`1px solid ${C.border}`,marginTop:"14px"}}>
      <div style={{fontSize:"11px",color:C.dim,marginBottom:"10px",display:"flex",alignItems:"center",gap:"6px"}}>
        <span>📱</span><span>Auto-sent on <strong style={{color:C.accent}}>{dateStr} at 8:00 AM</strong></span>
      </div>
      <div style={{background:"#111",borderRadius:"12px",padding:"12px",maxWidth:"280px",margin:"0 auto"}}>
        <div style={{fontSize:"10px",color:C.dim,marginBottom:"8px",textAlign:"center"}}>Greater Boston Housing · Text Message</div>
        <div style={{background:"#2563eb",borderRadius:"14px 14px 3px 14px",padding:"10px 13px",fontSize:"12px",color:"white",lineHeight:"1.65",whiteSpace:"pre-line"}}>{msg}</div>
        <div style={{fontSize:"10px",color:C.dim,marginTop:"5px",textAlign:"right"}}>Delivered ✓✓</div>
      </div>
    </div>
  );
}

function BookingModal({room,onClose,isMobile}) {
  const [step,setStep] = useState(1);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [checkIn,setCheckIn] = useState("");
  const [checkOut,setCheckOut] = useState("");
  const [agreed,setAgreed] = useState(false);
  const [showSms,setShowSms] = useState(false);
  const [loading,setLoading] = useState(false);
  
  if(!room) return null;
  const price = calcPrice(checkIn,checkOut);
  const canGo = name&&email&&phone&&checkIn&&checkOut&&price;
  const today = new Date().toISOString().split("T")[0];
  const iS = {width:"100%",padding:"12px 13px",background:C.surface2,border:`1.5px solid ${C.border}`,borderRadius:"10px",fontSize:"16px",color:C.text,boxSizing:"border-box",fontFamily:"inherit"};
  const lS = {display:"block",fontSize:"11px",fontWeight:"700",color:C.muted,marginBottom:"4px",textTransform:"uppercase",letterSpacing:"0.5px"};

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: price.total * 100,
          email,
          name,
          room: room.name,
          checkIn,
          checkOut,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setStep(3);
      } else {
        alert("Payment failed: " + data.error);
      }
    } catch (err) {
      alert("Error processing payment: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:isMobile?"flex-end":"center",justifyContent:"center",zIndex:1000,padding:isMobile?0:"20px"}}>
      <div style={{background:C.surface,borderRadius:isMobile?"24px 24px 0 0":"20px",width:"100%",maxWidth:isMobile?"100%":"500px",maxHeight:isMobile?"93vh":"90vh",overflowY:"auto",border:`1px solid ${C.border}`}}>
        <div style={{background:"linear-gradient(135deg,#1a1208,#261a0c)",padding:"18px 20px",borderRadius:isMobile?"24px 24px 0 0":"20px 20px 0 0",display:"flex",justifyContent:"space-between",alignItems:"flex-start",stickyTop:0}}>
          <div>
            <div style={{color:C.accent,fontSize:"11px",letterSpacing:"1.5px",textTransform:"uppercase",fontWeight:"700"}}>{step===1?"Step 1 — Your Info":step===2?"Step 2 — Lease":"✅ Confirm & Pay"}</div>
            <div style={{color:C.text,fontWeight:"800",fontSize:"16px",fontFamily:"'Playfair Display',serif",marginTop:"2px"}}>{room.name} · {room.bed}</div>
          </div>
          <button onClick={onClose} style={{background:C.surface2,border:`1px solid ${C.border}`,color:C.muted,borderRadius:"50%",width:"34px",height:"34px",cursor:"pointer",fontSize:"18px",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>

        <div style={{padding:isMobile?"18px 16px 40px":"20px 22px 28px"}}>
          {step===1&&(
            <>
              <div style={{background:`${C.accent}0e`,border:`1px solid ${C.accent}30`,borderRadius:"10px",padding:"11px 13px",marginBottom:"16px",display:"flex",gap:"10px",alignItems:"flex-start"}}>
                <span style={{fontSize:"18px",flexShrink:0}}>📱</span>
                <div>
                  <div style={{fontSize:"12px",fontWeight:"800",color:C.accent,marginBottom:"2px"}}>AUTO CHECK-IN TEXT</div>
                  <div style={{fontSize:"12px",color:C.muted,lineHeight:"1.5"}}>On the morning of your check-in at 8:00 AM, you'll automatically receive your door code and entry instructions by text.</div>
                </div>
              </div>

              <div style={{marginBottom:"12px"}}><label style={lS}>Full Name</label><input type="text" placeholder="Jane Smith" value={name} onChange={e=>setName(e.target.value)} style={iS}/></div>
              <div style={{marginBottom:"12px"}}><label style={lS}>Email Address</label><input type="email" placeholder="jane@email.com" value={email} onChange={e=>setEmail(e.target.value)} style={iS}/></div>
              <div style={{marginBottom:"14px"}}><label style={lS}>Phone Number (for check-in SMS)</label><input type="tel" placeholder="(617) 555-0000" value={phone} onChange={e=>setPhone(e.target.value)} style={iS}/></div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"12px"}}>
                <div><label style={lS}>Check-in Date</label><input type="date" value={checkIn} min={today} onChange={e=>setCheckIn(e.target.value)} style={iS}/></div>
                <div><label style={lS}>Check-out Date</label><input type="date" value={checkOut} min={checkIn||today} onChange={e=>setCheckOut(e.target.value)} style={iS}/></div>
              </div>

              <PriceBreakdown ci={checkIn} co={checkOut}/>
              {checkIn&&checkOut&&!price&&(<div style={{fontSize:"12px",color:"#e05050",padding:"6px 10px",background:"#2a1010",borderRadius:"8px",border:"1px solid #4a2020",marginBottom:"12px"}}>Check-out must be after check-in</div>)}

              {name&&checkIn&&(
                <div style={{margin:"12px 0"}}>
                  <button onClick={()=>setShowSms(s=>!s)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,borderRadius:"8px",padding:"7px 12px",fontSize:"12px",fontWeight:"600",cursor:"pointer"}}>
                    {showSms?"▲ Hide":"▼ Preview"} your check-in text
                  </button>
                  {showSms&&<SmsPreview name={name} moveIn={checkIn}/>}
                </div>
              )}

              <button onClick={()=>canGo&&setStep(2)} style={{width:"100%",background:canGo?`linear-gradient(135deg,${C.accent},${C.accentDim})`:C.surface2,color:canGo?"#0d0a06":C.dim,border:"none",borderRadius:"10px",padding:"13px",fontSize:"14px",fontWeight:"700",cursor:canGo?"pointer":"not-allowed",marginTop:"8px"}}>
                Continue to Lease Agreement →
              </button>
            </>
          )}

          {step===2&&(
            <>
              {price&&(
                <div style={{background:C.greenBg,border:`1px solid ${C.greenBorder}`,borderRadius:"12px",padding:"12px 15px",marginBottom:"16px"}}>
                  <div style={{fontSize:"11px",fontWeight:"800",color:C.green,marginBottom:"6px"}}>STAY SUMMARY</div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:"13px",color:C.muted,marginBottom:"4px"}}><span>Duration</span><span>{price.days} days</span></div>
                  <div style={{display:"flex",justifyContent:"space-between",fontWeight:"800",fontSize:"18px",color:C.text,borderTop:`1px solid ${C.greenBorder}`,paddingTop:"6px",marginTop:"4px"}}><span>Total</span><span>${price.total.toLocaleString()}</span></div>
                </div>
              )}
              <div style={{background:C.surface2,border:`1px solid ${C.border}`,borderRadius:"12px",padding:"16px",maxHeight:"240px",overflowY:"auto",fontSize:"13px",lineHeight:"1.8",color:C.muted}}>
                <h4 style={{margin:"0 0 10px",color:C.text,fontSize:"13px"}}>GREATER BOSTON HOUSING — RENTAL AGREEMENT</h4>
                <p><strong style={{color:C.text}}>Tenant:</strong> {name}</p>
                <p><strong style={{color:C.text}}>Property:</strong> Medford, MA — {room.name} ({room.bed})</p>
                <p><strong style={{color:C.text}}>Check-in:</strong> {checkIn} &nbsp;|&nbsp; <strong style={{color:C.text}}>Check-out:</strong> {checkOut}</p>
                {price&&<p><strong style={{color:C.text}}>Estimated Total:</strong> ${price.total.toLocaleString()} ({price.days} days at $1,400/mo rate)</p>}
                <p><strong style={{color:C.text}}>1. USE:</strong> Residential only. Common areas shared.</p>
                <p><strong style={{color:C.text}}>2. RENT:</strong> $1,400/month. $50 late fee after the 5th.</p>
                <p><strong style={{color:C.text}}>3. RULES:</strong> No smoking. No pets without approval. Quiet hours 10pm–8am. Tenants are responsible for washing their own dishes and keeping common areas clean.</p>
                <p><strong style={{color:C.text}}>4. UTILITIES:</strong> Electric, heat, water, and WiFi included.</p>
                <p><strong style={{color:C.text}}>5. DEPOSIT:</strong> {price&&price.months>=6?"$1,400 security deposit required (stay over 6 months).":"$700 security deposit required (stay 6 months or less)."}</p>
                <p><strong style={{color:C.text}}>6. SMART LOCK:</strong> Private code provided. Must not be shared.</p>
                <p><strong style={{color:C.text}}>7. CHECK-IN SMS:</strong> Entry instructions, door code, and WiFi password sent at 8 AM on check-in date. Check-in: 3:00 PM. Check-out: 11:00 AM.</p>
                <p><strong style={{color:C.text}}>8. TERMINATION:</strong> 30 days written notice from either party.</p>
                <p><strong style={{color:C.text}}>9. ACCESS:</strong> Landlord may enter with 24-hour notice.</p>
                <p style={{color:C.dim,fontSize:"12px",marginTop:"8px"}}>By checking below you agree to all terms above.</p>
              </div>
              <label style={{display:"flex",gap:"12px",cursor:"pointer",marginBottom:"16px",alignItems:"flex-start"}}>
                <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} style={{marginTop:"3px",width:"18px",height:"18px",flexShrink:0,accentColor:C.accent}}/>
                <span style={{fontSize:"13px",color:C.muted,lineHeight:"1.5"}}>I, <strong style={{color:C.text}}>{name}</strong>, agree to the Greater Boston Housing lease terms above.</span>
              </label>
              <div style={{display:"flex",gap:"10px"}}>
                <button onClick={()=>setStep(1)} style={{flex:"0 0 72px",background:C.surface2,border:`1px solid ${C.border}`,borderRadius:"12px",padding:"13px",fontSize:"13px",fontWeight:"600",color:C.muted,cursor:"pointer"}}>← Back</button>
                <button onClick={()=>agreed&&handlePayment()} disabled={!agreed||loading} style={{flex:1,background:agreed?`linear-gradient(135deg,${C.accent},${C.accentDim})`:C.surface2,color:agreed?"#0d0a06":C.dim,border:"none",borderRadius:"12px",padding:"13px",fontSize:"14px",fontWeight:"700",cursor:agreed?"pointer":"not-allowed"}}>
                  {loading?"Processing...":"Continue to Payment →"}
                </button>
              </div>
            </>
          )}

          {step===3&&(
            <div style={{textAlign:"center",padding:"10px 0"}}>
              <div style={{fontSize:"52px",marginBottom:"12px"}}>🎉</div>
              <h3 style={{fontSize:"22px",fontWeight:"800",color:C.text,marginBottom:"8px",fontFamily:"'Playfair Display',serif"}}>Booking Confirmed!</h3>
              <p style={{color:C.muted,lineHeight:"1.6",marginBottom:"16px",fontSize:"14px"}}>Thank you, <strong style={{color:C.text}}>{name}</strong>! We'll reach out to <strong style={{color:C.text}}>{email}</strong> with next steps.</p>
              <div style={{background:`${C.accent}0e`,border:`1px solid ${C.accent}30`,borderRadius:"12px",padding:"14px 16px",marginBottom:"14px",textAlign:"left"}}>
                {[["Room",`${room.name} · ${room.bed}`],["Check-in",checkIn],["Check-out",checkOut],["Total Est.",price?`$${price.total.toLocaleString()}`:"—"],["Lease","✅ Signed digitally"]].map(([k,v])=>(
                  <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:"13px",color:C.muted,marginBottom:"6px"}}><span>{k}</span><strong style={{color:C.text}}>{v}</strong></div>
                ))}
              </div>
              <SmsPreview name={name} moveIn={checkIn}/>
              <button onClick={onClose} style={{marginTop:"16px",background:`linear-gradient(135deg,${C.accent},${C.accentDim})`,color:"#0d0a06",border:"none",borderRadius:"12px",padding:"13px 32px",fontSize:"14px",fontWeight:"700",cursor:"pointer"}}>Done</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GreaterBostonHousing() {
  const width = useWidth();
  const isMobile = width < 640;
  const [section,setSection] = useState("rooms");
  const [booking,setBooking] = useState(null);
  const [showContact,setShowContact] = useState(false);
  const scroll = useCallback(()=>{ document.getElementById("nav-anchor")?.scrollIntoView({behavior:"smooth"}); },[]);

  return(
    <div style={{fontFamily:"'Lato',sans-serif",background:C.bg,minHeight:"100vh",color:C.text}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Lato:wght@300;400;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        input,select,button{font-family:inherit;}
        input:focus,select:focus{border-color:${C.accent}!important;box-shadow:0 0 0 3px ${C.accent}22!important;outline:none;}
        input[type="date"]::-webkit-calendar-picker-indicator{filter:invert(0.6);}
        ::placeholder{color:#6B5840;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#12100d;}
        ::-webkit-scrollbar-thumb{background:#3a2e22;border-radius:4px;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:none;}}
        @keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0);}50%{transform:translateX(-50%) translateY(8px);}}
        .fade{animation:fadeUp 0.45s ease both;}
        .rooms-grid{display:grid;gap:20px;grid-template-columns:1fr;}
        @media(min-width:500px){.rooms-grid{grid-template-columns:1fr 1fr;}}
        @media(min-width:900px){.rooms-grid{grid-template-columns:repeat(3,1fr);}}
        .am-grid{display:grid;gap:10px;grid-template-columns:1fr 1fr;}
        @media(min-width:520px){.am-grid{grid-template-columns:repeat(3,1fr);}}
        @media(min-width:900px){.am-grid{grid-template-columns:repeat(4,1fr);}}
        .sp-grid{display:grid;gap:18px;grid-template-columns:1fr;}
        @media(min-width:640px){.sp-grid{grid-template-columns:repeat(3,1fr);}}
        .loc-grid{display:grid;gap:12px;grid-template-columns:1fr;}
        @media(min-width:600px){.loc-grid{grid-template-columns:1fr 1fr;}}
        .why-grid{display:grid;gap:12px;grid-template-columns:1fr 1fr;}
        @media(min-width:700px){.why-grid{grid-template-columns:repeat(3,1fr);}}
        .hw-grid{display:grid;gap:10px;grid-template-columns:1fr;}
        @media(min-width:600px){.hw-grid{grid-template-columns:1fr 1fr;}}
      `}</style>

      {/* HERO */}
      <div style={{position:"relative",width:"100%",height:"100vh",minHeight:"600px",overflow:"hidden"}}>
        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFRT/2wAICAQEAAD8A/X//Z" alt="Hero" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(8,5,2,0.48) 0%,rgba(8,5,2,0.2) 40%,rgba(8,5,2,0.75) 100%)"}}/>
        <div style={{position:"absolute",top:0,left:0,right:0,padding:isMobile?"20px":"28px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",zIndex:10}}>
          <div style={{fontSize:isMobile?"12px":"14px",fontWeight:"700",letterSpacing:"3px",color:"rgba(255,255,255,0.92)",textTransform:"uppercase",textShadow:"0 1px 8px rgba(0,0,0,0.7)"}}>Greater Boston Housing</div>
          <button onClick={scroll} style={{background:"rgba(255,255,255,0.14)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.3)",color:"white",borderRadius:"6px",padding:"8px 18px",fontSize:"13px",fontWeight:"600",cursor:"pointer"}}>Explore</button>
        </div>
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"20px 24px",zIndex:5}}>
          <div style={{fontSize:isMobile?"11px":"12px",letterSpacing:"4px",color:"rgba(255,255,255,0.65)",textTransform:"uppercase",marginBottom:"14px",fontWeight:"600"}}>📍 Medford, Massachusetts</div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:isMobile?"38px":"70px",fontWeight:"800",color:"white",lineHeight:"1.1",marginBottom:"16px",textShadow:"0 2px 24px rgba(0,0,0,0.5)"}}>Furnished Private Rooms</h1>
          <p style={{color:"rgba(255,255,255,0.78)",fontSize:isMobile?"15px":"18px",lineHeight:"1.6",marginBottom:"36px",maxWidth:"480px",textShadow:"0 1px 10px rgba(0,0,0,0.5)"}}>Furnished private rooms with smart locks, utilities included, and direct access to Boston.</p>
          <div style={{display:"flex",gap:"12px",flexWrap:"wrap",justifyContent:"center"}}>
            <button onClick={scroll} style={{background:`linear-gradient(135deg,${C.accent},${C.accentDim})`,color:"#0d0a06",border:"none",borderRadius:"8px",padding:isMobile?"13px 24px":"16px 36px",fontSize:"14px",fontWeight:"700",cursor:"pointer"}}>View Rooms</button>
            <button onClick={()=>setShowContact(true)} style={{background:"rgba(255,255,255,0.12)",backdropFilter:"blur(8px)",color:"white",border:"1px solid rgba(255,255,255,0.35)",borderRadius:"8px",padding:isMobile?"13px 24px":"16px 36px",fontSize:"14px",fontWeight:"700",cursor:"pointer"}}>Contact Us</button>
          </div>
        </div>
        <div style={{position:"absolute",bottom:"32px",left:"50%",animation:"bounce 2s ease-in-out infinite",cursor:"pointer",zIndex:10,textAlign:"center"}} onClick={scroll}>
          <div style={{color:"rgba(255,255,255,0.5)",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",marginBottom:"6px"}}>Scroll</div>
          <div style={{width:"1px",height:"36px",background:"linear-gradient(to bottom,rgba(255,255,255,0.5),transparent)",margin:"0 auto"}}/>
        </div>
      </div>

      {/* NAV */}
      <div id="nav-anchor" style={{background:C.surface,borderBottom:`1px solid ${C.border}`,position:"sticky",top:0,zIndex:200}}>
        <div style={{maxWidth:"1100px",margin:"0 auto",padding:"0 10px",display:"flex",justifyContent:isMobile?"space-around":"flex-start"}}>
          {[["rooms","🛏️ Rooms"],["amenities","✨ Amenities"],["spaces","🏠 Spaces"],["location","📍 Location"]].map(([key,label])=>(
            <button key={key} onClick={()=>setSection(key)} style={{background:"none",border:"none",padding:isMobile?"12px 4px":"15px 20px",fontSize:isMobile?"11px":"13px",fontWeight:"700",cursor:"pointer",color:section===key?C.accent:C.muted,borderBottom:section===key?`2px solid ${C.accent}`:"none",transition:"all 0.2s"}}>
              {isMobile?label.split(" ").slice(1).join(" "):label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:isMobile?"28px 14px 88px":"48px 24px 64px"}}>

        {section==="rooms"&&(
          <div className="fade">
            <div style={{textAlign:"center",marginBottom:isMobile?"24px":"36px"}}>
              <div style={{fontSize:"11px",letterSpacing:"3px",color:C.accent,textTransform:"uppercase",fontWeight:"700",marginBottom:"8px"}}>Available Now</div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:isMobile?"28px":"40px",fontWeight:"800",color:C.text,marginBottom:"8px"}}>Private Furnished Rooms</h2>
              <p style={{color:C.muted,fontSize:isMobile?"13px":"15px"}}>All rooms include a <strong style={{color:C.green}}>$100/month discount</strong> for monthly stays. WiFi + all utilities included.</p>
            </div>
            <div className="rooms-grid">
              {rooms.map(room=><RoomCard key={room.id} room={room} onBook={setBooking} isMobile={isMobile}/>)}
            </div>
          </div>
        )}

        {section==="amenities"&&(
          <div className="fade">
            <div style={{textAlign:"center",marginBottom:isMobile?"24px":"36px"}}>
              <div style={{fontSize:"11px",letterSpacing:"3px",color:C.accent,textTransform:"uppercase",fontWeight:"700",marginBottom:"8px"}}>What's Included</div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:isMobile?"28px":"40px",fontWeight:"800",color:C.text,marginBottom:"8px"}}>Everything You Need</h2>
              <p style={{color:C.muted,fontSize:isMobile?"13px":"15px"}}>No surprises. Move in and feel at home from day one.</p>
            </div>
            <div className="am-grid">
              {amenities.map((a,i)=>(<div key={i} style={{background:C.surface,borderRadius:"14px",padding:isMobile?"13px 11px":"18px 16px",border:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:"10px"}}>
                <span style={{fontSize:"24px"}}>{a.icon}</span>
                <div style={{fontSize:"13px",fontWeight:"700",color:C.text}}>{a.label}</div>
              </div>))}
            </div>
            {[{icon:"📱",title:"Automatic Check-In Text",body:"On the morning of your check-in at 8:00 AM sharp, you'll automatically receive a text with your private door code and full entry instructions."},{icon:"🔐",title:"Smart Lock Access",body:"Each room has a private smart lock with a unique code sent before your arrival. No traditional keys needed."}].map((item,i)=>(
              <div key={i} style={{marginTop:"14px",background:`${C.accent}0a`,border:`1px solid ${C.accent}25`,borderRadius:"16px",padding:isMobile?"20px 16px":"24px 28px",display:"flex",gap:"14px"}}>
                <span style={{fontSize:"36px",flexShrink:0}}>{item.icon}</span>
                <div>
                  <h3 style={{fontFamily:"'Playfair Display',serif",color:C.text,fontSize:isMobile?"18px":"20px",marginBottom:"6px"}}>{item.title}</h3>
                  <p style={{color:C.muted,fontSize:isMobile?"13px":"14px",lineHeight:"1.65"}}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {section==="spaces"&&(
          <div className="fade">
            <div style={{textAlign:"center",marginBottom:isMobile?"24px":"36px"}}>
              <div style={{fontSize:"11px",letterSpacing:"3px",color:C.accent,textTransform:"uppercase",fontWeight:"700",marginBottom:"8px"}}>Shared</div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:isMobile?"28px":"40px",fontWeight:"800",color:C.text,marginBottom:"8px"}}>Common Areas</h2>
              <p style={{color:C.muted,fontSize:isMobile?"13px":"15px"}}>Comfortable, well-equipped spaces for all residents.</p>
            </div>
            <div className="sp-grid">
              {spaces.map(s=><SpaceCard key={s.name} space={s}/>)}
            </div>
          </div>
        )}

        {section==="location"&&(
          <div className="fade">
            <div style={{textAlign:"center",marginBottom:isMobile?"24px":"36px"}}>
              <div style={{fontSize:"11px",letterSpacing:"3px",color:C.accent,textTransform:"uppercase",fontWeight:"700",marginBottom:"8px"}}>Where We Are</div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:isMobile?"28px":"40px",fontWeight:"800",color:C.text,marginBottom:"8px"}}>Prime Medford Location</h2>
              <p style={{color:C.muted,fontSize:isMobile?"13px":"15px",maxWidth:"560px",margin:"0 auto",lineHeight:"1.6"}}>A quiet, residential pocket of Medford — peaceful enough to come home to, and close enough to everything.</p>
            </div>
            <h3 style={{fontFamily:"'Playfair Display',serif",color:C.text,fontSize:isMobile?"20px":"26px",fontWeight:"700",marginBottom:"14px"}}>What's Nearby</h3>
            <div className="loc-grid" style={{marginBottom:"24px"}}>
              {nearbyPlaces.map((p,i)=>(<div key={i} style={{background:C.surface,borderRadius:"12px",padding:"14px 16px",border:`1px solid ${C.border}`,display:"flex",gap:"12px",alignItems:"flex-start"}}>
                <span style={{fontSize:"20px",flexShrink:0}}>{p.icon}</span>
                <div>
                  <div style={{fontSize:"13px",fontWeight:"800",color:C.text}}>{p.name}</div>
                  <div style={{fontSize:"12px",color:C.muted,marginTop:"2px"}}>{p.detail}</div>
                </div>
              </div>))}
            </div>
            <h3 style={{fontFamily:"'Playfair Display',serif",color:C.text,fontSize:isMobile?"20px":"26px",fontWeight:"700",marginBottom:"14px"}}>Public Transportation</h3>
            <div style={{background:C.surface,borderRadius:"16px",border:`1px solid ${C.border}`,overflow:"hidden",marginBottom:"24px"}}>
              {transitItems.map((t,i)=>(<div key={i} style={{padding:"16px 18px",borderBottom:i<transitItems.length-1?`1px solid ${C.border}`:"none"}}><div style={{fontSize:"13px",fontWeight:"800",color:C.text,marginBottom:"8px"}}>{t.type}</div>{t.lines.map((line,j)=>(<div key={j} style={{fontSize:"12px",color:C.muted,marginBottom:j<t.lines.length-1?"6px":"0",lineHeight:"1.5"}}>• {line}</div>))}</div>))}
            </div>
            <h3 style={{fontFamily:"'Playfair Display',serif",color:C.text,fontSize:isMobile?"20px":"26px",fontWeight:"700",marginBottom:"14px"}}>Highway Access</h3>
            <div className="hw-grid" style={{marginBottom:"24px"}}>
              {highways.map((h,i)=>(<div key={i} style={{background:C.surface,borderRadius:"12px",padding:"14px 16px",border:`1px solid ${C.border}`}}><span style={{background:`${C.accent}18`,border:`1px solid ${C.accent}40`,color:C.accent,borderRadius:"4px",padding:"2px 8px",fontSize:"10px",fontWeight:"800"}}>{h.route}</span><p style={{fontSize:"12px",color:C.muted,marginTop:"8px",lineHeight:"1.55"}}>{h.desc}</p></div>))}
            </div>
            <div style={{background:`${C.accent}0a`,border:`1px solid ${C.accent}25`,borderRadius:"18px",padding:isMobile?"22px 18px":"28px 32px"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:C.text,fontSize:isMobile?"20px":"24px",fontWeight:"700",marginBottom:"16px",textAlign:"center"}}>Why Medford Is the Perfect Base</h3>
              <div className="why-grid">
                {[{icon:"🏙️",title:"Boston in Minutes",body:"Just 6 miles, 7 minutes by car off-peak, or 14 minutes by MBTA."},{icon:"🌳",title:"Quiet Neighborhood",body:"A peaceful residential area that's great for studying or working from home."},{icon:"💰",title:"Affordable Living",body:"Lower cost of living compared to central Boston while keeping all the access."}].map((item,i)=>(
                  <div key={i} style={{background:C.surface,borderRadius:"14px",padding:"16px",border:`1px solid ${C.border}`}}>
                    <div style={{fontSize:"26px",marginBottom:"8px"}}>{item.icon}</div>
                    <div style={{fontSize:"13px",fontWeight:"800",color:C.text,marginBottom:"4px"}}>{item.title}</div>
                    <div style={{fontSize:"12px",color:C.muted,lineHeight:"1.55"}}>{item.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {isMobile&&(
        <div style={{position:"fixed",bottom:0,left:0,right:0,background:C.surface,padding:"10px 14px 14px",borderTop:`1px solid ${C.border}`,zIndex:150}}>
          <button onClick={()=>setSection("rooms")} style={{width:"100%",background:`linear-gradient(135deg,${C.accent},${C.accentDim})`,color:"#0d0a06",border:"none",borderRadius:"12px",padding:"13px",fontSize:"14px",fontWeight:"700",cursor:"pointer"}}>Book Now</button>
        </div>
      )}

      {booking&&<BookingModal room={booking} onClose={()=>setBooking(null)} isMobile={isMobile}/>}

      {showContact&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.88)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}} onClick={()=>setShowContact(false)}>
          <div style={{background:C.surface,borderRadius:'20px',padding:'36px 28px',maxWidth:'340px',width:'100%',border:'1px solid '+C.border,textAlign:'center',boxShadow:'0 0 80px rgba(0,0,0,0.6)'}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:'48px',marginBottom:'12px'}}>📞</div>
            <h3 style={{fontFamily:"'Playfair Display',serif",color:C.text,fontSize:'22px',fontWeight:'800',marginBottom:'8px'}}>Contact Us</h3>
            <p style={{color:C.muted,fontSize:'14px',marginBottom:'24px',lineHeight:'1.6'}}>We're happy to answer any questions about our rooms or help you book your stay.</p>
            <a href='tel:7815392300' style={{display:'block',background:'linear-gradient(135deg,'+C.accent+','+C.accentDim+')',color:'#0d0a06',borderRadius:'12px',padding:'16px',fontSize:'22px',fontWeight:'800',textDecoration:'none',marginBottom:'12px'}}>
              (781) 539-2300
            </a>
            <p style={{color:C.dim,fontSize:'12px',marginBottom:'20px'}}>Tap the number to call or text us directly</p>
            <button onClick={()=>setShowContact(false)} style={{background:C.surface2,border:'1px solid '+C.border,color:C.muted,borderRadius:'10px',padding:'10px 24px',fontSize:'14px',fontWeight:'600',cursor:'pointer'}}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
