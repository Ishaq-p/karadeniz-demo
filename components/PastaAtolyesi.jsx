'use client';
import React, { useState, useRef, useCallback, useEffect } from "react";
import { Sparkles, Trash2, Send, RotateCcw, Plus, MousePointer2 } from "lucide-react";

// --- Theme (Light Tone) ---
const BG = "#fdfbf7";
const INK = "#4a3c31";
const PANEL = "#ffffff";
const PANEL_BORDER = "#e4d9ce";
const ACCENT = "#e0a996";
const ACCENT_SOFT = "#f4dcd4";
const GOLD = "#d4a339";

const SPONGES = [
  { id: "vanilya", label: "Vanilya", color: "#f8e1a8", sideColor: "#d9bc78" },
  { id: "kakao", label: "Kakao", color: "#61402a", sideColor: "#452b1b" },
  { id: "kirmizi", label: "Kırmızı Kadife", color: "#9a3341", sideColor: "#691f2a" },
];

const FROSTINGS = [
  { id: "yok", label: "Yok", color: "transparent" },
  { id: "krem", label: "Krem", color: "#fef9ee" },
  { id: "gul", label: "Gül", color: "#f2c2cb" },
  { id: "cikolata", label: "Çikolata", color: "#452b1b" },
];

function darken(hex) {
  if (hex === 'transparent') return 'transparent';
  let r = 0, g = 0, b = 0;
  if (hex.startsWith('#')) {
    r = parseInt(hex.slice(1,3), 16);
    g = parseInt(hex.slice(3,5), 16);
    b = parseInt(hex.slice(5,7), 16);
  }
  r = Math.max(0, r - 30);
  g = Math.max(0, g - 30);
  b = Math.max(0, b - 30);
  return `rgb(${r},${g},${b})`;
}

const SEKERLEME_COLORS = ["#d8354f", "#3a7dd8", "#e6c667", "#5b9a4a", "#c65fb0", "#e08541"];

const ASSETS = {
  kiraz: {
    type: "drag", label: "Kiraz", size: 36,
    node: (
      <g>
        <circle cx="11" cy="20" r="7" fill="#a3223e" stroke="#5c1024" strokeWidth="1.5" />
        <circle cx="21" cy="22" r="6" fill="#c22c4a" stroke="#5c1024" strokeWidth="1.5" />
        <path d="M11 13 C13 4, 20 3, 22 9" stroke="#5b7a3a" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    )
  },
  cilek: {
    type: "drag", label: "Çilek", size: 36,
    node: (
      <g>
        <path d="M15 6 L23 12 L19 26 L11 26 L7 12 Z" fill="#d8354f" stroke="#7a1526" strokeWidth="1.5" />
        <path d="M9 8 L15 3 L21 8 L15 11 Z" fill="#5b7a3a" />
        <circle cx="12" cy="14" r="0.9" fill="#ffe1a8" />
        <circle cx="17" cy="12" r="0.9" fill="#ffe1a8" />
        <circle cx="14" cy="19" r="0.9" fill="#ffe1a8" />
        <circle cx="18" cy="20" r="0.9" fill="#ffe1a8" />
      </g>
    )
  },
  damla: {
    type: "drag", label: "Çiko. Damlası", size: 26,
    node: (
      <path d="M15 6 C20 13, 23 17, 19 22 C16 25, 9 24, 7 20 C6 16, 9 10, 15 6 Z" fill="#3c2414" stroke="#1f1108" strokeWidth="1.3" />
    )
  },
  sekerleme: {
    type: "sprinkle", label: "Şekerleme", size: 20,
    render: (p) => <rect x="8" y="13" width="14" height="5" rx="2.5" fill={p?.color || "#d8354f"} />
  },
  pudraSekeri: {
    type: "sprinkle", label: "Pudra Şekeri", size: 16,
    node: <circle cx="15" cy="15" r="7" fill="#ffffff" opacity="0.85" />
  },
  tozKakao: {
    type: "sprinkle", label: "Toz Kakao", size: 16,
    node: <circle cx="15" cy="15" r="7" fill="#4a2e1b" opacity="0.8" />
  },
  cremePatisserie: {
    type: "spread", label: "Creme Pat.", size: 36,
    node: <path d="M6 15 Q12 5, 18 15 T28 15 Q22 25, 18 15 T6 15 Z" fill="#fae8a5" opacity="0.95" stroke="#e0c777" strokeWidth="1" />
  },
};

let uid = 0;
const nextId = () => `p_${Date.now()}_${uid++}`;

export default function CakeBuilder() {
  const [layers, setLayers] = useState([
    { id: nextId(), type: SPONGES[0], size: 75, frosting: FROSTINGS[0] }
  ]);
  const [placed, setPlaced] = useState([]);
  
  const [activeTool, setActiveTool] = useState("drag");
  const [selectedId, setSelectedId] = useState(null);
  const [published, setPublished] = useState(false);
  
  const stageRef = useRef(null);
  const dragState = useRef(null); 
  const isPointerDown = useRef(false);
  const lastAddPos = useRef(null);

  const posFromEvent = useCallback((e) => {
    const rect = stageRef.current.getBoundingClientRect();
    const cx = ((e.clientX - rect.left) / rect.width) * 100;
    const cy = ((e.clientY - rect.top) / rect.height) * 100;
    return { x: cx, y: cy };
  }, []);

  const addSprinkleOrSpread = useCallback((e, toolKey) => {
    const { x, y } = posFromEvent(e);
    
    if (lastAddPos.current) {
        const dx = x - lastAddPos.current.x;
        const dy = y - lastAddPos.current.y;
        const distSq = dx*dx + dy*dy;
        const toolDef = ASSETS[toolKey];
        const threshold = toolDef.type === 'spread' ? 2 : 12; // lower = denser
        if (distSq < threshold) return;
    }
    
    lastAddPos.current = { x, y };
    const toolDef = ASSETS[toolKey];
    let itemsToAdd = [];
    
    if (toolDef.type === "sprinkle") {
      const count = Math.floor(Math.random() * 3) + 1;
      for(let i=0; i<count; i++) {
        const ox = x + (Math.random() - 0.5) * 10;
        const oy = y + (Math.random() - 0.5) * 10;
        itemsToAdd.push({
           id: nextId(), kind: toolKey, x: ox, y: oy, rot: Math.random() * 360,
           color: toolKey === 'sekerleme' ? SEKERLEME_COLORS[Math.floor(Math.random()*SEKERLEME_COLORS.length)] : null
        });
      }
    } else {
      itemsToAdd.push({ id: nextId(), kind: toolKey, x, y, rot: Math.random() * 360 });
    }
    
    setPlaced(prev => [...prev, ...itemsToAdd]);
    setPublished(false);
  }, [posFromEvent]);

  const handleStagePointerDown = (e) => {
    if (activeTool === 'drag') {
       setSelectedId(null);
    } else if (ASSETS[activeTool]) {
       e.preventDefault();
       isPointerDown.current = true;
       lastAddPos.current = null;
       addSprinkleOrSpread(e, activeTool);
    }
  };

  const handlePointerMoveGlobal = useCallback((e) => {
     if (dragState.current && activeTool === 'drag') {
       const { id } = dragState.current;
       const { x, y } = posFromEvent(e);
       setPlaced((prev) => prev.map((p) => (p.id === id ? { ...p, x, y } : p)));
     } else if (isPointerDown.current && activeTool !== 'drag' && ASSETS[activeTool]) {
       addSprinkleOrSpread(e, activeTool);
     }
  }, [activeTool, posFromEvent, addSprinkleOrSpread]);
  
  const handlePointerUpGlobal = useCallback(() => {
     isPointerDown.current = false;
     dragState.current = null;
     lastAddPos.current = null;
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMoveGlobal);
    window.addEventListener("pointerup", handlePointerUpGlobal);
    return () => {
      window.removeEventListener("pointermove", handlePointerMoveGlobal);
      window.removeEventListener("pointerup", handlePointerUpGlobal);
    };
  }, [handlePointerMoveGlobal, handlePointerUpGlobal]);

  const startDragFromPalette = (kind) => (e) => {
    e.preventDefault();
    if (ASSETS[kind].type !== 'drag') return;
    
    setActiveTool('drag');
    setPublished(false);
    const id = nextId();
    const { x, y } = posFromEvent(e);
    setPlaced((prev) => [...prev, { id, kind, x, y, rot: Math.round(Math.random() * 30 - 15) }]);
    setSelectedId(id);
    dragState.current = { id };
  };

  const startDragExisting = (id, kind) => (e) => {
    if (activeTool !== 'drag') return;
    if (ASSETS[kind].type !== 'drag') return;
    
    e.preventDefault();
    e.stopPropagation();
    setSelectedId(id);
    dragState.current = { id };
  };

  const addLayer = () => {
    if (layers.length >= 4) return;
    const lastLayer = layers[layers.length - 1];
    setLayers([...layers, { 
      id: nextId(), 
      type: SPONGES[0], 
      size: Math.max(30, lastLayer.size - 15), 
      frosting: FROSTINGS[0] 
    }]);
    setPublished(false);
  };
  
  const updateLayer = (id, field, value) => {
    setLayers(layers.map(l => l.id === id ? { ...l, [field]: value } : l));
    setPublished(false);
  };
  
  const removeLayer = (id) => {
    if (layers.length <= 1) return;
    setLayers(layers.filter(l => l.id !== id));
    setPublished(false);
  };

  const removeSelected = () => {
    if (!selectedId) return;
    setPlaced((prev) => prev.filter((p) => p.id !== selectedId));
    setSelectedId(null);
    setPublished(false);
  };

  const clearAll = () => {
    setPlaced([]);
    setSelectedId(null);
    setPublished(false);
  };

  // Sort placed items by Y coordinate to give natural depth
  const sortedPlaced = [...placed].sort((a, b) => a.y - b.y);

  return (
    <div style={{
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      background: BG,
      color: INK,
      padding: "32px 24px",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, letterSpacing: "0.15em", color: ACCENT, textTransform: "uppercase", fontWeight: 600 }}>
          <Sparkles size={16} /> Fırın Atölyesi <Sparkles size={16} />
        </div>
        <h2 style={{ margin: "8px 0 0", fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em", color: INK }}>
          Kendi Tatlını Yarat
        </h2>
        <p style={{ margin: "6px 0 0", fontSize: 15, color: "#8a7e75" }}>
          Katmanları ayarla, sıvı sür, malzemeleri serpiştir ve süsle.
        </p>
      </div>

      <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center", width: "100%", maxWidth: 1100 }}>
        
        {/* Left Panel: Layers */}
        <div style={{ width: 280, flexShrink: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Katmanlar (Pandispanya)
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {layers.map((layer, index) => (
              <div key={layer.id} style={{ background: PANEL, borderRadius: 12, padding: 16, border: `1px solid ${PANEL_BORDER}`, boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div style={{ fontWeight: 600, color: INK, fontSize: 14 }}>Katman {index + 1}</div>
                    {layers.length > 1 && (
                      <button onClick={() => removeLayer(layer.id)} style={{ background: 'none', border: 'none', color: '#d9534f', cursor: 'pointer', padding: 4 }}>
                        <Trash2 size={16}/>
                      </button>
                    )}
                 </div>
                 
                 <div style={{ fontSize: 12, color: '#777', marginBottom: 6, fontWeight: 500 }}>Pandispanya Türü</div>
                 <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                    {SPONGES.map(s => (
                       <button key={s.id} onClick={() => updateLayer(layer.id, 'type', s)} title={s.label}
                         style={{ 
                           width: 28, height: 28, background: s.color, borderRadius: '50%', 
                           border: layer.type.id === s.id ? `2px solid ${INK}` : `1px solid #ddd`,
                           boxShadow: layer.type.id === s.id ? `0 0 0 2px #fff inset` : 'none',
                           cursor: 'pointer' 
                         }} 
                       />
                    ))}
                 </div>
                 
                 <div style={{ fontSize: 12, color: '#777', marginBottom: 6, fontWeight: 500 }}>Sıvama</div>
                 <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                    {FROSTINGS.map(f => (
                       <button key={f.id} onClick={() => updateLayer(layer.id, 'frosting', f)} title={f.label}
                         style={{ 
                           width: 28, height: 28, background: f.color, borderRadius: '50%', 
                           border: layer.frosting.id === f.id ? `2px solid ${INK}` : `1px solid #ddd`,
                           boxShadow: layer.frosting.id === f.id ? `0 0 0 2px #fff inset` : 'none',
                           position: 'relative', overflow: 'hidden', cursor: 'pointer'
                         }}>
                         {f.id === 'yok' && <div style={{position: 'absolute', top: 12, left: -4, right: -4, height: 2, background: '#d38b8b', transform: 'rotate(45deg)'}}/>}
                       </button>
                    ))}
                 </div>
                 
                 <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#777', marginBottom: 6, fontWeight: 500 }}>
                   <span>Çap</span>
                   <span>{layer.size}%</span>
                 </div>
                 <input type="range" min="30" max="95" value={layer.size} onChange={(e) => updateLayer(layer.id, 'size', Number(e.target.value))} 
                   style={{ width: '100%', accentColor: ACCENT, cursor: 'pointer' }} 
                 />
              </div>
            ))}
            
            {layers.length < 4 && (
              <button onClick={addLayer} style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                background: "transparent", border: `2px dashed ${ACCENT}`, color: ACCENT,
                padding: "12px", borderRadius: 12, fontWeight: 600, cursor: "pointer", fontSize: 13
              }}>
                <Plus size={16} /> Yeni Katman Ekle
              </button>
            )}
          </div>
        </div>

        {/* Center: Stage */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", minWidth: 320, maxWidth: 500 }}>
          <div
            ref={stageRef}
            onPointerDown={handleStagePointerDown}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "1/1",
              touchAction: "none",
              cursor: activeTool === 'drag' ? 'default' : 'crosshair'
            }}
          >
            {/* Base plate */}
            <div style={{
                position: 'absolute', left: '8%', right: '8%', bottom: '10%', height: '32%',
                zIndex: 5, pointerEvents: 'none'
            }}>
               <div style={{
                  position: 'absolute', left: 0, top: 14, width: '100%', height: '100%',
                  borderRadius: '50%', background: '#d6c8bc', boxShadow: '0 20px 30px rgba(0,0,0,0.1)'
               }} />
               <div style={{ position: 'absolute', left: 0, top: '50%', width: '100%', height: 14, background: '#d6c8bc' }} />
               <div style={{
                  position: 'absolute', left: 0, top: 0, width: '100%', height: '100%',
                  borderRadius: '50%', background: '#eee5dd', border: '1px solid #d6c8bc'
               }} />
            </div>
            
            {/* Layers */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              {[...layers].reverse().map((layer, idx) => {
                 const realIndex = layers.length - 1 - idx;
                 const w = layer.size;
                 const h = layer.size * 0.45;
                 const zOffset = realIndex * 26; 
                 
                 return (
                    <div key={layer.id} style={{
                        position: 'absolute',
                        left: `calc(50% - ${w/2}%)`, bottom: `15%`,
                        width: `${w}%`, height: `${h}%`,
                        transform: `translateY(-${zOffset}px)`,
                        zIndex: realIndex + 10,
                    }}>
                       {/* Side Wall */}
                       <div style={{
                          position: 'absolute', left: 0, top: 26, width: '100%', height: '100%',
                          borderRadius: '50%', background: layer.type.sideColor,
                          boxShadow: `0 15px 15px rgba(0,0,0,0.1)`
                       }} />
                       <div style={{
                          position: 'absolute', left: 0, top: '50%', width: '100%', height: 26,
                          background: layer.type.sideColor,
                       }} />
                       
                       {/* Top Face */}
                       <div style={{
                          position: 'absolute', left: 0, top: 0, width: '100%', height: '100%',
                          borderRadius: '50%', background: layer.type.color,
                          border: `1px solid ${darken(layer.type.sideColor)}`
                       }}>
                          {/* Frosting / Sıvama */}
                          {layer.frosting.id !== 'yok' && (
                             <div style={{
                                position: 'absolute', inset: 0, borderRadius: '50%',
                                background: layer.frosting.color,
                                boxShadow: `inset 0 -3px 12px rgba(0,0,0,0.06)`,
                                border: `1px solid ${darken(layer.frosting.color)}`
                             }}/>
                          )}
                       </div>
                    </div>
                 )
              })}
            </div>
            
            {/* Placed Items */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 100 }}>
              {sortedPlaced.map((p) => {
                 const asset = ASSETS[p.kind];
                 const isSel = p.id === selectedId;
                 const isDragToolActive = activeTool === 'drag';
                 const isDraggableItem = asset.type === 'drag';
                 
                 return (
                   <div
                     key={p.id}
                     onPointerDown={isDragToolActive && isDraggableItem ? startDragExisting(p.id, p.kind) : undefined}
                     style={{
                        position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
                        transform: `translate(-50%, -50%) rotate(${p.rot}deg)`,
                        pointerEvents: isDragToolActive && isDraggableItem ? 'auto' : 'none',
                        cursor: isDragToolActive && isDraggableItem ? 'grab' : 'default',
                        filter: isSel ? `drop-shadow(0 0 6px ${ACCENT})` : "drop-shadow(0 4px 6px rgba(0,0,0,0.15))",
                        outline: isSel ? `2px dashed ${ACCENT}` : "none",
                        outlineOffset: 4, borderRadius: '50%',
                     }}
                   >
                     <svg width={asset.size} height={asset.size} viewBox="0 0 30 30">
                       {asset.render ? asset.render(p) : asset.node}
                     </svg>
                   </div>
                 );
              })}
              
              {published && (
                <div style={{
                    position: "absolute", bottom: -10, left: "50%", transform: "translate(-50%, 100%)",
                    background: INK, color: "#fff", fontSize: 13, padding: "8px 16px",
                    borderRadius: 999, whiteSpace: "nowrap", fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                }}>
                  Tasarım Yayınlandı! ✨
                </div>
              )}
            </div>
          </div>
          
          <div style={{ marginTop: published ? 40 : 20, display: "flex", gap: 12 }}>
             <button onClick={removeSelected} disabled={!selectedId} style={btnStyle(!selectedId, "#fff", "#d9534f", true)}>
               <Trash2 size={15} /> Seçileni Sil
             </button>
             <button onClick={clearAll} disabled={placed.length === 0} style={btnStyle(placed.length === 0, "#fff", "#666", true)}>
               <RotateCcw size={15} /> Temizle
             </button>
          </div>
        </div>

        {/* Right Panel: Tools */}
        <div style={{ width: 280, flexShrink: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Malzemeler
          </div>
          
          <div style={{ background: PANEL, borderRadius: 12, padding: 16, border: `1px solid ${PANEL_BORDER}`, boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
             
             {/* General Action - Select/Drag tool */}
             <button 
                onClick={() => setActiveTool('drag')}
                style={{
                   width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                   padding: 10, borderRadius: 8, marginBottom: 20,
                   background: activeTool === 'drag' ? ACCENT_SOFT : '#f5f2ef',
                   border: `1px solid ${activeTool === 'drag' ? ACCENT : '#e8dcd0'}`,
                   color: INK, fontWeight: 600, fontSize: 13, cursor: 'pointer'
                }}
             >
                <MousePointer2 size={16} /> İşaretçi / Sürükle
             </button>

             <div style={{ fontSize: 11, color: '#888', marginBottom: 10, fontWeight: 600, textTransform: 'uppercase' }}>Basılı Tut - Serpiştir & Sıva</div>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 24 }}>
               {Object.entries(ASSETS).filter(([k, v]) => v.type !== 'drag').map(([kind, def]) => (
                 <button 
                    key={kind} 
                    onClick={() => setActiveTool(kind)}
                    title={def.label}
                    style={{
                       display: 'flex', flexDirection: 'column', alignItems: 'center',
                       padding: '12px 4px', borderRadius: 8,
                       background: activeTool === kind ? ACCENT_SOFT : '#fcfcfc',
                       border: `1px solid ${activeTool === kind ? ACCENT : '#eee'}`,
                       cursor: 'pointer', transition: 'all 0.1s'
                    }}
                 >
                    <svg width={28} height={28} viewBox="0 0 30 30" style={{ pointerEvents: 'none' }}>
                      {def.render ? def.render({color: SEKERLEME_COLORS[0]}) : def.node}
                    </svg>
                    <span style={{ fontSize: 10, marginTop: 8, color: INK, textAlign: 'center', fontWeight: 500, lineHeight: 1.1 }}>{def.label}</span>
                 </button>
               ))}
             </div>

             <div style={{ fontSize: 11, color: '#888', marginBottom: 10, fontWeight: 600, textTransform: 'uppercase' }}>Sürükle - Bırak</div>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
               {Object.entries(ASSETS).filter(([k, v]) => v.type === 'drag').map(([kind, def]) => (
                 <button 
                    key={kind} 
                    onPointerDown={(e) => { setActiveTool('drag'); startDragFromPalette(kind)(e); }}
                    title={def.label}
                    style={{
                       display: 'flex', flexDirection: 'column', alignItems: 'center',
                       padding: '12px 4px', borderRadius: 8,
                       background: '#fcfcfc', border: `1px solid #eee`,
                       cursor: 'grab', touchAction: 'none'
                    }}
                 >
                    <svg width={28} height={28} viewBox="0 0 30 30" style={{ pointerEvents: 'none' }}>
                      {def.node}
                    </svg>
                    <span style={{ fontSize: 10, marginTop: 8, color: INK, textAlign: 'center', fontWeight: 500 }}>{def.label}</span>
                 </button>
               ))}
             </div>
             
          </div>
          
          <div style={{ marginTop: 24 }}>
            <button
              onClick={() => { setPublished(true); setSelectedId(null); }}
              disabled={placed.length === 0}
              style={{
                ...btnStyle(placed.length === 0, INK, "#fff"),
                width: "100%", fontSize: 14, padding: "14px", fontWeight: 700, letterSpacing: "0.02em",
                borderRadius: 12, display: 'flex', justifyContent: 'center'
              }}
            >
              <Send size={16} /> Tasarımı Tamamla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function btnStyle(disabled, bg, fg, hasBorder = false) {
  return {
    display: "inline-flex", alignItems: "center", gap: 6,
    fontSize: 12.5, padding: "8px 14px", borderRadius: 8,
    border: hasBorder && !disabled ? `1px solid ${fg}44` : "1px solid transparent",
    background: disabled ? "#f0ebe6" : bg,
    color: disabled ? "#a89f96" : fg,
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "inherit", fontWeight: 600,
  };
}
