import React, { useState, useEffect } from 'react';
import {
  Phone, Mail, MapPin, Instagram,
  ChevronLeft, ChevronRight, X
} from 'lucide-react';
import { supabase } from './supabase';

// ── 設計師資料 ──────────────────────────────────────────────
const DESIGNER = {
  name:    '袁設計師',
  title:   '室內設計師 / 創辦人',
  phone:   '9123 4567',
  email:   'design@studio.com',
  address: '香港九龍觀塘',
  ig:      '@designstudio_hk',
  wechat:  'designstudio_hk',
  avatar:  'https://placehold.co/120x120/e2e8f0/64748b?text=袁',
  bio:     '超過 10 年室內設計經驗，專注住宅及商業空間，致力為每位客戶創造獨特而實用的生活空間。',
};

const CATS   = ['全部', '住宅', '商業', '辦公室'];
const STYLES = ['全部風格', '現代簡約', '北歐風', '工業風', '日式', '古典'];

// ── 淺色主題 ────────────────────────────────────────────────
const S = {
  page:    { display:'flex', minHeight:'100vh', background:'#f8fafc', color:'#0f172a', fontFamily:'system-ui,sans-serif' },
  sidebar: { width:260, flexShrink:0, background:'#ffffff', borderRight:'1px solid #e2e8f0',
             display:'flex', flexDirection:'column', position:'sticky', top:0, height:'100vh', overflow:'auto' },
  main:    { flex:1, overflow:'auto', background:'#f8fafc' },
};

// ── WeChat Icon ──────────────────────────────────────────────
function WeChatIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 10.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0Z"/>
      <path d="M14 10.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0Z"/>
      <path d="M17.5 14.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0Z"/>
      <path d="M12.5 14.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0Z"/>
      <path d="M21 12c0-4.418-4.03-8-9-8s-9 3.582-9 8c0 1.98.78 3.8 2.07 5.19L4 20l3.29-.82A9.5 9.5 0 0 0 12 20c4.97 0 9-3.582 9-8Z"/>
    </svg>
  );
}

// ── Sidebar ──────────────────────────────────────────────────
function Sidebar({ onEnterAdmin }) {
  return (
    <aside style={S.sidebar}>
      <div style={{ padding:28, display:'flex', flexDirection:'column' }}>

        {/* 頭像 */}
        <div style={{ textAlign:'center', marginBottom:24 }}>
          <img src={DESIGNER.avatar} alt="designer"
            style={{ width:100, height:100, borderRadius:'50%', objectFit:'cover',
              border:'3px solid #2563eb', marginBottom:12 }}/>
          <div style={{ fontWeight:800, fontSize:18, color:'#0f172a' }}>{DESIGNER.name}</div>
          <div style={{ fontSize:12, color:'#94a3b8', marginTop:4 }}>{DESIGNER.title}</div>
        </div>

        <div style={{ borderTop:'1px solid #e2e8f0', marginBottom:20 }}/>

        <p style={{ fontSize:12, color:'#64748b', lineHeight:1.8, marginBottom:20 }}>
          {DESIGNER.bio}
        </p>

        <div style={{ borderTop:'1px solid #e2e8f0', marginBottom:20 }}/>

        {/* 聯絡資料 */}
        <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:24 }}>

          <a href={`https://wa.me/852${DESIGNER.phone.replace(/\s/g,'')}`}
            target="_blank" rel="noreferrer"
            style={{ display:'flex', alignItems:'center', gap:10, fontSize:12,
              color:'#475569', textDecoration:'none' }}>
            <span style={{ color:'#2563eb', flexShrink:0 }}><Phone size={13}/></span>
            <span>{DESIGNER.phone}</span>
          </a>

          <a href={`mailto:${DESIGNER.email}`}
            style={{ display:'flex', alignItems:'center', gap:10, fontSize:12,
              color:'#475569', textDecoration:'none' }}>
            <span style={{ color:'#2563eb', flexShrink:0 }}><Mail size={13}/></span>
            <span>{DESIGNER.email}</span>
          </a>

          <div style={{ display:'flex', alignItems:'center', gap:10, fontSize:12, color:'#475569' }}>
            <span style={{ color:'#2563eb', flexShrink:0 }}><MapPin size={13}/></span>
            <span>{DESIGNER.address}</span>
          </div>

          <a href={`https://instagram.com/${DESIGNER.ig.replace('@','')}`}
            target="_blank" rel="noreferrer"
            style={{ display:'flex', alignItems:'center', gap:10, fontSize:12,
              color:'#475569', textDecoration:'none' }}>
            <span style={{ color:'#2563eb', flexShrink:0 }}><Instagram size={13}/></span>
            <span>{DESIGNER.ig}</span>
          </a>

          <div style={{ display:'flex', alignItems:'center', gap:10, fontSize:12, color:'#475569' }}>
            <span style={{ color:'#2563eb', flexShrink:0 }}><WeChatIcon/></span>
            <span><span style={{ color:'#94a3b8', marginRight:4 }}>WeChat:</span>{DESIGNER.wechat}</span>
          </div>

        </div>

        {/* 統計 */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:32 }}>
          {[
            { value:'10+', label:'年經驗' },
            { value:'50+', label:'完成案例' },
            { value:'100%', label:'客戶滿意' },
          ].map(s => (
            <div key={s.label} style={{ background:'#f1f5f9', borderRadius:8, padding:'10px 8px', textAlign:'center' }}>
              <div style={{ fontSize:18, fontWeight:800, color:'#2563eb' }}>{s.value}</div>
              <div style={{ fontSize:10, color:'#94a3b8', marginTop:2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* 後台按鈕 */}
        <button
          onClick={onEnterAdmin}
          style={{ width:'100%', padding:'8px 0', background:'transparent',
            border:'1px solid #e2e8f0', borderRadius:8, color:'#cbd5e1',
            fontSize:11, cursor:'pointer', letterSpacing:0.5 }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#2563eb';
            e.currentTarget.style.color = '#94a3b8';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#e2e8f0';
            e.currentTarget.style.color = '#cbd5e1';
          }}>
          ⚙️ 管理後台
        </button>

      </div>
    </aside>
  );
}

// ── 案例卡片 ──────────────────────────────────────────────────
function ProjectCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:'#ffffff',
        border:`1px solid ${hovered ? '#2563eb' : '#e2e8f0'}`,
        borderRadius:12, overflow:'hidden', cursor:'pointer',
        transform: hovered ? 'translateY(-4px)' : 'none',
        transition:'all 0.2s',
        boxShadow: hovered ? '0 8px 24px rgba(37,99,235,0.1)' : '0 1px 4px rgba(0,0,0,0.04)',
      }}>

      {/* 封面圖 */}
      <div style={{ position:'relative', overflow:'hidden' }}>
        <img
          src={project.cover_image_url || 'https://placehold.co/400x250/f1f5f9/94a3b8?text=No+Image'}
          alt={project.title}
          style={{ width:'100%', height:180, objectFit:'cover', display:'block',
            transform: hovered ? 'scale(1.05)' : 'scale(1)', transition:'transform 0.3s' }}/>
        <div style={{ position:'absolute', top:10, left:10, display:'flex', gap:6 }}>
          <span style={{ background:'rgba(37,99,235,0.9)', color:'#fff',
            fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:20 }}>
            {project.category}
          </span>
          <span style={{ background:'rgba(255,255,255,0.85)', color:'#64748b',
            fontSize:10, padding:'3px 8px', borderRadius:20 }}>
            {project.style}
          </span>
        </div>
        {project.is_featured && (
          <div style={{ position:'absolute', top:10, right:10,
            background:'#f59e0b', color:'#fff',
            fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:20 }}>
            ⭐ 精選
          </div>
        )}
      </div>

      {/* 文字資訊 */}
      <div style={{ padding:'14px 16px' }}>
        <div style={{ fontWeight:700, fontSize:14, marginBottom:6, color:'#0f172a' }}>
          {project.title}
        </div>
        <div style={{ display:'flex', gap:12, fontSize:11, color:'#94a3b8', marginBottom: project.tags?.length > 0 ? 8 : 0 }}>
          <span>📍 {project.location}</span>
          <span>📐 {project.area} ft²</span>
          <span>🗓 {project.year}</span>
        </div>

        {/* ✅ Hashtag */}
        {project.tags?.length > 0 && (
          <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
            {project.tags.map((t, i) => (
              <span key={i} style={{ fontSize:10, color:'#2563eb',
                background:'#eff6ff', padding:'2px 8px', borderRadius:20, fontWeight:600 }}>
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── 案例列表 ──────────────────────────────────────────────────
function ProjectList({ onSelect }) {
  const [cat,      setCat]      = useState('全部');
  const [style,    setStyle]    = useState('全部風格');
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    // ✅ 只顯示已發布
    supabase
      .from('projects')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setProjects(data || []);
        setLoading(false);
      });
  }, []);

  const filtered = projects.filter(p => {
    const matchCat   = cat   === '全部'    || p.category === cat;
    const matchStyle = style === '全部風格' || p.style    === style;
    return matchCat && matchStyle;
  });

  if (loading) return (
    <div style={{ padding:28, color:'#94a3b8', fontSize:14 }}>載入中...</div>
  );

  return (
    <div style={{ padding:28 }}>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ margin:0, fontSize:22, fontWeight:800, color:'#0f172a' }}>設計案例</h1>
        <p style={{ margin:'6px 0 0', fontSize:13, color:'#94a3b8' }}>共 {filtered.length} 個案例</p>
      </div>

      {/* 篩選器 */}
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:24 }}>
        <div style={{ display:'flex', gap:4, background:'#f1f5f9', padding:4,
          borderRadius:10, border:'1px solid #e2e8f0' }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              style={{ padding:'5px 14px', borderRadius:7, border:'none', cursor:'pointer',
                fontSize:12, fontWeight:600, transition:'all 0.15s',
                background: cat === c ? '#2563eb' : 'transparent',
                color:      cat === c ? '#fff'    : '#64748b' }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{ display:'flex', gap:4, background:'#f1f5f9', padding:4,
          borderRadius:10, border:'1px solid #e2e8f0' }}>
          {STYLES.map(s => (
            <button key={s} onClick={() => setStyle(s)}
              style={{ padding:'5px 14px', borderRadius:7, border:'none', cursor:'pointer',
                fontSize:12, fontWeight:600, transition:'all 0.15s',
                background: style === s ? '#7c3aed' : 'transparent',
                color:      style === s ? '#fff'    : '#64748b' }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:16 }}>
          {filtered.map(p => (
            <ProjectCard key={p.id} project={p} onClick={() => onSelect(p)}/>
          ))}
        </div>
      ) : (
        <div style={{ textAlign:'center', color:'#94a3b8', padding:'60px 0', fontSize:14 }}>
          沒有符合的案例
        </div>
      )}
    </div>
  );
}

// ── 案例詳情 ──────────────────────────────────────────────────
function ProjectDetail({ project, onBack }) {
  const [current,  setCurrent]  = useState(0);
  const [lightbox, setLightbox] = useState(false);
  // ✅ 從 project_images table fetch 圖片
  const [images,   setImages]   = useState([]);

  useEffect(() => {
    supabase
      .from('project_images')
      .select('image_url')
      .eq('project_id', project.id)
      .order('sort_order')
      .then(({ data }) => {
        const urls = data?.map(d => d.image_url) || [];
        // fallback：若沒有子圖片，至少顯示封面
        setImages(urls.length > 0 ? urls : (project.cover_image_url ? [project.cover_image_url] : []));
      });
  }, [project.id]);

  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length);
  const next = () => setCurrent(i => (i + 1) % images.length);

  const waLink = `https://wa.me/852${DESIGNER.phone.replace(/\s/g,'')}?text=${encodeURIComponent(`你好，我想查詢「${project.title}」的詳情。`)}`;

  return (
    <div style={{ padding:28 }}>
      <button onClick={onBack}
        style={{ display:'flex', alignItems:'center', gap:6, background:'transparent',
          border:'1px solid #e2e8f0', borderRadius:8, padding:'7px 14px',
          color:'#64748b', cursor:'pointer', fontSize:13, marginBottom:24 }}>
        <ChevronLeft size={14}/> 返回案例列表
      </button>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:24 }}>

        {/* 左欄：圖片 */}
        <div>
          {images.length > 0 ? (
            <>
              <div style={{ position:'relative', borderRadius:12, overflow:'hidden',
                marginBottom:12, cursor:'pointer', background:'#f1f5f9' }}
                onClick={() => setLightbox(true)}>
                <img src={images[current]} alt=""
                  style={{ width:'100%', height:380, objectFit:'cover', display:'block' }}/>
                {images.length > 1 && (
                  <>
                    <button onClick={e => { e.stopPropagation(); prev(); }}
                      style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)',
                        background:'rgba(255,255,255,0.85)', border:'none', borderRadius:'50%',
                        width:36, height:36, display:'flex', alignItems:'center',
                        justifyContent:'center', cursor:'pointer', color:'#0f172a',
                        boxShadow:'0 2px 8px rgba(0,0,0,0.1)' }}>
                      <ChevronLeft size={16}/>
                    </button>
                    <button onClick={e => { e.stopPropagation(); next(); }}
                      style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)',
                        background:'rgba(255,255,255,0.85)', border:'none', borderRadius:'50%',
                        width:36, height:36, display:'flex', alignItems:'center',
                        justifyContent:'center', cursor:'pointer', color:'#0f172a',
                        boxShadow:'0 2px 8px rgba(0,0,0,0.1)' }}>
                      <ChevronRight size={16}/>
                    </button>
                    <div style={{ position:'absolute', bottom:12, right:12,
                      background:'rgba(0,0,0,0.5)', color:'#fff', fontSize:11,
                      padding:'3px 10px', borderRadius:20 }}>
                      {current + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* 縮圖 */}
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {images.map((img, i) => (
                  <img key={i} src={img} alt="" onClick={() => setCurrent(i)}
                    style={{ width:70, height:48, objectFit:'cover', borderRadius:6,
                      cursor:'pointer', transition:'all 0.15s',
                      border:`2px solid ${current === i ? '#2563eb' : '#e2e8f0'}`,
                      opacity: current === i ? 1 : 0.6 }}/>
                ))}
              </div>
            </>
          ) : (
            <div style={{ height:380, borderRadius:12, background:'#f1f5f9',
              display:'flex', alignItems:'center', justifyContent:'center', color:'#94a3b8' }}>
              暫無圖片
            </div>
          )}
        </div>

        {/* 右欄：資訊 */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

          <div>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:10 }}>
              <span style={{ background:'#eff6ff', color:'#2563eb',
                fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:20 }}>
                {project.category}
              </span>
              <span style={{ background:'#f5f3ff', color:'#7c3aed',
                fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:20 }}>
                {project.style}
              </span>
            </div>
            <h2 style={{ margin:'0 0 8px', fontSize:20, fontWeight:800, color:'#0f172a' }}>
              {project.title}
            </h2>

            {/* ✅ Hashtag */}
            {project.tags?.length > 0 && (
              <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginTop:8 }}>
                {project.tags.map((t, i) => (
                  <span key={i} style={{ fontSize:11, color:'#2563eb',
                    background:'#eff6ff', padding:'2px 10px', borderRadius:20, fontWeight:600 }}>
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 統計格 */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
            {[
              ['📍 地點', project.location],
              ['🗓 年份', project.year],
              ['📐 面積', `${project.area} ft²`],
              ['🎨 風格', project.style],
            ].map(([label, value]) => (
              <div key={label} style={{ background:'#f8fafc', border:'1px solid #e2e8f0',
                borderRadius:8, padding:'10px 12px' }}>
                <div style={{ fontSize:10, color:'#94a3b8', marginBottom:3 }}>{label}</div>
                <div style={{ fontSize:13, fontWeight:600, color:'#0f172a' }}>{value}</div>
              </div>
            ))}
          </div>

          {/* 描述 */}
          {/* ✅ project.description 修正 */}
          {project.description && (
            <div style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:10, padding:14 }}>
              <div style={{ fontSize:11, color:'#94a3b8', marginBottom:8 }}>項目描述</div>
              <p style={{ margin:0, fontSize:13, color:'#475569', lineHeight:1.8 }}>
                {project.description}
              </p>
            </div>
          )}

          {/* ✅ WhatsApp 查詢按鈕 */}
          <a href={waLink} target="_blank" rel="noreferrer"
            style={{ display:'block', width:'100%', padding:'11px 0', background:'#22c55e',
              color:'#fff', border:'none', borderRadius:10, fontWeight:700,
              fontSize:13, cursor:'pointer', textAlign:'center', textDecoration:'none' }}>
            💬 WhatsApp 查詢
          </a>

          <div style={{ display:'flex', gap:8 }}>
            <a href={`mailto:${DESIGNER.email}?subject=查詢：${project.title}`}
              style={{ flex:1, display:'block', padding:'9px 0', background:'#f1f5f9',
                color:'#475569', border:'1px solid #e2e8f0', borderRadius:10, fontWeight:600,
                fontSize:12, cursor:'pointer', textAlign:'center', textDecoration:'none' }}>
              📧 電郵查詢
            </a>
            <div style={{ flex:1, padding:'9px 0', background:'#f1f5f9',
              color:'#475569', border:'1px solid #e2e8f0', borderRadius:10, fontWeight:600,
              fontSize:12, textAlign:'center' }}>
              WeChat: {DESIGNER.wechat}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && images.length > 0 && (
        <div onClick={() => setLightbox(false)}
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.92)',
            display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }}>
          <button onClick={() => setLightbox(false)}
            style={{ position:'absolute', top:20, right:20, background:'rgba(255,255,255,0.15)',
              border:'none', borderRadius:'50%', width:40, height:40, cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', color:'#fff' }}>
            <X size={18}/>
          </button>
          {images.length > 1 && (
            <button onClick={e => { e.stopPropagation(); prev(); }}
              style={{ position:'absolute', left:20, background:'rgba(255,255,255,0.15)',
                border:'none', borderRadius:'50%', width:44, height:44, cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'center', color:'#fff' }}>
              <ChevronLeft size={20}/>
            </button>
          )}
          <img src={images[current]} alt=""
            style={{ maxWidth:'90vw', maxHeight:'85vh', borderRadius:8, objectFit:'contain' }}
            onClick={e => e.stopPropagation()}/>
          {images.length > 1 && (
            <button onClick={e => { e.stopPropagation(); next(); }}
              style={{ position:'absolute', right:20, background:'rgba(255,255,255,0.15)',
                border:'none', borderRadius:'50%', width:44, height:44, cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'center', color:'#fff' }}>
              <ChevronRight size={20}/>
            </button>
          )}
          <div style={{ position:'absolute', bottom:20, color:'rgba(255,255,255,0.5)', fontSize:12 }}>
            {current + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}

// ── 主體 ──────────────────────────────────────────────────────
export default function Frontend({ onEnterAdmin }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={S.page}>
      <Sidebar onEnterAdmin={onEnterAdmin}/>
      <main style={S.main}>
        {selected
          ? <ProjectDetail project={selected} onBack={() => setSelected(null)}/>
          : <ProjectList   onSelect={setSelected}/>
        }
      </main>
    </div>
  );
}
